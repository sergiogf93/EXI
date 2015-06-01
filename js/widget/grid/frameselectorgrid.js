function FrameSelectorGrid(args) {

	/** measurementId : [{frame}] **/
	this.selected = {}; 
	
	this.onSelectionChange = new Event(this);
}

FrameSelectorGrid.prototype.getItem = function(measurement, type, group, fileName, frameId,mergeId ) {
	return {
		type : type,
		group : group,
		fileName : fileName,
		frameId : frameId,
		mergeId : mergeId,
		measurementId : measurement.measurementId,
		subtractionId : measurement.subtractionId,
		concentration : measurement.concentration,
		bufferAcronym : measurement.bufferAcronym,
		macromoleculeId : measurement.macromoleculeId,
		code : measurement.code,
		macromoleculeAcronym : measurement.macromoleculeAcronym };
};

FrameSelectorGrid.prototype.loadSubtractionFrames = function(measurement) {
	var _this = this;
	/** Loading a subtraction * */
	var adapter = new DataAdapter();
	adapter.onSuccess.attach(function(sender, data) {
		if (data != null) {
			var frames = [];
			frames.push(_this.getItem(measurement, "SampleAverage", "Average", data[0].sampleAverage));
			frames.push(_this.getItem(measurement, "BufferAverage", "Average", data[0].bufferAverage));
			frames.push(_this.getItem(measurement, "Subtraction", "Subtraction", data[0].subtraction));
			for ( var index in data[0].buffers) {
				frames.push(_this.getItem(measurement, "Buffer", "Buffer", data[0].buffers[index].filePath, data[0].buffers[index].frameId));
			}

			for ( var index in data[0].samples) {
				frames.push(_this.getItem(measurement, "Sample", "Sample", data[0].samples[index].filePath, data[0].samples[index].frameId));
			}
			_this.framesStore.loadData(frames);
		}
	});
	adapter.getFramesBySubtractionId(measurement.subtractionId);
};

FrameSelectorGrid.prototype.loadBufferFrames = function(measurement) {
	var _this = this;
	/** Loading a subtraction * */
	/** Loading a buffer * */
	var adapter = new DataAdapter();
	adapter.onSuccess.attach(function(sender, data) {
		if (data != null) {
			var frames = [];
			frames.push(_this.getItem(measurement, "Average", "Average", data[0].average,  null, data[0].averageId));
			for ( var index in data[0].frames) {
				frames.push(_this.getItem(measurement, "Frame", "Frame",data[0].frames[index].filePath, data[0].frames[index].frameId, null));
			}
			_this.framesStore.loadData(frames);
		}
	});
	adapter.getFramesByAverageId(measurement.mergeId);
};

FrameSelectorGrid.prototype.onClick = function(measurement) {
	if (measurement.macromoleculeAcronym != null) {
		this.loadSubtractionFrames(measurement);
	} else {
		this.loadBufferFrames(measurement);
	}
};

FrameSelectorGrid.prototype.load = function(data) {
	this.measurementStore.loadData(data);
};

FrameSelectorGrid.prototype.getMeasurementPanel = function() {
	var _this = this;
	this.measurementStore = Ext.create('Ext.data.Store', {
		fields : [  'measurementId', 'code', 'macromoleculeAcronym', 'bufferAcronym', 'framesMerge', 'framesCount', 'concentration' ],
		data : [] });

	var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect : true,
		listeners : {
			selectionchange : function(sm, selections) {
				if (selections.length > 0) {
					_this.onClick(selections[0].data);
				}
			}
		} 
	});

	this.measurementPanel = Ext.create('Ext.grid.Panel', {
		store : this.measurementStore,
		selModel : selModel,
		cls : 'defaultGridPanel',
		flex : 0.2,
		margin : 2,
		columns : [ {
			text : 'Run',
			dataIndex : 'code',
			flex : 1,
			renderer : function(grid, ops, sample) {
				if (sample.data.code != null) {
					return "#" + sample.data.code;
				}
				return "--";
			} }, {
			text : 'Name',
			dataIndex : 'code',
			flex : 1,
			renderer : function(grid, ops, sample) {
				if (sample.data.macromoleculeId != null) {
					return sample.data.macromoleculeAcronym;
				} else {
					if (sample.data.bufferAcronym != null) {
						return sample.data.bufferAcronym;
					}
				}
				return "--";
			} }, {
			text : 'Conc',
			dataIndex : 'framesCount',
			flex : 1,
			renderer : function(grid, ops, sample) {
				if (sample.data.macromoleculeId != null) {
					if (sample.data.concentration != null) {
						return parseFloat(sample.data.concentration).toFixed(2) + " mg/ml";
					}
				}
				return "--";
			} } ],
		viewConfig : {
			stripeRows : true,
			rowLines : false,
			getRowClass : function(record, index, rowParams, store) {
		        	if (record.data.measurementId != null){
		        		if (_this.selected[record.data.measurementId] != null){
		        			if (_this.selected[record.data.measurementId].length > 0){
		        				return "selected-row-grid";
		        			}
		        		}
		        	}
//				if (record.data.macromoleculeId != null) {
//					return "sample-row-grid";
//				}
			} },
		height : 400 });

	return this.measurementPanel;
};


