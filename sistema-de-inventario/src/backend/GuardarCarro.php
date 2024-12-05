<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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
    $modelo = $data["title"] ?? null; 
    $descricao = $data["description"] ?? null; 
    $kms = isset($data["items"][0]) ? floatval($data["items"][0]) : null; 
    $tipo = $data["items"][1] ?? null;
    $ano = isset($data["items"][2]) ? intval($data["items"][2]) : null;
    $marca = $data["items"][3] ?? null; 
    $preco = isset($data["items"][4]) ? floatval($data["items"][4]) : null; 
    $image = $data["image"] ?? null;


    if (!$modelo || !$descricao || !$kms || !$tipo || !$ano || !$marca || !$preco || !$image) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Dados incompletos. Todos os campos são obrigatórios."
        ]);
        exit();
    }


    $sql = "INSERT INTO carros (modelo, Descricao, Km, Tipo, Ano, Marca, Preco, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdsisss", $modelo, $descricao, $kms, $tipo, $ano, $marca, $preco, $image);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "Carro salvo com sucesso!",
            "carro" => [
                "modelo" => $modelo,
                "descricao" => $descricao,
                "kms" => $kms,
                "tipo" => $tipo,
                "ano" => $ano,
                "marca" => $marca,
                "preco" => $preco,
                "imagem" => $image
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Erro ao salvar os dados: " . $stmt->error
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
