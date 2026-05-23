# Ask my portfolio — FAQ source

Este archivo es la **única fuente de verdad** del chat del portfolio. Editalo y corré `pnpm build:faq` para regenerar las embeddings.

---

## Cómo escribir una entrada

Cada entrada tiene esta estructura. Copiá la plantilla y completá:

Q: <pregunta-canónica>
Tags: <tag1>, <tag2>           ← opcional, separados por coma
Variants:                      ← opcional, una variante por línea

<variante 1>
<variante 2>

dev
<respuesta para modo Dev — técnica, específica, primera persona>
client
<respuesta para modo Cliente — humana, clara, sin jerga>

**Reglas:**

- **Una pregunta canónica por entrada.** Es la pregunta "limpia". Las `Variants` son cómo la podrían escribir distintos visitantes.
- **Las dos respuestas (dev + client) son obligatorias.** Aunque el contenido sea parecido, escribilas distinto. Si literalmente son iguales, no hace falta tener modo dual.
- **Sin emojis.** Sin em dashes.
- **Markdown básico OK** en las respuestas: `**negrita**`, listas con `-`, links `[texto](url)`.
- **Mantené las respuestas ≤ 4 oraciones.** Si necesitás más, partilas en 2 entradas.
- **Apuntá a 40-60 entradas en total.** Cubrí: bio/freelance, servicios, cada proyecto, pricing/proceso, stack, contacto, easter eggs.

---

## Categorías sugeridas

Acomodá las entradas bajo `## CATEGORÍA` para que sea más fácil de mantener. El parser ignora estos headers, solo le importan los `### Q:`.

---

## bio · freelance

### Q: ¿Quién es Robertino?
Tags: bio, robertino, rober
Variants:
- ¿Quién sos?
- ¿De qué te dedicás?
- Contame de vos

#### dev
Soy desarrollador freelance en Buenos Aires. Vengo del frontend, ahora hago full-stack con Next.js + TypeScript + agentic. Estudio Digital Business en UCEMA mientras laburo con clientes en LATAM y construyo un SaaS propio de agentes.

#### client
Soy Robertino, desarrollador independiente de Buenos Aires. Hace tres años que armo sitios web, tiendas online y aplicaciones para emprendedores y empresas. Trabajo directo con cada cliente, sin intermediarios.

### Q: ¿Sos agencia o freelancer?
Tags: agencia, freelance
Variants:
- ¿Trabajás solo?
- ¿Tenés equipo?
- ¿Sos una empresa?

#### dev
Freelance con estructura de agencia cuando el proyecto lo requiere. Tengo colaboradores fijos para diseño y QA, pero yo soy el punto de contacto y el que escribe el código.

#### client
Trabajo de forma independiente, así que hablás directo conmigo en todo momento. Para proyectos grandes sumo colaboradores de confianza, pero siempre soy yo quien lidera y entrega.

### Q: ¿Dónde estás basado?
Tags: ubicacion, remoto, buenos aires
Variants:
- ¿Trabajás de forma remota?
- ¿Podemos reunirnos en persona?
- ¿Atendés clientes del exterior?

#### dev
Basado en Buenos Aires, trabajo 100% remoto. Tengo clientes en Argentina y LATAM. Meetings por Google Meet o Zoom, sin problema de zona horaria dentro de la región.

#### client
Estoy en Buenos Aires pero trabajo con clientes de toda Argentina y otros países de la región. Todo se maneja de forma remota, con videollamadas y comunicación fluida por WhatsApp o email.

---

## servicios

### Q: ¿Qué tipo de proyectos hacés?
Tags: servicios, proyectos, que haces
Variants:
- ¿En qué te especializás?
- ¿Qué podés hacer para mi negocio?
- ¿Qué servicios ofrecés?

#### dev
Sitios institucionales, e-commerce (MercadoPago, carrito, admin), sistemas de gestión internos y productos SaaS. Últimamente mucho trabajo con agentes de IA integrados a flujos de negocio reales.

#### client
Armo sitios web para empresas, tiendas online completas con carrito y pagos, y aplicaciones a medida para gestionar turnos, pedidos o clientes. Si tu negocio necesita algo digital, probablemente puedo construirlo.

