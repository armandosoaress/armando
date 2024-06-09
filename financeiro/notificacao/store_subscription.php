<?php
// Definir o cabeçalho para aceitar JSON
header('Content-Type: application/json');

// Receber a assinatura do cliente
$subscription = json_decode(file_get_contents('php://input'), true);

// Caminho do arquivo onde as assinaturas serão armazenadas
$file = '../../jobs/subscriptions.json';


if (file_exists($file)) {
    $subscriptions = json_decode(file_get_contents($file), true);
    foreach ($subscriptions as $sub) {
        if ($sub['endpoint'] === $subscription['endpoint']) {
            echo json_encode(['success' => false, 'message' => 'Subscription already exists']);
            exit;
            return;
        }
    }
}

// Verificar se o arquivo já existe e carregar as assinaturas existentes
$subscriptions = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// Adicionar a nova assinatura à lista
$subscriptions[] = $subscription;

// Salvar a lista atualizada de assinaturas no arquivo
file_put_contents($file, json_encode($subscriptions));

// Retornar uma resposta de sucesso
echo json_encode(['success' => true]);
