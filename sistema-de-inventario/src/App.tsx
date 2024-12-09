import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../src/Front-End/LoginPage';
import LandingPage from '../src/Front-End/LandingPage';
import CarModel from '../src/Front-End/CarModel';
import Perfil from '../src/Front-End/Perfil';
import PaginaInicial from '../src/Front-End/PaginaInicial';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/CarModel" element={<CarModel />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
