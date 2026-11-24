import { ZIP_STATE_RANGES } from '../data/zipStateRanges.js';
import { normalizeStateCode } from './geoLocation.js';

export function stateForZip(zip) {
  if (!/^\d{5}$/.test(String(zip))) return null;
  const value = Number(zip);
  return ZIP_STATE_RANGES.find(([start, end]) => value >= start && value <= end)?.[2]?.toUpperCase() || null;
}

// Preserve city hubs and real ZIP pages; consolidate only equivalent legacy forms.
export function canonicalInternetPath(pathname, postalRoutes = {}, cityStates = {}) {
  const parts = pathname.toLowerCase().replace(/\/+$/, '').split('/').filter(Boolean);
  if (parts[0] === 'zip' && /^\d{5}$/.test(parts[1]) && postalRoutes[parts[1]]) {
    const [state, city] = postalRoutes[parts[1]];
    return `/internet/${state}/${city}/${parts[1]}`;
  }
  if (parts[0] !== 'internet' || parts[1] === 'local') return pathname;
  if (parts.length === 2 && normalizeStateCode(parts[1])) return `/internet/${normalizeStateCode(parts[1]).toLowerCase()}`;
  if (parts.length > 4 && /^\d{5}$/.test(parts.at(-1))) {
    const city = parts.slice(2, -1).join('-').replace(/-+/g, '-');
    return canonicalInternetPath(`/internet/${parts[1]}/${city}/${parts.at(-1)}`, postalRoutes, cityStates);
  }
  if (parts.length === 2 && /^\d{5}$/.test(parts[1]) && postalRoutes[parts[1]]) {
    const [state, city] = postalRoutes[parts[1]];
    return `/internet/${state}/${city}/${parts[1]}`;
  }
  if (parts.length === 2 && /-[a-z]{2}$/.test(parts[1])) {
    const state = parts[1].slice(-2);
    return `/internet/${state}/${parts[1].slice(0, -3)}`;
  }
  if (parts.length < 3 || parts.length > 4) return pathname;
  let [, state, city, zip] = parts;
  if (state === 'us') state = postalRoutes[zip]?.[0] || stateForZip(zip)?.toLowerCase() || cityStates[city] || state;
  if (!/^[a-z]{2}$/.test(state) || state === 'us') return pathname;
  if (city.endsWith(`-${state}`)) city = city.slice(0, -3);
  city = city.replace(/[.'’]/g, '').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
  if (zip && (!/^\d{5}$/.test(zip) || (stateForZip(zip) && stateForZip(zip).toLowerCase() !== state))) zip = '';
  return `/internet/${state}/${city}${zip ? `/${zip}` : ''}`;
}
