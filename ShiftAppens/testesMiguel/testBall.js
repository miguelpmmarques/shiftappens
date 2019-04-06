"use strict";
var ball   = document.querySelector('.ball');
var ball1   = document.querySelector('.ball1');
var ball2   = document.querySelector('.ball2');
var ball3   = document.querySelector('.ball3');
var ball4   = document.querySelector('.ball4');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
const sensitivity = 3;
const xlimit = 3;



(function()
{
	window.addEventListener("load", main);
}());

function orientationHandler(event) {
    
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]
  var z = event.alpha;
  output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML  +="gamma: " + y + "\n";
  output.innerHTML +="alpha: " + z + "\n";

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
  //return[x,y];
  return y;
}
function motionHandler(event){
  var x = event.acceleration.x;
  var y = event.acceleration.y;
  var z = event.acceleration.z;
  //output.innerHTML = "x: " + x + "\n";
  //output.innerHTML += "y: " + y + "\n";
  //output.innerHTML += "z: " + z + "\n";
  if(x<-1*sensitivity )
  {

    return 0;
  }
 
  if(x>sensitivity ){
    ball1.style.background = "red";
  }else{
    ball1.style.background = "blue";
  }
  
  if(y> sensitivity ){
    ball2.style.background = "red";
    return 1;
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
  var xcount = 0;
  var prev_x = 0;
  
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
      ball4.style.background = "red";
    }
    else if(xcount >= xlimit && prev_x == 0){
      ball4.style.background = "green";
    }
    else{
      ball4.style.background = "blue";
    }
  }

  function handleOrientation(event){
    var gamma = orientationHandler(event);
    ball.style.top =   garden.style.height/2  + gamma;
    //ball.style.top  = (rtrn[0]*maxX/180 - 10) + "px";
    //ball.style.left = (rtrn[1]*maxY/180 - 10) + "px";
  }
  window.addEventListener('deviceorientation', handleOrientation);
  window.addEventListener('devicemotion', handleMotion);


}

