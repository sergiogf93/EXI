function AutoProcIntegrationMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	var _this = this;
	
	
	this.slaveWidth = 600;
	
	this.autoProcIntegrationGrid = new AutoProcIntegrationGrid({ maxHeight: 900});
	
	this.autoProcIntegrationGrid.onSelected.attach(function(sender, records){
		var ids = [];
		for (var i = 0; i < records.length; i++) {
			ids.push(records[i].autoProcIntegrationId);
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
				_this.autoProcIntegrationAttachmentGrid.load(record);
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
		
		_this.phasingNetworkWidget.load(tmp);
		
	});
	
	this.autoProcIntegrationAttachmentGrid = new AutoProcIntegrationAttachmentGrid({
																					width : this.slaveWidth, 
																					margin: 5
																					
	});
	
	/** Netowkrwidget for phasing **/
	this.phasingNetworkWidget = new PhasingNetworkWidget({tbar : "OPEN_VIEWER"});
	
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


AutoProcIntegrationMainView.prototype.getByAutoProcProgramAttachmentId = function(autoProcProgramAttachmentId) {
	for (var i = 0; i < this.data.length; i++) {
		for (var j = 0; j < this.data[i].autoprocprogram.attachmentVOs.length; j++) {
				var attachment = this.data[i].autoprocprogram.attachmentVOs[j];
				if (attachment.autoProcProgramAttachmentId == autoProcProgramAttachmentId){
					return this.data[i];
					
				} 
		}
	}
};



AutoProcIntegrationMainView.prototype.getByAutoProcId = function(autoProcId) {
	for (var i = 0; i < this.data.length; i++) {
				if (this.data[i].autoproc.autoProcId == autoProcId){
					return this.data[i];
				} 
	}
};


AutoProcIntegrationMainView.prototype.onPlotClicked = function(autoProcProgramAttachmentId) {
	var record = this.getByAutoProcProgramAttachmentId(autoProcProgramAttachmentId);
	if (record != null){
		this.autoProcIntegrationGrid.selectRowByAutoProcIntegrationId(record.autointegration.autoProcIntegrationId);
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
	    }, {
	        title: 'Phasing',
	        items : this.phasingNetworkWidget.getPanel()
	    }, {
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
				items : [
					{
							xtype : 'container',
							layout : 'fit',
							cls : 'border-grid',
							items : [ 
													Ext.create('Ext.container.Container', {
														 layout: 'hbox',
														 margin : '10 0 0 10',
														 items : [
														          	this.autoProcIntegrationGrid.getPanel(),
														          	this.getSlaveTabPanel()
														          ]
													})
							          
							]
						}
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




	
AutoProcIntegrationMainView.prototype.load = function(dataCollectionId) {
	var _this = this;
	this.panel.setTitle("Autoprocessing");
	this.panel.setLoading("Generating plots");
	var onSuccess = function(sender, data){
		_this.data = data;
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getByDataCollectionId(dataCollectionId);
	
	var onSuccess2 = function(sender, data){
		_this.autoProcIntegrationGrid.load(data);
		data =  BUI.groupBy(data[0], function(item){
			  			return [item.v_datacollection_summary_phasing_autoProcIntegrationId];
		});
		var autoProcIntegrationIds = [];
		for (var i = 0; i < data.length; i++) {
			autoProcIntegrationIds.push(data[i][0].v_datacollection_summary_phasing_autoProcIntegrationId);
		}
		_this.autoProcIntegrationPhasingViewList = data;
		
		
		_this.panel.setLoading(false);
		_this.loadPlots(autoProcIntegrationIds);
		//_this.phasingNetworkWidget.load(data);
	};
	EXI.getDataAdapter({onSuccess : onSuccess2}).mx.phasing.getViewByDataCollectionId(dataCollectionId);
};


