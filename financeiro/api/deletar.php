<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
include_once 'conexao.php';
$dados = json_decode(file_get_contents('php://input'), true);
$id = $dados['id'];

$sql = "SELECT * FROM movimentacoes WHERE id = $id";
$result = mysqli_query($conexao, $sql);
$movimentacao = mysqli_fetch_assoc($result);
if ($movimentacao['repetir'] == 1) {
    $sql = "DELETE FROM movimentacoesrepetir WHERE id_movimentacao = $id";
    mysqli_query($conexao, $sql);
}

$sql = "DELETE FROM movimentacoes WHERE id = $id";
if (mysqli_query($conexao, $sql)) {
    echo json_encode(array(
        'mensagem' => 'Movimentação deletada com sucesso',
        'status' => 'ok'
    ));
} else {
    echo json_encode(array(
        'mensagem' => 'Falha ao deletar movimentação',
        'status' => 'erro'
    ));
}