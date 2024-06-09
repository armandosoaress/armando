<?php
require_once '../../financeiro/api/conexao.php';

require __DIR__ . '/../vendor/autoload.php';

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;


$hoje = date('Y-m-d');
$amanha = date('Y-m-d', strtotime('+1 day'));
$sql = "SELECT * FROM `movimentacoes` WHERE `data_vencimento` = '{$amanha}' and `status` = '0' and `repetir` = '0'";
$result = mysqli_query($conexao, $sql);
if (mysqli_num_rows($result) > 0) {
    sendNotification('Oii Armando, você tem movimentações que vencem amanhã..', 'Notificação de movimentações');
}

$sql = "SELECT * FROM `movimentacoes` WHERE `repetir` = '1' and `data_vencimento` = '{$amanha}'";
$result = mysqli_query($conexao, $sql);
foreach ($result as $movimentacao) {
    $sqlm = "SELECT * FROM `movimentacoesrepetir`  where `id_movimentacao` = '{$movimentacao['id']}' order by `id` desc limit 1";
    $resultm = mysqli_query($conexao, $sqlm);
    $movimentacao_repetir = mysqli_fetch_assoc($resultm);
    if ($movimentacao_repetir['status'] == 0) {
        sendNotification('Oii Armando, você tem movimentações Reconcorrentes que vencem amanhã..', 'Notificação de movimentações');
    }
}


function sendNotification($msg, $title)
{


    $publicKey = 'BPieHtiuVRmd5wRdoJBQgowTaUOAaeoPo7fU4FIfp_CQUALhr_AvjL6zlnmfBd95F_b8pW19KMFuJyBuUxpH0uA';
    $privateKey = 'i2uv3Ei_9ZieGlRPIgtZCdm4Rc0cNiYzlSc9nkD3iMo';

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
        'title' => $title,
        'body' => $msg,
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
        $report->isSuccess();
    }
}
