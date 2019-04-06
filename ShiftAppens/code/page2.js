"use strict";
const opacDisabled = 0.3;  //transparência para botões desactivados
const imgFolder = "../resources/image/";
const txtFolder = "../resources/text/";
const audioVolume = 1;

(function()
{
	window.addEventListener("load", main);
}());


function main()
{
	var currentFrame=1;
	var lastFrame = 1;
	var tID;
	
	//img and text sections
	var txt = document.getElementById("text");
	var img = document.getElementById("photo");

	//first screen
	img.src = imgFolder.concat("0"+currentFrame+".jpg");
	txt.src = txtFolder.concat("0"+currentFrame+".txt");

	//audio object
	var audio = document.getElementsByTagName("audio")[0];
	audio.volume = audioVolume;

	//get the buttons
	var firstBtn = document.getElementById("firstBtn");
	var backBtn = document.getElementById("backBtn");
	var nextBtn = document.getElementById("nextBtn");
	var lastBtn = document.getElementById("lastBtn");
	var slideShowBtn = document.getElementById("slideShowBtn");
	var soundBtn = document.getElementById("soundBtn");
	
	//arrays para argumentos do slideshow
	var buttons = new Array(firstBtn, backBtn, nextBtn, lastBtn);

	//functions called before the handlers to provide arguments
	
	//general click handler
	var btnCH = function(ev)
	{
		var returnValues = btnClickHandler(ev, currentFrame, lastFrame, buttons, btnCH);
		currentFrame = returnValues[0];
		lastFrame = returnValues[1];
		changeImage(currentFrame, img, txt);
	}

	//disable button needs the click function
	var btnDis = function(ev)
	{
		buttonDisable(ev, btnCH);
	}

	var slideshowValue = function()
	{
		currentFrame = slideshow(currentFrame, img, txt);
	}

	//needs all the buttons
	var enableSH = function(ev)
	{
		var results = enableSlideShow(ev, buttons, btnCH, img, txt, currentFrame, enableSH, slideshowValue);
		currentFrame = results[0];
		tID = results[1];
	}

	//needs all the buttons
	var disSH = function(ev)
	{
		disableSlideShow(ev, buttons, btnCH, enableSH, currentFrame, tID);
	}

	var ppAudio = function(ev)
	{
		playPauseAudio(ev, audio);
	}
	
	//adding listener to all the buttons
	nextBtn.addEventListener("click", btnCH);
	lastBtn.addEventListener("click", btnCH);

	backBtn.addEventListener("disable", btnDis);
	firstBtn.addEventListener("disable", btnDis);
	nextBtn.addEventListener("disable", btnDis);
	lastBtn.addEventListener("disable", btnDis);

	soundBtn.addEventListener("click", ppAudio);

	window.document.onkeydown = function(evt) {
		if (evt.keyCode == 27 && slideShowBtn.style.opacity == opacDisabled) {
			var evp = new Event("disable");
			slideShowBtn.dispatchEvent(evp);
		}	
	};
	slideShowBtn.addEventListener("click", enableSH);
	slideShowBtn.addEventListener("disable", disSH);

	//audio event for chrome
	audio.addEventListener("canplaythrough", audioCanPlayHandler, false); 

	//last 2 buttons start disabled
	backBtn.style.opacity = opacDisabled;
	firstBtn.style.opacity = opacDisabled;
}

function btnClickHandler(ev, currentFrame, lastFrame, buttons, btnCH)
{
	//var buttons = new Array(firstBtn, backBtn, nextBtn, lastBtn);

	var btn = ev.currentTarget;

	//saving current slide
	var temp = currentFrame;

	switch(btn.id)
	{
		case "nextBtn":
			currentFrame++;
			//deactive next and last button
			if (currentFrame == 16)
			{
				buttonDisable(btn, btnCH);
				buttonDisable(buttons[3], btnCH);
			}
			break;
			
		case "backBtn":
			currentFrame--;		
			//deactive back and first button
			if (currentFrame == 1)
			{
				buttonDisable(buttons[0], btnCH);
				buttonDisable(btn, btnCH);
			}
			break;
		
		case "firstBtn":
			currentFrame = 1;
			//deactive back and first button
			buttonDisable(buttons[1], btnCH);
			buttonDisable(btn, btnCH);
			break;
		
		case "lastBtn":
			currentFrame = 16;
			//deactivate next and last button
			buttonDisable(buttons[2], btnCH);
			buttonDisable(btn, btnCH);
			break;
	}

	//reactivate buttons
	//activate back and first
	if (temp == 1 && currentFrame > 1)
	{
		buttons[0].addEventListener("click", btnCH);
		buttons[0].style.opacity = 1;
		buttons[1].addEventListener("click", btnCH);
		buttons[1].style.opacity = 10
	}
	//activate next and last
	else if(temp == 16 && currentFrame<16)
	{
		buttons[2].addEventListener("click", btnCH);
		buttons[2].style.opacity = 1;
		buttons[3].addEventListener("click", btnCH);
		buttons[3].style.opacity = 1;
	}

	lastFrame = temp;
	return [currentFrame, lastFrame]; 
}

