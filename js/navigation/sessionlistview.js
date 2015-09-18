SessionListView.prototype.getPanel = ListView.prototype.getPanel;
SessionListView.prototype.load = ListView.prototype.load;

function SessionListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

SessionListView.prototype.getFilter = function(value){
	return [{property : "beamlineName", value : value, anyMatch : true}];
};

SessionListView.prototype.formatData = function(data){
	for (var i = 0; i < data.length; i++) {
		data[i]["date"] =  moment(data[i].startDate).format("MMM Do YY");
	}
	return data;
};

SessionListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
	
		if (record.data.startDate != null){
			try{
				html = html + "<tr><td>Date:</td><td>" + moment(record.data.startDate).format("MMM Do YY") + "</td></tr>";
			}
			catch(e){
				html = html + "<tr><td>Date:</td><td>Format Error</td></tr>";
			}
		}
		html = html + "<tr><td>Shifts:</td><td>" + record.data.nbShifts+ "</td></tr>";
		html = html + "<tr><td>Beamline:</td><td style='color:#207a7a;font-weight:bold;'>" + record.data.beamlineName+ "</td></tr>";
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
	return  ['date', 'startDate', 'nbShifts', 'endDate', 'comments', 'sessionId', 'beamlineName'];
};


