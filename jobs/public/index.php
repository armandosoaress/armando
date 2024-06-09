<?php


require __DIR__ . '/../vendor/autoload.php';

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;


// Chaves VAPID (certifique-se de usar suas próprias chaves)
$publicKey = 'BPieHtiuVRmd5wRdoJBQgowTaUOAaeoPo7fU4FIfp_CQUALhr_AvjL6zlnmfBd95F_b8pW19KMFuJyBuUxpH0uA';
$privateKey = 'i2uv3Ei_9ZieGlRPIgtZCdm4Rc0cNiYzlSc9nkD3iMo';

// Configuração VAPID
$auth = array(
    'VAPID' => array(
        'subject' => 'mailto:you@example.com', // Substitua pelo seu e-mail
        'publicKey' => $publicKey,
        'privateKey' => $privateKey,
    ),
);

// Cria uma nova instância de WebPush com as credenciais VAPID
$webPush = new WebPush($auth);

// Caminho para o arquivo onde as assinaturas estão armazenadas
$file = 'subscriptions.json';

// Carregar assinaturas
$subscriptions = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// Cria o payload da notificação
$payload = json_encode([
    'title' => 'Notificação Periódica',
    'body' => 'Esta é uma notificação enviada a cada 3 horas.',
    'icon' => '/path/to/icon.png', // Opcional: Adicione um ícone para a notificação
    'badge' => '/path/to/badge.png', // Opcional: Adicione um badge para a notificação
]);


// Enviar notificações para cada assinatura
foreach ($subscriptions as $subscription) {
    // Adiciona a notificação à fila
    $webPush->queueNotification(
        Subscription::create($subscription),
        $payload
    );
}

// Enviar todas as notificações na fila
foreach ($webPush->flush() as $report) {
    $endpoint = $report->getRequest()->getUri()->__toString();

    if ($report->isSuccess()) {
        echo "[v] Mensagem enviada com sucesso para {$endpoint}.\n";
    } else {
        echo "[x] Falha ao enviar mensagem para {$endpoint}: {$report->getReason()}.\n";
    }
}

echo "<br>";
echo "Notificações enviadas!.\n";