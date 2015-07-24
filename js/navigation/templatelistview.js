TemplateListView.prototype.getPanel = NavigationListView.prototype.getPanel;
TemplateListView.prototype.load = NavigationListView.prototype.load;

function TemplateListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	NavigationListView.call(this);
}

TemplateListView.prototype.getRow = function(record){
	var color = "black";
	var html = "<table class='listView' style='color:" + color +";'>";
	html = html + "<tr style='font-weight: bold;font-size:14px; color:#207a7a;'><td colspan='4'>" + record.data.name+ "</td></tr>";
	html = html + "<tr><td style='font-weight:bold;' colspan='4'>" + record.data.comments+ "</td></tr>";
		html = html + "<tr ><td colspan='4'>" + record.data.creationDate+ "</td></tr>";
	return html + "</table>";
};



TemplateListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Experiment',  flex: 1, dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

TemplateListView.prototype.getFields = function(){
	return  ['creationDate', 'name', 'experimentType'];
};

