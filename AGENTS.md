# AGENTS.md

## Cursor Cloud specific instructions

This is a **zero-dependency static website** (plain HTML/CSS/vanilla JS). There is no package manager, build step, lint config, or test suite — do not look for `package.json`, `node_modules`, or lockfiles; none exist.

### Running the site (dev)
Serve the repo root as static files and open it in a browser. Python 3 is preinstalled:

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```

`npx serve .` also works if you prefer Node. Opening `index.html` via `file://` works too since all paths are relative.

### Notes
- Content is client-rendered: project/skill data lives in `js/projects.js` and is rendered by `js/main.js`. Dark/light theme is persisted in `localStorage`.
- Google Fonts are loaded from a CDN; the site falls back to system fonts without network access.
- Build/lint/test: none exist. `netlify.toml` and `vercel.json` configure static hosting only (Netlify's build command is a no-op echo).
