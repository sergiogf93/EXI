function LegendWidget(args){

	this.width = 800;
	this.height = 300;

	if (args != null){
		if (args.width != null){
			this.width = args.width;
		}
		if (args.height != null){
			this.height = args.height;
		}
		if (args.startTime != null){
			this.startTime = args.startTime;
		}
		if (args.endTime != null){
			this.endTime = args.endTime;
		}
		if (args.shape != null){
			this.shape = args.bd;
		}		
	}

}


LegendWidget.prototype.render = function(targetId){
	var div = document.getElementById(targetId);
	this.plotPanel = document.createElement("div");
	this.plotPanel.setAttribute("style", "width:" + this.width + "px;height:" + (this.height - this.timePlotPanelHeight) + "px;");
	div.appendChild(this.plotPanel);
	

	/** Plotting main canvas **/
	var style = "width:" + this.width + "px;";
	style = style + "height:" + this.height + "px;";
	this.canvas = SVG.createSVGCanvas(this.plotPanel, [["style", style]]);	

	this.plotDurationLines();

};
