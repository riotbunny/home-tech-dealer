import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    textConsent: '' // 'yes', 'no', or ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    textConsent: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleConsentChange = (value: string) => {
    setFormData(prev => ({ ...prev, textConsent: value }));
    
    // Clear error when selection is made
    if (errors.textConsent) {
      setErrors(prev => ({ ...prev, textConsent: '' }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      message: '',
      textConsent: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    if (!formData.textConsent) {
      newErrors.textConsent = 'Please select your text message preference';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate() && !isSubmitting) {
      setIsSubmitting(true);
      
      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Contact form submitted:', formData);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <CheckCircle size={64} className="text-green-500 mx-auto" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Thank You for Contacting Us!
              </h2>
              <p className="text-gray-600 mb-8">
                We've received your message and will get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    textConsent: ''
                  });
                }}
                className="bg-[#0a2463] text-white px-6 py-3 rounded-md hover:bg-[#0d2d7a] transition duration-300"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-[#0a2463] text-white p-8 rounded-lg h-full">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="mr-4 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-blue-100">(833) 662-4289</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="mr-4 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-blue-100">info@hometechdealer.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MessageSquare className="mr-4 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-blue-100">Monday - Friday: 9AM - 6PM EST</p>
                      <p className="text-blue-100">Saturday: 10AM - 4PM EST</p>
                      <p className="text-blue-100">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone Field */}
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Message Field */}
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  {/* Text Message Consent Section */}
                  <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 mb-4">
                        Home Tech Dealer Inc would like your consent to send text message communications from +18447638868 to your mobile number listed above, regarding customer care.
                        Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply 'STOP' to unsubscribe at any time. Reply 'HELP' for assistance or more information.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="radio"
                          name="textConsent"
                          value="yes"
                          checked={formData.textConsent === 'yes'}
                          onChange={(e) => handleConsentChange(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Yes, I consent to receive informational messages from Home Tech Dealer Inc regarding customer care.
                        </span>
                      </label>

                      <label className="flex items-start cursor-pointer">
                        <input
                          type="radio"
                          name="textConsent"
                          value="no"
                          checked={formData.textConsent === 'no'}
                          onChange={(e) => handleConsentChange(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          No, I do not want to receive any text messages from Home Tech Dealer Inc
                        </span>
                      </label>
                    </div>

                    {errors.textConsent && <p className="text-red-500 text-sm mt-2">{errors.textConsent}</p>}

                    <p className="text-xs text-gray-600 mt-4">
                      We do not share your mobile opt-in information with anyone. See our{' '}
                      <a href="/privacy-policy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                      </a>{' '}
                      for more information on how we handle your data.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#0a2463] text-white py-3 px-6 rounded-md font-medium transition duration-300 flex items-center justify-center ${
                      isSubmitting 
                        ? 'opacity-75 cursor-not-allowed' 
                        : 'hover:bg-[#0d2d7a] transform hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;