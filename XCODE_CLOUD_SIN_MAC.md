# SMT — Publicar SIN MAC con Xcode Cloud

Dejé el **proyecto iOS completo dentro del repositorio**, listo para que Xcode Cloud lo
compile y suba solo. Ya incluye: permiso de cámara (arregla el crash), ícono final,
**Build 8**, el scheme compartido y los archivos web. No necesitas la Mac.

> Importante y honesto: desde mi entorno **no puedo compilar iOS** (no hay Mac), así que
> el build real lo verifica Xcode Cloud al correr. Tranquilo: **Xcode Cloud NO envía la app
> a revisión de Apple solo** — solo sube el build a App Store Connect. Tú decides cuándo
> mandarlo a revisión. Si algo falla, vemos el log y lo corrijo.

---

## PASO 1 — Subir el proyecto iOS a GitHub (en Windows, CMD)
```cmd
cd C:\Users\Eduardo\Desktop\SMT
del .git\index.lock
git add -A
git commit -m "Proyecto iOS para Xcode Cloud: permisos camara, icono, build 8, scheme, ci script"
git push origin main
```
(Si `del` dice que no existe, ignóralo. Si pide login en el push, usa tu token de GitHub.)

## PASO 2 — Configurar el workflow de Xcode Cloud (en la web, sin Mac)
En App Store Connect (donde te llegó el correo):
1. Abre tu app **SMT - Tennis** → pestaña **Xcode Cloud** → **Manage Workflows**.
2. Edita el workflow que falló (el "Default") o crea uno nuevo:
   - **Repository / Branch:** tu repo, rama `main`.
   - **Project or Workspace:** selecciona **`ios/App/App.xcodeproj`** (ahora ya existe en el repo).
   - **Scheme:** **App**  (marca "Build" e "iOS").
   - **Start Conditions:** "Branch Changes" en `main` (deja como está).
   - **Actions:** deja **Archive - iOS** (Distribution).
   - **Post-Actions:** agrega **TestFlight (Internal Testing)** o **App Store Connect** para que
     **suba el build automáticamente** al terminar.
3. Guarda y pulsa **Start Build** (o haz cualquier push y arrancará solo).

## PASO 3 — Esperar el build (~15–30 min)
- Si sale **verde**, el Build 8 aparece en App Store Connect → **TestFlight / Builds**.
- Si sale **rojo**, entra a **Logs**, cópiame el error y lo arreglo (no se envía nada a Apple).

## PASO 4 — Enviar a revisión (web, sin Mac)
En App Store Connect → tu app → la versión a revisar:
1. **App Information → Age Rating → Edit:** "Yes" en *User-Generated Content* y *Messaging and Chat*.
2. Selecciona el **Build 8**.
3. **App Review Information:** cuenta demo **demo@smt.mx / Demo2026**.
4. Notas para el revisor:
   *"Fixed: NSCameraUsageDescription added (crash on Take Photo), finalized app icon,
   guest browsing enabled (no login required to browse), age rating updated."*
5. **Add for Review / Submit**.

---

## ¿Qué dejé hecho en el repo?
- `ios/` (proyecto Xcode completo, ya no está en .gitignore).
- Permiso de cámara + fotos + micrófono en `ios/App/App/Info.plist`.
- Ícono final 1024 en el Asset Catalog.
- **Build number = 8** (mayor que el 7 rechazado).
- Scheme compartido **App** (para que Xcode Cloud lo encuentre).
- Web app ya compilada dentro de `ios/App/App/public`.
- `ci_scripts/ci_post_clone.sh`: en cada push reconstruye la web desde el código
  automáticamente (y si fallara, usa los archivos ya incluidos — nunca rompe el build).
- `@capacitor/ios` agregado a `package.json` + `package-lock.json`.

A partir de ahora, **cada push a `main` dispara un build y subida automática** — sin Mac.
