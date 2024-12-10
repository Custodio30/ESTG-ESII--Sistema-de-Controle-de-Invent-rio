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
    $marca = $data["marca"] ?? null; 
    $descricao = $data["description"] ?? null; 
    $kms = isset($data["items"][0]) ? floatval($data["items"][0]) : null; 
    $tipo = $data["items"][1] ?? null;
    $ano = isset($data["items"][2]) ? intval($data["items"][2]) : null;
    $modelo = $data["items"][3] ?? null; 
    $preco = isset($data["items"][4]) ? floatval($data["items"][4]) : null; 
    $image = $data["image"] ?? null;
    $RegistoID = $data["RegistoID"] ?? null; 

    if (!$marca || !$descricao || !$kms || !$tipo || !$ano || !$modelo || !$preco || !$image || !$RegistoID) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Dados incompletos. Todos os campos são obrigatórios."
        ]);
        exit();
    }


    $sql = "INSERT INTO carros (Marca, Descricao, Km, Tipo, Ano, Modelo, Preco, imagem, RegistoID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdsisssi", $marca, $descricao, $kms, $tipo, $ano, $modelo, $preco, $image, $RegistoID);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "Carro salvo com sucesso!",
            "carro" => [
                "Marca" => $marca,
                "descricao" => $descricao,
                "kms" => $kms,
                "tipo" => $tipo,
                "ano" => $ano,
                "marca" => $modelo,
                "preco" => $preco,
                "imagem" => $image,
                "RegistoID" => $RegistoID
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