### Q: ¿Hacés ecommerce con MercadoPago?
Tags: ecommerce, mercadopago, tienda, pagos
Variants:
- ¿Integrás medios de pago?
- ¿Podés armar una tienda online?
- ¿Trabajás con Mercado Pago?

#### dev
Si, integro Mercado Pago (Checkout Pro y transferencia bancaria) con Next.js. Tengo Ruedalista (neumáticos) en producción con esa stack: Supabase, shadcn, catálogo por marca y panel de admin custom sin CMS externo.

#### client
Si, armo tiendas online completas con Mercado Pago incluido. El cliente puede pagar con tarjeta, transferencia o cuotas. Vos gestionás todo desde un panel propio, sin depender de plataformas de terceros.

### Q: ¿Hacés solo el diseño o también lo programás?
Tags: diseño, desarrollo, fullstack
Variants:
- ¿Sos diseñador o programador?
- ¿También hacés el frontend?
- ¿Me entregás el diseño y el código?

#### dev
Hago diseño de producto orientado a implementación y desarrollo full-stack. No soy diseñador gráfico puro, pero manejo Figma, sistemas de diseño con Tailwind/shadcn y entrego UI de calidad producción.

#### client
Me encargo de todo: el diseño visual y la programación. No necesitás contratar un diseñador por separado. Entrego el sitio terminado, funcionando y listo para usar.

### Q: ¿Hacés mantenimiento de sitios existentes?
Tags: mantenimiento, soporte, migracion
Variants:
- ¿Podés tomar un proyecto que empezó otro?
- ¿Hacés migraciones?
- ¿Arreglás sitios que están rotos?

#### dev
Si, tomo proyectos ajenos. Tengo experiencia migrando sitios WordPress a Next.js/Vercel, debugging de codebases desconocidas y refactors progresivos sin bajar producción.

#### client
Si, puedo hacerme cargo de tu sitio aunque lo haya armado otra persona. Hago migraciones, correcciones y mejoras sobre lo que ya tenés, sin que tengas que empezar de cero.

---

## proyectos

### Q: ¿Qué es el marketplace agéntico?
Tags: nomos, agentes, saas, marketplace
Variants:
- ¿Qué es Nomos?
- ¿Estás construyendo un SaaS?
- Contame del proyecto de agentes

#### dev
Es un marketplace donde equipos de agentes de IA especializados ejecutan tareas complejas. El clasificador routea cada subtarea al modelo más barato capaz de resolverla (Haiku/Sonnet/Opus), con panel de ahorro en tiempo real. Stack: Next.js 15, Mastra, Inngest, Gemini 2.5 Flash, Groq Llama 3.3, Supabase.

#### client
Es un producto propio que estoy construyendo: una plataforma donde contratás equipos de inteligencia artificial para hacer tareas de negocio, como redactar catálogos, gestionar consultas o recuperar clientes perdidos. Todavía en desarrollo.

### Q: ¿Qué proyectos de e-commerce tenés en producción?
Tags: ecommerce, portfolio, ruedalista
Variants:
- ¿Tenés casos de tiendas online?
- ¿Puedo ver alguna tienda que hayas hecho?

#### dev
**Ruedalista** (neumáticos) en producción con Supabase + shadcn + catálogo por marca y panel de admin custom sin CMS externo, MercadoPago integrado con webhook HMAC y stock decrement transaccional. Otro ecommerce más en pausa y vuelve pronto. En construcción: el marketplace agéntico con Catalog Crew para automatizar generación de catálogos.

#### client
Tengo una tienda de neumáticos funcionando en vivo, con carrito, pagos por Mercado Pago y un panel para gestionar productos, pedidos y stock sin tocar código. Tengo otros casos en pausa y proyectos nuevos en desarrollo, te los puedo mostrar en una llamada.

### Q: ¿Hacés sistemas de turnos o reservas?
Tags: turnos, reservas, sistema, consultorio
Variants:
- ¿Podés armar un sistema de agenda?
- ¿Trabajaste con consultorios o salud?
- ¿Hacés apps para profesionales?

