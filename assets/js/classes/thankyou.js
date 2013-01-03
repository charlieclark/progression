var THANK = new thankyouClass(); 


function thankyouClass(){
	//public vars

	//private vars
	var penStart = {};
	var penRest = {};
	var penAnimations = 10;
	var animationTracker = 0;
	var animationDelay = 500;
	var titleWidth;

	//public methods
	this.init = function(){

		
		
		init();
		resetPen();
	}

	this.show = function(){

		//pen starting points
		penStart.x = $("#thankyou-title").position().left;
		penStart.y = $("#thankyou-title").position().top;

		//pen resting points
		penRest.x = $("#pen").position().left;
		penRest.y = $("#pen").position().top;

		var animLength = animationDelay * penAnimations;

		titleWidth = $("#thankyou-title").width();

		$("#thankyou-title").css("width" , 0);

		animatePen();

		$("#thankyou-title").animate({
				width : titleWidth
			} , animLength , function(){  });

		

	}

	//private methods

	function init(){
		console.log("hello");
	}

	function resetPen(){

		console.log(penStart.x);

		animationTracker = 0;

		$("#pen").animate({
				"left" : penStart.x,
				"top" : penStart.y
			} , 500 , function(){  });

	}

	function animatePen(){

		if(animationTracker < penAnimations){

			var baseX = $("#thankyou-title").position().left;
			var baseY = $("#thankyou-title").position().top;

			var animIncrement = titleWidth / penAnimations;
			console.log(animIncrement);
			animationTracker++;

			console.log( $("#pen").position().left );

			$("#pen").animate({
				"left" :penStart.x + $("#pen").position().left + animIncrement,
				"top" : penStart.y + $("#thankyou-title").height() * Math.random()
			} , animationDelay , function(){ animatePen() });
		}
		else{
			resetPen();
		}

	}
}

