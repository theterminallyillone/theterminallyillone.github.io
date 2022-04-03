var fs = require("fs");
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.pause();
var pages;
var args = process.argv.slice(2);
var path = require("path");
var stamp = (new Date).toUTCString();
fs.readFile('globals.json',function(err, data) {
	if (!err) {
		var vars = JSON.parse(data);
		var contentExts = ["js","xml","json","pdf","zip","mp3","jpeg","jpg","gif","svg","png","css","html","txt","mp4","wav"];
		var contentTypes = ["application/javascript","text/xml","application/json","application/pdf","application/zip","audio/mpeg","image/jpeg","image/jpeg","image/gif","image/svg+xml","image/png","text/css","text/html","text/plain","video/mp4","audio/x-wav"];
		var item = function(filename, text) {
			this.filename = filename;
			filename = filename.split("_");
			var datestring = filename[3].toString();
			datestring = datestring.split("-");
			this.title = filename[0];
			this.city = filename[1]+" "+filename[2];
			this.date = datestring[0]+" "+vars.globals.months[datestring[1]-1]+" "+datestring[2];
			this.extension = filename[4].substr(filename[4].lastIndexOf(".")+1,filename[4].length);
			this.text = text;
			this.tags  = [];
			this.stamp = stamp;
			this.downloadable = true;
			if (vars.globals.nondownloadabletypes.includes(this.extension)) {
				this.downloadable = false;
			}
			for (var i = 0; i < pages.tags.length; i++) {
				if (this.text.split("#"+pages.tags[i]).length > 1) {
					this.tags.push(pages.tags[i]);
					this.text = this.text.replace("#"+vars.globals.tags[i], "");
				}
			}
			if (this.tags.length == 0) {
				this.tags.push("ALL");
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
			if (pages.length < vars.globals.numRSSPages) {
				vars.globals.numRSSPages = pages.length;
			}
			var RSSstr = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n<channel>\n<atom:link href=\"https://theterminallyillone.github.io/feed.xml\" rel=\"self\" type=\"application/rss+xml\"/>\n<title>UN RÊVE</title>\n<link>"+vars.globals.rssURL+"</link>\n<description>RSS feed</description>\n";
			for (var p = 0; p < vars.globals.numRSSPages; p++) {
				for (var i = 0; i < pages.items[p].length; i++) {
					RSSstr+="<item>\n<title>"+pages.items[p][i].filename+"</title>\n<guid isPermaLink='false'>"+p.toString()+"-"+i.toString()+"</guid>\n<link>"+vars.globals.rssURL;
					if (!vars.globals.nondownloadabletypes.includes(pages.items[p][i].filename.substr(pages.items[p][i].filename.lastIndexOf(".")+1, pages.items[p][i].filename.length))) {
						RSSstr += "assets/"+replaceWord(pages.items[p][i].filename, " ", "%20");
					} else {
						RSSstr +="?page="+(p+1).toString();
					}
					RSSstr += "</link>\n<description>"+pages.items[p][i].text+"</description>\n<pubDate>"+pages.items[p][i].stamp+"</pubDate>\n</item>\n";
				}
			}	
			fs.writeFile("rss.xml", RSSstr+"</channel>\n</rss>",function(){});
		}
		function closeFiles() {
			fs.writeFile("objects.json", JSON.stringify(pages),function(){});
			genrss(pages);
		}
		function init() {
			fs.readFile('objects.json',function(err, data) {
				if (!err) {
					pages = JSON.parse(data);	
					if (args[0] != undefined) {
						switch(args[0]) {
							case "help": //list man menu
								break;
							case "edit": //e	dit an item
								break;
							case "append": //add new item
								pages.items[0].unshift(new item(args[1], args[2]))	;
									closeFiles();
									break;
								case "new": //add new page
									pages.items.unshift([new item(args[1], args[2])])	;
									closeFiles();
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
								server.listen(PORT);
								rl.resume();
								rl.on('SIGINT', () => {
									console.log("Closing...");
									server.close();
									process.exit(0);
									rl.pause();
								});
								break;
							case "delentry": //deletes an entry
								break;
							case "delpg": //deletes a page
								break;
							case "read": //reads a page
									console.log(pages.items);
								break;
							default:
								console.log("That sounded like gibberish.")
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
	}
});