#### dev
Si, tengo un sistema de turnos en producción para un consultorio odontológico: Next.js + Node/Express en Railway + PostgreSQL, con vistas semanal/mensual, bloqueos de disponibilidad, notificaciones por email (Resend) y mensajes de confirmación por WhatsApp.

#### client
Si, armo sistemas de agenda online para profesionales. El paciente o cliente elige el horario disponible, recibe confirmación por email y WhatsApp, y vos desde el panel podés bloquear días, ver el calendario y gestionar todo.

### Q: ¿Migraste sitios de WordPress?
Tags: wordpress, migracion, vercel, next
Variants:
- ¿Podés migrar mi sitio de WordPress?
- ¿Reemplazás WordPress con algo moderno?

#### dev
Si, tengo una migración reciente de WordPress/cPanel a Next.js en Vercel (aredesasociados.com.ar). El desafío fue DNS controlado por Cloudflare sin acceso: solución via cambio de nameservers en NIC.ar con pre-carga de registros MX, SPF y DKIM.

#### client
Si, puedo migrar tu sitio de WordPress a una plataforma más moderna, más rápida y más barata de mantener. El resultado es un sitio que carga mejor, no se rompe solo y no depende de plugins desactualizados.

### Q: ¿Tenés experiencia en el sector salud o retail?
Tags: salud, retail, rubros, experiencia
Variants:
- ¿Trabajaste con clientes de salud?
- ¿Hacés proyectos para comercios?

#### dev
Salud: sistema de turnos para consultorio dental (Next.js + Express + PostgreSQL). Retail: ecommerce de neumáticos en producción y una landing de cannabis culture para LATAM. Hospitality: en exploración con el marketplace agéntico para ecommerce LATAM.

#### client
Trabajé con un consultorio odontológico, con un comercio de neumáticos, y con clientes del sector cannabis en Latinoamérica. Cada proyecto fue distinto, pero en todos el foco fue hacer algo que el cliente pueda usar sin depender de mi.

---

## proceso · pricing

### Q: ¿Cuánto cobrás por un sitio web?
Tags: precio, costo, presupuesto, tarifas
Variants:
- ¿Cuánto sale un sitio?
- ¿Tenés precios?
- ¿Me podés dar un presupuesto?

#### dev
Sitio institucional desde USD 400-600. E-commerce con admin desde USD 900-1500. Sistemas a medida (turnos, dashboard, SaaS) desde USD 1200, depende del scope. Cobro en USD o el equivalente en ARS al cambio del momento.

#### client
Depende de lo que necesitás: un sitio para mostrar tu negocio arranca en el orden de los USD 400-600, una tienda online completa desde USD 900. Lo mejor es que me contás tu proyecto y te mando un presupuesto concreto sin compromiso.

### Q: ¿Cuánto tarda un proyecto?
Tags: tiempo, plazo, entrega, timeline
Variants:
- ¿En cuánto tiempo entregás?
- ¿Cuántas semanas lleva?
- ¿Tenés disponibilidad ahora?

#### dev
Sitio institucional: 2-3 semanas. E-commerce estándar: 4-6 semanas. Sistemas complejos o SaaS: 8-12 semanas con sprints semanales. Los tiempos asumen feedback ágil del cliente.

#### client
Un sitio web básico lo entrego en 2 o 3 semanas. Una tienda online completa lleva entre 4 y 6 semanas. Para proyectos más grandes acordamos plazos al inicio y trabajo con entregas parciales para que siempre veas el avance.

### Q: ¿Cómo es la forma de pago?
Tags: pago, factura, adelanto, cuotas
Variants:
- ¿Pedís anticipo?
- ¿Cómo dividís los pagos?
- ¿Facturás?

#### dev
50% al inicio, 50% contra entrega. Para proyectos largos divido en 3 hitos. Cobro en USD por transferencia o crypto, o en ARS con factura electrónica Monotributo.

#### client
Trabajo con 50% al arrancar y 50% cuando entrego el proyecto terminado. Para proyectos grandes podemos dividirlo en tres pagos atados a avances concretos. Emito factura.

