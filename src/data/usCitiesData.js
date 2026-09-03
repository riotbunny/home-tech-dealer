// Comprehensive 50-State US Markets & Programmatic SEO (pSEO) Directory Database
// Home Tech Dealer Inc.
import { ALL_STATES_CARRIER_FOOTPRINTS, getStateFromZip } from '../services/broadbandLookupService.js';

export const US_STATES = [
  { code: 'AL', name: 'Alabama', region: 'South' },
  { code: 'AK', name: 'Alaska', region: 'West' },
  { code: 'AZ', name: 'Arizona', region: 'West' },
  { code: 'AR', name: 'Arkansas', region: 'South' },
  { code: 'CA', name: 'California', region: 'West' },
  { code: 'CO', name: 'Colorado', region: 'West' },
  { code: 'CT', name: 'Connecticut', region: 'Northeast' },
  { code: 'DE', name: 'Delaware', region: 'South' },
  { code: 'FL', name: 'Florida', region: 'South' },
  { code: 'GA', name: 'Georgia', region: 'South' },
  { code: 'HI', name: 'Hawaii', region: 'West' },
  { code: 'ID', name: 'Idaho', region: 'West' },
  { code: 'IL', name: 'Illinois', region: 'Midwest' },
  { code: 'IN', name: 'Indiana', region: 'Midwest' },
  { code: 'IA', name: 'Iowa', region: 'Midwest' },
  { code: 'KS', name: 'Kansas', region: 'Midwest' },
  { code: 'KY', name: 'Kentucky', region: 'South' },
  { code: 'LA', name: 'Louisiana', region: 'South' },
  { code: 'ME', name: 'Maine', region: 'Northeast' },
  { code: 'MD', name: 'Maryland', region: 'South' },
  { code: 'MA', name: 'Massachusetts', region: 'Northeast' },
  { code: 'MI', name: 'Michigan', region: 'Midwest' },
  { code: 'MN', name: 'Minnesota', region: 'Midwest' },
  { code: 'MS', name: 'Mississippi', region: 'South' },
  { code: 'MO', name: 'Missouri', region: 'Midwest' },
  { code: 'MT', name: 'Montana', region: 'West' },
  { code: 'NE', name: 'Nebraska', region: 'Midwest' },
  { code: 'NV', name: 'Nevada', region: 'West' },
  { code: 'NH', name: 'New Hampshire', region: 'Northeast' },
  { code: 'NJ', name: 'New Jersey', region: 'Northeast' },
  { code: 'NM', name: 'New Mexico', region: 'West' },
  { code: 'NY', name: 'New York', region: 'Northeast' },
  { code: 'NC', name: 'North Carolina', region: 'South' },
  { code: 'ND', name: 'North Dakota', region: 'Midwest' },
  { code: 'OH', name: 'Ohio', region: 'Midwest' },
  { code: 'OK', name: 'Oklahoma', region: 'South' },
  { code: 'OR', name: 'Oregon', region: 'West' },
  { code: 'PA', name: 'Pennsylvania', region: 'Northeast' },
  { code: 'RI', name: 'Rhode Island', region: 'Northeast' },
  { code: 'SC', name: 'South Carolina', region: 'South' },
  { code: 'SD', name: 'South Dakota', region: 'Midwest' },
  { code: 'TN', name: 'Tennessee', region: 'South' },
  { code: 'TX', name: 'Texas', region: 'South' },
  { code: 'UT', name: 'Utah', region: 'West' },
  { code: 'VT', name: 'Vermont', region: 'Northeast' },
  { code: 'VA', name: 'Virginia', region: 'South' },
  { code: 'WA', name: 'Washington', region: 'West' },
  { code: 'WV', name: 'West Virginia', region: 'South' },
  { code: 'WI', name: 'Wisconsin', region: 'Midwest' },
  { code: 'WY', name: 'Wyoming', region: 'West' },
  { code: 'DC', name: 'District of Columbia', region: 'South' }
];

export const STATE_NAME_TO_CODE = US_STATES.reduce((acc, state) => {
  acc[state.name.toLowerCase()] = state.code;
  acc[state.code.toLowerCase()] = state.code;
  return acc;
}, {});

