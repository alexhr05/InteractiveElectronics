let dropElement = [];
let selectedImageArray = [];
let draggedImageId = [];
let maxVisibleDraggedElement = 6; 
let allImage = 36; 	// Максимален брой електронни еле

let rightLoadImage;
let leftImageObj;
let temp;
let maxDiv = 12;
let maxLevel;
let leftImgId;
var dragId;
var divId;
let currentLevel = 1;
let beginGameCookie = 1;

let skin = 2;
let sizeOfImg = "100%";
let fragment;
let modeForDrop = 'edit';
let userExperienceLevel = 0; 		// Ниво в играта, до което е стигнал потребителят
let userType 			= 0; 		// Тип достъп на потребителят
let userName 			= "noName";

let textOpeningLevelModal = document.getElementById("textOpeningLevelModalId");
let textEndingLevelModal = document.getElementById("textEndingLevelModalId");
let conditionForTheLevels = document.getElementById("textOpeningLevelModalIdCondition");
let modalTitle = document.querySelectorAll(".modal-title");

let textShow;

let currentTime = Date.now();
if (sessionStorage.getItem("logInTime") != null) {	
	if (currentTime - sessionStorage.getItem("logInTime") >= 60000*60) {// След 60 мин ще разглогне
		console.log("logOUT xxxxxxxx");
		logOut();
	}	

}

// Заявка да провери колко нива са въведени до момента
let fnc = 'SELECT MAX(levelNumber) FROM `levels`';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
			maxLevel = this.responseText;
		} 
	}
xhttp.open("GET","php_query.php?q="+fnc,true);
xhttp.send();
// Край на заявка за проверка колко нива има въведени до момента


$("#menu").addClass("navbar navbar-expand-lg");	// //backgroundDivColorShadowMenu
let menuNavElement = document.getElementById("menu");
menuNavElement.innerHTML = `
        <div class="container ">
          <a class="navbar-brand" href="index.html">	
			<a class="navbar-brand" href="/index.html"><img src="/pictures/logoScanSmall.JPG" class="rounded" width=50px height=50px></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="/aboutUs.html">За играта</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="Lessons/lessons.html">Уроци</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contacts.php">Контакти</a>
              </li>
            </ul>
          </div>
		  <div class="functional-buttons">
            <ul id="myListMenu">
              <li id="buttonR1"><a href="/loginForm.html" class="rounded">Вход</a></li>
              <li id="buttonR2"><a href="/rules.html" class="rounded">Регистрация</a></li>
              <li id="buttonR4"><a href="/profile.html" class="rounded">`+sessionStorage.getItem("username")+`</a></li>
              <li id="buttonR3"><a href="/loginForm.html" class="rounded">Изход</a></li>
            </ul>
          </div>
        </div>`;
$("#buttonR3").attr('onClick', 'logOut()');

if (sessionStorage.getItem("email") != null) {		// Допълнително за логнат потребител
	$("#buttonR1").remove();
	$("#buttonR2").remove();
} else {	
	console.log("НЕ ЛОГНАТ");
	$("#buttonR3").remove();
	$("#buttonR4").remove();
}	


//функцията позволява да могат да се пускат снимки в даден елемент?
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

 
function drop(ev,mode) {
	ev.preventDefault();
	
	var dragId = ev.dataTransfer.getData("text");

	divId = ev.target.id;
	console.log("divId=="+divId);
	console.log("dragId =="+dragId);

	let indexLastCharacterOfdivId = divId.charAt(divId.length - 1);
	if (divId.charAt(divId.length - 2)>=0 && divId.charAt(divId.length - 2)<=10) {
		indexLastCharacterOfdivId = divId.charAt(divId.length - 2)+divId.charAt(divId.length - 1);
	}
	console.log("indexLastCharacterOfdivId="+indexLastCharacterOfdivId);
		
	var newNode = document.getElementById(dragId).cloneNode(true);
	clearChildren(ev.target);
	ev.target.appendChild(newNode);
	if (mode == 'edit') {
		console.log("Vliza v edit Mode");
		newNode.id = "leftImg"+indexLastCharacterOfdivId;
		console.log("newNode.id="+newNode.id);

		$("#"+newNode.id).addClass("image-checkbox");
		$("#"+newNode.id).removeClass("borderBetweenColumns");
		$("#"+newNode.id).attr('onClick', 'IMGClick(this.id)');
	} else {	// Режим ИГРА
		if (!divId.includes("img"))
			dropElement[indexLastCharacterOfdivId]=dragId;
	}

}


function clearChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }  
}

