"use strict";
var ball   = document.querySelector('.ball');
var ball1   = document.querySelector('.ball1');
var ball2   = document.querySelector('.ball2');
var ball3   = document.querySelector('.ball3');
var ball4   = document.querySelector('.ball4');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
const sensitivity = 3;




(function()
{
	window.addEventListener("load", main);
}());

function orientationHandler(event) {
    
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]
  var z = event.alpha;
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
  return[x,y];
  
}
function motionHandler(event){
  var x = event.acceleration.x;
  var y = event.acceleration.y;
  var z = event.acceleration.z;
  output.innerHTML = "x: " + x + "\n";
  output.innerHTML += "y: " + y + "\n";
  output.innerHTML += "z: " + z + "\n";
  if(x<-1*sensitivity )
  {
    ball4.style.background = "red"
  }
  else{
    ball4.style.background = "blue";
  }
  if(x>sensitivity ){
    ball1.style.background = "red";
  }else{
    ball1.style.background = "blue";
  }
  
  if(y> sensitivity ){
    ball2.style.background = "red";
  }else{
    ball2.style.background = "blue";
  }
  if(z > sensitivity ){
    ball3.style.background = "red";
  }else{
    ball3.style.background = "blue";
  }
    
  

}
function main(){
  var maxX = garden.clientWidth  - ball.clientWidth;
  var maxY = garden.clientHeight - ball.clientHeight;

  
  function handleMotion(event){
    motionHandler(event);
  }

  function handleOrientation(event){
    var rtrn = orientationHandler(event);
    ball.style.top  = (rtrn[0]*maxX/180 - 10) + "px";
    ball.style.left = (rtrn[1]*maxY/180 - 10) + "px";
  }
  window.addEventListener('deviceorientation', handleOrientation);
  window.addEventListener('devicemotion', handleMotion);


}

