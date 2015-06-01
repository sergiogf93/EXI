MacromoleculeListView.prototype.getPanel = NavigationListView.prototype.getPanel;
MacromoleculeListView.prototype.load = NavigationListView.prototype.load;

function MacromoleculeListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	NavigationListView.call(this);
}

MacromoleculeListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
		html = html + "<tr><td>Acronym:</td><td>" + record.data.acronym+ "</td></tr>";
		html = html + "<tr><td>name:</td><td>" + record.data.name+ "</td></tr>";
	return html + "</table>";
};

MacromoleculeListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Macromolecule',  flex: 1, dataIndex: 'macromoleculeId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

MacromoleculeListView.prototype.getFields = function(){
	return  ['acronym', 'name'];
};

