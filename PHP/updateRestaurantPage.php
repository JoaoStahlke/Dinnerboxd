<?php
include 'connect.php';

session_start();


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST["aboutUs"])) {
    $restaurantId=$_SESSION['restaurantId'];
    $restaurantText= $_POST['text'];

    $sql = "UPDATE Restaurant SET restaurantText='$restaurantText' WHERE restaurantId='$restaurantId'";

    if ($conn->query($sql) === TRUE) {
        $response = array('text' => $restaurantText);
        echo json_encode($response);

    } else {
        echo "Erro: " . $conn->error;
    }


}

$conn->close();
exit;
?>
