import { useState, useEffect, useCallback } from 'react';
import { resolveLocationRoute, createCitySlug } from '../data/usCitiesData';

/**
 * Custom React Hook for Programmatic SEO (pSEO) Dynamic City & 44k ZIP Routing
 * Resolves routes like:
 * - /internet/tx/brownsville/78522 (canonical 44k ZIP structure)
 * - /internet/tx/brownsville
 * - /internet/78522 or /zip/78522
 * - /internet/brownsville-tx
 * - ?city=...&state=...&zip=...
 * Supports clean client-side history navigation without full page reloads.
 */
export function useCityRoute(onCityResolved, options = {}) {
  const { disabled = false } = options;
  const [currentCityData, setCurrentCityData] = useState(null);

  // Helper to extract location from current window location
  const detectLocationFromUrl = useCallback(() => {
    if (disabled || typeof window === 'undefined') return null;
    const pathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    return resolveLocationRoute(pathname, searchParams);
  }, [disabled]);

  // Apply a resolved location object to state and parent callback
  const applyLocation = useCallback((locationData, shouldScroll = false) => {
    setCurrentCityData(locationData);
    if (onCityResolved) {
      onCityResolved(locationData);
    }
    if (locationData && shouldScroll) {
      setTimeout(() => {
        const el = document.getElementById('carrier-results-grid') || document.getElementById('plans-marketplace');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [onCityResolved]);

  // Navigate to a new city/state/zip programmatically
  const navigateToCity = useCallback((targetSlugOrCity, targetState, targetZip, shouldScroll = true) => {
    if (disabled) return;

    let path = '';
    
    // Check if targetSlugOrCity is already a full path like /internet/tx/brownsville/78522
    if (typeof targetSlugOrCity === 'string' && targetSlugOrCity.startsWith('/')) {
      path = targetSlugOrCity;
    } else if (targetState && targetZip) {
      path = `/internet/${targetState.toLowerCase()}/${createCitySlug(targetSlugOrCity)}/${targetZip}`;
    } else if (targetState) {
      path = `/internet/${targetState.toLowerCase()}/${createCitySlug(targetSlugOrCity)}`;
    } else if (typeof targetSlugOrCity === 'string' && targetSlugOrCity.includes(',')) {
      const [c, s] = targetSlugOrCity.split(',');
      path = `/internet/${s.trim().toLowerCase()}/${createCitySlug(c.trim())}`;
    } else if (typeof targetSlugOrCity === 'string' && targetSlugOrCity) {
      path = targetSlugOrCity.includes('/') ? targetSlugOrCity : `/internet/${targetSlugOrCity}`;
    } else {
      path = '/';
    }

    const loc = resolveLocationRoute(path);
    if (!loc && path !== '/') return;

    const canonicalPath = loc?.canonicalPath || path;
    if (typeof window !== 'undefined' && window.location.pathname !== canonicalPath) {
      window.history.pushState({ canonicalPath }, '', canonicalPath);
    }

    applyLocation(loc, shouldScroll);
  }, [applyLocation, disabled]);

  const navigateToDetectedLocation = useCallback((geo) => {
    if (disabled) return;
    const path = `/internet/${geo.state.toLowerCase()}/${createCitySlug(geo.city)}/${geo.postal}`;
    const resolved = resolveLocationRoute(path);
    if (!resolved) return;
    // Keep the complete detected tuple; curated city aliases must not mix locations.
    const location = { ...resolved, cityName: geo.city, city: `${geo.city}, ${geo.state}`, state: geo.state, zip: geo.postal, canonicalPath: path };
    window.history.replaceState({ canonicalPath: path }, '', `${path}${window.location.search}${window.location.hash}`);
    applyLocation(location, false);
  }, [applyLocation, disabled]);

  // Initial mount resolution and back/forward popstate listener
  useEffect(() => {
    if (disabled) {
      setCurrentCityData(null);
      return;
    }

    const initialLocation = detectLocationFromUrl();
    applyLocation(initialLocation, false);

    const handlePopState = () => {
      const poppedLocation = detectLocationFromUrl();
      applyLocation(poppedLocation, false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [detectLocationFromUrl, applyLocation, disabled]);

  return {
    currentCityData,
    navigateToCity,
    navigateToDetectedLocation,
    navigateToRoute: navigateToCity
  };
}
