function HPLCMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.grid = new OverviewQueueGrid({
		height : 220 });

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
		width : 300,
		height : 300,
		bbar : true,
		plots : {
			"I0" : true,
			"Rg" : true },
		xlabel : "Frames",
		scaled : true,
		interactionModel : {
			'dblclick' : function(event, g, context) {
				//_this.selectedFrameNumber.push(g.lastx_);
                _this.selectedFrameNumber = [g.lastx_];
				_this.plotter.loadHPLCFrame(_this.experimentId, _this.selectedFrameNumber);
				/*_this.annotations.push({
					series : g.selPoints_[0].name,
					x : g.lastx_,
					width : 30,
					height : 23,
					tickHeight : 2,
					shortText : g.lastx_,
					text : g.lastx_,
					attachAtBottom : true });*/
                    _this.annotations= [({
					series : g.selPoints_[0].name,
					x : g.lastx_,
					width : 30,
					height : 23,
					tickHeight : 2,
					shortText : g.lastx_,
					text : g.lastx_,
					attachAtBottom : true })];
				g.setAnnotations(_this.annotations);
                
                /** Summary Panel */
                var summary = {
                        frame :  _this.selectedFrameNumber,
                        quality : _.find(_this.hplcGraph.hplcData, {param : 'quality'}).data[_this.selectedFrameNumber],
                        Qr : _.find(_this.hplcGraph.hplcData, {param : 'Qr'}).data[_this.selectedFrameNumber],
                        Vc : _.find(_this.hplcGraph.hplcData, {param : 'Vc'}).data[_this.selectedFrameNumber],
                        Mass : _.find(_this.hplcGraph.hplcData, {param : 'Mass'}).data[_this.selectedFrameNumber],
                        Rg : _.find(_this.hplcGraph.hplcData, {param : 'Rg'}).data[_this.selectedFrameNumber],
                        I0 : _.find(_this.hplcGraph.hplcData, {param : 'I0'}).data[_this.selectedFrameNumber],
                        downloadURL : EXI.getDataAdapter().saxs.hplc.getDownloadHDF5FramesURL(_this.experimentId, _this.selectedFrameNumber, _this.selectedFrameNumber)
                }
                
                
                
               
                var html = "";
                dust.render("summary.hplcmainview.template", [summary], function(err, out) {
                                                                                                                                       
                    html = html + out;
                });
                $('#' + _this.id + "summary").html(html);
                
			} 
        } 
    });

	this.hplcGraph.onClearSelection.attach(function(sender) {
		_this.annotations = [];
		_this.selectedFrameNumber = [];
		_this.hplcGraph.dygraphObject.dygraph.setAnnotations([]);
	});

	this.plotter = new CurvePlotter({
		margin : 10,
        width : 300
     });

	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

HPLCMainView.prototype.getPanel = MainView.prototype.getPanel;


HPLCMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

HPLCMainView.prototype.getPlotContainer = function() {
	return  {
                xtype : 'container',
                cls : 'defaultGridPanel',
                layout : 'hbox',
                border : 1,
                defaults : {height : 400 },
		        items : [ this.hplcGraph.getPanel(), this.plotter.getPanel()
		] };
};


HPLCMainView.prototype.getSecondaryContainer = function() {
	return  {
                xtype : 'container',
                cls : 'defaultGridPanel',
                layout : 'hbox',
                border : 0,
                defaults : {height : 400 },
		        items : [
                    {
                        html : '<div style="text-align:center;" class="alert alert-info" role="alert">Select a frame by double-clicking on the HPLC Frames plot</div>',
                        margin : 10,
                        flex : 1
                    },
                    {
                        html : '<div id="' + this.id + 'summary"></div>',
                        margin : 10,
                        flex : 1
                    }
                    
                ] };
};

HPLCMainView.prototype.getContainer = function() {
    
	return {
		xtype : 'container',
        margin : 10,
		items : [ 
            
            {
              html : '<div id="' + this.id +'header"></div>',
              margin : 10 ,
              height : 160 
            },
            {
              html : ' <div class="panel panel-primary"><div class="panel-heading">Data Collection</div></div>',
              margin : 10 ,
              height : 40 
            },
           
            this.grid.getPanel(), 
              {
              html : '<div class="panel panel-primary"><div class="panel-heading">Size-exclusion chromatography</div></div>',
              margin : 10 ,
              height : 40 
            },
            this.getPlotContainer(), 
            this.getSecondaryContainer()
             ] };
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
		_this.hplcGraph.loadData(data, experimentId);
        
	};

	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.hplc.getHPLCOverviewByExperimentId(experimentId);
};

HPLCMainView.prototype.load = function(experimentId) {
		var _this = this;
		this.experimentId = experimentId;
	
		var onSuccess = function(sender, data) {  
            if (data){          
			    _this.grid.load(data);
                if (data[0]){
                    var header = {
                        creationDate : data[0].Experiment_creationDate,
                        name : data[0].Experiment_name,
                        type : data[0].Experiment_experimentType,
                        hdf5 : data[0].Experiment_dataAcquisitionFilePath,
                        url : EXI.getDataAdapter().saxs.hplc.getDownloadHDF5URL(data[0].Experiment_experimentId)
                    }
                    
                    /** Renedering header */
                     var html = "";
                     
                    dust.render("header.hplcmainview.template", header, function(err, out) {
                                                                                                                                        
                        html = html + out;
                    });
                    $('#' + _this.id + "header").html(html);
                }
            }			
		};

		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByExperiment(experimentId);
		this.loadHPLCGraph(experimentId);
};
