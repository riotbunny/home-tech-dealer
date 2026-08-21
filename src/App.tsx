import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import StatePage from './pages/StatePage';
import CityPage from './pages/CityPage';
import ZipPage from './pages/ZipPage';
import SecurityZipPage from './pages/SecurityZipPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Internet Hub Routes */}
        <Route path="/internet/:state" element={<StatePage />} />
        <Route path="/internet/:state/:city" element={<CityPage />} />
        <Route path="/internet/:state/:city/:zipCode" element={<ZipPage />} />
        
        {/* ADT Security Programmatic Routes */}
        <Route path="/security/:state/:city/:zipCode" element={<SecurityZipPage />} />
        
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;