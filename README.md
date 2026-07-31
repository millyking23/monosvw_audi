# Monos VW-Audi Service & Parts — Website

A premium automotive service platform for **Monos VW-Audi Service & Parts (Pvt) Ltd** (Bulawayo, Zimbabwe,
est. 2016), built with **Next.js 14 (App Router)** and **Tailwind CSS**, ready to deploy on **Vercel**.

## What's included

- Fully responsive, mobile-first premium design (hero, about, services, fleet, gallery, before/after,
  testimonials-free trust section, cost estimator, FAQ, contact).
- **Working backend** — three real API routes (`/api/quote`, `/api/booking`, `/api/fleet`) that:
  - Validate input server-side
  - Reject spam via a honeypot field + basic per-IP rate limiting
  - Send a formatted notification **email** (via SMTP/Nodemailer)
  - Send a formatted **WhatsApp** message (via Meta's WhatsApp Cloud API)
  - Log every enquiry server-side, structured so it can be wired to a real database later for an admin
    dashboard (see `lib/notify.js` → `saveEnquiry`)
- Quote form supports **photo uploads**, attached directly to the notification email.
- SEO: metadata, Open Graph tags, JSON-LD local business schema, sitemap, robots.txt.
- Security headers, no secrets in client-side code (all credentials live in environment variables).

## 1. Local setup

```bash
npm install
cp .env.example .env.local   # then fill in your real values
npm run dev
```

Visit `http://localhost:3000`.

## 2. Configure notifications

Open `.env.example` for full comments. Two things to set up:

### Email (SMTP)
Any SMTP provider works (Gmail with an App Password, Zoho, Outlook, or your hosting provider's SMTP).
Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NOTIFY_EMAIL_TO`, `NOTIFY_EMAIL_FROM`.

### WhatsApp (Meta Cloud API — free tier available)
1. Create an app at [developers.facebook.com](https://developers.facebook.com) → add the **WhatsApp** product.
2. In "API Setup" you'll get a temporary access token, a **Phone number ID**, and a test recipient number.
3. Set `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_TO_NUMBER` (your business number, digits only,
   e.g. `263712579531`).
4. For production, generate a **permanent token** (System User token) instead of the 24-hour temporary one.

> If WhatsApp isn't configured yet, the site still works — forms will send the email notification and simply
> skip the WhatsApp step until you add the credentials.

## 3. Deploy to Vercel

1. Push this project to a GitHub/GitLab repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no build configuration needed.
4. Before the first deploy (or right after), go to **Project → Settings → Environment Variables** and add
   every variable from `.env.example` with your real values.
5. Redeploy after adding env vars so the API routes pick them up.

Your live forms will now email + WhatsApp every enquiry straight to the business.

## 4. Project structure

```
app/
  layout.js          → SEO metadata, fonts, JSON-LD schema
  page.js             → assembles all homepage sections
  globals.css         → design system (colours, HUD effects, sliders, forms)
  sitemap.js          → auto-generated sitemap.xml
  api/
    quote/route.js     → handles quote requests + photo uploads
    booking/route.js    → handles service bookings
    fleet/route.js      → handles corporate fleet proposals
components/           → one file per section (Hero, Services, Fleet, forms, etc.)
lib/notify.js         → email + WhatsApp senders, spam protection, enquiry logging
public/images/         → all real workshop & vehicle photography, logo, favicons
```

## 5. Extending toward a full admin dashboard

`lib/notify.js` already logs every enquiry with `saveEnquiry(type, data)`. To add a dashboard:

1. Add a database — easiest options are **Vercel Postgres** or **Supabase** (both have generous free tiers).
2. Replace the `console.log` inside `saveEnquiry` with a real `INSERT` query.
3. Add a protected `/app/admin` route (behind simple password auth or NextAuth) that reads and lists
   enquiries, and lets staff mark bookings as confirmed/completed.

The code is already structured (typed request/response shapes, one function per notification channel) so
this is additive — nothing needs to be rebuilt.

## 6. Spam protection notes

Currently implemented: a honeypot field (invisible to humans, bots tend to fill it) plus a lightweight
per-IP rate limit. For stronger protection against determined spam, add
[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) (free, privacy-friendly, no user
friction) — the `TURNSTILE_SECRET_KEY` env var is already reserved for this in `.env.example`.

## 7. Real business details used on this site

Sourced directly from the Monos company profile:
- Founded **2016**, Bulawayo, Zimbabwe
- Registered member of the **Motor Industry Association of Zimbabwe**
- Motto: *"What is MADE, we can FIX."*
- Clients referenced: Bulawayo City Council, Econet Wireless, Telecel, C.I.H Industries (Pvt) Ltd,
  Nkulumane High School, Radar Metals, Maco Builders
