import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Stylesheets/ListarCarros.css";

interface CardData {
  CarrosID: number;
  Marca: string;
  descricao: string;
  km: number;
  tipo: string;
  ano: number;
  Modelo: string;
  preco: number;
  imagem: string;
  RegistoID: number;
}

interface ListarCarrosProps {
  marcaSelecionada: string; // Marca selecionada
  modeloSelecionado: string; // Modelo selecionado
}

const ListarCarros: React.FC<ListarCarrosProps> = ({ marcaSelecionada, modeloSelecionado }) => {
  const [cards, setCards] = useState<CardData[]>([]); // Todos os carros
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [editedCards, setEditedCards] = useState<Record<number, CardData>>({});
  const isAdmin = localStorage.getItem("Admin") === "1";

  // Recuperando o RegistoID do utilizador do localStorage
  const RegistoIDUtilizador = parseInt(localStorage.getItem("RegistoID") || "0");
  console.log(RegistoIDUtilizador)
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get<CardData[]>("http://localhost/backend/ListarOsCarros.php");
        setCards(response.data); // Armazena todos os carros
      } catch (err) {
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []); // Carrega os carros apenas uma vez ao inicializar

  // Filtra os carros com base na marca e no modelo selecionado
  const filteredCards = cards.filter((card) => {
    const matchesMarca = marcaSelecionada ? card.Marca.toLowerCase() === marcaSelecionada.toLowerCase() : true;
    const matchesModelo = modeloSelecionado ? card.Modelo.toLowerCase() === modeloSelecionado.toLowerCase() : true;
    return matchesMarca && matchesModelo;
  });

  // Funções para edição e exclusão de carros (não alteradas)
  const handleEditChange = (id: number, field: keyof CardData, value: string | number) => {
    setEditedCards((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = (id: number) => {
    const updatedCard = editedCards[id];

    if (updatedCard) {
      const updatedCardForSave = { ...updatedCard };

      // Garantir que km, preco e ano sejam números válidos
      updatedCardForSave.km = parseInt(updatedCardForSave.km.toString()) || 0;
      updatedCardForSave.preco = parseFloat(updatedCardForSave.preco.toString()) || 0;
      updatedCardForSave.ano = parseInt(updatedCardForSave.ano.toString()) || 0;

      console.log("Salvar alterações para o carro ID:", id, updatedCardForSave);

      axios
        .post("http://localhost/backend/AtualizarCarro.php", updatedCardForSave)
        .then(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.CarrosID === id ? { ...card, ...updatedCardForSave } : card
            )
          );
          setEditedCards((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
          });
        })
        .catch(() => alert("Erro ao salvar as alterações."));
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza de que deseja apagar este carro?")) {
      axios
        .post("http://localhost/backend/ApagarCarro.php", { CarrosID: id })
        .then(() => {
          setCards((prev) => prev.filter((card) => card.CarrosID !== id));
        })
        .catch(() => alert("Erro ao apagar o carro."));
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card-container ListarCarrosContainer">
      {filteredCards.length > 0 ? (
        filteredCards.map((card) => {
          const isEditing = !!editedCards[card.CarrosID];
          const canEdit = card.RegistoID == RegistoIDUtilizador || isAdmin;

          return (
            <div
            key={card.CarrosID}
            className={`card ListarCarrosCard ${hoveredCard === card.CarrosID ? "hovered" : ""} ${
              canEdit ? "editable" : ""
            }`} // Se for admin ou o usuário é dono do carro, pode editar
            onMouseEnter={() => setHoveredCard(card.CarrosID)}
            onMouseLeave={() => setHoveredCard(null)}
          >
              <div className="card-inner CardInterior">
                <div className="card-front CardFrente">
                  {card.imagem && (
                    <img src={card.imagem} alt={card.Marca} className="card-image ListarCarrosImagem" />
                  )}
                  <h3>{card.Marca}</h3>
                  <p>{card.descricao}</p>
                  <p>{card.km} km</p>
                  <p>Tipo: {card.tipo}</p>
                  <p>Ano: {card.ano}</p>
                  <p>Modelo: {card.Modelo}</p>
                  <p>Preço: {card.preco}€</p>
                </div>

                <div className="card-back CartaTras">
                  {canEdit ? (
                    isEditing ? (
                      <>
                        <label>
                          Marca:
                          <input
                            type="text"
                            value={editedCards[card.CarrosID]?.Marca || card.Marca}
                            onChange={(e) =>
                              handleEditChange(card.CarrosID, "Marca", e.target.value)
                            }
                          />
                        </label>
                        <label>
                          Descrição:
                          <textarea
                            value={editedCards[card.CarrosID]?.descricao || card.descricao}
                            onChange={(e) =>
                              handleEditChange(card.CarrosID, "descricao", e.target.value)
                            }
                          />
                        </label>
                        <label>
                          Quilometragem:
                          <input
                            type="number"
                            value={editedCards[card.CarrosID]?.km || card.km}
                            onChange={(e) =>
                              handleEditChange(card.CarrosID, "km", e.target.value)
                            }
                          />
                        </label>
                        <label>
                          Tipo:
                          <input
                            type="text"
                            value={editedCards[card.CarrosID]?.tipo || card.tipo}
                            onChange={(e) =>
                              handleEditChange(card.CarrosID, "tipo", e.target.value)
                            }
                          />
                        </label>
                        <label>
                          Ano:
                          <input
                            type="number"
                            value={editedCards[card.CarrosID]?.ano || card.ano}
                            onChange={(e) => {
                              const value = e.target.value;
                              handleEditChange(card.CarrosID, "ano", parseInt(value) || 0);
                            }}
                          />
                        </label>
                        <label>
                          Modelo:
                          <input
                            type="text"
                            value={editedCards[card.CarrosID]?.Modelo || card.Modelo}
                            onChange={(e) =>
                              handleEditChange(card.CarrosID, "Modelo", e.target.value)
                            }
                          />
                        </label>
                        <label>
                          Preço:
                          <input
                            type="number"
                            value={editedCards[card.CarrosID]?.preco || card.preco}
                            onChange={(e) =>
                              handleEditChange(card.CarrosID, "preco", parseFloat(e.target.value))
                            }
                          />
                        </label>
                        <label>
                          Imagem:
                          <input
                            type="text"
                            value={editedCards[card.CarrosID]?.imagem || card.imagem}
                            onChange={(e) =>
                              handleEditChange(card.CarrosID, "imagem", e.target.value)
                            }
                          />
                        </label>
                        <button className="save-button" onClick={() => handleSave(card.CarrosID)}>
                          Salvar
                        </button>
                        <button
                          className="cancel-button"
                          onClick={() =>
                            setEditedCards((prev) => {
                              const { [card.CarrosID]: _, ...rest } = prev;
                              return rest;
                            })
                          }
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="edit-button"
                          onClick={() =>
                            setEditedCards((prev) => ({
                              ...prev,
                              [card.CarrosID]: { ...card },
                            }))
                          }
                        >
                          Editar
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(card.CarrosID)}
                        >
                          Apagar
                        </button>
                      </>
                    )
                  ) : (
                    <a className="no-permission">Sem permissão</a>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>Não há carros correspondentes.</div>
      )}
    </div>
  );
};

export default ListarCarros;
