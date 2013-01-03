var preloadData = {

	allSections : ["album" , "filmmaker"],

	sections:
	{
		"album" : {

			preloadArray :
			[
				{
					tag : "album",
					type :"image",
					tagClass : ""
				},
				{
					tag : "albumGalleryFundraiser",
					type :"image",
					tagClass : "gallery-album"
				},
				{
					tag : "albumGalleryOnSet",
					type :"image",
					tagClass : "gallery-album"
				}

			]

		},
		"filmmaker" : {

			preloadArray :
			[
				{
					tag : "filmmakerFramedImages",
					type :"image",
					tagClass : ""
				},
				{
					tag : "filmmakerButtons",
					type :"image",
					tagClass : ""
				}

			]

		}
	}



}


var assetData = {

	imageData :{

		groups:
		{

			"album" :
			{
				type: "list",
				data :
				{
					url: "image-sequences/album/album-sequence",
					extension: ".png",
					numImages : 68,
					padding: 5 
				}
				
			},
			"albumGalleryFundraiser":
			{
				type: "list",
				data :
				{
					url: "elements/album-gallery/fundraiser/galleryImg",
					extension: ".jpg",
					numImages : 3,
					padding: 1 
				}
				
			},
			"albumGalleryOnSet":
			{
				type: "list",
				data :
				{
					url: "elements/album-gallery/on-set/galleryImg",
					extension: ".jpg",
					numImages : 2,
					padding: 1 
				}
				
			},

			// filmmaker

			"filmmakerFramedImages":
			{
				type: "list",
				data :
				{
					url: "elements/filmmaker-framed-images/framed-image",
					extension: ".png",
					numImages : 2,
					padding: 1 
				}
				
			},
			"filmmakerButtons":
			{
				type: "list",
				data :
				{
					url: "elements/filmmaker-buttons/button",
					extension: ".png",
					numImages : 2,
					padding: 1 
				}
				
			}

		}

	},

	soundData :{

	}
	
}