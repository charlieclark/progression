var IMAGES = new imageLoader();

function imageLoader(){

	this.preloadObj = {
		preloadArray :[]
	};

	this.allImageArray = [];

	var self = this;
	var urlBase;

	var setData;
	var setArray;
	var preloadImageArray = [];

	var totalImagesLoaded = 0;

	this.prepareImageGroup = function(tag){


		urlBase = assetPath +"/images/";

		setData = assetData.imageData.groups[tag];

		preloadImageArray.length = 0;

		//check if is array or list

		if( setData.type == "array" )
		{
			prepareGroup(tag);
		}

		else if(setData.type == "list")
		{
			prepareList(tag);
		}

		else if(setData.type == "selector")
		{
			prepareSelector(tag);
		}	

	}

	this.loadImage = function(index){

		var tempImg = preloadImageArray[index];


		tempImg.src = tempImg.preSrc;

		tempImg.onload = function(){
				var imgDim = {w:this.width , h:this.height};
				this.imgDim = imgDim;
				self.loadHandler(this);
			}
		

	}

	this.loadHandler = function(obj){



		totalImagesLoaded++;
		obj.overallTag = totalImagesLoaded;
		this.allImageArray.push( obj );


		PRELOAD2.elementLoaded( "image" , obj );

	}


	function prepareList(tag){

		var setList = setData.data;

		var imagesToLoad = setList.numImages;

		PRELOAD2.numElementsToLoad( imagesToLoad );

		for( var i = 0 ; i < imagesToLoad ; i++)
		{
			var tempImg = new Image;

			tempImg.globalData = setData;
			tempImg.tag = i;
			tempImg.preloadTag = tag;
			//list difference

			var paddedNumber = 1;
			if(setList.padding)
				paddedNumber = self.zeroPad( i , setList.padding )

			tempImg.preSrc = urlBase + setList.url + paddedNumber + setList.extension ;

			tempImg.max = imagesToLoad;

			preloadImageArray.push( tempImg );
		}

	}

	function prepareGroup(tag){

		var groupInfo = setData.data;
		var setArray = groupInfo.array;

		var imagesToLoad = setArray.length;

		PRELOAD2.numElementsToLoad( imagesToLoad );

		for( var i = 0 ; i < setArray.length ; i++)
		{
			var tempImg = new Image;

			tempImg.data = setArray[i];
			tempImg.globalData = setData;
			tempImg.tag = i;
			tempImg.preloadTag = tag;
			tempImg.preSrc = urlBase + setArray[i].url;
			tempImg.max = setArray.length;

			preloadImageArray.push( tempImg );

		}

	}

	function prepareSelector(tag){

		var selectorInfo = setData.data;

		var selection = $( selectorInfo.selector );
		var imagesToLoad = selection.length;

		PRELOAD2.numElementsToLoad( imagesToLoad );

		for( var i = 0 ; i < imagesToLoad ; i++)
		{
			var tempImg = new Image;

			tempImg.globalData = setData;
			tempImg.tag = i;
			tempImg.preloadTag = tag;

			//specific to selector
			tempImg.preSrc = selection.eq(i).attr("src");
			tempImg.max = imagesToLoad;

			preloadImageArray.push( tempImg );
		}
	}

	//utils

	this.zeroPad = function(num, size) 
   {
       var s = "000000000000" + num;
       return s.substr(s.length-size);
   }

	//this belongs in paralax class

	this.findImageLayer = function( layer  , tag)
	{
		var returnArray  = [];

		for( var i = 0 ; i <  IMAGES.allImageArray.length ; i++)
		{
			var img = IMAGES.allImageArray[i];
			if( img.data.pLayer == layer && img.globalData.tag == tag)
				returnArray.push(img);
		}

		return returnArray
	}


	this.findImage = function(tag){

		for( var i = 0 ; i <  IMAGES.allImageArray.length ; i++)
		{
			var img = IMAGES.allImageArray[i];
			if( img.data.name == tag )
				return img;
		}

	}
	
}