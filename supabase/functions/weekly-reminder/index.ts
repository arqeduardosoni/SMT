// SMT — Recordatorio semanal (lunes)
// Crea una notificación para cada jugador que tiene un partido PENDIENTE en un
// torneo activo. Al insertar la notificación, el trigger de push manda el aviso al celular.
// Se dispara con pg_cron cada lunes (ver SMT_weekly_reminder.sql).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async () => {
  try {
    const { data: rows } = await sb.from("tournament_data").select("id,data");
    const targets = new Set<string>();
    const activeStatuses = ["open", "groups", "inprogress"];

    for (const r of rows || []) {
      const t = (r as any).data || {};
      if (t.status && !activeStatuses.includes(t.status)) continue;

      const addMatch = (m: any) => {
        if (!m || m.status === "done") return;
        if (m.p1 && m.p1.id) targets.add(m.p1.id);
        if (m.p2 && m.p2.id) targets.add(m.p2.id);
      };
      (t.groups || []).forEach((g: any) => (g.matches || []).forEach(addMatch));
      (t.rounds || []).forEach((rd: any) => (rd || []).forEach(addMatch));

      // Si el torneo aún no tiene bracket, avisar a los inscritos
      const noBracket = (!t.groups || !t.groups.length) && (!t.rounds || !t.rounds.length);
      if (noBracket) (t.players || []).forEach((p: any) => p && p.id && targets.add(p.id));
    }

    const ids = [...targets];
    if (!ids.length) return new Response(JSON.stringify({ sent: 0, reason: "no targets" }), { status: 200 });

    // Solo a quienes tienen el celular registrado (con token de push)
    const { data: toks } = await sb.from("device_tokens").select("user_id").in("user_id", ids);
    const withTok = new Set((toks || []).map((x: any) => x.user_id));

    const notifs = ids.filter((id) => withTok.has(id)).map((id) => ({
      user_id: id,
      type: "reminder",
      title: "Nueva semana de juego",
      body: "Tienes partidos pendientes en SMT. Agenda con tu rival y sube en el ranking.",
      link: "home",
    }));

    if (notifs.length) await sb.from("notifications").insert(notifs);
    return new Response(JSON.stringify({ sent: notifs.length }), { status: 200 });
  } catch (e) {
    return new Response("error: " + (e as Error).message, { status: 200 });
  }
});
