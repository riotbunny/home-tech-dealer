import React, { useEffect } from 'react';

interface MyFinanceWidgetProps {
  zipCode?: string;
}

export const MyFinanceWidget: React.FC<MyFinanceWidgetProps> = ({ zipCode }) => {
  useEffect(() => {
    const container = document.getElementById('myfinance-container');
    if (!container) return;

    container.innerHTML = '';

    const placeholder = document.createElement('div');
    placeholder.className = 'myFinance-widget';
    placeholder.dataset.adId = 'fb506559-aef6-4698-b340-933d5ac98550';
    placeholder.dataset.campaign = 'chameleon-home-tech-dealer-full-page';
    placeholder.dataset.subId = zipCode || 'PubSubID1';
    placeholder.dataset.subId2 = 'PubSubID2';

    container.appendChild(placeholder);

    if (!document.querySelector('script[src*="myFinance.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.myfinance.com/embed/myFinance.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [zipCode]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
        Compare Exact Plans &amp; Check Live Availability in {zipCode || 'Your Area'}
      </h3>
      <div id="myfinance-container" className="min-h-[350px] w-full flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading available providers...</p>
      </div>
    </div>
  );
};

export default MyFinanceWidget;