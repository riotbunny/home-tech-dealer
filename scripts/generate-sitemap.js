import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const DOMAIN = 'https://hometechdealer.com';

async function generateAllSitemaps() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_URL.startsWith('http')) {
    console.warn('⚠️ Missing Supabase keys. Creating base sitemap.xml...');
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    fs.writeFileSync(path.resolve('public', 'sitemap.xml'), fallbackXml, 'utf8');
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('🔍 Fetching ZIP locations from Supabase...');

  try {
    const { data: zipRecords, error } = await supabase
      .from('zip_codes')
      .select('zip_code, city, state');

    if (error || !zipRecords || zipRecords.length === 0) {
      console.warn('⚠️ No records found in Supabase.');
      return;
    }

    // Filter out invalid records and clean parameters
    const validRecords = zipRecords.filter((row) => row.zip_code && row.city);

    console.log(`✅ Loaded ${validRecords.length} valid ZIP codes. Generating XML sitemaps...`);

    const CHUNK_SIZE = 10000;
    const sitemapFiles = [];

    for (let i = 0; i < validRecords.length; i += CHUNK_SIZE) {
      const chunk = validRecords.slice(i, i + CHUNK_SIZE);
      const fileIndex = Math.floor(i / CHUNK_SIZE) + 1;
      const fileName = `sitemap-zips-${fileIndex}.xml`;

      const urls = chunk
        .map((row) => {
          const formattedCity = String(row.city).toLowerCase().trim().replace(/\s+/g, '-');
          // Fall back to 'us' if state field is null/blank to prevent double slashes (//)
          const rawState = row.state ? String(row.state).toLowerCase().trim() : 'us';
          const formattedState = rawState || 'us';
          const zip = String(row.zip_code).padStart(5, '0');
          
          return `  <url>\n    <loc>${DOMAIN}/internet/${formattedState}/${formattedCity}/${zip}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
        })
        .join('\n');

      const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
      fs.writeFileSync(path.resolve('public', fileName), xmlContent, 'utf8');
      sitemapFiles.push(fileName);
    }

    // Master Sitemap Index
    const indexUrls = sitemapFiles
      .map((file) => `  <sitemap>\n    <loc>${DOMAIN}/${file}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n  </sitemap>`)
      .join('\n');

    const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${DOMAIN}/</loc>\n  </sitemap>\n${indexUrls}\n</sitemapindex>`;

    fs.writeFileSync(path.resolve('public', 'sitemap.xml'), indexXml, 'utf8');
    console.log(`🎉 Master sitemap.xml updated with single-slash clean routes!`);
  } catch (err) {
    console.error('Error generating sitemaps:', err);
  }
}

generateAllSitemaps();