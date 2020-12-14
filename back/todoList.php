<?php

require_once './db.php';

header("Access-Control-Allow-Origin: *");

$list = mysqli_query($connection, 'SELECT * FROM list ORDER BY id');

while ($todo = mysqli_fetch_assoc($list)) {
    echo $todo['text'] . "\t";
}