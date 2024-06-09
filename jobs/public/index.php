<?php
require_once '../../financeiro/api/conexao.php';

require __DIR__ . '/../vendor/autoload.php';

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

// Configurações do VAPID
$publicKey = 'BPieHtiuVRmd5wRdoJBQgowTaUOAaeoPo7fU4FIfp_CQUALhr_AvjL6zlnmfBd95F_b8pW19KMFuJyBuUxpH0uA';
$privateKey = 'i2uv3Ei_9ZieGlRPIgtZCdm4Rc0cNiYzlSc9nkD3iMo';
$email = 'mailto:you@example.com';

// Função para enviar notificações
function enviarNotificacoes($webPush, $subscriptions, $payload)
{
    foreach ($subscriptions as $subscription) {
        $webPush->queueNotification(
            Subscription::create($subscription),
            $payload
        );
    }
    foreach ($webPush->flush() as $report) {
        $endpoint = $report->getRequest()->getUri()->__toString();
        $report->isSuccess();
    }
}

// Função para buscar e enviar notificações com base na data de vencimento
function enviarNotificacoesPorData($conexao, $webPush, $subscriptions, $data, $mensagem)
{
    $sql = "SELECT * FROM `movimentacoes` WHERE `data_vencimento` = '{$data}'";
    $result = mysqli_query($conexao, $sql);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $payload = json_encode([
                'title' => 'Lembrete de pagamento',
                'body' => "Vencimento de {$row['descricao']}: {$mensagem}",
                'icon' =>  'https://www.armandosoares.com.br/jobs/public/a.jpg',
            ]);
            enviarNotificacoes($webPush, $subscriptions, $payload);
        }
    }
}


// Inicialização do WebPush
$auth = [
    'VAPID' => [
        'subject' => $email,
        'publicKey' => $publicKey,
        'privateKey' => $privateKey,
    ],
];
$webPush = new WebPush($auth);

// Carregar inscrições dos assinantes
$file = '../subscriptions.json';
$subscriptions = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// Data de hoje e amanhã
$hoje = date('Y-m-d');
$amanha = date('Y-m-d', strtotime('+1 day'));

// Enviar notificações para vencimentos de hoje
enviarNotificacoesPorData($conexao, $webPush, $subscriptions, $hoje, 'hoje');

// Enviar notificações para vencimentos de amanhã
enviarNotificacoesPorData($conexao, $webPush, $subscriptions, $amanha, 'amanhã');

// Fechar conexão com o banco de dados
mysqli_close($conexao);

// Encerrar script
return;
