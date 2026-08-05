import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Globe, 
  Calendar, 
  MapPin, 
  Linkedin, 
  User, 
  Users, 
  Clock, 
  Phone, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Mail,
  MessageSquare
} from 'lucide-react';

interface FormData {
  // Step 1: Basic Company Information
  companyName: string;
  companyWebsite: string;
  yearsInBusiness: string;
  companyAddress: string;
  linkedinPage: string;
  ownerEmail: string;
  ownerPhone: string;
  operationsManagerInfo: string;

  // Step 2: Call Center Capabilities
  totalSeats: string;
  readyAgents: string;
  operationHours: string;
  campaignExperience: string[];
  otherCampaignExperience: string;

  // Step 3: Sales & Lead Generation
  leadGeneration: string[];
  otherLeadGeneration: string;

  // Step 4: Compliance & Security
  hasQaTeam: string;
  providesRecordings: string;
  usesVpn: string;
  dialerCrm: string;
  complianceProcess: string;

  // Step 5: Final Screening
  agreesToVideoCall: string;
  agreesToProvideRecording: string;
}

const initialFormData: FormData = {
  companyName: '',
  companyWebsite: '',
  yearsInBusiness: '',
  companyAddress: '',
  linkedinPage: '',
  ownerEmail: '',
  ownerPhone: '',
  operationsManagerInfo: '',
  totalSeats: '',
  readyAgents: '',
  operationHours: '',
  campaignExperience: [],
  otherCampaignExperience: '',
  leadGeneration: [],
  otherLeadGeneration: '',
  hasQaTeam: '',
  providesRecordings: '',
  usesVpn: '',
  dialerCrm: '',
  complianceProcess: '',
  agreesToVideoCall: '',
  agreesToProvideRecording: ''
};

