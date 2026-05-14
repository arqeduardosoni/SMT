# 🚀 Guía completa para publicar SMT en App Store y Google Play

Esta guía te lleva desde cero hasta tener tu app publicada. Sigue cada paso en orden.

---

## ÍNDICE

1. [Crear tu repositorio en GitHub](#1-crear-tu-repositorio-en-github)
2. [Subir el código a GitHub](#2-subir-el-código-a-github)
3. [Probar la app web online (Vercel)](#3-probar-la-app-web-online-vercel)
4. [Crear cuentas de desarrollador](#4-crear-cuentas-de-desarrollador)
5. [Preparar el código para móvil con Capacitor](#5-preparar-el-código-para-móvil-con-capacitor)
6. [Generar el build de iOS](#6-generar-el-build-de-ios)
7. [Generar el build de Android](#7-generar-el-build-de-android)
8. [Subir a Google Play](#8-subir-a-google-play)
9. [Subir a App Store](#9-subir-a-app-store)
10. [Material que necesitas tener listo](#10-material-que-necesitas-tener-listo)
11. [Costos totales](#11-costos-totales)

---

## 1) Crear tu repositorio en GitHub

GitHub es donde vive tu código. Es como Google Drive pero para programadores.

### Paso 1.1 — Crear cuenta
1. Entra a **https://github.com/signup**
2. Email: `smt.tennismx@gmail.com`
3. Usuario: `smt-tennis` (o lo que prefieras, será visible)
4. Contraseña: la que quieras (guárdala bien)

### Paso 1.2 — Crear repositorio
1. Una vez dentro, dale al botón verde **"New"** o ve a **https://github.com/new**
2. **Repository name:** `smt-tennis-app`
3. **Description:** "App de gestión de torneos de la Sociedad Mexicana de Tenis"
4. Selecciona **🔒 Private** (que nadie más vea tu código)
5. **NO marques** "Add a README file" (ya viene en el proyecto)
6. Click en **"Create repository"**

Verás una página con instrucciones. Cópialas, las usarás en el siguiente paso.

---

## 2) Subir el código a GitHub

### Paso 2.1 — Instalar herramientas en tu computadora

**En Mac:**
1. Abre la app **Terminal** (búscala con Cmd+Espacio)
2. Pega esto y dale Enter:
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Después instala Node.js y Git:
   ```
   brew install node git
   ```

**En Windows:**
1. Descarga e instala **Node.js**: https://nodejs.org (elige LTS)
2. Descarga e instala **Git**: https://git-scm.com/download/win
3. Abre **Símbolo del sistema** o **PowerShell** (búscalo en Inicio)

### Paso 2.2 — Configurar Git (solo la primera vez)

En la terminal:
```bash
git config --global user.name "Eduardo Soni"
git config --global user.email "smt.tennismx@gmail.com"
```

### Paso 2.3 — Descargar el código que te di

1. Descarga el archivo ZIP `smt-app.zip` que te entrego
2. Descomprímelo en tu Escritorio
3. Verás una carpeta `smt-app` con todo dentro

### Paso 2.4 — Subir el código

Abre la terminal y entra a la carpeta:
```bash
cd ~/Desktop/smt-app          # Mac
cd C:\Users\TuUsuario\Desktop\smt-app   # Windows
```

Después ejecuta uno por uno:
```bash
git init
git add .
git commit -m "Versión inicial de SMT"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/smt-tennis-app.git
git push -u origin main
```

> Reemplaza `TU-USUARIO` con tu nombre de usuario real de GitHub.

GitHub te pedirá usuario y contraseña. Para la contraseña usa un **Personal Access Token**:
1. Ve a https://github.com/settings/tokens/new
2. Marca "repo" → "Generate token"
3. Copia el token y úsalo como contraseña

✅ Verifica entrando a `https://github.com/TU-USUARIO/smt-tennis-app` — debe aparecer todo el código.

---

## 3) Probar la app web online (Vercel)

Antes de subirla a las tiendas, vamos a publicarla como web para que la pruebes en tu celular.

### Paso 3.1
1. Ve a **https://vercel.com/signup**
2. Click en **"Continue with GitHub"**
3. Autoriza acceso

### Paso 3.2 — Importar el repo
1. Click en **"Add New..." → "Project"**
2. Busca `smt-tennis-app` en la lista
3. Click en **"Import"**
4. Deja todo por defecto y click en **"Deploy"**
5. Espera ~1 minuto

🎉 ¡Listo! Verás una URL tipo `https://smt-tennis-app-xxx.vercel.app`

Compártela con jugadores del SMT para que prueben antes de subir a las tiendas.

---

## 4) Crear cuentas de desarrollador

### 4.1 — Apple Developer ($99 USD/año)

**Requisitos:**
- Apple ID
- Tarjeta de crédito internacional
- INE o pasaporte (para verificación de identidad)
- Número de teléfono

**Pasos:**
1. Ve a **https://developer.apple.com/programs/**
2. Click en **"Enroll"**
3. Inicia sesión con tu Apple ID (`smt.tennismx@gmail.com`)
4. Elige **"Individual"** o **"Organization"**:
   - **Individual** ($99/año) — Tu nombre aparece como dev
   - **Organization** ($99/año) — Aparece "Sociedad Mexicana de Tenis" (requiere D-U-N-S Number gratuito, tarda 1-2 semanas extra)
5. Llena tus datos
6. Paga con tarjeta
7. Espera 24-72 horas para que aprueben tu cuenta

> 💡 **Recomendación**: empieza como Individual para lanzar rápido; después puedes cambiar a Organization.

### 4.2 — Google Play Console ($25 USD una sola vez)

**Pasos:**
1. Ve a **https://play.google.com/console/signup**
2. Inicia sesión con `smt.tennismx@gmail.com`
3. Acepta términos
4. Paga los $25 USD (es de por vida, no anual)
5. Te piden verificar identidad subiendo INE/Pasaporte
6. Espera 1-2 días para aprobación

---

## 5) Preparar el código para móvil con Capacitor

Capacitor convierte tu app web en app nativa.

### Paso 5.1 — Instalar Capacitor

Desde la carpeta del proyecto en terminal:
```bash
cd ~/Desktop/smt-app
npm install
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
```

### Paso 5.2 — Construir la web app y sincronizar

```bash
npm run build
npx cap add ios       # Solo en Mac
npx cap add android   # Cualquier OS
npx cap sync
```

Esto crea las carpetas `ios/` y `android/` con proyectos nativos completos.

---

## 6) Generar el build de iOS

> ⚠️ **Necesitas una Mac.** Si no tienes, alquila una en **MacInCloud** (~$30 USD/mes) o pídele a un amigo.

### Paso 6.1 — Instalar Xcode
1. Abre App Store en tu Mac
2. Busca **Xcode** e instálalo (es gratis, pero pesa ~10 GB)
3. Acepta términos al abrirlo

### Paso 6.2 — Abrir el proyecto iOS
```bash
cd ~/Desktop/smt-app
npx cap open ios
```

Esto abre el proyecto en Xcode.

### Paso 6.3 — Configurar firma
1. En Xcode, selecciona **"App"** en la barra lateral izquierda
2. Pestaña **"Signing & Capabilities"**
3. **Team:** elige tu cuenta Apple Developer
4. **Bundle Identifier:** verifica que sea `mx.smt.tennis`

### Paso 6.4 — Configurar info de la app
1. Pestaña **"General"**
2. **Display Name:** `SMT`
3. **Version:** `1.0.0`
4. **Build:** `1`

### Paso 6.5 — Probar en simulador
1. Arriba selecciona un iPhone (ej. "iPhone 15 Pro")
2. Click en ▶️ play
3. Se abre el simulador y prueba tu app

### Paso 6.6 — Crear archivo para subir
1. Conecta un iPhone real por USB (recomendado) o selecciona "Any iOS Device"
2. Menu **Product → Archive**
3. Espera 5-10 minutos
4. Se abre Organizer con tu build
5. Click en **"Distribute App" → "App Store Connect" → "Upload"**

---

## 7) Generar el build de Android

### Paso 7.1 — Instalar Android Studio
1. Descarga: **https://developer.android.com/studio**
2. Instala (5-10 GB)
3. Abre y deja que descargue los SDKs

### Paso 7.2 — Abrir el proyecto
```bash
cd ~/Desktop/smt-app
npx cap open android
```

### Paso 7.3 — Generar keystore (firma de la app)

Esto es **CRÍTICO**: si pierdes este archivo, nunca podrás actualizar tu app. Guárdalo en 2-3 lugares (Google Drive, Dropbox, USB).

En terminal:
```bash
keytool -genkey -v -keystore smt-release.keystore -alias smt -keyalg RSA -keysize 2048 -validity 10000
```

Te pide:
- Contraseña del keystore (anótala)
- Nombre, organización, ciudad, país
- Contraseña del alias (puede ser la misma)

Mueve `smt-release.keystore` a la carpeta `android/app/`.

### Paso 7.4 — Configurar firma

Crea el archivo `android/key.properties`:
```
storePassword=TU_CONTRASEÑA
keyPassword=TU_CONTRASEÑA
keyAlias=smt
storeFile=smt-release.keystore
```

Edita `android/app/build.gradle` y agrega antes de `android {`:
```gradle
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Dentro de `android { ... }` agrega:
```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

### Paso 7.5 — Generar AAB para subir
1. En Android Studio: menú **Build → Generate Signed Bundle/APK**
2. Elige **Android App Bundle**
3. Usa el keystore que creaste
4. **release** → **Finish**
5. Se genera `android/app/release/app-release.aab` — este es el archivo que subes a Google Play

---

## 8) Subir a Google Play

### Paso 8.1 — Crear app
1. Entra a **https://play.google.com/console**
2. Click en **"Create app"**
3. **App name:** `SMT — Sociedad Mexicana de Tenis`
4. **Default language:** Spanish (Mexico)
5. **App or game:** App
6. **Free or paid:** Free
7. Acepta declaraciones → **Create app**

### Paso 8.2 — Llenar fichas
Tendrás un checklist enorme. Llena en orden:

1. **Privacy Policy** — Sube la URL de tu aviso de privacidad
   > Recomendación: hospeda el aviso en `https://smt-tennis-app.vercel.app/privacy` (creamos una página después)
2. **App access** — "All functionality available without special access"
3. **Ads** — No, no contiene ads
4. **Content rating** — Llena el cuestionario (es app de deportes, sin violencia)
5. **Target audience** — 13+ (porque permites menores con modo protegido)
6. **News app** — No
7. **COVID-19 contact tracing** — No
8. **Data safety** — Declara qué datos recolectas (lee tu Aviso de Privacidad y marca lo correspondiente)
9. **Government apps** — No
10. **Financial features** — No

### Paso 8.3 — Información de la tienda

- **App icon:** PNG 512×512 (te lo genero después)
- **Feature graphic:** PNG 1024×500 (banner principal)
- **Phone screenshots:** 4-8 screenshots tomados desde Android Studio
- **Short description:** 80 chars
  > "Torneos, ranking y comunidad de tenis en México 🎾"
- **Full description:** 4,000 chars (te doy plantilla abajo)
- **Categoría:** Sports
- **Email:** smt.tennismx@gmail.com
- **Website:** (la URL de Vercel)

### Paso 8.4 — Subir el AAB

1. Ve a **"Production" → "Create new release"**
2. Sube `app-release.aab`
3. **Release name:** `1.0.0 - Lanzamiento inicial`
4. **Release notes:**
   ```
   ¡Bienvenido a SMT! Primera versión oficial.
   - Torneos con brackets automáticos
   - Find a Match para encontrar rivales
   - Coach: encuentra entrenadores
   - Marketplace de equipo
   - Comunidad SMT
   ```
5. **Save** → **Review release** → **Start rollout to Production**

### Paso 8.5 — Esperar revisión
Google tarda **2-7 días** en aprobar. Te llega correo cuando esté lista.

---

## 9) Subir a App Store

### Paso 9.1 — Crear app en App Store Connect
1. Ve a **https://appstoreconnect.apple.com**
2. **My Apps → +** (botón azul) → **New App**
3. **Platform:** iOS
4. **Name:** `SMT — Sociedad Mexicana de Tenis`
5. **Primary Language:** Spanish (Mexico)
6. **Bundle ID:** `mx.smt.tennis`
7. **SKU:** `SMT001`
8. **User Access:** Full Access
9. **Create**

### Paso 9.2 — Llenar fichas

**App Information:**
- Subtitle: "Torneos · Coach · Marketplace"
- Privacy Policy URL: la misma URL de tu privacy page
- Category Primary: Sports
- Category Secondary: Social Networking

**Pricing:** Free

**App Privacy:**
Tienes que declarar exactamente qué recolectas. Sé honesto, Apple lo audita:
- Contact Info: Name, Email, Phone
- Identifiers: User ID
- Usage Data: Product Interaction
- User Content: Photos (de perfil y marketplace), Customer Support

**App Review Information:**
- Sign-in info para que Apple pruebe:
  - User: `carlos@smt.mx`
  - Pass: `demo123`
- Contact email: `smt.tennismx@gmail.com`
- Notes: "Demo accounts work with password 'demo123'. Admin: 'admin123'."

### Paso 9.3 — Versión 1.0

**Description** (texto que ven los usuarios):
```
SMT es la plataforma oficial de la Sociedad Mexicana de Tenis 🎾

Organiza y participa en torneos, encuentra rivales de tu nivel, contrata coaches certificados, compra equipo deportivo y conecta con la comunidad de tenis más grande de México.

CARACTERÍSTICAS:
🏆 TORNEOS — Inscríbete a torneos por categoría (Abierta, B, C, D, Di). Brackets automáticos, rankings y premios.

⚡ FIND A MATCH — Encuentra rivales de tu mismo nivel cerca de ti. Filtros por club, horario y categoría.

🎓 COACH — Marketplace de entrenadores certificados. Ve perfiles, especialidades, tarifas y reseñas.

🛒 MARKETPLACE — Compra y vende raquetas, ropa, tenis y equipo de tenis con jugadores verificados.

🎬 MEDIA — Galería de la comunidad SMT. Comparte tus mejores momentos.

🛡️ MODO MENOR — Protección automática para usuarios menores de 18 años.

📊 RANKINGS — Top 100 por categoría y género.

Únete a la comunidad de tenis más activa de México.
```

**Keywords** (100 caracteres):
```
tenis,torneo,ranking,coach,raqueta,monterrey,cdmx,deportivo,smt,liga
```

**Screenshots:**
- 6.7" Display (iPhone 15 Pro Max): 6 screenshots — 1290×2796 px
- 6.5" Display (iPhone 14 Plus): 6 screenshots — 1242×2688 px

> 💡 Toma los screenshots desde el simulador de Xcode: Cmd+S los guarda

**Support URL:** `https://smt-tennis-app.vercel.app/support`

### Paso 9.4 — Asociar el build subido desde Xcode
1. En la sección **"Build"** click +
2. Selecciona el build que subiste con Xcode (puede tardar 5-30 min en aparecer)

### Paso 9.5 — Submit for Review
Click en **"Submit for Review"**. Apple tarda **24-72 horas** normalmente.

Si te rechazan, te dicen exactamente qué cambiar. Lo más común:
- Faltan funciones declaradas
- Política de privacidad incompleta
- Demo account no funciona

---

## 10) Material que necesitas tener listo

### 📸 Screenshots (6 mínimo por plataforma)

Recomiendo estas pantallas para mostrar:
1. Welcome screen con logo gigante
2. Home con tarjetas de torneos
3. Detalle de un torneo con bracket
4. Find a Match con filtros
5. Marketplace con productos
6. Player Card con stats

### 🎨 Icon de la app

Necesitas un PNG **1024×1024** sin transparencia. Te recomiendo:
- Fondo azul oscuro `#040A18`
- Logo SMT centrado en blanco con cuernos cyan
- Genera todos los tamaños con: **https://www.appicon.co**

### 📄 Política de Privacidad pública

Tienes que tener una URL pública con tu aviso de privacidad. Opciones:

**Opción A (gratis):** Crea un archivo `privacy.html` en la carpeta `public/` con el texto. Después accesible en `https://smt-tennis-app.vercel.app/privacy.html`

**Opción B (más profesional):** Genera con **https://iubenda.com** (~$30 USD/año)

### 📧 Email de soporte

Asegúrate de que `smt.tennismx@gmail.com` esté activa y revisada — los usuarios escribirán ahí.

---

## 11) Costos totales

| Concepto | Costo | Frecuencia |
|----------|-------|------------|
| Apple Developer | $99 USD | Anual |
| Google Play | $25 USD | Una vez |
| Dominio (opcional) | $12 USD | Anual |
| Vercel hosting | Gratis | — |
| GitHub | Gratis | — |
| **Total año 1** | **~$136 USD** | |
| **Total año 2+** | **~$111 USD** | |

---

## 🎯 Tu hoja de ruta inmediata (qué hacer ESTA semana)

- [ ] **Día 1:** Crear cuenta GitHub + subir código (pasos 1-2)
- [ ] **Día 1:** Publicar en Vercel para probar online (paso 3)
- [ ] **Día 2:** Crear cuenta Apple Developer (paso 4.1) — tarda 1-3 días en aprobarse
- [ ] **Día 2:** Crear cuenta Google Play (paso 4.2) — tarda 1-2 días
- [ ] **Día 3-7:** Mientras esperas aprobaciones, prepara material:
  - [ ] Tomar screenshots
  - [ ] Generar icon 1024×1024
  - [ ] Escribir descripción final
  - [ ] Subir aviso de privacidad a Vercel
- [ ] **Semana 2:** Configurar Capacitor + builds de iOS y Android (pasos 5-7)
- [ ] **Semana 2-3:** Subir a tiendas (pasos 8-9)
- [ ] **Semana 3-4:** Esperar revisión y lanzar 🚀

---

## ❓ Preguntas frecuentes

**¿Y si no tengo Mac?**
Renta una virtual en **https://www.macincloud.com** (~$30 USD/mes). Solo la necesitas un par de meses.

**¿Puedo actualizar la app después?**
Sí. Solo cambias la versión en `capacitor.config.json` y `android/app/build.gradle`, vuelves a generar el build y lo subes. Reaprobación es más rápida (24h).

**¿Mis datos están seguros con esta versión?**
La versión actual guarda todo en memoria local. Para producción seria, **DEBES migrarla a Supabase o Firebase** (base de datos en la nube) antes de tener usuarios reales. Te ayudo cuando llegues a ese paso.

**¿Qué hago si Apple me rechaza?**
Lee bien el motivo en App Store Connect. Lo más común son detalles legales. Tienes infinitos intentos gratis.

**¿Cómo cobro pagos de inscripciones a torneos?**
Integra **Stripe** o **MercadoPago** después del lanzamiento inicial. Te ayudo cuando llegues.

---

## 📞 Soporte técnico

Cuando te trabes en cualquier paso, regresa a Claude y dile exactamente:
- En qué paso te quedaste (ej. "Paso 6.5")
- Qué error te aparece
- Captura de pantalla si puedes

¡Vamos a lanzar SMT al mundo! 🎾🚀
