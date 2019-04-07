"use strict";

(function()
{
	window.addEventListener("load", main);
}());
const speedBall = 5;
function main() {


    var canvas = document.getElementsByClassName("garden")[0];
    var ctx = canvas.getContext("2d");
    var ballx = Math.floor(Math.random()*200) +50 ;
    var bally = Math.floor(Math.random()*300) +50 ;
    var dx = 1;
    var dy = -1;
    var m = 20;
    var score = 3;
    var x = 100;
    var y = 10;



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
            ctx.fillRect(y+20, 20, 60, 20);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "60px raleway";
        ctx.strokeText("Lives - "+score, 40, 270);
        drawBall();
        drawRect();
        if (ballx + dx > canvas.width) {
            dx = -dx;
        }
        if (ballx + dx < 0) {
            dx = -dx;
        }
        if (bally + dy > canvas.height) {
            dy = -dy;
        }
        if (bally + dy < 0) {
            ballx = Math.floor(Math.random()*200) +50 ;
            bally = Math.floor(Math.random()*300) +50 ;
            score-=1;
            dy = -dy;
        }
        ballx += dx;
        bally += dy;
        if (colision_detect(ballx-10,bally-10,20,20,y+20, 20, 60, 20)) {
            console.log("Bateu");
            dy = -dy;
        }

    }
    setInterval(draw, speedBall);




    var garden = document.querySelector('.garden');
    var output = document.querySelector('.output');

    var maxX = garden.clientWidth;
    var maxY = garden.clientHeight;
    var calibrate = document.getElementById("calibrate")

    var debug = document.getElementById("debug")
    window.addEventListener('deviceorientation', listerSensor);

    function listerSensor(ev) {
        handleOrientation()
    }

    function handleOrientation(ev) {


        y = event.beta;

        /*calibrate.addEventListener("click",function(ev){
            location.reload();
        })*/

        if (y >  90) { y =  90};
        if (y < -90) { y = -90};

        y += 90;

        function drawRect() {
            ctx.beginPath();
            ctx.fillRect(y+20, 20, 60, 20);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        output.innerHTML += "gamma: " + y + "\n";
    }


}
function colision_detect(x1,y1,h1,w1,x2,y2,h2,w2)
{
	if(((x2 > x1 && x2 < x1 + w1) || ( x2+w2 > x1  && x2+w2 < x1 + w1)) && ((y2 > y1 && y2 < y1 + h1) || ( y2+h2 > y1  && y2+h2 < y1 + h1)))
	{
		return true
	}
	else
		return false
}
