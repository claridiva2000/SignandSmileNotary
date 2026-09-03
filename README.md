# Sign & Smile Notary

Marketing and lead-generation website for Sign & Smile Notary — a notary public and wedding
officiant business serving Fort Bend County and the Greater Houston, Texas area.

## Stack

- Next.js (App Router) + React + TypeScript
- Plain CSS (global design tokens + CSS Modules) — no UI framework dependency
- Static export (`output: "export"`) — the entire site builds to plain HTML/CSS/JS with no
  server runtime required
- One Cloudflare Pages Function ([functions/api/contact.ts](functions/api/contact.ts)) — the only
  server-side code in the project, deployed by Cloudflare Pages alongside the static site

### Contact form email delivery

The contact form posts to the site's own same-origin endpoint, `/api/contact`, which is a
Cloudflare Pages Function (not part of the Next.js app itself — Cloudflare Pages auto-detects and
deploys anything in the `functions/` directory alongside the static export). That function
validates and sanitizes the submission, then sends a notification email using
[Brevo's](https://www.brevo.com) transactional email API.

- The Brevo API key and sender address are read from Cloudflare Pages environment
  bindings (`BREVO_API_KEY`, `CONTACT_FROM_EMAIL`) — never hardcoded, never sent to the browser.
- The notification always goes to `signandsmilenotary@gmail.com` (hardcoded server-side — a
  visitor's submission can never redirect it).
- Reply-To is set to the customer's submitted email so you can just hit reply in Gmail.
- The client ([src/lib/submitContactRequest.ts](src/lib/submitContactRequest.ts)) only ever talks
  to `/api/contact` — it holds no keys or provider-specific logic, so the backend can change later
  without touching the form UI.

#### One-time setup (required before the form will deliver email)

1. In [Brevo](https://www.brevo.com), go to **Senders, Domains & Dedicated IPs → Senders** and add
   + verify the email address you intend to send *from* (see "Which sender must be verified"
   below). Brevo will email that address a verification link.
2. Get an API key: **Settings → SMTP & API → API Keys → Generate a new API key**.
3. In the Cloudflare Pages dashboard, add two environment variables (steps below):
   - `BREVO_API_KEY` — as an encrypted **Secret**.
   - `CONTACT_FROM_EMAIL` — the address you verified in step 1.
4. Redeploy (Pages Functions read these at request time, but a fresh deploy is the reliable way to
   make sure they're picked up).

Until this is done, the form still validates and behaves normally, but a submission will show the
"couldn't send your request" message (technical details are logged to Cloudflare's Function logs
and the browser console — never shown to the visitor).

#### Which sender must be verified in Brevo

Whatever address you set as `CONTACT_FROM_EMAIL` must be added and verified as a **Sender** in
Brevo — that's the only requirement for the code to work. `signandsmilenotary@gmail.com` itself
can be verified as a single sender if you'd like replies and sending to come from the same
address. That said, major webmail providers increasingly restrict third-party services from
sending "as" a `@gmail.com` address, which can hurt deliverability — many businesses instead
verify a sender on their own domain (e.g. `notifications@signandsmiletexas.com`, authenticated via
SPF/DKIM in Brevo's domain settings) for more reliable delivery. Either works with this code as-is;
it's purely a Brevo account/DNS decision, not a code change.

#### Local development with the contact form

The Next.js dev server (`npm run dev`) does **not** run Cloudflare Pages Functions, so `/api/contact`
won't exist there — the form will show the failure message, which is expected. To test the
function locally:

```bash
npm run build
cp .dev.vars.example .dev.vars   # fill in a real Brevo key + verified sender
npx wrangler pages dev out
```

This serves the static build and the Function together, the same way Cloudflare Pages does in
production.

## Before launch — replace placeholders

A placeholder phone number and business hours remain. Search
[src/lib/constants.ts](src/lib/constants.ts) and update:

- Phone number and business hours
- Confirm the service area list is accurate
- Set a custom favicon

Also complete the Brevo setup above so the contact form actually delivers email.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
```

This generates a fully static site in the `out/` directory. Always verify this command succeeds —
and that `out/` looks correct — before deploying. `npm run dev` working is not sufficient
confirmation that the site is production-ready.

## Deploying to Cloudflare Pages

1. Push this repository to GitHub (or connect it directly in the Cloudflare dashboard).
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select this repository and use these build settings:
   - **Framework preset:** None (or Next.js — either works since this is a static export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. Add the two environment variables the contact form's Function needs — **Workers & Pages →
   (this project) → Settings → Environment variables**:
   - Under **Production** (repeat under **Preview** if you want the form to work on preview
     deploys too):
     - Click **Add variable**, name it `CONTACT_FROM_EMAIL`, type **Text**, value = the sender
       address you verified in Brevo. Save.
     - Click **Add variable**, name it `BREVO_API_KEY`, click **Encrypt** (this stores it as a
       Secret — write-only, never displayed again after saving), paste your Brevo API key. Save.
5. Deploy (or **Retry deployment** if one already ran before the variables were added — Pages
   Functions read them per-request, but a fresh deploy is the safest way to confirm they're live).

Cloudflare Pages automatically detects the `functions/` directory at the project root and deploys
`functions/api/contact.ts` as the `/api/contact` route alongside the static site — no extra
configuration beyond the two variables above.

### Alternative: Wrangler CLI

```bash
npm run build
npx wrangler pages deploy out
```

## Notes for future changes

- Keep the site static-first. Avoid API routes, Server Actions, middleware, or anything requiring
  a Node.js server — none of that is compatible with the current static export setup.
- If the form's destination or provider ever changes, that logic is isolated in
  [src/lib/submitContactRequest.ts](src/lib/submitContactRequest.ts) — the form component itself
  shouldn't need to change.
