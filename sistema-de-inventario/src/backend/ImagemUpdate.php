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

// Conexão com a base de dados
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Falha ao conectar ao banco de dados."]);
    exit();
}

// Verifica se há um arquivo enviado e os dados do utilizador
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["profile_image"])) {
    $userId = $_POST["user_id"]; // ID do utilizador já registrado
    $imageTmpName = $_FILES["profile_image"]["tmp_name"];
    $imageName = uniqid() . "_" . basename($_FILES["profile_image"]["name"]);
    $uploadDir = "uploads/"; // Diretório para salvar as imagens
    $imagePath = $uploadDir . $imageName;

    // Criar o diretório, caso não exista
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Mover a imagem para o diretório e salvar o caminho no banco de dados
    if (move_uploaded_file($imageTmpName, $imagePath)) {
        $sql = "UPDATE registo SET Imagem = ? WHERE RegistoID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $imagePath, $userId);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Imagem de perfil atualizada com sucesso!",
                "profile_image" => $imagePath
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Erro ao atualizar a imagem: " . $stmt->error
            ]);
        }
        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Erro ao fazer upload da imagem."
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "message" => "Dados inválidos ou nenhuma imagem enviada."
    ]);
}

$conn->close();
?>
