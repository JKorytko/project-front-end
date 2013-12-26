<?php
include '../connection.php';
header('Content-Type: application/json; charset=utf-8');
mysql_query('SET NAMES utf8');
if (empty($_SESSION['role'])) {
    $mas_students = NULL;
    $user_groups = mysql_query("SELECT * FROM groups");
    while ($id_user_groups = mysql_fetch_array($user_groups)) {
        $mas_groups[] = array('id' => $id_user_groups['group_id'], 'name' => $id_user_groups['group_name']);
    }
    $subjects = mysql_query("SELECT * FROM subjects");
    while ($id_subjects = mysql_fetch_array($subjects)) {
        $mas_subjects[] = array('id' => $id_subjects['subject_id'], 'name' => $id_subjects['subject_title']);
    }
    $lectors = mysql_query("SELECT * FROM lectors");

    while ($id_user_lectors = mysql_fetch_array($lectors)) {
        $mas_lector[] = array('id' => $id_user_lectors['lector_id'], 'name' => $id_user_lectors['lector_name']);
    }
    $result = array(
        'groups' => $mas_groups,
        'students' => $mas_students,
        'subjects' => $mas_subjects,
        'lectors' => $mas_lector
    );
    echo json_encode($result);
} else {
    $user_groups = mysql_query("SELECT * FROM groups");
    while ($id_user_groups = mysql_fetch_array($user_groups)) {
        $mas_groups[] = array('id' => $id_user_groups['group_id'], 'name' => $id_user_groups['group_name']);
    }
    $user_students = mysql_query("SELECT * FROM students");
    while ($id_user_students = mysql_fetch_array($user_students)) {
        $mas_students[] = array('id' => $id_user_students['student_id'], 'name' => $id_user_students['student_name']);
    }

    $subjects = mysql_query("SELECT * FROM subjects");
    while ($id_subjects = mysql_fetch_array($subjects)) {
        $mas_subjects[] = array('id' => $id_subjects['subject_id'], 'name' => $id_subjects['subject_title']);
    }
    $lectors = mysql_query("SELECT * FROM lectors");

    while ($id_user_lectors = mysql_fetch_array($lectors)) {
        $mas_lector[] = array('id' => $id_user_lectors['lector_id'], 'name' => $id_user_lectors['lector_name']);
    }
    $result = array(
        'groups' => $mas_groups,
        'students' => $mas_students,
        'subjects' => $mas_subjects,
        'lectors' => $mas_lector
    );
    echo json_encode($result);
}
