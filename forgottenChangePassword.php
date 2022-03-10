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
 	<script src="/assets/js/md5.js"></script>
</head>
<body>
	<nav id="menu">
	</nav>
		<div class="container py-5 h-100 ">
		  <div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-12 col-md-8 col-lg-6 col-xl-5">
			  <div class="card backgroundColorMainDiv text-white borderDiv" style="border-radius: 1rem;">
			  	<div class="noVisibilityOfElement divBigMargin mh-100" id="noVisibleDivForgottenChangePassword">
				</div>
				<div class="card-body p-5 text-center" id="cardBodyDiv">
	  
	  
	  
				<form name="enter_fm" action="" method="POST" >
				  <div class="md-5 mt-md-4 text-dark">
					<h2 class="fw-bold mb-2 text-dark">Смяна на парола</h2>
					<p class="text-white mb-5 text-dark">Оттук може да смените Вашата парола. Изберете нова парола</p>
		
						<div class="form-outline mb-4">
							<label class="form-label text-dark h5">Парола:</label>
							<input type="password" oninput="IsMatchingPassword()" id="idPasswordX" name="passwordX" class="form-control form-control-lg" placeholder="Парола"/>
							<input type="hidden" id="idHiddenPassword" name="idHiddenPassword" class="form-control form-control-lg" placeholder="cryptoPass"/>
							<p id="errorМessagePassword"></p>
						</div>
		
						<div class="form-outline mb-4">
							<label class="form-label text-dark h5">Потворете парола:</label>
							<input type="password" id="repeatPassword" name="repeatPassword" class="form-control form-control-lg backgroundColorInputBox" placeholder="Парола" />
							<p id="errorМessageRepeatPassword"></p>
						</div>
					<button class="btn colorOfButton px-5 text-white" onclick="" name="submit" type="submit">Изпрати</button>
				  </div>
				</form>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	<script src="/game.js"></script>

<?php
$libdir				= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
include ($libdir."defines.php");
include ($libdir."database.php");
include ($libdir."functions.php");

$errorsFound1		= '';
$errorsFound2		= '';
$action				= '';
$activationCode		= '';
$passwordX			= '';
$repeatPassword		= '';
$labelError 		= '';
$idHiddenPassword		= '';

getPostIfSet(array('activationCode','action','passwordX','repeatPassword','submit','idHiddenPassword'));

	if ( $action == "allow" and checkText($activationCode) == '' ) {
		// Проверява дали съществува такъв потребител
		$query= "SELECT * FROM users WHERE `activation`='".addslashes($activationCode)."'";
		//Да проверя дали съществува такъв потребител
		$result = mysqli_query($conn, $query);
		if ($result && mysqli_num_rows($result) > 0) {
			$row = mysqli_fetch_assoc($result);

			if ( $passwordX!=$repeatPassword )
				echo '<script>$("#errorМessageRepeatPassword").html("Не съвпадат въведените пароли.");</script>';
//				echo '<script>$("#errorМessageRepeatPassword").html("<p class="inwardsLine text-dark">Некоректни символи при активация на потребител.</p>");</script>';
			
			//Ако  са въведени данни в полетата за пароли , update-вам парола. Заявка към бзата данни update 
			if ( isset($submit) and checkText($idHiddenPassword) == "" and $passwordX != "" and $repeatPassword != "" and $passwordX==$repeatPassword ) {
				$query = "UPDATE `users`SET `password`='".addslashes($idHiddenPassword)."' WHERE `activation`='".addslashes($activationCode)."'";
				$result = mysqli_query($conn, $query);
				if ( mysqli_affected_rows($conn)>0 ) {
					echo "<br>Ima rezultat";
					// Успешно променен статус на потребител
					$labelError = '<script>$("#cardBodyDiv").remove();
						  $("#noVisibleDivForgottenChangePassword").html(`<h5 class="inwardsLine text-dark"> Успешно променихте Вашата парола.</h5><br>`);
						  $("#noVisibleDivForgottenChangePassword").css("visibility", "visible");</script>';
					header("Refresh:10; url=/loginForm.html");	
				} 
			}

		} else
			header("Refresh:0; url=/forgottenPassword.php");
	} else
		header("Refresh:0; url=/forgottenPassword.php");


?>
	<?php
		if($labelError != ''){
			echo $labelError;	
		}
	?>
	
</body>
</html>