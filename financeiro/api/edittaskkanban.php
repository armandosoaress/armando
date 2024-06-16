<?php
// Configuração de cabeçalhos para permitir CORS e definir o tipo de conteúdo como JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
include_once 'conexao.php';

// Obtendo e decodificando o corpo da requisição JSON
$dados = $_GET;

// Verificando se o parâmetro id está presente nos dados recebidos
if (isset($dados['id'])) {
    $id_raia = $dados['id'];

    // Utilizando prepared statements para evitar SQL Injection
    $stmt = $conexao->prepare("SELECT * FROM `raia` WHERE `id` = ?");
    $stmt->bind_param("i", $id_raia);
    $stmt->execute();
    $result = $stmt->get_result();

    $raia = $result->fetch_all(MYSQLI_ASSOC);

    // Encerrando a execução do statement
    $stmt->close();

    // Retornando o resultado como JSON
    echo json_encode($raia[0]);
} else {
    // Caso o id não esteja presente, retorna um erro
    echo json_encode(["error" => "Parâmetro 'id' não encontrado na requisição."]);
}

// Fechando a conexão com o banco de dados
mysqli_close($conexao);
