import React from "react";

type UserProfile = {
  name: string;
  email: string;
  password: string;
};

const UserProfileView: React.FC = () => {
  // Simulação de dados do usuário
  const userData: UserProfile = {
    name: "João Silva",
    email: "joao.silva@example.com",
    password: "senha123", // Apenas para exibição, nunca exponha senhas reais!
  };

  return (
    <div style={styles.container}>
      <h1>Perfil do Utilizador</h1>
      <div style={styles.profileCard}>
        <p><strong>Nome:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Password:</strong> {userData.password}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "0 auto",
  },
  profileCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
  },
};

export default UserProfileView;
