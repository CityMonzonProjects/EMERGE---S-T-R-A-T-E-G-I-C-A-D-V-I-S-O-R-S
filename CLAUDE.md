# CLAUDE.md — Emerge Strategic Advisors (sitio corporativo)

## 1. Qué es este proyecto
Sitio web corporativo de una sola página, más /discovery, /privacy y una página 404, para **Emerge Strategic Advisors**, firma de consultoría estratégica con sede en EE. UU. (Miami). Objetivo: transmitir autoridad y profesionalismo y atraer solo a clientes cualificados: la conversión principal es el **Discovery Workbook** (`/discovery`), un asistente por pasos con el cuestionario completo del cliente. Referencias de diseño: L.E.K. Consulting y North Highland (también Prophet y McKinsey). Dominio previsto: `emergestrategicadvisors.com` (CONFIRMAR con el cliente). Entorno del desarrollador: Windows + PowerShell + VS Code; ruta `D:\dev\Emerge\emerge-strategic-advisors`.

## 2. Reglas innegociables
1. **Todo texto visible está en INGLÉS**: contenido, `aria-label`, `title`, meta tags, mensajes de error, placeholders y comentarios de código. Excepción: los IDs de ancla heredados (`#servicios`, `#proceso`, `#contacto`) no son texto visible y se mantienen para no romper enlaces. Las secciones nuevas usan IDs en inglés (`#about`, `#guide`, `#results`).
2. **Privacidad del cliente**: no mostrar ciudad, dirección, teléfono ni email del cliente. "Miami, FL" se eliminó a propósito de Footer y Contact. No inventar datos de contacto.
3. **Nada inventado**: ni métricas, clientes, testimonios, certificaciones, premios ni cifras. Sin lenguaje de garantía de resultados (p. ej. "double revenue"; la pregunta del workbook "What would need to change to double revenue?" es una pregunta al cliente, no una promesa). Todo placeholder debe estar claramente marcado y no publicarse por defecto.
4. **Accesibilidad WCAG 2.2 AA**: contraste ≥ 4.5:1 en texto normal; usar `cyan-700` (no `cyan-600`) para texto pequeño sobre fondos claros; foco visible; respetar `prefers-reduced-motion`; HTML semántico; un solo `h1` por página.
5. **Responsive mobile-first** (sm/md/lg/xl), sin scroll horizontal desde 320px.
6. **Stack cerrado**: no añadir dependencias sin avisar y justificar antes. No WordPress ni Shopify.
7. **Cambios quirúrgicos**: no refactorizar lo que ya funciona sin motivo. Una cosa a la vez, con el build en verde entre pasos.
8. **Tono del copy**: sobrio, ejecutivo y seguro; frases cortas; sin superlativos vacíos.

## 3. Stack
Vite 8 · React 19 · TypeScript estricto · Tailwind CSS v4 (`@tailwindcss/vite`, configuración CSS-first) · framer-motion (con `LazyMotion` + `domAnimation` en `App.tsx`, modo `strict`: usar siempre `m.div`, nunca `motion.div`) · Oxlint (de create-vite). Ya no se usan lucide-react ni three/@react-three: los iconos son propios (ver §4). Fuentes por Google Fonts en `index.html`, cargadas sin bloquear el primer render: Manrope (sans) y Newsreader (display, con cursiva). Despliegue previsto: Netlify (el dominio vive en Hostinger). Sin react-router: el enrutado es un lector de `pathname`.

## 4. Design system (definido en `src/index.css`)
`@theme static` registra los colores como utilidades de Tailwind.
- navy-950 #060d1f · navy-900 #0a1630 · navy-800 #0f2147 · navy-700 #16306a
- cyan-400 #33d1ff · cyan-500 #00c2ff (CTAs) · cyan-600 #00a3d9 · cyan-700 #00708f (texto pequeño sobre claro)
- silver-300 #d3dae6 · silver-400 #b8c2d1 · silver-500 #8d99ad · paper #f5f4ef (fondo claro editorial)
- Ratios clave: silver-300 sobre navy-950 ≈ 13:1; navy-950 sobre cyan-500 ≈ 9.3:1; cyan-700 sobre blanco ≈ 5.6:1.
- Texto atenuado sobre claro: como mínimo `text-navy-800/70` (≈ 5.7:1 sobre paper). No bajar de /70.
- Clase `.on-light` en todo contenedor de fondo claro: cambia el anillo de foco y el acento de los iconos a cyan-700.
- Tipografía: titulares en `font-display` peso normal, con la palabra clave en cursiva de color (`<em className="text-cyan-700">` sobre claro, `text-cyan-400` sobre oscuro). Etiquetas de sección con `Eyebrow` (índice en cursiva 01–05 + filete).
- Iconos: `components/icons/Icon.tsx` (set propio, retícula 32, trazo 1.25, un elemento de acento `ic-a` en cian) y `Glyph.tsx` (flechas, menú, check… retícula 24). No mezclar con otras librerías.
- Fotografía: `components/Photo.tsx` sirve WebP propios desde `public/images` (800w + 1600w). Origen Unsplash (licencia Unsplash); los IDs están documentados en el archivo.
- Los avisos "Unknown at rule @theme" de VS Code son falsos positivos (se silencian con `.vscode/settings.json`).
- Ritmo de secciones: Hero (navy-950) → About (paper) → Services (blanco) → Process (navy-950 con skyline) → ClientGuide (paper) → Contact/Begin (navy-900) → Footer (navy-950).

