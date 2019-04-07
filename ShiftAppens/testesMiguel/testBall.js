"use strict";

import { get } from "https";

var ball   = document.querySelector('.ball');
var ball1   = document.querySelector('.ball1');
var ball2   = document.querySelector('.ball2');
var ball3   = document.querySelector('.ball3');
var ball4   = document.querySelector('.ball4');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
var occupied = false;
const imgFolder = "../resources/";
const sensitivity = 1.5;
const xlimit = 3;
const waitTime = 1000;//milliseconds

(function()
{
	window.addEventListener("load", main);
}());

function main(){
  var plate = new Audio(imgFolder + "plate.wav");
  var sprite = document.getElementById('sprite');
  sprite.src = imgFolder + "6.png";
  sprite.setAttribute('style','transform:rotate(270deg)');

  var maxX = garden.clientWidth  - ball.clientWidth;
  var maxY = garden.clientHeight - ball.clientHeight;
  var xcount = 0;
  var prev_x = 0;
  var tempo = 1000;
  var objective = NaN;
  var objectiveMet = false;

  
  var intervalId = setInterval(generate_actions,tempo );

  function generate_actions(){

    if (objective != NaN){
      if(objectiveMet){
        clearInterval(intervalId);
        tempo -= 1;
        intervalId = setInterval(generate_actions,tempo );
        
        garden.style.background = "red";
      }
      else{
        garden.style.background = "blue";
       // navigator.vibrate(100);
      }
    }

    output.innerHTML = "obj: " + objectiveMet.toString() +"\n";
    plate.play();
    objective = NaN;
    objectiveMet = false;
    if(RandInt(0,100) < 40){
      
      switch(RandInt(0,4)) {
        case 0:
          output.innerHTML += "Salta";
          objective = 0;

          break;
        case 1:
          output.innerHTML += "Agacha";
          objective = 1;
          break;
        case 2:
          output.innerHTML += "Limbo";
          objective = 2;
          break;
        case 3:
          output.innerHTML += "Curva";
          objective = 3;
          break;
      }
    }
  }

  function stopWait(){
      occupied = false;
  }

  function handleMotion(event){
    var rtrn = motionHandler(event);
    if (rtrn == prev_x){
      xcount += 1;
    }
    else{
      prev_x = rtrn;
      xcount = 0;
    }
    if(xcount >= xlimit && prev_x == 1){
      if(!occupied){
        occupied = true;
        ball4.style.background = "red";
        sprite.src = imgFolder + "12.png";
        if(objective == 0){
          objectiveMet = true;
        }
        setTimeout(stopWait, waitTime);
      }
    }
    else if(xcount >= xlimit && prev_x == 0){
      if(!occupied){
        occupied = true;
        ball1.style.background = "red";
        sprite.src = imgFolder + "0.png";
        if(objective == 1){
          objectiveMet = true;
        }
        setTimeout(stopWait,waitTime);
      }
    }
    else{
      ball1.style.background = "blue";
      ball4.style.background = "blue";
    }
  }

  function handleOrientation(event){
    const gamma_min1 = 15;
    const gamma_max1 = 130;
    const beta_min1 = -180;
    const beta_max1 = -130;
    const gamma_min2 = 20;
    const gamma_max2 = 160;
    const beta_min2 = -50
    const beta_max2 = 50;

    var rtrn = orientationHandler(event);
    var beta = rtrn[0];
    var gamma = rtrn[1];
    
    ball.style.top =   (50 + gamma) + "px";
    
    if(!occupied){
      if(gamma <gamma_max1 && gamma > gamma_min1 && ((beta < beta_max1 && beta > beta_min1) || (beta < -1*beta_min1 && beta > -1*beta_max1) )){
        n = getInterval(gamma_min1,gamma_max1,gamma);
        n = 16-n;
        ball2.style.background = "green";
        sprite.src = imgFolder + n.toString(10) + ".png";
        if(objective == 3){
          objectiveMet = true;
        }

      }
      else if(gamma  > gamma_min2 && gamma <gamma_max2 && beta < beta_max2 && beta > beta_min2){
        n = getInterval(gamma_min2,gamma_max2,gamma);
        n = 20-n;
        ball3.style.background ="red";
        sprite.src = imgFolder + n.toString(10)+".png";
        if(objective == 2){
          objectiveMet = true;
        }

      }else{
        ball2.style.background = "blue";
        ball3.style.background = "blue";
        sprite.src = imgFolder + "6.png";
      }
    }
  }
  window.addEventListener('deviceorientation', handleOrientation);
  window.addEventListener('devicemotion', handleMotion);
}

function orientationHandler(event) {
    
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]
  
  if (y < -90) { y = -90};
  y += 90;
  //output.innerHTML  = "beta : " + x + "\n";
  //output.innerHTML  +="gamma: " + y + "\n";
  return[x,y] ;
}
function motionHandler(event){
  var x = event.acceleration.x;
  if(x<-1*sensitivity)
  {
    return 0;
  }
  if(x>sensitivity ){
    return 1;
  }
}

function RandInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function getInterval(min, max , val){
  var h = (max - min)/4;
  var aux = Math.round(val - min);
  var n =Math.floor( aux / h); 
  return n;
}

