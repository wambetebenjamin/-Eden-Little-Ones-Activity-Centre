# Design Source Audit — `BabyCare-1.0.0.zip`

This document is the required pre-build inspection of the uploaded zip, completed
**before any new code was written**. Everything below was found by fully unzipping
`BabyCare-1.0.0.zip` into `_source/BabyCare-1.0.0/` and reading every file.

## 1. What the zip actually is

A **free static HTML5/Bootstrap 5 template called "BabyCare — Daycare Website
Template"** by HTML Codex (distributed via ThemeWagon). It is plain HTML + CSS +
jQuery — **not** a Next.js/React/TypeScript project. There is no `package.json`,
no API routes, no server code, no `.env` usage, no React, no cookie banner, no
CAPTCHA, no privacy/terms pages, and no 500 page anywhere in it.

License (`LICENSE.txt`): CC Attribution 4.0 — free to reuse/modify/recolor for a
real build, attribution backlink only required if the original template files are
redistributed as-is (we are not redistributing the template, we are using it purely
as a visual/design reference for a bespoke build, per the brief).

## 2. Folder structure (zip)

```
BabyCare-1.0.0/
├── index.html, about.html, service.html, program.html, event.html,
│   blog.html, team.html, testimonial.html, contact.html, 404.html
├── css/ bootstrap.min.css, style.css
├── js/ main.js
├── img/ (30 jpg, 4 png, 2 gif — hero, about, program, event, blog, team,
│         testimonial, gallery placeholder photos — generic Western stock,
│         NOT East African children, so per brief these are NOT reused;
│         new Pexels/Unsplash photos of East African children are sourced instead)
├── lib/
│   ├── animate/ (animate.min.css — Animate.css)
│   ├── easing/ (jquery.easing — easing.min.js)
│   ├── lightbox/ (Lightbox v2.11.4 — css+js)
│   ├── owlcarousel/ (Owl Carousel v2.2.1 — testimonial slider)
│   ├── waypoints/ (waypoints.min.js, links.php — scroll trigger dependency for WOW)
│   └── wow/ (WOW.js v1.3.0 — scroll reveal library, "wow fadeIn" etc.)
├── scss/bootstrap.scss + scss/bootstrap/** (full Bootstrap 5 source + the
│   template's variable overrides)
├── LICENSE.txt, READ-ME.txt
```

No `/api`, no `.env`, no config files beyond the above.

## 3. Design tokens extracted (colors, fonts, radii, shadows)

From `scss/bootstrap.scss` (source of truth for the compiled `css/bootstrap.min.css`):

| Token | Value | Used for |
|---|---|---|
| `$primary` | `#FF4880` (candy pink) | buttons, icons, active nav, accents |
| `$secondary` | `#4D65F9` (periwinkle blue) | hover states, dots, badges |
| `$light` | `#FFECF2` (pale pink) | section backgrounds, cards |
| `$dark` | `#393D72` (deep indigo) | headings color |
| body color | `#70747F` | paragraph text |
| `$border-radius` | `10px` (also applied to sm/lg) | cards, inputs |
| headings font-family | `Fredoka` | all `display-*` classes (hero/section titles) |
| base font-family | `Montserrat` | body text, h1–h6 per `style.css` override |

Organic/playful shape tokens (CSS, not Sass vars, found in `style.css`):
- `.img-border-radius { border-radius: 50% 20% / 10% 40%; }` — blob photo frames
- `.btn-border-radius { border-radius: 25% 10%; }` — pill-ish asymmetric buttons
- `.title-border-radius { border-radius: 10% 30%; }` — small eyebrow label chips
- `.service-item` shadow: `box-shadow: 0 0 45px rgba(0,0,0,.1)`
- `.events-item`, program cards use fully rounded circular image frames (`border-radius: 30%` / `rounded-circle`)

These "organic blob" radii + soft shadow + pink/indigo palette are the core "fun and
friendly" visual language carried into the new build as CSS custom properties.

## 4. Typography detail

