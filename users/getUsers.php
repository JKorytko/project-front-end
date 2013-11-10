<?php
include '../connection.php';
$login = $_GET['login']; 
$password=$_GET['password']; 
$user = mysql_query("SELECT * FROM lectors WHERE lector_login='$login' AND lector_password='$password'");
$id_user = mysql_fetch_array($user);
if (!empty($id_user['lector_id'])) //РАСПРЕДЕЛЕНИЕ ПРАВ ДОСТУПА
	{
		session_start();
		$_SESSION['password']=$password; 
		$_SESSION['login']=$login; 
		$_SESSION['role']=$id_user['role'];
		$_SESSION['id']=$id_user['lector_id'];
		$user=array('user_id'=>$id_user['lector_id'], 'login'=>$login);
		echo json_encode($user);
	}
else
{
	$user=array('user_id'=>NULL, 'login'=>NULL);
	echo json_encode($user);
}	
	exit;
?>
