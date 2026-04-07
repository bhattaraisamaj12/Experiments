<?php
include "db.php";

$result = $conn->query("
    SELECT id, username, email, country, gender, age 
    FROM users 
    ORDER BY id DESC 
    LIMIT 1
");

$user = $result->fetch_assoc();

$user_id = $user['id'];


$cat_result = $conn->query("
    SELECT category FROM categories 
    WHERE user_id = $user_id
");

$categories = [];
while ($row = $cat_result->fetch_assoc()) {
    $categories[] = $row['category'];
}

$user['categories'] = $categories;

echo json_encode($user);
?>