// SMT — Envío de notificaciones push (APNs)
// Se llama automáticamente cuando se crea una notificación (vía Database Webhook).
// Lee los tokens del usuario y manda el push a sus iPhones con tu llave .p8.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const APNS_KEY = Deno.env.get("APNS_KEY")!;          // contenido del .p8 (con BEGIN/END)
const APNS_KEY_ID = Deno.env.get("APNS_KEY_ID")!;    // Key ID nuevo (10 caracteres)
const APNS_TEAM_ID = Deno.env.get("APNS_TEAM_ID")!;  // 44ANY59F8L
const APNS_BUNDLE_ID = Deno.env.get("APNS_BUNDLE_ID")!; // mx.smt.tennis
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const b64url = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = ""; for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
const b64urlStr = (str: string) =>
  btoa(str).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

async function makeJwt(): Promise<string> {
  const header = b64urlStr(JSON.stringify({ alg: "ES256", kid: APNS_KEY_ID }));
  const payload = b64urlStr(JSON.stringify({ iss: APNS_TEAM_ID, iat: Math.floor(Date.now() / 1000) }));
  const unsigned = `${header}.${payload}`;
  const pem = APNS_KEY.replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "").replace(/\s/g, "");
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    "pkcs8", der, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" }, key, new TextEncoder().encode(unsigned),
  );
  return `${unsigned}.${b64url(sig)}`;
}

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const note = body.record || body;           // el webhook manda { record: {...} }
    const userId = note.user_id;
    if (!userId) return new Response("no user", { status: 200 });

    const sb = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: tokens } = await sb.from("device_tokens").select("token").eq("user_id", userId);
    if (!tokens || !tokens.length) return new Response("no tokens", { status: 200 });

    const jwt = await makeJwt();
    const payload = JSON.stringify({
      aps: { alert: { title: note.title || "SMT", body: note.body || "" }, sound: "default", badge: 1 },
      link: note.link || "",
    });

    const results: any[] = [];
    for (const t of tokens) {
      const r = await fetch(`https://api.push.apple.com/3/device/${t.token}`, {
        method: "POST",
        headers: {
          "authorization": `bearer ${jwt}`,
          "apns-topic": APNS_BUNDLE_ID,
          "apns-push-type": "alert",
          "apns-priority": "10",
        },
        body: payload,
      });
      results.push({ status: r.status });
      // Si Apple dice que el token ya no sirve, lo borramos
      if (r.status === 410) { try { await sb.from("device_tokens").delete().eq("token", t.token); } catch (_) {} }
    }
    return new Response(JSON.stringify({ sent: results }), { status: 200 });
  } catch (e) {
    return new Response("error: " + (e as Error).message, { status: 200 });
  }
});
