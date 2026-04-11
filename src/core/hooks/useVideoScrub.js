import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';

// Cubic ease-in-out for organic camera motion feel
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * @typedef {Object} UseVideoScrubOptions
 * @property {React.RefObject<HTMLVideoElement>} videoRef - Referencia al nodo de DOM del video.
 * @property {import("framer-motion").MotionValue<number>} scrollYProgress - Valor animado provisto por useScroll de framer.
 * @property {number} autoplayDurationMs - Duración en miliSegundos de la extrapolación pasiva inicial.
 * @property {number} autoplayProgressEnd - Máximo porcentaje límite del video reservado para autoplay (ej. 0.35 para 35%).
 */

/**
 * Custom Hook que delega la inicialización, chequeo de error y el scrubbing de tiempo del DOM al HeroVideoLayer,
 * garantizando la responsabilidad única en el ciclo de Render React.
 * @param {UseVideoScrubOptions} options Objeto de configuración de hook matemático.
 * @returns {{ videoReady: boolean, hasError: boolean, autoplayDone: boolean, setAutoplayDone: Function }}
 */
export const useVideoScrub = ({
    videoRef,
    scrollYProgress,
    autoplayDurationMs = 7000,
    autoplayProgressEnd = 0.35,
}) => {
    const [videoReady, setVideoReady] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [autoplayDone, setAutoplayDone] = useState(false);
    const videoDuration = useRef(0);

    // ─── Preload Video Metadata ─────────────────────────
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            if (!videoDuration.current || videoDuration.current === 0) {
                videoDuration.current = video.duration || 32.27; // Fallback
                setVideoReady(true);
            }
        };

        const handleError = () => {
            console.error("Error cargando la secuencia de video");
            setHasError(true);
        };

        if (video.readyState >= 1) {
            handleLoadedMetadata();
        } else {
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            video.addEventListener('loadeddata', handleLoadedMetadata);
        }

        video.addEventListener('error', handleError);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('loadeddata', handleLoadedMetadata);
            video.removeEventListener('error', handleError);
        };
    }, [videoRef]);

    // ─── PHASE 1: Auto-play Engine ──────────────────────
    useEffect(() => {
        if (!videoReady || hasError || autoplayDone || !videoRef.current) return;

        let startTime = null;
        let rafId = null;
        const totalDuration = videoDuration.current;
        const targetTime = totalDuration * autoplayProgressEnd;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / autoplayDurationMs, 1);
            const easedProgress = easeInOutCubic(progress);

            if (videoRef.current) {
                videoRef.current.currentTime = easedProgress * targetTime;
            }

            if (progress < 1) {
                rafId = requestAnimationFrame(animate);
            } else {
                setAutoplayDone(true);
            }
        };

        const timeout = setTimeout(() => {
            rafId = requestAnimationFrame(animate);
        }, 100);

        return () => {
            clearTimeout(timeout);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [videoReady, hasError, autoplayDone, videoRef, autoplayDurationMs, autoplayProgressEnd]);

    // ─── PHASE 2: Scroll-Scrub Engine ───────────────────
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!autoplayDone || !videoRef.current || !videoReady) return;

        // Mapeo del scroll actual (0-1) al fragmento restante del video
        const total = videoDuration.current;
        const start = total * autoplayProgressEnd;
        const scrollableDuration = total - start;
        const time = start + latest * scrollableDuration;

        videoRef.current.currentTime = time;
    });

    return { videoReady, hasError, autoplayDone, setAutoplayDone };
};
