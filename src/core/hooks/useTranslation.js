import { useCallback } from 'react';
import { useLanguage } from '@/core/context/LanguageContext';
import es from '@/translations/es';
import en from '@/translations/en';

const dictionaries = { es, en };

export const useTranslation = () => {
    const { lang } = useLanguage();

    const t = useCallback((key) => {
        return dictionaries[lang]?.[key] || dictionaries.es[key] || key;
    }, [lang]);

    return { t, lang };
};
