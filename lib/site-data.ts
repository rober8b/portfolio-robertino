export type ProjectStatus = "live" | "building" | "prototype" | "qa";

export type Project = {
  slug: string;
  name: string;
  tagline: { dev: string; client: string };
  description: { dev: string; client: string };
  status: ProjectStatus;
  statusLabel: { dev: string; client: string };
  year: string;
  client?: string;
  industry: string;
  stack: string[];
  highlights: string[];
  links: {
    demo?: string;
    repo?: string;
    manifesto?: string;
  };
  image?: string;
  featured?: boolean;
};

export const PROFILE = {
  name: "Robertino Barbuto",
  handle: "rober8b",
  location: "Buenos Aires, Argentina",
  email: "robertinobarbuto@gmail.com",
  github: "https://github.com/rober8b",
  tagline: {
    dev: "Construyo sistemas web y agénticos para LATAM. Next.js, TypeScript, Mastra, MercadoPago.",
    client: "Te armo tu sitio web, tu tienda online o tu app, sin vueltas. Hablamos por WhatsApp.",
  },
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind v4",
    "Prisma",
    "Supabase",
    "shadcn/ui",
    "MercadoPago",
    "Mastra",
    "Inngest",
    "Gemini",
    "Groq",
    "Claude",
    "Vercel",
  ],
} as const;

/**
 * Contactos públicos del portfolio.
 * Cuando agregues los reales (LinkedIn URL, X handle, número WhatsApp internacional sin "+", Cal.com),
 * reemplazá los strings vacíos. Los componentes esconden los handles vacíos automáticamente.
 */
export const CONTACTS = {
  email: PROFILE.email,
  github: "https://github.com/rober8b",
  linkedin: "https://linkedin.com/in/robertino-barbuto",
  twitter: "https://x.com/bd_rober", // ej: "https://x.com/rober8b" o handle
  whatsapp: "5491125128321", // ej: "5491145678901" — solo dígitos, formato internacional sin +
  whatsappPrefill: {
    dev: "Hola Rober, vi tu portfolio y quería preguntarte sobre tu stack agéntico.",
    client: "Hola Rober, vi tu portfolio y quería pedirte presupuesto para un proyecto.",
  },
  cal: "https://cal.com/robertino-barbuto/discovery-call", // ej: "https://cal.com/rober"
} as const;

