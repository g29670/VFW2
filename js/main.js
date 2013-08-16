/*
Elijah Moran
VFW 1308
Project 2
*/
// Wait until DOM is ready //
window.addEventListener("DOMContentLoaded", function() {

	// getElementById function //
	function $(x) {
		var elementID = document.getElementById(x);
		return elementID;
	};
	
	// Create Select Element with Options//
	function makeCoinStyle() {
		var formTag = document.getElementsByTagName('form'),
			selectList = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "styles");
		for(var i=0, j=coinTypes.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optTxt = coinTypes[i];
			makeOption.setAttribute("value", optTxt);
			makeOption.innerHTML = optTxt;
			makeSelect.appendChild(makeOption);
		}
		selectList.appendChild(makeSelect);
	};
	
	// //
	function getCheckboxValue() {
		if ($('worth').checked) {
			worthValue = "Yes";
		}else{
			worthValue = "No";
		}
	};
	
	// Find Value of selected radio button //
	function getSelectedRadio(){
		var radios = document.forms[0].quality;
		for (var i=0, j=radios.length; i<j; i++) {
			if (radios[i].checked){
				qualityValue = radios[i].value;
			}
		}
	};
	
	// Turn on and off form by use of case during getData() //
	function toggle(x) {
		switch(x) {
			case "on":
				$('coinForm').style.display = "none";
				$('showData').style.display = "none";
				$('clearData').style.display = "inline";
				$('startNew').style.display = "inline";
				$('saveData').style.display = "none";
				break;
			case "off":
				$('coinForm').style.display = "block";
				$('showData').style.display = "inline";
				$('clearData').style.display = "inline";
				$('startNew').style.display = "none";
				$('saveData').style.display = "inline";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	};
	
	// Gather Form Data & Place it in an Object & Object is an Array for Form Label and Value //
	function saveData(key) {
		// Set Random Key for Stored Data //
		if(!key) {
			var id = Math.floor(Math.random()*10001);
		}else{
			id = key;
		}
		// Call Functions //
		getCheckboxValue();
		getSelectedRadio();
		var item 				= {};
			item.entercoin	    = ["Coin Style: ", $('styles').value];
			item.mdate		    = ["Mint Date: ", $('mdate').value];
			item.mloc           = ["Mint Location:", $('mloc').value];
			item.edate          = ["Date entered into collection: ", $('edate').value];
			item.worth		    = ["Is this coin valuable today? ", worthValue];
			item.coinage	    = ["What is the value of this coin? ", $('coinage').value];
			item.quality	    = ["The coin quality is : ", qualityValue];
			item.comments		= ["Give information about the coin? ", $('comments').value];
			
		// Save Data into Local Storage with JSON.stringify //
		localStorage.setItem(id, JSON.stringify(item));
		alert("Coin Saved!");
	};
	
	// Write Data from Local Storage to Browser //
	function getData() {
		// Call Function //
		toggle("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so \n default data was added.");
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv, $('foot'));
		// Set 'items' display //
		$('items').style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++) {
			var makeLi = document.createElement('li');
		    makeLi.style.fontsize= "25 px";
			var buttonsLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// Convert string from local storage into value by JSON.parse //
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (var x in obj) {
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubTxt = obj[x][0]+" "+obj[x][1];
				makeSubLi.innerHTML = optSubTxt;
			}
		}
	};
	
	// Delete individual key storage from localStorage //
	function deleteItem() {
		var ask = confirm("Delete this coin?");
		// Confirm with the user to delete individual item //
		if(ask) {
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("The coin has been deleted.");
			return false;
		// If declined, do not delete and alert the user //
		}else{
			alert("The coin was not deleted.");
		}
	};
	
	function clearData() {
		if (localStorage.length === 0) {
			alert("There is nothing to delete.");
		}else{
			var clear = confirm("Are you sure you want to delete your coins?");
			if (clear) {
				localStorage.clear();
				alert("All coins have been deleted.");
				window.location.reload();
				return false;
			}else{
				alert("Your coins have not been deleted.");
			}
		}
	};
	
	function validate(e) {
		// Define elements we want to check //
		var getStyle = $('styles');
		var getMdate = $('mdate');
		var getMloc = $('mloc');
		var getEdate = $('edate');
		var getComments = $('comments');
		// Reset error messages //
		errMsg.innerHTML = "";
		getStyle.style.border = "1px solid black";
		getMdate.style.border = "1px solid black";
		getMloc.style.border = "1px solid black";
		getEdate.style.border = "1px solid black";
		getComments.style.border = "1px solid black";
		// Get error messages //
		var messageAry = [];
		// Style validation //
		if(getStyle.value === "*Choose A Style*") {
			var styleError = "Please choose a style.";
			messageAry.push(styleError);
		}
		// Coin mint validation //
		if(getMdate.value === "") {
			var mDateError = "Please enter year coin minted.";
			messageAry.push(mDateError);
		}
        
        // Mint Location validation //
		if(getMloc.value === "") {
			var mLocError = "Please enter the mint location.";
			messageAry.push(mLocError);
		}

		// Coin Entry Date validation //
		if(getEdate.value === "") {
			var eDateError = "Please enter date coin placed in database.";
			messageAry.push(eDateError);
		}
		
		//Comments validation //
		if(getComments.value === "") {
			var commentsError = "Give information about the coin.";
			messageAry.push(commentsError);
		}
		// Display error messages //
		if(messageAry.length >= 1) {
			for (var i=0, j=messageAry.length; i<j; i++) {
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			// If errors found, stop the form from submitting and alert the user //
			alert("There are required fields left empty.");
			e.preventDefault();
			return false;
		}else{
			// If there are no errors, save the data //
			saveData(this.key);
		}
	};
	
	// Variable defaults //
	var coinTypes = ["*Choose A Style*", "Penny", "Nickel", "Dime", "Quarter", "Half-Dollar", "Silver-Dollar"],
		worthValue = "No",
		qualityValue,
		confirmClear,
		errMsg = $('errors')
	;
	
	// Set Link & Submit Click Events //
	var displayLink = $('showData');
	displayLink.addEventListener("click", getData);
	var clearButton = $('clearData');
	clearButton.addEventListener("click", clearData);
	var submitData = $('saveData');
	submitData.addEventListener("click", validate);
	
	// Call Functions //
	makeCoinStyle();
});