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

    // Return a fake 503 Service Unavailable response for foreign human/scraper traffic
    // This stealth-blocks them by making it look like a generic server crash, 
    // so they don't realize they need a VPN.
    const fakeNginxError = `<!DOCTYPE html>
<html>
<head>
<title>503 Service Temporarily Unavailable</title>
</head>
<body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
<h1>503 Service Temporarily Unavailable</h1>
<p>The server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.</p>
<hr style="width: 80%; border: 0; border-top: 1px solid #ccc;">
<address style="font-size: 12px; color: #666;">nginx/1.18.0 (Ubuntu)</address>
</body>
</html>`;

    return new Response(fakeNginxError, {
      status: 503,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  }

  // Allow all US traffic through
  return context.next();
};
