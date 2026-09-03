// Comprehensive database of US Cities and Suburbs with Latitude / Longitude
// Used to dynamically compute nearby radius cities based on user geolocation

export const US_CITIES_COORDINATES = [
  // South Texas / Rio Grande Valley
  { city: 'Brownsville', state: 'TX', lat: 25.9017, lon: -97.4975 },
  { city: 'Harlingen', state: 'TX', lat: 26.1906, lon: -97.6961 },
  { city: 'McAllen', state: 'TX', lat: 26.2034, lon: -98.2300 },
  { city: 'Edinburg', state: 'TX', lat: 26.3017, lon: -98.1633 },
  { city: 'Mission', state: 'TX', lat: 26.2159, lon: -98.3253 },
  { city: 'Weslaco', state: 'TX', lat: 26.1595, lon: -97.9908 },
  { city: 'San Benito', state: 'TX', lat: 26.1326, lon: -97.6325 },
  { city: 'Corpus Christi', state: 'TX', lat: 27.8006, lon: -97.3964 },
  { city: 'Laredo', state: 'TX', lat: 27.5036, lon: -99.5076 },

  // Central Texas
  { city: 'Austin', state: 'TX', lat: 30.2672, lon: -97.7431 },
  { city: 'Round Rock', state: 'TX', lat: 30.5083, lon: -97.6789 },
  { city: 'Cedar Park', state: 'TX', lat: 30.5052, lon: -97.8203 },
  { city: 'Pflugerville', state: 'TX', lat: 30.4394, lon: -97.6200 },
  { city: 'Georgetown', state: 'TX', lat: 30.6333, lon: -97.6778 },
  { city: 'San Marcos', state: 'TX', lat: 29.8833, lon: -97.9414 },
  { city: 'Kyle', state: 'TX', lat: 29.9897, lon: -97.8772 },
  { city: 'New Braunfels', state: 'TX', lat: 29.7030, lon: -98.1245 },
  { city: 'San Antonio', state: 'TX', lat: 29.4241, lon: -98.4936 },

  // North Texas / DFW
  { city: 'Dallas', state: 'TX', lat: 32.7767, lon: -96.7970 },
  { city: 'Fort Worth', state: 'TX', lat: 32.7555, lon: -97.3308 },
  { city: 'Arlington', state: 'TX', lat: 32.7357, lon: -97.1081 },
  { city: 'Plano', state: 'TX', lat: 33.0198, lon: -96.6989 },
  { city: 'Irving', state: 'TX', lat: 32.8140, lon: -96.9489 },
  { city: 'Frisco', state: 'TX', lat: 33.1507, lon: -96.8236 },
  { city: 'McKinney', state: 'TX', lat: 33.1972, lon: -96.6398 },
  { city: 'Denton', state: 'TX', lat: 33.2148, lon: -97.1331 },

  // Houston Area
  { city: 'Houston', state: 'TX', lat: 29.7604, lon: -95.3698 },
  { city: 'The Woodlands', state: 'TX', lat: 30.1658, lon: -95.4613 },
  { city: 'Sugar Land', state: 'TX', lat: 29.6197, lon: -95.6349 },
  { city: 'Katy', state: 'TX', lat: 29.7858, lon: -95.8245 },
  { city: 'Pearland', state: 'TX', lat: 29.5636, lon: -95.2860 },
  { city: 'Pasadena', state: 'TX', lat: 29.6911, lon: -95.2091 },

  // Florida - Tampa Bay
  { city: 'Tampa', state: 'FL', lat: 27.9506, lon: -82.4572 },
  { city: 'St. Petersburg', state: 'FL', lat: 27.7676, lon: -82.6403 },
  { city: 'Clearwater', state: 'FL', lat: 27.9659, lon: -82.8001 },
  { city: 'Brandon', state: 'FL', lat: 27.9378, lon: -82.2859 },
  { city: 'Lakeland', state: 'FL', lat: 28.0395, lon: -81.9498 },
  { city: 'Sarasota', state: 'FL', lat: 27.3364, lon: -82.5307 },
  { city: 'Bradenton', state: 'FL', lat: 27.4989, lon: -82.5748 },

  // Florida - Miami / South Florida
  { city: 'Miami', state: 'FL', lat: 25.7617, lon: -80.1918 },
  { city: 'Fort Lauderdale', state: 'FL', lat: 26.1224, lon: -80.1373 },
  { city: 'Hollywood', state: 'FL', lat: 26.0112, lon: -80.1495 },
  { city: 'Hialeah', state: 'FL', lat: 25.8576, lon: -80.2781 },
  { city: 'Boca Raton', state: 'FL', lat: 26.3683, lon: -80.1289 },
  { city: 'West Palm Beach', state: 'FL', lat: 26.7153, lon: -80.0534 },
  { city: 'Coral Gables', state: 'FL', lat: 25.7215, lon: -80.2684 },

  // Florida - Orlando & Central
  { city: 'Orlando', state: 'FL', lat: 28.5383, lon: -81.3792 },
  { city: 'Kissimmee', state: 'FL', lat: 28.2919, lon: -81.4076 },
  { city: 'Sanford', state: 'FL', lat: 28.8029, lon: -81.2694 },
  { city: 'Altamonte Springs', state: 'FL', lat: 28.6611, lon: -81.3656 },
  { city: 'Jacksonville', state: 'FL', lat: 30.3322, lon: -81.6557 },

  // California - Greater Los Angeles
  { city: 'Los Angeles', state: 'CA', lat: 34.0522, lon: -118.2437 },
  { city: 'Long Beach', state: 'CA', lat: 33.7701, lon: -118.1937 },
  { city: 'Glendale', state: 'CA', lat: 34.1425, lon: -118.2551 },
  { city: 'Pasadena', state: 'CA', lat: 34.1478, lon: -118.1445 },
  { city: 'Santa Monica', state: 'CA', lat: 34.0195, lon: -118.4912 },
  { city: 'Torrance', state: 'CA', lat: 33.8358, lon: -118.3406 },
  { city: 'Anaheim', state: 'CA', lat: 33.8366, lon: -117.9143 },
  { city: 'Irvine', state: 'CA', lat: 33.6846, lon: -117.8265 },
  { city: 'Santa Ana', state: 'CA', lat: 33.7455, lon: -117.8677 },
  { city: 'Riverside', state: 'CA', lat: 33.9806, lon: -117.3755 },

  // California - Bay Area
  { city: 'San Francisco', state: 'CA', lat: 37.7749, lon: -122.4194 },
  { city: 'Oakland', state: 'CA', lat: 37.8044, lon: -122.2712 },
  { city: 'San Jose', state: 'CA', lat: 37.3382, lon: -121.8863 },
  { city: 'Berkeley', state: 'CA', lat: 37.8715, lon: -122.2730 },
  { city: 'Fremont', state: 'CA', lat: 37.5485, lon: -121.9886 },
  { city: 'Sunnyvale', state: 'CA', lat: 37.3688, lon: -122.0363 },
  { city: 'San Mateo', state: 'CA', lat: 37.5630, lon: -122.3255 },

  // Washington - Puget Sound
  { city: 'Seattle', state: 'WA', lat: 47.6062, lon: -122.3321 },
  { city: 'Bellevue', state: 'WA', lat: 47.6101, lon: -122.2015 },
  { city: 'Redmond', state: 'WA', lat: 47.6740, lon: -122.1215 },
  { city: 'Kirkland', state: 'WA', lat: 47.6769, lon: -122.2060 },
  { city: 'Tacoma', state: 'WA', lat: 47.2529, lon: -122.4443 },
  { city: 'Renton', state: 'WA', lat: 47.4829, lon: -122.2171 },
  { city: 'Everett', state: 'WA', lat: 47.9789, lon: -122.2021 },

  // Oregon
  { city: 'Portland', state: 'OR', lat: 45.5152, lon: -122.6784 },
  { city: 'Beaverton', state: 'OR', lat: 45.4871, lon: -122.8037 },
  { city: 'Hillsboro', state: 'OR', lat: 45.5229, lon: -122.9898 },
  { city: 'Gresham', state: 'OR', lat: 45.4998, lon: -122.4312 },
  { city: 'Salem', state: 'OR', lat: 44.9429, lon: -123.0351 },
  { city: 'Eugene', state: 'OR', lat: 44.0521, lon: -123.0868 },
  { city: 'Bend', state: 'OR', lat: 44.0582, lon: -121.3153 },

  // Ohio - Columbus & Metros
  { city: 'Columbus', state: 'OH', lat: 39.9612, lon: -82.9988 },
  { city: 'Dublin', state: 'OH', lat: 40.0992, lon: -83.1141 },
  { city: 'Westerville', state: 'OH', lat: 40.1245, lon: -82.9213 },
  { city: 'Grove City', state: 'OH', lat: 39.8812, lon: -83.0866 },
  { city: 'Hilliard', state: 'OH', lat: 40.0337, lon: -83.1596 },
  { city: 'Reynoldsburg', state: 'OH', lat: 39.9548, lon: -82.8121 },
  { city: 'Cincinnati', state: 'OH', lat: 39.1031, lon: -84.5120 },
  { city: 'Dayton', state: 'OH', lat: 39.7589, lon: -84.1916 },
  { city: 'Cleveland', state: 'OH', lat: 41.4993, lon: -81.6944 },
  { city: 'Akron', state: 'OH', lat: 41.0814, lon: -81.5190 },

  // Illinois - Chicagoland
  { city: 'Chicago', state: 'IL', lat: 41.8781, lon: -87.6298 },
  { city: 'Naperville', state: 'IL', lat: 41.7508, lon: -88.1535 },
  { city: 'Aurora', state: 'IL', lat: 41.7606, lon: -88.3201 },
  { city: 'Joliet', state: 'IL', lat: 41.5250, lon: -88.0817 },
  { city: 'Evanston', state: 'IL', lat: 42.0451, lon: -87.6877 },
  { city: 'Schaumburg', state: 'IL', lat: 42.0334, lon: -88.0834 },
  { city: 'Elgin', state: 'IL', lat: 42.0354, lon: -88.2826 },
  { city: 'Peoria', state: 'IL', lat: 40.6936, lon: -89.5890 },

  // Arizona - Phoenix Valley
  { city: 'Phoenix', state: 'AZ', lat: 33.4484, lon: -112.0740 },
  { city: 'Scottsdale', state: 'AZ', lat: 33.4942, lon: -111.9261 },
  { city: 'Tempe', state: 'AZ', lat: 33.4255, lon: -111.9400 },
  { city: 'Mesa', state: 'AZ', lat: 33.4152, lon: -111.8315 },
  { city: 'Chandler', state: 'AZ', lat: 33.3062, lon: -111.8413 },
  { city: 'Glendale', state: 'AZ', lat: 33.5387, lon: -112.1860 },
  { city: 'Peoria', state: 'AZ', lat: 33.5806, lon: -112.2374 },
  { city: 'Tucson', state: 'AZ', lat: 32.2226, lon: -110.9747 },

  // Colorado - Front Range
  { city: 'Denver', state: 'CO', lat: 39.7392, lon: -104.9903 },
  { city: 'Aurora', state: 'CO', lat: 39.7294, lon: -104.8319 },
  { city: 'Lakewood', state: 'CO', lat: 39.7047, lon: -105.0814 },
  { city: 'Boulder', state: 'CO', lat: 40.0150, lon: -105.2705 },
  { city: 'Colorado Springs', state: 'CO', lat: 38.8339, lon: -104.8214 },
  { city: 'Fort Collins', state: 'CO', lat: 40.5853, lon: -105.0844 },

  // Georgia - Metro Atlanta
  { city: 'Atlanta', state: 'GA', lat: 33.7490, lon: -84.3880 },
  { city: 'Marietta', state: 'GA', lat: 33.9526, lon: -84.5499 },
  { city: 'Alpharetta', state: 'GA', lat: 34.0754, lon: -84.2941 },
  { city: 'Roswell', state: 'GA', lat: 34.0232, lon: -84.3616 },
  { city: 'Decatur', state: 'GA', lat: 33.7748, lon: -84.2963 },
  { city: 'Sandy Springs', state: 'GA', lat: 33.9304, lon: -84.3733 },

  // North Carolina
  { city: 'Charlotte', state: 'NC', lat: 35.2271, lon: -80.8431 },
  { city: 'Raleigh', state: 'NC', lat: 35.7796, lon: -78.6382 },
  { city: 'Durham', state: 'NC', lat: 35.9940, lon: -78.8986 },
  { city: 'Cary', state: 'NC', lat: 35.7915, lon: -78.7811 },
  { city: 'Greensboro', state: 'NC', lat: 36.0726, lon: -79.7920 },

  // Indiana
  { city: 'Indianapolis', state: 'IN', lat: 39.7684, lon: -86.1581 },
  { city: 'Carmel', state: 'IN', lat: 39.9784, lon: -86.1180 },
  { city: 'Fishers', state: 'IN', lat: 39.9568, lon: -86.0134 },
  { city: 'Bloomington', state: 'IN', lat: 39.1653, lon: -86.5264 },
  { city: 'Fort Wayne', state: 'IN', lat: 41.0793, lon: -85.1394 },

  // Michigan
  { city: 'Detroit', state: 'MI', lat: 42.3314, lon: -83.0458 },
  { city: 'Ann Arbor', state: 'MI', lat: 42.2808, lon: -83.7430 },
  { city: 'Grand Rapids', state: 'MI', lat: 42.9634, lon: -85.6681 },
  { city: 'Troy', state: 'MI', lat: 42.6064, lon: -83.1498 },

  // New York / Tri-State
  { city: 'New York', state: 'NY', lat: 40.7128, lon: -74.0060 },
  { city: 'Brooklyn', state: 'NY', lat: 40.6782, lon: -73.9442 },
  { city: 'Queens', state: 'NY', lat: 40.7282, lon: -73.7949 },
  { city: 'Jersey City', state: 'NJ', lat: 40.7178, lon: -74.0431 },
  { city: 'Newark', state: 'NJ', lat: 40.7357, lon: -74.1724 },
  { city: 'White Plains', state: 'NY', lat: 41.0340, lon: -73.7629 },
  { city: 'Yonkers', state: 'NY', lat: 40.9312, lon: -73.8987 }
];