function checkLevel() {
	let textCorrectWrong = "";
	let ismeeting = true;

	for(let i=0; i < 24; i++) {
		if (leftImageObj[i+1]=="no" ) {
		 	if (leftImageObj[i]==dropElement[i/2]) {
				textCorrectWrong += leftImageObj[i]+" == "+dropElement[i/2]+"- OK\n";
			} else {
				textCorrectWrong += leftImageObj[i]+" != "+dropElement[i/2]+"- Wrong\n";
				ismeeting = false;
				break;
			}
		}
		i++;
	}

	if (ismeeting==true) {
		// Показва модал с информация за нивото
		
		$('#endingLevelModal').modal('show');
		textShow = JSON.parse(textLevel);
			
		modalTitle[1].innerHTML = `Поздравления, Вие завършихте успешно ниво ` + getCookie();
		let indexTextShow = currentLevel*2-1;		
		textEndingLevelModal.innerHTML = textShow[indexTextShow];
		if (sessionStorage.getItem("email") != null) {
			currentLevel++;
		} else {
			currentLevel = 1;		
		}
		
		setCookie(currentLevel);
		
		// Ако потребителя е логнат -> запазва новото ниво в базата данни, за да може да избира от кое ниво да започне следващия път
		// Ново ниво се записва САМО ако новото ниво > от sessionStorage.getItem("reachedLevelUser")
		if ( sessionStorage.getItem("email") != null && currentLevel > sessionStorage.getItem("reachedLevelUser") ) {	// Ако е логнат
			sessionStorage.setItem("reachedLevelUser", currentLevel);	// Запомня в сесията новото по-високо ниво
			if ( currentLevel > userExperienceLevel ) {	// Ако достигнатото в момента ниво е по-голямо, отколкото досега потребителя е стигал
				let fnc = 'UPDATE `users`  SET userExperienceLevel='+currentLevel+' where `mail`=&userMailIs=' +  textCrypto( sessionStorage.getItem("email") );
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						console.log("Успешно е направен update в базата данни за нивото на потребителя. Ново максимално ниво="+currentLevel);
					}
				}
				xhttp.open("GET","php_query.php?q="+fnc,true);
				xhttp.send();
			}
		}

	} else {
		// XXX Да се смени с МОДАЛ
		alert("Не уцелихте някои от електронните компоненти.");
		location.reload();
	}
	
}

function showCorrectImages(){
	console.log("showCorrectImages");
	
}

function showLevel() {
	let allElementsShow = document.querySelectorAll(".noShowingDivLevel");
	let allElementsHidden = document.querySelectorAll(".ShowingDivLevel");
	//console.log("allElementsShow="+allElementsShow);
	for(let i = 0; i < allElementsShow.length; i++) {
		allElementsShow[i].style.visibility  = "visible";
	}
	for(let i = 0; i < allElementsHidden.length; i++) {	
		allElementsHidden[i].style.visibility  = "hidden";
	}

}



function createLeftDivs(mode) {
	//Създава 12 div-а за местене на картинки
	let cond;
	if (mode == 'edit') {
		for(var i = 0; i < maxDiv; i++) {
			console.log("i="+i);
			
			cond = document.getElementById('leftImg'+i) || false ;
			if (cond == false) {
				$('#rowDraw').append('<div class="borderBetweenColumns col-md-3 widthDiv" id= "leftDiv' + i + '" ondrop="drop(event,modeForDrop)" ondragover="allowDrop(event)"><img id="leftImg' + i + '" class="imgCover " onclick="IMGClick(this.id)"></div>');

			} else {
				console.log("IMA IMG");
				document.getElementById("leftImg"+i).classList.add("image-checkbox");
				
			}
		}
	} else {
		for(var i = 0; i < maxDiv; i++) {
			cond = document.getElementById('leftDiv'+i) || false ;
			if (cond == false) {
				$('#rowDraw').append('<div class="borderBetweenColumns col-md-3 widthDiv" id= "leftDiv' + i + '" ondrop="drop(event)" ondragover="allowDrop(event)"><img id="leftImg' + i + '" class="imgCover"></div>');
			}
		}
	}
	
}
function createRightDivs ( maxVisibleDraggedElement, randomElements ) {
	// Създава div-ове, в които да са поместени снимките, които ще привлачваме
	let cond;
	for(let i = 0; i < maxVisibleDraggedElement; i++) {
		cond = document.getElementById(randomElements[i]) || false ;
		if (cond == false) {
			$('#rowImg').append('<div class="col-md-6 border borderBetweenColumns" id ="rigthDiv'+i+'"><img draggable="true" ondragstart="drag(event)" id="' + randomElements[i] + '" class="borderBetweenColumns "></div>');
		}
		
		
	}
}

