import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import StatePage from './pages/StatePage';
import CityPage from './pages/CityPage';
import ZipPage from './pages/ZipPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* State Hub Route (e.g., /internet/tx) */}
        <Route path="/internet/:state" element={<StatePage />} />
        
        {/* City Hub Route (e.g., /internet/tx/brownsville) */}
        <Route path="/internet/:state/:city" element={<CityPage />} />
        
        {/* ZIP Route (e.g., /internet/tx/brownsville/78520) */}
        <Route path="/internet/:state/:city/:zipCode" element={<ZipPage />} />
        
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;