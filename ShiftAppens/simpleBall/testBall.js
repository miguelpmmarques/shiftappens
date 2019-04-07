"use strict";

(function()
{
	window.addEventListener("load", main);
}());
const speedBall = 10;
function main() {


    var canvas = document.getElementsByClassName("garden")[0];
    var ctx = canvas.getContext("2d");
    var ballx = 20;
    var bally = 20;
    var dx = 1;
    var dy = -1;


    function draw() {

        function drawBall() {
            ctx.beginPath();
            ctx.arc(ballx, bally, 10, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.closePath();
            ctx.fill();
        }
        function drawRect() {
            ctx.beginPath();
            ctx.fillRect(y, x, 60, 20);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        ctx.clearRect(0, 0, canvas.width, canvas.width);
        drawBall();
        drawRect();
        if (ballx + dx > 300) {
            dx = -dx;
        }
        if (ballx + dx < 0) {
            dx = -dx;
        }
        if (bally + dy > 200) {
            dy = -dy;
        }
        if (bally + dy < 0) {
            dy = -dy;
        }
        ballx += dx;
        bally += dy;

    }
    setInterval(draw, speedBall);



    var ball   = document.querySelector('.ball');
    var garden = document.querySelector('.garden');
    var output = document.querySelector('.output');
    var x = 100;
    var y = 10;
    var maxX = garden.clientWidth;
    var maxY = garden.clientHeight;
    var calibrate = document.getElementById("calibrate")

    var debug = document.getElementById("debug")
    window.addEventListener('deviceorientation', listerSensor);

    function listerSensor(ev) {
        handleOrientation()
    }

    function handleOrientation() {

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

        function drawRect() {
            ctx.beginPath();
            ctx.fillRect(y, 20, 20, 20);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRect();

        output.innerHTML  = "m : " + m-50 + "\n";
        output.innerHTML += "gamma: " + y + "\n";

    }


}
