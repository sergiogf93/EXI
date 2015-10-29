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
	
	
	/** Abinitio **/
	this.abinitioForm = new AbinitioForm({
		height : 700
	});
	
}

PrimaryDataMainView.prototype.getPanel = MainView.prototype.getPanel;

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
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				height : 900,
				margin : '10 0 0 0',
				items : [
					{
						tabConfig : {
							title : 'Primary Data Reduction'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 850,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
										{
											xtype : 'container',
											items : [
											         	this.grid.getPanel(),
											        	this.getSlavePanel()         
											]
										}
							]
						}

						]
					},
					{
						tabConfig : {
							title : 'Abinitio Modeling'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 850,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
										{
											xtype : 'container',
											items : [
											         	this.abinitioForm.getPanel()
											]
										}
							]
						}

						]
					}
			]
			});
};


//PrimaryDataMainView.prototype.getContainer = function() {
//	return {
//		xtype : 'container',
//		items : [
//		         	this.grid.getPanel(),
//		        	this.getSlavePanel()         
//		]
//	};
//};

PrimaryDataMainView.prototype.load = function(selected) {
	var _this = this;
	this.panel.setTitle(" Data Collection");
	this.grid.panel.setLoading();
	var onSuccess = function(sender, data) {
		_this.grid.load(data);
		_this.grid.panel.setLoading(false);
		/** Measurements Grid * */
		_this.frameSelectorGrid.load(data);
		
		/** Getting abinitio **/
		if (data[0].subtractionId){
			var onSuccessSubtraction = function(sender, subtractions) {
				_this.abinitioForm.load(subtractions);
			};
			
			EXI.getDataAdapter({onSuccess : onSuccessSubtraction}).saxs.subtraction.getSubtractionsBySubtractionIdList([data[0].subtractionId]);
			
		}
	};

	var dataCollectionIds = [];
	for (var i = 0; i < selected.length; i++) {
		dataCollectionIds.push(selected[i].dataCollectionId);

	}
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByDataCollectionId(dataCollectionIds);
	
	
	
};

