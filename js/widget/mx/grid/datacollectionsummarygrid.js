
function DataCollectionSummaryGrid(args) {
	this.id = BUI.id();

	/** Visible buttons and actions **/

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}

	}

	
	this.dataCollectionGroupFactory = new DataCollectionGroupFactory();
}



/*
DataCollectionSummaryGrid.prototype.parse = function(data) {
	data =  BUI.groupBy(data, function(item){
	 			return [item.DataCollectionGroup_dataCollectionGroupId];
	 			             
	});
	
	return data;
};*/


DataCollectionSummaryGrid.prototype.load = function(data) {	
    var data = _.filter(data, function(u) {console.log(u);
        return u.DataCollection_dataCollectionId != null;
    });
	this.dataCollectionGroupFactory.load(data);
	
};


DataCollectionSummaryGrid.prototype.getPanel = function() {
//	return this._renderGrid();
	this.panel = Ext.create('Ext.panel.Panel', {
		title : "Data Collections",
	    items: [     		this.dataCollectionGroupFactory.getPanel()]
	});
	return this.panel;
	
};

