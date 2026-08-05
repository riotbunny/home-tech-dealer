import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tv, Wifi, Satellite, CheckCircle, Handshake, Users, Award, ArrowRight, Globe, Shield, Zap, Phone } from 'lucide-react';

const ServicesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0a2463] to-[#3e92cc] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Technology Solutions Broker</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            We connect leading service providers with quality customers. Specializing in customer acquisition, marketing, and exceptional service delivery for Internet, TV, and home technology providers.
          </p>
          <button 
            onClick={() => navigate('/become-dealer')}
            className="bg-white text-[#0a2463] px-8 py-4 rounded-md font-medium hover:bg-gray-100 transition duration-300 inline-flex items-center"
          >
            Partner With Us
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Users size={40} className="text-blue-500" />, 
                title: "Customer Acquisition Experts", 
                description: "Our proven marketing strategies and sales processes consistently deliver high-quality customers to our partners." 
              },
              { 
                icon: <Handshake size={40} className="text-green-500" />, 
                title: "Strategic Partnership", 
                description: "We work as an extension of your team, representing your brand with professionalism and dedication." 
              },
              { 
                icon: <Award size={40} className="text-yellow-500" />, 
                title: "Quality Assurance", 
                description: "Our rigorous quality control ensures only qualified leads and committed customers are passed to our partners." 
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services to Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Globe size={40} className="text-purple-500" />,
                title: "Market Analysis",
                description: "In-depth market research and analysis to identify growth opportunities and optimize service offerings."
              },
              {
                icon: <Zap size={40} className="text-yellow-500" />,
                title: "Lead Generation",
                description: "Targeted marketing campaigns and lead generation strategies to attract qualified customers."
              },
              {
                icon: <Shield size={40} className="text-green-500" />,
                title: "Customer Verification",
                description: "Thorough verification process to ensure high-quality customer acquisition and reduced churn."
              },
              {
                icon: <Phone size={40} className="text-blue-500" />,
                title: "Customer Support",
                description: "Professional customer service and technical support to maintain high satisfaction rates."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-3">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Partner Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-6">For Service Providers</h3>
              <ul className="space-y-4">
                {[
                  "Accelerated market penetration and customer acquisition",
                  "Reduced customer acquisition costs",
                  "Professional brand representation",
                  "Quality-assured customer base",
                  "Streamlined onboarding process",
                  "Detailed performance analytics and reporting"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-6">For Customers</h3>
              <ul className="space-y-4">
                {[
                  "Access to best-in-class service providers",
                  "Competitive pricing and exclusive deals",
                  "Expert guidance in service selection",
                  "Simplified registration process",
                  "Dedicated customer support",
                  "Regular service quality monitoring"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partnership Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Initial Consultation",
                  description: "We begin with understanding your business goals, target market, and service offerings to ensure alignment."
                },
                {
                  number: "02",
                  title: "Strategy Development",
                  description: "Our team develops a customized marketing and sales strategy tailored to your specific needs and objectives."
                },
                {
                  number: "03",
                  title: "Implementation",
                  description: "We deploy our proven customer acquisition processes and begin generating qualified leads for your business."
                },
                {
                  number: "04",
                  title: "Optimization & Growth",
                  description: "Continuous monitoring and optimization of campaigns to ensure maximum ROI and sustainable growth."
                }
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#0a2463] text-white rounded-full flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0a2463] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Partner with us to expand your market reach and acquire quality customers through our proven acquisition strategies.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/become-dealer')}
              className="bg-white text-[#0a2463] px-8 py-4 rounded-md font-medium hover:bg-gray-100 transition duration-300 inline-flex items-center justify-center"
            >
              Become a Partner
              <ArrowRight className="ml-2" size={20} />
            </button>
            <a 
              href="tel:+18336624289"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-medium hover:bg-white hover:text-[#0a2463] transition duration-300 inline-flex items-center justify-center"
            >
              Call Us Now
              <Phone className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;