<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
include_once 'conexao.php';

$ano = isset($_GET['ano']) ? intval($_GET['ano']) : date('Y');

function fetchSumByMonth($conexao, $table, $column, $ano)
{
    $data = array_fill(1, 12, 0); // Inicializa o array com zeros para todos os meses
    $sql = "SELECT MONTH(created_at) as month, SUM(REPLACE(REPLACE($column, '.', ''), ',', '.')) as total 
            FROM `$table` 
            WHERE YEAR(created_at) = ? 
            GROUP BY month";
    $stmt = $conexao->prepare($sql);
    if (!$stmt) {
        die("Prepare failed: (" . $conexao->errno . ") " . $conexao->error);
    }
    $stmt->bind_param("i", $ano);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $data[intval($row['month'])] = floatval($row['total']);
    }
    $stmt->close();
    return $data;
}

$investidosPorMes = fetchSumByMonth($conexao, 'investidos', 'valor', $ano); // substitua 'valor' pelo nome correto da coluna
$empreendidosPorMes = fetchSumByMonth($conexao, 'empreendidos', 'valor', $ano); // substitua 'valor' pelo nome correto da coluna
$dividasPorMes = fetchSumByMonth($conexao, 'dividas', 'valor', $ano); // substitua 'valor' pelo nome correto da coluna

$conexao->close();

echo json_encode(array(
    'investidos' => $investidosPorMes,
    'empreendidos' => $empreendidosPorMes,
    'dividas' => $dividasPorMes
));
