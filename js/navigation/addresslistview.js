function AddressListView(){
	this.sorters = [{property : 'cardName', direction: 'ASC'}];
	ListView.call(this);
}

AddressListView.prototype.getPanel = ListView.prototype.getPanel;
AddressListView.prototype.load = ListView.prototype.load;

AddressListView.prototype.getFilter = function(value){
	return [{property : "cardName", value : value, anyMatch : true}];
};


AddressListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
	html = html + "<tr><td>cardName:</td><td style='color:#207a7a;font-weight:bold;'>" + record.data.cardName+ "</td></tr>";
	html = html + "<tr><td>Familiy Name:</td><td>" + record.data.personVO.familyName + "</td></tr>";
	html = html + "<tr><td>Name:</td><td>" + record.data.personVO.givenName + "</td></tr>";
	html = html + "<tr><td>Email:</td><td>" + record.data.personVO.emailAddress + "</td></tr>";
	return html + "</table>";
};

AddressListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Addresses',  flex: 1, dataIndex: 'sessionId', 
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

AddressListView.prototype.getFields = function(){
	return  ['cardName', 'defaultCourrierCompany', 'personVO.emailAddress'];
};


