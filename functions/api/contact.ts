/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives the Sign & Smile contact form submission and sends a notification
 * email via Brevo's transactional email API. Runs in the Cloudflare Workers
 * runtime (no Node.js APIs — fetch/Request/Response only).
 *
 * Secrets/config are read from Cloudflare Pages environment bindings, set in
 * the dashboard (Settings -> Environment variables) — never hardcoded here
 * and never sent to the browser. See README.md for setup steps.
 */

interface Env {
  BREVO_API_KEY: string;
  CONTACT_FROM_EMAIL: string;
}

interface ContactPayload {
  service: string;
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  message: string;
  honeypot: string;
}

const NOTIFICATION_RECIPIENT = "signandsmilenotary@gmail.com";

const SERVICE_OPTIONS = [
  "Notary Service",
  "Just Make It Legal Ceremony",
  "Simple Wedding Ceremony",
  "Personalized Wedding Ceremony",
  "Something Else",
];

const MAX_LENGTHS = {
  service: 60,
  name: 100,
  phone: 30,
  email: 254,
  preferredDate: 20,
  preferredTime: 20,
  location: 100,
  message: 2000,
};

const EMAIL_RE = /^\S+@\S+\.\S+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function validate(body: unknown): { data: ContactPayload } | { error: true } {
  if (typeof body !== "object" || body === null) {
    return { error: true };
  }
  const b = body as Record<string, unknown>;

  const data: ContactPayload = {
    service: typeof b.service === "string" ? b.service : "",
    name: typeof b.name === "string" ? b.name : "",
    phone: typeof b.phone === "string" ? b.phone : "",
    email: typeof b.email === "string" ? b.email : "",
    preferredDate: typeof b.preferredDate === "string" ? b.preferredDate : "",
    preferredTime: typeof b.preferredTime === "string" ? b.preferredTime : "",
    location: typeof b.location === "string" ? b.location : "",
    message: typeof b.message === "string" ? b.message : "",
    honeypot: typeof b.honeypot === "string" ? b.honeypot : "",
  };

  // Honeypot submissions skip all further validation — we don't care if the
  // rest looks valid, we just want to accept-and-drop as cheaply as possible.
  if (data.honeypot.trim().length > 0) {
    return { data };
  }

  if (!SERVICE_OPTIONS.includes(data.service)) return { error: true };
  if (!isNonEmptyString(data.name)) return { error: true };
  if (!isNonEmptyString(data.message)) return { error: true };
  if (!isNonEmptyString(data.phone) && !isNonEmptyString(data.email)) return { error: true };
  if (isNonEmptyString(data.email) && !EMAIL_RE.test(data.email.trim())) return { error: true };

  if (
    data.service.length > MAX_LENGTHS.service ||
    data.name.length > MAX_LENGTHS.name ||
    data.phone.length > MAX_LENGTHS.phone ||
    data.email.length > MAX_LENGTHS.email ||
    data.preferredDate.length > MAX_LENGTHS.preferredDate ||
    data.preferredTime.length > MAX_LENGTHS.preferredTime ||
    data.location.length > MAX_LENGTHS.location ||
    data.message.length > MAX_LENGTHS.message
  ) {
    return { error: true };
  }

  return { data };
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ ok: false }, 400);
    }

    const result = validate(body);
    if ("error" in result) {
      return jsonResponse({ ok: false }, 400);
    }
    const data = result.data;

    // Honeypot tripped — pretend success, send nothing, spend no Brevo quota.
    if (data.honeypot.trim().length > 0) {
      return jsonResponse({ ok: true }, 200);
    }

    if (!env.BREVO_API_KEY || !env.CONTACT_FROM_EMAIL) {
      console.error("Contact function misconfigured: BREVO_API_KEY or CONTACT_FROM_EMAIL is not set.");
      return jsonResponse({ ok: false }, 500);
    }

    const name = data.name.trim();
    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const rows: [string, string][] = [
      ["Service", data.service],
      ["Name", name],
      ["Phone", data.phone.trim() || "Not provided"],
      ["Email", data.email.trim() || "Not provided"],
      ["Preferred Date", data.preferredDate.trim() || "Not specified"],
      ["Preferred Time", data.preferredTime.trim() || "Not specified"],
      ["Location / ZIP", data.location.trim() || "Not specified"],
      ["Message", data.message.trim()],
      ["Submitted", submittedAt],
    ];

    const htmlContent = [
      "<div>",
      "<h2>New Sign &amp; Smile Inquiry</h2>",
      ...rows.map(
        ([label, value]) =>
          `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`
      ),
      "</div>",
    ].join("\n");

    const textContent = rows.map(([label, value]) => `${label}:\n${value}`).join("\n\n");

    const hasValidReplyTo = isNonEmptyString(data.email) && EMAIL_RE.test(data.email.trim());

    const emailPayload = {
      sender: { name: "Sign & Smile Website", email: env.CONTACT_FROM_EMAIL },
      to: [{ email: NOTIFICATION_RECIPIENT }],
      ...(hasValidReplyTo ? { replyTo: { email: data.email.trim(), name } } : {}),
      subject: `New Sign & Smile Inquiry — ${data.service} — ${name}`,
      htmlContent,
      textContent,
    };

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": env.BREVO_API_KEY,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!brevoResponse.ok) {
      let details = "";
      try {
        details = JSON.stringify(await brevoResponse.json());
      } catch {
        // response body wasn't JSON — ignore, status is still logged below
      }
      console.error(`Brevo responded ${brevoResponse.status}: ${details}`);
      return jsonResponse({ ok: false }, 502);
    }

    return jsonResponse({ ok: true }, 200);
  } catch (err) {
    console.error("Unhandled error in /api/contact:", err);
    return jsonResponse({ ok: false }, 500);
  }
};
