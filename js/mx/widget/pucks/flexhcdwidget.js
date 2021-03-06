function FlexHCDWidget (args) {
	
	SampleChangerWidget.call(this,args);
	
	this.name = 'FlexHCD';
	this.initAlpha = -7*2*Math.PI/16;
	this.data = {
		radius : this.radius,
		cells : 8,
		lines : [],
		text :[]
	};
	
	this.createStructure();
	this.createPucks(1, this.data.cells/2, -7*Math.PI/8, this.data.radius/2, 0.5, {dAlpha : Math.PI/16, dist : 3*this.data.radius/4});
	this.createPucks(2, this.data.cells/2, -5*Math.PI/8, this.data.radius/2, 0.5, {dAlpha : Math.PI/16, dist : 3*this.data.radius/4});
	
}

FlexHCDWidget.prototype.getPuckIndexFromAngle = SampleChangerWidget.prototype.getPuckIndexFromAngle;
FlexHCDWidget.prototype.createPucks = SampleChangerWidget.prototype.createPucks;
FlexHCDWidget.prototype.getPanel = SampleChangerWidget.prototype.getPanel;
FlexHCDWidget.prototype.load = SampleChangerWidget.prototype.load;
FlexHCDWidget.prototype.getStructure = SampleChangerWidget.prototype.getStructure;
FlexHCDWidget.prototype.findPuckById = SampleChangerWidget.prototype.findPuckById;
FlexHCDWidget.prototype.getAllPucks = SampleChangerWidget.prototype.getAllPucks;
FlexHCDWidget.prototype.render = SampleChangerWidget.prototype.render;

FlexHCDWidget.prototype.createStructure = function () {
	for (var i = 0 ; i < this.data.cells/2 ; i++){
		var ang = i*2*Math.PI/this.data.cells;
		var line = {
			x1 : this.data.radius*Math.sin(ang) + this.data.radius,
			y1 : this.data.radius*Math.cos(ang) + this.data.radius,
			x2 : -this.data.radius*Math.sin(ang) + this.data.radius,
			y2 : -this.data.radius*Math.cos(ang) + this.data.radius
		};
		this.data.lines.push(line);
	}
	
	var textR = this.data.radius/4;
	for (var i = 0 ; i < this.data.cells ; i++){
		var ang = i*2*Math.PI/this.data.cells;
		var textNumber = {
			text : i+1,
			x : textR*Math.sin(this.initAlpha + ang) + this.data.radius,
			y : -textR*Math.cos(this.initAlpha + ang) + this.data.radius
		};
		this.data.text.push(textNumber);
	}
}
