# Missionary Media Eloqwnt-Style Redesign Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Move the Missionary Media static website toward the Eloqwnt visual language while preserving Missionary Media content, CTAs, materials, images, and brand voice.

**Architecture:** Keep the site static and HTML-first. Use one coordinator to protect scope, maintain the design system, and sequence small focused agents that each touch one page section or shared style cluster. Do not ask one agent to redesign the whole site.

**Tech Stack:** Static HTML, inline CSS, vanilla JS, Netlify static publish from repo root.

**Repo:** `/Users/tabornormoyle/Desktop/Empowering Others/Shared/repos/missionary-media-website`

---

## Context discovered

- Site files:
  - `index.html` — primary landing page, large inline CSS + vanilla JS, about 2,057 lines.
  - `sponsor.html` — sponsor/donor page, inline CSS + vanilla JS, about 483 lines.
  - `survey/index.html` — paste-ready email page, intentionally email-safe inline styles.
  - `netlify.toml` — static publish from `.` with no build command.
- Current git state before planning:
  - `sponsor.html` has an existing uncommitted change in the “Reach locals” value card copy.
  - Implementation agents must not overwrite unrelated edits in `sponsor.html`; preserve that changed paragraph exactly unless the coordinator explicitly approves copy editing it.
- Eloqwnt reference traits to adapt, not copy wholesale:
  - Pale gray/off-white page shell (`#E5E9EB`-like) with large white rounded panels.
  - Huge, clean, black editorial typography; wide spacing; fewer decorative gradients.
  - Pill-shaped CTAs, mostly black/white/soft gray, high radius.
  - Minimal nav; generous whitespace; metric/stat strips; horizontal dividers.
  - Large case-study/service blocks and oversized cards.
  - Footer with large columns, rounded newsletter/testimonial panel, subtle gray text.
- Missionary Media traits to preserve:
  - Existing copy and voice: practical, warm, missionary-specific, sober about digital workload.
  - Existing CTAs: discovery calls, sponsor/founding-builder calls, Givebutter checkout, survey link.
  - Existing materials/images: `images/logo.png`, hero images, testimonial/voice images, sponsor image, survey preview, founder photo.
  - Existing brand colors may remain as accents: blue/coral/sky/orange, but use more restraint.

---

## Coordination model

### Coordinator responsibilities

The coordinator is the only agent allowed to:

1. Decide final visual-system direction.
2. Merge outputs from focused agents.
3. Touch multiple unrelated sections in one pass.
4. Resolve conflicts around `sponsor.html` uncommitted edits.
5. Run whole-site validation and visual review.
6. Decide whether a visual element is “too Eloqwnt” and weakens Missionary Media’s voice.

### Focused agent rules

Each focused agent gets:

- One task brief from this plan.
- Exact files and section boundaries.
- A reminder to run `git diff -- <files>` before and after editing.
- A reminder not to reformat the full file.
- A reminder to preserve all existing links, CTA targets, image paths, forms, and JS behavior unless the task says otherwise.

Each focused agent returns:

- Files changed.
- Section(s) touched.
- Validation performed.
- Any risks or follow-up needed.

### Suggested branch discipline

Use one branch for the redesign, then commit per completed task or per small batch:

```bash
git switch -c redesign/eloqwnt-inspired-mm
```

If a branch already exists, coordinator should use it instead of creating a duplicate.

---

## Non-negotiable guardrails

1. **Do not overwrite unrelated `sponsor.html` changes.** The current uncommitted “Reach locals” paragraph is user/previous work.
2. **Do not replace Missionary Media copy with generic agency copy.** The visual style can become more minimal/editorial, but the message stays missionary-specific.
3. **Do not delete CTA paths.** Preserve:
   - Discovery call anchors/links in `index.html`.
   - Givebutter checkout link in `sponsor.html`.
   - Calendly link in `sponsor.html`.
   - Google Forms survey link in `survey/index.html`.
4. **Do not introduce a build system unless explicitly approved.** This is a static HTML site.
5. **Do not make the email page depend on external CSS.** `survey/index.html` is paste-ready email markup; changes must stay email-safe.
6. **Keep accessibility.** Maintain semantic headings, contrast, keyboard-reachable CTAs, useful alt text, and reduced-motion behavior where animations remain.

---

## Recommended first build slice

Build only the top-of-funnel look first, then stop for review.

### First slice scope

