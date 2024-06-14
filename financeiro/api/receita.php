<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');

// pega o dia e hora atual
date_default_timezone_set('America/Sao_Paulo');
$dia = date('Y-m-d');
$hora = date('H:i:s');
echo $dia . ' ' . $hora;
include_once 'conexao.php';
$diasDaSemana = [];
$diasDaSemana[] = date('Y-m-d', strtotime('monday this week'));
$diasDaSemana[] = date('Y-m-d', strtotime('tuesday this week'));
$diasDaSemana[] = date('Y-m-d', strtotime('wednesday this week'));
$diasDaSemana[] = date('Y-m-d', strtotime('thursday this week'));
$diasDaSemana[] = date('Y-m-d', strtotime('friday this week'));
$diasDaSemana[] = date('Y-m-d', strtotime('saturday this week'));
$diasDaSemana[] = date('Y-m-d', strtotime('sunday this week'));
$dataAtual = date('Y-m-d');
foreach ($diasDaSemana as $key => $value) {
    if ($value >= $dataAtual) {
        unset($diasDaSemana[$key]);
    }
}
$sql = "SELECT * FROM receita  WHERE date IN ('" . implode("','", $diasDaSemana) . "') ORDER BY date ASC";
$resultado = mysqli_query($conexao, $sql);
if (mysqli_num_rows($resultado) > 0) {
    $receitas = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        $receitas[] = $row;
    }
    // verifica se todas as dtas da semana tem receita se não tiver insere um 0
    foreach ($diasDaSemana as $key => $value) {
        $existe = false;
        foreach ($receitas as $receita) {
            if ($receita['date'] == $value) {
                $existe = true;
            }
        }
        if (!$existe) {
            $receitas[] = array(
                'date' => $value,
                'tempo' => 0
            );
        }
    }
    echo json_encode($receitas);
} else {
    echo json_encode(array('mensagem' => 'Nenhuma receita encontrada'));
}
