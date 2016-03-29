function PuckLayout(args) {
	this.id = BUI.id();
	this.height = 100;
	this.width = this.height;
	this.tbar = true;
	
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
			this.width = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
			this.height = args.width;
		}
		if (args.tbar != null) {
			this.tbar = args.tbar;
		}
		
	}
}

PuckLayout.prototype.renderAsSpine = function(puck) {
	/** Rendering layout **/
	document.getElementById(this.id).innerHTML = "";
	document.getElementById(this.id).setAttribute("width", this.width);
	document.getElementById(this.id).setAttribute("height", this.height);
	
	var canvas = SVG.createSVGCanvas(document.getElementById(this.id), [["width", this.width], ["height", this.height]])
	var steps = 10;
	var centerX = this.width/2;
	var centerY = this.width/2;
	var radius = (this.width/2) - this.width/8;
	
	
	this.renderContainer(canvas, centerX, centerY, centerX - 4);
	
	var xValues = [];
	var yValues = [];
	
	for (var i = 0; i < steps; i++) {
	    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
	    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
	    this.renderEmptyWell(canvas, xValues[i], yValues[i], (i+1));
		
	}
	
	for (var j = 0; j < puck.sampleVOs.length; j++) {
		var index = Number(puck.sampleVOs[j].location)-1;
		
		this.renderWell(canvas, xValues[index], yValues[index], (puck.sampleVOs[j].location));
	}
};


PuckLayout.prototype.renderEmptyPlateWell = function(canvas, x, y, label) {
	var s = Snap(canvas);
	
	var width = (this.width-40)/12;
	var emptyWell = s.rect(x,y, width, width);
	emptyWell.attr({
	    fill: "#FFFFFF",
	    stroke: "#000",
	    strokeWidth: 1
	});
	
};


PuckLayout.prototype.renderEmptyWell = function(canvas, x, y, label) {
	var s = Snap(canvas);
	var radius = this.width/12;
	var emptyWell = s.circle(x, y, radius);
	emptyWell.attr({
	    fill: "#FFFFFF",
	    stroke: "#000",
	    strokeWidth: 1
	});
	
	s.text(x - (radius/2), y + (radius/2), label);
	
};

PuckLayout.prototype.renderPlateContainer = function(canvas, width, height) {
	var _this = this;
	var s = Snap(canvas);
	var bigCircle = s.rect(0,0, width, height);
	bigCircle.attr({
	    fill: "#585858",
	    stroke: "#000",
	    strokeWidth: 1
	});
	
	function selectSVG(){
		//bigCircle.animate({cy: 300}, 5000,mina.bounce);
		//bigCircle.animate({fill:"red"},200);
		bigCircle.attr({
		    fill: "#D8D8D8",
		    stroke: "#000",
		    strokeWidth: 1
		});
	};
	
	function deselectSVG(){
		bigCircle.attr({
		    fill: "#585858",
		    stroke: "#000",
		    strokeWidth: 1,
		    cursor: 'pointer'
		});
	};
	
	function clickSVG(){
		location.hash = '#/mx/puck/' + _this.puck.containerId + '/main'; 
	};
	
	bigCircle.mouseover( selectSVG );
	bigCircle.mouseout( deselectSVG );
	bigCircle.click( clickSVG );
	
};


PuckLayout.prototype.renderContainer = function(canvas, centerX, centerY, radius) {
	var _this = this;
	var s = Snap(canvas);
	var bigCircle = s.circle(centerX, centerY, centerX - 4);
	bigCircle.attr({
	    fill: "#585858",
	    stroke: "#000",
	    strokeWidth: 1
	});
	
	function selectSVG(){
		//bigCircle.animate({cy: 300}, 5000,mina.bounce);
		//bigCircle.animate({fill:"red"},200);
		bigCircle.attr({
		    fill: "#D8D8D8",
		    stroke: "#000",
		    strokeWidth: 1
		});
	};
	
	function deselectSVG(){
		bigCircle.attr({
		    fill: "#585858",
		    stroke: "#000",
		    strokeWidth: 1,
		    cursor: 'pointer'
		});
	};
	
	function clickSVG(){
		location.hash = '#/mx/puck/' + _this.puck.containerId + '/main'; 
	};
	
	bigCircle.mouseover( selectSVG );
	bigCircle.mouseout( deselectSVG );
	bigCircle.click( clickSVG );
	
};



