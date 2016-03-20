function SpineLayout(args) {
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

SpineLayout.prototype.render = function(targetId, puck) {
	/** Rendering layout **/
	document.getElementById(this.id).innerHTML = "";
	document.getElementById(this.id).setAttribute("width", this.width);
	document.getElementById(this.id).setAttribute("height", this.height);
	
	var canvas = SVG.createSVGCanvas(document.getElementById(targetId), [["width", this.width], ["height", this.height]])
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



SpineLayout.prototype.load = function(puck) {
	this.puck = puck;
	try{
		/** It may happen that the DIV container has not been rendered yet **/
		this.renderAsSpine(puck);
	}
	catch(e){
		console.log(e);
	}
};

SpineLayout.prototype.getPanel = function() {
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




SpineLayout.prototype._getTopButtons = function() {
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

