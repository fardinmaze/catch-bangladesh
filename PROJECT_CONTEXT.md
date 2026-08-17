# CATCH Bangladesh — Fact-Checking & Media Literacy Platform
### Project Context for Implementation

---

## 1. What this project is

**CATCH Bangladesh** is a youth-focused digital peacebuilding initiative under **ActionAid Bangladesh**, targeting communities in **Cox's Bazar**. It has three connected workstreams:

1. **Website / fact-checking platform** (this build)
2. **Training** — nine Bangla-language curriculum modules on media literacy and misinformation
3. **Facebook campaign** — distributing awareness content to where people already encounter misinformation

This file covers **workstream 1** only: a Bangla-first, mobile-first, low-bandwidth web platform.

## 2. Goal

Give a young person in Cox's Bazar a way to **pause, verify, and decide** before sharing a piece of content — without needing technical skill, without needing a developer to maintain the content afterward, and without the platform itself creating new harm (Do No Harm principle).

**Success looks like:**
- A user can verify a claim/image/video in under a few minutes using only the checklist.
- A local ActionAid/CATCH admin can add a new myth, module edit, or verified-claim entry without touching code.
- The platform reflects Cox's Bazar realities (aid, relocation, host–FDMN relations, resource competition) — **not** national political framing (elections, national government).
- Users who are themselves targeted by harmful content (doxxing, image-based abuse, harassment) have a clear path to help, not just a "report" dead end.

## 3. Audience

- Primary: youth (teens–20s) in Cox's Bazar, Bangla-speaking, mostly mobile, often low-bandwidth.
- Secondary: local ActionAid/CATCH staff and trained volunteer admins who manage content post-launch.
- Tertiary: ActionAid Bangladesh (org-level reporting, donor-facing stats).

## 4. Core design constraints (non-negotiable)

- **Bangla-first.** UI, copy, and content are Bangla by default. English only for: tool names (Google Reverse Image Search, TinEye), acronyms in parens on first use, and the BN/EN toggle itself.
- **Mobile-first, low-bandwidth.** No heavy hero video, optimize images, avoid unnecessary client-side weight. Test on 3G-equivalent throttling.
- **Two user tiers.** General User (browse, verify, submit) vs. Admin (create/edit/publish content, manage submissions, review reports). No developer needed for routine content changes.
- **Conflict-sensitive / gender-sensitive / Do No Harm.** Every content surface must consider: could this re-traumatize, expose, or endanger someone? See §8.
- **Contextual fit.** Examples and stats must be localized to Cox's Bazar community concerns, not national-political issues.

## 5. Information architecture

```
হোম (Home)
├── যাচাই করুন (Fact Checker Module)     ← primary tool, 6-step flow
├── শিখুন (Learn)
│   ├── ৯টি মডিউল (9 curriculum modules, adapted for web)
│   └── ভুল ধারণা বনাম সত্য (Myth vs Fact)
├── কমিউনিটি যাচাই আর্কাইভ (Community verification archive)
├── নির্ভরযোগ্য উৎস (Trusted Sources / Resources)
├── সাহায্য (Help — for people at risk, NOT yet built, see §9 open items)
├── প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)
└── অ্যাডমিন (Admin login — low-visibility footer link, not primary nav)
```

Top nav in draft design: `Home | Tips | Myth vs Fact | Report | Learn | Resources | BN/EN toggle | [Fact Checker Module] CTA button`

## 6. Content model — build the CMS around these 6 reusable block types

Do not model the CMS module-by-module. Model it around content *blocks*, so any admin can compose any page from these without a developer:

