<?php
//	Проверка дали потребителя съществува

$libdir				= "./../../save_dir_electronics/";		// Директория с файлове, които да НЕ са достъпни през WEB
$myurl				= "interactiveelectronics.eu";


include ($libdir."defines.php");
include ($libdir."database.php");
include ($libdir."functions.php");

getPostIfSet(array('email', 'pass', 'name', 'q'));

echo "<br>Unit Тестове за проверка. Може да добавяте параметър и стойност. Пример:   ?email=lodka@platno.eu<br><br>";


if ( isset ($email) ) {
	echo "<br>email=($email)";
	echo "<br>origText = ".$email.", cryptoText = ".cryptoText($email);
	echo "<br>origText = ".$email.", decryptoText = ".deCryptoText($email);
}
if ( isset ($pass) ) {
	echo "<br>pass=($pass)";
	echo "<br>origText = ".$pass.", cryptoText = ".cryptoText($pass);
	echo "<br>origText = ".$pass.", decryptoText = ".deCryptoText($pass);
}
if ( isset ($name) ) {
	echo "<br>name=($name)";
	echo "<br>origText = ".$name.", cryptoText = ".cryptoText($name);
	echo "<br>origText = ".$name.", decryptoText = ".deCryptoText($name);
}
if ( isset ($q) ) {
	echo "<br>Тестване на забранени думи в query=($q)";
	if ( checkForbiddenQuery ($q) )
		echo "<br>В query има ЗАБРАНЕНИ СИМВОЛИ.";
	if ( checkText ($q) != "" )
		echo "<br>В query има ЗАБРАНЕНИ СИМВОЛИ.";
}

echo "<br><br>Тестване на криптиране на текст :";

$clearText = "Varban Dubov Bukov";
echo "<br><br>clearText = ".$clearText.", cryptoText = ".cryptoText($clearText);

$clearText = "Alex Petrov Hristov";
echo "<br>clearText = ".$clearText.", cryptoText = ".cryptoText($clearText);

$clearText = "tovaeMoiatEMAIL@azsumbulgarche.bg";
echo "<br>clearText = ".$clearText.", cryptoText = ".cryptoText($clearText);

$clearText = "imamchistonovmeil@aborigen.bg";
echo "<br>clearText = ".$clearText.", cryptoText = ".cryptoText($clearText);


echo "<br><br>Тестване на ДЕкриптиране на текст :";

$cryptoText = "nfrfpipAen_jj/apk";
echo "<br><br>cryptoText = ".$cryptoText.", deCryptoText=".deCryptoText($cryptoText);

$cryptoText = "?mcyQcuppt!Fsgtrpt";
echo "<br>cryptoText = ".$cryptoText.", deCryptoText=".deCryptoText($cryptoText);

$cryptoText = "njqnmw`vrjjl_A_cmsghco,ce";
echo "<br>cryptoText = ".$cryptoText.", deCryptoText=".deCryptoText($cryptoText);


?>
