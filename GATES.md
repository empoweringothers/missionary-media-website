# Missionary Media resource simplification gates

- [x] G1 — Preserve the approved four-step “Our Process” section and keep all homepage/process links valid.
  CHECK: `rg -n 'id="how-it-works"|id="ps-title"|Our Process' public/index.html`
  EXPECT: The four-step process remains present and directly navigable.
  EVIDENCE: `public/index.html` retains `#how-it-works`, `#ps-title`, and all four `.ps-step` controls; the launch checker reported no fragment errors.

- [x] G2 — Remove the homepage Questions/“Who’s it for” FAQ section and every navigation/footer link that targets it.
  CHECK: `! rg -n 'id="questions"|href="#questions"|questions-title|class="section questions"' public/index.html`
  EXPECT: No FAQ section or dead `#questions` links remain.
  EVIDENCE: A full `public/` sweep returned no `#questions`, `#who-it-is-for`, Questions section, or Who It’s For navigation match; Academy links now target About and Home Connection.

- [x] G3 — Replace the resource navigation experience with clear paths to About, podcasts, social media, Spotify, and the simplified Resources page; no unfinished downloads are advertised as available.
  CHECK: `rg -n 'About|Podcast|Social|Spotify|/resources/' public/index.html`
  EXPECT: Each destination is present with a real link or an explicitly labeled coming-soon state.
  EVIDENCE: Desktop and mobile tune-in navigation now includes About, YouTube Podcasts, YouTube Shorts/social video, the full YouTube channel, Spotify as “Coming soon,” and `/resources/` as “Information is coming.”

- [x] G4 — Simplify `/resources/` to an honest, minimal “information is coming” page with a clear return path and no unready library, resource count, or signup promise.
  CHECK: `rg -n -i 'coming|back to|home' public/resources/index.html && ! rg -n '3 resources|Supporter Map|Two-Hour Weekly|Phone-First|app.kit.com/forms' public/resources/index.html`
  EXPECT: The page says information is coming and removes premature resource-library promises.
  EVIDENCE: `/resources/` renders one coming-soon message and five channel rows; browser inspection found 0 forms and the retired resource-title sweep returned no matches.

- [x] G5 — The edited site passes static, syntax, link-target, and whitespace checks.
  CHECK: `python3 ../../scripts/mm_phase1_launch_check.py public --json-out /tmp/mm-resource-simplify-check.json --markdown-out /tmp/mm-resource-simplify-check.md --fail-on error && node --check public/assets/site.js && git diff --check`
  EXPECT: All commands exit 0.
  EVIDENCE: Checker: 0 errors and 16 manual-review warnings; checker tests: 23/23 passed; both JavaScript syntax checks and `git diff --check` exited 0.

- [x] G6 — Homepage and Resources page render without horizontal overflow or console errors at 1440px, 390px, and 320px, with readable focus states and working destination links.
  CHECK: browser QA against a local HTTP preview at widths 1440, 390, and 320.
  EXPECT: No overflow, console errors, broken local assets, or inaccessible link treatments.
  EVIDENCE: Browser QA measured scroll width equal to client width at all three sizes on both routes; no broken homepage images; 0 console errors; desktop dropdown opened with visible focus and all intended destinations.

- [x] G7 — An adversarial final pass finds no stale resource/Questions claims, no edits to legacy root website files, and no unapproved commit, push, or deployment.
  CHECK: `git status --short && git diff -- public/ README.md netlify.toml`
  EXPECT: Only intended `public/` files plus this gate ledger are changed; production remains untouched.
  EVIDENCE: `git diff --name-only` lists only six canonical `public/` files; task records are new. No legacy root HTML was edited and no commit, push, or deploy was run. The branch’s one-ahead state predates this task.

- [x] G8 — Add a Home Connection partner section that visibly identifies MissionaryConnect.app and does not imply unverified outcomes or partnerships.
  CHECK: `rg -n 'id="home-connection"|MissionaryConnect\.app|Partner' public/index.html`
  EXPECT: One factual partner spotlight is present; no invented partner logo cloud or performance claim is introduced.
  EVIDENCE: The homepage contains `#home-connection`, one Partner spotlight label, the owner-confirmed partnership statement, and a visible MissionaryConnect.app link. The later simplification removed the two-sided scope cards without adding an outcome number, guarantee, or extra partner.