### Q: ¿Cómo es el proceso de trabajo?
Tags: proceso, metodologia, etapas
Variants:
- ¿Cómo trabajás con los clientes?
- ¿Qué pasa después de que te escribo?
- ¿Cuáles son las etapas?

#### dev
1. Call de discovery (30 min) para entender el proyecto. 2. Propuesta con scope, stack y precio. 3. Kickoff con wireframes o arquitectura según el tipo. 4. Desarrollo iterativo con demos semanales. 5. Entrega + handoff con documentación básica.

#### client
Primero nos juntamos en una videollamada corta para entender bien lo que necesitás. Después te mando una propuesta concreta con precio y plazo. Una vez que arrancamos, te muestro avances todas las semanas para que siempre sepas en qué estamos.

### Q: ¿Qué pasa después de que entregás el proyecto?
Tags: soporte, post-entrega, mantenimiento, garantia
Variants:
- ¿Ofrecés soporte?
- ¿Qué hago si algo se rompe?
- ¿Incluye garantía?

#### dev
30 días de garantía de bugs post-entrega sin costo. Soporte y mantenimiento mensual disponible como servicio adicional. Para clientes recurrentes tengo disponibilidad prioritaria.

#### client
Incluyo 30 días de soporte para corregir cualquier problema que aparezca luego de la entrega, sin costo extra. Después de eso puedo ofrecerte un plan de mantenimiento mensual si lo necesitás, o te dejo todo documentado para que lo maneje otro.

---

## stack · técnico

### Q: ¿Qué stack usás?
Tags: stack, tecnologias, herramientas
Variants:
- ¿Con qué tecnologías trabajás?
- ¿Usás React?
- ¿Qué base de datos usás?

#### dev
Stack principal: Next.js 14/15, TypeScript, Tailwind, shadcn/ui, Supabase (Postgres + Auth + Storage), Prisma, Vercel. Para backends standalone: Node/Express en Railway. Pagos: Mercado Pago. Email: Resend. Agentes: Mastra + Inngest.

#### client
Trabajo con las tecnologías más modernas del mercado: sitios rápidos, seguros y fáciles de escalar. No uso WordPress ni constructores visuales: todo el código es limpio y mantenible a largo plazo.

### Q: ¿Por qué Next.js?
Tags: nextjs, react, framework
Variants:
- ¿Por qué no usás otra cosa?
- ¿Qué ventaja tiene Next.js?

#### dev
Server components + RSC reducen JS en el cliente, el App Router permite layouts anidados y loading states nativos, y el deploy en Vercel es trivial con preview branches por PR. Para mis clientes SME es el mejor balance entre DX y performance producción.

#### client
Es el framework que mejor combina velocidad, seguridad y facilidad de mantenimiento. Los sitios cargan rapido, aparecen bien en Google y son fáciles de actualizar sin tocar código cada vez.

### Q: ¿Usás inteligencia artificial en los proyectos?
Tags: ia, agentes, ai, inteligencia artificial
Variants:
- ¿Integrás IA en los desarrollos?
- ¿Podés agregarle IA a mi producto?
- ¿Hacés automatizaciones con IA?

#### dev
Si, es mi foco actual. Integro LLMs (Gemini, Groq, Claude) via API, armo agentes con Mastra y orquesto flujos con Inngest. También hago automatizaciones con n8n para clientes que no necesitan código custom.

#### client
Si, puedo agregar inteligencia artificial a tu negocio: desde un chatbot que responde consultas hasta sistemas que automatizan tareas repetitivas. Lo adapto a lo que realmente necesitás, sin sobrecomplicar.

### Q: ¿Usás WordPress o Webflow?
Tags: wordpress, webflow, cms, no-code
Variants:
- ¿Hacés sitios en Wix?
- ¿Trabajás con constructores visuales?

#### dev
No trabajo con WordPress ni Webflow para proyectos nuevos. Para clientes que necesitan un CMS visual, puedo integrar Sanity o similar con Next.js. Para landing pages simples puedo recomendar alternativas no-code si el proyecto no justifica desarrollo custom.

