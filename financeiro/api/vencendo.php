<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include_once 'conexao.php';

$vencendohoje = [];
$vencendoamanha = [];
$dtahoje = date('Y-m-d');
$dtamanha = date('Y-m-d', strtotime('+1 day'));
$sql = "SELECT * FROM `movimentacoes` WHERE data_vencimento = '$dtahoje'";
$result = mysqli_query($conexao, $sql);
foreach ($result as $row) {
    $vencendohoje[] = $row;
}

$sql = "SELECT * FROM `movimentacoes` WHERE data_vencimento = '$dtamanha'";
$result = mysqli_query($conexao, $sql);
foreach ($result as $row) {
    $vencendoamanha[] = $row;
}


// Retorna os valores como JSON
echo json_encode(array(
    'vencendohoje' => $vencendohoje,
    'vencendoamanha' => $vencendoamanha
));
