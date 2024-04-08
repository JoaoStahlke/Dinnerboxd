<?php
include 'connect.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['checkRestaurant']) && $_POST['checkRestaurant']==true ) {
    $userName = $_POST['userName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $restaurantDocument = $_POST['restaurantDocument'];
    $phone = $_POST['phone'];
    $link = $_POST['link'];
    $cityAddress = $_POST['cityAddress'];
    $streetAddress = $_POST['streetAddress'];
    $districtAddress = $_POST['districtAddress'];
    $numberAddress = $_POST['numberAddress'];

    // Inserir dados na tabela User
    $sql1 = "INSERT INTO User (userName, email, password ) VALUES ('$userName', '$email', '$password')";
    if ($conn->query($sql1) === TRUE) {
        // Obter o ID inserido na tabela User
        $userId = $conn->insert_id;

        // Inserir dados na tabela restaurant
        $sql2 = "INSERT INTO restaurant (FK_userId, restaurantDocument, restaurantPhone, restaurantLink, cityAddress, streetAddress, districtAddress, numberAddress ) VALUES ('$userId', '$restaurantDocument', '$phone', '$link','$cityAddress','$streetAddress','$districtAddress','$numberAddress')";

        if ($conn->query($sql2) === TRUE) {
            $restaurantId = $conn->insert_id;
            $response = array('userId' => $userId, 'userName' => $userName, 'email' => $email, 'restaurantId' => $restaurantId, 'cnpj' => $restaurantDocument, 'phone' => $phone, 'address' => $cityAddress, "-" => $streetAddress);
            $_SESSION ['userName']=$userName;
            $_SESSION ['userId']=$userId;
            $_SESSION['checkRestaurant'] = $_POST['checkRestaurant'];
            $_SESSION['restaurantId'] = $restaurantId;
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


    $sql = "INSERT INTO User (userName, email, password ) VALUES ('$userName', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        $userId = $conn->insert_id;
        $response = array('id' => $userId, 'userName' => $userName, 'email' => $email, 'password' => $password);
        $_SESSION ['userName']=$userName;
        $_SESSION ['userId']=$userId;
        echo json_encode($response);

    } else {
        echo "Erro ao criar conta: " . $conn->error;
    }


}




$conn->close();
?>
