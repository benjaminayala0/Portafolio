import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const LanguageContext = createContext({ lang: 'es', setLang: () => {} });

export const LanguageProvider = ({ children }) => {
    const [lang, setLangState] = useState(() => {
        try { return localStorage.getItem('portfolio-lang') || 'es'; }
        catch { return 'es'; }
    });

    const setLang = useCallback((newLang) => {
        setLangState(newLang);
        try { localStorage.setItem('portfolio-lang', newLang); } catch {}
        document.documentElement.lang = newLang;
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
