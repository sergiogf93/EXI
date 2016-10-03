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
	});

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


