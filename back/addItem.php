<?php

require_once './db.php';

header("Access-Control-Allow-Origin: *");

$todo = $_POST['todo_text'];

if (!empty($todo)) {
    mysqli_query($connection,
        "INSERT INTO `list` (`text`) VALUES ('" .$_POST['todo_text']. "')");
}