# Academy Vision, Course Imagery, and Home Connection Revision — 2026-08-26

- [x] AV1 — The first Academy message is a motivating vision statement that names the multilingual direction, the mission, and the intended missionary experience.
  CHECK: `rg -n 'multilingual|language|confidence|mission' public/academy/index.html`
  EXPECT: The hero leads with purpose and experience before lesson mechanics, without promising an enrollment or learner outcome.
  EVIDENCE: The restored Tabor hero now leads with “A future where every missionary can communicate the Gospel clearly—in every language,” followed by the Academy's practical training mission and intended digital-confidence experience; it remains explicitly “being built.”

- [x] AV2 — Restore Tabor's teaching image to the hero and place the owner-selected course-suite composition inside the Digital Creative course-experience section.
  CHECK: `rg -n 'academy-hero-tabor-wide|academy-course-suite-cutout|academy-plan__suite' public/academy/index.html && test -f public/assets/academy/academy-course-suite-cutout.webp`
  EXPECT: The hero uses Tabor's image; the computer, courses, workbook, audio, field kit, and other materials appear with the course-experience copy before the detailed interface.
  EVIDENCE: Browser QA loaded `academy-hero-tabor-wide.jpg` at natural width 1800 in the hero and `academy-course-suite-cutout.png` at natural width 1240 inside `.academy-plan__suite`; the 1440px render shows Tabor full-bleed above and the course/materials image left of the Digital Creative copy.

- [x] AV3 — Remove both numbered learning-rule cards and replace the sample-audio sales copy with a general, reusable Academy lesson pattern beside the Digital Creative 101 interface.
  CHECK: `! rg -n 'Learning rule 0|Record clear voice audio before' public/academy/index.html && rg -n 'Teaching block|Guided task|Knowledge check|Download|Live review|Capstone' public/academy/index.html`
  EXPECT: The interface acts as the Digital Creative 101 example while the adjacent text explains the common course structure.
  EVIDENCE: Source/browser inspection finds zero `.academy-rule` cards and no removed sample-audio headline; the adjacent HTML now explains Teaching block, Guided task, Knowledge check, Download, Repeat, Live review, and Capstone while the SVG remains the Digital Creative 101 visual example.

- [x] AV4 — Rename the seven-module section to only “Course structure” and remove “builds in order” and other competing course-overview labels.
  CHECK: `rg -n '>Course structure<' public/academy/index.html && ! rg -n -i 'builds in order|course overview' public/academy/index.html`
  EXPECT: The seven-module list is the page’s sole course-overview section.
  EVIDENCE: The page has one `Course structure` H2 above the seven-module list; the final negative source check found no `builds in order` or `course overview` text.

- [x] AV5 — Replace the text-only bottom CTA with a Home Connection one-on-one section using an existing Tabor-at-desk visual and accurate live-guidance copy.
  CHECK: `rg -n 'how-we-help-coaching-desk|Home Connection is not an Academy course|one-on-one' public/academy/index.html`
  EXPECT: Home Connection is visibly a live working format, not a course or guided lab.
  EVIDENCE: The 1440px browser render shows `how-we-help-coaching-desk.jpg` on the right of a cream Home Connection card; the copy identifies a live, one-on-one working session with Tabor and does not present Home Connection as a course or guided lab.

- [x] AV6 — Remove the requested giving-arm/tax-deductibility sentence and preserve truthful future-product status throughout the page.
  CHECK: `! rg -n 'A separate giving arm is in formation|Gifts are not tax-deductible at this time' public/academy/index.html`
  EXPECT: No unrequested giving-arm disclosure remains; no live-course, enrollment, certification, or proven-outcome claim is introduced.
  EVIDENCE: Final negative source check found neither requested sentence nor enrollment/certification language; the hero says the Academy is being built, the interface caption says it is planned and not a live platform, and the footer keeps Digital Creative/Church IT status labels.

- [x] AV7 — Verify the actual served page at desktop and mobile widths, then run static, accessibility-oriented, image, overflow, console, and diff checks.
  CHECK: `python3 ../../scripts/mm_phase1_launch_check.py public --fail-on error && git diff --check`
  EXPECT: No clipping, horizontal overflow, broken Academy image, console error, or invalid fragment appears; no commit, push, or deployment occurs.
  EVIDENCE: Actual local browser QA at 1440px, 390px, and 320px showed the intended hero/course image placement, equal client/scroll widths, no broken images, no missing fragment targets, and zero console errors. Project checker returned 0 errors/16 manual warnings; `node --check`, SVG parse, and `git diff --check` exited 0. No commit, push, or deploy was run. Final ledger: 7 of 7 checked.
