export type ContactRequestPayload = {
  service: string;
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  message: string;
  /** Honeypot field — real visitors leave it empty. Never shown to users. */
  honeypot: string;
};

/**
 * Delivers a contact request by posting to our own Cloudflare Pages Function
 * at /api/contact, which sends the notification email via Brevo. Same-origin
 * call — no API keys or endpoint identifiers are ever present in the browser.
 *
 * Kept isolated from the form component so the transport/provider can change
 * later without touching the UI.
 */
export async function submitContactRequest(
  payload: ContactRequestPayload
): Promise<{ ok: true }> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let body: { ok?: boolean } = {};
  try {
    body = await response.json();
  } catch {
    // non-JSON response — treated as failure below
  }

  if (!response.ok || body.ok !== true) {
    console.error(`submitContactRequest: /api/contact responded ${response.status}.`);
    throw new Error("Failed to send contact request.");
  }

  return { ok: true };
}
