<?php
	$user = json_decode(file_get_contents('php://input')); // Getting user from json headers
	if($user->username == 'Cedric' && $user->password =='Elodie1'){
		session_start();
		$_SESSION['uid'] = uniqid('ang_');
		print $_SESSION['uid'];
	}else {
		print 'error';
	}
?>