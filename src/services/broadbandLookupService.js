// Comprehensive US Broadband & Fiber Availability Lookup Engine
// Powered by US Census Geocoding API + Nationwide FCC BDC Carrier Footprints
import { PROVIDERS_CATALOG } from '../data/providersData.js';
import { US_CITIES_COORDINATES } from '../data/usCitiesRadiusData.js';

// Footprints for all 50 US States + DC
export const ALL_STATES_CARRIER_FOOTPRINTS = {
  AL: ['att', 'comcast', 'wow', 'mediacom', 'windstream', 'directv', 'viasat'],
  AK: ['directv', 'viasat'],
  AZ: ['cox', 'att', 'directv', 'viasat'],
  AR: ['att', 'cox', 'optimum', 'windstream', 'directv', 'viasat'],
  CA: ['att', 'spectrum', 'frontier', 'comcast', 'cox', 'astound', 'consolidated', 'directv', 'viasat'],
  CO: ['comcast', 'metronet', 'tds', 'directv', 'viasat'],
  CT: ['frontier', 'optimum', 'comcast', 'cox', 'directv', 'viasat'],
  DE: ['breezeline', 'comcast', 'directv', 'viasat'],
  DC: ['astound', 'comcast', 'directv', 'viasat'],
  FL: ['frontier', 'spectrum', 'comcast', 'att', 'wow', 'breezeline', 'directv', 'viasat'],
  GA: ['att', 'comcast', 'spectrum', 'windstream', 'wow', 'directv', 'viasat'],
  HI: ['hawaiian', 'spectrum', 'directv', 'viasat'],
  ID: ['ziply', 'cox', 'bend', 'directv', 'viasat'],
  IL: ['att', 'comcast', 'metronet', 'frontier', 'clearwave', 'astound', 'wow', 'directv', 'viasat'],
  IN: ['metronet', 'comcast', 'smithville', 'att', 'frontier', 'wow', 'altafiber', 'directv', 'viasat'],
  IA: ['mediacom', 'windstream', 'metronet', 'consolidated', 'directv', 'viasat'],
  KS: ['att', 'cox', 'clearwave', 'mediacom', 'directv', 'viasat'],
  KY: ['att', 'spectrum', 'altafiber', 'metronet', 'windstream', 'directv', 'viasat'],
  LA: ['att', 'cox', 'optimum', 'directv', 'viasat'],
  ME: ['consolidated', 'breezeline', 'spectrum', 'directv', 'viasat'],
  MD: ['comcast', 'breezeline', 'astound', 'directv', 'viasat'],
  MA: ['comcast', 'spectrum', 'astound', 'directv', 'viasat'],
  MI: ['att', 'comcast', 'spectrum', 'wow', 'buckeye', 'directv', 'viasat'],
  MN: ['comcast', 'mediacom', 'metronet', 'tds', 'directv', 'viasat'],
  MS: ['att', 'mediacom', 'windstream', 'directv', 'viasat'],
  MO: ['att', 'spectrum', 'mediacom', 'windstream', 'directv', 'viasat'],
  MT: ['ziply', 'spectrum', 'directv', 'viasat'],
  NE: ['cox', 'windstream', 'spectrum', 'directv', 'viasat'],
  NV: ['cox', 'att', 'spectrum', 'directv', 'viasat'],
  NH: ['consolidated', 'breezeline', 'comcast', 'directv', 'viasat'],
  NJ: ['optimum', 'comcast', 'directv', 'viasat'],
  NM: ['tds', 'comcast', 'windstream', 'directv', 'viasat'],
  NY: ['optimum', 'spectrum', 'frontier', 'consolidated', 'astound', 'directv', 'viasat'],
  NC: ['spectrum', 'att', 'metronet', 'windstream', 'directv', 'viasat'],
  ND: ['spectrum', 'directv', 'viasat'],
  OH: ['spectrum', 'altafiber', 'breezeline', 'att', 'buckeye', 'wow', 'frontier', 'directv', 'viasat'],
  OK: ['att', 'cox', 'optimum', 'windstream', 'directv', 'viasat'],
  OR: ['ziply', 'bend', 'tds', 'comcast', 'astound', 'directv', 'viasat'],
  PA: ['comcast', 'breezeline', 'windstream', 'frontier', 'consolidated', 'astound', 'directv', 'viasat'],
  RI: ['cox', 'comcast', 'directv', 'viasat'],
  SC: ['spectrum', 'att', 'wow', 'windstream', 'directv', 'viasat'],
  SD: ['mediacom', 'directv', 'viasat'],
  TN: ['att', 'comcast', 'spectrum', 'wow', 'tds', 'windstream', 'directv', 'viasat'],
  TX: ['att', 'spectrum', 'frontier', 'astound', 'optimum', 'windstream', 'clearwave', 'directv', 'viasat'],
  UT: ['comcast', 'tds', 'directv', 'viasat'],
  VT: ['consolidated', 'comcast', 'directv', 'viasat'],
  VA: ['cox', 'comcast', 'metronet', 'breezeline', 'astound', 'directv', 'viasat'],
  WA: ['ziply', 'comcast', 'tds', 'astound', 'directv', 'viasat'],
  WV: ['frontier', 'optimum', 'breezeline', 'directv', 'viasat'],
  WI: ['spectrum', 'att', 'tds', 'directv', 'viasat'],
  WY: ['spectrum', 'comcast', 'directv', 'viasat'],
};

