let dropElement = [];
let selectedImageArray = [];
let draggedImageId = [];
let maxVisibleDraggedElement = 6; 

let rightLoadImage;
let leftImageObj;
let temp;
let maxDiv = 12;
let userName = "Alex";
let maxLevel;
let leftImgId;

//let rowImg;

var dragId;
var divId;
let currentLevel = 1;
let beginGameCookie = 1;

let skin = 2;
let sizeOfImg = "100%";
let fragment;
let modeForDrop = 'edit';

let textOpeningLevelModal = document.getElementById("textOpeningLevelModalId");
let textEndingLevelModal = document.getElementById("textEndingLevelModalId");
let modalTitle = document.querySelectorAll(".modal-title");
let textShow;
//console.log("curentLevel"+currentLevel);
//console.log("textShow"+textShow[0]);



		let fnc = 'SELECT MAX(levelNumber) FROM `levels`';
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				maxLevel = this.responseText;
	
				console.log("maxLevel ot GLOBAL="+maxLevel);
			} 
		}
		xhttp.open("GET","php_query.php?q="+fnc,true);
		xhttp.send();
		// Край на заявка за проверка колко нива има въведени до момента





//функцията позволява да могат да се пускат снимки в даден елемент?
function allowDrop(ev) {
	console.log("VLizam v FUNCTION allowDrop....");
	ev.preventDefault();
}

function drag(ev) {
	console.log("VLizam v FUNCTION DRAG....");
	ev.dataTransfer.setData("text", ev.target.id);
}

 
function drop(ev,mode) {
	console.log("VLizam v FUNCTION DROP....");
	ev.preventDefault();
	
	var dragId = ev.dataTransfer.getData("text");

	divId = ev.target.id;
	console.log("divId=="+divId);
	console.log("dragId =="+dragId);
//	dragId = 'imgDiv'+divId;	
//	console.log("dragId"+dragId);

	let indexLastCharacterOfdivId = divId.charAt(divId.length - 1);
	if(divId.charAt(divId.length - 2)>=0 && divId.charAt(divId.length - 2)<=10){
		indexLastCharacterOfdivId = divId.charAt(divId.length - 2)+divId.charAt(divId.length - 1);
	}
	console.log("indexLastCharacterOfdivId="+indexLastCharacterOfdivId);
//	if(mode == 'edit'){
//		console.log("VLiza v dropEdit");
//		document.getElementById(dragId).id = "leftImg"+indexLastCharacterOfdivId;
//		document.getElementById("leftImg"+indexLastCharacterOfdivId).classList.add("image-checkbox");
//		document.getElementById("leftImg"+indexLastCharacterOfdivId).classList.add("image-checkbox-checked");
//		$("leftImg"+indexLastCharacterOfdivId).data('image-checkbox-checked', true);		
				
		//$("#"+dragId).addClass("image-checkbox");
		//$("#"+dragId).addClass("image-checkbox-checked");
		//$("#"+dragId).prop("id", "leftImg"+indexLastCharacterOfdivId);
		
		

		//console.log("document.getElementById(dragId).id="+document.getElementById("leftImg"+indexLastCharacterOfdivId).id);
//	}

	
	var newNode = document.getElementById(dragId).cloneNode(true);
	clearChildren(ev.target);
	ev.target.appendChild(newNode);
	if(mode == 'edit'){
		console.log("Vliza v edit Mode");
		newNode.id = "leftImg"+indexLastCharacterOfdivId;
		console.log("newNode.id="+newNode.id);

		$("#"+newNode.id).addClass("image-checkbox");
		$("#"+newNode.id).removeClass("borderBetweenColumns");
		$("#"+newNode.id).attr('onClick', 'IMGClick(this.id)');
		//document.getElementById(dragId).id = "leftImg"+indexLastCharacterOfdivId;
//		document.getElementById("NewleftImg"+indexLastCharacterOfdivId).classList.add("image-checkbox");
//		document.getElementById("NewleftImg"+indexLastCharacterOfdivId).classList.add("image-checkbox-checked");
	
	} else {	// Режим ИГРА

		if(!divId.includes("img")){
			console.log("VLizam v if");
			dropElement[indexLastCharacterOfdivId]=dragId;
		//	console.log("dropElement["+divId+"]="+dropElement[divId]);
		}
		//console.log("document.getElementById(dragId).id="+document.getElementById(dragId));
		console.log("dropElement="+dropElement);
		console.log("dragId="+dragId);

	}
	

	
	console.log("document.getElementById(NewleftImg+indexLastCharacterOfdivId)="+document.getElementById("leftImg"+indexLastCharacterOfdivId).id);
	
	
}


function clearChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }  
}

//let sizeImg = document.querySelectorAll(".borderBetweenColumns")
//let sizeOfImgWidth = "100%";
//for(let i = 0 ; i < sizeImg.length ; i++){
//	sizeImg[i].style.width = sizeOfImgWidth;
//}

