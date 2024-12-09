import React, { useState, useEffect } from "react";
import "../Stylesheets/Perfil.css";

interface UserProfile {
  phone: string;
  username: string;
  gender?: string;
  email: string;
  password?: string;
  address: string;
  profilePicture?: string;
}

const Perfil: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // Estado para exibir ou ocultar a senha

  useEffect(() => {
    // Mock User Data
    const mockUser: UserProfile = {
      phone: "Introduza o seu contacto",
      username: "Introduza o seu nome de utilizador",
      género: "Masculino",
      email: "exemplo@gmail.com",
      password: "***********",
      address: "Introduza a sua morada",
      profilePicture: "placeholder.png",
    };
    setUser(mockUser);
  }, []);

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

  const handleSave = () => {
    console.log("Dados salvos:", user);
    setIsEditing(false);
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Profile</h1>
      {user ? (
        <div className="perfil-card">
          <div className="perfil-image-container">
            <img
              src={preview || user.profilePicture || "placeholder.png"}
              alt="Profile"
              className="perfil-image"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedFile(e.target.files ? e.target.files[0] : null)
              }
              className="perfil-input"
            />
          </div>

          <form className="perfil-form" onSubmit={(e) => e.preventDefault()}>
            <div className="perfil-row">
              <label>Contacto</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="perfil-row">
              <label>Nome de Utilizador</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="perfil-row">
              <label>Género</label>
              <select
                name="Género"
                value={user.género}
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
                name="address"
                value={user.address}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            <div className="perfil-row edit-button-container">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
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
