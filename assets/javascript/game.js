var pokemon =
	["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle",
	"Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto",
	"Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew",
	"Sandslash", "Nidoran", "Nidorina", "Nidoqueen", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix",
	"Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", 
	"Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey",
	"Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop",
	"Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler",
	"Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio",
	"Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee",
	"Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee",
	"Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea",
	"Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir",
	"Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte",
	"Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair",
	"Dragonite", "Mewtwo", "Mew"];
console.log(pokemon.length);

var wins = 0;
var losses = 0;
start_game();

//Game object
function game() {
	this.currentWord = pokemon[Math.floor(Math.random() * pokemon.length)];
	this.trackWord = blank(this.currentWord);
	this.correctLetters = [];
	this.guessedLetters = [];
	this.guessesLeft = 11;
	this.guessedAlready = false;
	this.correct = false;
	resetLives(this.guessesLeft);	
}

//When game starts, each letter of the chosen work is replaced with '_'
function blank(word) {
		var start = [];
		for(var i = 0; i < word.length; i++) {
			if(word.charAt(i) == " ")
				start.push(" ");
			else if(word.charAt(i) == ".")
				start.push(".")
			else if(word.charAt(i) == "'")
				start.push("'");
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
	document.getElementById("guessed").innerHTML = "Guessed:<br> " + game.guessedLetters.join(", ");
}

//Displays number of games won (Reset when refreshed)
function displayWins() {
	document.getElementById("numWins").innerHTML = "Wins: " + wins;
	document.getElementById("numLosses").innerHTML = "Losses: " + losses;
}

//Retrieves the user's input (keystroke)
function getInput(event) {
	var input = String.fromCharCode(event.keyCode);
	return input;
}

function resetLives(num) {
	for(var i = num-1; i >= 1; i--) {
		var string = "pokeball_" + i;
		console.log(string);
		document.getElementById(string).setAttribute("style", "-webkit-filter : grayscale(0%)");
	}
}

function timer() {
	var newGame;
	var time = 6;
	var reset = setInterval(function() {
					document.getElementById("timer").textContent = "New game starts in..." + --time;
				
					if(time <= 0) {
						document.getElementById("win_lose").innerHTML = "";
						clearTimeout(reset);
						document.getElementById("question").style.display = "initial";
						document.getElementById("char_pic").style.display = "none";
						document.getElementById("character_name").innerHTML = "";
						document.getElementById("timer").textContent = "";
						newGame = new game();
						play_game(newGame);
					}

				}, 1000);

}

//Starts playing game and any valid input starts couting as a guess
function play_game(newGame) {

	displayWord(newGame);
	//displayGuessesLeft(newGame);
	displayGuessedLetter(newGame);
	document.onkeypress = function() {
		var input = getInput(event); 
		//console.log(input);
		newGame.guessedAlready = false;
		newGame.correct = false;
		//Check if valid input (letters)
		if(input.match(/[abcdefghijklmnopqrstuvwxyz]/i) != null) {
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
					console.log(newGame.guessesLeft);
					document.getElementById("pokeball_" + newGame.guessesLeft).setAttribute("style", "-webkit-filter : grayscale(100%)");
					//If remaining number of guesses reaches zero, restart game with new word
					if(newGame.guessesLeft == 1) {
						document.getElementById("win_lose").innerHTML = newGame.currentWord + " ran away!";
						losses++;
						displayWins();
						displayCharacter(newGame.currentWord);
						characterPicture(newGame.currentWord);
						document.getElementById("question").style.display = "none";
						document.getElementById("char_pic").style.display = "initial";
						document.onkeypress = function() {}
						timer();
					}
					else {
					displayGuessedLetter(newGame);
					}
				}
			}
		}
		//Increment number of wins and restart game with new word
		if(newGame.currentWord == newGame.trackWord.join("")) {
			document.getElementById("win_lose").innerHTML = newGame.currentWord + " was caught!";
			wins++;
			displayWins();
			displayCharacter(newGame.currentWord);
			characterPicture(newGame.currentWord);
			document.getElementById("question").style.display = "none";
			document.getElementById("char_pic").style.display = "initial";
			document.onkeypress = function() {}
			timer();
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
		document.getElementById("start").style.display = "none";
		console.log(input);
		displayWord(newGame);
	 	displayWins();
		play_game(newGame);
	};
}

//Display corresponging text to chosen word (after win/loss)
function displayCharacter(word) {
	document.getElementById("character_name").innerHTML = word;
}

//Load corresponding picture to chosen word (after win/loss)
function characterPicture(word) {
	var picture = document.getElementById("char_pic");
	if(word == "Mr. Mime")
		word = "Mr._Mime";
	if(word == "Nidoran") {
		var rand = Math.floor(Math.random() * 2);
		if(rand == 0)
			word = "Nidoran_M";
		else
			word = "Nidoran_F";
	}

	picture.setAttribute("src", "assets/images/" + word + ".png");
}