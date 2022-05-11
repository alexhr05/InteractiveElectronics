<?php

$libdir			= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
$fileName 		= array ();
$update 		= "";
$q				= "";
$userMailIs		= "";
$adminSaveLevel	= "";

include ($libdir."defines.php");
include ($libdir."database.php");
include ($libdir."functions.php");
$ip_server = $_SERVER['REMOTE_ADDR'];

$bFoundKey 	= false;
$sendKey	= "";

getPostIfSet(array('q','update','userMailIs', 'sendKey'));

if ( checkText($sendKey) != "" or $sendKey == "") {
	die();	// Има грешки в параметъра
}

// Проверява дали потребителя има ключ за достъп
$query 	= "SELECT * from `users` where `sendKey` = '".$sendKey."' ";		// Проверява дали има такъв ключ
$result = mysqli_query($conn, $query); 
if ($result && mysqli_num_rows($result) > 0) {
	$row = mysqli_fetch_assoc($result);
	$bFoundKey = true;
} else {
	// Проверява дали потребителя има ключ за достъп
	$query 	= "SELECT *,HOUR (TIMEDIFF(now(),lastVisitDate)) as HourDiff from `notlogged` where `sendKey` = '$sendKey' ";		// Проверява дали има такъв ключ
	$result = mysqli_query($conn, $query); 
	if ($result && mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_assoc($result);
		if ( $row['HourDiff'] == '0' )
			$bFoundKey = true;
	} else {
		$bFoundKey = false;
	}
}

if ( !$bFoundKey ) {
//	echo "key false;";
	die();
} else {
//	echo "key true;";
}

$query 		= $q;
//$query 		= addSlashesText ($query);		// Да се провери как да го изпълни правилно
$update 	= addSlashesText ($update);

//echo "<br>query			=($query)";
//echo "<br>update			=($update)";

$userMailIs = deCryptoText($userMailIs);

if ( isset ($userMailIs) and $userMailIs != "" )
	$query .= "'".$userMailIs."'";

//echo "query=($query)";

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

// Да се донапише проверка какви заявки може да се изпълняват. 
// В момента цялата заявка се предава като параметър и е опасно
// ДА СЕ ДОБАВИ и ключ за сигурност или да гледа откъде идва заявката, т.е. да е от сървъра
//echo "<br><br>query=$query";
if ( $query != '' ) {
	if ( checkForbiddenQuery ($query) ) {	// Проверява за забранени думи за изтриване на базата данни
		echo "Forbidden";
		die;
	}
	
	$result = mysqli_query($conn,$query);
    if ( $result ) {

		// Обработва получените резултати от mysql заявката
		if ( strpos ( $query, "SELECT" ) === 0 ) {	// Ако е SELECT -> взима резултати, ако е INSERT - направо излиза

			while ($row = mysqli_fetch_assoc ($result) ) { 

				// Заяка за LoadLevel
				if ( strpos ($query, 'fileName' ) > 0   and strpos ($query, 'IMGshow' ) > 0 ) {
					$fileName[] = $row['fileName'];
					$fileName[] = $row['IMGshow'];
				}
				// Заяка за LoadLevelExpert
				if ( strpos ($query, 'fileName' ) > 0 	and strpos ($query, 'InputBoxAnswer' ) > 0 ) {
					$fileName[] = $row['fileName'];
					$fileName[] = $row['InputBoxAnswerMin'];
					$fileName[] = $row['InputBoxAnswerMax'];
					$fileName[] = $row['XPosition'];
					$fileName[] = $row['YPosition'];					
				}
				
				// LoadCreateLevel
				if ( strpos ($query, 'MAX(levelNumber)') > 0 )
					$maxLevel = $row['MAX(levelNumber)'];
				
				
				
			} // Край на цикъл за обхождане на получените резултати
		
			// Събира данните за LoadLevel
			if ( strpos ($query, 'fileName' ) > 0 and strpos ($query, 'IMGshow' ) > 0 ) 
				echo json_encode($fileName);

			// Събира данните за LoadLevelExpert
			if ( strpos ($query, 'fileName' ) > 0 and strpos ($query, 'InputBoxAnswer' ) > 0 ) 
				echo json_encode($fileName);
		
			if ( strpos ($query, 'MAX(levelNumber)') > 0 )
				echo $maxLevel;
		} else 
			echo "Успешно изпълнена заявка.";
	} else
		echo "No result from query";
} else
	echo "No query";

	
//echo "<br>Край на PHP файл."; 
// ===============================





?>
