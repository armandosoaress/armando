<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');

include_once 'conexao.php';

$sql = "SELECT * FROM categorias";
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql .= " WHERE id = $id";
}
$resultado = mysqli_query($conexao, $sql);
if (mysqli_num_rows($resultado) > 0) {
    $categorias = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        $categorias[] = $row;
    }
    echo json_encode($categorias);
} else {
    echo json_encode(array('mensagem' => 'Nenhuma categoria encontrada'));
}
