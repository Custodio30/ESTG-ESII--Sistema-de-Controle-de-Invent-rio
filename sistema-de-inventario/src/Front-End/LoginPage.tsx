import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Front-End/LoginPage.css';

const LoginPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate(); 

  // Função para alternar o modo do formulário
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const nome = (document.getElementById('nome') as HTMLInputElement)?.value || '';
    const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
    const password = (document.getElementById('password') as HTMLInputElement)?.value || '';

    try {
        const response = await fetch('http://localhost/backend/Register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome,
                email,
                password,
                isLoginMode,
            }),
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
            alert(result.message);
            localStorage.setItem('nomeUsuario', result.nome); 
            navigate('/landing'); 
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
};


  return (
    <div>
      <div className="card-container">
        <div className="card">
          <h2>{isLoginMode ? 'Login' : 'Registro'}</h2>
          
          <form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required={!isLoginMode} />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" name="password" required />
            </div>

            {!isLoginMode && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Senha:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required={!isLoginMode} />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLoginMode ? 'Entrar' : 'Registrar'}
            </button>
          </form>

          <button onClick={toggleMode} className="toggle-btn">
            {isLoginMode ? 'Criar Conta' : 'Já tem uma conta? Faça Login'}
          </button>
        </div>
      </div>     
      <div className="box">
      <div className="box-lid box-lid-front"></div>
      <div className="box-lid box-lid-back"></div>
      <div className="box-lid box-lid-left"></div>
      <div className="box-side box-side-front"></div>
      <div className="box-side box-side-back"></div>
      <div className="box-side box-side-left"></div>
      <div className="box-side box-side-right"></div>
      <div className="box-bottom"></div>
    </div>

    </div>
  );
};

export default LoginPage;

