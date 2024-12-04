import React, { useState } from "react";
import "../Front-End/ChatBot.css"; // Adicione estilos específicos para o chatbot
import { invokeCohere } from "../CohereApi"; // Função para chamar o modelo Cohere

const ChatBot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // Controla se o chatbot está aberto
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "ai" }[]>([]);
  const [userInput, setUserInput] = useState("");

  // Lidar com envio de mensagens
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Adiciona a mensagem do usuário
    setMessages((prev) => [...prev, { text: userInput, sender: "user" }]);

    try {
      const aiResponse = await invokeCohere(userInput); // Chama o modelo com o texto do usuário
      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Erro ao obter resposta do AI.", sender: "ai" }]);
    }

    setUserInput(""); // Limpa o input do usuário
  };

  return (
    <div className="ChatBot">
      {/* Ícone de mensagem */}
      {!isChatOpen && (
        <div className="ChatBot-Icon" onClick={() => setIsChatOpen(true)}>
          <i className="bi bi-chat-left"></i>
        </div>
      )}

      {/* Janela de conversa */}
      {isChatOpen && (
        <div className="ChatBot-Window">
          <div className="ChatBot-Header">
            <h4>Chatbot</h4>
            <button onClick={() => setIsChatOpen(false)}>&times;</button>
          </div>

          <div className="ChatBot-Messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`ChatBot-Message ${
                  msg.sender === "user" ? "UserMessage" : "AIMessage"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="ChatBot-Input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Digite sua mensagem..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
