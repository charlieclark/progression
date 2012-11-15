//global vars

var templateNames = ["house"];
var mainPath = "/~williamclark/progression/www/";

var templates = {};
var numTemplatesLoaded = 0;


$(document).ready(function(){

	preInit();

});

function preInit(){
	loadTemplates();

	//general listeners
	$(window).resize(function(){
		resize();
	});

}

function init(){

	//initializing classes
	PRELOAD.init();
	SPLASH.init();	

	//forced resize
	resize();

}

//resize logic
function resize(){

	//main width and height
	CONFIG.windowHeight = $(window).height();
	CONFIG.windowWidth = $(window).width();

	//resizing classes
	SPLASH.resize();
}


// template stuff

function loadTemplates(){

	for( var i = 0 ; i < templateNames.length ; i++)
	{
		var templateURL = mainPath + "assets/templates/" + templateNames[i] + ".html";

		$.ajax({
			url: templateURL,
			context: {id:templateNames[i]},
			success: function( data ) {
		  		templates[this.id] = data;
		  		templatesLoaded();
		  	}
		});
	}
}

function templatesLoaded(){
	numTemplatesLoaded ++;
	if(numTemplatesLoaded > templateNames.length-1)
	{
		init();
	}
}