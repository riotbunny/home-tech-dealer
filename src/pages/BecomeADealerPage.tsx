import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, DollarSign, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';

const BecomeADealerPage = () => {
  const navigate = useNavigate();
  
  const handleStartApplication = () => {
    navigate('/intake');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0a2463] to-[#3e92cc] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Become a Home Tech Dealer</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join our network of authorized dealers and grow your business with industry-leading products and support
          </p>
          {/* Added prominent CTA button in hero section */}
          <button 
            onClick={handleStartApplication}
            className="bg-[#28A745] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#218838] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#28A745] focus:ring-opacity-50 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto group"
            aria-label="Begin dealer application process"
          >
            Start Your Application
            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <DollarSign size={48} className="text-[#0a2463]" />,
                title: "Industry-Leading Commissions",
                description: "Earn top commissions in the industry on every sale and installation you complete with our competitive compensation plan."
              },
              {
                icon: <TrendingUp size={48} className="text-[#0a2463]" />,
                title: "Business Growth",
                description: "Access new revenue streams and expand your customer base with our diverse product offerings."
              },
              {
                icon: <Users size={48} className="text-[#0a2463]" />,
                title: "Dedicated Support",
                description: "Receive comprehensive training, marketing materials, and ongoing business support."
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0a2463] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join our network of successful dealers and take your business to the next level with industry-leading products and support.
          </p>
          <div className="flex flex-col items-center">
            <button 
              onClick={handleStartApplication}
              className="bg-[#28A745] text-white px-12 py-6 rounded-lg font-bold text-xl hover:bg-[#218838] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#28A745] focus:ring-opacity-50 shadow-xl hover:shadow-2xl animate-pulse-glow flex items-center group"
              aria-label="Begin dealer application process"
            >
              Start Application Now
              <ArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-2" size={24} />
            </button>
            <p className="mt-4 text-blue-200">No application fee required</p>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>
    </div>
  );
};

export default BecomeADealerPage;