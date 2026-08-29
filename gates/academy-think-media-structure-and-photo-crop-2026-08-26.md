# Academy Think Media Structure and Home Connection Crop — 2026-08-26

- [x] TM1 — Locate and inventory the user-downloaded Think Media course and all available modules without relying on remembered or reconstructed titles.
  CHECK: the selected source path and complete module/lesson count are recorded in the Academy design notes.
  EXPECT: no module is silently sampled or omitted.
  EVIDENCE: `design/2026-08-26-academy-digital-creative-showcase/THINK-MEDIA-STRUCTURE-MAP.md` records the selected local archive and every-module distribution. Direct count: 42 lesson files; frontmatter distribution 11 / 15 / 4 / 9 / 2 / 1 across modules 1–6.

- [x] TM2 — Extract the source course's structural pattern without republishing proprietary lesson content.
  CHECK: a source-to-structure map distinguishes Think Media organization from Missionary Media's original course names, outcomes, and tasks.
  EXPECT: hierarchy and learning flow may inform the Academy; protected lesson copy is not reproduced.
  EVIDENCE: `THINK-MEDIA-STRUCTURE-MAP.md` separates the six-stage source pattern, explicit copyright boundary, and original Missionary Media lesson groups and outputs; no transcript copy or proprietary framework label appears in the public page.

- [x] TM3 — Replace the vague Digital Creative 101 seven-module outline with a clear, specific course map grounded in that pattern.
  CHECK: every visible module has a distinct purpose, concrete lesson group, and observable learner output.
  EXPECT: no vague label could be swapped into another module without changing meaning.
  EVIDENCE: `public/academy/index.html` contains 6 course-map items and 24 total guided lessons. Each item names the lesson group and one observable module output; the former vague labels return zero matches.

- [x] TM4 — Update the detailed course-interface visual so its navigation and active lesson agree with the revised HTML course map.
  CHECK: SVG and adjacent HTML use the same module count, names, active lesson, and completion path.
  EXPECT: the image provides course evidence instead of contradicting the page.
  EVIDENCE: `public/assets/academy/digital-creative-course-preview.svg` shows Start Here plus Purpose, Plan, Capture, Send, Learn, and Repeat; Module 03 Capture / Lesson 02 is active and `xmllint --noout` passes.

- [x] TM5 — Replace the forced Home Connection crop with a user-requested generated working-call image that centers Tabor naturally.
  CHECK: desktop and mobile browser captures show Tabor centered with the phone, laptop, notebook, and headphones visible and no face or hand clipping.
  EXPECT: the project owns a local optimized asset, the CSS requires no artificial zoom, and the card has no layout overflow.
  EVIDENCE: `public/assets/academy/home-connection-working-call-v3.jpg` is a local 1448×1086, 272 KB asset; line 198 of `public/academy/index.html` references it. Browser inspection at 1440px, 390px, and 320px shows Tabor centered with direct camera eye contact, working-call props intact, and no card clipping; console error log is empty.

- [x] TM6 — Run final source, browser, responsive, image, console, accessibility-oriented, and diff checks with no commit, push, or deployment.
  CHECK: `python3 ../../scripts/mm_phase1_launch_check.py public --fail-on error && node --check public/assets/site.js && xmllint --noout public/assets/academy/digital-creative-course-preview.svg && git diff --check`
  EXPECT: checks exit 0; 1440px, 390px, and 320px have no broken assets or document overflow.
  EVIDENCE: the combined command exited 0 before an unrelated untracked `public/_button-process-qa.html` fixture appeared; an isolated current-public snapshot excluding only that fixture also exited 0 at `/private/tmp/academy-preview-qa.KkSo8f/` with 0 errors and 16 manual-review warnings. The current full-public scan's 3 errors all belong to that unrelated fixture, which was left untouched. Browser widths 1440, 390, and 320 were inspected, image assets loaded, no horizontal break was visible, and `previewTab2.dev.logs({levels:['error']})` returned `[]`. No commit, push, or deployment was run.
