<?php
$libdir				= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
include ($libdir."defines.php");
include ($libdir."database.php");
include ($libdir."functions.php");
$ip_server = $_SERVER['REMOTE_ADDR'];

		// Записва произволно генериран ключ
		$generatedSendKey 		= genRandomPassword(12);		// Генерира код с 12 символа

		$query = "INSERT INTO `notlogged` (`id`, `lastVisitDate`, `sendKey`, `ip_address`) 
									values ('', now(), '$generatedSendKey', '$ip_server' )";
		$result = mysqli_query($conn, $query);
		if ( mysqli_affected_rows($conn)>0 ) {
			echo $generatedSendKey;
		}

?>
