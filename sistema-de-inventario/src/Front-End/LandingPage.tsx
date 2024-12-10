import React, { useState, useEffect, useRef } from "react";
import "../Stylesheets/LandingPage.css";
import ChatBot from "./ChatBot";
import Carrosel from "./Carrosel";

const LandingPage: React.FC = () => {
  const [nome, setNome] = useState<string>("Usuário");
  const [mostrarCursor, setMostrarCursor] = useState(true);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [mostrarWebsite, setMostrarWebsite] = useState(false);

  const tituloRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeUsuario");
    if (nomeSalvo) {
      setNome(nomeSalvo);
    }

    const handleAnimationEnd = () => {
      setMostrarCursor(false);
      setMostrarWebsite(true);
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

  const toggleSidebar = () => {
    setSidebarAberta((prev) => !prev);
  };

  return (
    <div className="BodyLandingPage">
      {mostrarWebsite &&  (<div>
      <div className={`TopBarLandingPage ${sidebarAberta ? "with-sidebar" : ""}`}>
        <button className="btn btn-dark Mais" onClick={toggleSidebar}>
          <i className="bi bi-plus"></i>
        </button>
      </div>
      <div className="painel-direito">
        <p>Conteúdo do painel direito</p>
      </div>

      <div className={`DivCentralLandingPage ${sidebarAberta ? 'SideBarAberta' : ''}`}>
        <Carrosel/>
      </div>
      <div
        className={`navbar-container LandingPageNavBarContainer ${
          sidebarAberta ? "conteudoSideBarAberta" : "conteudoSideBarFechada"
        }`}
      >
        <nav className="navbar LandingPageNavBar d-flex flex-column align-items-start h-100">
          <a className="navbar-brand LandingPageNavBarMarca mx-3 mt-3" href="#">
            Menu
          </a>
          <ul className="navbar-nav flex-column">
            <li className="nav-item">
              <a className="nav-link LandingPageNavBarLink text-light" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link LandingPageNavBarLink text-light" href="#">
                Perfil
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link LandingPageNavBarLink text-light" href="#">
                Link
              </a>
            </li>
          </ul>
        </nav>
      </div>
      </div>)}
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
  );
};

export default LandingPage;
