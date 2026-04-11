import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useVideoScrub } from '@/core/hooks/useVideoScrub';
import { HeroVideoLayer } from './HeroVideoLayer';
import { HeroTextLayer } from './HeroTextLayer';

const VIDEO_SRC = '/assets/hero-sequence.mp4';

const Hero = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [textVisible, setTextVisible] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const { videoReady, hasError, autoplayDone } = useVideoScrub({
        videoRef,
        scrollYProgress,
        autoplayDurationMs: 7000,
        autoplayProgressEnd: 0.35
    });

    useEffect(() => {
        if (autoplayDone) {
            setTimeout(() => setTextVisible(true), 300);
        }
    }, [autoplayDone]);

    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const canvasOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    const [isInteractive, setIsInteractive] = useState(true);
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsInteractive(latest <= 0.5);
    });

    return (
        <section ref={containerRef} className="relative w-full h-[350dvh] bg-surface">
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">

                <HeroVideoLayer
                    videoRef={videoRef}
                    videoSrc={VIDEO_SRC}
                    canvasOpacity={canvasOpacity}
                    hasError={hasError}
                />

                <HeroTextLayer
                    textVisible={textVisible}
                    textOpacity={textOpacity}
                    isInteractive={isInteractive}
                />

                {autoplayDone && (
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/40 font-mono text-sm tracking-widest flex flex-col items-center gap-3"
                        style={{ opacity: scrollIndicatorOpacity }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <motion.div
                            className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/40"
                            animate={{ scaleY: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        SCROLL
                    </motion.div>
                )}

                {!videoReady && !hasError && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-surface">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            <span className="text-text-secondary/50 font-mono text-xs tracking-widest">INICIANDO ENGINE</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
