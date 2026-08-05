import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SignupData {
  street: string;
  city: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface SignupContextType {
  signupData: SignupData;
  updateSignupData: (data: Partial<SignupData>) => void;
  resetSignupData: () => void;
}

const initialSignupData: SignupData = {
  street: '',
  city: '',
  zipCode: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [signupData, setSignupData] = useState<SignupData>(initialSignupData);

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData(prev => ({ ...prev, ...data }));
  };

  const resetSignupData = () => {
    setSignupData(initialSignupData);
  };

  return (
    <SignupContext.Provider value={{ signupData, updateSignupData, resetSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};