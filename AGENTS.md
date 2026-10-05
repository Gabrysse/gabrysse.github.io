# Website build and maintenance

This is Gabriele Rosi's static personal website at https://gabrysse.github.io/.
Keep its newspaper-inspired serif typography and cream, ink, and red palette.

## Sources and generated files

- Edit `js/data.js` for biography, news, publications, contact links, and SEO metadata.
- Edit `templates/index.html` for page markup and `css/style.css` for styling.
- `scripts/build-site.mjs` generates `index.html`, `robots.txt`, and `sitemap.xml`.
  Do not edit these generated files directly.
- `js/main.js` adds optional date display, mobile news disclosure, and analytics.
  All essential content, links, and icons must work without JavaScript or analytics.

## Build and verify

Use Node.js 24 or newer. The build requires no npm packages:

```sh
node scripts/build-site.mjs
node scripts/build-site.mjs --check
node --check js/main.js
git diff --check
```

Always rebuild after editing content, templates, the generator, or source icons.
Keep the generated root files current for local previews. GitHub Actions rebuilds
the deployment artifact from source, so stale committed HTML cannot be deployed
by the custom Pages workflow.

To produce and verify the deployment directory locally:

```sh
node scripts/build-site.mjs --output _site
node scripts/build-site.mjs --output _site --check
```

Only public page assets belong in `_site`. Do not publish source templates,
scripts, agent instructions, audit files, or the original large portrait PNG.
Do not commit `_site`.

## Deployment

`.github/workflows/pages.yml` builds on pushes to `main`, pull requests targeting
`main`, and manual runs. Pull requests only build. Pushes and manual runs on
`main` upload the built artifact and deploy it after the build succeeds.

The repository's Pages source must be set to **GitHub Actions** under
Settings → Pages → Build and deployment. This replaces the default branch-based
publishing workflow with the ordered build and deploy workflow. Do not change
repository settings or publish changes unless the user's request authorizes it.

## Assets and accessibility

- Keep the official Font Awesome Free 6.7.2 SVG paths in `assets/icons` and retain
  their attribution and license. The build embeds only five icons in the HTML.
  Do not restore a Font Awesome CDN stylesheet, font download, or runtime.
- Keep responsive 300px and 600px WebP portraits, explicit dimensions, and loading
  priority for the visible portrait. Preserve the original PNG source.
- The social preview is `images/profile-social.jpg`.
- `favicon.svg` is the rounded GR monogram. Keep `favicon.ico` (16/32/48px) and
  `apple-touch-icon.png` (180px) visually consistent when regenerating them;
  preserve transparent corners in the raster exports.
- Preserve semantic landmarks, the skip link, visible keyboard focus, 44px icon
  targets, sufficient contrast, and reduced-motion support.
- The mobile news button must retain focus and expose `aria-expanded` and
  `aria-controls`. All news must remain readable when JavaScript is unavailable.
- Verify affected mobile and desktop layouts and keyboard behavior when changing
  page structure or interactions. Do not treat an automated accessibility score
  as proof of complete accessibility.
