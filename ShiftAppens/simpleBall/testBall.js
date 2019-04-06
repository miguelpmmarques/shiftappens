var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
var x;
var y;

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;
var calibrate = document.getElementById("calibrate")

var debug1 = document.getElementById("debug1")


function handleOrientation(event) {
  //x = event.beta;  // In degree in the range [-180,180]
  y = event.gamma; // In degree in the range [-90,90]
  calibrate.addEventListener("click",reset)

  function reset() {
      debug1.innerHTML = "-> "+Math.random()
      ball   = document.querySelector('.ball');
      garden = document.querySelector('.garden');
      maxX = garden.clientWidth  - ball.clientWidth;
      maxY = garden.clientHeight - ball.clientHeight;
    //  x = 0;  // In degree in the range [-180,180]
      y = 0;
  }

  //output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";

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
  //paddle1.style.top  = (maxX*x/180 - 10) + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";
}

window.addEventListener('deviceorientation', handleOrientation);
