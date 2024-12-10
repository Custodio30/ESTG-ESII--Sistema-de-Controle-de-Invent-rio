import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/LoginPage.css';

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
            localStorage.setItem('RegistoID', result.RegistoID); 
            localStorage.setItem('Admin', result.Admin);
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
    <body className="BodyLoginPage">
    <div>
    <div className="icon-border-animation">
        <div className="fas fa-car" style={{ animationDelay: '0s' }}></div>
        <div className="fas fa-car" style={{ animationDelay: '0.5s' }}></div>
        <div className="fas fa-car" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="card-container LoginPageContainer">
        <div className="card LoginPageCard">
          <h2>{isLoginMode ? 'Login' : 'Registro'}</h2>
          
          <form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div className="form-group LoginFormGroup">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required={!isLoginMode} />
              </div>
            )}

            <div className="form-group LoginFormGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group LoginFormGroup">
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" name="password" required />
            </div>

            {!isLoginMode && (
              <div className="form-group LoginFormGroup">
                <label htmlFor="confirmPassword">Confirmar Senha:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required={!isLoginMode} />
              </div>
            )}

            <button type="submit" className="submit-btn LoginSubmitBotao">
              {isLoginMode ? 'Entrar' : 'Registrar'}
            </button>
          </form>

          <button onClick={toggleMode} className="toggle-btn LoginToggleBotao">
            {isLoginMode ? 'Criar Conta' : 'Já tem uma conta? Faça Login'}
          </button>
        </div>
        <div className="LoginPageSideImagem"/>
      </div>     
    </div>
  </body>
  );
};

export default LoginPage;

