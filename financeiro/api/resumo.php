<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

include_once 'conexao.php';


function formatar($valor)
{
    if (strlen($valor) == 4) {
        $valor = str_replace(',', '.', $valor);
    }
    if (strlen($valor) == 5) {
        $valor = str_replace(',', '.', $valor);
    }
    if (strlen($valor) == 6) {
        $valor = str_replace(',', '.', $valor);
    }
    if (strlen($valor) == 8) {
        $valor = str_replace('.', '', $valor);
        $valor = str_replace(',', '.', $valor);
    }
    if (strlen($valor) == 9) {
        $valor = str_replace('.', '', $valor);
        $valor = str_replace(',', '.', $valor);
    }

    return $valor;
}


$mes = $_GET['mes'];
$ano = $_GET['ano'];

$sqlinvestidos = "SELECT * FROM `investidos` WHERE MONTH(created_at) = $mes AND YEAR(created_at) = $ano";
$resultinvestidos = mysqli_query($conexao, $sqlinvestidos);
$valorinvestido = 0;
while ($row = mysqli_fetch_assoc($resultinvestidos)) {
    $valor = formatar($row['valor']);
    $valorinvestido += $valor;
}

// Consulta o último valor empreendido
$sqlempreendidos = "SELECT * FROM `empreendidos` WHERE MONTH(created_at) = $mes AND YEAR(created_at) = $ano";
$resultempreendidos = mysqli_query($conexao, $sqlempreendidos);
$valorempreendido = 0;
foreach ($resultempreendidos as $row) {
    $valor = formatar($row['valor']);
    $valorempreendido += $valor;
}

// Consulta o último valor devido
$sqldividas = "SELECT * FROM `dividas` WHERE MONTH(created_at) = $mes AND YEAR(created_at) = $ano";
$resultdividas = mysqli_query($conexao, $sqldividas);
$valordevido = 0;
foreach ($resultdividas as $row) {
    $valor = formatar($row['valor']);
    $valordevido += $valor;
}

// formatar moeda
$valorinvestidofloat = $valorinvestido;
$valorempreendidofloat = $valorempreendido;
$valordevidofloat = $valordevido;

$valorinvestido = number_format($valorinvestido, 2, ',', '.');
$valorempreendido = number_format($valorempreendido, 2, ',', '.');
$valordevido = number_format($valordevido, 2, ',', '.');

// Retorna os valores como JSON
echo json_encode(array(
    'investidos' => $valorinvestido,
    'investidosfloat' => $valorinvestidofloat,
    'empreendidos' => $valorempreendido,
    'empreendidosfloat' => $valorempreendidofloat,
    'dividas' => $valordevido,
    'dividasfloat' => $valordevidofloat
));
