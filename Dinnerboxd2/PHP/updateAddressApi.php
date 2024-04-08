<?php
include 'connect.php';

session_start();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cityAddress= $_POST['cityAddress'];
    $streetAddress= $_POST['streetAddress'];
    $districtAddress= $_POST['districtAddress'];
    $numberAddress= $_POST['numberAddress'];

    $userId =$_SESSION['userId'];

    $sql = "UPDATE Restaurant SET cityAddress='$cityAddress',streetAddress='$streetAddress',districtAddress='$districtAddress',numberAddress='$numberAddress' WHERE FK_userId='$userId'";
    if ($conn->query($sql) === TRUE) {
        $_SESSION ['cityAddress']=$cityAddress;
        $_SESSION ['streetAddress']=$streetAddress;
        $_SESSION ['districtAddress']=$districtAddress;
        $_SESSION ['numberAddress']=$numberAddress;
        $response = array('cityAddress' => $cityAddress);
        echo json_encode($response);

    } else {
        echo "Erro: " . $conn->error;
    }


}

$conn->close();
?>
