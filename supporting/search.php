<?php
include('../connection.php');
header('Content-Type: application/json; charset=utf-8');
mysql_query('SET NAMES utf8');
session_start();
$searchWord = $_GET['searchWord'];
$tableKey = $_GET['tableKey'];
$searchWord = addslashes($searchWord);
$searchWord = htmlspecialchars($searchWord);
$searchWord = stripslashes($searchWord);
if (empty($_SESSION['role'])) {
    if ($tableKey == 1) {
        $query_1 = mysql_query("SELECT * FROM groups WHERE group_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $obj_lectors[] = array('group_name' => $row_1['group_name'], 'specialty' => $row_1['specialty']);
        }
    }
    if ($tableKey == 2) {
        $query_1 = mysql_query("SELECT * FROM students WHERE student_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $query2 = "select group_name from groups where group_id=" . $row_1['group_id'];
            $resultgroups = mysql_query($query2);
            $rowgroup = mysql_fetch_array($resultgroups);
            $obj_lectors[] = array();
        }
    }
    if ($tableKey == 3) {
        $query_1 = mysql_query("SELECT * FROM subjects WHERE subject_title LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $query2 = "select lector_name from lectors where lector_id=" . $row_1['lector_id'];
            $resultgroups = mysql_query($query2);
            $rowgroup = mysql_fetch_array($resultgroups);
            $obj_lectors[] = array(
                'subject_title' => $row_1['subject_title'],
                'subject_credits' => $row_1['subject_credits'],
                'lector_name' => $rowgroup['lector_name']
            );
        }
    }
    if ($tableKey == 4) {
        $query_1 = mysql_query("SELECT * FROM lectors WHERE lector_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $obj_lectors[] = array(
                'lector_name' => $row_1['lector_name'],
                'lector_position' => $row_1['lector_position']
            );
        }
    }
    $a = array('extraProps' => array('roleKey' => 1), 'tableProps' => $obj_lectors);
}
if (($_SESSION['role']) == 2) {
    if ($tableKey == 1) {
        $query_1 = mysql_query("SELECT * FROM groups WHERE group_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $obj_lectors[] = array(
                'group_id' => $row_1['group_id'],
                'group_name' => $row_1['group_name'],
                'specialty' => $row_1['specialty']
            );
        }
    }
    if ($tableKey == 2) {
        $query_1 = mysql_query("SELECT * FROM students WHERE student_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $query_1 = mysql_query("SELECT * FROM students WHERE student_name LIKE '%$searchWord%'");
            while ($row_1 = mysql_fetch_array($query_1)) {
                $query2 = "select group_name from groups where group_id=" . $row_1['group_id'];
                $resultgroups = mysql_query($query2);
                $rowgroup = mysql_fetch_array($resultgroups);
                $obj_lectors[] = array(
                    'group_id' => $row_1['group_id'],
                    'student_id' => $row_1['student_id'],
                    'student_name' => $row_1['student_name'],
                    'group_name' => $rowgroup['group_name']
                );
            }
        }
    }
    if ($tableKey == 3) {
        $query_1 = mysql_query("SELECT * FROM subjects WHERE subject_title LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $query2 = "select lector_name from lectors where lector_id=" . $row_1['lector_id'];
            $resultgroups = mysql_query($query2);
            $rowgroup = mysql_fetch_array($resultgroups);
            if (($row_1['lector_id']) == $_SESSION['id']) {
                $subject_id = $row_1['subject_id'];
            } else {
                $subject_id = '';
            }
            $obj_lectors[] = array(
                'subject_id' => $subject_id,
                'subject_title' => $row_1['subject_title'],
                'subject_credits' => $row_1['subject_credits'],
                'lector_name' => $rowgroup['lector_name']
            );
        }
    }
    if ($tableKey == 4) {
        $query_1 = mysql_query("SELECT * FROM lectors WHERE lector_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            if ($row_1['lector_id'] == $_SESSION['id']) {
                $id_lector = $row_1['lector_id'];
            } else {
                $id_lector = '';
            }
            $obj_lectors[] = array(
                'lector_id' => $id_lector,
                'lector_name' => $row_1['lector_name'],
                'lector_position' => $row_1['lector_position'],
                'lector_email' => $row_1['lector_email']
            );
        }
    }
    $a = array('extraProps' => array('roleKey' => 2), 'tableProps' => $obj_lectors);
}
if (($_SESSION['role']) == 3) {
    if ($tableKey == 1) {

        $query_1 = mysql_query("SELECT * FROM groups WHERE group_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            if (($_SESSION['group_id']) == $row_1['group_id']) {
                $group_id = $row_1['group_id'];
            } else {
                $group_id = '';
            }
            $obj_lectors[] = array(
                'group_id' => $group_id,
                'group_name' => $row_1['group_name'],
                'specialty' => $row_1['specialty']
            );
        }

    }
    if ($tableKey == 2) {
        $groupid = $_SESSION['group_id'];
        $query_1 = mysql_query(
            "SELECT * FROM students WHERE group_id='$groupid' AND student_name LIKE '%$searchWord%'"
        );
        while ($row_1 = mysql_fetch_array($query_1)) {
            $query2 = "select group_name from groups where group_id=" . $row_1['group_id'];
            $resultgroups = mysql_query($query2);
            $rowgroup = mysql_fetch_array($resultgroups);
            if ((($_SESSION['student_id']) == $row_1['student_id'])) {
                $student_id = $row_1['student_id'];
            } elseif (($row_1['group_id']) == ($_SESSION['group_id'])) {
                $student_id = '';
            }
            $obj_lectors[] = array(
                'student_id' => $student_id,
                'student_name' => $row_1['student_name'],
                'group_name' => $rowgroup['group_name']
            );
        }
    }
    if ($tableKey == 3) {
        $query_1 = mysql_query("SELECT * FROM subjects WHERE subject_title LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $query2 = "select lector_name from lectors where lector_id=" . $row_1['lector_id'];
            $resultgroups = mysql_query($query2);
            $rowgroup = mysql_fetch_array($resultgroups);
            $obj_lectors[] = array(
                'subject_title' => $row_1['subject_title'],
                'subject_credits' => $row_1['subject_credits'],
                'lector_name' => $rowgroup['lector_name']
            );
        }
    }
    if ($tableKey == 4) {
        $query_1 = mysql_query("SELECT * FROM lectors WHERE lector_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $obj_lectors[] = array(
                'lector_name' => $row_1['lector_name'],
                'lector_position' => $row_1['lector_position']
            );
        }
    }
    $a = array('extraProps' => array('roleKey' => 3), 'tableProps' => $obj_lectors);
}
if (($_SESSION['role']) == 4) {
    if ($tableKey == 1) {
        $query_1 = mysql_query("SELECT * FROM groups WHERE group_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $obj_lectors[] = array(
                'group_id' => $row_1['group_id'],
                'group_name' => $row_1['group_name'],
                'specialty' => $row_1['specialty']
            );
        }
    }
    if ($tableKey == 2) {
        $query_1 = mysql_query("SELECT * FROM students WHERE student_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $query_1 = mysql_query("SELECT * FROM students WHERE student_name LIKE '%$searchWord%'");
            while ($row_1 = mysql_fetch_array($query_1)) {
                $query2 = "select group_name from groups where group_id=" . $row_1['group_id'];
                $resultgroups = mysql_query($query2);
                $rowgroup = mysql_fetch_array($resultgroups);
                $obj_lectors[] = array(
                    'group_id' => $row_1['group_id'],
                    'student_id' => $row_1['student_id'],
                    'student_name' => $row_1['student_name'],
                    'group_name' => $rowgroup['group_name'],
                    'student_notes' => $row_1['student_notes'],
                    'student_email' => $row_1['student_email']
                );
            }
        }
    }
    if ($tableKey == 3) {
        $query_1 = mysql_query("SELECT * FROM subjects WHERE subject_title LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $query2 = "select lector_name from lectors where lector_id=" . $row_1['lector_id'];
            $resultgroups = mysql_query($query2);
            $rowgroup = mysql_fetch_array($resultgroups);
            $obj_lectors[] = array(
                'subject_id' => $row_1['subject_id'],
                'subject_title' => $row_1['subject_title'],
                'subject_credits' => $row_1['subject_credits'],
                'lector_name' => $rowgroup['lector_name']
            );
        }
    }
    if ($tableKey == 4) {
        $query_1 = mysql_query("SELECT * FROM lectors WHERE lector_name LIKE '%$searchWord%'");
        while ($row_1 = mysql_fetch_array($query_1)) {
            $obj_lectors[] = array(
                'lector_id' => $row_1['lector_id'],
                'lector_name' => $row_1['lector_name'],
                'lector_position' => $row_1['lector_position'],
                'lector_email' => $row_1['lector_email']
            );
        }
    }
    $a = array('extraProps' => array('roleKey' => 4), 'tableProps' => $obj_lectors);
}

echo json_encode($a);

