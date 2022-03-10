<?php

// Добавя защити, за да изключи вмъкване на изпълними команди и да предпази базата данни
function addSlashesText($tekst) {
	if ( (int)$tekst )
		return $tekst;
	else {
		$tekst = addslashes($tekst);
		$tekst = htmlspecialchars($tekst, ENT_NOQUOTES);
		return $tekst;
	}
}

function checkText($Text) 
{
	if ( $Text == "" )
		return "Полето е празно.";

	if ( strlen ( $Text) <= 1 )
		return "Въвели сте прекалено малко символи.";

	if ( strlen ( $Text) >= 68 )
		return "Въвели сте прекалено много символи. Разрешени са максимум 68 символа.";

	$possible = " AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789-_!@#$+.абвгдежзийклмнопрстуфхцчшщъьюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ";
	$bAllowUsername = true;
	$i = 0;
	while ( $i < strlen ($Text) ) {
//		echo "<br>Text[$i]".$Text[$i]." - ";
		if ( strpos ($possible, $Text[$i] ) == 0 ) {
			$bAllowUsername = false;
			break;
		}
		$i++;
	}
	if ( !$bAllowUsername )
		return "В полето има забранени символи. Може да ползвате всички букви на кирилица, латиница, цифри и символите: ! @ # _ - +";
	else
		return "";
}

// Проверява за sql inj, но може и да са празни полетата или с по-малко символи
function checkTextNoStrict($Text) 
{
	if ( strlen ( $Text) >= 68 )
		return "Въвели сте прекалено много символи. Разрешени са максимум 50 символа.";

	$possible = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789-_!@#$+.абвгдежзийклмнопрстуфхцчшщъьюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ";
	$bAllowUsername = true;
	$i = 0;
	while ($i < strlen ($Text) ) {
		if ( !strstr($possible, $Text[$i] ) )
			return false;
		$i++;
	}
	if ( !$bAllowUsername )
		return "В полето има забранени символи. Може да ползвате всички букви на кирилица, латиница, цифри и символите: ! @ # _ - +";
	else
		return "";
}


function checkForbiddenQuery ($queryToCheck) {
	$arr = ['ALTER', 'DROP', 'DELETE'];
	
    foreach ($arr as $index => $string) {
		echo "<br>string=".$string;
        if (strpos($queryToCheck, $string) !== FALSE )
//			echo "<br>среща се";
            return true;
    }
	
}

function checkEmail($mail1) {
	if ( $mail1 == "" )
		return "Полето е празно.";

	if ( strlen ( $mail1) <= 6 )
		return "Въвели сте прекалено малко символи.";

	if ( strlen ( $mail1) >= 68 )
		return "Въвели сте прекалено много символи. Разрешени са максимум 70 символа.";

	if (!filter_var($mail1, FILTER_VALIDATE_EMAIL))
		return "Въведеният електронен адрес не е разпознат като реален.";

	$possible = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789-_!@#$+.";
	$bAllowEmail = true;
	$i = 0;
	while ($i < strlen ($mail1) ) {
		if ( !strstr($possible, $mail1[$i] ) )
			$bAllowEmail = false;
		$i++;
	}
	if ( !$bAllowEmail )
		return "В полето има забранени символи. Може да ползвате всички букви на латиница, цифри и символите: ! @ # _ - +";
	else
		return "";
}

function checkInt($userInput) {
	if ( $userInput == "" )
		return "Полето е празно.";

	$possible = "0123456789";
	$bAllowEmail = true;
	$i = 0;
	while ($i < strlen ($userInput) ) {
		if ( !strstr($possible, $userInput[$i] ) )
			$bAllowEmail = false;
		$i++;
	}
	if ( !$bAllowEmail )
		return "В полето има забранени символи. Може да въвеждате само цифри.";
	else
		return "";
}

