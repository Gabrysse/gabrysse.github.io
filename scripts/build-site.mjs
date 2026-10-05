import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const context = {};
vm.runInNewContext(read('js/data.js'), context, { timeout: 1000 });
const d = context.SITE_DATA;
const { values } = parseArgs({ options: {
  check: { type: 'boolean', default: false },
  output: { type: 'string', default: '.' }
} });
const check = values.check;
const sourceDir = fileURLToPath(root);
const outputDir = resolve(sourceDir, values.output);
const escape = value => String(value).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const baseUrl = new URL(d.meta.url);
if (baseUrl.protocol !== 'https:') throw new Error('The canonical URL must use HTTPS.');

// Official Font Awesome Free 6.7.2 SVG paths, with their attribution preserved.
const iconFiles = {
  scholar: 'google-scholar', github: 'github', linkedin: 'linkedin-in',
  paper: 'file-lines', 'chevron-down': 'chevron-down'
};
const symbols = Object.entries(iconFiles).map(([name, file]) => {
  const svg = read(`assets/icons/${file}.svg`);
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  const body = svg.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/)?.[1];
  if (!viewBox || !body) throw new Error(`Invalid icon: ${file}`);
  return `<symbol id="icon-${name}" viewBox="${viewBox}">${body}</symbol>`;
}).join('\n');
const icons = `<svg class="icon-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs>\n${symbols}\n</defs></svg>`;
function icon(name) {
  if (name === 'code') name = 'github';
  if (!iconFiles[name]) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-${name}"></use></svg>`;
}
function link(url, attributes, content) {
  const destination = new URL(url);
  if (!['https:', 'http:', 'mailto:'].includes(destination.protocol)) {
    throw new Error(`Unsupported link protocol: ${url}`);
  }
  return `<a href="${escape(url)}" target="_blank" rel="noopener" ${attributes}>${content}</a>`;
}

const contacts = d.contact.map(c => link(c.url,
  `aria-label="${escape(c.text)} (opens in a new tab)" title="${escape(c.text)}" data-track-event="outbound:contact" data-track-title="${escape(c.text)}"`,
  icon(c.icon))).join('\n');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const news = d.news.map(n => {
  const match = n.date.match(/^(\w+) (\d{4})$/);
  if (!match || !months.includes(match[1])) throw new Error(`Invalid news date: ${n.date}`);
  const date = `${match[2]}-${String(months.indexOf(match[1]) + 1).padStart(2, '0')}`;
  return `<article class="news">\n<div class="nmeta"><time datetime="${date}">${escape(n.date)}</time><span class="ntype">${escape(n.type)}</span></div>\n<p>${n.body}</p>\n</article>`;
});
const newsFeed = news.slice(0, 3).join('\n') + (news.length > 3 ?
  `\n<div id="older-news">\n${news.slice(3).join('\n')}\n</div>\n<button id="news-toggle" class="show-more" type="button" aria-controls="older-news" aria-expanded="true" hidden><span data-toggle-label>Show more</span>${icon('chevron-down')}</button>` : '');
