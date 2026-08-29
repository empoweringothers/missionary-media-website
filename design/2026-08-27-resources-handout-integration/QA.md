# QA — Resources Handout Integration

## Acceptance result

The selected **Field Guide Release** direction is implemented in the canonical local `public/` tree and remains uncommitted and undeployed pending owner approval.

## Content and asset checks

- The featured asset is the official four-page Letter portrait proof from the active Missionary Media print package.
- Public PDF: `public/assets/resources/digital-outreach-handout.pdf` — 1,870,231 bytes, 4 pages, 612 × 792 points, tagged, unencrypted.
- Public cover: `public/assets/resources/digital-outreach-handout-cover.jpg` — 927 × 1200 pixels.
- The page presents 7 education sources and 6 practical tools from the supplied list.
- The supporting note explicitly describes these links as optional starting points, not a required stack or promised fit.
- The follow section contains Podcasts, Social video, and Spotify coming soon. It does not contain About or a generic YouTube item.

## Automated checks

- `python3 Shared/scripts/mm_phase1_launch_check.py ... --fail-on error` — **0 errors, 16 warnings**. The remaining warnings are review heuristics or pre-existing metadata/CTA items; the report records no broken local references, duplicate IDs, missing image alt attributes, or heading-level skips on `resources/index.html`.
- `python3 -m unittest Shared.scripts.test_mm_phase1_launch_check` — **23 tests passed**.
- `node --check public/assets/site.js` — passed.
- `git diff --check` — passed.
- `pdfinfo public/assets/resources/digital-outreach-handout.pdf` — confirmed the expected four-page Letter PDF.

## Served browser checks

### Desktop, 1280-pixel viewport

- Homepage dropdown labels: Digital Outreach Handout, Education + tools, Podcasts, Social video, Spotify.
- About absent from the Resources dropdown; generic YouTube absent.
- Featured handout card computes to navy (`rgb(7, 20, 38)`), white text, and a two-cell grid span after the cache-version correction.
- Resources H1: `A practical starting point for digital outreach.`
- Cover loaded at 927 × 1200 pixels.
- No broken images, document overflow, or browser console entries.
- Served PDF opened successfully at `/assets/resources/digital-outreach-handout.pdf` with title `digital-outreach-handout.pdf`.

### Keyboard

- Enter on Resources changes `aria-expanded` to `true` and removes `hidden`/`inert` from the panel.
- Escape changes `aria-expanded` to `false`, restores `hidden`/`inert` after the exit transition, and returns focus to Resources.

### Narrow, 375-pixel content viewport

A temporary same-origin QA wrapper constrained the real served pages to a phone viewport and was deleted after the check.

- Resources page: `clientWidth = scrollWidth = 375`; no horizontal overflow.
- Feature and education/tool shelves compute to one 335-pixel column.
- Guide actions compute to a vertical column.
- Mobile Menu control computes to `display: flex`.
- Homepage: `clientWidth = scrollWidth = 375`; no horizontal overflow.
- Mobile direct links include Digital Outreach Handout and Education + tools.
- Mobile Tune in contains Podcasts, Social video, and Spotify coming soon; no generic YouTube item.

## Adversarial recheck

The first refreshed homepage capture still showed the new menu with the old stylesheet because the homepage CSS URL retained its prior cache key. The HTML and both affected CSS URLs now use `v=20260827-resources1`; a new served capture confirmed the intended featured navy handout card. The temporary mobile QA file was removed, the diff remains clean, and no commit, push, or deployment was performed.
