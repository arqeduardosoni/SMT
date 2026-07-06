# SMT Premium — Cobro por Apple (IAP) con RevenueCat

Objetivo: cobrar la suscripción SMT Premium ($79/mes, $799/año, con prueba gratis de 7 días)
y activar automáticamente `premium=true` en el perfil del usuario.

---

## REQUISITO PREVIO
En App Store Connect → **Business** → **Agreements**: el **"Paid Applications"** debe estar **Active**
(con datos bancarios y fiscales completos). Sin esto NO se pueden crear ni vender suscripciones.
(Ya hiciste el Small Business Program; solo verifica que el acuerdo de apps de paga esté activo.)

---

## FASE 1 — Crear las suscripciones en App Store Connect

1. App Store Connect → app **SMT - Tennis** → menú izquierdo (MONETIZATION) → **Subscriptions**.
2. **Create** un **Subscription Group**:
   - Reference Name: `SMT Premium`
3. Dentro del grupo, **Create** la suscripción MENSUAL:
   - Reference Name: `SMT Premium Mensual`
   - Product ID (EXACTO): `mx.smt.tennis.premium.monthly`
   - Duration: **1 Month**
   - Subscription Price: elige el precio para México ≈ **$79 MXN**
   - App Store Localization (Spanish MX):
     - Display Name: `SMT Premium (Mensual)`
     - Description: `Feedback de coach y físio, torneos privados, sin anuncios y elegible al premio anual.`
4. **Create** la suscripción ANUAL en el MISMO grupo:
   - Reference Name: `SMT Premium Anual`
   - Product ID (EXACTO): `mx.smt.tennis.premium.yearly`
   - Duration: **1 Year**
   - Price: ≈ **$799 MXN**
   - Display Name: `SMT Premium (Anual)`
5. **Prueba gratis 7 días** — en cada suscripción → **Introductory Offers** (o "View all Subscription Pricing" → Introductory Offer):
   - Type: **Free**
   - Duration: **1 Week**
   - Countries: All
6. **App Store Review Information** de cada suscripción: sube un screenshot (la pantalla Premium) + nota corta.
   Quedará "Ready to Submit" (se revisa junto con la próxima versión de la app).

---

## FASE 2 — Configurar RevenueCat (cuenta gratis)

1. Crea cuenta en https://app.revenuecat.com (gratis).
2. **Create Project** → nombre `SMT`.
3. **Add app** → plataforma **App Store** → Bundle ID: `mx.smt.tennis`.
4. Necesita el **App-Specific Shared Secret** de Apple:
   - App Store Connect → tu app → (o Users and Access → Integrations) → **In-App Purchase** → "App-Specific Shared Secret" → generar/copiar → pegar en RevenueCat.
5. **Products** en RevenueCat → Import/Add: agrega los 2 product IDs
   (`mx.smt.tennis.premium.monthly`, `mx.smt.tennis.premium.yearly`).
6. **Entitlements** → Create → identifier: `premium` → adjunta los 2 productos.
7. **Offerings** → Create → identifier: `default` → agrega 2 packages:
   - Monthly → producto mensual
   - Annual → producto anual
8. Copia la **API Key pública de Apple** (Project → API Keys → "Public app-specific API key" para App Store). Me la pasas para el código (empieza con `appl_...`). NO es secreta, va en la app.

---

## FASE 3 — Código (lo hago yo)
- Plugin `@revenuecat/purchases-capacitor`, integrado al proyecto iOS (SPM, para Xcode Cloud sin Mac).
- Inicializar con la API key, mostrar planes reales, comprar, restaurar compras.
- Al tener el entitlement `premium` activo → `profiles.premium=true` (y webhook de RevenueCat → Supabase para renovaciones/cancelaciones).
- Conectar la pantalla Premium existente a la compra real.
