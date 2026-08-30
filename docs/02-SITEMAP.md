# 02 — Mapa del sitio y contenido

Sitio bilingüe. Toda ruta existe en `/es/...` y `/en/...`; `/` redirige a `/es`.

| # | Ruta ES | Ruta EN | Estado |
|---|---|---|---|
| 1 | `/es` | `/en` | Home |
| 2 | `/es/acerca` | `/en/about` | Estático |
| 3 | `/es/competicion` | `/en/competition` | Estático |
| 4 | `/es/reglamento` | `/en/rules` | Estático — reemplaza a "Resultados" en el nav fijo |
| 5 | `/es/registrados` | `/en/registered` | Dinámico → backend |
| 6 | `/es/alojamiento` | `/en/accommodations` | Dinámico → backend |
| 7 | `/es/inscripcion` | `/en/registration` | Formulario → backend |
| 8 | `/es/resultados` | `/en/results` | En construcción → backend. **Ya no está en el nav fijo** (ver nota abajo) |
| — | `/admin/*` | — | Panel privado, sin i18n |

> **Cambio de navegación (2026-08-28):** "Resultados" deja de ser un link permanente
> del navbar/footer. En su lugar va "Reglamento" (texto a definir). La página
> `/resultados` sigue existiendo, pero pasa a ser el destino del botón que hoy
> dice "Inscribirme": cuando se cierre la inscripción (`inscripcion_abierta =
> false` en `Configuracion`, Etapa 4+), ese botón del navbar se reemplaza
> dinámicamente por "Resultados" apuntando a esta ruta. Esa lógica dinámica
> todavía no está implementada — depende del panel admin.

---

## Elementos globales

### Navbar (sticky)

```
[LOGO LABHC]   Inicio  Acerca de  Competición  Reglamento  Registrados  Alojamiento   [ES|EN]  [INSCRIBIRME → RESULTADOS]
```

- Logo a la izquierda, siempre enlaza a la home.
- Selector de idioma que conserva la ruta actual.
- Botón destacado a la derecha: "Inscribirme" mientras la inscripción esté
  abierta; cuando se cierre, pasa a decir "Resultados" y apunta a `/resultados`
  (pendiente de implementar, ver nota arriba).
- En mobile: hamburguesa; ese botón queda visible fuera del menú.

### Footer

- Columna 1: logo + una línea de qué es el torneo.
- Columna 2: todos los links del sitio.
- Columna 3: contacto — mail *(a definir)* y redes *(a definir)*.
- Columna 4: sede, fechas y organizadores.
- Barra inferior: © 2026 LABHC · logos chicos de IFAA / TAFISA.

---

## 1. Home

```
┌──────────────────────────────────────────────┐
│ NAVBAR                                       │
├──────────────────────────────────────────────┤
│ BANNER / HERO — carrusel de imágenes         │
│   Título del torneo + fecha + sede           │
│   [CTA 1: a definir]  [CTA 2: a definir]     │
├──────────────────────────────────────────────┤
│ ⏱  CUENTA REGRESIVA                          │
│   días : horas : minutos : segundos          │
│   hasta 05/12/2026 08:00 (GMT-3)             │
├──────────────────────────────────────────────┤
│ MENSAJE DE BIENVENIDA                        │
│   texto a definir                            │
├──────────────────────────────────────────────┤
│ PARTNERS Y AUSPICIANTES                      │
│   [IFAA] [TAFISA] [Zona Vital] [ + ]         │
│   grilla en escala de grises, color al hover │
├──────────────────────────────────────────────┤
│ FOOTER                                       │
└──────────────────────────────────────────────┘
```

Notas de implementación:

- El carrusel es cliente; las imágenes se cargan desde el panel.
- La cuenta regresiva se calcula en el cliente contra un timestamp fijo en UTC
  para que no dependa del reloj del visitante ni de su zona horaria.
- Los partners salen de la tabla `Sponsor` ordenados por `nivel` y `orden`.

---

## 2. Acerca de nosotros

Dos bloques de texto, cada uno con su imagen o logo:

1. **La unión de Flechar con la Liga 3D Metropolitana** — *texto a definir*.
2. **Qué es la IFAA** — reseña resumida, *texto a definir*.

Sugerencia: agregar un tercer bloque corto con los organizadores y sus roles,
que se reutiliza en la página de Competición.

---

## 3. Competición

Secciones en este orden:

### 3.1 Datos del torneo

| Campo | Valor |
|---|---|
| Nombre | *a definir* (nombre oficial completo) |
| Fecha | **5 al 8 de diciembre de 2026** |
| Lugar | **Panda Troupe, Olivera, Buenos Aires, Argentina** |
| Organización | *a definir* (personas a cargo y roles) |
| Reglamento | IFAA — 3D |

### 3.2 Programa

> ⚠ Revisar antes de publicar: ver `docs/04-PENDIENTES.md`, puntos P1 a P3.

