
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

	
	this.genericDataCollectionPanel = new GenericDataCollectionPanel();
}



/*
DataCollectionSummaryGrid.prototype.parse = function(data) {
	data =  BUI.groupBy(data, function(item){
	 			return [item.DataCollectionGroup_dataCollectionGroupId];
	 			             
	});
	
	return data;
};*/


DataCollectionSummaryGrid.prototype.load = function(data) {	
    var data = _.filter(data, function(u) {
        return u.DataCollection_dataCollectionId != null;
    });
    
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        if (data[i].DataCollection_resolutionAtCorner != null){
            //data[i].DataCollection_resolutionAtCorner = '-> 2 digits';
        }
        if (data[i].DataCollection_resolution != null){
            
        }
    }
    
    
	this.genericDataCollectionPanel.load(data);
	
};


DataCollectionSummaryGrid.prototype.getPanel = function() {
    //	return this._renderGrid();
	//this.panel = Ext.create('Ext.panel.Panel', {
		//title : "Data Collections",
	//    items: [     		this.dataCollectionGroupFactory.getPanel()]
	//});
	return this.genericDataCollectionPanel.getPanel();
	
};

