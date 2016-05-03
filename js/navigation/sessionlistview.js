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

    var html = "";
    dust.render("session.listview", record.data, function(err, out){
		html = html + out;
    });
    return html;

};

SessionListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Session',  flex: 1, dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

SessionListView.prototype.getFields = function(){
	return  ['date'];
};


