SessionListView.prototype.getPanel = NavigationListView.prototype.getPanel;

function SessionListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	NavigationListView.call(this);
}

SessionListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
	
		if (record.data.startDate != null){
			try{
				html = html + "<tr><td>Date:</td><td style='font-weight:bold;'>" + moment(record.data.startDate).format("MMM Do YY") + "</td></tr>";
			}
			catch(e){
				html = html + "<tr><td>Date:</td><td>Format Error</td></tr>";
			}
		}
		html = html + "<tr><td>Shifts:</td><td>" + record.data.nbShifts+ "</td></tr>";
		html = html + "<tr><td>Beamline:</td><td>" + record.data.beamlineName+ "</td></tr>";
		html = html + "<tr><td>Comments:</td><td>" + record.data.comments+ "</td></tr>";
	return html + "</table>";
};

SessionListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Session',  flex: 1, dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } },
		        { text: 'sessionId',  dataIndex: 'sessionId', hidden : true },
		        { text: 'startDate',  dataIndex: 'startDate', hidden : true },
		        { text: 'nbShifts', dataIndex: 'nbShifts', hidden : true },
		        { text: 'endDate', dataIndex: 'endDate', hidden : true },
		        { text: 'comments', dataIndex: 'comments', hidden : true }
		    ];
};

SessionListView.prototype.getFields = function(){
	return  ['startDate', 'nbShifts', 'endDate', 'comments', 'sessionId', 'beamlineName'];
};


