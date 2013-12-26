<?php
include('../connection.php');
header('Content-Type: application/json; charset=utf-8');
mysql_query('SET NAMES utf8');
$query1 = mysql_query("Select * from groups");
$test = mysql_num_rows($query1);
if (empty($_SESSION['role'])) {
    for ($i = 0; $i < $test; $i++) {
        $row_group_mas = mysql_fetch_array($query1);
        $object[$i] = array('group_name' => $row_group_mas['group_name'], 'specialty' => $row_group_mas['specialty']);
    }
    $return = array('extraProps' => array('roleKey' => 1,), 'tableProps' => $object);
    echo json_encode($return);
}
if (($_SESSION['role']) == 2) {
    for ($i = 0; $i < $test; $i++) {
        $row_group_mas = mysql_fetch_array($query1);
        $object[$i] = array('group_id' => $row_group_mas['group_id'], 'specialty' => $row_group_mas['specialty'], 'group_name' => $row_group_mas['group_name']);
    }
    $return = array('extraProps' => array('roleKey' => 2,), 'tableProps' => $object);
    echo json_encode($return);
}
if (($_SESSION['role']) == 3) {
    for ($i = 0; $i < $test; $i++) {
        $row_group_mas = mysql_fetch_array($query1);
        if (($_SESSION['group_id']) == $row_group_mas['group_id']) {
            $get_group_id = $row_group_mas['group_id'];
        } else {
            $get_group_id = '';
        }
        $object[$i] = array('group_id' => $get_group_id, 'specialty' => $row_group_mas['specialty'], 'group_name' => $row_group_mas['group_name']);
    }
    $return = array('extraProps' => array('roleKey' => 3,), 'tableProps' => $object);
    echo json_encode($return);
}
if (($_SESSION['role']) == 4) {
    for ($i = 0; $i < $test; $i++) {
        $row_group_mas = mysql_fetch_array($query1);
        $object[$i] = array('group_id' => $row_group_mas['group_id'], 'specialty' => $row_group_mas['specialty'], 'group_name' => $row_group_mas['group_name']);
    }
    $return = array('extraProps' => array('roleKey' => 3,), 'tableProps' => $object);
    echo json_encode($return);
}