## 5. Estructura y estado
Rutas en `App.tsx` (lector de `pathname`): `/` home · `/discovery` workbook (carga diferida con `React.lazy`) · `/privacy` · resto 404. Home: SkipLink → Navbar → Hero → About → Services → Process → ClientGuide → Contact → Footer (`showCta={false}`).

Componentes (`src/components/`):
- **Navbar**: cristal oscuro con scroll, scrollspy, barra de progreso, menú móvil (Esc cierra). Enlaces: About, Services, Process, Client Guide; CTA "Start Your Discovery" → `/discovery`. Logo: `public/logo.webp`.
- **Hero** (`#inicio`): titular "Clear Strategy. / Real Growth." con revelado por línea; collage de fotos (ejecutivo + apretón de manos) con tarjeta del workbook; banda inferior con las 3 disciplinas. El párrafo es el elemento LCP: no animar su opacidad.
- **About** (`#about`): collage (sala de juntas + asesoría + cita) y Mission / Vision / Approach con iconos.
- **Services** (`#servicios`): bento asimétrico (Strategic Diagnosis destacada con foto duotono; Growth Plan y Operational Optimization con foto lateral) + línea de tiempo "Your first 30 days".
- **Process** (`#proceso`): "The 90-Day Roadmap" con pista Day 0–90, 3 fases e icono por fase.
- **ClientGuide** (`#guide`): acordeón de 7 FAQs (paneles cerrados con `inert`).
- **Contact** (`#contacto`, etiqueta "Begin"): CTA principal al workbook con los 3 pasos; formulario corto "Have a quick question first?" plegado (Netlify form `contact`), necesario para consultas y solicitudes de privacidad.
- **Discovery Workbook** (`components/discovery/`, datos en `src/data/workbook.ts`): secciones 01–21 del PDF del cliente en 7 partes y 24 pasos (130 preguntas). Excluidas a propósito: 22–23 (solo asesor) y 24–26 (onboarding, primeros 30 días, roadmap: se rellenan ya en el proyecto). Solo nombre, email y empresa son obligatorios. Autoguardado en `localStorage` (`emerge.discovery.v1`), retomar, N/A, mapa de actividad de 12 meses, revisión con consentimiento, descarga de copia .txt y envío a Netlify Forms (form `discovery`, un campo de texto por sección).
- **Netlify Forms**: `vite.config.ts` genera `dist/__forms.html` en el build a partir de `workbook.ts` (formularios `contact` y `discovery`). No crear `public/__forms.html` a mano.
- **Footer**: logo, lema, enlaces Explore / Start here, ©. Banda CTA solo en subpáginas.
- **index.html**: OG, Twitter Cards y JSON-LD (`ProfessionalService`, sin dirección ni teléfono). `public/robots.txt`.
- **Despliegue**: `netlify.toml` (build `npm run build`, publish `dist`, `NODE_VERSION = "22"`, redirect `/* → /index.html 200`) y `public/_redirects`. Vite 8 requiere Node ≥ 20.19 o ≥ 22.12. Si el hosting estático fuera Hostinger en vez de Netlify, haría falta un `public/.htaccess` con fallback a `index.html` y otro backend para los formularios.
- Pendiente de limpieza (restos de la plantilla de Vite, sin uso): `src/App.css`, `src/assets/`, `public/icons.svg`, `README.md` genérico.

## 6. Material que depende del cliente (NO fabricar)
Logo en SVG o PNG transparente (versión blanca y a color); fotos reales del equipo con bios; casos de éxito y métricas aprobadas; testimonios autorizados; credenciales; fotografía propia; dominio y confirmación legal de la política de privacidad. Mientras no exista, dejar la estructura lista y los placeholders fuera de producción.

## 7. Criterios de calidad (definition of done de cualquier cambio)
- `npm run build` (tsc -b + vite build) y el linter pasan sin errores ni imports sin usar.
- Sin errores en consola; sin scroll horizontal desde 320px; navegación por teclado completa.
- `grep` sin "Miami" en el código ni en el HTML; sin textos visibles en español; sin `console.log` con datos del visitante.
- Lighthouse móvil sobre el build: Accessibility ≥ 95, SEO 100, Best Practices ≥ 95, Performance ≥ 85.
