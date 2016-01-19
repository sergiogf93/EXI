/**
 * Edit the information of a buffer
 * 
 * #onRemoveAdditive
 */
function Spine(args) {
	this.id = BUI.id();
	this.height = 500;
	this.width = 500;

	this.isSaveButtonHidden = false;
	this.isHidden = false;

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
		if (args.isSaveButtonHidden != null) {
			this.isSaveButtonHidden = args.isSaveButtonHidden;
		}
		if (args.isHidden != null) {
			this.isHidden = args.isHidden;
		}
		
	}
}


Spine.prototype.load = function(puck) {
	document.getElementById(this.id).setAttribute("style", "height:100px,width:100px;");
	document.getElementById(this.id).innerHTML = "";
	console.log(puck);
	
	
	/** Rendering layout **/

	var canvas = SVG.createSVGCanvas(document.getElementById(this.id), [["width", 100], ["height", 100]])

	var steps = 10;
	var centerX = 50;
	var centerY = 50;
	var radius = 38;
	var xValues = []
	var yValues = []
	
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

Spine.prototype.getPanel = function() {
	this.panel = Ext.create('Ext.panel.Panel', {
		items : [ 
		         {
						html : '<div id=' + this.id +'></div>',
						height : 100,
						width : 100
				 }
		           ] 
		}
	);
	return this.panel;
};

