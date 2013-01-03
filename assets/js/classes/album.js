var ALBUM = new albumClass;

function albumClass(){


	this.init = function(){

		buildGallery();
		showGallery(0);

	}

	this.show = function(){
		SEQUENCE.playSequence("album");
		
		$(".album-title").click(function(){

			if($(this).hasClass("two"))
			{
				showGallery(0);
			}
			else if($(this).hasClass("three"))
			{
				showGallery(1);
			}

		});

	}

	this.sequenceLoaded = function(obj){
		SEQUENCE.insertSequence( $("#album-image-sequence") , obj , "album" );
	}

	this.insertImage = function(obj){

		var tempImage = $("#album-gallery .gallery-item").eq(obj.tag)

		tempImage.html( obj );
		tempImage.click(function(){
			var el = $(obj).clone();
			modalImage( el );
		});
	}

	this.galleryLoaded = function(tag , obj){

		var index;

		switch( tag ){
			case "albumGalleryFundraiser":
				index = 0;
				break
			case "albumGalleryOnSet":
				index = 1;
				break
		}

		var el = $(".subGallery").eq(index);

		for( var i = 0 ; i < obj.length ; i++)
		{
			
			var tempImage = el.find(".gallery-item").eq(i);
			tempImage.append(obj[i]);

			var newEl = obj[i];

			tempImage.click(function(){
				
				el = $(this).find("img").clone();
				modalImage( el );

			});
		}



	}

	function buildGallery(){

		var galleryTagArray = [ "albumGalleryFundraiser" , "albumGalleryOnSet" ];
		var galleryEl = $("#album-gallery");


		for( var i = 0 ; i < galleryTagArray.length ; i++)
		{
			var currentTag = galleryTagArray[i];
			var subGalleryEl = $("<div>" , {
				class: "subGallery"
				
			});

			

			var numPhotos = assetData.imageData.groups[currentTag].data.numImages;
			for( var j = 0 ; j < numPhotos ; j++)
			{
				var tempDiv = $("<div>" , {
					id: "gallery" + j,
					class: "gallery-item"
				});

				subGalleryEl.append(tempDiv);
			}

			galleryEl.append(subGalleryEl);

		}

	}

	

	function showGallery(index){

			$(".subGallery").hide();

			$(".subGallery").eq(index).show();
	}




	
}