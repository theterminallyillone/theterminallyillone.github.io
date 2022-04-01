var fs = require("fs");
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.pause();
var args = process.argv.slice(2);
var path = require("path");
var contentExts = ["js","xml","json","pdf","zip","mp3","jpeg","jpg","gif","svg","png","css","html","txt","mp4","wav"];
var contentTypes = ["application/javascript","text/xml","application/json","application/pdf","application/zip","audio/mpeg","image/jpeg","image/jpeg","image/gif","image/svg+xml","image/png","text/css","text/html","text/plain","video/mp4","audio/x-wav"];
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
function genrss(pages) {
	//RSS GENERATION GETS LOGGED IN CONSOLE
	if (pages.length < numRSSPages) {
		numRSSPages = pages.length;
	}
	var RSSstr = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n<channel>\n<atom:link href=\"https://theterminallyillone.github.io/feed.xml\" rel=\"self\" type=\"application/rss+xml\"/>\n<title>UN RÊVE</title>\n<link>"+rssURL+"</link>\n<description>RSS feed</description>\n";
	for (var p = 0; p < numRSSPages; p++) {
		for (var i = 0; i < pages[p].length; i+=2) {
			var pubdate = pages[p][i].split("_")[3].toString().split("-");
			if (pubdate[2].length != 2) {
				pubdate[2] = "0"+pubdate[2];
			}
			pubdate = pubdate[2]+" "+months[pubdate[1]-1].substr(0,3)+" "+pubdate[0]+" 00:00:00 EST";
			var day = days[new Date(pubdate).getDay()];
			RSSstr+="<item>\n<title>"+pages[p][i]+"</title>\n<guid isPermaLink='false'>"+p.toString()+"-"+(i/2).toString()+"</guid>\n<link>"+rssURL;
			if (!nondownloadabletypes.includes(pages[p][i].substr(pages[p][i].lastIndexOf(".")+1, pages[p][i].length))) {
				RSSstr += "assets/"+replaceWord(pages[p][i], " ", "%20");
			} else {
				RSSstr +="?page="+(p+1).toString();
			}
			RSSstr += "</link>\n<description>"+pages[p][i+1]+"</description>\n<pubDate>"+day+", "+pubdate+"</pubDate>\n</item>\n";
		}
	}
	console.log(RSSstr+"</channel>\n</rss>")
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
function init() {
	fs.readFile('objects.json',function(err, data) {
		if (!err) {
			var pages = JSON.parse(data);	
			if (args[0] != undefined) {
				switch(args[0]) {
					case "help": //list man menu
						break;
					case "edit": //e	dit an item
						break;
					case "append": //add new item
						break;
						case "new": //add new page
							pages = pages.items.unshift(new item(args[1], args[2]))	;
							fs.writeFile("objects.json", JSON.stringify(pages),function(){});
							break;
					case "serve": //start a web server on 8080 or specified port
						var PORT;
						if (args[1] != undefined && Number(args[1]) >= 1024 && Number(args[1]) <= 49151) {
							PORT = args[1];
						} else if (args[1] == undefined) {
							PORT = 8080;
						} else {
							console.log("Where?");
							break;
						}
						var os = require('os');
						var networkInterfaces = os.networkInterfaces();
						if (networkInterfaces.wlan0 != undefined) {
							console.log("Here's that server: http://"+networkInterfaces.wlan0[0].address+":"+PORT);
						} else if (networkInterfaces.eth0 != undefined) {
							console.log("Here's that server: http://"+networkInterfaces.eth0[0].address+":"+PORT);
						} else {
							console.log("Here's that server: http://localhost:"+PORT);
						}
						var http = require('http');
						var server = http.createServer(function (req, res) {
						var filePath = req.url.replaceAll(/%20/g," ");
						console.log(filePath);
						if (filePath == '/')
							filePath = '/index.html';
						filePath = __dirname+filePath;
						var extname = path.extname(filePath);
						var matched = contentTypes[contentExts.indexOf(	extname.substring(1))];
						console.log(matched);	
						fs.exists(filePath, function(exists) {
							if (exists) {
								fs.readFile(filePath, function(error, content) {
									if (error) {
										res.writeHead(500);
										res.end();
									} else {                   
										res.writeHead(200, { 'Content-Type': matched });
										res.end(content, 'utf-8');                  
									}
  							});
    					}
    					});});
							/*if (req.url === "/") {
								fs.readFile("./index.html", "UTF-8", function(err, html) {
									res.writeHead(200, {"Content-Type": "text/html"});
									res.end(html);
								});
							} else {
								var matched = "false";
								for (var i = 0; i < contentExts.length; i++) {
									if (req.url.match("\."+contentExts[i]+"	$")) {
										matched = contentTypes[i];
										console.log(matched);	
									}
								}
								if (matched != "false") {
										var fileStream = fs.createReadStream("./", "UTF-8");
										res.writeHead(200, {"Content-Type": matched	});
										fileStream.pipe(res);
								} else {
										res.writeHead(404, {"Content-Type": "text/html"});
										res.end("No Page Found");
								}
							}
						});*/
						server.listen(PORT);
						rl.resume();
						rl.on('SIGINT', () => {
							console.log("Closing...");
							server.close();
							process.exit(0);
							rl.pause();
						});
						break;
					default:
						break;
				}
			} else {
				//no parameters given
			}
		} else {
			//objects.json doesn't exist
		}
	});
}
init();