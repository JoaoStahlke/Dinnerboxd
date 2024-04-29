<?php
include 'connect.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['restaurant'])) {
    $restaurantId = $_GET['restaurant'];

    $sql = "SELECT User.id,User.userName,review.reviewId,review.reviewText,review.reviewRating,review.reviewDate
    FROM Review 
    JOIN User ON Review.FK_userId = User.id
    JOIN Restaurant ON Review.FK_restaurantId = Restaurant.restaurantId
    WHERE Restaurant.restaurantId = $restaurantId";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $reviews = array();
        while ($row = $result->fetch_assoc()) {
            $reviews[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($reviews);
    } else {
        echo "Reviews não encontradas";
    }
$conn->close();
exit;
}?>