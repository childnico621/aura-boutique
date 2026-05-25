# Aura Boutique

Landing page moderna desarrollada con React + Vite + TailwindCSS.

## Tecnologías

- React
- Vite
- TailwindCSS
- Variables de entorno (`.env`)
- Integración dinámica de widget externo

---

# Requisitos

- Node.js 20+
- npm 10+

Verificar:

```bash
node -v
npm -v
```

---

# Instalación

Clonar repositorio:

```bash
git clone <REPO_URL>
cd aura-boutique
```

Instalar dependencias:

```bash
npm install
```

---

# Variables de entorno

Crear archivo:

```txt
.env
```

Contenido:

```env
VITE_WIDGET_URL=https://localhost:5173/widget.js
VITE_TENANT_ID=0cdb6db9-f286-426d-a234-97a2f7e1fe22
```

---

# Ejecución local

## Ejecutar servidor desarrollo

```bash
npm run dev
```

Por defecto:

```txt
http://localhost:5174
```

---

# Configurar puerto

Editar:

```txt
vite.config.js
```

Ejemplo:

```javascript
server: {
  host: '0.0.0.0',
  port: 5174,
  https: true
}
```

---

# Build producción

Generar build:

```bash
npm run build
```

Se genera:

```txt
dist/
```

---

# Probar build local

```bash
npm install -g serve
serve dist
```

---

# Estructura principal

```txt
src/
 ├── App.jsx
 ├── main.jsx
 ├── index.css

public/
```

---

# Despliegue en Azure Static Web Apps

## Recomendado para frontend React

Servicio:

- Azure Static Web Apps

Ventajas:

- HTTPS automático
- CDN global
- Integración GitHub
- CI/CD automático
- Bajo costo
- Excelente performance

---

# Pasos

## 1. Subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <REPO_URL>
git push -u origin main
```

---

## 2. Crear Static Web App

Entrar a:

- Azure Portal
- Crear recurso
- Buscar:

```txt
Static Web Apps
```

---

## 3. Configuración

### Source

```txt
GitHub
```

### Repository

Seleccionar repositorio.

### Build preset

```txt
React
```

### App location

```txt
/
```

### Output location

```txt
dist
```

---

# Variables de entorno en Azure

Ir a:

```txt
Static Web App
→ Environment Variables
```

Agregar:

```txt
VITE_WIDGET_URL
VITE_TENANT_ID
```

---

# Deploy automático

Cada push a `main` ejecutará:

- build
- deploy
- publicación

automáticamente.

---

# Despliegue en Azure Storage Account Static Website

## Alternativa económica

También puedes publicar como sitio estático usando:

- Azure Storage Account
- Static Website Hosting

---

# Crear Storage Account

En Azure:

```txt
Storage Account
```

Luego:

```txt
Data Management
→ Static Website
→ Enable
```

---

# Configuración

## Index document

```txt
index.html
```

## Error document

```txt
index.html
```

---

# Subir archivos

Generar build:

```bash
npm run build
```

Subir contenido de:

```txt
dist/
```

al container:

```txt
$web
```

---

# Usando Azure CLI

Login:

```bash
az login
```

Upload:

```bash
az storage blob upload-batch \
  --account-name <STORAGE_ACCOUNT> \
  --destination '$web' \
  --source dist
```

---

# URL final

Azure genera algo como:

```txt
https://<storage>.z13.web.core.windows.net
```

---

# Diferencias recomendadas

| Opción | Recomendación |
|---|---|
| Azure Static Web Apps | Mejor opción |
| Storage Account Static Website | Más económico |

---

# Recomendación final

Para Aura Boutique:

## Frontend

- Azure Static Web Apps

## Widget/API

- Azure App Service
- Azure Container Apps
- Azure Functions

---

# Arquitectura recomendada

```txt
Frontend:
https://auraboutique.com

Widget/API:
https://api.auraboutique.com/widget.js
```

---

# Notas importantes

## Variables frontend

Las variables:

```txt
VITE_*
```

son públicas en el navegador.

No almacenar:

- passwords
- secrets
- tokens privados

---

# Comandos útiles

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview producción

```bash
npm run preview
```
