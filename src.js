/*
	Lorem, by Terminal Illness
		---Source---
*/

function init() {
	if (date.getMonth() < 9) {
		dateString += "0"+(date.getMonth()+1).toString();
	} else {
		dateString += (date.getMonth()+1).toString();
	}
	if (date.getDate() < 10) {
		dateString += "0"+date.getDate().toString();
	} else {
		dateString += date.getDate().toString();
	}
	dateString += date.getFullYear().toString();
	document.getElementById("date").innerHTML = dateString;
	pager();
}
function pager() {
	for (let i = 0; i < pages.length; i++) {
		showMore(pages[i], i);
	}
}
function showMore(index, page) {
	if (index.title.length > 0) {
		for (let i = lastShownPage; i < lastShownPage+shownPages; ++i) {
			if (index.title[i] != undefined) {
				var insertString = "<div id='"+i+"' class='text'><h1>"+index.title[i].replace("-", " ")+" ["+index.ext[i]+"] "+index.city[i]+"<div style='float:right'>"+index.date[i]+"</div></h1><button id='b"+i.toString()+"' onclick=\"document.getElementById('b"+i.toString()+"').style='display:none';document.getElementById('pg"+page.toString()+"obj"+i.toString()+"').style='';\">Display</button>";
				if (index.ext[i] == "png" || index.ext[i] == "jpg" || index.ext[i] == "jpeg" || index.ext[i] == "gif") {
					insertString += "<img id='pg"+page.toString()+"obj"+i+"' style='display:none' src='"+URL+"assets/"+page.toString()+"/"+index.title[i]+"_"+index.date[i]+"."+index.ext[i]+"'>";
				} else if (index.ext[i] == "pdf") {
					insertString += "<object type='application/pdf' id='pg"+page.toString()+"obj"+i.toString()+"'style='display:none' data='assets/"+page.toString()+"/"+index.title[i]+"_"+index.date[i]+"."+index.ext[i]+"'></object>";
				} else if (index.ext[i] == "mp3") {
					insertString +="<audio controls style='display:none' id='pg"+page.toString()+"obj"+i.toString()+"'><source src='assets/"+page.toString()+"/"+index.title[i]+"_"+index.date[i]+"."+index.ext[i]+"' type='audio/"+index.ext[i]+"'></audio>";
				}
				insertString += "</div>";
				document.getElementById("content").insertAdjacentHTML("beforeend", insertString);
			} else {
				document.getElementById("showmore").style = "display:none";
				break;
			}
		}
	} else {
		var insertString = "<center class='text'><h1>No content has been uploaded.</h1></center>";
		document.getElementById("content").insertAdjacentHTML("beforeend", insertString);
		document.getElementById("showmore").style = "display:none";
	}
	lastShownPage += shownPages;
}
init();
