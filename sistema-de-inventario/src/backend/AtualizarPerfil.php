<?php
header("Content-Type: application/json; charset=UTF-8");

// Permitir origens específicas ou todas as origens (* para desenvolvimento)
header("Access-Control-Allow-Origin: http://localhost:5173");

// Permitir métodos específicos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Permitir cabeçalhos personalizados enviados pelo frontend
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Tratar requisições OPTIONS (preflight request) para responder diretamente
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
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

// Lê o corpo da requisição
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($data["RegistoID"])) {
    $RegistoID = $data["RegistoID"];
    unset($data["RegistoID"]); // Remove o RegistoID para evitar inserções inválidas

    // Verifica se há campos para atualizar
    if (empty($data)) {
        http_response_code(400);
        echo json_encode(["message" => "Nenhum campo para atualizar."]);
        exit();
    }

    // Constrói dinamicamente a query de atualização
    $fields = [];
    $params = [];
    $types = "";

    foreach ($data as $key => $value) {
        $fields[] = "$key = ?";
        $params[] = $value;
        $types .= is_int($value) ? "i" : "s"; // Define o tipo (inteiro ou string)
    }

    $params[] = $RegistoID; // Adiciona o RegistoID para a cláusula WHERE
    $types .= "i"; // RegistoID é inteiro

    $sql = "UPDATE registo SET " . implode(", ", $fields) . " WHERE RegistoID = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["message" => "Erro ao preparar a query."]);
        exit();
    }

    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Dados atualizados com sucesso."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Erro ao atualizar os dados."]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["message" => "Requisição inválida."]);
}

$conn->close();
?>