- [x] G9 — The partner layout is adapted from a license-cleared 21st.dev discovery path, with exact provenance and reuse classification recorded before implementation.
  CHECK: `rg -n '21st\.dev|Float UI|license|commit|reconstruct|adapt' design/2026-08-26-resource-partner-about-refresh/SOURCE-LEDGER.md`
  EXPECT: Discovery source, canonical code source, license, pinned revision, copied-versus-reconstructed decision, and required attribution are documented.
  EVIDENCE: `SOURCE-LEDGER.md` records the 21st.dev listing, Float UI file, commit `70824397a5ca6eca3cff1bee37d8a6972d653860`, license terms, reconstruction boundary, and attribution decision.

- [x] G10 — Update the homepage About bar using measured Eloqwnt About layout/motion as a reference while preserving Missionary Media’s own content, brand, accessibility, and reduced-motion behavior.
  CHECK: `rg -n 'id="about"|about-story|prefers-reduced-motion' public/index.html public/assets/site.css public/assets/site.js design/2026-08-26-resource-partner-about-refresh/MOTION-STUDY.md`
  EXPECT: The reference is documented, the section is reconstructed rather than copied, navigation targets `#about`, and motion has a reduced-motion fallback.
  EVIDENCE: `MOTION-STUDY.md` records 1440px and 390px measurements; the rendered About bar uses the two-column/one-column transition and the existing 500ms line-mask registry; reduced-motion rules leave content static and visible.

- [x] G11 — Use the owner-supplied MissionaryConnect globe screenshot as the partner-section visual, served locally with meaningful alternative text and responsive cropping.
  CHECK: `test -f public/assets/missionaryconnect-globe-view.png && rg -n 'missionaryconnect-globe-view\.png|MissionaryConnect.*globe' public/index.html public/assets/site.css`
  EXPECT: The approved image replaces the generic drawn mark without distortion, overflow, or reliance on a third-party hotlink.
  EVIDENCE: The supplied 1920×1032 PNG is stored locally at `public/assets/missionaryconnect-globe-view.png` (1,162,541 bytes). Browser checks loaded it at full natural size with meaningful alt text and no broken images at desktop, 390px, or 320px.

- [x] G12 — Ground the MissionaryConnect partner copy in its current official website and the owner-confirmed partnership, without importing unsupported statistics, outcome guarantees, or pricing.
  CHECK: `rg -n 'communication divide|interactive|prayer|updates|MissionaryConnect' public/index.html design/2026-08-26-resource-partner-about-refresh/SOURCE-LEDGER.md`
  EXPECT: The section explains what each partner contributes and links to the official product; claims remain within the public feature set.
  EVIDENCE: `SOURCE-LEDGER.md` records the official site, official help center, and owner-supplied asset separately. The current copy is limited to the browser/display workflow, profile-claim workflow, and documented church-member behaviors; it contains no MissionaryConnect pricing, rankings, percentages, financial-support claims, or outcome guarantees.

- [x] G13 — Make the Tabor story card travel vertically beside the About copy it supports on desktop, while keeping normal document flow on tablet/mobile.
  CHECK: `rg -n 'about-story__media-column|position: sticky|story-card-parallax' public/assets/site.css public/assets/site.js`
  EXPECT: Native sticky positioning follows the supporting copy within the About frame, reverses naturally when scrolling upward, and releases at the frame boundary.
  EVIDENCE: At the exact 1440px QA viewport, the media column computed as `sticky` with a 100px top boundary: it held at 100px while the frame moved, released at the frame bottom, and returned to 100px when scrolled upward. At 390px and 320px it computed as `static`.

- [x] G14 — The refined About and MissionaryConnect sections pass static, JavaScript, responsive, overflow, image, and console checks with no commit, push, or deployment.
  CHECK: `python3 ../../scripts/mm_phase1_launch_check.py public --fail-on error && node --check public/assets/site.js && git diff --check`
  EXPECT: Checks exit 0; browser QA passes at 1440px, 390px, and 320px; production remains untouched.
  EVIDENCE: 23/23 checker tests passed; the public scan returned 0 errors and 16 manual-review warnings; both JavaScript syntax checks and `git diff --check` passed. Browser QA found equal client/scroll widths at 1440px, 390px, and 320px, no broken images, and no page error on reload. No commit, push, or deploy was run.