`index.html <head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Montserrat:wght@200;400;600&display=swap" rel="stylesheet">
```
- **Fredoka**, weights 600/700 → used only on `.display-1…6` (big hero/section headlines). Rounded, bubbly display face → matches "fun and friendly" brief.
- **Montserrat**, weights 200/400/600 → used on `h1–h6` (200 for big thin hero sub-lines, 600 for h4–h6) and body text.
- No self-hosted font files — loaded via Google Fonts CDN `<link>` tag (no `next/font`).
- No metadata/nav/button-specific sizes defined; Bootstrap defaults applied (nav-link 16px, body ~16px).
- New build raises body text to the brief's 15px floor, nav 13px, buttons 12px (uppercase, bolder) and metadata 11px, while keeping the Fredoka/Montserrat pairing.

## 5. Icon library

**Font Awesome 5.15.4** (CDN) + **Bootstrap Icons 1.4.1** (CDN) — e.g. `fa-gamepad`,
`fa-user-nurse`, `fa-check-circle`, `bi-exclamation-triangle` on the 404 page.
Per the brief's explicit icon rule ("Lucide only" with a fixed category→icon map),
the new build **replaces** FA/Bootstrap-Icons with `lucide-react` icons, keeping the
same usage intent (check-circle for inclusions, star only for ratings, etc.).

## 6. Loading screen (zip) — **present, but minimal**

```html
<div id="spinner" class="show w-100 vh-100 bg-white position-fixed ... ">
  <div class="spinner-grow text-primary" role="status"></div>
</div>
```
```css
#spinner{opacity:0;visibility:hidden;transition:opacity .8s ease-out, visibility 0s linear .5s;}
#spinner.show{transition:opacity .8s ease-out, visibility 0s linear 0s; visibility:visible; opacity:1;}
```
```js
setTimeout(function () { $('#spinner').removeClass('show'); }, 1);
```
This is just a generic Bootstrap "spinner-grow" pulsing dot on a white screen,
removed almost instantly (1ms timeout + 0.8s fade). **No logo bounce, no 3
sequenced dots, no progress bar** exist in the source. Per the brief's explicit
fallback instruction ("If absent: logo bounces in, 3 dots pulse in sequence,
progress bar fills, fade on completion, under 2s"), the new build implements that
exact fallback spec, keeping only the pink/indigo palette and the fade-transition
technique from the zip.

## 7. Cookie consent banner — **absent** in all 10 HTML pages (confirmed via grep for "cookie"/"consent" — no matches). Fallback spec from the brief is implemented exactly (bottom-fixed banner, Accept All / Manage Preferences, modal with Necessary/Analytics/Marketing toggles, localStorage, Kenya DPA 2019 note, links to `/legal/cookie-policy`).

## 8. CAPTCHA — **absent**. `contact.html` explicitly states: *"The contact form is
currently inactive... download a working contact form with Ajax & PHP"* — i.e. the
template ships with dead `<form action="">` markup and no submit handling at all, no
CAPTCHA of any kind. The new build adds reCAPTCHA v3 (invisible) with server-side
verification + v2 fallback under score 0.5, exactly as specified in the brief, on
every form.

## 9. Privacy Policy / Terms pages — **absent** (no `privacy.html`, `terms.html`, or
equivalent in the zip). Built fresh at `/legal/privacy-policy` and `/legal/terms`
per the brief's required sections, styled with the extracted design tokens.

## 10. 404 page (zip) — present, reused as the layout reference:
```
Page header (hero-style gradient banner) → breadcrumb → centered icon
(bi-exclamation-triangle) → "404" display heading → "Page Not Found" →
one line of copy → single primary CTA button "Go Home"
```
New build keeps this exact composition (banner → icon → big code → heading → copy →
single CTA) but with the brief's required copy ("Oops! We could not find this
page." / "Back to Fun") and a Lucide icon + illustration instead of FA/Bootstrap-Icons.

## 11. 500 page — **absent** in the zip. Built fresh, reusing the 404 page's visual
composition (same banner/card layout) with "Something broke. We are fixing it!" and
a "Try Again" button, per brief.

