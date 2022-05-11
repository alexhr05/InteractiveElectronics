<?php
$libdir				= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
include ($libdir."defines.php");
include ($libdir."database.php");
include ($libdir."functions.php");
$ip_server = $_SERVER['REMOTE_ADDR'];

$user_msg_body1		= "";
$email				= "";
$pass				= "";
$name				= "";

//if ( strpos (secureKey == sendKey ) {
	getPostIfSet(array('email', 'pass', 'name', 'sendKey'));

	$email 		= deCryptoText($email);
	$email 		= addslashes($email);
	$pass 		= addslashes($pass);
	$name 		= addslashes($name);



	$hiddenPass = $pass;
	$query 	= "SELECT * from users where ( `username` = '$email' or `mail` = '$email' ) and `deleted`<>'yes' and `password` = '$hiddenPass' and `userType` <> '0'";
	$result = mysqli_query($conn, $query); 
	if ($result && mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_assoc($result);

		// Записва произволно генериран ключ
		$generatedSendKey 		= genRandomPassword(12);		// Генерира код с 12 символа
		$query2 = "UPDATE `users` SET `sendKey`='".$generatedSendKey."', `ip_address`='".$ip_server."' WHERE `id`='".$row['id']."'";
		$result2 = mysqli_query($conn, $query2);
		if ( mysqli_affected_rows($conn)>0 ) {
//			echo "<br>Успешно генериран ключ";
		}

		// Променя датата на последно влизане
		$query2 = "UPDATE `users` SET `lastVisitDate`=now() WHERE `id`='".$row['id']."'";
		$result2 = mysqli_query($conn, $query2);
		if ( mysqli_affected_rows($conn)>0 ) {
//			echo "<br>Успешно генериран ключ";
		}
		
		echo 'LoginSuccessful';
		echo '@@@'.$row['userExperienceLevel'];
		echo '@@@'.$row['userType'];
		echo '@@@'.CryptoText($row['username']);
		echo '@@@'.CryptoText($row['mail']);
		echo '@@@'.$row['activation'];
		echo '@@@'.$generatedSendKey;
	} else {				
		echo "NOKNoUserResult";
	}
//} 

?>
