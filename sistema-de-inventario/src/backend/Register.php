<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Tratando requisições OPTIONS (Preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // Sem conteúdo
    exit();
}

// Configuração do banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistemadeinventario";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Falha ao conectar ao banco de dados."]);
    exit();
}

// Decodifica o corpo da requisição
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] === "POST" && $data) {
    $nome = $data["nome"] ?? null;
    $email = $data["email"];
    $password = $data["password"];
    $isLoginMode = $data["isLoginMode"];

    if ($isLoginMode) {
        // Modo de Login
        $sql = "SELECT nome, password FROM registo WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($retrievedName, $hashedPassword);
        $stmt->fetch();

        if ($hashedPassword && password_verify($password, $hashedPassword)) {
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Login bem-sucedido!",
                "nome" => $retrievedName // Retorna o nome do usuário
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                "status" => "error",
                "message" => "Credenciais inválidas."
            ]);
        }
        $stmt->close();
    } else {
        // Modo de Registro
        $sql = "INSERT INTO registo (nome, email, password) VALUES (?, ?, ?)";
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $nome, $email, $hashedPassword);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "Utilizador registrado com sucesso!"
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                "status" => "error",
                "message" => "Erro ao registrar usuário: " . $stmt->error
            ]);
        }
        $stmt->close();
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Requisição inválida."]);
}

$conn->close();
