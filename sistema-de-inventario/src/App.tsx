// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../src/Front-End/LoginPage';
import LandingPage from '../src/Front-End/LandingPage';
import CarModel from '../src/Front-End/CarModel';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/CarModel" element={<CarModel />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