function loadLevel(mode) {
	currentLevel = getCookie();
	console.log("currentLevel="+currentLevel);
	let nextLevelTitle = document.getElementById("titleLevel");
	//console.log("Predi nextLevelTitle");
	nextLevelTitle.innerHTML = `Ниво ` + currentLevel;
																
	let fnc = 'SELECT fileName,IMGshow FROM `levels` WHERE levelNumber = ' + currentLevel + ' ORDER BY DIVposition ASC ';
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
			// Първо създава LeftDIV
		  	createLeftDivs(mode);

			// След това зарежда снимките
			let randomElements = [];
			let dragIndex = 0;

			var resultFromPHPQuery = this.responseText;
			
			if ( resultFromPHPQuery != 'No result from query' ) {
				// Масив от string-ове: Име на файл, yes/no
				leftImageObj = JSON.parse(resultFromPHPQuery);

				for(let i = 0; i<24; i++) {
					// Винаги взимаме само четните елементи, защото те са имена на снимки
					if (leftImageObj[i+1] == "yes") {
						//document.getElementById('leftImg'+(i/2)).src = `pictures\\skin\\skin0${skin}\\${leftImageObj[i]}`;
						document.getElementById('leftImg'+(i/2)).style.height = sizeOfImg;
						document.getElementById('leftImg'+(i/2)).style.width  = sizeOfImg;
						$('#leftImg'+i/2).attr("src", `pictures\\skin\\skin0${skin}\\${leftImageObj[i]}`);
						$('#leftImg'+i/2).removeClass("image-checkbox-checked");
					} else if (leftImageObj[i+1] == "no") {
						if ( mode == 'edit' ) {
							$('#leftImg'+i/2).attr("src", `pictures\\skin\\skin0${skin}\\${leftImageObj[i]}`);
							$('#leftImg'+i/2).width(sizeOfImg);
							$('#leftImg'+i/2).height(sizeOfImg);
							//document.getElementById("leftImg"+i/2).src = `pictures\\skin\\skin0${skin}\\${leftImageObj[i]}`;
							//document.getElementById("leftImg"+i/2).style.height = sizeOfImg;
							//document.getElementById("leftImg"+i/2).style.width  = sizeOfImg;
							//document.getElementById("label"+i).addClass("image-checkbox-checked");

							selectedImageArray.push("leftImg"+i/2);
							//console.log("selectedImageArray="+selectedImageArray);
							$('#leftImg'+i/2).addClass("image-checkbox-checked");
							
							//console.log("objectImgArray[i/2]="+objectImgArray[i/2].src);				
							randomElements[dragIndex] = leftImageObj[i]; // Добавя верните отговори на първите места

						} else {
							$('#leftImg'+i/2).attr("src", ``);
							randomElements[dragIndex] = leftImageObj[i]; // Добавя верните отговори на първите места
						}
						dragIndex++;
					}	
					i++;			 
				} // Край на for
				
				
				
		 	}

			
		 if ( mode != 'edit' ) {	// Ако сме в режим ИГРА, само тогава разбърква 6 произволни снимки
			 rightLoadImage = JSON.parse(draggedImage);
	 
			 // Начало на рандом елeменти в drag секция
			 // Допълва до определен брой с рандом генерирани елементи
			 let random;
			 i = dragIndex;
			 while(i < maxVisibleDraggedElement) { 
				random = Math.round(Math.random()*32);
				randomElements[i] = rightLoadImage[random];
				let bFound = false;
				let j = 0;
				while(j < i || bFound == true) {		// Върти цикъла докато не октрие елемент, който не се повтаря с някой от предишните 
					if (randomElements[i]==randomElements[j]) {
						bFound = true;
						break;
					}
					j++;
				}
				if (!bFound)	
					i++;	//Преминава към следващ елемент само ако не е намерил повтаряне.
			 }
			 // Край на рандом елменти
			 
			 // Размешва всички елементи от drag секцията, за да може да верните елементи да не са на първите места  	 
			  let randomIndex1, randomIndex2; // Променливи , чрез които се разменят индекси в масива
			  for(let i = 0; i < maxVisibleDraggedElement; i++) {
				randomIndex1 = Math.round(Math.random()*(maxVisibleDraggedElement-1));
				randomIndex2 = Math.round(Math.random()*(maxVisibleDraggedElement-1));

				temp = randomElements[randomIndex1];
				randomElements[randomIndex1] = randomElements[randomIndex2];
				randomElements[randomIndex2] = temp;
			  }
		
			  // Създава десни DIV
			  createRightDivs(maxVisibleDraggedElement,randomElements);
				
			  // Зарежда снимки
			  for(let i = 0;i < maxVisibleDraggedElement; i++) {
					draggedImageId.push(document.getElementById(randomElements[i]));
					draggedImageId[i].src = `pictures\\skin\\skin0${skin}\\${randomElements[i]}`;	
					draggedImageId[i].style.height = sizeOfImg;
					draggedImageId[i].style.width = sizeOfImg;	
			  }
		  }	// Край на проверка дали сме в режим ИГРА
	   }
	}

	xhttp.open("GET","php_query.php?q="+fnc,true);
	xhttp.send();
}

function setCookie(cname) {
	document.cookie = cname;
}
  
function getCookie() {
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	
	if (ca[0] >= 0 && ca[0]<=100)
	  currentLevel = ca[0];	

	return currentLevel;	
}

