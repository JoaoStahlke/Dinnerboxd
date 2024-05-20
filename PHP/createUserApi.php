<?php
session_start();
session_destroy();
include 'connect.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $email = $_POST['email'];
    $sql = "SELECT email FROM User WHERE email ='$email' ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode(FALSE);
        $conn->close();
        exit;}
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['checkRestaurant']) && $_POST['checkRestaurant']==true ) {
    $userName = $_POST['userName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $universidade = $_POST['universidade'];
    $restaurantDocument = $_POST['restaurantDocument'];
    $phone = $_POST['phone'];
    $link = $_POST['link'];
    $cityAddress = $_POST['cityAddress'];
    $streetAddress = $_POST['streetAddress'];
    $districtAddress = $_POST['districtAddress'];
    $numberAddress = $_POST['numberAddress'];

    // Inserir dados na tabela User
    $sql1 = "INSERT INTO User (userName, email, password, universidade ) VALUES ('$userName', '$email', '$password', '$universidade')";
    if ($conn->query($sql1) === TRUE) {
        // Obter o ID inserido na tabela User
        $userId = $conn->insert_id;

        // Inserir dados na tabela restaurant
        $sql2 = "INSERT INTO Restaurant (FK_userId, restaurantDocument, restaurantPhone, restaurantLink, cityAddress, streetAddress, districtAddress, numberAddress ) 
        VALUES ('$userId', '$restaurantDocument', '$phone', '$link','$cityAddress','$streetAddress','$districtAddress','$numberAddress')";

        if ($conn->query($sql2) === TRUE) {
            $restaurantId = $conn->insert_id;
            $response = array('userId' => $userId, 'userName' => $userName, 'email' => $email,'universidade' => $universidade, 'restaurantId' => $restaurantId, 'cnpj' => $restaurantDocument, 'phone' => $phone, 'address' => $cityAddress, "-" => $streetAddress);

            echo json_encode($response);
        } else {
            echo "Erro ao criar conta de restaurante: " . $conn->error;
        }
    } else {
        echo "Erro ao criar conta de usuário: " . $conn->error;
    }
    
}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userName = $_POST['userName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $universidade = $_POST['universidade'];


    $sql = "INSERT INTO User (userName, email, password, universidade) VALUES ('$userName', '$email', '$password', '$universidade')";
    if ($conn->query($sql) === TRUE) {
        $userId = $conn->insert_id;
        $response = array('id' => $userId, 'userName' => $userName, 'email' => $email, 'password' => $password, 'universidade' => $universidade);
        echo json_encode($response);

    } else {
        echo "Erro ao criar conta: " . $conn->error;
    }


}




$conn->close();
exit;
?>
