function SessionListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

SessionListView.prototype.getPanel = ListView.prototype.getPanel;
SessionListView.prototype.load = ListView.prototype.load;

SessionListView.prototype.getFilter = function(value){
	return [{property : "beamlineName", value : value, anyMatch : true}];
};

SessionListView.prototype.formatData = function(data){
	for (var i = 0; i < data.length; i++) {
		data[i]["date"] =  moment(data[i].startDate).format("MMM Do YY");
	}
	return data;
};

SessionListView.prototype.getValue = function(value){
	if (value != null){
		return "<tr><td style='max-width: 175px;\n" + 
				"    overflow: hidden;\n" + 
				"    text-overflow: ellipsis;\n" + 
				"    white-space: nowrap;'>" + value +"</td></tr>";
	}
	return "";
};

SessionListView.prototype.getRow = function(record){
    var html = "<div style='color:#207a7a;font-size:12px;font-weight:bold;'>" +  record.data.beamlineName + "</div>";
	html = html + "<table class='listView'>";
//	
		if (record.data.startDate != null){
			try{
				html = html + "<tr><td>" + moment(record.data.startDate).format("MMM Do YY") + "</td></tr>";
			}
			catch(e){
				html = html + "<tr><td>Date:</td><td>Format Error</td></tr>";
			}
		}

		html = html + this.getValue(record.data.beamlineOperator);
		html = html + this.getValue(record.data.comments);
	html = html + "</table>";
	return html;
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


