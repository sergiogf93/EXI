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
		try{
			_this.loadPlots(ids);
		}
		catch(e){}
		if (records.length == 1){
			debugger
			var record = _this.getByAutoProcId(records[0].v_datacollection_summary_phasing_autoproc_autoprocId);
			if (record != null){
				_this.autoProcIntegrationAttachmentGrid.load(record);
			}
		}
	});
	
	this.autoProcIntegrationAttachmentGrid = new AutoProcIntegrationAttachmentGrid({margin : '0 20 0 10', maxHeight: 400, width : 300});
	
	
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
	
	
	/** Phasing **/
	this.autoProcIntegrationPhasingGrid = new AutoProcIntegrationGrid({ maxHeight: 500});

	this.autoProcIntegrationPhasingGrid.onSelected.attach(function(sender, records){
		var ids = [];
		for (var i = 0; i < records.length; i++) {
			ids.push(records[i].autoProcId);
		}
		
		_this.phasingGrid.panel.setLoading(); 
		
		var onSuccessPhasing = function(sender, data){
			var parsed = [];
			if (data != null){
				if (data.length > 0){
					if (data[0].phasinganalysis != null){
						for (var i = 0; i < data[0].phasinganalysis.length; i++) {
							var j = 0;
							if (data[0].phasinganalysis[i].modelbuilding.length > 0){
								for (j = 0; j < data[0].phasinganalysis[i].modelbuilding.length; j++) {
									parsed.push(data[0].phasinganalysis[i].modelbuilding[j]);
									parsed[parsed.length -1]["name"] = "modelbuilding";
									parsed[parsed.length -1] = $.extend({}, parsed[parsed.length -1], data[0].phasinganalysis[i].modelbuilding[j].spaceGroupVO);
									parsed[parsed.length -1]["phasingAnalysisId"] =  data[0].phasinganalysis[i].modelbuilding[j].phasingAnalysisVO.phasingAnalysisId;
								}
							}
							
							if (data[0].phasinganalysis[i].preparephasingdata.length > 0){
								for ( j = 0; j < data[0].phasinganalysis[i].preparephasingdata.length; j++) {
									parsed.push(data[0].phasinganalysis[i].preparephasingdata[j]);
									parsed[parsed.length -1]["name"] = "preparephasingdata";
									parsed[parsed.length -1] = $.extend({}, parsed[parsed.length -1], data[0].phasinganalysis[i].preparephasingdata[j].spaceGroupVO);
									parsed[parsed.length -1]["phasingAnalysisId"] =  data[0].phasinganalysis[i].preparephasingdata[j].phasingAnalysisVO.phasingAnalysisId;
								}
							}
							
							if (data[0].phasinganalysis[i].phasing.length > 0){
								for (j = 0; j < data[0].phasinganalysis[i].phasing.length; j++) {
									parsed.push(data[0].phasinganalysis[i].phasing[j]);
									parsed[parsed.length -1]["name"] = "phasing";
									parsed[parsed.length -1] = $.extend({}, parsed[parsed.length -1], data[0].phasinganalysis[i].phasing[j].spaceGroup3VO);
									parsed[parsed.length -1]["phasingAnalysisId"] =  data[0].phasinganalysis[i].phasing[j].phasingAnalysisVO.phasingAnalysisId;
								}
							}
		
							if (data[0].phasinganalysis[i].substructureDetermination3VO.length > 0){
								for (j = 0; j < data[0].phasinganalysis[i].substructureDetermination3VO.length; j++) {
									parsed.push(data[0].phasinganalysis[i].substructureDetermination3VO[j]);
									parsed[parsed.length -1]["name"] = "substructureDetermination";
									parsed[parsed.length -1] = $.extend({}, parsed[parsed.length -1], data[0].phasinganalysis[i].substructureDetermination3VO[j].spaceGroupVO);
									parsed[parsed.length -1]["phasingAnalysisId"] =  data[0].phasinganalysis[i].substructureDetermination3VO[j].phasingAnalysisVO.phasingAnalysisId;
								}
							}
							
							
						}
					}
				}
			}
			
			_this.phasingGrid.load(parsed);
			_this.phasingGrid.panel.setLoading(false);
			
		};
		EXI.getDataAdapter({onSuccess : onSuccessPhasing}).mx.autoproc.getPhasingByAutoprocIds(ids);
		
	});
	
	this.phasingGrid = new PhasingGrid({margin : '0 0 0 10'});
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
		        	          	this.autoProcIntegrationAttachmentGrid.getPanel()
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
		        	          this.getPlotContainer(this.annoCorrPlotter.getPanel())
		        	          
		        	 ]
		         })
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
				  }
				  ]
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
 	this.completenessPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCompleteness(autoProcIntegrationsIds.toString()));
	this.rFactorPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleRfactor(autoProcIntegrationsIds.toString()));
	this.isigmaPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleISigma(autoProcIntegrationsIds.toString()));
	this.cc2Plotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCC2(autoProcIntegrationsIds.toString()));
	this.sigmaAnnoPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleSigmaAno(autoProcIntegrationsIds.toString()));
	this.annoCorrPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleAnnoCorrection(autoProcIntegrationsIds.toString()));
};


AutoProcIntegrationMainView.prototype.loadGeneral = function(dataCollection) {
	for (var key in dataCollection){
		Ext.getCmp(this.id + "general").insert({
			xtype : 'container',
			
			layout : 'hbox',
			items : [ 
			          {
					        xtype: 'label',
					        forId: 'myFieldId',
					        text: key + ':',
					        margin: '0 0 0 10'
					  },
					  {
					        xtype: 'label',
					        forId: 'myFieldId',
					        text: dataCollection[key],
					        margin: '0 0 0 10'
					    }
			]
		});
	}
};
	


	
AutoProcIntegrationMainView.prototype.load = function(dataCollectionId) {
	var _this = this;
	this.panel.setTitle("Data Collection");
	this.panel.setLoading("Generating plots");
	var onSuccess = function(sender, data){
		_this.data = data;
//		var autoProcIntegrationsIds = []; 
//		var autoProcs = [];
//		var autoProcIds = [];
//		for (var i = 0; i < data.length; i++) {
//			autoProcIntegrationsIds.push(data[i].autointegration.autoProcIntegrationId);
//			autoProcs.push(data[i].autoproc);
//			autoProcIds.push(data[i].autoproc.autoProcId);
//		}
////		_this.autoProcIntegrationGrid.load(data);
//		_this.panel.setLoading(false);
//		
////		_this.loadPlots(autoProcIntegrationsIds);
//	
//		
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getByDataCollectionId(dataCollectionId);
	
	var onSuccess2 = function(sender, data){
		
		data =  BUI.groupBy(data[0], function(item){
			  			return [item.v_datacollection_summary_phasing_autoProcIntegrationId];
		});
		var autoProcIntegrationIds = [];
		for (var i = 0; i < data.length; i++) {
			autoProcIntegrationIds.push(data[i][0].v_datacollection_summary_phasing_autoProcIntegrationId);
		}
		_this.autoProcIntegrationGrid.load(data);
		_this.panel.setLoading(false);
		console.log(data);
		_this.loadPlots(autoProcIntegrationIds);
	}
	EXI.getDataAdapter({onSuccess : onSuccess2}).mx.phasing.getViewByDataCollectionId(dataCollectionId);
};


