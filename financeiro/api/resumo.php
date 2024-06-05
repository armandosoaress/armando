<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include_once 'conexao.php';

// Consulta o último valor investido
$sqlinvestidos = "SELECT * FROM `investidos` ORDER BY id DESC LIMIT 1";
$resultinvestidos = mysqli_query($conexao, $sqlinvestidos);
$valorinvestido = 0;
if ($row = mysqli_fetch_assoc($resultinvestidos)) {
    $valorinvestido = $row['valor'];
}

// Consulta o último valor empreendido
$sqlempreendidos = "SELECT * FROM `empreendidos` ORDER BY id DESC LIMIT 1";
$resultempreendidos = mysqli_query($conexao, $sqlempreendidos);
$valorempreendido = 0;
if ($row = mysqli_fetch_assoc($resultempreendidos)) {
    $valorempreendido = $row['valor'];
}

// Consulta o último valor devido
$sqldividas = "SELECT * FROM `dividas` ORDER BY id DESC LIMIT 1";
$resultdividas = mysqli_query($conexao, $sqldividas);
$valordevido = 0;
if ($row = mysqli_fetch_assoc($resultdividas)) {
    $valordevido = $row['valor'];
}

// Retorna os valores como JSON
echo json_encode(array(
    'investidos' => $valorinvestido,
    'empreendidos' => $valorempreendido,
    'dividas' => $valordevido
));
