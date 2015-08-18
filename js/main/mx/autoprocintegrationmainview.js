AutoProcIntegrationMainView.prototype.getPanel = MainView.prototype.getPanel;

function AutoProcIntegrationMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	var _this = this;
	
	this.autoProcIntegrationGrid = new AutoProcIntegrationGrid({ maxHeight: 400});
	
	this.autoProcIntegrationGrid.onSelected.attach(function(sender, records){
		var ids = [];
		for (var i = 0; i < records.length; i++) {
			ids.push(records[i].autoProcIntegrationId);
		}
		_this.loadPlots(ids);
		
		
		if (records.length == 1){
			var record = _this.getByAutoProcId(records[0].autoProcId);
			if (record != null){
				_this.autoProcIntegrationAttachmentGrid.load(record);
			}
		}
	});
	
	
	this.autoProcIntegrationAttachmentGrid = new AutoProcIntegrationAttachmentGrid({margin : '0 20 0 10', maxHeight: 400});
	
	
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
	})
	
	this.annoCorrPlotter = new AutoProcIntegrationCurvePlotter({
		height : 150,
		title : "Anom Corr vs Resolution",
		legend : 'never'
	});;

	this.annoCorrPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
}


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
	  margin : 10,
	  layout: {
	        	type: 'fit'
	       },
	       flex : 0.5,
	       items : [ 
	                	panel
	       ]
	  
  };
};


AutoProcIntegrationMainView.prototype.getAutoProcPanel = function() {
	return Ext.create('Ext.container.Container', {
		layout: {
	        type: 'fit'
	    },
		margin : 5,
		items : [ 
		          Ext.create('Ext.container.Container', {
		        	 layout: 'hbox',
		        	 margin : '10 0 0 20',
		        	 items : [
		        	          	this.autoProcIntegrationGrid.getPanel(),
		        	          	this.autoProcIntegrationAttachmentGrid.getPanel(),
		        	          ]
		         }),
		         Ext.create('Ext.container.Container', {
		        	 layout: 'hbox', 
		        	 margin : '0 50 0 0',
		        	 items : [
		        	          this.getPlotContainer( this.rFactorPlotter.getPanel()),
		        	          this.getPlotContainer( this.isigmaPlotter.getPanel()),
		        	          this.getPlotContainer( this.completenessPlotter.getPanel())
		        	 ]
		         }),
		         Ext.create('Ext.container.Container', {
		        	 layout: 'hbox', 
		        	 margin : '0 50 0 0',
		        	 items : [
		        	          this.getPlotContainer( this.cc2Plotter.getPanel()),
		        	          this.getPlotContainer( this.sigmaAnnoPlotter.getPanel()),
//		        	          this.getPlotContainer(this.wilsonPlotter.getPanel()),
		        	          this.getPlotContainer(this.annoCorrPlotter.getPanel())
		        	          
		        	 ]
		         })
		    ]
	});
};

AutoProcIntegrationMainView.prototype.getPhasingPanel = function() {
	return Ext.create('Ext.container.Container', {
		layout: {
	        type: 'fit'
	    },
		margin : 5,
		items : [ 
		    ]
	});
};

AutoProcIntegrationMainView.prototype.getContainer = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '10 30 10 10',
				items : [
					{
						tabConfig : {
							title : 'Auto Processing'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							         this.getAutoProcPanel()
							]
						}
						]
				  },
				  {
						tabConfig : {
							title : 'Phasing'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							]
						}
						]
				  }]
		});
};


AutoProcIntegrationMainView.prototype.groupBy = function(array , f ){
	  var groups = {};
	  array.forEach( function( o )
	  {
	    var group = JSON.stringify( f(o) );
	    groups[group] = groups[group] || [];
	    groups[group].push( o );  
	  });
	  return Object.keys(groups).map( function( group ){
		  return groups[group]; 
	  });
	};


AutoProcIntegrationMainView.prototype.loadPlots = function(autoProcIntegrationsIds) {
	this.completenessPlotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleCompleteness(autoProcIntegrationsIds.toString()));
	this.rFactorPlotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleRfactor(autoProcIntegrationsIds.toString()));
	this.isigmaPlotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleISigma(autoProcIntegrationsIds.toString()));
	this.cc2Plotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleCC2(autoProcIntegrationsIds.toString()));
	this.sigmaAnnoPlotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleSigmaAno(autoProcIntegrationsIds.toString()));
//	this.wilsonPlotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleWilson(autoProcIntegrationsIds.toString()));
	this.annoCorrPlotter.loadUrl(EXI.getDataAdapter().mx.autoProcIntegrationDataAdapter.getXScaleAnnoCorrection(autoProcIntegrationsIds.toString()));
};
	
	
AutoProcIntegrationMainView.prototype.load = function(dataCollectionId) {
	var _this = this;
	this.panel.setTitle("Data Collection");
	var onSuccess = function(sender, data){
		_this.data = data;
		var autoProcIntegrationsIds = []; 
		var autoProcs = [];
		for (var i = 0; i < data.length; i++) {
			autoProcIntegrationsIds.push(data[i].autointegration.autoProcIntegrationId);
			autoProcs.push(data[i].autoproc);
		}
		_this.autoProcIntegrationGrid.load(data);
		_this.loadPlots(autoProcIntegrationsIds);
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoProcIntegrationDataAdapter.getByDataCollectionId(dataCollectionId);
};


