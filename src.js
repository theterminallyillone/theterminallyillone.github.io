/*
	UN RÊVE, by Terminal Illness
		---Source---

	***REMEMBER TO DATE ENTRIES AS FOLLOWS***
		TITLE_CITY_STATE_YEAR-MONTH-DAY_.mp4
		EXAMPLE_Indianapolis_IN_2021-11-05_.mp4
*/

function init() {
	getNextPage();
	document.getElementById("rsslink").href = vars.globals.rssURL+"feed.xml";
	if ((page-1) >= vars.globals.numpages-1 || page < 0) {
		page = 0;
	}
	document.getElementById("svgdiv").innerHTML = vars.globals.svgcodeinner+vars.globals.buttoncolors[currentcolor]+vars.globals.svgcodeouter;
	changeColor();
	document.getElementById("address").innerHTML = vars.globals.walletaddress;
	client.get(vars.globals.walletContentsURL, function(response) {
		document.getElementById("balance").innerHTML = "<span style='color:yellow'><u>"+convertSatoshis(JSON.parse(response).final_balance).toString()+"</u></span><span style='color:white'> BTC Funded</span>";
	});
	document.getElementById("DOB").innerHTML = vars.globals.DOB;
	document.getElementById("tabtitle").innerHTML = vars.globals.tabtitle;
	document.getElementById("title").innerHTML = "<b>"+vars.globals.title+"</b><br>";
	show(page);
	insertDashes(document.getElementById("title").innerHTML.length-11, "title", "beforeend");
	for (var i = 0; i < vars.globals.contacts.length; i++){
		insertDashes(vars.globals.contacts[i].length+2, "contactinsert", "afterbegin");
		document.getElementById("contactinsert").insertAdjacentHTML("afterbegin","<br>+ "+vars.globals.contacts[i]+"<br>");
	}
	insertDashes(vars.globals.contacts[vars.globals.contacts.length-1].length+2, "contactinsert", "afterbegin");
	document.getElementById("entries").innerHTML="There are "+vars.globals.totalentries.toString()+" total entries.";
	document.getElementById("entries").insertAdjacentHTML("beforeend","<br>");
	insertDashes(document.getElementById("entries").innerHTML.length-4, "entries", "beforeend");
	if (window.innerHeight > document.getElementById("pagetitle").offsetTop) {
		document.getElementById("pagetitle").style = "display:block; margin-top:"+((window.innerHeight-document.getElementById("pagetitle").offsetTop)+20).toString()+"px;";
	}
	insertTagButtons();
	setInterval(changeColor, vars.globals.timechange);
}
function insertEmojis(text) {
	var matchesmoji = /(\^\S\d)/;
	var includesmoji = false;
	var done = false;
	while (!done) {
		if (matchesmoji.test(text)) {
			var matched = text.match(matchesmoji)[0];
			text = text.replace(matched, emojis.sprites[matched[2]][parseInt(matched[1], 16)]);
			includesmoji = true;
		} else {
			done = true;
		}
	}
	if (includesmoji) {
		text += "<br><br><br><br>";
	}
	return text;
}
function insertTagButtons() {
	document.getElementById("tagbuttons").innerHTML = "<span class=\"tagbutton\" style=\"margin-left:0;\" onclick=\"sortByTag('ALL')\"><b>#ALL</b></span>";
	for (var i = 0; i < thispage.tags.length; i++) {
		document.getElementById("tagbuttons").insertAdjacentHTML("beforeend", "<span class='tagbutton' onclick='sortByTag(\""+thispage.tags[i]+"\")' style='color:"+getTagColor(thispage.tags[i])+";'><b>#"+thispage.tags[i]+"</b></span>");
	}
}
function sortByTag(tag) {
	if (tag == "ALL") {
		thispage = reservedpage;
		tagclicked = false;
	} else if (!tagclicked) {
		tagclicked = true;
		reservedpage = thispage;
		var sortedpage = {title:thispage.title,tags:[tag],items:[]};
		for (var i = 0; i < thispage.items.length; i++) {
			if (thispage.items[i].tags.includes(tag)) {
				sortedpage.items.push(thispage.items[i]);
			}
		}
		thispage = sortedpage;
	}
	document.getElementById("content").innerHTML = "";
	show(page);
	insertTagButtons();
}
function getTagColor(tagname) {
	var color = "";
	for (var i = 0; i < vars.globals.tags.length; i++) {
		if (vars.globals.tags[i][0] == tagname) {
			color = vars.globals.tags[i][1];
			break;
		}
	}
	return color;
}
function changeColor() {
	for (i = 0; i < document.getElementsByTagName("button").length; i++) {
		document.getElementsByTagName("button")[i].style.background = vars.globals.buttoncolors[currentcolor];
	}
	document.getElementById("dot").style.backgroundColor=vars.globals.buttoncolors[currentcolor];
	document.getElementById("stars").style.color=vars.globals.buttoncolors[currentcolor];
	document.getElementById("title").style.color=vars.globals.buttoncolors[currentcolor];
	document.getElementById("scroll").style.color=vars.globals.buttoncolors[currentcolor];
	document.getElementById("svgdiv").innerHTML = vars.globals.svgcodeinner+vars.globals.buttoncolors[currentcolor]+vars.globals.svgcodeouter;
	currentcolor++
	if (currentcolor == vars.globals.buttoncolors.length) {
		currentcolor = 0;
	}
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
	document.getElementById("content").innerHTML = "";
	document.getElementById("showremoved").style="";
}
function getNextPage() {
	if ((page+1) != vars.globals.numpages) {
		client.get(URL+"pages/"+(page+1).toString()+".json", function(response) {
			nextpage = JSON.parse(response);
			pages.push(nextpage);
		});
	}
}
function show(page) {
	document.getElementById("pager").innerHTML="This is page "+(parseInt(page, 10)+1).toString()+"/"+vars.globals.numpages+".<br>";
	insertDashes(document.getElementById("pager").innerHTML.length-4, "pager", "beforeend");
	if (thispage.items.length > 1) {
		document.getElementById("noentries").innerHTML="There are "+(thispage.items.length).toString()+" entries on this page.<br>";
	} else {
		document.getElementById("noentries").innerHTML="There is "+(thispage.items.length).toString()+" entry on this page.<br>";
	}
	insertDashes(document.getElementById("noentries").innerHTML.length-4, "noentries", "beforeend");
	document.getElementById("pagetitle").innerHTML = "<center><h1><b><u>"+thispage.title+"</u></b></center>";
	if (thispage.items.length > 0) {
		for (let i = 0; i < thispage.items.length; i++)	{
			if (thispage.items[i].title != undefined) {
				let insert = "<div id='pg"+page.toString()+"c"+i.toString()+"' class='text'><h1>"+thispage.items[i].title.replace(/-/g, " ")+" ["+thispage.items[i].extension+"] "+thispage.items[i].city+"<div style='float:right'>"+thispage.items[i].date+"</div></h1><button id='pg"+page.toString()+"b"+i.toString()+"' onclick=\"document.getElementById('pg"+page.toString()+"b"+i.toString()+"').style='display:none';document.getElementById('pg"+page.toString()+"obj"+i.toString()+"').style='';document.getElementById('pg"+page.toString()+"tex"+i.toString()+"').style='';document.getElementById('dpg"+page.toString()+"obj"+i.toString()+"').style='';\">Display</button>";
				insert+="<div id='pg"+page.toString()+"tex"+i.toString()+"' style='display:none'><h2><pre>";
				for (var j = 0; j < thispage.items[i].tags.length; j++) {
					insert+=("#"+thispage.items[i].tags[j]).fontcolor(getTagColor(thispage.items[i].tags[j]))+" ";
				}
				insert+="<br><br>&#9<div style='display:inline;'>"+insertEmojis(thispage.items[i].text)+"</div></pre></h2></div>";
				if(thispage.items[i].downloadable) {
					insert +="<br><button style='display:none' id='dpg"+page.toString()+"obj"+i.toString()+"'><a href='assets/"+thispage.items[i].filename+"' download>Download</a></button><br><br><br>";
				}
				if (thispage.items[i].extension == "png" || thispage.items[i].extension == "jpg" || thispage.items[i].extension == "jpeg" || thispage.items[i].extension == "gif") {
					insert += "<img id='pg"+page.toString()+"obj"+i+"' style='display:none' src='"+URL+"assets/"+thispage.items[i].filename+"'>";
				} else if (thispage.items[i].extension == "pdf") {
					insert += "<object type='application/pdf' id='pg"+page.toString()+"obj"+i.toString()+"'style='display:none' data='assets/"+thispage.items.filename+"'></object>";
				} else if (thispage.items[i].extension == "mp3" || thispage.items[i].extension == "wav") {
					insert += "<audio controls style='display:none' id='pg"+page.toString()+"obj"+i.toString()+"'><source src='assets/"+thispage.items[i].filename+"' type='audio/"+thispage.items[i].extension+"'></audio>";
				} else if (thispage.items[i].extension == "mp4") {
					insert += "<video controls style='display:none' id='pg"+page.toString()+"obj"+i.toString()+"'><source src='assets/"+thispage.items[i].filename+"' type='video/"+thispage.items[i].extension+"'</video>";
				} else if (thispage.items[i].extension == "msg") {
					insert += "<br><br><br><div id='pg"+page.toString()+"obj"+i.toString()+"'></div><br>";
				} else if (thispage.items[i].extension == "txt") {
					insert += "<embed class='embedclass' width='900px' height='";
					if (!thispage.items[i].tags.includes("haiku")) {
						insert+="350vw";
					} else {
						insert+="120vw";
					}
					insert+="' style='display:none;' id='pg"+page.toString()+"obj"+i.toString()+"' src='assets/"+thispage.items[i].filename+"'>";
				}
				insert += "</div>";
				document.getElementById("content").insertAdjacentHTML("beforeend", insert);
			}
		}
		if (page == (vars.globals.numpages-1)) {
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
		document.getElementsByTagName("button")[i].style.background = vars.globals.buttoncolors[currentcolor];
	}
}