<<<<<<< Updated upstream
import React from "react";
import "../Stylesheets/Perfil.css";
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Necessário para navegação
import LoginPage from "./LoginPage";
>>>>>>> Stashed changes

const Perfil: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate(); // Hook para redirecionar o usuário

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className={`${theme} bg-gray-100 dark:bg-gray-900 min-h-screen`}>
      <header className="p-4 shadow-lg bg-white dark:bg-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          User Profile
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-300 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200"
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>
      <main className="p-6">
        {!isAuthenticated ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You are not logged in.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Go to Login Page
            </button>
          </div>
        ) : (
          <LoginPage />
        )}
      </main>
    </div>
  );
};

export default Perfil;
