# CLAUDE.md — Emerge Strategic Advisors (sitio corporativo)

## 1. Qué es este proyecto
Sitio web corporativo de una sola página, más /privacy y una página 404, para **Emerge Strategic Advisors**, firma de consultoría estratégica con sede en EE. UU. (Miami). Objetivo: transmitir autoridad y profesionalismo y captar consultas mediante un formulario. Referencias de diseño: L.E.K. Consulting y North Highland (también Prophet y McKinsey). Dominio previsto: `emergestrategicadvisors.com` (CONFIRMAR con el cliente). Entorno del desarrollador: Windows + PowerShell + VS Code; ruta `D:\dev\Emerge\emerge-strategic-advisors`.

## 2. Reglas innegociables
1. **Todo texto visible está en INGLÉS**: contenido, `aria-label`, `title`, meta tags, mensajes de error, placeholders y comentarios de código. Excepción: los IDs de ancla heredados (`#servicios`, `#proceso`, `#contacto`) no son texto visible y se mantienen para no romper enlaces. Las secciones nuevas usan IDs en inglés (`#about`, `#guide`, `#results`).
2. **Privacidad del cliente**: no mostrar ciudad, dirección, teléfono ni email del cliente. "Miami, FL" se eliminó a propósito de Footer y Contact. No inventar datos de contacto.
3. **Nada inventado**: ni métricas, clientes, testimonios, certificaciones, premios ni cifras. Sin lenguaje de garantía de resultados (p. ej. "double revenue"). Todo placeholder debe estar claramente marcado y no publicarse por defecto.
4. **Accesibilidad WCAG 2.2 AA**: contraste ≥ 4.5:1 en texto normal; usar `cyan-700` (no `cyan-600`) para texto pequeño sobre fondos claros; foco visible; respetar `prefers-reduced-motion`; HTML semántico; un solo `h1` por página.
5. **Responsive mobile-first** (sm/md/lg/xl), sin scroll horizontal desde 320px.
6. **Stack cerrado**: no añadir dependencias sin avisar y justificar antes. No WordPress ni Shopify.
7. **Cambios quirúrgicos**: no refactorizar lo que ya funciona sin motivo. Una cosa a la vez, con el build en verde entre pasos.
8. **Tono del copy**: sobrio, ejecutivo y seguro; frases cortas; sin superlativos vacíos.

## 3. Stack
Vite 8 · React (verificar versión; `@react-three/fiber` v9 exige React 19) · TypeScript estricto · Tailwind CSS v4 (`@tailwindcss/vite`, configuración CSS-first) · framer-motion · lucide-react · three + @react-three/fiber (+ @react-three/drei hoy; retirar si queda sin uso) · Oxlint (de create-vite). Fuentes por Google Fonts en `index.html`: Manrope (sans) y Playfair Display (display). Despliegue previsto: Netlify (el dominio vive en Hostinger). Sin react-router: el enrutado es un lector de `pathname`.

## 4. Design system (definido en `src/index.css`)
`@theme static` registra los colores como utilidades de Tailwind. Además hay alias en `:root` (`--navy-950`, `--cyan-500`, `--silver-300`…) que `Background3D` lee con `getComputedStyle`: no eliminarlos.
- navy-950 #060d1f · navy-900 #0a1630 · navy-800 #0f2147 · navy-700 #16306a
- cyan-400 #33d1ff · cyan-500 #00c2ff (CTAs) · cyan-600 #00a3d9 · cyan-700 #00708f (texto pequeño sobre claro)
- silver-300 #d3dae6 · silver-400 #b8c2d1 · silver-500 #8d99ad
- Ratios clave: silver-300 sobre navy-950 ≈ 13:1; navy-950 sobre cyan-500 ≈ 9.3:1; cyan-700 sobre blanco ≈ 5.6:1.
- Tailwind v4 ya trae `text-balance`; el `@utility text-balance` del CSS es redundante (verificar y retirar). Los avisos "Unknown at rule @theme" de VS Code son falsos positivos (se silencian con `.vscode/settings.json`).
- Ritmo de secciones: Hero (oscuro) → About (blanco) → Services (slate-50) → Process (navy-900) → [Results (blanco)] → ClientGuide (slate-50) → Contact (navy) → Footer (navy-950).

