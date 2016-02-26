function HPLCMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.grid = new QueueGrid({
		collapsed : true,
		positionColumnsHidden : true,
		maxHeight : Ext.getCmp("main_panel").getHeight() - 50,
		sorters : [ {
			property : 'macromoleculeAcronym',
			direction : 'ASC' } ] });

	this.grid.onSelectionChange.attach(function(sender, elements) {
		_this.onSelectionChange.notify(elements);
	});

	this.grid.onSelect.attach(function(sender, selected) {
		_this.onSelect.notify(selected);
	});

	this.grid.onDeselect.attach(function(sender, unselected) {
		_this.onDeselect.notify(unselected);
	});

	var _this = this;
	_this.annotations = [];
	_this.selectedFrameNumber = [];
	this.hplcGraph = new HPLCGraph({
		title : 'I0',
		width : 800,
		height : 350,
		bbar : true,
		plots : {
			"I0" : true,
			"Rg" : true },
		xlabel : "HPLC Frames",
		scaled : true,
		interactionModel : {
			'dblclick' : function(event, g, context) {
				_this.selectedFrameNumber.push(g.lastx_);
				_this.plotter.loadHPLCFrame(_this.experimentId, _this.selectedFrameNumber);

				_this.annotations.push({
					series : g.selPoints_[0].name,
					x : g.lastx_,
					width : 30,
					height : 23,
					tickHeight : 2,
					shortText : g.lastx_,
					text : g.lastx_,
					attachAtBottom : true });
				g.setAnnotations(_this.annotations);

			} } });

	this.hplcGraph.onClearSelection.attach(function(sender) {
		_this.annotations = [];
		_this.selectedFrameNumber = [];
		_this.hplcGraph.dygraphObject.dygraph.setAnnotations([]);
	});

	this.plotter = new CurvePlotter({
		margin : '10 0 0 0' });

	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

HPLCMainView.prototype.getPanel = MainView.prototype.getPanel;

HPLCMainView.prototype._selectFrame = function(frameNumber) {
	try {
		//		this._renderScatteringCurve(frameNumber);
		//		this.frameGrid.refresh([this.mainPlotPanel.getDataByFrameNumber(frameNumber)], this.experiment.experimentId);
	} catch (e) {
		console.log(e);
	}
};

HPLCMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

HPLCMainView.prototype.getPlotContainer = function() {
	return {
		xtype : 'container',
		//		layout : 'fit',
		//		 layout : 'vbox',
		cls : 'defaultGridPanel',
		border : 0,
		defaults : {
			height : 450 },
		//		items : [ 
		//		         {
		//		        	 xtype : 'panel',
		//		        	 layout : 'vbox',
		////		        	 layout: {
		////		        	        type: 'accordion',
		////		        	        titleCollapse: false,
		////		        	        animate: true,
		////		        	        activeOnTop: true
		////		        	    },
		//		        	    flex : 1,
		//		        		border : 1,
		//		        		style : {
		//		        			borderColor : '#000000',
		//		        			borderStyle : 'solid',
		//		        			borderWidth : '1px' },
		items : [ this.hplcGraph.getPanel(), this.plotter.getPanel()

		//			        	          ]
		//		         },

		] };
};

HPLCMainView.prototype.getContainer = function() {

	return {
		xtype : 'container',
		items : [ this.grid.getPanel(), this.getPlotContainer() ] };
};

HPLCMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

HPLCMainView.prototype.loadHPLCGraph = function(experimentId) {
	var _this = this;
	var onSuccess = function(sender, data) {
		data = JSON.parse(data);
		var zeroArray = [];
		for (var i = 0; i < data.I0.length; i++) {
			zeroArray.push(0);
		}
		data = [ {
			param : "I0",
			data : data.I0,
			std : data.I0_Stdev,
			color : '#0066CC',
			label : "I0" }, {
			param : "sum_I",
			label : "sum_I",
			color : "#00FF00",
			data : data.sum_I,
			std : zeroArray }, {
			param : "Rg",
			label : "Rg",
			color : "#21610B",
			data : data.Rg,
			std : data.Rg_Stdev }, {
			param : "Mass",
			data : data.mass,
			std : data.mass_Stdev,
			color : '#FF9900',
			label : "Mass" }, {
			param : "Vc",
			data : data.Vc,
			std : data.Vc_Stdev,
			color : '#990099',
			label : "Vc" }, {
			param : "Qr",
			data : data.Qr,
			std : data.Qr_Stdev,
			color : '#FF0066',
			label : "Qr" }, {
			param : "quality",
			label : "quality",
			color : "#FF00FF",
			data : data.quality,
			std : zeroArray } ];
		_this.hplcGraph.loadData(data);

	};

	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.hplc.getHPLCOverviewByExperimentId(experimentId);
};

HPLCMainView.prototype.load = function(experimentId) {
		var _this = this;
		this.experimentId = experimentId;

		this.grid.panel.setLoading();

		var onSuccess = function(sender, data) {
//			_this.panel.setTitle(data[0].name);
//			_this.grid.panel.setTitle(_this.getHeader(data[0].name, data[0].creationDate));
			_this.grid.load(data);
			_this.grid.panel.setLoading(false);

		};

		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByExperimentId(experimentId);
		this.loadHPLCGraph(experimentId);
};
