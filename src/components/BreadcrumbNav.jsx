import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { createCitySlug } from '../data/usCitiesData';

export function BreadcrumbNav({ routeData, onNavigate }) {
  if (!routeData) return null;

  const routeType = routeData.routeType || 'city';
  const stateCode = (routeData.state || 'TX').toUpperCase();
  const stateName = routeData.stateName || stateCode;
  const cityName = routeData.cityName || 'Austin';
  const zip = routeData.zip || '';
  const citySlug = createCitySlug(cityName, stateCode);

  // Generate crumbs array based on routeType
  const crumbs = [
    { label: 'Home', path: '/' }
  ];

  if (routeType === 'state') {
    crumbs.push({ label: 'USA Directory', path: '/#state-directory' });
    crumbs.push({ label: `${stateName} Internet`, path: `/internet/${stateCode.toLowerCase()}`, active: true });
  } else if (routeType === 'compare') {
    const nameA = routeData.compData?.nameA || (routeData.carrierA || 'Spectrum').toUpperCase();
    const nameB = routeData.compData?.nameB || (routeData.carrierB || 'AT&T').toUpperCase();
    crumbs.push({ label: 'Plan Comparisons', path: '/#plans-marketplace' });
    crumbs.push({ label: `${nameA} vs ${nameB}`, path: routeData.canonicalPath || `/compare/${routeData.carrierA}-vs-${routeData.carrierB}`, active: true });
  } else if (routeType === 'provider') {
    const carrierName = (routeData.carrierId || 'Provider').toUpperCase();
    crumbs.push({ label: 'All Providers', path: '/#providers-directory' });
    crumbs.push({ label: carrierName, path: `/providers/${routeData.carrierId}` });
    if (cityName && cityName !== 'USA') {
      crumbs.push({ label: `${cityName}, ${stateCode}`, path: routeData.canonicalPath, active: true });
    }
  } else if (routeType === 'tech') {
    const techName = routeData.techFilter === 'fiber' ? 'Fiber Optic' : routeData.techFilter === '5g' ? '5G Home' : 'Cheap Budget';
    crumbs.push({ label: `${techName} Internet`, path: routeData.canonicalPath });
    crumbs.push({ label: `${cityName}, ${stateCode}`, path: routeData.canonicalPath, active: true });
  } else {
    // Standard City / ZIP vector
    crumbs.push({ label: stateName, path: `/internet/${stateCode.toLowerCase()}` });
    crumbs.push({ label: cityName, path: `/internet/${stateCode.toLowerCase()}/${citySlug}` });
    if (zip) {
      crumbs.push({ label: `ZIP ${zip}`, path: routeData.canonicalPath || `/internet/${stateCode.toLowerCase()}/${citySlug}/${zip}`, active: true });
    }
  }

  const handleLinkClick = (e, path) => {
    if (onNavigate && path && path !== '#') {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <nav 
        aria-label="Breadcrumb" 
        className="flex items-center text-xs font-semibold text-slate-500 overflow-x-auto no-scrollbar py-1"
      >
        <ol className="flex items-center space-x-1.5 min-w-max" itemScope itemType="https://schema.org/BreadcrumbList">
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;
            return (
              <li 
                key={crumb.path + idx} 
                className="flex items-center" 
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
              >
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1 shrink-0" />
                )}
                
                {crumb.path === '/' ? (
                  <a
                    href="/"
                    onClick={(e) => handleLinkClick(e, '/')}
                    itemProp="item"
                    className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span itemProp="name" className="sr-only sm:not-sr-only">Home</span>
                  </a>
                ) : isLast || crumb.active ? (
                  <span 
                    itemProp="name" 
                    className="text-blue-700 font-bold bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-100"
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <a
                    href={crumb.path}
                    onClick={(e) => handleLinkClick(e, crumb.path)}
                    itemProp="item"
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <span itemProp="name">{crumb.label}</span>
                  </a>
                )}
                <meta itemProp="position" content={String(idx + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
