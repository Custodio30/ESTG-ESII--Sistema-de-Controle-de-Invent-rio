import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Stylesheets/SideBar.css";

interface SideBarProps {
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
  setMarcaSelecionada: React.Dispatch<React.SetStateAction<string>>;  // Função setter para marca
  setModeloSelecionado: React.Dispatch<React.SetStateAction<string>>; // Função setter para modelo
}

const SideBar: React.FC<SideBarProps> = ({ setSlideIndex, setMarcaSelecionada, setModeloSelecionado }) => {
  const navigate = useNavigate();

  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [marcas, setMarcas] = useState<string[]>([]); // Todas as marcas disponíveis
  const [filteredMarcas, setFilteredMarcas] = useState<string[]>([]); // Marcas filtradas
  const [modelos, setModelos] = useState<string[]>([]); // Modelos correspondentes
  const [marcaSelecionada, setMarcaSelecionadaState] = useState<string>(""); // Marca selecionada
  const [modeloSelecionado, setModeloSelecionadoState] = useState<string>(""); // Modelo selecionado

  useEffect(() => {
    // Fetch para buscar as marcas
    const fetchMarcas = async () => {
      try {
        const response = await fetch("http://localhost:4000/get-makes");
        const data = await response.json();
        const makes = data.Makes.map((make: any) => make.make_display);
        setMarcas(makes);
      } catch (err) {
        console.error("Erro ao buscar marcas:", err);
      }
    };

    fetchMarcas();
  }, []);

  const handleMarcaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMarcaSelecionadaState(value);
    setMarcaSelecionada(value); // Atualiza a marca no componente pai (LandingPage)

    if (value) {
      const filtered = marcas.filter((marca) =>
        marca.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredMarcas(filtered);
    } else {
      setFilteredMarcas([]);
    }
  };

  const handleMarcaSelect = (marca: string) => {
    setMarcaSelecionadaState(marca);
    setMarcaSelecionada(marca); // Atualiza a marca selecionada no componente pai
    setFilteredMarcas([]);

    // Fetch para buscar os modelos da marca selecionada
    fetch(`http://localhost:4000/get-models?make=${marca}`)
      .then((response) => response.json())
      .then((data) => {
        const models = data.Models.map((model: any) => model.model_name);
        setModelos(models);
      })
      .catch((err) => console.error("Erro ao buscar modelos:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("RegistoID");
    navigate("/login");
  };

  return (
    <div className="painel-direito">
      <p className="TituloPainel">Sistema de Inventário</p>

      <div className="item-list ItemListaSideBar">
        <button
          onClick={() => setSlideIndex(0)}
          className={`item-button BotaoItemSideBar ${selectedButton === 0 ? "selected" : ""}`}
        >
          Listar Carros
        </button>
        <button
          onClick={() => setSlideIndex(1)}
          className={`item-button BotaoItemSideBar ${selectedButton === 1 ? "selected" : ""}`}
        >
          Adicionar Carros
        </button>
        <button
          onClick={() => setSlideIndex(2)}
          className={`item-button BotaoItemSideBar ${selectedButton === 2 ? "selected" : ""}`}
        >
          Perfil
        </button>
        <button
          onClick={handleLogout}
          className="item-button BotaoItemSideBar logout-button"
        >
          Logout
        </button>

        {/* Campo de Filtro para Marcas */}
        <div className="FiltrosContainer">
          <div className="FiltroMarca">
            <input
              type="text"
              id="marca"
              value={marcaSelecionada}
              onChange={handleMarcaInputChange}
              placeholder="Digite a marca do carro"
              className="form-control"
            />
            {/* Lista de sugestões */}
            {filteredMarcas.length > 0 && (
              <ul className="list-group">
                {filteredMarcas.map((marca, index) => (
                  <li
                    key={index}
                    className="list-group-item"
                    onClick={() => handleMarcaSelect(marca)}
                  >
                    {marca}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filtro por Modelos (se uma marca for selecionada) */}
          {marcaSelecionada && (
            <div className="FiltroModelo">
              <select
                id="modelo"
                value={modeloSelecionado}
                onChange={(e) => {
                  setModeloSelecionadoState(e.target.value);
                  setModeloSelecionado(e.target.value); // Atualiza o modelo selecionado no componente pai
                }}
                className="form-select"
              >
                <option value="">Todos os Modelos</option>
                {modelos.map((modelo, index) => (
                  <option key={index} value={modelo}>
                    {modelo}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
