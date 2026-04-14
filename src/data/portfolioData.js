import { Code2, Server, ShoppingBag, Monitor, Database, Plug, Layers, ExternalLink, Smartphone, Lock, Webhook, CloudLightning, Fingerprint, CreditCard, UserCheck, CalendarClock, Gem, BellRing, Camera, Activity, Timer, Rocket } from 'lucide-react';

export const EXPERIENCE = [
    {
        id: 'freelance-erp',
        period: 'Dic. 2025 - Presente',
        title: 'Desarrollador Full Stack Mobile',
        subtitle: 'Freelance (Plataforma SaaS Booking & CRM)',
        description: 'Arquitecté y desarrollé una <strong>plataforma móvil SaaS de Booking & CRM</strong> multiplataforma con <strong>React Native (Expo)</strong> y <strong>TypeScript</strong>. Diseñé una <strong>API RESTful</strong> con Node.js/Express conectada a un esquema normalizado en <strong>PostgreSQL (Sequelize)</strong>, implementando <strong>JWT con Refresh Tokens</strong>, Feature Gating (Freemium) y pagos con <strong>Mercado Pago</strong>.',
        isCurrent: true
    },
    {
        id: 'mate-unico',
        period: 'Ago. 2025 - Dic. 2025',
        title: 'Desarrollador Full Stack',
        subtitle: 'Proyecto Final de Grado ("Mate Único")',
        description: 'Implementé una <strong>arquitectura Headless</strong> separando Frontend de Backend. Integré ecosistemas robustos como <strong>Mercado Pago</strong> (Webhooks), <strong>Google OAuth</strong> y <strong>Cloudinary</strong>, coordinando el ciclo de vida mediante Git/GitHub.',
        isCurrent: false
    }
];

export const EDUCATION = [
    {
        id: 'licenciatura',
        period: 'Feb. 2023 – Dic. 2027 (Esp.)',
        title: 'Licenciatura en Sistemas de Información',
        institution: 'UADER - Fac. de Ciencia y Tecnología',
        isCurrent: true
    },
    {
        id: 'analista',
        period: 'Titulación Dic. 2025',
        title: 'Analista de Sistemas',
        institution: 'UADER',
        isCurrent: false
    }
];

export const TECH_STACK = [
    {
        id: 'frontend',
        title: 'Presentación (Client)',
        Icon: Code2,
        themeClasses: {
            text: 'text-cyan-400',
            borderGroupHover: 'hover:border-cyan-500/30',
            textHover: 'hover:text-cyan-400'
        },
        items: [
            { name: 'React', slug: 'react' },
            { name: 'React Native', slug: 'react' },
            { name: 'Expo', slug: 'expo' },
            { name: 'Vite', slug: 'vite' },
            { name: 'TailwindCSS', slug: 'tailwindcss' }
        ]
    },
    {
        id: 'backend',
        title: 'Lógica & Backend',
        Icon: Server,
        themeClasses: {
            text: 'text-blue-500',
            borderGroupHover: 'hover:border-blue-500/30',
            textHover: 'hover:text-blue-400'
        },
        items: [
            { name: 'Node.js', slug: 'nodedotjs' },
            { name: 'Express', slug: 'express' },
            { name: 'TypeScript', slug: 'typescript' },
            { name: 'REST APIs', slug: 'json' },
            { name: 'Strapi', slug: 'strapi' },
            { name: 'Sequelize', slug: 'sequelize' }
        ]
    },
    {
        id: 'data-infra',
        title: 'Datos & Infraestructura',
        Icon: Database,
        themeClasses: {
            text: 'text-emerald-500',
            borderGroupHover: 'hover:border-emerald-500/30',
            textHover: 'hover:text-emerald-400'
        },
        items: [
            { name: 'PostgreSQL', slug: 'postgresql' },
            { name: 'Cloudinary', slug: 'cloudinary' },
            { name: 'Supabase', slug: 'supabase' },
            { name: 'Docker', slug: 'docker' },
            { name: 'Render', slug: 'render' },
            { name: 'Vercel', slug: 'vercel' },
            { name: 'Fly.io', slug: 'fly.io' }
        ]
    },
    {
        id: 'core-skills',
        title: 'Integraciones & Herramientas',
        Icon: Plug,
        themeClasses: {
            text: 'text-fuchsia-500',
            borderGroupHover: 'hover:border-fuchsia-500/30',
            textHover: 'hover:text-fuchsia-400'
        },
        items: [
            { name: 'Mercado Pago', slug: 'mercadopago' },
            { name: 'Google OAuth', slug: 'google' },
            { name: 'JWT Auth', slug: 'jsonwebtokens' },
            { name: 'Postman', slug: 'postman' },
            { name: 'Git/GitHub', slug: 'github' },
            { name: 'Arquitectura UML', slug: 'diagramsdotnet' },
            { name: 'Figma', slug: 'figma' }
        ]
    }
];

