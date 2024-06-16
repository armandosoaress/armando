<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
$dados = json_decode(file_get_contents('php://input'), true);
include_once 'conexao.php';


if (isset($_GET['funcao']) && $_GET['funcao'] == 'editarviz') {

    if (isset($_GET['tabela'])) {
        $sql = "SELECT * FROM " . $_GET['tabela'] . " WHERE id = " . $_GET['id'];
        $resultado = mysqli_query($conexao, $sql);
        $row = mysqli_fetch_assoc($resultado);
        echo json_encode($row);
    }

    return;
}


if (isset($dados['funcao']) && $dados['funcao'] == 'editar') {

    if (isset($dados['tabela'])) {
        $sql = "UPDATE " . $dados['tabela'] . " SET `valor` = '" . $dados['valor'] . "', `created_at` = '" . $dados['data'] . "' WHERE  `id` = " . $dados['id'];
        $resultado = mysqli_query($conexao, $sql);
        echo json_encode([
            'status' => 'ok'
        ]);
    }

    return;
}

if (isset($dados['funcao']) && $dados['funcao'] == 'excluir') {

    if (isset($dados['tabela'])) {
        $sql = "DELETE FROM " . $dados['tabela'] . " WHERE id = " . $dados['id'];
        $resultado = mysqli_query($conexao, $sql);
        echo json_encode([
            'status' => 'ok'
        ]);
    }

    return;
}

$sql = "SELECT * FROM investidos";
$sql2 = "SELECT * FROM dividas";
$sql3 = "SELECT * FROM empreendidos";

$resultado = mysqli_query($conexao, $sql);
$resultado2 = mysqli_query($conexao, $sql2);
$resultado3 = mysqli_query($conexao, $sql3);


$investidos = array();
$dividas = array();
$empreendidos = array();

while ($row = mysqli_fetch_assoc($resultado)) {
    $investidos[] = $row;
}

while ($row = mysqli_fetch_assoc($resultado2)) {
    $dividas[] = $row;
}

while ($row = mysqli_fetch_assoc($resultado3)) {
    $empreendidos[] = $row;
}


echo json_encode(
    array(
        'dividas' => $dividas,
        'investidos' => $investidos,
        'empreendidos' => $empreendidos
    )
);
