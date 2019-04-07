"use strict";

(function()
{
	window.addEventListener("load", main);
}());

const speedBall = 5;
const rectHeight = 20;
const rectWidth = 60;
const ballRadius = 10;
const shiftleft = 20;
const userOnePos = 10;
const userTwoPos = 470;

function main() {
    var canvas = document.getElementsByClassName("garden")[0];
    var ctx = canvas.getContext("2d");
    // BALL POSITON
    var ballx = Math.floor(Math.random()*200) +50 ;
    var bally = Math.floor(Math.random()*300) +50 ;
    // SPEED
    var dx = 1;
    var dy = -1;
    var scoreOne = 0;
    var scoreTwo = 0;
    var userOne = 10;
    var usertwo = 10;

    var output = document.querySelector('.output');

    setInterval(draw, speedBall);


    window.addEventListener('deviceorientation', function(){
        userOne = event.beta;
        if (userOne >  90) { userOne =  90};
        if (userOne < -90) { userOne = -90};
        userOne += 90;
        output.innerHTML = "gamma: " + userOne+shiftleft + "\n";

        usertwo = event.beta;
        if (usertwo >  90) { usertwo =  90};
        if (usertwo < -90) { usertwo = -90};
        usertwo += 90;
        output.innerHTML = "gamma: " + usertwo+shiftleft + "\n";
    });


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "100px raleway";
        ctx.strokeText(scoreOne+" - "+scoreTwo, 55, 270);
        drawBall(ctx,ballx, bally, ballRadius);
        drawUser(ctx,userOne,shiftleft, userOnePos, rectWidth, rectHeight);
        drawUser(ctx,usertwo,shiftleft, userTwoPos, rectWidth, rectHeight);
        if (ballx + dx > canvas.width) {
            dx = -dx;
        }
        if (ballx + dx < 0) {
            dx = -dx;
        }
        if (bally + dy > canvas.height) {
            ballx = Math.floor(Math.random()*200) +50 ;
            bally = Math.floor(Math.random()*300) +50 ;
            scoreOne+=1;
            dy = -dy;
        }
        if (bally + dy < 0) {
            ballx = Math.floor(Math.random()*200) +50 ;
            bally = Math.floor(Math.random()*300) +50 ;
            scoreTwo+=1;
            dy = -dy;
        }
        if (scoreOne == 10 || scoreTwo == 10) {
            scoreOne = 0;
            scoreTwo = 0;
        }
        if (colision_detect(ballx-ballRadius,bally-ballRadius,ballRadius*2,ballRadius*2,userOne+shiftleft, userOnePos, rectWidth, rectHeight)) {
            console.log("Bateu");
            dy = -dy;
        }
        if (colision_detect(ballx-ballRadius,bally-ballRadius,ballRadius*2,ballRadius*2,usertwo+shiftleft, userTwoPos, rectWidth, rectHeight)) {
            console.log("Bateu");
            dy = -dy;
        }
        ballx += dx;
        bally += dy;
    }
}
function drawBall(ctx,ballx, bally, ballRadius) {
    ctx.beginPath();
    ctx.arc(ballx, bally, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.closePath();
    ctx.fill();
}
function drawUser(ctx,user,shiftleft, userPos, rectWidth, rectHeight) {
    ctx.beginPath();
    ctx.fillRect(user+shiftleft, userPos, rectWidth, rectHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
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
