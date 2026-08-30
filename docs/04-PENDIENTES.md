# 04 — Decisiones pendientes

Todo lo que está "a definir". Mientras no se resuelva, va como placeholder
visible en el sitio. **No inventar contenido para llenar estos huecos.**

## Revisiones sobre lo que ya pasaste

| # | Punto | Qué revisar |
|---|---|---|
| P1 | Fecha del día 4 | Lo anotaste como `6/12`, pero después del día 3 (7/12) corresponde **8/12**. Quedó cargado como 8/12. |
| P2 | Numeración de las pruebas | Los tres días decían "primera prueba". Quedó como 1ª Animal, 2ª Standard, 3ª Hunting. Confirmar el orden. |
| P3 | "branch" del día 1, 18:00–19:00 | Lo interpreté como **brindis**. Si era *brunch*, no cierra con el horario. Confirmar. |
| P4 | Nombre oficial del torneo | "LABHC 2026" es la sigla. Falta el nombre completo, en español y en inglés. |

## Contenido

- [ ] Nombre oficial completo del torneo (ES / EN)
- [ ] Logo del torneo en alta resolución (SVG o PNG con fondo transparente)
- [ ] Imágenes del banner principal (3 a 5, apaisadas, mínimo 1920 px de ancho)
- [ ] Los dos CTA del banner: qué texto y a dónde llevan
- [ ] Texto de bienvenida de la home
- [ ] Texto "La unión de Flechar con la Liga 3D Metropolitana"
- [ ] Texto resumido sobre la IFAA
- [ ] Logos de IFAA, TAFISA y Zona Vital en alta resolución + a qué sitio enlaza cada uno
- [ ] Lista final de partners y auspiciantes
- [ ] Mail de contacto oficial (¿`info@labhc2026.ar`?)
- [ ] Redes sociales del torneo, si van a existir
- [ ] Fotos y datos de los 2 o 3 alojamientos sugeridos
- [ ] Descripción, horarios y costo del transfer al campo de tiro

## Organización

- [ ] Personas a cargo y sus roles (nombre + función, para la página de Competición)
- [ ] Lugar exacto de la apertura y el desfile del día 1
- [ ] Dirección postal exacta de Panda Troupe, para el mapa y el "cómo llegar"
- [ ] ¿Hay premios definidos por categoría? ¿Se publican antes?

## Inscripción y pagos

- [ ] Fecha de apertura de inscripciones
- [ ] Fecha de cierre de inscripciones
- [ ] Formas de pago: cuenta bancaria, transferencia internacional, Wise, PayPal, MercadoPago
- [ ] ¿Precio distinto para arqueros locales, o USD 150 parejo para todos?
- [ ] ¿Hay precio diferencial para Cub y Junior?
- [ ] ¿El banquete se paga junto con la inscripción o aparte?
- [ ] ¿Se aceptan acompañantes al banquete? ¿A qué precio?
- [ ] Política de cancelación y reembolso
- [ ] ¿Se pide comprobante de pago subido en el formulario?
- [ ] Cupo máximo de arqueros, si lo hay

## Técnicas

- [ ] IP pública de la VPS (para el DNS)
- [ ] ¿Cloudflare o nameservers de Hostinger? (ver `03-DEPLOY-DOMINIO.md`)
- [ ] Proveedor de mail para las confirmaciones: Resend, SMTP de Hostinger, otro
- [ ] Repositorio Git: ¿GitHub privado?
- [x] Verificar los enums de división y estilo contra el Archer's Handbook IFAA vigente — confirmado por la organización (2026-08-30): 5 divisiones sin Young Adult (Cub 8-12, Junior 13-17, Adult 18-54, Veteran 55-64, Senior 65+), estilo sin cambios (12 valores)
- [ ] ¿Hace falta guardar el número de licencia IFAA de cada arquero?
- [ ] ¿El sitio necesita política de privacidad? (datos personales de menores de edad en Cub y Junior)
- [ ] Texto de la página `/reglamento` (nueva, reemplaza a "Resultados" en el nav fijo — ver `02-SITEMAP.md`)
- [ ] Implementar el reemplazo dinámico del botón "Inscribirme" → "Resultados" cuando `inscripcion_abierta = false` en `Configuracion` (depende del panel admin, Etapa 4/5+)
