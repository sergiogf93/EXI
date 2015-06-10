function CurvePlotter() {
	this.id = BUI.id();
	this.left = 40;
	this.right = 30;
	this.top = 50;
	this.bottom = 50;

	this.backgroundColor = "#FFFFFF";
	
	this.ruleColor ="black";
	this.targetId = "plotCanvas" + BUI.id();
	
	this.onRendered = new Event(this);
     
}

CurvePlotter.prototype.getPanel = function() {
	this.plotPanel = Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    flex : 0.7,
	    border: 1,
	    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
	    margin : '0 0 0 5',
	    defaults: {
	        style: {
	            padding: '10px'
	        }
	    },
	    items: [{
	    	html : '<div id="' + this.targetId +'"></div>',
	    	style :' background:#E6E6E6;',
	    	flex : 1,
	    	id : this.id,
	    	border : 1
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
	
	document.getElementById(this.targetId).setAttribute("style", "height:" + (this.plotPanel.getHeight() - 10) + "px;width:" + (this.plotPanel.getWidth() - 10) + "px;");
	
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


CurvePlotter.prototype.load = function(selections) {
	this.render(new DataAdapter().getFramesURL(selections.frame, selections.average, selections.subtracted, selections.sampleaverage, selections.bufferaverage));
};
