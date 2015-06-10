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
		_this.plotter.load(selections);
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




PrimaryDataMainView.prototype.getSlavePanel = function() {
	return {
		xtype : 'container',
		layout : 'hbox',
		cls : 'defaultGridPanel',
		border : 0,
		defaults : {
			xtype : 'container',
			height : 600 
		},
		items : [ 
		         {
		        	 xtype : 'panel',
		        	 layout: {
		        	        type: 'accordion',
		        	        titleCollapse: false,
		        	        animate: true,
		        	        activeOnTop: true
		        	    },
		        	 flex : 0.4,
		        		border : 1,
		        		style : {
		        			borderColor : '#000000',
		        			borderStyle : 'solid',
		        			borderWidth : '1px' },
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