1. Create a shared Eloqwnt-inspired design token direction in `index.html` only.
2. Redesign `index.html` nav + hero only.
3. Preserve existing hero copy, CTA labels, CTA targets, logo, images, and behavior unless impossible.
4. Do not touch `sponsor.html` in the first slice.
5. Do not touch `survey/index.html` in the first slice.

### Why this slice first

- It is visually decisive and low blast-radius.
- It avoids the currently dirty `sponsor.html` file.
- It gives the user a quick “yes/no” on the Eloqwnt direction before agents propagate the style across the whole site.
- It validates whether Missionary Media’s warm voice survives inside the cleaner, bolder visual shell.

### First slice acceptance criteria

- `index.html` nav + hero visibly shift toward Eloqwnt: pale-gray shell, white/rounded hero or strong minimal composition, huge clean headline, pill CTAs, restrained accents.
- Existing `index.html` hero content and CTA routes still work.
- No `sponsor.html` diff is created.
- Page loads locally in a static server.
- Desktop and mobile screenshots are reviewed.

---

## Dependency graph

```text
T00 Baseline snapshot
  ├─ T01 Design translation brief
  │   ├─ T02 Shared token decisions
  │   │   ├─ T03 Index nav + hero first slice
  │   │   │   ├─ T04 Index intro/problem section
  │   │   │   ├─ T05 Index proof/voices section
  │   │   │   ├─ T06 Index Phase 1/materials section
  │   │   │   ├─ T07 Index FAQ/final CTA/footer
  │   │   │   └─ T08 Sponsor visual shell prep
  │   │   │       ├─ T09 Sponsor hero/donation module
  │   │   │       ├─ T10 Sponsor value/timeline sections
  │   │   │       ├─ T11 Sponsor builder/call sections
  │   │   │       └─ T12 Sponsor FAQ/final/footer
  │   │   └─ T13 Survey/email minimal brand alignment
  │   └─ T14 Visual QA pass
  └─ T15 Whole-site link/accessibility/performance validation
      └─ T16 Coordinator final polish + commit bundle
```

---

## Task briefs

### T00: Baseline repo and visual snapshot

**Owner:** Coordinator  
**Dependencies:** None  
**Files:** None expected; optional screenshots under `.hermes/artifacts/` if desired.

**Objective:** Establish current git and visual baseline before any redesign agent edits.

**Brief for agent:**

You are the coordinator. In repo `/Users/tabornormoyle/Desktop/Empowering Others/Shared/repos/missionary-media-website`, capture the baseline state. Do not edit files. Report current branch, `git status --short`, and the exact `sponsor.html` dirty diff. Start a static server and capture or inspect desktop/mobile views of `index.html`, `sponsor.html`, and `survey/index.html`.

**Commands:**

```bash
git status --short
git diff -- sponsor.html
python3 -m http.server 4173
```

Open:

- `http://localhost:4173/`
- `http://localhost:4173/sponsor.html`
- `http://localhost:4173/survey/`

**Acceptance criteria:**

- Baseline status is documented.
- Existing `sponsor.html` dirty paragraph is explicitly noted.
- No files are modified.

---

### T01: Design translation brief

**Owner:** Design-analysis agent  
**Dependencies:** T00  
**Files:** Create `docs/eloqwnt-redesign-brief.md` or, if no docs folder exists, create `docs/` first.

**Objective:** Translate Eloqwnt’s look into Missionary Media-specific design rules.

**Brief for agent:**

Create a concise design brief that describes how to adapt Eloqwnt’s visual language without copying content or weakening Missionary Media’s brand. Include tokens, typography direction, spacing, button styles, card styles, section rhythm, image treatment, and “do not do” rules. This is a reference for all later agents.

**Required content:**

- “Adapt, don’t clone” note.
- Color direction:
  - Page shell: pale gray/off-white.
  - Panels: white or near-white.
  - Primary text: black/near-black.
  - Missionary Media blue/coral only as accents.
- Typography direction:
  - Bigger, cleaner, bolder headings.
  - Less decorative serif usage unless intentionally retained for warmth.
- Layout direction:
  - Rounded white panels.
  - Large type blocks.
  - Stats/proof strips.
  - Spacious grids.
- CTA direction:
  - Primary black pill or Missionary Media accent pill depending context.
  - Secondary text/outline pill.
- Guardrails:
  - Keep missionary-specific language.
  - Keep all CTAs and images.

**Acceptance criteria:**

- `docs/eloqwnt-redesign-brief.md` exists.
- Later agents can implement from it without visiting the reference site.
- No site HTML changes in this task.

---

