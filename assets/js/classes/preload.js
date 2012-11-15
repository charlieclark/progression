var PRELOAD = new preloadClass(); 


function preloadClass(){
	//public vars

	//private const


	//private var

	var preloadTracker = {};

	//public methods
	this.init = function(){

		initTrackers();
	
	}

	this.preload = function(type){

		switch(type)
		{
			case "houses":
				houses()
				break;
		}

	}


	//private methods

	function initTrackers(){
		preloadTracker.houses = 0;
	}

	function title(){

	}

	function houses(){

		var elToLoad = 36;

		preloadTracker.houses++;

		console.log(preloadTracker.houses);

		if(preloadTracker.houses == elToLoad)
		{
			console.log("houses loaded");
		}

	}

	

	


}