function checkImg() {
	let textCorrectWrong = "";
	let ismeeting = true;

	for(let i=0; i < 24; i++){
		if(leftImageObj[i+1]=="no" ){
			console.log("i="+i+"; i/2="+i/2);
			console.log("ismeeting="+ismeeting);
			console.log("leftImageObj[i]="+leftImageObj[i]+";-----dropElement[i/2]="+dropElement[i/2]);
		 	if(leftImageObj[i]==dropElement[i/2]){
				textCorrectWrong += leftImageObj[i]+" == "+dropElement[i/2]+"- OK\n";
				

			}else{
				textCorrectWrong += leftImageObj[i]+" != "+dropElement[i/2]+"- Wrong\n";
				ismeeting = false;
				break;
			}
		}
		i++;

	}
	alert("leftImageObj="+leftImageObj+"\ndivId="+document.getElementById('leftDiv'+i).id);

	if(ismeeting==true){
		alert("Pravilni i Greshni\n"+textCorrectWrong);
		// Показва модал с информация за нивото
		
		$('#endingLevelModal').modal('show');
		console.log("Vliza v modal");
		textShow = JSON.parse(textLevelOne);
		modalTitle[1].innerHTML = `Поздравления, Вие завършихте успешно ниво ` + getCookie();
		textEndingLevelModal.innerHTML = textShow[1];
		

		currentLevel++;
		setCookie(currentLevel);
		$('#toStartNextLevel').on( "click", function() {
			window.location.reload();
		});
	}else{
		
		alert("Не уцелихте някои от електронните компоненти.");
		location.reload();
	}
	
}

function showLevel(){
	let allElementsShow = document.querySelectorAll(".noShowingDivLevel");
	let allElementsHidden = document.querySelectorAll(".ShowingDivLevel");
	//console.log("allElementsShow="+allElementsShow);
	for(let i = 0; i < allElementsShow.length; i++){
		allElementsShow[i].style.visibility  = "visible";
	}
	for(let i = 0; i < allElementsHidden.length; i++){	
		allElementsHidden[i].style.visibility  = "hidden";
	}

}



function createLeftDivs(mode){
	//Създава 12 div-а за местене на картинки
	let cond;
	console.log("VLiza V createLeftDivs....V rezim : "+mode);
	if(mode == 'edit'){
		console.log("EDIT MODE: Vliza predi FOR");
		for(var i = 0; i < maxDiv; i++){
			console.log("i="+i);
			
//			cond = document.getElementById("leftImg"+i) || false; 
//			console.log(" $('#leftDiv'+i)="+ $('#leftDiv'+i));
			//document.getElementById('leftDiv'+i) || false ;

			cond = document.getElementById('leftImg'+i) || false ;
			if(cond == false){
//				console.log("NQMA IMG i sazdava DIV i IMG");
				$('#rowDraw').append('<div class="borderBetweenColumns col-md-3 widthDiv" id= "leftDiv' + i + '" ondrop="drop(event,modeForDrop)" ondragover="allowDrop(event)"><img id="leftImg' + i + '" class="imgCover " onclick="IMGClick(this.id)"></div>');

			} else {
				console.log("IMA IMG");
				document.getElementById("leftImg"+i).classList.add("image-checkbox");
				
			}
		}
	} else {
		console.log("createLeftDivs - PLAY MODE: Vliza predi FOR");
		for(var i = 0; i < maxDiv; i++){
			cond = document.getElementById('leftDiv'+i) || false ;
			if(cond == false){
				$('#rowDraw').append('<div class="borderBetweenColumns col-md-3 widthDiv" id= "leftDiv' + i + '" ondrop="drop(event)" ondragover="allowDrop(event)"><img id="leftImg' + i + '" class="imgCover"></div>');
			}
		}
	}
	
}
function createRightDivs ( maxVisibleDraggedElement, randomElements ){
	// Създава div-ове, в които да са поместени снимките, които ще привлачваме
	let cond;
	for(let i = 0; i < maxVisibleDraggedElement; i++){
		cond = document.getElementById(randomElements[i]) || false ;
		if(cond == false){
			$('#rowImg').append('<div class="col-md-6 border borderBetweenColumns" id ="rigthDiv'+i+'"><img draggable="true" ondragstart="drag(event)" id="' + randomElements[i] + '" class="borderBetweenColumns "></div>');
		}
		
		
	}
}
function button6(){
	//for(let i = 0; i < maxDiv; i++){
	//	console.log("divId="+document.getElementById("imgDiv"+i).id);
	//}
	console.log("getCookie()="+getCookie());
	console.log("currentLevel="+currentLevel);

}

