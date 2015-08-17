PrimaryDataMainView.prototype.getPanel = MainView.prototype.getPanel;
//PrimaryDataMainView.prototype.getContainer = MainView.prototype.getContainer;

function PrimaryDataMainView() {
	this.title = "Primary Data View";
	this.icon = 'images/icon/ic_blur_on_black_18dp.png';

	MainView.call(this);
	
	this.onMeasurementSelectionChange = new Event(this);
	
	var _this = this;
	
	this.frameSelectorGrid = new FrameSelectorGrid();
	this.frameSelectorGrid.onSelectionChange.attach(function(sender, selections){
		_this.plotter.load(selections);
	});
	
	/** Curve plotter * */
	this.plotter = new CurvePlotter({
	});

	this.grid = new QueueGrid({
		maxHeight : 300
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
		cls 	: 'defaultGridPanel',
		margin : 5,
		border : 0,
		defaults : {
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
		        	    flex : 0.3,
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



PrimaryDataMainView.prototype.getContainer = function() {
	return {
		xtype : 'container',
		items : [
		         	this.grid.getPanel(),
		        	this.getSlavePanel()         
		]
	};
};

PrimaryDataMainView.prototype.load = function(selected) {
	var _this = this;
	this.panel.setTitle(" Primary Data Viewer");
	this.grid.panel.setLoading();
	var onSuccess = (function(sender, data) {
		_this.grid.load(data);
		_this.grid.panel.setLoading(false);
		/** Measurements Grid * */
		_this.frameSelectorGrid.load(data);
	});

	var dataCollectionIds = [];
	for (var i = 0; i < selected.length; i++) {
		dataCollectionIds.push(selected[i].dataCollectionId);

	}
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByDataCollectionId(dataCollectionIds);
};

