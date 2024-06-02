<?php
include 'connect.php';

session_start();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $restaurantModality= $_POST['restaurantModality'];
    $restaurantCategory= $_POST['restaurantCategory'];
   

    $userId =$_SESSION['userId'];

    $sql =" UPDATE Restaurant SET FK_modalityId='$restaurantModality',FK_categoryId='$restaurantCategory' WHERE FK_userId='$userId'
    ";
    
    if ($conn->query($sql) === TRUE) {
        $_SESSION ['restaurantCategory']=$restaurantCategory;
        $_SESSION ['restaurantModality']=$restaurantModality;
        echo json_encode("Categoria e modalidade atualizados");

    } else {
        echo "Erro: " . $conn->error;
    }


}

 
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['restaurant'])) {
    $restaurantId = $_GET['restaurant'];

    $sql = "SELECT RestaurantModality.modality, RestaurantCategory.category
            FROM Restaurant
            JOIN RestaurantModality ON Restaurant.FK_modalityId = RestaurantModality.modalityId
            JOIN RestaurantCategory ON Restaurant.FK_categoryId = RestaurantCategory.categoryId
            WHERE Restaurant.restaurantId = '$restaurantId';
            ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $type = $result->fetch_array();
        
        echo json_encode($type);
    } else {
        echo json_encode(FALSE);
    }




}

 
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['loadModality']) && $_GET['loadModality']==TRUE) {

    $sql =" SELECT modalityId, modality
            FROM RestaurantModality
            ";
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


if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['loadCategory']) && $_GET['loadCategory']==TRUE) {

    $sql =" SELECT categoryId, category
            FROM RestaurantCategory
            ";
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

$conn->close();
exit;
?>