function loadLevel(mode) {
	currentLevel = getCookie();
	console.log("VLIZA V LOADLEVEL");	
	
	let nextLevelTitle = document.getElementById("titleLevel");
	//console.log("Predi nextLevelTitle");
	nextLevelTitle.innerHTML = "Ниво " + currentLevel;

//	console.log("Predi fnc");
	let fnc = 'SELECT fileName,IMGshow FROM `levels` WHERE levelNumber = ' + currentLevel + ' ORDER BY DIVposition ASC ';
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		console.log("PRedi if");
	    if (this.readyState == 4 && this.status == 200) {
		  	// Divs left
			console.log("Създаване на леви div-ове.");

			// Първо създава LeftDIV
		  	createLeftDivs(mode);

			// След това зарежда снимките
			let randomElements = [];
			let dragIndex = 0;

			var resultFromPHPQuery = this.responseText;
			
			//console.log ("P====="+resultFromPHPQuery);
			if ( resultFromPHPQuery != 'No result from query' ){
				// Масив от string-ове: Име на файл, yes/no
				leftImageObj = JSON.parse(resultFromPHPQuery);
				console.log ("Obrabotva polucheni rezultati");
				console.log("leftImageObj="+leftImageObj);				

				for(let i = 0; i<24; i++) {
					// Винаги взимаме само четните елементи, защото те са имена на снимки
					if(leftImageObj[i+1] == "yes"){
//						console.log("Vliza v if");
						//document.getElementById('leftImg'+(i/2)).src = `pictures\\skin\\skin0${skin}\\${leftImageObj[i]}`;
						document.getElementById('leftImg'+(i/2)).style.height = sizeOfImg;
						document.getElementById('leftImg'+(i/2)).style.width  = sizeOfImg;
						$('#leftImg'+i/2).attr("src", `pictures\\skin\\skin0${skin}\\${leftImageObj[i]}`);
						$('#leftImg'+i/2).removeClass("image-checkbox-checked");
					//	console.log("objectImgArray[i/2]="+objectImgArray[i/2].src);
						
					} else if(leftImageObj[i+1] == "no"){
//						console.log("Vliza v else");
						if ( mode == 'edit' ) {
//							console.log("Vliza v else EDIT mode");
							$('#leftImg'+i/2).attr("src", `pictures\\skin\\skin0${skin}\\${leftImageObj[i]}`);
							$('#leftImg'+i/2).width(sizeOfImg);
							$('#leftImg'+i/2).height(sizeOfImg);
//							$('#leftImg'+i/2).addClass("image-checkbox-checked");
							//document.getElementById("leftImg"+i/2).src = `pictures\\skin\\skin0${skin}\\${leftImageObj[i]}`;
							//document.getElementById("leftImg"+i/2).style.height = sizeOfImg;
							//document.getElementById("leftImg"+i/2).style.width  = sizeOfImg;
							//document.getElementById("label"+i).addClass("image-checkbox-checked");

							selectedImageArray.push("leftImg"+i/2);
							//console.log("selectedImageArray="+selectedImageArray);
							$('#leftImg'+i/2).addClass("image-checkbox-checked");
							
							//console.log("objectImgArray[i/2]="+objectImgArray[i/2].src);				
							randomElements[dragIndex] = leftImageObj[i]; // Добавя верните отговори на първите места

						}else{

							console.log("Vliza v else");
							$('#leftImg'+i/2).attr("src", ``);
							//console.log("objectImgArray[i/2]="+objectImgArray[i/2].src);
							
							randomElements[dragIndex] = leftImageObj[i]; // Добавя верните отговори на първите места

							
						}
						dragIndex++;
					}	
					i++;			 
				} // Край на for
				
				
				
		 	}

			
		 if ( mode != 'edit' ) {	// Ако сме в режим ИГРА, само тогава разбърква 6 произволни снимки

			 rightLoadImage = JSON.parse(draggedImage);
	//		 rowImg = document.getElementById("rowImg");
	 
			 // Начало на рандом елeменти в drag секция
			 // Допълва до определен брой с рандом генерирани елементи
			 let random;
			 i = dragIndex;
			 while(i < maxVisibleDraggedElement){ 
				random = Math.round(Math.random()*32);
				randomElements[i] = rightLoadImage[random];
				let bFound = false;
				let j = 0;
				while(j < i || bFound == true){		// Върти цикъла докато не октрие елемент, който не се повтаря с някой от предишните 
					if(randomElements[i]==randomElements[j]){
						bFound = true;
						break;
					}
					j++;
				}
				if(!bFound)	
					i++;	//Преминава към следващ елемент само ако не е намерил повтаряне.
			 }
			 // Край на рандом елменти
			 
			 // Размешва всички елементи от drag секцията, за да може да верните елементи да не са на първите места  	 
			  let randomIndex1, randomIndex2; // Променливи , чрез които се разменят индекси в масива
			  for(let i = 0; i < maxVisibleDraggedElement; i++){
				randomIndex1 = Math.round(Math.random()*(maxVisibleDraggedElement-1));
				randomIndex2 = Math.round(Math.random()*(maxVisibleDraggedElement-1));

				temp = randomElements[randomIndex1];
				randomElements[randomIndex1] = randomElements[randomIndex2];
				randomElements[randomIndex2] = temp;
			  }
		
			  // Създава десни DIV
			  createRightDivs(maxVisibleDraggedElement,randomElements);
				
			  // Зарежда снимки
			  for(let i = 0;i < maxVisibleDraggedElement; i++){
					draggedImageId.push(document.getElementById(randomElements[i]));
					draggedImageId[i].src = `pictures\\skin\\skin0${skin}\\${randomElements[i]}`;	
					draggedImageId[i].style.height = sizeOfImg;
					draggedImageId[i].style.width = sizeOfImg;	
			  }
		  }	// Край на проверка дали сме в режим ИГРА

	 
	   }
	}

	// Показва modal при започване на нивото, за да обясни на играча какво трябва да прави в него	

	
	xhttp.open("GET","php_query.php?q="+fnc,true);
