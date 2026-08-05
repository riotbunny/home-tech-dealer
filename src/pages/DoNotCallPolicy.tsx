import React from 'react';
import { PhoneOff } from 'lucide-react';

const DoNotCallPolicy = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#0a2463] p-6 text-white">
              <div className="flex items-center">
                <PhoneOff className="mr-3" size={32} />
                <h1 className="text-3xl font-bold">Do Not Call Policy</h1>
              </div>
              <p className="mt-2 text-blue-100">Last Updated: March 15, 2024</p>
            </div>
            
            <div className="p-8">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Policy Overview</h2>
                <p className="mb-6">
                  Home Tech Dealer Inc. maintains compliance with all federal and state telemarketing laws, including the National Do Not Call Registry. We respect consumers' right to limit the telemarketing calls they receive and maintain our own internal Do Not Call list.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Do Not Call Requests</h2>
                <p className="mb-6">
                  If you wish to be placed on our internal Do Not Call list, you can:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Email your request to info@hometechdealer.com</li>
                  <li>Submit a request through our website contact form</li>
                  <li>Tell our representative during a phone call</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
                <p className="mb-6">
                  Your Do Not Call request will be processed within 30 days. You may continue to receive calls during this processing period. Your request will remain active for five years from the date of your request.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Exceptions</h2>
                <p className="mb-6">
                  Please note that being on our Do Not Call list will not prevent all calls from our company. We may still contact you regarding:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Existing business relationships</li>
                  <li>Service appointments or installations</li>
                  <li>Responses to your inquiries or requests</li>
                  <li>Account-related calls</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">National Do Not Call Registry</h2>
                <p className="mb-6">
                  In addition to our internal Do Not Call list, you can register your phone number with the National Do Not Call Registry by visiting www.donotcall.gov or calling 1-888-382-1222.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Training and Compliance</h2>
                <p className="mb-6">
                  Our employees are trained in Do Not Call procedures and compliance. We maintain records of Do Not Call requests and regularly update our calling lists to ensure compliance.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-6">
                  For questions about our Do Not Call Policy or to submit a Do Not Call request, please contact us at:
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

export default DoNotCallPolicy;