const IntakePage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'campaignExperience' | 'leadGeneration') => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.yearsInBusiness) newErrors.yearsInBusiness = 'Years in business is required';
        if (!formData.companyAddress) newErrors.companyAddress = 'Company address is required';
        if (!formData.ownerEmail) newErrors.ownerEmail = 'Owner/Contact email is required';
        if (!formData.ownerPhone) newErrors.ownerPhone = 'Owner/Contact phone number is required';
        if (formData.ownerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail)) {
          newErrors.ownerEmail = 'Please enter a valid email address';
        }
        break;

      case 2:
        if (!formData.totalSeats) newErrors.totalSeats = 'Total seats is required';
        if (!formData.readyAgents) newErrors.readyAgents = 'Number of ready agents is required';
        if (!formData.operationHours) newErrors.operationHours = 'Hours of operation is required';
        if (formData.campaignExperience.length === 0) newErrors.campaignExperience = 'Please select at least one campaign experience';
        break;

      case 3:
        if (formData.leadGeneration.length === 0) newErrors.leadGeneration = 'Please select at least one lead generation method';
        break;

      case 4:
        if (!formData.hasQaTeam) newErrors.hasQaTeam = 'Please indicate if you have a QA team';
        if (!formData.providesRecordings) newErrors.providesRecordings = 'Please indicate if you provide call recordings';
        if (!formData.usesVpn) newErrors.usesVpn = 'Please indicate if you use a secure VPN';
        if (!formData.dialerCrm) newErrors.dialerCrm = 'Dialer & CRM information is required';
        if (!formData.complianceProcess) newErrors.complianceProcess = 'Compliance process description is required';
        break;

      case 5:
        if (!formData.agreesToVideoCall) newErrors.agreesToVideoCall = 'Please indicate if you agree to a video call';
        if (!formData.agreesToProvideRecording) newErrors.agreesToProvideRecording = 'Please indicate if you agree to provide a recording';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep) && !isSubmitting) {
      setSubmitError('');
      setIsSubmitting(true);
      
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbx6aoZvLanAuO1rSVLypePYRNd3-gkWccmjenEMgKor0LXK67BBetUQAjsnNDsFpSc/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        if (data.success) {
          setIsSubmitted(true);
        } else {
          setSubmitError(data.message || 'Failed to submit application. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError('Failed to submit application. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderProgressBar = () => {
    const steps = [
      'Company Information',
      'Call Center Capabilities',
      'Sales & Lead Generation',
      'Compliance & Security',
      'Final Screening'
    ];

    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 text-center text-sm ${
                index + 1 === currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Company Information</h2>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">Company Name*</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.companyName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Company Website</label>
        <input
          type="text"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Years in Business*</label>
        <input
          type="text"
          name="yearsInBusiness"
          value={formData.yearsInBusiness}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.yearsInBusiness ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.yearsInBusiness && <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Company Address*</label>
        <textarea
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.companyAddress ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={3}
        />
        {errors.companyAddress && <p className="text-red-500 text-sm mt-1">{errors.companyAddress}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">LinkedIn Company Page</label>
        <input
          type="text"
          name="linkedinPage"
          value={formData.linkedinPage}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Owner/Contact Email*</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.ownerEmail ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="contact@company.com"
          />
        </div>
        {errors.ownerEmail && <p className="text-red-500 text-sm mt-1">{errors.ownerEmail}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Owner/Contact Phone/WhatsApp*</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="tel"
            name="ownerPhone"
            value={formData.ownerPhone}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.ownerPhone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter phone number"
          />
        </div>
        {errors.ownerPhone && <p className="text-red-500 text-sm mt-1">{errors.ownerPhone}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Call Center Capabilities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Total Number of Seats*</label>
          <input
            type="number"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.totalSeats ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.totalSeats && <p className="text-red-500 text-sm mt-1">{errors.totalSeats}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Number of Ready Agents*</label>
          <input
            type="number"
            name="readyAgents"
            value={formData.readyAgents}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.readyAgents ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.readyAgents && <p className="text-red-500 text-sm mt-1">{errors.readyAgents}</p>}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Hours of Operation*</label>
        <input
          type="text"
          name="operationHours"
          value={formData.operationHours}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.operationHours ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Mon-Fri 9AM-6PM EST"
        />
        {errors.operationHours && <p className="text-red-500 text-sm mt-1">{errors.operationHours}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Campaign Experience*</label>
        <div className="space-y-2">
          {['Telecom', 'Internet Service', 'Cable TV', 'Home Security', 'Other'].map(option => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                value={option}
                checked={formData.campaignExperience.includes(option)}
                onChange={e => handleCheckboxChange(e, 'campaignExperience')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
        {errors.campaignExperience && <p className="text-red-500 text-sm mt-1">{errors.campaignExperience}</p>}
      </div>

      {formData.campaignExperience.includes('Other') && (
        <div>
          <label className="block text-gray-700 font-medium mb-2">Other Campaign Experience</label>
          <textarea
            name="otherCampaignExperience"
            value={formData.otherCampaignExperience}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Please describe your other campaign experience"
          />
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Sales & Lead Generation</h2>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">Lead Generation Methods*</label>
        <div className="space-y-2">
          {[
            'Cold Calling',
            'Warm Leads',
            'Email Marketing',
            'Social Media',
            'Referral Program',
            'Other'
          ].map(option => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                value={option}
                checked={formData.leadGeneration.includes(option)}
                onChange={e => handleCheckboxChange(e, 'leadGeneration')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
        {errors.leadGeneration && <p className="text-red-500 text-sm mt-1">{errors.leadGeneration}</p>}
      </div>

      {formData.leadGeneration.includes('Other') && (
        <div>
          <label className="block text-gray-700 font-medium mb-2">Other Lead Generation Methods</label>
          <textarea
            name="otherLeadGeneration"
            value={formData.otherLeadGeneration}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Please describe your other lead generation methods"
          />
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Compliance & Security</h2>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">Do you have a dedicated QA team?*</label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasQaTeam"
              value="yes"
              checked={formData.hasQaTeam === 'yes'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasQaTeam"
              value="no"
              checked={formData.hasQaTeam === 'no'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
        {errors.hasQaTeam && <p className="text-red-500 text-sm mt-1">{errors.hasQaTeam}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Do you provide call recordings?*</label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="providesRecordings"
              value="yes"
              checked={formData.providesRecordings === 'yes'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="providesRecordings"
              value="no"
              checked={formData.providesRecordings === 'no'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
        {errors.providesRecordings && <p className="text-red-500 text-sm mt-1">{errors.providesRecordings}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Do you use a secure VPN?*</label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="usesVpn"
              value="yes"
              checked={formData.usesVpn === 'yes'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="usesVpn"
              value="no"
              checked={formData.usesVpn === 'no'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
        {errors.usesVpn && <p className="text-red-500 text-sm mt-1">{errors.usesVpn}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Dialer & CRM System*</label>
        <input
          type="text"
          name="dialerCrm"
          value={formData.dialerCrm}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.dialerCrm ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Five9, Salesforce"
        />
        {errors.dialerCrm && <p className="text-red-500 text-sm mt-1">{errors.dialerCrm}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Compliance Process*</label>
        <textarea
          name="complianceProcess"
          value={formData.complianceProcess}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.complianceProcess ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={4}
          placeholder="Describe your compliance monitoring and enforcement process"
        />
        {errors.complianceProcess && <p className="text-red-500 text-sm mt-1">{errors.complianceProcess}</p>}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Final Screening Agreement</h2>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Are you willing to do a live video call for final screening?*
        </label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="agreesToVideoCall"
              value="yes"
              checked={formData.agreesToVideoCall === 'yes'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="agreesToVideoCall"
              value="no"
              checked={formData.agreesToVideoCall === 'no'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
        {errors.agreesToVideoCall && <p className="text-red-500 text-sm mt-1">{errors.agreesToVideoCall}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Do you agree to provide a sample call recording?*
        </label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="agreesToProvideRecording"
              value="yes"
              checked={formData.agreesToProvideRecording === 'yes'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="agreesToProvideRecording"
              value="no"
              checked={formData.agreesToProvideRecording === 'no'}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
        {errors.agreesToProvideRecording && <p className="text-red-500 text-sm mt-1">{errors.agreesToProvideRecording}</p>}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertTriangle className="text-blue-500 mr-3 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900">Before You Submit</h3>
            <p className="text-blue-800 mt-1">
              Please review all information carefully. By submitting this form, you confirm that:
            </p>
            <ul className="list-disc list-inside mt-2 text-blue-800">
              <li>All provided information is accurate and complete</li>
              <li>You have the authority to submit this application</li>
              <li>You agree to participate in the screening process</li>
            </ul>
          </div>
        </div>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <div className="flex items-center">
            <AlertTriangle className="mr-2 flex-shrink-0" size={20} />
            <p>{submitError}</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderNavigationButtons = () => (
    <div className="mt-8 flex justify-between">
      {currentStep > 1 && (
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </button>
      )}
      <button
        onClick={currentStep === 5 ? handleSubmit : handleNext}
        disabled={isSubmitting}
        className={`px-6 py-3 bg-[#0a2463] text-white rounded-md hover:bg-[#0d2d7a] flex items-center ml-auto ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {currentStep === 5 ? (
          isSubmitting ? 'Submitting...' : 'Submit Application'
        ) : (
          <>
            Next Step
            <ArrowRight className="ml-2" size={20} />
          </>
        )}
      </button>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle size={64} className="text-green-500 mx-auto" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in becoming a dealer. Our team will review your application and contact you within 2-3 business days.
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            {renderProgressBar()}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {renderNavigationButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakePage;