import React from 'react';
import { Telescope, Code2, Target, RefreshCw, Network, Layers2 } from 'lucide-react';
import { useScrollReveal } from '@/core/hooks/useScrollReveal';
import { useTranslation } from '@/core/hooks/useTranslation';

const Methodology = () => {
    const { t } = useTranslation();
    const header = useScrollReveal();
    const card1 = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
    const card2 = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
    const card3 = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });

    return (
        <section className="py-24 relative z-10 max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden" id="methodology">

            <div ref={header.ref} className={`text-center mb-20 ${header.revealClass}`}>
                <h2 className="text-sm font-mono text-text-primary/80 mb-3">
                    {t('methodology.label')}
                </h2>
                <h3 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
                    {t('methodology.title.1')}<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-secondary to-text-primary opacity-80">
                        {t('methodology.title.2')}
                    </span>
                </h3>
                <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed font-sans">
                    {t('methodology.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                {/* Desktop connector line */}
                <div className="hidden md:block absolute top-[120px] left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-text-secondary/20 to-transparent z-0"></div>

                <div ref={card1.ref} className={`group relative z-10 ${card1.revealClass}`} style={{ transitionDelay: '0ms' }}>
                    <div className="relative h-full glass-panel p-8 rounded-2xl border border-text-secondary/10 hover:border-text-primary/30 transition-all flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-surface-lighter flex items-center justify-center mb-8 border border-text-secondary/10 group-hover:scale-110 transition-transform shadow-lg relative">
                            <Telescope className="text-text-primary opacity-90" size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-text-primary mb-4">{t('methodology.card1.title')}</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans flex-grow">
                            {t('methodology.card1.desc')}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-text-primary/80 mt-auto pt-6 w-full justify-center">
                            <Network size={14} /> {t('methodology.card1.label')}
                        </div>
                    </div>
                </div>

                <div ref={card2.ref} className={`group relative z-10 ${card2.revealClass}`} style={{ transitionDelay: '150ms' }}>
                    <div className="relative h-full glass-panel p-8 rounded-2xl border border-text-secondary/10 hover:border-text-primary/30 transition-all flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-surface-lighter flex items-center justify-center mb-8 border border-text-secondary/10 group-hover:scale-110 transition-transform shadow-lg relative">
                            <Code2 className="text-text-primary opacity-90" size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-text-primary mb-4">{t('methodology.card2.title')}</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans flex-grow">
                            {t('methodology.card2.desc')}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-text-primary/80 mt-auto pt-6 w-full justify-center">
                            <Layers2 size={14} /> {t('methodology.card2.label')}
                        </div>
                    </div>
                </div>

                <div ref={card3.ref} className={`group relative z-10 ${card3.revealClass}`} style={{ transitionDelay: '300ms' }}>
                    <div className="relative h-full glass-panel p-8 rounded-2xl border border-text-secondary/10 hover:border-text-primary/30 transition-all flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-surface-lighter flex items-center justify-center mb-8 border border-text-secondary/10 group-hover:scale-110 transition-transform shadow-lg relative">
                            <Target className="text-text-primary opacity-90" size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-text-primary mb-4">{t('methodology.card3.title')}</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans flex-grow">
                            {t('methodology.card3.desc')}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-text-primary/80 mt-auto pt-6 w-full justify-center">
                            <RefreshCw size={14} /> {t('methodology.card3.label')}
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Methodology;
