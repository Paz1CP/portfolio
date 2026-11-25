# Portfolio — Encargo maestro de implementación

> Destinatario: Codex, trabajando sobre el repositorio local del portfolio. Este documento es la especificación de implementación y la fuente de verdad editorial de la actualización. El copy EN/ES incluido es definitivo: impleméntalo, no lo sustituyas por versiones propias ni por texto provisional.

## 1. Objetivo y límites del encargo

Actualiza integralmente `christopherpaz.dev` para que represente el perfil profesional actual de Christopher Paz León:

**Software Engineer | Backend · Full-Stack · Applied AI**

El objetivo es conseguir oportunidades laborales remotas e internacionales en ingeniería de software. El portfolio debe comunicar especialización backend, capacidad full-stack, Applied AI, experiencia en producción y responsabilidad técnica integral. La evidencia debe estar en los productos, decisiones de ingeniería, resultados y recursos reales, no en claims grandilocuentes.

No estamos construyendo una nueva web. Conserva la aplicación Next.js existente, su diseño, componentes, identidad, animaciones y recursos reutilizables. La intervención consiste en reorganizar secciones, sustituir contenido, integrar multimedia existente y adaptar los componentes estrictamente necesarios.

### Reglas innegociables

- No rediseñar el sistema visual: conservar paleta oscura/dorada, Instrument Sans, Libre Baskerville, fotografía, firma, fondos interactivos, grain, vignette, tarjetas, esquinas decorativas, superficies, bordes, jerarquías y efectos existentes.
- Mantener el Side Dock tal como se ve y funciona; únicamente retirar/reordenar iconos y actualizar sus destinos y etiquetas.
- Fusionar Work y Experience. No presentar una sección Selected Work independiente, ni utilizar «Case Study», «Selected Work», «Caso de estudio» o «Proyectos seleccionados» como labels visibles. Los detalles se abren dentro de la experiencia laboral, utilizando los modales existentes.
- Retirar Services/Build de la página principal, navegación y copy comercial asociado. No crear una nueva página comercial en este encargo.
- Mirai es un proyecto independiente no comercial, no una empresa, relación laboral con un cliente ni servicio comercial en explotación. Mantener esta distinción dentro de Experience. No atribuirle ingresos, clientes, usuarios o éxito de contratación.
- CookPilot no se degrada a una app Flutter ni pierde su carácter de producto complejo. JobMatch conserva sus resultados. 4Track conserva el cargo real y su contexto mobile empresarial.
- No incluir tecnologías del roadmap no demostradas (AWS, Python avanzado, FastAPI, Kubernetes, Terraform, Kafka, etc.). No confundir S3-compatible con AWS. No afirmar microservicios, exactly-once, disponibilidad garantizada o seguridad absoluta.
- No generar ni solicitar más imágenes, logos, PDFs, vídeos o mockups. Todos los recursos necesarios están disponibles. No modificar los CV definitivos.
- No introducir auditorías técnicas generales, nuevas suites de tests, Lighthouse, migraciones de framework, CMS, backend, autenticación, refactorizaciones masivas ni nuevas dependencias por iniciativa propia. Los controles finales se limitan a la presentación y los recorridos modificados. No desplegar ni publicar remotamente salvo instrucción explícita posterior.
- Trabajar sobre el estado local actual; no sobrescribir cambios del usuario ni revertir archivos ajenos al alcance.

## 2. Repositorio y referencias

- Workspace: `C:\Users\paz1dv\Desktop\dev\portfolio`.
- Repositorio: https://github.com/Paz1CP/portfolio — rama `master` como referencia de la auditoría; respetar la rama de trabajo local.
- Mirai: https://github.com/Paz1CP/mirai — rama `main`.
- CookPilot: https://github.com/Paz1CP/cookpilot — rama `dev` (minúsculas).
- CV aprobados: `public/Christopher_Paz_CV.pdf` y `public/Christopher_Paz_CV_es.pdf`. Ya sustituidos por el usuario; no regenerar ni editar.

Fuentes de ingeniería de Mirai:

