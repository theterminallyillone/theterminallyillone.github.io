/*
	Crawler, by Terminal Illness
		---Variables---
*/

/*
	ACTION SYNTAX
	# - GOTO ROOM #
	? - APPEND TEXT
	/ - REMOVE word and action from current screen (non repeatable action i.e opening doors
*/

var AGAIN = "";
var announced = false;
var handled = true;
var INPUT = "";
var LASTDIR = "";
var LEVEL = 0;
var MAP = [[0, ""]];
var READHAIKUS = [];

var ITEMS = [
	{
		called : "AXE",
		type : "WEAPON",
		spawnability : 2,
		text : [[],[],[]],
		actions : [[],[],[]]
	}, {
	}
];
var MOBS = [
	{
		called : "ORC",
		health : 100,
		carries : [[10, 50],["AXE", "IRON CHESTPLATE"]],
		drops : [[50],["AXE"]],
		says : [[[50, 50],["Hello.", "Hi."]],[[50, 40, 10], ["Have at you!", "DIE!!!", "NOTHING"]]],
		attackmodifiers : [[80, 15, 5],[1, 0, 2],[[""], [""], [""]]],
		conditions : ["PEACEFUL"],
		conditionalactions : [["provoked"],["hostile"]],
		probableactions : [[40, 40, 20],["SAY", "HOSTILE", "FLEE"]],
		levels : "01234"
	}, {
	}
];
var Player = {
	called : "",
	inventory : []
}
var ROOMS = [
	{
		called : "",
		index : 1,
		level : 0,
		text : "",
		conditions : [],
		words : [["ELABORATE", ""]],
		actions : [],
		entitities : [],
		items : [],
		applications : [],
		}, {
		called : "",
		index : 2,
		level : 0, 
		text : "",
		conditions : [],
		words : [],
		actions : [],
		entitities : [],
		items : [],
		applications : []
	}
];
var SCREEN = {
	called : "ZERO",
	index : 0,
	connects : "",
	level : 0,
	conditions : ["SEEN"],
	objects : [[["DOOR"], ["HAIKU", "WRITING"]], ["Just a door.", "Interesting, that."]],
	text : "<br><b>ZERO</b>",
	words : [["OPEN", "OPEN DOOR", "OPEN THE DOOR"]],
	entities : [],
	items : [],
	actions : ["?-You study the poem for a moment before coninuing.-/-OPEN"],
	applications : []
}
