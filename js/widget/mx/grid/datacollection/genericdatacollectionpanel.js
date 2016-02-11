function GenericDataCollectionPanel(args) {
	this.title = "Generic";
	
}

GenericDataCollectionPanel.prototype.load = function(dataCollectionGroup){
};

GenericDataCollectionPanel.prototype.getColumns = function(){
	return [];
};

GenericDataCollectionPanel.prototype.getPanel = function(dataCollectionGroup){
	this.store = Ext.create('Ext.data.Store', {
		fields : ["BLSession_comments"]
	});

	this.panel = Ext.create('Ext.grid.Panel', {
		//margin : 5,
		border 		: 1,
		store 		: this.store,
	    columns		: this.getColumns(),
	    viewConfig	: {
	        			enableTextSelection: true
	     }
	});
	return this.panel;
};

GenericDataCollectionPanel.prototype.load = function(dataCollectionGroup){
	var summary = this.summarize(dataCollectionGroup);
	this.store.loadData([summary]);
	this.panel.setTitle(summary.lastDataCollection.Workflow_workflowTitle);
};


GenericDataCollectionPanel.prototype._getHTMLZoomImage = function(url, dataCollectionId, imageId) {
	var ref = '#/mx/datacollection/' + dataCollectionId + '/image/' + imageId + '/main';
	return '<a href=' + ref + '><img class="lazy"  data-src=' + url + ' src=' + url + '></a>';
};


GenericDataCollectionPanel.prototype._getHTMLImage = function(url) {
	return '<img class="lazy" onclick="myFunction()"  data-src=' + url + ' src=' + url + '>';
};


GenericDataCollectionPanel.prototype.summarize = function(dataCollectionGroup){
	var dataCollectionGroupObject = new DataCollectionGroup(dataCollectionGroup);
	var dcs = (dataCollectionGroupObject.getDataCollections());
	console.log(dataCollectionGroupObject.getSummary());
	return dataCollectionGroupObject.getSummary();
};

GenericDataCollectionPanel.prototype.getHTMLTable = function(jsonArray) {
	var table = document.createElement("table");
	for (var i = 0; i < jsonArray.length; i++) {
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		
		td1.appendChild(document.createTextNode(jsonArray[i].key));
		if ((jsonArray[i].value) == null){
			td1.setAttribute("class", "summary_datacollection_null_parameter");
		}
		
		
		if ((jsonArray[i].value) != null){
			td1.setAttribute("class", "summary_datacollection_parameter_name");
		}

		var td2 = document.createElement("td");
		if ((jsonArray[i].value) != null){
			td2.appendChild(document.createTextNode(jsonArray[i].value));
			td2.setAttribute("class", "summary_datacollection_parameter");
		}
		tr.appendChild(td1);
		tr.appendChild(td2);
		table.appendChild(tr);
	}
	return "<table>" + table.innerHTML + "</table>";
};

GenericDataCollectionPanel.prototype.getColumns = function() {
	var _this = this;
	var columns = [
	{
		header : 'Type',
		dataIndex : 'BLSession_comments',
		name : 'BLSession_comments',
		flex : 1,
		renderer : function(grid, e, record){
			return _this.getHTMLTable([
			                           {key : "DCG id", value : record.data.lastDataCollection.DataCollectionGroup_dataCollectionGroupId},
			                           {key : "id", value : record.data.lastDataCollection.DataCollection_dataCollectionId},
			                           //{key : "Workflow_workflowTitle", value : record.data.lastDataCollection.Workflow_workflowTitle},
			                           //{key : "Workflow_workflowType", value : record.data.lastDataCollection.Workflow_workflowType},
			                           
			                           {key : "Type", value : record.data.lastDataCollection.DataCollectionGroup_experimentType},
			                           {key : "Data Collections", value : record.data.dataCollectionCount},
			                           {key : "Images", value :record.data.totalNumberImages},
			                           {key : "Resolution", value :record.data.lastDataCollection.DataCollection_resolutionAtCorner},
			                           {key : "Image Prefix", value :record.data.lastDataCollection.DataCollection_imagePrefix},
			                           {key : "Start Time", value :record.data.lastDataCollection.DataCollection_startTime},
			                           //{key : "Snapshot", value :record.data.lastDataCollection.DataCollection_xtalSnapshotFullPath3},
			                           {key : "Wavelength", value :record.data.lastDataCollection.DataCollection_wavelength},
			                           {key : "Resolution", value :record.data.lastDataCollection.DataCollection_resolution},
			                           {key : "Flux", value :record.data.lastDataCollection.DataCollection_flux},
			                           {key : "Images", value :record.data.lastDataCollection.DataCollection_numberOfImages},
			                           {key : "Phi", value :record.data.lastDataCollection.ScreeningStrategy_phiEnd},
			                           {key : "Exposure Time", value :record.data.lastDataCollection.DataCollection_exposureTime}
			                           //{key : "Completeness", value :record.data.lastDataCollection.ScreeningStrategy_completeness},
			                           //{key : "AutoProcIntegration_autoprocIntegrationId", value :record.data.lastDataCollection.AutoProcIntegration_autoprocIntegrationId},
			                           //{key : "AutoProcIntegration_startImageNumber", value :record.data.lastDataCollection.AutoProcIntegration_startImageNumber},
			                           //{key : "AutoProcIntegration_endImageNumber", value :record.data.lastDataCollection.AutoProcIntegration_endImageNumber},
			                           //{key : "numberOfImages", value :record.data.lastDataCollection.numberOfImages},
			                           //{key : "DataCollection_transmission", value :record.data.lastDataCollection.DataCollection_transmission},
			                           //{key : "Image_imageId", value :record.data.lastDataCollection.Image_imageId}
			                           
			                           
			                          ]);
		}
	},
	{
		header : 'Image',
		dataIndex : 'DataCollection_imagePrefix',
		width : 310,
		renderer : function(val, y, record) {
			return _this._getHTMLZoomImage(EXI.getDataAdapter().mx.dataCollection.getThumbNailById(record.data.lastDataCollection.Image_imageId), record.data.lastDataCollection.DataCollection_dataCollectionId, record.data.lastDataCollection.Image_imageId);
		} 
	},
	{
		header : 'Crystal',
		dataIndex : 'DataCollection_imagePrefix',
		width : 310,
		renderer : function(val, y, record) {
			return _this._getHTMLImage(EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.lastDataCollection.DataCollection_dataCollectionId, 1));
		}
	}];
	return columns;
};
	
/*
OSC_MxPressE_DataCollectionPanel.prototype.getPanel = function(dataCollectionGroup){
	this.store = Ext.create('Ext.data.Store', {
		fields : ["BLSession_comments"]
	});

	this.panel = Ext.create('Ext.grid.Panel', {
		margin : 5,
		border : 1,
		store : this.store,
	    columns: this.getColumns(),
	    viewConfig: {
	        enableTextSelection: true
	     }
	});
	return this.panel;
};*/

GenericDataCollectionPanel.prototype.load = function(dataCollectionGroup){
	var summary = this.summarize(dataCollectionGroup);
	this.store.loadData([summary]);
	this.panel.setTitle("MXPressE: <span class='summary_datacollection_title_comment'>" + summary.lastDataCollection.Workflow_workflowTitle + "</span>");
};