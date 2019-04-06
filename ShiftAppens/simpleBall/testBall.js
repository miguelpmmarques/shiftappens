var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
var y;

var maxY = garden.clientWidth  - ball.clientWidth;
var maxX = garden.clientHeight - ball.clientHeight;

var calibrate = document.getElementById("calibrate")
var debug1 = document.getElementById("debug1")


function handleOrientation(event) {
  //x = event.beta;  // In degree in the range [-180,180]
  y = event.gama; // In degree in the range [-90,90]
  z = event.alpha;
  calibrate.addEventListener("click",reset)

  function reset() {
      debug1.innerHTML = "-> "+Math.random()
      ball   = document.querySelector('.ball');
      garden = document.querySelector('.garden');
      maxX = garden.clientHeight - ball.clientHeight;
      y = 0;
  }

  //output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML = "Eixo Y: " + y + "\n";
  //output.innerHTML += "alpha:" + z + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  //if (x >  90) { x =  90};
  //if (x < -90) { x = -90};

  // To make computation easier we shift the range of
  // x and y to [0,180]
  //x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.top  = (maxY*y/180 - 10) + "px";
 
}

window.addEventListener('deviceorientation', handleOrientation);
