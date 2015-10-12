





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
//	this.height = 100;
//	this.width = null;
//	this.minHeight = null;
	this.tbar = true;

	this.title = "Stock Solutions";

	/** Visible buttons and actions **/
	this.btnEditVisible = true;
	this.btnRemoveVisible = true;
	this.btnAddVisible = true;
	this.btnAddExisting = false;
	this.isPackedVisible = true;
	this.btnUnpackVisible = false;

	/** Selectors **/
	this.multiselect = false;
	this.selectedStockSolutions = [];

	if (args != null) {
		if (args.btnUnpackVisible != null) {
			this.btnUnpackVisible = args.btnUnpackVisible;
		}
		if (args.multiselect != null) {
			this.multiselect = args.multiselect;
		}
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.btnEditVisible != null) {
			this.btnEditVisible = args.btnEditVisible;
		}
		if (args.btnAddVisible != null) {
			this.btnAddVisible = args.btnAddVisible;
		}
		if (args.btnAddExisting != null) {
			this.btnAddExisting = args.btnAddExisting;
		}
		if (args.width != null) {
			this.width = args.width;
		}
		if (args.minHeight != null) {
			this.minHeight = args.minHeight;
		}
		if (args.tbar != null) {
			this.tbar = args.tbar;
		}
		if (args.btnRemoveVisible != null) {
			this.btnRemoveVisible = args.btnRemoveVisible;
		}
		if (args.isPackedVisible != null) {
			this.isPackedVisible = args.isPackedVisible;
		}
		if (args.showTitle != null) {
			this.showTitle = args.showTitle;
			if (this.showTitle == false) {
				this.title = null;
			}
		}

	}

	/** Events **/
//	this.onProposalChanged = new Event(this);
//	this.onStockSolutionSelected = new Event(this);
	this.onSaved = new Event(this);
	this.onUnpack = new Event(this);
	this.onPack = new Event(this);
}

DataCollectionSummaryGrid.prototype.getHTMLTable = function(jsonArray) {
	var table = document.createElement("table");
	for (var i = 0; i < jsonArray.length; i++) {
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		
		td1.appendChild(document.createTextNode(jsonArray[i].key));
		if ((jsonArray[i].value) == null){
			td1.setAttribute("style", "color:#D8D8D8");
		}
		if ((jsonArray[i].value) != null){
			td1.setAttribute("style", "color:gray;font-weight:bold");
		}

		var td2 = document.createElement("td");
		if ((jsonArray[i].value) != null){
			td2.appendChild(document.createTextNode(jsonArray[i].value));
			td2.setAttribute("style", "font-weight:bold");
		}
		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);
	}
	return "<table>" + table.innerHTML + "</table>";
};