export const PROJECTS: Project[] = [
  {
    slug: "marketplace",
    name: "Marketplace agéntico",
    tagline: {
      dev: "Squads de IA pre-construidos para operadores de ecommerce LATAM",
      client: "El futuro del ecommerce: equipos de IA que trabajan por vos",
    },
    description: {
      dev: "SaaS de squads agénticos verticales para SMBs de ecommerce LATAM (Tiendanube + Shopify, WhatsApp Business, MercadoPago). Catalog Crew genera listings; Recovery Operator hace recuperación de carritos vía WhatsApp. Pricing por outcome, wallet prepaga en ARS. Routing entre Gemini Pro/Flash y Groq Llama 3.3 vía Mastra.",
      client: "Estoy construyendo una plataforma para dueños de tiendas online en LATAM: contratás equipos de inteligencia artificial que generan catálogos automáticos o recuperan carritos abandonados por WhatsApp. Pagás por resultado, en pesos, con MercadoPago.",
    },
    status: "building",
    statusLabel: {
      dev: "Work-Block 6 de 8 — Recovery Operator",
      client: "En construcción — early access próximamente",
    },
    year: "2026",
    industry: "SaaS · Agentic AI · Ecommerce LATAM",
    stack: ["Next.js 15", "Mastra", "Inngest", "Gemini 2.5", "Groq Llama 3.3", "Prisma", "Supabase", "MercadoPago", "Langfuse"],
    highlights: [
      "Routing inteligente entre Gemini Pro/Flash y Groq Llama 3.3 vía Mastra",
      "Wallet ARS en integer cents con SELECT FOR UPDATE + serializable isolation",
      "Webhooks idempotentes para reintentos automáticos de providers",
      "Moat en construcción: dataset propietario de outcome por job",
    ],
    links: {
      manifesto: "/marketplace",
    },
    image: "/projects/marketplace.png",
    featured: true,
  },
  {
    slug: "aredes-asociados",
    name: "Aredes Asociados",
    tagline: {
      dev: "Migración WordPress→Next.js 16 con SEO técnico y posicionamiento premium B2B",
      client: "El sitio nuevo de Aredes Asociados, broker de seguros con 20+ años en el mercado",
    },
    description: {
      dev: "Sitio institucional editorial premium para broker B2B. Migración completa desde WordPress + Cloudflare a Next.js 16 + Vercel. Tipografía Inter, paleta navy + cream OKLCH, shadcn base-nova, Playwright para visual checks.",
      client: "Reescribí desde cero la web de Aredes Asociados. Pasó de WordPress a una tecnología más moderna, más rápida y mejor posicionada en Google. Diseño profesional que transmite la trayectoria de la marca.",
    },
    status: "live",
    statusLabel: { dev: "Producción", client: "En vivo" },
    year: "2026",
    client: "Aredes Asociados",
    industry: "Broker de seguros · B2B",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "shadcn/ui", "Playwright", "pnpm"],
    highlights: [
      "Migración DNS desde cPanel + reconfiguración de nameservers",
      "Skill taste integrada vía skills-lock.json",
      "Visual regression con Playwright + scripts/visual-check.ts",
      "JSON-LD structured data para SEO",
    ],
    links: {},
    image: "/projects/aredes-asociados.jpg",
    featured: true,
  },
  {
    slug: "leiza-page",
    name: "Madre Naturaleza",
    tagline: {
      dev: "Landing brand con tokens OKLCH, refinement editorial y skill impeccable integrada",
      client: "Sitio de Leiza Dakoff, terapias y medicinas naturales. Conecta con pacientes por WhatsApp.",
    },
    description: {
      dev: "Sitio brand para Madre Naturaleza (Leiza Dakoff). Next.js 16 + React 19 + Tailwind v4 con tokens OKLCH y color strategy committed (sage 30-50% de superficie). Fraunces serif + Inter, motion respetando prefers-reduced-motion. Skill impeccable instalada local para auditorías.",
      client: "Le hice la web a Leiza, terapeuta de medicinas naturales. Sitio cálido, mobile-first (su público viene de Instagram en celular), con un botón gigante de WhatsApp para que la gente la contacte directo.",
    },
    status: "live",
    statusLabel: { dev: "Producción · esperando assets reales", client: "En vivo" },
    year: "2026",
    client: "Leiza Dakoff",
    industry: "Terapias naturales · Brand site",
    stack: ["Next.js 16", "React 19", "Tailwind v4", "TypeScript", "Fraunces + Inter", "impeccable skill"],
    highlights: [
      "Tokens OKLCH con color strategy committed (sage)",
      "MediaSlot autoreemplazable con placeholders nombrados",
      "site-data.ts como single source of truth de contenido",
      "Mobile-first — 80% del tráfico desde IG en celular",
    ],
    links: {},
    image: "/projects/leiza-page.jpg",
    featured: true,
  },
  {
    slug: "nebula",
    name: "Nebula",
    tagline: {
      dev: "Sitio editorial para canal audiovisual de cultura cannábica LATAM",
      client: "El sitio de Nebula, canal audiovisual sobre cultura cannábica en Latinoamérica",
    },
    description: {
      dev: "Sitio brand + editorial para Nebula (Buenos Aires). Hub de contenidos del programa flagship 'HDP: Hablemos de Porro', cápsulas educativas y formatos de marca. Next.js + integración con YouTube, Instagram, TikTok y Twitch. Posicionamiento premium — periodismo responsable, no entretenimiento sensacionalista.",
      client: "Le hice la web a Nebula, un canal audiovisual de cultura cannábica con base en Buenos Aires. El sitio centraliza sus programas, redes y videos en YouTube, con un diseño editorial serio.",
    },
    status: "live",
    statusLabel: { dev: "Producción", client: "En vivo" },
    year: "2026",
    client: "Nebula",
    industry: "Media · Brand · Cannabis culture",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel", "YouTube API"],
    highlights: [
      "Hub editorial multi-plataforma (YouTube + IG + TikTok + Twitch)",
      "Diseño premium para reposicionar marca como referente cultural",
      "Tipografía y paleta committed con identidad 'cultura verde con criterio'",
    ],
    links: {
      demo: "https://www.somosnebula.ar/",
    },
    image: "/projects/nebula.jpg",
    featured: true,
  },
  {
    slug: "equitas-abogados",
    name: "Equitas Abogados",
    tagline: {
      dev: "Sitio institucional Next.js 14 para estudio jurídico con 9 áreas de práctica",
      client: "Sitio de Equitas Abogados, estudio jurídico con 20+ años de trayectoria",
    },
    description: {
      dev: "Sitio institucional para estudio jurídico argentino. Next.js 14 + Tailwind + TypeScript. Arquitectura por áreas de práctica (9 verticales), testimonios, CTAs múltiples para captación. SEO técnico para queries legales de alta intención.",
      client: "Le hice la web a Equitas Abogados, un estudio jurídico con 20+ años de trayectoria. Sitio profesional que ordena las 9 áreas de práctica, testimonios de clientes y un mensaje claro: asesoramiento con respuesta en 48 horas.",
    },
    status: "live",
    statusLabel: { dev: "Producción", client: "En vivo" },
    year: "2026",
    client: "Equitas Abogados",
    industry: "Servicios legales · Estudio jurídico",
    stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind v3"],
    highlights: [
      "Arquitectura por áreas de práctica (9 verticales)",
      "CTAs múltiples optimizadas para captación de casos",
      "SEO técnico para queries legales de alta intención",
    ],
    links: {
      demo: "https://equitas-abogados.vercel.app/",
    },
    image: "/projects/equitas-abogados.jpg",
  },
  {
    slug: "nomos",
    name: "Nomos",
    tagline: {
      dev: "Marketplace de squads agénticos con routing por costo entre Claude Haiku/Sonnet/Opus",
      client: "Plataforma para contratar equipos de IA y pagar solo por lo que cuesta resolver tu tarea",
    },
    description: {
      dev: "Construido en 8h en el Hackathon de Anthropic LATAM (Kaszek × Anthropic × Digital House) con Sylvestre Corti, Martín Pulitano y Leonardo Cagliero. Compute-routed marketplace que descompone tareas y rutea cada subtarea al modelo más barato que pueda resolverla (Haiku → Sonnet → Opus). 61% de ahorro promedio.",
      client: "Prototipo construido en 8 horas durante el Hackathon de Anthropic en LATAM. Una plataforma donde alquilás equipos de inteligencia artificial pre-armados, y la plataforma elige cuál usar para ahorrarte plata.",
    },
    status: "prototype",
    statusLabel: { dev: "Hackathon prototype · live demo", client: "Prototipo del hackathon" },
    year: "2026",
    industry: "Agentic AI · Hackathon prototype",
    stack: ["Next.js", "Claude API", "Anthropic SDK", "Web3", "Vercel"],
    highlights: [
      "Routing por costo entre Haiku, Sonnet y Opus",
      "Squads curados por dominio (research, legal, soporte, content)",
      "13.504 tareas procesadas, 61% de ahorro promedio en demos",
      "Pricing en ETH + USDC (testnet)",
    ],
    links: {
      demo: "https://nomos-tau.vercel.app/",
    },
    image: "/projects/nomos.jpg",
  },
  {
    slug: "dental-app",
    name: "Consultorio P&P",
    tagline: {
      dev: "Booking system con Express + Next.js, Supabase Storage para comprobantes",
      client: "Sistema de turnos online para una clínica dental. La paciente reserva en 5 pasos.",
    },
    description: {
      dev: "Two-app: Express 4 (CommonJS) + Next.js 14 App Router (plain JS). Supabase con dos clientes (pg Pool para SQL raw + supabase-js para Storage). Wizard de 5 pasos público + admin con JWT 8h. Resend fire-and-forget al admin.",
      client: "Sistema completo para reservar turnos en una clínica dental: la paciente elige servicio, fecha, sube el comprobante de transferencia y recibe confirmación. La doctora gestiona todo desde su panel.",
    },
    status: "live",
    statusLabel: { dev: "Producción", client: "En uso" },
    year: "2026",
    client: "Consultorio Odontológico P&P",
    industry: "Salud · Booking system",
    stack: ["Next.js 14", "Express 4", "Supabase", "JWT", "Resend", "Tailwind"],
    highlights: [
      "Wizard de 5 pasos: servicio → calendario → transferencia → confirmación → success",
      "Supabase Storage para comprobantes de transferencia",
      "Bloqueos por slot o día completo",
      "Soft-delete en turnos cancelados",
    ],
    links: {},
    image: "/projects/dental-app.jpg",
  },
  {
    slug: "pizza-block",
    name: "Pizza Block",
    tagline: {
      dev: "Pizzería app con checkout que termina en WhatsApp Web",
      client: "App para pedir pizza online — el pedido te llega directo al WhatsApp del local",
    },
    description: {
      dev: "Aplicación pizzería en React (Vite). Carrito completo, variantes, totales y un checkout que arma el mensaje de WhatsApp con todos los detalles del pedido. Comercio sin checkout tradicional, perfecto para PyMEs.",
      client: "Una app donde el cliente arma su pizza, le agrega lo que quiere, ve el total — y al final se manda solo un WhatsApp al local con el pedido listo. Sin checkout complicado.",
    },
    status: "live",
    statusLabel: { dev: "Producción", client: "En vivo" },
    year: "2024",
    industry: "Pizzería · Portfolio piece",
    stack: ["React", "Vite", "WhatsApp Web"],
    highlights: [
      "Comercio sin pasarela de pago — chat es el checkout",
      "Variantes, totales, gestión local de carrito",
      "Patrón replicable para PyMEs LATAM",
    ],
    links: {
      demo: "https://pizza-block.vercel.app/",
      repo: "https://github.com/rober8b/Pizza-Block",
    },
    image: "/projects/pizza-block.jpg",
  },
  {
    slug: "xplora",
    name: "Xplora · Club de emprendedores",
    tagline: {
      dev: "Sitio del club de emprendedores UCEMA — eventos, workshops, bolsa de trabajo",
      client: "El sitio del club de emprendedores de la UCEMA, donde participo como Team Maker",
    },
    description: {
      dev: "Sitio del club de emprendedores Xplora (UCEMA). Eventos, workshops (AI, marketing, programación, business), bolsa de trabajo. Mantenido por el team de Makers del club, del que formo parte.",
      client: "El sitio del club de emprendedores de mi universidad. Combina lo técnico con un proyecto comunitario que tiene impacto real en estudiantes y startups.",
    },
    status: "live",
    statusLabel: { dev: "Activo · mantenido por el club", client: "Activo" },
    year: "2025",
    industry: "Comunidad · Universidad",
    stack: ["React", "Vite"],
    highlights: [
      "Bolsa de trabajo para estudiantes",
      "Calendario de eventos del club",
      "Mantenido por el team de Makers",
    ],
    links: {
      repo: "https://github.com/rober8b/xplora",
    },
    image: "/projects/xplora.jpg",
  },
];

