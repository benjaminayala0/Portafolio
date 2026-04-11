import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/core/hooks/useTranslation';

/** @param {{ variants: import("framer-motion").Variants, className?: string }} props */
export const AvailabilityBadge = ({ variants, className = '' }) => {
    const { t, lang } = useTranslation();
    const date = new Date();
    const locale = lang === 'en' ? 'en-US' : 'es-AR';
    let formattedDate = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(date);
    formattedDate = formattedDate.replace(' de ', ' ');
    const displayDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1) + ".";

    return (
        <motion.div
            variants={variants}
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-xs font-mono shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-emerald-500/20 ${className}`}
        >
            <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-400">{t('availability.status')}</span>
            <span className="text-text-secondary/30" aria-hidden="true">·</span>
            <span className="text-text-secondary">{displayDate}</span>
        </motion.div>
    );
};
