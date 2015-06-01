function CurvePlotter() {
	
	this.left = 40;
	this.right = 30;
	this.top = 50;
	this.bottom = 50;

	this.backgroundColor = "#FFFFFF";
	
	this.ruleColor ="black";
	this.targetId = "plotCanvas";
	
	
	/** Zooming and translation **/
	this.translatePos = {
             x: 0,
             y: 0
         };

     this.scale = 1.0;
     this.scaleMultiplier = 0.8;
     this.startDragOffset = {};
     this.mouseDown = false;

     /** DOT, LINE **/
     this.drawAs = "DOT";
}

CurvePlotter.prototype.getPanel = function() {
	var _this = this;
	this.plotPanel = Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    flex : 0.7,
	    border: 1,
	    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
	    margin : 10,
	    defaults: {
	        style: {
	            padding: '10px'
	        }
	    },
	    items: [{
	    	html : '<div id="' + this.targetId +'">test</div>',
	    	style :' background:#E6E6E6;',
	    	flex : 1,
	    	id : "plotContainer",
	    	border : 1
	    }]
	});
	
	this.plotPanel.on("afterrender", function(){
	});
	
	this.plotPanel.on("resize", function(){
	});
	return this.plotPanel;
};



CurvePlotter.prototype.load = function(url) {

	this.width = this.plotPanel.getWidth();
	this.height = this.plotPanel.getHeight();
	
	
	document.getElementById(this.targetId).setAttribute("style", "height:" + this.plotPanel.getHeight() + "px;width:" + this.plotPanel.getWidth() + "px;");
	
	Ext.getCmp("plotContainer").setHeight(this.plotPanel.getHeight());
	Ext.getCmp("plotContainer").setWidth(this.plotPanel.getWidth());
	
	
	var _this = this;
	var g = new Dygraph(
		      document.getElementById(this.targetId),
//			 "http://pc593.embl.fr:8080/ispyb-ws/rest/540e26188e608d3b699c077d49acf530a05ecbc8/saxs/opd29/frame/datplot?frame=990616,990617&average=&subtracted=&sampleaverage=&bufferaverage=",
		      url,
		      {
		          errorBars: true,
		          connectSeparatedPoints: false
		      }
		 );
};
