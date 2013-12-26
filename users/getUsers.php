<?php
include '../connection.php';
header('Content-Type: application/json; charset=utf-8');
mysql_query('SET NAMES utf8');
session_start();
$login = $_GET['login'];
$password = $_GET['password'];
$user = mysql_query("SELECT * FROM lectors WHERE lector_login='$login' AND lector_password='$password'");
$id_user = mysql_fetch_array($user);
if (!empty($id_user['lector_id'])) //РАСПРЕДЕЛЕНИЕ ПРАВ ДОСТУПА
{
    $_SESSION['password'] = $password;
    $_SESSION['login'] = $login;
    $_SESSION['role'] = $id_user['role'];
    $_SESSION['id'] = $id_user['lector_id'];
    $user = array('user_id' => $id_user['lector_id'], 'login' => $login);
    print_r(json_encode($user));
}
$student_user = mysql_query("SELECT * FROM students WHERE (student_email='$login' OR parent_email='$login') AND pwd='$password'");
$student_id_user = mysql_fetch_array($student_user);
if (!empty($student_id_user['student_id'])) {
    $_SESSION['password'] = $password;
    $_SESSION['login'] = $login;
    $_SESSION['role'] = $student_id_user['role'];
    $_SESSION['group_id'] = $student_id_user['group_id'];
    $_SESSION['student_id'] = $student_id_user['student_id'];
    $user = array('user_id' => $student_id_user['student_id'], 'login' => $login);
    print_r(json_encode($user));
}
if (empty($student_id_user['student_id']) && empty($id_user['lector_id'])) {
    $user = array('user_id' => NULL, 'login' => NULL);
    print_r(json_encode($user));
}	

