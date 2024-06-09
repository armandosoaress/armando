<?php
require_once '../../financeiro/api/conexao.php';

require __DIR__ . '/../vendor/autoload.php';

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;

$publicKey = 'BPieHtiuVRmd5wRdoJBQgowTaUOAaeoPo7fU4FIfp_CQUALhr_AvjL6zlnmfBd95F_b8pW19KMFuJyBuUxpH0uA';
$privateKey = 'i2uv3Ei_9ZieGlRPIgtZCdm4Rc0cNiYzlSc9nkD3iMo';

$hoje = date('Y-m-d');
$amanha = date('Y-m-d', strtotime('+1 day'));
$sql = "SELECT * FROM `movimentacoes` WHERE `data_vencimento` = '{$amanha}'";
$result = mysqli_query($conexao, $sql);
if (mysqli_num_rows($result) > 0) {
    $auth = array(
        'VAPID' => array(
            'subject' => 'mailto:you@example.com', // Substitua pelo seu e-mail
            'publicKey' => $publicKey,
            'privateKey' => $privateKey,
        ),
    );
    $webPush = new WebPush($auth);
    $file = '../subscriptions.json';
    $subscriptions = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    $payload = json_encode([
        'title' => 'Notificação Periódica',
        'body' => 'Oi Armando, você tem movimentações que vencem amanhã.',
        'icon' =>  'https://www.armandosoares.com.br/jobs/public/a.jpg',
    ]);
    foreach ($subscriptions as $subscription) {
        $webPush->queueNotification(
            Subscription::create($subscription),
            $payload
        );
    }
    foreach ($webPush->flush() as $report) {
        $endpoint = $report->getRequest()->getUri()->__toString();

        if ($report->isSuccess()) {
            echo "[v] Mensagem enviada com sucesso para {$endpoint}.\n";
        } else {
            echo "[x] Falha ao enviar mensagem para {$endpoint}: {$report->getReason()}.\n";
        }
    }
}
