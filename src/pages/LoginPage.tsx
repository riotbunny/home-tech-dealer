Here's the fixed version with all missing closing brackets added:

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, CheckCircle, X, Edit, ExternalLink, Save, Users, ArrowRight, AlertTriangle } from 'lucide-react';
import { useDealer, DealerApplication } from '../context/DealerContext';

const LoginPage = () => {
  // ... [rest of the code remains the same until the missing brackets] ...

                  <div className="text-center py-8">
                    <Users size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No pending applications</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Onboarding Applications Modal */}
        {showOnboardingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Dealers in Onboarding</h3>
                  <button 
                    onClick={() => setShowOnboardingModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                {onboardingApplications.length > 0 ? (
                  <div className="space-y-4">
                    {onboardingApplications.map(app => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{app.contactName}</h4>
                            <p className="text-sm text-gray-600">
                              {app.applicantType === 'business' ? app.businessName : 'Individual Agent'} • {app.city}, {app.state}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              In onboarding since {new Date(app.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleViewApplication(app)}
                              className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 text-sm"
                            >
                              View Details
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(app.id, 'pending')}
                              className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                            >
                              Move to Pending
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(app.id, 'active')}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                            >
                              Activate
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(app.id, 'rejected')}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No dealers in onboarding</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Active Dealers Modal */}
        {showActiveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Active Dealers</h3>
                  <button 
                    onClick={() => setShowActiveModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                {activeApplications.length > 0 ? (
                  <div className="space-y-4">
                    {activeApplications.map(app => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{app.contactName}</h4>
                            <p className="text-sm text-gray-600">
                              {app.applicantType === 'business' ? app.businessName : 'Individual Agent'} • {app.city}, {app.state}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Active since {new Date(app.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleViewApplication(app)}
                              className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 text-sm"
                            >
                              View Details
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(app.id, 'approved')}
                              className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                            >
                              Move to Onboarding
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedApplication(app);
                                setShowTerminateConfirmation(true);
                              }}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                            >
                              Terminate
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No active dealers</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rejected Dealers Modal */}
        {showRejectedModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Rejected Dealers</h3>
                  <button 
                    onClick={() => setShowRejectedModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                {rejectedApplications.length > 0 ? (
                  <div className="space-y-4">
                    {rejectedApplications.map(app => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{app.contactName}</h4>
                            <p className="text-sm text-gray-600">
                              {app.applicantType === 'business' ? app.businessName : 'Individual Agent'} • {app.city}, {app.state}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Rejected on {new Date(app.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleViewApplication(app)}
                              className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 text-sm"
                            >
                              View Details
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(app.id, 'pending')}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                              Move to Pending
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No rejected dealers</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#0a2463] p-6 text-white text-center">
          <div className="flex justify-center mb-2">
            <Lock size={40} />
          </div>
          <h2 className="text-2xl font-bold">Admin Login</h2>
          <p className="text-blue-100 mt-1">Access the dealer management system</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
              <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-[#0a2463] hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#0a2463] text-white py-3 rounded-md hover:bg-[#0d2d7a] transition duration-300"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-[#0a2463] hover:underline text-sm"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
```