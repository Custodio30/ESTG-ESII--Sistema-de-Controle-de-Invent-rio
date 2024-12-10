<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Manipulação para requisições OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Configuração da base de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistemadeinventario";

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Falha ao conectar ao banco de dados."]);
    exit();
}

// Verificar se o método é GET
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Consulta SQL para buscar dados da tabela carros
    $sql = "SELECT CarrosID, Marca, descricao, km, tipo, ano, Modelo, preco, imagem, RegistoID FROM carros";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $cars = [];
        while ($row = $result->fetch_assoc()) {
            $cars[] = $row;
        }

        // Resposta JSON com os dados
        http_response_code(200);
        echo json_encode($cars);
    } else {
        // Caso não haja registros
        http_response_code(404);
        echo json_encode(["message" => "Nenhum carro encontrado."]);
    }
} else {
    // Caso o método não seja GET
    http_response_code(405);
    echo json_encode(["message" => "Método não permitido. Apenas GET é suportado."]);
}

// Fechar a conexão
$conn->close();
?>
