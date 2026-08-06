import { supabase } from '../lib/supabase';

export interface ProviderItem {
  id: string;
  name: string;
  logoUrl: string | null;
  phone: string;
  coveragePct: number;
  downloadSpeed: number;
  uploadSpeed: number;
  startingPrice: number;
  techType: string;
}

export interface ZipLocationData {
  location: {
    zip_code: string;
    city: string;
    state_code: string;
    county: string;
  };
  providers: ProviderItem[];
}

export async function lookupZipData(zipCode: string): Promise<{ error: string | null; data: ZipLocationData | null }> {
  const cleanZip = String(zipCode).trim();

  if (!/^\d{5}$/.test(cleanZip)) {
    return { error: 'Please enter a valid 5-digit US ZIP code.', data: null };
  }

  // Fetch location details
  const { data: location, error: locError } = await supabase
    .from('zip_codes')
    .select('zip_code, city, state_code, county')
    .eq('zip_code', cleanZip)
    .single();

  if (locError || !location) {
    return { error: `No coverage data found for ZIP code ${cleanZip}.`, data: null };
  }

  // Fetch provider coverage details
  const { data: providers, error: provError } = await supabase
    .from('provider_zip_coverage')
    .select(`
      coverage_percentage,
      max_download_speed,
      max_upload_speed,
      starting_price,
      technology_type,
      providers (
        id,
        name,
        logo_url,
        phone_number
      )
    `)
    .eq('zip_code', cleanZip)
    .order('max_download_speed', { ascending: false });

  if (provError || !providers) {
    return { error: 'Failed to retrieve provider details.', data: null };
  }

  const mappedProviders: ProviderItem[] = providers.map((item: any) => ({
    id: item.providers.id,
    name: item.providers.name,
    logoUrl: item.providers.logo_url,
    phone: item.providers.phone_number,
    coveragePct: item.coverage_percentage,
    downloadSpeed: item.max_download_speed,
    uploadSpeed: item.max_upload_speed,
    startingPrice: item.starting_price,
    techType: item.technology_type,
  }));

  return {
    error: null,
    data: {
      location,
      providers: mappedProviders,
    },
  };
}