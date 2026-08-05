import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import FormLayout from '../../components/FormLayout';
import { useSignup } from '../../context/SignupContext';

const EmailForm = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useSignup();
  
  const [email, setEmail] = useState(signupData.email);
  const [errors, setErrors] = useState({
    email: ''
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      email: ''
    };

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      updateSignupData({ email });
      navigate('/signup/phone');
    }
  };

  return (
    <FormLayout 
      title="Contact Information" 
      subtitle="How can we reach you?"
      step={3}
      totalSteps={4}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="john.doe@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <p className="text-sm text-blue-800">
            We'll use your email to send you important information about your service, including installation details and account updates.
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => navigate('/signup/name')}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
          >
            Back
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

export default EmailForm;