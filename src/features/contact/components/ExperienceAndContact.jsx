import React, { useState } from 'react';
import { Mail, Github, Linkedin, Download, Briefcase, GraduationCap, Code2, Layers, Server, Database, FileText, Globe } from 'lucide-react';
import Modal from '@/core/ui/Modal';
import ContactModal from '@/core/ui/ContactModal';
import TechIcon from '@/core/ui/TechIcon';
import { useScrollReveal } from '@/core/hooks/useScrollReveal';
import { useTranslation } from '@/core/hooks/useTranslation';
import { SOCIAL_LINKS, CV_URLS } from '@/core/config/constants';
import { EXPERIENCE, EDUCATION, TECH_STACK } from '@/data/portfolioData';

const ExperienceAndContact = () => {
    const [isCvModalOpen, setIsCvModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const { t } = useTranslation();
    const section = useScrollReveal({ threshold: 0.05 });

    return (
        <section ref={section.ref} className={`py-32 relative z-10 max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden ${section.revealClass}`} id="experience-contact">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

                {/* Left Column: Timeline (Experience & Education) */}
                <div className="lg:col-span-5 flex flex-col gap-12">

                    {/* Experience Timeline */}
                    <div>
                        <h3 className="text-xl font-mono text-text-primary flex items-center gap-3 mb-8">
                            <Briefcase className="text-primary" size={24} />
                            <span>{t('experience.title')}</span>
                        </h3>

                        <div className="relative pl-8 border-l border-text-secondary/20 space-y-10">
                            {EXPERIENCE.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className={`absolute -left-[41px] bg-surface p-1 rounded-full border ${exp.isCurrent ? 'border-primary text-primary' : 'border-text-secondary/50'}`}>
                                        <div className={`w-2 h-2 rounded-full ${exp.isCurrent ? 'bg-primary animate-pulse' : 'bg-text-secondary/50'}`} />
                                    </div>
                                    <div className="text-sm font-mono text-text-secondary mb-1">{t(exp.period)}</div>
                                    <h4 className="text-lg font-bold text-text-primary">{t(exp.title)}</h4>
                                    <div className="text-primary text-sm font-medium mb-3">{t(exp.subtitle)}</div>
                                    <p className="text-sm text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: t(exp.description) }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education Timeline */}
                    <div>
                        <h3 className="text-xl font-mono text-text-primary flex items-center gap-3 mb-8">
                            <GraduationCap className="text-[#8b5cf6]" size={24} />
                            <span>{t('education.title')}</span>
                        </h3>

                        <div className="relative pl-8 border-l border-text-secondary/20 space-y-10">
                            {EDUCATION.map((edu) => (
                                <div key={edu.id} className="relative">
                                    <div className={`absolute -left-[41px] bg-surface p-1 rounded-full border ${edu.isCurrent ? 'border-[#8b5cf6]' : 'border-text-secondary/50'}`}>
                                        <div className={`w-2 h-2 rounded-full ${edu.isCurrent ? 'bg-[#8b5cf6] animate-pulse' : 'bg-text-secondary/50'}`} />
                                    </div>
                                    <div className="text-sm font-mono text-text-secondary mb-1">{t(edu.period)}</div>
                                    <h4 className={`text-lg font-bold text-text-primary ${!edu.isCurrent ? 'text-opacity-80' : ''}`}>{t(edu.title)}</h4>
                                    <div className={`${edu.isCurrent ? 'text-[#8b5cf6]' : 'text-text-secondary'} text-sm font-medium`}>{t(edu.institution)}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Architectural Stack & Contact */}
                <div className="lg:col-span-7 flex flex-col gap-16 lg:pl-12">

                    {/* Stack Grid */}
                    <div>
                        <h3 className="text-xl font-mono text-text-primary flex items-center gap-3 mb-8">
                            <Layers className="text-amber-500" size={24} />
                            <span>{t('stack.title')}</span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {TECH_STACK.map((stack) => {
                                const Icon = stack.Icon;
                                return (
                                    <div key={stack.id} className={`glass-panel p-5 rounded-xl border border-text-secondary/10 transition-colors group ${stack.themeClasses.borderGroupHover}`}>
                                        <div className="flex items-center gap-3 mb-3 text-text-primary">
                                            <Icon className={stack.themeClasses.text} size={18} />
                                            <h4 className="font-medium text-sm">{stack.title}</h4>
                                        </div>
                                        <div className="text-sm text-text-secondary font-mono leading-relaxed flex flex-wrap gap-x-2 gap-y-2 items-center">
                                            {stack.items.map((item, index) => (
                                                <div key={index} className="flex items-center group/item cursor-default">
                                                    <TechIcon slug={item.slug} name={item.name} />
                                                    <span className={`transition-colors ${stack.themeClasses.textHover} group-hover/item:text-text-primary`}>
                                                        {item.name}
                                                    </span>
                                                    {index < stack.items.length - 1 && <span className="text-text-secondary/30 ml-2">·</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contact Terminal / CTA */}
                    <div id="contact" className="relative group mt-auto">
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/30 via-indigo-900/40 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition duration-1000 group-hover:duration-500" />

                        <div className="relative bg-[#0b1121]/80 backdrop-blur-2xl border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-3xl p-8 sm:p-10 text-center flex flex-col items-center">

                            {/* Trust avatar */}
                            <div className="w-24 h-24 mb-6 rounded-full border border-white/10 overflow-hidden bg-surface-lighter flex items-center justify-center shadow-2xl grayscale hover:grayscale-0 transition-all duration-500">
                                <img src="/avatar.webp" alt="Benjamín Ayala" className="w-full h-full object-cover scale-[1.12] translate-x-[3px] translate-y-[2px]" />
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">{t('contact.title')}</h2>
                            <p className="text-text-secondary text-sm sm:text-base max-w-md mx-auto mb-8 font-mono">
                                {t('contact.subtitle')}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
                                <button
                                    onClick={() => setIsContactModalOpen(true)}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary hover:bg-primary-glow text-white font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                                >
                                    <Mail size={18} /> {t('contact.cta')}
                                </button>

                                <button
                                    onClick={() => setIsCvModalOpen(true)}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg glass-button text-text-primary font-medium hover:text-primary transition-colors border border-text-secondary/20"
                                >
                                    <Download size={18} /> {t('contact.cv')}
                                </button>
                            </div>

                            {/* Minimalist Social Links */}
                            <div className="flex items-center justify-center gap-8 pt-6 border-t border-text-secondary/10 w-full">
                                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-white transition-colors flex items-center gap-2 group">
                                    <Github size={20} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-mono hidden sm:inline-block">/benjaminayala0</span>
                                </a>
                                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-[#0a66c2] transition-colors flex items-center gap-2 group">
                                    <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-mono hidden sm:inline-block">/benjamínayala</span>
                                </a>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            {/* Modals outside the grid layout but inside Section */}

            {/* CV Modal */}
            <Modal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} title={t('contact.cv.modal.title')}>
                <div className="flex flex-col gap-4">
                    <a
                        href={CV_URLS.es}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-between p-4 rounded-xl border border-text-secondary/20 hover:border-primary/50 bg-surface hover:bg-surface-lighter transition-all group"
                        onClick={() => setIsCvModalOpen(false)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <FileText size={20} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors">{t('contact.cv.es')}</h4>
                                <p className="text-xs text-text-secondary">{t('contact.cv.es.sub')}</p>
                            </div>
                        </div>
                        <Download size={18} className="text-text-secondary group-hover:text-primary" />
                    </a>

                    <a
                        href={CV_URLS.en}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-between p-4 rounded-xl border border-text-secondary/20 hover:border-primary/50 bg-surface hover:bg-surface-lighter transition-all group"
                        onClick={() => setIsCvModalOpen(false)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#8b5cf6]/10 rounded-lg text-[#8b5cf6]">
                                <Globe size={20} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-medium text-text-primary group-hover:text-[#8b5cf6] transition-colors">{t('contact.cv.en')}</h4>
                                <p className="text-xs text-text-secondary">{t('contact.cv.en.sub')}</p>
                            </div>
                        </div>
                        <Download size={18} className="text-text-secondary group-hover:text-[#8b5cf6]" />
                    </a>
                </div>
            </Modal>

            {/* Contact Modal */}
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

        </section>
    );
};

export default ExperienceAndContact;
