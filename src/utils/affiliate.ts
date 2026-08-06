export function buildAffiliateUrl(
  baseTemplate: string | undefined,
  zipCode: string,
  planName?: string
): string {
  if (!baseTemplate) return '#';

  let url = baseTemplate;

  // Replace placeholders if present in template link
  url = url.replace(/{zip}/g, encodeURIComponent(zipCode));
  url = url.replace(/{plan}/g, encodeURIComponent(planName || ''));

  // Fallback: Append standard subID tracking query parameters if no tokens were used
  if (!baseTemplate.includes('{zip}')) {
    const separator = url.includes('?') ? '&' : '?';
    url += `${separator}subid=${encodeURIComponent(zipCode)}&utm_source=hometech&utm_medium=pseo`;
  }

  return url;
}