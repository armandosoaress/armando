
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
include_once 'conexao.php';


$sql = "SELECT * FROM movimentacoes";
$where = "1 = 1 ";

if (isset($_GET['mes']) && isset($_GET['ano'])) {
    $mes = $_GET['mes'];
    $ano = $_GET['ano'];
    if ($_GET['vp'] == 1) {
        $where .= " AND (MONTH(`data_vencimento`) = $mes";
        $where .= " AND YEAR(`data_vencimento`) = $ano or repetir = 1)";
    } else {
        $where .= " AND (MONTH(`data_pagamento`) = $mes";
        $where .= " AND YEAR(`data_pagamento`) = $ano or repetir = 1)";
    }
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $where = " id = $id";
}
$sql .= " WHERE $where";

$resultado = mysqli_query($conexao, $sql);
if (mysqli_num_rows($resultado) > 0) {
    $movimentacoes = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        if ($row['repetir'] == 1) {
            try {
                $sql = "SELECT status FROM movimentacoesrepetir WHERE id_movimentacao = " . $row['id'] . " AND MONTH(data_pagamento) = $mes  AND YEAR(data_pagamento) = $ano order by id desc limit 1";
                $result = mysqli_query($conexao, $sql);
                if (mysqli_num_rows($result) > 0) {
                    $row['status'] = mysqli_fetch_assoc($result)['status'];
                } else {
                    $row['status'] = 0;
                }
            } catch (\Throwable $th) {
                //throw $th;
            }
        }
        $movimentacoes[] = $row;
    }
    echo json_encode($movimentacoes);
} else {
    echo json_encode(array('mensagem' => 'Nenhuma movimentação encontrada'));
}
?>