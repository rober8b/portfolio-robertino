/**
 * Datos del manifesto del marketplace agéntico.
 * Fuente: documento "Del hackathon al marketplace" + nodo Obsidian [[marketplace]].
 * Single source of truth para /marketplace page.
 */

export const MANIFESTO = {
  codename: "marketplace",
  status: "Work-Block 6 de 8 · Recovery Operator",
  year: "2026",
  team: [
    { name: "Robertino Barbuto", role: "producto + tech" },
    { name: "Sylvestre Corti Maderna", role: "operator outreach + validación" },
    { name: "Leonardo Cagliero Shictong", role: "distribución + Web3 Payments" },
    { name: "Martín Ezequiel Pulitano", role: "engine + squads" },
  ],
  hero: {
    eyebrow: "manifesto · construyendo en 2026",
    claim: "Squads de IA verticales para ecommerce LATAM.",
    sub: "No es otro marketplace de agentes horizontal. Es la única plataforma diseñada desde cero para PyMEs de ecommerce en Argentina, México, Colombia y Brasil — con WhatsApp, MercadoPago y contexto local en el core.",
  },
  thesis: [
    {
      heading: "Pricing por outcome",
      body: "Pagás por carrito recuperado, no por hora de modelo. La métrica de éxito es plata de vuelta en tu cuenta, no tokens consumidos.",
    },
    {
      heading: "WhatsApp como canal nativo",
      body: "El 70% del ecommerce LATAM se cierra por WhatsApp. Nuestros squads operan ahí de fábrica, no como integración añadida.",
    },
    {
      heading: "Routing inteligente interno",
      body: "Mastra rutea cada subtarea al modelo más barato capaz de resolverla (Gemini 2.5 Flash, Pro o Groq Llama 3.3). Vos ves el outcome, nosotros optimizamos el costo.",
    },
  ],
  squads: [
    {
      name: "Catalog Crew",
      tagline: "Listings completos en segundos.",
      what:
        "Subís 5 fotos de un producto. El squad genera título SEO, descripción larga, atributos categorizados y variantes de copy para A/B. Publicado o listo para revisar — vos elegís.",
      outcomeMetric: "SKUs procesados",
      status: "MVP en producción",
    },
    {
      name: "Recovery Operator",
      tagline: "Carritos abandonados que vuelven.",
      what:
        "Detecta carritos sin checkout, abre una conversación contextual por WhatsApp Business con el cliente, ofrece descuentos quirúrgicos cuando hacen falta. A/B con holdout grupal para medir lift real.",
      outcomeMetric: "% de revenue recuperado",
      status: "WB6 — en construcción",
    },
  ],
  defensibility: {
    headline: "Por qué un nuevo OpenAI Workspace Agents no nos come.",
    pillars: [
      {
        title: "Canal",
        them: "OpenAI vive en chat.openai.com y la API. WhatsApp es una integración extra.",
        us: "WhatsApp Business es el canal de salida default de cada squad.",
      },
      {
        title: "Pagos",
        them: "Tarjeta de crédito internacional en USD. Barrera brutal para PyMEs argentinas.",
        us: "MercadoPago en ARS, wallet prepaga. La transacción ya es nativa.",
      },
      {
        title: "Incentivos",
        them: "Su revenue crece cuando consumís más tokens. Incentivo a inflar prompts.",
        us: "Nuestro revenue crece cuando vos vendés más. Incentivo a optimizar tokens.",
      },
      {
        title: "Contexto",
        them: "Genérico global. MercadoEnvíos, AFIP, Tiendanube son nombres extraños.",
        us: "MercadoEnvíos, AFIP, Tiendanube API, comportamiento local LATAM en el dataset.",
      },
    ],
  },
  moat: {
    headline: "El moat se construye en producción.",
    body:
      "Cada catálogo generado y cada recovery exitoso alimentan un dataset propietario de qué modelo, qué prompt y qué herramienta resuelven mejor cada subtarea para un ecommerce LATAM. Después de 10.000 jobs, el router toma decisiones que un competidor nuevo no puede replicar copiando el código.",
  },
  pivot: {
    headline: "De Nomos al marketplace vertical.",
    body:
      "Nació en el hackathon de Anthropic en LATAM como Nomos — un marketplace P2P horizontal de agentes. Post-hackathon evolucionó a 'marketplace de operators' con squads horizontales (Market Research, Brand Marketing), pero esos verticales compiten directo con ChatGPT y OpenAI Workspace Agents. Sin moat real. El análisis competitivo nos forzó al pivot actual: vertical específico, canal nativo, pagos locales, incentivos invertidos.",
  },
  stack: [
    "Next.js 15 App Router",
    "TypeScript strict",
    "Prisma + Supabase",
    "Mastra (agent runtime)",
    "Inngest (jobs async)",
    "Gemini 2.5 Pro/Flash",
    "Groq Llama 3.3 70B",
    "MercadoPago (Fase 1)",
    "Langfuse (traces + costs)",
    "Vercel",
  ],
} as const;
