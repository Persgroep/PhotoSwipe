// Copyright (c) %%year%% by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: %%version%%

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Image');
	var PhotoSwipe = window.Code.PhotoSwipe;
	
	
	
	PhotoSwipe.Image.ImageClass = klass({
		
		
		
		refObj: null,
		imageEl: null,
		src: null,
		caption: null,
		metaData: null,
		imageLoadHandler: null,
		imageErrorHandler: null,
		
		
		
		/*
		 * Function: dispose
		 */
		dispose: function(){
		
			var prop, i;
			
			this.shrinkImage();

			if (!Util.isNothing(this.imageEl)){
				this.imageEl.onload = null;
			}
			
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
		
		},
		
		
		
		/*
		 * Function: initialize
		 */
		initialize: function(refObj, src, caption, metaData){
			
			this.refObj = refObj;
			// This is needed. Webkit resolves the src
			// value which means we can't compare against it in the load function
			this.originalSrc = src;
			this.src = src;
			this.caption = caption;
			this.metaData = metaData;
			
			this.imageEl = new window.Image();
			
			this.imageLoadHandler = this.onImageLoad.bind(this);
			this.imageErrorHandler = this.onImageError.bind(this);
			
		},
		
		
		
		/*
		 * Function: load
		 */
		load: function(){
			
			var imgs = this.refObj.getElementsByTagName('img'), video = false;

			if (imgs.length > 0){
				video = imgs[0].getAttribute('data-video');
			}

			this.imageEl.originalSrc = Util.coalesce(this.imageEl.originalSrc, '');
			
			if (this.imageEl.originalSrc === this.src){
				
				if (this.imageEl.isError){
					Util.Events.fire(this, {
						type: PhotoSwipe.Image.EventTypes.onError,
						target: this
					});
				}
				else{
					Util.Events.fire(this, {
						type: PhotoSwipe.Image.EventTypes.onLoad,
						target: this
					});
				}
				return;
			}
			
			this.imageEl.isError = false;
			this.imageEl.isLoading = true;
			this.imageEl.naturalWidth = null;
			this.imageEl.naturalHeight = null;
			this.imageEl.isLandscape = false;
			this.imageEl.onload = this.imageLoadHandler;
			this.imageEl.onerror = this.imageErrorHandler;
			this.imageEl.onabort = this.imageErrorHandler;
			this.imageEl.originalSrc = this.src;
			this.imageEl.src = this.src;
			this.imageEl.setAttribute('data-video', video);

		},
		
		
		
		/*
		 * Function: shrinkImage
		 */
		shrinkImage: function(){
		
			if (Util.isNothing(this.imageEl)){
				return;
			}
			
			if (this.imageEl.src.indexOf(this.src) > -1){
				this.imageEl.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
				if (!Util.isNothing(this.imageEl.parentNode)){
					Util.DOM.removeChild(this.imageEl, this.imageEl.parentNode);
				}
			}
		
		},

		/*
		 * Function: onImageLoad
		 */
		onImageLoad: function(e){
			
			this.imageEl.onload = null;
			this.imageEl.naturalWidth = Util.coalesce(
				this.imageEl.naturalWidth,
				this.imageEl.width,
				parseInt(this.imageEl.style.width, 10)
			);
			this.imageEl.naturalHeight = Util.coalesce(
				this.imageEl.naturalHeight,
				this.imageEl.height,
				parseInt(this.imageEl.style.height, 10)
			);

			var newImg = null;

			// If natural width is defined, update isLandscape, isLoading flag, and fire event that image is loaded.
			function onNaturalWidthDefined(img) {
				this.imageEl.naturalWidth = img.naturalWidth;
				this.imageEl.naturalHeight = img.naturalHeight;
				this.imageEl.isLandscape = (this.imageEl.naturalWidth > this.imageEl.naturalHeight);
				this.imageEl.isLoading = false;

				Util.Events.fire(this, {
					type: PhotoSwipe.Image.EventTypes.onLoad,
					target: this
				});
			};

			// Internet explorer can sometimes have naturalWidth / naturalHeight unset at this point
			//  (even though this is the onload event). Quite possible in combination with style.display == block still being active on the image etc.
			// So we simply create another image without any CSS to get the width/height.
			if (isNaN(this.imageEl.naturalWidth) || this.imageEl.naturalWidth === 0) {
				newImg = new Image();
				newImg.src = this.imageEl.src;
				// Wait for image to load
				if (newImg.complete) {
					// Instant ready, nice
					this.imageEl.naturalWidth = newImg.width;
					this.imageEl.naturalHeight = newImg.height;
				}
				else {
					// Not yet ready, use onload to continue processing
					newImg.onload = function() {
						this.imageEl.naturalWidth = newImg.width;
						this.imageEl.naturalHeight = newImg.height;
						onNaturalWidthDefined.bind(this)(this.imageEl);
					};
					return;
				}
			}

			// Normal processing
			onNaturalWidthDefined.bind(this)(this.imageEl);
		},
		
		
		
		/*
		 * Function: onImageError
		 */
		onImageError: function(e){
		
			this.imageEl.onload = null;
			this.imageEl.onerror = null;
			this.imageEl.onabort = null;
			this.imageEl.isLoading = false;
			this.imageEl.isError = true;
			
			Util.Events.fire(this, {
				type: PhotoSwipe.Image.EventTypes.onError,
				target: this
			});
			
		}
		
		
		
	});
	
	
	
}
(
	window, 
	window.klass, 
	window.Code.Util
));
