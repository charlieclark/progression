var PRELOAD2 = new preloadClass(); 


function preloadClass(){

	this.init = function(){
		allSections = preloadData.allSections;
		self.loadNextSection();
	}
	

	this.loadNextSection = function(){

		console.log("loadNextSection");

		if( sectionsLoaded < allSections.length )
		{
			self.loadSection( allSections[sectionsLoaded] );
		}
		
	}

	//initializes a preload with a tag
	this.loadSection = function(tag){

		prepareSection(tag);

		if( !currentPreloadObj.hasLoaded )
			prepareNextGroup();

	}



	//setting number of elements to load

	this.numElementsToLoad = function( num )
	{
		elementsToLoad = num;
	}

	//gets called when an element is loaded

	this.elementLoaded = function( type  , obj)
	{

		console.log( preloadTracker[currentTag].groupObj );
		preloadTracker[currentTag].groupObj[obj.preloadTag].elementArray[obj.tag] = obj;

		elementFinished(obj , obj.preloadTag);

		checkElementLoadFinished();
	}

	//preload switch / pause / play

	var allSections ;
	var sectionsLoaded = 0;

	var self = this;

	var preloadTracker = {};

	var currentTag;
	var currentPreloadObj;

	//section data
	var sectionData;
	var sectionArray;

	//group data 
	var groupData;
	var groupsLoaded;
	var groupsToLoad;

	//element data
	var elementArray;
	var elementsLoaded;
	var elementsToLoad;

	//existing data

	

	function prepareSection( tag ){

		currentTag = tag;

		console.log(currentTag);

		var isFirst = false;

		if( !preloadTracker[tag] )
		{
			var newObj = {};

			newObj.groupsLoaded = 0;
			newObj.elementsLoaded = 0;
			newObj.hasLoaded = false;
			newObj.groupObj = {};

			preloadTracker[tag] = newObj;
			isFirst = true;
		}
	

		currentPreloadObj = preloadTracker[tag];

		sectionData = preloadData.sections[tag];
		sectionArray = sectionData.preloadArray;
		groupsToLoad = sectionArray.length;

		if(isFirst)
		{
			for( var i = 0 ; i < groupsToLoad ; i++)
			{
				var tempObj = {};
				tempObj.elementArray = [];
				preloadTracker[tag].groupObj[sectionArray[i].tag] = tempObj ;

			}
		}

		



	}

	function prepareNextGroup(){

		groupData = sectionArray[ currentPreloadObj.groupsLoaded ];


		console.log(preloadTracker);

		var tag = groupData.tag;
		var classTag = groupData.classTag;


		var type = groupData.type;
		var dataPath;
			

		switch( type ){
			case "image":
				dataPath = assetData.imageData;
				IMAGES.prepareImageGroup( tag , classTag );
				break
			case "video":
				dataPath = assetData.videoData;
				VIDEO.prepareVideoGroup( tag );
				break
			case "sound":
				dataPath = assetData.soundData;
				break
		}

		//starting load
		prepareNextElement();

	}

	function prepareNextElement(){

		var type = groupData.type;

		switch(type){
			case "image":
				preloadImageElement();
				break
			case "video":
				preloadVideoElement();
				break
			case "sound":
				preloadSoundElement();
				break
		}

	}



	function checkElementLoadFinished(){

		currentPreloadObj.elementsLoaded++;
		var groupData =  sectionArray[ currentPreloadObj.groupsLoaded ];

	
		if(currentPreloadObj.elementsLoaded < elementsToLoad)
		{
			
			prepareNextElement();
		}
		else
		{
			console.log("this");
			groupFinished(groupData.tag , groupData.tagClass)
			currentPreloadObj.elementsLoaded = 0;
			checkGroupLoadFinished();
		}

	}

	function checkGroupLoadFinished(){

		currentPreloadObj.groupsLoaded++;

		if( currentPreloadObj.groupsLoaded < groupsToLoad)
		{		
			
			prepareNextGroup();
		}
		else
		{
			sectionFinished( currentTag );
			currentPreloadObj.hasLoaded = true;
			sectionsLoaded++;
			// self.loadNextSection();
		}

	}


	

	function preloadImageElement(  ){

		IMAGES.loadImage( currentPreloadObj.elementsLoaded );

	}

	function preloadVideoElement(  ){

		VIDEO.loadVideo( currentPreloadObj.elementsLoaded );


	}

	function preloadSoundElement(  ){
	}

	//scetion loaded triggers

	function groupFinished(tag , tagClass){

		var curElementArray = preloadTracker[currentTag].groupObj[tag].elementArray;

		if(tag == "album")
		{

			ALBUM.sequenceLoaded( curElementArray );
		}
		else if(tag == "filmmakerButtons")
		{
			FILM.displayButtons(curElementArray);
		}
		else if(tag == "filmmakerFramedImages")
		{
			FILM.displayFrames(curElementArray);
		}

		if(tagClass == "gallery-album"){
			ALBUM.galleryLoaded( tag , curElementArray )
		}



	}

	function sectionFinished(tag){
		sectionsLoaded++;
		PRELOAD2.loadNextSection();
		
	}

	function elementFinished(obj , tag){


	}

	




}


