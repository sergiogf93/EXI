





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

DataCollectionSummaryGrid.prototype._getHTMLImage = function(url) {
	return '<img class="lazy" onclick="myFunction()"  data-src=' + url + ' src=' + url + ' height="80" width="80" >';
};

DataCollectionSummaryGrid.prototype._getHTMLZoomImage = function(url, dataCollectionId, imageId) {
	var ref = '#/mx/datacollection/' + dataCollectionId + '/image/' + imageId + '/main';
	return '<a href=' + ref + '><img class="lazy"  data-src=' + url + ' src=' + url + ' height="80" width="80" ></a>';
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
			                           {key : "DCG id", value : record.data.DataCollectionGroup_dataCollectionGroupId},
			                           {key : "id", value : record.data.DataCollection_dataCollectionId},
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
	/*{
		text : 'First',
		dataIndex : 'DataCollection_imagePrefix',
		width : 115,
		renderer : function(val, y, sample) {
			return _this._getHTMLZoomImage(EXI.getDataAdapter().mx.dataCollection.getThumbNailById(sample.data.firstImageId), sample.data.DataCollection_dataCollectionId, sample.data.firstImageId);
//			return '<img data-echo=' + url + ' src=' + url + '    height="80" width="80" >';
		} 
	},
	{
		text : 'Last.',
		dataIndex : 'DataCollection_imagePrefix',
		width : 115,
		renderer : function(val, y, sample) {
			return _this._getHTMLZoomImage(EXI.getDataAdapter().mx.dataCollection.getThumbNailById(sample.data.lastImageId), sample.data.DataCollection_dataCollectionId, sample.data.lastImageId);
		}
	},
	{
		text : 'Crystal',
		dataIndex : 'DataCollection_imagePrefix',
		width : 115,
		renderer : function(val, y, sample) {
			return _this._getHTMLImage(EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(sample.data.DataCollection_dataCollectionId, 1));
		}
	}*/
	/*{
		text : 'Crystal',
		dataIndex : 'DataCollection_imagePrefix',
		width : 115,
		renderer : function(val, y, sample) {
			return _this._getHTMLImage(EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(sample.data.DataCollection_dataCollectionId, 2));
		}
	},
	{
		text : 'Crystal',
		dataIndex : 'DataCollection_imagePrefix',
		width : 115,
		renderer : function(val, y, sample) {
			return _this._getHTMLImage(EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(sample.data.DataCollection_dataCollectionId, 3));
		}
	}*/
	
	
	] ;
	return columns;
};

DataCollectionSummaryGrid.prototype.parse = function(data) {
//	console.log(data.length + " data collection rows");
	data =  BUI.groupBy(data, function(item){
	 			return [item.DataCollectionGroup_dataCollectionGroupId];
	 			             
	});
	
	/** Grouped by data collection group **/
//	console.log(data.length + " data collection group");
	return data;
};


DataCollectionSummaryGrid.prototype.load = function(data) {	
	
	var datasets = (this.parse(data));
	
//	console.log("------ DATASETS");
	for ( var i in datasets) {
		var dataset = (datasets[i]);
		
		var dc = new DataCollectionGroupFactory();
		
		this.panel.add(dc.getPanel(dataset));
		
		dc.load(dataset);
//		for (var j in dataset){
//			var type = dataset[j]["DataCollectionGroup_experimentType"] + " " + dataset[j]["Workflow_workflowType"] + " " + datasets[i].length;
//			console.log(type);
//			break;
//		}
	}
	
	
	
};


DataCollectionSummaryGrid.prototype.getPanel = function() {
//	return this._renderGrid();
	this.panel = Ext.create('Ext.panel.Panel', {
		title : "Session",
	    items: []
	});
	return this.panel;
	
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
	});

	
	var selModel = null;

	this.grid = Ext.create('Ext.grid.Panel', {
		title : "Data Collection Summary",
		id  : this.id,
// 		selModel : selModel,
//		height :800,
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

	this.grid.on('afterrender', function(){
		loadedElements = 0;
		console.log(document.getElementById(_this.id).parentNode.parentNode.parentNode.parentNode.id)
		var myVar = setTimeout(function() {   //calls click event after a certain time
				$('.lazy').lazy({ 
				  bind:'event',
				  /** !!IMPORTANT this is the id of the parent node which contains the scroll **/	
				  appendScroll:document.getElementById(document.getElementById(_this.id).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id),
				  beforeLoad: function(element){
					  console.log('image "' + (element.data('src')) + '" is about to be loaded');
				  },
				  afterLoad: function(element) {
					  loadedElements++;
					  console.log('image was loaded successfully');
				  },
				  onError: function(element) {
					  //loadedElements++;
					  //console.log('image  could not be loaded');
				  },
				  onFinishedAll: function() {
					  console.log('finished loading ' + loadedElements + ' elements');
					  console.log('lazy instance is about to be destroyed')
				  }
			  });
				clearTimeout(myVar);
			}, 1000);
	
		  
	});

	return this.grid;
};