//enables the slideshow
function enableSlideShow(ev, buttons, btnCH, img, txt, currentFrame, enableSH, slideshowValue)
{
	var slideShowBtn = ev.currentTarget;
	slideShowBtn.style.opacity = opacDisabled;
	slideShowBtn.removeEventListener("click", enableSH);

	buttons.forEach(button => {
		buttonDisable(button, btnCH);
	});

	var tID = setInterval(slideshowValue, 2000, img, txt);
	return [currentFrame, tID];
}

//disables de slideshow
function disableSlideShow(ev, buttons, btnCH, enableSH, currentFrame, tID)
{
	//	var buttons = new Array(firstBtn, backBtn, nextBtn, lastBtn);
	
	var slideShowBtn = ev.currentTarget;
	slideShowBtn.style.opacity = 1;
	slideShowBtn.addEventListener("click", enableSH);

	//unlock all
	if (currentFrame>1 && currentFrame<16)
		buttons.forEach(button => {
			button.addEventListener("click", btnCH);
			button.style.opacity = 1;
		});
	
	//unlock next and last
	else if(currentFrame == 1)
	{
		buttons[2].addEventListener("click", btnCH);
		buttons[2].style.opacity = 1;
		buttons[3].addEventListener("click", btnCH);
		buttons[3].style.opacity = 1;
	}
	
	//unlock back and first
	else
	{
		buttons[0].addEventListener("click", btnCH);
		buttons[0].style.opacity = 1;
		buttons[1].addEventListener("click", btnCH);
		buttons[1].style.opacity = 10
	}
	clearInterval(tID);
}

//plays or pauses the audio depending on the current state
function playPauseAudio(ev, audio)
{	
	var btn = ev.currentTarget;
	//audio is playing
	if (audio.duration > 0 && !audio.paused){
		audio.pause();
		btn.getElementsByTagName("img")[0].src = "../resources/extra/soundOffBtn.png";
	}
		
	//audio is not playing
	else{
		audio.play();
		btn.getElementsByTagName("img")[0].src = "../resources/extra/soundOnBtn.png";
	}
}

//disables button
function buttonDisable(btn, btnCH)
{
	btn.removeEventListener("click", btnCH);
	btn.style.opacity = opacDisabled;
}

//re-enables button
function buttonEnable(ev, btnCH)
{
	var btn = ev.currentTarget;
	btn.addEventListener("click", btnCH);
	btn.style.opacity = 1;
}

//funçao do stor
function audioCanPlayHandler(ev)
{
	var audio = ev.target;
	audio.addEventListener("playing", audioPlayingHandler);
	audio.play().catch(function(){
		console.log("Audio Exception");
	});
}

//literalmente nao faz nada
function audioPlayingHandler(ev)
{
	var audio = ev.target;
	audio.controls = false;
	console.log("Playing");
}

//changes images
function changeImage(number, img, txt)
{
	if (number < 10)
	{
		img.src = imgFolder.concat("0"+number+".jpg");
		txt.src = txtFolder.concat("0"+number+".txt");
	}
	else
	{
		img.src = imgFolder.concat(number+".jpg");
		txt.src = txtFolder.concat(number+".txt");
	}
}

function slideshow(currentFrame, img, txt)
{
	if (currentFrame != 16)
		currentFrame++;
	else
		currentFrame = 1;
	changeImage(currentFrame, img, txt);
	return currentFrame;
}