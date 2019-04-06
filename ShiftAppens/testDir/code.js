"use strict";



const path = "../assets/";


(function()
{
	window.addEventListener("load", main);
}());


function main()
{
	var actPage = 1;
	var aux;
	var audio = document.getElementsByTagName('audio')[0];
	audio.play();
	var audioVol = true
	var slideShowV;
	var photo = document.getElementById('photo');
	photo.src = imgFolder +"01.jpg"
	var text = document.getElementById('text');
	text.src = txtFolder +"01.txt"

	var botoes = document.getElementsByTagName('button');
	var one = document.getElementByClass('firstBtn');
	var two = document.getElementById('backBtn');
	var three = document.getElementById('nextBtn');
	var lastB = document.getElementById('lastBtn');
	var audioB = document.getElementById('soundBtn');
	var slideB = document.getElementById('slideShowBtn');
	disableButton(firstB);
	disableButton(backB);

	document.addEventListener('keydown',function(ev){
		actPage = escListener(ev,actPage,firstB,backB,lastB,nextB,slideB,slideShowV)
	});

	var callSlideShow = function callSlideShow(){
		slideShowV = window.setInterval(function slideShow()
		{
			++actPage
			playSlide(actPage,photo,text)
		}, timeSlideShow);
	};

	for (var i = 0; i < botoes.length; i++) {
		botoes[i].addEventListener("click",buttonControler)
	}

	function buttonControler(ev)
	{
		aux = buttonListener(ev,actPage,photo,text,firstB,backB,lastB,nextB,audioVol,audioVolume,audioB,audio,slideB,callSlideShow,slideShowV)
		if (aux == true || aux == false) {
			audioVol = aux
		}
		else if (aux != undefined) {
			actPage = aux
		}
	}

}

function escListener(ev,actPage,firstB,backB,lastB,nextB,slideB,slideShowV){
	if (slideB.disabled) {
		if (ev.key == "Escape") {
			window.clearInterval(slideShowV);
			enableButton(slideB);
			if (actPage > nrFiles) {
				actPage = 1
			}
			if (actPage != nrFiles) {
				enableButton(nextB);
				enableButton(lastB);
			}
			if (actPage != 1) {
				enableButton(firstB);
				enableButton(backB);
			}
		}
		return actPage
	}
}


function playSlide(actPage,photo,text)
{
	let toWrite;

	if (actPage >= nrFiles) {
		actPage = 1;
	}
	else {
		++actPage;
	}
	if (actPage > 9) {
		toWrite = actPage.toString();
	}
	else {
		toWrite = "0".concat(actPage.toString())
	}
	photo.src = imgFolder +toWrite+".jpg"
	text.src = txtFolder +toWrite+".txt"


}

function buttonListener(ev,actPage,photo,text,firstB,backB,lastB,nextB,audioVol,audioVolume,audioB,audio,slideB,callSlideShow,slideShowV)
{
	switch (ev.currentTarget.id) {
		case "firstBtn":
			actPage =  1;
			changePage(actPage,photo,text,firstB,backB,lastB,nextB)
			return actPage
		case "backBtn":
			--actPage;
			changePage(actPage,photo,text,firstB,backB,lastB,nextB)
			return actPage
		case "nextBtn":
			++actPage;
			changePage(actPage,photo,text,firstB,backB,lastB,nextB)
			return actPage
		case "lastBtn":
			actPage =  nrFiles;
			changePage(actPage,photo,text,firstB,backB,lastB,nextB)
			return actPage
		case "slideShowBtn":
			slideControl(actPage,firstB,backB,nextB,lastB,slideB,photo,text,callSlideShow)
			return
		case "soundBtn":
			audioVol = soundControl(audioVol,audioVolume,audioB,audio)
			return audioVol
	}

}

function slideControl(actPage,firstB,backB,nextB,lastB,slideB,photo,text,callSlideShow){
	disableButton(firstB);
	disableButton(backB);
	disableButton(nextB);
	disableButton(lastB);
	disableButton(slideB);
	callSlideShow()
}


function soundControl(audioVol,audioVolume,audioB,audio){
	if (audioVol) {
		audioVol = false;
		audioB.innerHTML = '<img src="../resources/extra/soundOffBtn.png" />';
		audio.volume = mute
	}
	else {
		audioVol = true;
		audioB.innerHTML = '<img src="../resources/extra/soundOnBtn.png" />';
		audio.volume = audioVolume
	}
	return audioVol
}

function changePage(actPage,photo,text,firstB,backB,lastB,nextB){
	let toWrite;
	if (actPage > 9) {
		toWrite = actPage.toString();
	}
	else {
		toWrite = "0".concat(actPage.toString())
	}
	photo.src = imgFolder +toWrite+".jpg"
	text.src = txtFolder +toWrite+".txt"
	if (actPage == 1) {
		disableButton(firstB);
		disableButton(backB);
	}
	else {
		enableButton(firstB);
		enableButton(backB);
	}
	if (actPage == nrFiles) {
		disableButton(nextB);
		disableButton(lastB);
	}
	else {
		enableButton(nextB);
		enableButton(lastB);
	}

}
function disableButton(b)
{
	b.style.opacity = opacDisabled;
	b.style.cursor = "initial"
	b.disabled  = true;
}
function enableButton(b)
{
	b.disabled  = false;
	b.style.opacity = 1;
	b.style.cursor = "pointer"
}
