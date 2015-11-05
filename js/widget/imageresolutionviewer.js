function ImageResolutionViewer(){
	this.ratio = 4;
	this.canvasWidth = 1475/this.ratio;
	this.canvasHeight = 1679/this.ratio;

	this.zoomFactor = 12;
	this.canvasZoomWidth = 1475/this.ratio;
	this.canvasZoomHeight = 1679/this.ratio;

	this.selectedPoints = [];

	/** where the beam center translated to the jpeg image is **/
	this.localCenter = null;

	var _this = this;
	this.image = new ImageViewer({
		width 	: this.canvasWidth,
		height 	: this.canvasHeight
	});

	this.image.onMouseOver.attach(function(sender, point){

		/** Filling stats **/
		var real = _this.getRealCoordinates(point.x, point.y);
		_this.setSpanTag("coordinates", point.x + "px<br / >" + point.y + "px");
		_this.setSpanTag("realcoordinates", real.x + "<br />" + real.y);
		_this.setSpanTag("color", "<div style='height:40px;width:40px;background-color:" + point.color +"'></div>");

		/** Getting distances to center **/
		_this.setSpanTag("localdistance", Math.floor(_this.getDistance(_this.localCenter, point)) + "px");
		_this.getResolution(point.x, point.y);


		/** luminance **/
		_this.setSpanTag("luminance", _this.image.getColorLuminance(point.x, point.y));

		
	});

	this.image.onMouseDown.attach(function(sender, point){
	});

	this.image.onMouseUp.attach(function(sender, point){
	});

	this.image.onMouseClick.attach(function(sender, point){
		_this.selectedPoints.push({
			x : point.x,
			y : point.y
		});
		if (_this.selectedPoints.length == 2){
			

			/** Printing scale plot gray **/
			var points = _this.image.getAllPoints(_this.selectedPoints[0].x, _this.selectedPoints[0].y, _this.selectedPoints[1].x, _this.selectedPoints[1].y);
			var luminance = [];
			for(var i = 0; i< points.length; i++){
				luminance.push({
							luminance 	 : _this.image.getColorLuminance(points[i].x, points[i].y),
							x		 : points[i].x,
							y		 : points[i].y

						});

			}
			
			_this.grayScalePlot.load(luminance);
			/** Drawing line **/
			_this.image.drawLine(_this.selectedPoints[0].x, _this.selectedPoints[0].y, _this.selectedPoints[1].x, _this.selectedPoints[1].y, "blue");

			_this.selectedPoints = [];


		}
		if (_this.selectedPoints.length == 1){
			_this.image.drawPoint(_this.selectedPoints[0].x, _this.selectedPoints[0].y, "#CC3399");
		}
	});

	this.grayScalePlot = new GrayScalePlot({width : this.canvasWidth});
}


ImageResolutionViewer.prototype.getPanel = function(){
	return	{
			xtype : 'container',
			layout : 'hbox',
			items : [
					{
						xtype : 'container',
						layout : 'vbox',
						items : [
							 {
					 			html : this.image.getPanel(),
								margin : '10 0 0 20'
					 		},
							{
								html : this.grayScalePlot.getPanel(),
								margin : '0 0 0 20'
							},
							 {
					 			html : '<div style="width:800px; height:200px;" id="calc"></div>',
								margin : '0 0 0 20'
					 		}

						]

					},

					
	
					 
					// {
					// 	html : '<canvas style="border: 1px solid gray;" id="example_zoom" width="'+ this.canvasZoomWidth +'" height="' + this.canvasZoomHeight +'"></canvas><br />',
					//	margin : '0 0 0 20'
					// }


					
			]
	 };

};

