# CATCH Bangladesh — Design System
### Derived from ActionAid Brand Guidelines (2007), adapted for web implementation

This file translates ActionAid's official brand guidelines into implementable web tokens and rules for the CATCH Bangladesh platform. Where the source guideline is print-specific (mm measurements, Pantone), a web-equivalent is given. Where the guideline conflicts with a decision made earlier in this project (e.g. verdict-state colors), that conflict is flagged explicitly — **do not silently pick one.**

---

## 1. Logo

- Use the official ActionAid logotype artwork only. **Never redraw, modify, stretch, or recreate it in CSS/SVG from scratch** — use the supplied logo file(s).
- Never translate the wordmark "actionaid" itself.
- **Country/project naming:** per brand rule 2.2.5, do not visually brand this as "ActionAid Bangladesh [logo]" — the logo stands alone or locked with the strapline. "Bangladesh" / "CATCH Bangladesh" appears only in descriptive text (page footer address block, report credits), never merged into the logo itself.
- **Positioning:** top-right of the page/header, by default. (Print spec: exclusion zone = height of the exclamation mark, logo margin from edge equals that exclusion zone. For web, apply an equivalent proportional clear-space rule — e.g. minimum clear space around the logo ≥ the cap-height of the wordmark.)
- **Minimum size:** do not render smaller than is legible at the mobile breakpoint — treat the print minimum (35mm / business-card size) as a floor for "still legible," not a literal spec; test on real devices.
- **Color rules for logo on backgrounds:**

| Background | Logo treatment |
|---|---|
| White / light plain | Red logo (default) |
| Corporate red | White reversed-out logo |
| Black or near-black | White reversed-out logo |
| Dark or busy photo | White reversed-out logo |
| Light/pale photo | Red or black logo, whichever doesn't fight the image |
| B&W photo, dark background | White reversed-out logo |
| B&W photo, light background | Black logo |

- Never place a full-color logo on any tinted/percentage version of the brand color — only solid white, solid red, solid black, or photography.

## 2. Co-branding (ActionAid + CATCH Bangladesh + partner logos, e.g. donor marks)

- On this ActionAid-initiated project, the **ActionAid logo takes precedence**, top-right.
- Any partner/co-brand logo (if added later) sits **bottom-right**, not competing for top-right.
- If two logos share equal prominence, align them horizontally, bottom-right, spaced apart by the same clear-space rule as §1.
- Apply this to the footer/credits area and any printable PDF exports (e.g. downloadable module PDFs).

## 3. Color

### Official brand palette (source of truth)

| Role | Pantone (print ref.) | Web hex |
|---|---|---|
| Primary — Red | Pantone 485 | `#ED1C24` |
| Secondary — Dark Grey | Warm Grey 9 | `#666666` |
| Secondary — Light Grey | Warm Grey 4 | `#999999` |
| Black | — | `#000000` |
| White | — | `#FFFFFF` |

This red (`#ED1C24`) is the **only acceptable primary brand red**. It replaces any earlier informal red used in draft mockups — reconcile the homepage hero/CTA red to this exact value.

### ⚠️ Conflict to resolve: verdict-state color system

The fact-checker result states (✓ VERIFIED / ! NEEDS VERIFICATION / ✕ MISLEADING / ⓘ INFO) were previously specified with a green/amber/red/blue system (`#2E7D32`, `#F9A825`, `#C62828`, `#1565C0`) for usability reasons — traffic-light coding is a strong, widely-understood pattern for verification states and should generally be kept **functionally**, even in a red-forward brand.

Recommended resolution:
- Keep semantic green/amber/blue **only** for the verdict badges (functional UI, not brand expression) — accessibility and instant recognizability matter more here than brand purity.
- Use official brand red `#ED1C24` (not `#C62828`) for the "MISLEADING/HARMFUL" state, since red already carries "stop/danger" meaning in this brand and unifies with primary CTAs.
- All non-verdict UI (buttons, headers, links, nav, hero) uses only the official palette in §3 — brand grey/red/black/white, no green/amber/blue outside the verdict badges and taxonomy tags.
- Confirm this resolution with ActionAid Bangladesh brand/comms sign-off before locking it in, since deviating from strict palette-only use is exactly the kind of "local adaptation" the guideline allows but expects to be a deliberate, documented decision — not a default.

### Usage rule

- Red is the dominant, recognizable brand color — use it for primary CTAs, key headlines, the slogan bar, and the logo. Don't dilute it by overusing it as body-text color or large background fields where legibility of Bangla text suffers (see §5 accessibility note).
- Grey (both shades) supports red — use for secondary text, borders, disabled states, card backgrounds.
- Never use a tint/opacity percentage of the red as a substitute color — use the solid greys instead.