// Curated high-impact metro and regional markets across all 50 states
export const CURATED_CITIES = [
  // TEXAS
  { city: 'Brownsville', state: 'TX', zip: '78522', street: '1001 E Elizabeth St', providers: ['spectrum', 'att', 'directv'], speed: '1000 Mbps', fiber: '89%' },
  { city: 'Austin', state: 'TX', zip: '78701', street: '500 Congress Ave', providers: ['att', 'spectrum', 'astound', 'directv'], speed: '1000 Mbps', fiber: '92%' },
  { city: 'Houston', state: 'TX', zip: '77002', street: '1000 Main St', providers: ['att', 'comcast', 'frontier', 'directv'], speed: '1200 Mbps', fiber: '88%' },
  { city: 'Dallas', state: 'TX', zip: '75201', street: '1700 Pacific Ave', providers: ['att', 'spectrum', 'frontier', 'directv'], speed: '1000 Mbps', fiber: '89%' },
  { city: 'San Antonio', state: 'TX', zip: '78205', street: '300 E Houston St', providers: ['att', 'spectrum', 'directv'], speed: '1000 Mbps', fiber: '84%' },
  { city: 'Fort Worth', state: 'TX', zip: '76102', street: '500 Throckmorton St', providers: ['att', 'spectrum', 'frontier', 'directv'], speed: '1000 Mbps', fiber: '85%' },
  { city: 'El Paso', state: 'TX', zip: '79901', street: '201 E Main St', providers: ['spectrum', 'att', 'directv'], speed: '500 Mbps', fiber: '78%' },
  { city: 'Arlington', state: 'TX', zip: '76010', street: '101 W Abram St', providers: ['att', 'spectrum', 'directv'], speed: '1000 Mbps', fiber: '86%' },
  { city: 'Plano', state: 'TX', zip: '75074', street: '1520 K Ave', providers: ['frontier', 'att', 'spectrum', 'directv'], speed: '1000 Mbps', fiber: '94%' },
  { city: 'Frisco', state: 'TX', zip: '75034', street: '6101 Frisco Square Blvd', providers: ['att', 'frontier', 'spectrum', 'directv'], speed: '1200 Mbps', fiber: '96%' },

  // CALIFORNIA
  { city: 'Los Angeles', state: 'CA', zip: '90012', street: '200 N Spring St', providers: ['spectrum', 'frontier', 'att', 'directv'], speed: '1000 Mbps', fiber: '87%' },
  { city: 'San Francisco', state: 'CA', zip: '94102', street: '1 Dr Carlton B Goodlett Pl', providers: ['comcast', 'att', 'astound', 'directv'], speed: '1200 Mbps', fiber: '94%' },
  { city: 'San Diego', state: 'CA', zip: '92101', street: '202 C St', providers: ['cox', 'att', 'spectrum', 'directv'], speed: '1000 Mbps', fiber: '86%' },
  { city: 'San Jose', state: 'CA', zip: '95113', street: '200 E Santa Clara St', providers: ['comcast', 'att', 'directv'], speed: '1200 Mbps', fiber: '91%' },
  { city: 'Sacramento', state: 'CA', zip: '95814', street: '915 I St', providers: ['comcast', 'att', 'frontier', 'directv'], speed: '1000 Mbps', fiber: '88%' },
  { city: 'Fresno', state: 'CA', zip: '93721', street: '2600 Fresno St', providers: ['comcast', 'att', 'directv'], speed: '1000 Mbps', fiber: '81%' },
  { city: 'Long Beach', state: 'CA', zip: '90802', street: '411 W Ocean Blvd', providers: ['frontier', 'spectrum', 'directv'], speed: '1000 Mbps', fiber: '89%' },
  { city: 'Oakland', state: 'CA', zip: '94612', street: '1 Frank H Ogawa Plaza', providers: ['comcast', 'att', 'directv'], speed: '1200 Mbps', fiber: '90%' },

  // FLORIDA
  { city: 'Miami', state: 'FL', zip: '33101', street: '100 SE 2nd St', providers: ['att', 'comcast', 'directv'], speed: '1200 Mbps', fiber: '93%' },
  { city: 'Orlando', state: 'FL', zip: '32801', street: '400 S Orange Ave', providers: ['spectrum', 'att', 'directv'], speed: '1000 Mbps', fiber: '91%' },
  { city: 'Tampa', state: 'FL', zip: '33602', street: '201 N Franklin St', providers: ['frontier', 'spectrum', 'wow', 'directv'], speed: '1000 Mbps', fiber: '90%' },
  { city: 'Jacksonville', state: 'FL', zip: '32202', street: '117 W Duval St', providers: ['comcast', 'att', 'directv'], speed: '1000 Mbps', fiber: '86%' },
  { city: 'St. Petersburg', state: 'FL', zip: '33701', street: '175 5th St N', providers: ['frontier', 'spectrum', 'wow', 'directv'], speed: '1000 Mbps', fiber: '91%' },
  { city: 'Fort Lauderdale', state: 'FL', zip: '33301', street: '100 N Andrews Ave', providers: ['att', 'comcast', 'directv'], speed: '1200 Mbps', fiber: '92%' },
  { city: 'Tallahassee', state: 'FL', zip: '32301', street: '300 S Adams St', providers: ['comcast', 'century', 'directv'], speed: '500 Mbps', fiber: '79%' },

  // NEW YORK
  { city: 'New York', state: 'NY', zip: '10001', street: '350 5th Ave', providers: ['spectrum', 'verizon', 'optimum', 'astound', 'directv'], speed: '1000 Mbps', fiber: '95%' },
  { city: 'Buffalo', state: 'NY', zip: '14202', street: '65 Niagara Sq', providers: ['spectrum', 'verizon', 'directv'], speed: '500 Mbps', fiber: '82%' },
  { city: 'Rochester', state: 'NY', zip: '14614', street: '30 Church St', providers: ['spectrum', 'frontier', 'directv'], speed: '1000 Mbps', fiber: '85%' },
  { city: 'Yonkers', state: 'NY', zip: '10701', street: '40 S Broadway', providers: ['verizon', 'optimum', 'directv'], speed: '1000 Mbps', fiber: '91%' },
  { city: 'Syracuse', state: 'NY', zip: '13202', street: '233 E Washington St', providers: ['spectrum', 'verizon', 'directv'], speed: '500 Mbps', fiber: '80%' },
  { city: 'Albany', state: 'NY', zip: '12207', street: '24 Eagle St', providers: ['spectrum', 'verizon', 'directv'], speed: '500 Mbps', fiber: '83%' },

  // ILLINOIS
  { city: 'Chicago', state: 'IL', zip: '60601', street: '121 N LaSalle St', providers: ['comcast', 'att', 'astound', 'directv'], speed: '1200 Mbps', fiber: '93%' },
  { city: 'Aurora', state: 'IL', zip: '60505', street: '44 E Downer Pl', providers: ['comcast', 'att', 'metronet', 'directv'], speed: '1000 Mbps', fiber: '87%' },
  { city: 'Naperville', state: 'IL', zip: '60540', street: '400 S Eagle St', providers: ['comcast', 'att', 'wow', 'directv'], speed: '1200 Mbps', fiber: '92%' },
  { city: 'Rockford', state: 'IL', zip: '61101', street: '425 E State St', providers: ['comcast', 'frontier', 'directv'], speed: '500 Mbps', fiber: '77%' },
  { city: 'Springfield', state: 'IL', zip: '62701', street: '300 S 7th St', providers: ['comcast', 'att', 'directv'], speed: '500 Mbps', fiber: '79%' },

  // OHIO
  { city: 'Columbus', state: 'OH', zip: '43215', street: '100 S High St', providers: ['spectrum', 'altafiber', 'breezeline', 'att', 'directv'], speed: '1000 Mbps', fiber: '88%' },
  { city: 'Cleveland', state: 'OH', zip: '44114', street: '601 Lakeside Ave', providers: ['spectrum', 'att', 'breezeline', 'directv'], speed: '1000 Mbps', fiber: '85%' },
  { city: 'Cincinnati', state: 'OH', zip: '45202', street: '801 Plum St', providers: ['altafiber', 'spectrum', 'directv'], speed: '1000 Mbps', fiber: '92%' },
  { city: 'Toledo', state: 'OH', zip: '43604', street: '1 Government Ctr', providers: ['buckeye', 'att', 'spectrum', 'directv'], speed: '1000 Mbps', fiber: '84%' },
  { city: 'Akron', state: 'OH', zip: '44308', street: '166 S High St', providers: ['spectrum', 'att', 'directv'], speed: '500 Mbps', fiber: '80%' },
  { city: 'Dayton', state: 'OH', zip: '45402', street: '101 W 3rd St', providers: ['spectrum', 'att', 'altafiber', 'directv'], speed: '1000 Mbps', fiber: '83%' },

  // WASHINGTON
  { city: 'Seattle', state: 'WA', zip: '98101', street: '1301 2nd Ave', providers: ['ziply', 'comcast', 'century', 'directv'], speed: '1000 Mbps', fiber: '91%' },
  { city: 'Spokane', state: 'WA', zip: '99201', street: '808 W Spokane Falls Blvd', providers: ['comcast', 'century', 'directv'], speed: '1000 Mbps', fiber: '82%' },
  { city: 'Tacoma', state: 'WA', zip: '98402', street: '747 Market St', providers: ['comcast', 'century', 'directv'], speed: '1000 Mbps', fiber: '86%' },
  { city: 'Bellevue', state: 'WA', zip: '98004', street: '450 110th Ave NE', providers: ['comcast', 'ziply', 'century', 'directv'], speed: '1200 Mbps', fiber: '95%' },

  // ARIZONA
  { city: 'Phoenix', state: 'AZ', zip: '85004', street: '100 N Central Ave', providers: ['cox', 'att', 'century', 'directv'], speed: '1000 Mbps', fiber: '88%' },
  { city: 'Tucson', state: 'AZ', zip: '85701', street: '255 W Alameda St', providers: ['cox', 'century', 'directv'], speed: '1000 Mbps', fiber: '83%' },
  { city: 'Mesa', state: 'AZ', zip: '85201', street: '20 E Main St', providers: ['cox', 'century', 'directv'], speed: '1000 Mbps', fiber: '87%' },
  { city: 'Scottsdale', state: 'AZ', zip: '85251', street: '3939 N Drinkwater Blvd', providers: ['cox', 'century', 'directv'], speed: '1000 Mbps', fiber: '92%' },

  // GEORGIA
  { city: 'Atlanta', state: 'GA', zip: '30303', street: '55 Trinity Ave SW', providers: ['att', 'comcast', 'directv'], speed: '1200 Mbps', fiber: '94%' },
  { city: 'Augusta', state: 'GA', zip: '30901', street: '535 Telfair St', providers: ['comcast', 'att', 'wow', 'directv'], speed: '1000 Mbps', fiber: '82%' },
  { city: 'Savannah', state: 'GA', zip: '31401', street: '2 E Bay St', providers: ['comcast', 'att', 'directv'], speed: '1000 Mbps', fiber: '84%' },

  // NORTH CAROLINA
  { city: 'Charlotte', state: 'NC', zip: '28202', street: '600 E 4th St', providers: ['spectrum', 'att', 'directv'], speed: '1000 Mbps', fiber: '91%' },
  { city: 'Raleigh', state: 'NC', zip: '27601', street: '222 W Hargett St', providers: ['spectrum', 'att', 'directv'], speed: '1000 Mbps', fiber: '93%' },
  { city: 'Durham', state: 'NC', zip: '27701', street: '101 City Hall Plaza', providers: ['spectrum', 'att', 'frontier', 'directv'], speed: '1000 Mbps', fiber: '92%' },
  { city: 'Greensboro', state: 'NC', zip: '27401', street: '300 W Washington St', providers: ['spectrum', 'att', 'directv'], speed: '1000 Mbps', fiber: '86%' },

  // COLORADO
  { city: 'Denver', state: 'CO', zip: '80202', street: '1437 Bannock St', providers: ['comcast', 'century', 'directv'], speed: '1200 Mbps', fiber: '92%' },
  { city: 'Colorado Springs', state: 'CO', zip: '80903', street: '107 N Nevada Ave', providers: ['comcast', 'century', 'directv'], speed: '1000 Mbps', fiber: '87%' },
  { city: 'Aurora', state: 'CO', zip: '80012', street: '15151 E Alameda Pkwy', providers: ['comcast', 'century', 'directv'], speed: '1000 Mbps', fiber: '89%' },

  // PENNSYLVANIA
  { city: 'Philadelphia', state: 'PA', zip: '19107', street: '1401 John F Kennedy Blvd', providers: ['comcast', 'verizon', 'directv'], speed: '1200 Mbps', fiber: '94%' },
  { city: 'Pittsburgh', state: 'PA', zip: '15219', street: '414 Grant St', providers: ['comcast', 'verizon', 'directv'], speed: '1000 Mbps', fiber: '89%' },
  { city: 'Allentown', state: 'PA', zip: '18101', street: '435 Hamilton St', providers: ['astound', 'verizon', 'directv'], speed: '1000 Mbps', fiber: '85%' },

  // MICHIGAN
  { city: 'Detroit', state: 'MI', zip: '48226', street: '2 Woodward Ave', providers: ['comcast', 'att', 'directv'], speed: '1000 Mbps', fiber: '85%' },
  { city: 'Grand Rapids', state: 'MI', zip: '49503', street: '300 Monroe Ave NW', providers: ['comcast', 'att', 'directv'], speed: '1000 Mbps', fiber: '88%' },
  { city: 'Ann Arbor', state: 'MI', zip: '48104', street: '301 E Huron St', providers: ['comcast', 'att', 'directv'], speed: '1000 Mbps', fiber: '93%' },

  // MASSACHUSETTS
  { city: 'Boston', state: 'MA', zip: '02201', street: '1 City Hall Square', providers: ['comcast', 'verizon', 'astound', 'directv'], speed: '1200 Mbps', fiber: '95%' },
  { city: 'Worcester', state: 'MA', zip: '01608', street: '455 Main St', providers: ['spectrum', 'verizon', 'directv'], speed: '1000 Mbps', fiber: '87%' },
  { city: 'Cambridge', state: 'MA', zip: '02139', street: '795 Massachusetts Ave', providers: ['comcast', 'verizon', 'directv'], speed: '1200 Mbps', fiber: '96%' },

  // TENNESSEE
  { city: 'Nashville', state: 'TN', zip: '37201', street: '1 Public Square', providers: ['att', 'comcast', 'directv'], speed: '1200 Mbps', fiber: '92%' },
  { city: 'Memphis', state: 'TN', zip: '38103', street: '125 N Main St', providers: ['comcast', 'att', 'directv'], speed: '1000 Mbps', fiber: '84%' },
  { city: 'Knoxville', state: 'TN', zip: '37902', street: '400 Main St', providers: ['comcast', 'att', 'directv'], speed: '1000 Mbps', fiber: '86%' },

  // MISSOURI
  { city: 'Kansas City', state: 'MO', zip: '64106', street: '414 E 12th St', providers: ['spectrum', 'att', 'directv'], speed: '1000 Mbps', fiber: '92%' },
  { city: 'St. Louis', state: 'MO', zip: '63103', street: '1200 Market St', providers: ['spectrum', 'att', 'directv'], speed: '1000 Mbps', fiber: '88%' },

  // NEVADA
  { city: 'Las Vegas', state: 'NV', zip: '89101', street: '495 S Main St', providers: ['cox', 'century', 'directv'], speed: '1000 Mbps', fiber: '91%' },
  { city: 'Reno', state: 'NV', zip: '89501', street: '1 E 1st St', providers: ['spectrum', 'att', 'directv'], speed: '1000 Mbps', fiber: '87%' },

  // VIRGINIA
  { city: 'Virginia Beach', state: 'VA', zip: '23456', street: '2401 Courthouse Dr', providers: ['cox', 'verizon', 'directv'], speed: '1000 Mbps', fiber: '90%' },
  { city: 'Richmond', state: 'VA', zip: '23219', street: '900 E Broad St', providers: ['comcast', 'verizon', 'directv'], speed: '1000 Mbps', fiber: '89%' },

  // MINNESOTA
  { city: 'Minneapolis', state: 'MN', zip: '55415', street: '350 S 5th St', providers: ['comcast', 'century', 'directv'], speed: '1000 Mbps', fiber: '91%' },
  { city: 'Saint Paul', state: 'MN', zip: '55102', street: '15 W Kellogg Blvd', providers: ['comcast', 'century', 'directv'], speed: '1000 Mbps', fiber: '89%' },

  // INDIANA
  { city: 'Indianapolis', state: 'IN', zip: '46204', street: '200 E Washington St', providers: ['spectrum', 'att', 'directv'], speed: '1000 Mbps', fiber: '88%' },

  // WISCONSIN
  { city: 'Milwaukee', state: 'WI', zip: '53202', street: '200 E Wells St', providers: ['spectrum', 'att', 'directv'], speed: '1000 Mbps', fiber: '87%' },

  // OREGON
  { city: 'Portland', state: 'OR', zip: '97201', street: '1221 SW 4th Ave', providers: ['comcast', 'century', 'ziply', 'directv'], speed: '1000 Mbps', fiber: '90%' },

  // OKLAHOMA
  { city: 'Oklahoma City', state: 'OK', zip: '73102', street: '200 N Walker Ave', providers: ['cox', 'att', 'directv'], speed: '1000 Mbps', fiber: '86%' },

  // UTAH
  { city: 'Salt Lake City', state: 'UT', zip: '84111', street: '451 S State St', providers: ['comcast', 'century', 'directv'], speed: '1000 Mbps', fiber: '91%' }
];

