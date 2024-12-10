import React, { useState, useEffect } from "react";
import "../Stylesheets/AdicionarCarro.css";

const AdicionarCarro: React.FC = ({}) => {
  const [carData, setCarData] = useState({
    image: "", // URL da imagem
    description: "",
    items: ["", "", "", "", ""],
  });

  const RegistoID = localStorage.getItem("RegistoID");
  const parsedRegistoID = RegistoID ? JSON.parse(RegistoID) : {};
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [marcas, setMarcas] = useState<string[]>([]);
  const [filteredMarcas, setFilteredMarcas] = useState<string[]>([]);
  const [modelos, setModelos] = useState<string[]>([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState("");

  const dataToSend = {
    marca: marcaSelecionada,  // Enviando a marca corretamente
    description: carData.description,
    items: carData.items,
    image: carData.image,
    RegistoID: parsedRegistoID,
  };

  useEffect(() => {
    // Fetch marcas ao carregar o componente
    fetch("http://localhost:4000/get-makes") // URL da CarQuery para marcas
      .then((response) => response.json())
      .then((data) => {
        const makes = data.Makes.map((make: any) => make.make_display);
        setMarcas(makes);
      })
      .catch((error) => console.error("Erro ao buscar marcas:", error));
  }, []);

  const [isImageValid, setIsImageValid] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      setCarData((prevData) => {
        const updatedItems = [...prevData.items];
        updatedItems[index] = value;
        return { ...prevData, items: updatedItems };
      });
    } else {
      setCarData((prevData) => ({ ...prevData, [name]: value }));
      if (name === "image") validateImage(value);
    }
  };

  const validateImage = (url: string) => {
    const img = new Image();
    img.onload = () => setIsImageValid(true);
    img.onerror = () => setIsImageValid(false);
    img.src = url;
  };

  const handleMarcaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMarcaSelecionada(value);

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
    setMarcaSelecionada(marca);
    setFilteredMarcas([]);

    fetch(`http://localhost:4000/get-models?make=${marca}`)
      .then((response) => response.json())
      .then((data) => {
        const models = data.Models.map((model: any) => model.model_name);
        setModelos(models);
      })
      .catch((error) => console.error("Erro ao buscar modelos:", error));
  };

  const handleSave = () => {
    console.log("Dados a serem enviados:", dataToSend);
    fetch("http://localhost/backend/GuardarCarro.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dados salvos:", data);
        setNotificationVisible(true);

        // Ocultar a notificação após 3 segundos
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000);
      })
      .catch((error) => console.error("Erro ao salvar:", error));
  };

  return (
    <div className="modal show CarroGuardarModal">
      <div className="modal-dialog modal-lg CarroGuardarModalDialog">
        <div className="modal-content CarroGuardarModelContent">
          <div className="modal-body CarroGuardarModalBody">
            <div className="card AdicionarCarroCard">
              <div className="form-container AdicionarCarroFormContainer">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={marcaSelecionada}
                  onChange={handleMarcaInputChange}
                  placeholder="Marca do carro"
                />
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
                <textarea
                  className="form-control"
                  name="description"
                  rows={1}
                  value={carData.description}
                  onChange={handleInputChange}
                  placeholder="Descrição"
                />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <input
                      type="text"
                      className="form-control"
                      value={carData.items[0]}
                      onChange={(e) => handleInputChange(e, 0)}
                      placeholder="Km's"
                    />
                  </li>
                  <li className="list-group-item">
                    <select
                      className="form-select"
                      value={carData.items[1]}
                      onChange={(e) => handleInputChange(e, 1)}
                    >
                      <option value="Gasolina">Gasolina</option>
                      <option value="Gasoleo">Gasóleo</option>
                      <option value="Hibrido Gasolina">Híbrido Gasolina</option>
                      <option value="Eletrico">Elétrico</option>
                      <option value="Gpl">Gpl</option>
                    </select>
                  </li>
                  <li className="list-group-item">
                    <input
                      type="text"
                      className="form-control"
                      value={carData.items[2]}
                      onChange={(e) => handleInputChange(e, 2)}
                      placeholder="Ano"
                    />
                  </li>
                  <select
                    className="form-select mt-3"
                    value={carData.items[3]} // Campo de modelo
                    onChange={(e) => handleInputChange(e, 3)}
                  >
                    <option value="">Selecione um modelo</option>
                    {modelos.map((modelo, index) => (
                      <option key={index} value={modelo}>
                        {modelo}
                      </option>
                    ))}
                  </select>

                  <li className="list-group-item">
                    <input
                      type="text"
                      className="form-control"
                      value={carData.items[4]}
                      onChange={(e) => handleInputChange(e, 4)}
                      placeholder="Preço"
                    />
                  </li>
                </ul>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={carData.image}
                  onChange={handleInputChange}
                  placeholder="Insira a URL da imagem"
                />
              </div>

              <div
                className="card-img-top-container mb-3 CarroGuardarImagemTopContainer"
                style={{
                  backgroundColor: isImageValid ? "transparent" : "#e1e1e1",
                }}
              >
                {isImageValid ? (
                  <img
                    src={carData.image}
                    alt="Card preview"
                    className="card-img-top"
                  />
                ) : (
                  <span>Imagem não disponível</span>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer CarroGuardarModelFooter">
            <button type="button" className="btn btn-secondary CancelarBotao">
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary GuardarBotao"
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
      {isNotificationVisible && (
        <div className="notification">
          <p>Carro adicionado com sucesso!</p>
        </div>
      )}
    </div>
  );
};

export default AdicionarCarro;
