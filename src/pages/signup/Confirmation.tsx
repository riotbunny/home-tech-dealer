import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Search, MessageSquare } from 'lucide-react';
import { useSignup } from '../../context/SignupContext';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const Confirmation = () => {
  const navigate = useNavigate();
  const { signupData, resetSignupData } = useSignup();
  const [showSuccess, setShowSuccess] = useState(false);

  // If user navigates directly to this page without data, redirect to start
  useEffect(() => {
    if (!signupData.street || !signupData.firstName || !signupData.email || !signupData.phone) {
      navigate('/signup/address');
    }
  }, [signupData, navigate]);

  // Show success message after progress bar completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(true);
      
      // Fire Google Ads conversion tracking when success is shown
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-16641283046/qi9NCLHJj8IZEOanl_89',
          'value': 1.0,
          'currency': 'USD'
        });
      }
    }, 3000); // Match this with the progress bar animation duration

    return () => clearTimeout(timer);
  }, []);

  const handleReturnHome = () => {
    resetSignupData();
    navigate('/');
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            {!showSuccess ? (
              // Loading State
              <div className="animate-fade-in-up">
                <div className="flex justify-center mb-6">
                  <Search size={80} className="text-blue-500 animate-pulse" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Please wait while we search for a match...
                </h2>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-blue-500 animate-progress rounded-full"></div>
                </div>
                
                <p className="text-gray-600">
                  We're checking availability in your area...
                </p>
              </div>
            ) : (
              // Success State
              <div className="animate-scale-in">
                <div className="flex justify-center mb-6">
                  <CheckCircle size={80} className="text-green-500" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  We found a perfect match for you!
                </h2>
                
                <div className="flex items-center justify-center text-xl text-green-600 mb-8">
                  <MessageSquare className="mr-2" />
                  <p>You will be receiving a text message with your offer shortly.</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
                  <h3 className="text-lg font-semibold mb-3">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{signupData.firstName} {signupData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{signupData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{signupData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{signupData.street}, {signupData.city}, {signupData.zipCode}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleReturnHome}
                  className="px-8 py-3 bg-[#0a2463] text-white rounded-md hover:bg-[#0d2d7a] transition duration-300"
                >
                  Return to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;