"use strict";
var ball   = document.querySelector('.ball');
var ball1   = document.querySelector('.ball1');
var ball2   = document.querySelector('.ball2');
var ball3   = document.querySelector('.ball3');
var ball4   = document.querySelector('.ball4');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
const imgFolder = "../resources/";
const sensitivity = 3;
const xlimit = 3;




(function()
{
	window.addEventListener("load", main);
}());

function orientationHandler(event) {
    
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]

  if (y < -90) { y = -90};
  y += 90;
  output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML  +="gamma: " + y + "\n";
  
  return[x,y] ;
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
    return 1;
  }
}
function main(){
  var sprite = document.getElementById('sprite');
  sprite.src = imgFolder + "6.png";
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
      if(ball1.style.background != "green"){
        ball4.style.background = "red";
       
      }
      sprite.src = imgFolder + "12.png";
      
  
    }
    else if(xcount >= xlimit && prev_x == 0){
      if(ball4.style.background != "red"){
        ball1.style.background = "green";
        
      }
      sprite.src = imgFolder + "0.png";
      
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
    const beta_max1 = -160;
    const gamma_min2 = 20;
    const gamma_max2 = 160;
    const beta_min2 = 0
    const beta_max2 = 12;

    var rtrn = orientationHandler(event);
    var beta = rtrn[0];
    var gamma = rtrn[1];
    


    ball.style.top =   (50 + gamma) + "px";
    
    if(gamma <gamma_max1 && gamma > gamma_min1 && beta < beta_max1 && beta > beta_min1){
      h = (gamma_max1 - gamma_min1)/4;
      aux = gamma - gamma_min1;
      n = Math.floor( h%aux);
      output.innerHTML = "n: " + n + "\n";


      ball2.style.background = "green";
      sprite.src = imgFolder + "13.png";
      
    }
    else if(gamma  > gamma_min2 && gamma <gamma_max2 && beta < beta_max2 && beta > beta_min2){
      ball3.style.background ="red";
      sprite.src = imgFolder + "20.png";
    }else{
      ball2.style.background = "blue";
      ball3.style.background = "blue";
      sprite.src = imgFolder + "6.png";
    }

  
    //ball.style.top  =   ef (rtrn[0]*maxX/180 - 10) + "px";
    //ball.style.left = (rtrn[1]*maxY/180 - 10) + "px";
  }
  window.addEventListener('deviceorientation', handleOrientation);
  window.addEventListener('devicemotion', handleMotion);


}

