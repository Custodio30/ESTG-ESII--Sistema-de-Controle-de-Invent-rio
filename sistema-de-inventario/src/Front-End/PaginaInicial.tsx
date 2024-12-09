import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { Link } from "react-router-dom";
import "../StyleSheets/PaginaInicial.css";
import * as THREE from "three";

type GLTFResult = {
  scene: THREE.Object3D;
};

function Model() {
  const { scene } = useGLTF(
    "/3DModels/novoPorsche.glb"
  ) as GLTFResult;

  return (
    <primitive
      object={scene}
      scale={[8.5, 8.5, 8.5]}
      position={[28, 4, 0]}
      rotation={[0.14, -1, 0]}
    />
  );
}

const PaginaInicial: React.FC = () => {
  return (
    <body className="BodyPaginaInicial">
      <div className="pagina-inicial">
        <nav className="navbar navbar-expand-lg NavBarPaginaInicial">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link NavBarItemPaginaInicial" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link NavBarItemPaginaInicial" to="/landing">
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link NavBarItemPaginaInicial" to="/pricing">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="text-justify DivPaginaCarroETexto-PaginaInicial">
          <div className="DivTextoPrincipal-PaginaInicial">
            <h1 className="Titulo1-PaginaInicial">
              A Maneira Mais Fácil de Controlar O Seu Estoque
            </h1>
            <h2 className="Titulo2-PaginaInicial">
              Ganhe Total Controle Sobre o Seu Inventário
            </h2>
            <p className="Texto-PaginaInicial">
              Gerencie seus produtos de forma inteligente e sem complicações.
              Nosso sistema permite que você registre itens, monitore entradas
              e saídas e gere relatórios em tempo real. Simplifique processos e
              elimine erros com uma solução projetada para otimizar a gestão do
              seu estoque.
            </p>
          </div>
        </div>
        <Canvas
          className="canvas-pagina-inicial"
          camera={{ position: [0, 15, 40], fov: 65 }}
          gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
        >
          <directionalLight position={[0, 0, 5]} intensity={5} />

          <Environment preset="city" />


          <Model />
        </Canvas>
      </div>
    </body>
  );
};

export default PaginaInicial;
