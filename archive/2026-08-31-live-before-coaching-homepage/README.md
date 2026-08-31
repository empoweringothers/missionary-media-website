# Live site archive — 2026-08-31

This is `missionarymedia.io` as it stood **before** the coaching homepage
became the public `main` branch.

Do not edit these files. They exist so the old site can be restored without
mining it out of later commits.

## Git recovery

| Pointer | Value |
|---|---|
| Commit | `78c059c9bebf3d929fb0a6c15cac2ddafb0f439d` |
| Branch | `archive/live-2026-08-31` |
| Tag | `archive/live-before-coaching-homepage-2026-08-31` |

Restore that exact live tree:

```sh
git checkout archive/live-2026-08-31
```

The current public site is `public/` on `main`.

## Snapshot contents

- `public/` — the Netlify publish directory from that commit
- `netlify.toml` — publish root was `public/`
- `index.html.sha256` — checksum of the archived homepage
