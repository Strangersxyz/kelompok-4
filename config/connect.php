<?php 

session_start();

$host = 'localhost';
$db = ''; // Sesuaikan dengan database
$user = 'root';
$pass = ''; // Isi kalo pake pw

// Buat koneksi MySQLi
$conn = new mysqli($host, $user, $pass, $db);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi Gagal: " . $conn->connect_error);
}

// Set charset
$conn->set_charset("utf8mb4");

?>