<?php

include_once '../api/conexao.php';

session_save_path('sec');

session_start();

if (isset($_SESSION['user'])) {
  $sql = "SELECT * FROM users WHERE user = ? AND senha = ?";
  $stmt = mysqli_prepare($conexao, $sql);
  mysqli_stmt_bind_param($stmt, "ss", $_SESSION['user'], $_SESSION['senha']);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);

  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $_SESSION['user'] = $row['user'];
    $_SESSION['senha'] = $row['senha'];
    header('Location: ../');
    exit;
  }
}
if (isset($_POST['u']) && isset($_POST['p'])) {
  $username = $_POST['u'];
  $password = $_POST['p'];

  $sql = "SELECT * FROM users WHERE user = ? AND senha = ?";
  $stmt = mysqli_prepare($conexao, $sql);
  mysqli_stmt_bind_param($stmt, "ss", $username, $password);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);

  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $_SESSION['user'] = $row['user'];
    $_SESSION['senha'] = $row['senha'];
    header('Location: ../');
    exit;
  } else {
    echo "<script>
    document.addEventListener('DOMContentLoaded', function() {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Usuário ou senha inválidos',
        showConfirmButton: false,
        timer: 1500
      });
    });
    </script>";
  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Login Form</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  <link rel="stylesheet" href="./style.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
</head>

<body>
  <div class="login">
    <h1>Login</h1>
    <form method="post">
      <input type="text" name="u" placeholder="Username" required="required" />
      <input type="password" name="p" placeholder="Password" required="required" />
      <button type="submit" class="btn btn-primary btn-block btn-large">Login</button>
    </form>
  </div>
</body>

</html>