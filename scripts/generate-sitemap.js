import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing in your .env file.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const DOMAIN = 'https://hometechdealer.com';
const CHUNK_SIZE = 10000;
const PUBLIC_DIR = path.resolve('./public');

async function fetchAllZipCodes() {
  console.log('Fetching all ZIP code records from Supabase...');
  let allRows = [];
  let page = 0;
  const pageSize = 1000;
  let keepFetching = true;

  while (keepFetching) {
    const from = page * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from('zip_codes')
      .select('state, city, zip_code')
      .range(from, to);

    if (error) {
      console.error('Error querying Supabase:', error.message);
      break;
    }

    if (!data || data.length === 0) {
      keepFetching = false;
    } else {
      allRows.push(...data);
      page++;
      console.log(`Retrieved ${allRows.length} total rows...`);
    }
  }

  return allRows;
}

async function generateSitemaps() {
  const zipData = await fetchAllZipCodes();
  console.log(`Processing ${zipData.length} total URLs for sitemap generation...`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const childFiles = [];
  let fileIndex = 1;

  for (let i = 0; i < zipData.length; i += CHUNK_SIZE) {
    const chunk = zipData.slice(i, i + CHUNK_SIZE);
    const fileName = `sitemap-zips-${fileIndex}.xml`;

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk
  .map((item) => {
    const safeState = item.state ? item.state.toString().trim().toLowerCase() : 'us';
    const safeCity = item.city ? item.city.toString().trim().toLowerCase().replace(/\s+/g, '-') : 'location';
    const safeZip = item.zip_code ? item.zip_code.toString().trim() : '';

    if (!safeZip) return '';

    return `  <url>
    <loc>${DOMAIN}/internet/${safeState}/${safeCity}/${safeZip}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .filter(Boolean)
  .join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, fileName), xmlContent);
    childFiles.push(fileName);
    console.log(`Created ${fileName} with ${chunk.length} URLs.`);
    fileIndex++;
  }

  const masterIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${childFiles
  .map(
    (file) => `  <sitemap>
    <loc>${DOMAIN}/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), masterIndexXml);
  console.log(`SUCCESS: Master sitemap.xml created with ${childFiles.length} child files.`);
}

generateSitemaps().catch(console.error);