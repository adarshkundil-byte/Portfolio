# Adarsh M: Cybersecurity Portfolio
Static site: HTML, CSS, vanilla JS. No build step, no API keys, no trackers.

## Files
`index.html` structure · `css/style.css` styling and both themes · `js/script.js` **all your content (CONFIG at top)** · `404.html` · `assets/` photo, resume, favicon.

## Customize
Open `js/script.js` and edit `CONFIG`: bio, links, skills, projects, certifications, notes, email. Replace every `[ADD ...]` placeholder. Add only verified credentials and real projects. Also update the `og:url` and `og:image` placeholders in `index.html`.
- Photo/resume: see `assets/README.md`.
- Contact form: uses `mailto:` (opens the visitor's email app). A static site cannot send email alone; for in-page sending, connect an external form service later.
- GitHub list: loads public repos from GitHub's API, hides itself on failure.

## Test locally
Open `index.html` in a browser, or use VS Code Live Server. Check: nav links, theme toggle (persists on reload), mobile menu (narrow the window), missing-photo initials, resume message, form validation.

## Deploy to GitHub Pages
1. Create a repository (for `https://adarshkundil-byte.github.io/` name it `adarshkundil-byte.github.io`; any other name becomes a project site at `.../repo-name/`).
2. Upload files via the GitHub website, or: `git init`, `git add .`, `git commit -m "Initial portfolio"`, `git branch -M main`, `git remote add origin <repo-url>`, `git push -u origin main`.
3. Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.
4. Wait a few minutes; the URL appears at the top of the Pages settings.
Relative paths (`css/style.css`, not `/css/style.css`) matter because project sites live under `/repo-name/`.

## Troubleshooting
- 404 page: check the branch/folder setting and that `index.html` is in the repo root.
- No styling/JS: check folder names and paths.
- Missing image/resume: filenames are case-sensitive (`profile.jpg`, `resume.pdf`).
