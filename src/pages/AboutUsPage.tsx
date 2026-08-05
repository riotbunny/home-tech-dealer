import React from 'react';
import { Award, Users, Handshake, TrendingUp, MapPin, Building, Clock } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0a2463] to-[#3e92cc] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Home Tech Dealer</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Your trusted partner for home technology solutions since 2018
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2018, Home Tech Dealer Inc. began with a simple mission: to make premium home technology accessible and affordable for everyone. What started as a small team of tech enthusiasts has grown into a trusted provider of internet, TV, and home technology solutions.
                </p>
                <p className="text-gray-700 mb-4">
                  Our founders recognized that many consumers were paying too much for their home technology services and often received subpar customer support. We set out to change that by leveraging our industry relationships to secure better pricing and by building a team dedicated to exceptional service.
                </p>
                <p className="text-gray-700">
                  Today, we serve thousands of satisfied customers across the country, helping them connect, entertain, and enhance their homes with the latest technology at prices they can afford.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-100 p-8 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <Building size={40} className="text-[#0a2463] mx-auto mb-3" />
                      <p className="font-bold text-lg">2018</p>
                      <p className="text-gray-600 text-sm">Year Founded</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <Users size={40} className="text-[#0a2463] mx-auto mb-3" />
                      <p className="font-bold text-lg">10,000+</p>
                      <p className="text-gray-600 text-sm">Customers Served</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <MapPin size={40} className="text-[#0a2463] mx-auto mb-3" />
                      <p className="font-bold text-lg">35+</p>
                      <p className="text-gray-600 text-sm">States Covered</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <Handshake size={40} className="text-[#0a2463] mx-auto mb-3" />
                      <p className="font-bold text-lg">25+</p>
                      <p className="text-gray-600 text-sm">Provider Partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 mb-12">
              To provide exceptional home technology solutions at competitive prices while delivering an outstanding customer experience from consultation to installation and beyond.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award size={48} className="text-[#0a2463]" />,
                  title: "Quality",
                  description: "We partner only with reputable providers and offer products and services that meet our high standards."
                },
                {
                  icon: <TrendingUp size={48} className="text-[#0a2463]" />,
                  title: "Value",
                  description: "We leverage our industry relationships to secure competitive pricing that we pass directly to our customers."
                },
                {
                  icon: <Users size={48} className="text-[#0a2463]" />,
                  title: "Service",
                  description: "We provide personalized support and expert guidance throughout your entire customer journey."
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Provider Relationships */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Provider Relationships</h2>
            <p className="text-gray-700 mb-12 text-center">
              Our special pricing comes from the many relationships we've built with the top internet and cable provider companies in the country. We pass these savings directly to you.
            </p>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center">How We Deliver Better Value</h3>
                
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Handshake size={24} className="text-[#0a2463]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2">Exclusive Provider Partnerships</h4>
                      <p className="text-gray-700">
                        As an authorized dealer for multiple national providers, we've negotiated special rates and promotions that aren't available directly to consumers. Our volume-based agreements allow us to offer premium services at reduced rates.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <TrendingUp size={24} className="text-[#0a2463]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2">Bundled Savings</h4>
                      <p className="text-gray-700">
                        By working with multiple providers, we can create custom bundles that combine the best services from different companies, resulting in better overall value than single-provider packages.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock size={24} className="text-[#0a2463]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2">Early Access to Promotions</h4>
                      <p className="text-gray-700">
                        Our industry relationships give us advance notice of upcoming promotions and special offers, allowing us to time your service setup to maximize your savings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Michael Johnson",
                title: "Founder & CEO",
                bio: "With over 15 years in the telecommunications industry, Michael founded Home Tech Dealer to bridge the gap between premium technology and affordable pricing."
              },
              {
                name: "Sarah Williams",
                title: "Chief Operations Officer",
                bio: "Sarah oversees our day-to-day operations, ensuring that every customer receives exceptional service from initial contact through installation and beyond."
              },
              {
                name: "David Chen",
                title: "Provider Relations Director",
                bio: "David manages our provider partnerships, negotiating the special pricing and promotions that allow us to offer our customers exceptional value."
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <Users size={64} className="text-gray-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-[#0a2463] font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                quote: "Home Tech Dealer saved me over $40 per month on my internet and TV package. Their team was professional and the installation was quick and hassle-free.",
                name: "Robert M.",
                location: "Denver, CO"
              },
              {
                quote: "I was skeptical about the savings at first, but Home Tech Dealer delivered exactly what they promised. Great service at a great price!",
                name: "Jennifer L.",
                location: "Austin, TX"
              },
              {
                quote: "The customer service is what sets them apart. They took the time to understand my needs and recommended the perfect package for my family.",
                name: "Thomas K.",
                location: "Atlanta, GA"
              },
              {
                quote: "I've been a customer for over 3 years now, and I'm still amazed at how much I save each month. Highly recommend their services!",
                name: "Lisa P.",
                location: "Phoenix, AZ"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="text-yellow-500 mb-4">★★★★★</div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0a2463] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Home Tech Dealer Difference?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Let us help you find the perfect technology solutions for your home at prices that will make you smile.
          </p>
          <button 
            onClick={() => window.location.href = '/signup/address'} 
            className="bg-white text-[#0a2463] px-8 py-4 rounded-md font-medium text-lg hover:bg-gray-100 transition duration-300"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;