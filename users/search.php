<?php
   include('../connection.php');
   header('Content-Type: application/json; charset=utf-8');
   mysql_query('SET NAMES utf8');
	$searchWord = $_GET['searchWord'];
	$tableKey = $_GET['tableKey'];
	$searchWord = addslashes($searchWord);
	$searchWord = htmlspecialchars($searchWord);
	$searchWord = stripslashes($searchWord);
	if (empty($_SESSION['role']))
		if ($tableKey==1)
		{	
			$query_1 = mysql_query("SELECT * FROM groups WHERE group_name LIKE '%$searchWord%'");
			while($row_1=mysql_fetch_array($query_1))
			{
				$obj_lectors[]=array('group_name'=>$row_1['group_name']);
			}
		}
		if ($tableKey==2)
		{	
			$query_1 = mysql_query("SELECT * FROM students WHERE student_name LIKE '%$searchWord%'");
			while($row_1=mysql_fetch_array($query_1))
			{
				$query2="select group_name from groups where group_id=".$row_1['group_id'];
				$resultgroups=mysql_query($query2);
				$rowgroup=mysql_fetch_array($resultgroups);
				$obj_lectors[]=array('student_name'=>$row_1['student_name'],'group_name'=>$rowgroup['group_name']);
			}
		}
		if ($tableKey==4)
		{	
			$query_1 = mysql_query("SELECT * FROM lectors WHERE lector_name LIKE '%$searchWord%'");
			while($row_1=mysql_fetch_array($query_1))
			{
			$obj_lectors[]=array('lector_name'=>$row_1['lector_name'],'lector_position'=>$row_1['lector_position']);
			}
		}
		$a=array('extraProps'=>array('roleKey'=>1),'tableProps'=>$obj_lectors);
	}
	if (($_SESSION['role'])==2)
	{
		if ($tableKey==1)
		{	
			$query_1 = mysql_query("SELECT * FROM groups WHERE group_name LIKE '%$searchWord%'");
			while($row_1=mysql_fetch_array($query_1))
			{
				$obj_lectors[]=array('group_id',=>$row_1['group_id'],'group_name'=>$row_1['group_name']);
			}
		}
		if ($tableKey==2)
		{	
			$query_1 = mysql_query("SELECT * FROM students WHERE student_name LIKE '%$searchWord%'");
			while($row_1=mysql_fetch_array($query_1))
			{
				$query_1 = mysql_query("SELECT * FROM students WHERE student_name LIKE '%$searchWord%'");
			while($row_1=mysql_fetch_array($query_1))
			{
				$query2="select group_name from groups where group_id=".$row_1['group_id'];
				$resultgroups=mysql_query($query2);
				$rowgroup=mysql_fetch_array($resultgroups);
				$obj_lectors[]=array('student_name'=>$row_1['student_name'],'group_name'=>$rowgroup['group_name']);
			}
			}
		}
		if ($tableKey==4)
		{	
			$query_1 = mysql_query("SELECT * FROM lectors WHERE lector_name LIKE '%$searchWord%'");
			while($row_1=mysql_fetch_array($query_1))
			{
			$obj_lectors[]=array('lector_name'=>$row_1['lector_name'],'lector_position'=>$row_1['lector_position'],'lector_email'=>$row_1['lector_email']);
			}
		}
		$a=array('extraProps'=>array('roleKey'=>2),'tableProps'=>$obj_lectors);
	}
	echo json_encode($a);
	exit;
?>