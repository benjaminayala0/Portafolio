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
                <h2 className="text-sm font-mono text-primary flex items-center justify-center gap-2 mb-3">
                    <span className="w-8 h-px bg-primary"></span>
                    {t('methodology.label')}
                    <span className="w-8 h-px bg-primary"></span>
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
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-700"></div>
                    <div className="relative h-full glass-panel p-8 rounded-2xl border border-text-secondary/10 hover:border-primary/30 transition-all flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-surface-lighter flex items-center justify-center mb-8 border border-text-secondary/10 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.1)] relative">
                            <Telescope className="text-primary" size={32} />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent rounded-b-full"></div>
                        </div>
                        <h4 className="text-xl font-bold text-text-primary mb-4">{t('methodology.card1.title')}</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans flex-grow">
                            {t('methodology.card1.desc')}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-primary/80 mt-auto pt-6 border-t border-text-secondary/10 w-full justify-center">
                            <Network size={14} /> {t('methodology.card1.label')}
                        </div>
                    </div>
                </div>

                <div ref={card2.ref} className={`group relative z-10 ${card2.revealClass}`} style={{ transitionDelay: '150ms' }}>
                    <div className="absolute -inset-1 bg-gradient-to-br from-fuchsia-500/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-700"></div>
                    <div className="relative h-full glass-panel p-8 rounded-2xl border border-text-secondary/10 hover:border-fuchsia-500/30 transition-all flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-surface-lighter flex items-center justify-center mb-8 border border-text-secondary/10 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(217,70,239,0.1)] relative">
                            <Code2 className="text-fuchsia-400" size={32} />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-fuchsia-500/10 to-transparent rounded-b-full"></div>
                        </div>
                        <h4 className="text-xl font-bold text-text-primary mb-4">{t('methodology.card2.title')}</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans flex-grow">
                            {t('methodology.card2.desc')}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-fuchsia-400/80 mt-auto pt-6 border-t border-text-secondary/10 w-full justify-center">
                            <Layers2 size={14} /> {t('methodology.card2.label')}
                        </div>
                    </div>
                </div>

                <div ref={card3.ref} className={`group relative z-10 ${card3.revealClass}`} style={{ transitionDelay: '300ms' }}>
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-700"></div>
                    <div className="relative h-full glass-panel p-8 rounded-2xl border border-text-secondary/10 hover:border-[#8b5cf6]/30 transition-all flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-surface-lighter flex items-center justify-center mb-8 border border-text-secondary/10 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.1)] relative">
                            <Target className="text-[#8b5cf6]" size={32} />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#8b5cf6]/10 to-transparent rounded-b-full"></div>
                        </div>
                        <h4 className="text-xl font-bold text-text-primary mb-4">{t('methodology.card3.title')}</h4>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans flex-grow">
                            {t('methodology.card3.desc')}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#8b5cf6]/80 mt-auto pt-6 border-t border-text-secondary/10 w-full justify-center">
                            <RefreshCw size={14} /> {t('methodology.card3.label')}
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Methodology;
