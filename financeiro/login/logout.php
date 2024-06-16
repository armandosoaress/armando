<?php
session_save_path('sec');

session_start();
session_destroy();

header('Location: index.php');
