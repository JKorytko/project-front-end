<?php
include('../connection.php');
header('Content-Type: application/json; charset=utf-8');
mysql_query('SET NAMES utf8');
$lectorId = $_GET['lectorId'];
$lectorId = addslashes($lectorId);
$lectorId = htmlspecialchars($lectorId);
$lectorId = stripslashes($lectorId);
$query = "select * from lectors where lector_id=" . $lectorId;
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$querySubject = "SELECT subject_title, g.group_id, group_name, s.subject_id, semester FROM subjects as s join groups_subjects as
		gs on s.subject_id=gs.subject_id join groups as g on gs.group_id=g.group_id WHERE s.lector_id=" . $lectorId;
$resultSubject = mysql_query($querySubject);
if (empty($_SESSION['role'])) {
    while ($rowSubject = mysql_fetch_array($resultSubject)) {
        $obj_lectors = array();
    }
    $a = array('extraProps' => array('roleKey' => 1), 'tableProps' => $obj_lectors);
    echo json_encode($a);
}
if (($_SESSION['role'] == 2) && ($_SESSION['id'] == $lectorId)) {
    while ($rowSubject = mysql_fetch_array($resultSubject)) {
        $obj_lectors[] = array(
            'lector_id' => $lectorId,
            'subject_title' => $rowSubject['subject_title'],
            'group_name' => $rowSubject['group_name'],
            'semester' => $rowSubject['semester'],
            'group_id' => $rowSubject['group_id'],
            'subject_id' => $rowSubject['subject_id']
        );
    }
    $a = array('extraProps' => array('roleKey' => 2, 'lector_name' => $row['lector_name']), 'tableProps' => $obj_lectors);
    echo json_encode($a);
}
if (($_SESSION['role'] == 4)) {
    while ($rowSubject = mysql_fetch_array($resultSubject)) {
        $obj_lectors[] = array(
            'lector_id' => $lectorId,
            'subject_title' => $rowSubject['subject_title'],
            'group_name' => $rowSubject['group_name'],
            'semester' => $rowSubject['semester'],
            'group_id' => $rowSubject['group_id'],
            'subject_id' => $rowSubject['subject_id']
        );
    }
    $a = array('extraProps' => array('roleKey' => 4, 'lector_name' => $row['lector_name']), 'tableProps' => $obj_lectors);
    echo json_encode($a);
}