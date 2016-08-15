var list = ["Pinocchio", "Snow White", "Cinderella", "Woody", "Buzz Lightyear", "Winnie the Pooh",
			"Tarzan", "Peter Pan", "Aladdin", "Belle", "Dumbo", "Hercules", "Quasimodo", "Baloo",
			"Simba", "Mufasa", "Ariel", "Ursula", "Mickey Mouse"];
var wins = 0;
start_game();

//Game object
function game() {
	this.currentWord = list[Math.floor(Math.random() * list.length)];
	this.trackWord = blank(this.currentWord);
	this.correctLetters = [];
	this.guessedLetters = [];
	this.guessesLeft = 10;
	this.guessedAlready = false;
	this.correct = false;	
}


//When game starts, each letter of the chosen work is replaced with '_'
function blank(word) {
		var start = [];
		for(var i = 0; i < word.length; i++) {
			console.log(word.charAt(i));
			if(word.charAt(i) == " ")
				start.push(" ");
			else
				start.push("_");
		}

		return start;
}

//Diplays the progress of the guessed word
function displayWord(game) {
	document.getElementById("displayWord").innerHTML = game.trackWord.join(" ");
}

//Displays the number of guesses left
function displayGuessesLeft(game) {
	document.getElementById("guessesLeft").innerHTML = "Guesses Remaining: " + game.guessesLeft;
}

//Displays the list of incorrect letters guessed
function displayGuessedLetter(game){
	document.getElementById("guessed").innerHTML = "Guessed: " + game.guessedLetters.join(", ");
}

//Displays number of games won (Reset when refreshed)
function displayWins() {
	document.getElementById("numWins").innerHTML = "Wins: " + wins;
}

//Retrieves the user's input (keystroke)
function getInput(event) {
	var input = String.fromCharCode(event.keyCode);
	return input;
}

//Starts playing game and any valid input starts couting as a guess
function play_game(newGame) {
	displayWord(newGame);
	displayGuessesLeft(newGame);
	displayGuessedLetter(newGame);
	document.onkeypress = function() {
		var input = getInput(event); 
		console.log(input);
		newGame.guessedAlready = false;
		newGame.correct = false;
		//Check if valid input (letters)
		if(input.match(/[abcdefghijklmnopqrstuvwxyz]/i) != null) {
			console.log("Is Letter");
			input = input.toLowerCase();
			//Check if already guesses among correct letters
			for(var i = 0; i < newGame.correctLetters.length; i++) {
				if(input == newGame.correctLetters[i]) {
					newGame.guessedAlready = true;
					break;
				}
			}
			//Check if already guesses among incorrect letters
			for(var i = 0; i < newGame.guessedLetters.length; i++) {
				if(input == newGame.guessedLetters[i]) {
					newGame.guessedAlready = true;
					break;
				}
			}
			console.log(newGame.guessedAlready);
			if(!newGame.guessedAlready) {
				//If input not guessed already, check if exists in chosen word
				for(var i = 0; i < newGame.currentWord.length; i++) {
					if(input == newGame.currentWord.charAt(i).toLowerCase()) {
						newGame.trackWord[i] = newGame.currentWord.charAt(i);
						newGame.correct = true;
					}
				}
				//Add to list of correctly guessed letters and update display
				if(newGame.correct) {
					displayWord(newGame);
					newGame.correctLetters.push(input);
				}

				//Add to list of incorrectly guessed letters and update display
				else if(!newGame.correct) {
					newGame.guessedLetters.push(input);
					newGame.guessesLeft--;
					//If remaining number of guesses reaches zero, restart game with new word
					if(newGame.guessesLeft == 0) {
						newGame = new game();
						play_game(newGame);
					}
					displayGuessesLeft(newGame);
					displayGuessedLetter(newGame);
				}
			}
		}
		//Increment number of wins and restart game with new word
		if(newGame.currentWord == newGame.trackWord.join("")) {
			document.getElementById("win_lose").innerHTML = "YOU WIN!";
			wins++;
			displayWins();
			newGame = new game();
			play_game(newGame);
		}
 	};
}

//Initiates game after pressing any key
function start_game() {
	var input;
	var newGame = new game();
	console.log(newGame.currentWord);
	document.onkeypress = function () {
		input = getInput(event); 
		console.log(input);
		displayWord(newGame);
	 	displayGuessesLeft(newGame);
	 	displayWins();
		play_game(newGame);
	};
}

	// var input;
	// var newGame = new game();
	// console.log(newGame.currentWord);
	// document.onkeypress = function() {
 // 		displayWord(newGame);
 // 		displayGuessesLeft(newGame);
 // 		document.onkeypress = function() {
 // 		 	if(newGame.guessesLeft > 0) {
	// 			input = getInput(event); 
	// 			console.log(input);
	// 			newGame.guessedAlready = false;
	// 			newGame.correct = false;
	// 			if(input.match(/[abcdefghijklmnopqrstuvwxyz]/i) != null) {
	// 				console.log("Is Letter");
	// 				input = input.toLowerCase();
	// 				for(var i = 0; i < newGame.correctLetters.length; i++) {
	// 					if(input == newGame.correctLetters[i]) {
	// 						newGame.guessedAlready = true;
	// 						break;
	// 					}
	// 				}

	// 				for(var i = 0; i < newGame.guessedLetters.length; i++) {
	// 					if(input == newGame.guessedLetters[i]) {
	// 						newGame.guessedAlready = true;
	// 						break;
	// 					}
	// 				}
	// 				console.log(newGame.guessedAlready);
	// 				if(!newGame.guessedAlready) {
	// 					for(var i = 0; i < newGame.currentWord.length; i++) {
	// 						if(input == newGame.currentWord.charAt(i).toLowerCase()) {
	// 							newGame.trackWord[i] = newGame.currentWord.charAt(i);
	// 							newGame.correct = true;
	// 						}
	// 					}

	// 					if(newGame.correct) {
	// 						displayWord(newGame);
	// 						newGame.correctLetters.push(input);
	// 					}

	// 					else if(!newGame.correct) {
	// 						newGame.guessedLetters.push(input);
	// 						newGame.guessesLeft--;
	// 						displayGuessesLeft(newGame);
	// 						displayGuessedLetter(newGame);
	// 					}
	// 				}
	// 			}
	// 		}
	// 		else {
	// 			newGame
	// 		}
 // 		};
	// };

	
	// document.onkeypress = function() {
	// 	input = getInput(event); 
	// 	onKeyPress(input);
	// };

//	do{

//	}while(guessesLeft > 0);

//} while(restart);