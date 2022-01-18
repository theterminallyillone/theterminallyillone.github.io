/*
	UN RÊVE, by Terminal Illness
		---Variables---
		
	***REMEMBER TO DATE ENTRIES AS FOLLOWS***
		TITLE_CITY_STATE_YEAR-MONTH-DAY_.mp4
		EXAMPLE_Indianapolis_IN_2021-11-05_.mp4
*/

var showingtag = "ALL";
var origpages;
var origtitles;
var currentcolor = 0;
var URL = window.location.href;
var page = 0;
var querystring = window.location.search;
var urlParams = new URLSearchParams(querystring);
if (urlParams.get("page") !== null) {
	page = urlParams.get("page");
}
var totalentries = 0;
var item = function(filename, text) {
	this.filename = filename;
	filename = filename.split("_");
	var datestring = filename[3].toString();
	datestring = datestring.split("-");
	this.title = filename[0];
	this.city = filename[1]+" "+filename[2];
	this.date = datestring[0]+" "+months[datestring[1]-1]+" "+datestring[2];
	this.extension = filename[4].substr(filename[4].lastIndexOf(".")+1,filename[4].length);
	this.text = text;
	this.tags  = [];
	this.downloadable = true;
	if (nondownloadabletypes.includes(this.extension)) {
		this.downloadable = false;
	}
	for (var i = 0; i < tags.length; i++) {
		if (this.text.split("#"+tags[i]).length > 1) {
			this.tags.push(tags[i]);
			this.text = this.text.replace("#"+tags[i], "");
		}
	}
	if (this.tags.length == 0) {
		this.tags.push("ALL");
	}
}
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
var client = new HttpClient();
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];