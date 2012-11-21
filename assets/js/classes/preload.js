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
			case "splash":
				splash()
				break;
		}

	}


	//private methods

	function initTrackers(){
		preloadTracker.houses = 0;
	}


	function splash(){

		var elToLoad = (SPLASH.numHouses * 4) + 3; // houses + titles

		preloadTracker.houses++;

		console.log(preloadTracker.houses);

		if(preloadTracker.houses == elToLoad)
		{
			SPLASH.finishedLoading();
		}

	}

	

	


}

