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
    $marca = $data["Marca"] ?? null; 
    $descricao = $data["descricao"] ?? null; 
    $kms = $data["km"] ?? null; 
    $tipo = $data["tipo"] ?? null;
    $ano = $data["ano"] ?? null; 
    $modelo = $data["Modelo"] ?? null; 
    $preco = $data["preco"] ?? null; 
    $image = $data["imagem"] ?? null;

    if (!$carrosID || !$marca || !$descricao || !$kms || !$tipo || !$ano || !$modelo || !$preco || !$image) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Dados incompletos. Todos os campos são obrigatórios."
        ]);
        exit();
    }

    $sql = "UPDATE carros SET Marca = ?, Descricao = ?, Km = ?, Tipo = ?, Ano = ?, Modelo = ?, Preco = ?, imagem = ? WHERE CarrosID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdsisssi", $marca, $descricao, $kms, $tipo, $ano, $modelo, $preco, $image, $carrosID);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Carro atualizado com sucesso!",
                "carro" => [
                    "CarrosID" => $carrosID,
                    "Marca" => $marca,
                    "descricao" => $descricao,
                    "km" => $kms,
                    "tipo" => $tipo,
                    "ano" => $ano,
                    "Modelo" => $modelo,
                    "preco" => $preco,
                    "imagem" => $image
                ]
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "Nenhum registro encontrado para atualizar com o ID informado."
            ]);
        }
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Erro ao atualizar os dados: " . $stmt->error
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
