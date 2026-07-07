# SMT — Fase B2: activar el ENVÍO de notificaciones push (Supabase)

Esto hace que cuando se cree una notificación, el celular del usuario reciba el push.
Todo se hace en el dashboard de Supabase. Necesitas tu **nuevo `.p8`** y tu **nuevo Key ID**.

---

## 1) Desplegar la función

1. Supabase → tu proyecto → menú **Edge Functions** → **Deploy a new function** (o "Create function").
2. Nombre: **`send-push`**
3. Abre el archivo `supabase/functions/send-push/index.ts` (en `Desktop\SMT`) con el Bloc de notas,
   **copia TODO** y pégalo en el editor de la función.
4. **IMPORTANTE:** desactiva **"Verify JWT"** (o "Enforce JWT verification") para esta función,
   para que el webhook pueda llamarla. (Es un switch en la configuración de la función.)
5. **Deploy**.

## 2) Poner los secretos (las llaves)

Supabase → **Edge Functions** → pestaña **Secrets** (o Project Settings → Edge Functions → Secrets).
Agrega estos 4:

| Nombre | Valor |
|---|---|
| `APNS_KEY` | Abre tu **nuevo `.p8`** (de Documentos) con el Bloc de notas y pega TODO su contenido, **incluyendo** las líneas `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----` |
| `APNS_KEY_ID` | Tu **nuevo Key ID** (10 caracteres) |
| `APNS_TEAM_ID` | `44ANY59F8L` |
| `APNS_BUNDLE_ID` | `mx.smt.tennis` |

(No necesitas poner SUPABASE_URL ni la service key — Supabase las inyecta solas.)

## 3) Crear el webhook (el disparador)

Supabase → **Database** → **Webhooks** → **Create a new hook**:
- **Name:** send-push-hook
- **Table:** `notifications`
- **Events:** marca **Insert**
- **Type:** "Supabase Edge Functions" → elige **send-push**
  (o "HTTP Request" → POST a `https://TU-PROYECTO.supabase.co/functions/v1/send-push`)
- **Create**.

---

## Cómo se prueba
El push **solo funciona en un iPhone real** con la app instalada desde TestFlight/App Store,
y **cuando Apple apruebe la versión 1.2** (para que el celular registre su token).

Una vez aprobada e instalada:
1. Inicia sesión en la app en tu iPhone (acepta el permiso de notificaciones) → se guarda tu token.
2. Que alguien te comente un post, te rete, o mándate una notificación de prueba.
3. Tu celular debe sonar/vibrar. 🎾

Si algo no llega, en Supabase → Edge Functions → send-push → **Logs** se ve el resultado del envío.
