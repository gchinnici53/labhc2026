# 01 — Prompt inicial para Claude Code

Abrí una terminal en la carpeta del proyecto, corré `claude` y pegá el bloque de
abajo tal cual. Ya tenés `CLAUDE.md` y `docs/` en la carpeta, así que Claude
Code arranca con todo el contexto.

---

```
Vamos a construir el sitio del Latin American Bowhunter Championship 2026.

Antes de escribir una sola línea, leé estos archivos del repo:
- CLAUDE.md (stack, convenciones, modelo de datos, etapas)
- docs/00-PLAN.md (plan de desarrollo)
- docs/02-SITEMAP.md (estructura y contenido de cada página)
- docs/04-PENDIENTES.md (lo que todavía no está definido)

Hoy hacemos SOLO la Etapa 1. No adelantes trabajo de las etapas siguientes.

ETAPA 1 — Esqueleto del sitio

1. Inicializá un proyecto Next.js 14 con App Router, TypeScript en modo strict,
   Tailwind CSS y ESLint.

2. Configurá next-intl con dos locales: `es` (default) y `en`.
   - Middleware de routing con prefijo de locale siempre visible.
   - `app/[locale]/layout.tsx` con el provider.
   - `messages/es.json` y `messages/en.json` con todos los textos de navbar y
     footer. Ningún texto visible hardcodeado en los componentes.

3. Creá las 7 rutas públicas, cada una con solo un <h1> traducido:
   es: /es, /es/acerca, /es/competicion, /es/resultados, /es/registrados,
       /es/alojamiento, /es/inscripcion
   en: /en, /en/about, /en/competition, /en/results, /en/registered,
       /en/accommodations, /en/registration
   Los slugs de cada idioma tienen que estar traducidos (usá el pathnames de
   next-intl), no solo el prefijo.

4. Navbar sticky:
   - Logo a la izquierda (por ahora un placeholder SVG con el texto LABHC 2026),
     enlaza a la home del locale actual.
   - Links a las 6 páginas internas, con el link activo destacado.
   - Selector ES/EN que conserva la página actual.
   - Botón "INSCRIBIRME" / "REGISTER" destacado a la derecha.
   - En mobile: menú hamburguesa, con el botón de inscripción siempre visible
     fuera del menú.

5. Footer con 4 columnas: (a) logo + una línea sobre el torneo, (b) todos los
   links del sitio, (c) contacto — dejá el mail como placeholder editable,
   (d) sede, fechas y organizadores. Barra inferior con el copyright.

6. Diseño: definí en tailwind.config.ts una paleta y una tipografía coherentes
   con un torneo de tiro con arco 3D al aire libre — verdes de monte, un
   acento cálido, tipografía con carácter para títulos y una legible para el
   cuerpo. Mostrame la propuesta de colores antes de aplicarla a todo.

7. Metadata base: title template, description, Open Graph, favicon placeholder,
   lang correcto por locale.

Restricciones:
- Comentarios del código en español; identificadores sin acentos ni ñ.
- Componentes de servidor por defecto; "use client" solo donde haga falta.
- Nada de librerías de UI externas.
- No inventes contenido para lo que figura como "a definir" en
  docs/04-PENDIENTES.md: dejá placeholders evidentes.

Cuando termines: corré npm run build y npm run lint, y contame qué quedó hecho
y qué decisiones tomaste. No sigas con la Etapa 2.
```

---

## Prompts de las etapas siguientes

Al arrancar cada etapa, la fórmula es la misma:

```
Leé CLAUDE.md y docs/00-PLAN.md.
La Etapa N-1 está terminada y funcionando.
Hacé SOLO la Etapa N: <pegá acá la sección de esa etapa del plan>.
Al terminar, corré build y lint, contame qué hiciste y frená.
```

Dos costumbres que valen la pena:

- **Un commit por etapa, mínimo.** Si algo se rompe, volvés atrás sin drama.
- **Actualizá el checklist de `CLAUDE.md`** al cerrar cada etapa. Así la próxima
  sesión de Claude Code sabe en qué punto estás sin que se lo expliques.
