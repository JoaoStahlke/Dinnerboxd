<?php
include 'connect.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $email = $_POST['email'];
    $sql = "SELECT email FROM User WHERE email ='$email' ";
    $result = $conn->query($sql);
    if ($email == $_SESSION['email']){
        $response = array('email' => 2,'error'=> FALSE);
        echo json_encode($response);
        $conn->close();
        exit;}
    
    if ($result->num_rows > 0) {
        $response = array('email' => 1,'error'=> FALSE);
        echo json_encode($response);
        $conn->close();
        exit;}
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $userId = $_SESSION['userId'];

  
    // Consulta SQL utilizando Prepared Statements
    $stmt = $conn->prepare("UPDATE User SET email = ? WHERE id = ? AND password = ?");
    $stmt->bind_param("sis", $email, $userId, $password);
    $stmt->execute();

    // Verifica se a atualização foi bem-sucedida
    if ($stmt->affected_rows > 0) {
        // Atualiza a sessão com o novo email
        $_SESSION['email'] = $email;

        // Retorna o novo email como resposta JSON
        $response = array('email' => $email);
        echo json_encode($response);
    } else {
        // Se nenhum registro foi atualizado, ou seja, a senha não corresponde ao ID do usuário
        echo "Erro: Senha incorreta ou nenhum registro foi atualizado.";
    }

    $stmt->close();
}

$conn->close();
exit;
?>
