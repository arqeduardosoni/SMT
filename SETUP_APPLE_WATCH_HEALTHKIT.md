# SMT — Conectar Apple Watch / Salud (HealthKit)

La app ya lee datos de actividad del Apple Watch (vía la app **Salud** del iPhone):
calorías activas, pasos, distancia, minutos de ejercicio, frecuencia cardiaca, peso y altura.
Se usa como punto de partida para personalizar el plan de entrenamiento.

## Qué ya quedó hecho en el código
- Plugin nativo `SMTHealth` (Swift/HealthKit) en `ios/App/CapacitorPlugins/health/`.
- Registrado en `CapApp-SPM/Package.swift`.
- Entitlement `com.apple.developer.healthkit` en `App.entitlements`.
- Textos de permiso `NSHealthShareUsageDescription` / `NSHealthUpdateUsageDescription` en `Info.plist`.
- Botón "Conecta tu Apple Watch" + tarjeta con tus datos reales en la pantalla **Entrenamiento**.

## PASOS MANUALES QUE DEBES HACER TÚ (obligatorios)

### 1. Habilitar HealthKit en el App ID (portal de Apple Developer)
1. Entra a https://developer.apple.com/account → **Certificates, Identifiers & Profiles** → **Identifiers**.
2. Abre el identificador **mx.smt.tennis**.
3. En **Capabilities**, marca la casilla de **HealthKit**. Guarda.
   (Si no haces esto, la firma del build fallará por "entitlement no permitido").

### 2. Política de privacidad con datos de salud
Apple revisa las apps con HealthKit. Necesitas que tu política de privacidad mencione que:
- La app **lee** datos de salud/actividad solo con permiso del usuario.
- **No** se usan para publicidad ni se venden a terceros.
Agrega un párrafo así en tu política de privacidad (la que ya tienes ligada en App Store Connect).

### 3. Al probar en tu iPhone
- La primera vez que toques "Conecta tu Apple Watch", iOS mostrará el diálogo de permisos de Salud. Acepta las categorías.
- Los datos solo aparecen en un **iPhone real con datos de Salud** (no en la web ni en simulador).

## Notas de App Review
En las notas de revisión puedes escribir:
> "SMT integra HealthKit (solo lectura) para mostrar al usuario sus calorías, pasos y frecuencia
> cardiaca del Apple Watch y personalizar su plan de entrenamiento. Los datos no se comparten ni
> se usan para publicidad."
