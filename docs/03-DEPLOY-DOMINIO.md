# 03 — Apuntar labhc2026.ar a la VPS y desplegar

Objetivo: que `labhc2026.ar` resuelva a la **misma VPS de Hostinger** donde ya
corre `liga3d.appchinni.com`, sin tocar nada de lo que ya funciona.

La clave: **Nginx enruta por `server_name`**, así que una sola IP puede servir
todos los dominios que quieras. Cada app corre en su propio puerto local y
Nginx decide a cuál mandar cada request según el dominio que pidió el visitante.

```
                        ┌─ server_name liga3d.appchinni.com → 127.0.0.1:3000
Internet → IP VPS :443 ─┤
                        └─ server_name labhc2026.ar         → 127.0.0.1:3001
```

---

## Parte 1 — DNS

### Paso 0. Datos a mano

```bash
# En la VPS, para confirmar la IP pública:
curl -4 ifconfig.me
```

Anotala. En este documento la llamamos `IP_VPS`.

### Paso 1. Elegir dónde vive la zona DNS

NIC Argentina **no aloja registros A**: solo te deja **delegar** el dominio a un
mínimo de **dos servidores DNS**. Así que primero hay que decidir quién hostea
la zona. Dos caminos:

| | Opción A — Cloudflare (recomendada) | Opción B — Nameservers de Hostinger |
|---|---|---|
| Costo | Gratis | Incluido |
| Panel | Cloudflare DNS | hPanel → Dominios → Zona DNS |
| Ventaja | CDN, caché, cambios instantáneos, analytics | Todo en un solo proveedor |
| Contra | Un proveedor más que administrar | Propagación más lenta, menos control |

Si ya tenés `appchinni.com` administrado en algún lado, lo más simple es usar el
mismo proveedor para mantener todo junto.

### Paso 2A. Cloudflare (recomendado)

1. Crear cuenta en cloudflare.com → **Add a site** → `labhc2026.ar` → plan Free.
2. Cloudflare te asigna **dos nameservers** propios, del estilo
   `xxx.ns.cloudflare.com` y `yyy.ns.cloudflare.com`. **Copialos.**
3. En Cloudflare → **DNS** → **Records**, creá:

   | Tipo | Nombre | Contenido | Proxy | TTL |
   |---|---|---|---|---|
   | A | `@` | `IP_VPS` | **DNS only (nube gris)** | Auto |
   | A | `www` | `IP_VPS` | **DNS only (nube gris)** | Auto |

   > **Importante:** dejá el proxy en gris (DNS only) hasta que Certbot haya
   > emitido el certificado. Con el proxy naranja activado, la validación
   > HTTP-01 de Let's Encrypt puede fallar. Después de tener SSL funcionando
   > podés activar el naranja si querés CDN, con el modo SSL en
   > **Full (strict)**.

4. Seguí con el **Paso 3** (delegación en NIC.ar).

### Paso 2B. Nameservers de Hostinger

1. En hPanel agregá `labhc2026.ar` como dominio existente.
2. Anotá los nameservers que te muestre. Los de Hostinger suelen ser:

   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```

   **Confirmalos en tu panel antes de cargarlos** — no los des por sentado.
3. En hPanel → **Zona DNS** del dominio, creá los registros A:

   | Tipo | Nombre | Apunta a | TTL |
   |---|---|---|---|
   | A | `@` | `IP_VPS` | 14400 |
   | A | `www` | `IP_VPS` | 14400 |

4. Seguí con el Paso 3.

### Paso 3. Delegar el dominio en NIC.ar

1. Entrá a **nic.ar** con Clave Fiscal nivel 2 o superior.
2. Menú de trámites → tu lista de dominios → botón **Delegar** en
   `labhc2026.ar`.
3. **Agregar una nueva delegación** → elegí la opción de **servidores DNS de tu
   proveedor de hosting** (no "autodelegación").
4. Cargá los **dos** nameservers del paso 2 (Cloudflare u Hostinger), uno por
   campo.
5. **Guardar** y después **Ejecutar cambios**. Este segundo botón es el que
   realmente aplica el trámite: si no lo apretás, no pasa nada.

La delegación en NIC.ar suele activarse **el mismo día**; la propagación global
puede tardar hasta 24 hs.

### Paso 4. Verificar

Desde tu PC (PowerShell) o desde la VPS:

```bash
# ¿Quedaron bien los nameservers?
nslookup -type=NS labhc2026.ar

# ¿El dominio resuelve a la IP correcta?
nslookup labhc2026.ar
nslookup www.labhc2026.ar

# Desde la VPS (Linux):
dig +short NS labhc2026.ar
dig +short A  labhc2026.ar
```

**No sigas con SSL hasta que `dig +short A labhc2026.ar` devuelva `IP_VPS`.**
Certbot falla si el dominio todavía no resuelve.

---

## Parte 2 — Preparar la app en la VPS

### Paso 5. PostgreSQL

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo -u postgres psql
```