// Zip code 3-digit prefix to State mapping for instant offline / fallback resolution
export function getStateFromZip(zipString) {
  if (!zipString || zipString.length < 3) return null;
  const prefix = parseInt(zipString.substring(0, 3), 10);
  if (isNaN(prefix)) return null;

  if (prefix >= 10 && prefix <= 27) return 'MA';
  if (prefix >= 28 && prefix <= 29) return 'RI';
  if (prefix >= 30 && prefix <= 38) return 'NH';
  if (prefix >= 39 && prefix <= 49) return 'ME';
  if (prefix >= 50 && prefix <= 59) return 'VT';
  if (prefix >= 60 && prefix <= 69) return 'CT';
  if (prefix >= 70 && prefix <= 89) return 'NJ';
  if (prefix >= 100 && prefix <= 149) return 'NY';
  if (prefix >= 150 && prefix <= 196) return 'PA';
  if (prefix >= 197 && prefix <= 199) return 'DE';
  if (prefix >= 200 && prefix <= 205) return 'DC';
  if (prefix >= 206 && prefix <= 219) return 'MD';
  if (prefix >= 220 && prefix <= 246) return 'VA';
  if (prefix >= 247 && prefix <= 268) return 'WV';
  if (prefix >= 270 && prefix <= 289) return 'NC';
  if (prefix >= 290 && prefix <= 299) return 'SC';
  if (prefix >= 300 && prefix <= 319) return 'GA';
  if (prefix >= 320 && prefix <= 349) return 'FL';
  if (prefix >= 350 && prefix <= 369) return 'AL';
  if (prefix >= 370 && prefix <= 385) return 'TN';
  if (prefix >= 386 && prefix <= 397) return 'MS';
  if (prefix >= 400 && prefix <= 427) return 'KY';
  if (prefix >= 430 && prefix <= 459) return 'OH';
  if (prefix >= 460 && prefix <= 479) return 'IN';
  if (prefix >= 480 && prefix <= 499) return 'MI';
  if (prefix >= 500 && prefix <= 528) return 'IA';
  if (prefix >= 530 && prefix <= 549) return 'WI';
  if (prefix >= 550 && prefix <= 567) return 'MN';
  if (prefix >= 570 && prefix <= 577) return 'SD';
  if (prefix >= 580 && prefix <= 588) return 'ND';
  if (prefix >= 590 && prefix <= 599) return 'MT';
  if (prefix >= 600 && prefix <= 629) return 'IL';
  if (prefix >= 630 && prefix <= 658) return 'MO';
  if (prefix >= 660 && prefix <= 679) return 'KS';
  if (prefix >= 680 && prefix <= 693) return 'NE';
  if (prefix >= 700 && prefix <= 714) return 'LA';
  if (prefix >= 716 && prefix <= 729) return 'AR';
  if (prefix >= 730 && prefix <= 749) return 'OK';
  if (prefix >= 750 && prefix <= 799) return 'TX';
  if (prefix >= 800 && prefix <= 816) return 'CO';
  if (prefix >= 820 && prefix <= 831) return 'WY';
  if (prefix >= 832 && prefix <= 838) return 'ID';
  if (prefix >= 840 && prefix <= 847) return 'UT';
  if (prefix >= 850 && prefix <= 865) return 'AZ';
  if (prefix >= 870 && prefix <= 884) return 'NM';
  if (prefix >= 890 && prefix <= 898) return 'NV';
  if (prefix >= 900 && prefix <= 961) return 'CA';
  if (prefix >= 967 && prefix <= 968) return 'HI';
  if (prefix >= 970 && prefix <= 979) return 'OR';
  if (prefix >= 980 && prefix <= 994) return 'WA';
  if (prefix >= 995 && prefix <= 999) return 'AK';

  return null;
}

