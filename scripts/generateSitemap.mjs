import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DOMAIN = 'https://hometechdealer.com';
const CHUNK_SIZE = 10000;
const PUBLIC_DIR = path.join(__dirname, '../public');

async function fetchAllZips() {
  let allZips = [];
  let page = 0;
  const pageSize = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('zip_codes')
      .select('zip_code, city, state_code, state')
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.error('Error fetching zip codes:', error);
      break;
    }

    if (data && data.length > 0) {
      allZips = allZips.concat(data);
      page++;
    } else {
      hasMore = false;
    }
  }

  return allZips;
}

async function generateSitemaps() {
  console.log('Starting sitemap generation...');
  const zips = await fetchAllZips();
  console.log(`Fetched ${zips.length} ZIP codes.`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const totalChunks = Math.ceil(zips.length / CHUNK_SIZE) || 1;
  const sitemapFiles = [];

  for (let i = 0; i < totalChunks; i++) {
    const chunk = zips.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    const fileName = `sitemap-zips-${i + 1}.xml`;
    sitemapFiles.push(fileName);

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk
  .map((item) => {
    const state = (item.state_code || item.state || 'us').toLowerCase();
    const city = (item.city || '').toLowerCase().replace(/\s+/g, '-');
    const zip = item.zip_code;
    const loc = `${DOMAIN}/internet/${state}/${city}/${zip}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;
  })
  .join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, fileName), xmlContent);
    console.log(`Generated ${fileName}`);
  }

  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles
  .map(
    (file) => `  <sitemap>
    <loc>${DOMAIN}/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXml);
  console.log('Generated master sitemap.xml');
}

generateSitemaps().catch((err) => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});