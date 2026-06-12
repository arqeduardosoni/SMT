# CONTEXTO DEL PROYECTO SMT — Sociedad Mexicana de Tenis
> Archivo de contexto para Claude (Cowork). Lee esto completo antes de trabajar.
> Dueño: Eduardo Soni (arquitecto, Monterrey MX). NO sabe programar: explica todo paso a paso, en español, tono amigable.

## QUÉ ES
App de comunidad de tenis (torneos, find a match, coaches, marketplace, social, rankings).
- Web app: https://smt-green.vercel.app (deploy automático desde GitHub via Vercel)
- Repo: https://github.com/arqeduardosoni/SMT.git (rama main)
- iOS/Android via Capacitor. Bundle ID: mx.smt.tennis
- Backend: Supabase (proyecto vwdviikyhimzikxoasjd). Cliente en src/supabase.js
- Casi toda la app vive en UN archivo: src/App.jsx (~3,500 líneas, React + estilos inline)

## ESTADO ACTUAL (junio 2026)
- App Store: Build 6 RECHAZADO (Guideline 2.1) — Apple no pudo entrar con la cuenta demo
  demo@smt.mx / Demo2026. El Guideline 4 (diseño iPad) YA quedó resuelto.
- Google Play: .aab firmado listo; verificación de dispositivo pendiente (BIOS AMD SVM).
- Cuentas/perfiles: persisten en Supabase (tabla profiles, auth con email+password).
- Social: grupos, chat tiempo real, fotos/videos (bucket group-media), respuestas,
  reacciones, links de invitación (?join=CODE) — TODO persiste en Supabase
  (tablas groups, group_members, group_messages).
- Notificaciones in-app: tabla notifications + campanita en Nav. Persiste.
- TORNEOS y MARKETPLACE: ya persisten en Supabase (tablas tournament_data y
  marketplace_data, JSONB + realtime). Eduardo debe correr SMT_Persistencia.sql.
- Marcador en vivo: local (motor de tenis probado: 2/3 sets, tiebreak, match TB a 7).
- Estadísticas estilo UTR: pantalla "stats" (botón en perfil) — Eduardo pidió
  rediseñarla MÁS visual/animada (menos texto, más gráficas y animaciones).
- Admin: contraseña en ADMIN_PASS (App.jsx); al entrar también abre sesión técnica
  de Supabase (admin@smt.mx) para pasar RLS. La contraseña vieja admin123 quedó
  COMPROMETIDA (se mostraba en el login) y ya fue cambiada; el hint con credenciales
  del login fue eliminado. Futuro: migrar admin a roles reales en Supabase.

## PENDIENTES INMEDIATOS (en orden)
1. ✅ HECHO (11-jun-2026): SQL de persistencia corrido en Supabase (versión previa
   del chat + la regenerada SMT_Persistencia.sql que añade realtime y trigger
   updated_at; ambas son idempotentes).
2. 🔄 EN CURSO: cuenta demo demo@smt.mx / Demo2026 YA recreada por Eduardo.
   Falta: verificar login en incógnito y publicar 1-2 productos en marketplace
   logueado como demo (para que Apple vea contenido).
3. ✅ HECHO (11-jun-2026): rediseño visual/animado de la pantalla de estadísticas.
   Nuevo: anillo de victorias animado con contador, racha con flama animada,
   gráfica "forma reciente" (barras W arriba / L abajo), radar de habilidades
   vs promedio del tour, anillos circulares por superficie, shimmer en mejor
   victoria, animaciones escalonadas en todo. Componentes nuevos: Radar, SurfRing.
   Verificado: compila sin errores (babel + esbuild). Falta que Eduardo lo vea
   con npm run dev y dé visto bueno antes del push.
   NOTA TÉCNICA: el 11-jun se detectó y reparó una corrupción del final de
   App.jsx (525 bytes nulos); se reconstruyó con la cola de git HEAD y se
   verificó que todo el trabajo previo (admin pass, persistencia) quedó intacto.
4. Push a GitHub → Vercel → Build 7 en Mac → responder a Apple → reenviar.
   En App Store Connect ya están las credenciales demo@smt.mx / Demo2026.
5. ✅ HECHO (11-jun-2026): MEDIA rediseñado estilo TikTok (pedido por Eduardo
   con sketch). Feed a pantalla completa con scroll-snap vertical, fondo
   difuminado, autor+caption abajo-izq, botonera flotante derecha con
   transparencia: like (corazón con heartPop, doble tap en fotos también),
   comentarios (hoja inferior) y compartir con QR (api.qrserver.com →
   https://smt-green.vercel.app/?post=ID; deep link ?post= ya manejado,
   abre Media tras login). Videos: autoplay solo el visible
   (IntersectionObserver, clase .tk-video), tap para pausa. Likes en estado
   mediaLikes (en memoria, igual que media/mediaComments — persistencia futura).
   NOTA TÉCNICA: volvió a ocurrir truncamiento al escribir App.jsx en el mount
   (se perdieron los últimos 1,674 bytes); reparado de nuevo con la cola de git
   HEAD. SIEMPRE verificar al final: tamaño, NULs, parse babel y esbuild.

## ROADMAP V2.0 (aprobado por Eduardo, prioridad: crecer usuarios)
Hecho: Social completo, notificaciones in-app, hub "Find A", marcador local, stats.
Sigue: transmisión del marcador en vivo, pagos MercadoPago (inscripciones $400 MXN),
SMT Premium, torneos de dobles, Survival Mode, Find a Physio + IA Coach,
push notifications nativas, Sign in with Apple/Google.

## CÓMO TRABAJAR EN ESTE PROYECTO
- Ediciones de la app → src/App.jsx. SIEMPRE verificar que compile antes de entregar.
- Probar local: `npm run dev` → http://localhost:5173 (ejecutar DENTRO de la carpeta SMT).
- Publicar web: git add/commit/push a main → Vercel despliega solo (2-3 min).
- NUNCA subir a git: node_modules/, dist/, android/, ios/, .env, *.keystore
  (ya están en .gitignore).
- Cambios de base de datos: entregar archivo .sql para que Eduardo lo pegue en
  Supabase → SQL Editor → Run. Explicarle dónde pegarlo.
- Build iOS (en Mac del amigo): git pull, npm install, npm run build,
  npx cap sync ios, npx cap open ios → en Xcode SUBIR el número de Build
  (siguiente: 7) → Product > Archive → Distribute App > Upload.
- Diseño de la app: dark navy (#040A18) + cyan (#4FC3F7), fuentes Bebas Neue /
  Barlow Condensed, estética deportiva profesional (ATP/Roland Garros).
- Reglas de torneo SMT: 2 de 3 sets, tiebreak a 7 en 6-6, 3er set = match tiebreak
  a 7 puntos. Round Robin + eliminatorias. Auto-arbitraje. Pelotas nuevas obligatorias.
