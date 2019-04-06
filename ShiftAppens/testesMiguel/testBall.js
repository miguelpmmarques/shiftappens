var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
var output2 = document.querySelector('.output');

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

var x;  // In degree in the range [-180,180]
var y;

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
  x = event.acceleration.x;
  y = event.acceleration.y;
  z = event.acceleration.z;
  output.innerHTML = "x: " + x + "\n";
  output.innerHTML += "y: " + y + "\n";
  output.innerHTML += "z: " + z + "\n";
  garden.style.background = "#" + FF0000;

}

window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('devicemotion', handleMotion);
