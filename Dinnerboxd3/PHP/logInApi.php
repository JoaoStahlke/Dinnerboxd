<?php
include 'connect.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    //forma segura de manipular os dados
    // Prepare a query
    $stmt = $conn->prepare("SELECT id, userName, email FROM User WHERE email = ? AND password = ?");
    // Bind parameters
    $stmt->bind_param("ss", $email, $password);
    // Execute the query
    $stmt->execute();
    // Get the result
    $result = $stmt->get_result();

    // Verificar se a consulta retornou algum resultado
    if ($result->num_rows > 0) {
        // Obter o primeiro resultado
        $row = $result->fetch_assoc();
        $_SESSION['userId'] = $row["id"];
        $_SESSION['userName'] = $row["userName"];
        $_SESSION['email'] = $row["email"]; 


        $sql = "SELECT restaurantDocument, restaurantPhone, restaurantLink, cityAddress, streetAddress, districtAddress, numberAddress FROM Restaurant WHERE FK_userId = '" . $_SESSION['userId'] . "'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $_SESSION['restaurantCheck'] = true; 
            $_SESSION['restaurantDocument'] = $row["restaurantDocument"];
            $_SESSION['restaurantPhone'] = $row["restaurantPhone"];
            $_SESSION['restaurantLink'] = $row["restaurantLink"]; 
            $_SESSION['cityAddress'] = $row["cityAddress"]; 
            $_SESSION['streetAddress'] = $row["streetAddress"];
            $_SESSION['districtAddress'] = $row["districtAddress"];
            $_SESSION['numberAddress'] = $row["numberAddress"]; 
            
        }
 
        $response = array('id' => $_SESSION['userId'], 'userName' => $_SESSION['userName']);
        echo json_encode($response);
        
    } else {
        echo json_encode(false);
    }
}

$conn->close();
?>