PrimaryDataMainView.prototype.getPanel = MainView.prototype.getPanel;
PrimaryDataMainView.prototype.getContainer = MainView.prototype.getContainer;

function PrimaryDataMainView() {
	this.title = "Primary Data View";
	this.icon = 'images/icon/ic_blur_on_black_18dp.png';
	this.queueGridList = [];

	this.onMeasurementSelectionChange = new Event(this);
	
	var _this = this;
	
	this.frameSelectorGrid = new FrameSelectorGrid();
	this.frameSelectorGrid.onSelectionChange.attach(function(sender, selections){
		_this.selected = selections;
		
		var data = [];
		function getFrames(selected){
			var ids = [];
			for ( var measurementId in selected) {
				for (var i = 0; i < selected[measurementId].length; i++) {
					if ( selected[measurementId][i].type == "Frame"){
						ids.push(selected[measurementId][i].frameId);
					}
					
					if ( selected[measurementId][i].type == "Buffer"){
						ids.push(selected[measurementId][i].frameId);
					}
					
					if ( selected[measurementId][i].type == "Sample"){
						ids.push(selected[measurementId][i].frameId);
					}
				}
			}
			return ids;
		}
		
		function getAverages(selected){
			var ids = [];
			for ( var measurementId in selected) {
				for (var i = 0; i < selected[measurementId].length; i++) {
					if ( selected[measurementId][i].type == "Average"){
						ids.push(selected[measurementId][i].mergeId);
					}
				}
			}
			return ids;
		}
		
		function getSubtractions(selected){
			var ids = [];
			for ( var measurementId in selected) {
				for (var i = 0; i < selected[measurementId].length; i++) {
					if ( selected[measurementId][i].type == "Subtraction"){
						ids.push(selected[measurementId][i].subtractionId);
					}
				}
			}
			return ids;
		}
		
		function getSampleAverages(selected){
			var ids = [];
			for ( var measurementId in selected) {
				for (var i = 0; i < selected[measurementId].length; i++) {
					if ( selected[measurementId][i].type == "SampleAverage"){
						ids.push(selected[measurementId][i].subtractionId);
					}
				}
			}
			return ids;
		}
		
		function getBufferAverages(selected){
			var ids = [];
			for ( var measurementId in selected) {
				for (var i = 0; i < selected[measurementId].length; i++) {
					if ( selected[measurementId][i].type == "BufferAverage"){
						ids.push(selected[measurementId][i].subtractionId);
					}
				}
			}
			return ids;
		}
		
		
//		var adapter = new DataAdapter();
//		adapter.onSuccess.attach(function(sender, data) {
//			/** Plotter * */
//			debugger
//			_this.plotter.load(data);
//		});
//		debugger
		_this.plotter.load(new DataAdapter().getFramesURL(getFrames(_this.selected), getAverages(_this.selected), getSubtractions(_this.selected), getSampleAverages(_this.selected), getBufferAverages(_this.selected)));
		
	});
	
	/** Curve plotter * */
	this.plotter = new CurvePlotter({
	});
	
	/** measurementId : [{frame}] **/
	this.selected = {}; 
	
	
}

PrimaryDataMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};



PrimaryDataMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};



PrimaryDataMainView.prototype.getSelectedFrames = function() {
	var _this = this;
	this.selectedStore = Ext.create('Ext.data.Store', {
	    fields:['measurementId', 'code', 'macromoleculeAcronym', 'bufferAcronym', 'framesMerge', 'framesCount', 'concentration', 'fileName', 'type',  'macromoleculeAcronym', 'id'],
	    data:[]
	});

	var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect		: true
	});
	
	this.selectedPanel = Ext.create('Ext.grid.Panel', {
	    store: this.selectedStore,
	    selModel : selModel,
	    title : 'Plot',
	    cls : 'defaultGridPanel',
	    flex : 0.2,
	    margin : 2,
	    columns: [
	              { text: 'fileName',  dataIndex: 'fileName', flex : 1,
	  	        	renderer : function(grid, ops, sample){
	  	        		return "#" + sample.data.fileName;
	  	        	
	  	        	} 
	  	        }
	    ],
	    viewConfig: {
	    	stripeRows : true,
			rowLines : false,
	        getRowClass: function(record, index, rowParams, store) {
	        	if (record.data.macromoleculeId != null){
	        		return "sample-row-grid";
	        	}
	        }
	    },
	    height: 400
	});
	
	
	return this.selectedPanel;
};

PrimaryDataMainView.prototype.getSlavePanel = function() {
	return {
		xtype : 'container',
		layout : 'hbox',
		cls : 'defaultGridPanel',
		defaults : {
			xtype : 'container',
			height : 600 
		},
		items : [ 
		         {
		        	 xtype : 'panel',
		        	 layout: {
		        	        // layout-specific configs go here
		        	        type: 'accordion',
		        	        titleCollapse: false,
		        	        animate: true,
		        	        activeOnTop: true
		        	    },
		        	 flex : 0.4,
		        	 items : [
		        	          this.frameSelectorGrid.getPanel()
		        	         
		        	          ]
		         },
		         this.plotter.getPanel()
		        
		    ]
	};

};

PrimaryDataMainView.prototype.load = function(selected) {
	var _this = this;

	var grid = new QueueGrid({
		maxHeight : 300

	});

	this.panel.setTitle(" Primary Data Viewer");
	this.container.insert(0, grid.getPanel());

	this.container.insert(1, this.getSlavePanel());

	var adapter = new DataAdapter();
	/** * Trick for JS compiler * */
	adapter.grid = grid;
	adapter.grid.panel.setLoading();
	adapter.grid.panel.setTitle(selected.length + " items selected");
	adapter.onSuccess.attach(function(sender, data) {
		sender.grid.load(data);
		sender.grid.panel.setLoading(false);
		/** Measurements Grid * */
		_this.frameSelectorGrid.load(data);
	});
	adapter.onError.attach(function(sender, data) {
		sender.grid.panel.setLoading(false);
	});

	var dataCollectionIds = [];
	for (var i = 0; i < selected.length; i++) {
		dataCollectionIds.push(selected[i].dataCollectionId);

	}
	adapter.getDataCollectionsByDataCollectionId(dataCollectionIds);

};

//
//PrimaryDataMainView.prototype.addSelected = function(item) {
//	var measurement = this.measurementPanel.getSelectionModel().getSelection()[0].data;
//	item = $.extend({}, item, measurement);
//	
//	/** Remove id attribute, where does it come from? **/
//	item.id = null;
//	
//	if (item.type == "Frame"){
//		this.selected.frame.push(item);
//	}
//	if (item.type == "Average"){
//		this.selected.average.push(item);
//	}
//	if (item.type == "Subtraction"){
//		this.selected.subtraction.push(item);
//	}
//	
//	if (item.type == "Sample"){
//		this.selected.sample.push(item);
//	}
//	
//	if (item.type == "Buffer"){
//		this.selected.buffer.push(item);
//	}
//	
//	this.selectedStore.loadData(item, true);
//};