- [x] G15 — Inspect every archived public Missionary Media homepage candidate and record the strongest concise About language before rewriting the current section.
  CHECK: `rg -n -i 'about|who we are|missionary media' archive --glob '*/public/index.html' --glob '*.html'`
  EXPECT: The selected copy is traceable to owned archived public material rather than invented from the current weak paragraph.
  EVIDENCE: `ABOUT-ARCHIVE-RECOVERY.md` records all three archived public homepage candidates: the May bundled public page, June pre-fork page, and August pre-redesign page. It traces the restored guide/translator/connector, know-where-to-start, and missionary-reality language to those files.

- [x] G16 — Replace the current About headline and body with a clear, concise, archive-grounded explanation of what Missionary Media is, who it helps, and how it helps.
  CHECK: `rg -n 'id="about-title"|about-story__lead|about-story__copy' public/index.html`
  EXPECT: The headline and first two paragraphs can be understood without internal product language, unsupported outcomes, or repetition.
  EVIDENCE: The public section now leads with “A guide, translator, and connector—beside you,” restores the owner-written “I’m not asking you to become the media person” explanation, and defines the work as translating proven digital systems into coaching and training that fit the mission field.

- [x] G17 — Let the story card rise to the top of its copy track when the site header is hidden, while preserving clearance when the header is visible and keeping mobile flow static.
  CHECK: `rg -n 'site-header\.is-hidden.*about-story__media-column|about-story__media-column|position: sticky|position: static' public/assets/site.css`
  EXPECT: Desktop sticky top is near the viewport edge during downward scroll, returns below the reappearing header on upward scroll, and releases at the About frame boundary.
  EVIDENCE: Live scroll measurement at desktop width: downward scroll hid the header and pinned the card at 16px; upward scroll restored the header and moved the card to 100px; continuing downward released the card at the frame bottom. At 800px, 390px, and 320px the card computed as `static`.

- [x] G18 — The revised About section passes desktop, medium-width, and phone browser checks with no clipping, horizontal overflow, broken image, page error, commit, push, or deployment.
  CHECK: `python3 ../../scripts/mm_phase1_launch_check.py public --fail-on error && node --check public/assets/site.js && git diff --check`
  EXPECT: Static checks exit 0 and browser QA passes at 1440px, 1024px, 800px, 390px, and 320px.
  EVIDENCE: Exact-width harnesses at 1440px, 1024px, 800px, 390px, and 320px measured equal client and scroll widths, title bounds inside the viewport, and no broken images. The 800px layout collapsed to one column; reload produced no page error. Static checks remained 0 errors / 16 warnings and 23/23 tests passed. No commit, push, or deploy was run.

- [x] G19 — Remove the “Area 01 · Current front door” label from Home Connection without removing the section title, partnership copy, or navigation target.
  CHECK: `! rg -n 'Area 01|Current front door' public/index.html`
  EXPECT: The internal product-stage label is absent from the public homepage.
  EVIDENCE: The internal stage label was removed from `public/index.html`; browser text inspection found no rendered match, while `#home-connection`, its section label, partnership copy, and navigation links remain.

- [x] G20 — Remove the public “Prototype” note from Home Connection without weakening or removing the section’s partnership explanation.
  CHECK: `! rg -n 'Prototype:|first engagements are being built and measured|We will share only what the work proves' public/index.html`
  EXPECT: The requested note is absent; the Home Connection heading and MissionaryConnect partnership copy remain.
  EVIDENCE: The negative text sweep exited 0. `#home-connection-title` and both MissionaryConnect partnership paragraphs remain in `public/index.html`.