function loadCreateLevel() {
	console.log("VLizav v loadCreateLevel");
	let nextLevelTitle = document.getElementById("titleLevel");
	nextLevelTitle.innerHTML = "Създаване на нива";	
	
	// Прави запитване към mysql, за да види колко нива са въведени и кое да се редактира и кое ще бъде НОВО
	let fnc = 'SELECT MAX(levelNumber) FROM `levels`';
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			maxLevel = this.responseText;

			console.log("maxLevelOT LOADCREATELEVEL="+maxLevel);


			$('#dropdownMenu').append('<option onclick="deleteSelectMenu()" id="optionId" class="dropdown-item" value="' + 0 + '" selected>Изберете ниво</option>');	

			for( let i = 1; i <= maxLevel; i++) {
				$('#dropdownMenu').append('<option onclick="deleteSelectMenu()" id="optionId" class="dropdown-item" value="' + i + '">Ниво '+ i +'</option>');
			}
			$('#dropdownMenu').append('<option onclick="deleteSelectMenu()" id="optionId" class="dropdown-item" value="' + (parseInt(maxLevel) + 1) + '">Създай собствено ниво</option>');
		} 
	}
	xhttp.open("GET","php_query.php?q="+fnc,true);
	xhttp.send();
	// Край на заявка за проверка колко нива има въведени до момента
	
		createLeftDivs('edit'); 
		 
		let rightLoadImageCreate = JSON.parse(draggedImage);
		
		// Прави десните DIV
		createRightDivs(allImage,rightLoadImageCreate);
		 
		// Зарежда всички снимки (режим редактиране)
		for(let i = 0;i < allImage; i++) {
			draggedImageId.push(document.getElementById(rightLoadImageCreate[i]));
			draggedImageId[i].src = `pictures\\skin\\skin0${skin}\\${rightLoadImageCreate[i]}`;	
			draggedImageId[i].style.height = sizeOfImg;
			draggedImageId[i].style.width  = sizeOfImg;	
			console.log("draggedImageId[i].src="+draggedImageId[i].src);
		}		
	
}

function IMGClick (IDofElement) {
	console.log("VLiza v IMGClick - id = "+IDofElement);
	
	if ( $("#"+IDofElement).hasClass('image-checkbox-checked')) {	
		$("#"+IDofElement).data('image-checkbox-checked', false);		
		$("#"+IDofElement).removeClass("image-checkbox-checked");
		console.log("Vliza v razmarkirane");
	} else {
		$("#"+IDofElement).data('image-checkbox-checked', true);		
		$("#"+IDofElement).addClass("image-checkbox-checked");
		console.log("Vliza v markirane");
	}
	updateSelectedImagesArray(IDofElement);	
}

