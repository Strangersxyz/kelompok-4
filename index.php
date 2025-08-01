<?php 
include_once __DIR__ . '/config/baseURL.php';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- Tailwindcss + DaisyUI -->
     <link rel="stylesheet" href="<?= dist_url('css/output.css') ?>">
</head>
<body class="bg-gray-700 min-h-screen flex items-center justify-center">
    <h1 class="text-white text-bold text-7xl flex items-center justify-center">Tailwindcss</h1>
    <button class="btn btn-primary mx-10">Button DaisyUI</button>
</body>
</html>