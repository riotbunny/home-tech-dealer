import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env / .env.local file
dotenv.config();
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const DOMAIN = 'https://hometechdealer.com'; // Replace with your live domain

async function generateAllSitemaps() {
  // Graceful fallback if keys aren't present during build
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_URL.startsWith('http')) {
    console.warn('⚠️ Missing or invalid Supabase env vars in Node. Creating base fallback sitemap.xml...');
    
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${DOMAIN}/internet/tx/brownsville/78520</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    fs.writeFileSync(path.resolve('public', 'sitemap.xml'), fallbackXml, 'utf8');
    console.log('✅ Base fallback sitemap.xml written to /public.');
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('🔍 Fetching all ZIP locations from Supabase...');

  try {
    const { data: zipRecords, error } = await supabase
      .from('zip_codes')
      .select('zip_code, city, state');

    if (error || !zipRecords || zipRecords.length === 0) {
      console.warn('⚠️ No records found in Supabase or query failed. Check table permissions.');
      return;
    }

    console.log(`✅ Loaded ${zipRecords.length} ZIP codes. Generating XML sitemaps...`);

    const CHUNK_SIZE = 10000;
    const sitemapFiles = [];

    for (let i = 0; i < zipRecords.length; i += CHUNK_SIZE) {
      const chunk = zipRecords.slice(i, i + CHUNK_SIZE);
      const fileIndex = Math.floor(i / CHUNK_SIZE) + 1;
      const fileName = `sitemap-zips-${fileIndex}.xml`;

      const urls = chunk
        .map((row) => {
          const formattedCity = (row.city || '').toLowerCase().trim().replace(/\s+/g, '-');
          const formattedState = (row.state || '').toLowerCase().trim();
          const zip = row.zip_code;
          return `  <url>\n    <loc>${DOMAIN}/internet/${formattedState}/${formattedCity}/${zip}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
        })
        .join('\n');

      const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

      fs.writeFileSync(path.resolve('public', fileName), xmlContent, 'utf8');
      sitemapFiles.push(fileName);
    }

    const indexUrls = sitemapFiles
      .map(
        (file) =>
          `  <sitemap>\n    <loc>${DOMAIN}/${file}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n  </sitemap>`
      )
      .join('\n');

    const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${DOMAIN}/</loc>\n  </sitemap>\n${indexUrls}\n</sitemapindex>`;

    fs.writeFileSync(path.resolve('public', 'sitemap.xml'), indexXml, 'utf8');
    console.log(`🎉 Master sitemap.xml and ${sitemapFiles.length} chunked sitemaps generated!`);
  } catch (err) {
    console.error('Error generating sitemaps:', err);
  }
}

generateAllSitemaps();