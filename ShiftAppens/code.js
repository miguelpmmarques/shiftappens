"use strict";

const path = "../assets/";


(function()
{
	window.addEventListener("load", main);
}());


function main()
{
    var setUpObject = new SetUp()
	var one = document.getElementById('o');
    var two = document.getElementById('tw');
    var three = document.getElementById('th');

    if (localStorage.getItem("items") === null) {
		localStorage.setItem('items',JSON.stringify(setUpObject));
	}
    var localDataBase = JSON.parse(localStorage.getItem('items'));
    one.innerHTML = "teste -> "+localDataBase.nameTeste;




    one.addEventListener("click",buttonControler)

    function buttonControler() {
        var n = Math.random();
        console.log("Bateu");
        one.innerHTML = "teste -> "+n;
        localDataBase.nameTeste = n;
        localStorage.setItem('items',JSON.stringify(localDataBase));
    }

}
