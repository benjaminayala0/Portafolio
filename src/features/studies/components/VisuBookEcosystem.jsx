import React from 'react';
import { LayoutDashboard, Workflow, HardDrive, ImagePlus, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

const FLOW_NODES = [
    {
        id: 'app',
        label: 'App Mobile',
        tech: 'React Native · Expo Router',
        Icon: LayoutDashboard,
        color: 'text-fuchsia-400',
        borderColor: 'border-fuchsia-500/30',
        glowColor: 'from-fuchsia-500/15',
        features: ['UI Nativa', 'Push Alerts', 'Offline Cache'],
    },
    {
        id: 'api',
        label: 'API Gateway',
        tech: 'Node.js · Express (MVC)',
        Icon: Workflow,
        color: 'text-blue-400',
        borderColor: 'border-blue-500/30',
        glowColor: 'from-blue-500/15',
        features: ['JWT Auth', 'Feature Gating', 'Rate Limiting'],
    },
    {
        id: 'data',
        label: 'Persistencia',
        tech: 'PostgreSQL · Sequelize',
        Icon: HardDrive,
        color: 'text-amber-400',
        borderColor: 'border-amber-500/30',
        glowColor: 'from-amber-500/15',
        features: ['Multi-tenant', 'Relacional', 'Transacciones'],
    },
];

const SERVICES = [
    { label: 'Cloudinary', desc: 'Fotos Antes/Después', Icon: ImagePlus, color: 'text-violet-400' },
    { label: 'WhatsApp', desc: 'Recordatorios 1-tap', Icon: MessageSquare, color: 'text-emerald-400' },
    { label: 'Helmet + Bcrypt', desc: 'Seguridad Endpoint', Icon: ShieldCheck, color: 'text-rose-400' },
];

import { useTranslation } from '@/core/hooks/useTranslation';

const VisuBookEcosystem = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-6">
            <h4 className="text-sm font-mono text-text-primary uppercase tracking-wider mb-4 text-center">
                {t('studies.ecosystem')}
            </h4>

            <div className="space-y-3">
                {FLOW_NODES.map((node, i) => (
                    <React.Fragment key={node.id}>
                        <div className={`relative group/node rounded-xl border ${node.borderColor} bg-surface/60 p-4 transition-all hover:bg-surface-lighter/40`}>
                            <div className={`absolute inset-0 bg-gradient-to-r ${node.glowColor} to-transparent rounded-xl opacity-0 group-hover/node:opacity-100 transition-opacity duration-500`} />
                            <div className="relative z-10 flex items-start gap-4">
                                <div className="p-2.5 bg-surface rounded-lg border border-text-secondary/10 shrink-0">
                                    <node.Icon className={node.color} size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 mb-1.5">
                                        <span className="text-text-primary font-medium text-sm">{t(node.label)}</span>
                                        <span className="text-text-secondary/60 font-mono text-[10px] sm:truncate">{node.tech}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {node.features.map(f => (
                                            <span key={f} className="px-2 py-0.5 text-[10px] font-mono rounded bg-surface border border-text-secondary/10 text-text-secondary">
                                                {t(f)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {i < FLOW_NODES.length - 1 && (
                            <div className="flex justify-center">
                                <ArrowRight size={14} className="text-text-secondary/30 rotate-90" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-text-secondary/10">
                <p className="text-[10px] font-mono text-text-secondary/60 uppercase tracking-wider mb-3 text-center">{t('studies.ecosystem.ext')}</p>
                <div className="grid grid-cols-3 gap-2">
                    {SERVICES.map(svc => (
                        <div key={svc.label} className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-surface/40 border border-text-secondary/8 text-center">
                            <svc.Icon size={16} className={svc.color} />
                            <span className="text-[11px] font-medium text-text-primary">{t(svc.label)}</span>
                            <span className="text-[9px] text-text-secondary font-mono leading-tight">{t(svc.desc)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VisuBookEcosystem;