```sql
CREATE DATABASE labhc2026;
CREATE USER labhc_user WITH ENCRYPTED PASSWORD 'PONE_UNA_PASSWORD_LARGA';
GRANT ALL PRIVILEGES ON DATABASE labhc2026 TO labhc_user;
\c labhc2026
GRANT ALL ON SCHEMA public TO labhc_user;
\q
```

En el `.env` de producción de la app:

```
DATABASE_URL="postgresql://labhc_user:PONE_UNA_PASSWORD_LARGA@localhost:5432/labhc2026?schema=public"
NEXTAUTH_URL="https://labhc2026.ar"
AUTH_SECRET="<generar con: openssl rand -base64 32>"
NEXT_PUBLIC_SITE_URL="https://labhc2026.ar"
```

> PostgreSQL escucha solo en localhost por defecto. Dejalo así: no abras el
> puerto 5432 en el firewall.

### Paso 6. Código y build

```bash
cd /var/www
git clone <tu-repo> labhc2026
cd labhc2026
npm ci
npx prisma migrate deploy
npx prisma db seed
npm run build
```

### Paso 7. PM2 en el puerto 3001

`liga3d` ya está usando el 3000. Verificalo:

```bash
pm2 list
sudo ss -tlnp | grep -E '300[0-9]'
```

Levantá la nueva app en 3001:

```bash
cd /var/www/labhc2026
PORT=3001 pm2 start npm --name labhc2026 -- start
pm2 save
```

O con un `ecosystem.config.js`:

```js
module.exports = {
  apps: [{
    name: 'labhc2026',
    cwd: '/var/www/labhc2026',
    script: 'npm',
    args: 'start',
    env: { NODE_ENV: 'production', PORT: 3001 }
  }]
}
```

Probá que responde localmente **antes** de tocar Nginx:

```bash
curl -I http://127.0.0.1:3001
```

---

## Parte 3 — Nginx

### Paso 8. Server block nuevo

No toques el archivo de liga3d. Creá uno aparte:

```bash
sudo nano /etc/nginx/sites-available/labhc2026.ar
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name labhc2026.ar www.labhc2026.ar;

    # Certbot reescribe este bloque para agregar el redirect a HTTPS.

    client_max_body_size 20M;   # subida de logos y fotos desde el panel

    access_log /var/log/nginx/labhc2026.access.log;
    error_log  /var/log/nginx/labhc2026.error.log;

    # Assets estáticos del build de Next: los sirve Nginx, no Node
    location /_next/static/ {
        alias /var/www/labhc2026/.next/static/;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    # Imágenes cargadas desde el panel
    location /uploads/ {
        alias /var/www/labhc2026/public/uploads/;
        expires 30d;
        access_log off;
    }

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        'upgrade';
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }
}
```

Activalo y probá la sintaxis:

```bash
sudo ln -s /etc/nginx/sites-available/labhc2026.ar /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` tiene que decir `syntax is ok` y `test is successful`. Si falla, NO
recargues: arreglá primero.

En este punto `http://labhc2026.ar` ya debería mostrar la app.

### Paso 9. SSL con Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx   # si no lo tenés
sudo certbot --nginx -d labhc2026.ar -d www.labhc2026.ar
```

Elegí la opción de **redirigir HTTP a HTTPS**. Certbot edita el server block
solo. El certificado de liga3d no se ve afectado: son certificados separados.

Verificar la renovación automática:

```bash
sudo certbot renew --dry-run
systemctl list-timers | grep certbot
```

### Paso 10. Firewall

```bash
sudo ufw status
sudo ufw allow 'Nginx Full'   # si hiciera falta
```

Los puertos 3000 y 3001 **no** se abren al exterior: solo los toca Nginx desde
localhost.

---

## Checklist final

- [ ] `dig +short A labhc2026.ar` devuelve la IP de la VPS
- [ ] `dig +short A www.labhc2026.ar` devuelve la misma IP
- [ ] `pm2 list` muestra `liga3d` y `labhc2026` en estado `online`
- [ ] `curl -I http://127.0.0.1:3001` responde 200
- [ ] `sudo nginx -t` pasa
- [ ] `https://labhc2026.ar` abre con candado
- [ ] `https://www.labhc2026.ar` redirige o abre igual
- [ ] `https://liga3d.appchinni.com` **sigue funcionando** (verificar siempre al final)
- [ ] `sudo certbot renew --dry-run` pasa
- [ ] `pm2 save` ejecutado y `pm2 startup` configurado, para sobrevivir un reboot

---

## Problemas típicos

| Síntoma | Causa probable |
|---|---|
| `502 Bad Gateway` | La app no está corriendo en 3001 → `pm2 logs labhc2026` |
| Certbot: "challenge failed" | El DNS todavía no propagó, o Cloudflare está en proxy naranja |
| Abre liga3d en vez de LABHC | Falta el `server_name` correcto o el symlink en `sites-enabled` |
| `413 Request Entity Too Large` al subir fotos | Falta o quedó chico `client_max_body_size` |
| Todo cae después de un reboot | Faltó `pm2 startup` + `pm2 save` |
