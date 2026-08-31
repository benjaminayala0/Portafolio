import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/core/hooks/useTranslation';

const StorePreviewCarousel = ({ screenshots = [], isMobile = false, activeDotColor = 'bg-violet-400' }) => {
    const { t } = useTranslation();
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent(prev => (prev + 1) % screenshots.length);
    }, [screenshots.length]);

    const prev = useCallback(() => {
        setCurrent(prev => (prev - 1 + screenshots.length) % screenshots.length);
    }, [screenshots.length]);

    // Auto-advance every 5s
    useEffect(() => {
        if (screenshots.length <= 1) return;
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next, screenshots.length]);

    if (!screenshots.length) return null;

    return (
        <div className={`h-full flex flex-col ${isMobile ? 'items-center w-full' : 'w-full'}`}>
            {/* Image area */}
            <div className={`relative flex items-center justify-center shrink-0 w-full ${
                isMobile
                    ? 'py-4 sm:py-6 bg-transparent overflow-visible'
                    : 'aspect-video min-h-[250px] bg-surface rounded-t-xl overflow-hidden'
            }`}>
                
                {isMobile ? (
                    /* Floating Clean Mobile Frame */
                    <div className="relative h-[430px] sm:h-[480px] md:h-[510px] aspect-[1080/2260] bg-surface-lighter rounded-[2.2rem] border-[3px] border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_30px_rgba(139,92,246,0.15)] ring-1 ring-white/10 flex flex-col items-center group/phone">
                        {/* Screen Content Container */}
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-surface">
                            {screenshots.map((shot, i) => (
                                <img
                                    key={i}
                                    src={shot.src}
                                    alt={shot.alt}
                                    className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out ${
                                        i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                                    loading="lazy"
                                    draggable={false}
                                />
                            ))}
                        </div>

                        {/* Navigation arrows floating cleanly outside phone frame */}
                        {screenshots.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prev(); }}
                                    className="absolute -left-10 sm:-left-14 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-surface-lighter/80 backdrop-blur-md border border-white/10 text-text-primary hover:scale-110 hover:bg-violet-600/80 transition-all z-30 shadow-2xl"
                                    aria-label="Captura anterior"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); next(); }}
                                    className="absolute -right-10 sm:-right-14 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-surface-lighter/80 backdrop-blur-md border border-white/10 text-text-primary hover:scale-110 hover:bg-violet-600/80 transition-all z-30 shadow-2xl"
                                    aria-label="Captura siguiente"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    /* Desktop aspect-video layout */
                    <>
                        {screenshots.map((shot, i) => (
                            <img
                                key={i}
                                src={shot.src}
                                alt={shot.alt}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                                    i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                                loading="lazy"
                                draggable={false}
                            />
                        ))}

                        {/* Desktop navigation arrows */}
                        {screenshots.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prev(); }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 backdrop-blur-md border border-text-secondary/20 text-text-primary hover:scale-110 transition-all z-30 shadow-lg"
                                    aria-label="Captura anterior"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); next(); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 backdrop-blur-md border border-text-secondary/20 text-text-primary hover:scale-110 transition-all z-30 shadow-lg"
                                    aria-label="Captura siguiente"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>

            {/* Caption + dot navigation */}
            <div className={`px-4 py-3 flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0 bg-surface-lighter/40 backdrop-blur-sm border-t border-text-secondary/10 rounded-b-xl w-full ${isMobile ? 'mt-2' : ''}`}>
                <span className="text-xs text-text-secondary font-mono sm:truncate sm:mr-3 text-center sm:text-left leading-relaxed">
                    {t(screenshots[current]?.alt)}
                </span>
                {screenshots.length > 1 && (
                    <div className="flex gap-1.5 shrink-0 items-center">
                        {screenshots.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    i === current
                                        ? `w-4 h-1.5 ${activeDotColor}`
                                        : 'w-1.5 h-1.5 bg-text-secondary/30 hover:bg-text-secondary/60'
                                }`}
                                aria-label={`Ir a captura ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StorePreviewCarousel;
