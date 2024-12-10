<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

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

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["RegistoID"])) {
    $RegistoID = $_GET["RegistoID"];

    $sql = "SELECT Nome, Email, Password, Imagem, Genero, Morada, Telefone FROM registo WHERE RegistoID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $RegistoID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Mapear campos para os valores esperados
        $user["Genero"] = $user["Genero"] === "1" ? "Masculino" : "Feminino";
        $user["Imagem"] = $user["Imagem"] ? $user["Imagem"] : "placeholder.png";
        
        http_response_code(200);
        echo json_encode([
            "Nome" => $user["Nome"],
            "Email" => $user["Email"],
            "Password" => $user["Password"],
            "Imagem" => $user["Imagem"],
            "Genero" => $user["Genero"],
            "Morada" => $user["Morada"],
            "Telefone" => $user["Telefone"]
        ]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Utilizador não encontrado."]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["message" => "Requisição inválida."]);
}

$conn->close();
?>
