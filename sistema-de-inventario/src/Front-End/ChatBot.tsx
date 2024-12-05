// Front-End/ChatBot.tsx
import React, { useState } from "react";
import "../Front-End/ChatBot.css";
import { invokeCohere } from "../CohereApi";

const ChatBot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "ai" }[]>([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    setMessages((prev) => [...prev, { text: userInput, sender: "user" }]);
    try {
      const aiResponse = await invokeCohere(userInput);
      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
    } catch {
      setMessages((prev) => [...prev, { text: "Error fetching AI response.", sender: "ai" }]);
    }
    setUserInput("");
  };

  return (
    <div className="ChatBot">
      {/* Chat Icon */}
      {!isChatOpen && (
        <div className="ChatBot-Icon" onClick={() => setIsChatOpen(true)}>
          <i className="bi bi-chat-left-text"></i>
        </div>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="ChatBot-Window">
          <div className="ChatBot-Header">
            <div className="ChatBot-Header-Left">
              <img src="https://via.placeholder.com/40" alt="ChatBOT" className="ChatBot-Avatar" />
              <h4>Assistente Virtual</h4>
            </div>
            <button onClick={() => setIsChatOpen(false)}>&times;</button>
          </div>

          <div className="ChatBot-Body">
            {/* Help Options */}
            {!messages.length && (
              <div className="ChatBot-Help">
                <h2>Olá 👋, como podemos ajudar?</h2>
                <ul>
                  <li><a href="#free-spins"> Como posso verificar o sistema de inventário?</a></li>
                  <li><a href="#user-id"> Como encontro o ID do carro?</a></li>
                  <li><a href="#deposit-methods"> Como adiciono carros ao sistema?</a></li>
                  <li><a href="#gift-cards"> Como faço o meu sistema de inventário?</a></li>
                </ul>
              </div>
            )}

            {/* Message History */}
            {messages.length > 0 && (
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
            )}
          </div>

          <div className="ChatBot-Input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Escreve uma mensagem"
            />
            <button onClick={handleSendMessage}>
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
