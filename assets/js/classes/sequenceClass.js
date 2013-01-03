var SEQUENCE = new sequenceClass;

function sequenceClass(){

	var sequenceEl;
	var sequenceTimer;
	var timerSpeed =100;
	var isPaused = true;
	var imageObj = {};
	var currentFrame = 0;
	var frameIncrement = 1;
	var currentTag;

	var self = this;
	
	this.insertSequence = function(el , array , tag){

		var newObj = {};
		newObj.imageArray = array;
		newObj.el = el;

		imageObj[tag] = newObj;

		
	}

	this.playSequence = function(tag){

		currentTag = tag;
		isPaused = false;
		self.nextFrame();
	}

	this.pauseSequence=function(){
		isPaused = true;
	}

	this.resetSequence=function(){
		clearTimeout( sequenceTimer );
		currentFrame = 0;
	}



	this.nextFrame = function(){


		var curObj = imageObj[currentTag];

		var imageArray = curObj.imageArray;


		curObj.el.html( imageArray[currentFrame] );

		currentFrame += frameIncrement;

		if( currentFrame > imageArray.length)
		{
			self.pauseSequence();
		}

		if(!isPaused){
			sequenceTimer = setTimeout( function(){ SEQUENCE.nextFrame(); } , timerSpeed );
		}

	}



}