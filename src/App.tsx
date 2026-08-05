import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import GeoBlocker from './components/GeoBlocker';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import AboutUsPage from './pages/AboutUsPage';
import BecomeADealerPage from './pages/BecomeADealerPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import DoNotCallPolicy from './pages/DoNotCallPolicy';
import ContactConsentPage from './pages/ContactConsentPage';
import AddressForm from './pages/signup/AddressForm';
import NameForm from './pages/signup/NameForm';
import EmailForm from './pages/signup/EmailForm';
import PhoneForm from './pages/signup/PhoneForm';
import Confirmation from './pages/signup/Confirmation';
import AvailabilityChecker from './pages/AvailabilityChecker';
import IntakePage from './pages/IntakePage';
import ContactPage from './pages/ContactPage';
import LocationPage from './pages/LocationPage';
import ProviderPageTemplate from './pages/ProviderPageTemplate';
import Layout from './components/Layout';

const ExternalRedirect = ({ url }: { url: string }) => {
  React.useEffect(() => {
    window.location.href = url;
  }, [url]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

// Dynamic Provider Route Resolver
const ProviderRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const providerData: Record<string, { name: string; minPrice: string; maxSpeed: string }> = {
    spectrum: { name: 'Spectrum', minPrice: '$30.00', maxSpeed: '1,000 Mbps' },
    frontier: { name: 'Frontier Fiber', minPrice: '$49.99', maxSpeed: '5,000 Mbps' },
    kinetic: { name: 'Kinetic by Windstream', minPrice: '$39.99', maxSpeed: '1,000 Mbps' },
    brightspeed: { name: 'Brightspeed', minPrice: '$50.00', maxSpeed: '940 Mbps' },
  };

  const current = slug ? providerData[slug.toLowerCase()] : null;

  if (!current || !slug) {
    return <div className="p-8 text-center">Provider not found</div>;
  }

  return (
    <ProviderPageTemplate
      providerName={current.name}
      minPrice={current.minPrice}
      maxSpeed={current.maxSpeed}
      slug={slug}
    />
  );
};

function App() {
  return (
    <GeoBlocker>
      <Routes>
        <Route path="/check-availability" element={<AvailabilityChecker />} />
        <Route path="/intake" element={<IntakePage />} />
        <Route path="/contact-consent" element={<ContactConsentPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="become-dealer" element={<BecomeADealerPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="do-not-call-policy" element={<DoNotCallPolicy />} />
          <Route path="contact" element={<ContactPage />} />
          
          {/* SEO Dynamic Routes */}
          <Route path="internet/:state/:city" element={<LocationPage />} />
          <Route path="providers/:slug" element={<ProviderRoute />} />
          
          <Route path="frontier" element={<ExternalRedirect url="https://www.jdoqocy.com/click-101529263-17145023" />} />
          <Route path="kinetic" element={<ExternalRedirect url="https://www.anrdoezrs.net/click-101529263-17105509" />} />
          <Route path="brightspeed" element={<ExternalRedirect url="https://www.dpbolvw.net/click-101529263-17139408" />} />
          
          <Route path="signup">
            <Route path="address" element={<AddressForm />} />
            <Route path="name" element={<NameForm />} />
            <Route path="email" element={<EmailForm />} />
            <Route path="phone" element={<PhoneForm />} />
            <Route path="confirmation" element={<Confirmation />} />
          </Route>
        </Route>
      </Routes>
    </GeoBlocker>
  );
}

export default App;