//	console.log("fnc="+fnc);
	xhttp.send();
}
//function showMenu(){
//	$('body').append('<div class="col-md-6 border borderBetweenColumns"><img draggable="true" ondragstart="drag(event)" id="' + randomElements[i] + '" class="borderBetweenColumns"></div>');
//}
function setCookie(cname) {
	document.cookie = cname;
}
  
function getCookie() {
	let decodedCookie = decodeURIComponent(document.cookie);
//	console.log("decodedCookie="+decodedCookie);
	
	let ca = decodedCookie.split(';');
//	console.log("ca=("+ca+")");
//	console.log("ca[0]=("+ca[0]+")");
	
	if(ca[0] >= 0 && ca[0]<=100){
	  currentLevel = ca[0];	
	}
//	alert("currentLevel=("+currentLevel+")");
	return currentLevel;	
}

/*
function getMaxLevel(){
		// Прави запитване към mysql, за да види колко нива са въведени и кое да се редактира и кое ще бъде НОВО
		let fnc = 'SELECT MAX(levelNumber) FROM `levels`';
		var xhttp = new XMLHttpRequest();
		let allLevels;
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				allLevels = this.responseText;
	
				console.log("allLevels ot getMaxLevel="+allLevels);
				return allLevels;
			} 
		}
		xhttp.open("GET","php_query.php?q="+fnc,true);
		xhttp.send();
		// Край на заявка за проверка колко нива има въведени до момента
}
*/

function loadCreateLevel() {
	console.log("VLizav v loadCreateLevel");
	let nextLevelTitle = document.getElementById("titleLevel");
	nextLevelTitle.innerHTML = "Създаване на нива";	
	//let dropDownButton = document.getElementById("dropdownMenu");
	
	// Прави запитване към mysql, за да види колко нива са въведени и кое да се редактира и кое ще бъде НОВО
	let fnc = 'SELECT MAX(levelNumber) FROM `levels`';
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			maxLevel = this.responseText;

			console.log("maxLevelOT LOADCREATELEVEL="+maxLevel);


			$('#dropdownMenu').append('<option onclick="deleteSelectMenu()" id="optionId" class="dropdown-item" value="' + 0 + '" selected>Изберете ниво</option>');	

			for( let i = 1; i <= maxLevel; i++){
				$('#dropdownMenu').append('<option onclick="deleteSelectMenu()" id="optionId" class="dropdown-item" value="' + i + '">Ниво '+ i +'</option>');
			}
			$('#dropdownMenu').append('<option onclick="deleteSelectMenu()" id="optionId" class="dropdown-item" value="' + (parseInt(maxLevel) + 1) + '">Създай собствено ниво</option>');
		} 
	}
	xhttp.open("GET","php_query.php?q="+fnc,true);
	xhttp.send();
	// Край на заявка за проверка колко нива има въведени до момента
	//maxLevel = getMaxLevel();
	
		createLeftDivs('edit'); 
		 
		let rightLoadImageCreate = JSON.parse(draggedImage);
//		let rowImg = document.getElementById("rowImg");
		let allImage = 33; 
		
		// Прави десните DIV
		createRightDivs(allImage,rightLoadImageCreate);
		 
		// Зарежда всички снимки (режим редактиране)
		for(let i = 0;i < 33; i++){
			draggedImageId.push(document.getElementById(rightLoadImageCreate[i]));
			draggedImageId[i].src = `pictures\\skin\\skin0${skin}\\${rightLoadImageCreate[i]}`;	
			draggedImageId[i].style.height = sizeOfImg;
			draggedImageId[i].style.width  = sizeOfImg;	
		}		
		
/*
		$('.image-checkbox').click(function () {
			console.log("VLiza v onclick");
			if ($(this).data('image-checkbox-checked')) {
				$(this).removeClass('image-checkbox-checked');
				$(this).data('image-checkbox-checked', false);		
				console.log("Razmarkira");
			} else {
				$(this).addClass('image-checkbox-checked');
				$(this).data('image-checkbox-checked', true);
				console.log("Elementut e selectiran");	
				console.log("Markira");
			}
			updateSelectedImagesArray();
		});
		$('.image-checkbox').click(function () {
			console.log("VLiza v onclick v image-checkbox.");			
		});
*/	
	
}

function IMGClick (IDofElement) {
	console.log("VLiza v IMGClick - id = "+IDofElement);
	
	if ( $("#"+IDofElement).hasClass('image-checkbox-checked')){	
		$("#"+IDofElement).data('image-checkbox-checked', false);		
		$("#"+IDofElement).removeClass("image-checkbox-checked");
		console.log("Vliza v razmarkirane");
	}else{
		$("#"+IDofElement).data('image-checkbox-checked', true);		
		$("#"+IDofElement).addClass("image-checkbox-checked");
		console.log("Vliza v markirane");
	}
	updateSelectedImagesArray(IDofElement);	
}

