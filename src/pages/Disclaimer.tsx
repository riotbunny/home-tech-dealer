import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#0a2463] p-6 text-white">
              <div className="flex items-center">
                <AlertTriangle className="mr-3" size={32} />
                <h1 className="text-3xl font-bold">Disclaimer</h1>
              </div>
              <p className="mt-2 text-blue-100">Last Updated: March 15, 2024</p>
            </div>
            
            <div className="p-8">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-6">
                  For questions about this disclaimer, please contact us at:
                  <br />
                  Email: info@hometechdealer.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;