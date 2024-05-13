<?php
include 'connect.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'];
    $userId = $_SESSION['userId'];
    // Consulta SQL utilizando Prepared Statements
    $stmt = $conn->prepare("SELECT id FROM User WHERE id = ? AND password = ?");
    $stmt->bind_param("is", $userId, $password);
    $stmt->execute();
    $stmt->store_result();
    $directory = "../DATA/$userId";
    deleteDirectory($directory);

    if ($stmt->num_rows > 0) {
        $stmt = $conn->prepare("DELETE FROM User WHERE id = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            session_destroy();
            echo json_encode(TRUE);
        }
        else{
            echo json_encode(FALSE);
        }}
    else{
        echo "Senha incorreta";
    }

    $stmt->close();
}


function deleteDirectory($dir) {
    if (!file_exists($dir)) {
        return true;
    }

    if (!is_dir($dir)) {
        return unlink($dir);
    }

    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }

        if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
        }
    }

    return rmdir($dir);
}

$conn->close();
?>
