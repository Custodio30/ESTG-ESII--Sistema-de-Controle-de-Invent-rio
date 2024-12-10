<?php
// Habilitar relatórios de erro
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Adicionar cabeçalhos CORS
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Configuração do banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistemadeinventario";

// Criação da conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar se houve erro na conexão
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Erro na conexão com o banco de dados.", "error" => $conn->connect_error]);
    exit();
}

// Verificar se a imagem foi enviada
if (isset($_FILES['imagem']) && isset($_POST['RegistoID'])) {
    $RegistoID = intval($_POST['RegistoID']);
    $imagem = $_FILES['imagem'];

    // Validar erros no upload
    if ($imagem['error'] !== UPLOAD_ERR_OK) {
        http_response_code(500);
        echo json_encode(["message" => "Erro no upload do arquivo. Código: " . $imagem['error']]);
        exit();
    }

    // Validar tipo de arquivo (somente imagens)
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($imagem['type'], $allowedTypes)) {
        http_response_code(400);
        echo json_encode(["message" => "Formato de arquivo inválido. Somente JPEG, PNG ou GIF são permitidos."]);
        exit();
    }

    // Gerar um nome único para o arquivo
    $ext = pathinfo($imagem['name'], PATHINFO_EXTENSION);
    $fileName = uniqid() . "." . $ext;
    $uploadDir = "uploads/";

    // Garantir que o diretório de uploads existe
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Caminho completo do arquivo
    $filePath = $uploadDir . $fileName;

    // Mover o arquivo para o diretório de uploads
    if (move_uploaded_file($imagem['tmp_name'], $filePath)) {
        // Caminho absoluto (para acesso no frontend)
        $absolutePath = "http://localhost/" . $filePath;

        // Atualizar o banco de dados com o caminho da imagem
        $sql = "UPDATE registo SET Imagem = ? WHERE RegistoID = ?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao preparar a consulta SQL.", "error" => $conn->error]);
            exit();
        }

        $stmt->bind_param("si", $absolutePath, $RegistoID);
        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao atualizar a imagem no banco de dados.", "error" => $stmt->error]);
            unlink($filePath); // Remover o arquivo em caso de erro
            exit();
        }

        // Retornar o caminho absoluto da imagem
        http_response_code(200);
        echo json_encode(["message" => "Imagem carregada com sucesso.", "path" => $absolutePath]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Erro ao mover o arquivo para o diretório de uploads."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Faltando parâmetros: imagem ou RegistoID não fornecidos."]);
}

// Fechar a conexão
$conn->close();
?>