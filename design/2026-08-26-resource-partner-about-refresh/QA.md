# QA ledger

Status: passed locally; no publication action taken

## Static checks

- [x] Homepage targets and removed-section sweep — `#about`, `#how-it-works`, and `#home-connection` resolve; no `#questions` or `#who-it-is-for` remains in `public/`.
- [x] Resources promise sweep — no retired resource titles, Kit form, library count, or download promise remains on `/resources/`.
- [x] JavaScript syntax — `node --check` passed for `site.js` and `academy-library.js`.
- [x] Launch checker — 0 errors, 16 manual-review warnings; all 23 checker unit tests passed.
- [x] `git diff --check` — exit 0.

## Browser checks

- [x] Homepage at 1440px — About and Home Connection inspected; no broken images or overflow.
- [x] Homepage at 390px — About and Home Connection collapse to one column; partner tiles fit.
- [x] Homepage at 320px — 305px layout viewport, 305px scroll width; partner name fits on one line.
- [x] Resources at 1440px — two-column coming-soon layout inspected.
- [x] Resources at 390px — one-column layout, no overflow.
- [x] Resources at 320px — 305px layout viewport, 305px scroll width, five channel rows, no forms.
- [x] About navigation and motion — `#about` resolves; line reveal settled visibly; reduced-motion CSS and JavaScript paths remain in place.
- [x] Home Connection partner link — exact destination is `https://missionaryconnect.app/`; text-only treatment avoids copying partner artwork.
- [x] No console errors or horizontal overflow — browser logs returned no errors on homepage or Resources.

## Final adversarial review

- [x] No fake partner/logo claim — one locally confirmed partnership only; CSS globe is original and generic.
- [x] No unverified Spotify destination — Spotify is a non-link marked “Coming soon.”
- [x] No stale Questions/Who’s It For link — academy desktop/mobile links were updated too.
- [x] No unfinished resources promoted as available — page says information is coming and carries no signup form.
- [x] No legacy root edit, commit, push, or deploy — diff is limited to canonical `public/`, design records, and the task ledger; branch remains ahead by the pre-existing commit.

## Partner image and About tracking refinement

- [x] Owner-supplied MissionaryConnect screenshot is local, 1920×1032, and loaded without broken-image fallback.
- [x] Partner copy is limited to the official site&rsquo;s published map/globe, profile, prayer-request, letter, photo, and video features; no product statistic, price, ranking, or outcome guarantee was imported.
- [x] Story media column uses native sticky positioning at desktop widths, stays within the About frame, follows upward scroll naturally, and returns to static flow below 821px.
- [x] Exact-width harness checks: 1440px → 1425px client/scroll width; 390px → 375px client/scroll width; 320px → 305px client/scroll width.
- [x] Partner name fits on one line at 320px; source image keeps its 1920×1032 natural dimensions; no page error or broken image was observed.

## Archived About copy and full-rise refinement

- [x] Inspected all three archived public homepage candidates and recorded the selected owner-written language in `ABOUT-ARCHIVE-RECOVERY.md`.
- [x] Replaced the vague About headline and paragraphs with the archive-grounded guide / translator / connector position and the mission-field-versus-U.S.-marketing-playbook distinction.
- [x] Hidden-header desktop state pins the story card at 16px; visible-header state pins it at 100px; the card releases at the About frame boundary.
- [x] 1440px, 1024px, 800px, 390px, and 320px harnesses showed no title clipping or horizontal overflow; 800px and below collapse to one column.
- [x] Removed “Area 01 · Current front door” while retaining the Home Connection title, target, partner visual, and supporting copy.

## Process hierarchy and Home Connection cleanup

- [x] Removed the requested Home Connection “Prototype” paragraph; the section heading and two MissionaryConnect partnership paragraphs remain.
- [x] Changed the process layout to a vertical timeline at 900px and below, keeping each step number directly above its title and supporting sentence.
- [x] Gave the timeline rail its own grid column; measured rail-to-copy clearance remained positive at every vertical-timeline width tested.
- [x] Exact-width browser checks at 1440px, 1024px, 800px, 768px, 616px, 390px, and 320px retained four steps, reported the number/title/description in top-to-bottom order, kept every step inside the viewport, and measured zero horizontal overflow.
- [x] The 616px visual inspection specifically reproduced the submitted problem width and showed a consistent rail, aligned copy edges, and no detached next-step label.
- [x] Reload monitoring returned no page error; the launch checker remained at 0 errors and 16 manual-review warnings, all 23 checker tests passed, JavaScript syntax passed, and `git diff --check` passed.

## Focused Home Connection partner story

- [x] The copy column now contains only the Home Connection label, the existing supporter-connection headline, one Partner spotlight label, the owner-supplied partnership statement, and two paragraphs grounded in MissionaryConnect’s official site and help center.
- [x] Removed the coaching-definition paragraph, duplicate visual-feature sentence, Prototype sentence, “What churches can see” card, and “What missionaries can send” card.
- [x] Removed the corresponding card/head CSS and JavaScript reveal selectors; the remaining partner showcase contains one linked product card and no empty wrapper.
- [x] Official-source mapping is recorded in `SOURCE-LEDGER.md`; pricing, rankings, percentages, financial-support claims, and prayer-engagement lift were deliberately excluded.
- [x] Exact-width browser checks at 1440px, 1024px, 820px, 768px, 390px, and 320px found one Partner spotlight label, five copy paragraphs, zero scope cards, zero stale requested phrases, a loaded 1920×1032 image, the exact official link, and zero horizontal overflow.
- [x] Desktop and 390px visual inspections showed a clear text hierarchy and the product card following without an empty card region; reload monitoring returned no page error.

## Academy control visibility and process-edge follow-up

- [x] Traced the apparent missing “button” to the `See the course preview` link: its shared Academy rule supplied white text for the dark Academy hero, leaving only the cyan underline visible on the homepage’s paper card.
- [x] Scoped the homepage teaser link to ink text with a blue underline; measured default contrast is 18.31:1 against the paper card, hover resolves to blue, and keyboard focus shows a 3px orange outline with a 3px offset.
- [x] The existing Kit submit button remains opaque ink with white text at 18.47:1 contrast. Its label, the first-name/email fields, required state, consent note, and `https://app.kit.com/forms/9830738/subscriptions` action are unchanged.
- [x] Exact-width settled checks at 1440px, 1024px, 768px, 390px, and 320px kept both Academy controls inside the card with no section overflow; each control is at least 48px high, and the 320px submit label wraps inside a 62.53px-high button.
- [x] Replaced the process card’s narrow-screen oversized entrance with an inside 0.97 scale and added emergency wrapping for long step words. At 616px, 390px, 320px, and the supplied-layout stress width of 206px, every card edge stayed inside the section during the entrance, every rail ended before its copy, and every title and panel fit its own content track.
- [x] The homepage now version-busts the two edited CSS assets so the local `file://` review does not retain the old white-link or oversized-process rules. Reload monitoring returned no page error or console log.
- [x] Final checks: 23/23 checker tests passed; public scan returned 0 errors and 16 manual-review warnings; JavaScript syntax and `git diff --check` passed. No commit, push, deployment, form submission, or service configuration change occurred.
