<?php
include "connect.php";
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET["restaurant"]) && $_GET["restaurant"] != null) {
    $restaurantId = $_GET["restaurant"];
    $sql = "SELECT User.userName,Restaurant.restaurantPhone,Restaurant.restaurantLink,Restaurant.cityAddress,
    Restaurant.streetAddress,Restaurant.districtAddress,Restaurant.numberAddress
    FROM User JOIN Restaurant ON User.id = Restaurant.FK_userId WHERE Restaurant.restaurantId = $restaurantId";
    
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $restaurantPage = $result->fetch_assoc();
        header('Content-Type: application/json');
        echo json_encode($restaurantPage);
    } else {
        $response = array('pageNotFound' => false);
        echo json_encode($response);
    }
    exit;
    
}
else{
    $response = array('pageNotFound' => false);
    echo json_encode($response);
    exit;
}

?>