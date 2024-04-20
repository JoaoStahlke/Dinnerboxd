<?php
$servername = "localhost";
$username = "123";
$password = "123";
$dbname = "dinnerboxd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}
?>