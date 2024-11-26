import React, { useEffect, useState } from 'react';
import '../Front-End/LandingPage.css';


const LandingPage: React.FC = () => {
  const [nome, setNome] = useState<string>('Usuário'); // Valor padrão

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nomeUsuario');
    if (nomeSalvo) {
      setNome(nomeSalvo); // Atualiza o estado com o nome salvo
    }
  }, []);

  return (
    <div className="BemVindo-Container">
      <h1 className="Titulo AnimacaoCursor">Bem-Vindo {nome}</h1>
    </div>
  );
};

export default LandingPage;
