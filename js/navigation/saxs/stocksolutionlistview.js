function StockSolutionListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	ListView.call(this);
}

StockSolutionListView.prototype.getPanel = ListView.prototype.getPanel;
StockSolutionListView.prototype.load = ListView.prototype.load;

StockSolutionListView.prototype.getRow = function(record){
	console.log(record);
	var html = "<table class='listView'>";
	html = html + "<tr><td>Name:</td><td>" + record.data.name + "</td></tr>";
	html = html + "<tr><td>Macromolecule:</td><td style='color:#207a7a;font-weight:bold;'>" + EXI.proposalManager.getMacromoleculeById(record.data.macromoleculeId).acronym + "</td></tr>";
	html = html + "<tr><td>Buffer:</td><td style='color:#207a7a;font-weight:bold;'>" + EXI.proposalManager.getBufferById(record.data.bufferId).acronym + "</td></tr>";
	html = html + "<tr><td>Concentration:</td><td>" + record.data.concentration+ "</td></tr>";
	html = html + "<tr><td>Storage Temperature:</td><td>" + record.data.storageTemperature+ "</td></tr>";
	return html + "</table>";
};

StockSolutionListView.prototype.getFilter = function(value){
	return [{property : "name", value : value, anyMacth : true}];
};

StockSolutionListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Stock Solutions',  flex: 1, dataIndex: 'macromoleculeId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

StockSolutionListView.prototype.getFields = function(){
	return  ['macromoleculeId', 'bufferId', 'concentration', 'storageTemperature', 'name'];
};

