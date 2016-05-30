function ImageResolutionViewer(){
	this.id = BUI.id();

	this.ratio = 3;
	this.canvasWidth = 1475/this.ratio;
	this.canvasHeight = 1679/this.ratio;

	this.canvasZoomWidth = 1475/this.ratio;
	this.canvasZoomHeight = 1679/this.ratio;


	/** How big the zoom is **/
	this.zoomRatio = 5;

	/** where the beam center translated to the jpeg image is **/
	this.localCenter = null;

	var _this = this;

	this.zoom = 1;
	this.offsetX = 0;
	this.offsetY = 0;
	
	this.image = new ImageViewer({
		width 	: this.canvasWidth/this.zoomRatio,
		height 	: this.canvasHeight/this.zoomRatio,
		zoom 	: this.zoom,
		offsetX	: this.offsetX,
		offsetY	: this.offsetY,
		allowLuminance : false
	});

	this.zoomImage = new ImageViewer({
		width 	: this.canvasWidth,
		height 	: this.canvasHeight,
		zoom 	: this.zoom,
		offsetX	: this.offsetX,
		offsetY	: this.offsetY
	});


	this.image.onMouseOver.attach(function(sender, point){
        _this.onMouseOver.notify(point);
		/** Removing offset **/

		/** Filling stats **/

		/*var real = _this.getRealCoordinates(point.x, point.y);
		_this.setSpanTag("coordinates", point.localX + "px<br / >" + point.localY + "px");
		_this.setSpanTag("realcoordinates", real.x + "<br />" + real.y);
		_this.setSpanTag("color", "<div style='height:40px;width:40px;background-color:" + point.color +"'></div>");
*/
		/** Getting distances to center **/
		/*_this.setSpanTag("localdistance", Math.floor(_this.getDistance(_this.localCenter, point)) + "px");
		_this.getResolution(point.x, point.y);
*/

		/** luminance **/
		//_this.setSpanTag("luminance", _this.image.getColorLuminance(point.x, point.y));

		
	});

	this.image.onMouseRightDown.attach(function(sender){
		_this.zoom = 1;
		_this.zoomImage.zoom = _this.zoom;
		_this.zoomImage.offsetX = 0;
		_this.zoomImage.offsetY = 0;
		_this.zoomImage.reload(function(){});
	});

	this.zoomImage.onMouseRightDown.attach(function(sender){
		_this.zoom = 1;
		_this.zoomImage.zoom = _this.zoom;
		_this.zoomImage.offsetX = 0;
		_this.zoomImage.offsetY = 0;
		_this.zoomImage.reload(function(){});
	});

	this.image.onRendered.attach(function(sender){
		_this.onImageRendered.notify(_this.image.getMatrix());
	});

	this.image.onDblClick.attach(function(sender, point){
		point.x = point.x*_this.zoomRatio;
		point.y = point.y*_this.zoomRatio;
		point.localY = point.localY*_this.zoomRatio;
		point.localX = point.localX*_this.zoomRatio;

		_this.zoomImage.applyZoomOnPoint(point, _this.zoom);
		
	});

	this.image.onMouseDown.attach(function(sender, point){
	});

	this.image.onMouseUp.attach(function(sender, point){
	});

	this.image.onMouseClick.attach(function(sender, point){
	});

	this.image.onLuminanceCalculated.attach(function(sender, luminance){
	});

	this.zoomImage.onLuminanceCalculated.attach(function(sender, luminance){
		_this.zoomGrayScalePlot.load(luminance);
	});

	this.zoomImage.onLuminanceReset.attach(function(sender, luminance){
		_this.zoomGrayScalePlot.reset();
	});


	this.zoomGrayScalePlot = new GrayScalePlot({width : this.canvasWidth});

	this.onImageRendered = new Event(this);
    this.onMouseOver = new Event(this);
}

ImageResolutionViewer.prototype.getImagePanel = function(){
	return {
										xtype : 'container',
										layout : 'vbox',
										items : [
											 {
			html : '<div style="height:' + (this.canvasHeight + 45) +'px;background-color: white;position:relative">\
			<div style="height : ' + this.canvasHeight/this.zoomRatio + 'px; width : ' + this.canvasWidth/this.zoomRatio +'px; background-color :white;position:relative;  z-index: 31; right: -10px; top : 40px">'  +  this.image.getPanel() + '</div> \
			<div style=" position:relative;  z-index: 2;  right: 0px; top : -' +  this.canvasWidth/this.zoomRatio +'px">'  +  this.zoomImage.getPanel() + '</div> \
			</div>',
			margin : '-15 0 0 5'

											 }]
	};

};

ImageResolutionViewer.prototype.getPanel = function(){
	return	{
			xtype : 'container',
			layout : 'hbox',
			margin : 10,
			items : [
					{
						xtype : 'container',
						layout : 'vbox',
						width : 600,
					
						items : [
							{
								html : "<div class='key_subgrid'>Double on the thumbnail to zoom IN</div>",
								margin : "5 0 0 20"

							},
							{
								html : "<div class='key_subgrid'>Right-click to zoom OUT</div>",
								margin : "5 0 0 20"

							},
							this.getImagePanel(),		
							{
								html : this.zoomGrayScalePlot.getPanel(),
								margin : '5 0 0 5'
							 },
							 {
					 			html : '<div style="width:800px; height:200px;" id="calc"></div>',
								margin : '0 0 0 20'
					 		}

						]

					}


					
			]
	 };

};
ImageResolutionViewer.prototype.getSpanTag = function(id){
	return "<span id=" + this.id + id +"></span>";
};