function showAllLevels(){	
	
	
	console.log("maxLevel ot showAllLevels="+maxLevel );
	for(let i = 1 ; i <= maxLevel  ; i++){
		$("#divContinueGame").append('<button class="btn btn-info ml-4" id="buttonLevel' + i + '" onclick="buttonContinueGame(this.id)">' + i + '</button>');	
		console.log("i="+i);
	}	
	
	$("#continueGame").remove();
}
function buttonContinueGame(idOfButton){

	console.log("idOfButton.charAt(idOfButton.length)="+idOfButton.charAt(idOfButton.length - 1));
	setCookie(idOfButton.charAt(idOfButton.length - 1));
	window.location.href = "http://interactiveelectronics.eu/startLevels.html";
		
}

function updateSelectedImagesArray(IDofElement) {
	//let i = 0;
//	$('.image-checkbox').each(function () {
		if ($("#"+IDofElement).hasClass('image-checkbox-checked')) {		
				if (!selectedImageArray.includes(IDofElement)){
					console.log("leftImageObj="+"#leftImg="+IDofElement);
					selectedImageArray.push(IDofElement);
				}
		}else{
			for( let i = 0 ; i < selectedImageArray.length ; i++ ){
				if(selectedImageArray[i]==IDofElement){
					selectedImageArray.splice(i, 1); 
				}
			}

		}
		//i++;
//	});
console.log("selectedImageArray="+selectedImageArray);
}

function deleteImage(){
	for (let i = 0; i < selectedImageArray.length; i++) {
	
		$('#'+selectedImageArray[i]).remove();
		
		$('.image-checkbox').removeClass('image-checkbox-checked');

	}
	console.log("#"+selectedImageArray);
	selectedImageArray = [];
	console.log("+++++++++++-=+++++++++++++===========");
	
}
function deleteSelectMenu(){
	document.getElementById("dropdownMenu").remove();
}
function showModalText(){
	let textModalBody = document.getElementById("textModalBody");
	textModalBody.innerHTML = "Искате ли да запазите ниво " + getCookie() + "?";
}

function buttonPressedNewGame(){
	setCookie(1);
}

function buttonPressedContinueGame(){
	setCookie(currentLevel);
}

function ChangeLevelInEditMode(event){
	var selectElement = event.target;
    var value = selectElement.value;
	console.log("Избрано ниво за редактиране : "+value);
	//$("#dropdownMenu").addClass("noVisibilityOfElement");
	// Зарежда избраното ниво ако съществува. Ако НЕ съществува се отварят празни полета
	setCookie(value);
	loadLevel ('edit');
	
	// Променяне на надпис НИВО X на РЕДАКЦИЯ НА НИВО X
} 

function saveLevel(){
	getCookie();
	// Извършва заявка за запис на ниво
	let phpquery;
	let imgShow;
	
	console.log("Zapochva saveLevel ..........level="+currentLevel+".....maxLevel="+maxLevel+".......");
	
	let ifOneElementChecked = false;
	let ifOneImg = false;
	
	let queryStr 		= "INSERT INTO `levels` (date, levelNumber, fileName, DIVposition, IMGshow) VALUES ";
	let queryParams 	= "";
//	currentLevel 		= 22;		// ВРЕМЕННО ЗА ТЕСТ, за прави тестове с НЕСЪЩЕСТВУВАЩО ниво, да НЕ ЗАТРИЕ НЕЩО ВАЖНО докато правим опити
	
	for (let i = 0; i < maxDiv;i++) {
		leftImgId = document.getElementById("leftImg"+i);
		cond = document.getElementById("leftImg"+i) || false;
		if( cond != false  && leftImgId.src.length > 0){
			ifOneImg=true;
//			console.log("leftImgId="+leftImgId.id+"; Ima snimka tam");
			if (leftImgId.classList.contains('image-checkbox-checked')) {
//				console.log("div-" + i+ "; leftImageObj-" + leftImageObj[i*2]+";leftImgId="+leftImgId.className);
				imgShow = "no";
				ifOneElementChecked = true;
//				console.log("ifOneElementChecked="+ifOneElementChecked);
			} else {
				imgShow = "yes";	
//				console.log("ifOneElementChecked="+ifOneElementChecked);		
			}
		} else {
			ifOneImg=false;
			break;

		}
		
		console.log("leftImgId.src (id="+i+")="+leftImgId.src );
		let onlyFileName = leftImgId.src;
		
		// XXX да се донаправи, да търси от дясно на ляво, първото срещане на директория (наклонена черта надясно)
//		onlyFileName = onlyFileName.replace('https://safeentrance.biz/electronicEducationGame/pictures/skin/skin02/','');

		 onlyFileName = onlyFileName.substring(onlyFileName.lastIndexOf("/") + 1);

		
		queryParams 		+= "(now(), "+currentLevel+", '"+onlyFileName+"', "+(i+1)+" , '"+imgShow+"')";
		if ( i != maxDiv-1 )	// Добавя запетая на всички редове, без последния
			queryParams 		+= ", ";
		
//		console.log("queryParams="+queryParams);
		

	}
//	console.log("FINAL queryParams="+queryParams);
	queryStr += queryParams;	// Добавя началото на заявката с данните, които трябва да се запишат
	
	if ( currentLevel > maxLevel ) {
		console.log("Zapazvam NOVO nivo - INSERT.");
		queryStr = "&q="+queryStr;
	} else {
		console.log("aktualiziram starvo niwo - UPDATE.");
		queryStr = "update="+currentLevel+"&q="+queryStr;	// Добавя начало на заявката, за да изтрие текущите данни за ниво
	}
	
	
	if(ifOneElementChecked==false){
		alert("Трябва да маркирате поне 1 елемент, който да бъде скрит.");
	}
	if(ifOneImg==false){
		alert("Трябва да запълните всички празни позиции с елменти от дясно.");
	}
	
	
	if (ifOneImg == true && ifOneElementChecked == true ) {		
		let fnc = queryStr;
		
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
		fnc = "php_query.php?"+fnc;
		console.log("fnc = "+fnc);
		xhttp.open("GET",fnc,true);
		xhttp.send();		
	
	}	
	
	
	console.log("Krai na saveLevel......................");
}


