// SMT — Recordatorio DIARIO (8:00 AM hora de México)
// Para cada jugador con el celular registrado (device_tokens) inserta UNA
// notificación de "entrenamiento de hoy". Si además tiene un PARTIDO PENDIENTE
// en un torneo activo, el mensaje se lo recuerda.
// Al insertar la notificación, el trigger de push manda el aviso al celular.
// Se dispara con pg_cron todos los días (ver SMT_daily_reminder.sql).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async () => {
  try {
    // 1) Quiénes tienen partido pendiente hoy en un torneo activo
    const { data: rows } = await sb.from("tournament_data").select("id,data");
    const withMatch = new Set<string>();
    const active = ["open", "groups", "inprogress"];
    for (const r of rows || []) {
      const t = (r as any).data || {};
      if (t.status && !active.includes(t.status)) continue;
      const add = (m: any) => {
        if (!m || m.status === "done") return;
        if (m.p1 && m.p1.id) withMatch.add(m.p1.id);
        if (m.p2 && m.p2.id) withMatch.add(m.p2.id);
      };
      (t.groups || []).forEach((g: any) => (g.matches || []).forEach(add));
      (t.rounds || []).forEach((rd: any) => (rd || []).forEach(add));
    }

    // 2) Todos los jugadores con token de push
    const { data: toks } = await sb.from("device_tokens").select("user_id");
    const ids = [...new Set((toks || []).map((x: any) => x.user_id).filter(Boolean))];
    if (!ids.length) {
      return new Response(JSON.stringify({ sent: 0, reason: "no tokens" }), { status: 200 });
    }

    // 3) Una notificación por jugador
    const frases = [
      "Tu rutina de hoy te espera. ¡Vamos por ese progreso! 🎾",
      "Hoy toca entrenar. Revisa tu plan del día en SMT.",
      "¡Buenos días! Tu entrenamiento de hoy ya está listo.",
      "No rompas tu racha: revisa tu rutina de hoy en SMT.",
    ];
    const hoy = frases[new Date().getDate() % frases.length];

    const notifs = ids.map((id) => {
      const match = withMatch.has(id);
      return {
        user_id: id,
        type: "reminder",
        title: match ? "Tienes partido pendiente ⚡" : "Tu entrenamiento de hoy 🎾",
        body: match
          ? "Tienes un partido pendiente de torneo. Y no olvides tu rutina de hoy en SMT."
          : hoy,
        link: "metas",
      };
    });

    // Insertar en lotes de 200 para no saturar
    let sent = 0;
    for (let i = 0; i < notifs.length; i += 200) {
      const chunk = notifs.slice(i, i + 200);
      const { error } = await sb.from("notifications").insert(chunk);
      if (!error) sent += chunk.length;
    }

    return new Response(JSON.stringify({ sent }), { status: 200 });
  } catch (e) {
    return new Response("error: " + (e as Error).message, { status: 200 });
  }
});
