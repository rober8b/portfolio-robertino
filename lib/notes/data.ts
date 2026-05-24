export type NoteBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "code"; lang: string; body: string }
  | { kind: "list"; items: string[] }
  | { kind: "quote"; text: string };

export type Note = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  tags: string[];
  readTime: string;
  body: NoteBlock[];
};

export const NOTES: Note[] = [
  {
    slug: "ship-weekly",
    title: "Por qué entrego cada semana, no cada mes",
    dek: "La mayoría de los proyectos freelance no fallan por falta de skill. Fallan porque el loop de feedback es muy largo.",
    date: "2026-05-12",
    tags: ["process", "freelance"],
    readTime: "~3 min",
    body: [
      {
        kind: "p",
        text: "Tomé la decisión de entregar todas las semanas hace casi dos años, y desde entonces no falló un proyecto por scope creep o por cliente confundido. No es magia. Es geometría de feedback.",
      },
      {
        kind: "h2",
        text: "El problema con el ciclo mensual",
      },
      {
        kind: "p",
        text: "El default en agencias es entregar un MVP completo después de 4 a 8 semanas. El cliente ve algo recién a mitad del proceso, cuando ya tomaste 30 decisiones que no le consultaste. Las correcciones llegan cuando ya escribiste el código encima de ellas. Y vos cobrás horas que se gastan re-haciendo cosas que no había forma de validar antes.",
      },
      {
        kind: "h2",
        text: "Qué cambia con sprints semanales",
      },
      {
        kind: "p",
        text: "Cada lunes el cliente ve un deploy nuevo. No una demo en vivo, no un Figma, no un Notion: una URL que abre desde el celular en el subte. El viernes le mando un loom de 5 minutos con qué se hizo, qué decisiones quedaron pendientes, y qué necesito que confirme.",
      },
      {
        kind: "list",
        items: [
          "Los errores se descubren en una semana, no en seis.",
          "El cliente percibe el avance — cada lunes hay algo nuevo, así no haya features grandes.",
          "Los pivots cuestan poco porque hay poco escrito encima.",
          "El presupuesto se respeta mejor: el alcance se ajusta antes de explotar.",
        ],
      },
      {
        kind: "h2",
        text: "Lo que no funciona",
      },
      {
        kind: "p",
        text: "Sprints semanales no funcionan si el cliente no puede dar feedback en menos de 48 horas. Eso aparece más en clientes con comités o aprobaciones por mail. En esos casos el sprint pasa a quincenal, pero la regla queda igual: hay un deploy nuevo cada vez, y hay un texto escrito de qué hay que revisar.",
      },
      {
        kind: "p",
        text: "La regla más simple que conozco para mantener un proyecto sano es ésta: si pasaron más de 7 días sin que el cliente toque la URL, hay un problema. Lo arreglás antes de seguir escribiendo código.",
      },
    ],
  },
  {
    slug: "agentic-for-non-agentic-teams",
    title: "Sistemas agénticos para equipos que no son agénticos",
    dek: "El gap real en LATAM no es de modelos. Es de operadores que puedan integrarlos sin un equipo de ML.",
    date: "2026-05-05",
    tags: ["agentic", "marketplace"],
    readTime: "~4 min",
    body: [
      {
        kind: "p",
        text: "Cuando hablo con dueños de tiendas en Tiendanube o Shopify acá, todos saben que IA existe. Pocos saben cómo agarrarla. Los que intentaron, contrataron a alguien que les vendió un chatbot genérico, vieron que no funcionaba, y volvieron a hacer las cosas a mano.",
      },
      {
        kind: "p",
        text: "El problema no es el modelo. Gemini Pro, Claude Sonnet y Groq Llama 3.3 son ya commodity. El problema es la última milla: ¿quién diseña el prompt, mide el output, hace QA del tono, integra los webhooks de WhatsApp Business, factura por outcome, y se hace cargo cuando algo se rompe?",
      },
      {
        kind: "h2",
        text: "La forma equivocada",
      },
      {
        kind: "p",
        text: "La forma típica es vender un SaaS horizontal: te damos una caja de herramientas, vos armás. Esto funciona para equipos de ingeniería. No funciona para una pyme de ecommerce donde la persona que toma la decisión sabe Excel y nada más.",
      },
      {
        kind: "h2",
        text: "Squads verticales pre-armados",
      },
      {
        kind: "p",
        text: "La apuesta del marketplace que estoy construyendo es opuesta. En vez de vender herramientas, vendemos squads agénticos cerrados, listos para un caso de uso concreto: generar listings, recuperar carritos, responder consultas. El usuario contrata, conecta su Tiendanube, y mide outcome. Cobramos por resultado en pesos.",
      },
      {
        kind: "list",
        items: [
          "Catalog Crew genera fichas a partir de fotos del proveedor. Cobra por listing publicado.",
          "Recovery Operator manda WhatsApps post-abandono con descuento contextual. Cobra por carrito recuperado.",
          "Wallet ARS en integer cents, con SELECT FOR UPDATE serializable para que no haya double-spending.",
        ],
      },
      {
        kind: "h2",
        text: "Por qué es defensible",
      },
      {
        kind: "p",
        text: "El moat no es el modelo (cambia cada 3 meses). El moat es el dataset propietario que se construye al medir outcome por job: qué prompt, qué temperatura, qué hora del día, qué descuento. Cada job mejora el siguiente. Eso es lo que ningún wrapper de OpenAI puede replicar sin operar.",
      },
      {
        kind: "p",
        text: "El insight central: agéntico no se vende como tecnología. Se vende como un empleado contratado por outcome. El comprador no compra el modelo. Compra que el problema desaparezca.",
      },
    ],
  },
  {
    slug: "rober8b-stack",
    title: "Cómo armé este stack (y por qué este, no otro)",
    dek: "Next.js + TypeScript + Tailwind + MercadoPago. El stack no es por hype: es por restricciones reales.",
    date: "2026-04-28",
    tags: ["stack", "decisions"],
    readTime: "~3 min",
    body: [
      {
        kind: "p",
        text: "Cada vez que arranco un proyecto nuevo me pregunto si vale la pena cambiar el stack. La respuesta casi siempre es no. No por inercia: por restricciones reales.",
      },
      {
        kind: "h2",
        text: "Next.js 16",
      },
      {
        kind: "p",
        text: "Vercel deploya en menos de un minuto, el modelo de RSC me deja escribir server-side por defecto y hacer client cuando hace falta, y el ecosistema de middleware (cron, ISR, edge config) cubre el 90% de lo que necesito. Para una landing de cliente o un SaaS chico, no encuentro razón para irme a otra cosa.",
      },
      {
        kind: "h2",
        text: "TypeScript siempre",
      },
      {
        kind: "p",
        text: "No es una elección — es una pre-condición. Cualquier proyecto que no sea TypeScript me obliga a mantener documentación que se rompe sola. Strict mode en el tsconfig y discriminated unions para todo lo que tenga estado.",
      },
      {
        kind: "h2",
        text: "Tailwind v4 + OKLCH",
      },
      {
        kind: "p",
        text: "Migré de v3 hace 6 meses. La diferencia más grande: los tokens OKLCH dejan de ser teóricos. Puedo subir el chroma en dark mode y bajarlo en light mode con el mismo hue, y el diseño se mantiene coherente. shadcn como base + overrides cuando hace falta un look propio (este sitio).",
      },
      {
        kind: "h2",
        text: "MercadoPago, no Stripe",
      },
      {
        kind: "p",
        text: "Stripe es mejor producto. Pero el cliente está en LATAM, paga en pesos, y MercadoPago acepta tarjeta + transferencia + efectivo con la misma integración. Para ARS está mejor que cualquier opción internacional. Stripe se vuelve relevante cuando hay USD.",
      },
      {
        kind: "h2",
        text: "Lo que cambia (y lo que no)",
      },
      {
        kind: "list",
        items: [
          "El layer de IA (Mastra, Inngest, AI SDK) sí cambió 3 veces en el último año. Es zona de innovación activa.",
          "El layer de datos (Prisma + Supabase) lo mantengo igual hace 2 años. Boring tech, gana.",
          "El layer de UI (Tailwind + shadcn + motion) lo mantengo igual. Lo que cambia son los tokens.",
        ],
      },
      {
        kind: "p",
        text: "La regla que sigo: cambio una pieza cuando hay un dolor concreto que justifica la migración. Cambiar por mejorar el stack en abstracto siempre paga peor de lo que parece.",
      },
    ],
  },
];