/**
 * Calculate distance in miles using the Haversine formula
 */
function calculateDistanceMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Get nearby radius cities for a given latitude and longitude
 */
export function getNearbyRadiusCities(lat, lon, currentCityName = '', limit = 6) {
  if (!lat || !lon) {
    // Return default nearby cities for Texas if unknown
    return [
      { city: 'Austin', state: 'TX', distance: 0, label: 'Austin, TX' },
      { city: 'Round Rock', state: 'TX', distance: 17, label: 'Round Rock, TX' },
      { city: 'Cedar Park', state: 'TX', distance: 18, label: 'Cedar Park, TX' },
      { city: 'San Marcos', state: 'TX', distance: 29, label: 'San Marcos, TX' },
      { city: 'San Antonio', state: 'TX', distance: 75, label: 'San Antonio, TX' }
    ];
  }

  // Calculate distance to all cities
  const withDistance = US_CITIES_COORDINATES.map((item) => {
    const dist = calculateDistanceMiles(lat, lon, item.lat, item.lon);
    return {
      ...item,
      distance: dist,
      label: `${item.city}, ${item.state}`
    };
  });

  // Sort by closest distance
  withDistance.sort((a, b) => a.distance - b.distance);

  // Filter out any exact duplicate city names
  const seen = new Set();
  const uniqueNearby = [];

  for (const item of withDistance) {
    if (!seen.has(item.city.toLowerCase())) {
      seen.add(item.city.toLowerCase());
      uniqueNearby.push(item);
    }
    if (uniqueNearby.length >= limit) break;
  }

  return uniqueNearby;
}
