<?php
$servidor = "localhost";
$usuario = "arman008_armando";
$senha = "Arma312FJN$";
$banco = "arman008_armando";
if ($_SERVER['SERVER_NAME'] == 'localhost') {
    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $banco = "testeaa";
}
$conexao = mysqli_connect($servidor, $usuario, $senha, $banco);
if (!$conexao) {
    die("Falha na conexao: " . mysqli_connect_error());
}