### T02: Shared token decisions for `index.html`

**Owner:** CSS-system agent  
**Dependencies:** T01  
**Files:** Modify `index.html` CSS only, preferably the `:root`, global element styles, buttons, nav primitives, section primitives.

**Objective:** Prepare the visual system for the first slice without redesigning individual content sections.

**Brief for agent:**

In `index.html`, adjust the top-level CSS tokens and reusable primitives toward the approved design brief. Keep this scoped: do not rewrite content sections yet. Preserve existing class names where possible so later tasks are smaller.

**Likely edits:**

- `:root` variables around lines 13-22.
- Global `body`, `section`, heading, button, nav primitives near the top of CSS.
- Add new utility classes only if needed, e.g. `.shell-panel`, `.pill`, `.section-kicker`.

**Do not:**

- Touch `sponsor.html`.
- Touch `survey/index.html`.
- Change hero copy or CTA links.
- Remove existing reduced-motion behavior.

**Acceptance criteria:**

- `index.html` still renders without JS errors.
- Existing sections retain layout enough not to collapse before their dedicated tasks.
- Diff is mostly CSS primitives, not a whole-page rewrite.

---

### T03: First slice — `index.html` nav + hero redesign

**Owner:** Hero agent  
**Dependencies:** T02  
**Files:** Modify `index.html` only.

**Objective:** Deliver the first visible Eloqwnt-inspired slice: nav and hero.

**Brief for agent:**

Redesign only the `index.html` nav and `#hero` area toward the design brief. Preserve Missionary Media copy, logo image, primary CTA target, secondary story link behavior, and any hero JS hooks needed by existing interactions.

**Target style:**

- Minimal fixed/top nav with pale shell, black text, simple links, one pill CTA.
- Hero feels spacious and editorial, with a large headline and restrained supporting text.
- Prefer a pale-gray page shell and large rounded white/near-white hero composition, or a clean black-on-light composition with subtle Missionary Media blue/coral accents.
- Avoid the current overly complex aurora/3D feeling if it fights the cleaner Eloqwnt style.
- Keep at least one Missionary Media image/material if currently core to the hero, but simplify treatment.

**Acceptance criteria:**

- Only nav and hero-related CSS/HTML/JS are changed.
- `#hero` anchor still works.
- Primary CTA still routes to the discovery booking section/link used before.
- Mobile hero is readable and CTAs fit on screen.
- `git diff -- sponsor.html` remains exactly the pre-existing user diff only.

**Validation:**

```bash
python3 -m http.server 4173
```

Review:

- `http://localhost:4173/` at desktop width.
- `http://localhost:4173/` at mobile width.

---

### T04: `index.html` intro/problem section redesign

**Owner:** Section agent A  
**Dependencies:** T03 approved by coordinator  
**Files:** Modify `index.html` only.

**Objective:** Redesign the first explanatory/problem sections below the hero.

**Brief for agent:**

Find the `#problem` and immediately adjacent intro/problem content in `index.html`. Keep the content and voice, but restructure visually into Eloqwnt-style large type + simple proof/issue blocks. Use existing tokens from T02 and do not invent a new style.

**Acceptance criteria:**

- Problem message is clearer, not more generic.
- Section spacing and panel shape match T03.
- No CTA links are removed.
- No unrelated sections are changed.

---

### T05: `index.html` proof/voices section redesign

**Owner:** Section agent B  
**Dependencies:** T03 approved by coordinator  
**Files:** Modify `index.html` only; use existing images under `images/voices/`.

**Objective:** Make testimonials/voices/proof feel like Eloqwnt case/proof blocks while preserving missionary credibility.

**Brief for agent:**

Find the sections related to voices, testimonials, weight, candidates, or proof. Convert the presentation into spacious white rounded cards, metric/proof strips, or case-style blocks. Preserve names, images, quotes, and any existing sequence/meaning.

**Acceptance criteria:**

- Existing voice images still load.
- Quotes/names are unchanged unless fixing obvious typos with coordinator approval.
- Visual treatment is cleaner and more premium.
- Mobile grid stacks cleanly.

---

### T06: `index.html` Phase 1/materials section redesign

**Owner:** Section agent C  
**Dependencies:** T03 approved by coordinator  
**Files:** Modify `index.html` only; use existing images/material previews.

**Objective:** Reframe Missionary Media’s program/materials as a premium but practical offering.

**Brief for agent:**

