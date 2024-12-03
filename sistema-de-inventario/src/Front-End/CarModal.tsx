import React, { useState } from "react";

interface CarModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CarModal: React.FC<CarModalProps> = ({ isVisible, onClose }) => {
  const [carData, setCarData] = useState({
    title: "Card title",
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    items: ["An item", "A second item", "A third item"],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      // Atualiza os itens da lista
      setCarData((prevData) => {
        const updatedItems = [...prevData.items];
        updatedItems[index] = value;
        return { ...prevData, items: updatedItems };
      });
    } else {
      // Atualiza título ou descrição
      setCarData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Card</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  name="title"
                  value={carData.title}
                  onChange={handleInputChange}
                  placeholder="Card title"
                />
                <textarea
                  className="form-control"
                  name="description"
                  rows={3}
                  value={carData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
              </div>
              <ul className="list-group list-group-flush">
                {carData.items.map((item, index) => (
                  <li className="list-group-item" key={index}>
                    <input
                      type="text"
                      className="form-control"
                      value={item}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder={`Item ${index + 1}`}
                    />
                  </li>
                ))}
              </ul>
              <div className="card-body">
                <a href="#" className="card-link">
                  Card link
                </a>
                <a href="#" className="card-link">
                  Another link
                </a>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
