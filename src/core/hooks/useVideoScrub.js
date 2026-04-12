import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';

// Cubic ease-in-out for organic camera motion feel
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * @typedef {Object} UseVideoScrubOptions
 * @property {React.RefObject<HTMLVideoElement>} videoRef - Ref to the video DOM node.
 * @property {import("framer-motion").MotionValue<number>} scrollYProgress - Animated value provided by Framer's useScroll.
 * @property {number} autoplayDurationMs - Duration in milliseconds of the initial passive extrapolation.
 * @property {number} autoplayProgressEnd - Maximum percentage of the video reserved for autoplay (e.g., 0.35 for 35%).
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
    const targetTime = useRef(0);
    const rafIdMobileAuto = useRef(null);

    // Preload Video Metadata
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            if (!videoDuration.current || videoDuration.current === 0) {
                videoDuration.current = video.duration || 32.27;
                setVideoReady(true);
            }
        };

        const handleError = () => {
            console.error("Error loading video sequence");
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

    // Phase 1: Auto-play Engine
    useEffect(() => {
        if (!videoReady || hasError || autoplayDone || !videoRef.current) return;

        const video = videoRef.current;
        const totalDuration = videoDuration.current;
        const autoplayTarget = totalDuration * autoplayProgressEnd;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            video.playbackRate = 1.6;

            const pollTime = () => {
                if (video.currentTime >= autoplayTarget) {
                    video.pause();
                    video.playbackRate = 1.0;
                    video.currentTime = autoplayTarget;
                    targetTime.current = autoplayTarget;
                    setAutoplayDone(true);
                } else {
                    rafIdMobileAuto.current = requestAnimationFrame(pollTime);
                }
            };

            video.play().then(() => {
                rafIdMobileAuto.current = requestAnimationFrame(pollTime);
            }).catch(() => {
                video.currentTime = autoplayTarget;
                targetTime.current = autoplayTarget;
                setAutoplayDone(true);
            });

            return () => {
                video.pause();
                video.playbackRate = 1.0;
                if (rafIdMobileAuto.current) cancelAnimationFrame(rafIdMobileAuto.current);
            };
        }

        let startTime = null;
        let animRafId = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / autoplayDurationMs, 1);
            const easedProgress = easeInOutCubic(progress);

            video.currentTime = easedProgress * autoplayTarget;

            if (progress < 1) {
                animRafId = requestAnimationFrame(animate);
            } else {
                video.currentTime = autoplayTarget;
                targetTime.current = autoplayTarget;
                setAutoplayDone(true);
            }
        };

        const timeout = setTimeout(() => {
            animRafId = requestAnimationFrame(animate);
        }, 100);

        return () => {
            clearTimeout(timeout);
            if (animRafId) cancelAnimationFrame(animRafId);
        };
    }, [videoReady, hasError, autoplayDone, videoRef, autoplayDurationMs, autoplayProgressEnd]);

    // Phase 2: Scroll Scrub (Desktop only — mobile uses canvas)
    const isMobileRef = useRef(window.innerWidth <= 768);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!videoReady) return;

        if (!autoplayDone && latest > 0.005) {
            setAutoplayDone(true);
        }

        if (!autoplayDone) return;

        if (isMobileRef.current) return;

        const total = videoDuration.current;
        const start = total * autoplayProgressEnd;
        const scrollableDuration = total - start;

        const clampLatest = Math.min(Math.max(latest, 0), 0.999);
        const newTarget = start + clampLatest * scrollableDuration;

        if (videoRef.current) {
            videoRef.current.currentTime = Math.min(newTarget, total - 0.01);
        }
    });

    return { videoReady, hasError, autoplayDone, setAutoplayDone };
};