ImageResolutionViewer.prototype.makeHTMLTable = function(title, buttons, headers, data, args) {
	var width = 610;
	if (args != null){
		if (args.with != null){
			width = args.with;
		}
	}	


	var html = "<table>";
	if (headers != null){
		html = html + "<tr class='th-component'>";
		for(var i =0 ; i< headers.length; i++){
			html = html + "<th style='width:30px;'>";
			html = html + headers[i];
			html = html + "</th>";

		}

		html = html + "</tr>";
	}


	if (data != null){
		for(var i =0 ; i< data.length; i++){
			html = html + "<tr>";
			for(var j =0 ; j< data[i].length; j++){
				html = html + "<td>" + data[i][j] + "</td>";
			}
			html = html + "</tr>";

		}


	}
	html = html + "</table>";

	if (title != null){
		html = '<div  class="header-component-table" >' + title +'</div><div  style="margin:0px 0px 0px 0px !important;width:' + width +'px;">' + html + '</div>';
	}
	return html; 
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


ImageResolutionViewer.prototype.getCanvas = function(url){
	return document.getElementById('example');
};


ImageResolutionViewer.prototype.getContext = function(url){
	return this.getCanvas().getContext('2d');
};


ImageResolutionViewer.prototype.getZoomCanvas = function(url){
	return document.getElementById('example_zoom');
};

ImageResolutionViewer.prototype.getZoomContext = function(url){
	return this.getZoomCanvas().getContext('2d');
};

/** Sort the points first with the larger Y **/
ImageResolutionViewer.prototype.sortSelectedPoints= function(){
	/*var points = [];
	if (this.selectedPoints[0].x > this.selectedPoints[1].x){
		return [this.selectedPoints[0], this.selectedPoints[1]];
	}
	return [this.selectedPoints[1], this.selectedPoints[0]];*/
	var minX = this.selectedPoints[0].x;
 	var maxX = this.selectedPoints[0].x;

	var minY = this.selectedPoints[0].y;
	var maxY = this.selectedPoints[0].y;

	if (this.selectedPoints[1].x < minX){
		minX = this.selectedPoints[1].x;
	}

	if (this.selectedPoints[1].y < minY){
		minY = this.selectedPoints[1].y;
	}

	if (this.selectedPoints[1].y > maxY){
		maxY = this.selectedPoints[1].y;
	}

	if (this.selectedPoints[1].x > maxX){
		maxX = this.selectedPoints[1].x;
	}
	
	return [{x:minX, y:minY}, {x:maxX, y:maxY}];

};


ImageResolutionViewer.prototype.loadZoom = function(url, points){
	var img = new Image();
	img.crossOrigin = "Anonymous";
	img.src = url;

	console.log(points);
	points = this.sortSelectedPoints();
	console.log(points);
	/** Clear context **/
	this.getZoomContext().clearRect(0, 0, this.getZoomCanvas().width, this.getZoomCanvas().height);

	var to = points[0];
	var from = points[1];

	var height = Math.abs(to.y - from.y);
	var width = Math.abs(to.x - from.x);

	/** Making bigger the frame **/	


	var resolution = 0;
	if (height > width){
		resolution = this.canvasHeight/height;
	}
	else{
		resolution = this.canvasWidth/width;
	}

	var newImageSize = resolution*this.canvasWidth;
	var context = this.getZoomContext();
	context.drawImage(img, -points[0].x*resolution, points[0].y*resolution, newImageSize, newImageSize);
};

ImageResolutionViewer.prototype.loadOneZoom = function(url, point){
	var img = new Image();
	img.crossOrigin = "Anonymous";
	img.src = url;

	/** Clear context **/
	this.getZoomContext().clearRect(0, 0, this.getZoomCanvas().width, this.getZoomCanvas().height);

	var newImageSizeWidth = this.zoomFactor * this.canvasWidth;
	var newImageSizeHeight = this.zoomFactor * this.canvasHeight;
	console.log(point);

	console.log( -point.x*this.zoomFactor + " " +  -point.y*this.zoomFactor);
	this.getZoomContext().drawImage(img, -point.x*this.zoomFactor, -point.y*this.zoomFactor, newImageSizeWidth, newImageSizeHeight);
};



ImageResolutionViewer.prototype.loadImage = function(url){
	var _this = this;
	var img = new Image();
	img.crossOrigin = "Anonymous";
	img.src = url;
	/** Clear context **/
	_this.getContext().clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);

	img.onload = function() {
		var context = _this.getContext();
		context.drawImage(img, 0, 0, _this.canvasWidth, _this.canvasHeight);
		context.strokeStyle = "#FF0066";
		context.lineWidth=2;

		/** Drawing points **/
		for (var i =0; i < _this.selectedPoints.length; i++){
			context.lineWidth=1;
			var x = _this.selectedPoints[i].x ;
			var y = _this.selectedPoints[i].y;
			/*context.beginPath();
			context.arc(x,y,2,0,2*Math.PI);
   	    		context.stroke();*/

			context.lineWidth=2;
			context.moveTo(x, y);
			context.lineTo(x + (_this.canvasZoomWidth/_this.zoomFactor), y);
			context.lineTo(x + (_this.canvasZoomWidth/_this.zoomFactor), y + (_this.canvasZoomHeight/_this.zoomFactor));
			context.lineTo(x, y + (_this.canvasZoomHeight/_this.zoomFactor));
			context.lineTo(x, y);

			context.stroke();
		}

		if (_this.selectedPoints.length == 1){
			_this.loadOneZoom(url, _this.selectedPoints[0]);
			_this.selectedPoints = [];
		}
		
		/** If two points selected then we make the line **/
		if (_this.selectedPoints.length == 2){
			var from = _this.selectedPoints[0];
			var to = _this.selectedPoints[1];
			/*context.beginPath();
			context.moveTo(from.x, from.y);
			context.lineTo(to.x, to.y);
			context.stroke();*/
		
			context.lineWidth=2;
			context.moveTo(from.x, from.y);
			context.lineTo(from.x, to.y);
			context.stroke();

			context.moveTo(to.x, from.y);
			context.lineTo(from.x, from.y);
			context.stroke();

			context.moveTo(to.x, to.y);
			context.lineTo(to.x, from.y);
			context.stroke();

			context.moveTo(from.x, to.y);
			context.lineTo(to.x, to.y);
			context.stroke();

			/** Refreshing zoom **/
			_this.loadZoom(url,  _this.selectedPoints);
		}

		/** Drawing center beam **/
		var center = _this.getCenterBeam();
		context.strokeStyle = "#990099";
		context.beginPath();
		context.moveTo(center.x, center.y - 10);
		context.lineTo(center.x, center.y + 10);
		context.stroke();
		context.moveTo(center.x - 10, center.y);
		context.lineTo(center.x + 10, center.y);
		context.stroke();
	};
};

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


