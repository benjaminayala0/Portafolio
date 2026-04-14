import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/core/hooks/useTranslation';
import { useLanguage } from '@/core/context/LanguageContext';

const Navbar = () => {
    const { t } = useTranslation();
    const { lang, setLang } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const isClickingRef = React.useRef(false);
    const idleTimerRef = React.useRef(null);

    const navLinks = [
        { labelKey: 'nav.proposal', href: '#methodology' },
        { labelKey: 'nav.projects', href: '#studies' },
        { labelKey: 'nav.about', href: '#experience-contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.6) {
                setIsVisible(true);
                clearTimeout(idleTimerRef.current);
                idleTimerRef.current = setTimeout(() => setIsVisible(false), 2500);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(idleTimerRef.current);
        };
    }, []);

    useEffect(() => {
        const sections = ['methodology', 'studies', 'experience-contact', 'contact'];
        const observers = sections.map((id) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !isClickingRef.current) {
                        setActiveSection(id);
                    }
                },
                { threshold: 0.08 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach((obs) => obs?.disconnect());
    }, []);

    const scrollToTop = () => {
        isClickingRef.current = true;
        setActiveSection('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { isClickingRef.current = false; }, 1200);
    };

    const handleNavClick = (sectionId) => {
        isClickingRef.current = true;
        setActiveSection(sectionId);
        setTimeout(() => { isClickingRef.current = false; }, 1200);
    };

    return (
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out ${isVisible
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
        >
            <div className="flex items-center gap-1 sm:gap-2 bg-surface/80 backdrop-blur-xl border border-text-secondary/15 rounded-full px-3 sm:px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

                <button
                    onClick={scrollToTop}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-primary/20 hover:border-primary/40 transition-colors shrink-0 overflow-hidden mr-2"
                    aria-label="Back to top"
                >
                    <img src="/avatar.webp" alt="BA" className="w-full h-full object-cover scale-[1.12] translate-x-[2px] translate-y-[1px]" />
                </button>

                <div className="w-px h-4 bg-text-secondary/20 mr-1 hidden sm:block" />

                {navLinks.map(({ labelKey, href }) => {
                    const sectionId = href.replace('#', '');
                    const isActive = activeSection === sectionId;
                    return (
                        <a
                            key={labelKey}
                            href={href}
                            onClick={() => handleNavClick(sectionId)}
                            className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all duration-200 whitespace-nowrap ${isActive
                                ? 'bg-primary/15 text-primary'
                                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                                }`}
                        >
                            {t(labelKey)}
                        </a>
                    );
                })}

                <div className="w-px h-4 bg-text-secondary/20 mx-0.5 sm:mx-1" />

                <div className="flex items-center p-0.5 rounded-full bg-black/40 shadow-inner border border-white/5">
                    <button
                        title={lang === 'en' ? 'Cambiar a Español' : undefined}
                        onClick={() => setLang('es')}
                        className={`flex items-center justify-center w-6 sm:w-7 h-5 sm:h-6 rounded-full text-[9px] sm:text-[10px] font-mono font-medium transition-all duration-300 ${lang === 'es' ? 'bg-white/15 text-white shadow-sm' : 'text-text-secondary/50 hover:text-white hover:bg-white/5'}`}
                        aria-label="Español"
                    >
                        ES
                    </button>
                    <button
                        title={lang === 'es' ? 'Switch to English' : undefined}
                        onClick={() => setLang('en')}
                        className={`flex items-center justify-center w-6 sm:w-7 h-5 sm:h-6 rounded-full text-[9px] sm:text-[10px] font-mono font-medium transition-all duration-300 ${lang === 'en' ? 'bg-white/15 text-white shadow-sm' : 'text-text-secondary/50 hover:text-white hover:bg-white/5'}`}
                        aria-label="English"
                    >
                        EN
                    </button>
                </div>

                <div className="w-px h-4 bg-text-secondary/20 ml-1 hidden sm:block" />

                <div className="hidden sm:flex items-center gap-1.5 pl-1">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 whitespace-nowrap">{t('availability.status')}</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
