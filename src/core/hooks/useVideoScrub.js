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

/**
 * Custom Hook that delegates initialization, error checking, and time scrubbing
 * to the HeroVideoLayer, ensuring single responsibility within the React render cycle.
 * @param {UseVideoScrubOptions} options Hook configuration object.
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
    const targetTime = useRef(0);
    const rafId = useRef(null);

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

    useEffect(() => {
        if (!videoReady || hasError || autoplayDone || !videoRef.current) return;

        const video = videoRef.current;
        const totalDuration = videoDuration.current;
        const autoplayTarget = totalDuration * autoplayProgressEnd;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            video.playbackRate = 1.6;

            const handleTimeUpdate = () => {
                if (video.currentTime >= autoplayTarget) {
                    video.pause();
                    video.playbackRate = 1.0;
                    targetTime.current = autoplayTarget;
                    setAutoplayDone(true);
                    video.removeEventListener('timeupdate', handleTimeUpdate);
                }
            };

            video.addEventListener('timeupdate', handleTimeUpdate);
            video.play().catch(() => {
                targetTime.current = 0;
                setAutoplayDone(true);
            });

            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
                video.pause();
                video.playbackRate = 1.0;
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

    useEffect(() => {
        if (!autoplayDone || !videoReady) return;

        const LERP_FACTOR = 0.12;
        let lastMobileUpdate = 0;

        const tick = (timestamp) => {
            const video = videoRef.current;
            if (video) {
                const current = video.currentTime;
                const target = targetTime.current;
                const diff = target - current;

                if (Math.abs(diff) > 0.01) {
                    const isMobile = window.innerWidth <= 768;

                    if (isMobile) {
                        if (timestamp - lastMobileUpdate > 66) {
                            video.currentTime = target;
                            lastMobileUpdate = timestamp;
                        }
                    } else {
                        video.currentTime = current + diff * LERP_FACTOR;
                    }
                }
            }
            rafId.current = requestAnimationFrame(tick);
        };

        rafId.current = requestAnimationFrame(tick);

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [autoplayDone, videoReady, videoRef]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!videoReady) return;

        // If user starts scrolling manually before autoplay finishes, surrender control instantly
        if (!autoplayDone && latest > 0.005) {
            setAutoplayDone(true);
        }

        if (!autoplayDone) return;

        const total = videoDuration.current;
        const start = total * autoplayProgressEnd;
        const scrollableDuration = total - start;

        targetTime.current = start + latest * scrollableDuration;
    });

    return { videoReady, hasError, autoplayDone, setAutoplayDone };
};
