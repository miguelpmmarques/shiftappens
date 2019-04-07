"use strict";
(function()
{
	window.addEventListener("load", main);
}());

function main(){
	var button=document.getElementById("Click");
	var textField = document.getElementById("CountArea");
	clientResponse(button, textField);
}

//	Outer function to send responses to the server
function clientResponse(button, textField){
	button.addEventListener('click',(e)=>{
		sendInfo(e, textField);
	});
}

//	Main function that creates and 
//	sends the json file with the nick
function sendInfo(e, textField){ //	todo: create text box and send nick to json
	$.ajax({
		url: "/",
		type: 'POST',
		contentType: 'application/json',
		//	data gets 3 parameters:
		//		client nick (name)
		//		success function
		//		fail function
		data: JSON.stringify({name: "viewedProfiles"}),
						success:	function(response)
								{console.log(response);
								textField.innerHtml = response;
								},
						error:	function (xhr, ajaxOptions, thrownError)
							{if(xhr.status==404) {alert(thrownError);}}
	});
}
