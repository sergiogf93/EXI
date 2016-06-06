function CurvePlotter(args) {
	this.id = BUI.id();

	this.backgroundColor = "#FFFFFF";
	
	this.margin = '0 0 0 5';
	this.ruleColor ="black";
	this.targetId = "plotCanvas" + BUI.id();
	this.legend = 'onmouseover';
	
	if (args != null){
		if (args.margin != null){
			this.margin = args.margin;
		}
		if (args.legend != null){
			this.legend = args.legend;
		}
	}
	
	this.onRendered = new Event(this);
	this.onPointClickCallback = new Event();
     
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
	var _this = this;
	if (document.getElementById(this.targetId) != null){
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
			    	  title : this.title,
			    	  titleHeight : 20,
                      dateWindow: this.dateWindow,
			    	  legend: this.legend,
			    	  labelsSeparateLines : true,
			          errorBars: true,
			          connectSeparatedPoints: true,
			          pointClickCallback: function(e, p) {
			        	  _this.onPointClickCallback.notify(p.name);
			          }
			      }
	
			 );
		
		var _this = this;
		this.dygraph.ready(function() {
			_this.onRendered.notify();
		});
	
	}
};

CurvePlotter.prototype.loadMerge = function(subtractionIdList, from, to, scale) {
	this.render(EXI.getDataAdapter().saxs.hplc.getFramesMergeURL(subtractionIdList, from, to, scale));
};

CurvePlotter.prototype.loadHPLCFrame = function(experimentId, frameNumber) {
	this.render(EXI.getDataAdapter().saxs.hplc.getHPLCFramesScatteringURL(experimentId, frameNumber));
};

CurvePlotter.prototype.loadUrl = function(url) {
	this.render(url);
};


CurvePlotter.prototype.load = function(selections) {
	this.render(EXI.getDataAdapter().saxs.frame.getFramesURL(selections.frame, selections.average, selections.subtracted, selections.sampleaverage, selections.bufferaverage));
};







function AutoProcIntegrationCurvePlotter(args) {
	CurvePlotter.call(this, args);
	this.dateWindow = [6, 0];
	this.margin = '10 0 0 0';
	this.height = null;
	this.title = "";
	if (args != null){
		if (args.height != null){
			this.height = args.height;
		}
		if (args.title != null){
			this.title = args.title;  
		}
	}
}


AutoProcIntegrationCurvePlotter.prototype.getPointCount = CurvePlotter.prototype.getPointCount;
AutoProcIntegrationCurvePlotter.prototype.getLabels = CurvePlotter.prototype.getLabels;
AutoProcIntegrationCurvePlotter.prototype.render = CurvePlotter.prototype.render;
AutoProcIntegrationCurvePlotter.prototype.loadUrl = CurvePlotter.prototype.loadUrl;

AutoProcIntegrationCurvePlotter.prototype.getPanel = function() {
	this.plotPanel = Ext.create('Ext.panel.Panel', {
	    layout: {
	        type: 'fit'
	    },
	    height : this.height,
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
