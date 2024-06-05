<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
include_once 'conexao.php';
$dados = json_decode(file_get_contents('php://input'), true);

$valor = $dados['valor'];
$created_at = date('Y-m-d');
$tipo = $dados['tipo'];
$sql = "INSERT INTO " . $tipo . " (valor, created_at) VALUES ('$valor', '$created_at')";
if (mysqli_query($conexao, $sql)) {
    echo json_encode(array(
        'mensagem' => 'Movimentação cadastrada com sucesso',
        'status' => 'ok'
    ));
} else {
    echo json_encode(array(
        'mensagem' => 'Falha ao cadastrar movimentação',
        'status' => 'erro'
    ));
}
