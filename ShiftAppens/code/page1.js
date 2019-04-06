"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{	
	var elAnim = document.getElementById("animLast");
	var video = document.getElementsByTagName("video")[0];
	var mainWindow;

	var mHandler = function(ev)
	{
		mainWindow = messageHandler(ev);
		//console.log(mainWindow === parent.document.getElementsById(window.name));
	}

	var animLAEHandler = function(ev)
	{
		animLastAnimEndHandler(ev, video);
	}

	var vidEndHandler = function(ev)
	{
		videoEndHandler(ev, mainWindow);
	}

	window.addEventListener("message", mHandler);
	video.addEventListener("play", videoPlayHandler);
	video.addEventListener("ended", vidEndHandler);

	elAnim.addEventListener("animationend", animLAEHandler);
}

function animLastAnimEndHandler(ev, video)
{
	var el = ev.target;
	el.removeEventListener("animationend", animLastAnimEndHandler);

	//remove animation elements from the main tag
	el.parentNode.removeChild(el.parentNode.children[0]);
	el.parentNode.removeChild(el.parentNode.children[0]);  //nota: não é 1 porque o que era 1 passou a 0 depois da eliminação do anterior

	video.style.display = "block";
	video.muted = true;
	video.play();
	video.muted = false;
}

function videoPlayHandler(ev)
{
	var video = ev.currentTarget;
	video.play();
}

function videoEndHandler(ev, mainWindow)
{
	console.log("Video ended");
	//page transition
	mainWindow.postMessage('', '*');
}	

function messageHandler(ev)
{	
	return ev.source
}