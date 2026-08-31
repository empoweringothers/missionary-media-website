# Missionary Media Website

Production: <https://missionarymedia.io>

## Canonical source

`public/` is the only editable source for the public Missionary Media website.
Netlify builds the `main` branch of this repository and publishes `public/` to
`missionarymedia.io`.

The legacy root `index.html`, `sponsor.html`, `survey/`, and `.hermes/` content
is preserved for recovery and historical comparison. It is not the production
source. Do not edit, delete, restore, or include those paths in a website change.

## Production workflow

1. Make website changes only in `public/`.
2. From the parent `Empowering Others` vault, run the static launch checker and
   JavaScript syntax check:

   ```sh
   python3 Shared/scripts/mm_phase1_launch_check.py Shared/repos/missionary-media-website/public --json-out /tmp/mm-public-launch-check.json --markdown-out /tmp/mm-public-launch-check.md --fail-on error
   node --check Shared/repos/missionary-media-website/public/assets/site.js
   ```

3. Review the nested-repository diff and confirm the legacy root files remain
   unchanged.
4. Commit the approved `public/` and configuration changes on `main`.
5. After explicit production approval, push `main` to `origin`. That Git push is
   the production deploy workflow for `missionarymedia.io`.
6. Verify the resulting Netlify deploy has the pushed Git commit as its source,
   then smoke-test the custom domain and required assets.

Do not use a manual Netlify production deploy. A production release must be
traceable to a commit on this repository's `main` branch.

## Historical references

The former brain-local redesign candidate is retired and read-only. Historical
copies remain in the parent vault; they are references, not alternate editable
website sources.

The live site as of 2026-08-31, immediately before the coaching homepage, is
frozen at commit `78c059c`:

- Branch: `archive/live-2026-08-31`
- Tag: `archive/live-before-coaching-homepage-2026-08-31`
- File snapshot: `archive/2026-08-31-live-before-coaching-homepage/`