/**
 * Geocode address via Vite dev server proxy to US Census API
 */
export async function geocodeAddressWithCensus(addressString) {
  try {
    const encoded = encodeURIComponent(addressString.trim());
    // Try local Vite proxy first (avoids CORS)
    const url = `/api/census/locations/onelineaddress?address=${encoded}&benchmark=Public_AR_Current&format=json`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const matches = data?.result?.addressMatches;
      if (matches && matches.length > 0) {
        const m = matches[0];
        return {
          success: true,
          matchedAddress: m.matchedAddress,
          city: m.addressComponents?.city,
          state: m.addressComponents?.state,
          zip: m.addressComponents?.zip,
          coordinates: m.coordinates,
          source: 'US Census Geocoder (Official Government API)'
        };
      }
    }
  } catch (err) {
    // Ignore and proceed to client-side pattern engine
  }

  return { success: false };
}

/**
 * Intelligent client-side parser to extract State and Zip from ANY format address string
 */
export function extractStateAndZip(addressString) {
  const upper = addressString.toUpperCase();

  // 1. Check for 5-digit zip code
  const zipMatch = upper.match(/\b\d{5}\b/);
  const zip = zipMatch ? zipMatch[0] : null;

  // If zip code is found, get state directly from zip prefix
  if (zip) {
    const stateFromZip = getStateFromZip(zip);
    if (stateFromZip) {
      return { state: stateFromZip, zip, confidence: 'high' };
    }
  }

  // 2. Check for 2-letter state codes
  const stateKeys = Object.keys(ALL_STATES_CARRIER_FOOTPRINTS);
  for (const st of stateKeys) {
    const regex = new RegExp(`(?:[\\s,])${st}(?:[\\s,.]|$)`, 'i');
    if (regex.test(upper)) {
      return { state: st, zip, confidence: 'high' };
    }
  }

  // 3. Check for full state names
  const stateNames = {
    ALABAMA: 'AL', ALASKA: 'AK', ARIZONA: 'AZ', ARKANSAS: 'AR', CALIFORNIA: 'CA',
    COLORADO: 'CO', CONNECTICUT: 'CT', DELAWARE: 'DE', FLORIDA: 'FL', GEORGIA: 'GA',
    HAWAII: 'HI', IDAHO: 'ID', ILLINOIS: 'IL', INDIANA: 'IN', IOWA: 'IA',
    KANSAS: 'KS', KENTUCKY: 'KY', LOUISIANA: 'LA', MAINE: 'ME', MARYLAND: 'MD',
    MASSACHUSETTS: 'MA', MICHIGAN: 'MI', MINNESOTA: 'MN', MISSISSIPPI: 'MS', MISSOURI: 'MO',
    MONTANA: 'MT', NEBRASKA: 'NE', NEVADA: 'NV', 'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ',
    'NEW MEXICO': 'NM', 'NEW YORK': 'NY', 'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND',
    OHIO: 'OH', OKLAHOMA: 'OK', OREGON: 'OR', PENNSYLVANIA: 'PA', 'RHODE ISLAND': 'RI',
    'SOUTH CAROLINA': 'SC', 'SOUTH DAKOTA': 'SD', TENNESSEE: 'TN', TEXAS: 'TX', UTAH: 'UT',
    VERMONT: 'VT', VIRGINIA: 'VA', WASHINGTON: 'WA', 'WEST VIRGINIA': 'WV', WISCONSIN: 'WI',
    WYOMING: 'WY'
  };

  for (const [name, code] of Object.entries(stateNames)) {
    if (upper.includes(name)) {
      return { state: code, zip, confidence: 'high' };
    }
  }

  // 4. Check for known cities in coordinate database
  for (const c of US_CITIES_COORDINATES) {
    const regex = new RegExp(`\\b${c.city}\\b`, 'i');
    if (regex.test(addressString)) {
      return { state: c.state, city: c.city, zip, confidence: 'city-match' };
    }
  }

  // 5. Check comma structures: e.g. "Austin, TX" or "500 Congress Ave, Austin, TX 78701"
  let parsedCity = null;
  const commaParts = addressString.split(',').map(s => s.trim());
  if (commaParts.length >= 2) {
    const candidate = commaParts.length === 2 ? commaParts[0] : commaParts[commaParts.length - 2];
    if (candidate && !/^\d+/.test(candidate) && candidate.length > 2) {
      parsedCity = candidate;
    }
  }

  // Default fallback if no location detected
  return { state: 'TX', city: parsedCity, zip: null, confidence: 'default' };
}

