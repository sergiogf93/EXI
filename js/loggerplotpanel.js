function LoggerPlotPanel(args){

	this.startTime = 0;	
	this.endTime = 24;

	this.startMinutesTime = 0;
	this.endMinutesTime = 60;

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

}

LoggerPlotPanel.prototype.getPixelsPerHour = function(){
	/** Creating SVG Canvas **/
	return this.width/(this.endTime - this.startTime + 1);
};


LoggerPlotPanel.prototype.getHeightMainPanel = function(){
	/** Creating SVG Canvas **/
	return this.height;
};


LoggerPlotPanel.prototype.getXCoordinamteByTime = function(time){
	var splitted = time.split(":");
	var hour = parseFloat(splitted[0]);
	var minutes = parseFloat(splitted[1]);
	var seconds = parseFloat(splitted[2]);

	var x = null;

	
	if ((hour >= this.startTime )&&(hour <= this.endTime)){
		if ((hour > this.startTime) && (hour < this.endTime) ){
			x = this.getPixelsPerHour()*(hour - this.startTime);
			x = x + (this.getPixelsPerHour()*(minutes/60));
			return Math.round(x);
		}
	}

	if (hour == this.startTime ){
		if ( (minutes >= this.startMinutesTime) ){
			x = this.getPixelsPerHour()*(hour - this.startTime);
			x = x + (this.getPixelsPerHour()*(minutes/60));
			return Math.round(x);
		}
	}

	if (hour == this.endTime ){
		if ( (minutes <= this.endMinutesTime) ){
			x = this.getPixelsPerHour()*(hour - this.startTime);
			x = x + (this.getPixelsPerHour()*(minutes/60));
			return Math.round(x);
		}
	}

	return x;
};

LoggerPlotPanel.prototype.getYcoordinamteByDuration = function(duration){
	duration = parseFloat(duration);
	if (duration >= this.maxTimeAllowed ){
		return this.maxTimeAllowed;
	}

	return (duration*this.height)/this.maxTimeAllowed;
};

LoggerPlotPanel.prototype.plotCall = function(log, i){
	var date = log.DATE.split(" ")[3];
	var coorX = this.getXCoordinamteByTime(date);
	if (coorX != null){
		if (log.DURATION != "ERROR"){
			if (log.DURATION != "-1"){
				var coorY = this.getHeightMainPanel() - this.getYcoordinamteByDuration(log.DURATION);
				//SVG.drawText(coorX , coorY, log.METHOD, this.canvas, []);
				if (this.shape == "line"){			
					SVG.drawLine(coorX , this.height, coorX, this.height -  coorY, this.canvas, [["stroke", COLORADMIN.getColor("WS", log.METHOD) ] ]);
				}
				else{
		SVG.drawCircle(coorX , coorY, 3 + (log.DURATION/this.maxTimeAllowed)*10, this.canvas, [["fill", COLORADMIN.getColor("WS", log.METHOD)], ["stroke", "black"],["opacity", "1"]]);
	        SVG.drawLine(coorX , this.height, coorX, coorY, this.canvas, [["stroke", COLORADMIN.getColor("WS", log.METHOD) ],["opacity", "0.8"] ]);

				}
			}
			else{
				console.warn("TODO: Deal with -1")
			}
		}
		else{
			SVG.drawLine(coorX , this.height, coorX, 0, this.canvas, [["stroke", "red" ],["stroke-width", "3" ] ]);
		}
	}
};

LoggerPlotPanel.prototype.prepareData = function(logs){
	var data = [];
	var keys = {};

	for (var i = 0; i < logs.length; i++){
		/** Filter by date **/
		
		var log = logs[i];	
			if (log.TYPE == "START"){
				keys[log.ID] = log;			
			}
			else{
				if (log.TYPE == "END"){
					if (keys[log.ID] != null){
						keys[log.ID].DURATION = log.DURATION;
					}
					else{
						console.warn(log.METHOD + " method not found " + log.ID);
					}
				}
				if (log.TYPE == "ERROR"){
					if (keys[log.ID] != null){
						keys[log.ID].DURATION = "ERROR";
					}
					else{
						console.warn(log.METHOD + " ERROR method not found " + log.ID);
					}
				}
			}
		//if (log.TYPE )
	}
	for (var key in keys){
		data.push(keys[key]);
	}
	return data;
};

LoggerPlotPanel.prototype.refresh = function(logs){
	logs = this.prepareData(logs);
	$(this.canvas).empty();
	this.plotDurationLines();
	/** Creating SVG Canvas **/
	for (var i = 0; i < logs.length; i++){
		this.plotCall(logs[i], i);
		
	}
};



LoggerPlotPanel.prototype.plotDurationLines = function(){
	for (var i = 0; i < this.maxTimeAllowed; i = i + (this.maxTimeAllowed/8)){
		var coorY = this.getYcoordinamteByDuration(i);
		SVG.drawLine(0, coorY, this.width, coorY, this.canvas, [["class", "durationLine"]]);
		SVG.drawText(0 ,  coorY, (this.maxTimeAllowed-i)/1000  + " s", this.canvas, [["class", "light-font"]]);
	}
};

LoggerPlotPanel.prototype.render = function(targetId){
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
