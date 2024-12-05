import React, { useState, useEffect } from "react";
import "./Perfil.css";

interface UserProfile {
  email: string;
  contact: string;
}

const Perfil: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Simula a obtenção de dados do utilizador (API ou LocalStorage)
    const mockUser: UserProfile = {
      email: "usuario@example.com",
      contact: "+351 912 345 678",
    };
    setUser(mockUser);
  }, []);

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Perfil do Utilizador</h1>
      {user ? (
        <div className="perfil-card">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Contacto:</strong> {user.contact}
          </p>
        </div>
      ) : (
        <p className="perfil-loading">A carregar dados...</p>
      )}
    </div>
  );
};

export default Perfil;
