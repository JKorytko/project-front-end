<?
	include('../connection.php');
	header('Content-Type: application/json; charset=utf-8');
	mysql_query('SET NAMES utf8');
	$query_lectors=mysql_query("Select * from lectors");
    $count_lectors=mysql_num_rows($query_lectors);
	if(empty($_SESSION['role']))
	{
		for ($i = 0; $i < $count_lectors; $i++)
		{
			$row_lectors_mas = mysql_fetch_array($query_lectors);
			$obj_lectors[$i]=array('lector_name'=>$row_lectors_mas['lector_name'],'lector_position'=>$row_lectors_mas['lector_position']);
		}
		$a=array('extraProps'=>array('roleKey'=>1),'tableProps'=>$obj_lectors);
	}
	if(($_SESSION['role'])==2)
	{
		for ($i = 0; $i < $count_lectors; $i++)
		{
			$row_lectors_mas = mysql_fetch_array($query_lectors);
			if ($row_lectors_mas['lector_id']==$_SESSION['id'])
			{
			$id_lector=$row_lectors_mas['lector_id'];
			}
			else
			{
				$id_lector='';
			}
			$obj_lectors[$i]=array('lector_id'=>$id_lector,'lector_name'=>$row_lectors_mas['lector_name'],
			'lector_position'=>$row_lectors_mas['lector_position'],'lector_email'=>$row_lectors_mas['lector_email']);
		}  
		$a=array('extraProps'=>array('roleKey'=>2),'tableProps'=>$obj_lectors);
	}
	echo json_encode($a);
	exit;
?>