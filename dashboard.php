<?php
session_start();

if (!isset($_SESSION['is_logged_in']) || $_SESSION['is_logged_in'] !== true) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard Admin</title>
    <style>
        body { font-family: sans-serif; background: #2c2c2c; color: white; text-align: center; padding-top: 50px; }
        a { color: #ff5c5c; }
    </style>
</head>
<body>
    <h1>Selamat Datang, <?php echo htmlspecialchars($_SESSION['admin_nama']); ?>!</h1>
    <p>Anda berhasil login ke halaman admin.</p>
    <br>
    <a href="logout.php">Logout</a>
</body>
</html>