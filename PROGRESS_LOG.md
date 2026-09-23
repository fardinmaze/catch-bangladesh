# CATCH Bangladesh — Progress Log

Newest first. Each entry says what changed, the decisions behind it, and what is still open.

---

## 2026-09-23

### Changed

**Footer (`src/i18n/content.js`, `src/components/layout/AppFooter.vue`, `src/data/contact.js`)**
- Trimmed the footer columns to pages/actions that actually exist:
  - **Platform**: removed "Verification Archive" and "Trusted Sources" (unbuilt pages) — kept Home, Verify, Learning Materials.
  - **Help & Support**: removed "Report Suspicious Content", "I've Been Harmed — I Need Help", "Frequently Asked Questions" (unbuilt pages) — replaced with **Email Us** (`mailto:`) and **Emergency Call (999)** (`tel:999`, Bangladesh's national emergency line, already referenced on `/help`).
  - **About the Organization**: replaced "About Us / About the Project / Privacy Policy / Terms of Use" with a single **About ActionAid** link that opens `https://actionaidbd.org/` (ActionAid Bangladesh's own site) in a new tab.
- Wired up the remaining links so they are real, working navigation instead of plain text:
  - Platform → `/`, `/fact-checker`, `/learn`.
  - Modules → the three named modules now link to their detail pages (`/learn/introduction-to-information-disorder`, `/learn/deep-fake`, `/learn/tools-and-techniques-to-verify`); "View All Modules →" → `/learn`. Note: "Deepfake & Cheap Fake" covers two separate modules with no combined page, so it points at the Deep Fake module — flagged to the user, open to changing it to Cheap Fake instead.
- `CONTACT_HREF` (`src/data/contact.js`) gained `emergency` (`tel:999`) and `actionAidOfficial` (`https://actionaidbd.org/`).
- `AppFooter.vue` link rendering now branches three ways: plain string (not yet built), `{ label, href, external }` via `CONTACT_HREF` lookup (mailto/tel/external), or `{ label, to }` via `RouterLink` (internal routes) — kept backward compatible so future columns can stay plain text until they have somewhere to go.

**Deployment (`vercel.json`, new file)**
- Fixed a live-site 404 on the module PDF's "Full screen" button (`/learn/:slug/read`, opened as a real new-tab navigation). Vue Router runs in history mode and Vercel had no fallback, so any direct/new-tab load of a nested route 404'd. Added a catch-all rewrite to `index.html`; static files (JS/CSS/PDFs/images) are still served directly by Vercel's filesystem handling first, so this doesn't affect asset delivery. Takes effect on the next Vercel deploy.

### Decisions worth remembering
- Footer links stay plain (non-clickable) text until the page behind them actually exists — don't wire a link just to avoid a 404.
- "Deepfake & Cheap Fake" in the footer's Modules column is a judgment call (points at Deep Fake) — revisit if the user wants it changed.

---

## 2026-09-21

### Changed

**Copy**
- Confirmed every "Text should be" item in `assets/Feedback on factchecking website (1) (2).docx` is applied in the Bangla copy (`src/i18n/content.js`, `src/data/learningModules.js`). Two typos in the doc were deliberately not copied: "তোইরি" (kept "তৈরি") and the stray space before "।".

**Layout tokens (`src/style.css`)**
- `--page-gutter`: 42px, 156px from 1280px up. Used by the header, home/learn sections and the footer. (Tried 210px, reverted to 156px.)
- `rounded-button` = 8px (brand rule). Applied to every button and button-style link (28 elements).

**Footer**
- ActionAid logo at the left directly on the dark background, motto at the right. Logo and favicon now come from `assets/Logos/` (`src/assets/logo-actionaid.png`, `public/favicon.svg`, linked in `index.html`).

**Contact**
- Email and WhatsApp are links (`src/data/contact.js`: `mailto:` / `wa.me`). The office phone stays plain text on purpose — it is a range of lines (55044851-57), not one number.
- New two-column layout: message form (name, email, message, Send) beside the contact card. There is no backend, so Send opens the visitor's email app with the message pre-filled to `aab.mail@actionaid.org`.

**Hero (`src/components/home/HeroSection.vue`)**
- New illustration (`assets/hero image.png` → `src/assets/photos/hero-bg.png`). From 1280px the hero keeps the image's own proportions so it is never cropped; below that the image is a band above the text.
- Figma layout: slogan split into two red bars, "Learn about Myth vs Fact" + "Take the Pledge" buttons. Copy is vertically centred with 82px side padding (29px on phones).
- Title is fluid: 30px at 1280px up to 58px at 1488px and beyond (was 42px; 64px was tried and cut back to 58px so the second bar stays clear of the faces).

**Home – "What we do" scroll animation**
- Shortened the pin from ~230vh to ~80vh of scrolling, normalised the timeline with a hold on the last panel, and aligned the ScrollTrigger end to the sticky pin so it no longer feels stuck.

**Learning modules**
- Module PDFs are now rendered in-page with pdf.js (`src/components/learn/PdfViewer.vue`, `pdfjs-dist` legacy build, lazy-loaded) instead of the browser's own `<object>` viewer, which showed nothing on phones and in browsers set to download PDFs. Files and server were verified fine (all 9 parse; served as `application/pdf`).
- "Full screen" button opens `/learn/:slug/read` (`src/views/PdfReaderView.vue`, route meta `bare` = no header/footer) in a new tab.

### Decisions worth remembering
- Do not change image size or text size when asked only to change text placement.
- The phone number is never a `tel:` link.
- Figma is the source of truth for layout; where it conflicts with the 8px button rule, the 8px rule wins.

### Open items
- **Myth vs Fact page does not exist** — the hero button points to `/learn` for now. Bangla label "ভুল ধারণা বনাম সত্য জানুন" needs sign-off.
- Both "pledge" buttons do nothing.
- Contact form has no server: it relies on the visitor having an email app. A real endpoint (form service or ActionAid server) is still to be chosen.
- `module-7-clickbait.pdf` is 27 MB (one very large photo); compress before launch. All PDFs are 5–27 MB.
- English copy has not been synced with the revised Bangla wording (pillars section, intro).
- Social icons in the contact card are white on a light background (invisible).
- Fact-checker verdict logic (from the 2026-09-21 review, not yet changed): a skipped media check can give "Verified"; "no source found" gives "Misleading/Harmful" instead of "Needs verification"; harm-flagged result cards can embed the flagged image.
- Brand red has three values in play: `#f40000` (code), `#ED1C24` (`DESIGN_SYSTEM.md`), `#C62828` (checklist doc).
- Pages still missing from `PROJECT_CONTEXT.md`: community archive, trusted sources, FAQ, admin, myth vs fact, report. Footer links and social icons are not linked yet.

### How this was checked
Headless Edge screenshots at 500 / 800 / 1100 / 1280 / 1440 / 1488 / 1920px, pdf.js render checks on modules 1, 6 and 7, and a production build (`vite build`). The Claude Chrome extension was not connected, so nothing was checked in Chrome itself.