## 4. Strapline

- Official strapline: **"End poverty. Together."**
- Can be translated. Bangla project already uses its own operative slogan — **থামুন → যাচাই করুন → তারপর শেয়ার করুন** — which functions as this project's working strapline/tagline, distinct from but consistent with ActionAid's global one.
- Recommendation: keep **থামুন → যাচাই করুন → তারপর শেয়ার করুন** as the primary on-page slogan (already approved in this project), and use the official "End poverty. Together." (or its Bangla equivalent, if ActionAid Bangladesh has an approved translation) only in the footer/org-descriptor area, next to the ActionAid logo — not merged into the project's own hero messaging.
- If displayed with the logo: strapline must **never sit beside the logo** — position below/away from it, outside the logo's clear-space zone, and typeset in black regardless of whether the logo is red or black.
- If a translated strapline is needed and no official artwork exists, set it in the brand's black weight typeface (§5), not an approximation.

## 5. Typography

Official spec: **Helvetica Neue** (primary, print), **Arial** (fallback, internal docs), **Verdana** (web only).

**Critical adaptation needed — none of these three typefaces have native Bangla (Bengali script) glyph support.** The brand guideline predates Bangla-first deployment and cannot be followed literally for this project. Resolution:

- **For Latin-script text** (English toggle, tool names, numerals if Latin, code/UI labels): follow the guideline — Verdana for web, matching the family's weight logic (regular body / bold or black for headlines).
- **For Bangla text** (the vast majority of this site): use a well-supported, professionally designed Bangla webfont that pairs in weight and tone with Helvetica Neue/Verdana's clean, geometric, sans-serif character — e.g. **Hind Siliguri**, **Noto Sans Bengali**, or **Tiro Bangla**, whichever the org's designer confirms renders reliably across low-end Android devices (test rendering, not just availability, since Bangla conjuncts are a common rendering-quality failure point on cheap devices/older WebViews).
- Do not use a decorative or novelty Bangla font for headings — match the brand's plain, direct, high-legibility character described in §6 (personality: bold, direct, robust).
- Confirm final Bangla typeface choice with ActionAid Bangladesh before implementation; treat this as a documented brand-adaptation decision, not a default guess.
- Numerals: Bangla numerals (১২৩) for on-page content per earlier project decisions; Latin numerals (123) required in `tel:`, `href`, and any machine-read field (see phone-number translation task earlier in this project).

## 6. Brand personality → tone of voice (apply to all UX copy)

Every piece of copy on this site should be checked against these traits, since they are official brand personality, not just marketing color:

