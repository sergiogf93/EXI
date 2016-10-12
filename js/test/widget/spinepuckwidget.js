/**
* Abstract class for creating a puck widget
*
* @class SpinePuckWidget
* @constructor
*/
function SpinePuckWidget(args){
	if (args == null){
		args = {};
	}
	args.isUnipuck = false;
	PuckWidget.call(this, args);	
}

SpinePuckWidget.prototype.getPanel = PuckWidget.prototype.getPanel;
SpinePuckWidget.prototype.load = PuckWidget.prototype.load;
SpinePuckWidget.prototype.addCirclePathCells = PuckWidget.prototype.addCirclePathCells;
SpinePuckWidget.prototype.focus = PuckWidget.prototype.focus;
SpinePuckWidget.prototype.select = PuckWidget.prototype.select;
SpinePuckWidget.prototype.findCellIndexById = PuckWidget.prototype.findCellIndexById;

SpinePuckWidget.prototype.parseData = function (data) {
	var n = 10;
	var marginPercent = 0.8;
	var dist = 3*data.mainRadius/4;
	
	data = this.addCirclePathCells(data,n,marginPercent,dist);
	
	return data;
};


