<?php
include "connect.php";
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create'])) {
    $restaurantId = $_POST["restaurantId"];
    $userId=$_SESSION['userId'];
    $text = $_POST['text'];
    $rating = $_POST['rating'];
    $date = date('d/m/Y');
    

    $sql = "INSERT INTO Review (FK_userId,FK_restaurantId, reviewText, reviewRating, reviewDate) 
    VALUES ('$userId', '$restaurantId', '$text', '$rating', '$date')";
    

    if ($conn->query($sql) === TRUE) {
        $reviewId = $conn->insert_id;
        $response = array('reviewId' => $reviewId,'userId' => $userId, 'restaurantId' => $restaurantId, 'text' => $text, 'rating' => $rating, 'date' => $date, 'name'=>$_SESSION['userName']);
        echo json_encode($response);
    } else {
        $response = array('erro' => false);
        echo json_encode($response);
    }

    
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {
    
    $reviewId=$_POST['reviewId'];

    $sql = "DELETE FROM Review WHERE reviewId = $reviewId";

    if ($conn->query($sql) === TRUE) {
        $response = array('message' => 'Avaliação excluída com sucesso');
        echo json_encode($response);
    } else {
        echo "Erro ao excluir avaliação: " . $conn->error;
    }
}



if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update'])) {

    $userId=$_SESSION['userId'];
    $reviewId=$_POST['reviewId'];
    $rating =$_POST['rating'];
    $text = $_POST['text'];
    $sql = "UPDATE Review 
            JOIN User on User.id='$userId'
            SET reviewText='$text',reviewRating='$rating' 
            WHERE reviewId='$reviewId'";

    if ($conn->query($sql) === TRUE) {
        $response = array('message' => 'Avaliação alterada com sucesso');
        echo json_encode($response);
    } else {
        echo "Erro ao alterar avaliação: " . $conn->error;
    }
}

$conn->close();
exit;
?>