- [README y propósito no comercial](https://github.com/Paz1CP/mirai/blob/main/README.md).
- [Arquitectura](https://github.com/Paz1CP/mirai/blob/main/docs/architecture/mirai_architecture.md).
- [Flujo E2E](https://github.com/Paz1CP/mirai/blob/main/docs/product/mirai_workflow_e2e.md).
- [Runtime del agente](https://github.com/Paz1CP/mirai/blob/main/docs/features/agent/mirai_agent_implementation.md), [navegador](https://github.com/Paz1CP/mirai/blob/main/docs/features/browser/mirai_browser_implementation.md).
- [Infraestructura](https://github.com/Paz1CP/mirai/blob/main/docs/platform/mirai_infrastructure_and_deployment.md), [CI/CD](https://github.com/Paz1CP/mirai/blob/main/docs/platform/mirai_ci_cd.md), [seguridad](https://github.com/Paz1CP/mirai/blob/main/docs/platform/mirai_security_and_privacy.md), [SDLC](https://github.com/Paz1CP/mirai/blob/main/docs/product/mirai_product_development_lifecycle.md), [billing](https://github.com/Paz1CP/mirai/tree/main/apps/api/src/features/billing).

Fuentes de CookPilot (documentación de referencia para el contenido, no necesariamente pública; no exponer links privados en la web):

- `docs/product/cookpilot_product_canonical.md`, `cookpilot_core_infrastructure.md`, `cookpilot_quantities_and_units.md`, `cookpilot_pricing_comparison_time_canon.md`.
- `docs/cookplan/cookplan_canonical_documentation.md`, `docs/cookimport/cookimport_technical_documentation.md`, `docs/cooklist/cooklist_technical_documentation.md`.
- `docs/cookmode/cookmode_technical_documentation.md`, `docs/cookmode/cookmode_hands_free_white_paper.md`, `docs/cookmatch/CookMatch_Arquitectura_Canonica_Definitiva.md`.
- `docs/cookbilling/cookbilling_technical_documentation.md`, `docs/cookbilling/cookbilling_stores_technical_documentation.md`, `docs/cookcdn/CookPilot_Cloudflare_Media.md`, `docs/cookanalytics/CookPilot_Analytics_PostHog.md`.

El contenido siguiente ya sintetiza las fuentes revisadas. No delegar la escritura a otro agente ni iniciar otra auditoría. Si una afirmación de implementación resulta contradicha por una fuente local accesible, no inventar una corrección: conservar la parte respaldada y reportar puntualmente la discrepancia.

## 3. Arquitectura de información y composición visual

### 3.1 Estructura final

```text
Home (#hero)
Experience (#experience)
  Mirai — tarjeta destacada
  CookPilot
  JobMatch
  4Track / VistoGPS
  Modal de detalles de experiencia (reutilizable)
Capabilities (#capabilities)
  7 cards
Contact (#contact)
Footer
```

En `ClientHome.tsx`, retirar el render de `SelectedWork` y `Build`; reutilizar sus recursos pertinentes en Experience. Mantener el componente de modal montado una única vez. Los componentes retirados y sus archivos de recursos pueden permanecer en el repo si no interfieren; no hacer una limpieza destructiva.

Side Dock: conservar los iconos actuales correspondientes a Home, Experience, Capabilities y Contact, en ese orden, y el selector de idioma en su posición habitual. Eliminar únicamente los accesos Work y Build. Mantener variante de iconos, magnificación, indicador activo, navegación móvil y estilo existente. Renumerar índices 01–04.

### 3.2 Diseño de la timeline

Conservar la timeline de dos columnas: fechas, cargo y empresa a la izquierda; tarjeta de evidencia a la derecha. Incorporar la portada de cada producto en su tarjeta, evitando duplicar información en otra sección.

- En desktop, meta ~25–30% y contenido ~70–75%, adaptado a las medidas existentes de `site-shell-wide`. Mantener alineación y ritmo vertical. Aumentar moderadamente la anchura útil de Experience y Capabilities si el layout actual desperdicia demasiado espacio; no expandir Hero a pantalla completa ni eliminar su espacio editorial.
- Mirai: primera tarjeta, destacada con borde/acento dorado existente y portada grande horizontal a todo el ancho de la zona de contenido, sin introducir una segunda familia de cards. Logo, nombre/contexto si procede, resumen, impacto, detalles, tags y acciones. La portada debe verse completa y no competir con el texto. Los enlaces de GitHub, aplicación y documentación quedan visibles directamente sin abrir modal.
- CookPilot, JobMatch y 4Track: mismas superficies y tipografía, con sus portadas existentes. En desktop se puede colocar la portada a la izquierda del resumen dentro de la card si hay ancho suficiente; si el texto o imagen se comprime, usar portada arriba. Mantener las tres experiencias en la timeline, no una grilla de proyectos separada. CookPilot merece peso comparable en contenido y evidencia, aunque Mirai tenga destaque visual por actualidad.
- Cada tarjeta incluye solo una descripción del producto, un bloque de contribución/impacto, dos detalles breves, tags y CTA. Los detalles técnicos extensos pertenecen al modal. No duplicar una segunda descripción comercial.
- CTA único para abrir detalles: `View experience` / `Ver experiencia`. Usar enlace o botón semántico, sin anidar botones en una tarjeta con `role=button`. Los enlaces externos deben funcionar independientemente, sin abrir el modal por propagación del evento.
- En móvil: meta encima de la tarjeta, imagen y texto apilados, tags con wrap, CTA accesibles. No ocultar imágenes ni reducir fuentes para forzar una fila.
- Mantener la estética de las galerías/modales actuales. Las capturas reales pueden ampliarse. La imagen de arquitectura debe ir en un bloque de arquitectura independiente, con `object-fit: contain`, sin recortes ni redibujos.

### 3.3 Capabilities: siete cards definitivas

Orden: Backend Engineering, Applied AI Engineering, Cloud & DevSecOps, Payments & Billing, Software & Product Engineering, UX/UI Systems, Production Delivery. No crear cards independientes de Data & Persistence, Full-Stack & Mobile Development ni Mobile Product Development. El modelado relacional queda integrado en Backend; full-stack y mobile se demuestran en Hero y Experience, y en los tags pertinentes de Software & Product Engineering.

Conservar el diseño exacto de cada card: icono, numeración, título, descripción, una imagen, chips y ornamentación. Adaptar solo el grid a siete elementos: desktop 3 + 2 + 2 (primera fila de tres cards; segunda y tercera de dos cards más anchas). Con un grid de seis columnas, spans 2 / 3 / 3 respectivamente; tablet dos columnas con última card a ancho completo si hace falta; móvil una columna. No crear un bento completamente distinto. Los iconos pueden actualizarse en el mismo estilo existente: Server, Bot, Cloud, Wallet/CreditCard, Layers/Workflow, Palette y Rocket (o equivalentes disponibles en lucide-react).

Las capturas/diagramas deben conservar su propia paleta y composición. No aplicar overlays que eliminen contraste, ni transformar todo en una estética uniforme. Dentro del marco existente, preferir `contain` cuando el contenido sea informativo. Mantener títulos y cuerpo legibles a tamaño normal y ajustar alineación vertical sin alturas rígidas que recorten texto.

### 3.4 Modales y enlaces directos

Reutilizar `CaseStudyModal.tsx`, Radix Dialog, animaciones, carrusel y estructura visual actual. Se puede mantener el nombre interno del archivo/componente/evento para reducir cambios; la terminología visible debe ser Experience. Mantener cabecera con logo, título, cierre; zona inicial de galería y tarjeta de rol/periodo/contexto; ownership, trabajo principal, secciones técnicas, workflow, evidencias y tags según cada experiencia. Las fichas no necesitan idéntica cantidad de bloques: Mirai y CookPilot requieren mayor profundidad.

Para hacer las fichas compartibles sin crear rutas ni páginas nuevas, usar `/?experience=<slug>#experience` como contrato de URL (por ejemplo `/?experience=mirai#experience`). Abrir el modal correspondiente al entrar con un slug válido y mantener el estado sincronizado al abrir, cerrar y navegar atrás/adelante. Preservar otros parámetros. No abrir un modal para slug desconocido. Mantener el idioma seleccionado al abrir/cerrar. Al cerrar desde un enlace directo, permanecer en Experience, no abandonar el sitio. Mantener recuperación del foco y scroll del diálogo existentes. No hacer otra arquitectura de routing.

Actualizar la galería existente solo donde sea necesario: imágenes con alt descriptivo, controles anterior/siguiente accesibles sin hover (también touch), posibilidad de pausar el avance automático y lightbox con cierre correcto. Respetar reduced motion. No crear una nueva galería.

### 3.5 Idiomas y enlaces heredados

Inglés predeterminado. Mantener los dos diccionarios `en.json` / `es.json` y el selector actual. Persistir preferencia de idioma con el mecanismo mínimo apropiado (por ejemplo localStorage validado), actualizar `document.documentElement.lang`; no crear rutas `/en` y `/es`, ni implementar hreflang sin rutas reales. Localizar todos los nuevos campos, acciones, labels internos, descripciones de imágenes y accesibilidad visible.

Los anchors antiguos `#work` deben llevar a `#experience`, y `#build` a `#contact`. Actualizar la redirección existente `/build` para apuntar a `/#contact` en lugar del anchor eliminado. Conservar URLs/anchors válidos del resto de la web. No cambiar el dominio canónico existente.

## 4. Recursos multimedia — mapa definitivo

Las rutas siguientes son rutas públicas (sin el prefijo `public`). Respetar mayúsculas y minúsculas. Los archivos de Mirai son locales; el logo está en el workspace indicado por el usuario aunque en la revisión remota anterior no aparecía. No crear sustitutos ni duplicar `mirai_billing.png`.

### 4.1 Portadas y logos de Experience

| Slug | Portada | Logo |
|---|---|---|
| `mirai` | `/images/experience/mirai/mirai_product_showcase.png` | `/images/experience/mirai/mirai_logo.svg` |
| `cookpilot` | `/images/experience/cookpilot_product_proof.webp` | `/images/experience/CookPilot/cookpilot_logo.png` |
| `jobmatch` | `/images/experience/jm_product_proof.webp` | `/images/experience/JM/jobmatch_orange.jpg` |
| `4track-vistogps-pro` | `/images/experience/4track_mobile_store_map.webp` | `/images/experience/4TRACK/4track-logo.webp` |

Alt de portadas EN / ES:

- Mirai: `Mirai chat, campaign dashboard and CV editor shown together.` / `Chat, dashboard de campañas y editor de CV de Mirai en una composición.`
- CookPilot: `CookPilot mobile screens showing meal planning and cooking assistance.` / `Pantallas móviles de CookPilot con planificación de comidas y asistencia culinaria.`
- JobMatch: `JobMatch recruiting and candidate management interfaces.` / `Interfaces de reclutamiento y gestión de candidatos de JobMatch.`
- 4Track: `4Track and VistoGPS mobile interfaces with real-time maps and vehicle tracking.` / `Interfaces móviles de 4Track y VistoGPS con mapas y seguimiento vehicular en tiempo real.`

### 4.2 Galería Mirai

Base: `/images/experience/mirai/`.

| Archivo | Caption/alt EN | Caption/alt ES |
|---|---|---|
| `mirai_chat.png` | Agent conversation and tool execution | Conversación del agente y ejecución de herramientas |
| `mirai_dashboard.png` | Campaign status and application tracking | Estado de campañas y seguimiento de postulaciones |
| `mirai_library.png` | Document and CV library | Biblioteca de documentos y CV |
| `mirai_cv_editor.png` | Professional profile and CV editor | Perfil profesional y editor de CV |
| `mirai_billing.png` | Billing and inference usage interface | Interfaz de billing y consumo de inferencia |

La arquitectura `mirai_system_architecture.png` se muestra en su propio bloque; alt EN: `Logical architecture of Mirai, connecting the web client, browser extension, modular API, agent runtime and external services.` ES: `Arquitectura lógica de Mirai que conecta el cliente web, la extensión, la API modular, el runtime del agente y los servicios externos.` No agregar `mirai_agent_execution.png`. No crear más screenshots.

### 4.3 Galerías existentes

Conservar los archivos y el orden de las galerías actuales. Usar los siguientes labels descriptivos (adaptarlos únicamente si una imagen concreta muestra algo distinto al nombre):

- CookPilot: `img_app_home.png` — Home and daily planning / Inicio y planificación diaria; `img_app_recipe_detail.png` — Recipe details / Detalle de receta; `img_app_cookflow_chat.jpg` — Cooking assistance / Asistencia culinaria; `cookpilot.png` — CookPilot product interface / Interfaz de CookPilot; `img_app_pricing_comparator.png` — Recipe cost comparison / Comparación de costos de recetas. Base `/images/experience/CookPilot/`.
- JobMatch: `jm_candidate_dashboard.png` — Candidate dashboard / Panel de candidatos; `jm_candidate_job_search.png` — Job search / Búsqueda de empleo; `jm_candidate_applications_lane.png` — Application tracking / Seguimiento de postulaciones; `jm_recruiter_kanban_mode.png` — Recruiter pipeline / Pipeline de reclutamiento. Base `/images/experience/JM/`. Conservar los otros recursos existentes si ya se usan, sin crear nuevos.
- 4Track: conservar `/images/experience/4TRACK/4T_01.png` a `4T_04.png`, con alt localizado que describa el contenido visible de cada captura (no atribuir funciones no visibles).

### 4.4 Imágenes de Capabilities

| Capacidad | Ruta pública |
|---|---|
| Backend Engineering | `/images/capabilities/backend_engineering.png` |
| Applied AI Engineering | `/images/capabilities/applied_ai_engineering.png` |
| Cloud & DevSecOps | `/images/capabilities/cloud_devsecops.png` |
| Payments & Billing | `/images/experience/mirai/mirai_billing.png` |
| Software & Product Engineering | `/images/capabilities/software_product_engineering.png` |
| UX/UI Systems | `/images/capabilities/ux_ui_proof.png` |
| Production Delivery | `/images/capabilities/deployment_proof.png` |

No crear `payments_billing.png`. No utilizar `mobile_dev_proof.png`, `backend_proof.png` ni `aiflow_proof.png` en las nuevas cards. No borrar archivos históricos por el hecho de no usarlos.

## 5. Copy definitivo — identidad, Home y navegación

El cargo profesional canónico se escribe exactamente igual en ambos idiomas: **Software Engineer | Backend · Full-Stack · Applied AI**. No usar & para sustituir la separación acordada ni cambiar el headline del CV. Mantener el nombre con tilde.

| Campo | EN | ES |
|---|---|---|
| Nombre visible en Hero | Christopher Paz León | Christopher Paz León |
| Availability | Available for remote work | Disponible para trabajo remoto |
| Eyebrow | Software Engineer \| Backend · Full-Stack · Applied AI | Software Engineer \| Backend · Full-Stack · Applied AI |
| H1 | I design, build and ship software systems. | Diseño, construyo y despliego sistemas de software. |
| Subheadline | I build backend systems, full-stack applications and autonomous agents, from software architecture and data modeling to cloud deployment. | Construyo sistemas backend, aplicaciones full-stack y agentes autónomos, desde la arquitectura de software y el modelado de datos hasta el despliegue cloud. |
| Primary CTA | Contact me | Contáctame |
| Secondary CTA | View resume | Ver CV |
| Micro proof | Production-focused, async-friendly, and open to international remote teams. | Enfocado en producción, trabajo asíncrono y colaboración con equipos remotos internacionales. |
| Ornament 1 | LATAM / US Time Zones | Zonas horarias LATAM / US |
| Ornament 2 | English C1 | Inglés C1 |
| Ornament 3 | Remote · Contractor | Remoto · Contractor |

El nombre debe aparecer discretamente como texto visible sobre el cargo, en el mismo bloque de identidad. No convertirlo en otro H1, ni colocar un texto sobre el rostro. Mantener la composición de texto a la izquierda, fotografía y firma a la derecha, botones y disponibilidad. Ajustar el wrapping del H1 al ancho disponible para que respire como el original. En español puede ocupar una línea más; no reducir el tamaño de fuente artificialmente.

Navegación:

| ID | EN | ES | Aria EN | Aria ES |
|---|---|---|---|---|
| `hero` | Home | Inicio | Go to home section | Ir a la sección de inicio |
| `experience` | Experience | Experiencia | Go to experience section | Ir a la sección de experiencia |
| `capabilities` | Capabilities | Capacidades | Go to capabilities section | Ir a la sección de capacidades |
| `contact` | Contact | Contacto | Go to contact section | Ir a la sección de contacto |

Etiquetas Hero EN / ES: `Email Christopher Paz León` / `Contactar por correo a Christopher Paz León`; `View Christopher Paz León's resume` / `Ver el CV de Christopher Paz León`; `Contact via WhatsApp` / `Contactar por WhatsApp`.

## 6. Copy definitivo — Experience (timeline)

| Campo | EN | ES |
|---|---|---|
| Eyebrow | Experience | Experiencia |
| H2 | Engineering across products and systems. | Ingeniería en productos y sistemas. |
| Intro | My work spans backend architecture, autonomous agents, full-stack and mobile products, with ownership from implementation to production. | Mi trabajo abarca arquitectura backend, agentes autónomos y productos full-stack y móviles, con responsabilidad desde la implementación hasta producción. |
| Impact label | Why it matters | Por qué importa |
| CTA | View experience | Ver experiencia |

Los tags tecnológicos indicados son iguales en ambos idiomas, excepto términos expresamente localizados. No reproducir aquí la lista completa del CV. Cada entrada se identifica por slug explícito, no por posición del array; el orden es el siguiente.

### 6.1 Mirai — `mirai`

**EN**

- Date: Nov 2026 – Present
- Role: Full-Stack Software Engineer
- Company: Mirai
- Context label: Independent · Non-commercial project
- Summary: Autonomous agent for job search, opportunity discovery, application preparation and campaign tracking through the user's local browser.
- Why it matters: An end-to-end engineering project with inspectable code, distributed browser execution, transactional billing and verified cloud release and rollback workflows.
- Details: Designed a modular Node.js backend with PostgreSQL, shared TypeScript contracts and concurrency controls. / Built the agent runtime and local browser bridge, integrating Vertex AI, MCP, payments and Google Cloud delivery.

**ES**

- Fecha: Nov 2026 – Presente
- Cargo: Full-Stack Software Engineer
- Empresa: Mirai
- Contexto: Proyecto independiente · No comercial
- Resumen: Agente autónomo para la búsqueda de empleo, descubrimiento de oportunidades, preparación de candidaturas y seguimiento de campañas mediante el navegador local del usuario.
- Por qué importa: Proyecto de ingeniería de extremo a extremo con código inspeccionable, ejecución distribuida sobre el navegador, billing transaccional y procesos verificados de entrega y rollback en cloud.
- Detalles: Diseñé un backend modular en Node.js con PostgreSQL, contratos compartidos en TypeScript y controles de concurrencia. / Construí el runtime del agente y el puente al navegador local, integrando Vertex AI, MCP, pagos y entrega en Google Cloud.

**Tags:** TypeScript · Node.js · Express · PostgreSQL · Next.js · Google ADK · Vertex AI · MCP · WebSockets · GCP · Docker · CI/CD · Paddle.

Acciones externas visibles: `GitHub` (ambos), `Live app` / `Aplicación`, `Technical documentation` / `Documentación técnica`. URLs exactas en §7.1. Mantener el CTA de detalles.

### 6.2 CookPilot — `cookpilot`

**EN**

- Date: Oct 2025 – Nov 2026
- Role: Founder & Lead Product Engineer
- Company: CookPilot
- Context label: Own product
- Summary: A culinary operating system connecting meal planning, recipes, nutrition, shopping, costs and cooking assistance within a single mobile product.
- Why it matters: Built and launched the complete product, combining a complex relational domain, centralized pricing, persistent cooking sessions, multimodal AI and multi-store monetization.
- Details: Designed the PostgreSQL/Supabase backend and shared business rules for planning, shopping, nutrition and execution. / Implemented Flutter interfaces, OpenRouter integrations, MediaPipe, billing, analytics and native store releases.

**ES**

- Fecha: Oct 2025 – Nov 2026
- Cargo: Founder & Lead Product Engineer
- Empresa: CookPilot
- Contexto: Producto propio
- Resumen: Sistema operativo culinario que conecta planificación de comidas, recetas, nutrición, compras, costos y asistencia durante la cocina en un único producto móvil.
- Por qué importa: Construí y lancé el producto completo, integrando un dominio relacional complejo, pricing centralizado, sesiones persistentes de cocina, IA multimodal y monetización en múltiples tiendas.
- Detalles: Diseñé el backend PostgreSQL/Supabase y las reglas de negocio compartidas para planificación, compra, nutrición y ejecución. / Implementé interfaces Flutter, integraciones con OpenRouter, MediaPipe, billing, analítica y publicación en tiendas.

**Tags:** Flutter · Dart · Riverpod · PostgreSQL · Supabase · RLS · RPCs · Edge Functions · OpenRouter · MediaPipe · RevenueCat · Huawei IAP · PostHog · Cloudflare.

### 6.3 JobMatch — `jobmatch`

**EN**

- Date: May 2025 – Mar 2026
- Role: Technical Product Lead — Contract
- Company: JobMatch S.A.S.
- Context label: Hybrid · Peru
- Summary: Recruiting and AI-assisted job-matching platform for candidates, companies and recruiters. Led the architecture and implementation of its core MVP.
- Why it matters: The MVP served 100+ users, and my technical contribution supported the product foundation behind PEN 67,000 in ProInnóvate / Startup Perú 12G funding.
- Details: Implemented authentication, profiles, vacancies, applications, dashboards and the PostgreSQL backend. / Developed the matching workflow, migrated the platform from Flutter Web toward Next.js, and handed over the technical foundation for V1.

**ES**

- Fecha: May 2025 – Mar 2026
- Cargo: Technical Product Lead — Contract
- Empresa: JobMatch S.A.S.
- Contexto: Híbrido · Perú
- Resumen: Plataforma de reclutamiento y matching laboral asistido por IA para candidatos, empresas y reclutadores. Lideré la arquitectura e implementación de la base del MVP.
- Por qué importa: El MVP fue utilizado por más de 100 usuarios y mi contribución técnica respaldó la base del producto que obtuvo S/67 000 en financiamiento de ProInnóvate / Startup Perú 12G.
- Detalles: Implementé autenticación, perfiles, vacantes, postulaciones, dashboards y backend PostgreSQL. / Desarrollé el flujo de matching, migré la plataforma de Flutter Web hacia Next.js y entregué la base técnica para la V1.

**Tags:** Next.js · Flutter Web · Supabase · PostgreSQL · SQL · RLS · Edge Functions · Applied AI · Technical Leadership · Handoff.

### 6.4 4Track / VistoGPS — `4track-vistogps-pro`

**EN**

- Date: Oct 2024 – Oct 2025
- Role: Mobile Software Engineer
- Company: 4Track / VistoGPS · 4Track S.A.S.
- Context label: Remote · Colombia
- Summary: Real-time GPS tracking and fleet management platform. Redesigned and developed its production mobile applications as the sole mobile/frontend owner.
- Why it matters: Delivered mobile software for a platform serving 5,000+ customers, working directly with backend and infrastructure teams and releasing apps across three stores.
- Details: Implemented real-time GPS tracking, WebSockets, maps, mobile architecture and native integrations. / Integrated custom backend authentication and push notifications, biometrics, offline synchronization and local persistence.

**ES**

- Fecha: Oct 2024 – Oct 2025
- Cargo: Mobile Software Engineer
- Empresa: 4Track / VistoGPS · 4Track S.A.S.
- Contexto: Remoto · Colombia
- Resumen: Plataforma de seguimiento GPS en tiempo real y gestión de flotas vehiculares. Rediseñé y desarrollé sus aplicaciones móviles en producción como único responsable mobile/frontend.
- Por qué importa: Entregué software móvil para una plataforma utilizada por más de 5 000 clientes, colaborando directamente con equipos de backend e infraestructura y publicando apps en tres tiendas.
- Detalles: Implementé seguimiento GPS en tiempo real, WebSockets, mapas, arquitectura móvil e integraciones nativas. / Integré autenticación y notificaciones push con backend propio, biometría, sincronización offline y persistencia local.

**Tags:** Flutter · Dart · Riverpod · Clean Architecture · WebSockets · GPS · Maps · Offline Sync · Biometrics · Push Notifications · Codemagic · Store Releases.

## 7. Copy definitivo — modales de experiencia

### Convenciones comunes

Conservar los roles y fechas de §6. Reutilizar el componente y su composición. Usar las siguientes etiquetas localizadas según los bloques que existan; no mostrar secciones vacías. Los textos de cada ficha son definitivos; los tags de cada ficha son los de §6, ampliados únicamente con los que aquí se especifican. No duplicar la portada dentro del carrusel si ya está en la timeline.

| Elemento | EN | ES |
|---|---|---|
| Role | Role | Cargo |
| Timeline | Timeline | Periodo |
| Ownership | Ownership | Responsabilidad |
| Key work | Key work | Trabajo principal |
| Architecture | System architecture | Arquitectura del sistema |
| Decisions | Engineering decisions | Decisiones de ingeniería |
| Workflow | Product workflow | Flujo del producto |
| Technical highlights | Technical highlights | Capacidades técnicas |
| Design system | Design system | Sistema de diseño |
| Evidence | Engineering evidence | Evidencia de ingeniería |
| Results | Results | Resultados |
| Current state (histórico) | Delivered scope | Alcance entregado |
| Previous image | Previous image | Imagen anterior |
| Next image | Next image | Imagen siguiente |
| Pause | Pause gallery | Pausar galería |
| Resume | Resume gallery | Reanudar galería |
| Expand | Expand image | Ampliar imagen |
| Close image | Close image | Cerrar imagen |
| Close experience | Close experience | Cerrar experiencia |
| Copy direct link (si se muestra acción) | Copy link | Copiar enlace |

### 7.1 Mirai

**Cabecera y overview**

| Campo | EN | ES |
|---|---|---|
| Eyebrow | Experience / Independent project | Experiencia / Proyecto independiente |
| Title | Autonomous agents and distributed browser execution. | Agentes autónomos y ejecución distribuida sobre el navegador. |
| Role | Full-Stack Software Engineer | Full-Stack Software Engineer |
| Timeline | Nov 2026 – Present | Nov 2026 – Presente |
| Context | Mirai helps candidates discover opportunities, prepare applications and carry out browser tasks within a user-defined mandate. It connects professional profile data, documents, campaigns and application tracking to an autonomous agent operating the user's linked local Chrome. | Mirai ayuda a candidatos a descubrir oportunidades, preparar candidaturas y ejecutar tareas sobre el navegador dentro de un mandato definido por el usuario. Conecta datos profesionales, documentos, campañas y seguimiento de postulaciones con un agente autónomo que opera el Chrome local vinculado. |
| Purpose | Independent, non-commercial project for applied research and end-to-end software engineering. Payment integrations demonstrate system engineering and do not constitute a commercial offering. | Proyecto independiente no comercial de investigación aplicada e ingeniería de software de extremo a extremo. Las integraciones de pago forman parte de la ingeniería del sistema y no constituyen una oferta comercial. |
| Ownership | I designed, implemented and deployed the entire system: product definition, frontend, backend, data architecture, agent runtime, browser extension, billing, security, cloud infrastructure and technical documentation. | Diseñé, implementé y desplegué el sistema completo: definición de producto, frontend, backend, arquitectura de datos, runtime del agente, extensión de navegador, billing, seguridad, infraestructura cloud y documentación técnica. |

Galería inicial según §4.2. Después de Responsibility/Ownership, mostrar el bloque Architecture con `mirai_system_architecture.png` y este texto. No titular la galería «Product Showcase»; puede permanecer sin título, como en el modal original.

**System architecture / Arquitectura del sistema**

EN: A TypeScript monorepo separates the Next.js web application, Express API and WXT browser extension, sharing Zod contracts and CV rendering components. Web and API are deployed as independent Cloud Run services. The API uses a modular monolith with domain modules, Neon PostgreSQL and Drizzle ORM, private S3-compatible object storage, Vertex AI and Paddle. The extension connects the user's local browser to the backend through the workspace WebSocket.

ES: Un monorepo TypeScript separa la aplicación web Next.js, la API Express y la extensión de navegador WXT, compartiendo contratos Zod y componentes de renderizado de CV. Web y API se despliegan como servicios independientes en Cloud Run. La API sigue un monolito modular con módulos de dominio, Neon PostgreSQL y Drizzle ORM, almacenamiento privado compatible con S3, Vertex AI y Paddle. La extensión conecta el navegador local del usuario con el backend mediante el WebSocket del workspace.

Caption EN: `Logical overview of Mirai's architecture.` / ES: `Vista lógica de la arquitectura de Mirai.` La imagen representa componentes y conexiones lógicas, no la topología literal de alojamiento del frontend. La explicación anterior es la autoridad para los límites de despliegue; no añadir diagramas ni editar el recurso existente.

**Key work — render como cards compactas agrupadas (dos columnas en desktop)**

| Tema EN / ES | Texto EN | Texto ES |
|---|---|---|
| Backend & data / Backend y datos | Implemented REST APIs, a modular domain architecture, PostgreSQL persistence, relational constraints, versioned migrations and typed request validation. Used transactions, advisory locks, row-level locking and deterministic identities to coordinate writes and prevent duplicate effects in critical operations. | Implementé APIs REST, una arquitectura modular de dominio, persistencia PostgreSQL, restricciones relacionales, migraciones versionadas y validación tipada de peticiones. Utilicé transacciones, advisory locks, bloqueos de filas e identidades deterministas para coordinar escrituras y evitar efectos duplicados en operaciones críticas. |
| Applied AI / IA aplicada | Built the agent runtime with Google ADK, Vertex AI Agent Engine and Gemini inference. Integrated tool calling, MCP, persistent conversational sessions, context compaction, structured outputs, streaming and user intervention for controlled execution. | Construí el runtime del agente con Google ADK, Vertex AI Agent Engine e inferencia Gemini. Integré tool calling, MCP, sesiones conversacionales persistentes, compactación de contexto, salidas estructuradas, streaming e intervención del usuario para una ejecución controlada. |
| Distributed browser automation / Automatización distribuida del navegador | Connected the cloud runtime to local Chrome through Playwright MCP, a browser model adapter, a workspace WebSocket and the WXT extension using the Chrome Debugger API/CDP. Managed workspace ownership, browser events, cancellation and controlled execution recovery. | Conecté el runtime cloud con Chrome local mediante Playwright MCP, un adaptador del modelo de navegador, el WebSocket del workspace y la extensión WXT con Chrome Debugger API/CDP. Gestioné ownership del workspace, eventos del navegador, cancelación y recuperación controlada de ejecuciones. |
| Product flows & documents / Flujos de producto y documentos | Developed chat, campaign orchestration, application tracking, document ingestion, multimodal extraction, structured professional profiles and CV generation. Used persistent execution state, result reconciliation and event-driven updates through PostgreSQL LISTEN/NOTIFY and WebSockets. | Desarrollé chat, orquestación de campañas, seguimiento de postulaciones, importación documental, extracción multimodal, perfiles profesionales estructurados y generación de CV. Utilicé estado persistente de ejecución, reconciliación de resultados y actualizaciones orientadas a eventos mediante PostgreSQL LISTEN/NOTIFY y WebSockets. |
| Payments & billing / Pagos y billing | Integrated Paddle checkout and signed HMAC-SHA256 webhooks with a prepaid wallet and transactional ledger. Implemented idempotent payment processing, inference usage reservations and settlement, reconciliation and adjustments. | Integré checkout de Paddle y webhooks firmados con HMAC-SHA256 con una wallet de saldo prepago y ledger transaccional. Implementé procesamiento idempotente de pagos, reservas y liquidación del consumo de inferencia, conciliación y ajustes. |
| Security & privacy / Seguridad y privacidad | Implemented JWT authentication with Neon Auth, resource-level authorization, account isolation, private object storage and short-lived signed URLs. Defined tool restrictions, protected the Mirai tab and kept execution within the candidate's mandate and intervention boundaries. | Implementé autenticación JWT con Neon Auth, autorización por recurso, aislamiento de cuentas, almacenamiento privado y URLs firmadas de corta duración. Definí restricciones de herramientas, protegí la pestaña de Mirai y mantuve la ejecución dentro del mandato y los límites de intervención del candidato. |
| Cloud & DevSecOps / Cloud y DevSecOps | Deployed the web and API independently with Docker, Google Cloud Build, Artifact Registry and Cloud Run. Automated CI/CD with GitHub Actions, integration tests against Neon dev, CodeQL, Trivy, OIDC/WIF, migration gates, candidate revisions, health checks and traffic rollback. | Desplegué web y API de forma independiente con Docker, Google Cloud Build, Artifact Registry y Cloud Run. Automaticé CI/CD con GitHub Actions, pruebas de integración contra Neon dev, CodeQL, Trivy, OIDC/WIF, controles de migración, revisiones candidatas, health checks y rollback de tráfico. |
| Engineering lifecycle / Ciclo de ingeniería | Documented product requirements, C4 architecture, shared contracts, domain responsibilities, security, delivery and operations. Organized the implementation around a consistent end-to-end development lifecycle. | Documenté requisitos de producto, arquitectura C4, contratos compartidos, responsabilidades de dominio, seguridad, entrega y operación. Organicé la implementación alrededor de un ciclo de desarrollo end-to-end coherente. |

**Browser execution flow / Flujo de ejecución sobre el navegador**

Usar el componente de workflow existente con chips numerados; no crear otra imagen. Representa la ruta de ejecución (los resultados vuelven al runtime por el camino inverso).

EN: `User mandate → Agent runtime → Playwright MCP → Workspace WebSocket → WXT extension / CDP → Local Chrome → Results and user control`

ES: `Mandato del usuario → Runtime del agente → Playwright MCP → Workspace WebSocket → Extensión WXT / CDP → Chrome local → Resultados y control del usuario`

**Engineering decisions / Decisiones de ingeniería**

Presentar una lista compacta problema → solución con dos columnas de texto o el mismo sistema de tarjetas actual. No crear tabla densa en móvil. Los siguientes pares complementan, no sustituyen, la explicación de arquitectura.

| EN — Problem → Approach | ES — Problema → Solución |
|---|---|
| Cloud agent needs local browser access → An extension-backed WebSocket/CDP bridge connects the runtime to the candidate's own Chrome. | El agente cloud necesita acceder al navegador local → Un puente WebSocket/CDP mediante la extensión conecta el runtime al Chrome del candidato. |
| Concurrent operations compete for ownership → PostgreSQL locks and conditional state transitions coordinate the workspace and critical writes. | Operaciones concurrentes compiten por ownership → Locks de PostgreSQL y transiciones condicionales coordinan el workspace y las escrituras críticas. |
| Requests and provider events can repeat → Idempotent identities, transactions and reconciliation protect persistence and billing. | Las peticiones y eventos de proveedores pueden repetirse → Identidades idempotentes, transacciones y reconciliación protegen la persistencia y el billing. |
| Execution or streaming can be interrupted → Persistent state, checkpoints, cursors and controlled recovery preserve context where supported; disconnection cancels affected executions. | La ejecución o el streaming pueden interrumpirse → Estado persistente, checkpoints, cursores y recuperación controlada conservan el contexto donde está soportado; la desconexión cancela las ejecuciones afectadas. |
| Inference costs vary with usage → Wallet reservations, transactional ledger and usage settlement account for the actual consumption. | El costo de inferencia varía con el uso → Reservas de saldo, ledger transaccional y liquidación contabilizan el consumo efectivo. |
| A release can break compatibility or traffic → Migration gates, candidate revisions and health checks control promotion; verified rollback restores previous traffic. | Una release puede romper compatibilidad o tráfico → Controles de migración, revisiones candidatas y health checks controlan la promoción; el rollback verificado restaura el tráfico anterior. |

**Engineering evidence / Evidencia de ingeniería**

Mostrar enlaces como elementos compactos del mismo lenguaje visual de la ficha, con título y descripción; no incluir métricas decorativas de número de archivos, líneas, migraciones o módulos. Los cuatro runs son evidencia histórica de controles concretos, no promesas de disponibilidad futura. Las URLs son las mismas en EN/ES.

| Link | Label EN | Label ES | Description EN | Description ES |
|---|---|---|---|---|
| https://github.com/Paz1CP/mirai | Source repository | Repositorio | Public code, contracts and implementation. | Código público, contratos e implementación. |
| https://mirai-web-4nag7kzycq-uk.a.run.app | Live application | Aplicación desplegada | Explore the deployed product. | Explora el producto desplegado. |
| https://github.com/Paz1CP/mirai/tree/main/docs | Technical documentation | Documentación técnica | Product, architecture, features and platform documentation. | Documentación de producto, arquitectura, funcionalidades y plataforma. |
| https://github.com/Paz1CP/mirai/blob/main/docs/architecture/mirai_architecture.md | Architecture | Arquitectura | System boundaries, components and technical decisions. | Límites del sistema, componentes y decisiones técnicas. |
| https://github.com/Paz1CP/mirai/blob/main/docs/platform/mirai_ci_cd.md | CI/CD & DevSecOps | CI/CD y DevSecOps | Delivery, security gates and recovery design. | Entrega, controles de seguridad y diseño de recuperación. |
| https://github.com/Paz1CP/mirai/actions/runs/45615408735 | Verified production release | Release de producción verificada | Successful production delivery workflow. | Workflow de entrega a producción exitoso. |
| https://github.com/Paz1CP/mirai/actions/runs/45611946799 | Migration gate | Control de migraciones | Release blocked by an incompatible migration. | Release bloqueada por una migración incompatible. |
| https://github.com/Paz1CP/mirai/actions/runs/45616829512 | Verified rollback | Rollback verificado | Recovery of a previous production revision pair. | Recuperación de una pareja de revisiones anteriores de producción. |
| https://github.com/Paz1CP/mirai/actions/runs/45617062340 | Release restoration | Restauración de release | Successful restoration of the verified release. | Restauración exitosa de la release verificada. |

Technical highlights: tags §6.1 + Drizzle ORM, Neon, Neon Auth, Zod, WXT, Chrome DevTools Protocol, Playwright MCP, LISTEN/NOTIFY, Agent Engine, Gemini, Cloud Run, Cloud Build, Artifact Registry, CodeQL, Trivy, OIDC/WIF, Vitest, HMAC-SHA256, C4. No hacer una segunda lista de todos los skills del CV.

### 7.2 CookPilot

Mantener galería, logo, diseño de ficha y estructura existentes. Actualizar a pasado la contribución, no afirmar desarrollo continuo ni billing actualmente activo. Las funciones y contratos documentados en `dev` representan la ingeniería desarrollada; no atribuir a una release pública concreta una función cuya publicación no se haya confirmado. No publicar información privada, credenciales, datos de usuarios ni referencias internas innecesarias de CookPilot.

**Cabecera y overview**

| Campo | EN | ES |
|---|---|---|
| Eyebrow | Experience / Own product | Experiencia / Producto propio |
| Title | A culinary operating system built end to end. | Un sistema operativo culinario construido de extremo a extremo. |
| Role | Founder & Lead Product Engineer | Founder & Lead Product Engineer |
| Timeline | Oct 2025 – Nov 2026 | Oct 2025 – Nov 2026 |
| Context | CookPilot connects a daily food decision to an actionable plan, shopping list, cooking session and progress record. Ingredients, recipes, menus, meal moments, days and weeks form a shared domain linked to nutrition, costs, reuse and cooking assistance. I built the product across the Flutter application, backend, data architecture, AI integrations, UX/UI and monetization. | CookPilot conecta una decisión alimentaria cotidiana con un plan ejecutable, lista de compras, sesión de cocina y registro de progreso. Ingredientes, recetas, menús, momentos, días y semanas forman un dominio compartido conectado con nutrición, costos, reutilización y asistencia culinaria. Construí el producto abarcando aplicación Flutter, backend, arquitectura de datos, integraciones de IA, UX/UI y monetización. |
| Ownership | I led the entire product lifecycle as founder and lead engineer: product definition, system design, relational modeling, backend, mobile architecture, UX/UI, applied AI, billing, integrations, analytics and store releases. | Lideré el ciclo completo del producto como fundador e ingeniero responsable: definición de producto, diseño de sistemas, modelado relacional, backend, arquitectura móvil, UX/UI, IA aplicada, billing, integraciones, analítica y publicación en tiendas. |

**Product workflow / Flujo del producto**

Usar chips numerados de workflow existentes (no generar un diagrama adicional):

EN: `Discover or import → Plan → Review nutrition and costs → Build shopping list → Cook → Record progress → Reuse`

ES: `Descubrir o importar → Planificar → Revisar nutrición y costos → Crear lista de compras → Cocinar → Registrar progreso → Reutilizar`

EN: CookSearch, CookImport, CookMatch, CookPlan, CookList, CookMode and CookBalance are interconnected parts of this loop, not isolated features. A recipe can be saved, edited, planned, purchased, executed and reused across the same data model.

ES: CookSearch, CookImport, CookMatch, CookPlan, CookList, CookMode y CookBalance son partes conectadas de este flujo, no funcionalidades aisladas. Una receta puede guardarse, editarse, planificarse, comprarse, ejecutarse y reutilizarse sobre el mismo modelo de datos.

**Key work / Trabajo principal**

| Tema EN / ES | Texto EN | Texto ES |
|---|---|---|
| Backend & domain architecture / Arquitectura backend y de dominio | Designed the Supabase/PostgreSQL backend with relational domains, Auth, RLS, Edge Functions, SQL RPCs, Storage and Realtime. Modeled ingredients, recipes, menus, days, weeks, shopping and cooking sessions around shared contracts and server-side business rules. | Diseñé el backend Supabase/PostgreSQL con dominios relacionales, Auth, RLS, Edge Functions, RPCs SQL, Storage y Realtime. Modelé ingredientes, recetas, menús, días, semanas, compras y sesiones de cocina alrededor de contratos compartidos y reglas de negocio del servidor. |
| Data consistency & state / Consistencia de datos y estado | Developed atomic planning mutations, compact acknowledgments, revision-based persistence and optimistic updates. Structured shared state, serialized critical writes and reconciled remote snapshots in planning, recipe import and shopping flows to avoid conflicting representations. | Desarrollé mutaciones atómicas de planificación, confirmaciones compactas, persistencia basada en revisiones y actualizaciones optimistas. Estructuré estado compartido, serialicé escrituras críticas y reconcilié snapshots remotos en planificación, importación de recetas y compras para evitar representaciones contradictorias. |
| Financial & nutritional logic / Lógica financiera y nutricional | Centralized ingredient pricing and recipe cost comparisons in shared SQL functions, using canonical ingredient identities, quantities, unit conversion, serving scaling and price caching. Connected these calculations to planning, shopping and nutritional context. | Centralicé precios de ingredientes y comparaciones de costos de recetas en funciones SQL compartidas, utilizando identidades canónicas de ingredientes, cantidades, conversión de unidades, escalado de porciones y caché de precios. Conecté estos cálculos con planificación, compras y contexto nutricional. |
| Applied AI & multimodal processing / IA aplicada y procesamiento multimodal | Integrated OpenRouter and LLM APIs with structured outputs, specialized prompts and backend validation. Developed recipe import from external sources, multimodal extraction, draft review, ingredient matching and typed actions that feed the same culinary domain. | Integré OpenRouter y LLM APIs con salidas estructuradas, prompts especializados y validación backend. Desarrollé importación de recetas desde fuentes externas, extracción multimodal, revisión de borradores, matching de ingredientes y acciones tipadas que alimentan el mismo dominio culinario. |
| Cooking execution & real-time assistance / Ejecución culinaria y asistencia en tiempo real | Developed persistent cooking sessions, timers, pause and resume flows, contextual tools and voice assistance with streaming audio. Coordinated the session runtime, local state, remote persistence and usage accounting. | Desarrollé sesiones persistentes de cocina, temporizadores, flujos de pausa y reanudación, herramientas contextuales y asistencia por voz con streaming de audio. Coordiné el runtime de sesión, estado local, persistencia remota y contabilización de consumo. |
| Computer vision & native integration / Visión computacional e integración nativa | Implemented MediaPipe gesture recognition and native-to-Flutter communication for hands-free cooking interactions, alongside platform-specific authentication and mobile integrations. | Implementé reconocimiento de gestos con MediaPipe y comunicación nativa con Flutter para interacciones manos libres durante la cocina, junto con autenticación e integraciones específicas de plataforma. |
| Payments & entitlements / Pagos y derechos de acceso | Integrated RevenueCat, Google Play Billing and Huawei IAP for subscriptions and consumable packs. Developed server-side entitlement management, verified store synchronization, idempotent purchase materialization, usage consumption and refunds. | Integré RevenueCat, Google Play Billing y Huawei IAP para suscripciones y packs consumibles. Desarrollé gestión backend de derechos de acceso, sincronización verificada con tiendas, materialización idempotente de compras, consumo de uso y reembolsos. |
| Media infrastructure / Infraestructura multimedia | Implemented Cloudflare R2, CDN and a shared Worker for media storage and delivery, including authorized short-lived upload tickets and temporary media handling for recipe import. | Implementé Cloudflare R2, CDN y un Worker compartido para almacenamiento y entrega multimedia, incluyendo tickets autorizados de subida de corta duración y manejo de media temporal para la importación de recetas. |
| Mobile & design systems / Mobile y sistemas de diseño | Built the Flutter/Dart application with Riverpod, reusable components, typed state, navigation and platform-specific flavors. Designed the product's UX/UI system in Figma and implemented its interfaces across interconnected product flows. | Construí la aplicación Flutter/Dart con Riverpod, componentes reutilizables, estado tipado, navegación y flavors específicos por plataforma. Diseñé el sistema UX/UI del producto en Figma e implementé sus interfaces a través de flujos de producto conectados. |
| Analytics & delivery / Analítica y entrega | Integrated PostHog for product analytics, OneSignal for notifications, Google Sign-In and Credential Manager, and managed release workflows for Google Play and Huawei AppGallery. Structured analytics around product events and verified financial records. | Integré PostHog para analítica de producto, OneSignal para notificaciones, Google Sign-In y Credential Manager, y gestioné workflows de publicación para Google Play y Huawei AppGallery. Estructuré la analítica alrededor de eventos de producto y registros financieros verificados. |

**AI workflow / Flujo con IA** (conservar los chips existentes, actualizar copy)

EN: `User input and context → Product rules → Backend orchestration → Structured LLM output → Validation and normalization → Typed product action`

ES: `Entrada y contexto del usuario → Reglas de producto → Orquestación backend → Salida estructurada del LLM → Validación y normalización → Acción tipada de producto`

**Design system / Sistema de diseño** (conservar el bloque actual)

EN: UX/UI direction · Figma design system · Visual hierarchy · Design tokens and reusable components · Interaction states · Product surfaces · High-fidelity assets · Figma-to-Flutter implementation.

ES: Dirección UX/UI · Sistema de diseño en Figma · Jerarquía visual · Tokens y componentes reutilizables · Estados de interacción · Superficies de producto · Recursos de alta fidelidad · Implementación Figma-to-Flutter.

**Delivered scope / Alcance entregado**

EN:
- Built and launched the product end to end, from the initial product and UX/UI definition to the mobile application, backend and integrations.
- Delivered an interconnected culinary workflow covering planning, import, shopping, execution, nutrition and costs.
- Implemented multi-store monetization, product analytics and production releases for Google Play and Huawei AppGallery.

ES:
- Construí y lancé el producto de extremo a extremo, desde la definición inicial de producto y UX/UI hasta la aplicación móvil, backend e integraciones.
- Entregué un flujo culinario conectado que abarca planificación, importación, compras, ejecución, nutrición y costos.
- Implementé monetización en múltiples tiendas, analítica de producto y publicación en Google Play y Huawei AppGallery.

No usar los antiguos estados «Ongoing development» ni «Billing active». No inventar usuarios, ventas o métricas comerciales. Mantener enlaces de producto/tiendas que ya estén configurados y sean válidos; no inventar un nuevo enlace de aplicación. Los tags §6.2 pueden ampliarse con Cloudflare R2, Workers, CDN, Google Play Billing, OneSignal, Structured Outputs y Figma.

### 7.3 JobMatch

Preservar el diseño del modal, galería y estructura actual. Aumentar protagonismo de Next.js, backend y resultado del proyecto.

| Campo | EN | ES |
|---|---|---|
| Eyebrow | Experience / Contract | Experiencia / Contrato |
| Title | Full-stack foundation for a recruiting platform. | Base full-stack para una plataforma de reclutamiento. |
| Role | Technical Product Lead — Contract | Technical Product Lead — Contract |
| Timeline | May 2025 – Mar 2026 | May 2025 – Mar 2026 |
| Context | JobMatch connects candidates, companies and recruiters through job discovery, applications and AI-assisted matching. I led the technical foundation of its MVP, covering authentication, user and company profiles, vacancies, applications, dashboards and backend infrastructure. | JobMatch conecta candidatos, empresas y reclutadores mediante búsqueda de empleo, postulaciones y matching asistido por IA. Lideré la base técnica de su MVP, abarcando autenticación, perfiles de usuarios y empresas, vacantes, postulaciones, dashboards e infraestructura backend. |
| Ownership | I was responsible for technical product definition, architecture, implementation and handoff, collaborating with UX/UI and translating recruiting and business requirements into working software. | Fui responsable de la definición técnica de producto, arquitectura, implementación y transferencia técnica, colaborando con UX/UI y convirtiendo requisitos de reclutamiento y negocio en software funcional. |

**Key work / Trabajo principal**

| EN | ES |
|---|---|
| Designed and implemented the core MVP for candidates, companies and recruiters, including authentication, profile management, vacancies, applications and dashboards. | Diseñé e implementé el MVP para candidatos, empresas y reclutadores, incluyendo autenticación, perfiles, vacantes, postulaciones y dashboards. |
| Structured the PostgreSQL data model and Supabase backend with Row-Level Security, Auth and Edge Functions to support the platform's business logic and access boundaries. | Estructuré el modelo de datos PostgreSQL y el backend Supabase con Row-Level Security, Auth y Edge Functions para respaldar la lógica de negocio y los límites de acceso de la plataforma. |
| Developed AI-assisted matching workflows using candidate data, job requirements and backend matching logic; the matching foundation was subsequently used in production. | Desarrollé flujos de matching asistido por IA a partir de datos de candidatos, requisitos de vacantes y lógica backend; la base de matching se utilizó posteriormente en producción. |
| Implemented the platform initially in Flutter Web and migrated it toward Next.js for a more advanced stage, working with the UX/UI team. | Implementé inicialmente la plataforma en Flutter Web y la migré hacia Next.js para una etapa más avanzada, trabajando con el equipo de UX/UI. |
| Supported technical planning and the product foundation for ProInnóvate / Startup Perú 12G, then completed the technical handoff for continued V1 development. | Participé en la planificación técnica y la base de producto para ProInnóvate / Startup Perú 12G, y completé la transferencia técnica para continuar el desarrollo de la V1. |

**AI / matching workflow / Flujo de IA y matching**

EN: `Candidate profile → Job requirements → Matching logic → AI-assisted processing → Score output → Recruiter dashboard`

ES: `Perfil del candidato → Requisitos de la vacante → Lógica de matching → Procesamiento asistido por IA → Resultado de puntuación → Dashboard del reclutador`

**Results / Resultados**

Usar el bloque businessProof existente, con cifras integradas en texto o dos indicadores compactos que reutilicen sus estilos. No mostrar una cifra equivalente aproximada en USD.

EN: The MVP was used by 100+ users. My technical and product contribution supported the foundation behind PEN 67,000 in funding awarded to the project through ProInnóvate / Startup Perú 12G. I delivered the technical foundation and matching workflow for continued development of V1.

ES: El MVP fue utilizado por más de 100 usuarios. Mi contribución técnica y de producto respaldó la base del proyecto que obtuvo S/67 000 en financiamiento de ProInnóvate / Startup Perú 12G. Entregué la base técnica y el flujo de matching para continuar el desarrollo de la V1.

Si se emplean cifras destacadas: `100+` — `MVP users` / `Usuarios del MVP`; `PEN 67,000` / `S/67 000` — `Funding awarded to the project` / `Financiamiento obtenido por el proyecto`. No incluir reducción del 25% sin metodología verificada. Tags §6.3 + Supabase Auth, Matching Logic, LLM APIs, Figma.

### 7.4 4Track / VistoGPS

Preservar el carácter mobile de la experiencia y las capturas existentes. No atribuirme el desarrollo del backend empresarial de 4Track; mi responsabilidad fue mobile/frontend e integración con los equipos correspondientes.

| Campo | EN | ES |
|---|---|---|
| Eyebrow | Experience / Production software | Experiencia / Software en producción |
| Title | Real-time GPS applications delivered to production. | Aplicaciones GPS en tiempo real entregadas a producción. |
| Role | Mobile Software Engineer | Mobile Software Engineer |
| Timeline | Oct 2024 – Oct 2025 | Oct 2024 – Oct 2025 |
| Context | 4Track / VistoGPS is a real-time GPS tracking and fleet management platform used by businesses to monitor vehicles and operational activity. The mobile work focused on tracking, maps, authentication, synchronization and delivery across multiple app stores. | 4Track / VistoGPS es una plataforma de seguimiento GPS en tiempo real y gestión de flotas utilizada por empresas para supervisar vehículos y actividad operativa. El trabajo mobile se centró en seguimiento, mapas, autenticación, sincronización y entrega en múltiples tiendas. |
| Ownership | I owned the mobile/frontend work end to end: UX/UI redesign, Flutter implementation, mobile architecture, real-time map flows, native integrations, store releases and collaboration with backend, infrastructure and management teams. | Fui responsable del trabajo mobile/frontend de extremo a extremo: rediseño UX/UI, implementación Flutter, arquitectura móvil, flujos de mapas en tiempo real, integraciones nativas, publicación en tiendas y colaboración con equipos de backend, infraestructura y management. |

**Key work / Trabajo principal**

| EN | ES |
|---|---|
| Redesigned the mobile experience in Figma and implemented the production Flutter applications as the sole mobile/frontend owner. | Rediseñé la experiencia móvil en Figma e implementé las aplicaciones Flutter en producción como único responsable mobile/frontend. |
| Implemented real-time GPS tracking through WebSockets, map rendering, mobile state management and integration with existing GPS services. | Implementé seguimiento GPS en tiempo real mediante WebSockets, renderizado de mapas, gestión de estado móvil e integración con servicios GPS existentes. |
| Integrated custom backend authentication, push notifications, biometric authentication, offline synchronization and local persistence. | Integré autenticación con backend propio, notificaciones push, autenticación biométrica, sincronización offline y persistencia local. |
| Worked directly with backend, infrastructure and management teams to align mobile architecture with operational requirements, resolve integration issues and deliver production releases. | Trabajé directamente con equipos de backend, infraestructura y management para alinear la arquitectura móvil con los requisitos operativos, resolver integraciones y entregar releases de producción. |
| Released applications across Google Play, the App Store and Huawei AppGallery, delivering the mobile design and implementation that remained in production after the engagement. | Publiqué aplicaciones en Google Play, App Store y Huawei AppGallery, entregando el diseño e implementación mobile que permanecieron en producción después del proyecto. |

**Results / Resultados**

EN: Contributed to a platform serving 5,000+ customers. Delivered mobile applications across three app stores, with public listings showing 1,000+ downloads across related production apps. The delivered design and implementation remained in production after the engagement.

ES: Contribuí a una plataforma utilizada por más de 5 000 clientes. Entregué aplicaciones móviles en tres tiendas, con más de 1 000 descargas visibles en listings públicos de aplicaciones de producción relacionadas. El diseño y la implementación entregados permanecieron en producción después del proyecto.

Los 5 000+ clientes corresponden a la plataforma, no a instalaciones atribuibles a mi trabajo. Las descargas son evidencia histórica del portfolio anterior, no una métrica actual ni una atribución exclusiva. No utilizar los números que puedan aparecer en la imagen de App Store Connect como métricas del CV; no afirmar reducción del 50%. Tags §6.4 + Local Persistence, Figma, Google Play Console, App Store Connect, Huawei AppGallery. Conservar enlaces de tiendas ya existentes y verificados en el contenido, sin crear URLs nuevas.

## 8. Copy definitivo — Capabilities

| Campo | EN | ES |
|---|---|---|
| Eyebrow | Capabilities | Capacidades |
| H2 | What I can own end to end. | Lo que puedo llevar de extremo a extremo. |
| Intro | I work across backend systems, applied AI, cloud infrastructure, payments, product engineering and delivery, connecting technical decisions to real product requirements. | Trabajo en sistemas backend, IA aplicada, infraestructura cloud, pagos, ingeniería de producto y entrega, conectando las decisiones técnicas con requisitos reales de producto. |

Una sola imagen por card, con ruta de §4.4. Cada descripción tiene una longitud semejante a la del diseño original. Las etiquetas técnicas se mantienen en inglés cuando son nombres estándar o keywords reconocidas. No añadir texto «Evidence: ...» como bloque extra obligatorio: las experiencias ya proporcionan el contexto y la imagen ocupa ese rol. No convertir estas cards en un segundo CV.

### 01 — Backend Engineering / Ingeniería backend

- EN description: Modular backends built around typed APIs, relational data, business rules and secure access, with transactions, concurrency control and idempotent operations.
- ES description: Backends modulares con APIs tipadas, datos relacionales, reglas de negocio y acceso seguro, con transacciones, control de concurrencia y operaciones idempotentes.
- Keywords: Node.js · Express · TypeScript · PostgreSQL · SQL · Drizzle ORM · Supabase · Neon · REST APIs · WebSockets · Zod · RLS · Transactions · Idempotency.
- Alt EN: Conceptual blueprint of a modular backend connecting API requests, domain services, data access and external integrations.
- Alt ES: Diagrama conceptual de un backend modular que conecta peticiones API, servicios de dominio, acceso a datos e integraciones externas.

### 02 — Applied AI Engineering / Ingeniería de IA aplicada

- EN description: Autonomous agents and AI-powered systems with persistent context, tool orchestration, browser automation, multimodal processing and validated structured outputs.
- ES description: Agentes autónomos y sistemas con IA que integran contexto persistente, orquestación de herramientas, automatización del navegador, procesamiento multimodal y salidas estructuradas validadas.
- Keywords: Google ADK · Vertex AI · Gemini · MCP · Tool Calling · Context Engineering · Playwright MCP · OpenRouter · Structured Outputs · Multimodal AI · Human-in-the-Loop · MediaPipe.
- Alt EN: Conceptual agent orchestration map connecting inference, context, tools and validated results.
- Alt ES: Mapa conceptual de orquestación de un agente que conecta inferencia, contexto, herramientas y resultados validados.

### 03 — Cloud & DevSecOps / Cloud y DevSecOps

- EN description: Cloud services delivered through containerized infrastructure, automated CI/CD, integration checks, security gates, controlled deployments and rollback workflows.
- ES description: Servicios cloud entregados mediante infraestructura contenerizada, CI/CD automatizado, comprobaciones de integración, controles de seguridad, despliegues controlados y workflows de rollback.
- Keywords: Google Cloud · Cloud Run · Cloud Build · Artifact Registry · Docker · GitHub Actions · CI/CD · CodeQL · Trivy · OIDC/WIF · Cloudflare R2 · Workers.
- Alt EN: Mirai GitHub Actions workflow showing cloud release and verification stages.
- Alt ES: Workflow de GitHub Actions de Mirai con etapas de entrega y verificación cloud.

### 04 — Payments & Billing / Pagos y billing

- EN description: Payment integrations and backend billing systems for subscriptions, consumable purchases, prepaid balances, usage accounting and transactional reconciliation.
- ES description: Integraciones de pago y sistemas backend de billing para suscripciones, compras consumibles, saldo prepago, contabilización de consumo y conciliación transaccional.
- Keywords: Paddle · RevenueCat · Google Play Billing · Huawei IAP · Webhooks · Entitlements · Wallets · Ledger · Idempotency · Reconciliation.
- Alt EN: Mirai's billing and usage interface.
- Alt ES: Interfaz de billing y consumo de Mirai.

### 05 — Software & Product Engineering / Ingeniería de software y producto

- EN description: End-to-end ownership of product requirements, system design, technical planning and implementation, connecting web and mobile architecture to delivery and operation.
- ES description: Responsabilidad integral sobre requisitos de producto, diseño de sistemas, planificación técnica e implementación, conectando arquitectura web y móvil con entrega y operación.
- Keywords: System Design · C4 · SDLC · Requirements Engineering · Technical Ownership · AI-native Development · React · Next.js · Flutter · Git · Monorepos.
- Alt EN: Conceptual product development lifecycle board from discovery and architecture to implementation and operation.
- Alt ES: Tablero conceptual del ciclo de desarrollo de producto, desde discovery y arquitectura hasta implementación y operación.

### 06 — UX/UI Systems / Sistemas UX/UI

- EN description: Product interfaces designed around visual hierarchy, reusable components, interaction states and clear user flows, with implementation in mind.
- ES description: Interfaces de producto diseñadas alrededor de jerarquía visual, componentes reutilizables, estados de interacción y flujos claros, con la implementación técnica en mente.
- Keywords: Figma · UX/UI · Design Systems · Visual Hierarchy · Design Tokens · Interaction Design · Figma-to-Flutter.
- Alt EN: CookPilot interface design workspace with a collection of mobile screens.
- Alt ES: Entorno de diseño de interfaces de CookPilot con una colección de pantallas móviles.

### 07 — Production Delivery / Entrega a producción

- EN description: Software delivery from implementation to real releases, including multi-store publishing, production debugging, analytics, native integrations and technical handoff.
- ES description: Entrega de software desde la implementación hasta releases reales, incluyendo publicación en múltiples tiendas, debugging en producción, analítica, integraciones nativas y transferencia técnica.
- Keywords: Codemagic · App Stores · Release Workflows · Production Debugging · PostHog · OneSignal · Technical Handoff · Remote Collaboration.
- Alt EN: App Store Connect interface associated with 4Track mobile delivery.
- Alt ES: Interfaz de App Store Connect asociada a la entrega móvil de 4Track.

Diferencia editorial obligatoria: Cloud & DevSecOps explica infraestructura y automatización segura del release (Mirai, también infraestructura de media de CookPilot); Production Delivery explica experiencia de entrega de software al entorno real, publicación multi-store, integraciones, analítica y handoff (especialmente CookPilot, JobMatch y 4Track). No fusionar estas cards. No incorporar cifras que se vean en imágenes como datos nuevos de marketing.

## 9. Copy definitivo — Contact y Footer

Mantener la estructura visual de contacto. Sustituir el listado comercial de servicios por roles. Email y CV son las acciones principales; LinkedIn y GitHub son enlaces secundarios visibles. WhatsApp puede conservarse como contacto complementario en Hero, sin mensajes comerciales. No crear formulario, agenda o CTA de compra.

| Campo | EN | ES |
|---|---|---|
| Eyebrow | Availability | Disponibilidad |
| H2 | Let's build software that matters. | Construyamos software que importe. |
| Body | I'm open to remote Software Engineering roles with a focus on backend, full-stack systems and applied AI. Based in Peru, I work with international teams across LATAM and US time zones. | Estoy abierto a roles remotos de ingeniería de software con enfoque en backend, sistemas full-stack e IA aplicada. Desde Perú, colaboro con equipos internacionales en zonas horarias de LATAM y Estados Unidos. |
| Looking for title | Roles I'm open to | Roles que busco |
| Primary CTA | Email me | Escríbeme |
| Secondary CTA | View resume | Ver CV |
| Tertiary CTA | Connect on LinkedIn | Conectar en LinkedIn |
| GitHub CTA | View GitHub | Ver GitHub |
| Contact line | contact@christopherpaz.dev | contact@christopherpaz.dev |
| Availability note (solo si hay espacio junto a los roles) | Remote · English C1 · LATAM / US Time Zones · Contractor | Remoto · Inglés C1 · LATAM / US Time Zones · Contractor |

Roles (mismos nombres en ambos idiomas por consistencia con vacantes internacionales): Software Engineer · Backend Engineer · Full-Stack Software Engineer · Applied AI Engineer · AI Software Engineer · Product Engineer · Mobile Software Engineer. Mantener Software Engineer, Backend Engineer, Full-Stack Software Engineer y Applied AI Engineer primero. Los chips son informativos; no darles comportamiento de filtro ni crear páginas de servicios.

### Enlaces y configuración

- Email: `mailto:contact@christopherpaz.dev`.
- LinkedIn: `https://linkedin.com/in/pazleon`.
- GitHub: `https://github.com/Paz1CP`.
- Resume EN: `/Christopher_Paz_CV.pdf`.
- Resume ES: `/Christopher_Paz_CV_es.pdf`.
- WhatsApp: número existente `51973886687`. Mensaje EN `Hi Christopher, I saw your portfolio and would like to connect about a professional opportunity.` / ES `Hola Christopher, vi tu portfolio y me gustaría conversar sobre una oportunidad profesional.` Construir URL con `encodeURIComponent` o `URLSearchParams` para corregir el encoding anterior. No añadir seguimiento ni prellenar datos de terceros.

Usar `siteConfig.resumeUrl` (por idioma) como única fuente de verdad para Hero, Contact y Footer; no mantener `/resume.pdf` ni duplicar archivos. No editar los PDFs. Añadir `githubUrl` a `siteConfig` y reutilizarlo donde corresponda. Usar la semántica externa actual de enlaces y, si se abre en pestaña nueva, preservar `rel` adecuado.

Footer: conservar la composición existente, firma si ya se muestra, nombre y estilo. Reemplazar el role por `Software Engineer | Backend · Full-Stack · Applied AI`. Enlaces visibles EN: `Email · LinkedIn · GitHub · Resume`; ES: `Email · LinkedIn · GitHub · CV`. Mantener el año/copyright existente si es dinámico. No agregar secciones adicionales.

## 10. Metadata, SEO y previews sociales

Actualizar todas las superficies relacionadas con la identidad profesional, sin ampliar el proyecto a una iniciativa SEO independiente.

### Copy canónico

- `siteConfig.name`: Christopher Paz León.
- `siteConfig.role`: Software Engineer | Backend · Full-Stack · Applied AI.
- `siteConfig.title`: Christopher Paz León — Software Engineer | Backend · Full-Stack · Applied AI.
- `siteConfig.description` EN: Software Engineer from Peru specializing in backend systems, full-stack development and applied AI. Experience in autonomous agents, PostgreSQL, cloud infrastructure and end-to-end product delivery.
- `siteConfig.description` ES: Software Engineer de Perú especializado en sistemas backend, desarrollo full-stack e IA aplicada. Experiencia en agentes autónomos, PostgreSQL, infraestructura cloud y desarrollo integral de productos.

En `layout.tsx`, mantener el metadataBase/canonical y la configuración existente. Sustituir título, description, Open Graph y Twitter. Keywords: `Christopher Paz León`, `Software Engineer`, `Backend Engineer`, `Full-Stack Engineer`, `Applied AI Engineer`, `TypeScript`, `Node.js`, `PostgreSQL`, `Next.js`, `Google Cloud`, `Autonomous Agents`, `MCP`, `DevSecOps`, `Payments`, `Flutter`. Conservar solo términos pertinentes; no repetir el CV entero.

`opengraph-image.tsx` y `twitter-image.tsx`: mantener diseño gráfico, fotografía y tratamiento visual actuales. Sustituir el cargo antiguo por el headline canónico (permitir saltos de línea para legibilidad, sin cambiar texto). Si existe subtítulo descriptivo anterior, utilizar EN `Backend systems, full-stack development and applied AI.`. Metadata por defecto en inglés, consistente con la ruta única existente; no simular páginas traducidas indexables. En `JsonLd.tsx`, conservar tipos Person, WebSite y ProfilePage y su relación; actualizar `jobTitle`, description si existe, y `knowsAbout` a Software Engineering, Backend Engineering, Full-Stack Development, Applied AI, Autonomous Agents, PostgreSQL, Node.js, TypeScript, React, Next.js, Google Cloud, Docker, CI/CD, Payments and Billing, Flutter, UX/UI. Añadir GitHub a `sameAs`, conservando LinkedIn y demás URLs válidas. No añadir premios, empleo, ofertas o credenciales no acreditados.

Como la solución de enlaces de experiencia usa parámetros y ancla, no crear nuevas entradas de sitemap para URLs que no son páginas independientes; conservar sitemap y robots existentes si no necesitan ajuste. No dejar referencias a Build o a la identidad anterior en los metadatos públicos.

## 11. Mapa de intervención sobre el código existente

Adaptar los archivos reales del workspace; las rutas siguientes proceden del repositorio revisado y son una guía, no una orden de crear componentes duplicados. Mantener la tipificación y convenciones de la aplicación.

| Archivo | Intervención |
|---|---|
| `src/app/i18n/locales/en.json`, `es.json` | Implementar el copy definitivo de §§5–10 y las etiquetas de modales, manteniendo paridad estructural. Ampliar los datos existentes con slug, context label, rutas, alt y links necesarios. |
| `src/app/i18n/` | Adaptar tipos/diccionarios si corresponde y persistir idioma desde ClientHome sin migrar el sistema. |
| `src/components/layout/ClientHome.tsx` | Componer Home → Experience → Capabilities → Contact → Footer; montar el modal existente; resolver idioma y anchors heredados. |
| `src/components/sections/Hero.tsx` | Nuevo nombre visible y copy; preservar foto, firma, CTA y layout. |
| `src/components/sections/Experience.tsx` | Integrar portadas/logos, contexto, CTA, links externos y Mirai destacado en la timeline; usar slug explícito, no un array paralelo por índice. |
| `src/components/sections/SelectedWork.tsx` | Retirar su render; reutilizar portadas y patrones de composición en Experience, sin otra sección. |
| `src/components/sections/Build.tsx` | Retirar su render y accesos comerciales; no reconstruir ni borrar recursos por defecto. |
| `src/components/sections/CaseStudyModal.tsx` | Reutilizar Radix Dialog y galería; agregar Mirai, bloques de arquitectura y evidencias; localizar labels; enlace directo y ajustes de galería descritos. |
| `src/components/sections/Capabilities.tsx` | Siete cards, iconos acordes a su contenido, imágenes exactas; no duplicar el componente. |
| `src/components/sections/Contact.tsx` | Roles, nuevo copy, GitHub y enlaces canónicos. |
| `src/components/sections/Footer.tsx` | Nuevo cargo, GitHub y CV localizado. |
| `src/components/navigation/SideDock.tsx` | Eliminar Work y Build del mapa de navegación; conservar los otros iconos y el diseño exacto. Localizar etiquetas de navegación restantes. |
| `design/experience.css`, `design/capabilities.css`, `design/case-study-modal.css` y estilos pertinentes de Hero/Contact | Ajustar composición, grid, contraste y legibilidad sin reescribir tokens globales. Reutilizar clases y convenciones existentes. |
| `src/middleware.ts` | Actualizar redirección `/build` a `/#contact` (sin crear ruta comercial). |
| `src/app/layout.tsx`, `src/components/seo/JsonLd.tsx`, `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx` | Aplicar §10. |
| `public/` | Consumir recursos existentes del §4 y CV ya actualizados; no crear duplicados ni descargar más recursos. |

### Modelo de datos mínimo

El código actual acopla los slugs de Experience a índices y mantiene mapas de imágenes separados por proyecto. Sustituir únicamente ese acoplamiento cuando se incorpora Mirai. Cada item de Experience debe tener su `slug` estable, su portada, logo o referencia a metadatos estáticos compartidos, `contextLabel`, copy y enlaces. Los detalles del modal se resuelven por ese slug. Se puede mantener `caseStudies` como key interna y `portfolio:open-case-study` como nombre interno si reduce cambios. Extender el tipo existente con bloques opcionales (por ejemplo `architecture`, `engineeringDecisions`, `evidenceLinks`, `purpose`) y etiquetas localizadas; no crear un motor genérico de bloques, CMS ni otra abstracción de contenido. Reutilizar `siteConfig` para enlaces profesionales. Los assets estáticos y URLs que sean idénticos entre idiomas no necesitan duplicarse si ya hay un mecanismo sencillo de compartirlos; el texto sí se mantiene localizado.

## 12. Orden de ejecución y criterio de cierre

Implementa el encargo de forma completa en el workspace, no te limites a proponer un plan o redactar otro documento. Ejecuta en este orden:

1. Lee el estado actual y las convenciones de componentes, estilos y diccionarios. Confirma rutas locales de recursos de §4; el logo local indicado por el usuario tiene prioridad sobre la antigua revisión de GitHub.
2. Actualiza identidad, Hero y navegación. Fusiona Work con Experience y retira Services del recorrido principal.
3. Integra las cuatro cards de Experience, portadas, enlaces y copy. Incorpora Mirai y actualiza las otras tres fichas con §7; conservar galerías existentes y establecer enlaces directos.
4. Reconstruye Capabilities con las siete cards y recursos exactos. Actualiza Contact, Footer, metadata y vistas previas.
5. Revisa los recorridos afectados en ambos idiomas: navegación, orden, imágenes, apertura/cierre y URL de los modales, enlaces a CV y evidencia, persistencia de idioma, presentación desktop/móvil. Corregir únicamente problemas introducidos por estos cambios. No abrir una auditoría de seguridad, rendimiento o arquitectura; no añadir tests nuevos ni expandir el scope. Si el entorno dispone de una comprobación de compilación habitual y resulta necesaria para comprobar los cambios, usarla sin convertirla en un proyecto de calidad separado.

El encargo se considera terminado cuando:

- Home comunica el cargo canónico y el nombre visible sin perder su composición.
- Solo existen Home, Experience, Capabilities, Contact y Footer en la página principal; no hay labels públicos Case Study, Selected Work ni Services/Build.
- Experience contiene exactamente cuatro entradas en el orden indicado; Mirai destacado, no comercial y con enlaces inspeccionables; CookPilot conserva profundidad técnica; JobMatch muestra los resultados aprobados y 4Track conserva su identidad profesional.
- Las cuatro fichas muestran su contenido localizado, galerías y los nuevos bloques correspondientes. Mirai muestra la arquitectura sin recortar y los enlaces de evidencia.
- Capabilities contiene exactamente siete cards en el orden acordado, incluyendo UX/UI Systems y Production Delivery; no aparece Data & Persistence ni Full-Stack & Mobile Development como card. Payments usa `mirai_billing.png` y no existe obligación de duplicarla.
- El sistema visual se reconoce como el original; se mantiene la identidad exacta del Side Dock, se evita comprimir textos y se aprovecha el ancho de forma moderada. Los recursos visuales conservan su estilo propio.
- Los CV se abren desde las rutas EN/ES correctas; GitHub es visible; metadata, Open Graph, Twitter y datos estructurados reflejan el nuevo cargo.
- El contenido EN/ES está completo, sin placeholders, textos mezclados accidentalmente ni referencias comerciales heredadas; los nombres técnicos y cargos en inglés son intencionales.

Al terminar, entrega un resumen breve de los cambios implementados, los archivos principales modificados y las discrepancias reales que hayas encontrado. No pedir nuevas decisiones sobre copy, imágenes o diseño ya aprobados. No hacer commit/push/deploy por iniciativa propia. No declarar terminadas modificaciones que no hayas aplicado.

**Prioridad absoluta:** el portfolio debe vender el perfil de Software Engineer mediante evidencia profesional concreta y mantener la identidad visual ya construida. No convertir este encargo editorial y de presentación en una rearquitectura de la web.