export const CASE_STUDIES = [
    {
        id: 'mate-unico',
        type: '01. Arquitectura en Producción',
        title: 'Mate Único:',
        subtitle: 'E-commerce Headless',
        theme: {
            primary: 'text-[#D4A373]',
            gradient: 'from-[#D4A373] to-[#D4A373]',
            border: 'border-[#D4A373]',
            bgHover: 'group-hover:bg-[#D4A373]/5',
            hoverBorder: 'hover:border-[#D4A373]/50'
        },
        tags: 'Retail & Fintech',
        context: [
            'Mate Único vendía por mensaje, manejaba el stock de memoria y perdía pedidos fuera de horario. El objetivo era simple, que la tienda funcione sola las 24 horas, sin que el dueño tenga que estar pendiente del teléfono para vender.',
            'El desarrollo se organizó en fases con Kanban sobre GitHub Projects, priorizando requerimientos con MoSCoW y validando cada endpoint de la API mediante pruebas funcionales con Postman sobre los flujos críticos de checkout, autenticación y carrito.'
        ],
        notice: {
            icon: Activity,
            text: 'Demo alojada en infraestructura Free-Tier (Render + Vercel). Incluye health-check automático para mitigar cold-starts.',
            colorClass: 'text-amber-500'
        },
        integrationsTitle: 'Integraciones Críticas Resolutivas',
        integrations: [
            {
                id: 'mercadopago',
                title: 'Mercado Pago Checkout Pro & Webhooks',
                description: 'Flujo de pago completo con Checkout Pro (server-side) y procesamiento automático vía webhooks, incluyendo verificaciones de idempotencia para evitar el doble procesamiento de órdenes y descuento automático de inventario.',
                Icon: CreditCard,
                iconColor: 'text-cyan-400'
            },
            {
                id: 'auth',
                title: 'Auth Delegada & Caché Inteligente',
                description: 'Login con Google OAuth 2.0 y sesiones stateless vía JWT. El catálogo se sirve desde caché en memoria (Node-Cache) para acelerar la carga sin consultas repetidas a la base de datos.',
                Icon: UserCheck,
                iconColor: 'text-orange-400'
            }
        ],
        ctaPrimary: {
            text: 'Ver Plataforma Live',
            link: 'https://propio-mate-store-7rcf.vercel.app/'
        },
        views: [
            { id: 'architecture', label: 'Arquitectura' },
            { id: 'flow', label: 'Flujo de Pago' },
            { id: 'preview', label: 'Vista Previa' },
        ],
        screenshots: [
            { src: '/screenshots/mate-unico/home.webp', alt: 'Home — Catálogo de productos' },
            { src: '/screenshots/mate-unico/product.png', alt: 'Detalle — Mate Torpedo Uruguayo' },
            { src: '/screenshots/mate-unico/cart.png', alt: 'Carrito — Flujo de compra' },
        ],
        topologyNote: '(+) El desacoplamiento entre servicios garantiza que la caída del frontend no interrumpa el procesamiento de webhooks de pago, y que la indisponibilidad temporal del CMS sea mitigada por la capa de caché en memoria.',
        topologyNoteIcon: Timer,
        topologyNoteColor: 'text-amber-500',
        bannerText: '¿Necesitás una solución E-commerce / Headless similar para tu empresa?',
        bannerIcon: ShoppingBag,
        bannerBg: 'bg-[#D4A373]/10',
        bannerIconColor: 'text-[#D4A373]',
        bannerButtonHover: 'hover:text-[#D4A373]',
        reverseDesktop: false,
        layers: [
            {
                id: 'layer1',
                title: 'Capa de Presentación (Edge)',
                tech: 'React + Vite SPA',
                sideLabel: 'Rendering',
                sideValue: 'CSR (SPA)',
                Icon: Monitor,
                iconColor: 'text-cyan-400',
                blurColor: 'from-blue-500/10 to-teal-400/10',
                hoverBorder: 'hover:border-primary/50'
            },
            {
                id: 'layer2',
                title: 'Lógica de Negocio (Core)',
                tech: 'Node.js + Express API + Strapi CMS',
                sideLabel: 'Arquitectura',
                sideValue: 'RESTful Layered',
                Icon: Server,
                iconColor: 'text-blue-500',
                blurColor: 'from-blue-600/10 to-indigo-500/10',
                hoverBorder: 'hover:border-blue-500/50'
            },
            {
                id: 'layer3',
                title: 'Capa de Persistencia & Auth',
                tech: 'PostgreSQL Relacional',
                sideLabel: 'ORM',
                sideValue: 'Sequelize',
                Icon: Database,
                iconColor: 'text-emerald-500',
                blurColor: 'from-green-500/10 to-emerald-400/10',
                hoverBorder: 'hover:border-emerald-500/50'
            }
        ]
    },
    {
        id: 'visubook',
        type: '02. Mobile SaaS Product',
        title: 'VisuBook:',
        subtitle: 'SaaS Ecosystem',
        theme: {
            primary: 'text-fuchsia-500',
            gradient: 'from-fuchsia-500 to-fuchsia-500',
            border: 'border-fuchsia-500',
            bgHover: 'group-hover:bg-fuchsia-500/5',
            hoverBorder: 'hover:border-fuchsia-500/50'
        },
        tags: 'Mobile SaaS • Booking & CRM',
        context: [
            'Nacido de una necesidad real para digitalizar procesos analógicos, <strong>VisuBook</strong> evolucionó de una herramienta de gestión familiar a una solución SaaS integral para profesionales de la estética y salud.',
            'El sistema no solo gestiona citas; orquesto una arquitectura capaz de manejar seguimientos técnicos visuales complejos, reducir el ausentismo mediante <strong>automatizaciones inteligentes</strong> y gestionar límites de uso dinámicos (Feature Gating).'
        ],
        notice: null,
        integrationsTitle: 'Desafíos Técnicos & Soluciones de Impacto',
        integrations: [
            {
                id: 'conflict-prevention',
                title: 'Prevención de Conflictos de Agenda',
                description: 'Algoritmo personalizado que valida disponibilidad, duración de servicios y horarios de cierre antes de impactar la base de datos, eliminando errores de solapamiento.',
                Icon: CalendarClock,
                iconColor: 'text-blue-400'
            },
            {
                id: 'feature-gating',
                title: 'Monetización & Feature Gating',
                description: 'Arquitectura escalable de límites (Freemium) controlada por middlewares en Node.js e interceptores inteligentes en el frontend para disparar flujos de Upgrading.',
                Icon: Gem,
                iconColor: 'text-emerald-400'
            },
            {
                id: 'expo-notifications',
                title: 'Reducción de Absentismo (No-Shows)',
                description: 'Automatización de alertas push locales enviadas 15 minutos antes de cada cita con Quick Actions integradas para confirmación vía WhatsApp.',
                Icon: BellRing,
                iconColor: 'text-amber-400'
            },
            {
                id: 'visual-tracking',
                title: 'Seguimiento Técnico Visual',
                description: 'Digitalización de fichas técnicas mediante captura nativa y manipulación asíncrona de imágenes (Cloudinary), permitiendo un histórico visual preciso por cliente.',
                Icon: Camera,
                iconColor: 'text-fuchsia-400'
            }
        ],
        ctaPrimary: {
            text: 'Ver Plataforma Live',
            link: 'https://visubook-web.vercel.app/'
        },
        views: [
            { id: 'architecture', label: 'Arquitectura' },
            { id: 'ecosystem', label: 'Ecosistema' },
            { id: 'preview', label: 'Producto' },
        ],
        screenshots: [
            { src: '/screenshots/visubook/dashboard.jpg', alt: 'Dashboard — Resumen del día y acciones rápidas' },
            { src: '/screenshots/visubook/clientes.jpg', alt: 'CRM — Gestión de clientes con acciones integradas' },
            { src: '/screenshots/visubook/historial.jpg', alt: 'Historial — Ficha técnica visual (Antes/Después)' },
        ],
        topologyNote: '*La arquitectura desacoplada y el sistema de Gating permiten transicionar de un modelo B2C a B2B sin reescribir el núcleo del sistema.',
        topologyNoteIcon: CloudLightning,
        topologyNoteColor: 'text-fuchsia-500',
        bannerText: '¿Buscás transformar un proceso manual en un producto SaaS escalable?',
        bannerIcon: Rocket,
        bannerBg: 'bg-fuchsia-500/10',
        bannerIconColor: 'text-fuchsia-400',
        bannerButtonHover: 'hover:text-fuchsia-400',
        reverseDesktop: true,
        layers: [
            {
                id: 'layer1',
                title: 'Capa de Presentación (App)',
                tech: 'React Native + Expo (Router)',
                sideLabel: 'Ecosistema',
                sideValue: 'iOS / Android',
                Icon: Smartphone,
                iconColor: 'text-fuchsia-400',
                blurColor: 'from-fuchsia-500/10 to-pink-500/10',
                hoverBorder: 'hover:border-fuchsia-500/50'
            },
            {
                id: 'layer2',
                title: 'Lógica & Seguridad (Core)',
                tech: 'Node.js + Express (MVC)',
                sideLabel: 'Auth',
                sideValue: 'JWT / Refresh Tokens',
                Icon: Server,
                iconColor: 'text-blue-500',
                blurColor: 'from-blue-600/10 to-indigo-500/10',
                hoverBorder: 'hover:border-blue-500/50'
            },
            {
                id: 'layer3',
                title: 'Persistencia & Multimedia',
                tech: 'PostgreSQL + Cloudinary',
                sideLabel: 'ORM',
                sideValue: 'Sequelize',
                Icon: Database,
                iconColor: 'text-amber-500',
                blurColor: 'from-amber-500/10 to-orange-400/10',
                hoverBorder: 'hover:border-amber-500/50'
            }
        ]
    }
];
