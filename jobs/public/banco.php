<?php
require_once '../../financeiro/api/conexao.php';

// Nome do arquivo de backup
$backup_file = 'bakcups/backup_' . date('Y-m-d-H-i-s') . '.sql';

// Iniciar a saída de dados
$handle = fopen($backup_file, 'w');

// Checar se a abertura do arquivo foi bem-sucedida
if ($handle === false) {
    die("Não foi possível criar o arquivo de backup.");
}

// Obter estrutura do banco de dados
$res = mysqli_query($conexao, 'SHOW TABLES');
while ($row = mysqli_fetch_row($res)) {
    fwrite($handle, "DROP TABLE IF EXISTS `$row[0]`;\n");
    $res2 = mysqli_query($conexao, "SHOW CREATE TABLE `$row[0]`");
    $row2 = mysqli_fetch_row($res2);
    fwrite($handle, $row2[1] . ";\n\n");
}

// Obter dados do banco de dados
$res = mysqli_query($conexao, 'SHOW TABLES');
while ($row = mysqli_fetch_row($res)) {
    $table = $row[0];
    $res2 = mysqli_query($conexao, "SELECT * FROM `$table`");
    while ($row2 = mysqli_fetch_row($res2)) {
        $sql = "INSERT INTO `$table` VALUES (";
        for ($i = 0; $i < count($row2); $i++) {
            $row2[$i] = addslashes($row2[$i]);
            $row2[$i] = preg_replace("/\n/", "\\n", $row2[$i]);
            if (isset($row2[$i])) {
                $sql .= '"' . $row2[$i] . '"';
            } else {
                $sql .= '""';
            }
            if ($i < count($row2) - 1) {
                $sql .= ',';
            }
        }
        $sql .= ");\n";
        fwrite($handle, $sql);
    }
    fwrite($handle, "\n");
}

// Fechar a conexão e o arquivo
fclose($handle);
mysqli_close($conexao);

echo "Backup criado com sucesso em $backup_file";
