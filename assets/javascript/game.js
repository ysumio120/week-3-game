var list = ["Mario", "Donkey Kong"];
var randomItem;
var currentWord;
var trackWord;
var input;
var guessedLetters = [];
var guessesLeft;
var correct;
var wins = 0;
var restart;



function blank() {
	var blankWord = "";
	for(var i = 0; i < currentWord.length; i++) {
		console.log(currentWord.charAt(i));
		if(currentWord.charAt(i) == " ")
			blankWord += "  ";
		else
			blankWord += "_ ";
	}

	return blankWord;
}

function onKeyPress(word) {
	//var event;
	//var input = String.fromCharCode(event.keyCode);
	//alert(input);
	console.log(word);
	document.getElementById("displayWord").innerHTML = word;
}

function getInput(event) {
	var input = String.fromCharCode(event.keyCode);
	return input;
}

//onKeyPress();
//do {
	//Picks random word from list	
	guessesLeft = 10;
	randomItem = Math.floor(Math.random() * list.length);
	currentWord = list[randomItem];
	trackWord = list[randomItem];
	console.log(currentWord);
	document.onkeypress = function() {
 		onKeyPress(blank());
 		
	};
	// document.onkeypress = function() {
	// 	input = getInput(event); 
	// 	onKeyPress(input);
	// };

//	do{

//	}while(guessesLeft > 0);

//} while(restart);