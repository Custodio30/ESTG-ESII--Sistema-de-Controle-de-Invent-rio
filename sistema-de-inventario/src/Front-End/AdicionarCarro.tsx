import React, { useState } from "react";
import "../Stylesheets/AdicionarCarro.css";

const AdicionarCarro: React.FC = ({}) => {
  const [carData, setCarData] = useState({
    image: "", // URL da imagem
    title: "",
    description: "",
    items: ["", "", "", "", ""],
  });

  const [isImageValid, setIsImageValid] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      setCarData((prevData) => {
        const updatedItems = [...prevData.items];

        if (index === 0 || index === 4) {
          const validValue = value.match(/^\d*\.?\d{0,3}$/)
            ? value
            : prevData.items[index];
          updatedItems[index] = validValue;
        } else {
          updatedItems[index] = value;
        }

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

  const handleSave = () => {
    fetch("http://localhost/backend/GuardarCarro.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dados salvos:", data);
      })
      .catch((error) => console.error("Erro ao salvar:", error));
  };

  return (
    <div className="modal show d-block CarroGuardarModal">
      <div className="modal-dialog modal-dialog-centered modal-lg CarroGuardarModalDialog">
        <div className="modal-content CarroGuardarModelContent">
          <div className="modal-header">
            <h5 className="modal-title">Editar Card</h5>
            <button
              type="button"
              className="btn-close BtnCloseCarroGuardar"
              aria-label="Fechar"
            ></button>
          </div>
          <div className="modal-body CarroGuardarModalBody">
            <div className="card AdicionarCarroCard">
              <div className="form-container AdicionarCarroFormContainer">
                <input
                  type="text"
                  className="form-control mb-2"
                  name="title"
                  value={carData.title}
                  onChange={handleInputChange}
                  placeholder="Modelo do Carro"
                  />
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
                  <li className="list-group-item">
                    <input
                      type="text"
                      className="form-control"
                      value={carData.items[3]}
                      onChange={(e) => handleInputChange(e, 3)}
                      placeholder="Marca"
                      />
                  </li>
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
            <button type="button" className="btn btn-secondary">
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdicionarCarro;
