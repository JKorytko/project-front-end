<?
	include('../connection.php');
	header('Content-Type: application/json; charset=utf-8');
	mysql_query('SET NAMES utf8');
    $query_subjects=mysql_query("Select * from subjects");
    $count_subjects=mysql_num_rows($query_subjects);
	if (empty($_SESSION['role']))
	{
		for ($i = 0; $i < $count_subjects; $i++)
		{
			$row_subjects_mas = mysql_fetch_array($query_subjects);
			$query2_subjects=mysql_query("select lector_name from lectors where lector_id=".$row_subjects_mas['lector_id']);
			$subjects_lectors=mysql_fetch_array($query2_subjects);
			$obj_subjects[$i]=array('subject_title'=>$row_subjects_mas['subject_title'],'subject_credits'=>$row_subjects_mas['subject_credits'],'lector_name'=>$subjects_lectors['lector_name']);
		}  
		$return=array('extraProps'=>array('roleKey'=>1),'tableProps'=>$obj_subjects);	
		echo json_encode($return);
	}
	if ($_SESSION['role']==2)
	{
		for ($i = 0; $i < $count_subjects; $i++)
		{
			$row_subjects_mas = mysql_fetch_array($query_subjects);
			$query2_subjects=mysql_query("select lector_name from lectors where lector_id=".$row_subjects_mas['lector_id']);
			$subjects_lectors=mysql_fetch_array($query2_subjects);
			if ($row_subjects_mas['lector_id']==$_SESSION['id'])
			{
				$subject_id=$row_subjects_mas['subject_id'];
			}
			else
			{
				$subject_id='';
			}
			$obj_subjects[$i]=array('subject_id'=>$subject_id, 'subject_title'=>$row_subjects_mas['subject_title'],
			'subject_credits'=>$row_subjects_mas['subject_credits'],'lector_name'=>$subjects_lectors['lector_name']);
		}  
		$return=array('extraProps'=>array('roleKey'=>2),'tableProps'=>$obj_subjects);	
		echo json_encode($return);
	}
exit;
?> 