DataCollectionSummaryGrid.prototype._getColumns = function() {
	var _this = this;
	var columns = [
	{
		header : 'Type',
		dataIndex : 'DataCollectionGroup_experimentType',
		name : 'DataCollectionGroup_experimentType',
		flex : 1,
		renderer : function(grid, e, record){
			return _this.getHTMLTable([
			                          {key : "Type", value : record.data.DataCollectionGroup_experimentType},
			                          {key : "Image Prefix", value :record.data.DataCollection_imagePrefix},
			                          {key : "Start Time", value :record.data.DataCollection_startTime}
			                        
			                          
			                          ]);
		}
	},
	{
		header : 'id',
		dataIndex : 'DataCollection_dataCollectionId',
		name : 'DataCollection_dataCollectionId',
		flex : 1,
		hidden : true
	},
	{
		header : 'Sample',
		dataIndex : 'Protein_acronym',
		name : 'Protein_acronym',
		flex : 1,
		renderer : function(grid, e, record){
			return _this.getHTMLTable([
			                          {key : "Acronym", value :record.data.Protein_acronym},
			                          {key : "Protein", value :record.data.Protein_name},
			                          {key : "Name", value :record.data.BLSample_name},
//			                          {key : "Loop Length", value :record.data.BLSample_loopLength},
//			                          {key : "Loop Type", value :record.data.BLSample_loopType},
			                          {key : "Location", value :record.data.BLSample_location},
			                          {key : "Holder Length", value :record.data.BLSample_holderLength}
			                          
			                          ]);
		}
	},
	{
		header : 'Img Prefix',
		dataIndex : 'DataCollection_imagePrefix',
		name : 'DataCollection_imagePrefix',
		flex : 1,
		hidden : true
	},
	{
		header : 'Data Collection',
		dataIndex : 'DataCollection_imagePrefix',
		name : 'DataCollection_imagePrefix',
		flex : 1,
		renderer : function(grid, e, record){
			return _this.getHTMLTable([
			                          {key : "nbImages", value :record.data.DataCollection_numberOfImages},
			                          {key : "Exp. Time", value :record.data.DataCollection_exposureTime},
			                          {key : "Resolution", value :record.data.DataCollection_resolution},
			                          {key : "Flux", value :record.data.DataCollection_flux},
			                          {key : "Transmission", value :record.data.DataCollection_transmission},
			                          {key : "WaveLenght", value :record.data.DataCollection_wavelength}
			                          
			                          ]);
		}
	},
	{
		header : 'Screening',
		dataIndex : 'DataCollection_imagePrefix',
		name : 'DataCollection_imagePrefix',
		flex : 1,
		renderer : function(grid, e, record){
			return _this.getHTMLTable([
			                          {key : "mosaicity", value :record.data.ScreeningOutput_mosaicity},
			                          {key : "rankingResolution", value :record.data.ScreeningOutput_rankingResolution},
			                          {key : "spotDeviationR", value :record.data.ScreeningOutput_spotDeviationR},
			                          {key : "totalExposureTime", value :record.data.ScreeningOutput_totalExposureTime},
			                          {key : "totalNumberOfImages", value :record.data.ScreeningOutput_totalNumberOfImages},
			                          {key : "totalRotationRange", value :record.data.ScreeningOutput_totalRotationRange}
			                          
			                          ]);
		}
	},
	{
		text : 'First',
		dataIndex : 'DataCollection_imagePrefix',
		width : 115,
		renderer : function(val, y, sample) {
			var url = EXI.getDataAdapter().mx.dataCollection.getImageById(sample.data.firstImageId);
			return '<img src=' + url + '   height="80" width="80" >';
		} 
	},
	{
		text : 'Last.',
		dataIndex : 'DataCollection_imagePrefix',
		width : 115,
		renderer : function(val, y, sample) {
			var url = EXI.getDataAdapter().mx.dataCollection.getImageById(sample.data.lastImageId);
			return '<img src=' + url + '   height="80" width="80" >';
		}
	},
	{
		text : 'Crystal',
		dataIndex : 'DataCollection_imagePrefix',
		width : 115,
		renderer : function(val, y, sample) {
			var url = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(sample.data.DataCollection_dataCollectionId, 1);
			return '<img src=' + url + '   height="80" width="80" >';
		}
	},
	{
		text : 'Crystal',
		dataIndex : 'DataCollection_imagePrefix',
		width : 115,
		renderer : function(val, y, sample) {
			var url = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(sample.data.DataCollection_dataCollectionId, 2);
			return '<img src=' + url + '   height="80" width="80" >';
		}
	},
	{
		text : 'Crystal',
		dataIndex : 'DataCollection_imagePrefix',
		width : 115,
		renderer : function(val, y, sample) {
			var url = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(sample.data.DataCollection_dataCollectionId, 3);
			return '<img src=' + url + '   height="80" width="80" >';
		}
	}
	
	
	] ;
	return columns;
};

