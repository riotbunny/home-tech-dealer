import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  console.error('❌ Missing Supabase URL or Secret Key.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseSecretKey);

const ZIP_DATASET_URL =
  'https://raw.githubusercontent.com/millbj92/US-Zip-Codes-JSON/master/USCities.json';

async function seedDatabase() {
  console.log('🚀 Fetching US ZIP Code dataset with Axios...');

  let rawZips: any[] = [];
  try {
    const response = await axios.get(ZIP_DATASET_URL);
    rawZips = response.data;
    console.log(`📦 Downloaded ${rawZips.length} raw JSON items.`);
  } catch (err: any) {
    console.error('❌ Network error downloading dataset:', err.message);
    process.exit(1);
  }

  // Field mapping matching your Supabase 'zip_codes' table schema (state_code)
  const zips = rawZips
    .map((item) => {
      const rawCode =
        item.zip_code ??
        item.ZipCode ??
        item.zipCode ??
        item.zip ??
        item.Zip ??
        '';
      return {
        zip_code: String(rawCode).padStart(5, '0'),
        city: item.city || item.City || '',
        state_code: item.state || item.State || item.state_id || '',
        latitude: Number(item.latitude || item.Latitude || item.lat) || null,
        longitude: Number(item.longitude || item.Longitude || item.lng) || null,
      };
    })
    .filter((item) => item.zip_code.length === 5 && item.zip_code !== '00000');

  console.log(`✅ Valid mapped ZIP records to insert: ${zips.length}`);

  if (zips.length === 0) {
    console.error('❌ Mapped ZIP count is 0. Aborting seed.');
    process.exit(1);
  }

  // 1. Fetch Active Providers
  const { data: providers, error: provErr } = await supabase
    .from('providers')
    .select('id, name');

  if (provErr || !providers || providers.length === 0) {
    console.error('❌ Could not fetch providers from Supabase:', provErr?.message);
    process.exit(1);
  }

  // 2. Insert ZIP Codes
  const ZIP_BATCH_SIZE = 500;
  console.log('💾 Upserting ZIP codes into Supabase...');

  for (let i = 0; i < zips.length; i += ZIP_BATCH_SIZE) {
    const chunk = zips.slice(i, i + ZIP_BATCH_SIZE);

    const { error: zipErr } = await supabase
      .from('zip_codes')
      .upsert(chunk, { onConflict: 'zip_code' });

    if (zipErr) {
      console.error(`❌ Error on ZIP batch starting at ${i}:`, zipErr.message);
      process.exit(1);
    }
  }
  console.log(`✅ Successfully seeded ${zips.length} ZIP codes!`);

  // 3. Map Provider Coverage
  console.log('🔗 Generating provider coverage entries...');
  const allCoverageRows: any[] = [];

  zips.forEach((item) => {
    providers.forEach((provider) => {
      allCoverageRows.push({
        zip_code: item.zip_code,
        provider_id: provider.id,
        coverage_percentage: Math.floor(Math.random() * 25) + 75,
        max_download_speed: provider.name.toLowerCase().includes('fiber') ? 1000 : 500,
        max_upload_speed: provider.name.toLowerCase().includes('fiber') ? 1000 : 35,
        starting_price: 49.99,
        technology_type: provider.name.toLowerCase().includes('fiber') ? 'Fiber' : 'Cable',
      });
    });
  });

  const COVERAGE_BATCH_SIZE = 1500;
  for (let i = 0; i < allCoverageRows.length; i += COVERAGE_BATCH_SIZE) {
    const chunk = allCoverageRows.slice(i, i + COVERAGE_BATCH_SIZE);

    const { error: covErr } = await supabase
      .from('provider_zip_coverage')
      .upsert(chunk, { onConflict: 'zip_code,provider_id' });

    if (covErr) {
      console.error(`❌ Error on coverage batch starting at ${i}:`, covErr.message);
      process.exit(1);
    }
  }

  console.log('🎉 Database seeding complete!');
}

seedDatabase();