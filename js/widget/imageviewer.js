function ImageViewer(args){

	this.width = 500;
	this.height = 500;
	this.id = BUI.id();

	/** cordinates to the beam center **/
	this.center = null;
	this.url = null;

	if (args != null){
		if (args.width != null){
			this.width = args.width;
		}
		if (args.height != null){
			this.height = args.height;
		}
	}

	this.selectedPoints = [];


	this.onMouseOver = new Event(this);
	this.onMouseClick = new Event(this);
	this.onMouseDown = new Event(this);
	this.onMouseUp = new Event(this);

}

ImageViewer.prototype.getCanvas = function(url){
	return document.getElementById(this.id);
};

ImageViewer.prototype.getContext = function(url){
	return this.getCanvas().getContext('2d');
};

ImageViewer.prototype.getPanel = function(){
	return '<canvas style="border: 1px solid gray;" id="' + this.id +'" width="' + this.width +'" height="' + this.height +'"></canvas>';
};

ImageViewer.prototype.clear= function(){
	this.getContext().clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
};

ImageViewer.prototype.findPosition = function(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
	do {
	    curleft += obj.offsetLeft;
	    curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return { x: curleft, y: curtop };
    }
    return undefined;
};


ImageViewer.prototype.rgbToHex = function(r, g, b) {
	    if (r > 255 || g > 255 || b > 255){
		throw "Invalid color component";
		}
	    return ((r << 16) | (g << 8) | b).toString(16);
};


ImageViewer.prototype.getCoordinatesInfo = function(obj, e) {
     	var pos = this.findPosition(obj);
    	var x = e.pageX - pos.x;
    	var y = e.pageY - pos.y;
    	var p = this.getContext('2d').getImageData(x, y, 1, 1).data; 
   	var hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
	return {
						x 	: x,
						y 	: y,
						color 	: hex
	};
};

ImageViewer.prototype.getColorLuminance = function(x,y){
	var p = this.getContext('2d').getImageData(x, y, 1, 1).data;
	return Math.floor((0.2126*p[0] + 0.7152*p[1] + 0.0722*p[2]));
};

ImageViewer.prototype.getAllPoints = function(x1, y1, x2, y2){
	if (x1 > x2){
		var aux = x1;
		var auxy = y1;
		x1 = x2;
		x2 =aux;

		y1 = y2;
		y2 =auxy;

	}


	var points = [];
	var ratio = (y2 - y1) / (x2 - x1);
	var width = x2 - x1;
	for(var i = 0; i < width; i++) {
	    var x = x1 + i;
	    var y = y1 + (ratio * i);
	    points.push({x: x, y: y});
	}
	return points;
};

ImageViewer.prototype.drawLine = function(x1, y1, x2, y2, color){
	this.drawPoints(this.getAllPoints(x1, y1, x2, y2), "blue");
	/*
	var _this = this;
	this.clear();
	this.reload(function(){
				var context = _this.getContext();
				context.lineWidth = 1;
				context.strokeStyle = color;
				context.beginPath();
				context.moveTo(x1, y1);
				context.lineTo(x2, y2);
				context.stroke();
	});*/
};

ImageViewer.prototype.drawPoints = function(points, color){
	var _this = this;
	this.clear();
	this.reload(function(){
				var context = _this.getContext();

				for(var i  =0 ; i < points.length; i++){
					var x = points[i].x;
					var y = points[i].y;

					context.beginPath();
	      				context.arc(x, y, 1, 0, 2 * Math.PI, false);
					context.fillStyle = 'rgba(224,0,0,0.2)';
					context.fill();
					context.lineWidth = 1;
					context.strokeStyle = 'rgba(224,0,0,0.2)';
					context.stroke();
				}
				
	});
};


ImageViewer.prototype.drawPoint = function(x, y, color){
	var _this = this;
	this.clear();
	this.reload(function(){
				var context = _this.getContext();
				context.beginPath();
      				context.arc(x, y, 2, 0, 2 * Math.PI, false);
				context.fillStyle = color;
			        context.fill();
			        context.lineWidth = 1;
			        context.strokeStyle = color;
				context.stroke();
	});
};



ImageViewer.prototype.reload = function(f){
	var _this = this;
	var img = new Image();
	img.crossOrigin = "Anonymous";
	img.src = this.url;

	/** Clear context **/
	this.clear();

	img.onload = function() {
		var context = _this.getContext();
		context.drawImage(img, 0, 0, _this.width, _this.height);
		f();

		if (_this.center != null){
			context.strokeStyle = "#990099";
			context.beginPath();
			context.moveTo(_this.center.x, _this.center.y - 10);
			context.lineTo(_this.center.x, _this.center.y + 10);
			context.stroke();
			context.moveTo(_this.center.x - 10, _this.center.y);
			context.lineTo(_this.center.x + 10, _this.center.y);
			context.stroke();
		}
	}
};

ImageViewer.prototype.load = function(url){
	var _this = this;

	/** If not initialized yet **/
	if (this.url == null){
		/** Attaching mouse over event **/
		$('#' + _this.id).mousemove(function(e) {
			_this.onMouseOver.notify(_this.getCoordinatesInfo(this, e));
		});

		$('#' + _this.id).click(function(e) {
	 		_this.onMouseClick.notify(_this.getCoordinatesInfo(this, e));
		});

		$('#' + _this.id).mouseup(function(e) {
	 		_this.onMouseUp.notify(_this.getCoordinatesInfo(this, e));
		});

		$('#' + _this.id).mousedown(function(e) {
	 		_this.onMouseDown.notify(_this.getCoordinatesInfo(this, e));
		});
	}

	this.url = url;

	
	var img = new Image();
	img.crossOrigin = "Anonymous";
	img.src = url;

	/** Clear context **/
	this.clear();

	img.onload = function() {
		var context = _this.getContext();
		context.drawImage(img, 0, 0, _this.width, _this.height);

		/** Drawing center beam **/
		if (_this.center != null){
			context.strokeStyle = "#990099";
			context.beginPath();
			context.moveTo(_this.center.x, _this.center.y - 10);
			context.lineTo(_this.center.x, _this.center.y + 10);
			context.stroke();
			context.moveTo(_this.center.x - 10, _this.center.y);
			context.lineTo(_this.center.x + 10, _this.center.y);
			context.stroke();
		}
	};
};

