HPLCMainView.prototype.getPanel = MainView.prototype.getPanel;
//HPLCMainView.prototype.getContainer = MainView.prototype.getContainer;

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
				_this.plotter.loadHPLCFrame(_this.experiment.experimentId, _this.selectedFrameNumber);

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
	var adapter = new DataAdapter();
	adapter.onSuccess.attach(function(sender, data) {
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

	});

	adapter.getHPLCOverviewByExperimentId(experimentId);
};

HPLCMainView.prototype.load = function(selected) {
	var _this = this;

	this.experiment = selected[0];
	for (var i = 0; i < selected.length; i++) {
		var experiment = selected[i];

		this.grid.panel.setLoading();

		var adapter = new DataAdapter();
		/*** Trick for JS compiler **/
		adapter.onSuccess.attach(function(sender, data) {

			_this.panel.setTitle(experiment.name);
			_this.grid.panel.setTitle(_this.getHeader(experiment.name, experiment.creationDate));
			_this.grid.load(data);
			_this.grid.panel.setLoading(false);

		});
		adapter.onError.attach(function(sender, data) {
			sender.grid.panel.setLoading(false);
		});

		adapter.getDataCollectionsByExperimentId(selected[i].experimentId);

		this.loadHPLCGraph(experiment.experimentId);
	}
};

/**
 * Using dygraph it plots a chart. Params: targetId, labelsContainerId, args
 * 
 * @width
 * @height
 * @labelsWidth
 * @targetId
 * @customBars
 * @ylabel
 * @xlabel
 * @showRangeSelector Show or hide the range selector widget.
 */
function DygraphWidget(targetId, args) {
	this.width = 1000;
	this.height = 600;
	this.labelsWidth = 100;
	this.targetId = targetId;
	this.customBars = false;
	this.ylabel = "";
	this.xlabel = "";
	this.id = BUI.id();
	this.showRangeSelector = false;
	this.interactionModel = null;
	this.labelsDivStyles = null;

	this.ranges = [
//	               {
//		start : 100,
//		end : 200,
//		color : 'rgb(150,200,255)'
//	}
	               ];

	if (args != null) {
		if (args.width != null) {
			this.width = args.width;
		}
		if (args.height != null) {
			this.height = args.height;
		}

		if (args.labelsWidth != null) {
			this.labelsWidth = args.labelsWidth;
		}
		if (args.labelsDivStyles != null) {
			this.labelsDivStyles = args.labelsDivStyles;
		}
		if (args.customBars != null) {
			this.customBars = args.customBars;
		}
		if (args.ylabel != null) {
			this.ylabel = args.ylabel;
		}
		if (args.xlabel != null) {
			this.xlabel = args.xlabel;
		}
		if (args.showRangeSelector != null) {
			this.showRangeSelector = args.showRangeSelector;
		}
		if (args.interactionModel != null) {
			this.interactionModel = args.interactionModel;
		}

		if (args.scaled != null) {
			this.scaled = args.scaled;
		}
		if (args.ranges != null) {
			this.ranges = args.ranges;
		}

	}

	this.onZoomX = new Event(this);
	this.onResetZoom = new Event(this);
	this.dblclick = new Event(this);
}

/** Draws it on targetId 
 * data: dygraphs.com/data.html
 * 
 * **/

DygraphWidget.prototype.dblclick = function(event, g, context) {
	g.widget.dblclick.notify({
		x : g.lastx_ });
};

DygraphWidget.prototype._createHTLMWrapper = function(data, colors, labels) {
	/** If plot is set in a tab it is possible that it is not renderer yet **/
	if (document.getElementById(this.targetId) == null) {
		return;
	}
	document.getElementById(this.targetId).innerHTML = "";
	/** Creating legend in a table **/
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var tdCanvas = document.createElement("td");

	this.canvasDiv = document.createElement("div");
	this.canvasDiv.setAttribute("id", "dygraph_canvas_" + this.id);
	this.canvasDiv.setAttribute("style", "width:" + this.width + "px;height:" + this.height + "px");
	tdCanvas.appendChild(this.canvasDiv);

	this.legendDiv = document.createElement("div");
	tr.appendChild(tdCanvas);
	table.appendChild(tr);
	document.getElementById(this.targetId).appendChild(table);
};

DygraphWidget.prototype.draw = function(data, colors, labels) {
	var _this = this;
	this._createHTLMWrapper(data, colors, labels);
	this.dygraph = new Dygraph(this.canvasDiv, data, {
		labels : labels,
		labelsDiv : this.legendDiv,
		labelsSeparateLines : true,
		highlightCircleSize : 3,
		strokeWidth : 1,
		customBars : this.customBars,
		colors : colors,
		//		scaled : this.scaled,
		//		ranges : this.ranges,
		xlabel : this.xlabel,
		ylabel : this.ylabel,
		showRangeSelector : this.showRangeSelector,
		rangeSelectorPlotStrokeColor : 'rgba(50,50,50,0.3)',
		rangeSelectorPlotFillColor : 'rgba(50,50,50,0.1)',
		labelsDivStyles : this.labelsDivStyles,
		interactionModel : this.interactionModel,
		underlayCallback : function(canvas, area, g) {
			debugger
			if (_this.ranges != null) {
				for ( var key in _this.ranges) {
					var bottom_left = g.toDomCoords(_this.ranges[key].start, -20);
					var top_right = g.toDomCoords(_this.ranges[key].end, +20);

					var left = bottom_left[0];
					var right = top_right[0];

					canvas.fillStyle = _this.ranges[key].color;
					canvas.fillRect(left, area.y, right - left, area.h);

				}
			}

		} });

};

StdDevDyGraph.prototype.dblclick = DygraphWidget.prototype.dblclick;
StdDevDyGraph.prototype._createHTLMWrapper = DygraphWidget.prototype._createHTLMWrapper;
StdDevDyGraph.prototype.draw = DygraphWidget.prototype.draw;

function StdDevDyGraph(targetId, args) {
	this.scaled = false;
	if (args == null) {
		args = {};
	}
	args.customBars = true;
	DygraphWidget.prototype.constructor.call(this, targetId, args);
}

StdDevDyGraph.prototype.input = function() {
	return {
		data : [ [ 1, [ 2, 3, 3.5 ], [ 4, 4.2, 5 ] ], [ 2, [ 5, 5.5, 5.7 ], [ 4, 4.2, 5 ] ] ],
		colors : [ "blue", "red" ],
		labels : [ "", 'data1', 'data2' ] };
};

StdDevDyGraph.prototype.test = function(targetId) {
	var dygraphObject = new StdDevDyGraph(targetId, {
		width : 500,
		height : 400,
		xlabel : "xLabel",
		showRangeSelector : false });

	dygraphObject.draw(dygraphObject.input().data, dygraphObject.input().colors, dygraphObject.input().labels);
};
