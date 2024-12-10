import React, { useState, useEffect } from "react";
import "../Stylesheets/Perfil.css";

interface UserProfile {
  telefone: string;
  nome: string;
  genero?: string;
  email: string;
  password?: string;
  endereco: string;
  fotoperfil?: string;
}

const Perfil: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [originalUser, setOriginalUser] = useState<UserProfile | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const registoID = parseInt(localStorage.getItem("RegistoID") || "0");

  useEffect(() => {
    // Função para buscar os dados do usuário no backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost/backend/getPerfil.php?RegistoID=${registoID}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do usuário.");
        }
        const data = await response.json(); 
        const fetchedUser: UserProfile = {
          telefone: data.Telefone || "",
          nome: data.Nome || "",
          genero: data.Genero || "",
          email: data.Email || "",
          password: data.Password || "",
          endereco: data.Morada || "",
          fotoperfil: data.Imagem || "placeholder.png", // Certifique-se de que o caminho da imagem está correto
        };
        setUser(fetchedUser);
        setOriginalUser(fetchedUser);
      } catch (err: any) {
        setError(err.message);
      }
    };
  
    fetchUserData();
  }, [registoID]);

  const handleImageUpload = async (file: File) => {
    if (!file || !registoID) return;

    const formData = new FormData();
    formData.append("imagem", file);
    formData.append("RegistoID", registoID.toString());

    try {
      const response = await fetch("http://localhost/backend/updateImagem.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao fazer upload da imagem.");

      const result = await response.json();
      console.log("Imagem salva com sucesso:", result);

      if (user) {
        setUser({ ...user, fotoperfil: result.path }); // Atualiza o caminho da imagem
      }
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreview(null);
  }, [selectedFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (!user || !originalUser) return;

    // Detectar alterações
    const changes: Partial<UserProfile> = {};
    Object.keys(user).forEach((key) => {
      const field = key as keyof UserProfile;
      if (user[field] !== originalUser[field]) {
        changes[field] = user[field];
      }
    });

    if (Object.keys(changes).length === 0) {
      console.log("Nenhuma alteração foi feita.");
      setIsEditing(false);
      return;
    }

    console.log("Alterações detectadas:", changes);

    try {
      const response = await fetch("http://localhost/backend/AtualizarPerfil.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ RegistoID: registoID, ...changes }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar as alterações.");
      }

      const result = await response.json();
      console.log("Alterações salvas com sucesso:", result);

      setOriginalUser(user);
      setIsEditing(false);
    } catch (err: any) {
      console.error("Erro ao salvar alterações:", err.message);
    }
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Perfil do Utilizador</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : user ? (
        <div className="perfil-card">
          <div className="perfil-image-container">
            <img
              src={preview || user.fotoperfil || "placeholder.png"}
              alt="Imagem do utilizador"
              className="perfil-image"
            />
            <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    if (file) {
      handleImageUpload(file);
    }
  }}
  className="perfil-input"
/>
          </div>

          <form className="perfil-form" onSubmit={(e) => e.preventDefault()}>
            <div className="perfil-row">
              <label>Contacto</label>
              <input
                type="text"
                name="telefone"
                value={user.telefone}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="perfil-row">
              <label>Nome de Utilizador</label>
              <input
                type="text"
                name="nome"
                value={user.nome}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="perfil-row">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="perfil-row">
              <label>Género</label>
              <select
                name="genero"
                value={user.genero}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
            <div className="perfil-row password-row">
              <label>Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>
            <div className="perfil-row">
              <label>Morada</label>
              <input
                type="text"
                name="endereco"
                value={user.endereco}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="perfil-row edit-button-container">
              <button
                type="button"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="perfil-edit-button"
              >
                {isEditing ? "Salvar" : "Editar"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Perfil;
