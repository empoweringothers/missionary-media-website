# Selected Design Specification

## Page architecture

1. **Featured guide** (`#digital-outreach`): catalog label, strong headline, plain-language context, two CTAs, metadata, actual cover, and a five-item contents ledger.
2. **Education and tools** (`#learning-and-tools`): two editorial shelves. Education names trusted starting points; tools state one concrete job.
3. **Tune in** (`#tune-in`): preserve `Tune in` and `Follow the work as it grows.` with podcast, social video, and Spotify status only.

## Featured guide

- Full-width warm-paper section with a two-column grid.
- Cover sits on a deep-navy stage with a small `Resource 01` catalog mark.
- The cover image remains fully visible; no decorative crop.
- Primary action opens the PDF in a new tab. Secondary action uses the download attribute.
- Visible metadata: `4 pages`, `Letter portrait`, `Free PDF`.
- Do not call it a one-page handout.

## Education/tools shelves

- Two columns at desktop, one column below 820px.
- Each item is a ruled text row, not a floating card.
- External arrow and screen-reader text communicate that the destination leaves the site.
- Intro copy says these are optional starting points, not requirements.

## Homepage dropdown

- Keep the left-side `Tune in` / `Follow the work as it grows.` block.
- Right grid contains: featured handout (two-cell span), education + tools, podcasts, social video, Spotify coming soon.
- Remove About and generic YouTube.
- Mobile drawer exposes the featured guide and education/tools directly, then keeps podcast, social video, and Spotify under Tune in.

## Responsive law

- Featured guide: two columns above 900px; single column below.
- Cover stage centers the artifact and caps its width so text remains readable.
- Education/tools: two columns above 820px; one below.
- Dropdown feature span collapses normally at the existing mobile-nav breakpoint.

## Accessibility

- Descriptive link labels distinguish open versus download.
- Decorative index numbers are hidden from assistive technology where redundant.
- Focus styles remain visible against navy and paper backgrounds.
- External links use `noopener noreferrer` and referrer protection.
- Reduced-motion styles eliminate all new transform transitions.
