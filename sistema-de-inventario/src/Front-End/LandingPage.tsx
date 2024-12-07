// src/components/LandingPage.tsx
import React, { useEffect, useState, useRef } from "react";
import "../Stylesheets/LandingPage.css";
import CarroGuardar from "./CarroGuardar";
import ChatBot from "./ChatBot";
import ListarCarros from "./ListarCarros";


const LandingPage: React.FC = () => {
  const [nome, setNome] = useState<string>("Usuário"); // Valor padrão
  const [mostrarCursor, setMostrarCursor] = useState(true); // Controla o cursor
  const [mostrarNavbar, setMostrarNavbar] = useState(false);
  const [mostrarWebsite, setMostrarWebsite] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

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
      setMostrarWebsite(true);
      setMostrarNavbar(true);
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


  return (
    <body className="BodyLandingPage">
    <div>
      <div>
        {mostrarWebsite && (
          <i className="bi bi-plus Mais" onClick={handleAbrirModal}></i>
        )}
      </div>

      <CarroGuardar isVisible={mostrarModal} onClose={handleFecharModal} />
      {mostrarWebsite && (<ListarCarros />)}
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
        <ChatBot />
      </div>
    </div>
    </body>
  );
};

export default LandingPage;