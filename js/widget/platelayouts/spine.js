/**
 * Edit the information of a buffer
 * 
 * #onRemoveAdditive
 */
function Spine(args) {
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

Spine.prototype.render = function(puck) {
	/** Rendering layout **/
	document.getElementById(this.id).innerHTML = "";
	var canvas = SVG.createSVGCanvas(document.getElementById(this.id), [["width", this.width], ["height", this.height]])
	var steps = 10;
	var centerX = this.width/2;
	var centerY = this.width/2;
	var radius = (this.width/2) - this.width/8;
	var xValues = [];
	var yValues = [];
	
	SVG.drawCircle(centerX, centerY, centerX, canvas, [["fill", "#d9d9d9"]]);
	
	for (var i = 0; i < steps; i++) {
	    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
	    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
		SVG.drawCircle(xValues[i], yValues[i], 10, canvas, [["fill", "white"]]);
		
	}
	
    for (var j = 0; j < puck.sampleVOs.length; j++) {
    	var index = Number(puck.sampleVOs[j].location)-1;
    	SVG.drawCircle(xValues[index], yValues[index], 10, canvas, [["fill", "#737373"]]);
    	SVG.drawText(xValues[index] -5 , yValues[index] +5 , puck.sampleVOs[j].location, canvas, []);
	}
};

Spine.prototype.load = function(puck) {
	this.puck = puck;
	
	/*if (document.getElementById(this.id) != null){
		document.getElementById(this.id).setAttribute("style", "height:100px,width:100px;");
		document.getElementById(this.id).innerHTML = "";
		this.render(this.puck);
	}*/
};

Spine.prototype._getTopButtons = function() {
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


Spine.prototype.getPanel = function() {
	var _this = this;
	
	this.panel = Ext.create('Ext.panel.Panel', {
		margin : 10,
		items : [ 
		         {
						html : '<div id=' + this.id +'></div>'
				 }
		],		
		listeners : {
			afterrender : function(component, eOpts) {
				/*if (_this.puck != null){
						_this.render(_this.puck);
				}*/
			}
	    }
	});
	
	
	this.panel.addDocked({
		height : 45,
		xtype : 'toolbar',
		dock: 'bottom',
		items : _this._getTopButtons(),
		cls : 'exi-top-bar'
	});
	
	
	
	return this.panel;
};

Unipuck.prototype.getPanel = Spine.prototype.Spine;
Unipuck.prototype.load = Spine.prototype.load;
Unipuck.prototype.getPanel = Spine.prototype.getPanel;
Unipuck.prototype._getTopButtons = Spine.prototype._getTopButtons;

function Unipuck(args) {
	Spine.call(this, args);
}


Unipuck.prototype.render = function(puck) {
	/** Rendering layout **/
	var canvas = SVG.createSVGCanvas(document.getElementById(this.id), [["width", this.width], ["height", this.height]])

	var steps = 10;
	var centerX = this.width/2;
	var centerY = this.width/2;
	var radius = (this.width/2) - this.width/10;
	var xValues = [];
	var yValues = [];
	var radiousWell = 8;
	
	SVG.drawCircle(centerX, centerY, centerX, canvas, [["fill", "#d9d9d9"]]);
	
	/** Drawing Wells **/ 
	for (var i = 0; i < steps; i++) {
	    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
	    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
		SVG.drawCircle(xValues[i], yValues[i], radiousWell, canvas, [["fill", "white"]]);
	}
	
	for (var i = 10; i < 16; i++) {
		steps = 6;
		radius = (this.width/3) - this.width/8
	    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
	    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
		SVG.drawCircle(xValues[i], yValues[i], radiousWell, canvas, [["fill", "white"]]);
	}
	
	/** Drawing filled wells **/
    for (var j = 0; j < 16; j++) {
    	if (puck.sampleVOs[j] != null){
    		var index = Number(puck.sampleVOs[j].location)-1;
    		SVG.drawCircle(xValues[index], yValues[index], radiousWell, canvas, [["fill", "#737373"]]);
    	}
    	//SVG.drawText(xValues[index] -5 , yValues[index] +5 , puck.sampleVOs[j].location, canvas, []);
	}
    
    /** Drawing Text  **/
    for (var j = 0; j < 16; j++) {
    	SVG.drawText(xValues[j] -5 , yValues[j] +5 , j+1, canvas, [["font-size", 8]]);
	}
    
    
    
};