function IsMatchingPassword(value){
	if(value){
		password = value;
	} else {
		password = document.getElementById('passID1').value;
	}

	
	let passwordRegexLowLetter = /[a-z]+/;
	let passwordRegexUpperLetter = /[A-Z]+/;
	let passwordRegexDigits = /[0-9]+/;
	let passwordRegexlength = /^.{6,}$/;
//	let passwordRegexSpecialSymbols = /[!@#$%^&*]+/;
	let errorPassword = document.getElementById("errorМessagePassword");
	let errorMessagePassword = "";
	let containingLowLetter = false;
	let containingUpperLetter = false;
	let containingDigits = false;
	let containingCorrectLength = false;
	let containingSpecialSymbols = false;


	if(passwordRegexLowLetter.test(password)){
		containingLowLetter=true;
	}else{
		errorMessagePassword += "Няма малки букви.<br>";
	}
	if(passwordRegexUpperLetter.test(password)){
		containingUpperLetter=true;
	}else{
		errorMessagePassword += "Няма големи букви.<br>";
	}
	if(passwordRegexDigits.test(password)){
		containingDigits=true;
	}else{
		errorMessagePassword += "Няма цифри.<br>";
	}
	if(passwordRegexlength.test(password)){
		containingCorrectLength=true;
	}else{
		errorMessagePassword += "Трябва да е по-дълга от 8 символа.<br>";
	}


//	if(passwordRegexSpecialSymbols.test(password)){
//		containingSpecialSymbols=true;
//	}else{
//		errorMessagePassword += "Трябва да използвате поне един специален символ( !, @, #, $, %, ^, &, * )<br>";
//	}
	errorPassword.innerHTML=errorMessagePassword;
	if(containingLowLetter==true && containingUpperLetter==true && containingDigits==true && containingCorrectLength==true){
		return true;
	}else{
		return false;
	}
}

function IsMatchingEmail(value){
	if(value){
		email = value;
	} else {
		email = document.getElementById('mailID1').value;
	}
	
	
	let emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let errorEmail = document.getElementById("errorМessageEmail");
	let errorMessageEmail = "";
	let correctEmail = false;
	if(emailRegex.test(email)){
		correctEmail=true;
	}else{
		errorMessageEmail += "Невалидна електронна поща.<br>";
	}
	errorEmail.innerHTML =errorMessageEmail;
	return correctEmail;
}	

function correctRepeat(email, password){
	let repeatEmail = document.getElementById("repeatEmail").value;
	let repeatPassword = document.getElementById("repeatPassword").value;
	let errorRepeatEmail = document.getElementById("errorМessageRepeatEmail");
	let errorRepeatPassword = document.getElementById("errorМessageRepeatPassword");
	let errorМessageRepeatEmail = "";
	let errorМessageRepeatPassword = "";
	
	if(email!=repeatEmail){
		errorМessageRepeatEmail += "Електронната Ви поща не е правилно повторена.";
	}
	if(password!=repeatPassword){
		errorМessageRepeatPassword += "Паролата Ви не е правилно повторена.";
	}
	errorRepeatEmail.innerHTML = errorМessageRepeatEmail;
	errorRepeatPassword.innerHTML = errorМessageRepeatPassword;
	if(errorМessageRepeatEmail == "" && errorМessageRepeatPassword == ""){
		return true;
	}
}

/*function validateDataRegistrationForm(){
	let password=IsMatchingPassword();
	let email=IsMatchingEmail();
	let repeatedCorrectly=correctRepeat();

	if(password==true && email==true && repeatedCorrectly==true){
		alert("Вие успешно си създадохте акаунт в нашия сайт.")
	}	
}*/

