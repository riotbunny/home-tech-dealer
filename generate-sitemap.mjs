import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://www.hometechdealer.com';

// Add all target programmatic SEO routes here
const routes = [
  '/',
  '/services',
  '/products',
  '/about',
  '/contact',
  '/check-availability',
  // Provider Pages
  '/providers/spectrum',
  '/providers/frontier',
  '/providers/kinetic',
  '/providers/brightspeed',
  // Location Pages
  '/internet/tx/dallas',
  '/internet/tx/houston',
  '/internet/tx/austin',
  '/internet/tx/san-antonio',
  '/internet/tx/brownsville',
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    return `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemapXml);
console.log(`✅ sitemap.xml generated successfully at ${outputPath}`);