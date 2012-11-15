var SPLASH = new splashClass(); 


function splashClass(){
	//public vars

	//private const
	var numHouses = 9;
	var houseArray =[98,159,86,133,152,152,62,147,111];

	//private var
	var houseWidthTotal = 0;
	var houseHeight = 190;
	var houseMargin = 15;

	//public methods
	this.init = function(){
		buildHouses();
		loadHouses();
		// loadTitle();
	}

	this.resize = function(){
		resizeHouses();
	}

	//private methods

	function buildHouses()
	{

		for( var i = 0 ; i < numHouses ; i++)
		{
			var compiled = _.template(templates.house , {name : "house"+i} );
			$("#houseContainer").append(compiled);
			houseWidthTotal += houseArray[i]

			if(i > 0)
			{
				$("#houseContainer .house").last().addClass("notFirst").css("margin-left" , -houseMargin);
				houseWidthTotal -= houseMargin;
			}
			
			 
		}

		//adding mouseEvents
		var houseEl = $("#houseContainer .house");
		var textEl = $("#houseContainer .house .textArea");
		var combined = houseEl.add(textEl);

		combined.hover(
			function(){
				houseMouseover($(this).index());
			},
			function(){
				houseMouseout($(this).index());
			}
		);



	}

	function resizeHouses()
	{
		for(var i = 0 ; i < houseArray.length ; i++)
		{
			var newWidth = (houseArray[i] / houseWidthTotal) * CONFIG.windowWidth;
			$("#houseContainer .house").eq(i).css("width" , newWidth);
		}

		//resizing height
		var newHeight = ( $("#houseContainer").width() / houseWidthTotal ) * houseHeight ;
		$("#houseContainer").css("height" , newHeight);

		//resizing margin
		var newMargin = (newHeight / houseHeight) * houseMargin;
		$("#houseContainer .house.notFirst").css("margin-left" , -newMargin);

		$("#houseContainer .text").css("top" , newHeight + 10);
	}

	function loadHouses()
	{		
		for( var i = 0 ; i < numHouses ; i++)
		{
			var baseHouseURL = mainPath + "assets/images/elements/houses/House-" + (i+1) +".png";
			var hoverHouseURL = mainPath + "assets/images/elements/houses/House-" + (i+1) +"-rollover.png";

			var baseTextURL = mainPath + "assets/images/elements/house-text/House-" + (i+1) + "-text.png";
			var hoverTextURL = mainPath + "assets/images/elements/house-text/House-" + (i+1) + "-text-rollover.png";

			var imgBase = new Image;
			var imgHover = new Image;

			var textBase = new Image;
			var textHover = new Image;

			imgBase.tempInfo = { "id" : i , "type" : "base" };
			imgHover.tempInfo = { "id" : i , "type" : "hover" };

			textBase.tempInfo = { "id" : i , "type" : "base" };
			textHover.tempInfo = { "id" : i , "type" : "hover" };

			imgBase.onload =function(){ loadHouse(this); }
			imgHover.onload =function(){ loadHouse(this); }

			textBase.onload =function(){ loadText(this); }
			textHover.onload =function(){ loadText(this); }

			imgBase.src = baseHouseURL;
			imgHover.src = hoverHouseURL;

			textBase.src = baseTextURL;
			textHover.src = hoverTextURL;
		}
	}

	function loadHouse(img)
	{		
		var index = img.tempInfo.id;
		var type = img.tempInfo.type;
		if(type == "base")
		{
			$(".house").eq(index).find(".houseBase").css("background-image" , "url(" + img.src +")");
		}
		else if(type == "hover")
		{
			$(".house").eq(index).find(".houseMouseover").css("background-image" , "url(" + img.src +")");
		}
		
		PRELOAD.preload("houses");

	}

	function loadText(img)
	{		
		var index = img.tempInfo.id;
		var type = img.tempInfo.type;

		if(type == "base")
		{
			$(".house").eq(index).find(".textArea").css("background-image" , "url(" + img.src +")");
		}
		else if(type == "hover")
		{
			$(".house").eq(index).find(".textAreaHover").css("background-image" , "url(" + img.src +")");
		}
		
		PRELOAD.preload("houses");

	}


	//mouse stuff

	function houseMouseover(index)
	{
		$("#houseContainer .house").eq(index).find(".houseMouseover").stop().fadeIn("slow");
		$("#houseContainer .house").eq(index).find(".textAreaHover").stop().fadeIn("slow");
	}

	function houseMouseout(index)
	{
		$("#houseContainer .house").eq(index).find(".houseMouseover").fadeOut("slow");
		$("#houseContainer .house").eq(index).find(".textAreaHover").fadeOut("slow");
	}


	


}

