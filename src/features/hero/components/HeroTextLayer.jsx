import React from 'react';
import { motion } from 'framer-motion';
import { useDecryptEffect } from '@/core/hooks/useDecryptEffect';
import { useTranslation } from '@/core/hooks/useTranslation';
import { LanguageSwitcher } from '@/core/ui/LanguageSwitcher';
import { AvailabilityBadge } from '@/core/ui/AvailabilityBadge';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: 40, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

/**
 * @typedef {Object} HeroTextLayerProps
 * @property {boolean} textVisible
 * @property {import("framer-motion").MotionValue<number>} textOpacity
 * @property {boolean} isInteractive
 */

/** @param {HeroTextLayerProps} props */
export const HeroTextLayer = ({ textVisible, textOpacity, isInteractive }) => {
    const { t } = useTranslation();
    const titleLine1 = useDecryptEffect(t('hero.title.line1'), 0, 800);
    const titleLine2 = useDecryptEffect(t('hero.title.line2'), 400, 1000);
    const subtitleDecrypt = useDecryptEffect(t('hero.subtitle'), 800, 1200);

    return (
        <motion.div
            className="relative z-10 h-full flex items-start pt-28 md:pt-0 md:items-center px-4 sm:px-6 md:px-0 justify-center md:justify-end"
            style={{
                opacity: textOpacity,
                pointerEvents: isInteractive ? 'auto' : 'none'
            }}
        >
            <motion.div
                className="w-full md:w-[48%] lg:w-[44%] xl:w-[42%] md:pr-6 lg:pr-12 xl:pr-20 max-w-lg md:max-w-none text-center md:text-left"
                variants={containerVariants}
                initial="hidden"
                animate={textVisible ? "visible" : "hidden"}
            >
                <LanguageSwitcher variants={itemVariants} className="mb-3 md:mb-5" />
                <AvailabilityBadge variants={itemVariants} className="mb-3 md:mb-5" />

                <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight mb-3 md:mb-5 text-text-primary">
                    <span className="block font-mono font-medium tracking-tight">
                        {titleLine1.displayText}
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow font-mono mt-1 md:mt-2">
                        {titleLine2.displayText}
                    </span>
                </motion.h1>

                <motion.p variants={itemVariants} className="text-xs sm:text-sm md:text-base lg:text-lg text-text-secondary max-w-xl mb-4 md:mb-6 leading-relaxed font-mono" style={{ textShadow: '0 0 3px rgba(13,17,23,1), 0 0 6px rgba(13,17,23,0.8)' }}>
                    {subtitleDecrypt.displayText}
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center md:items-start gap-2 md:gap-3">
                    <a
                        href="#studies"
                        aria-label={t('hero.cta.studies')}
                        className="w-full sm:w-auto text-center px-5 md:px-7 py-2.5 md:py-3 rounded-lg bg-primary hover:bg-primary-dark transition-colors font-medium text-white text-sm md:text-base shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer"
                    >
                        {t('hero.cta.studies')}
                    </a>
                    <a
                        href="#contact"
                        aria-label={t('hero.cta.contact')}
                        className="w-full sm:w-auto text-center glass-button px-5 md:px-7 py-2.5 md:py-3 rounded-lg font-medium text-text-primary text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <span className="relative z-10">{t('hero.cta.contact')}</span>
                    </a>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-6 pt-4 md:mt-10 md:pt-6 border-t border-text-secondary/10 flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                    {['React', 'Node.js', 'PostgreSQL', 'TypeScript'].map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full border border-text-secondary/15 text-text-secondary font-mono text-[10px] md:text-xs tracking-wide bg-surface-lighter/30"
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
