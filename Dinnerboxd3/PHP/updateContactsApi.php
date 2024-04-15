<?php
include 'connect.php';

session_start();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $restaurantPhone= $_POST['restaurantPhone'];
    $restaurantLink= $_POST['restaurantLink'];

    $userId =$_SESSION['userId'];

    $sql = "UPDATE Restaurant SET restaurantLink='$restaurantLink',restaurantPhone='$restaurantPhone' WHERE FK_userId='$userId'";
    if ($conn->query($sql) === TRUE) {
        $_SESSION ['restaurantPhone']=$restaurantPhone;
        $_SESSION ['restaurantLink']=$restaurantLink;
        $response = array("");
        echo json_encode($response);

    } else {
        echo "Erro: " . $conn->error;
    }


}

$conn->close();
?>
