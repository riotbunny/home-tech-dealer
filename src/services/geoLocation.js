const STATES = 'AL:Alabama|AK:Alaska|AZ:Arizona|AR:Arkansas|CA:California|CO:Colorado|CT:Connecticut|DE:Delaware|DC:District of Columbia|FL:Florida|GA:Georgia|HI:Hawaii|ID:Idaho|IL:Illinois|IN:Indiana|IA:Iowa|KS:Kansas|KY:Kentucky|LA:Louisiana|ME:Maine|MD:Maryland|MA:Massachusetts|MI:Michigan|MN:Minnesota|MS:Mississippi|MO:Missouri|MT:Montana|NE:Nebraska|NV:Nevada|NH:New Hampshire|NJ:New Jersey|NM:New Mexico|NY:New York|NC:North Carolina|ND:North Dakota|OH:Ohio|OK:Oklahoma|OR:Oregon|PA:Pennsylvania|RI:Rhode Island|SC:South Carolina|SD:South Dakota|TN:Tennessee|TX:Texas|UT:Utah|VT:Vermont|VA:Virginia|WA:Washington|WV:West Virginia|WI:Wisconsin|WY:Wyoming'.split('|').map(value => value.split(':'));

// Only route automatically when the provider supplies a complete US location.
export function normalizeDetectedLocation(data) {
  if (!data || data.success === false || data.country_code?.toUpperCase() !== 'US') return null;
  const city = typeof data.city === 'string' ? data.city.trim() : '';
  const region = String(data.region_code || data.region || '').trim().toLowerCase();
  const state = STATES.find(([code, name]) => region === code.toLowerCase() || region === name.toLowerCase())?.[0];
  const postal = String(data.postal || '').trim();
  if (!city || !/[a-z]/i.test(city) || !state || !/^\d{5}(?:-\d{4})?$/.test(postal)) return null;
  return { city, state, postal: postal.slice(0, 5), latitude: data.latitude, longitude: data.longitude, label: `${city}, ${state}` };
}
