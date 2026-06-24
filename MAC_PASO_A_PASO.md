# SMT — Paso a paso en la Mac (formateada) para subir el Build 8

> La Mac está recién formateada y el proyecto iOS **no se guarda en GitHub**, así que se
> genera desde cero. Sigue esto en orden. Tiempo aprox: 1.5–2 h (la mayoría es descargar Xcode).
> Las claves de Supabase van **dentro del código** (no en `.env`), así que el clon nuevo
> ya conecta solo. No necesitas copiar `.env`.

---

## ANTES: en Windows (tú) — subir el código
En tu terminal, dentro de `C:\Users\Eduardo\Desktop\SMT`:
```bash
rm -f .git/index.lock        # (PowerShell:  del .git\index.lock )
git add src/App.jsx package.json AppIcon-1024.png SMT_Acceso_Invitado.sql RESPUESTA_APPLE_Build8.md MAC_PASO_A_PASO.md
git commit -m "Build 8: modo invitado (5.1.1), icono final (2.3.8), @capacitor/ios, SQL anon y guias"
git push origin main
```
Y en **Supabase → SQL Editor**: pega y corre `SMT_Acceso_Invitado.sql` (paso de invitado).

---

## EN LA MAC

### 1) Instalar Xcode (lo más tardado)
- Abre **App Store** → busca **Xcode** → Instalar (son varios GB).
- Cuando termine, **abre Xcode una vez**, acepta la licencia y deja que instale componentes.
- Abre la app **Terminal** (Launchpad → "Terminal") y corre:
  ```bash
  xcode-select --install
  ```
  Si dice que ya están instalados, perfecto.

### 2) Instalar Node.js
- Ve a https://nodejs.org y descarga la versión **LTS** (.pkg) → instálala con doble clic.
- Verifica en Terminal:
  ```bash
  node -v
  npm -v
  ```

### 3) Instalar CocoaPods (lo necesita iOS de Capacitor)
En Terminal:
```bash
sudo gem install cocoapods
```
Si da error de permisos/versión, instala primero Homebrew y luego CocoaPods:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install cocoapods
```

### 4) Bajar el proyecto
```bash
cd ~/Desktop
git clone https://github.com/arqeduardosoni/SMT.git
cd SMT
npm install
npm run build
```
(`npm run build` debe terminar con "✓ built". Eso crea la carpeta `dist`.)

### 5) Generar el proyecto iOS
```bash
npx cap add ios
npx cap sync ios
npx cap open ios
```
Esto abre **Xcode** con el proyecto.

### 6) Configurar firma (Signing)
En Xcode: barra izquierda, clic en **App** (el ícono azul de arriba) → pestaña
**Signing & Capabilities**:
- Marca **Automatically manage signing**.
- En **Team**: inicia sesión con tu **Apple ID** (el de la cuenta de desarrollador) y selecciónalo.
- **Bundle Identifier** debe decir exactamente: **`mx.smt.tennis`** (si no, escríbelo así).

### 7) Subir el número de Build (¡obligatorio!)
En la pestaña **General** del target **App**:
- **Version**: déjala igual a la que tienes en App Store Connect.
- **Build**: ponlo en **`8`** (tiene que ser mayor que 7, que fue el rechazado).

### 8) ⭐ EL ARREGLO DEL CRASH — permisos en Info.plist (LO MÁS IMPORTANTE)
En la barra izquierda abre `App` → `App` → **`Info.plist`** → clic derecho →
**Open As → Source Code**. Justo después de la primera línea `<dict>`, pega:
```xml
	<key>NSCameraUsageDescription</key>
	<string>SMT usa la cámara para tomar la foto de tu perfil, de tus productos y de tus publicaciones.</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>SMT accede a tus fotos para elegir tu foto de perfil, las fotos de tus productos y tus publicaciones.</string>
	<key>NSPhotoLibraryAddUsageDescription</key>
	<string>SMT guarda imágenes en tu carrete cuando lo solicitas.</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>SMT usa el micrófono al grabar videos para tus publicaciones.</string>
```
Guarda con **Cmd+S**. (Si te saltas esto, el crash vuelve y Apple rechaza de nuevo.)

### 9) El ícono final
En la barra izquierda: `App` → `App` → **`Assets.xcassets`** → **AppIcon**.
Arrastra **`AppIcon-1024.png`** (está en la raíz del proyecto, vino con el clon) al recuadro
de **1024 px**. Si Xcode usa "Single Size", con ese 1024 basta.

### 10) ⭐ PROBAR ANTES DE SUBIR (clave para no volver a fallar)
Arriba, en el selector de dispositivo, elige un **iPad simulador** (p.ej. iPad Air) → botón
**▶ Run**. Cuando abra la app, prueba:
1. Toca **"Explorar sin cuenta"** → debe entrar y dejarte ver Torneos/Market/Find.
2. Crea/entra a una cuenta → ve a **Perfil → foto → "Take Photo"** → **NO debe cerrarse**
   (ahora pide permiso de cámara). Si no truena, el arreglo funcionó.
3. Cierra el simulador.

### 11) Archivar y subir
- En el selector de dispositivo elige **"Any iOS Device (arm64)"**.
- Menú **Product → Archive**.
- Cuando abra el **Organizer**: **Distribute App → App Store Connect → Upload** → siguiente
  hasta terminar.

### 12) En App Store Connect (tú, desde web)
- **App Information → Age Rating → Edit**: pon **"Yes"** en *User-Generated Content* y en
  *Messaging and Chat*. Guarda.
- En la versión que vas a reenviar, selecciona el **Build 8** (tarda ~15–30 min en aparecer
  tras subirlo).
- En **App Review Information**, confirma la cuenta demo: **demo@smt.mx / Demo2026**
  (verifícala antes en modo incógnito).
- En notas para el revisor:
  *"Fixed: NSCameraUsageDescription added (crash on Take Photo), finalized app icon,
  guest browsing enabled (no login required to browse marketplace/services), age rating updated."*
- Botón **Add for Review / Submit**.

---

## Checklist final
- [ ] Windows: push hecho + SQL corrido en Supabase
- [ ] Mac: Xcode, Node, CocoaPods instalados
- [ ] clone + npm install + npm run build OK
- [ ] cap add ios / sync / open
- [ ] Signing con tu Apple ID + Bundle ID `mx.smt.tennis`
- [ ] Build = 8
- [ ] Info.plist con los 4 permisos (cámara)
- [ ] Ícono 1024 puesto
- [ ] Probado en simulador (invitado + Take Photo sin crash)
- [ ] Archive → Upload
- [ ] Age Rating Yes/Yes + Build 8 seleccionado + cuenta demo + Submit