## 12. API routes — **none exist** (fully static template). All 10 API routes listed
in the brief (`/api/booking`, `/api/birthday`, `/api/school-booking`,
`/api/membership`, `/api/activities`, `/api/availability`, `/api/gallery`,
`/api/blog`, `/api/newsletter`, `/api/contact`, `/api/captcha`) are new, built as
Next.js 14 App Router route handlers.

## 13. Packages/exact versions (zip) — none (no `package.json`). Library files found
and their embedded version headers:
- jQuery 3.6.4 (CDN script tag)
- Bootstrap 5.0.0 bundle (CDN script tag) + Bootstrap 5 source in `/scss`
- WOW.js v1.3.0 (`lib/wow/wow.min.js`)
- jQuery Easing (`lib/easing/easing.min.js`)
- Waypoints (`lib/waypoints/waypoints.min.js`)
- Lightbox v2.11.4 (`lib/lightbox`)
- Owl Carousel v2.2.1 (`lib/owlcarousel`)
- Font Awesome 5.15.4 + Bootstrap Icons 1.4.1 (CDN)
None of these are carried into the new stack; the brief's exact dependency list
(Next 14.2.5, React 18.3.1, TypeScript 5.4.5, Tailwind 3.4.4, next-auth 4.24.7,
framer-motion 11.2.10, lucide-react 0.395.0, @vercel/kv 2.0.0, @vercel/blob 0.23.4,
nodemailer 6.9.13, react-hook-form 7.51.5, zod 3.23.8, recharts 2.12.7, Node
20.11.0) is used instead, replacing jQuery/WOW/Owl/Lightbox with Framer Motion,
native CSS scroll/IntersectionObserver, and a custom lightbox component.

## 14. Environment variables (zip) — none referenced anywhere (static template).
New build introduces and documents (in `.env.example`) only the variables actually
required by the brief's integrations (reCAPTCHA, M-Pesa Daraja, WhatsApp, SMTP,
Vercel KV/Blob) — see `.env.example` in the repo root.

## 15. Components & behaviour reused 1:1 from the zip's interaction design
(recreated in React/Tailwind, not copy-pasted jQuery):
- Sticky navbar with top info bar + centered links + CTA/phone block + mobile
  hamburger → slide/collapse drawer.
- "Blob" image frames (`border-radius: 50% 20% / 10% 40%`) on hero/about imagery.
- Soft-shadow rounded "pill" service/activity cards that invert to solid primary
  color + white text on hover.
- Circular program/team photo cards with a bottom info bar that overlays on hover.
- Testimonial carousel card: avatar + name + role + 5-star row + quote, centered
  slide carousel (recreated as a Framer Motion carousel instead of Owl Carousel).
- Footer: 4-column layout — about+newsletter, opening hours block, contact+social,
  mini photo gallery grid — reused structurally for the Eden footer (quick links,
  birthday/schools/membership/blog, legal, social, newsletter, WhatsApp, copyright).
- Back-to-top circular FAB bottom-right, appears after 300px scroll — same
  interaction pattern reused for consistency alongside the new WhatsApp FAB.

## 16. Conclusion — what is "from the zip" vs "new per brief"

**From the zip (reproduced):** color palette (#FF4880 / #4D65F9 / #FFECF2 /
#393D72), Fredoka+Montserrat pairing, 10px base border-radius + organic blob/pill
shape language, soft 45px-blur shadow, card hover-invert interaction, circular
photo-card pattern, carousel-testimonial composition, footer structure, 404 page
composition, and the fade-based spinner technique (timing adapted to meet the
brief's fuller loading-screen spec).

**New, built per the brief's explicit fallback instructions (because absent from
the zip):** loading screen logo-bounce/dots/progress-bar, cookie consent banner +
preferences modal, reCAPTCHA v3/v2, Privacy Policy, Terms, 500 page, all API
routes, booking/birthday/membership/school/newsletter/contact flows, Three.js hero
shapes, Lucide icon set, gallery/blog systems, and all Eden Little Ones content
(Nairobi/Lavington address, KES pricing, activities, packages, membership tiers,
staff, reviews) — none of which exist in the source template.

No design element was invented outside of this chain: either taken from the zip,
or built to the brief's own explicit fallback specification where the zip was
silent.
