"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main() {
    var ball   = document.querySelector('.ball');
    var garden = document.querySelector('.garden');
    var output = document.querySelector('.output');
    var x;
    var y;

    var maxX = garden.clientWidth  - ball.clientWidth;
    var maxY = garden.clientHeight - ball.clientHeight;
    var calibrate = document.getElementById("calibrate")

    var debug = document.getElementById("debug")



    window.addEventListener('deviceorientation', listerSensor);
    function listerSensor(ev) {
        handleOrientation(event,x,y,output,ball,garden,maxX,maxY)
    }
}
function handleOrientation(event,x,y,output,ball,garden,maxX,maxY) {
    window.x = event.beta;  // In degree in the range [-180,180]
    window.y = event.beta; // In degree in the range [-90,90]
    calibrate.addEventListener("click",function(ev){
        location.reload();
    })

    x =  window.x;
    y =  window.y;
    if (x >  70) { x =  70};
    if (x < -90) { x = -90};

    if (y >  90) { y =  90};
    if (y < -90) { y = -90};

    x += 90;
    y += 90;
    var m = (maxX*y/100)-40;
    if (m >  280) { m =  280};
    if (m < 60) { m = 60};

    output.innerHTML  = "m : " + m-50 + "\n";
    output.innerHTML += "gamma: " + y + "\n";
    ball.style.top  = 20 + "px";
    ball.style.left = m-50 + "px";
}
