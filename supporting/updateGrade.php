<?php
include '../connection.php';
header('Content-Type: application/json; charset=utf-8');
mysql_query('SET NAMES utf8');
session_start();
if (($_SESSION['role'] == 4) || ($_SESSION['role'] == 2)) {
    $grade = json_decode($GLOBALS['HTTP_RAW_POST_DATA'], true); // но тут показывает что есть необработанный потс запрос
    for ($i = 0; $i < count($grade['grades']); $i++) {
        $group_id = $grade['grades'][$i]['groupID'];
        $module_id = $grade['grades'][$i]['moduleID'];
        $studend_id = $grade['grades'][$i]['studendID'];
        $grades = $grade['grades'][$i]['grade'];
        $groups_modules = mysql_fetch_array(
            mysql_query("SELECT group_module_id FROM groups_modules WHERE group_id='$group_id' AND module_id='$module_id'")
        );
        $temp = $groups_modules['group_module_id'];
        $update_grade = mysql_query(
            "UPDATE grades SET grade='$grades' WHERE student_id='$studend_id' AND group_module_id='$temp'"
        );
    }
    $grade1 = (object)array();
    echo json_encode($grade1);
}
