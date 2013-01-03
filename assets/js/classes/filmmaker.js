var FILM = new filmClass(); 


function filmClass(){
	//public vars

	//private vars

	var frameArray =[];
	var buttonArray =[];

	var numFrames = 2;

	//public methods
	this.init = function(){
		
		init();
	}

	this.show = function(){

	}

	this.displayFrames = function(obj){
		frameArray = obj;
	}

	this.displayButtons = function(obj){
		buttonArray = obj;

		buildFrames();
	}

	//private methods

	function init(){
		console.log("hello");
	}

	function buildFrames(){

		for( var i = 0 ; i < numFrames ; i++)
		{
			var frameContainer = $("<div>" , {
				class : "frame-container"
			});
			var frameImage = frameArray[i];

			frameContainer.html(frameImage);

			$("#image-background-container").append(frameContainer);

			//putting in buttons

			var buttonContainer = $("<div>" , {
				class : "film-button-container"
			});

			var buttonImage = buttonArray[i];

			buttonContainer.html(buttonImage);

			$("#filmaker-info-buttons").append(buttonContainer);

		}

	}

}

