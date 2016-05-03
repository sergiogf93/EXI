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
	
	this.slaveWidth = 600;
	
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
		catch(e){}
		
		/** Loading attachments **/
		if (records.length == 1){    
          
        
                                                               
			var record = _this.getByAutoProcId(records[0].v_datacollection_summary_phasing_autoproc_autoprocId);
			if (record != null){
				_this.autoProcIntegrationAttachmentGrid.load(_this.programAttachments[_.findIndex(_this.programAttachmentsAutoProcProgramIds, function(o) { return o == records[0].v_datacollection_summary_phasing_autoProcProgramId; })]);
			}
		}
		
		
		/** Loading phasing network **/
		var tmp = [].concat.apply([], _this.autoProcIntegrationPhasingViewList);
		var filtered = [];
		for ( i = 0; i < tmp.length; i++) {
			if ( tmp[i].v_datacollection_summary_phasing_autoProcIntegrationId == records[0].v_datacollection_summary_phasing_autoProcIntegrationId){
				filtered.push( tmp[i]);
			}
		}
		
		//_this.phasingNetworkWidget.load(tmp);
		
	});
	
	this.autoProcIntegrationAttachmentGrid = new AutoProcIntegrationAttachmentGrid({
																					width : this.slaveWidth, 
																					margin: 5
																					
	});
	
	/** Netowkrwidget for phasing **/
	//this.phasingNetworkWidget = new PhasingNetworkWidget({tbar : "OPEN_VIEWER"});
	
	/** Curve completenessPlotter * */
	this.completenessPlotter = new AutoProcIntegrationCurvePlotter({
		height : 150,
		title : "Completeness vs Resolution",
		legend : 'never'
	});
	
	this.completenessPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.rFactorPlotter = new AutoProcIntegrationCurvePlotter({
		height : 150,
		title : "Rfactor vs Resolution",
		legend : 'never'
	});
	
	this.rFactorPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.isigmaPlotter = new AutoProcIntegrationCurvePlotter({
		height : 150,
		title : "I/SigmaI vs Resolution",
		legend : 'never'
	});

	this.isigmaPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.cc2Plotter = new AutoProcIntegrationCurvePlotter({
		height : 150,
		title : "CC/2 vs Resolution",
		legend : 'never'
	});
	
	this.cc2Plotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.sigmaAnnoPlotter = new AutoProcIntegrationCurvePlotter({
		height : 150,
		title : "SigAno vs Resolution",
		legend : 'never'
	});
	
	this.sigmaAnnoPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.wilsonPlotter = new AutoProcIntegrationCurvePlotter({
		height : 150,
		title : "Wilson Plot",
		legend : 'never'
	});
	
	this.wilsonPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.annoCorrPlotter = new AutoProcIntegrationCurvePlotter({
		height : 150,
		title : "Anom Corr vs Resolution",
		legend : 'never'
	});

	this.annoCorrPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
}

AutoProcIntegrationMainView.prototype.getPanel = MainView.prototype.getPanel;






AutoProcIntegrationMainView.prototype.getByAutoProcId = function(autoProcId) {
	for (var i = 0; i < this.data.length; i++) {
				if (this.data[i].v_datacollection_summary_phasing_autoproc_autoprocId == autoProcId){
					return this.data[i];
				} 
	}
};

/**
* It retrieves the AutoprocIntegrationId of a given autoProcProgramAttachmentId
* @method getAutoprocIntegrationIdByautoProcProgramAttachmentId
*/
AutoProcIntegrationMainView.prototype.getAutoprocIntegrationIdByautoProcProgramAttachmentId = function(autoProcProgramAttachmentId) {
    var _this = this;
    var autoProcAttachment = _.find(_.flatten(this.programAttachments), function(o){return o.autoProcProgramAttachmentId == autoProcProgramAttachmentId;});
     
    var fnEqualAutoProcProgramAttachmentId = function(o){return o.autoProcProgramAttachmentId == autoProcProgramAttachmentId;};
    var fnEqualautoProcProgramId = function(o){return o.v_datacollection_summary_phasing_autoProcProgramId == _this.programAttachmentsAutoProcProgramIds[i];};
    for (var i = 0; i < this.programAttachments.length; i++){
        var autoprocProgram = _.find(this.programAttachments[i], fnEqualAutoProcProgramAttachmentId);
        if (autoprocProgram != null){
               return _.find(this.data, fnEqualautoProcProgramId);
        }        
    }
};

