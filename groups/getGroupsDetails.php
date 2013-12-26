<?php
include('../connection.php');
header('Content-Type: application/json; charset=utf-8');
mysql_query('SET NAMES utf8');
$groupId = $_GET['groupId'];
$getGroups_details_query = mysql_query("select * from groups where group_id=" . $groupId);
$getGroups_details_row_name = mysql_fetch_array($getGroups_details_query);
$getGroups_details_queryStudent = mysql_query("Select * from students where group_id=" . $groupId);
$getGroups_details_count = mysql_num_rows($getGroups_details_queryStudent);
if (empty($_SESSION['role'])) {
    for ($i = 0; $i < $getGroups_details_count; $i++) {
        $obj_students = array();
    }
    $a = array('extraProps' => array('roleKey' => 1), 'tableProps' => $obj_students);
    echo json_encode($a);
}
if (($_SESSION['role']) == 2) {
    for ($i = 0; $i < $getGroups_details_count; $i++) {
        $getGroups_details_row = mysql_fetch_array($getGroups_details_queryStudent);
        $getGroups_details_obj[$i] = array('student_name' => $getGroups_details_row['student_name'], 'student_notes' => $getGroups_details_row['student_notes']);
    }
    $return = array('extraProps' => array('roleKey' => 2), 'tableProps' => $getGroups_details_obj);
    echo json_encode($return);
}
if (($_SESSION['role']) == 3) {
    for ($i = 0; $i < $getGroups_details_count; $i++) {
        $getGroups_details_row = mysql_fetch_array($getGroups_details_queryStudent);
        if (($_SESSION['student_id']) == $getGroups_details_row['student_id']) {
            $getGroups_details_row_id = $getGroups_details_row['student_id'];
        } else {
            $getGroups_details_row_id = '';
        }
        $getGroups_details_obj[$i] = array('id_student' => $getGroups_details_row_id, 'student_name' => $getGroups_details_row['student_name'], 'student_notes' => $getGroups_details_row['student_notes'], 'group_id' => $groupId);
    }
    $return = array('extraProps' => array('roleKey' => 3), 'tableProps' => $getGroups_details_obj);
    echo json_encode($return);
}
if (($_SESSION['role']) == 4) {
    for ($i = 0; $i < $getGroups_details_count; $i++) {
        $getGroups_details_row = mysql_fetch_array($getGroups_details_queryStudent);
        $getGroups_details_obj[$i] = array('id_student' => $getGroups_details_row['student_id'], 'student_name' => $getGroups_details_row['student_name'], 'student_notes' => $getGroups_details_row['student_notes'], 'group_id' => $groupId);
    }
    $return = array('extraProps' => array('roleKey' => 4), 'tableProps' => $getGroups_details_obj);
    echo json_encode($return);
}