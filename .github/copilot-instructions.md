## Purpose
Provide concise, repo-specific guidance for AI coding agents working on this project (static site).

## Big picture
- This is a static website (HTML/CSS/JS) — no backend, no build toolchain. Pages are plain HTML (e.g., `index.html`, `about.html`, `projects.html`).
- Assets live under `assets/` (images in `assets/img/`, subfolders like `about/`, `advisor/`).
- Vendor JS is bundled in a single file: `plugins.js` (contains jQuery 1.12.4 + plugins). Treat it as a vendor bundle.

## Key files to read
- `index.html` — primary template with inline top-level CSS variables and the main navigation/header.
- `plugins.js` — concatenated vendor scripts; avoid invasive edits here.
- `style.css` — site stylesheet (global styles and overrides).
- `assets/img/` — image assets and subfolders.

## Observable patterns & conventions
- No package.json or build step — changes are made directly to source files and tested in browser.
- CSS variables are declared in `index.html` head (example: `:root { --primary-color: #0a2351; --secondary-color: #d1a000; }`). Prefer using these variables for color changes.
- Bootstrap 5 is pulled from CDN; pages use `data-bs-*` attributes and Bootstrap utility classes. Keep using Bootstrap classes for layout changes.
- JS: `plugins.js` is a legacy vendor bundle (jQuery 1.12.4). When adding new behavior, add a separate script (e.g., `assets/js/custom.js`) and include it at the end of `</body>` instead of editing `plugins.js`.
- Image paths are inconsistent: some pages use a leading slash (`/assets/img/...`) and others use relative paths (`assets/img/...`). Use `assets/img/...` (no leading slash) to keep paths portable when hosted under a subpath.
- There are inline styles and a large `<style>` block in `index.html`; prefer moving new CSS into `style.css`.

## Developer workflows (how to preview / debug)
- No build required. To preview locally run a static server from repo root:

  PowerShell / CMD:

  ```powershell
  python -m http.server 8000
  ```

- Or use VS Code Live Server extension for hot reload.
- Debugging: use browser DevTools (console, network). Check for mixed absolute/relative asset URLs if resources fail to load.

## Editing guidance / best practices for edits
- Avoid editing `plugins.js` unless you must: it contains multiple vendor licenses and legacy jQuery. If you must update vendor libs, test every page that relies on jQuery plugins.
- Add new JS in a new file and include it after `plugins.js`. Use an IIFE or module pattern to avoid leaking globals.
- For visual edits, prefer `style.css`. If you must add quick overrides, minimal inline styles are acceptable but aim to centralize later.
- When adding images, put them under `assets/img/` and update paths consistently across pages.
- Maintain existing ARIA attributes and `data-bs-*` attributes used by Bootstrap components.

## Integration & deployment notes
- The repository is ready for static hosting (GitHub Pages, Netlify, static IIS/Apache). Ensure asset paths are relative if you host under a repo subpath.
- No CI tasks or tests are present — PRs are validated manually by previewing pages.

## Concrete examples from this repo
- Vendor bundle: `plugins.js` begins with jQuery v1.12.4 — treat as read-only vendor code.
- CSS variables example in `index.html` head: `--primary-color: #0a2351; --secondary-color: #d1a000;`.
- Navigation and special link: `election2025.html` is referenced by the `election-btn` element in `index.html` — check this page when modifying header UI.

## When you are unsure
- If a change affects multiple pages, open them in a browser and test navigation, header, and footer visuals.
- Ask the maintainer for permission before upgrading core vendor libs (jQuery) because plugins in `plugins.js` may break.

---
Please review this guidance and tell me which sections you want expanded or adjusted (assets, JS strategy, or deployment commands).
