# 00 — Plan de desarrollo LABHC 2026

Ocho etapas. Cada una termina con algo que **corre y se puede mirar**. No pasar
a la siguiente sin cerrar la anterior.

Calendario sugerido, contando desde hoy (26/08/2026) hasta el torneo
(05/12/2026): hay **~14 semanas**. La inscripción es lo que más urge, porque de
eso depende que la gente pueda anotarse con tiempo.

| Etapa | Entrega | Tiempo estimado | Prioridad |
|---|---|---|---|
| 1 | Esqueleto + i18n + navegación | 1 semana | Alta |
| 2 | Home completa | 1 semana | Alta |
| 3 | Contenido estático | 1 semana | Alta |
| 4 | DB + auth | 1 semana | **Crítica** |
| 5 | Panel admin | 1,5 semanas | **Crítica** |
| 6 | Inscripción pública | 1,5 semanas | **Crítica** |
| 7 | Grupos y resultados | 2 semanas | Media (puede llegar en noviembre) |
| 8 | Deploy y ajustes | continuo | Alta |

> Recomendación fuerte: **hacer el deploy (etapa 8) apenas termine la etapa 2**,
> con el sitio en modo "próximamente". Así el dominio queda resolviendo, el SSL
> emitido y la gente ya puede ver que el torneo existe, mientras seguís
> desarrollando. Después es solo `git pull && npm run build && pm2 restart`.

---

## Etapa 1 — Esqueleto

**Objetivo:** que `npm run dev` levante un sitio bilingüe navegable, feo pero
completo en estructura.

- `create-next-app` con TypeScript, Tailwind, App Router, ESLint.
- `next-intl`: middleware, `app/[locale]/layout.tsx`, `messages/es.json` y
  `messages/en.json`.
- Las 7 rutas, cada una con un `<h1>` y nada más.
- Navbar con logo, links, selector de idioma y CTA de inscripción. Responsive.
- Footer con las 4 columnas.
- Definir en `tailwind.config.ts` la paleta y las fuentes.

**Listo cuando:** se puede navegar las 7 páginas en los dos idiomas, en desktop
y en mobile, y el selector de idioma conserva la página actual.

## Etapa 2 — Home

- Hero con carrusel (client component, sin librería externa si se puede).
- Cuenta regresiva al `2026-12-05T08:00:00-03:00`, con estado "ya empezó".
- Bloque de bienvenida.
- Grilla de partners (por ahora desde un array; en la etapa 5 pasa a la DB).

**Listo cuando:** la home se ve terminada y la cuenta regresiva anda bien en
mobile, en desktop y con el reloj de la PC cambiado de zona horaria.

## Etapa 3 — Contenido estático

- Acerca de: los dos bloques de texto.
- Competición: datos, programa por día, mapa embebido, precios, formas de pago.
- Alojamiento: maqueta con datos de ejemplo (pasa a la DB en la etapa 5).
- Resultados: página "En construcción".

**Listo cuando:** todo el contenido conocido está publicado y lo que falta está
como placeholder evidente, no como texto inventado.

## Etapa 4 — Base de datos y autenticación

- `prisma/schema.prisma` con todos los modelos de `CLAUDE.md`.
- PostgreSQL local para desarrollo, migración inicial.
- `prisma/seed.ts`: un usuario ADMIN, los 3 partners, 2 alojamientos de ejemplo,
  la configuración inicial (precios, mail, inscripción abierta/cerrada).
- Auth.js con Credentials, hash con bcrypt, sesión JWT.
- Middleware que protege `/admin` y helper `requiereRol(...)` para las acciones.

**Listo cuando:** podés entrar a `/admin` con el usuario del seed, y un usuario
INVITADO no puede ejecutar ninguna mutación (probado, no supuesto).

## Etapa 5 — Panel admin

- Layout del panel con sidebar y el rol visible.
- Arqueros: listado con búsqueda, filtros y paginación; alta, edición, cambio de
  estado de pago, asignación de número de registro, exportación a CSV.
- Sponsors, alojamientos y configuración: ABM con subida de imágenes.
- Usuarios: ABM, solo ADMIN.

**Listo cuando:** podés cargar un arquero a mano de punta a punta y verlo
aparecer en `/registrados`.

## Etapa 6 — Inscripción pública

- Formulario con validación Zod compartida entre cliente y servidor.
- Server Action que crea el arquero en PENDIENTE.
- Mail de confirmación (Resend o SMTP de Hostinger — decidir).
- Anti-spam: honeypot + rate limit por IP. Nada de captcha si se puede evitar.
- `/registrados` leyendo de la DB, con `revalidate` corto.

**Listo cuando:** una persona ajena puede inscribirse desde el celular sin
ayuda, recibe el mail, y vos la ves en el panel.

## Etapa 7 — Grupos y resultados

- Panel: armar grupos por ronda (idealmente con asignación automática por
  división y estilo, ajustable a mano).
- Panel: carga de puntajes por grupo, pensada para tablet.
- Público: tabla de posiciones por ronda y general, con filtros.
- Considerar exportar a PDF las planillas de grupos para imprimir.

**Listo cuando:** cargás una ronda de prueba entera y la tabla pública da los
mismos números que la planilla.

## Etapa 8 — Deploy

Ver `docs/03-DEPLOY-DOMINIO.md`. Después de la primera vez, cada actualización
es:

```bash
cd /var/www/labhc2026 && git pull && npm ci && npx prisma migrate deploy && npm run build && pm2 restart labhc2026
```

Agregar antes del torneo: backup diario de PostgreSQL por cron
(`pg_dump` a un directorio con rotación) y monitoreo mínimo de que el sitio
responde.
