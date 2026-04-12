import { useEffect, useRef, useState, useCallback } from 'react';
import { useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 125;
const FRAME_PATH = '/assets/hero-frames/frame_';

/**
 * Mobile-only hook: preloads a JPEG sequence and draws them on a <canvas>
 * synchronized to scroll progress. Bypasses the <video>.currentTime decode
 * pipeline entirely, achieving ~1ms per frame draw via GPU blit.
 *
 * @param {{ canvasRef: React.RefObject<HTMLCanvasElement>, scrollYProgress: import("framer-motion").MotionValue<number>, enabled: boolean }} options
 * @returns {{ framesReady: boolean, drawFrameAtProgress: (progress: number) => void }}
 */
export const useCanvasScrub = ({ canvasRef, scrollYProgress, enabled = false }) => {
    const [framesReady, setFramesReady] = useState(false);
    const framesRef = useRef([]);
    const currentFrameIdx = useRef(-1);

    // Progressive Frame Preloading
    useEffect(() => {
        if (!enabled) return;

        let cancelled = false;
        const frames = new Array(TOTAL_FRAMES);
        let loadedCount = 0;

        const onLoad = () => {
            loadedCount++;
            // Mark ready at 30% loaded for fast initial response
            if (!cancelled && loadedCount >= Math.ceil(TOTAL_FRAMES * 0.3) && !framesReady) {
                setFramesReady(true);
            }
        };

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.decoding = 'async';
            img.src = `${FRAME_PATH}${String(i + 1).padStart(4, '0')}.jpg`;
            img.onload = onLoad;
            img.onerror = onLoad;
            frames[i] = img;
        }

        framesRef.current = frames;

        return () => {
            cancelled = true;
        };
    }, [enabled]);

    // Canvas Draw (GPU blit ~1ms)
    const drawFrame = useCallback((frameIndex) => {
        if (frameIndex === currentFrameIdx.current) return;
        if (frameIndex < 0 || frameIndex >= TOTAL_FRAMES) return;

        const canvas = canvasRef.current;
        const img = framesRef.current[frameIndex];
        if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const canvasW = Math.round(rect.width * dpr);
        const canvasH = Math.round(rect.height * dpr);

        if (canvas.width !== canvasW || canvas.height !== canvasH) {
            canvas.width = canvasW;
            canvas.height = canvasH;
        }

        // Replicate CSS object-fit: cover; object-position: center 80%
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = canvasW / canvasH;

        let sx, sy, sw, sh;
        if (imgRatio > canvasRatio) {
            // Image wider than canvas — crop sides
            sh = img.naturalHeight;
            sw = sh * canvasRatio;
            sx = (img.naturalWidth - sw) / 2;
            sy = 0;
        } else {
            // Image taller than canvas — crop vertical at 80% from top
            sw = img.naturalWidth;
            sh = sw / canvasRatio;
            sx = 0;
            sy = (img.naturalHeight - sh) * 0.8; // object-position: center 80%
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
        currentFrameIdx.current = frameIndex;
    }, [canvasRef]);

    // Public: draw by normalized progress
    const drawFrameAtProgress = useCallback((progress) => {
        const clamp = Math.min(Math.max(progress, 0), 0.999);
        const idx = Math.floor(clamp * TOTAL_FRAMES);
        drawFrame(Math.min(idx, TOTAL_FRAMES - 1));
    }, [drawFrame]);

    // Scroll listener
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!enabled || !framesReady) return;

        const clampLatest = Math.min(Math.max(latest, 0), 0.999);
        const frameIndex = Math.floor(clampLatest * TOTAL_FRAMES);
        drawFrame(Math.min(frameIndex, TOTAL_FRAMES - 1));
    });

    return { framesReady, drawFrameAtProgress };
};
