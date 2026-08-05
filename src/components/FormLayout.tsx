import React, { ReactNode } from 'react';
import { MapPin } from 'lucide-react';

interface FormLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  step: number;
  totalSteps: number;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children, title, subtitle, step, totalSteps }) => {
  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#0a2463] p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{title}</h2>
              <div className="text-sm">Step {step} of {totalSteps}</div>
            </div>
            <p className="mt-1 text-blue-100">{subtitle}</p>
          </div>
          
          {/* Progress bar */}
          <div className="bg-gray-200 h-2">
            <div 
              className="bg-green-500 h-2 transition-all duration-300" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
          
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;