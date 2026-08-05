{/* Previous Layout.tsx content with updated footer */}
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Show minimal header on home page, full nav on other pages
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal Header for Home Page */}
      {isHomePage ? (
        <header className="bg-white shadow-sm py-3 relative z-20">
          <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Logo Left */}
            <Link to="/" className="flex items-center">
              <img 
                src="/Untitled design (14).png" 
                alt="HomeTech" 
                className="w-[120px] md:w-[160px] h-auto mr-4"
              />
            </Link>
            
            {/* Contact Info Right */}
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center text-gray-700">
                <Mail size={16} className="mr-2 text-[#0a2463]" />
                <span className="font-medium">info@hometechdealer.com</span>
              </div>
            </div>
            
            {/* Mobile Contact */}
            <div className="md:hidden">
              <div className="flex items-center text-[#0a2463] font-medium">
                <Mail size={18} className="mr-1" />
                <span className="text-sm">info@hometechdealer.com</span>
              </div>
            </div>
          </div>
        </header>
      ) : (
        /* Full Navigation for Other Pages */
        <header className="bg-[#0a2463] text-white py-4 shadow-md">
          <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/Untitled design (14).png" 
                alt="HomeTech" 
                className="w-[120px] md:w-[180px] h-auto mr-4"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className={`hover:text-blue-200 font-medium ${location.pathname === '/' ? 'text-blue-200' : ''}`}>Home</Link>
              <Link to="/products" className={`hover:text-blue-200 font-medium ${location.pathname === '/products' ? 'text-blue-200' : ''}`}>Products</Link>
              <Link to="/services" className={`hover:text-blue-200 font-medium ${location.pathname === '/services' ? 'text-blue-200' : ''}`}>Services</Link>
              <Link to="/about" className={`hover:text-blue-200 font-medium ${location.pathname === '/about' ? 'text-blue-200' : ''}`}>About Us</Link>
              <Link to="/become-dealer" className={`hover:text-blue-200 font-medium ${location.pathname === '/become-dealer' ? 'text-blue-200' : ''}`}>Become a Dealer</Link>
              <Link to="/contact" className={`hover:text-blue-200 font-medium ${location.pathname === '/contact' ? 'text-blue-200' : ''}`}>Contact</Link>
            </nav>
            
            {/* Check Availability Button */}
            <button 
              onClick={() => navigate('/signup/address')}
              className="bg-[#28A745] text-white px-4 py-2 rounded-md hover:bg-[#218838] transition duration-300 font-medium"
            >
              Check Availability
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/Untitled design (14).png" 
                  alt="HomeTech" 
                  className="h-8 mr-2 brightness-200"
                />
              </div>
              <p className="text-gray-400 mb-4">Your one-stop shop for all home technology needs. Quality products and expert service since 2018.</p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/HomeTechDealer" target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} className="cursor-pointer hover:text-blue-400" />
                </a>
                <Twitter size={20} className="cursor-pointer hover:text-blue-400" />
                <Instagram size={20} className="cursor-pointer hover:text-pink-400" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">My Account</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Order Tracking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Returns & Refunds</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link to="/disclaimer" className="text-gray-400 hover:text-white">Disclaimer</Link></li>
                <li><Link to="/do-not-call-policy" className="text-gray-400 hover:text-white">Do Not Call Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 mt-6 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Home Tech Dealer Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;