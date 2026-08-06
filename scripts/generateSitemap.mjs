import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read Supabase credentials from process env
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://kvbpzxvzpsozjihhgvwd.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_2kZFKL-DKznIUMkCk-iG0A_HBbZ6yCt';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function generateSitemap() {
  console.log('Fetching active ZIP locations from Supabase...');

  const { data: zipCodes, error } = await supabase
    .from('zip_codes')
    .select('zip_code, city, state_code');

  if (error) {
    console.error('Error fetching zip codes for sitemap:', error);
    process.exit(1);
  }

  const baseUrl = 'https://www.hometechdealer.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // Static core routes
  const staticPages = [
    '',
    '/services',
    '/products',
    '/about',
    '/contact',
    '/check-availability',
    '/providers/spectrum',
    '/providers/frontier'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add static URLs
  staticPages.forEach((route) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${route}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Add dynamic pSEO ZIP URLs
  zipCodes.forEach((loc) => {
    const citySlug = loc.city.toLowerCase().replace(/\s+/g, '-');
    const stateSlug = loc.state_code.toLowerCase();
    const locPath = `/internet/${stateSlug}/${citySlug}/${loc.zip_code}`;

    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${locPath}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  console.log(`Successfully generated sitemap with ${staticPages.length + zipCodes.length} URLs at ${outputPath}`);
}

generateSitemap();