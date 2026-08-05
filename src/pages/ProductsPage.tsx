import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, Zap, Rocket, CheckCircle, Shield, Clock, Award } from 'lucide-react';

const ProductsPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup/address');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0a2463] to-[#3e92cc] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">High-Speed Internet Plans</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Choose the perfect internet plan for your home with our range of high-speed options designed to fit every need and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="#basic" className="bg-white text-[#0a2463] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300">
              100 Mbps
            </a>
            <a href="#standard" className="bg-white text-[#0a2463] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300">
              500 Mbps
            </a>
            <a href="#premium" className="bg-white text-[#0a2463] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition duration-300">
              1 Gig
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Our Internet */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Internet Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Shield size={40} className="text-blue-500" />, 
                title: "Reliable Connection", 
                description: "Our network is built for reliability with 99.9% uptime guarantee so you stay connected when it matters most." 
              },
              { 
                icon: <Clock size={40} className="text-green-500" />, 
                title: "24/7 Support", 
                description: "Technical assistance is available around the clock to help resolve any issues quickly and efficiently." 
              },
              { 
                icon: <Award size={40} className="text-yellow-500" />, 
                title: "No Data Caps", 
                description: "Use as much data as you need with no overage charges or throttling on any of our internet plans." 
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internet Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Perfect Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 100 Mbps Plan */}
            <div id="basic" className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
              <div className="p-8 bg-gray-50 flex justify-center">
                <div className="text-[#0a2463]"><Wifi size={100} /></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">100 Mbps Internet</h3>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-3xl font-bold text-[#0a2463]">$30</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    No Contract
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Perfect for small households with multiple devices. Ideal for browsing, email, and streaming on 1-3 devices.</p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Download speeds up to 100 Mbps
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Upload speeds up to 10 Mbps
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> No data caps
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Free standard installation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Wi-Fi router included
                  </li>
                </ul>
                <div className="space-y-3">
                  <button 
                    onClick={handleGetStarted}
                    className="w-full bg-[#0a2463] text-white py-3 rounded-md hover:bg-[#0d2d7a] transition duration-300"
                  >
                    Get Started
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* 500 Mbps Plan */}
            <div id="standard" className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 transform scale-105 z-10 shadow-md">
              <div className="bg-[#0a2463] text-white py-2 text-center text-sm font-medium">
                MOST POPULAR
              </div>
              <div className="p-8 bg-gray-50 flex justify-center">
                <div className="text-[#0a2463]"><Zap size={100} /></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">500 Mbps Internet</h3>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-3xl font-bold text-[#0a2463]">$50</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    No Contract
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Ideal for streaming, gaming, and working from home. Perfect for households with 4-6 connected devices.</p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Download speeds up to 500 Mbps
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Upload speeds up to 50 Mbps
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> No data caps
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Free premium installation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Advanced Wi-Fi router included
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Free security software
                  </li>
                </ul>
                <div className="space-y-3">
                  <button 
                    onClick={handleGetStarted}
                    className="w-full bg-[#0a2463] text-white py-3 rounded-md hover:bg-[#0d2d7a] transition duration-300"
                  >
                    Get Started
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* 1 Gig Plan */}
            <div id="premium" className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
              <div className="p-8 bg-gray-50 flex justify-center">
                <div className="text-[#0a2463]"><Rocket size={100} /></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Blazing 1 Gig Speeds</h3>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-3xl font-bold text-[#0a2463]">$70</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    No Contract
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Ultimate performance for power users and large households with 7+ connected devices. Perfect for 4K streaming and competitive gaming.</p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Download speeds up to 1 Gbps
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Upload speeds up to 100 Mbps
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> No data caps
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Free premium installation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Pro gaming router included
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Premium tech support
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" /> Free whole-home Wi-Fi assessment
                  </li>
                </ul>
                <div className="space-y-3">
                  <button 
                    onClick={handleGetStarted}
                    className="w-full bg-[#0a2463] text-white py-3 rounded-md hover:bg-[#0d2d7a] transition duration-300"
                  >
                    Get Started
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Plan Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-[#0a2463] text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Features</th>
                  <th className="py-4 px-6 text-center">100 Mbps</th>
                  <th className="py-4 px-6 text-center">500 Mbps</th>
                  <th className="py-4 px-6 text-center">1 Gig</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-medium">Monthly Price</td>
                  <td className="py-4 px-6 text-center">$30/mo</td>
                  <td className="py-4 px-6 text-center">$50/mo</td>
                  <td className="py-4 px-6 text-center">$70/mo</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium">Download Speed</td>
                  <td className="py-4 px-6 text-center">Up to 100 Mbps</td>
                  <td className="py-4 px-6 text-center">Up to 500 Mbps</td>
                  <td className="py-4 px-6 text-center">Up to 1 Gbps</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Upload Speed</td>
                  <td className="py-4 px-6 text-center">Up to 10 Mbps</td>
                  <td className="py-4 px-6 text-center">Up to 50 Mbps</td>
                  <td className="py-4 px-6 text-center">Up to 100 Mbps</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium">Recommended For</td>
                  <td className="py-4 px-6 text-center">1-3 devices</td>
                  <td className="py-4 px-6 text-center">4-6 devices</td>
                  <td className="py-4 px-6 text-center">7+ devices</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Streaming</td>
                  <td className="py-4 px-6 text-center">HD</td>
                  <td className="py-4 px-6 text-center">Multiple HD/4K</td>
                  <td className="py-4 px-6 text-center">Multiple 4K</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium">Gaming</td>
                  <td className="py-4 px-6 text-center">Casual</td>
                  <td className="py-4 px-6 text-center">Competitive</td>
                  <td className="py-4 px-6 text-center">Professional</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Data Cap</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 font-medium">Contract</td>
                  <td className="py-4 px-6 text-center">No Contract</td>
                  <td className="py-4 px-6 text-center">No Contract</td>
                  <td className="py-4 px-6 text-center">No Contract</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How fast of an internet connection do I need?",
                answer: "The speed you need depends on how you use the internet and how many devices are connected. For basic browsing and email, 100 Mbps is sufficient. For streaming HD content and gaming on multiple devices, 500 Mbps is recommended. For households with many connected devices, 4K streaming, or competitive gaming, our 1 Gig plan offers the best experience."
              },
              {
                question: "Is there a data cap on your internet plans?",
                answer: "No, all of our internet plans come with unlimited data. You can browse, stream, and download as much as you want without worrying about overage charges or throttling."
              },
              {
                question: "Do I need to sign a contract?",
                answer: "No, all of our internet plans are contract-free. You can upgrade, downgrade, or cancel your service at any time without early termination fees."
              },
              {
                question: "What equipment do I need?",
                answer: "We provide a Wi-Fi router with all of our plans at no additional cost. The router specifications vary by plan, with higher-tier plans receiving more advanced equipment for optimal performance."
              },
              {
                question: "How long does installation take?",
                answer: "Standard installation typically takes 1-2 hours. Our technician will set up your equipment, ensure your connection is working properly, and help you connect your devices to the network."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0a2463] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Better Internet?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Get started today and experience the difference high-speed internet can make in your home.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-white text-[#0a2463] px-8 py-4 rounded-md font-medium text-lg hover:bg-gray-100 transition duration-300"
          >
            Check Availability
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;