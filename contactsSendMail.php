<?php

$libdir				= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
$myurl				= "www.interactiveelectronics.eu";
$userContactInfo	= "";
$nKey				= "";
$userComment		= "";
$user_msg_body1 	= "";

include ($libdir."defines.php");
include ($libdir."database.php");
include ($libdir."functions.php");

getPostIfSet(array('nKey', 'userComment', 'userContactInfo'));


if ( isset ( $nKey ) ) {
	if ( $nKey == nKeyForSendMail ) {

		// Да се донапише проверка какви заявки може да се изпълняват. 
		// В момента цялата заявка се предава като параметър и е опасно
		// ДА СЕ ДОБАВИ и ключ за сигурност или да гледа откъде идва заявката, т.е. да е от сървъра

		$registerOK = '
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="AlexHR">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700" rel="stylesheet">

    <title>Интерактивна Електроника</title>
	
    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="style.css">
    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/templatemo-host-cloud.css">
    <link rel="stylesheet" href="assets/css/owl.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
 	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
</head>
<body>
	<nav id="menu">
	</nav>

				<div class="container pt-5 ">
					<div class=" w-100 backgroundColorMainDiv m-2 p-5 borderDiv" style="border-radius: 1rem;">
						<center>
							<p style="color:black; font-size:140%">Съобщението е изпратено успешно. </p>
							<br><a href="http://www.interactiveelectronics.eu"><button class="btn colorOfButton text-white spaceBetweenButtons px-3 text-center">Към начална страница на сайта : http://www.interactiveelectronics.eu</button></a>
							</p>
						</center>
					</div>
				</div>

			</body>
			<script src="game.js"></script>			
		</html>';

		$checkError 	 = "";
		if ( isset ( $userContactInfo ) ) {
			$checkError 	.= checkText ($userContactInfo);
			if ( $checkError != "" )
				echo  'Некоректни символи. userContactInfo. ';
		}
		if ( isset ( $userContactInfo ) ) {
			$checkError .= checkText ($userContactInfo);
			if ( $checkError != "" )
				echo  'Некоректни символи. userContactInfo. ';
		}

		if ( $checkError == '' ) {		// Ако няма грешки в съдържанието на полетата
			

			// Изпраща мейл
			$user_msg_body1 .= "Здравейте,<br><br>Изпратено е съобщение от потребител : ".$userContactInfo."";
			$user_msg_body1 .= "<br><br>Текст на съобщение : ".$userComment;
			$user_msg_body1 .= "<br><br>Дата и час : ".date("d-m-Y.");
			
			$subject1 = "Съобщение от Contacts";
			
			$from	= 'alexhr05@gmail.com';
			$headers  = "From: Alex<alexhr05@gmail.com>\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=\"UTF-8\"\r\n";
			$headers .= "Bcc: alexhr05@gmail.com;peterhr@gmail.com\r\n";	// Слага скрито копие за тестове
			$headers1251 = iconv("UTF-8", "CP1251", $headers );					
			$recipient = $from;

			mail($recipient, $subject1, $user_msg_body1, $headers, "-f" . $from);
		   
			echo $registerOK;
			
		} else
			echo "Грешни параметри. Не мога да изпратя съобшение. Моля върнете се в предишната страница.";
	} else 
		echo "Грешни параметри. Не мога да изпратя съобшение. Моля върнете се в предишната страница.";
} else
	echo "Грешни параметри. Не мога да изпратя съобшение. Моля върнете се в предишната страница.";


?>
