import React, { useEffect, useState } from 'react';

const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit'
];

export default function GeoBlocker({ children }: { children: React.ReactNode }) {
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSearchBot = BOT_USER_AGENTS.some((bot) => userAgent.includes(bot));

    if (isSearchBot) {
      setIsAllowed(true);
      return;
    }
  }, []);

  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800">Service Unavailable</h1>
          <p className="text-gray-600 mt-2">This service is not available in your region.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}