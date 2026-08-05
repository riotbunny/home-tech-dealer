import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, CheckCircle, X } from 'lucide-react';

const ContactConsentPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const validate = () => {
    let valid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      phone: ''
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
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

    setErrors(newErrors);
    return valid;
  };

  const handleOptIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // Here you would typically send the data to your backend
      console.log('Opt-in data:', formData);
      setIsSubmitted(true);
    }
  };

  const handleNoThanks = () => {
    navigate('/');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a2463] to-[#3e92cc] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6">
            <CheckCircle size={64} className="text-green-500 mx-auto" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-8">
            You've been successfully added to our contact list. We'll be in touch with exclusive offers and updates.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#0a2463] text-white px-6 py-3 rounded-md hover:bg-[#0d2d7a] transition duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a2463] to-[#3e92cc] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Stay Connected</h1>
          <p className="text-blue-100">Get exclusive offers and updates</p>
        </div>
        
        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleOptIn}>
            <div className="mb-6">
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                First Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                Last Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
              </div>
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Phone Number *
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

            {/* Consent Text */}
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                By clicking "Opt Me In!", you consent to receive marketing calls, texts, and emails from Home Tech Dealer Inc. 
                You can opt out at any time by replying STOP to text messages.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full bg-[#28A745] text-white py-3 rounded-md font-semibold hover:bg-[#218838] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#28A745] focus:ring-opacity-50"
              >
                Opt Me In!
              </button>
              
              <button
                type="button"
                onClick={handleNoThanks}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-300 transition duration-300 flex items-center justify-center"
              >
                <X className="mr-2" size={20} />
                No Thanks
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactConsentPage;