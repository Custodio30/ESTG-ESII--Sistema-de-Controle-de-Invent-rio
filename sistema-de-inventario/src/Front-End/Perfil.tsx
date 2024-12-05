import React, { useState, useEffect } from "react";
import "../Stylesheets/Perfil.css";

interface UserProfile {
  email: string;
  contact: string;
  profilePicture?: string; // URL da imagem de perfil
}

const Perfil: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    // Simula a obtenção de dados do utilizador (API ou LocalStorage)
    const mockUser: UserProfile = {
      email: "usuario@example.com",
      contact: "+351 912 345 678",
    };
    setUser(mockUser);
  }, []);

  useEffect(() => {
    // Gera um preview da imagem quando o ficheiro é selecionado
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Cleanup do URL
    }
    setPreview(null);
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile && user) {
      const formData = new FormData();
      formData.append("RegistoID", "1"); // Substitua pelo ID real do utilizador logado
      formData.append("Imagem", selectedFile);

      try {
        const response = await fetch("http://localhost/backend/ImagemUpdate.php", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);

          // Atualiza a URL da imagem no estado do utilizador
          setUser({
            ...user,
            profilePicture: `http://localhost/${data.profile_image}`,
          });
        } else {
          alert("Erro ao fazer upload da imagem.");
        }
      } catch (error) {
        console.error("Erro ao enviar a imagem:", error);
        alert("Falha ao se conectar ao servidor.");
      }
    }
  };

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
          <div className="perfil-image-container">
            <img
              src={user.profilePicture || preview || "placeholder.png"}
              alt="Foto de Perfil"
              className="perfil-image"
            />
          </div>
          <div className="perfil-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="perfil-input"
            />
            {preview && (
              <button onClick={handleSubmit} className="perfil-submit-btn">
                Submeter Foto
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="perfil-loading">A carregar dados...</p>
      )}
    </div>
  );
};

export default Perfil;