ImageResolutionViewer.prototype.load = function(url, waveLength, detectorDistance, xBeam, yBeam, detectorResolution){
	this.detectorResolution = detectorResolution;
	this.waveLength = waveLength;
	this.detectorDistance = detectorDistance;
 	this.xBeam = xBeam;
	this.yBeam = yBeam;

	this.localCenter = this.getLocalCoordinates(xBeam, yBeam, detectorResolution.sensitiveArea.x, detectorResolution.sensitiveArea.y);

	this.realCenter = this.getRealCoordinates(this.localCenter.x, this.localCenter.y);
	/** Loading image **/
	this.image.center = this.localCenter;
	this.image.load(url);



	this.displayTable();
	this.setSpanTag("wavelength", waveLength);
	this.setSpanTag("centerbeam", Math.floor(xBeam) + "<br/>" + Math.floor(yBeam));

	this.setSpanTag("realcenterbeam", Math.floor(this.realCenter.x) + "<br/>" + Math.floor(this.realCenter.y));

	this.setSpanTag("localcenterbeam", this.localCenter.x + "<br/>" + this.localCenter.y);
	this.setSpanTag("detectordistance", detectorDistance);
	
	
	

/*
	this.loadImage(url);


 
	
	function findPos(obj) {
	    var curleft = 0, curtop = 0;
	    if (obj.offsetParent) {
		do {
		    curleft += obj.offsetLeft;
		    curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return { x: curleft, y: curtop };
	    }
	    return undefined;
	}

	function rgbToHex(r, g, b) {
	    if (r > 255 || g > 255 || b > 255){
		throw "Invalid color component";
		}
	    return ((r << 16) | (g << 8) | b).toString(16);
	}
	var context = _this.getContext();

	$('#example').mousemove(function(e) {
	    var pos = findPos(this);
	    var x = e.pageX - pos.x;
	    var y = e.pageY - pos.y;
	    var coord = "x=" + x + ", y=" + y;
	    var c = this.getContext('2d');
	    var p = c.getImageData(x, y, 1, 1).data; 
	    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

	    _this.displayTable(x, y, _this.getRealCoordinates(x, y), hex, waveLength, detectorDistance, xBeam, yBeam, _this.getDistance(_this.getRealCenterBeam(),  _this.getRealCoordinates(x, y)), _this.getResolution(x,y));

	});

	$('#example').click(function(e) {
	     var pos = findPos(this);
	     var x = e.pageX - pos.x;
	     var y = e.pageY - pos.y;

	    if (_this.selectedPoints.length == 2){
	    		_this.selectedPoints = [];

	    }	   
	   
	     if (_this.selectedPoints.length < 2){
		     _this.selectedPoints.push({x: x, y: y});

	     }
              if (_this.selectedPoints.length == 2){

	     }
	     _this.loadImage(url);
	    
		
		
	});*/
};
