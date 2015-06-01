ExperimentListView.prototype.getPanel = NavigationListView.prototype.getPanel;
ExperimentListView.prototype.load = NavigationListView.prototype.load;

function ExperimentListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	NavigationListView.call(this);
}

ExperimentListView.prototype.getRow = function(record){
	var color = "black";
	/** If experiment is empty then color is gray **/
	if ((record.data.experimentType != 'HPLC')&&(record.data.measurementDoneCount == 0)&&(record.data.measurementAveragedCount == 0)&&(record.data.dataCollectionDoneCount == 0)){
		color = '#DEDEDE';
	}
	var html = "<table class='listView' style='color:" + color +";'>";
		html = html + "<tr><td colspan='4'>" + record.data.creationDate+ "</td></tr>";
		html = html + "<tr><td colspan='4'>" + record.data.name+ "</td></tr>";
		html = html + "<tr><td style='font-weight:bold;' colspan='4'>" + record.data.experimentType+ "</td></tr>";
		if ((record.data.experimentType == 'STATIC')||(record.data.experimentType == 'CALIBRATION')){
			if ((record.data.measurementDoneCount == 0)&&(record.data.measurementAveragedCount == 0)&&(record.data.dataCollectionDoneCount == 0)){
				html = html + "<tr ><td  style='width:180px;border:1px solid gray;text-align:center;color:" + color +";font-weight:bold;' colspan='4'>EMPTY</td></tr>";
				
			}
			else{
				html = html + "<tr style='margin-left:5px;'><td style='width:10px;'></td><td>Collected:</td><td>"+ record.data.measurementDoneCount +"/" + record.data.measurementCount + "</td><td>" + new ProgressBar().getPanel(record.data.measurementDoneCount, record.data.measurementCount) + "</td></tr>";
				html = html + "<tr><td style='width:10px;'></td><td>Averaged:</td><td>"+ record.data.measurementAveragedCount +"/" + record.data.measurementCount + "</td><td>" + new ProgressBar().getPanel(record.data.measurementAveragedCount, record.data.measurementCount) + "</td></tr>";
				html = html + "<tr><td style='width:10px;'></td><td>Subtracted:</td><td>"+ record.data.dataCollectionDoneCount +"/" + record.data.dataCollectionCount + "</td><td>" + new ProgressBar().getPanel(record.data.dataCollectionDoneCount, record.data.dataCollectionCount) + "</td></tr>";
			}
		}
	return html + "</table>";
};



ExperimentListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Experiment',  flex: 1, dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

ExperimentListView.prototype.getFields = function(){
	return  ['creationDate', 'name', 'experimentType'];
};