function showLevelsForUser() {	
	
	console.log("maxLevel Всички въведени до момента нива = "+maxLevel );
	console.log("reachedLevelUser за този потребител = "+sessionStorage.getItem("reachedLevelUser") );
	
	for(let i = 1 ; i <= maxLevel  ; i++) {
		if ( i > sessionStorage.getItem("reachedLevelUser")) {
			$("#divContinueGame").append('<button class="btn m-3 lockedLevel text-white" id="buttonLevel' + i + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/></svg></i></button>');		
		} else {
			$("#divContinueGame").append('<button class="btn colorOfButton m-3 text-white" id="buttonLevel' + i + '" onclick="buttonContinueGame(this.id)">' + i + '</button>');		
		}
	}	
	
	$("#continueGame").remove();
}
function buttonContinueGame(idOfButton) {
	console.log("setCookie="+idOfButton.charAt(idOfButton.length - 1));
	setCookie(idOfButton.charAt(idOfButton.length - 1));
	window.location.href = "https://www.interactiveelectronics.eu/startLevels.html";
}

function updateSelectedImagesArray(IDofElement) {
		if ($("#"+IDofElement).hasClass('image-checkbox-checked')) {		
				if (!selectedImageArray.includes(IDofElement)) {
					console.log("leftImageObj="+"#leftImg="+IDofElement);
					selectedImageArray.push(IDofElement);
				}
		} else {
			for( let i = 0 ; i < selectedImageArray.length ; i++ ) {
				if (selectedImageArray[i]==IDofElement) {
					selectedImageArray.splice(i, 1); 
				}
			}

		}
}

function deleteImage() {
	for (let i = 0; i < selectedImageArray.length; i++) {
	
		$('#'+selectedImageArray[i]).remove();
		
		$('.image-checkbox').removeClass('image-checkbox-checked');

	}
	console.log("#"+selectedImageArray);
	selectedImageArray = [];
}
function deleteSelectMenu() {
	document.getElementById("dropdownMenu").remove();
}
function showModalSaveGame() {
	let textModalBody = document.getElementById("textModalBody");
	textModalBody.innerHTML = "Искате ли да запазите ниво " + getCookie() + "?";
}

function buttonPressedNewGame() {
	setCookie(1);
}

function buttonPressedContinueGame() {
	setCookie(currentLevel);
}

function ChangeLevelInEditMode(event) {
	var selectElement = event.target;
    var value = selectElement.value;
	console.log("Избрано ниво за редактиране : "+value);
	// Зарежда избраното ниво ако съществува. Ако НЕ съществува се отварят празни полета
	setCookie(value);
	loadLevel ('edit');
} 

function saveLevel() {
	getCookie();
	// Извършва заявка за запис на ниво
	let phpquery;
	let imgShow;
	
	console.log("Zapochva saveLevel ..........level="+currentLevel+".....maxLevel="+maxLevel+".......");
	
	let ifOneElementChecked = false;
	let ifOneImg = false;
	
	let queryStr;
	if ( sessionStorage.getItem("userType") == 2 )
		// Ако е администратор -> запазва в реалната таблица
		queryStr = "INSERT INTO `levels` (date, levelNumber, fileName, DIVposition, IMGshow) VALUES ";
	else
		// Ако е логнат потребител -> запазва в друга таблица, която се преглежда от администратор и тогава се публикува
		queryStr = "INSERT INTO `levelsusers` (date, levelNumber, fileName, DIVposition, IMGshow) VALUES ";
		
	let queryParams 	= "";
	
	for (let i = 0; i < maxDiv;i++) {
		leftImgId = document.getElementById("leftImg"+i);
		cond = document.getElementById("leftImg"+i) || false;
		if ( cond != false  && leftImgId.src.length > 0) {
			ifOneImg=true;
			if (leftImgId.classList.contains('image-checkbox-checked')) {
				imgShow = "no";
				ifOneElementChecked = true;
			} else {
				imgShow = "yes";	
			}
		} else {
			ifOneImg=false;
			break;

		}
		
		console.log("leftImgId.src (id="+i+")="+leftImgId.src );
		let onlyFileName = leftImgId.src;
		
		onlyFileName = onlyFileName.substring(onlyFileName.lastIndexOf("/") + 1);
		
		queryParams 		+= "(now(), "+currentLevel+", '"+onlyFileName+"', "+(i+1)+" , '"+imgShow+"')";
		if ( i != maxDiv-1 )	// Добавя запетая на всички редове, без последния
			queryParams 		+= ", ";
		
	}
	queryStr += queryParams;	// Добавя началото на заявката с данните, които трябва да се запишат
	
	if ( currentLevel > maxLevel ) {
		console.log("Zapazvam NOVO nivo - INSERT.");
		queryStr = "&q="+queryStr;
	} else {
		console.log("aktualiziram starvo niwo - UPDATE.");
		queryStr = "update="+currentLevel+"&q="+queryStr;	// Добавя начало на заявката, за да изтрие текущите данни за ниво
	}
	
	if (ifOneElementChecked==false) {
		$("#textForErrorForSavingLevels").html('Трябва да маркирате поне 1 елемент, който да бъде скрит');
		$('#modalForErorr').modal('show');
	}
	if (ifOneImg==false) {
		$("#textForErrorForSavingLevels").html('Трябва да запълните всички празни позиции с елменти от дясно');
		$('#modalForErorr').modal('show');
	}
	
	
	if (ifOneImg == true && ifOneElementChecked == true ) {		
		let fnc = queryStr;
		
		if ( sessionStorage.getItem("userType") == 2 ) {		// Ако е администратор - запазва нивото
			console.log("Има право - записва директно.");
			document.getElementById("saveLevel").onclick = function() {
				document.getElementById("textModalBodySecondModal").innerHTML = `Вие успешно запазихте нивото`;
				$('#modalForSavedLevel').modal('show');
			}
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// Divs left
					console.log("Заявката е завършена. Резултат : "+this.responseText);
					
				} else {
					console.log("Не е завършена заявката... Продължава да работи...");
				}
			}
			fnc = "1php_query.php?"+fnc+"&adminSaveLevel=yes&usermail="+textCrypto(sessionStorage.getItem("email"));
			console.log("fnc = "+fnc);
			xhttp.open("GET",fnc,true);
			xhttp.send();		
		} else {	// Ако е само потребител, не администратор, показва съобщение за изпращане на ниво към администратора
			console.log("Това не е администратор - изпраща към администратор, но не прави нивото активно.");
			document.getElementById("saveLevel").onclick = function() {
				document.getElementById("textModalBodySecondModal").innerHTML = `Данните са изпратени към администратор на сайта, след одобрение, ще бъдат публикувани`;
				$('#modalForSavedLevel').modal('show');
			}
			
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				console.log("Predi readyState and this.status=200");
				if (this.readyState == 4 && this.status == 200) {
					// Divs left
					console.log("Заявката е завършена. Резултат : ");
					console.log(this.responseText);
					
					
					
				} else {
					console.log("Не е завършена заявката... Продължава да работи...");
				}
			}
			fnc = "1php_query.php?"+fnc+"&adminSaveLevel=no&usermail="+textCrypto(sessionStorage.getItem("email"));
			console.log("fnc = "+fnc);
			xhttp.open("GET",fnc,true);
			xhttp.send();		
			
			alert("Данните са изпратени към администратор на сайта, след одобрение, ще бъдат публикувани. ");
		}
	}	
}

function IsMatchingPassword(value) {
	if ( value ) {
		password = value;
	} else {
		password = document.getElementById('idPasswordX').value;
	}

	let cryptoPass = makeCryptoPassword (password);
	if ($('#idHiddenPassword').length > 0) {
		document.getElementById('idHiddenPassword').value = cryptoPass;
	}
	
	let passwordRegexLowLetter = /[a-z]+/;
	let passwordRegexUpperLetter = /[A-Z]+/;
	let passwordRegexDigits = /[0-9]+/;
	let passwordRegexlength = /^.{6,}$/;
	let errorPassword = document.getElementById("errorМessagePassword");
	let errorMessagePassword = "";
	let containingLowLetter = false;
	let containingUpperLetter = false;
	let containingDigits = false;
	let containingCorrectLength = false;
	let containingSpecialSymbols = false;


	if (passwordRegexLowLetter.test(password)) {
		containingLowLetter=true;
	} else {
		errorMessagePassword += "Няма малки букви.<br>";
	}
	if (passwordRegexUpperLetter.test(password)) {
		containingUpperLetter=true;
	} else {
		errorMessagePassword += "Няма големи букви.<br>";
	}
	if (passwordRegexDigits.test(password)) {
		containingDigits=true;
	} else {
		errorMessagePassword += "Няма цифри.<br>";
	}
	if (passwordRegexlength.test(password)) {
		containingCorrectLength=true;
	} else {
		errorMessagePassword += "Трябва да е по-дълга от 8 символа.<br>";
	}

	errorPassword.innerHTML=errorMessagePassword;
	if (containingLowLetter==true && containingUpperLetter==true && containingDigits==true && containingCorrectLength==true) {
		return true;
	} else {
		return false;
	}
}

