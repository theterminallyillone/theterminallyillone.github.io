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
	show(page);
}
function remove() {
	document.getElementById("content").innerHTML = ""
	document.getElementById("showremoved").style="";
}
function show(page) {
	if (pages[page].title.length > 0) {
		for (let i = 0; i < pages[page].title.length; i++)	{
			if (pages[page].title[i] != undefined) {
				let insert = "<div id='pg"+page.toString()+"c"+i.toString()+"' class='text'><h1>"+pages[page].title[i].replace(/-/g, " ")+" ["+pages[page].extension[i]+"] "+pages[page].city[i]+"<div style='float:right'>"+pages[page].date[i]+"</div></h1><button id='pg"+page.toString()+"b"+i.toString()+"' onclick=\"document.getElementById('pg"+page.toString()+"b"+i.toString()+"').style='display:none';document.getElementById('pg"+page.toString()+"obj"+i.toString()+"').style='';document.getElementById('pg"+page.toString()+"tex"+i.toString()+"').style='';\">Display</button>";
				insert+="<div id='pg"+page.toString()+"tex"+i.toString()+"' style='display:none'><h2><pre>&#9"+pages[page].text[i]+"</pre><h2></div>";
				if (pages[page].extension[i] == "png" || pages[page].extension[i] == "jpg" || pages[page].extension[i] == "jpeg" || pages[page].extension[i] == "gif") {
					insert += "<img id='pg"+page.toString()+"obj"+i+"' style='display:none' src='"+URL+"assets/"+page.toString()+"/"+pages[page].title[i]+"_"+pages[page].date[i]+"."+pages[page].extension[i]+"'>";
				} else if (pages[page].extension[i] == "pdf") {
					insert += "<object type='application/pdf' id='pg"+page.toString()+"obj"+i.toString()+"'style='display:none' data='assets/"+page.toString()+"/"+pages[page].title[i]+"_"+pages[page].date[i]+"."+pages[page].extension[i]+"'></object>";
				} else if (pages[page].extension[i] == "mp3") {
					insert += "<audio controls style='display:none' id='pg"+page.toString()+"obj"+i.toString()+"'><source src='assets/"+page.toString()+"/"+pages[page].title[i]+"_"+pages[page].date[i]+"."+pages[page].extension[i]+"' type='audio/"+pages[page].extension[i]+"'></audio>";
				} else if (pages[page].extension[i] == "mp4") {
					insert += "<video controls style='display:none' id='pg"+page.toString()+"obj"+i.toString()+"'><source src='assets/"+page.toString()+"/"+pages[page].title[i]+"_"+pages[page].date[i]+"."+pages[page].extension[i]+"' type='video/"+pages[page].extension[i]+"'>/video>";
				} else if (pages[page].extension[i] == "txt") {
					insert += "<div id='pg"+page.toString()+"obj"+i.toString()+"'></div>";
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
}

init();