- **Respect** — copy listens rather than lectures; never talks down to the user.
- **Urgency** — direct, active language ("এখনই যাচাই করুন" not passive/hedged phrasing).
- **Honest and truthful** — the fact-checker's own copy must model the behavior it teaches: no exaggeration, no clickbait-style headlines on the platform itself (this is a direct tension with "urgency" — resolve by being direct, not by using emotional/urgency-baiting language, since Module 7 of the curriculum explicitly teaches users to distrust exactly that pattern).
- **Youthful** — energetic, not stiff institutional language; matches the target audience (Cox's Bazar youth).
- **Bold** — willing to name the harm plainly (e.g. the harm-gate copy already drafted: "শেয়ার করবেন না" stated flatly, not softened).
- **Non-partisan / non-party-political** — reinforces the earlier project decision to avoid national-political examples; this is now also a brand-compliance requirement, not just a Do No Harm one.

## 7. Imagery — the highest-stakes section for this project

This section requires the strictest compliance, because CATCH Bangladesh photographs and features **minors** in a **displacement/refugee context**, which is exactly the vulnerable-subject scenario the guideline's child-protection rules exist for. Treat §7 as binding, not advisory.

### 7.1 Core imagery principle
Images should convey **"togetherness"** as the default — physical, political, or emotional connection between subjects, and between subject and viewer. Not every image needs this (editorial/explanatory images can be purely illustrative), but hero/brand-visibility images (homepage hero, module covers, campaign creative) should.

### 7.2 General portrayal
- Show people — including the Cox's Bazar community — as **positive, empowered, active, engaged members of their community**, living with dignity, by default.
- Avoid defaulting to "victim" or "need" imagery unless the specific context (e.g. a fundraising ask, which is out of scope for this platform) requires it. This platform is an empowerment/education tool — imagery should reflect competence and agency (a young person verifying a claim, a group in a training session), not helplessness.

### 7.3 Women and girls — mandatory for this project
Given the project's stated gender-sensitivity requirement:
- Show women/girls as active agents, not only as dependents or passive subjects.
- Avoid captions or copy that define a woman by marital/maternal role first.
- Where quotes are used, use first-person quotes from the subject herself, not someone speaking for her.
- Never use imagery in a way that implies victimhood without agency — if illustrating a risk (e.g. the harm-gate / image-based-abuse content in the Help section), use abstract/illustrative graphics, **not** real photos of identifiable women or girls.

### 7.4 Children (anyone under 18) — the strictest rules apply, and this project will photograph minors
Non-negotiable, sourced directly from ActionAid's Child Protection Policy as summarized in the guideline:

- Child's best interest is the primary consideration in every image, always.
- Never photograph/use an image intended to shame, humiliate, or degrade a child.
- Never depict a child in erotic, seductive, or provocative pose/context, under any framing (including "awareness" content about exploitation — illustrate abstractly instead).
- Children in images must always be suitably dressed; never nude or apparently unclothed; never use blurring/props to "cover" instead of not taking/using the image at all.
- **Never publish a child's full name with their image** (no exceptions relevant to this project). Never disclose a child's personal contact details unless the child themselves knowingly and openly provided them for that specific purpose.
- Show children in context — their environment, their circumstances — rather than isolated/decontextualized.
- Prefer images showing children as active/resourceful, or being supported (training sessions, peer learning), over images showing them alone and vulnerable.
- **Written consent required before use** — parent/guardian for anyone under 18. Even with parental consent, never use an image if the child themself objects.
- **Never use a child to "advertise" the ActionAid brand** (e.g. holding a branded banner/logo). An incidental branded T-shirt or a sign in the background is fine; a posed brand endorsement is not.
- **Retention:** best practice is to destroy consented images 5 years after the consent date unless renewed — flag this for whoever manages the platform's media library/CMS, since it implies a **content-expiry/audit field** should exist on any image asset tied to a real, identifiable minor.

**Implementation implication for the CMS:** any "Verified Claim" card, testimonial, or training-session photo that could include a minor needs a **consent-status field** and, ideally, an expiry reminder — this is a CMS schema requirement, not just an editorial guideline, and should be added to the content model in `PROJECT_CONTEXT.md`.

### 7.5 Consent — general rule (all ages)
- Written consent required before publishing any identifiable person's image.
- If consent can't reasonably be obtained (genuinely public event/setting) it's acceptable only if: attendees would expect photography, they'd reasonably consider themselves in public with no privacy expectation, and it's unlikely anyone would object.
- For this platform specifically — **do not apply this "public event" exception to Community Archive submissions.** A user submitting a screenshot/claim for verification is not consenting to their own image or identity being published; this reinforces the earlier decision to anonymize archive contributors by default (see `PROJECT_CONTEXT.md` §9).

### 7.6 Colour/B&W
Prefer color imagery generally; B&W or graphic treatment (halftone/dot pattern) is acceptable for higher-impact campaign creative (e.g. Facebook workstream assets) but should not be the default for the main site, which needs warmth and approachability for a youth audience.

### 7.7 Video (if/when training or campaign video is embedded on-site)
- Community voices lead — people tell their own story in their own words wherever possible; expert/interview content and voiceover should not dominate.
- Show action (what people are doing), not just talking-head interviews.
- Any ActionAid/CATCH spokesperson should appear in the field or a neutral setting, not a "comfortable office" backdrop.
- Avoid policy-speak/jargon in narration aimed at the general youth audience.

## 8. Values reference (for content review, not visual design)

Keep visible as a checklist when reviewing any new page copy or campaign asset: **Mutual Respect · Equity and Justice · Honesty and Transparency · Solidarity · Independence · Courage of Conviction · Humility.** The Do No Harm gate, the harm-gate copy, and the anonymization defaults already built into this project's UX are direct expressions of Equity and Justice + Honesty and Transparency — keep that link explicit when justifying design decisions to non-technical stakeholders.

## 9. What this file does not cover

Print-only specifications (letterhead, business card, envelope, fax cover, exclusion-zone millimetre measurements, PowerPoint template) are in the source PDF but out of scope for a web build — reference the original `aai_brandguidelines_part1_2007.pdf` directly if any print collateral (e.g. a downloadable/printable module PDF or a training handout) is produced later, since those *do* need to follow the print specs literally.

---

**Action items before implementation starts:**
1. Confirm the verdict-color resolution in §3 with ActionAid Bangladesh brand sign-off.
2. Confirm Bangla webfont choice in §5 and test rendering on low-end Android.
3. Add a consent-status field to any CMS content type that can carry an identifiable minor's image, per §7.4.
4. Obtain and use only official ActionAid logo artwork files — do not let Claude Code (or any tool) regenerate the logo from a text description.
