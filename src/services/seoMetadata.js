export const SITE_ORIGIN = 'https://www.hometechdealer.com';
export const HOME_METADATA = {
  title: 'HomeTechDealer | Internet Providers, Promotions & Installation Options',
  description: 'Speak with an authorized internet dealer about providers, current promotions and installation options. Availability and plan terms vary by address.',
  canonical: `${SITE_ORIGIN}/`
};

export function getPageMetadata(data, phone = '1(855)215-8469') {
  if (!data) return HOME_METADATA;
  const area = [data.cityName, data.state !== 'USA' ? data.state : ''].filter(Boolean).join(', ');
  const local = data.state && data.state !== 'USA' && data.cityName && data.cityName !== 'Your Area';
  let title, description;
  if (data.routeType === 'state') {
    title = `Internet Providers in ${data.stateName} | HomeTechDealer`;
    description = `Browse ${data.stateName} cities and learn what to ask about home internet. Call ${phone} to check providers, current promotions and installation at your address.`;
  } else if (data.routeType === 'compare') {
    const names = `${data.compData?.nameA || data.carrierA} vs ${data.compData?.nameB || data.carrierB}`;
    title = `${names} Internet: Plans & Terms | HomeTechDealer`;
    description = `Review ${names} internet options. Ask about monthly costs, equipment, contracts and installation. Confirm current offers and availability for your address by phone.`;
  } else if (data.routeType === 'provider') {
    title = `${data.carrierId.toUpperCase()} Internet${local ? ` in ${area}` : ''} | HomeTechDealer`;
    description = `Ask about ${data.carrierId.toUpperCase()} internet plans${local ? ` in ${area}` : ''}. Call ${phone} to confirm service, current promotions and installation options.`;
  } else {
    const place = `${area}${data.zip ? ` ${data.zip}` : ''}`;
    title = `Internet Providers in ${place} | Promotions & Setup | HomeTechDealer`;
    description = `Looking for internet in ${place}? Call ${phone} to check address availability, current promotions, equipment costs and installation options with an authorized dealer.`;
  }
  return { title, description, canonical: `${SITE_ORIGIN}${data.canonicalPath}` };
}

export function getPageSchema(data, phone) {
  const meta = getPageMetadata(data, phone);
  const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` }];
  if (data?.state && data.state !== 'USA') crumbs.push({ '@type': 'ListItem', position: 2, name: data.stateName || data.state, item: `${SITE_ORIGIN}/internet/${data.state.toLowerCase()}` });
  if (data && meta.canonical !== crumbs.at(-1).item) crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: data.routeType === 'state' ? data.stateName : meta.title.split(' | ')[0], item: meta.canonical });
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': `${SITE_ORIGIN}/#organization`, name: 'Home Tech Dealer Inc.', url: SITE_ORIGIN, logo: `${SITE_ORIGIN}/hometechdealer-logo.png`, telephone: phone },
    { '@type': 'WebPage', '@id': `${meta.canonical}#webpage`, url: meta.canonical, name: meta.title, description: meta.description, publisher: { '@id': `${SITE_ORIGIN}/#organization` } },
    { '@type': 'BreadcrumbList', itemListElement: crumbs }
  ] };
}
