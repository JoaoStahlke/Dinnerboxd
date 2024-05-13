<?php
include "connect.php";
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT Restaurant.restaurantId, User.userName, User.userImg
            FROM Restaurant JOIN User
            ON Restaurant.FK_UserId = User.id";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $response = array();
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        echo json_encode($response);
    } else {
        echo json_encode(FALSE);
    }
    
}
else{
    echo "Erro ao carregar a prateleira";
}
$conn->close();
?>