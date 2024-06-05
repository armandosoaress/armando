<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
include_once 'conexao.php';
$dados = json_decode(file_get_contents('php://input'), true);


$descricao = $dados['descricao'];
$valor = $dados['valor'];
$categoria = $dados['categoria'];
$vencimento = $dados['vencimento'];
$pagamento = $dados['pagamento'];
$repetir = $dados['repetir'];

$sql = "INSERT INTO movimentacoes (descricao, valor, categoria, data_vencimento, data_pagamento, repetir) VALUES ('$descricao', '$valor', '$categoria', '$vencimento', '$pagamento', '$repetir')";
if (mysqli_query($conexao, $sql)) {
    echo json_encode(array(
        'mensagem' => 'Movimentação inserida com sucesso',
        'status' => 'ok'
    ));
} else {
    echo json_encode(array(
        'mensagem' => 'Falha ao inserir movimentação',
        'status' => 'erro'
    ));
}
