import React, { useState, useEffect, useRef } from "react";
import "../Stylesheets/LandingPage.css";
import ChatBot from "./ChatBot";
import Carrosel from "./Carrosel";
import SideBar from "./SideBar";

const LandingPage: React.FC = () => {
  const [nome, setNome] = useState<string>("Usuário");
  const [mostrarCursor, setMostrarCursor] = useState(true);
  const [mostrarWebsite, setMostrarWebsite] = useState(false);
  const [slideIndex, setSlideIndex] = useState<number>(0); // Estado para controlar o slide

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

  return (
    <div className="BodyLandingPage">
      <div className="DivLandingPage">
        {mostrarWebsite && (
          <div>
            <SideBar setSlideIndex={setSlideIndex} /> {/* Passa a função para atualizar o estado */}
            <div className="DivCentralLandingPage">
              <Carrosel slideIndex={slideIndex} /> {/* Passa o índice para o Carrosel */}
            </div>
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
    </div>
  );
};

export default LandingPage;
