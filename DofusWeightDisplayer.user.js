// ==UserScript==
//
// @name           Dofus Weight Displayer
// @description    Shows items' total bonus weight on the official Encyclopedia (FR)
// @author         Protectator 
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @version        1.0
// @include        http://www.dofus.com/fr/mmorpg/encyclopedie/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
//
// ==/UserScript==

$(function(){
	var poids = 
	{
		'Vitalité' : 0.25,
		'Force' : 1,
		'Intelligence' : 1,
		'Chance' : 1,
		'Agilité' : 1,
		'Sagesse' : 3,
		'Initiative' : 0.1,
		'PA' : 100,
		'PM' : 90,
		'PO' : 51,
		'Prospection' : 3,
		'Coups Critiques' : 30,
		'Invocations' : 30,
		'Soins' : 20,
		'dommages' : 30,
		'Résistance Neutre' : 2,
		'Résistance Terre' : 2,
		'Résistance Feu' : 2,
		'Résistance Air' : 2,
		'Résistance Eau' : 2,
		'Résistance Poussée' : 2,
		'Résistance Critiques' : 2,
		'% Résistance Neutre' : 6,
		'% Résistance Terre' : 6,
		'% Résistance Feu' : 6,
		'% Résistance Air' : 6,
		'% Résistance Eau' : 6,
		'Esquive PA' : 7,
		'Esquive PM' : 7,
		'Fuite' : 4,
		'Retrait PA' : 7,
		'Retrait PM' : 7,
		'Tacle' : 4,
		'Dommages' : 20,
		'Dommages Neutre' : 5,
		'Dommages Terre' : 5,
		'Dommages Feu' : 5,
		'Dommages Air' : 5,
		'Dommages Eau' : 5,
		'Dommages Poussée' : 5,
		'Dommages Pièges' : 15,
		'Dommages Critiques' : 5,
		'Puissance' : 2,
		'Puissance (pièges)' : 2,
		'Pods' : 0.4
	};

	var table = findEffectsTable();
	var effects = parseEffectsTable(table);

	var sommeMin = 0;
	var sommeMax = 0;

	$.each(effects, function(index, value) {
		console.log(value.stat + "|" + value.min + "|" + value.max);
		console.log("Poids : " + poids[value.stat]);
		sommeMin += value.min * poids[value.stat];
		sommeMax += value.max * poids[value.stat];
	});

	table.after("<p>Poids : " + sommeMin + " à " + sommeMax + "</p>");

	console.log("poids : ");
	console.log(sommeMin);
	console.log(" á ");
	console.log(sommeMax);
});

function findEffectsTable() {
	return $(".ak-container.ak-content-list.ak-displaymode-col");
}

function parseEffectsTable(table) {
	var lines = table.find(".ak-title");
	var effects = [];
	$.each(lines, function (index, value) {
		var text = $(value).text();
		var bonus = parseBonus(text);
		effects.push(bonus);
	});
	return effects;
}

function parseBonus(text){
	var result = {};
	var positive = true;
	if (text.indexOf("-") >= 0) {
		positive = false;
	}
	var regexpType = /\d+(?: à \d+)* ([\w\s%áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ()]+[\w%áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ()])/g;
	var regexpBonus = /(\d+)(?:(?: à )(\d+)*)* /;
	var type = regexpType.exec(text)[1];
	var matches = regexpBonus.exec(text);
	var first = matches[1];
	console.log(matches);
	var second = first;
	if (!isNaN(matches[2])) {
		second = matches[2];
	}
	if (positive) {
		var minimum = parseInt(first);
		var maximum = parseInt(second);
	} else {
		var maximum = -parseInt(first);
		var minimum = -parseInt(second);
	}

	result.min = minimum;
	result.max = maximum;
	result.stat = type;
	return result;
}