import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseSecretKey);
const BASE_URL = process.env.VITE_SITE_URL || 'https://hometechdealersite.com';

async function generateSitemap() {
  console.log('🚀 Fetching ZIP codes for sitemap generation...');

  let allZips: { zip_code: string; state_code: string; city: string }[] = [];
  let from = 0;
  const STEP = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('zip_codes')
      .select('zip_code, state_code, city')
      .range(from, from + STEP - 1);

    if (error) {
      console.error('❌ Failed fetching ZIP range:', error.message);
      process.exit(1);
    }

    if (data && data.length > 0) {
      allZips = allZips.concat(data);
      from += STEP;
    } else {
      hasMore = false;
    }
  }

  console.log(`📦 Fetched ${allZips.length} ZIP records. Building XML...`);

  const urlEntries = allZips
    .map((item) => {
      const stateSlug = (item.state_code || '').toLowerCase();
      const citySlug = (item.city || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

      const loc = `${BASE_URL}/internet/${stateSlug}/${citySlug}/${item.zip_code}`;

      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;

  const outputPath = path.resolve(process.cwd(), 'public', 'sitemap-zips.xml');
  fs.writeFileSync(outputPath, sitemapXml, 'utf8');

  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${BASE_URL}/sitemap-zips.xml</loc>\n  </sitemap>\n</sitemapindex>`;

  fs.writeFileSync(path.resolve(process.cwd(), 'public', 'sitemap.xml'), indexXml, 'utf8');

  console.log(`🎉 Successfully generated sitemap with ${allZips.length} URLs at public/sitemap-zips.xml!`);
}

generateSitemap();