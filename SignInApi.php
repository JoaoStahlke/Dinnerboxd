<?php
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $livroId = $_GET['id'];


    $sql = "SELECT * FROM livros WHERE id = $livroId";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $livroDetalhes = $result->fetch_assoc();
        header('Content-Type: application/json');
        echo json_encode($livroDetalhes);
    } else {
        echo "Livro não encontrado";
    }
    exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userName = $_POST['userName'];
    $email = $_POST['email'];
    $password = $_POST['password'];


    $sql = "INSERT INTO User (userName, email, password ) VALUES ('$userName', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        $userId = $conn->insert_id;
        $response = array('id' => $userId, 'userName' => $userName, 'email' => $email, 'password' => $password);
        echo json_encode($response);
    } else {
        echo "Erro ao criar conta: " . $conn->error;
    }
}

$conn->close();
?>
