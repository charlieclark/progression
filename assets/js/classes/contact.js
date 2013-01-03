var CONTACT = new contactClass(); 


function contactClass(){
	//public vars

	//private vars
	var letterPosArray = [];
	var topDisplacement = 100;

	//public methods
	this.init = function(){

		
		$("#contact .letter").each(function(){

			//final positions
			var index = $(this).index(".letter");
			var posObj = {};
			posObj.x = $(this).css("left");
			posObj.y = $(this).css("top");
			letterPosArray[index] = posObj;

			//mouseover
			$(this).hover( 
				function(){
					console.log("mouseover");
					animateUp($(this).index(".letter"));
				} , 
				function(){
					console.log("mouseout");
					animateDown($(this).index(".letter"));
				}
			);

			//click

		});
		
		
	}

	this.show = function(){

		

		unveilLetters();
	}

	//private methods

	function animateUp(index){

		var posObj = letterPosArray[index];

		$("#contact .letter").eq(index).animate({
				"top" : parseInt(posObj.y)
			} , 1000);
	}

	function animateDown(index){


		var posObj = letterPosArray[index];

		var el = $("#contact .letter").eq(index);

		el.stop().animate({

				"top" : parseInt(posObj.y)  + topDisplacement
			} , 1000);
	}

	function unveilLetters(){


		$("#contact .letter").each(function(){
			var index = $(this).index(".letter");

			var posObj = letterPosArray[index];


			$(this).css({
				"left" : parseInt(posObj.x),
				"top" : parseInt(posObj.y) + 500
			});

			animateDown(index);

		});

	}

	function init(){
		console.log("hello");
	}

}

