import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/globals.css';

import LandingPage from './components/landing/LandingPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
