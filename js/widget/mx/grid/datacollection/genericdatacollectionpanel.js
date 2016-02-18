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
		fields : ["dataCollectionGroup"]
	});
	this.panel = Ext.create('Ext.grid.Panel', {
		border 		: 1,
		store 		: this.store,
	    columns		: this.getColumns(),
	    viewConfig	: {
	        			enableTextSelection: true
	     }
	});
	return this.panel;
};

GenericDataCollectionPanel.prototype._getHTMLZoomImage = function(url, dataCollectionId, imageId) {
	var ref = '#/mx/datacollection/' + dataCollectionId + '/image/' + imageId + '/main';
	return '<a href=' + ref + '><img class="lazy"  data-src=' + url + ' src=' + url + '></a>';
};


GenericDataCollectionPanel.prototype._getHTMLImage = function(url) {
	return '<img class="lazy" onclick="myFunction()"  data-src=' + url + ' src=' + url + '>';
};

GenericDataCollectionPanel.prototype.getHTMLTable = function(jsonArray) {
	var table = document.createElement("table");
	for (var i = 0; i < jsonArray.length; i++) {
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		
		td1.appendChild(document.createTextNode(jsonArray[i].key));
		if (jsonArray[i].value == null){
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
		
		var td3 = document.createElement("td");
		if (jsonArray[i].units != null){
			td3.appendChild(document.createTextNode(jsonArray[i].units));
			td3.setAttribute("class", "summary_datacollection_parameter");
		}
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	}
	return "<table>" + table.innerHTML + "</table>";
};

GenericDataCollectionPanel.prototype.getColumns = function() {
	var _this = this;
	var columns = [
	{
		header : 'Type',
		dataIndex : 'dataCollectionGroup',
		name : 'dataCollectionGroup',
		flex : 1,
		renderer : function(grid, e, record){
			record.data = record.data.dataCollectionGroup;
			return _this.getHTMLTable([
			                           {key : "Workflow", value : record.data.Workflow_workflowType},
			                           {key : "Type", value : record.data.DataCollectionGroup_experimentType},
			                           {key : "Images", value :record.data.DataCollection_numberOfImages},
			                           {key : "Resolution", value :record.data.DataCollection_resolution},
			                           {key : "Start", value :record.data.DataCollectionGroup_startTime},
			                           {key : "Wavelength", value :record.data.DataCollection_wavelength},
			                           {key : "DataCollection_phiStart", value :record.data.DataCollection_phiStart},
			                           {key : "Flux", value : Number(record.data.DataCollection_flux).toExponential(), units:'ph/sec'},
			                           {key : "Flux End", value : Number(record.data.DataCollection_flux_end).toExponential(), units:'ph/sec'},
			                           {key : "Prefix", value :record.data.DataCollection_imagePrefix},
			                           
			                           {key : "Comments", value :record.data.DataCollectionGroup_comments}
			]);
		}
	},
	{
		header : 'Image',
		dataIndex : 'DataCollection_imagePrefix',
		width : 310,
		renderer : function(val, y, record) {
			return _this._getHTMLZoomImage(EXI.getDataAdapter().mx.dataCollection.getThumbNailById(record.data.lastImageId), record.data.DataCollection_dataCollectionId, record.data.lastImageId);
		} 
	},
	{
		header : 'Crystal',
		dataIndex : 'DataCollection_imagePrefix',
		width : 310,
		renderer : function(val, y, record) {
			return _this._getHTMLImage(EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 1));
		}
	}];
	return columns;
};
	

GenericDataCollectionPanel.prototype.load = function(dataCollectionGroup){
	this.store.loadData(dataCollectionGroup);
};