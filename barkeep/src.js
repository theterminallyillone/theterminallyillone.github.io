/*
	Crawler, by Terminal Illness
		---Source---
*/

function append(text) {
	AGAIN = text;
	let screentext = "<br>";
	let boxWidthinDashes = parseInt(document.getElementById("box").style.width)/9;
	for (let i = 0; i <= boxWidthinDashes; i++) {
		screentext += "_";
	}
	screentext +="<br><br>"+text+"<br>";
	SCREEN.text += screentext;
}
function clear() {
	SCREEN.text = "";
}
function end() {
	console.log("end");
}
function execute(action) {
	let taken = action.split("-");
	for (let i = 0; i < taken.length; i += 2) {
		if (taken[i] == "?") {
			append(taken[i+1]);
		} else if (taken[i] == "/") {
			let wordLocation = SCREEN.words.indexOf(taken[i+1]);
			SCREEN.words.splice(wordLocation, 1);
			SCREEN.actions.splice(wordLocation, 1);
		}
	}
}
function haiku() {
	let haikus = [
		"This amourous mind<br>An inadequate vessel<br>A pity to be",
		"You are the hidden<br>The masochist beneath me<br>The only pain left"
	];
	let decided = false;
	let counter = 0;
	while (!decided) {
		let randomNum = new RandomInt(0, haikus.length-1);
		if (READHAIKUS.indexOf(randomNum.val) == -1) {
			READHAIKUS.push(randomNum.val);
			return haikus[randomNum.val];
		} else if (counter == haikus.length) {
			return "ERROR 404 HAIKU NOT FOUND";
		}
		counter++;
	}
}
function handle() {
	for (let i = 0; i < SCREEN.words.length; i++) {
		let synonym = false;
		let synonyms = SCREEN.words[i];
		for (let j = 0; j < synonyms.length; j++) {
			if (INPUT == synonyms[j]) {
				execute(SCREEN.actions[i]);
				synonym = true;
				break;
			}
		}
		if (INPUT == SCREEN.words[i]) {
			execute(SCREEN.actions[i]);
			break;
		} else if (INPUT == "HELP") {
			append("no");
			break;
		} else if (INPUT == "CLEAR") {
			clear();
			break;
		} else if (INPUT == "AGAIN") {
			append(AGAIN);
			break;
		} else if (INPUT.substr(0, 7) == "OBSERVE") {
			let indice = -1;
			for (let j = 0; j < SCREEN.objects[0].length; j++) {
				if (SCREEN.objects[0][j].indexOf(INPUT.substr(8, INPUT.length-1)) != -1) {
					indice = j;
					break;
				}
			}
			if (indice != -1) {
				append(SCREEN.objects[1][SCREEN.objects[0][indice].indexOf(INPUT.substr(8, INPUT.length-1))]);
			}
			break;
		} else if (!synonym) {
			append("I don't understand.");
			break;
		}
	}
	if (SCREEN.entities.length > 0) {
		
	}
	handled = true;
}
function init() {
	let width = window.innerWidth;
	let height = window.innerHeight;
	document.getElementById("box").style="width: "+(width/2).toString()+"px;"+"height: "+(height/2).toString()+"px;"+"margin-left: -"+(width/4).toString()+"px;"+"margin-top: -"+(height/4).toString()+"px;";
	keyListen.start();
	addPressListener("ENTER", submit);
	append("There, upon the rusted door, t'was etched:<br><br>"+haiku()+"<br>");
	main();
}
function main() {
	window.requestAnimationFrame(main);
	document.getElementById("textinput").style="left: "+(window.innerWidth/2-50).toString()+"px;";
	render(SCREEN);
	if (!handled) { handle(); }
}
function map() {
	//return bitmap of map
}
function render(screen) {
	if (screen.entities.length > 1 && screen.entities.length > 0 && !announced) {
		let showString = "";
		for (let i = 0; i < screen.entities.length; i++) {
			if (i != screen.entities.length-2) {
				showString += screen.entities[i].called+", ";
			} else {
				showString += screen.entities[i].called+", and ";
			}
		}
		append(showString.substring(0, showString.length-2)+" are present here.");
		announced = true;
	} else if (screen.entities.length != 0 && !announced) {
		append(screen.entities[0].called+" is present here.");
		announced = true;
	}
	document.getElementById("box").innerHTML = screen.text;
}
function submit() {
	INPUT = document.getElementById("textinput").value.toUpperCase();
	document.getElementById("textinput").value = "";
	handled = false;
}
function use(item) {
	if (SCREEN.applications.indexOf(item) != -1) {
		execute(SCREEM.applications[SCREEN.applications.indexOf(item)]);
	} else {
		append("That does not apply here.");
	}
}

init();
