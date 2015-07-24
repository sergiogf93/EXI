function CurvePlotter(args) {
	this.id = BUI.id();

	this.backgroundColor = "#FFFFFF";
	
	this.margin = '0 0 0 5';
	this.ruleColor ="black";
	this.targetId = "plotCanvas" + BUI.id();
	
	
	if (args != null){
		if (args.margin != null){
			this.margin = args.margin;
		}
	}
	
	this.onRendered = new Event(this);
     
}

CurvePlotter.prototype.getPanel = function() {
	this.plotPanel = Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    flex : 0.7,
	    margin : this.margin,
	    items: [{
	    	html : '<div id="' + this.targetId +'"></div>',
	    	id : this.id,
	    }]
	});
	
	this.plotPanel.on("afterrender", function(){
	});
	
	this.plotPanel.on("resize", function(){
	});
	return this.plotPanel;
};

CurvePlotter.prototype.getPointCount = function() {
	return this.dygraph.rawData_.length;
};

CurvePlotter.prototype.getColors = function() {
	return this.dygraph.getColors();
};

CurvePlotter.prototype.getLabels = function() {
	return this.dygraph.getLabels();
};

CurvePlotter.prototype.render = function(url) {
	document.getElementById(this.targetId).innerHTML = "";
	 
	this.width = this.plotPanel.getWidth();
	this.height = this.plotPanel.getHeight();
	
	document.getElementById(this.targetId).setAttribute("style", "border: 1px solid #000000; height:" + (this.plotPanel.getHeight() - 1) + "px;width:" + (this.plotPanel.getWidth() - 2) + "px;");
	
	Ext.getCmp(this.id).setHeight(this.plotPanel.getHeight());
	Ext.getCmp(this.id).setWidth(this.plotPanel.getWidth());
	
	
	this.dygraph = new Dygraph(
		      document.getElementById(this.targetId),
		      url,
		      {
		          errorBars: true,
		          connectSeparatedPoints: false
		      }
		 );
	
	var _this = this;
	this.dygraph.ready(function() {
		_this.onRendered.notify();
	});
	
	
};

CurvePlotter.prototype.loadMerge = function(subtractionIdList, from, to, scale) {
	this.render(new DataAdapter().getFramesMergeURL(subtractionIdList, from, to, scale));
};

CurvePlotter.prototype.loadHPLCFrame = function(experimentId, frameNumber) {
	this.render(new DataAdapter().getHPLCFramesScatteringURL(experimentId, frameNumber));
};



CurvePlotter.prototype.load = function(selections) {
	this.render(new DataAdapter().getFramesURL(selections.frame, selections.average, selections.subtracted, selections.sampleaverage, selections.bufferaverage));
};