- [x] G21 — Restore a clear process hierarchy at every responsive breakpoint: step number, then title, then supporting sentence.
  CHECK: `rg -n 'ps-step__label|ps-step__title|ps-step__panel' public/index.html public/assets/site.css`
  EXPECT: Each of the four steps keeps that semantic order and the 768px-and-below layout visually groups the three elements without an artificial tall gap.
  EVIDENCE: All four controls retain label → title → panel DOM order. At 900px and below, the former fixed 13rem step height and `space-between` distribution are replaced by an auto-height content track with 0.35–0.45rem internal gaps; browser bounds confirmed top-to-bottom order at every tested width.

- [x] G22 — Align the responsive process timeline rail in a dedicated column so its dot and line do not overlap, crop, or crowd the step copy.
  CHECK: browser QA of `#how-it-works` at 1440px, 1024px, 800px, 768px, 616px, 390px, and 320px.
  EXPECT: The rail and copy have separate geometry, all four steps align consistently, and no tested width has horizontal overflow.
  EVIDENCE: Exact-width browser measurements retained four in-bounds steps and zero overflow at all seven widths. At each vertical-timeline width, every rail ended left of its content track; the tightest measured rail-to-copy clearance was 12px at 320px. Visual inspection at the submitted 616px problem width showed consistent rail and copy alignment.

- [x] G23 — The Home Connection deletion and process refinement pass static checks and a browser reload without page errors; no commit, push, or deployment occurs.
  CHECK: `python3 ../../scripts/test_mm_phase1_launch_check.py && python3 ../../scripts/mm_phase1_launch_check.py public --fail-on error && node --check public/assets/site.js && git diff --check`
  EXPECT: All checks exit 0 and the local preview reloads without a page error.
  EVIDENCE: All 23 checker tests passed; the final public scan returned 0 errors and 16 manual-review warnings; JavaScript syntax and `git diff --check` passed; reload monitoring found no page error. The temporary responsive harness was removed, and no commit, push, or deployment was run.

- [x] G24 — Refocus the Home Connection section on the MissionaryConnect partnership and use the owner-supplied communication-divide paragraph as its lead.
  CHECK: `rg -n 'Home Connection|Partner spotlight|We partner with MissionaryConnect to help close one of missions' public/index.html`
  EXPECT: The section has one clear Home Connection/partner story rather than competing coaching, product-feature, and scope-card messages.
  EVIDENCE: `public/index.html` now presents the Home Connection label and headline, one Partner spotlight label, the requested communication-divide paragraph as the lead, two explanatory paragraphs, and the linked MissionaryConnect visual. The competing coaching-definition paragraph and scope cards are gone.

- [x] G25 — Ground the following two public paragraphs in MissionaryConnect’s current official website and record the source-to-copy mapping.
  CHECK: `rg -n 'MissionaryConnect|fetched|official' design/2026-08-26-resource-partner-about-refresh/SOURCE-LEDGER.md public/index.html`
  EXPECT: Both paragraphs paraphrase current official product information without importing unsupported outcomes, statistics, pricing, or private claims.
  EVIDENCE: The two paragraphs paraphrase the official overview and How MissionaryConnect Works pages: one centralized church display available on touchscreens, televisions, and browsers; missionaries can create or claim profiles and keep them current; members can learn where they serve and how to pray. `SOURCE-LEDGER.md` maps each sentence and explicitly excludes pricing and impact claims.

- [x] G26 — Remove the requested Prototype sentence, the duplicate locations/features sentence, the “What churches can see” block, and the “What missionaries can send” block.
  CHECK: `! rg -n 'Prototype:|first engagements are being built and measured|Locations, missionary profiles, prayer requests, letters, photos, and video|What churches can see|What missionaries can send|Clearer updates, real ministry stories' public/index.html`
  EXPECT: None of the specified copy remains in the rendered homepage.
  EVIDENCE: The exact negative sweep exited 0. Browser text inspection at all six widths also found no Prototype sentence, scope heading, or removed feature-list copy.

- [x] G27 — Simplify the partner markup and styling without leaving empty cards, stale motion selectors, broken links, missing images, or responsive overflow.
  CHECK: browser QA of `#home-connection` at desktop, tablet, and phone widths plus a stale-selector sweep in HTML/CSS/JS.
  EXPECT: The image and MissionaryConnect link remain useful, the copy column reads cleanly, and removed card markup has no public residue.
  EVIDENCE: Removed `.partner-showcase__head`, `.partner-scope-grid`, `.home-connection__vision`, and `.boundary-note` markup/styles/motion selectors. Browser checks at 1440px, 1024px, 820px, 768px, 390px, and 320px found zero overflow, zero scope cards, a loaded 1920×1032 image, the exact official link, and no copy/visual overlap.

