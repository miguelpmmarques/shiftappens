"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
	var mainWindow;
	var elAnim = document.getElementById("credits");

	var mHandler = function(ev)
	{
		mainWindow = messageHandler(ev);
	}

	var animLAEHandler = function(ev)
	{
		animLastAnimEndHandler(ev, mainWindow);
	}

	window.addEventListener("message", mHandler);
	elAnim.addEventListener("animationend", animLAEHandler);
}

function messageHandler(ev)
{	
	return ev.source
}

function animLastAnimEndHandler(ev, mainWindow){
	console.log("Credits ended");
	mainWindow.postMessage('', '*');
}