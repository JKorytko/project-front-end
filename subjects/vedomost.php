<?php
	include('../connection.php');
	header('Content-Type: application/json; charset=utf-8');
	mysql_query('SET NAMES utf8');
	$groupId=$_GET['groupId'];
	$subjectId=$_GET['subjectId'];
	$queryGroup = "Select * from groups where group_id=".$groupId ;
	$result=mysql_query($queryGroup );
	$rowGroup = mysql_fetch_array($result);
	$queryStudent = "Select * from students where group_id=".$groupId;
    $resultStudent = $result=mysql_query($queryStudent );
	$i=0;
	while($rowStudent = mysql_fetch_array($resultStudent))
	{
				$grades=array();	
				$querySubject = "Select * from subjects WHERE subject_id=".$subjectId;
				$resultSubject=mysql_query($querySubject);	
				$rowSubject= mysql_fetch_array($resultSubject);
				$queryModule = "select * from modules where subject_id=".$subjectId;
				$resultModule = mysql_query($queryModule);
				$res_col_mod=mysql_num_rows($resultModule);
				$j=0;
				for ($j=0; $j<$res_col_mod; $j++)
				{
					$rowModule= mysql_fetch_array($resultModule);
					$queryGrades = "select * from grades where group_module_id in (select group_module_id from groups_modules where group_id = ".$groupId." and module_id = ".$rowModule['module_id'].")
									and student_id = ".$rowStudent['student_id'];
					$resultGrades = mysql_query($queryGrades);
					$rowGrades = mysql_fetch_array($resultGrades); 
					$date=mysql_query("SELECT * FROM groups_modules WHERE group_id=".$groupId." AND module_id=".$rowModule['module_id']);
					$date_array=mysql_fetch_array($date);
					$grades[$j]=array('module_name'=>$rowModule['module_name'], 'grade'=>$rowGrades['grade'],'date'=>$date_array['dead_line']);
				}
				$queryLectors = "select * from lectors where lector_id in (SELECT lector_id FROM subjects WHERE subject_id=".$subjectId.")";
				$resultLectors = mysql_query($queryLectors);
				$rowLectors = mysql_fetch_array($resultLectors);
				if ((($_SESSION['id'])==($rowLectors['lector_id']))&&($_SESSION['role']==2))
				{
				$mas_student[$i]=array('name_student'=>$rowStudent['student_name'], 'group_name'=>$rowGroup['group_name'], 'subject_title'=>$rowSubject['subject_title'],'moduls'=>$grades,'lectors'=>$rowLectors['lector_name']);
				$a=array('extraProps'=>array('roleKey'=>2),'tableProps'=>$mas_student);
				}
				else
				{
					$mas_student=array();
					$a=array('extraProps'=>array('roleKey'=>1),'tableProps'=>$mas_student);
				}
				$i=$i+1;
	}
	echo json_encode ($a);
exit;
?>