//PrimaryDataMainView.prototype.getSelectedFrameIdList = function() {
//	var ids = [];
//	for (var i = 0; i < this.selected.frame.length; i++) {
//		ids.push(this.selected.frame[i].frameId);
//	}
//	return ids;
//};

FrameSelectorGrid.prototype.getFramesPanel = function() {
	var _this = this;
	this.framesStore = Ext.create('Ext.data.Store', {
		fields : [ 'group', 'fileName', 'type', 'macromoleculeAcronym', 'id','measurementId', 'bufferAcronym', 'macromoleculeId', 'concentration'  ],
		data : [],
		groupField : 'group' });

	var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect : true,
		mode : 'multi',
		listeners : {
//			select : function(sm, selected) {
//				var data = [];
//				var adapter = new DataAdapter();
//				adapter.onSuccess.attach(function(sender, data) {
//				/** Plotter * */
//				});
//				adapter.getFrames(_this.getSelectedFrameIdList());
//				console.log(selected.data);
//			},
			deselect : function(sm, unselected) {
				console.log(unselected.data);
			},
			selectionchange : function(sm, selections) {
				var measurementId = _this.measurementPanel.getSelection()[0].data.measurementId;
				
				if (selections != null){
					var data = [];
					for (var i = 0; i < selections.length; i++) {
						data.push(selections[i].data);
					}
					_this.selected[measurementId] = data;
					_this.onSelectionChange.notify(_this.selected);
					
					/** In order to set the styles when elements have been selected **/
					_this.measurementPanel.reconfigure();
				}
			}
			 
		} 
	});

	this.framesPanel = Ext.create('Ext.grid.Panel', {
		store : this.framesStore,
		selModel : selModel,
		margin : 2,
		flex : 0.2,
		cls : 'defaultGridPanel',
		features : [ {
			ftype : 'grouping' } ],
		columns : [ {
			text : 'File',
			dataIndex : 'fileName',
			flex : 0.9,
			renderer : function(grid, ops, sample) {
				return sample.data.fileName.split("/")[sample.data.fileName.split("/").length - 1];

			} }, {
			text : '',
			dataIndex : 'type',
			flex : 0.1,
			hidden : true }, {
			dataIndex : 'macromoleculeAcronym',
			flex : 0.2,
			hidden : true }, 
			{
				text : '',
				dataIndex : 'macromoleculeAcronym',
				flex : 0.2,
				hidden : false,
				renderer : function(grid, ops, sample){
					if (sample.data.frameId != null){
						return "<a href='" + new DataAdapter().downloadFrameURL(sample.data.frameId) +"' style='cursor:pointer;'><img style='height:15px;width:15px;' src='images/icon/ic_get_app_black_24dp.png'/></a>"
					}
					
				}
			}
			
			],
		viewConfig : {
			stripeRows : true,
			rowLines : false
			},
		height : 400 });

	return this.framesPanel;
};

FrameSelectorGrid.prototype.getTreePanel = function() {
	var store = Ext.create('Ext.data.TreeStore', {
	    root: {
	        expanded: true,
	        children: [
	            { text: "detention", leaf: true },
	            { text: "homework", expanded: true, children: [
	                { text: "book report", leaf: true },
	                { text: "algebra", leaf: true, }
	            ] },
	            { text: "buy lottery tickets", leaf: true },
	            { text: "buy lottery tickets", leaf: false , children: [
	                                                	                { text: "book report", leaf: true },
	                                                	                { text: "buy lottery tickets", leaf: false , children: [
	                                                		                                                	                { text: "book report", leaf: true },
	                                                		                                                	                { text: "algebra", leaf: true, }
	                                                		                                                	            ] }
	                                                	            ] },
	        ]
	    }
	});

	return Ext.create('Ext.tree.Panel', {
	    title: 'Simple Tree',
//	    width: 200,
	    height: 400,
	    flex : 1,
	    store: store,
	    rootVisible: false,
	    renderTo: Ext.getBody()
	});
};

FrameSelectorGrid.prototype.getPanel = function() {
	return this.getTreePanel();
//	return {
//		xtype : 'panel',
//		layout : 'hbox',
////		title : 'Select frames',
//		flex : 0.4,
////		items : [ this.getMeasurementPanel(), this.getFramesPanel() ] };
//		items : [ this.getTreePanel()] };
};