ImageResolutionViewer.prototype.setSpanTag = function(id, value){
	document.getElementById(this.id + id).innerHTML = value;
};

ImageResolutionViewer.prototype.displayTable = function(x,y, realCoordinates, color,  waveLength, detectorDistance, xBeam, yBeam, distance, resolution){
	        document.getElementById("calc").innerHTML = this.makeHTMLTable("Coordinates", null, ["local coor",  "Real Coor", "color", "luminance",  "waveLength", "detectorDistance", "Sensitive Center", "Local Center",  "real Center", "Real Distance","Local Distance", "resolution"], 
		[
			[
				this.getSpanTag("coordinates"),
				this.getSpanTag("realcoordinates"),
				this.getSpanTag("color"),
				this.getSpanTag("luminance"),
				this.getSpanTag("wavelength"),
				this.getSpanTag("detectordistance"),
				this.getSpanTag("centerbeam"),
				this.getSpanTag("localcenterbeam"),
				this.getSpanTag("realcenterbeam"),
				this.getSpanTag("distance"),
				this.getSpanTag("localdistance"),
				this.getSpanTag("resolution"),
			]
		], 
		{width : this.canvasWidth});
};



/*

ImageResolutionViewer.prototype.getCenterBeam = function(){
	var x = (this.xBeam/this.detectorResolution.sensitiveArea.x)* this.canvasWidth;
	var y = (this.yBeam/this.detectorResolution.sensitiveArea.y)* this.canvasHeight;
	return {x :x, y : y};
};

ImageResolutionViewer.prototype.getRealCenterBeam = function(){
//	var x = (this.xBeam*this.detectorResolution.pixelSize.x)/this.detectorResolution.sensitiveArea.x;
	var x = (this.xBeam*this.detectorResolution.pixelSize.x)/ this.detectorResolution.sensitiveArea.x;
	var y = (this.yBeam*this.detectorResolution.pixelSize.y)/  this.detectorResolution.sensitiveArea.y;
	return {x :x, y : y};
};

ImageResolutionViewer.prototype.getRealCoordinates = function( x, y){
	var xReal = x*this.detectorResolution.pixelSize.x/this.canvasWidth;
	var yReal =  this.detectorResolution.pixelSize.y - y*this.detectorResolution.pixelSize.y/this.canvasHeight;
	return  { x: Math.floor(xReal), y: Math.floor(yReal)};
};

ImageResolutionViewer.prototype.getLocalCoordinates = function( x, y, width, height){
	var xReal = x*this.canvasWidth/width;
	var yReal =  y*this.canvasHeight/height;
	return  { x: Math.floor(xReal), y: Math.floor(yReal)};
};


ImageResolutionViewer.prototype.getDistance = function(from, point){
	var xs = Math.pow((point.x - from.x), 2);
	var ys = Math.pow((point.y - from.y), 2);
	//return  Math.round(Math.sqrt(xs + ys))* this.detectorResolution.pixelSizeHorizontal;
	return  Math.round(Math.sqrt(xs + ys));
};

ImageResolutionViewer.prototype.getResolution = function(x, y){
	var distance = this.getDistance(this.realCenter, this.getRealCoordinates(x, y));
	var mm = this.getDistance(this.realCenter, this.getRealCoordinates(x, y)) * this.detectorResolution.pixelSizeHorizontal;
	this.setSpanTag("distance", Math.floor(distance) + "px<br />" +   Math.floor(mm) + "mm" );

	var sub = 2 * Math.sin (1/2 * (Math.atan((distance/2)/this.detectorDistance)));
	var res =   (this.waveLength/sub);
	this.setSpanTag("resolution", res );
	return res;
};
*/

ImageResolutionViewer.prototype.getLocalCoordinates = function( x, y, width, height){
	var xReal = x*this.canvasWidth/width;
	var yReal =  y*this.canvasHeight/height;
	return  { x: Math.floor(xReal), y: Math.floor(yReal)};
};

ImageResolutionViewer.prototype.load = function(url, waveLength, detectorDistance, xBeam, yBeam, detectorResolution){
	this.detectorResolution = detectorResolution;
	this.waveLength = waveLength;
	this.detectorDistance = detectorDistance;
 	this.xBeam = xBeam;
	this.yBeam = yBeam;

	this.localCenter = this.getLocalCoordinates(xBeam, yBeam, detectorResolution.sensitiveArea.x, detectorResolution.sensitiveArea.y);

	//this.realCenter = this.getRealCoordinates(this.localCenter.x, this.localCenter.y);
	/** Loading image **/
	//this.image.center = this.localCenter;
	this.image.load(url);


/*
	this.displayTable();
	this.setSpanTag("wavelength", waveLength);
	this.setSpanTag("centerbeam", Math.floor(xBeam) + "<br/>" + Math.floor(yBeam));

	this.setSpanTag("realcenterbeam", Math.floor(this.realCenter.x) + "<br/>" + Math.floor(this.realCenter.y));

	this.setSpanTag("localcenterbeam", this.localCenter.x + "<br/>" + this.localCenter.y);
	this.setSpanTag("detectordistance", detectorDistance);
*/
	this.zoomImage.center = this.localCenter;
	this.zoomImage.load(url);
	
	
	
};
