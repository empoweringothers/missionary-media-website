# Source and reuse ledger

| ID | Source | Exact artifact | Revision / date | Rights and terms | Reuse class | Implementation decision | Attribution |
|---|---|---|---|---|---|---|---|
| S01 | Eloqwnt About | https://www.eloqwnt.com/about | measured 2026-08-26 | Public reference; proprietary site | Inspiration / reconstruction | Recreate the two-column hierarchy and measured reveal behavior in original MM markup and CSS. Copy no code, imagery, type, or text. | Internal design note only |
| S02 | 21st.dev | https://21st.dev/community/components/float_ui/logo-grid/dark-logo-grid | accessed 2026-08-26 | Marketplace discovery surface; direct component copying can carry marketplace attribution requirements | Discovery reference | Use the listing to identify the canonical Float UI source. Do not run the React installer and do not copy the 21st.dev demo bundle. | No visible attribution required because marketplace code is not copied |
| S03 | Float UI | `componentsDB/logo-grid/logo-grid-332c0905193d.mdx` | commit `70824397a5ca6eca3cff1bee37d8a6972d653860` | `LICENSE.md` permits end products and modified derivatives; prohibits standalone component redistribution and component-builder products | Licensed adaptation | Adapt the copy-left/right-grid skeleton into semantic static HTML/CSS. Copy no third-party logo SVGs. This website is an end product, not a component library. | Retain this ledger; visible credit not required by the repository license |
| S04 | MissionaryConnect official site and help center | https://missionaryconnect.app/<br>https://docs.missiondisplay.org/mc-knowledge/overview-of-missionsapp/<br>https://docs.missiondisplay.org/mc-knowledge/how-missionaryconnect-works/ | checked 2026-08-26 | Public product site and first-party documentation; product name and published feature descriptions may be summarized with direct links | Factual reference | Ground the two supporting paragraphs in the official browser/display and profile-claim workflow. Do not import pricing, rankings, engagement percentages, or outcome guarantees. | Link to official product site from the card |
| S05 | MM archived partner section | `archive/2026-05-30-nextjs/public/index.html` | local archive | Owned project source, but visually stale | Internal reuse reference | Reuse only the verified relationship framing; do not restore the archived image or offer bundle. | None |
| S06 | Owner-supplied MissionaryConnect product screenshot | `codex-clipboard-368d56ce-8e69-4593-a608-1d285aee683e.png` | supplied 2026-08-26 | Tabor explicitly identified the image as the MissionaryConnect visual to use and confirmed the partnership | Owner-directed asset reuse | Store a local copy at `public/assets/missionaryconnect-globe-view.png`; use it only as the partner-section product visual. Keep alternative text general and do not extract or restate the visible names. | None |

## Float UI structure actually adapted

- Wide wrapper that becomes a two-column flex/grid at larger widths.
- Bounded copy column on the left.
- Compact two-column tile grid on the right.
- Breakpoint collapse to one column with the grid following the copy.

No Float UI SVG paths, brand logos, React code, Tailwind class string, or demo copy is shipped.

## MissionaryConnect copy mapping

- “MissionaryConnect gives churches one place to organize and display the missionaries they support” paraphrases the official overview’s central-place description and the product homepage’s church-facing purpose (fetched 2026-08-26).
- “Its interactive maps and profiles can be shown on a lobby touchscreen, a television, or any modern web browser” paraphrases the official overview and How It Works display guidance (fetched 2026-08-26).
- “Missionaries can create or claim their own profile and keep its information current” paraphrases the official How It Works profile-claim workflow (fetched 2026-08-26).
- The church-member outcome is limited to the documentation’s stated behaviors: seeing where missionaries serve, learning about their ministries, and knowing how to pray. No financial-support, prayer-engagement, or performance lift is claimed.
