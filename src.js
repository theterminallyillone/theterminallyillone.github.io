/*
	UN RÊVE, by Terminal Illness
		---Source---

	***REMEMBER TO DATE ENTRIES AS FOLLOWS***
		TITLE_CITY_STATE_YEAR-MONTH-DAY_.mp4
		EXAMPLE_Indianapolis_IN_2021-11-05_.mp4
*/

function init() {
	if (page > pagetitles.length-1 || page < 0) {
		page = 0;
	}
	document.getElementById("svgdiv").innerHTML = svgcodeinner+buttoncolors[currentcolor]+svgcodeouter;
	changeColor();
	document.getElementById("address").innerHTML = walletaddress;
	client.get(walletContentsURL, function(response) {
		document.getElementById("balance").innerHTML = "<span style='color:yellow'><u>"+convertSatoshis(JSON.parse(response).final_balance).toString()+"</u></span><span style='color:white'> BTC Funded</span>";
	});
	pages = sendpages(pages);
	origpages = pages;
	origtitles = pagetitles;
	document.getElementById("DOB").innerHTML = DOB;
	document.getElementById("tabtitle").innerHTML = tabtitle;
	document.getElementById("title").innerHTML = "<b>"+title+"</b><br>";
	show(page);
	insertDashes(document.getElementById("title").innerHTML.length-11, "title", "beforeend");
	for (var i = 0; i < contacts.length; i++){
		insertDashes(contacts[i].length+2, "contactinsert", "afterbegin");
		document.getElementById("contactinsert").insertAdjacentHTML("afterbegin","<br>+ "+contacts[i]+"<br>");
	}
	insertDashes(contacts[contacts.length-1].length+2, "contactinsert", "afterbegin");
	document.getElementById("entries").innerHTML="There are "+totalentries.toString()+" total entries.";
	document.getElementById("entries").insertAdjacentHTML("beforeend","<br>");
	insertDashes(document.getElementById("entries").innerHTML.length-4, "entries", "beforeend");
	if (window.innerHeight > document.getElementById("pagetitle").offsetTop) {
		document.getElementById("pagetitle").style = "display:block; margin-top:"+((window.innerHeight-document.getElementById("pagetitle").offsetTop)+20).toString()+"px;";
	}
	for (var i = 1; i < tags.length; i++) {
		document.getElementById("tagbuttons").insertAdjacentHTML("beforeend", "<span class='tagbutton' onclick='sortsentpages(\""+tags[i]+"\")' style='color:"+tagcolors[i]+";'><b>#"+tags[i]+"</b></span>");
	}
	setInterval(changeColor, timechange);
}
function changeColor() {
	for (i = 0; i < document.getElementsByTagName("button").length; i++) {
		document.getElementsByTagName("button")[i].style.background = buttoncolors[currentcolor];
	}
	document.getElementById("dot").style.backgroundColor=buttoncolors[currentcolor];
	document.getElementById("stars").style.color=buttoncolors[currentcolor];
	document.getElementById("title").style.color=buttoncolors[currentcolor];
	document.getElementById("scroll").style.color=buttoncolors[currentcolor];
	document.getElementById("svgdiv").innerHTML = svgcodeinner+buttoncolors[currentcolor]+svgcodeouter;
	currentcolor++
	if (currentcolor == buttoncolors.length) {
		currentcolor = 0;
	}
}
function sortsentpages(tag) {
	pages = origpages;
	pagetitles = origtitles;
	var loaded = sortByTag(tag);
	pages = loaded.pages;
	pagetitles = loaded.titles;
	document.getElementById("content").innerHTML = "";
	document.getElementById("showremoved").style="display:none";
	page = 0;
	show(page);
}
function resetpages() {
	pages = origpages;
	pagetitles = origtitles;
	document.getElementById("content").innerHTML = "";
	document.getElementById("showremoved").style="display:none";
	page = 0;
	show(page);
}
function sortByTag(tag) {
	var sortedPages = {
		pages : [['']],
		titles : []
	}
	var pushed = false;
	for (var i = 0; i < pages.length; i++) {
		for (var j = 0; j < pages[i].length; j++) {
			if (pages[i][j].tags.includes(tag)) {
				sortedPages.pages[i].push(pages[i][j]);
				pushed = true;
			}
		}
		if (pushed) {
			sortedPages.titles.push(pagetitles[i]);
		}
		sortedPages.pages.push([]);
		pushed = false;
	}
	sortedPages.pages[0].shift();
	sortedPages.pages = sortedPages.pages.filter(function (el) {if(el.length>0){return el;}});
	return sortedPages;
}
function convertSatoshis(satoshi) {
	return satoshi*0.00000001;
}
function insertDashes(Dashlength, itemid, where) {
	for (var i = 0; i < Dashlength; i++) {
		 document.getElementById(itemid).insertAdjacentHTML(where,"-");
	}
}
function remove() {
	document.getElementById("content").innerHTML = ""
	document.getElementById("showremoved").style="";
}
function sendpages(pages) {
	var pagearray = pages;
	pages = [];
	for (var i = 0; i < pagearray.length; i++) {
		pages.push([]);
		for (var j = 0; j < pagearray[i].length; j+=2) {
			pages[i].push(new item(pagearray[i][j],pagearray[i][j+1]));
			totalentries++;
		}
	}
	return pages;
}
function show(page) {
	document.getElementById("pager").innerHTML="This is page "+(page+1).toString()+"/"+pages.length+".<br>";
	insertDashes(document.getElementById("pager").innerHTML.length-4, "pager", "beforeend");
	if (pages[page].length > 1) {
		document.getElementById("noentries").innerHTML="There are "+(pages[page].length).toString()+" entries on this page.<br>";
	} else {
		document.getElementById("noentries").innerHTML="There is "+(pages[page].length).toString()+" entry on this page.<br>";
	}
	insertDashes(document.getElementById("noentries").innerHTML.length-4, "noentries", "beforeend");
	document.getElementById("pagetitle").innerHTML = "<center><h1><b><u>"+pagetitles[page]+"</u></b></center>";
	if (pages[page].length > 0) {
		for (let i = 0; i < pages[page].length; i++)	{
			if (pages[page][i].title != undefined) {
				let insert = "<div id='pg"+page.toString()+"c"+i.toString()+"' class='text'><h1>"+pages[page][i].title.replace(/-/g, " ")+" ["+pages[page][i].extension+"] "+pages[page][i].city+"<div style='float:right'>"+pages[page][i].date+"</div></h1><button id='pg"+page.toString()+"b"+i.toString()+"' onclick=\"document.getElementById('pg"+page.toString()+"b"+i.toString()+"').style='display:none';document.getElementById('pg"+page.toString()+"obj"+i.toString()+"').style='';document.getElementById('pg"+page.toString()+"tex"+i.toString()+"').style='';document.getElementById('dpg"+page.toString()+"obj"+i.toString()+"').style='';\">Display</button>";
				insert+="<div id='pg"+page.toString()+"tex"+i.toString()+"' style='display:none'><h2><pre>";
				for (var j = 0; j < pages[page][i].tags.length; j++) {
					insert+=("#"+pages[page][i].tags[j]).fontcolor(tagcolors[tags.indexOf(pages[page][i].tags[j])])+" ";
				}
				insert+="<br><br>&#9"+pages[page][i].text+"</pre></h2></div>";
				if(pages[page][i].downloadable) {
					insert +="<br><button style='display:none' id='dpg"+page.toString()+"obj"+i.toString()+"'><a href='assets/"+pages[page][i].filename+"' download>Download</a></button><br><br><br>";
				}
				if (pages[page][i].extension == "png" || pages[page][i].extension == "jpg" || pages[page][i].extension == "jpeg" || pages[page][i].extension == "gif") {
					insert += "<img id='pg"+page.toString()+"obj"+i+"' style='display:none' src='"+URL+"assets/"+pages[page][i].filename+"'>";
				} else if (pages[page][i].extension == "pdf") {
					insert += "<object type='application/pdf' id='pg"+page.toString()+"obj"+i.toString()+"'style='display:none' data='assets/"+pages[page][i].filename+"'></object>";
				} else if (pages[page][i].extension == "mp3" || pages[page][i].extension == "wav") {
					insert += "<audio controls style='display:none' id='pg"+page.toString()+"obj"+i.toString()+"'><source src='assets/"+pages[page][i].filename+"' type='audio/"+pages[page][i].extension+"'></audio>";
				} else if (pages[page][i].extension == "mp4") {
					insert += "<video controls style='display:none' id='pg"+page.toString()+"obj"+i.toString()+"'><source src='assets/"+pages[page][i].filename+"' type='video/"+pages[page][i].extension+"'</video>";
				} else if (pages[page][i].extension == "msg") {
					insert += "<br><br><br><div id='pg"+page.toString()+"obj"+i.toString()+"'></div><br>";
				} else if (pages[page][i].extension == "txt") {
					insert += "<embed width='900px' height='350vw' style='display:none;' id='pg"+page.toString()+"obj"+i.toString()+"' src='assets/"+pages[page][i].filename+"'>";
				}
				insert += "</div>";
				document.getElementById("content").insertAdjacentHTML("beforeend", insert);
			}
		}
		if (pages[page+1] == undefined) {
			let insert = "<center class='text'><h1>No more content has been uploaded.</h1></center>";
			document.getElementById("content").insertAdjacentHTML("beforeend", insert);
			document.getElementById("showmore").style = "display:none";
		} else {
			document.getElementById("showmore").style="";
		}
	} else {
		let insert = "<center class='text'><h1>No content has been uploaded.</h1></center>";
		document.getElementById("content").insertAdjacentHTML("beforeend", insert);
		document.getElementById("showmore").style = "display:none";
	}
	for (i = 0; i < document.getElementsByTagName("button").length; i++) {
		document.getElementsByTagName("button")[i].style.background = buttoncolors[currentcolor];
	}
}
function replaceWord(str, filter, word) {
	var done = false;
	while (!done) {
		if (str.includes(filter)) {
			str = str.replace(filter, word);
		} else {
			done = true;
		}
	}
	return str;
}
function genrss(pages) {
	//RSS GENERATION GETS LOGGED IN CONSOLE
	var RSSstr = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n<channel>\n<atom:link href=\"https://theterminallyillone.github.io/feed.xml\" rel=\"self\" type=\"application/rss+xml\"/>\n<title>UN RÊVE</title>\n<link>"+rssURL+"</link>\n<description>RSS feed</description>\n";
	for (var p = 0; p < pages.length; p++) {
		for (var i = 0; i < pages[p].length; i+=2) {
			var pubdate = pages[p][i].split("_")[3].toString().split("-");
			pubdate = pubdate[2]+" "+months[pubdate[1]-1]+" "+pubdate[0]+" 00:00:00 EST";
			var day = days[new Date(pubdate).getDay()];
			RSSstr+="<item>\n<title>"+pages[p][i]+"</title>\n<guid isPermaLink='false'>"+p.toString()+"-"+(i/2).toString()+"</guid>\n<link>"+rssURL;
			if (!nondownloadabletypes.includes(pages[p][i].substr(pages[p][i].lastIndexOf(".")+1, pages[p][i].length))) {
				RSSstr += "assets/"+replaceWord(pages[p][i], " ", "%20");
			} else {
				RSSstr +="?page="+p.toString();
			}
			RSSstr += "</link>\n<description>"+pages[p][i+1]+"</description>\n<pubDate>"+day+", "+pubdate+"</pubDate>\n</item>\n";
		}
	}
	console.log(RSSstr+"</channel>\n</rss>")
}
genrss(pages);
init();