function checkForCorrectSymbolLogin(textForCheck) {
		let errorМessageInLogin = document.getElementById("errorМessagePassword");
		let errorMessagetextForCheck = "";
		let textCorrect = true;
		
		let allowSymbols = /^[@a-zA-Zа-яА-Я0-9! _.-]+$/;
		if (!allowSymbols.test(textForCheck)) {
			textCorrect = false;
			errorMessagetextForCheck = "В полетата има забранени символи. Разрешени са всички букви, цифри, тире, долно тире, интервал, удивителен и маймунка (@)<br>";
			errorМessageInLogin.innerHTML=errorMessagetextForCheck;
			return false;
		} else {
			errorMessagetextForCheck = "";
			errorМessageInLogin.innerHTML=errorMessagetextForCheck;
			return true;
		}
}

function checkForCorrectSymbolRegistration(textForCheck, errorReturnID) {
		let errorМessageID = document.getElementById(errorReturnID);
		let errorMessagetextForCheck = "";

		if ( textForCheck.length <= 3 ) {
			errorMessagetextForCheck = "Въведените символи са много малко.<br>";
			errorМessageID.innerHTML=errorMessagetextForCheck;
			return false;
		}

		let textCorrect = true;
		let allowSymbols = /^[@a-zA-Zа-яА-Я0-9! _.-]+$/;
		if (!allowSymbols.test(textForCheck)) {
			textCorrect = false;
			errorMessagetextForCheck = "В полетата има забранени символи. Разрешени са всички букви, цифри, тире, долно тире, интервал, удивителен и маймунка (@)<br>";
			errorМessageID.innerHTML=errorMessagetextForCheck;
			return false;
		} else {
			errorMessagetextForCheck = "";
			errorМessageID.innerHTML=errorMessagetextForCheck;
			return true;
		}
}

function IsMatchingEmail(value) {
	if (value) {
		email = value;
	} else {
		email = document.getElementById('idEmailX').value;
	}
	
	
	let emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let errorEmail = document.getElementById("errorМessageEmail");
	let errorMessageEmail = "";
	let correctEmail = false;
	if (emailRegex.test(email)) {
		correctEmail=true;
	} else {
		errorMessageEmail += "Невалидна електронна поща.<br>";
	}
	errorEmail.innerHTML =errorMessageEmail;
	return correctEmail;
}	

function correctRepeat(email, password) {
	let repeatEmail = document.getElementById("repeatEmail").value;
	let repeatPassword = document.getElementById("repeatPassword").value;
	let errorRepeatEmail = document.getElementById("errorМessageRepeatEmail");
	let errorRepeatPassword = document.getElementById("errorМessageRepeatPassword");
	let errorМessageRepeatEmail = "";
	let errorМessageRepeatPassword = "";
	
	if (email!=repeatEmail) {
		errorМessageRepeatEmail += "Електронната Ви поща не е правилно повторена.";
	}
	if (password!=repeatPassword) {
		errorМessageRepeatPassword += "Паролата Ви не е правилно повторена.";
	}
	errorRepeatEmail.innerHTML = errorМessageRepeatEmail;
	errorRepeatPassword.innerHTML = errorМessageRepeatPassword;
	if (errorМessageRepeatEmail == "" && errorМessageRepeatPassword == "") {
		return true;
	}
}

