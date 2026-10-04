# Annelize Visagie — Portfolio

A static, no-build portfolio site: plain HTML, CSS and vanilla JavaScript. No framework, no dependencies, no build step — upload the folder and it runs.

## Structure

```
annelize-portfolio/
├── index.html          Page markup, meta tags
├── 404.html            Not-found page
├── favicon.svg         "A" monogram favicon
├── robots.txt          Crawler rules
├── css/styles.css      All styles (light + dark theme via CSS variables)
├── js/main.js          Mobile menu, count-up stats, scroll reveals, case-study sliders
├── images/
│   ├── logo-light.png / logo-dark.png
│   ├── icons/          Tool logos (Figma, Jira, Confluence, Miro, GitHub, Bitbucket, WordPress, Adobe CC)
│   └── projects/       Case-study visuals
├── netlify.toml        Netlify config (caching + security headers)
├── vercel.json         Vercel config (caching + security headers)
└── .htaccess           Apache / cPanel config (caching, compression, 404)
```

## Preview locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Pick any static host — the folder root is the publish directory.

- **Netlify** — drag the folder onto app.netlify.com/drop, or connect the repo (publish directory: `.`, no build command).
- **Vercel** — `vercel` from this folder, or import the repo (framework preset: Other, no build command).
- **GitHub Pages** — push to a repo, then Settings → Pages → deploy from branch `main`, folder `/ (root)`. If the site lives at `username.github.io/repo-name/` (not a custom domain), change the two absolute links in `404.html` (`/favicon.svg`, `/`) to relative ones.
- **cPanel / traditional hosting** — upload everything (including the hidden `.htaccess`) into `public_html`.

## After going live

1. Add your live URL to `robots.txt` if you add a sitemap, and set `<link rel="canonical" href="https://YOUR-DOMAIN/">` in `index.html`.
2. For rich link previews (LinkedIn, Slack, WhatsApp), add an `og:image` meta tag in `index.html` pointing at an absolute URL, e.g. `https://YOUR-DOMAIN/images/projects/travel-mall-1-homepage.jpg`.
3. Check the Vodacom case study: it is flagged "In development" and notes it isn't public yet — update when it launches.

## Editing

- **Copy and case studies:** `index.html` (each project is a `.project` block).
- **Colours / spacing:** CSS variables at the top of `css/styles.css` (`--accent`, `--bg`, etc.).
- **Adding a slide:** add an `<img>` inside the project's `.slider-track` and a matching `<button class="slider-dot">` in `.slider-dots`. The slider's box ratio is set on the `.slider` element (`style="aspect-ratio:W/H"`) from the first image, so keep new slides at the same ratio.
- **Fonts:** Inter is loaded from Google Fonts; the page falls back to the system font stack if offline.