#### client
No uso WordPress ni constructores visuales para los proyectos que desarrollo. Esas plataformas tienen limitaciones y costos de mantenimiento que con el tiempo se vuelven un problema. Si tu caso lo justifica, te lo digo con honestidad.

---

## contacto

### Q: ¿Cómo te contacto?
Tags: contacto, whatsapp, email
Variants:
- ¿Tenés WhatsApp?
- ¿Cómo te escribo?
- ¿Cuál es tu email?

#### dev
Email: robertinobarbuto@gmail.com · GitHub: rober8b · WhatsApp y Cal.com en la sección Contacto del menú.

#### client
Mandame un WhatsApp directo desde el botón verde en la página, o un email a robertinobarbuto@gmail.com. Respondo en el día.

### Q: ¿Tenés disponibilidad ahora?
Tags: disponibilidad, agenda, empezar
Variants:
- ¿Podés arrancar pronto?
- ¿Tenés lugar para un proyecto nuevo?
- ¿Cuándo podés empezar?

#### dev
Disponibilidad variable según el mes. Lo mejor es escribirme directamente para chequear. Tengo agenda de calls en Cal.com (link en la sección Contacto).

#### client
Depende del momento, tengo lugar para proyectos nuevos de forma intermitente. Escribime y te cuento cómo está mi agenda. Si no puedo arrancar de inmediato, te digo cuándo puedo y lo reservamos.

---

## easter eggs

### Q: ¿Qué es el AI Policy Design Sprint?
Tags: policython, ucema, politica, ia
Variants:
- ¿Qué es el Policython?
- ¿Participaste en algo de política de IA?

#### dev
Fui mentor en el Policython UCEMA, un evento de diseño de políticas de IA con 50 participantes y 4 tracks temáticos. Ayudé a equipos a estructurar propuestas regulatorias alrededor de casos de uso concretos.

#### client
Participé como mentor en un evento universitario donde estudiantes diseñaban políticas públicas sobre inteligencia artificial. Me interesa que la IA se desarrolle bien, no solo que funcione.

### Q: ¿Qué hiciste en el hackathon de Anthropic?
Tags: hackathon, anthropic, kaszek, nomos
Variants:
- ¿Participaste en algún hackathon?
- ¿Ganaste algún hackathon?

#### dev
Construí Nomos en el hackathon Anthropic x Kaszek en Buenos Aires: un marketplace de agentes con routing inteligente por costo/capacidad, SSE streaming y panel de ahorro en tiempo real. Stack: Next.js 16, React 19, TypeScript, Tailwind v4. No quedamos en los puestos, pero el proyecto siguió vivo.

#### client
Participé en un hackathon organizado por Anthropic (la empresa detrás de Claude) y el fondo de inversión Kaszek en Buenos Aires. En 48 horas armé un prototipo funcional de mi idea de plataforma de agentes de IA. Fue una experiencia que me confirmó que voy por el camino correcto.

### Q: ¿Qué estás estudiando?
Tags: ucema, estudio, carrera, formacion
Variants:
- ¿Tenés formación universitaria?
- ¿Estás cursando algo?

#### dev
Negocios Digitales en UCEMA (cursando) y un programa ejecutivo de IA Generativa para Programadores. Foco en la intersección entre producto digital, estrategia y desarrollo técnico.

#### client
Estoy cursando Negocios Digitales en UCEMA y un programa de especialización en inteligencia artificial. Me interesa entender el negocio detrás de la tecnología, no solo escribir código.

### Q: ¿Usás IA para programar?
Tags: ia, claude, cursor, herramientas dev
Variants:
- ¿Usás Cursor o Copilot?
- ¿Programás con IA?
- ¿Claude Code?

#### dev
Si, uso Claude Code como agente principal para implementación y Claude.ai para arquitectura y generación de prompts. El workflow es: yo diseño la arquitectura y el scope, Claude Code implementa bajo instrucciones explícitas con commits por cambio lógico.

#### client
Si, uso las mejores herramientas disponibles para trabajar más rápido y con menos errores. Eso no significa que el código sea genérico: siempre reviso, dirijo y adapto todo a tu proyecto específico.