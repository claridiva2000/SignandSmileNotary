# Sign & Smile Notary

Marketing and lead-generation website for Sign & Smile Notary — a notary public and wedding
officiant business serving Fort Bend County and the Greater Houston, Texas area.

## Stack

- Next.js (App Router) + React + TypeScript
- Plain CSS (global design tokens + CSS Modules) — no UI framework dependency
- Static export (`output: "export"`) — the entire site builds to plain HTML/CSS/JS with no
  server runtime required

The contact form sends submissions by email via [Formspree](https://formspree.io) — a
third-party form-to-email service chosen specifically because it works from a static site with no
server of our own: the browser calls Formspree's endpoint directly, and Formspree delivers the
email to a destination address that's locked in on their dashboard (a visitor can never change
where it goes). No Gmail credentials or private API keys are used anywhere. The integration lives
entirely in [src/lib/submitContactRequest.ts](src/lib/submitContactRequest.ts), isolated from the
form UI, so the provider can be swapped later without touching the component.

### One-time setup (required before the form will deliver email)

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and set its destination to `signandsmilenotary@gmail.com`. Formspree will
   send a verification email to that address — it must be confirmed before submissions deliver.
3. Copy the form's endpoint URL (looks like `https://formspree.io/f/xxxxxxxx`).
4. Set it as a **build-time** environment variable named `NEXT_PUBLIC_FORMSPREE_ENDPOINT`:
   - **Cloudflare Pages:** project → Settings → Environment variables → add it for both
     Production and Preview, then redeploy (since this is a static export, the value is baked
     into the site at build time — setting it without rebuilding has no effect).
   - **Local development:** copy `.env.example` to `.env.local` and fill in the real value.
5. The free Formspree plan allows 50 submissions/month, which is generous for a small local
   business; upgrade on their dashboard if that's ever outgrown.

Until step 4 is done, the form still validates and behaves normally, but a submission will show
the "couldn't send your request" error (the details are logged to the browser console for
debugging, never shown to the visitor).

## Before launch — replace placeholders

A placeholder phone number and business hours remain. Search
[src/lib/constants.ts](src/lib/constants.ts) and update:

- Phone number and business hours
- Confirm the service area list is accurate
- Set a custom favicon

Also complete the Formspree setup above so the contact form actually delivers email.

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
4. Add the `NEXT_PUBLIC_FORMSPREE_ENDPOINT` environment variable (see "Contact form email
   delivery" setup above) so the build has it available. No KV namespaces or Workers bindings are
   required.
5. Deploy.

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
