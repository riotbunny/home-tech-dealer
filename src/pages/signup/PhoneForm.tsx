import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, AlertCircle } from 'lucide-react';
import FormLayout from '../../components/FormLayout';
import { useSignup } from '../../context/SignupContext';

const PhoneForm = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useSignup();
  
  const [phone, setPhone] = useState(signupData.phone);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({
    phone: '',
    terms: ''
  });

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Strip all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format the phone number as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
    
    // Clear error when field is edited
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      phone: '',
      terms: ''
    };

    // Remove formatting to check length
    const phoneDigits = phone.replace(/\D/g, '');

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      valid = false;
    }

    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms to continue';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      updateSignupData({ phone });
      navigate('/signup/confirmation');
    }
  };

  return (
    <FormLayout 
      title="Phone Number" 
      subtitle="How can our technicians reach you?"
      step={4}
      totalSteps={4}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            className={`w-full px-4 py-3 rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        
        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  if (e.target.checked && errors.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }));
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              By clicking Submit, I agree to receive marketing calls, texts, and emails from Home Tech Dealer Inc at the number provided, including via an autodialer or prerecorded message. I understand that consent is not a condition of purchase. Reply STOP to opt out at any time.
            </label>
          </div>
          {errors.terms && (
            <div className="mt-2 flex items-center text-red-500 text-sm">
              <AlertCircle size={16} className="mr-1" />
              {errors.terms}
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <p className="text-sm text-blue-800">
            Our technicians will call you to schedule your installation appointment. We may also send you text message updates about your service.
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => navigate('/signup/email')}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-[#0a2463] text-white rounded-md hover:bg-[#0d2d7a] transition duration-300"
          >
            Complete
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          By submitting, you agree to our{' '}
          <Link to="/privacy-policy" className="text-blue-600 hover:underline" target="_blank">Privacy Policy</Link>,{' '}
          <Link to="/terms-of-service" className="text-blue-600 hover:underline" target="_blank">Terms of Service</Link>,{' '}
          <Link to="/disclaimer" className="text-blue-600 hover:underline" target="_blank">Disclaimer</Link>, and{' '}
          <Link to="/do-not-call-policy" className="text-blue-600 hover:underline" target="_blank">Do Not Call Policy</Link>.
        </div>
      </form>
    </FormLayout>
  );
};

export default PhoneForm;