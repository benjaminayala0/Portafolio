import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/core/hooks/useTranslation';

const StorePreviewCarousel = ({ screenshots = [], isMobile = false }) => {
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
            <div className={`relative flex items-center justify-center shrink-0 ${
                isMobile 
                    ? 'w-full h-[400px] sm:h-[450px] bg-transparent py-4 overflow-hidden' 
                    : 'w-full aspect-video min-h-[250px] bg-surface rounded-t-xl overflow-hidden'
            }`}>
                {screenshots.map((shot, i) => (
                    <img
                        key={i}
                        src={shot.src}
                        alt={shot.alt}
                        className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
                            isMobile ? 'object-contain object-center scale-[0.98]' : 'inset-0 object-cover'
                        } ${
                            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                        loading="lazy"
                        draggable={false}
                    />
                ))}

                {/* Navigation arrows */}
                {screenshots.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-surface/70 backdrop-blur-sm border border-text-secondary/20 text-text-primary/80 hover:text-text-primary hover:bg-surface/90 transition-all z-20"
                            aria-label="Captura anterior"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-surface/70 backdrop-blur-sm border border-text-secondary/20 text-text-primary/80 hover:text-text-primary hover:bg-surface/90 transition-all z-20"
                            aria-label="Captura siguiente"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </>
                )}
            </div>

            {/* Caption + dot navigation */}
            <div className="px-4 py-2.5 flex items-center justify-between bg-surface-lighter/50 border-t border-text-secondary/10">
                <span className="text-[11px] text-text-secondary font-mono truncate mr-3">
                    {t(screenshots[current]?.alt)}
                </span>
                {screenshots.length > 1 && (
                    <div className="flex gap-1.5 shrink-0">
                        {screenshots.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    i === current
                                        ? 'w-4 h-1.5 bg-primary'
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