**Día 1 — sábado 5/12**

| Hora | Actividad |
|---|---|
| 08:00 – 17:00 | Recepción e inscripción |
| 10:00 – 14:00 | Apertura del campo de práctica libre |
| 17:30 – 18:00 | Apertura y desfile *(lugar a definir)* |
| 18:00 – 19:00 | Brindis y cierre del día 1 |

**Día 2 — domingo 6/12**

| Hora | Actividad |
|---|---|
| 07:30 – 08:00 | Reunión de tiradores |
| 08:00 – 09:00 | Campo de práctica |
| 09:00 | Inicio de la 1ª prueba — **Animal Round 3D** |
| 16:00 | Entrega de tarjetas y cierre del día 2 |

**Día 3 — lunes 7/12**

| Hora | Actividad |
|---|---|
| 07:30 – 08:00 | Reunión de tiradores |
| 08:00 – 09:00 | Campo de práctica |
| 09:00 | Inicio de la 2ª prueba — **Standard Round 3D** |
| 16:00 | Entrega de tarjetas y cierre del día 3 |

**Día 4 — martes 8/12**

| Hora | Actividad |
|---|---|
| 07:30 – 08:00 | Reunión de tiradores |
| 08:00 – 09:00 | Campo de práctica |
| 09:00 | Inicio de la 3ª prueba — **Hunting Round 3D** |
| 13:00 | Entrega de tarjetas |
| 13:00 – 16:00 | Almuerzo y show |
| 16:00 | Entrega de premios |
| 17:30 | Cierre del torneo |

Implementación: tabs o acordeón por día en desktop, acordeón en mobile.

### 3.3 Ubicación

Mapa de Google embebido con la ubicación de Panda Troupe + botón "Cómo llegar"
que abre Google Maps. Usar `iframe` con `loading="lazy"`; si se usa la API con
clave, restringirla por dominio.

### 3.4 Precios

| Concepto | Precio |
|---|---|
| Inscripción de tirador | **USD 150** |
| Banquete | **USD 40** |

### 3.5 Formas de pago

*A definir.* Placeholder editable desde el panel. Contemplar que va a haber
pagos desde el exterior (transferencia internacional, Wise, PayPal) y locales.

---

## 4. Grupos y Resultados

Etapa 1 a 6: página "En construcción" con la cuenta regresiva chica y un link a
la inscripción.

Etapa 7, ya con datos:

- Selector de ronda: Animal / Standard / Hunting / **General**.
- Filtros por división y estilo.
- Tabla de posiciones: puesto, nº de registro, arquero, país, división, estilo,
  puntaje por ronda, total.
- Grupos: listado de patrullas por ronda, con estaca de largada.
- Que se lea bien en el celular: en la cancha se consulta desde el teléfono.

---

## 5. Registrados

Listado en vivo de inscriptos. Buscador por nombre o país; filtros por división,
estilo y país. Contador arriba: "N arqueros inscriptos de N países".

Columnas: nº de registro, nombre y apellido, país, federación, división, estilo,
estado de pago.

**Nunca** mostrar email, teléfono ni fecha de nacimiento.

---

## 6. Alojamiento

Cargable desde el panel (tabla `Alojamiento`). 2 o 3 opciones al inicio, cada
una como tarjeta: foto, nombre, descripción bilingüe, precio sugerido,
distancia al campo de tiro, y link al sitio o al teléfono.

Debajo, un bloque de **transfer**: descripción del servicio desde los
alojamientos al campo de tiro, horarios y costo — *a definir*.

---

## 7. Inscripción

1. Bloque de apertura y cierre de inscripciones — fechas *a definir*.
   Si `inscripcion_abierta` está en `false`, mostrar el aviso y ocultar el
   formulario.
2. Resumen de precios (inscripción + banquete).
3. Formulario:

   | Campo | Tipo | Obligatorio |
   |---|---|---|
   | Nombre | texto | sí |
   | Apellido | texto | sí |
   | Género | select | sí |
   | Fecha de nacimiento | fecha | sí |
   | País | select | sí |
   | Federación / club | texto | sí |
   | División | select (IFAA) | sí |
   | Estilo | select (IFAA) | sí |
   | Email | email | sí |
   | Teléfono | tel | no |
   | ¿Asiste al banquete? | checkbox | — |
   | Acepta reglamento y uso de datos | checkbox | sí |

4. Al enviar: alta con `pagado = false`, mail de confirmación con las
   instrucciones de pago (pendiente: falta elegir proveedor de mail, ver
   `04-PENDIENTES.md`), y pantalla de "gracias" con el resumen.
5. El número de registro se asigna automáticamente al enviar el formulario
   (decisión confirmada 2026-08-30; cambia lo que decía antes este punto).

Sugerencia: calcular la división automáticamente a partir de la fecha de
nacimiento (según la edad al 5/12/2026) y dejar que el arquero la ajuste.
