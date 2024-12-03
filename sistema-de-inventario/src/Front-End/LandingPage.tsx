// src/components/LandingPage.tsx
import React, { useEffect, useState, useRef } from "react";
import "../Front-End/LandingPage.css";
import CarModal from "./CarModal";
import { invokeCohere } from "../CohereApi"; // Importe a função

const LandingPage: React.FC = () => {
  const [nome, setNome] = useState<string>("Usuário"); // Valor padrão
  const [mostrarCursor, setMostrarCursor] = useState(true); // Controla o cursor
  const [mostrarNavbar, setMostrarNavbar] = useState(false);
  const [mostrarBotao, setMostrarBotao] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [respostaAI, setRespostaAI] = useState<string>(""); // Para exibir a resposta do AI
  const [textoInput, setTextoInput] = useState<string>(""); // Estado para armazenar o texto do input

  const handleAbrirModal = () => setMostrarModal(true);
  const handleFecharModal = () => setMostrarModal(false);

  const tituloRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeUsuario");
    if (nomeSalvo) {
      setNome(nomeSalvo); // Atualiza o estado com o nome salvo
    }

    const handleAnimationEnd = () => {
      console.log("Animação terminou");
      setMostrarCursor(false); // Remove o cursor quando a animação terminar
      setMostrarNavbar(true);
      setMostrarBotao(true);
      console.log("Mostrar Navbar:", true);
    };

    const titulo = tituloRef.current;
    if (titulo) {
      titulo.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (titulo) {
        titulo.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

  // Função para invocar o modelo AI
  const handleInvokeAI = async () => {
    if (!textoInput.trim()) {
      setRespostaAI("Por favor, insira um texto válido.");
      return;
    }

    try {
      const resposta = await invokeCohere(textoInput); // Usa o texto do input
      setRespostaAI(resposta); // Atualiza o estado com a resposta do AI
    } catch (error) {
      setRespostaAI("Erro ao obter a resposta. Tente novamente.");
    }
  };

  return (
    <div>
      <div>
        {mostrarBotao && (
          <i className="bi bi-plus Mais" onClick={handleAbrirModal}></i>
        )}
      </div>

      <CarModal isVisible={mostrarModal} onClose={handleFecharModal} />

      {mostrarNavbar && (
        <div className="NavContainer">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="#">
                  Perfil
                </a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="navbar-brand" aria-current="page" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="navbar-brand" href="#">
                      Link
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}

      <div className="BemVindo-Container">
        <h1
          ref={tituloRef}
          className={`Titulo ${
            mostrarCursor ? "AnimacaoCursor" : "CursorDesaparecendo"
          }`}
        >
          Bem-Vindo {nome}
        </h1>

        {/* Input de texto */}
        <div className="InputContainer">
          <textarea
            placeholder="Digite seu texto aqui..."
            value={textoInput}
            onChange={(e) => setTextoInput(e.target.value)}
            className="form-control"
            rows={4}
          ></textarea>
          <button onClick={handleInvokeAI} className="btn btn-primary mt-2">
            Enviar para AI
          </button>
        </div>

        {/* Exibir a resposta do modelo */}
        {respostaAI && (
          <div className="RespostaAI mt-3">
            <p>Resposta da AI: {respostaAI}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;