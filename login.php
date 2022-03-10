<?php
$libdir				= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
include ($libdir."defines.php");
include ($libdir."database.php");
include ($libdir."functions.php");

$user_msg_body1		= "";
$email				= "";
$pass				= "";
$name				= "";

if ( strpos (allowIPAddress, $_SERVER['REMOTE_ADDR'] ) > 0 ) {
	getPostIfSet(array('email', 'pass', 'name'));

	$email 		= deCryptoText($email);
	$email 		= addslashes($email);
	$pass 		= addslashes($pass);
	$name 		= addslashes($name);

	$hiddenPass = $pass;
	$query 	= "SELECT * from users where ( `username` = '$email' or `mail` = '$email' ) and `deleted`<>'yes' and `password` = '$hiddenPass' and `userType` <> '0'";
	$result = mysqli_query($conn, $query); 
	if ($result && mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_assoc($result);
		
		echo 'LoginSuccessful';
		echo '@@@'.$row['userExperienceLevel'];
		echo '@@@'.$row['userType'];
		echo '@@@'.CryptoText($row['username']);
		echo '@@@'.CryptoText($row['mail']);
		echo '@@@'.$row['activation'];
	} else {				
		echo "NOKNoUserResult";
	}
} 

?>