/*function validateDataLoginForm(){
	let password=IsMatchingPassword();
	let email=IsMatchingEmail();

	if(password==true && email==true ){
		alert("You successfully entered your account.")
	}
}*/

function registrationInfo(){
	console.log("Влиза в registrationInfo");
	
	let email = $("#idEmailX").val();
	let password = $("#idPasswordX").val();

	let query = "email="+email+"&pass="+ password +"&name="+$("#name").val();
	
	let isPassword=IsMatchingPassword(password);
	let isEmail=IsMatchingEmail(email);
	
	
	let isRepeatedCorrectly=correctRepeat(email, password);

	if(isPassword==true && isEmail==true && isRepeatedCorrectly==true){
		console.log("Правилно са въведени данни, ще направи mysql заявка.");
		console.log("query : Ще изпълня заявка : "+query);
		$("#registrationDiv").remove();

		let resultFromPHP;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			//	$("#noVisibleDivRegistration").html('<h4 class="inwardsLine">Потребител с този mail съществува.<br>Ако вече сте се регистрирали в този сайт използвайте меню ВХОД.<br>Ако не сте активирали профила си, използвайте линка, получен на Вашата електронна поща.</h4>');
			//	$("#noVisibleDivRegistration").css("visibility", "visible");
				resultFromPHP = this.responseText;
				console.log("Получен резултат от регистрация на потребител. ");
				console.log(resultFromPHP);
				if(resultFromPHP == 'NoActivatedKey'){
					$("#noVisibleDivRegistration").html('<h5 class="inwardsLine">Не е намерен правилен активационен ключ. Моля, проверете линка получен на мейла. Ако проблема продължи, свържете се с администратор на сайта. </h5>');
				}
				if(resultFromPHP == 'UserActivated'){
					$("#noVisibleDivRegistration").html('<h5 class="inwardsLine">Успешно активирахте Вашият профил. Може да се възползвате от всички функции на сайта.</h5>');
				}
				if(resultFromPHP == 'UserExist'){
					$("#noVisibleDivRegistration").html('<h5 class="inwardsLine">Потребител с този mail съществува.<br>Ако вече сте се регистрирали в този сайт използвайте меню ВХОД.<br>Ако не сте активирали профила си, използвайте линка, получен на Вашата електронна поща.</h5>');
				}
				if(resultFromPHP == 'RegistrationSuccessful'){
					$("#noVisibleDivRegistration").html('<h5 class="inwardsLine">Регистрацията премина успешно. <br>На Вашата електронна поща ще получите линк, с който да активирате профила си. <br>Той ще бъде активен 24 часа..</h5>');
				}
				if(resultFromPHP == 'NoQuery'){
					$("#noVisibleDivRegistration").html('<h5 class="inwardsLine"> Не успешна връзка с база данни.</h5>');
				}
				
				$("#noVisibleDivRegistration").css("visibility", "visible");
				
			} 
		}
		xhttp.open("GET","register.php?"+query,true);
		xhttp.send();
		
		// Край на заявка за проверка колко нива има въведени до момента	
	}
	console.log("Излиза от registrationInfo");
}

function logInInfo(buttonID){
	console.log("Влиза в logInInfo");

	let email;
	let password;
	

	if ( buttonID == 1 ) {
		console.log ("Влиза в IF");
		email = $("#mailID1").val();
		password = $("#passID1").val();
	} else {
		console.log ("Влиза в ELSE");
		email = $("#mailID2").val();
		password = $("#passID2").val();
		email = document.getElementById('mailID2').value;		

	}
	
	
	
//	let password 	= document.getElementById('passID1').value;
	
	
	
	let query = "email="+email+"&pass="+ password;
	console.log("query="+query);



		console.log("Правилно са въведени данни, ще направи mysql заявка.");
		
		$("#logInDiv").remove();
		
//		$("#noVisibleDivLogIn").html('<h3 class="inwardsLine">Здравейте, alex. <br>Вие сте се влезнали в сайта като активен потребител.</h3>');
//		$("#noVisibleDivLogIn").css("visibility", "visible");
	
		console.log ("Заявка за логва в сайта : "+query);
		let resultFromPHP;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				resultFromPHP = this.responseText;
				console.log("Получен резултат от логване в сайта. ");
				console.log(resultFromPHP);

				if(resultFromPHP.includes("LoginSuccessful")){	// Ако от PHP е върнато, че има успешно логване
					
					localStorage.setItem("email", email);
					console.log("Записва в сесията : "+email);
					
					location.reload();
					// НЕ се показва съобщение - може би трябва RELOAD, може и да не трябва
				}
				if(resultFromPHP.includes("NOK")){
					$("#noVisibleDivLogIn").html('<h5 class="inwardsLine"> Няма намерен подобен потребител с email: ' + email + ' или сте сбъркали паролата. </h5>');

				}
				if(resultFromPHP.includes("NoQuery")){
					$("#noVisibleDivLogIn").html('<h5 class="inwardsLine">Не успешна връзка с база данни.</h5>');
				}
				$("#noVisibleDivLogIn").css("visibility", "visible");

			} 
		}
		xhttp.open("GET","login.php?"+query,true);
		xhttp.send();
		// Край на заявка за проверка колко нива има въведени до момента	
		
	console.log("Излиза от logInInfo");
}

