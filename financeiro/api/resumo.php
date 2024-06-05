<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
include_once 'conexao.php';
$dados = json_decode(file_get_contents('php://input'), true);
$sqlinvestidos = "SELECT * FROM `investidos`";
$resultinvestidos = mysqli_query($conexao, $sqlinvestidos);
$valorinvestido = 0;
while ($row = mysqli_fetch_assoc($resultinvestidos)) {
    $valorinvestido += $row['valor'];
}
$sqlempreendidos = "SELECT * FROM `empreendidos`";
$resultempreendidos = mysqli_query($conexao, $sqlempreendidos);
$valorempreendido = 0;
while ($row = mysqli_fetch_assoc($resultempreendidos)) {
    $valorempreendido += $row['valor'];
}
$sqldividas = "SELECT * FROM `dividas`";
$resultdividas = mysqli_query($conexao, $sqldividas);
$valordevido = 0;
while ($row = mysqli_fetch_assoc($resultdividas)) {
    $valordevido += $row['valor'];
}
echo json_encode(array(
    'investidos' => $valorinvestido,
    'empreendidos' => $valorempreendido,
    'dividas' => $valordevido
));
