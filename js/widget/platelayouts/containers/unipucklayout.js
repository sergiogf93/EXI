function UnipuckLayout(args) {
	this.id = BUI.id();
	this.height = 100;
	this.width = this.height;

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
			this.width = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
			this.height = args.width;
		}
	}
}


UnipuckLayout.prototype.renderContainer = function(canvas, centerX, centerY, radius) {
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
	return bigCircle;
};


UnipuckLayout.prototype.render = function(targetId, puck) {
	this.puck = puck;
	/** Rendering layout **/
	document.getElementById(targetId).innerHTML = "";
	document.getElementById(targetId).setAttribute("width", this.width);
	document.getElementById(targetId).setAttribute("height", this.height);

	var canvas = SVG.createSVGCanvas(document.getElementById(targetId), [["width", this.width], ["height", this.height]]);
	var s = Snap(canvas);
	
	var centerX = (this.width/2) - 2;
	var centerY = (this.width/2) - 2;
	var radius = ((this.width/2) - this.width/8) - 5;
	
	
	var container = this.renderContainer(canvas, centerX, centerY, centerX - 4);
	
	
	/** Getting coordinates X and Y **/
	var xValues = [];
	var yValues = [];
	
	/** External circle with 11 positions **/
	for (var i = 0; i < 12; i++) {
	    steps = 11;
	    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
	    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
		
	}
	
	/** Internal circle with 6 positions **/
	for (var i = 11; i < 16; i++) {
	    steps = 5;
	    radius =  (this.width/2) - this.width/3;
	    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
	    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
	}

	this.plateSVG = s.group(container);

	/** Location vs Index array in the view **/
	this.transpose = [16, 15, 14, 13, 12, 1, 11, 10, 9, 8, 7, 6, 5,4, 3, 2];
		
	/** Drawing wells **/
	for (var i = 0; i < 16; i++) {
		var index = this.transpose[i] - 1;
		this.plateSVG.add(this.renderEmptyWell(canvas, xValues[index], yValues[index], i + 1));
	}
	
	for (var j = 0; j < puck.sampleVOs.length; j++) {
		var index = this.transpose[Number(puck.sampleVOs[j].location)-1] - 1;
		this.plateSVG.add(this.renderWell(canvas, xValues[index], yValues[index], (puck.sampleVOs[j].location)));
	}

	this.plateSVG.add(this.drawDecorators(canvas, centerX, centerY));
	this.plateSVG.transform("r-90");

};

UnipuckLayout.prototype.drawDecorators = function(canvas, centerX, centerY, radius) {
	var s = Snap(canvas);
	var radius = this.width/12;
	var center = s.circle(centerX, centerY, radius/2.5);
	center.attr({
	    fill: "#FFFFFF",
	    stroke: "#FFF",
	    strokeWidth: 1
	});

	var up = s.circle(centerX + radius/3, centerY + radius/3, radius/6);
	up.attr({
	    fill: "#FFFFFF",
	    stroke: "#FFF",
	    strokeWidth: 1
	});

	var down = s.circle(centerX + radius/3, centerY - radius/3, radius/6);
	down.attr({
	    fill: "#FFFFFF",
	    stroke: "#FFF",
	    strokeWidth: 1
	});


	var bottom = s.circle(centerX, centerY + this.width/2 - radius/2.5, radius/2.5);
	bottom.attr({
	    fill: "#FFFFFF",
	    stroke: "#FFF",
	    strokeWidth: 1
	});

	var middlebottom = s.circle(centerX, centerY + this.width/4, radius/2.5);
	middlebottom.attr({
	    fill: "#FFFFFF",
	    stroke: "#000",
	    strokeWidth: 1
	});

	return s.group(center, up, down);
};


UnipuckLayout.prototype.load = function(puck) {
	this.puck = puck;
	try{
		/** It may happen that the DIV container has not been rendered yet **/
		this.render(puck);
	}
	catch(e){
		console.log(e);
	}
	
};

UnipuckLayout.prototype.getPanel = function() {
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




UnipuckLayout.prototype._getTopButtons = function() {
	var _this = this;
	var actions = [];

	actions.push(Ext.create('Ext.Action', {
		icon : '../images/icon/edit.png',
		text : 'Edit',
		disabled : false,
		handler : function(widget, e) {
			var containerId = _this.puck.containerId;
			var puckForm = new PuckForm({
				width : 910
			});

			puckForm.onSaved.attach(function(sender, puck){
				_this.load(_this.shipment);
				window.close();
			});
			var window = Ext.create('Ext.window.Window', {
				    title: 'Edit Puck',
				    height: 705,
				    modal : true,
				    resizable : true,
				    layout: 'fit',
				    items: puckForm.getPanel()
				}).show();

			puckForm.load(_this.puck);
		}
	}));
	
	

	return actions;
};













UnipuckLayout.prototype.renderWell = function(canvas, x, y, label) {
	var s = Snap(canvas);
	var radius = this.width/12;
	var well = s.circle(x, y, radius);
	well.attr({
	    fill: "#FA5882",
	    stroke: "#000",
	    strokeWidth: 1
	});


	var text = s.text(x - (radius/2) + 3, y + (radius/2) - 5, label);
	text.transform("r90");
	return s.group(well, text);
};



UnipuckLayout.prototype.renderEmptyPlateWell = function(canvas, x, y, label) {
	var s = Snap(canvas);
	
	var width = (this.width-40)/12;
	var emptyWell = s.rect(x,y, width, width);
	emptyWell.attr({
	    fill: "#FFFFFF",
	    stroke: "#000",
	    strokeWidth: 1
	});
	return s.group(emptyWell);
};


UnipuckLayout.prototype.renderEmptyWell = function(canvas, x, y, label) {
	var s = Snap(canvas);
	var radius = this.width/12;
	var emptyWell = s.circle(x, y, radius);
	emptyWell.attr({
	    fill: "#FFFFFF",
	    stroke: "#000",
	    strokeWidth: 1
	});
	
	var text = s.text(x - (radius/2) + 3, y + (radius/2) - 5, label);
	text.transform("r90");
	return s.group(emptyWell, text);
	
};


