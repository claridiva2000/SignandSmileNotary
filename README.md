# Sign & Smile Notary

Marketing and lead-generation website for Sign & Smile Notary — a notary public and wedding
officiant business serving Fort Bend County and the Greater Houston, Texas area.

Deeper setup guides live in [docs/](docs/) — starting with
[docs/brevo-setup.md](docs/brevo-setup.md).

## Stack

- Next.js (App Router) + React + TypeScript
- Plain CSS (global design tokens + CSS Modules) — no UI framework dependency
- Static export (`output: "export"`) — the entire site builds to plain HTML/CSS/JS with no
  server runtime required
- One Cloudflare Pages Function ([functions/api/contact.ts](functions/api/contact.ts)) — the only
  server-side code in the project, deployed by Cloudflare Pages alongside the static site

### Contact form email delivery

The contact form posts to the site's own same-origin endpoint, `/api/contact`, a Cloudflare Pages
Function that validates the submission and sends a notification email via Brevo. See
**[docs/brevo-setup.md](docs/brevo-setup.md)** for the full setup, sender-verification, local
testing, and testing-checklist details.

## Before launch — replace placeholders

A placeholder phone number and business hours remain. Search
[src/lib/constants.ts](src/lib/constants.ts) and update:

- Phone number and business hours
- Confirm the service area list is accurate
- Set a custom favicon

Also complete the [Brevo setup](docs/brevo-setup.md) so the contact form actually delivers email.

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
4. Add the `BREVO_API_KEY` secret the contact form's Function needs — see
   [docs/brevo-setup.md](docs/brevo-setup.md) for the exact steps (`CONTACT_FROM_EMAIL` is already
   version-controlled in `wrangler.toml`, so it needs no dashboard configuration).
5. Deploy (or **Retry deployment** if one already ran before the secret was added — Pages
   Functions read it per-request, but a fresh deploy is the safest way to confirm it's live).

Cloudflare Pages automatically detects the `functions/` directory at the project root and deploys
`functions/api/contact.ts` as the `/api/contact` route alongside the static site.

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
