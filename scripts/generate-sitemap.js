import fs from 'fs';
import path from 'path';

// Load your full dataset of 42,000+ ZIPs / Cities / States
import zipData from '../src/data/zipcodes.json' assert { type: 'json' }; 

const DOMAIN = 'https://hometechdealer.com';
const CHUNK_SIZE = 10000; // Splits 42k URLs into ~5 manageable sitemaps
const PUBLIC_DIR = path.resolve('./public');

console.log(`Generating sitemaps for ${zipData.length} total ZIP routes...`);

const sitemapFiles = [];
let fileIndex = 1;

for (let i = 0; i < zipData.length; i += CHUNK_SIZE) {
  const chunk = zipData.slice(i, i + CHUNK_SIZE);
  const fileName = `sitemap-zips-${fileIndex}.xml`;

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map(item => `  <url>
    <loc>${DOMAIN}/internet/${item.state.toLowerCase()}/${item.city.toLowerCase().replace(/\s+/g, '-')}/${item.zip}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, fileName), xmlContent);
  sitemapFiles.push(fileName);
  console.log(`Created ${fileName} with ${chunk.length} URLs.`);
  fileIndex++;
}

// Generate Master Index (sitemap.xml)
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/</loc>
  </sitemap>
${sitemapFiles.map(file => `  <sitemap>
    <loc>${DOMAIN}/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml);
console.log(`Master sitemap.xml created referencing ${sitemapFiles.length} child sitemaps.`);