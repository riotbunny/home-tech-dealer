import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import FormLayout from '../../components/FormLayout';
import { useSignup } from '../../context/SignupContext';

const AddressForm = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useSignup();
  
  const [street, setStreet] = useState(signupData.street);
  const [city, setCity] = useState(signupData.city);
  const [zipCode, setZipCode] = useState(signupData.zipCode);
  const [errors, setErrors] = useState({
    street: '',
    city: '',
    zipCode: ''
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      street: '',
      city: '',
      zipCode: ''
    };

    if (!street.trim()) {
      newErrors.street = 'Street address is required';
      valid = false;
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    if (!zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
      valid = false;
    } else if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      updateSignupData({ street, city, zipCode });
      navigate('/signup/name');
    }
  };

  return (
    <FormLayout 
      title="Service Address" 
      subtitle="Let us know where you'd like to receive service"
      step={1}
      totalSteps={4}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="street" className="block text-gray-700 font-medium mb-2">Street Address</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className={`w-full px-4 py-3 rounded-md border ${errors.street ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="123 Main St"
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`w-full px-4 py-3 rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Anytown"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={`w-full px-4 py-3 rounded-md border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="12345"
            />
            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-[#0a2463] text-white rounded-md hover:bg-[#0d2d7a] transition duration-300"
          >
            Next
          </button>
        </div>
      </form>
    </FormLayout>
  );
};

export default AddressForm;