# SMT — Notificaciones Push nativas (plan por fases)

**Meta:** que al celular le lleguen notificaciones (suene/vibre) aunque la app esté
cerrada — cuando te retan, te comentan, te aprueban algo, etc. — y un aviso los lunes
del partido que te toca esa semana.

**Importante:** el push solo se prueba en un **iPhone real** (no en simulador). Y hay
pasos que solo tú puedes hacer en las consolas con tu cuenta. Por eso vamos por fases.

---

## FASE A — Tú, en las consolas (no rompe nada de la app)

### A1. Habilitar Push en tu App ID (Apple)
1. developer.apple.com → **Certificates, Identifiers & Profiles** → **Identifiers**.
2. Abre **mx.smt.tennis** → marca la casilla **Push Notifications** → **Save**.

### A2. Crear la llave de Apple para enviar push (APNs Key)
1. Mismo sitio → **Keys** → botón **+** (crear llave).
2. Nombre: "SMT Push". Marca **Apple Push Notifications service (APNs)** → Continue → Register.
3. **Descarga el archivo `.p8`** (¡solo se puede descargar una vez, guárdalo bien!).
4. Anota: el **Key ID** (10 caracteres) y tu **Team ID** (lo ves arriba a la derecha en la cuenta).

### A3. Crear proyecto en Firebase (gratis) — es el que envía los push
1. console.firebase.google.com → **Crear proyecto** (nombre: SMT). Sin Analytics está bien.
2. Dentro del proyecto → **Agregar app** → ícono de **iOS**.
3. Bundle ID: **mx.smt.tennis** → registra → **descarga `GoogleService-Info.plist`**.
4. En Firebase → ⚙️ **Configuración del proyecto** → pestaña **Cloud Messaging** →
   sección **Apple app configuration** → sube tu **APNs Auth Key** (.p8 del paso A2),
   con el **Key ID** y **Team ID**.

### A4. Pásame (de forma segura) cuando termines:
- El archivo **`GoogleService-Info.plist`** (ponlo en la carpeta `Desktop\SMT`).
- Confirmación de que el APNs Key quedó subido a Firebase.

> Estos pasos NO afectan la app que ya está publicada. Puedes hacerlos con calma.

---

## FASE B — Yo, en el código (cuando termines la Fase A)

5. Corro `SMT_device_tokens.sql` en Supabase (o lo corres tú) para la tabla de tokens.
6. Instalo el plugin `@capacitor/push-notifications`, agrego tu `GoogleService-Info.plist`
   al proyecto iOS y activo la capacidad **Push Notifications** en Xcode.
7. Código en la app: al entrar, pide permiso de notificaciones, registra el dispositivo
   y guarda su token en `device_tokens`.
8. Creo una **Edge Function en Supabase** ("send-push") que, cuando se cree una
   notificación, busca los tokens del usuario y manda el push por Firebase.
9. Conecto un **trigger** en la tabla `notifications` para que cada notificación dispare
   el push automáticamente. (Las 11 notificaciones in-app que ya hicimos empezarán a
   llegar también al celular.)

---

## FASE C — Aviso de los lunes (partido de la semana)

10. Agregar **fechas/semana a los partidos** del torneo (hoy son autogestionados, sin
    fecha). Esto es una mini-función del torneo (un calendario por semana).
11. Un **cron de los lunes** en Supabase (pg_cron) que revise quién juega esa semana
    (torneo o reta agendada) y le mande la notificación → que dispara el push.

---

## Resumen
- **Fase A (tú):** habilitar push en Apple + crear APNs Key + proyecto Firebase. ~30–40 min.
- **Fase B (yo):** plugin + código + Edge Function + trigger. Probamos en tu iPhone.
- **Fase C:** calendario de partidos + cron de los lunes.

Empieza por la **Fase A** y avísame cuando tengas el `GoogleService-Info.plist`. En cuanto
lo tenga, sigo con la Fase B. 🎾
