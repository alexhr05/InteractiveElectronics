<?php
$libdir				= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
include ($libdir."defines.php");
include ($libdir."database.php");
include ($libdir."functions.php");

$user_msg_body1		= "";
$email				= "";
$pass				= "";
$name				= "";
$keyss				= "";
$errorIncorrect		= "";	// Изпраща мейл при некоректно въведени букви/символи

if ( strpos (allowIPAddress, $_SERVER['REMOTE_ADDR'] ) > 0 ) {
	getPostIfSet(array('email', 'pass', 'name', 'keyss'));

	$email 		= deCryptoText($email);
	$name 		= deCryptoText($name);

	$email 		= addslashes($email);
	$pass 		= addslashes($pass);
	$name 		= addslashes($name);
	$keyss 		= addslashes($keyss);

	$registerOK = '
	<!DOCTYPE html>
	<html>
		<head>
		<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
		<meta content="utf-8" http-equiv="encoding">
		<link rel="stylesheet" href="/assets/css/style.css">
		<title>Интерактивна Електроника</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

	<style>
	body {
	  font-family: Verdana, Arial;
	  padding: 100;
	}
	</style>
	</head>


		<body style="color: white;">
			<div class="container pt-5 ">
				<div class=" w-100 colorOfMainDiv m-3 p-5 borderDiv" style="border-radius: 1rem;">
					<center>
						<p style="color:white; margin:10">Вие се регистрирахте успешно. Преминете към началната страница от следния линк : </p>
						<br><a href="https://www.interactiveelectronics.eu"><button class="text-white btn btn-info px-5 py-2 btn-lg text-center">Към начална страница на сайта : https://www.interactiveelectronics.eu</button></a>
						</p>
					</center>
				</div>
			</div>';
	$registerOK .= '
		</body>
	</html>';

	if ( $keyss != '' ) {	// Режим Активиране на потребител
		$keyss 	= addslashes($keyss);
		// Първа стъпка - проверява дали има регистриран потребител с този мейл
		$query= "SELECT * from users where `activation` = '$keyss' and `deleted`<>'yes' and `userType`='0'";   // 0
		$result = mysqli_query($conn, $query); 
		if ($result && mysqli_num_rows($result) > 0) {
			// Намерен е потребител, който трябва да се активира
			// Втора стъпка - прави активация
			$row5 = mysqli_fetch_assoc($result);
			if ( $row5['userType'] == '0' ) {
				if ( $keyss == $row5['activation'] ) {
					$query = "UPDATE `users` SET `userType`='1' WHERE id='".$row5['id']."'";
					$result = mysqli_query($conn, $query);


					echo $registerOK;

					header("Refresh:10; url=/index.html");

					if ( mysqli_affected_rows($conn) ) {
						echo "<label hidden>UserActivated</label>";
					}
				} else {
					echo "<label hidden>NoActivatedKey</label>";
				}
			}
		
		
		} else 
			echo "UserWasActivated";

	} else {	// Регистрация на потребител
		$activationCode 	= genRandomPassword(12);		// Генерира код с 12 символа
		$hiddenPass 		= $pass;

		$query= "SELECT * from users where (`mail` = '$email' or `username` = '$name') and `deleted`<>'yes'";
		$result = mysqli_query($conn, $query); 
		if ($result && mysqli_num_rows($result) > 0) {
			$row5 = mysqli_fetch_assoc($result);
			if ( $row5['username'] == $name )
				echo "UsernameExist";
			if ( $row5['mail'] == $email )
				echo "UserEmailExist";
				
			// Да проверява дали потребителя е вече регистриран, НО НЕ Е АКТИВИРАН, т.е. трябва да му удължи времето за 
			// избиране на линка от мейла
			$query = "UPDATE `users` SET registerDate=now() WHERE id='".$row5['id']."'";
			$result = mysqli_query($conn, $query);
			if ( mysqli_affected_rows($conn) ) {
				// Успешно променени дата, срока в който може да се активира се удължи
			}
			
		} else {				
			// Записва новия потребител
			$query = "INSERT INTO `users` (`id`, `registerDate`, `lastVisitDate`,`username`,`realName`,`mail`,`password`,`sendEmail`, `userType`, `activation`) 
									values ('', now(), now(), '$name', '$name', '$email', '$hiddenPass', 'yes', '0', '$activationCode' )";
			$result = mysqli_query($conn, $query);
			if (!$result) {
			} else {
				// Всичко е наред, потребителя е записан успешно, но все още не е АКТИВИРАН
				if ( isCyrilic($name) )
					$dear = $email;
				else
					$dear = $name;
				
				// Изпраща мейл с линк за потвърждение
				$user_msg_body1 .= "Здравейте ".$dear.",<br><br>Добре дошли в нашият сайт - Интерактивна Електроника. Вие се регистрирахте успешно в ".myurl.". За да активирате своят профил, трябва да изберете долния линк от това писмо. Моля, изберете следния линк :";
				$user_msg_body1 .= "<br><br>".myurl."/register.php?m=66&keyss=$activationCode";
//				$user_msg_body1 .= "<br><br>".myurl."/register.php?m=66&keyss=$activationCode&email=".CryptoText($email);
				$user_msg_body1 .= "<br><br>Ако не сте се регистирали в нашият сайт, моля игнорирайте този мейл. Данните ще бъдат изтрити до 24 часа.";
				
				$subject1 = "Регистрация в InteractiveElectronics";
				
				$from	= 'alexhr05@gmail.com';
				$headers  = "From: Alex<alexhr05@gmail.com>\r\n";
				$headers .= "MIME-Version: 1.0\r\n";
				$headers .= "Content-Type: text/html; charset=\"UTF-8\"\r\n";
				$headers .= "Bcc: ".bccMails."\r\n";	// Слага скрито копие за тестове
				$headers1251 = iconv("UTF-8", "CP1251", $headers );					
				$recipient = $email;
				mail($recipient, $subject1, $user_msg_body1, $headers, "-f" . $from);	
			
				echo "RegistrationSuccessful";
			}
			
		}	// Край на ЗАПИС на нов потребител

	}	// Край на Регистрация на потребител
}
			
?>
