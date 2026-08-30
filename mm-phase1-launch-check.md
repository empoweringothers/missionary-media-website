# Missionary Media Phase 1 launch check

> [!caution] Static analysis only — not launch approval
> This checker supports human review. It does not prove visual quality, accessibility or legal compliance, privacy/security fitness, copy truth, permissions, external URL operation, or publication authorization.

## Result

- Static gate: **static_review_items**
- Launch authorized: **No**
- Findings: **0 error · 9 warning · 0 info**
- Target: `/Users/tabornormoyle/Desktop/Empowering Others/Shared/repos/missionary-media-website/public`
- Config SHA-256: `9108d3430963bae71c363e41f3db78c5e287aa46c6059b3802d7125797a4e304`

## Warning findings

### `metadata.canonical_missing` — No non-empty canonical link was observed.

- Location: `404.html`
- Evidence class: `deterministic-static`
- Next check: Add the approved production canonical URL before publication.

### `metadata.open_graph_missing` — Required Open Graph fields were not observed.

- Location: `404.html`
- Evidence class: `deterministic-static`
- Evidence: “og:title, og:description, og:image, og:url”
- Next check: Add approved og:title, og:description, og:image, and og:url values before publication.

### `focus.css_visually_hidden` — Focusable <a> matches CSS selector '.header-cta' with opacity/visibility/pointer suppression.

