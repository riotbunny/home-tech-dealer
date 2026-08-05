import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import FormLayout from '../../components/FormLayout';
import { useSignup } from '../../context/SignupContext';

const NameForm = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useSignup();
  
  const [firstName, setFirstName] = useState(signupData.firstName);
  const [lastName, setLastName] = useState(signupData.lastName);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: ''
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      firstName: '',
      lastName: ''
    };

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      updateSignupData({ firstName, lastName });
      navigate('/signup/email');
    }
  };

  return (
    <FormLayout 
      title="Your Information" 
      subtitle="Tell us a bit about yourself"
      step={2}
      totalSteps={4}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full px-4 py-3 rounded-md border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="John"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full px-4 py-3 rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => navigate('/signup/address')}
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

export default NameForm;