/**
* It selects the row on the grid which autprocProgramAttachmedId is given
* @method onPlotClicked
*/
AutoProcIntegrationMainView.prototype.onPlotClicked = function(autoProcProgramAttachmentId) {
    
   var autoProcIntegration = this.getAutoprocIntegrationIdByautoProcProgramAttachmentId(autoProcProgramAttachmentId);
   if (autoProcIntegration){
        this.autoProcIntegrationGrid.selectRowByAutoProcIntegrationId(autoProcIntegration.v_datacollection_summary_phasing_autoProcIntegrationId);
   }
};

AutoProcIntegrationMainView.prototype.getPlotContainer = function(panel) {
	return {
  	  xtype : 'container',
	  margin : 5,
	  layout: {
	        	type: 'fit'
        },
        flex :1,
        items : [ 
                    panel
        ]
	  
  };
};


AutoProcIntegrationMainView.prototype.getAutoProcPanel = function() {
	return Ext.create('Ext.container.Container', {
		
		items : [ 
		         Ext.create('Ext.container.Container', {
		        	 layout: 'hbox', 
		        	 margin : '0 50 0 0',
		        	 items : [
		        	          this.getPlotContainer( this.rFactorPlotter.getPanel())
		        	         
		        	 ]
		         }),
		         Ext.create('Ext.container.Container', {
		        	 layout: 'hbox', 
		        	 margin : '0 50 0 0',
		        	 items : [
		        	          this.getPlotContainer( this.isigmaPlotter.getPanel())
		        	         
		        	 ]
		         }),
		         Ext.create('Ext.container.Container', {
		        	 layout: 'hbox', 
		        	 margin : '0 50 0 0',
		        	 items : [
		        	          this.getPlotContainer( this.sigmaAnnoPlotter.getPanel()),
		        	         
		        	 ]
		         }),
		         Ext.create('Ext.container.Container', {
		        	 layout: 'hbox', 
		        	 margin : '0 50 0 0',
		        	 items : [
		        	         
		        	          this.getPlotContainer( this.completenessPlotter.getPanel())
		        	          
		        	 ]
		         }),
		         Ext.create('Ext.container.Container', {
		        	 layout: 'hbox', 
		        	 margin : '0 50 0 0',
		        	 items : [
		        	          this.getPlotContainer(this.annoCorrPlotter.getPanel())
		        	          
		        	 ]
		         }),
		         Ext.create('Ext.container.Container', {
		        	 layout: 'hbox', 
		        	 margin : '0 50 0 0',
		        	 items : [
		        	          this.getPlotContainer( this.cc2Plotter.getPanel()),
		        	          
		        	 ]
		         })
		    ]
	});
};

AutoProcIntegrationMainView.prototype.getSlaveTabPanel = function() {
	return Ext.create('Ext.tab.Panel', {
		margin : '0 5 5 5',
		cls : 'border-grid',
		width : this.slaveWidth,
      
	    items: [{
	        title: 'Autoprocessing Plots',
	        items :  this.getAutoProcPanel()
	    }, 
        /*{
	        title: 'Phasing',
	        items : this.phasingNetworkWidget.getPanel()
	    },*/
         {
	        title: 'Files',
	        items : this.autoProcIntegrationAttachmentGrid.getPanel()
	    }
	    
	    
	    ]
	}); 
};

AutoProcIntegrationMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '10 30 10 10',
                 layout: 'hbox',
				items : [
                            this.autoProcIntegrationGrid.getPanel(),
                            this.getSlaveTabPanel()
				  ]
		});
};



AutoProcIntegrationMainView.prototype.loadPlots = function(autoProcIntegrationsIds) {
 	this.completenessPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCompleteness(autoProcIntegrationsIds.toString()));
	this.rFactorPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleRfactor(autoProcIntegrationsIds.toString()));
	this.isigmaPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleISigma(autoProcIntegrationsIds.toString()));
	this.cc2Plotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCC2(autoProcIntegrationsIds.toString()));
	this.sigmaAnnoPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleSigmaAno(autoProcIntegrationsIds.toString()));
	this.annoCorrPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleAnnoCorrection(autoProcIntegrationsIds.toString()));
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


