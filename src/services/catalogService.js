// Centralized Product & Pricing Catalog Service
// Powers dynamic live pricing updates across the entire Home Tech Dealer Inc. platform
import { PROVIDERS_CATALOG } from '../data/providersData.js';

const STORAGE_KEY = 'hometechdealer_custom_catalog_v1';
const PHONE_STORAGE_KEY = 'hometechdealer_hotline_phone_v1';
const GOOGLE_KEY_STORAGE = 'hometechdealer_google_api_key_v1';
const LOCATION_STORAGE_KEY = 'hometechdealer_default_location_v1';

// Legacy keys for seamless migration
const LEGACY_STORAGE_KEY = 'homepulse_custom_catalog_v1';
const LEGACY_PHONE_KEY = 'homepulse_hotline_phone_v1';
const LEGACY_GOOGLE_KEY = 'homepulse_google_api_key_v1';
const LEGACY_LOC_KEY = 'homepulse_default_location_v1';

export const DEFAULT_PHONE_NUMBER = '1 (888) 482-6192';
export const DEFAULT_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAFI7nr1gt8WkTJZ-MX6SE-j-pVfllTm60';

/**
 * Get active default fallback location from storage
 */
export function getStoredDefaultLocation() {
  try {
    const saved = localStorage.getItem(LOCATION_STORAGE_KEY) || localStorage.getItem(LEGACY_LOC_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && (parsed.city || parsed.state)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read default location from storage:', err);
  }
  return {
    city: '',
    state: '',
    address: ''
  };
}

/**
 * Save default fallback location to storage
 */
export function saveStoredDefaultLocation(locationObj) {
  try {
    if (locationObj) {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(locationObj));
      return true;
    }
  } catch (err) {
    console.error('Failed to save default location:', err);
  }
  return false;
}

/**
 * Get active Google Maps Platform API key
 */
export function getStoredGoogleApiKey() {
  try {
    const saved = localStorage.getItem(GOOGLE_KEY_STORAGE) || localStorage.getItem(LEGACY_GOOGLE_KEY);
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch (err) {
    console.warn('Could not read google api key from storage:', err);
  }
  return DEFAULT_GOOGLE_API_KEY;
}

/**
 * Save Google Maps Platform API key
 */
export function saveStoredGoogleApiKey(newKey) {
  try {
    if (newKey && newKey.trim()) {
      localStorage.setItem(GOOGLE_KEY_STORAGE, newKey.trim());
      return true;
    }
  } catch (err) {
    console.error('Failed to save google api key to storage:', err);
  }
  return false;
}

/**
 * Get active hotline phone number from persistent storage or default
 */
export function getStoredPhoneNumber() {
  try {
    const saved = localStorage.getItem(PHONE_STORAGE_KEY) || localStorage.getItem(LEGACY_PHONE_KEY);
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch (err) {
    console.warn('Could not read custom phone from storage:', err);
  }
  return DEFAULT_PHONE_NUMBER;
}

/**
 * Save hotline phone number to persistent storage
 */
export function saveStoredPhoneNumber(newPhone) {
  try {
    if (newPhone && newPhone.trim()) {
      localStorage.setItem(PHONE_STORAGE_KEY, newPhone.trim());
      return true;
    }
  } catch (err) {
    console.error('Failed to save phone to storage:', err);
  }
  return false;
}

/**
 * Get active product catalog from persistent storage or default
 */
export function getStoredCatalog() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure Verizon, T-Mobile, and EarthLink are included at the top if previously absent in storage
        const savedIds = new Set(parsed.map(p => p.id));
        const missingNew = PROVIDERS_CATALOG.filter(p => !savedIds.has(p.id));
        if (missingNew.length > 0) {
          const merged = [...missingNew, ...parsed];
          return merged;
        }
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read custom catalog from storage:', err);
  }
  return PROVIDERS_CATALOG;
}

/**
 * Save updated product catalog to persistent storage
 */
export function saveCatalog(newCatalog) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCatalog));
    return true;
  } catch (err) {
    console.error('Failed to save catalog to storage:', err);
    return false;
  }
}

/**
 * Reset catalog back to factory defaults
 */
export function resetCatalogToDefault() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    return PROVIDERS_CATALOG;
  } catch (err) {
    console.error('Failed to reset catalog:', err);
    return PROVIDERS_CATALOG;
  }
}

/**
 * Update a specific plan's details inside the catalog
 */
export function updatePlanInCatalog(catalog, providerId, planId, updatedFields) {
  return catalog.map(provider => {
    if (provider.id !== providerId) return provider;
    return {
      ...provider,
      plans: provider.plans.map(plan => {
        if (plan.id !== planId) return plan;
        return {
          ...plan,
          ...updatedFields
        };
      })
    };
  });
}
