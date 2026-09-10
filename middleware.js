const allowedCountries = ['US'];
const knownGoodBotPattern = /googlebot|bingbot|yandex|baiduspider|slurp/i;

export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const countryCode = request.headers.get('x-vercel-ip-country') || request.geo?.country;

  if (!countryCode || allowedCountries.includes(countryCode)) {
    return;
  }

  const userAgent = request.headers.get('user-agent') || '';

  if (knownGoodBotPattern.test(userAgent)) {
    return;
  }

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
