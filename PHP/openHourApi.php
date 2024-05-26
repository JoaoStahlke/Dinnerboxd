<?php
include 'connect.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $open1= $_POST['open1'];
    $close1= $_POST['close1'];
    $open2= $_POST['open2'];
    $close2= $_POST['close2'];
    $open3= $_POST['open3'];
    $close3= $_POST['close3'];
    $open4= $_POST['open4'];
    $close4= $_POST['close4'];
    $open5= $_POST['open5'];
    $close5= $_POST['close5'];
    $open6= $_POST['open6'];
    $close6= $_POST['close6'];
    $open7= $_POST['open7'];
    $close7= $_POST['close7'];

    $restaurantId =$_SESSION['restaurantId'];

    $sql = "INSERT INTO RestaurantOpenHour (FK_restaurantId, hourOpen1, hourClose1, hourOpen2, hourClose2, hourOpen3, hourClose3, hourOpen4, hourClose4, hourOpen5, hourClose5, hourOpen6, hourClose6, hourOpen7, hourClose7) 
            VALUES ('$restaurantId', '$open1', '$close1', '$open2', '$close2', '$open3', '$close3', '$open4', '$close4', '$open5', '$close5', '$open6', '$close6', '$open7', '$close7')
            ON DUPLICATE KEY UPDATE 
                hourOpen1 = '$open1', hourClose1 = '$close1',
                hourOpen2 = '$open2', hourClose2 = '$close2',
                hourOpen3 = '$open3', hourClose3 = '$close3',
                hourOpen4 = '$open4', hourClose4 = '$close4',
                hourOpen5 = '$open5', hourClose5 = '$close5',
                hourOpen6 = '$open6', hourClose6 = '$close6',
                hourOpen7 = '$open7', hourClose7 = '$close7';
            ";

    if ($conn->query($sql) === TRUE) {

        $response = array("");
        echo json_encode($response);

    } else {
        echo "Erro: " . $conn->error;
    }



}

if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['restaurant'])) {
    $restaurantId = $_GET['restaurant'];

    $sql = "SELECT hourOpen1,hourClose1,hourOpen2, hourClose2,
            hourOpen3, hourClose3,hourOpen4, hourClose4,
            hourOpen5, hourClose5,hourOpen6, hourClose6,
            hourOpen7, hourClose7
            
            FROM RestaurantOpenHour

            WHERE FK_restaurantId = '$restaurantId'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        
        // $hours[] = [$open1, $close1, $open2, $close2, $open3, $close3, $open4, $close4, $open5, $close5, $open6, $close6, $open7, $close7];
        $hours = $result->fetch_array();
        echo json_encode($hours);
    } else {
        echo json_encode(FALSE);
    }



}

$conn->close();
exit;
?>