<?php
include "connect.php";
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $restaurantId = $_POST["restaurantId"];
    $userId=$_SESSION['userId'];
    $text = $_POST['text'];
    $rating = $_POST['rating'];
    $date = date('d/m/Y');
    

    $sql = "INSERT INTO Review (FK_userId,FK_restaurantId, reviewText, reviewRating, reviewDate) 
    VALUES ('$userId', '$restaurantId', '$text', '$rating', '$date')";
    

    if ($conn->query($sql) === TRUE) {
        $reviewId = $conn->insert_id;
        $response = array('review' => $reviewId,'userId' => $userId, 'restaurantId' => $restaurantId, 'text' => $text, 'rating' => $rating, 'date' => $date, 'name'=>$_SESSION['userName']);
        echo json_encode($response);
    } else {
        $response = array('erro' => false);
        echo json_encode($response);
    }
    exit;
    
}
else{
    $response = array('erro' => false);
    echo json_encode($response);
    exit;
}

?>