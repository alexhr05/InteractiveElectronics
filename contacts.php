<?php
$libdir				= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
include ($libdir."defines.php");
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
		<div class="container borderInsideDiv borderDiv colorOfMainDiv rounded w-50 divTopMargin">
			<div class="text-center text-white"><br>

					<h4>За контакт с нас може да използвате следните данни:</h4>
					<br>Интерактивна електроника
					<br>Фирма Алекс ЕООД, 				
					<br>гр.София, жк Сухата Река, бл.224
					<br>Тел.: +359 999 999 999
					<br>Електронна поща: info @ interactiveelectronics.eu
					<hr style="border: 1px solid white">
				
					<div  class="w-100 h6 align-middle ">
						<form name="registration_fm" action="contactsSendMail.php" method="POST" >
							<div class="form-inline w-100 mt-4 " >
								<h4>Може да зададете въпрос или предложение, като ползвате формата:</h4>
							</div>
							<div class="form-inline w-100 mt-4">
								<label class="form-label float-right">Как да се свържем с Вас, ако е необходимо? (електронна поща или телефон):</label>
							</div><br>
							<div class="form-inline w-100">
								<input type="text" name="userContactInfo" value="" maxlength="50" id="userContactInfo" class="form-control w-100 float-left mb-5" autofocus>
							</div>
							<div class="form-inline w-100 mt-2">
								<label class="form-label float-right">Предложение или коментар (максимум 500 символа):</label>
							</div><br>
							<div class="form-inline w-100">
								<textarea id="userComment" name="userComment" rows="6" cols="80" class="form-control w-100 float-left" maxlength="500"></textarea>
							</div><center>							
							<div class="w-50 p-4 text-center ">
								<input class="btn buttonColorChange w-100 pl-4 pr-4 text-white " type="submit" name="submit" onclick="showAllLevels()" value="Изпрати">
							</div>
							<div class="w-50">
								<input type="hidden" name="nKey" value="<?php echo nKeyForSendMail?>">
							</div></center>
						</form>
					</div>
				</div>
			</div>
		</div>
	
  	</body>
	<script type="text/javascript" src="/game.js"></script>
	 
</html