import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AvailabilityChecker = () => {
  const navigate = useNavigate();

  const handleCheckAvailability = () => {
    navigate('/signup/address');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2463] to-[#3e92cc] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Hero Section */}
          <div className="text-white mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Check Internet Availability In Your Area
            </h1>
            <p className="text-2xl text-blue-100 mb-12 animate-fade-in-up-delay-1">
              Get access to high-speed internet starting at $29.99/month
            </p>
            
            {/* Animated CTA Button */}
            <button
              onClick={handleCheckAvailability}
              className="bg-[#28A745] text-white px-12 py-6 rounded-full font-bold text-2xl 
                       hover:bg-[#218838] transition-all duration-300 transform hover:scale-105
                       animate-pulse-glow flex items-center justify-center mx-auto
                       shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center">
                Check Availability Now
                <ArrowRight className="ml-3 animate-bounce" size={24} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityChecker;