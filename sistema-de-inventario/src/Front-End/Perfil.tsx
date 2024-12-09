import React, { useState, useEffect } from "react";
import "../Stylesheets/Perfil.css";

interface UserProfile {
  email: string;
  contact: string;
  gender?: string; // Novo campo de gênero
  profilePicture?: string; // URL da imagem de perfil
}

const Perfil: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newFieldValue, setNewFieldValue] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Novo estado para mensagens de erro
  const registoID = localStorage.getItem("RegistoID");

  useEffect(() => {
    const mockUser: UserProfile = {
      email: "exemplo@gmail.com",
      contact: "123456789",
      gender: "Não especificado", // Valor inicial para o gênero
      profilePicture: "placeholder.png", // URL da imagem inicial
    };
    setUser(mockUser);
  }, []);

  useEffect(() => {
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

  const validateField = (field: string, value: string): boolean => {
    if (field === "email") {
      if (!value.includes("@gmail.com")) {
        setErrorMessage("O email deve conter '@gmail.com'.");
        return false;
      }
    } else if (field === "contact") {
      if (!/^\d{9}$/.test(value)) {
        setErrorMessage("O contacto deve conter exatamente 9 números e sem letras.");
        return false;
      }
    }
    setErrorMessage(null);
    return true;
  };

  const handleSave = () => {
    if (user && editingField) {
      const isValid = validateField(editingField, newFieldValue);
      if (isValid) {
        setUser({ ...user, [editingField]: newFieldValue });
        setEditingField(null);
        setSuccessMessage("Alteração realizada com sucesso!");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    }
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
    setNewFieldValue(user ? (user[field as keyof UserProfile] as string) : "");
  };

  const handleCancel = () => {
    setEditingField(null);
    setErrorMessage(null);
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Perfil do Utilizador</h1>
      {user && (
        <div>
          {successMessage && <p className="perfil-success-message">{successMessage}</p>}
          {errorMessage && <p className="perfil-error-message">{errorMessage}</p>}

          <div>
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
              onClick={() =>
                editingField === "email" ? handleSave() : handleEdit("email")
              }
            >
              {editingField === "email" ? "Salvar" : "Editar"}
            </button>
          </div>

          <div>
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
              onClick={() =>
                editingField === "contact" ? handleSave() : handleEdit("contact")
              }
            >
              {editingField === "contact" ? "Salvar" : "Editar"}
            </button>
          </div>

          <div>
            <strong>Género:</strong>{" "}
            {editingField === "gender" ? (
              <select
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                className="perfil-edit-select"
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            ) : (
              user.gender
            )}
            <button
              onClick={() =>
                editingField === "gender" ? handleSave() : handleEdit("gender")
              }
            >
              {editingField === "gender" ? "Salvar" : "Editar"}
            </button>
          </div>

          <div>
            <img
              src={preview || user.profilePicture || "placeholder.png"}
              alt="Foto de Perfil"
              className="perfil-image"
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
