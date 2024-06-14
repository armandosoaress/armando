<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
include_once 'conexao.php';
$dados = json_decode(file_get_contents('php://input'), true);
$tempo = $dados['tempo'];
$date = $dados['data'];
$tempo = str_replace(":", ".", $tempo);

// verifica se a receita já foi inserida
$sql = "SELECT * FROM receita WHERE date = '$date'";
$resultado = mysqli_query($conexao, $sql);
if (mysqli_num_rows($resultado) > 0) {
    echo json_encode(array('mensagem' => 'existe'));
    exit;
}

$sql = "INSERT INTO `receita`( `tempo`, `date`) VALUES ( '$tempo', '$date')";
$resultado = mysqli_query($conexao, $sql);
if ($resultado) {
    echo json_encode(array('mensagem' => 'success'));
} else {
    echo json_encode(array('mensagem' => 'Erro ao inserir receita'));
}
