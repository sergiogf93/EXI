





/**
 * Shows a list of stock solutions with macromolecule, buffer, storage temperature, concentration, shipment and comments
 * 
 * @multiselect allows multiple selection
 * @height 
 * @minHeight
 * @width
 * @tbar
 * @showTitle
 * @isPackedVisible shows is stock solution is in a box
 * @btnEditVisible shows edit button
 * @btnAddVisible
 * @btnAddExisting
 * @btnUnpackVisible allows to unpack a stock solution
 * @btnRemoveVisible allow to remove a stock solution
 */

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




DataCollectionSummaryGrid.prototype.parse = function(data) {
	data =  BUI.groupBy(data, function(item){
	 			return [item.DataCollectionGroup_dataCollectionGroupId];
	 			             
	});
	
	return data;
};


DataCollectionSummaryGrid.prototype.load = function(data) {	
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

