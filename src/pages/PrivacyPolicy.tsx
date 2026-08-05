import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#0a2463] p-6 text-white">
              <div className="flex items-center">
                <Shield className="mr-3" size={32} />
                <h1 className="text-3xl font-bold">Privacy Policy</h1>
              </div>
              <p className="mt-2 text-blue-100">Last Updated: March 15, 2024</p>
            </div>
            
            <div className="p-8">
              <div className="prose max-w-none">
                {/* Highlighted Data Sharing and Messaging Terms */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 rounded-r-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-900">Data Sharing</h2>
                  <ul className="list-disc pl-6 mb-6 text-blue-800">
                    <li className="mb-2">Customer data is not shared with 3rd parties for promotional or marketing purposes.</li>
                    <li className="mb-2">Mobile opt-in and consent are never shared with anyone for any purpose. Any information sharing that may be mentioned elsewhere in this policy excludes mobile opt-in data.</li>
                  </ul>
                  
                  <h2 className="text-2xl font-semibold mb-4 text-blue-900">Messaging Terms and Conditions</h2>
                  <ul className="list-disc pl-6 text-blue-800">
                    <li className="mb-2">By providing your phone number and agreeing to receive texts, you consent to receive text messages from Home Tech Dealer Inc, from (844) 763-8868 regarding customer care. Consent is not a condition of purchase.</li>
                    <li className="mb-2">Message frequency varies. Message & data rates may apply.</li>
                    <li className="mb-2">You can reply STOP to unsubscribe at any time or HELP for assistance.</li>
                    <li className="mb-2">You can also contact us at (844) 763-8868 or abel@hometechdealer.com.</li>
                    <li className="mb-2">Mobile opt-in information is never shared with third parties.</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-6">
                  If you have questions about this Privacy Policy or our practices, please contact us at:
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

export default PrivacyPolicy;