<?php
$conn = new mysqli("localhost", "root", "", "form_project");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>