function registerUser() {
	let email = $("#idEmailX").val();
	let password = $("#idPasswordX").val();
	let name = $("#name").val();

	
	let isPassword=IsMatchingPassword(password);
	let isEmail=IsMatchingEmail(email);
	
	let isRepeatedCorrectly=correctRepeat(email, password);

	if ( checkForCorrectSymbolRegistration (email, "errorМessageEmail") == false ) {
		console.log("Има забранени символи в Електронната поща : "+email);
		return;
	}
	if ( checkForCorrectSymbolRegistration (password, "errorМessagePassword") == false ) {
		console.log("Има забранени символи в Паролата : "+password);
		return;
	}
	if ( checkForCorrectSymbolRegistration (name, "errorМessageName") == false ) {
		console.log("Има забранени символи в name : "+name);
		return;
	}

	if (isPassword==true && isEmail==true && isRepeatedCorrectly==true) {

		let cryptoPass = makeCryptoPassword (password);		
		let query = "email="+textCrypto(email)+"&pass="+ cryptoPass +"&name="+textCrypto($("#name").val());

		console.log("Правилно са въведени данни, ще направи mysql заявка.");
		console.log("query : Ще изпълня заявка : "+query);

		$("#registrationDiv").remove();
		console.log("query="+query);
		let resultFromPHP;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				resultFromPHP = this.responseText;
				console.log ("result="+resultFromPHP);
				if (resultFromPHP.includes("NoActivatedKey"))
					$("#noVisibleDivRegistration").html('<p class="inwardsLine text-dark">Не е намерен правилен активационен ключ. Моля, проверете линка получен на мейла. Ако проблема продължи, свържете се с администратор на сайта. </p>');

				if (resultFromPHP.includes("UserActivated"))
					$("#noVisibleDivRegistration").html('<p class="inwardsLine text-dark">Успешно активирахте Вашият профил. Може да се възползвате от всички функции на сайта.</p>');

				if (resultFromPHP.includes("UsernameExist"))
					$("#noVisibleDivRegistration").html('<p class="p-5 inwardsLine text-dark">Потребител с това потребителско име съществува.</p><p class="p-5 inwardsLine text-dark">Ако вече сте се регистрирали в този сайт използвайте меню ВХОД.<br>Ако не сте активирали профила си, използвайте линка, получен на Вашата електронна поща.<br>Ако не намирате линк, изпратете съобщение до нас от формата КОНТАКТИ в главното меню.</p>');

				if (resultFromPHP.includes("UserEmailExist"))
					$("#noVisibleDivRegistration").html('<p class="p-5 inwardsLine text-dark">Потребител с тази електронна поща съществува.</p><p class="p-5 inwardsLine text-dark">Ако вече сте се регистрирали в този сайт използвайте меню ВХОД.<br>Ако не сте активирали профила си, използвайте линка, получен на Вашата електронна поща.<br>Ако не намирате линк, изпратете съобщение до нас от формата КОНТАКТИ в главното меню.</p>');

				if (resultFromPHP.includes("RegistrationSuccessful"))
					$("#noVisibleDivRegistration").html('<p class="p-5 inwardsLine text-dark">Регистрацията премина успешно. <br>На Вашата електронна поща ще получите линк, с който да активирате профила си. <br>Той ще бъде активен 24 часа.</p>');

				if (resultFromPHP.includes("NoQuery"))
					$("#noVisibleDivRegistration").html('<p class="p-5 inwardsLine text-dark">Грешни данни.</p>');

				if (resultFromPHP.includes("IncorrectSymbolsOnInput2"))
					$("#noVisibleDivRegistration").html('<p class="inwardsLine text-dark">Некоректни символи при начална регистрация на потребител. Разрешените символи са всички букви на латиница, всички на кирилица и някои специални символи като тире, долно тире, удивителен знак и интервал. Всички останали символи са забранени с цел защита на страницата.</p>');

				if (resultFromPHP.includes("IncorrectSymbolsOnInput1"))
					$("#noVisibleDivRegistration").html('<p class="inwardsLine text-dark">Некоректни символи при активация на потребител.</p>');


				$("#noVisibleDivRegistration").css("visibility", "visible");
				
			} 
		}
		xhttp.open("GET","register.php?"+query,true);
		xhttp.send();
		
		
		// Край на заявка за проверка колко нива има въведени до момента	
	}
}

