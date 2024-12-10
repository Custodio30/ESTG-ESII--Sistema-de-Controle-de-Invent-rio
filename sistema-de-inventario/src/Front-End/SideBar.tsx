import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Altere para useNavigate
import "../Stylesheets/SideBar.css";

interface SideBarProps {
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SideBar: React.FC<SideBarProps> = ({ setSlideIndex }) => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const navigate = useNavigate(); // Usando useNavigate ao invés de useHistory

  // Função para lidar com a seleção de botões
  const handleButtonClick = (index: number) => {
    setSlideIndex(index); // Atualiza o slide selecionado
    setSelectedButton(index); // Marca o botão como selecionado
  };

  // Função de logout
  const handleLogout = () => {
    // Limpar dados do usuário do localStorage
    localStorage.removeItem("RegistoID");
    
    // Redirecionar para a página de login
    navigate("/login"); // Substitua "/login" pela sua rota de login
  };

  return (
    <div className="painel-direito">
      <p className="TituloPainel">Sistema de Inventário</p>

      <div className="item-list ItemListaSideBar">
        <button
          onClick={() => handleButtonClick(0)} // Define o índice do slide 0
          className={`item-button BotaoItemSideBar ${selectedButton === 0 ? "selected" : ""}`}
        >
          Listar Carros
        </button>
        <button
          onClick={() => handleButtonClick(1)} // Define o índice do slide 1
          className={`item-button BotaoItemSideBar ${selectedButton === 1 ? "selected" : ""}`}
        >
          Adicionar Carros
        </button>
        <button
          onClick={() => handleButtonClick(2)} // Define o índice do slide 2
          className={`item-button BotaoItemSideBar ${selectedButton === 2 ? "selected" : ""}`}
        >
          Perfil
        </button>
        
        {/* Botão de Logout */}
        <button
          onClick={handleLogout} // Função de logout
          className={`item-button BotaoItemSideBar logout-button`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