export const EXPERIENCES = [
  {
    title: "Desarrollador freelance",
    org: "Independiente · Buenos Aires",
    period: "2023 — presente",
    summary: {
      dev: "Diseño y construyo sitios web, ecommerce y sistemas agénticos para clientes y proyectos propios en LATAM.",
      client: "Trabajo de forma independiente con clientes y proyectos propios. Cada cliente trabaja directo conmigo, sin intermediarios.",
    },
  },
  {
    title: "Hackathon de Anthropic LATAM",
    org: "KASZEK × Anthropic × Digital House",
    period: "2026",
    summary: {
      dev: "220 participantes, +4.000 aplicaciones, 8 horas. Con Sylvestre Corti Maderna, Martín Ezequiel Pulitano y Leonardo Cagliero Shictong construimos Nomos: marketplace para alquilar sistemas agénticos ya optimizados por otros.",
      client: "Participamos del primer hackathon de Anthropic en Latinoamérica. Construimos en 8 horas un prototipo para alquilar inteligencia artificial pre-armada.",
    },
  },
  {
    title: "Mentor — AI Policy Design Sprint",
    org: "Xplora · AI Consensus · Levellers",
    period: "2026",
    summary: {
      dev: "Mentor en sprint de 50 personas (estudiantes, posgrado, profesionales) diseñando políticas públicas reales alrededor de IA en educación, transporte, salud pública y desarrollo económico.",
      client: "Participé como mentor de un evento donde 50 personas diseñaron propuestas reales de políticas públicas sobre inteligencia artificial.",
    },
  },
  {
    title: "Team Makers — Xplora (UCEMA)",
    org: "Universidad del CEMA",
    period: "Presente · Co-director 2027",
    summary: {
      dev: "Team de Makers: análisis de datos, métricas y desarrollo del sitio del club. Speaker en eventos. Co-director del club para 2027.",
      client: "Soy parte del equipo que gestiona el club de emprendedores de la UCEMA. El año que viene voy a estar como co-director.",
    },
  },
] as const;

export const EDUCATION = [
  {
    title: "Bachelor's in Digital Business",
    org: "UCEMA — Universidad del CEMA",
    period: "2024 — 2027",
    status: "en curso",
  },
  {
    title: "Tecnicatura en Programación",
    org: "UTN — Universidad Tecnológica Nacional",
    period: "2022 — 2023",
    status: "completado",
  },
  {
    title: "React.js & JavaScript",
    org: "CoderHouse",
    period: "2022",
    status: "completado",
  },
] as const;

export const NOW_LEARNING = [
  "Programa Ejecutivo de IA Generativa para Programadores",
  "Hugging Face Agents Course",
  "SQL",
  "Exploratory Data Analysis",
] as const;
