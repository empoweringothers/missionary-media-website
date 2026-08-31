# Cloudflare deployment

Migration preparation date: 2026-08-31. **DNS cutover is not yet verified.** Netlify remains the recorded live host until the release receipt confirms otherwise.

## One source, one publish directory

- Repository: `empoweringothers/missionary-media-website`.
- Production branch: `main`.
- Worker project: `missionary-media-website`.
- Configuration: `wrangler.jsonc`; static assets come only from `./public`.
- No website build command is required; these are plain HTML, CSS, JavaScript and existing media files.
- Cloudflare deploy command: `npx wrangler deploy`.
- Keep the root directory at the repository root so Wrangler reads the checked-in configuration.
- Stay on Workers Free. Do not enable paid services, custom Worker code, AI inference, databases, or storage products for this static site.

The repository root, historical root HTML, `archive/`, private notes, `.git/`, and local credentials must never be deployed as website assets. Do not change `assets.directory` to `.`.

## Local verification

```sh
npm ci
npm run check:deploy
npm run dev
```

Wrangler is pinned in the lockfile. `check:deploy` is a dry run and does not publish. Local development normally uses port 8787; use `npm run dev -- --port 8793` if another preview is using it.

The existing `public/_headers` is honored by Cloudflare Static Assets. The Content Security Policy is currently **report-only**, not enforced; do not describe it as enforced or tighten it without testing the existing inline content and external handoffs.

Expected routes: `/`, `/academy.html` (may redirect to `/academy/`), `/sponsor.html`, `/thanks.html`, existing resource PDFs/assets, and a genuine 404 for nonexistent routes. The archive URL must return 404.

## Safe production setup

1. In the owner Cloudflare account, connect only the intended website repository. Verify GitHub App access is limited appropriately; an account connection is not proof that access is repository-limited.
2. Create the Worker using the configuration above. Check the production branch is `main`, not an archive or review branch. Keep preview branches separate from production.
3. Verify the Cloudflare deployment/build records reference the exact pushed Git commit. Test its `workers.dev` URL and compare homepage/asset bytes with that commit.
4. Inventory the entire existing GoDaddy DNS zone before moving nameservers. Preserve non-website records; Cloudflare supplies its own NS/SOA. Do not copy old authoritative apex NS records into the new zone.
5. Add `missionarymedia.io` on the Free zone plan, verify imported records, then use the **exact nameservers assigned to this account's zone** in GoDaddy. Never guess nameserver names.
6. Attach apex and www as supported custom domains or set a verified www-to-apex redirect. Preserve valid HTTPS throughout the cutover. Resolve CNAME/custom-domain conflicts deliberately rather than deleting unrelated records.
7. Confirm authoritative DNS, valid certificates, final hostname/redirect behavior, source hashes, assets, mobile/desktop rendering, and the existing booking handoff before retiring Netlify.
8. Only then disconnect this Missionary Media site's Netlify production path. Do not remove the Netlify account or unrelated projects. Retain the old deployment until rollback is no longer needed.

## Future AI-assisted updates

Edit the canonical `public/` source on a review branch, run checks, and inspect a preview. After production approval, merge/push the reviewed commit to `main`; Cloudflare's Git integration deploys it. Verify the resulting build's commit and the live website rather than reporting a push as proof of deployment.

Credentials belong in the owner's Cloudflare/GitHub authorization stores, not `.env` committed to Git, Wrangler variables, README files, chat, or source. Review the scope of OAuth and GitHub App grants. Installing an MCP connection does not authenticate it or authorize arbitrary future changes.

## Old-site archive and rollback

The pre-upgrade site is preserved at `78c059c9bebf3d929fb0a6c15cac2ddafb0f439d`:

- Branch `archive/live-2026-08-31`.
- Tag `archive/live-before-coaching-homepage-2026-08-31`.
- Snapshot `archive/2026-08-31-live-before-coaching-homepage/`.

Do not rewrite the archive. To restore its visual/content version, create a new reviewed commit restoring that public tree, then deploy it through the current host. Once Cloudflare has successful releases, its version rollback can also restore a verified earlier Cloudflare deployment. A Netlify deployment ID is not a Cloudflare version ID.

DNS rollback before Netlify retirement uses GoDaddy nameservers `ns29.domaincontrol.com` and `ns30.domaincontrol.com` with the original zone retained. The original website record was apex A `75.2.60.5`, with www CNAME `missionarymedia.io`. Keep the complete dated migration receipt outside the public source.

## References

- [Cloudflare's Netlify migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/netlify-to-workers/)
- [Static asset routing](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
- [Worker custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Git-backed Workers builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