- Location: `academy/index.html:44`
- Evidence class: `heuristic-static`
- Evidence: “position: absolute; top: -35%; bottom: -35%; left: -55%; z-index: 1; width: 42%; border-radius: inherit; background: linear-gradient(102deg, rgba(0, 91, 232, 0) 0%, rgba(0, 91, 232, 0.1) 26%, rgba(255, 255, 255, 0.62) 5…”
- Next check: Verify computed visibility and tab order in every responsive state; static CSS matching cannot prove behavior.

### `focus.css_visually_hidden` — Focusable <a> matches CSS selector '.header-cta' with opacity/visibility/pointer suppression.

- Location: `index.html:62`
- Evidence class: `heuristic-static`
- Evidence: “position: absolute; top: -35%; bottom: -35%; left: -55%; z-index: 1; width: 42%; border-radius: inherit; background: linear-gradient(102deg, rgba(0, 91, 232, 0) 0%, rgba(0, 91, 232, 0.1) 26%, rgba(255, 255, 255, 0.62) 5…”
- Next check: Verify computed visibility and tab order in every responsive state; static CSS matching cannot prove behavior.

### `focus.css_visually_hidden` — Focusable <a> matches CSS selector '.about-story__cta' with opacity/visibility/pointer suppression.

- Location: `index.html:230`
- Evidence class: `heuristic-static`
- Evidence: “position: absolute; top: -35%; bottom: -35%; left: -55%; z-index: 1; width: 42%; border-radius: inherit; background: linear-gradient(102deg, rgba(0, 91, 232, 0) 0%, rgba(0, 91, 232, 0.1) 26%, rgba(255, 255, 255, 0.62) 5…”
- Next check: Verify computed visibility and tab order in every responsive state; static CSS matching cannot prove behavior.

### `cta.non_link_behavior_unverified` — A matching CTA is not a direct link; submission and fallback behavior require browser review.

- Location: `index.html:473`
- Evidence class: `heuristic-static`
- Evidence: “Book a free 30-min call → https://calendly.com/missionarymediahub/30min”
- Next check: Prefer a resilient direct link or verify the form/JavaScript behavior and fallback.

### `focus.css_visually_hidden` — Focusable <a> matches CSS selector '.header-cta' with opacity/visibility/pointer suppression.

- Location: `resources/index.html:43`
- Evidence class: `heuristic-static`
- Evidence: “position: absolute; top: -35%; bottom: -35%; left: -55%; z-index: 1; width: 42%; border-radius: inherit; background: linear-gradient(102deg, rgba(0, 91, 232, 0) 0%, rgba(0, 91, 232, 0.1) 26%, rgba(255, 255, 255, 0.62) 5…”
- Next check: Verify computed visibility and tab order in every responsive state; static CSS matching cannot prove behavior.

### `metadata.canonical_missing` — No non-empty canonical link was observed.

- Location: `thanks.html`
- Evidence class: `deterministic-static`
- Next check: Add the approved production canonical URL before publication.

### `metadata.open_graph_missing` — Required Open Graph fields were not observed.

- Location: `thanks.html`
- Evidence class: `deterministic-static`
- Evidence: “og:title, og:description, og:image, og:url”
- Next check: Add approved og:title, og:description, og:image, and og:url values before publication.

## Observed static evidence

| Check | Observation | Evidence class | Location |
|---|---|---|---|
| `claims.no_numerical_candidates` | No visible numerical-claim candidate matched the configured patterns. | `heuristic-static` | `index.html` |
| `entity.current_tax_disclosure` | Configured phrase was observed in visible DOM text. Pattern: \bGifts are not tax[- ]deductible at this time\b | `deterministic-static` | `index.html:485` |
| `entity.for_profit_disclosure` | Configured phrase was observed in visible DOM text. Pattern: \bMissionary Media is a for-profit company\b | `deterministic-static` | `index.html:485` |
| `focus.no_obvious_hidden_controls` | No direct aria-hidden/focusable or opacity-hidden/focusable contradiction was observed. | `heuristic-static` | `404.html` |
| `focus.no_obvious_hidden_controls` | No direct aria-hidden/focusable or opacity-hidden/focusable contradiction was observed. | `heuristic-static` | `thanks.html` |
| `font.stacks_declared` | Observed configured primary, fallback, and generic family names together in 1 CSS stacks. Ordering and runtime rendering are not verified. | `heuristic-static` | `index.html` |
| `font.synthesis_disabled` | Observed font-synthesis: none in CSS. | `deterministic-static` | `index.html` |
| `heading.sequence_observed` | Observed one H1 and 1 total headings with no level skips. | `heuristic-static` | `404.html:22` |
| `heading.sequence_observed` | Observed one H1 and 11 total headings with no level skips. | `heuristic-static` | `academy/index.html:110` |
| `heading.sequence_observed` | Observed one H1 and 11 total headings with no level skips. | `heuristic-static` | `index.html:118` |
| `heading.sequence_observed` | Observed one H1 and 5 total headings with no level skips. | `heuristic-static` | `resources/index.html:95` |
| `heading.sequence_observed` | Observed one H1 and 1 total headings with no level skips. | `heuristic-static` | `thanks.html:22` |
| `html.ids_unique` | Observed 1 non-empty ids with no exact duplicates. | `deterministic-static` | `404.html` |
| `html.ids_unique` | Observed 14 non-empty ids with no exact duplicates. | `deterministic-static` | `academy/index.html` |
| `html.ids_unique` | Observed 35 non-empty ids with no exact duplicates. | `deterministic-static` | `index.html` |
| `html.ids_unique` | Observed 13 non-empty ids with no exact duplicates. | `deterministic-static` | `resources/index.html` |
| `html.ids_unique` | Observed 1 non-empty ids with no exact duplicates. | `deterministic-static` | `thanks.html` |
| `image.alt_attributes_present` | All 4 images have alt attributes; 0 use empty alt text. Decorative intent and alt quality are not verified. | `deterministic-static` | `academy/index.html` |
| `image.alt_attributes_present` | All 6 images have alt attributes; 3 use empty alt text. Decorative intent and alt quality are not verified. | `deterministic-static` | `index.html` |
| `image.alt_attributes_present` | All 1 images have alt attributes; 0 use empty alt text. Decorative intent and alt quality are not verified. | `deterministic-static` | `resources/index.html` |
| `link.local_references_resolved` | Observed 6 resolvable local asset/link references and no missing local target. | `deterministic-static` | `404.html` |
| `link.local_references_resolved` | Observed 49 resolvable local asset/link references and no missing local target. | `deterministic-static` | `academy/index.html` |
| `link.local_references_resolved` | Observed 53 resolvable local asset/link references and no missing local target. | `deterministic-static` | `index.html` |
| `link.local_references_resolved` | Observed 36 resolvable local asset/link references and no missing local target. | `deterministic-static` | `resources/index.html` |
| `link.local_references_resolved` | Observed 6 resolvable local asset/link references and no missing local target. | `deterministic-static` | `thanks.html` |
| `metadata.basic_present` | Observed doctype, html language, charset, title, description, and viewport metadata. | `deterministic-static` | `404.html:1` |
| `metadata.basic_present` | Observed doctype, html language, charset, title, description, and viewport metadata. | `deterministic-static` | `academy/index.html:1` |
| `metadata.basic_present` | Observed doctype, html language, charset, title, description, and viewport metadata. | `deterministic-static` | `index.html:1` |
| `metadata.basic_present` | Observed doctype, html language, charset, title, description, and viewport metadata. | `deterministic-static` | `resources/index.html:1` |
| `metadata.basic_present` | Observed doctype, html language, charset, title, description, and viewport metadata. | `deterministic-static` | `thanks.html:1` |
| `motion.reduced_rule_observed` | Observed a non-empty prefers-reduced-motion: reduce CSS rule. Runtime motion is not verified. | `heuristic-static` | `assets/site.css:3947` |
| `offer.lifecycle_sequence` | Observed configured lifecycle labels in DOM order: Now → Prototype → Next → Later. Visual prominence is not verified. | `heuristic-static` | `index.html:271` |
| `offer.coaching_available_now` | Configured phrase was observed in visible DOM text. Pattern: \bAvailable now\b | `deterministic-static` | `index.html:351` |
| `offer.coaching_name` | Configured phrase was observed in visible DOM text. Pattern: \bOne-on-one coaching\b | `deterministic-static` | `index.html:352` |
| `offer.monthly_training_live` | Configured phrase was observed in visible DOM text. Pattern: \bLive each month\b | `deterministic-static` | `index.html:356` |
| `offer.monthly_training_name` | Configured phrase was observed in visible DOM text. Pattern: \bMonthly live training\b | `deterministic-static` | `index.html:357` |
| `resource.references_observed` | Observed 2 resource/download references. File usefulness and approval are not verified. | `deterministic-static` | `index.html:51` |

## Configured suppressions

| Check | Allowlist rule | Location | Evidence |
|---|---|---|---|
| `entity.tax_deductibility_claim` | `inline:\bGifts are not tax[ -]?deductible at this time\b` | `index.html:485` | A separate giving arm is in formation. Gifts are not tax-deductible at this time. |

## Manual reviews still required

- **Privacy notice and Kit email collection** (owner: Tabor / qualified privacy reviewer): Confirm notice, consent language, data handling, retention, unsubscribe behavior, and any required privacy-policy link for the two forms posting to https://app.kit.com/forms/9830738/subscriptions.
- **Calendly intake privacy and data transfer** (owner: Tabor / qualified privacy reviewer): Exercise https://calendly.com/missionarymediahub/30min and confirm the questionnaire context transfers as described, sensitive-data warning remains visible, the site keeps no copy, and Calendly disclosures are sufficient.
- **Image, video, icon, and font rights** (owner: Tabor): Confirm provenance and public/commercial-use rights for every image, the AI-generated door/hero asset, story and podcast media, icons, logo, and Source Sans 3 font files.
- **External destination operations** (owner: Tabor): Exercise the Kit subscription endpoint, Calendly booking, https://forms.gle/B32ghbgiyGa1qHLUA, and public YouTube destinations end to end; confirm ownership, availability, confirmations, and failure paths.
- **Resource inventory, readiness, and destinations** (owner: Tabor): Confirm The Supporter Map, The Two-Hour Weekly Update Rhythm, and Phone-First Editing on Slow Internet remain honestly labeled in preparation; verify each finished file, format, rights record, review date, and public URL before adding any download action.
- **Production source and rollback** (owner: Tabor): Confirm the Netlify production site is connected to the intended GitHub repository/branch and publish directory, preserve the current known-good deploy for rollback, and prevent another connected repository from overwriting it.
- **Keyboard, focus, contrast, and reduced-motion runtime review** (owner: Tabor / accessibility reviewer): Browser-test keyboard order, visible focus, menus/dialogs/forms, responsive states, contrast, screen-reader names, and both CSS and JavaScript behavior with reduced motion enabled.
- **Search and social metadata operations** (owner: Tabor): Decide the canonical apex/www URL, add and validate canonical/Open Graph metadata where appropriate, and confirm robots.txt and sitemap policy before treating search readiness as complete.
- **Entity and tax wording** (owner: Tabor / qualified legal or tax reviewer): Confirm the for-profit, giving-arm-in-formation, and gifts-not-tax-deductible wording remains accurate; the checker only blocks obvious contradictory public phrases.
- **Owner publication approval** (owner: Tabor): Review the rendered production site and explicitly approve publication. A clean static report is not launch authorization.

## Static-analysis limitations

- The checker performs static analysis only and always reports launch_authorized=false.
- It does not fetch or submit Kit, Calendly, Google Forms, YouTube, or any other external destination.
- It cannot prove privacy, security, legal/entity or tax compliance, accessibility conformance, copy truth, media rights, or owner approval.
- It observes source-level focus and reduced-motion signals but cannot prove computed styles, JavaScript state, visual order, responsive behavior, or assistive-technology output.
- The resource-reference check intentionally permits zero downloads while the public inventory says resources are in preparation; each future resource needs a verified file, URL, rights record, and review date.
- Missing canonical and Open Graph metadata are review warnings for the current live files, not silent approval; malformed or duplicate canonical metadata remains blocking.
- Approved external destination entries document the current production contract; only the matching discovery-call CTA destination is statically enforced by the CTA checker.

## Reproduction

- Tool: `mm_phase1_launch_check 1.0.1`
- Checker SHA-256: `6789a8550d70a4d59993b4cc04f7d5ab5375aa3f07048fe63664bc9cb72215e2`
- Generated: `2026-08-30T14:43:39.442624+00:00`
- Input HTML files:
  - `404.html` — SHA-256 `2c9531cf54294cc4b21cce5f6d3c1e7ddbc2eae516ae7f5990c20bfa74d6e442`
  - `academy/index.html` — SHA-256 `587dc4a0abb82c8894890642b0411ce2761863511bcf263661cd2df61696e170`
  - `index.html` — SHA-256 `464077e543e5cf251f636dc63b1561952455134e6c78a3817a572dd75e581f61`
  - `resources/index.html` — SHA-256 `ee495f6d082a7c55e44496707e3f89e84702f9e943963df99649b36a5e82393d`
  - `thanks.html` — SHA-256 `c633dc27d89d629c7e1dd0a3fbcc25ea1279f5e76adc5973f75c8c87c3a3cb44`
- Directly linked local stylesheets:
  - `assets/academy-course-preview.css` — SHA-256 `64c06048a2030d6ff6724738e8803b97497903f5d65dde94d5d1585523166a34`
  - `assets/academy-library.css` — SHA-256 `1c5109cedf2038d71af3b37db0c74274e095434e26a3a050dbd9004084384a0e`
  - `assets/academy.css` — SHA-256 `906f7e61950ac314fc9c5f694f0ada100845d17af3cb541bbff71e3987a792a8`
  - `assets/resources.css` — SHA-256 `fc25cb9387beabe690e45b3a769f9baca88cc2a44b69e5ac185a1d11f04eb172`
  - `assets/site.css` — SHA-256 `18258bfdf25717a90583cee0fc74d9df918693ed59a9dacd63ea3500ac836712`

Static analysis only. This report does not prove launch readiness, visual quality, accessibility conformance, privacy/security fitness, legal/entity compliance, copy truth, permissions, external destination operation, or publication approval.
