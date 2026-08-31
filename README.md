# Missionary Media Website

Production: <https://missionarymedia.io>

Hosting: Cloudflare Workers Static Assets on Free, deployed through GitHub
Actions. The custom domain, HTTPS, canonical redirects and all 101 public files
were verified on 2026-08-31, including ordinary Mac DNS after its cache cleared.
The legacy Netlify domain binding has been removed and its builds are stopped.
See [CLOUDFLARE.md](CLOUDFLARE.md) for configuration,
verification, credentials and rollback instructions.

## Canonical source

`public/` is the only editable source for the public Missionary Media website.
GitHub Actions deploys approved changes on `main` to Cloudflare Worker
`missionary-media-website`, which serves `missionarymedia.io`. Only `public/`
is uploaded. GoDaddy remains the domain registrar; Cloudflare manages DNS.

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
6. Verify the successful GitHub Actions run and Cloudflare version both identify
   the pushed Git commit. CI compares every public file on both the Worker URL
   and production domain, and checks HTTPS redirects, 404s and security headers.
   Then inspect the live desktop/mobile page; CI file checks are not visual QA.

Do not deploy manually to Netlify or create a second automatic deployment
pipeline. A production release must be traceable to a commit on this repository's
`main` branch. A failed verification is not a successful release or an automatic
rollback.

## Legacy Netlify retirement

Retirement completed on 2026-08-31: `missionarymediav2` has no custom domain or
domain aliases, and automatic builds remain stopped. Cloudflare is the live
host and the only automatic deployment path. The old ready Netlify deployment
is retained at <https://missionarymediav2.netlify.app> for recovery, alongside
the GitHub archive below. Removing the domain binding did not delete the site,
account or unrelated projects. `netlify.toml` is a legacy reference, not the
current production configuration. Do not resume Netlify builds or point DNS
back there without explicitly restoring and verifying the domain binding and
HTTPS; prefer rollback within Cloudflare.

## Historical references

The former brain-local redesign candidate is retired and read-only. Historical
copies remain in the parent vault; they are references, not alternate editable
website sources.

The live site as of 2026-08-31, immediately before the coaching homepage, is
frozen at commit `78c059c`:

- Branch: `archive/live-2026-08-31`
- Tag: `archive/live-before-coaching-homepage-2026-08-31`
- File snapshot: `archive/2026-08-31-live-before-coaching-homepage/`