Find `#phase1`, solution, capabilities, materials, or similar sections. Preserve program details, phase language, CTAs, and images. Redesign into a clean service/product grid inspired by Eloqwnt’s services/case-study blocks.

**Acceptance criteria:**

- Existing program structure remains understandable.
- Existing image paths remain valid.
- Reusable card styles from T02 are used instead of one-off CSS.
- No sponsor page edits.

---

### T07: `index.html` FAQ/final CTA/footer redesign

**Owner:** Section agent D  
**Dependencies:** T04, T05, T06  
**Files:** Modify `index.html` only.

**Objective:** Finish the landing page with a coherent FAQ, final CTA, and footer.

**Brief for agent:**

Redesign the lower FAQ/final booking/footer area to match the rest of the updated `index.html`. Use Eloqwnt-inspired footer cues: pale gray shell, big columns or oversized rounded panel, simple black/near-black CTA, subtle secondary text. Preserve all legal/footer text and CTA destinations.

**Acceptance criteria:**

- FAQ remains semantic and keyboard accessible.
- Final CTA remains clear and routes correctly.
- Footer links/logos remain intact.
- Whole `index.html` has consistent top-to-bottom rhythm.

---

### T08: Sponsor page visual shell prep

**Owner:** CSS-system agent  
**Dependencies:** T03 approved; coordinator confirms how to handle existing dirty `sponsor.html` diff  
**Files:** Modify `sponsor.html` CSS primitives only.

**Objective:** Align sponsor page tokens/primitives with the new landing-page design system while preserving dirty copy edits.

**Brief for agent:**

Before editing, run `git diff -- sponsor.html` and confirm the existing “Reach locals” dirty paragraph is present. In `sponsor.html`, update only shared visual primitives: variables, body shell, headings, buttons, sections, nav, basic card primitives. Do not rewrite content sections yet.

**Critical guardrail:**

The paragraph below must survive unless coordinator says otherwise:

> The message is already there. We help missionaries get it in front of people they'd never reach on foot — posts, sermons, short videos — set up to fit their bandwidth, their security, and their time.

**Acceptance criteria:**

- `sponsor.html` still includes the above paragraph.
- Sponsor page loads.
- Diff is mostly CSS primitives.
- Donation and Calendly links remain unchanged.

---

### T09: Sponsor hero/donation module redesign

**Owner:** Sponsor hero agent  
**Dependencies:** T08  
**Files:** Modify `sponsor.html` only.

**Objective:** Redesign sponsor hero and donation amount UI in the new visual style.

**Brief for agent:**

Update only the sponsor nav, hero, donation amount chips, primary donation CTA, and immediate hero helper text. Preserve the core sponsor ask and all donation behavior/links. The hero should feel generous, serious, and trustworthy—not flashy.

**Acceptance criteria:**

- Amount selection still works.
- Givebutter checkout still opens with the intended amount behavior if already present.
- Mobile sticky give bar still works.
- Sponsor image `images/sponsor-silhouette-street.png` is either retained or deliberately simplified with coordinator approval.

---

### T10: Sponsor value/timeline sections redesign

**Owner:** Sponsor section agent A  
**Dependencies:** T08  
**Files:** Modify `sponsor.html` only.

**Objective:** Redesign value cards, gift/includes, and timeline sections.

**Brief for agent:**

Update the sections explaining what the gift funds and what happens over the year. Preserve all copy, including the current “Reach locals” paragraph. Use large rounded panels, clean numbered steps, and simple card hierarchy.

**Acceptance criteria:**

- All three value cards remain.
- Timeline still communicates Assess → Build the system → Coach/keep running.
- The `$67 a month` offer remains prominent.
- No donation JS regressions.

---

### T11: Sponsor builder/call sections redesign

**Owner:** Sponsor section agent B  
**Dependencies:** T08  
**Files:** Modify `sponsor.html` only.

**Objective:** Redesign Founding Builder, stewardship, why Tabor, and call booking sections.

**Brief for agent:**

Make the builder/call content feel premium and credible using the shared visual system. Preserve Founding Builder positioning, Online School/Trusted Help Network cards, Tabor/founder image, Calendly embed/link, and share behavior.

**Acceptance criteria:**

- Calendly embed/link still works.
- Founder image path still works.
- Founding Builder CTA remains visible.
- Share/copy behavior still works if present.

---

### T12: Sponsor FAQ/final/footer polish

**Owner:** Sponsor section agent C  
**Dependencies:** T09, T10, T11  
**Files:** Modify `sponsor.html` only.

