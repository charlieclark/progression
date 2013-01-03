var SPLASH = new splashClass(); 


function splashClass(){

	//setting self
	var self = this;

	//public vars
	this.numHouses = 9;


	//private const
	var houseArray =[98,159,86,133,152,152,62,147,111];

	//private var
	var houseWidthTotal = 0;
	var houseHeight = 190;
	var houseMargin = 15;

	var currentPageEl;
	var currentPageView;

	var navShowing = false;

	//public methods
	this.init = function(){

		currentPageView = SPLASH;
		currentPageEl = $("#splash");
		hidePages();
		animateIn("splash");
		navigationToggle(false);

		buildHouses();
		loadHouses();
		loadTitle();

		
	}

	this.resize = function(){
		resizeHouses();
	}

	//preload finished

	this.finishedLoading = function()
	{

		$("#container").fadeIn("slow");


		//creating navigation

		$("#nav-houses").html(  $("#houseContainer").html() );

		$("#nav-logo").click(function(){ animateOut("splash") });




		//adding mouseovers to houses
		//adding mouseEvents
		var houseEl = $("#houseContainer .house");
		var navEl = $("#nav-container .house");
	
		//houses

		houseEl.hover(
			function(){
				houseMouseover($(this).index());
			},
			function(){
				houseMouseout($(this).index());
			}
		);

		houseEl.click(function(){
			animateOut( $(this).index() );
		});

		//nav house

		navEl.hover(
			function(){
				houseMouseover($(this).index());
			},
			function(){
				houseMouseout($(this).index());
			}
		);

		navEl.click(function(){
			animateOut( $(this).index() );
		});

		//resizing

		resizeNavHouses(700);
		resize();
		resize();

	}


	//private methods


	function animateIn(index){
		gotoPage(index);
	}

	function animateOut(index){

		var delay = 1000;

		$("#houseContainer").animate({
			"bottom" : -500
		} , delay/2 , function(){
			$("#splashTitle").animate({
			"top" : -500
			} , delay/2); 

		}); 

		
		setTimeout( function(){ gotoPage(index) } , delay );
	}

	function hidePages(){
		$(".section").hide();
	}

	function gotoPage(index){

		SEQUENCE.resetSequence();

		var newPageEl;
		var newPageView;

		
		switch(index){
			case "splash":
				newPageEl = $("#splash");
				newPageView = SPLASH;
				break
			case 3:
				newPageEl = $("#filmmakers");
				newPageView = FILM;
				break
			case 4:
				newPageEl = $("#album");
				newPageView = ALBUM;
				break
			case 6:
				newPageEl = $("#thankyou");
				newPageView = THANK;
				break
			case 7:
				newPageEl = $("#contact");
				newPageView = CONTACT;
				break


		}

		//changing old stuff
		if(index != "splash")
		{
			navigationToggle(true);
			newPageView.show();
		}
		else
		{
			navigationToggle(false);
		}

		currentPageEl.hide();
		newPageEl.show();

		currentPageEl = newPageEl;
		currentPageView = newPageView;

	}

	function navigationToggle(show){

		if(show != undefined)
		{
			navShowing = show;
		}
		else
		{
			navShowing = !navShowing;
		}
		

		if(navShowing)
		{
			$("#navigation").show();
		}
		else
		{
			$("#navigation").hide();
		}


	}



	function buildHouses()
	{

		for( var i = 0 ; i < self.numHouses ; i++)
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


	}

	function resizeNavHouses(width){

		for(var i = 0 ; i < houseArray.length ; i++)
		{
			var newWidth = (houseArray[i] / houseWidthTotal) * width;

			$("#nav-houses .house").eq(i).css("width" , newWidth);
		}

		$("#nav-houses").css("width" , width + 20);

		//resizing height
		var newHeight = ( width / houseWidthTotal ) * houseHeight ;
		var newMargin = 50;

		$("#nav-houses").css({
			"height" : newHeight ,
			"padding-top" : newMargin
		});

		$("#nav-houses .textAreaContainer").css({
			"top" : -30
		});

		//resizing margin
		var newMargin = (newHeight / houseHeight) * houseMargin;
		$("#nav-houses .house.notFirst").css("margin-left" , -newMargin);


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

		$("#houseContainer .textAreaContainer").css("top" , newHeight);
	}

	function loadHouses()
	{		
		for( var i = 0 ; i < self.numHouses ; i++)
		{
			var baseHouseURL = elementPath + "houses/House-" + (i+1) +".png";
			var hoverHouseURL = elementPath + "houses/House-" + (i+1) +"-rollover.png";

			var baseTextURL = elementPath + "house-text/House-" + (i+1) + "-text.png";
			var hoverTextURL = elementPath + "house-text/House-" + (i+1) + "-text-rollover.png";

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
		
		PRELOAD.preload("splash");

	}

	function loadTitle()
	{
		 var numTitle = 3;

		 for( var i = 0 ; i < numTitle ; i++)
		 {
		 	var tempURL = elementPath + "title" + (i+1) + ".png";
		 	var tempImg = new Image;
		 	tempImg.onload = function(){

		 			 		
		 		var tempEl = $("#splashTitle .title").eq(this.tag);
		 		tempEl.html( $("<img src='" + this.src +  "'/>") );
		 		PRELOAD.preload("splash");
		 	}

		 	var tempId = "title" + i;	
		 	 var newEl =  $("<div class='title' id=" + tempId + "></div>");
		 	 newEl.appendTo("#splashTitle");

		 	tempImg.tag = i;
		 	tempImg.src = tempURL;
		 }
		
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
		
		PRELOAD.preload("splash");

	}



	//mouse stuff

	function houseMouseover(index)
	{
		var el;

		if(navShowing)
		{
			console.log("show nav");
			el = $("#nav-container");
		}
		else
		{
			el = $("#houseContainer");
		}

		el.find(".house").eq(index).find(".houseMouseover").fadeTo("fast" , 0.8);
		el.find(".house").eq(index).find(".textAreaHover").fadeTo("fast" , 0.8);
	}

	function houseMouseout(index)
	{
		var el;

		if(navShowing)
		{
			el = $("#nav-container");
		}
		else
		{
			el = $("#houseContainer");
		}

		el.find(".house").eq(index).stop().find(".houseMouseover").fadeOut("fast");
		el.find(".house").eq(index).stop().find(".textAreaHover").fadeOut("fast");
	}


	


}

