function SampleChangerWidget () {
	
	this.pucks = {};
	
}

/**
* Create certain types of pucks following a circular path
*
* @method createPucks
* @param {Integer} puckType The type of puck (1 is Uni, 2 is Spine)
* @param {Integer} n The number of pucks
* @param {Double} initAlpha Initial angle where to start to add pucks
* @param {Double} dist The distance to the center of the puck where the cells are positioned
* @param {Double} marginPercent Factor to control the separation between cells
* @param {Object} args Extra information for add pucks like a second row of pucks by defining a dAlpha and a new dist
*/
SampleChangerWidget.prototype.createPucks = function (puckType, n, initAlpha, dist, marginPercent, args) {
	var rad = dist*Math.sin((Math.PI/this.data.cells)*marginPercent);
	this.pucks[puckType] = [];
	for (var i = 0 ; i < n ; i++) {
		var ang = i*2*Math.PI/n;
		var cx = dist*Math.sin(initAlpha + ang) + this.data.radius - rad;
		var cy = -dist*Math.cos(initAlpha + ang) + this.data.radius - rad;
		this.pucks[puckType].push(new PuckWidgetContainer({puckType : puckType, mainRadius : rad, x : cx , y : cy}));
		
		if (args) {
			if (args.dAlpha != null && args.dist != null){
				cx = args.dist*Math.sin(initAlpha + ang + args.dAlpha) + this.data.radius - rad;
				cy = -args.dist*Math.cos(initAlpha + ang + args.dAlpha) + this.data.radius - rad;
				this.pucks[puckType].push(new PuckWidgetContainer({puckType : puckType, mainRadius : rad, x : cx , y : cy}));
				
				cx = args.dist*Math.sin(initAlpha + ang - args.dAlpha) + this.data.radius - rad;
				cy = -args.dist*Math.cos(initAlpha + ang - args.dAlpha) + this.data.radius - rad;
				this.pucks[puckType].push(new PuckWidgetContainer({puckType : puckType, mainRadius : rad, x : cx , y : cy}));
			}
		}
	}
}

SampleChangerWidget.prototype.getPanel = function () {
	
	var _this = this;
	
	this.panel =  Ext.create('Ext.panel.Panel', {
			margin : 20,
		   // cls:'border-grid',
		    layout:'absolute',
            items : [
						{
							html : this.getStructure(),
							frame: false,
							border: false,
							bodyStyle: 'background:transparent;'
						}
			],
			
	});
	
	return this.panel;
	
}

SampleChangerWidget.prototype.load = function (data) {
	var items = [];
	for (puckType in this.pucks) {
		for (puck in this.pucks[puckType]){
			items.push(this.pucks[puckType][puck].getPanel());
		}
	}
	this.panel.add(items);
}


SampleChangerWidget.prototype.getStructure = function () {
	var html = "";
	dust.render("structure.sampleChanger.template", this.data, function(err, out){
		html = out;
	});
	
	return html;
}