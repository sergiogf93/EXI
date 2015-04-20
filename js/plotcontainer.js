function PlotContainer(args){
	this.startTime = 0;	
	this.endTime = 24;

	this.width = 800;
	this.height = 300;


	this.shape = "circle";
	this.maxTimeAllowed = 85000;

	if (args != null){
		if (args.maxTimeAllowed != null){
			this.maxTimeAllowed = args.maxTimeAllowed;
		}

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


	this.loggerPlotPanel = new LoggerPlotPanel({
							width 		: this.width,
							height 		: this.height - 30 ,
							startTime 	: this.startTime,
							endTime 	: this.endTime,
							maxTimeAllowed 	: this.maxTimeAllowed

	});


	this.timePlot = new TimePlot({
							width 		: this.width,
							height 		: 25 ,
							startTime 	: this.startTime,
							endTime 	: this.endTime,
							});
}

PlotContainer.prototype.changeTimeRange = function(startTime, endTime, minutesStart, minutesEnd){
	this.startTime = startTime;	
	this.endTime = endTime;

	this.loggerPlotPanel.startTime = this.startTime;
	this.loggerPlotPanel.endTime = this.endTime;

	this.loggerPlotPanel.startMinutesTime = minutesStart;
	this.loggerPlotPanel.endMinutesTime = minutesEnd;


	this.timePlot.startTime = this.startTime;
	this.timePlot.endTime = this.endTime;

	this.refresh(this.data);
};

PlotContainer.prototype.changeTimeScale = function(maxTimeAllowed){
	this.maxTimeAllowed = maxTimeAllowed*1000;	
	this.loggerPlotPanel.maxTimeAllowed = this.maxTimeAllowed;
	this.refresh(this.data);
};


PlotContainer.prototype.refresh = function(data){
	this.data = data;
	this.loggerPlotPanel.refresh(data);
	this.timePlot.refresh();
};

PlotContainer.prototype.render = function(targetId){
	this.targetId = targetId;
	var div = document.getElementById(targetId);

	var panel = document.createElement("div");
	this.panelId =  this.targetId + "wsPanel";
	panel.setAttribute("id", this.panelId);
	panel.setAttribute("class", "wsPanel");
	div.appendChild(panel);

	var timePanel = document.createElement("div");
	this.timePanelId = this.targetId + "timePanel";
	timePanel.setAttribute("id", this.timePanelId);
	timePanel.setAttribute("class", "timePanel");
	div.appendChild(timePanel);
	
	this.loggerPlotPanel.render(this.panelId);
	this.timePlot.render(this.timePanelId );

};
