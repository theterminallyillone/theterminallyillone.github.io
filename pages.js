/*
	UN RÊVE, by Terminal Illness
		---JSON---
			
	***REMEMBER TO DATE ENTRIES AS FOLLOWS***
		TITLE_CITY_STATE_YEAR-MONTH-DAY_.mp4
		EXAMPLE_Indianapolis_IN_2021-11-05_.mp4
*/
var pages = [
	[
		"Welcome!_Greenwood_IN_2021-12-16_.msg","Pull up a chair, and join us!","Opiate_Greenwood_IN_2021-12-27_.pdf","I suppose the Kratom was kicking in...#poetry","Clouds_Coldwater_MI_2021-11-27_.pdf","A creative endeavor under the influence of Mary Jane.#poetry","Bedtime_Greenwood_IN_2021-09-21_.pdf","This was written during a 4 hour drive, I was in the mood.#poetry","Sunken_Greenwood_IN_2021-09-11_.pdf","Sad boi mood here.#poetry","E86F9A_Greenwood_IN_2021-07-20_.pdf","I was inspired by the color pink, if you couldn't tell.#poetry","Little Moon_Greenwood_IN_2021-07-14_.pdf","This poem was written for my little girl.#poetry"
	]
];
var pagetitles = [
	"The Beginning"
];
var tags = ["ALL", "poetry"];
var tagcolors = ["#000000","#DEEB34"];
var timechange = 2000;
var buttoncolors = ["#c23030", "#e67627", "#c8d121", "#32a858", "#4287f5", "#a138a8"];
var nondownloadabletypes = ["msg"];
var minWinWidth = 600;
var tabtitle = "un rêve";
var title = "UN RÊVE";
var DOB = "DOB: 2021-12-16"
var contacts = ["bumsemails@gmail.com","theterminallyillone@gmail.com","stouchelle@gmail.com"];
var months = ["January", "February", "March", "April", "May", "June", "July","August","Septmeber","October","November","December"];
//BTC WALLET ADDRESS
var walletaddress = "17y98UZzT6fAgfGyT162Dr4KgKYY3Uzne4";
//THIS IS THE URL FROM WHICH TO CHECK THE BTC WALLET BALANCE - USES HTTP
var walletContentsURL = "https://api.blockcypher.com/v1/btc/main/addrs/"+walletaddress+"/balance?token=93d56ea4c3ce432a862151036c714752";
//THE FOLLOWING IS THE RAW SVG CODE FOR THE BTC ADDRESS OBTAIN THIS FROM BLOCKCHAIN.INFO
//this keeps people from copying the image directly
var svgcodeinner = "<svg shape-rendering='crispEdges' height='200' width='200' viewBox='0 0 29 29' class='qrcode'><path fill='";
//these are seperated to change the color
var svgcodeouter="' d='M0,0 h29v29H0z'></path><path fill='#FFFFFF' d='M0 0h7v1H0zM8 0h3v1H8zM12 0h2v1H12zM15 0h1v1H15zM18 0h2v1H18zM22,0 h7v1H22zM0 1h1v1H0zM6 1h1v1H6zM8 1h3v1H8zM14 1h1v1H14zM16 1h2v1H16zM19 1h2v1H19zM22 1h1v1H22zM28,1 h1v1H28zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM8 2h1v1H8zM10 2h2v1H10zM14 2h7v1H14zM22 2h1v1H22zM24 2h3v1H24zM28,2 h1v1H28zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM8 3h2v1H8zM11 3h1v1H11zM14 3h1v1H14zM18 3h1v1H18zM22 3h1v1H22zM24 3h3v1H24zM28,3 h1v1H28zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM13 4h1v1H13zM16 4h2v1H16zM22 4h1v1H22zM24 4h3v1H24zM28,4 h1v1H28zM0 5h1v1H0zM6 5h1v1H6zM8 5h1v1H8zM11 5h3v1H11zM16 5h1v1H16zM18 5h2v1H18zM22 5h1v1H22zM28,5 h1v1H28zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22,6 h7v1H22zM9 7h1v1H9zM12 7h1v1H12zM14 7h7v1H14zM0 8h2v1H0zM4 8h3v1H4zM11 8h1v1H11zM15 8h2v1H15zM19 8h2v1H19zM23 8h1v1H23zM25,8 h4v1H25zM0 9h2v1H0zM3 9h1v1H3zM9 9h2v1H9zM12 9h1v1H12zM16 9h1v1H16zM21 9h2v1H21zM24 9h3v1H24zM28,9 h1v1H28zM3 10h2v1H3zM6 10h2v1H6zM11 10h3v1H11zM15 10h1v1H15zM17 10h2v1H17zM20 10h2v1H20zM25 10h2v1H25zM28,10 h1v1H28zM2 11h2v1H2zM5 11h1v1H5zM7 11h2v1H7zM10 11h2v1H10zM16 11h2v1H16zM21 11h5v1H21zM27,11 h2v1H27zM0 12h1v1H0zM2 12h3v1H2zM6 12h1v1H6zM8 12h1v1H8zM10 12h1v1H10zM12 12h1v1H12zM15 12h1v1H15zM17 12h5v1H17zM23 12h1v1H23zM25 12h1v1H25zM27 12h1v1H27zM0 13h4v1H0zM7 13h3v1H7zM14 13h1v1H14zM16 13h1v1H16zM19 13h1v1H19zM21 13h1v1H21zM24 13h1v1H24zM27,13 h2v1H27zM0 14h2v1H0zM3 14h4v1H3zM13 14h3v1H13zM17 14h1v1H17zM22 14h1v1H22zM25 14h2v1H25zM28,14 h1v1H28zM1 15h2v1H1zM4 15h1v1H4zM7 15h1v1H7zM12 15h1v1H12zM17 15h4v1H17zM22 15h4v1H22zM28,15 h1v1H28zM0 16h1v1H0zM2 16h1v1H2zM4 16h6v1H4zM11 16h1v1H11zM17 16h5v1H17zM23 16h1v1H23zM25 16h1v1H25zM28,16 h1v1H28zM0 17h1v1H0zM2 17h2v1H2zM9 17h2v1H9zM12 17h5v1H12zM21 17h1v1H21zM23 17h3v1H23zM28,17 h1v1H28zM2 18h1v1H2zM6 18h1v1H6zM8 18h1v1H8zM11 18h2v1H11zM14 18h2v1H14zM18 18h1v1H18zM21 18h1v1H21zM24 18h2v1H24zM28,18 h1v1H28zM3 19h1v1H3zM5 19h1v1H5zM7 19h1v1H7zM10 19h2v1H10zM14 19h1v1H14zM16 19h2v1H16zM19 19h3v1H19zM25 19h1v1H25zM27 19h1v1H27zM0 20h3v1H0zM4 20h3v1H4zM9 20h1v1H9zM12 20h1v1H12zM14 20h2v1H14zM17 20h9v1H17zM8 21h3v1H8zM13 21h1v1H13zM16 21h1v1H16zM20 21h1v1H20zM24 21h1v1H24zM28,21 h1v1H28zM0 22h7v1H0zM9 22h2v1H9zM14 22h3v1H14zM19 22h2v1H19zM22 22h1v1H22zM24 22h1v1H24zM26 22h1v1H26zM28,22 h1v1H28zM0 23h1v1H0zM6 23h1v1H6zM8 23h3v1H8zM12 23h1v1H12zM15 23h1v1H15zM17 23h1v1H17zM20 23h1v1H20zM24 23h1v1H24zM27 23h1v1H27zM0 24h1v1H0zM2 24h3v1H2zM6 24h1v1H6zM8 24h1v1H8zM10 24h2v1H10zM13 24h2v1H13zM16 24h1v1H16zM19 24h6v1H19zM28,24 h1v1H28zM0 25h1v1H0zM2 25h3v1H2zM6 25h1v1H6zM9 25h2v1H9zM12 25h1v1H12zM14 25h2v1H14zM18 25h4v1H18zM23 25h1v1H23zM25 25h1v1H25zM28,25 h1v1H28zM0 26h1v1H0zM2 26h3v1H2zM6 26h1v1H6zM9 26h11v1H9zM23 26h1v1H23zM26,26 h3v1H26zM0 27h1v1H0zM6 27h1v1H6zM8 27h4v1H8zM13 27h1v1H13zM16 27h2v1H16zM19 27h1v1H19zM21 27h1v1H21zM27,27 h2v1H27zM0 28h7v1H0zM8 28h2v1H8zM12 28h2v1H12zM16 28h2v1H16zM20 28h1v1H20zM22 28h1v1H22zM24 28h1v1H24zM27 28h1v1H27z'></path></svg>";