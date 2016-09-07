/**
* Main view for autoprocessing. It displays a grid with a summary of the information of autoprocessing and phasing
* On the right it displays a panel with the plots: completeness, rfacor, cc2, etc.. as well as the list of attachments
*
* @class AutoProcIntegrationMainView
* @constructor
*/
function AutoProcIntegrationMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	var _this = this;
	
     _this.programAttachments = [];
     _this.programAttachmentsAutoProcProgramIds = [];
	
	this.slaveWidth = 450;
	
	this.autoProcIntegrationGrid = new AutoProcIntegrationGrid();
	
	this.autoProcIntegrationGrid.onSelected.attach(function(sender, records){
		var ids = [];        
		for (var i = 0; i < records.length; i++) {
			ids.push(records[i].v_datacollection_summary_phasing_autoProcIntegrationId);
		}		
		/** Loading plots **/
		try{
			_this.loadPlots(ids);
		}
		catch(e){
            console.log("Error loading plots");    
        }	
        	
		/** Loading attachments
		if (records.length == 1){                                                                                     
			var record = _this.getByAutoProcId(records[0].v_datacollection_summary_phasing_autoproc_autoprocId);
			if (record != null){
				_this.autoProcIntegrationAttachmentGrid.load(_this.programAttachments[_.findIndex(_this.programAttachmentsAutoProcProgramIds, function(o) { return o == records[0].v_datacollection_summary_phasing_autoProcProgramId; })]);
			}
		}	 **/	
		
		/** Loading phasing network 
		var tmp = [].concat.apply([], _this.autoProcIntegrationPhasingViewList);
		var filtered = [];
		for ( i = 0; i < tmp.length; i++) {
			if ( tmp[i].v_datacollection_summary_phasing_autoProcIntegrationId == records[0].v_datacollection_summary_phasing_autoProcIntegrationId){
				filtered.push( tmp[i]);
			}
		}	**/	
	});
	
    /*
	this.autoProcIntegrationAttachmentGrid = new AutoProcIntegrationAttachmentGrid({
																					width : this.slaveWidth, 
																					margin: 5
																					
	});
	*/
	/** Netowkrwidget for phasing **/
	//this.phasingNetworkWidget = new PhasingNetworkWidget({tbar : "OPEN_VIEWER"});
	
	/** Curve completenessPlotter 
	this.completenessPlotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "Completeness vs Resolution",
		legend : 'never'
	});
	
	this.completenessPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.rFactorPlotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "Rfactor vs Resolution",
		legend : 'never'
	});
	
	this.rFactorPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.isigmaPlotter = new AutoProcIntegrationCurvePlotter({
		height :250,
		title : "I/SigmaI vs Resolution",
		legend : 'never'
	});

	this.isigmaPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.cc2Plotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "CC/2 vs Resolution",
		legend : 'never'
	});
	
	this.cc2Plotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.sigmaAnnoPlotter = new AutoProcIntegrationCurvePlotter({
		height :250,
		title : "SigAno vs Resolution",
		legend : 'never'
	});
	
	this.sigmaAnnoPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.wilsonPlotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "Wilson Plot",
		legend : 'never'
	});
	
	this.wilsonPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.annoCorrPlotter = new AutoProcIntegrationCurvePlotter({
		height : 300,
		title : "Anom Corr vs Resolution",
		legend : 'never'
	});

	this.annoCorrPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});* */
	
}

AutoProcIntegrationMainView.prototype.getPanel = MainView.prototype.getPanel;


AutoProcIntegrationMainView.prototype.getContainer = function() {
	return  this.autoProcIntegrationGrid.getPanel();
};





/**
* It loads the list of attachments and stores them into two class variables:
* _this.programAttachmentsAutoProcProgramIds with the ids of the autoprocprograms
* _this.programAttachments with a list of attachments
* @method loadAttachments
*/
AutoProcIntegrationMainView.prototype.loadAttachments = function(autoProcessingIntegrationList) {
    var _this = this;
    
     /** Load view for attachments */
	var onSuccess = function(sender, data){
        _this.programAttachments = (data);
	};
    _this.programAttachmentsAutoProcProgramIds = _.map(autoProcessingIntegrationList, 'v_datacollection_summary_phasing_autoProcProgramId');
	EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getAttachmentListByautoProcProgramsIdList(_this.programAttachmentsAutoProcProgramIds);
};	

/**
* It loads autoproc.getViewByDataCollectionId from autoprocessingdataadapter and call to loadAttachments
* @method load
*/
AutoProcIntegrationMainView.prototype.load = function(dataCollectionId) {
	var _this = this;
	this.panel.setTitle("Autoprocessing");
	this.panel.setLoading("Generating plots");
	
	
    /** Load view for autoprocessing */
	var onSuccess2 = function(sender, data){
        _this.data = data[0];
        _this.panel.setLoading(false);
		_this.autoProcIntegrationGrid.load(_this.data);
        _this.loadAttachments(_this.data);
	};
	EXI.getDataAdapter({onSuccess : onSuccess2}).mx.autoproc.getViewByDataCollectionId(dataCollectionId);
};


