import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ExternalLink, Server, Smartphone, Lock, Webhook, CloudLightning, Fingerprint, Mail, Layers, GitBranch, Eye, Play, Pause } from 'lucide-react';
import CheckoutFlowDiagram from './CheckoutFlowDiagram';
import VisuBookEcosystem from './VisuBookEcosystem';
import StorePreviewCarousel from './StorePreviewCarousel';
import ContactModal from '@/core/ui/ContactModal';
import { useScrollReveal } from '@/core/hooks/useScrollReveal';
import { useTranslation } from '@/core/hooks/useTranslation';
import { CASE_STUDIES } from '@/data/portfolioData';

const VIEW_ICONS = {
    architecture: Layers,
    flow: GitBranch,
    ecosystem: GitBranch,
    preview: Eye,
};

const AUTO_ADVANCE_MS = 5000;
const FLIP_HALF_MS = 350;

const StudiesSection = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [activeViews, setActiveViews] = useState({});
    const [flipStates, setFlipStates] = useState({});
    const [autoAdvance, setAutoAdvance] = useState(true);
    const { t } = useTranslation();

    const flippingRef = useRef({});
    const timersRef = useRef({});
    const pausedRef = useRef({});
    const isVisibleRef = useRef({});

    const study1 = useScrollReveal();
    const study2 = useScrollReveal();

    const getActiveView = useCallback((studyId) => {
        return activeViews[studyId] || 'architecture';
    }, [activeViews]);

    const triggerFlip = useCallback((studyId, targetView) => {
        if (flippingRef.current[studyId]) return;
        const current = activeViews[studyId] || 'architecture';
        if (current === targetView) return;

        flippingRef.current[studyId] = true;

        setFlipStates(prev => ({ ...prev, [studyId]: 'out' }));

        setTimeout(() => {
            setActiveViews(prev => ({ ...prev, [studyId]: targetView }));
            setFlipStates(prev => ({ ...prev, [studyId]: 'in' }));

            setTimeout(() => {
                setFlipStates(prev => ({ ...prev, [studyId]: null }));
                flippingRef.current[studyId] = false;
            }, FLIP_HALF_MS);
        }, FLIP_HALF_MS);
    }, [activeViews]);

    // Track which cards are physically in the viewport to prevent off-screen layout shifts
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id.replace('study-wrapper-', '');
                isVisibleRef.current[id] = entry.isIntersecting;
            });
        }, { threshold: 0.1 });

        // Small timeout to ensure DOM nodes are painted before observing
        const timeoutId = setTimeout(() => {
            CASE_STUDIES.forEach(study => {
                const el = document.getElementById(`study-wrapper-${study.id}`);
                if (el) observer.observe(el);
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, []);

    // Auto-advance with preview-aware timing and viewport awareness
    useEffect(() => {
        Object.values(timersRef.current).forEach(clearInterval);
        timersRef.current = {};

        if (!autoAdvance) return;

        CASE_STUDIES.forEach(study => {
            if (!study.views || study.views.length <= 1) return;

            const currentViewId = activeViews[study.id] || 'architecture';
            const isPreview = currentViewId === 'preview';
            const screenshotCount = study.screenshots?.length || 1;
            // Give preview enough time to cycle all screenshots
            const delay = isPreview ? AUTO_ADVANCE_MS * screenshotCount : AUTO_ADVANCE_MS;

            timersRef.current[study.id] = setInterval(() => {
                if (isVisibleRef.current[study.id] === false) return;
                if (pausedRef.current[study.id]) return;
                if (flippingRef.current[study.id]) return;

                const current = activeViews[study.id] || 'architecture';
                const currentIdx = study.views.findIndex(v => v.id === current);
                const nextIdx = (currentIdx + 1) % study.views.length;
                triggerFlip(study.id, study.views[nextIdx].id);
            }, delay);
        });

        return () => Object.values(timersRef.current).forEach(clearInterval);
    }, [activeViews, triggerFlip, autoAdvance]);

    const handleTabClick = useCallback((studyId, viewId) => {
        triggerFlip(studyId, viewId);
    }, [triggerFlip]);

    const handleMouseEnter = useCallback((studyId) => {
        pausedRef.current[studyId] = true;
    }, []);

    const handleMouseLeave = useCallback((studyId) => {
        pausedRef.current[studyId] = false;
    }, []);

    return (
        <section className="py-24 relative z-10 max-w-6xl mx-auto px-4 sm:px-6 space-y-32" id="studies">

            <div className="flex justify-end -mb-24">
                <button
                    onClick={() => setAutoAdvance(prev => !prev)}
                    className={`
                        group flex items-center gap-2 px-3 py-1.5 rounded-full
                        border transition-all duration-300 font-mono text-xs tracking-wide
                        ${autoAdvance
                            ? 'border-primary/30 bg-primary/5 text-primary hover:bg-primary/10'
                            : 'border-text-secondary/15 bg-surface-lighter/30 text-text-secondary hover:border-text-secondary/30'
                        }
                    `}
                    aria-label={autoAdvance ? 'Pause auto-advance' : 'Enable auto-advance'}
                >
                    {autoAdvance ? (
                        <><Pause size={12} className="fill-current" /> Auto</>
                    ) : (
                        <><Play size={12} className="fill-current" /> Manual</>
                    )}
                </button>
            </div>

            {CASE_STUDIES.map((study, index) => {
                const sectionReveal = index === 0 ? study1 : study2;
                const currentView = getActiveView(study.id);
                const flipState = flipStates[study.id];

                return (
                    <div id={`study-wrapper-${study.id}`} key={study.id} ref={sectionReveal.ref} className={sectionReveal.revealClass}>
                        <div className={`mb-16 ${study.reverseDesktop ? 'text-right flex flex-col items-end' : ''}`}>
                            <h2 className={`text-sm font-mono ${study.theme.primary} flex items-center ${study.reverseDesktop ? 'justify-end' : ''} gap-2 mb-2`}>
                                {!study.reverseDesktop && <span className="w-8 h-px bg-[currentColor]"></span>}
                                {t(study.type)}
                                {study.reverseDesktop && <span className="w-8 h-px bg-[currentColor]"></span>}
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
                                {t(study.title)} <span className={`text-transparent bg-clip-text bg-gradient-to-r ${study.theme.gradient}`}>{t(study.subtitle)}</span>
                            </h3>
                        </div>

                        <div className="p-[1px] rounded-2xl bg-gradient-to-b from-text-secondary/20 to-transparent group relative">
                            <div className={`absolute inset-0 bg-gradient-to-${study.reverseDesktop ? 'bl' : 'br'} from-${study.theme.border}/10 via-transparent to-transparent opacity-0 ${study.theme.bgHover} transition-opacity duration-700 rounded-2xl pointer-events-none`} />

                            <div className="relative bg-surface-lighter/80 backdrop-blur-md sm:backdrop-blur-xl border border-text-secondary/10 rounded-2xl p-5 sm:p-8 md:p-12 overflow-hidden shadow-2xl">

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                                    <div className={`flex flex-col justify-between ${study.reverseDesktop ? 'order-1 lg:order-2' : ''}`}>
                                        <div>
                                            <div className={`inline-flex px-3 py-1 rounded-full bg-[currentColor]/10 border border-[currentColor]/20 ${study.theme.primary} text-xs font-mono mb-6`}>
                                                {t(study.tags)}
                                            </div>

                                            {study.context.map((text, i) => (
                                                // TODO: [Tech Debt] Conscious use of dangerouslySetInnerHTML to render basic HTML tags (<strong>, etc.) from static translation files.
                                                // Safe here because translations are tightly controlled, but should be replaced with MDX or a parser if we ever accept dynamic input.
                                                <p key={i} className={`text-${i === 0 ? 'lg' : 'md'} text-text-secondary leading-relaxed mb-${i === 0 ? '6' : '4'} ${i === 0 ? 'font-sans' : ''}`} dangerouslySetInnerHTML={{ __html: t(text) }} />
                                            ))}

                                            {study.notice && (
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-surface/80 border border-text-secondary/10 text-xs font-mono text-text-secondary mb-8">
                                                    <study.notice.icon size={18} className={`shrink-0 ${study.notice.colorClass}`} />
                                                    <span>{t(study.notice.text)}</span>
                                                </div>
                                            )}

                                            <div className="space-y-4 mb-8">
                                                <h4 className="text-sm font-mono text-text-primary uppercase tracking-wider mb-2">{t(study.integrationsTitle)}</h4>

                                                {study.integrations.map((integration) => (
                                                    <div key={integration.id} className="flex items-start gap-4">
                                                        <div className="p-2 rounded bg-surface border border-text-secondary/10 shrink-0">
                                                            <integration.Icon size={18} className={integration.iconColor} />
                                                        </div>
                                                        <div>
                                                            <h5 className="text-text-primary font-medium text-sm">{t(integration.title)}</h5>
                                                            <p className="text-sm text-text-secondary mt-1">{t(integration.description)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 mt-8">
                                            <a href={study.ctaPrimary.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-text-primary hover:bg-white text-surface transition-colors font-medium text-sm">
                                                <ExternalLink size={16} /> {t(study.ctaPrimary.text)}
                                            </a>
                                        </div>
                                    </div>

                                    <div
                                        className={`relative flex flex-col ${study.reverseDesktop ? 'order-2 lg:order-1' : ''}`}
                                        onMouseEnter={() => handleMouseEnter(study.id)}
                                        onMouseLeave={() => handleMouseLeave(study.id)}
                                    >

                                        {study.views && study.views.length > 1 && (
                                            <div className="flex items-center gap-1 p-1 rounded-xl bg-surface/60 border border-text-secondary/10 mb-6">
                                                {study.views.map(view => {
                                                    const Icon = VIEW_ICONS[view.id];
                                                    const isActive = currentView === view.id;
                                                    return (
                                                        <button
                                                            key={view.id}
                                                            onClick={() => handleTabClick(study.id, view.id)}
                                                            className={`flex-1 flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${isActive
                                                                    ? `bg-surface-lighter border border-text-secondary/15 ${study.theme.primary} shadow-sm`
                                                                    : 'text-text-secondary hover:text-text-primary border border-transparent'
                                                                }`}
                                                        >
                                                            {Icon && <Icon size={13} />}
                                                            <span className="hidden sm:inline">{t(view.label)}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        <div style={{ perspective: '1200px' }} className="min-h-[480px] sm:min-h-[500px] lg:min-h-[520px] w-full flex flex-col justify-center">
                                            <div className={`transform-gpu ${flipState === 'out' ? 'study-flip-out' :
                                                    flipState === 'in' ? 'study-flip-in' : ''
                                                }`}>

                                                {currentView === 'architecture' && (
                                                    <>
                                                        <h4 className="text-sm font-mono text-text-primary uppercase tracking-wider mb-6 text-center">{t('studies.topology')}</h4>

                                                        <div className="space-y-6 relative">
                                                            <div className="absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-text-secondary/30 to-transparent -translate-x-1/2 hidden md:block" />

                                                            {study.layers.map((layer, i) => (
                                                                <React.Fragment key={layer.id}>
                                                                    <div className="relative group/layer">
                                                                        <div className={`absolute inset-0 bg-gradient-to-r ${layer.blurColor} rounded-xl blur-xl transition-all duration-300 group-hover/layer:blur-2xl opacity-50`} />
                                                                        <div className={`glass-panel p-5 rounded-xl border border-text-secondary/10 relative z-10 flex items-center justify-between transition-colors ${layer.hoverBorder}`}>
                                                                            <div className="flex items-center gap-4">
                                                                                <div className="p-3 bg-surface rounded-lg">
                                                                                    <layer.Icon className={layer.iconColor} />
                                                                                </div>
                                                                                <div>
                                                                                    <div className="font-mono text-xs text-text-secondary mb-1">{t(layer.title)}</div>
                                                                                    <div className="text-text-primary font-medium">{t(layer.tech)}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right hidden sm:block">
                                                                                <div className="text-xs text-text-secondary">{t(layer.sideLabel)}</div>
                                                                                <div className="font-mono text-sm text-text-primary">{t(layer.sideValue)}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {i < study.layers.length - 1 && (
                                                                        <div className="flex justify-center text-text-secondary/50">
                                                                            <div className="h-6 w-px bg-text-secondary/30" />
                                                                        </div>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}
                                                        </div>

                                                        <div className="mt-8 p-4 rounded-lg bg-surface/50 border border-text-secondary/10 flex items-start gap-3">
                                                            <study.topologyNoteIcon className={`${study.topologyNoteColor} shrink-0 mt-0.5`} size={16} />
                                                            <p className="text-xs text-text-secondary leading-relaxed font-mono">
                                                                {t(study.topologyNote)}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}

                                                {currentView === 'flow' && (
                                                    <CheckoutFlowDiagram />
                                                )}

                                                {currentView === 'ecosystem' && (
                                                    <VisuBookEcosystem />
                                                )}

                                                {currentView === 'preview' && (
                                                    <div className="w-full rounded-xl overflow-hidden border border-text-secondary/10 bg-surface flex flex-col shadow-2xl">
                                                        <div className="flex-1 relative flex justify-center">
                                                            {study.screenshots ? (
                                                                <StorePreviewCarousel screenshots={study.screenshots} isMobile={study.id === 'visubook'} />
                                                            ) : study.previewImage ? (
                                                                <img
                                                                    src={study.previewImage.url}
                                                                    alt={study.previewImage.alt || 'App Preview'}
                                                                    className="w-full h-full object-cover"
                                                                    loading="lazy"
                                                                />
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-12 pt-8 border-t border-text-secondary/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface/30 p-6 rounded-xl border border-text-secondary/5">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 sm:p-3 ${study.bannerBg} rounded-full ${study.bannerIconColor}`}>
                                            <study.bannerIcon size={20} />
                                        </div>
                                        <p className="text-text-primary font-medium text-sm md:text-base">
                                            {t(study.bannerText)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsContactModalOpen(true)}
                                        className={`w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg glass-button font-medium text-text-primary text-sm transition-colors border border-text-secondary/20 ${study.bannerButtonHover}`}
                                    >
                                        <Mail size={16} /> {t('studies.talk')}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                );
            })}

            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

        </section>
    );
};

export default StudiesSection;
