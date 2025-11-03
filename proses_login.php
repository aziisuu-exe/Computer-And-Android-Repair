<?php
session_start();
require 'koneksi.php';

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $koneksi->prepare("SELECT iduser, username, password, nama FROM admin WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $admin_data = $result->fetch_assoc();

    if ($password === $admin_data['password']) {
        $_SESSION['admin_iduser'] = $admin_data['iduser'];
        $_SESSION['admin_username'] = $admin_data['username'];
        $_SESSION['admin_nama'] = $admin_data['nama']; 
        $_SESSION['is_logged_in'] = true;

        header("Location: dashboard_admin.php");
        exit();
    } else {
        header("Location: login.php?error=1");
        exit();
    }
} else {
    header("Location: login.php?error=1");
    exit();
}

$stmt->close();
$koneksi->close();
?>