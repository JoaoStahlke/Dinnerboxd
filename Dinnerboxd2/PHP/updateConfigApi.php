<?php
include 'connect.php';

session_start();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userName = $_POST['userName'];
    $userId =$_SESSION['userId'];

    $sql = "UPDATE User SET userName='$userName' WHERE id='$userId'";
    if ($conn->query($sql) === TRUE) {
        $_SESSION ['userName']=$userName;
        $response = array('userName' => $userName);
        echo json_encode($response);

    } else {
        echo "Erro: " . $conn->error;
    }


}

$conn->close();
?>