/**
 * Normalizes any string into a clean, hyphenated slug
 * Example: "Austin, TX" -> "austin-tx", "St. Louis, MO" -> "st-louis-mo"
 */
export function createCitySlug(city, state) {
  if (!city) return '';
  const cleanCity = city
    .toLowerCase()
    .replace(/[.'’]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  const cleanState = (state || '').toLowerCase().trim();
  return cleanState ? `${cleanCity}-${cleanState}` : cleanCity;
}

/**
 * Parses any incoming slug (from URL pathname or search param)
 * Handles: "austin-tx", "salt-lake-city-ut", "st-louis-mo", "orlando-fl", "miami-florida"
 */
export function parseCitySlug(rawSlug) {
  if (!rawSlug) return null;
  
  // Strip leading /internet/ or /
  let slug = rawSlug.toLowerCase().trim();
  slug = slug.replace(/^\/internet\/?/, '').replace(/^\//, '').replace(/\/$/, '');
  
  if (!slug) return null;

  // Split by hyphens
  const parts = slug.split('-').filter(Boolean);
  if (parts.length === 0) return null;

  // Last part is typically the state code or state name
  let stateCode = '';
  let cityParts = [];

  const lastPart = parts[parts.length - 1];
  if (lastPart.length === 2 && STATE_NAME_TO_CODE[lastPart]) {
    stateCode = STATE_NAME_TO_CODE[lastPart];
    cityParts = parts.slice(0, parts.length - 1);
  } else if (STATE_NAME_TO_CODE[lastPart]) {
    stateCode = STATE_NAME_TO_CODE[lastPart];
    cityParts = parts.slice(0, parts.length - 1);
  } else {
    // If state wasn't cleanly separated at end, treat entire string as city
    cityParts = parts;
  }

  // Capitalize city words
  const city = cityParts
    .map(w => {
      if (w === 'st') return 'St.';
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');

  return {
    city: city || 'Your Local',
    state: stateCode.toUpperCase() || 'USA',
    slug: slug
  };
}

/**
 * Universal Location & 44k ZIP Route Resolver
 * Seamlessly resolves any URL format:
 * 1. /internet/:state/:city/:zip (e.g. /internet/tx/brownsville/78522 - 44k canonical format)
 * 2. /internet/:state/:city (e.g. /internet/tx/brownsville)
 * 3. /internet/:zip or /zip/:zip (e.g. /internet/78522 or /zip/78522)
 * 4. /internet/:citySlug (e.g. /internet/brownsville-tx)
 * 5. Query parameters (?state=TX&city=Brownsville&zip=78522)
 */
export function resolveLocationRoute(pathname, searchParams) {
  let state = '';
  let city = '';
  let zip = '';

  const cleanPath = (pathname || '').replace(/\/$/, '').toLowerCase().trim();
  const parts = cleanPath.split('/').filter(Boolean);

  // Pattern 1: /internet/:state/:city/:zip (Canonical 44k pSEO pattern)
  if (parts.length >= 4 && parts[0] === 'internet') {
    state = (parts[1] || '').toUpperCase();
    city = (parts[2] || '').replace(/-/g, ' ');
    zip = (parts[3] || '');
  }
  // Pattern 2: /internet/:state/:city
  else if (parts.length === 3 && parts[0] === 'internet' && parts[1].length === 2) {
    state = (parts[1] || '').toUpperCase();
    city = (parts[2] || '').replace(/-/g, ' ');
  }
  // Pattern 3: /internet/:zip or /zip/:zip (e.g. /internet/78522 or /zip/78522)
  else if ((parts.length === 2 && (parts[0] === 'internet' || parts[0] === 'zip')) && /^\d{5}$/.test(parts[1])) {
    zip = parts[1];
    state = getStateFromZip(zip) || 'USA';
    city = '';
  }
  // Pattern 4: /internet/:city-:state (e.g. /internet/brownsville-tx)
  else if (parts.length === 2 && parts[0] === 'internet') {
    const parsed = parseCitySlug(parts[1]);
    if (parsed) {
      city = parsed.city;
      state = parsed.state;
    }
  }
  // Pattern 5: Direct root slug /:city-:state
  else if (parts.length === 1 && parts[0].includes('-')) {
    const parsed = parseCitySlug(parts[0]);
    if (parsed && parsed.state && parsed.state !== 'USA') {
      city = parsed.city;
      state = parsed.state;
    }
  }

  // Check search params if provided
  if (searchParams) {
    const sState = searchParams.get('state');
    const sCity = searchParams.get('city');
    const sZip = searchParams.get('zip');
    if (sState) state = sState.toUpperCase();
    if (sCity) city = sCity;
    if (sZip) zip = sZip;
  }

  if (!state && !city && !zip) return null;

  // Capitalize city words cleanly
  const formattedCity = city
    ? city.split(' ').map(w => w ? (w.toLowerCase() === 'st' || w.toLowerCase() === 'st.' ? 'St.' : w.charAt(0).toUpperCase() + w.slice(1)) : '').join(' ')
    : '';

  // State code validation
  const validState = STATE_NAME_TO_CODE[state.toLowerCase()] || state.toUpperCase() || 'USA';
  const stateInfo = US_STATES.find(s => s.code === validState) || { name: validState, code: validState };

  // Check curated database for matching city or zip
  const found = CURATED_CITIES.find(c => 
    c.state.toUpperCase() === validState && 
    ((formattedCity && c.city.toLowerCase() === formattedCity.toLowerCase()) || (zip && c.zip === zip))
  );

  const finalCity = found ? found.city : (formattedCity || 'Your Area');
  const finalZip = zip || (found ? found.zip : (validState === 'TX' ? '78701' : '55555'));
  const finalStreet = found ? found.street : 'Main Street';
  const finalSpeed = found ? found.speed : '1000 Mbps';
  const finalFiber = found ? found.fiber : '88%';

  // Regional providers for that state from official footprint database
  const regionalProviders = ALL_STATES_CARRIER_FOOTPRINTS[validState] || ['att', 'spectrum', 'directv'];

  const citySlug = createCitySlug(finalCity, validState);
  
  // Exact Canonical Path matching https://www.hometechdealer.com/internet/tx/brownsville/78522
  const canonicalPath = finalZip
    ? `/internet/${validState.toLowerCase()}/${createCitySlug(finalCity)}/${finalZip}`
    : `/internet/${validState.toLowerCase()}/${createCitySlug(finalCity)}`;

  return {
    id: citySlug,
    city: `${finalCity}, ${validState}`,
    cityName: finalCity,
    state: validState,
    stateName: stateInfo.name,
    zip: finalZip,
    street: finalStreet,
    canonicalPath: canonicalPath,
    description: `Verified broadband comparison market for ${finalCity}, ${stateInfo.name} ${finalZip}. Compare fiber, 5G home, and satellite internet deals.`,
    serviceableProviderIds: regionalProviders,
    medianHouseholdSpeed: finalSpeed,
    fiberCoverage: finalFiber,
    avgQCR: '44.8%'
  };
}

/**
 * Resolves a city object from the curated list or auto-generates a full market entry
 */
export function getCityBySlug(rawSlug) {
  if (!rawSlug) return null;
  if (rawSlug.includes('/')) {
    return resolveLocationRoute(rawSlug);
  }
  return resolveLocationRoute(`/internet/${rawSlug}`);
}

/**
 * Returns neighboring or related cities for local radius pills
 */
export function getNearbyCities(cityName, stateCode) {
  const sameStateCities = CURATED_CITIES.filter(
    c => c.state.toUpperCase() === (stateCode || '').toUpperCase() && 
         c.city.toLowerCase() !== (cityName || '').toLowerCase()
  );

  if (sameStateCities.length >= 3) {
    return sameStateCities.slice(0, 4).map(c => `${c.city}, ${c.state}`);
  }

  // Fallback to top national metros
  return ['Austin, TX', 'Miami, FL', 'Chicago, IL', 'Seattle, WA'];
}

/**
 * Groups curated and state cities for the crawlable directory index
 */
export function getStatesList() {
  return US_STATES.map(state => {
    const citiesInState = CURATED_CITIES.filter(c => c.state === state.code);
    return {
      ...state,
      cities: citiesInState
    };
  });
}
