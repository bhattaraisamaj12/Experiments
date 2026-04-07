<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$country = $data['country'];
$gender = $data['gender'];
$age = $data['age'];
$categories = $data['categories'];

// Insert user
$sql = "INSERT INTO users (username, email, password, country, gender, age)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $username, $email, $password, $country, $gender, $age);

if ($stmt->execute()) {

    $user_id = $stmt->insert_id;

    // Insert categories
    foreach ($categories as $cat) {
        $cat_sql = "INSERT INTO categories (user_id, category) VALUES (?, ?)";
        $cat_stmt = $conn->prepare($cat_sql);
        $cat_stmt->bind_param("is", $user_id, $cat);
        $cat_stmt->execute();
    }

    echo "Registration successful and saved to database!";
} else {
    echo "Error saving data";
}
?>