| Block type | Fields | Used in |
|---|---|---|
| **Definition card** | term, short definition (সহজভাবে line), icon | Glossary, module intros |
| **Comparison table** | subject rows × 2-4 category columns | Misinfo vs Disinfo vs Malinfo, Cheap vs Deep fake |
| **Red-flag list** | title, list of warning signs | Deepfake/cheapfake/clickbait detection |
| **করণীয়/বর্জনীয় pair** | do-list, don't-list | End of most modules |
| **Question checklist** | ordered questions, optional pass/fail logic | Fact-checker flow, ethics test (share-or-not) |
| **স্থানীয়করণ callout (localization slot)** | context-specific example text, region tag | Bangladesh/Cox's Bazar context boxes — **must be editable per-region without code changes** |

Also model as first-class content types:
- **Verified Claim** (for the Community Archive — see §7 card schema)
- **Module** (9 curriculum modules, each composed of the blocks above)
- **Trusted Source** (org name, description, link, category)

## 7. Fact-checking taxonomy (tag vocabulary — use everywhere)

From curriculum Module 1.5, plus a "True" state — 7 total labels, each with color, icon, and short definition:

| Label | Color (hex) | Icon |
|---|---|---|
| ✅ সত্য তথ্য (True) | `#2E7D32` | ✅ |
| ⚠️ মিসইনফরমেশন (Misinformation) | `#F9A825` (text needs darkening to `#B26A00` for AA contrast) | ⚠️ |
| ❌ ডিসইনফরমেশন (Disinformation) | `#C62828` | ❌ |
| 🔒 ম্যালইনফরমেশন (Malinformation) | `#B71C1C` | 🔒 |
| 🎭 ডিপ ফেক (Deep Fake) | `#6A1B9A` | 🎭 |
| ✂️ চিপ ফেক (Cheap Fake) | `#E65100` | ✂️ |
| 🎣 ক্লিকবেইট (Clickbait) | `#455A64` | 🎣 |

Verification-flow result states (different from the above — this is the *checklist outcome*, not the *content-type tag*):

| State | Color | Meaning |
|---|---|---|
| ✓ VERIFIED / যাচাই করা হয়েছে | `#2E7D32` | Safe to share responsibly, with source |
| ! NEEDS VERIFICATION / আরও যাচাই প্রয়োজন | `#F9A825` (darken text) | Do not share yet |
| ✕ MISLEADING/HARMFUL / বিভ্রান্তিকর বা ক্ষতিকর | `#C62828` | Do not share; report; link to Help if harm-to-person |
| ⓘ INFO / সহায়তা | `#1565C0` | Tips, not a verdict |

## 8. Fact-checker flow (the core interactive tool)

Source spec: `ACTIONAID_WEBSITE-_Checklist-17_8_26.pdf` (13 detailed rows, condensed to a 6-7 screen flow). Build as a linear wizard, branching by content type selected at Start.

**Screen order (confirmed):**
0. **Start** — select content type: পোস্ট/দাবি, ছবি, ভিডিও, স্ক্রিনশট, মেসেজ (branches later steps)
0.5. **Emotion check** (moved to front, not end, per curriculum principle that urgency itself is a red flag) — "এটা দেখে আপনার কেমন লাগছে?"
1. **Source check** — উৎস কী?
2. **Cross-check** — অন্য উৎসে আছে?
3. **Date & context** — কখন, কোথায়?
4. **Media verification** *(skip if text-only)* — reverse image search, video frame check
5. **Manipulation check** *(skip if text-only)* — AI/Deepfake vs Edited/Cheap Fake, with explicit disclaimer: "এই লক্ষণগুলো একা প্রমাণ নয়"
6. **Harm gate** (from checklist row 10-11 — **do not drop this step**, it is the Do No Harm control) — is this true-but-harmful, does it target a person/group, does it contain private info?
7. **Result** — one of the 4 verdict states above, shareable as an image card

Copy for all screens already drafted — reuse verbatim (see chat history / attached copy docs) rather than rewriting.

## 9. Known open items / do not treat as finished

