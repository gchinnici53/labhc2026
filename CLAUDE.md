# CLAUDE.md — LABHC 2026

Instrucciones permanentes para Claude Code en este repositorio.
Leer completo antes de escribir código.

---

## 1. Qué es este proyecto

Sitio web oficial + backend de administración del **Latin American Bowhunter
Championship 2026 (LABHC 2026)**, torneo de tiro con arco 3D bajo reglamento
IFAA.

- **Dominio:** labhc2026.ar
- **Fechas del torneo:** 5 al 8 de diciembre de 2026
- **Sede:** Panda Troupe, Olivera, Provincia de Buenos Aires, Argentina
- **Organizan:** Flechar + Liga 3D Metropolitana
- **Avalan / partners:** IFAA, TAFISA, Zona Vital (se agregarán más)
- **Proyecto hermano:** liga3d.appchinni.com (misma VPS, mismo stack)

El sitio es **público y bilingüe (ES/EN)** porque es un torneo internacional
con inscripción en dólares.

---

## 2. Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript (strict) |
| Estilos | Tailwind CSS |
| ORM | Prisma |
| Base de datos | PostgreSQL 16 |
| Auth | Auth.js (NextAuth v5) con Credentials provider |
| Validación | Zod (en cada Server Action y route handler) |
| i18n | next-intl (`app/[locale]/...`, locales `es` y `en`, default `es`) |
| Imágenes | Subida local a `/public/uploads`, servidas por Nginx |
| Proceso | PM2 |
| Reverse proxy | Nginx + Certbot (Let's Encrypt) |

**No agregar dependencias nuevas sin justificarlo primero.** En particular: nada
de librerías de UI pesadas (MUI, Chakra); todo con Tailwind y componentes
propios.

---

## 3. Convenciones

- **Los comentarios del código se escriben en español.** Los nombres de
  variables, funciones, archivos y modelos también van en español (`arquero`,
  `inscripcion`, `alojamiento`), salvo términos técnicos ya establecidos.
  Los identificadores de código van **sin acentos ni ñ**.
- Los textos visibles al usuario **nunca** van hardcodeados en los componentes:
  van en `messages/es.json` y `messages/en.json`.
- Componentes de servidor por defecto. `"use client"` solo cuando hace falta
  estado, efectos o eventos (cuenta regresiva, carrusel, formularios).
- Mutaciones vía **Server Actions** con validación Zod. Route handlers solo
  para lo que necesite ser API real (webhooks, exportaciones).
- Sin `any`. Sin `@ts-ignore`.
- Formato de fecha en la UI: `DD/MM/AAAA`. Zona horaria del evento:
  `America/Argentina/Buenos_Aires`.
- Commits en español, en imperativo: `agrega cuenta regresiva a la home`.

### Estructura de carpetas

```
app/
  [locale]/
    (public)/          # home, acerca, competicion, resultados, registrados,
                       # alojamiento, inscripcion
    layout.tsx
  admin/               # panel protegido, sin i18n (layout raiz propio,
                       # fuera de [locale] — ver docs/02-SITEMAP.md)
  api/
components/
  ui/                  # botones, inputs, card, tabla — genéricos
  publico/             # navbar, footer, hero, cuenta-regresiva, sponsors...
  admin/
lib/
  prisma.ts
  auth.ts            # config completa de Auth.js (con el provider de Credentials)
  auth.config.ts     # config edge-safe, sin Prisma/bcrypt (la usa el middleware)
  permisos.ts        # requiereRol(...) para las Server Actions
  etiquetas.ts        # labels legibles de los enums (Division, Estilo, Genero)
  validaciones/        # esquemas Zod
  utils/
messages/
  es.json
  en.json
prisma/
  schema.prisma
  seed.ts
public/
  uploads/             # imágenes cargadas desde el panel (gitignored)
docs/                  # documentación del proyecto (leer antes de empezar)
```

---

## 4. Modelo de datos

Fuente de verdad: `prisma/schema.prisma`. Este es el diseño acordado.

### Usuarios y roles

Tres niveles, jerárquicos:

| Rol | Puede |
|---|---|
| `ADMIN` | Todo: usuarios, arqueros, grupos, resultados, contenido, configuración |
| `CARGA` | Alta y edición de arqueros, marcar pagos, cargar resultados y grupos |
| `INVITADO` | Solo lectura del panel (ve listados y resultados, no edita) |

El público general **no** tiene cuenta: la inscripción es un formulario abierto
que crea un `Arquero` en estado pendiente.

### Entidades

```prisma
enum Rol          { ADMIN CARGA INVITADO }
enum Genero       { MASCULINO FEMENINO }
enum Division     { CUB JUNIOR YOUNG_ADULT ADULT VETERAN SENIOR } // IFAA
enum Estilo       { BB_R BB_C FS_R FS_C FU BH_R BH_C BL BU LB HB TR } // IFAA
enum Ronda        { ANIMAL STANDARD HUNTING }
enum NivelSponsor { PRINCIPAL PARTNER APOYO }

model Usuario {
  id            String   @id @default(cuid())
  email         String   @unique
  nombre        String
  passwordHash  String
  rol           Rol      @default(INVITADO)
  activo        Boolean  @default(true)
  creadoEn      DateTime @default(now())
  actualizadoEn DateTime @updatedAt
}

model Arquero {
  id              String   @id @default(cuid())
  numeroRegistro  String?  @unique            // LABHC-2026-0001, asignado al confirmar el alta
  nombre          String
  apellido        String
  genero          Genero
  fechaNacimiento DateTime @db.Date
  pais            String                      // ISO-3166 alpha-2
  federacion      String                      // texto libre
  division        Division
  estilo          Estilo
  email           String
  telefono        String?
  banquete        Boolean  @default(false)    // quiere banquete (USD 40)
  banquetePagado  Boolean  @default(false)    // confirmacion de pago del banquete
  pagado          Boolean  @default(false)    // confirmacion de pago de la inscripcion (USD 150)
  comprobanteUrl  String?
  notas           String?
  publicado       Boolean  @default(true)     // aparece en /registrados
  creadoEn        DateTime @default(now())
  actualizadoEn   DateTime @updatedAt
  grupos          ArqueroGrupo[]
  resultados      Resultado[]
}

model Grupo {
  id            String @id @default(cuid())
  nombre        String                          // "Grupo 1"
  ronda         Ronda
  blancoInicial Int?                            // estaca de largada
  integrantes   ArqueroGrupo[]
  @@unique([nombre, ronda])
}

model ArqueroGrupo {
  arqueroId String
  grupoId   String
  arquero   Arquero @relation(fields: [arqueroId], references: [id], onDelete: Cascade)
  grupo     Grupo   @relation(fields: [grupoId],   references: [id], onDelete: Cascade)
  @@id([arqueroId, grupoId])
}

model Resultado {
  id         String  @id @default(cuid())
  arqueroId  String
  ronda      Ronda
  puntaje    Int
  dieces     Int?                               // criterio de desempate
  cargadoPor String?
  arquero    Arquero @relation(fields: [arqueroId], references: [id], onDelete: Cascade)
  @@unique([arqueroId, ronda])
}

model Sponsor {
  id       String       @id @default(cuid())
  nombre   String
  logoUrl  String
  sitioWeb String?
  nivel    NivelSponsor @default(PARTNER)
  orden    Int          @default(0)
  activo   Boolean      @default(true)
}

model Alojamiento {
  id             String   @id @default(cuid())
  nombre         String
  descripcionEs  String
  descripcionEn  String
  imagenUrl      String
  precioSugerido Decimal? @db.Decimal(10,2)
  moneda         String   @default("USD")
  distanciaKm    Decimal? @db.Decimal(5,1)
  tieneTransfer  Boolean  @default(false)
  sitioWeb       String?
  telefono       String?
  orden          Int      @default(0)
  activo         Boolean  @default(true)
}

model Configuracion {
  clave String @id      // "inscripcion_abierta", "email_contacto", "precio_*"
  valor String
}
```

**Número de registro:** se asigna al confirmar el alta (no al enviar el
formulario), con formato `LABHC-2026-NNNN` y NNNN correlativo de 4 dígitos.
Generarlo dentro de una transacción para evitar duplicados.

**Divisiones y estilos IFAA:** los enums siguen el Archer's Handbook. Antes de
la etapa 4, verificar contra la edición vigente del handbook y contra lo que
pida la organización del torneo.

---

## 5. Reglas de producto

1. La **cuenta regresiva** apunta al `2026-12-05T08:00:00-03:00`. Al llegar a
   cero muestra "El torneo comenzó", nunca números negativos.
2. **Grupos y Resultados** arranca como "En construcción", pero la ruta, el
   modelo y el panel de carga ya deben existir desde la etapa 4.
3. **Registrados** muestra solo: número de registro, nombre y apellido, país,
   división, estilo y estado de pago. Nunca email, teléfono ni fecha de
   nacimiento.
4. Precios: inscripción USD 150, banquete USD 40. Van en `Configuracion`, no
   hardcodeados.
5. Todo lo marcado como "a definir" en `docs/04-PENDIENTES.md` se implementa
   con un placeholder visible y editable desde el panel. Nunca inventar textos,
   nombres, precios ni datos de contacto.

---

## 6. Etapas de desarrollo

Trabajar de a una etapa. No empezar la siguiente sin que la anterior corra.

- [x] **Etapa 1 — Base:** Next.js 14 + TS + Tailwind + next-intl, layout con
      navbar y footer, las 7 rutas creadas y vacías, paleta y tipografía.
- [x] **Etapa 2 — Home:** banner/hero, cuenta regresiva, mensaje de bienvenida,
      grilla de partners, footer completo.
- [x] **Etapa 3 — Contenido estático:** Acerca de, Competición (programa, mapa,
      precios, formas de pago), Alojamiento.
- [x] **Etapa 4 — Base de datos y auth:** Prisma + PostgreSQL, migraciones,
      seed, Auth.js con los 3 roles, middleware que protege `/admin`.
- [ ] **Etapa 5 — Panel admin:** ABM de arqueros, sponsors, alojamientos,
      usuarios y configuración. Exportación de arqueros a CSV.
- [ ] **Etapa 6 — Inscripción pública:** formulario validado con Zod, alta en
      estado PENDIENTE, mail de confirmación, página /registrados en vivo.
- [ ] **Etapa 7 — Grupos y resultados:** armado de grupos por ronda, carga de
      puntajes, tabla de posiciones pública por división y estilo.
- [ ] **Etapa 8 — Deploy:** ver `docs/03-DEPLOY-DOMINIO.md`.

---

## 7. Comandos

```bash
npm run dev            # desarrollo
npm run build          # build de producción
npm run lint
npx prisma migrate dev --name <nombre>
npx prisma studio
npx prisma db seed
pm2 restart labhc2026  # en la VPS
```

---

## 8. Documentación del proyecto

- `docs/00-PLAN.md` — plan por etapas, con detalle de cada una
- `docs/01-PROMPT-INICIAL.md` — prompt para arrancar la etapa 1
- `docs/02-SITEMAP.md` — mapa del sitio, contenido página por página
- `docs/03-DEPLOY-DOMINIO.md` — DNS, Nginx, SSL y PM2 en la VPS
- `docs/04-PENDIENTES.md` — decisiones abiertas (todo lo "a definir")
