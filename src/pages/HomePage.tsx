import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search,
  CheckCircle,
  Star, 
  ArrowRight,
  MessageSquare,
  Mail,
  ChevronDown,
  ChevronUp,
  Wifi,
  DollarSign,
  HeadphonesIcon,
  BarChart3,
  ShoppingCart
} from 'lucide-react';
import StickyMobileCTA from '../components/StickyMobileCTA';

const HomePage = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [zipCode, setZipCode] = useState('');
  const myFinanceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const placeholder = document.createElement('div');
    placeholder.className = 'myFinance-widget';
    placeholder.dataset.adId = 'fb506559-aef6-4698-b340-933d5ac98550';
    placeholder.dataset.campaign = 'chameleon-home-tech-dealer-full-page';
    placeholder.dataset.subId = 'PubSubID1';
    placeholder.dataset.subId2 = 'PubSubID2';

    const container = document.getElementById('myfinance-container');
    if (container) {
      container.appendChild(placeholder);

      const script = document.createElement('script');
      script.src = 'https://static.myfinance.com/embed/myFinance.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        if (placeholder.parentNode) {
          placeholder.parentNode.removeChild(placeholder);
        }
      };
    }
  }, []);

  const handleCheckAvailability = () => {
    // Scroll to MyFinance widget and set up product detection
    if (myFinanceRef.current) {
      myFinanceRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Set up observer to detect when products load
      setupProductScrolling();
    }
  };

  const setupProductScrolling = () => {
    // Function to scroll to T-Mobile product or first product
    const scrollToProduct = () => {
      // First, try to find T-Mobile product
      const tMobileProduct = document.querySelector('[data-provider*="T-Mobile"], [data-provider*="t-mobile"], .provider-name:contains("T-Mobile"), .product-card:contains("T-Mobile")');
      
      if (tMobileProduct) {
        tMobileProduct.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        return;
      }
      
      // If no T-Mobile, look for any product using common selectors
      const firstProduct = document.querySelector(
        '.product-card, .offer-card, .plan-card, .provider-card, [data-provider], .myfinance-offer, .offer-item'
      );
      
      if (firstProduct) {
        firstProduct.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    };

    // Set up mutation observer to detect when products are added to the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any added nodes contain product information
          const hasProducts = Array.from(mutation.addedNodes).some(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              return element.querySelector('.product-card, .offer-card, .plan-card, .provider-card, [data-provider], .myfinance-offer, .offer-item') ||
                     element.classList.contains('product-card') ||
                     element.classList.contains('offer-card') ||
                     element.classList.contains('plan-card') ||
                     element.classList.contains('provider-card') ||
                     element.classList.contains('myfinance-offer') ||
                     element.classList.contains('offer-item') ||
                     element.hasAttribute('data-provider');
            }
            return false;
          });
          
          if (hasProducts) {
            // Wait a moment for all products to render, then scroll
            setTimeout(scrollToProduct, 500);
            observer.disconnect(); // Stop observing once we've found products
          }
        }
      });
    });

    // Start observing the MyFinance container and its children
    const container = document.getElementById('myfinance-container');
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true
      });
      
      // Also check if products are already loaded
      setTimeout(() => {
        const existingProducts = container.querySelector('.product-card, .offer-card, .plan-card, .provider-card, [data-provider], .myfinance-offer, .offer-item');
        if (existingProducts) {
          scrollToProduct();
          observer.disconnect();
        }
      }, 1000);
      
      // Clean up observer after 10 seconds to prevent memory leaks
      setTimeout(() => {
        observer.disconnect();
      }, 10000);
    }
  };

  const handleGetStarted = () => {
    navigate('/signup/address');
  };

  const handleScrollToPlans = () => {
    const container = document.getElementById('myfinance-container');
    if (container) {
      container.scrollIntoView({ 
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Hero Content */}
            <div className="text-center max-w-4xl mx-auto">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-800 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 shadow-sm border border-blue-200">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>Updated Internet Rates & Deals for 2026</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Shopping for internet has never been easier
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                Search providers, compare plans and order service in just a few easy clicks.
              </p>

              {/* ZIP Code Input and CTA */}
              <div className="max-w-md mx-auto mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="zip-input"
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter your ZIP code"
                    className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    maxLength={5}
                  />
                  <button
                    onClick={handleCheckAvailability}
                    className="bg-[#28A745] hover:bg-[#218838] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#28A745]/50 flex items-center justify-center whitespace-nowrap"
                  >
                    Check Availability →
                  </button>
                </div>
              </div>

              {/* Supporting Text */}
              <p className="text-gray-500 text-sm mb-6">
                Takes less than 30 seconds
              </p>

              {/* Provider Logo Trust Ribbon */}
              <div className="pt-6 border-t border-gray-200/60 max-w-2xl mx-auto mb-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Compare plans from top national providers
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
                  <span className="font-extrabold text-gray-700 text-lg tracking-tight">Spectrum</span>
                  <span className="font-bold text-red-600 text-lg tracking-tight">Frontier</span>
                  <span className="font-bold text-green-600 text-lg tracking-tight">Kinetic</span>
                  <span className="font-bold text-yellow-600 text-lg tracking-tight">Brightspeed</span>
                  <span className="font-extrabold text-pink-600 text-lg tracking-tight">T-Mobile</span>
                </div>
              </div>

              {/* Reviews Snippet */}
              <div className="flex items-center justify-center space-x-3 text-sm" aria-label="Customer rating: 4.3 out of 5 based on 4,322 reviews">
                <span className="text-gray-600">Our customers say</span>
                <span className="font-bold text-gray-900">Excellent</span>
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span className="text-gray-600 font-medium">4.3</span>
                </div>
                <span className="text-gray-500">4,322 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Notification Banner */}
      <button
        onClick={handleScrollToPlans}
        className="w-full bg-gradient-to-r from-[#0c2b7a] to-[#0a2463] text-white py-3 px-4 hover:scale-105 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        role="button"
        aria-label="Scroll to available providers"
      >
        <div className="flex items-center justify-center space-x-2">
          <span className="font-bold text-sm md:text-base">
            SCROLL DOWN TO SEE AVAILABLE PLANS!
          </span>
          <div className="flex space-x-1 motion-safe:animate-pulse">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </button>

      {/* MyFinance Widget Section */}
      <section ref={myFinanceRef} className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div id="myfinance-container" className="min-h-[400px]">
              {/* MyFinance widget will be inserted here */}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Metrics Bar */}
      <section className="bg-gray-900 text-white py-8 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-blue-400">50+</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">National & Local ISPs</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-green-400">30k+</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">ZIP Codes Covered</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-yellow-400">100%</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Free to Compare</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-purple-400">1 Gig+</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Fiber Speeds Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose HomeTechDealer?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We make finding and ordering internet service simple, fast, and transparent.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group p-6 rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Search className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Search</h3>
                <p className="text-gray-600 leading-relaxed">
                  Simply enter your ZIP code to see all available internet providers and plans in your area.
                </p>
              </div>

              <div className="text-center group p-6 rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                  <BarChart3 className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Compare Plans</h3>
                <p className="text-gray-600 leading-relaxed">
                  View detailed comparisons of speeds, prices, and features to find the perfect plan for your needs.
                </p>
              </div>

              <div className="text-center group p-6 rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <ShoppingCart className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Order</h3>
                <p className="text-gray-600 leading-relaxed">
                  Order your chosen plan directly through our platform with secure, streamlined checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Get Connected Today
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Don't wait weeks for internet installation. Many of our providers offer same-day or next-day service activation.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">No hidden fees or surprise charges</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">24/7 customer support included</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Professional installation available</span>
                  </div>
                </div>

                <button
                  onClick={handleGetStarted}
                  className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl text-center shadow-sm border border-blue-100">
                  <Wifi className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">High-Speed</h3>
                  <p className="text-gray-600 text-sm">Up to 1 Gig speeds available</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center shadow-sm border border-green-100">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Best Prices</h3>
                  <p className="text-gray-600 text-sm">Competitive rates guaranteed</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl text-center shadow-sm border border-purple-100">
                  <HeadphonesIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Support</h3>
                  <p className="text-gray-600 text-sm">Expert help when you need it</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl text-center shadow-sm border border-orange-100">
                  <CheckCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Reliable</h3>
                  <p className="text-gray-600 text-sm">99.9% uptime guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our service.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "How quickly can I get internet service?",
                  answer: "Most providers can activate service within 1-3 business days. Some offer same-day installation for certain areas and plan types."
                },
                {
                  question: "Are there any hidden fees?",
                  answer: "No, we believe in transparent pricing. All fees and charges are clearly displayed before you complete your order."
                },
                {
                  question: "Can I cancel my service anytime?",
                  answer: "Cancellation policies vary by provider. We'll clearly show you each provider's terms before you sign up, including any early termination fees."
                },
                {
                  question: "What if I need technical support?",
                  answer: "Each provider offers their own customer support. Additionally, our team is available to help you with any questions about your service selection."
                },
                {
                  question: "Do you service my area?",
                  answer: "We work with providers nationwide. Enter your ZIP code above to see all available options in your specific location."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Connected?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect internet plan through HomeTechDealer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50 flex items-center space-x-2"
              >
                <span>Start Your Search</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-4 text-blue-100">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Live Chat Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Email Help</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileCTA />
    </div>
  );
};

export default HomePage;