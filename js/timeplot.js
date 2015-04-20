function TimePlot(args){

	this.startTime = 0;	
	this.endTime = 24;

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
	}


}

TimePlot.prototype.getPixelsPerHour = function(){
	/** Creating SVG Canvas **/
	return this.width/(this.endTime - this.startTime + 1);
};


TimePlot.prototype.getHeightMainPanel = function(){
	/** Creating SVG Canvas **/
	return this.height - this.height;
};

TimePlot.prototype.refresh = function(){
	$("#" + this.targetId).empty();
	this.render(this.targetId);
};


TimePlot.prototype.getXCoordinamteByTime = function(time){
	var splitted = time.split(":");
	var hour = parseFloat(splitted[0]);
	var minutes = parseFloat(splitted[1]);
	var seconds = parseFloat(splitted[2]);

	var x = null;

	
	if ((hour >= this.startTime )&&(hour <= this.endTime)){
		x = this.getPixelsPerHour()*(hour - this.startTime);
		x = x + (this.getPixelsPerHour()*(minutes/60));
		return Math.round(x);
	}
	return x;
};

TimePlot.prototype.getYcoordinamteByDuration = function(duration){
	duration = parseFloat(duration);
	if (duration >= this.maxTimeAllowed ){
		return this.maxTimeAllowed;
	} 

	return (duration*this.height)/this.maxTimeAllowed;
};



TimePlot.prototype.plotTimePlotPanel = function(timePlotDiv){
	/** Creating SVG Canvas **/
	var style = "width:" + this.width + "px;";
	style = style + "height:" + this.height + "px;";

	var canvas = SVG.createSVGCanvas(timePlotDiv, [["style", style]]);

	var hourWidth = this.getPixelsPerHour();		

	SVG.drawLine(0, 0, this.width, 0, canvas, [["class", "time-separator-line"]]);

	for (var i = 0; i <= (this.endTime - this.startTime); i++){
		var x = hourWidth*i;

		SVG.drawLine(x, 0, x , this.height - 8, canvas, [["class", "time-separator-line"]]);
		SVG.drawText(x - 2, this.height, i + this.startTime + "h", canvas, [["class", "light-font"]]);
	}

	for (var i = 0; i <= (this.endTime - this.startTime) + 1; i = i + 0.25){
		var x = hourWidth*i;
		SVG.drawLine(x, 0, x , this.height/2, canvas, [["class", "light-time-separator-line"]]);
	}

};


TimePlot.prototype.render = function(targetId){
	this.targetId = targetId;
	var div = document.getElementById(targetId);

	/** Creating time plot panel **/
	var timePlotPanel = document.createElement("div");
	timePlotPanel.setAttribute("style", "width:" + this.width + "px;height:" + this.height + "px;");
	div.appendChild(timePlotPanel);
	

	/** Render hour plot on bottom side **/
	this.plotTimePlotPanel(timePlotPanel);


	
};