- **সাহায্য (Help) pathway is not yet designed.** Needed for users who are targets of harassment/doxxing/image-based abuse surfaced by the harm gate or by reports. This is a Do No Harm gap flagged from the curriculum review — build before launch, not as a "nice to have."
- **Community Archive card — privacy decision needed.** Draft used real-looking usernames (`@sabbir_92`). Recommendation: default to anonymized labels (`সদস্য #৪৪৭`) with opt-in for real name/handle, especially for sensitive claim categories (admin/political/communal). Do not ship real usernames by default.
- **Score display** — draft uses a numeric "বিশ্বাসযোগ্যতা স্কোর" (e.g., 94/100). Consider replacing with a 3-level confidence tag (উচ্চ/মধ্যম/নিম্ন) if numeric scores prove confusing to test users — flagged as a design decision, not settled.
- **Trusted Sources library is currently empty.** Curriculum only names Google Reverse Image Search and TinEye (both English, desktop-oriented). No Bangladeshi fact-checkers are named yet — needs research before launch.
- **Cox's Bazar localization examples are not yet written.** All curriculum modules currently use national-political examples (elections, government policy). These must be replaced with local equivalents (aid distribution, relocation, host–FDMN relations, resource competition) before content goes live — this is a substantive content task, not cosmetic.
- **Six specific errors in curriculum source PDFs** need correcting before modules are published on-site (wrong examples copy-pasted into Module 6.1, missing section 3.7, truncated sentence in Module 6.9, inconsistent Bangla/Latin numerals across modules, inconsistent presence of করণীয়/বর্জনীয় boxes, outdated deepfake-detection guidance in Module 5.6 — lead with provenance-checking over artefact-spotting).
- **Two fact-checking checklists in the curriculum answer different questions and must not be merged**: "is this true?" (Module 9) vs. "should I share this even if true?" (Module 4, ethics/malinformation test). Keep them as distinct branches, not one merged form.

## 10. Visual/UX notes from draft (`Web_page.pdf`)

- Primary brand color: red/crimson (used for slogan banner, primary CTAs, nav "Fact Checker Module" button).
- Stats bar directly under hero: 4 stat cards (⁠percentages/counts), color-differentiated backgrounds.
- "What/Why/How" section uses a 3-pillar card layout (যাচাই প্ল্যাটফর্ম / প্রশিক্ষণ / ফেসবুক ক্যাম্পেইন) with icons.
- Fact-checker intro section: 3-step horizontal stepper (নির্বাচন করুন → ধাপে ধাপে উত্তর দিন → ফলাফল পান) before the CTA — gives users a preview before they commit to clicking through.
- Community archive: horizontal scrollable card carousel with prev/next arrows, colored verdict badge top-left of each card.
- Learning materials: card grid, 3 visible + "Explore" pattern, each with icon + 1-line description + "Learn More" link.
- Footer: dark background, red accent line at top (repeats the slogan), 4-column layout + bottom bar with address/contact/copyright.
- BN/EN toggle present in top nav — confirm whether English version is in scope for this phase or Bangla-only for v1.

## 11. Non-goals for this phase

- No national political content or election-related examples.
- No automated/AI-based fact-checking (the tool is a guided human-verification checklist, not an ML classifier) — do not implement it as an automated true/false detector.
- No public exposure of real user identity by default (see §9).
- No dependency on developer involvement for routine content publishing after launch — if a proposed technical solution requires a dev to add a myth or edit a module, it fails the sustainability requirement.

## 12. Reference documents already produced (reuse, don't regenerate)

- Hero slogan + subtitle + 4 stat cards (Bangla)
- What/Why/How section copy
- Fact-checker intro section copy (title, subtitle, 3-step summary, CTA)
- Community archive section copy (title, subtitle, brief) + card field schema + taxonomy badges
- Learning materials section copy (title, subtitle, 9 module cards)
- Footer copy (5-column structure + urgent-help banner + address block, Bangla)
- Curriculum content audit: 6 reusable content-block types, list of curriculum errors to fix, localization gap list, Do No Harm gap list

All of the above were produced in this conversation and should be treated as the current source of truth for copy — pull from chat history rather than re-drafting.