**Objective:** Finish sponsor page with consistent FAQ, final CTA, modal, sticky bar, and footer styling.

**Brief for agent:**

Polish lower sponsor FAQ/final CTA/footer and ensure donation modal/sticky bar visually matches the page. Preserve all interactions and links.

**Acceptance criteria:**

- FAQ remains accessible.
- Donation modal opens/closes.
- Sticky mobile give bar is usable.
- Footer matches `index.html` direction.

---

### T13: Survey/email minimal brand alignment

**Owner:** Email-safe HTML agent  
**Dependencies:** T01; ideally after T03 visual direction is approved  
**Files:** Modify `survey/index.html` only.

**Objective:** Lightly align the survey email page with the new brand direction without breaking paste-ready email usage.

**Brief for agent:**

This page is an email artifact, not a normal website page. Make only conservative email-safe tweaks: outer background color, image border radius if safe, button radius/color, spacing. Preserve all copy and the Google Forms URL. Do not add external stylesheets, JS, complex CSS, web fonts, or layout techniques that fail in email clients.

**Acceptance criteria:**

- Copy between `COPY FROM HERE` and `COPY TO HERE` remains paste-ready.
- Google Forms link unchanged.
- Styles remain inline-safe/system-font based.
- Page still renders as a centered email preview.

---

### T14: Visual QA pass by page

**Owner:** QA/design reviewer agent  
**Dependencies:** T07, T12, T13  
**Files:** No edits unless coordinator delegates fixes.

**Objective:** Review visual consistency and catch regressions before final polish.

**Brief for agent:**

Run the static site locally and review each page at desktop/tablet/mobile widths. Compare against the design brief and list concrete issues. Do not edit unless separately assigned.

**Review URLs:**

- `http://localhost:4173/`
- `http://localhost:4173/sponsor.html`
- `http://localhost:4173/survey/`

**Checklist:**

- Does it feel closer to Eloqwnt without becoming generic?
- Does Missionary Media still feel warm, trustworthy, and missionary-specific?
- Are CTAs obvious?
- Are sections too tall/empty on mobile?
- Are image crops acceptable?
- Are there duplicated styles that should be consolidated?
- Is contrast acceptable?

**Acceptance criteria:**

- QA report contains prioritized fixes: blocker, should-fix, optional.
- No unapproved edits.

---

### T15: Whole-site link/accessibility/performance validation

**Owner:** Technical QA agent  
**Dependencies:** T14 fixes complete  
**Files:** No edits unless coordinator delegates fixes.

**Objective:** Verify the static site works technically.

**Brief for agent:**

Run local validation for links, console errors, responsive behavior, and basic accessibility. This is not a full automated test suite; it is a practical static-site verification pass.

**Commands:**

```bash
python3 -m http.server 4173
```

Manual/automated checks:

- Open `/`, `/sponsor.html`, `/survey/`.
- Check browser console for JS errors.
- Click all nav links and primary CTAs.
- Check mobile widths around 390px and desktop around 1440px.
- Verify image paths load.
- Verify no horizontal overflow.
- Verify `prefers-reduced-motion` does not leave critical content hidden.

**Acceptance criteria:**

- All primary links work or known external blockers are documented.
- No critical console errors.
- No severe mobile overflow.
- Existing sponsor dirty copy preserved.

---

### T16: Coordinator final polish and commit bundle

**Owner:** Coordinator  
**Dependencies:** T15  
**Files:** Any site files, but only for small final fixes.

**Objective:** Merge small agent work into a coherent final redesign and prepare for review/PR.

**Brief for coordinator:**

Review the full diff. Remove accidental duplication, resolve style inconsistencies, ensure `sponsor.html` user/previous edit is preserved, and make small final polish edits. Then commit in logical chunks or one clear review commit if requested.

**Pre-commit commands:**

```bash
git status --short
git diff --stat
git diff -- sponsor.html | sed -n '1,120p'
python3 -m http.server 4173
```

**Acceptance criteria:**

- Diff is understandable and scoped.
- No unrelated archive files changed.
- No build system added.
- Final summary lists pages changed and validation results.

---

## Parallelization plan

### Can run in parallel

After T03 is approved:

- T04, T05, and T06 can run in parallel because they touch distinct `index.html` sections, but coordinator must merge carefully because they share one large file.
- After T08, T10 and T11 can run in parallel if their section boundaries are clearly assigned.
- T13 can run independently after visual direction is approved.

### Should not run in parallel

