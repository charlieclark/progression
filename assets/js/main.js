//global vars

var templateNames = ["house"];
var mainPath = document.URL;
var assetPath = mainPath + "assets" ;

//paths

var elementPath = mainPath + "assets/images/elements/";

var templates = {};
var numTemplatesLoaded = 0;


$(document).ready(function(){

	preInit();

});

function preInit(){

	$("#container").hide();
	loadTemplates();

	//general listeners
	$(window).resize(function(){
		resize();
	});

}

function init(){

	//initializing classes
	PRELOAD.init();
	PRELOAD2.init();
	SPLASH.init();
	ALBUM.init();
	CONTACT.init();
	FILM.init();

	//initital hides
	$("#modal").hide();

	//general mouse handlers
	$("#modal-background").click(function(){ closeModal(); });

	//forced resize
	resize();

}

//resize logic
function resize(){


	//main width and height
	CONFIG.windowHeight = $(window).height();
	CONFIG.windowWidth = $(window).width();

	$("#container").width(CONFIG.windowWidth);

	//resizing classes
	SPLASH.resize();
}

function resizeImageToBounds(imgW , imgH , boundW , boundH ){

		var newWidth;
        var newHeight;
   

        //fitting image to smallest orientation
        var whRatio = imgW - imgH;

        if(whRatio > 0)
        {
    		newWidth = boundW;
    		newHeight = imgH / (imgW/newWidth);
        }
        else
        {
            newHeight = boundH;
            newWidth = imgW / (imgH/newHeight);
        }
              
        return { "h" : newHeight , "w":newWidth }

}

function centerImageCalc(imgW , imgH , boundW , boundH){

	var newL = (boundW - imgW) / 2;
	var newH = (boundH - imgH) / 2;

	var tempObj = { "left" : newL , "top" : newH }
	return tempObj

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

//modal

function modalImage(img){

	var maxSize = 500;
	var imgRaw = img[0];

	var dimObj = resizeImageToBounds(imgRaw.width , imgRaw.height , maxSize , maxSize );
	var centerObj = centerImageCalc(dimObj.w , dimObj.h , CONFIG.windowWidth , CONFIG.windowHeight);


	$("#modal-container").html( img ).css({
		top: centerObj.top,
		left: centerObj.left
	});
	$("#modal-container").find("img").css({
		width: dimObj.w,
		height: dimObj.h		
	});
	openModal();

}	

function closeModal(){
	$("#modal").hide();
	$("#modal-container").empty();
}

function openModal(){
	$("#modal").show();
}