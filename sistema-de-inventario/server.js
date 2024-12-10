// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Note que não precisa mais do require

const app = express();
const PORT = 4000; // Porta do servidor backend

// Ativar CORS para todas as origens
app.use(cors());

// Endpoint para buscar marcas de carros
app.get("/get-makes", async (req, res) => {
  try {
    const response = await fetch("https://www.carqueryapi.com/api/0.3/?cmd=getMakes");
    const data = await response.json();
    res.json(data); // Enviar os dados para o frontend
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados das marcas." });
  }
});

// Endpoint para buscar modelos de uma marca específica
app.get("/get-models", async (req, res) => {
  const { make } = req.query; // A marca virá como parâmetro de consulta (ex: ?make=Toyota)
  try {
    const response = await fetch(
      `https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${make}`
    );
    const data = await response.json();
    res.json(data); // Enviar os dados para o frontend
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados dos modelos." });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