function formatBytes($size, $precision = 2)
{
    $base = log($size, 1024);
    $suffixes = array('', 'KB', 'MB', 'GB', 'TB');

    return round(pow(1024, $base - floor($base)), $precision) .' '. $suffixes[floor($base)];
}


function getPostIfSet($test_vars)
{
        if (!is_array($test_vars)) {
                $test_vars = array($test_vars);
        }
        foreach($test_vars as $test_var) {
                if (isset($_POST[$test_var])) {
                        global $$test_var;
                        $$test_var = $_POST[$test_var];
                } elseif (isset($_GET[$test_var])) {
                        global $$test_var;
                        $$test_var = $_GET[$test_var];
                } else {
                    $$test_var = "";
                }
        }
}


function genRandomPassword($length = 8) {
                $salt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                $len = strlen($salt);
                $makepass = '';
                mt_srand(10000000 * (double) microtime());

                for ($i = 0; $i < $length; $i ++) {
                        $makepass .= $salt[mt_rand(0, $len -1)];
                }

                return $makepass;
}

function cryptoPassword ($pass) {
	$md5_pass 				= md5($pass);
	$number1 				=  0;
	$number2 				= 31;
	$swapChar 				= $md5_pass[$number1];
	$md5_pass[$number1] 	= $md5_pass[$number2];
	$md5_pass[$number2] 	= $swapChar;
	return md5($md5_pass);
}

function cryptoText ($clearText) {
	$possible = "абвгдежзийклмнопрстуфхцчшщъьюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ";
	for ( $i=0; $i<strlen($clearText); $i++ )
		if ( strpos ($possible ,  $clearText[$i]) > 0 ) 	//...Има символи на кирилица...
			return $clearText;

	for ( $i=0; $i<strlen($clearText); $i++ )
		if ( $i%2 == 0 )
			$clearText[$i] = chr(ord ($clearText[$i])-2);
		else
			$clearText[$i] = chr(ord ($clearText[$i])+1);

	return $clearText;
}
function deCryptoText ($clearText) {
	$possible = "абвгдежзийклмнопрстуфхцчшщъьюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ";
	for ( $i=0; $i<strlen($clearText); $i++ )
		if ( strpos ($possible ,  $clearText[$i]) > 0 ) 	//...Има символи на кирилица...
			return $clearText;
	
	for ( $i=0; $i<strlen($clearText); $i++ )
		if ( $i%2 == 0 )
			$clearText[$i] = chr(ord ($clearText[$i])+2);
		else
			$clearText[$i] = chr(ord ($clearText[$i])-1);

	return $clearText;
}

function isCyrilic ($clearText) {
	$possible = "абвгдежзийклмнопрстуфхцчшщъьюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ";
	for ( $i=0; $i<strlen($clearText); $i++ )
		if ( strpos ($possible ,  $clearText[$i]) > 0 ) 	//...Има символи на кирилица...
			return true;
			
	return false;
}

function IsName ($string){
	if (preg_match("/^[ -_A-Za-zА-Яа-я0-9]{5,51}$/", $string))
		return true;
	else
		return false;
}  
function IsName2 ($string){
	if ( preg_match('/[\x00|\n|\r|\'|\"|\`|\\\|\x1a]/', $string) )
		return false;
	else
		return true;
}  

function IsPhone ($string){
	if (preg_match("/^[0-9]{5,15}$/", $string))
		return true;
	else
		return false;
}  


// Проверява дали клиента е на мобилно устройство или компютър
function checkDeviceType() {
	if ( strpos ($_SERVER['HTTP_USER_AGENT'] , "Android") > 1 or strpos ($_SERVER['HTTP_USER_AGENT'] , "Mobile") > 1 )
		return "mobile";
	if ( strpos ($_SERVER['HTTP_USER_AGENT'] , "Win32") > 1 or strpos ($_SERVER['HTTP_USER_AGENT'] , "Win64") > 1 )
		return "PC";	
}
?>