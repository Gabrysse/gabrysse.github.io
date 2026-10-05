# Gabriele Rosi personal website

This repository serves a static website on GitHub Pages. Content, icons, and
links work without JavaScript; JavaScript adds the date, mobile news toggle,
and optional GoatCounter tracking.

## Update the website

Edit `js/data.js`, then rebuild using Node.js (no packages to install):

```sh
node scripts/build-site.mjs
node scripts/build-site.mjs --check
```

Keep generated `index.html`, `robots.txt`, and `sitemap.xml` current for local
previews. Page markup lives in `templates/index.html`, and styling lives in
`css/style.css`. Do not edit generated `index.html` directly.

## Automatic publishing

`.github/workflows/pages.yml` rebuilds the website whenever changes are pushed
to `main`, uploads only the public files in `_site`, then deploys them using
GitHub's official Pages action. Deployment depends on a successful build.
Pull requests build and verify the website without deploying it. The workflow
can also be run manually on `main` from the Actions tab. No npm install or
generated-file commit by the workflow is needed.

After pushing this workflow, make this one-time repository setting change:
**Settings → Pages → Build and deployment → Source → GitHub Actions**.
Then run **Build and deploy website** from the Actions tab to publish the
first built artifact. Future pushes to `main` build and publish automatically.
This workflow supplies the build step before deployment; the separate default
branch-based Pages workflow does not wait for custom build workflows.

To reproduce the deployment build locally:

```sh
node scripts/build-site.mjs --output _site
node scripts/build-site.mjs --output _site --check
```

`_site` is ignored by Git. Source scripts, templates, instructions, and the
original large PNG are excluded from the deployment artifact.

`meta.url` is the canonical public URL; update it if you change domains.
The header date is populated in the visitor's timezone and is not a content
update date. All news remains visible if JavaScript is unavailable.

## Assets

The five icons in `assets/icons` are the official Font Awesome Free 6.7.2
Google Scholar, GitHub, LinkedIn, file-lines, and chevron-down SVGs. The build
embeds their original shapes once in an inline sprite. Attribution is retained
in the generated HTML and in `assets/icons/LICENSE.txt`; no icon fonts, CDN,
or Font Awesome runtime are used.

The portrait uses 300px and 600px WebP variants. `images/profile_image.png`
is preserved as the original; `images/profile-social.jpg` provides a JPEG
for social previews. `favicon.svg` is the rounded serif GR monogram in the
website's cream and ink colors. The ICO and Apple touch PNG fallbacks retain
transparent corners.
