<?php
session_start();
header("Content-Type: application/json");

// INIT
if (!isset($_SESSION['history'])) {
    $_SESSION['history'] = [];
}

if (isset($_GET['reset'])) {
    $_SESSION['history'] = [];
    echo json_encode(["history" => []]);
    exit();
}

// CLEAR BUTTON
if (isset($_GET['clear'])) {
    $_SESSION['history'] = [];
    echo json_encode(["history" => []]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(["history" => $_SESSION['history']]);
    exit();
}

// CALCULATE
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $expression = $_POST['expression'];

    if (!preg_match('/^[0-9+\-*\/(). ]+$/', $expression)) {
        echo json_encode([
            "result" => "Invalid",
            "history" => $_SESSION['history']
        ]);
        exit();
    }

    try {
        $result = eval("return $expression;");
        $_SESSION['history'][] = "$expression = $result";

        echo json_encode([
            "result" => $result,
            "history" => $_SESSION['history']
        ]);
    } catch (Throwable $e) {
        echo json_encode([
            "result" => "Error",
            "history" => $_SESSION['history']
        ]);
    }

    exit();
}