## 5. Estructura y estado (fases 1–4 entregadas)
Orden en `App.tsx`: SkipLink (fase 5) → Navbar → Hero → About → Services → Process → ClientGuide → Contact → Footer. `App.tsx` ya envuelve todo en `<MotionConfig reducedMotion="user">`.

Verificado visualmente por el desarrollador en el navegador: Navbar, Hero y About renderizan correctamente en dev. El resto está entregado como código pero NO confirmado: auditarlo (ver tarea).

Componentes (`src/components/`):
- **Navbar**: cristal adaptativo. Transparente arriba del todo; con scroll es cristal oscuro sobre secciones oscuras y cristal claro sobre secciones claras. Lo decide con `document.elementsFromPoint` y el atributo `data-nav-theme="light"` presente en About, Services y ClientGuide. Incluye scrollspy, barra de progreso, menú móvil con cierre por Esc. Enlaces: Services, Process, Contact; CTA "Schedule a Consultation". PENDIENTE: el logo es un icono provisional (TrendingUp) hasta tener el SVG real.
- **Hero** (`#inicio`): "Clear Strategy. Real Growth.", subtítulo, CTAs (primario cian sólido, secundario outline), `Background3D` cargado con `React.lazy`.
- **Background3D**: red de nodos y líneas (constelación) con PRNG con semilla, 130 nodos en desktop y 80 en móvil, parallax con el ratón, `ErrorBoundary` si falla WebGL, respeta reduced-motion. Se rediseña en la fase 5.
- **About** (`#about`): editorial a dos columnas; Our Mission / Our Vision / Our Approach; bloque visual cian con SVG abstracto y lema "A clearer picture. A stronger strategy."
- **Services** (`#servicios`): 3 tarjetas (Strategic Diagnosis, Growth Plan, Operational Optimization) con fondo navy-900 y línea superior cian; tira "What to Expect: Your First 30 Days". PENDIENTE: un bullet con texto de riesgo legal.
- **Process** (`#proceso`): "The 90-Day Roadmap" en 3 fases (Days 1-30 Discovery & Audit; 31-60 Strategy & Optimization; 61-90 Execution & Review). PENDIENTE: pasar el grid de `md:` a `lg:`.
- **ClientGuide** (`#guide`): acordeón accesible con 4 FAQs (`aria-expanded`, `aria-controls`).
- **Contact** (`#contacto`): "Ready to Accelerate Your Growth?". El formulario es una SIMULACIÓN: hace `console.log` y muestra un éxito falso. No envía nada. Se corrige en la fase 5.
- **Footer**: marca EMERGE | STRATEGIC ADVISORS, enlaces, "© 2026 Emerge Strategic Advisors. All rights reserved." Sin ciudad.
- **index.html**: viewport correcto, fuentes y descripción básica. No tiene aún OG, JSON-LD ni analítica.
- **Despliegue**: `netlify.toml` (build `npm run build`, publish `dist`, `NODE_VERSION = "22"`, redirect `/* → /index.html 200`) y `public/_redirects`. Vite 8 requiere Node ≥ 20.19 o ≥ 22.12. Si el hosting estático fuera Hostinger en vez de Netlify, haría falta un `public/.htaccess` con fallback a `index.html`.

## 6. Material que depende del cliente (NO fabricar)
Logo en SVG o PNG transparente (versión blanca y a color); fotos reales del equipo con bios; casos de éxito y métricas aprobadas; testimonios autorizados; credenciales; fotografía propia; dominio y confirmación legal de la política de privacidad. Mientras no exista, dejar la estructura lista y los placeholders fuera de producción.

## 7. Criterios de calidad (definition of done de cualquier cambio)
- `npm run build` (tsc -b + vite build) y el linter pasan sin errores ni imports sin usar.
- Sin errores en consola; sin scroll horizontal desde 320px; navegación por teclado completa.
- `grep` sin "Miami" en el código ni en el HTML; sin textos visibles en español; sin `console.log` con datos del visitante.
- Lighthouse móvil sobre el build: Accessibility ≥ 95, SEO 100, Best Practices ≥ 95, Performance ≥ 85.
