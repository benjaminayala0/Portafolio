import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/core/context/LanguageContext';

/** @param {{ variants: import("framer-motion").Variants, className?: string }} props */
export const LanguageSwitcher = ({ variants, className = '' }) => {
    const { lang, setLang } = useLanguage();

    return (
        <motion.div
            variants={variants}
            className={`flex items-center gap-3 font-mono text-sm bg-surface/50 backdrop-blur-md px-4 py-2 rounded-full border border-text-secondary/10 w-fit mx-auto md:mx-0 ${className}`}
        >
            <button
                onClick={() => setLang('es')}
                className={`transition-colors ${lang === 'es' ? 'text-primary font-bold' : 'text-text-secondary hover:text-white'}`}
                aria-label="Cambiar idioma a Español"
                title="Español"
            >
                ES
            </button>
            <span className="text-text-secondary/30 cursor-default" aria-hidden="true">/</span>
            <button
                onClick={() => setLang('en')}
                className={`transition-colors ${lang === 'en' ? 'text-primary font-bold' : 'text-text-secondary hover:text-white'}`}
                aria-label="Change language to English"
                title="English"
            >
                EN
            </button>
        </motion.div>
    );
};
