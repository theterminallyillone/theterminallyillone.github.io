/*
	UN RÊVE, by Terminal Illness
		---Variables---
		
	***REMEMBER TO DATE ENTRIES AS FOLLOWS***
		TITLE_CITY_STATE_YEAR-MONTH-DAY_.mp4
		EXAMPLE_Indianapolis_IN_2021-11-05_.mp4
*/

var pages = [];
var currentcolor = 0;
var URL = window.location.href;
var page = 0;
var querystring = window.location.search;
var urlParams = new URLSearchParams(querystring);
if (urlParams.get("page") !== null) {
	page = parseInt(urlParams.get("page")-1, 10);
}
var totalentries = 0;
var HttpClient = function() {
	this.get = function(aUrl, aCallback) {
		var anHttpRequest = new XMLHttpRequest();
		anHttpRequest.onreadystatechange = function() { 
		if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
			aCallback(anHttpRequest.responseText);
		}
		anHttpRequest.open( "GET", aUrl, true );            
		anHttpRequest.send( null );
	}
}
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var client = new HttpClient();
var vars;
var thispage;
var nextpage;
var lastpage;
var spritesheet = function(sheet, spriteH, spriteW, columns, rows, numSprites) {
	this.sprites = [[]];
	var rendered = 0;
	var spriteX = 0;
	var spriteY = 0;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			if (rendered<numSprites) {
				this.sprites[i].push("<section style=\"position:relative;top:30px;display:inline-block;width:"+spriteW+"px;height:"+spriteH+"px; background:url('"+sheet+"'); background-position:"+spriteX+"px "+spriteY+"px;\"></section>");
				spriteX -= spriteW;
				rendered++;
			}
		}
		spriteY -= spriteH;
		this.sprites.push([]);
	}
	this.sprites.pop();
}
var emojis = new spritesheet("emojis.png", 72, 72, 16, 10, 151);
client.get(URL+"globals.json", function(response) {
	vars = JSON.parse(response);
	client.get(URL+"pages/"+page.toString()+".json", function(response) {
		thispage = JSON.parse(response);
		pages.push(thispage);
		init();
	});
});