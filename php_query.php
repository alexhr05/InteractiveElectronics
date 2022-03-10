<?php
$libdir			= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
include ($libdir."defines.php");
include ($libdir."database.php");
include ($libdir."functions.php");

if ( strpos (allowIPAddress, $_SERVER['REMOTE_ADDR'] ) > 0 ) {
	
	$fileName 		= array ();
	$update 		= "";
	$q				= "";
	$userMailIs		= "";
	$adminSaveLevel	= "";

	getPostIfSet(array('q','update','userMailIs'));
	$query 			= $q;

	$query 			= addSlashesText ($query);
	$update 		= addSlashesText ($update);
	$userMailIs 	= deCryptoText($userMailIs);

	if ( isset ($userMailIs) and $userMailIs != "" )
		$query .= "'".$userMailIs."'";

	// Ако имаме стойност на update -> Първо изтрива данните за ниво, след това прави INSERT
	if ( $update >= 1 and $update <= 100 ) {
		echo "<br>Изтрива ниво ($update)";
		$query2 = "DELETE FROM `levels` WHERE `levelNumber`='$update';";
		
		$result2 = mysqli_query($conn,$query2);
		if ( !$result2 ) {
			echo "<br>Invalid DB query / Проблем при работа с базата данни. Грешка 3145.<br><br>.";
			echo "<br>@@@".mysqli_connect_errno()."@@@";
			die();
		}
	}

	if ( $query != '' ) {
		if ( strpos ($query, "DROP" ) === 0 or strpos ($query, "DROP" ) > 0 ) {
			die;
		}

		$result = mysqli_query($conn,$query);
		if ( $result ) {
			// Обработва получените резултати от mysql заявката
			if ( strpos ( $query, "SELECT" ) === 0 ) {	// Ако е SELECT -> взима резултати, ако е INSERT - направо излиза
				while ($row = mysqli_fetch_assoc($result)) { 

					// Заяка за LoadLevel
					if ( strpos ($query, 'fileName' ) > 0 and strpos ($query, 'IMGshow' ) > 0 ) {
						$fileName[] = $row['fileName'];
						$fileName[] = $row['IMGshow'];
					}
					
					// LoadCreateLevel
					if ( strpos ($query, 'MAX(levelNumber)') > 0 )
						$maxLevel = $row['MAX(levelNumber)'];
					
					
					
				} // Край на цикъл за обхождане на получените резултати
			
				if ( strpos ($query, 'fileName' ) > 0 and strpos ($query, 'IMGshow' ) > 0 ) 
					echo json_encode($fileName);
			
				if ( strpos ($query, 'MAX(levelNumber)') > 0 )
					echo $maxLevel;
			} else 
				echo "Успешно изпълнена заявка.";
		} else
			echo "No result from query";
	} else
		echo "No query";
}
	
?>
