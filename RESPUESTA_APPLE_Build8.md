# SMT — Cómo resolver el rechazo de Apple y publicar (Build 8)

Apple marcó **5 cosas**. Aquí están en orden, con lo que YA dejé hecho en el código y lo que falta que hagas tú (o tu amigo en la Mac). Nada es complicado.

---

## ✅ Lo que YA dejé resuelto en el código (no tienes que hacer nada)

**Guideline 5.1.1(v) — Login forzado.** La app ya NO obliga a registrarse para mirar.
Agregué el botón **"Explorar sin cuenta"** en la pantalla de inicio. El invitado puede ver
torneos, marketplace, rankings y servicios. Cuando intenta **vender, comprar, inscribirse,
postear o chatear**, aparece un mensaje amable para crear cuenta gratis. Esto es justo lo
que pide Apple.

> Para que el invitado vea contenido real, hay un paso de base de datos (punto 4 de abajo).

---

## 🔧 Lo que falta (4 pasos)

### 1) El CRASH de la cámara — Guideline 2.1 (LO MÁS IMPORTANTE)
El crash log dice textual: *"must contain an NSCameraUsageDescription key"*.
Pasa al tocar **"Take Photo"**: a iOS le falta el texto que explica por qué usas la cámara,
y por seguridad cierra la app.

**Quién:** tu amigo en la Mac (2 minutos). **Dónde:** archivo `ios/App/App/Info.plist`.

En Xcode: abre el proyecto iOS → en la barra izquierda abre `App/Info.plist` → clic derecho →
**Open As → Source Code**. Pega estas líneas justo después de la primera línea `<dict>`:

```xml
	<key>NSCameraUsageDescription</key>
	<string>SMT usa la cámara para que puedas tomar la foto de tu perfil, de tus productos en el marketplace y de tus publicaciones.</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>SMT accede a tus fotos para elegir tu foto de perfil, las fotos de tus productos y tus publicaciones.</string>
	<key>NSPhotoLibraryAddUsageDescription</key>
	<string>SMT guarda imágenes en tu carrete cuando lo solicitas.</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>SMT usa el micrófono al grabar videos para tus publicaciones.</string>
```

Guarda (Cmd+S). Con esto el crash desaparece.

### 2) El ícono placeholder — Guideline 2.3.8
Apple vio un ícono provisional. Te dejé el ícono final listo:
**`AppIcon-1024.png`** (1024×1024, sin transparencia, como exige Apple) en esta misma carpeta.

**Quién:** tu amigo en la Mac. **Cómo:** en Xcode, panel izquierdo →
`App/Assets.xcassets` → **AppIcon** → arrastra `AppIcon-1024.png` al recuadro de 1024 px
(o reemplaza el que esté). Si usa el "Single Size" icon, con ese 1024 basta.

### 3) Acceso de invitado en la base de datos (Supabase)
Para que el invitado vea torneos/marketplace/rankings sin cuenta.

**Quién:** tú. **Cómo:** Supabase → tu proyecto → **SQL Editor** → New query →
pega TODO el archivo **`SMT_Acceso_Invitado.sql`** (en esta carpeta) → botón **RUN**.
Debe decir *"Success"*. Es seguro correrlo varias veces.

### 4) Age Rating — Guideline 2.3.6 (×2)
Esto se arregla SOLO en App Store Connect, sin nueva build. **Quién:** tú.

App Store Connect → tu app **SMT** → **App Information** → sección **Age Rating** → **Edit**.
En el cuestionario pon **"Yes" (Sí)** en:
- **User-Generated Content** (contenido que suben los usuarios: posts, marketplace)
- **Messaging and Chat** (la app tiene chat/grupos)

Guarda. Eso resuelve los dos avisos 2.3.6.

---

## 🚀 Generar el Build 8 y reenviar (tu amigo en la Mac)

1. En la carpeta del proyecto: `git pull` (para traer mis cambios) y `npm install`.
2. `npm run build`
3. `npx cap sync ios`
4. `npx cap open ios`
5. En Xcode: agrega el Info.plist del paso 1 y el ícono del paso 2.
6. **Sube el número de Build a `8`** (campo Build, en la pestaña General del target App).
7. **Product → Archive** → **Distribute App → Upload**.
8. En App Store Connect: selecciona el Build 8, confirma el Age Rating (paso 4) y
   **reenvía a revisión**. En las notas para el revisor puedes escribir:
   *"Fixed: camera usage description added (crash on Take Photo), finalized app icon,
   guest browsing enabled (no login required to browse), age rating updated."*

---

## Resumen rápido
| # | Problema (Apple) | Quién | Estado |
|---|---|---|---|
| 5.1.1 | Login forzado | (código) | ✅ Hecho + correr SQL (paso 3) |
| 2.1 | Crash cámara | Amigo/Mac | Pegar Info.plist (paso 1) |
| 2.3.8 | Ícono placeholder | Amigo/Mac | Usar AppIcon-1024.png (paso 2) |
| 2.3.6 | User-Generated Content | Tú | Age Rating → Yes (paso 4) |
| 2.3.6 | Messaging and Chat | Tú | Age Rating → Yes (paso 4) |
