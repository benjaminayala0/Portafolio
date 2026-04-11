import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Send, Loader2 } from 'lucide-react';
import Modal from '@/core/ui/Modal';
import { CONTACT_INFO } from '@/core/config/constants';
import { useTranslation } from '@/core/hooks/useTranslation';

const API_ENDPOINT = '/api/send-email';

const ContactModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(CONTACT_INFO.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleChange = (e) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setError(null);

        try {
            const res = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formState),
            });

            if (res.ok) {
                setSent(true);
                setFormState({ name: '', email: '', message: '' });
            } else {
                const data = await res.json();
                setError(data.error || t('contact.modal.error'));
            }
        } catch {
            setError(t('contact.modal.error'));
        } finally {
            setSending(false);
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setSent(false);
            setError(null);
        }, 300);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={t('contact.modal.title')}>
            <div className="flex flex-col gap-5">

                {sent ? (
                    <div className="text-center py-6">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                            <Check size={28} className="text-emerald-400" />
                        </div>
                        <h3 className="text-text-primary font-bold text-lg mb-2">{t('contact.modal.sent.title')}</h3>
                        <p className="text-text-secondary text-sm font-mono">{t('contact.modal.sent.sub')}</p>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-1.5 block">{t('contact.modal.name')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formState.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-text-secondary/20 text-text-primary font-mono text-sm focus:border-primary/50 focus:outline-none transition-colors placeholder:text-text-secondary/30"
                                    placeholder={t('contact.modal.name.placeholder')}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-1.5 block">{t('contact.modal.email')}</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formState.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-text-secondary/20 text-text-primary font-mono text-sm focus:border-primary/50 focus:outline-none transition-colors placeholder:text-text-secondary/30"
                                    placeholder={t('contact.modal.email.placeholder')}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-1.5 block">{t('contact.modal.message')}</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-text-secondary/20 text-text-primary font-mono text-sm focus:border-primary/50 focus:outline-none transition-colors resize-none placeholder:text-text-secondary/30"
                                    placeholder={t('contact.modal.message.placeholder')}
                                />
                            </div>

                            {error && (
                                <p className="text-xs text-red-400 font-mono">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-primary hover:bg-primary-glow text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sending ? (
                                    <><Loader2 size={18} className="animate-spin" /> {t('contact.modal.sending')}</>
                                ) : (
                                    <><Send size={18} /> {t('contact.modal.send')}</>
                                )}
                            </button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-text-secondary/10" /></div>
                            <div className="relative flex justify-center"><span className="bg-surface-lighter px-3 text-[10px] font-mono text-text-secondary/50 uppercase">{t('contact.modal.or')}</span></div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleCopyEmail}
                                className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border border-text-secondary/20 hover:bg-surface text-text-secondary hover:text-text-primary font-mono text-xs transition-colors"
                            >
                                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                {copied ? t('contact.modal.copied') : t('contact.modal.copy')}
                            </button>
                            <button
                                onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_INFO.email}&su=${encodeURIComponent(CONTACT_INFO.subject)}`, '_blank')}
                                className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border border-text-secondary/20 hover:bg-surface text-text-secondary hover:text-text-primary font-mono text-xs transition-colors"
                            >
                                <ExternalLink size={14} /> {t('contact.modal.mailto')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default ContactModal;