function setCharAt(str,index,chr) {
    if (index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function makeCryptoPassword (clearPass) {
	let newPassword
	newPassword = md5(clearPass);
	let letterA = newPassword.charAt(0);
	let letterB = newPassword.charAt(31);
	newPassword = setCharAt(newPassword, 0,letterB);
	newPassword = setCharAt(newPassword,31,letterA);
	return newPassword;
}

function logUser() {
	let email;
	let password;

	email = $("#mailID1").val();
	password = $("#passID1").val();
	
	let cryptoPass = makeCryptoPassword (password);

	let query = "email="+textCrypto(email)+"&pass="+cryptoPass;
	
	if ( checkForCorrectSymbolLogin (email) == false ) {
		console.log("Има забранени символи в Електронната поща : "+email);
		return;
	}
	if ( checkForCorrectSymbolLogin (password) == false ) {
		console.log("Има забранени символи в Паролата : "+password);
		return;
	}
	
	console.log("LogUser. Правилно са въведени данни, ще направи mysql заявка. query="+query);
	
	// Проверява дали някое от полетата е празно
	if ( email == '' || password == '' ) {
		$("#NoVisibeErrorDiv").html('<p class="text-dark" id="errorMessage"> Не сте попълнили едно от полетата Електронна поща или Парола.</p>');
		$("#NoVisibeErrorDiv").css("visibility", "visible");
	} else {	
		let resultFromPHP;
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				resultFromPHP = this.responseText;
				if (resultFromPHP.includes("LoginSuccessful")) {	// Ако от PHP е върнато, че има успешно логване
					console.log("LoginSuccessful");
					console.log(resultFromPHP);

					let splitResultArray = resultFromPHP.split("@@@");
					if ( parseInt(splitResultArray[1]) > 0 ) 	// Търси дали има записано ниво за конкретния потребител
						userExperienceLevel = parseInt(splitResultArray[1]);
					else 
						userExperienceLevel = 1;

					if ( parseInt(splitResultArray[2]) > 0 ) 	// Търси дали има записан тип потребител
						userType = parseInt(splitResultArray[2]);
					else
						userType = 1;

					if ( splitResultArray[3].length > 0 ) 	// Търси дали има записано име на потребител
						username = textDeCrypto (splitResultArray[3]);
					else
						username = "noName";

					if ( splitResultArray[4].length > 0 ) 	// Търси дали има записана електронна поща на потребител
						email = textDeCrypto (splitResultArray[4]);
					else
						email = "noEmail";

					if ( splitResultArray[5].length > 0 ) 	// Търси дали има записана електронна поща на потребител
						keyss = splitResultArray[5];
					else
						keyss = "noKeyss";

					sessionStorage.setItem("username", username);
					sessionStorage.setItem("email", email);
					sessionStorage.setItem("logInTime", Date.now());
					sessionStorage.setItem("reachedLevelUser", userExperienceLevel);
					sessionStorage.setItem("userType", userType);
					sessionStorage.setItem("keyss", keyss);

					// Печата съобщение ДОБРЕ ДОШЪЛ ...
					$("#logInDiv").remove();
					$("#noVisibleDivLogIn").html(`<p class="inwardsLine text-dark"> Добър ден <b>` + sessionStorage.getItem("username") + `</b>, Вие успешно влязохте в Нашия сайт.</p><br>`);
					$("#noVisibleDivLogIn").css("visibility", "visible");
					$(".backgroundMainDivColor").css("width", "100%");
			
					// Сменя бутоните в главното меню горе вдясно, за логнат потребител
					$("#buttonR1").remove();
					$("#buttonR2").remove();

					// Добавяне на изтритите менюта за логнат потребител МЕНЮ ПРОФИЛ
					var ul = document.getElementById("myListMenu");
					var li1 = document.createElement("li");
					ul.appendChild(li1);
					li1.id = "buttonR4";
					li1.value = "buttonR4";
					let anchor1 = document.createElement('a');
					let link1 = document.createTextNode(sessionStorage.getItem("username"));
					anchor1.appendChild(link1);
					anchor1.href = "/profile.html";
					anchor1.id = "ahrefR4";
					li1.appendChild(anchor1);
					$("#ahrefR4").addClass("rounded");

					// Добавяне на изтритите менюта за логнат потребител МЕНЮ ИЗХОД

					var li2 = document.createElement("li");
					ul.appendChild(li2);
					li2.id = "buttonR3";
					li2.value = "buttonR3";
					let anchor2 = document.createElement('a');
					let link2 = document.createTextNode("изхоД");
					anchor2.appendChild(link2);
					anchor2.href = "/loginForm.html";
					anchor2.id = "ahrefR3";
					li2.appendChild(anchor2);
					$("#buttonR3").attr('onClick', 'logOut()');
					$("#ahrefR3").addClass("rounded");
					// Край на добавяне на изтритите полета за логнат потребител




				} else {
					userExperienceLevel = 0;
				}
				if (resultFromPHP.includes("NOKNoUserResult")) {
					$("#NoVisibeErrorDiv").html('<p class="text-dark" id="errorMessage">Неправилна електронна поща или парола. </p>');
				}

				if (resultFromPHP.includes("NoQuery")) {
					$("#NoVisibeErrorDiv").html('<p class="inwardsLine text-dark" id="errorMessage">Не успешна връзка с база данни.</p>');
				}

				$("#NoVisibeErrorDiv").css("visibility", "visible");

			} 
		}
		xhttp.open("GET","login.php?"+query,true);
		xhttp.send();
		// Край на заявка за проверка колко нива има въведени до момента	
	}
}

function logOut () {
	// Remove all saved data from sessionStorage
	sessionStorage.clear();
	// Remove saved data from sessionStorage
	sessionStorage.removeItem('email');

	location.href = "https://www.interactiveelectronics.eu/loginForm.html";
}

function onLoadProfile(){
	$("#profileTypeOfUser").html(sessionStorage.getItem("userType"));
	$("#profileMaxLevel").html(sessionStorage.getItem("reachedLevelUser"));
	$("#profileUserName").html(sessionStorage.getItem("username"));
	$("#profileEmail").html(sessionStorage.getItem("email"));
	document.getElementById("ahrefLink").href="/forgottenChangePassword.php?action=allow&activationCode="+sessionStorage.getItem("keyss");
}

function textCrypto(clearText){
	let newStr = "";
	for (let i=0; i<clearText.length; i++ ){
		if ( i%2 == 0 )
			newStr += String.fromCharCode (  clearText.charCodeAt(i) - 2 );
		else
			newStr += String.fromCharCode (  clearText.charCodeAt(i) + 1 );
	}		
	return newStr;
}	

function textDeCrypto(clearText){
	let newStr = "";
	for (let i=0; i<clearText.length; i++ ){
		if ( i%2 == 0 )
			newStr += String.fromCharCode (  clearText.charCodeAt(i) + 2 );
		else
			newStr += String.fromCharCode (  clearText.charCodeAt(i) - 1 );
	}		
	return newStr;
}	
