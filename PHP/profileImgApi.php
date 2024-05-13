<?php
include 'connect.php';
session_start();

if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST["image"])) {
 
    $userId = $_SESSION['userId'];
    $directory = "../DATA/$userId/";
    
    if (!file_exists($directory)) {
        mkdir($directory, 0777, true);
    }
    $originalFileName=$_FILES["file"]["name"];
    $path = $directory.$originalFileName;
    
    
    $type = strtolower(pathinfo($path,PATHINFO_EXTENSION));
    if($type != "jpg" && $type != "png" && $type != "jpeg") {
        $response = array('type' => 1, 'error'=> FALSE);
        echo json_encode($response);
        $conn->close();
        exit();
    }

    $newFileName = 'profileImg.jpg';
    $path = $directory.$newFileName;
    
    
    if(move_uploaded_file($_FILES["file"]["tmp_name"], $path)) {
        
        $sql = "UPDATE User SET userImg = '$path' WHERE id='$userId' ";

        if ($conn->query($sql) === TRUE) {
            $_SESSION['userImg']=$path;
            $response = array('path' => $path);
            echo json_encode($response);
        } else {
            $response = array('type' => 2, 'error'=> FALSE);
            echo json_encode($response);
        }

    } else {
        $response = array('type' => 2, 'error'=> FALSE);
        echo json_encode($response);
    }
}
$conn->close();
exit;
?>
