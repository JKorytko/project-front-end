<?
session_start();
if (empty($_SESSION))
{
	for ($i = 0; $i < $count_students; $i++)
		{
			$obj_students=array();
		}
		$a=array('extraProps'=>array('login'=>NULL),'tableProps'=>$obj_students);
		echo json_encode($a);
}
else
{
for ($i = 0; $i < $count_students; $i++)
		{
			$obj_students=array();
		}
		$a=array('extraProps'=>array('login'=>$_SESSION['login']),'tableProps'=>$obj_students);
		echo json_encode($a);
}
?>