var fs = require('fs');
var content = JSON.parse(fs.read(fs.absolute('destinos.json')));
var origem = content[0].origem;
var destinos = content[0].destinos;
var service_url = content[0].service_url;

var menorPreco = 350;
var daysRange = [7, 10];
var actualPrice;
var actualDate;
var actualDateBack;
var allData = {};

//var dateRange = [getDateLater(printDate(new Date()), 10),'30/09/2015'];
var dateRange = ['2015-11-05','2015-12-25'];
console.log(destinos);
console.log(dateRange);

function printDate(date){
	return date.getFullYear() + '-' + (date.getMonth()*1 + 1) + '-' + date.getDate()
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDateArray(range){
	var piecesMin = range[0].split('-');
	var piecesMax = range[1].split('-');
	var dateMin = new Date(piecesMin[0], piecesMin[1]*1 - 1, piecesMin[2]);
	var dateMax = new Date(piecesMax[0], piecesMax[1]*1 - 1, piecesMax[2]);
	
	var dateArray = [];
	
	dateArray.push(printDate(dateMin));
	
	while (dateMax > dateMin){
		dateMin.setDate(dateMin.getDate() + 1);
		dateArray.push(printDate(dateMin));
	}
	return dateArray;
}


function convertDateFormat(td){
	var pieces = td.split('/');
	return pieces[2]+'-'+pieces[1]+'-'+pieces[0];
}

function getDateLater(td, days){
	var pieces = td.split('-');
	var date = new Date(pieces[0]*1, pieces[1]*1-1, pieces[2]*1);
	date.setDate(date.getDate()*1 + days);	
	return  printDate(date);
}

function getNextWeekend(td){
	var pieces = td.split('-');
	var date = new Date(pieces[0]*1, pieces[1]*1-1, pieces[2]*1);
	date.setDate(date.getDate() + (5 - date.getDay()));
	return  printDate(date);
}


var dates = generateDateArray(dateRange);

function generateURL(dataIda, dataVolta, origem, destino){
<<<<<<< HEAD
	console.log("");console.log("");
	console.log(dataIda);
	console.log(dataVolta);
	console.log("****DESTINO: "+destino);
	return 'http://www.decolar.com/shop/flights/results/roundtrip/' + origem + 
	'/' + destino + '/'+ dataIda +'/'+ dataVolta +'/2/0/0'
}

function getNewURL(){
	actualDestin = destinos[getRandomInt(0,destinos.length-1)];
	if (["Belo Horizonte"].indexOf(actualDestin) != -1){
		actualDate = dates[getRandomInt(0,dates.length-1)];
		actualDate = getNextWeekend(actualDate);
		actualDateBack = getDateLater(actualDate,2);
	}else{
		actualDate = dates[getRandomInt(0,dates.length-1)];
		actualDateBack = getDateLater(actualDate,getRandomInt(daysRange[0],daysRange[1]));
	}

	return generateURL(actualDate,actualDateBack, origem, actualDestin);
}


var page = require('webpage').create();

page.onResourceReceived = function(response) {
	if (response.contentType == "application/json" && response.url.search('data/searchesCount') != -1){
		console.log(response.url);
		var prices = page.evaluate(function(){
			var price = $('.fare-detail-base .price-amount').first().text();
			return price;
		});

		if (prices*1 > 0){
			console.log(prices);
			openPage();

		}
  	}
};

function openPage(){
	page.open(getNewURL(), function(status) {
		console.log(status);
	});
}

openPage();
