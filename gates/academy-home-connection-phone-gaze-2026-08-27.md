# Academy Home Connection Phone Gaze — 2026-08-27

- [ ] PG1 — Edit the selected Home Connection image so Tabor is looking naturally at the phone on the tripod, which is the live-call camera.
  CHECK: visual inspection of the generated asset.
  EXPECT: head angle and both eyes point toward the phone; Tabor is not looking at the viewer or laptop.
  EVIDENCE: pending

- [ ] PG2 — Preserve the accepted wider composition and working-call evidence.
  CHECK: compare the selected output with `home-connection-working-call-v3.jpg`.
  EXPECT: identity, framing, hands, phone, laptop, notebook, headphones, desk, wall, and warm lighting remain intact.
  EVIDENCE: pending

- [ ] PG3 — Save the approved edit as a local optimized project asset and update the Academy page and alternative text.
  CHECK: the referenced file exists, has nonzero dimensions, and the old camera-facing asset is no longer referenced.
  EXPECT: project code points to the phone-gaze image without artificial CSS zoom.
  EVIDENCE: pending

- [ ] PG4 — Verify the revised card at desktop and phone widths with no broken image, clipping, overflow, or console error; do not commit, push, or deploy.
  CHECK: browser QA plus `node --check public/assets/site.js && git diff --check`.
  EXPECT: the live preview works at 1440px, 390px, and 320px and no external state changes occur.
  EVIDENCE: pending

- [ ] PG5 — Replace the generic multilingual communication headline with an Academy vision explicitly centered on digital media and digital marketing.
  CHECK: the hero H1 names digital media and digital marketing and connects them to a missionary-facing outcome without unsupported performance claims.
  EXPECT: the headline feels aspirational, specific to the Academy, and distinct from a general translation or communication program.
  EVIDENCE: pending
