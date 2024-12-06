import React from 'react';
import '../StyleSheets/PaginaInicial.css'; // Estilos customizados

const PaginaInicial: React.FC = () => {
  return (
    <body className="paginainicial-imagem">
    <div className="pagina-inicial">
      <div className="">
      <nav className="navbar navbar-expand-lg bg-body-tertiary NavBarPaginaInicial">
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
                <a className="nav-link NavBarItemPaginaInicial" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link NavBarItemPaginaInicial" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link NavBarItemPaginaInicial" href="#">Pricing</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      </div>
    </div>
              </body>
  );
};

export default PaginaInicial;
