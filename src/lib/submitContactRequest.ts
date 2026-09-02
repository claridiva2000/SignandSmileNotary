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
 * Delivers a contact request by email via Formspree (https://formspree.io).
 *
 * Formspree's form endpoint is a public identifier tied to a destination email
 * address that is verified and locked in on Formspree's own dashboard — it is
 * NOT a secret, and a visitor's submission can never change where the email
 * goes. No Gmail credentials or private API keys are used anywhere here.
 *
 * The endpoint is read from a build-time env var so it can be changed (or the
 * whole provider swapped) without touching the form component. See
 * .env.example and the README for setup.
 */
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

function formatTimestamp(): string {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export async function submitContactRequest(
  payload: ContactRequestPayload
): Promise<{ ok: true }> {
  // Honeypot tripped — silently pretend success so bots don't learn to adapt,
  // without spending a Formspree submission or sending anything anywhere.
  if (payload.honeypot.trim().length > 0) {
    return { ok: true };
  }

  if (!FORMSPREE_ENDPOINT) {
    console.error(
      "submitContactRequest: NEXT_PUBLIC_FORMSPREE_ENDPOINT is not set. " +
        "Configure it as a build-time environment variable — see .env.example."
    );
    throw new Error("Contact form is not configured.");
  }

  const name = payload.name.trim();

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `New Sign & Smile Inquiry — ${payload.service} — ${name}`,
      _replyto: payload.email.trim() || undefined,
      Service: payload.service,
      Name: name,
      Phone: payload.phone.trim() || "Not provided",
      Email: payload.email.trim() || "Not provided",
      "Preferred Date": payload.preferredDate || "Not specified",
      "Preferred Time": payload.preferredTime || "Not specified",
      "Location / ZIP": payload.location.trim() || "Not specified",
      Message: payload.message.trim(),
      Submitted: formatTimestamp(),
      _gotcha: "",
    }),
  });

  if (!response.ok) {
    let details = "";
    try {
      details = JSON.stringify(await response.json());
    } catch {
      // response body wasn't JSON — ignore, we still log the status below
    }
    console.error(`submitContactRequest: Formspree responded ${response.status}. ${details}`);
    throw new Error("Failed to send contact request.");
  }

  return { ok: true };
}
