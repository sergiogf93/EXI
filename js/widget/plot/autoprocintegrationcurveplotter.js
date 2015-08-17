AutoProcIntegrationCurvePlotter.prototype.getPanel = CurvePlotter.prototype.getPanel;
AutoProcIntegrationCurvePlotter.prototype.getPointCount = CurvePlotter.prototype.getPointCount;
AutoProcIntegrationCurvePlotter.prototype.getLabels = CurvePlotter.prototype.getLabels;
AutoProcIntegrationCurvePlotter.prototype.render = CurvePlotter.prototype.render;
AutoProcIntegrationCurvePlotter.prototype.loadUrl = CurvePlotter.prototype.loadUrl;

function AutoProcIntegrationCurvePlotter(args) {
	CurvePlotter.call(this, args);
	
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


AutoProcIntegrationCurvePlotter.prototype.getPanel = function() {
	this.plotPanel = Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
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