PuckLayout.prototype.renderPlateWell = function(canvas, x, y, label) {
	var s = Snap(canvas);
	var width = (this.width-40)/12;
	var emptyWell = s.rect(x,y, width, width);
	emptyWell.attr({
	    fill: "#FA5882",
	    stroke: "#000",
	    strokeWidth: 1
	});
};



PuckLayout.prototype.renderWell = function(canvas, x, y, label) {
	var s = Snap(canvas);
	var radius = this.width/12;
	var well = s.circle(x, y, radius);
	well.attr({
	    fill: "#FA5882",
	    stroke: "#000",
	    strokeWidth: 1
	});
	s.text(x - (radius/2), y + (radius/2), label);
};


PuckLayout.prototype.renderAsPlate = function(puck) {
	/** Rendering layout **/
	document.getElementById(this.id).innerHTML = "";
	document.getElementById(this.id).setAttribute("width", this.width);
	document.getElementById(this.id).setAttribute("height", this.height);

	var canvas = SVG.createSVGCanvas(document.getElementById(this.id), [["width", this.width], ["height", this.height]]);
	var s = Snap(canvas);
	
	
	this.renderPlateContainer(canvas, this.width, this.height);
	
	
	/** Getting coordinates X and Y **/
	var xValues = [];
	
	var height = this.height/12 ;
	var width = this.width/8 ;
	/** External circle with 10 positions **/
	for (var j = 0; j < 8;j++) {
	    for (var i = 0;i < 12; i++) {
	    	xValues.push( [2 + i*height, 2 +j*width ]);
	    }
	}
	
	for (var i = 0; i < xValues.length; i++) {
		this.renderEmptyPlateWell(canvas, xValues[i][0], xValues[i][1], (i+1));
	}
	
	
	for (var j = 0; j < puck.sampleVOs.length; j++) {
		var index = Number(puck.sampleVOs[j].location)-1;
		this.renderPlateWell(canvas, xValues[index][0], xValues[index][1], (puck.sampleVOs[j].location));
	}
	
};

PuckLayout.prototype.renderAsUnipuck = function(puck) {
	/** Rendering layout **/
	document.getElementById(this.id).innerHTML = "";
	document.getElementById(this.id).setAttribute("width", this.width);
	document.getElementById(this.id).setAttribute("height", this.height);

	var canvas = SVG.createSVGCanvas(document.getElementById(this.id), [["width", this.width], ["height", this.height]]);
	var s = Snap(canvas);
	
	var centerX = (this.width/2) - 2;
	var centerY = (this.width/2) - 2;
	var radius = ((this.width/2) - this.width/8) - 5;
	
	
	this.renderContainer(canvas, centerX, centerY, centerX - 4);
	
	
	/** Getting coordinates X and Y **/
	var xValues = [];
	var yValues = [];
	
	/** External circle with 10 positions **/
	for (var i = 0; i < 11; i++) {
		steps = 10;
	    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
	    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
		
	}
	
	/** Internal circle with 6 positions **/
	for (var i = 10; i < 16; i++) {
		steps = 6;
		radius =  (this.width/2) - this.width/3;
	    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
	    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
	}

	/** Drawing wells **/
	for (var i = 0; i < 16; i++) {
		this.renderEmptyWell(canvas, xValues[i], yValues[i], (i+1));
	}
	
	for (var j = 0; j < puck.sampleVOs.length; j++) {
		var index = Number(puck.sampleVOs[j].location)-1;
		this.renderWell(canvas, xValues[index], yValues[index], (puck.sampleVOs[j].location));
	}
	
};

PuckLayout.prototype.load = function(puck) {
	this.puck = puck;
	try{
		/** It may happen that the DIV container has not been rendered yet **/
		this.render(puck);
	}
	catch(e){
		console.log(e);
	}
	
};
PuckLayout.prototype.render = function(puck) {
	if (this.puck != null){
		/** Unipuck **/
		if (this.puck.capacity == 16){
			this.renderAsUnipuck(this.puck);
		}
		
		/** Spine **/
		if (this.puck.capacity == 10){
			this.renderAsSpine(this.puck);
		}
		
		/** Spine **/
		if (this.puck.capacity == 96){
			this.renderAsPlate(this.puck);
		}
	}
};

PuckLayout.prototype.getPanel = function() {
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
		margin : 10,
		items : [ 
		         {
						html : '<div style="width:' + (this.width + 2) +'px;height:' + (this.height +2) +'px;" id=' + this.id +'></div>'
				 }
		],		
		listeners : {
			afterrender : function(component, eOpts) {
				_this.render();
			}
	    }
	});
	
	return this.panel;
};