function logOut () {
	// Remove all saved data from sessionStorage
	// Remove all saved data from sessionStorage
	sessionStorage.clear();
	localStorage.clear();
	
	// Remove saved data from sessionStorage
	sessionStorage.removeItem('email');


	console.log("Разлогва");

			let email = localStorage.getItem("email");

	console.log("localStorage.getItem(email)="+localStorage.getItem("email"));

}



//.backgroundDivColorShadowMenu{
//	background-color: rgb(23, 162, 184);
//}
$("#menu").addClass("navbar navbar-expand-lg navbar-dark pl-5 pr-5 backgroundDivColorShadowMenu");
let menuNavElement = document.getElementById("menu");
if(localStorage.getItem("email") != null){
	let email = localStorage.getItem("email");
	//console.log("document.getElementById(menu)="+document.getElementById("menu").id);
	menuNavElement.innerHTML = `
	<a class="navbar-brand" href="index.html"><img src="pictures/logoScanSmall.JPG" class="rounded" width=50px height=50px></a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarSupportedContent">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item active">
				<b><a class="nav-link text-white h5" href="http://interactiveelectronics.eu/index.html">Интерактивна Електроника</a></b>
			</li>		
			<li class="nav-item pl-2">
				<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/aboutUs.html">За нас</a>
			</li>
			<li class="nav-item dropdown ">
				<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/electronic.html">
					Електроника
				</a>
			</li>
			<li class="nav-item dropdown ">
				<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/electronicElements.html" >
					Електронни елементи
				</a>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/Токоизправители.html" >
					Токоизправители
				</a>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/Токоизправители.html" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Профил
				</a>
				<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
					<a class="dropdown-item">
				</div>
			</li>
			<ul class="navbar-nav mr-right">
				<li class="dropdown order-1 ">
					<button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-light dropdown-toggle">Профил<span class="caret"></span></button>
						<ul class="dropdown-menu dropdown-menu-right mt-2 w-75 ">
						<li class="px-3 py-2">
							<form class="form" role="form" method="POST" action="index.html">
									<div class="form-group">
										<input id="mailID2" placeholder="Електронен адрес или име" class="form-control form-control-sm" type="text" required="" name="userInput" >
									</div>
									<div class="form-group">
										<input id="passID2" placeholder="Парола" class="form-control form-control-sm" type="password" required="" name="pass1">
									</div>
									<div class="form-group ">
										<small><a class="text-body" href="" style="color:white" onclick="logOut()">Излез</a></small>
									</div>
								</form>
							</li>
						</ul>
				</li>
					<li class="nav-item">
					<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/rules.html">
						Регистрация
					</a>
				</li>
			</ul>
	</div>`;
}else{
	//console.log("document.getElementById(menu)="+document.getElementById("menu").id);
	menuNavElement.innerHTML = `
	<a class="navbar-brand" href="index.html"><img src="pictures/logoScanSmall.JPG" class="rounded" width=50px height=50px></a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarSupportedContent">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item active">
				<b><a class="nav-link text-white h5" href="http://interactiveelectronics.eu/index.html">Интерактивна Електроника</a></b>
			</li>		
			<li class="nav-item pl-2">
				<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/aboutUs.html">За нас</a>
			</li>
			<li class="nav-item dropdown ">
				<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/electronic.html">
					Електроника
				</a>
			</li>
			<li class="nav-item dropdown ">
				<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/electronicElements.html" >
					Електронни елементи
				</a>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/Токоизправители.html" >
					Токоизправители
				</a>
			</li>
			<ul class="navbar-nav mr-right">
				<li class="dropdown order-1 ">
					<button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-light dropdown-toggle">Вход<span class="caret"></span></button>
						<ul class="dropdown-menu dropdown-menu-right mt-2 w-75 ">
						<li class="px-3 py-2">
							<form class="form" role="form" method="POST" action="index.html">
									<div class="form-group">
										<input id="mailID2" placeholder="Електронен адрес или име" class="form-control form-control-sm" type="text" required="" name="userInput" >
									</div>
									<div class="form-group">
										<input id="passID2" placeholder="Парола" class="form-control form-control-sm" type="password" required="" name="pass1">
									</div>
									<div class="form-group ">
										<button type="submit" class="btn buttonColorChange btn-block text-white " onclick="logInInfo(2)" name="send_button">Вход</button>
									</div>
									<div class="form-group text-center">
										<small><a class="text-body" href="http://interactiveelectronics.eu/forgottenPassword.html" style="color:white">Забравена парола</a></small>
										
									</div>
								</form>
							</li>
						</ul>
				</li>
					<li class="nav-item">
					<a class="nav-link text-white h5" href="http://interactiveelectronics.eu/rules.html">
						Регистрация
					</a>
				</li>
			</ul>
	</div>`;

}