- [x] G28 — The focused Home Connection revision passes static, syntax, whitespace, and browser-error checks; no commit, push, or deployment occurs.
  CHECK: `python3 ../../scripts/test_mm_phase1_launch_check.py && python3 ../../scripts/mm_phase1_launch_check.py public --fail-on error && node --check public/assets/site.js && git diff --check`
  EXPECT: All checks exit 0 and local browser verification reports no page error.
  EVIDENCE: All 23 checker tests passed; the final public scan returned 0 errors and 16 manual-review warnings; JavaScript syntax and `git diff --check` passed; reload monitoring found no page error. The temporary responsive harness was removed, and no commit, push, or deployment was run.

- [x] G29 — Restore the Academy teaser’s course-preview control as a clearly visible link in its default, hover, and keyboard-focus states.
  CHECK: browser computed-style and visual QA for `.academy-teaser__actions .academy-text-link`.
  EXPECT: The label and arrow contrast against the paper card, the underline remains visible, and keyboard focus is unmistakable rather than rendering as a thin line.
  EVIDENCE: The link now computes to ink on paper at 18.31:1 contrast with a blue underline; hover computes to blue-dark, and real keyboard focus (`:focus-visible`) computes to a 3px orange outline with a 3px offset. The rendered screenshot shows the full label and arrow.

- [x] G30 — Keep both Academy teaser controls readable and contained at desktop, tablet, and phone widths without altering the form fields, note, action, or consent language.
  CHECK: responsive browser QA at 1440px, 1024px, 768px, 390px, and 320px plus an HTML diff review.
  EXPECT: The submit button and course-preview link are each at least 48px high, fit the available width, do not overflow, and retain their existing labels and submission contract.
  EVIDENCE: Exact-width browser frames measured both controls inside the card with no section overflow at all five widths. Each is at least 48px high; the 320px submit label wraps within a 62.53px control. Browser readback preserved the two required fields, the interest-only note, and Kit action `9830738`.

- [x] G31 — The scoped Academy button repair passes static, syntax, whitespace, contrast, and browser-error checks; no commit, push, deployment, or service configuration change occurs.
  CHECK: `python3 ../../scripts/test_mm_phase1_launch_check.py && python3 ../../scripts/mm_phase1_launch_check.py public --fail-on error && node --check public/assets/site.js && git diff --check`
  EXPECT: All checks exit 0; browser reload reports no page error; only presentation is changed.
  EVIDENCE: All 23 checker tests passed; the public scan returned 0 errors and 16 manual-review warnings; JavaScript syntax and `git diff --check` exited 0. Reload monitoring found no page error or console log. No form submission, service change, commit, push, or deployment was performed.

- [x] G32 — Keep every Our Process step fully inside the narrow viewport, including its right edge, while preserving the rail-to-copy hierarchy.
  CHECK: browser geometry and visual QA for `#how-it-works` at 616px, 390px, 320px, and a sub-320px stress width matching the supplied screenshot.
  EXPECT: The card, step titles, and supporting sentences wrap within the viewport; no content is clipped on either edge and the rail remains separate from the copy.
  EVIDENCE: At exact 616px, 390px, 320px, and 206px viewports, the 0.97 entrance-scale card stayed inside the section from its first armed frame onward. All four steps remained in bounds; every rail ended before its copy, and title/panel scroll widths were no greater than their client widths, including “Plan Development” at 206px.

## Other active task ledgers

- Academy Vision, Course Imagery, and Home Connection Revision: `gates/academy-vision-course-imagery-home-connection-2026-08-26.md`
- Academy Think Media Structure and Home Connection Crop: `gates/academy-think-media-structure-and-photo-crop-2026-08-26.md`
- Academy Home Connection Phone Gaze: `gates/academy-home-connection-phone-gaze-2026-08-27.md`
