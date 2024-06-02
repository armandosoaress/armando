<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
include_once 'conexao.php';

$dados = json_decode(file_get_contents('php://input'), true);
$id = $dados['id'];
$status = $dados['status'];
$dtPagamento = $dados['pagamento'];

$sql = "SELECT repetir FROM movimentacoes WHERE id = $id";
$result = mysqli_query($conexao, $sql);
$repetir = mysqli_fetch_assoc($result)['repetir'];
if ($repetir == '1') {
    $sql = "INSERT INTO movimentacoes_repetir (id_movimentacao, status,data_pagamento) VALUES ($id, '$status', '$dtPagamento')";
    mysqli_query($conexao, $sql);
}
$sql = "UPDATE movimentacoes set status = '$status' where id = $id";
if (mysqli_query($conexao, $sql)) {
    echo json_encode(array(
        'mensagem' => 'Movimentação atualizada com sucesso',
        'status' => 'ok'
    ));
} else {
    echo json_encode(array(
        'mensagem' => 'Falha ao atualizar movimentação',
        'status' => 'erro'
    ));
}
