<?php
// Cabeçalhos para permitir CORS e definir o tipo de conteúdo
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
$dados = json_decode(file_get_contents('php://input'), true);
include_once 'conexao.php';
if (!$conexao) {
    die(json_encode(array(
        'mensagem' => 'Falha na conexão: ' . mysqli_connect_error(),
        'status' => 'erro'
    )));
}
$id = mysqli_real_escape_string($conexao, $dados['id']);
$descricao = mysqli_real_escape_string($conexao, $dados['descricao']);
$titulo = mysqli_real_escape_string($conexao, $dados['titulo']);

$sql = "UPDATE raia SET descricao = '$descricao', titulo = '$titulo' WHERE id = '$id'";
if (mysqli_query($conexao, $sql)) {
    echo json_encode(array(
        'mensagem' => 'Movimentação inserida com sucesso',
        'status' => 'ok'
    ));
} else {
    echo json_encode(array(
        'mensagem' => 'Falha ao inserir movimentação: ' . mysqli_error($conexao),
        'status' => 'erro'
    ));
}

 
