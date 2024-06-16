<?php
// Cabeçalhos para permitir CORS e definir o tipo de conteúdo
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

$dados = json_decode(file_get_contents('php://input'), true);

include_once 'conexao.php';

// Verifica a conexão
if (!$conexao) {
    die(json_encode(array(
        'mensagem' => 'Falha na conexão: ' . mysqli_connect_error(),
        'status' => 'erro'
    )));
}

foreach ($dados as $raia) {
    $id_raia = intval($raia['id']); 
    $tarefas = $raia['tarefas'];
    $key = 0;
    foreach ($tarefas as $tarefa) {
        $key++;
        $id_tarefa = intval($tarefa['id']); // Garante que o ID da tarefa seja um número inteiro
        $sql = "UPDATE raia SET id_raia = $id_raia, ordem = '$key' WHERE id = $id_tarefa";

        // Executa a consulta SQL
        if (mysqli_query($conexao, $sql)) {
            $respostas[] = array(
                'id_tarefa' => $id_tarefa,
                'mensagem' => 'Tarefa atualizada com sucesso',
                'status' => 'sucesso'
            );
        } else {
            $respostas[] = array(
                'id_tarefa' => $id_tarefa,
                'mensagem' => 'Erro ao atualizar a tarefa: ' . mysqli_error($conexao),
                'status' => 'erro'
            );
        }
    }
}

// Fecha a conexão
mysqli_close($conexao);

// Retorna a resposta em JSON
echo json_encode($respostas);
