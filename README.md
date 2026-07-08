# 🎾 SMT — Sociedad Mexicana de Tenis

App de gestión de torneos, comunidad y marketplace para la **Sociedad Mexicana de Tenis** en Monterrey, México.

![Logo SMT](public/logo.svg)

---

## 📲 ¿Qué hace esta app?

- 🏆 **Torneos** — Crear, inscribirse, brackets, rankings por categoría
- ⚡ **Find a Match** — Encontrar rivales de tu nivel cerca de ti
- 🎓 **Coach** — Marketplace de entrenadores certificados
- 🛒 **Marketplace** — Compra-venta de equipo deportivo
- 🎬 **Media** — Galería de la comunidad + link a Instagram oficial
- 📊 **Rankings** — Top 100 por categoría y género
- 🛡️ **Protección de menores** — Modo seguro automático bajo 18 años
- 🔐 **Aviso de Privacidad** — Cumple con LFPDPPP (México)

---

## 🚀 Instalación local (para desarrollo)

### Prerequisitos
- **Node.js 18+** ([descargar](https://nodejs.org))
- **Git** ([descargar](https://git-scm.com))
- Una cuenta de **GitHub** ([crear](https://github.com/signup))

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/smt-tennis-app.git
cd smt-tennis-app

# 2. Instalar dependencias
npm install

# 3. Arrancar en modo desarrollo
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

### Credenciales demo

| Tipo | Email | Contraseña |
|------|-------|------------|
| Jugadores | `carlos@smt.mx`, `sofia@smt.mx`, etc | `demo123` |
| Admin | (cualquier email) | `admin123` |

---

## 📦 Generar versión de producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con la app lista para subir a cualquier hosting (Vercel, Netlify, Cloudflare Pages, etc.).

---

## 📱 Convertir a app móvil (iOS y Android)

### 1. Instalar Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
```

### 2. Inicializar plataformas

```bash
npm run build
npx cap add ios
npx cap add android
npx cap sync
```

### 3. Abrir en Xcode (iOS) o Android Studio

```bash
npx cap open ios       # Mac con Xcode instalado
npx cap open android   # Cualquier OS con Android Studio
```

---

## 🌐 Publicar la app web (rápido)

### Opción A — Vercel (recomendado para empezar)

1. Crea cuenta gratis en [vercel.com](https://vercel.com)
2. Conecta tu repo de GitHub
3. Click en "Deploy" — ¡listo! Tendrás una URL pública en 30 segundos

### Opción B — Netlify

1. [netlify.com](https://netlify.com), conecta GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`

### Opción C — Cloudflare Pages

1. [pages.cloudflare.com](https://pages.cloudflare.com), conecta GitHub
2. Build command: `npm run build`
3. Build output: `dist`

---

## 🏪 Publicar en App Store y Google Play

Ver `DEPLOY_GUIDE.md` en este repositorio para la guía completa paso a paso.

---

## 🔧 Tecnologías

- **React 18** — UI framework
- **Vite** — Build tool moderno y rápido
- **Capacitor** — Convertir web app a iOS/Android nativo

---

## 📞 Contacto

**Eduardo Soni** — Fundador SMT
📧 smt.tennismx@gmail.com
📸 [@tennis.smt](https://www.instagram.com/tennis.smt/)

---

## ⚖️ Licencia

Software propietario. Ver `LICENSE`. Todos los derechos reservados © 2026.
