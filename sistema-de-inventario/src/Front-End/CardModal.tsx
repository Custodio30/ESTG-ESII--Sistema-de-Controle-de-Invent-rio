import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Stylesheets/CarModal.css"; 


interface CardData {
  CarrosID: number;
  modelo: string;
  descricao: string;
  km: number;
  tipo: string;
  ano: number;
  marca: string;
  preco: number;
  imagem: string; 
}

const CardModal: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get<CardData[]>("http://localhost/backend/ListarOsCarros.php");
        setCards(response.data);
      } catch (err) {
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card-container">
      {cards.map((card) => (
        <div key={card.CarrosID} className="card">
          {card.imagem && <img src={card.imagem} alt={card.modelo} className="card-image" />}
          <h3>{card.modelo}</h3>
          <p>{card.descricao}</p>
          <p>{card.km}</p>
          <p>{card.tipo}</p>
          <p>{card.ano}</p>
          <p>{card.marca}</p>
          <p>{card.preco}€</p>
        </div>
      ))}
    </div>
  );
};

export default CardModal;