//DataCollectionSummaryGrid.prototype._getTopButtons = function() {
//	var _this = this;
//	/** Actions buttons **/
//	var actions = [];
//
//	/** ADD BUTTON **/
//	if (this.btnAddVisible) {
//		actions.push(Ext.create('Ext.Action', {
//			icon: '../images/icon/add.png',
//			text : 'Add',
//			tooltip : 'Will create a new stock solution',
//			disabled : false,
//			alwaysEnabled : true,
//			handler : function(widget, event) {
//				_this.edit();
//			}
//		}));
//	}
//
//	if (this.btnAddExisting) {
//		actions.push(Ext.create('Ext.Action', {
//			icon: 'images/icon/add.png',
//			text : 'Add Existing',
//			tooltip : 'Allows to select upacked stock solutions',
//			disabled : false,
//			alwaysEnabled : true,
//			handler : function(widget, event) {
//				var DataCollectionSummaryGrid = new DataCollectionSummaryGrid({
//					btnAddVisible : false,
//					btnEditVisible : false,
//					btnRemoveVisible : false,
//					btnAddExisting : false,
//					isPackedVisible : false,
//					multiselect : true
//				});
//
//				var window = Ext.create('Ext.window.Window', {
//					title : 'Select',
//					height : 800,
//					width : 900,
//					layout : 'fit',
//					items : [ DataCollectionSummaryGrid.getPanel() ],
//					buttons : [ {
//						text : 'Pack',
//						handler : function() {
//							if (DataCollectionSummaryGrid.selectedStockSolutions.length > 0){
//								_this.onPack.notify(DataCollectionSummaryGrid.selectedStockSolutions[0]);
//							}
//							window.close();
//						}
//					}, {
//						text : 'Cancel',
//						handler : function() {
//							window.close();
//						}
//					} ]
//
//				}).show();
//
//				DataCollectionSummaryGrid.load(EXI.proposalManager.getUnpackedStockSolutions());
//			}
//		}));
//	}
//
//	return actions;
//};

DataCollectionSummaryGrid.prototype.load = function(data) {
	this.store.loadData(data, false);
	this.store.sort('DataCollection_dataCollectionId', 'DESC');
};

DataCollectionSummaryGrid.prototype.getPanel = function() {
	return this._renderGrid();
};

DataCollectionSummaryGrid.prototype.edit = function(stockSolutionId) {
	var _this = this;
	var stockSolutionWindow = new StockSolutionWindow();
	/** On stock solution SAVED **/
	stockSolutionWindow.onSaved.attach(function(sender, stockSolution) {
		_this.onSaved.notify(stockSolution);
	});
	stockSolutionWindow.draw(EXI.proposalManager.getStockSolutionById(stockSolutionId));
};

DataCollectionSummaryGrid.prototype.unpack = function(stockSolution) {
	this.onUnpack.notify(stockSolution);
};

DataCollectionSummaryGrid.prototype._renderGrid = function() {
	var _this = this;

	/** Store **/
	this.store = Ext.create('Ext.data.Store', {
		fields :  ['DataCollectionGroup_experimentType', 'DataCollection_dataCollectionId', 'Protein_acronym', 'DataCollection_imagePrefix'],
//		sorter : [{property : 'DataCollection_dataCollectionId', direction : 'DESC'}]
//		sorters: [ {
//			property:'DataCollection_dataCollectionId',
//			direction:'ASC'
//			}]
	});

	
	var selModel = null;

	if (this.multiselect) {
		selModel = Ext.create('Ext.selection.CheckboxModel', {
			mode : 'SINGLE',
			listeners : {
				selectionchange : function(sm, selections) {
					_this.selectedStockSolutions = [];
					for ( var i = 0; i < selections.length; i++) {
						_this.selectedStockSolutions.push(selections[i].data);
					}
				}
			}
		});
	} else {
		selModel = {
			mode : 'SINGLE'
		};
	}


	this.grid = Ext.create('Ext.grid.Panel', {
		title : "Data Collection Summary",
		selModel : selModel,
		store : this.store,
		columns : this._getColumns(),
		viewConfig : {
			stripeRows : true,
			listeners : {
				itemdblclick : function(dataview, record, item, e) {
					location.hash =  "/autoprocintegration/datacollection/" + record.data.DataCollection_dataCollectionId + "/main";
				}
			}
		}

	});

	return this.grid;
};

