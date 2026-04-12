import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/core/hooks/useTranslation';

const VideoOutro = () => {
    const { t } = useTranslation();
    const videoRef = useRef(null);
    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasPlayed) {
                    setHasPlayed(true);
                    if (videoRef.current) {
                        videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
                    }
                }
            },
            {
                threshold: 0.3 // Trigger when 30% of the video container is visible
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, [hasPlayed]);

    return (
        <section className="relative w-full h-[50svh] md:h-[80svh] min-h-[300px] md:min-h-[500px] bg-black flex flex-col items-center justify-center overflow-hidden border-t border-text-secondary/10 shrink-0">
            {/* Video container */}
            <video
                ref={videoRef}
                src="/outro.mp4"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${hasPlayed ? 'opacity-80' : 'opacity-0'}`}
                style={{ objectPosition: 'center 40%' }}
                muted
                playsInline
                disablePictureInPicture
            />

            {/* Dark gradient mapping the scene organically */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            {/* Overlay Text */}
            <div className={`relative z-10 text-center px-6 transition-all duration-[3000ms] delay-1000 ${hasPlayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="w-16 h-[1px] bg-primary/50 mx-auto mb-6" />
                <p className="text-white/90 font-mono text-lg md:text-xl tracking-wider font-light">
                    {t('outro.thanks')}
                </p>
                <p className="text-text-secondary font-mono text-sm mt-4">
                    — Benjamín
                </p>
            </div>
            
            {/* Cinematic subtle glow at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </section>
    );
};

export default VideoOutro;
