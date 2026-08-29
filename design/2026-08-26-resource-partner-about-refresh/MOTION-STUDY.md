# Eloqwnt About motion study

Source: https://www.eloqwnt.com/about
Measured: 2026-08-26
Viewport: 1440 × 900; responsive structure also checked at 390px

## Role

Orient the reader at the start of the About content and reveal one positioning statement without animating the whole section as a spectacle.

## Layout measurement

- About section begins one viewport below the opening hero at desktop.
- Outer section uses 60px horizontal padding at 1440px.
- Content width measured 1305px.
- Header row measured as a two-column grid: 616px left and 689px right.
- The dot label sits at x=60; the statement begins at x=676.
- Media cards follow below in a two-column grid.
- At 390px, label, statement, and media cards collapse to one column; the measured content width was about 336px with about 20px side padding.

## Trigger and states

- Trigger: the statement approaches the reading viewport during downward scroll.
- Initial: each visual line sits inside a clipped block and is translated down by 110%.
- Final: each line reaches `translateY(0)`.
- Observed sample after entering the viewport: the first line was nearly settled by 180ms while later lines still carried 1–9px of travel; all five desktop lines were settled by 600ms.
- Coordination: top-to-bottom line stagger; the section label stays visually quiet.

## Reconstruction for Missionary Media

- Reuse the existing centralized `text-intro-lines` registry.
- Duration: 500ms per line.
- Line stagger: 50ms.
- Easing: the site’s existing `--ease-line` curve.
- Trigger: IntersectionObserver with the existing 20% lower viewport margin.
- Interruption: focus snaps the owned text unit visible; repeated scrolling does not replay it.
- Responsive: the browser rebuilds lines after layout changes through the existing ResizeObserver.
- Reduced motion: text and scroll transforms remain visible and static under `prefers-reduced-motion: reduce`.

Confidence: high for layout, start/end transform, ordering, and settle window; medium for the source’s precise easing because the reference uses runtime GSAP values rather than an exposed named curve.
