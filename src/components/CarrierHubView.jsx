import React from "react";
import { CarrierLogo } from "./CarrierLogos";
import { PhoneCall, Building2 } from "lucide-react";

export function CarrierHubView({ carrierId, cityName, stateName, phoneNumber, onSelectCity }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
        <div className="flex justify-center mb-6">
          <CarrierLogo id={carrierId} name={carrierId} className="h-16 w-auto" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">
          {carrierId.toUpperCase()} Internet in {cityName}, {stateName}
        </h1>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Check availability and get the best local deals for {carrierId.toUpperCase()} internet service in {cityName}.
        </p>
        <a
          href={`tel:${phoneNumber.replace(/\D/g, "")}`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-blue-500/30"
        >
          <PhoneCall className="w-5 h-5" />
          <span>Call to Order: {phoneNumber}</span>
        </a>
      </div>
    </div>
  );
}