const publications = d.publications.map(p => {
  const links = p.links.map(l => link(l.url,
    `aria-label="${escape(l.text + ': ' + p.title)} (opens in a new tab)" title="${escape(l.text)}" data-track-event="outbound:${escape(l.icon)}" data-track-title="${escape(p.title)}"`,
    icon(l.icon))).join('\n');
  return `<article class="pub">\n<div class="pbody"><h3>${escape(p.title)}</h3><p class="pa">${p.authors}</p><p class="pv">${escape(p.venue)}</p></div>\n<div class="plinks">${links}</div>\n</article>`;
}).join('\n');
const bio = `<img class="portrait" src="${escape(d.portrait)}"${d.portraitSrcset ? ` srcset="${escape(d.portraitSrcset)}" sizes="(max-width: 327px) calc(100vw - 28px), 300px"` : ''} alt="Portrait of ${escape(d.meta.name)}" width="600" height="600" fetchpriority="high" decoding="async">\n<p class="bio"><span class="dc">${escape(d.bio.charAt(0))}</span>${d.bio.slice(1)}</p>`;
const sections = { about: bio, news: newsFeed, publications };
const columns = d.columns.map(c => {
  if (!(c.section in sections)) throw new Error(`Unknown section: ${c.section}`);
  if (c.width !== undefined && (!(c.width > 0) || !Number.isFinite(c.width))) throw new Error('Column widths must be positive numbers.');
  return `<section class="col" id="${c.section}" aria-labelledby="${c.section}-heading">\n<h2 class="k" id="${c.section}-heading">${escape(c.heading)}</h2>\n${sections[c.section]}\n</section>`;
}).join('\n');
const structuredData = {
  '@context': 'https://schema.org', '@type': 'ProfilePage',
  '@id': `${baseUrl.href}#profile`, url: baseUrl.href,
  name: d.meta.title, description: d.meta.description,
  mainEntity: {
    '@type': 'Person', '@id': `${baseUrl.href}#person`,
    name: d.meta.name, url: baseUrl.href,
    image: new URL(d.portrait, baseUrl).href,
    jobTitle: 'PhD candidate',
    affiliation: [
      { '@type': 'CollegeOrUniversity', name: 'Politecnico di Torino' },
      { '@type': 'Organization', name: 'FocoosAI' }
    ],
    sameAs: d.contact.map(c => c.url)
  }
};
const replacements = {
  TITLE: escape(d.meta.title), DESCRIPTION: escape(d.meta.description),
  URL: escape(baseUrl.href), NAME: escape(d.meta.name),
  SOCIAL_IMAGE: escape(new URL('images/profile-social.jpg', baseUrl).href),
  STRUCTURED_DATA: json(structuredData), ICONS: icons,
  LOCATION: escape(d.meta.topline.location), TAGLINE: escape(d.meta.tagline),
  CONTACTS: contacts, COLUMNS: columns,
  COLUMN_WIDTHS: d.columns.map(c => `${c.width || 1}fr`).join(' '),
  SECTION_LINKS: d.columns.map(c => `<a href="#${c.section}">${escape(c.heading)}</a>`).join('\n'),
  FOOTER: d.meta.foot ? `<footer class="foot" id="site-foot">${d.meta.foot}</footer>` : ''
};
const html = read('templates/index.html').replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => {
  if (!(key in replacements)) throw new Error(`Unknown template token: ${key}`);
  return replacements[key];
});
const outputs = {
  'index.html': html,
  'robots.txt': `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', baseUrl).href}\n`,
  'sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escape(baseUrl.href)}</loc></url>\n</urlset>\n`
};
for (const [path, content] of Object.entries(outputs)) {
  const destination = join(outputDir, path);
  if (check) {
    if (readFileSync(destination, 'utf8') !== content) throw new Error(`${destination} is out of date. Rebuild the website.`);
  } else {
    mkdirSync(outputDir, { recursive: true });
    writeFileSync(destination, content);
  }
}
if (outputDir !== sourceDir.replace(/\/$/, '')) {
  const publicAssets = new Set([
    'css/style.css', 'js/main.js', 'favicon.svg', 'favicon.ico',
    'apple-touch-icon.png', 'images/profile-social.jpg', 'assets/icons/LICENSE.txt',
    d.portrait,
    ...(d.portraitSrcset || '').split(',').filter(Boolean).map(entry => entry.trim().split(/\s+/)[0])
  ]);
  if (existsSync(new URL('CNAME', root))) publicAssets.add('CNAME');
  for (const path of publicAssets) {
    const source = new URL(path, root);
    const destination = join(outputDir, path);
    if (check) {
      if (!readFileSync(source).equals(readFileSync(destination))) throw new Error(`Staged asset differs: ${path}`);
    } else {
      mkdirSync(dirname(destination), { recursive: true });
      copyFileSync(source, destination);
    }
  }
}
console.log(check ? 'Generated site is up to date.' : `Built static site in ${outputDir}`);
