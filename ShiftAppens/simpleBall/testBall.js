var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
var x;
var y;

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;
var calibrate = document.getElementById("calibrate")

var debug = document.getElementById("debug")


function handleOrientation(event) {
    window.x = event.beta;  // In degree in the range [-180,180]
    window.y = event.gamma; // In degree in the range [-90,90]
  calibrate.addEventListener("click",function(ev){
       window.x = 0;
       window.y = 90;
  })

  /*function reset() {
      ball   = document.querySelector('.ball');
      garden = document.querySelector('.garden');
      maxX = garden.clientWidth  - ball.clientWidth;
      maxY = garden.clientHeight - ball.clientHeight;
      debug.innerHTML = "Xprev - "+x+"\nYprev - "+y+"\n"
      x = 0;  // In degree in the range [-180,180]
      y = 90;
      window.x = 0;
      window.y = 90;
      debug.innerHTML += "Xpos - "+x+"\nYpos - "+y+"\n"
      ball.style.top  = 20 + "px";
      ball.style.left = (maxY*y/180 - 10) + "px";
      output.innerHTML  = "beta : " + x + "\n";
      output.innerHTML += "gamma: " + y + "\n";
  }*/


  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  x =  window.x;
  y =  window.y;
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  if (y >  90) { y =  90};
  if (y < -90) { y = -90};

  // To make computation easier we shift the range of
  // x and y to [0,180]
  x += 90;
  y += 90;

  output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";
  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.top  = 20 + "px";
  ball.style.left = (maxY*y/180 - 10) + "px";
}

window.addEventListener('deviceorientation', handleOrientation);
