import React from 'react';
import {
    User, ShoppingCart, CreditCard, Webhook,
    ShieldCheck, PackageMinus, CheckCircle2
} from 'lucide-react';

const FLOW_STEPS = [
    {
        phase: 'Client-Side',
        phaseColor: { text: 'text-cyan-400/70', line: 'bg-cyan-400/20' },
        icon: User,
        title: 'Cliente',
        detail: 'Navega el catálogo',
        techBadge: 'React SPA',
        colors: { dot: 'bg-cyan-400', shadow: 'shadow-cyan-400/30', icon: 'text-cyan-400', border: 'border-cyan-400/20' },
    },
    {
        icon: ShoppingCart,
        title: 'Carrito',
        detail: 'Selecciona productos',
        techBadge: 'Session + API',
        colors: { dot: 'bg-cyan-400', shadow: 'shadow-cyan-400/30', icon: 'text-cyan-400', border: 'border-cyan-400/20' },
    },
    {
        icon: CreditCard,
        title: 'Checkout Pro',
        detail: 'Redirect al SDK de MP',
        techBadge: 'Server-Side SDK',
        colors: { dot: 'bg-cyan-400', shadow: 'shadow-cyan-400/30', icon: 'text-cyan-400', border: 'border-cyan-400/20' },
    },
    {
        phase: 'Payment Gateway',
        phaseColor: { text: 'text-amber-500/70', line: 'bg-amber-500/20' },
        icon: Webhook,
        title: 'Webhook IPN',
        detail: 'Notificación asíncrona de pago',
        techBadge: 'POST /webhooks',
        colors: { dot: 'bg-amber-500', shadow: 'shadow-amber-500/30', icon: 'text-amber-500', border: 'border-amber-500/20' },
    },
    {
        phase: 'Server-Side',
        phaseColor: { text: 'text-blue-500/70', line: 'bg-blue-500/20' },
        icon: ShieldCheck,
        title: 'Idempotencia',
        detail: 'Verifica pago duplicado',
        techBadge: 'payment_id check',
        colors: { dot: 'bg-blue-500', shadow: 'shadow-blue-500/30', icon: 'text-blue-500', border: 'border-blue-500/20' },
    },
    {
        icon: PackageMinus,
        title: 'Stock −1',
        detail: 'Descuento automático de inventario',
        techBadge: 'SQL Transaction',
        colors: { dot: 'bg-blue-500', shadow: 'shadow-blue-500/30', icon: 'text-blue-500', border: 'border-blue-500/20' },
    },
    {
        phase: 'Resultado',
        phaseColor: { text: 'text-emerald-500/70', line: 'bg-emerald-500/20' },
        icon: CheckCircle2,
        title: 'Orden Confirmada',
        detail: 'Status: approved',
        techBadge: 'HTTP 200',
        colors: { dot: 'bg-emerald-500', shadow: 'shadow-emerald-500/30', icon: 'text-emerald-500', border: 'border-emerald-500/20' },
        isLast: true,
    },
];

import { useTranslation } from '@/core/hooks/useTranslation';

const CheckoutFlowDiagram = () => {
    const { t } = useTranslation();
    return (
        <div className="h-full flex flex-col p-3 sm:p-4 overflow-y-auto checkout-flow-container">
            <h4 className="text-sm font-mono text-text-primary uppercase tracking-wider mb-3 text-center">
                {t('Flujo de Checkout · Mercado Pago')}
            </h4>

            <div className="relative flex-1">
                {/* Main timeline vertical line */}
                <div
                    className="absolute top-1 bottom-1 w-px bg-gradient-to-b from-cyan-400/25 via-amber-500/25 via-blue-500/25 to-emerald-500/25"
                    style={{ left: '15px' }}
                />

                {/* Animated pulse traveling down the line */}
                <div
                    className="absolute top-0 bottom-0 w-px overflow-hidden"
                    style={{ left: '15px' }}
                >
                    <div className="checkout-flow-particle" />
                </div>

                <div className="space-y-0.5">
                    {FLOW_STEPS.map((step, i) => (
                        <React.Fragment key={i}>
                            {/* Phase Label */}
                            {step.phase && (
                                <div className={`flex items-center gap-2 ${i > 0 ? 'pt-2 pb-0.5' : 'pb-0.5'}`}>
                                    <div className={`w-[31px] h-px ${step.phaseColor.line} shrink-0`} />
                                    <span className={`text-[10px] font-mono uppercase tracking-[0.15em] ${step.phaseColor.text} whitespace-nowrap`}>
                                        {t(step.phase)}
                                    </span>
                                    <div className={`flex-1 h-px ${step.phaseColor.line}`} />
                                </div>
                            )}

                            {/* Step Row */}
                            <div className="relative flex items-center gap-3 group/step py-1">
                                {/* Timeline Dot */}
                                <div className="relative z-10 shrink-0 w-[31px] flex items-center justify-center">
                                    <div className={`w-2.5 h-2.5 rounded-full ${step.colors.dot} ${step.colors.shadow} shadow-lg ring-[3px] ring-surface transition-all duration-300 group-hover/step:scale-125`} />
                                </div>

                                {/* Step Card */}
                                <div className={`flex-1 flex items-center gap-3 p-2 sm:p-2.5 rounded-lg bg-surface/50 border ${step.colors.border} hover:bg-surface/80 transition-all duration-300 cursor-default`}>
                                    <div className={`p-1.5 rounded-md bg-surface-lighter/80 shrink-0 ${step.colors.icon}`}>
                                        <step.icon size={14} strokeWidth={2} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <span className="text-text-primary font-medium text-sm block leading-tight">
                                            {t(step.title)}
                                        </span>
                                        <span className="text-[11px] text-text-secondary leading-tight">
                                            {t(step.detail)}
                                        </span>
                                    </div>

                                    <span className="text-[9px] font-mono text-text-secondary/50 bg-surface-lighter/60 px-2 py-0.5 rounded border border-text-secondary/5 hidden sm:inline-block whitespace-nowrap">
                                        {step.techBadge}
                                    </span>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckoutFlowDiagram;
