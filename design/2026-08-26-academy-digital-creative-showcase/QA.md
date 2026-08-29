# QA — Academy Digital Creative course showcase

## Owner image-placement correction

This section supersedes the earlier image-placement counts and hero/course-suite statements below; the remaining course-interface checks are retained as historical evidence for the same local build.

- [x] Tabor's teaching image is restored to the full-width hero. Evidence: served hero source is `/assets/academy/academy-hero-tabor-wide.jpg`, natural width 1800; the mobile source loads the 960px crop.
- [x] The owner-selected computer/course/workbook/audio/field-kit composition moved into the Digital Creative section shown in feedback. Evidence: `.academy-plan__suite` loads `/assets/academy/academy-course-suite-cutout.png` at natural width 1240 on desktop and the 860px WebP on mobile.
- [x] Desktop placement inspected at 1440×1000. Evidence: the hero is Tabor + vision; the next cream section places the course suite left and the Digital Creative 101 explanation right before the facts row.
- [x] Mobile placement inspected at 390×844 and 320×720. Evidence: the course suite stacks above the Digital Creative heading, both image variants load, and document scroll width equals client width.
- [x] Final source/runtime checks pass. Evidence: project checker returned 0 errors and 16 manual-review warnings; JavaScript syntax, SVG parse, and `git diff --check` exited 0; browser reported no broken images, missing fragment targets, or console errors.

## Think Media structure and Home Connection image revision

- [x] Complete source course inventoried. Evidence: `Personal_Brain/Knowledge Base/Courses/Video-Ranking-Academy/transcripts/` contains 42 lesson files; every file's `module:` frontmatter produced the complete distribution 11 / 15 / 4 / 9 / 2 / 1 across six modules.
- [x] Source pattern separated from original Missionary Media content. Evidence: `THINK-MEDIA-STRUCTURE-MAP.md` records the organizational pattern, copyright boundary, and original Purpose → Plan → Capture → Send → Learn → Repeat adaptation.
- [x] HTML and SVG agree. Evidence: both surfaces show Start Here plus six modules; the active sample is Module 03, Capture, Lesson 02; the HTML lesson counts total 24 and each module names one observable output.
- [x] Phone-gaze Home Connection image generated and optimized. Evidence: built-in image generation used Tabor's existing owner photo as the identity reference; the selected 1448×1086 result was saved locally as `public/assets/academy/home-connection-working-call-v4.jpg` at 292 KB.
- [x] Desktop and responsive crops inspected. Evidence: at 1440px Tabor is centered and looking toward the phone on its tripod while the laptop, notebook, and headphones remain visible; at 390px and 320px the full 4:3 scene stacks below the copy without face, hand, or card clipping.
- [x] Final checks rerun. Evidence: the project checker returned 0 errors and 16 manual-review warnings before an unrelated untracked `_button-process-qa.html` fixture appeared; a current-public snapshot excluding only that external fixture returned the same 0 / 16 result at `/private/tmp/academy-preview-qa.KkSo8f/`. JavaScript syntax, SVG parse, and `git diff --check` exited 0. The full-public scanner now reports three errors solely in the unrelated fixture, which was left untouched.

## Source review

- [x] HTML semantics and copy reviewed. Evidence: project checker observed one H1, 17 total headings with no level skips, 15 unique IDs, all local Academy references resolved, and alt text on both images.
- [x] SVG parses and contains no external dependencies. Evidence: `xmllint --noout` exited 0; current browser resources show only project-local assets.
- [x] No interview count, percentage, badge, certification, enrollment, completion, or learner-result implication remains in the Academy body. Evidence: negative `rg` contract passed for the removed terms and asset paths.
- [x] Home Connection is always described as one-on-one/live help. Evidence: body and footer use `One-on-one working format`, `live working session`, and `live working path`.
- [x] Church IT is always described as planned. Evidence: body and footer use `Planned course area` and `being planned as a course`.

## Visual review

- [x] Desktop capture inspected. Evidence: `.playwright-mcp/academy-digital-creative-desktop-v2.png` and `.playwright-mcp/academy-interface-desktop.png`.
- [x] Mobile 390px capture inspected. Evidence: `.playwright-mcp/academy-digital-creative-mobile-390.png`.
- [x] Mobile 320px capture inspected. Evidence: `.playwright-mcp/academy-digital-creative-mobile-320.png` and `.playwright-mcp/academy-showcase-mobile-320.png`.
- [x] No clipped SVG, illegible adjacent description, accidental overflow, or broken asset. Evidence: zero body-overflow elements at 1440, 390, and 320px; both images report nonzero natural dimensions; the mobile preview alone has a contained 752px horizontal inspection surface inside a 298px scroller.

## Accessibility and behavior

- [x] Keyboard links have visible focus. Evidence: first eight page links were reached in order and each computed a visible 3px amber outline.
- [x] Heading order and landmark structure reviewed. Evidence: static checker reported no heading skips; page contains header, main, section labels, and footer landmarks in source order.
- [x] Reduced-motion behavior checked. Evidence: hero transition computed to `0s` and all essential course content remained visible.
- [x] Image alternative and adjacent HTML description cover the interface meaning. Evidence: the figure has concise alt text; the neighboring definition list repeats teaching, practice, check, download, review, and capstone details as HTML.

## Static checks

- [x] Project launch check. Evidence: `0 error, 16 warning`; warnings are static review items and pre-existing/unrelated site-wide manual gates, while Academy local links, headings, IDs, metadata basics, and image alts passed.
- [x] JavaScript syntax checks. Evidence: `node --check public/assets/site.js` exited 0; the Academy now loads only `site.js`.
- [x] `git diff --check`. Evidence: exited 0.

## Final adversarial pass

- [x] Every visible number is a planned course-design fact, not invented operating data. Evidence: page numbers are limited to module count, lesson duration, task/check/review count, sample clip duration, shot counts, and the capstone duration.
- [x] Every course-status label matches the current product architecture. Evidence: Digital Creative = working course plan; Home Connection = one-on-one working format; Church IT = planned course area.
- [x] Removing the SVG would still leave an understandable page; viewing the SVG adds useful product evidence. Evidence: the adjacent HTML anatomy and six-module list retain the complete learning path; the SVG supplies the requested interior interface image.
