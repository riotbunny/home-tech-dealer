export default async (request, context) => {
  // Get the country code from Netlify's geolocation data
  const countryCode = context.geo?.country?.code;

  // If we can't determine the country, allow the request to proceed (safe fallback)
  if (!countryCode) {
    return context.next();
  }

  // Define allowed countries (US = United States)
  // You can add 'CA' for Canada, 'GB' for UK, etc., if you ever expand.
  const allowedCountries = ['US'];

  // If the visitor is NOT in an allowed country
  if (!allowedCountries.includes(countryCode)) {
    
    // Check if the request is a known good bot (like Googlebot)
    // Netlify doesn't natively flag "good bots" in the geo object, 
    // but we can check the User-Agent as a basic fallback.
    // NOTE: Cloudflare's WAF is much better at strictly verifying real Googlebots via reverse DNS.
    const userAgent = request.headers.get('user-agent') || '';
    const isBot = /googlebot|bingbot|yandex|baiduspider|slurp/i.test(userAgent);
    
    if (isBot) {
      return context.next();
    }

    // Return a 403 Forbidden response for foreign human/scraper traffic
    return new Response('Access Denied. This service is only available in the United States.', {
      status: 403,
      headers: { 'content-type': 'text/plain' },
    });
  }

  // Allow all US traffic through
  return context.next();
};
