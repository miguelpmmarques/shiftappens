"use strict";
var ball   = document.querySelector('.ball');
var ball1   = document.querySelector('.ball1');
var ball2   = document.querySelector('.ball2');
var ball3   = document.querySelector('.ball3');
var ball4   = document.querySelector('.ball4');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
const sensitivity = 3;

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

var x;  // In degree in the range [-180,180]
var y;
var z;
var x1;
var y1;
var z1;


(function()
{
	window.addEventListener("load", main);
}());

function handleOrientation(event) {
    
  x = event.beta;  // In degree in the range [-180,180]
  y = event.gamma; // In degree in the range [-90,90]
  z = event.alpha;
  //output.innerHTML  = "beta : " + x + "\n";
  //output.innerHTML  +="gamma: " + y + "\n";
  //output.innerHTML +="alpha: " + z + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  // To make computation easier we shift the range of
  // x and y to [0,180]
  x += 90;
  y += 90;
  z +=90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";
}
function handleMotion(event){
  x1 = event.acceleration.x;
  y1 = event.acceleration.y;
  z1 = event.acceleration.z;
  output.innerHTML = "x: " + x1 + "\n";
  output.innerHTML += "y: " + y1 + "\n";
  output.innerHTML += "z: " + z1 + "\n";
  if(x1<-1*sensitivity )
  {
    ball4.style.background = "red"
  }
  else{
    ball4.style.background = "blue";
  }
  if(x1>sensitivity ){
    ball1.style.background = "red";
  }else{
    ball1.style.background = "blue";
  }
  
  if(y1> sensitivity ){
    ball2.style.background = "red";
  }else{
    ball2.style.background = "blue";
  }
  if(z1 > sensitivity ){
    ball3.style.background = "red";
  }else{
    ball3.style.background = "blue";
  }
    

  

}
function main(){
  window.addEventListener('deviceorientation', handleOrientation);
  window.addEventListener('devicemotion', handleMotion);
}

