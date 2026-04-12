import React from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/core/config/constants';
import { useTranslation } from '@/core/hooks/useTranslation';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navItems = [
        { labelKey: 'footer.nav.home', hash: '#top' },
        { labelKey: 'footer.nav.proposal', hash: '#methodology' },
        { labelKey: 'footer.nav.studies', hash: '#studies' },
        { labelKey: 'footer.nav.experience', hash: '#experience-contact' },
        { labelKey: 'footer.nav.contact', hash: '#contact' },
    ];

    return (
        <footer className="relative border-t border-white/5 bg-surface pt-16 pb-8 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

                    <div className="flex flex-col items-start">
                        <span className="text-2xl font-bold tracking-tight text-text-primary mb-2 flex items-center gap-2">
                            <Terminal className="text-primary" size={24} />
                            Benjamín Ayala
                        </span>
                        <p className="text-text-secondary font-mono text-sm max-w-sm mb-6 leading-relaxed">
                            {t('footer.subtitle')}
                        </p>

                        <div className="flex items-center gap-3">
                            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-text-secondary/10 text-text-secondary hover:text-white hover:border-primary/30 hover:bg-primary/5 transition-all" aria-label="GitHub">
                                <Github size={16} />
                            </a>
                            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-text-secondary/10 text-text-secondary hover:text-white hover:border-primary/30 hover:bg-primary/5 transition-all" aria-label="LinkedIn">
                                <Linkedin size={16} />
                            </a>
                            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_INFO.email}&su=${encodeURIComponent(CONTACT_INFO.subject)}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-text-secondary/10 text-text-secondary hover:text-white hover:border-primary/30 hover:bg-primary/5 transition-all" aria-label="Email">
                                <Mail size={16} />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-text-primary font-bold uppercase tracking-widest text-xs mb-2 opacity-80">{t('footer.nav.title')}</h4>
                        {navItems.map(({ labelKey, hash }) => (
                            <a key={labelKey} href={hash} className="text-text-secondary hover:text-primary transition-colors font-mono text-sm w-fit flex items-center gap-1 group">
                                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary font-bold">&gt;</span>
                                {t(labelKey)}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-text-secondary/60 font-mono text-xs flex flex-col sm:flex-row items-center gap-2">
                        <span>© {currentYear} Benjamín Ayala.</span>
                        <span className="hidden sm:inline">|</span>
                        <span>{t('footer.bottom.built')}</span>
                    </div>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 border border-white/10 rounded-full text-text-secondary hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all font-mono text-xs uppercase tracking-widest flex items-center gap-2"
                    >
                        {t('footer.back')}
                        <ArrowUpRight size={14} className="rotate-[-45deg]" />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
