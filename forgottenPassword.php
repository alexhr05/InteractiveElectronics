<?php
$libdir				= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
include ($libdir."defines.php");
include ($libdir."database.php");
include ($libdir."functions.php");

$email 	  				= '';
$userInputRobotCheck 	= '';
$answerRobotCheck 		= '';
$errorsFound1			= '';
$errorsFound2			= '';
$mailSend 				= 'no';

getPostIfSet(array('answerRobotCheck','userInputRobotCheck','email','submit'));

			if ( (checkEmail ($email) != '' and checkText($email) != '') and isset($submit) )
				$errorsFound1 = "Непозволени символи в полето за електронна поща.";
			if ( $email == '' and isset($submit) )
				$errorsFound1 = "Полето за електронна поща е празно.";

			$rowX = rand (1,22);	
			$query= "select * from `cifri` where `id` ='".addslashes($rowX)."'";
			$result12 = mysqli_query($conn, $query);
			if ($result12 && mysqli_num_rows($result12) > 0) {
				$row = mysqli_fetch_assoc($result12);
				$checkError = checkInt ($userInputRobotCheck);
				if ( $checkError != "" and isset($_POST['submit']) ) {
					$errorsFound2 .= 'В това поле трябва да има само цифри.';
				} else if ( $answerRobotCheck != $userInputRobotCheck ) {
					$errorsFound2 .= 'Не съвпадат числото с цифри и числото с букви.';
				}

				$NumberText 	= $row['text'];
				$NumberCifra 	= $row['answer'];
			}
			
			if ( $email != '' and $userInputRobotCheck != '' and $errorsFound1 == '' and $errorsFound2 == '' and isset($submit)) { // Няма грешки изпраща имейл
				// Проверява дали съществува такъв потребител
				$query= 'SELECT * FROM users WHERE `mail`="'.$email.'" or `username`="'.$email.'"';
				//Да проверя дали съществува такъв потребител. Ако съществува да изпрати мейл, ако не да печата грешка.
				$result = mysqli_query($conn, $query);
				if ($result && mysqli_num_rows($result) > 0) {
					$row = mysqli_fetch_assoc($result);

					if ($row['mail'] == $email  or $row['username'] == $email){
						// Изпраща мейл въпрос или предложение
						$userMsgBody = 'Здравейте,<br>изберете следния линк, за да промените Вашата парола:<br> '.myurl.'/forgottenChangePassword.php?action=allow&activationCode='.$row['activation'];
						$subject1 = "Забравена парола за  interactiveelectronics.eu ";
						$headers = "From: Alex<Alexhr05@gmail.com>\r\n";
						$headers .= "MIME-Version: 1.0\r\n";
						$headers .= "Content-Type: text/html; charset=\"UTF-8\"\r\n";
						$headers .= "Bcc: alexhr05@gmail.com";	// Слага скрито копие за тестове
						$headers1251 = iconv("UTF-8", "CP1251", $headers );					
						$recipient = $email;
						mail($recipient, $subject1, $userMsgBody, $headers);

						$mailSend = 'yes';
					} else {
						$errorsFound1 .= 'Не е открит такъв потребител. Проверете въведения електронен адрес.';
					}
				} else {
					$errorsFound1 .= 'Не е открит такъв потребител. Проверете въведения електронен адрес.';
				}
			}

?>

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
    <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="/assets/css/style.css">
    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="/assets/css/fontawesome.css">
    <link rel="stylesheet" href="/assets/css/templatemo-host-cloud.css">
    <link rel="stylesheet" href="/assets/css/owl.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
 	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
</head>
<body>
	<nav id="menu">
	</nav>
		<div class="container py-5 h-100 ">
		  <div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-12 col-md-8 col-lg-6 col-xl-5">
			  <div class="card backgroundColorMainDiv text-white borderDiv" style="border-radius: 1rem;">
			  	<div class="noVisibilityOfElement divBigMargin mh-100" id="noVisibleDivForgottenPassword">
				</div>
				<div class="card-body p-5 text-center" id="cardBodyDiv">
	  
	  
	  
				<form name="enter_fm" action="" method="POST">
				  <div class="md-5 mt-md-4 text-dark">
					<h2 class="fw-bold mb-2 text-dark">Забравена парола</h2>
					<p class="text-white mb-5 text-dark">Ако сте си забравили Вашата паролата, оттук можете да я възстановите</p>

					<div class="form-outline  mb-4">
						<label class="form-label float-left">Въведете електронна поща:</label>
						<input type="email" id="email" name="email" class="form-control form-control-lg" placeholder="Email" />
						<label style="color: DarkRed; font-weight: bold;"><?php echo $errorsFound1; ?></label>
					  	<p id="errorМessageEmail"></p>
					</div>
	  
					<div class="form-outline  mb-4">
						<label class="form-label float-left">Поле за защита. Напишете следното число  с цифри:
							<?php echo "<b>".$NumberText."</b>"; ?>
						</label>
						<input type="hidden" name="answerRobotCheck" value="<?php echo $row['answer']?>">						
						<input type="text" id="secureDigits" name="userInputRobotCheck" class="form-control form-control-lg" placeholder="Въведете цифри"/>					
						<label  style="color: DarkRed; font-weight: bold;"><?php echo $errorsFound2; ?></label>
					  <p id="errorМessagePassword"></p>
					</div>
	  
					<button class="btn colorOfButton px-5 text-white" onclick="" name="submit" type="submit">Изпрати</button>
				  </div>
				</form>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	<script src="/game.js">
	</script>
	<script>
		let ifMailSend = "<?php if ( $mailSend != '' ) echo $mailSend; ?>";
		console.log("ifMailSend="+ifMailSend);
		if ( ifMailSend == "yes" ) {
			$("#cardBodyDiv").remove();
			$("#noVisibleDivForgottenPassword").html(`<p class="inwardsLine text-dark"> На Вашата електронна поща е изпратен линк, който трябва да потвърдите, за да можете да промените паролата за нашия сайт.</p><br>`);
			$("#noVisibleDivForgottenPassword").css("visibility", "visible");
		}
	</script>

</body>
</html>



