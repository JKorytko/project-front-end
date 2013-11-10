<?
   include('../connection.php');
   header('Content-Type: application/json; charset=utf-8');
   mysql_query('SET NAMES utf8');
    $query_students=mysql_query("Select * from students");
    $count_students=mysql_num_rows($query_students);
	if(empty($_SESSION['role']))
	{
		for ($i = 0; $i < $count_students; $i++)
		{
			$obj_students=array();
		}
		$a=array('extraProps'=>array('roleKey'=>1,'tableProps'=>$obj_students));
		echo json_encode($a);
	}	
	if(($_SESSION['role'])==2)
	{
		for ($i = 0; $i < $count_students; $i++)
		{
			$row_students_mas = mysql_fetch_array($query_students);
			$query2_students=mysql_query("select group_name from groups where group_id=".$row_students_mas['group_id']);
			$group_students=mysql_fetch_array($query2_students);
			$obj_students[$i]=array('student_name'=>$row_students_mas['student_name'],'group_name'=>$group_students['group_name'],'student_notes'=>$row_students_mas['student_notes']);
		}  
		$a=array('extraProps'=>array('roleKey'=>2),'tableProps'=>$obj_students);
		echo json_encode($a);
	}
	exit;
?>