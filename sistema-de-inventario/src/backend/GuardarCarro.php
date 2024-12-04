<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Permite qualquer origem
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

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

// Trata preflight (requisições OPTIONS)
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
    $modelo = $data["title"] ?? null; // Nome do carro
    $descricao = $data["description"] ?? null; // Descrição do carro
    $kms = isset($data["items"][0]) ? floatval($data["items"][0]) : null; // Km's
    $tipo = $data["items"][1] ?? null; // Tipo de combustível
    $ano = isset($data["items"][2]) ? intval($data["items"][2]) : null; // Ano
    $marca = $data["items"][3] ?? null; // Marca
    $preco = isset($data["items"][4]) ? floatval($data["items"][4]) : null; // Preço
    $image = $data["image"] ?? null; // URL da imagem

    // Valida se todos os campos obrigatórios foram preenchidos
    if (!$modelo || !$descricao || !$kms || !$tipo || !$ano || !$marca || !$preco || !$image) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Dados incompletos. Todos os campos são obrigatórios."
        ]);
        exit();
    }

    // Prepara a query SQL para inserção
    $sql = "INSERT INTO carros (modelo, descricao, kms, tipo, ano, marca, preco, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdsiss", $modelo, $descricao, $kms, $tipo, $ano, $marca, $preco, $image);

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
    echo json_encode(["message" => "Requisição inválida."]);
}

$conn->close();
?>
