// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../src/Front-End/LoginPage';
import LandingPage from '../src/Front-End/LandingPage';
import CarModel from '../src/Front-End/CarModel';


const App: React.FC = () => {
  const [quest, setQuestion] = useState(""); // Nome do estado ajustado para ser consistente

  // Função handleSubmit corrigida
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const answer = await getAnswer(quest); // Usa "quest" como estado
    console.log(answer);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/CarModel" element={<CarModel />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>

      {/* Formulário para interação com handleSubmit */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quest} // Liga o input ao estado
          onChange={(e) => setQuestion(e.target.value)} // Atualiza o estado
          placeholder="Digite sua pergunta"
        />
        <button type="submit">Enviar</button>
      </form>
    </Router>
  );
};

export default App;
