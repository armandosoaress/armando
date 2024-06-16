<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include_once 'conexao.php';


$sql = "SELECT * FROM `raias`";
$raias = mysqli_query($conexao, $sql);
$result = mysqli_fetch_all($raias, MYSQLI_ASSOC);
$raia = [];
foreach ($result as $row) {
    $sql = "SELECT * FROM `raia` WHERE `id_raia` = " . $row['id'] . " ORDER BY `ordem` ASC";
    $tarefas = mysqli_query($conexao, $sql);
    $tarefas = mysqli_fetch_all($tarefas, MYSQLI_ASSOC);
    $raia[] = [
        'raia' => $row,
        'tarefas' => $tarefas
    ];
}


echo json_encode($raia);
// Retorna os valores como JSON 