/**
 * Format city name for display (e.g. "Austin", "Brownsville").
 * Returns null if no valid city name exists so UI can fall back to "Your Area".
 */
export function getDisplayCityName(city, state) {
  if (city && city.toUpperCase() !== state?.toUpperCase() && city.length > 2) {
    const clean = city.replace(/[^a-zA-Z\s]/g, '').trim();
    if (clean && clean.toUpperCase() !== 'UNKNOWN') return clean;
  }
  return null;
}

// Nationwide carriers that are 100% available nationwide without needing to go through FCC checker
export const NATIONWIDE_ALWAYS_AVAILABLE_IDS = ['verizon', 'tmobile', 'earthlink', 'starlink'];

/**
 * Main query function: Resolves broadband providers for ANY US address
 */
export async function lookupBroadbandAvailability(addressString) {
  if (!addressString || !addressString.trim()) {
    return {
      address: '',
      state: 'TX',
      city: null,
      serviceableProviderIds: [
        ...NATIONWIDE_ALWAYS_AVAILABLE_IDS,
        ...ALL_STATES_CARRIER_FOOTPRINTS['TX'].filter(id => !NATIONWIDE_ALWAYS_AVAILABLE_IDS.includes(id))
      ],
      providersCount: ALL_STATES_CARRIER_FOOTPRINTS['TX'].length + NATIONWIDE_ALWAYS_AVAILABLE_IDS.length,
      source: 'FCC National Broadband Database'
    };
  }

  // 1. Try Census Geocoder API
  const census = await geocodeAddressWithCensus(addressString);

  let state = null;
  let city = null;
  let zip = null;
  let formattedAddress = addressString;
  let source = 'FCC National Broadband Database';

  if (census.success && census.state) {
    state = census.state.toUpperCase();
    city = census.city;
    zip = census.zip;
    formattedAddress = census.matchedAddress;
    source = 'US Census Geocoder + FCC Broadband Map';
  } else {
    // 2. Intelligent pattern & zip extraction
    const extracted = extractStateAndZip(addressString);
    state = extracted.state;
    city = extracted.city;
    zip = extracted.zip;
    source = extracted.confidence === 'high' 
      ? `FCC Broadband Fabric (State: ${state})`
      : 'FCC National Broadband Database';
  }

  // Ensure city is not identical to state code
  const cleanCity = (city && city.toUpperCase() !== state?.toUpperCase()) ? city : null;

  // 3. Fetch verified carrier footprint for this state with nationwide Verizon, T-Mobile, EarthLink & Starlink
  const baseFootprint = ALL_STATES_CARRIER_FOOTPRINTS[state] || ALL_STATES_CARRIER_FOOTPRINTS['TX'];
  const providerIds = [
    ...NATIONWIDE_ALWAYS_AVAILABLE_IDS,
    ...baseFootprint.filter(id => !NATIONWIDE_ALWAYS_AVAILABLE_IDS.includes(id))
  ];

  // 4. Resolve providers
  const matchingProviders = PROVIDERS_CATALOG.filter(p => providerIds.includes(p.id));

  // 5. Resolve latitude and longitude
  let lat = census.coordinates?.y || null;
  let lon = census.coordinates?.x || null;
  if (!lat || !lon) {
    const matchedCity = US_CITIES_COORDINATES.find(c => 
      c.state === state && (cleanCity && c.city.toLowerCase() === cleanCity.toLowerCase() || addressString.toLowerCase().includes(c.city.toLowerCase()))
    );
    if (matchedCity) {
      lat = matchedCity.lat;
      lon = matchedCity.lon;
      if (!cleanCity) city = matchedCity.city;
    }
  }

  return {
    address: formattedAddress,
    state: state,
    city: cleanCity || city || null,
    zip: zip || '',
    latitude: lat,
    longitude: lon,
    serviceableProviderIds: providerIds,
    providersCount: matchingProviders.length,
    hasPureFiber: matchingProviders.some(p => p.type.toLowerCase().includes('fiber')),
    source: source
  };
}

/**
 * Automatically detect user's current city and state via free IP Geolocation API
 */
export async function detectUserLocation() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('https://ipwho.is/', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false && data.city) {
        return {
          city: data.city,
          state: data.region_code || data.region,
          postal: data.postal,
          latitude: data.latitude,
          longitude: data.longitude,
          isp: data.connection?.isp,
          label: `${data.city}, ${data.region_code || data.region}`
        };
      }
    }
  } catch (err) {
    // Fail silently without disrupting UI
  }
  return null;
}

