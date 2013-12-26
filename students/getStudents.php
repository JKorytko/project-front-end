<?
include('../connection.php');
header('Content-Type: application/json; charset=utf-8');
mysql_query('SET NAMES utf8');
$query_students = mysql_query("Select * from students");
$count_students = mysql_num_rows($query_students);
if (empty($_SESSION['role'])) {
    for ($i = 0; $i < $count_students; $i++) {
        $obj_students = array();
    }
    $a = array('extraProps' => array('roleKey' => 1, 'tableProps' => $obj_students));
    echo json_encode($a);
}
if (($_SESSION['role']) == 2) {
    for ($i = 0; $i < $count_students; $i++) {
        $row_students_mas = mysql_fetch_array($query_students);
        $query2_students = mysql_query("select group_name from groups where group_id=" . $row_students_mas['group_id']);
        $group_students = mysql_fetch_array($query2_students);
        $obj_students[$i] = array(
            'student_name' => $row_students_mas['student_name'],
            'group_name' => $group_students['group_name'],
            'student_notes' => $row_students_mas['student_notes']
        );
    }
    $a = array('extraProps' => array('roleKey' => 2), 'tableProps' => $obj_students);
    echo json_encode($a);
}
if (($_SESSION['role']) == 3) {
    $group_id = $_SESSION['group_id'];
    $query_students_1 = mysql_query("Select * from students WHERE group_id=" . $group_id);
    while ($row_students_mas_1 = mysql_fetch_array($query_students_1)) {
        $query2_students = mysql_query(
            "select group_name from groups where group_id=" . $row_students_mas_1['group_id']
        );
        $group_students = mysql_fetch_array($query2_students);
        if (($_SESSION['student_id']) == $row_students_mas_1['student_id']) {
            $row_students_mas_id = $row_students_mas_1['student_id'];
        } else {
            $row_students_mas_id = '';
        }
        $obj_students[] = array(
            'student_id' => $row_students_mas_id,
            'group_id' => $row_students_mas_1['group_id'],
            'student_name' => $row_students_mas_1['student_name'],
            'group_name' => $group_students['group_name']
        );
    }
    $a = array('extraProps' => array('roleKey' => 3), 'tableProps' => $obj_students);
    echo json_encode($a);
}
if (($_SESSION['role']) == 4) {
    $query_students_1 = mysql_query("Select * from students");
    while ($row_students_mas_1 = mysql_fetch_array($query_students_1)) {
        $query2_students = mysql_query(
            "select group_name from groups where group_id=" . $row_students_mas_1['group_id']
        );
        $group_students = mysql_fetch_array($query2_students);
        $obj_students[] = array(
            'student_id' => $row_students_mas_1['student_id'],
            'group_id' => $row_students_mas_1['group_id'],
            'student_name' => $row_students_mas_1['student_name'],
            'group_name' => $group_students['group_name'],
            'student_notes' => $row_students_mas_1['student_notes'],
            'student_email' => $row_students_mas_1['student_email']
        );
    }
    $a = array('extraProps' => array('roleKey' => 4), 'tableProps' => $obj_students);
    echo json_encode($a);
}