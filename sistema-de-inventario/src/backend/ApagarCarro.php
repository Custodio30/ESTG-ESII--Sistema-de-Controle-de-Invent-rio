<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); 
    exit();
}

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

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] === "POST" && $data) {
    $carrosID = $data["CarrosID"] ?? null;

    if (!$carrosID) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "ID do carro é obrigatório para exclusão."
        ]);
        exit();
    }

    $sql = "DELETE FROM carros WHERE CarrosID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $carrosID);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Carro excluído com sucesso!"
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "Nenhum registro encontrado para exclusão com o ID informado."
            ]);
        }
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Erro ao excluir o carro: " . $stmt->error
        ]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Requisição inválida ou dados ausentes."
    ]);
}

$conn->close();
?>
