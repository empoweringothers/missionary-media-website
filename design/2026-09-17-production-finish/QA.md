# Production finish — 2026-09-17

Audience: missionaries, with church/mission-board leaders and supporters as secondary visitors. Primary action: begin a free 30-minute conversation with Tabor, then choose a time in Calendly. Scope: finish PR #15 and publish to the existing Cloudflare production site, missionarymedia.io, as requested by the owner.

## Assessment of production and the PR

The old production headline, “I translate digital frustration into digital fruitfulness,” described the aspiration but left visitors to infer the service. The PR's “I help missionaries handle technology so they have more time for ministry” makes the audience and benefit explicit. Retained that direction, the blue/ink palette, real Tabor photography, interview excerpts, and restrained narrative motion.

Finished the supporting copy and hierarchy: concrete service descriptions, a clear free-call/paid-work distinction, founder introduction with real photography and story video, FAQ before the final intake form. Removed draft-facing qualifications and a placeholder Instagram label. All five primary pages now use “Let’s Chat”; the misleading waitlist label was removed because those controls open a booking intake, not a subscription form. Academy courses are clearly described as in development. Resources now shows the cover of the actual available handout instead of concept artwork that suggested finished courses.

## Verified locally

- Inspected all five primary pages at 1440 × 1000 and 390 × 844. Inspected homepage, navigation and contact dialog at 320 × 720. No horizontal overflow or broken images found in those checks.
- Axe-core 4.10.3: zero reported WCAG 2 A/AA, 2.1 AA and 2.2 AA violations on the five primary pages at desktop/mobile sizes with reduced motion. Also checked the normal-motion mobile homepage. This is an automated check, not a conformance certification.
- Fixed measured low-contrast animated text by keeping text opaque during its small rotation. Shortened generic reveal delays and checked forward/reverse scrolling; preserved reduced-motion and no-JavaScript fallbacks.
- Mobile menu opens, navigates and closes. FAQ expands. Story video plays; closing removes its iframe source and restores focus. Contact dialog keyboard loop includes textarea/select, Escape restores the opener, and its close button stays reachable on a narrow phone.
- Intake validation catches missing required fields and an invalid email. Synthetic QA data reached Calendly, available times, and the final details screen. Name and question context transferred; email did not consistently prefill, so the site now asks visitors to review details there. No appointment was booked and no confirmation delivery was tested.
- Resource search: Epistle yields one result; supporter category yields two; Clear filters restores the directory.
- Internal page, asset and fragment checks passed. External links were checked by HTTP requests, with browser/web follow-up for provider bot blocks. Some automated requests received 403 or local certificate-chain failures; those are not presented as confirmed broken links.
- `npm test`: 26 passed. `node --check public/assets/site.js`, `git diff --check`, and Cloudflare Wrangler dry-run passed.

## Limits and follow-up

The older vault Phase 1 static checker is not aligned with this approved PR: it expects coaching/monthly-training lifecycle rows, a previous CTA label, Kit forms and Netlify production. Its remaining structural findings concern the redirect-only `/resources/` stub and non-indexed utility-page metadata; its “nonprofit” error is the navigation label “Nonprofit discounts,” while the footer explicitly says Missionary Media is for-profit. It was not changed to manufacture a pass.

No real booking, email delivery, screen-reader session, real-device Safari session, or Lighthouse performance run was performed. Academy courses remain in development; no course enrollment or checkout is advertised as available. Existing owner-supplied images and assets were reused. Deployment evidence is recorded separately after the production workflow finishes.
