<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
include_once 'conexao.php';
$dados = json_decode(file_get_contents('php://input'), true);


$descricao = $dados['descricao'];
$valor = $dados['valor'];
$vencimento = $dados['vencimento'];
$pagamento = $dados['pagamento'];
$repetir = $dados['repetir'];

$sql = "UPDATE movimentacoes SET descricao = '$descricao', valor = '$valor', data_vencimento = '$vencimento', data_pagamento = '$pagamento' , repetir = '$repetir' WHERE id = " . $dados['id'];
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
