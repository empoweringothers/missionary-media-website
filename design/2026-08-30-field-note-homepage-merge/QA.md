# Field Note to Home — homepage merge QA

Reviewed 2026-08-30 against the canonical static site in `public/`.

## Outcome

- The homepage now follows one lifecycle: coaching now → Home Connection prototype → Academy next → trusted professional help later.
- The hero uses Tabor's existing portrait, one visible booking action, a 57.6–59.04px desktop headline, and 18.56–19.2px supporting copy.
- The signature transformation immediately follows the hero. Its handled result is explicitly a bracketed specimen, not a claimed missionary result.
- The former 14-item proof rail is reduced to four verified Missionary Media interview excerpts and follows the transformation.
- The separate live-training banner was removed from this page because it created a second CTA and covered mobile content.
- No image-generation step was required. Every final visual slot is filled by an existing repository asset; no generated person, testimonial, or proof scene was added.

## Responsive and motion evidence

| Test | Observed result |
|---|---|
| 1440×900 browser window | H1 59.04px; hero body 19.2px; no horizontal overflow. |
| 1280×800 browser window | CSS viewport 1265px; H1 57.6px; hero body 18.56px; section headings 51.2–54.4px; no horizontal overflow. |
| Scrolled desktop nav | Header inset reaches 50px per side with a 100.8px/100% lower curve; nav keeps 100px+ clearance from both wordmark and CTA. |
| Scroll direction | Down: `site-header is-scrolled is-hidden`; up: `site-header is-scrolled`; top: `site-header`. |
| 390×844 browser window | CSS viewport 375px; H1 42.9px; booking CTA bottom 800.14px inside the 844px viewport; no horizontal overflow. |
| 320×568 browser window | CSS viewport 305px; H1 40.8px; wordmark and menu fit; no horizontal overflow. The short viewport requires normal scrolling to reach the CTA. |
| Mobile keyboard | Enter opens the drawer, focus moves to Close then the section links, Escape closes it, and focus returns to Menu. |
| Desktop keyboard | Tab order reaches skip link, wordmark, every primary item, Resources, and its panel links; Escape closes the panel and returns focus to its trigger. |
| Reduced motion, 1280×800 | `prefers-reduced-motion: reduce` true; zero running animations; header transition 0.001s; no overflow. |
| Reduced motion, 390×844 | `prefers-reduced-motion: reduce` true; zero running animations; hero and header opacity 1; no overflow. |

## Asset audit

| Asset | Dimensions | Use |
|---|---:|---|
| `public/assets/academy/academy-hero-tabor-wide.jpg` | 1800×1013 | Desktop hero portrait |
| `public/assets/academy/academy-hero-tabor-mobile.jpg` | 960×1200 | Mobile hero portrait |
| `public/assets/story-thumbnail.jpg` | 1280×720 | Existing Tabor story card |
| `public/assets/missionaryconnect-globe-view.png` | 1920×1032 | Home Connection partner example |
| `public/assets/resources/digital-outreach-handout-cover.jpg` | 927×1200 | Existing Academy artifact |
| `public/assets/missionary-media-logo.png` | 320×320 | Existing brand mark |

The repository contains these assets and the final HTML supplies alternatives according to whether the image is meaningful or decorative. Public/commercial-use rights remain an owner verification gate; this pass does not manufacture a rights record.

## Screenshot evidence

All captures are under `screenshots/`. The selected deciding files are:

| Capture | SHA-256 |
|---|---|
| `1440x900-hero.png` | `9b6154e16c290547d7c644edfdf1dc6c6207dca770935a753db977d01b265f69` |
| `1440-scrolled-header.png` | `375e1c64c6742c0875876071a174f5b5432ea6b5f593f0fcf01df2cd589426ec` |
| `1280-full-page.png` | `470fa0aa5214dc0898a003330444a9facf1b0f44b69cd85a39f2f65842e3106f` |
| `1280x800-academy.png` | `a611021244a417159626b7d0da1558a1cd7b35e8ef10d21b60936ad291b49e14` |
| `390x844-hero.png` | `7be8cd89ab57431780215c5b14979683bf2a9eea6e11b55ce082d116050a8214` |
| `390x844-menu-open.png` | `15666aa2bc18ebf02b8d7fd8b5a128c68efdcb23b22e45b0619ea1b689824508` |
| `320x568-hero.png` | `d781966c25b421a642e5ce7867cfc44b4b47f06fa9c0616bc718220da542909d` |
| `1280x800-reduced-motion.png` | `1ad82b119a828815dbdabd892e54f9b0aa116754c83ad230f1b4cdeaaa93bc17` |
| `390x844-reduced-motion.png` | `73d6f507633b2bc8ebc476fd7a8a0b81dfb80ed72d22c881fb6d6f9c58ab4b89` |

## Automated checks

- `python3 Shared/scripts/mm_phase1_launch_check.py Shared/repos/missionary-media-website/public --fail-on error` → 0 errors, 9 warnings, exit 0.
- `node --check Shared/repos/missionary-media-website/public/assets/site.js` → exit 0.
- `git -C Shared/repos/missionary-media-website diff --check` → exit 0.

The nine static warnings are limited to metadata on other pages, CSS focus heuristics manually exercised here, and the existing Calendly form behavior that still needs an end-to-end owner review. The static checker explicitly does not authorize a launch by itself.
