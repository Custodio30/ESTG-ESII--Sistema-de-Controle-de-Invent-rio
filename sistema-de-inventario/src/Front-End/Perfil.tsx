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
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newFieldValue, setNewFieldValue] = useState<string>("");

  const registoID = localStorage.getItem("RegistoID");

  useEffect(() => {
    const mockUser: UserProfile = {
      email: "usuario@example.com",
      contact: "+351 912 345 678",
      profilePicture: "placeholder.png", // URL da imagem inicial
    };
    setUser(mockUser);
  }, []);

  useEffect(() => {
    // Atualiza o preview da imagem quando o arquivo é selecionado
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
      if (!registoID) {
        alert("Erro: O ID do registro não foi encontrado.");
        return;
      }
      formData.append("RegistoID", registoID);
      formData.append("Imagem", selectedFile);
      try {
        const response = await fetch("http://localhost/backend/ImagemUpdate.php", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
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

  const handleEdit = (field: string) => {
    setEditingField(field);
    setNewFieldValue(user ? user[field as keyof UserProfile] as string : "");
  };

  const handleSave = () => {
    if (user && editingField) {
      setUser({ ...user, [editingField]: newFieldValue });
      setEditingField(null);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Perfil do Utilizador</h1>
      {user ? (
        <div className="perfil-card">
          <p>
            <strong>Email:</strong>{" "}
            {editingField === "email" ? (
              <input
                type="text"
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                className="perfil-edit-input"
              />
            ) : (
              user.email
            )}
            <button
              className="perfil-edit-btn"
              onClick={() =>
                editingField === "email" ? handleSave() : handleEdit("email")
              }
            >
              {editingField === "email" ? "Salvar" : "Mudar"}
            </button>
            {editingField === "email" && (
              <button className="perfil-cancel-btn" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </p>
          <p>
            <strong>Contacto:</strong>{" "}
            {editingField === "contact" ? (
              <input
                type="text"
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                className="perfil-edit-input"
              />
            ) : (
              user.contact
            )}
            <button
              className="perfil-edit-btn"
              onClick={() =>
                editingField === "contact" ? handleSave() : handleEdit("contact")
              }
            >
              {editingField === "contact" ? "Salvar" : "Mudar"}
            </button>
            {editingField === "contact" && (
              <button className="perfil-cancel-btn" onClick={handleCancel}>
                Cancelar
              </button>
            )}
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