- T02 and T03 should be sequential.
- T08 and any sponsor section work should be sequential at first because `sponsor.html` has a dirty existing edit.
- T07 should wait for T04-T06.
- T12 should wait for T09-T11.
- T16 should wait for all QA.

---

## Files likely to change

Primary implementation files:

- `index.html`
- `sponsor.html`
- `survey/index.html`

Optional planning/reference file:

- `docs/eloqwnt-redesign-brief.md`

Files that should generally not change:

- `archive/**`
- `images/**` unless coordinator explicitly approves optimizing/replacing assets.
- `netlify.toml` unless deployment requirements change.

---

## Validation plan

Use the static server for all implementation tasks:

```bash
cd "/Users/tabornormoyle/Desktop/Empowering Others/Shared/repos/missionary-media-website"
python3 -m http.server 4173
```

Validate:

- `http://localhost:4173/`
- `http://localhost:4173/sponsor.html`
- `http://localhost:4173/survey/`

Minimum validation per edited page:

- Desktop view.
- Mobile view around 390px wide.
- Primary CTA click path.
- Browser console errors.
- Image loading.
- No horizontal scroll.

Recommended final validation:

- Lighthouse or browser accessibility quick check if available.
- Manual keyboard tab through nav and CTAs.
- Confirm external links:
  - Calendly.
  - Givebutter.
  - Google Forms survey.

---

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| One agent rewrites the whole large `index.html` and creates unreviewable diff | Assign strict section boundaries; coordinator rejects broad rewrites. |
| `sponsor.html` user edit gets overwritten | Every sponsor task starts with `git diff -- sponsor.html`; coordinator owns merges. |
| Site becomes generic B2B agency instead of Missionary Media | Preserve copy/voice; design brief says adapt visuals only. |
| Eloqwnt-inspired whitespace makes pages too long on mobile | Every section agent validates 390px mobile. |
| Inline CSS becomes duplicated across files | Coordinator accepts some duplication for static simplicity, but consolidates repeated primitives within each file. |
| Email page breaks in inboxes | T13 restricted to email-safe inline/system-font tweaks only. |
| Existing JS interactions break | Each task preserves hooks and validates console/click behavior. |

---

## Open questions for coordinator/user

1. Should the primary CTA color become black like Eloqwnt, or remain Missionary Media coral/blue for brand recognition?
2. Should the landing page keep the current 3D/aurora hero concept in simplified form, or replace it with a cleaner editorial/image panel?
3. Should `sponsor.html` visually match `index.html` exactly, or keep a slightly warmer donor-focused feel?
4. Is creating `docs/eloqwnt-redesign-brief.md` acceptable, or should planning artifacts stay only under `.hermes/plans/`?
5. Are any new screenshots/assets available from Eloqwnt-style mockups, or should agents use existing Missionary Media images only?

---

## Suggested first agent dispatch

Use this exact brief for the first implementation agent after coordinator baseline:

```text
You are implementing the first build slice only for the Missionary Media Eloqwnt-inspired redesign.

Repo: /Users/tabornormoyle/Desktop/Empowering Others/Shared/repos/missionary-media-website
File you may edit: index.html only
Files you must not edit: sponsor.html, survey/index.html, archive/**, images/**

Goal: Redesign only the nav and hero of index.html toward an Eloqwnt-inspired look while preserving Missionary Media content, CTAs, images/materials, and brand voice.

Important context:
- sponsor.html has an existing uncommitted user/previous change. Do not touch sponsor.html.
- This is a static HTML site; do not add a build system.
- Eloqwnt direction: pale gray/off-white shell, large white rounded panels, huge clean black typography, pill CTAs, restrained accents, generous spacing.
- Missionary Media direction: keep warm missionary-specific copy, existing CTA targets, existing logo/images, and practical voice.

Steps:
1. Run `git status --short` and confirm only expected pre-existing sponsor.html dirtiness exists.
2. Inspect current index.html nav and #hero structure.
3. Edit only index.html CSS/HTML needed for nav and hero.
4. Preserve CTA hrefs/anchors and JS hooks.
5. Run `python3 -m http.server 4173` and review / at desktop and mobile widths.
6. Confirm `git diff -- sponsor.html` is unchanged from the pre-existing Reach locals paragraph diff.
7. Return summary with exact diff scope and validation.

Acceptance:
- index.html nav + hero visibly shift toward Eloqwnt style.
- Missionary Media hero content/CTA targets preserved.
- Mobile hero works.
- sponsor.html untouched except for existing pre-task dirty diff.
```
