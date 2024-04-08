<?php
session_start();
header('Content-Type: application/json');
if (isset($_SESSION['restaurantCheck']) && $_SESSION['restaurantCheck']===true){
    echo json_encode(array(
        'userId' => $_SESSION['userId'],
        'userName' => $_SESSION['userName'],
        'email'=>$_SESSION['email'],
        'restaurantCheck'=> $_SESSION['restaurantCheck'],
        'restaurantDocument'=> $_SESSION['restaurantDocument'],
        'restaurantLink'=> $_SESSION['restaurantLink'],
        'restaurantPhone'=> $_SESSION['restaurantPhone'],
        'cityAddress'=> $_SESSION['cityAddress'],
        'streetAddress'=> $_SESSION['streetAddress'],
        'districtAddress'=> $_SESSION['districtAddress'],
        'numberAddress'=> $_SESSION['numberAddress'],

    ));
}
else{
    echo json_encode(array(
        'userId' => $_SESSION['userId'],
        'userName' => $_SESSION['userName'],
        'email'=>$_SESSION['email'],

    ));
}

?>