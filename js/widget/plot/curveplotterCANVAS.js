//function CurvePlotter() {
//	
//	this.left = 40;
//	this.right = 30;
//	this.top = 50;
//	this.bottom = 50;
//
//	this.backgroundColor = "#FFFFFF";
//	
//	this.ruleColor ="black";
//	this.targetId = "plotCanvas";
//	
//	
//	/** Zooming and translation **/
//	this.translatePos = {
//             x: 0,
//             y: 0
//         };
//
//     this.scale = 1.0;
//     this.scaleMultiplier = 0.8;
//     this.startDragOffset = {};
//     this.mouseDown = false;
//
//     /** DOT, LINE **/
//     this.drawAs = "DOT";
//}
//
//CurvePlotter.prototype.getPanel = function() {
//	var _this = this;
//	this.plotPanel = Ext.create('Ext.container.Container', {
//	    layout: {
//	        type: 'hbox'
//	    },
//	    flex : 0.7,
//	    border: 1,
//	    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
//	    margin : 10,
//	    defaults: {
//	        style: {
//	            padding: '10px'
//	        }
//	    },
//	    items: [{
//	    	html : '<canvas id="' + this.targetId +'" width="2000" height="2000"></canvas>',
//	    	style :' background:#E6E6E6;',
//	    	flex : 1,
//	    	border : 1
//	    }]
//	});
//	
//	this.plotPanel.on("afterrender", function(){
////		_this.translatePos = {
////                x: document.getElementById(_this.targetId).getAttribute("width") / 2,
////                y: document.getElementById(_this.targetId).getAttribute("height") / 2
////            };
//	});
//	
//	this.plotPanel.on("resize", function(){
//	});
//	return this.plotPanel;
//};
//
//CurvePlotter.prototype.getMaxAndMin = function(data) {
//	var maxX = -100000;
//	var minX = 1000000;
//	var maxY = -100000;
//	var minY = 100000;
//	for (var i = 0; i < data.length; i++) {
//		for (var j = 0; j < data[i].length; j++) {
//			var point = data[i][j];
//			if (maxX < point[0]) {
//				maxX = point[0];
//			}
//			if (minX > point[0]) {
//				minX = point[0];
//			}
//			if (maxY < point[1]) {
//				maxY = point[1];
//			}
//			if (minY > point[1]) {
//				minY = point[1];
//			}
//		}
//	}
//	return {
//		maxX : maxX,
//		minX : minX,
//		maxY : maxY,
//		minY : minY
//		
//	};
//	return {
//		maxX : 0.5,
//		minX : 0,
//		maxY : 4,
//		minY : 3.5
//		
//	};
//};
//
//CurvePlotter.prototype.calculatePointCoordinates = function(point) {
//	var localHeight = this.height - (this.bottom + this.top);
//	var localWidth = this.width - (this.left + this.right);
//	
//	return {
//		x : this.left + (point[0]/ (this.limits.maxX)) * localWidth,
////		y : this.top + localHeight - ((((point[1]-this.limits.minY) / (this.limits.maxY-this.limits.minY)) * localHeight)) 
//		y : this.top + localHeight - ((((point[1]-this.limits.minY) * localHeight / (this.limits.maxY-this.limits.minY)))) 
//		
//	};
//};
//
//CurvePlotter.prototype.doHorizontalRule = function() {
//	var canvas = document.getElementById(this.targetId);
//	this.ctx = canvas.getContext("2d");
//	this.ctx.fillStyle = this.ruleColor;
//	/** Horizontal lines **/
//	for (var i = Math.floor(this.limits.minY); i < this.limits.maxY; i++) {
//		var point = this.calculatePointCoordinates([0, i], this.limits);
//		if (point.y < this.height - this.bottom){
////			this.drawLine(this.left - 10, point.y, this.left,point.y, this.ruleColor);
//			this.drawLine(this.left,point.y, this.width - this.right,point.y, this.ruleColor);
//			this.drawText(i, this.left - 20, point.y + 2, "9px Georgia");
//		}
//	}
//	
//	/** Small line in 0.5 points **/
//	for (var i = Math.floor(this.limits.minY) + 0.5; i < this.limits.maxY; i++) {
//		var point = this.calculatePointCoordinates([0, i], this.limits);
//		this.drawLine(this.left - 3, point.y, this.left,point.y, this.ruleColor);
//	}
//	
//	/** Drawing axis X **/
//	var point0 = this.calculatePointCoordinates([0,0], this.limits);
//	this.drawLine(point0.x, point0.y,  this.calculatePointCoordinates([this.limits.maxX,this.limits.maxY], this.limits).x, point0.y, this.ruleColor);
//	this.drawLine(this.left, this.height - this.bottom, this.width - this.right, this.height - this.bottom, this.ruleColor);
//	
//	
//};
//
//CurvePlotter.prototype.doVerticalRule = function() {
//	var canvas = document.getElementById(this.targetId);
//	this.ctx = canvas.getContext("2d");
//	this.ctx.fillStyle = this.ruleColor;
//	
//	for (var i = Math.floor(this.limits.minX); i < this.limits.maxX; i++) {
//		var point = this.calculatePointCoordinates([i, 0], this.limits);
//		this.drawText(i,point.x,  this.height - this.bottom + 20, "9px Georgia");
//		/** Dotted line **/
////		this.ctx.beginPath();
////		this.ctx.setLineDash([2]);
////		this.ctx.lineTo(point.x, this.top);
////		this.ctx.strokeStyle = this.ruleColor;
////		this.ctx.stroke();
////		this.ctx.setLineDash([0]);
//		
//	}
//	
//	for (var i = Math.floor(this.limits.minX) + 0.5; i < this.limits.maxX; i++) {
//		var point = this.calculatePointCoordinates([i, 0], this.limits);
//		this.drawLine(point.x, this.height - this.bottom, point.x, this.height - this.bottom + 10, this.ruleColor);
//		this.drawText(i, point.x - 5,  this.height - this.bottom + 20, "9px Georgia");
//	}
//	
//	/** Drawing axis Y **/
//	var point0 = this.calculatePointCoordinates([0,Math.floor(this.limits.minY)], this.limits);
//	this.drawLine(this.left, this.top, this.left, this.height - this.bottom, this.ruleColor);
//	
//};
//
//CurvePlotter.prototype.doRule = function() {
//	this.doVerticalRule();
//	this.doHorizontalRule();
//};
//
//CurvePlotter.prototype.applyOperation = function(data) {
//	for (var i = 0; i < data.length; i++) {
//		for (var j = 0; j < data[i].length; j++) {
//			var y  = data[i][j][1];
//			var error = data[i][j][2];
//			var minus = y- error;
//			var max = y + error;
//			data[i][j].upperError = Math.log(Math.abs(max));
//			data[i][j].lowerError = Math.log(Math.abs(minus));
//			data[i][j][1] = Math.log(y);
//		}
//	}
//	return data;
//};
//
//CurvePlotter.prototype.getColor = function(metaData) {
//	if (metaData.type == "frame"){
//		return "gray";
//	}
//	if (metaData.type == "sampleaverage"){
//		return "green";
//	}
//	if (metaData.type == "bufferaverage"){
//		return "blue";
//	}
//	if (metaData.type == "subtraction"){
//		return "red";
//	}
//};
//
//CurvePlotter.prototype.drawPoint= function(x,y,radius, color) {
//		x = Math.round(x) + 0.5;
//		y = Math.round(y) + 0.5;
//		if (y < this.height - this.bottom){
//		  this.ctx.beginPath();
//		  this.ctx.strokeStyle = color;
//		  this.ctx.fillStyle = color;
//		  this.ctx.arc(x, y, 0.1, 0, 2*Math.PI);
//		  this.ctx.stroke();
//		  this.ctx.fill();
////		  this.ctx.closePath();
//		}
//};
//
//CurvePlotter.prototype.drawLine= function(x1,y1,x2, y2, color) {
//		x1 = Math.round(x1) + 0.5;
//		x2 = Math.round(x2) + 0.5;
//		y1 = Math.round(y1) + 0.5;
//		y2 = Math.round(y2) + 0.5;
//
//	    this.ctx.fillStyle = color;
//	    this.ctx.strokeStyle = color;
//
//	    this.ctx.beginPath();
//	    this.ctx.moveTo(x1, y1); 
//	    this.ctx.lineTo(x2, y2);
//	    this.ctx.lineWidth = 1;
//	    this.ctx.stroke();
//	    this.ctx.closePath(); 
//};
//
//CurvePlotter.prototype.drawText= function(text, x,y,font) {
//	/** Writting text **/
//	this.ctx.font = font;
//	this.ctx.fillText(text, x, y);
//};
//
//
//CurvePlotter.prototype.drawDataPoint = function(dataPoint, color) {
//	
//	/** Upper Error **/
////	this.ctx.fillStyle = 'red';
//	var coordinates = this.calculatePointCoordinates([dataPoint[0], dataPoint[1]], this.limits);
//	this.drawPoint(coordinates.x, coordinates.y, 1, color);
//	
////	
////	/** Lower Error **/
////	var coordinatesLower = this.calculatePointCoordinates([dataPoint[0], dataPoint.lowerError], this.limits);
////	this.ctx.strokeStyle = 'red';
////	this.ctx.fillRect(coordinatesLower.x, coordinatesLower.y,2,1);
////	this.ctx.fill();
////	
//////	/** Line **/
////	this.ctx.beginPath();
////	this.ctx.strokeStyle = 'red';
////	this.ctx.moveTo(coordinatesLower.x, coordinatesLower.y);
////	this.ctx.lineTo(coordinates.x, coordinates.y);
////	this.ctx.stroke();
//	
//};
//
//CurvePlotter.prototype.load = function(data) {
//	this.data = data;
//	this.width = this.plotPanel.getWidth();
//	this.height = this.plotPanel.getHeight();
//	document.getElementById(this.targetId).setAttribute("height", this.plotPanel.getHeight());
//	document.getElementById(this.targetId).setAttribute("width", this.plotPanel.getWidth());
//	
//	var _this = this;
//	var canvas = document.getElementById(this.targetId);
//	
//	/** listeners **/
////	 canvas.addEventListener("mousedown", function(evt){
////		 debugger
////         _this.mouseDown = true;
////         _this.startDragOffset.x = evt.clientX - _this.translatePos.x;
////         _this.startDragOffset.y = evt.clientY - _this.translatePos.y;
////         /** left click **/
////         if (evt.button == 0){
////        	 console.log(evt.layerX + " " + evt.layerY )
////         }
////         _this.scale = _this.scale + 0.11; 
////         _this.render(_this.parsed);
//        
////     });
////	 
////	  canvas.addEventListener("mouseup", function(evt){
////          _this.mouseDown = false;
////      });
////
////      canvas.addEventListener("mouseover", function(evt){
////          _this.mouseDown = false;
////         
////      });
////
////      canvas.addEventListener("mouseout", function(evt){
////          _this.mouseDown = false;
////      });
////
////      canvas.addEventListener("mousemove", function(evt){
////          if (_this.mouseDown) {
////        	  console.log(_this.startDragOffset.x);
////              _this.translatePos.x = evt.clientX - _this.startDragOffset.x;
////              _this.translatePos.y = evt.clientY - _this.startDragOffset.y;
////              
////              
////          }
////      });
//
//      
//	 
//	
//	this.parsed = this.applyOperation(JSON.parse(JSON.stringify(data.data)));
//	this.render(this.parsed);
//
//};
//
//CurvePlotter.prototype.plotAsLine = function(points, color) {
//	if (points.length > 0){
//		var coordinates = this.calculatePointCoordinates(points[0]);
//		this.ctx.moveTo(coordinates.x, coordinates.y);
//	}
//	this.ctx.beginPath();
//	for (var j = 1; j < points.length; j++) {
//		var coordinates = this.calculatePointCoordinates(points[j]);
//		this.ctx.lineWidth = 1;
//		this.ctx.strokeStyle = color;
//		this.ctx.lineTo(coordinates.x, coordinates.y);
//		this.ctx.stroke();
//	}
//	this.ctx.closePath();
//};
//
//CurvePlotter.prototype.render = function(parsed) {
//	var canvas = document.getElementById(this.targetId);
//	this.ctx = canvas.getContext("2d");
//	this.ctx.clearRect(0, 0, this.plotPanel.getWidth(),this.plotPanel.getHeight());
//	
//    
//	this.ctx.fillStyle = this.backgroundColor;
//	this.ctx.fillRect(0,0,this.plotPanel.getWidth(),this.plotPanel.getHeight());
//	
////	this.ctx.scale(this.scale, this.scale);
//	
////	this.parsed = [[[0,0,1], [1,-1,1], [2,2,1], [3,3,1], [4,-40,1] ]];
//	this.parsed = parsed;
//	
//	/** Calculate limits of the plot, maxX, minX and maxY, minY **/
//	this.limits = this.getMaxAndMin(this.parsed);
//	
//	for (var i = 0; i < this.parsed.length; i++) {
//		var color = this.getColor(this.data.X[i]);
//		/** Each file **/
//		if (this.drawAs == "DOT"){
//			for (var j = 0; j < this.parsed[i].length; j++) {
//				this.drawDataPoint(this.parsed[i][j], color);
//			}
//		}
//		if (this.drawAs == "LINE"){
//			this.plotAsLine(this.parsed[i], color)
//		}
//	}
//	this.doRule();
//};