import { useEffect, useRef, useState } from 'react';

// Lightweight scroll reveal hook using native IntersectionObserver.
// Zero external dependencies — preserves Lighthouse 100/100 score.
export const useScrollReveal = ({
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -60px 0px',
} = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) observer.unobserve(el);
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.unobserve(el);
    }, [threshold, triggerOnce, rootMargin]);

    // GPU-accelerated transition via will-change + CSS transform + blur
    const revealClass = [
        'transition-all duration-[900ms] ease-out will-change-[opacity,transform,filter]',
        isVisible
            ? 'opacity-100 blur-none translate-y-0'
            : 'opacity-0 blur-sm translate-y-8',
    ].join(' ');

    return { ref, revealClass, isVisible };
};
