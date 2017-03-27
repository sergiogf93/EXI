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
    this.id = BUI.id();
	
    /* _this.programAttachments = [];
     _this.programAttachmentsAutoProcProgramIds = [];
	
	this.slaveWidth = 450;
	*/
	this.autoProcIntegrationGrid = new AutoProcIntegrationGrid({height:300});
	
	/*this.autoProcIntegrationGrid.onSelected.attach(function(sender, records){
		var ids = [];        
		for (var i = 0; i < records.length; i++) {
			ids.push(records[i].v_datacollection_summary_phasing_autoProcIntegrationId);
		}		
		
		try{
			_this.loadPlots(ids);
		}
		catch(e){
            console.log("Error loading plots");    
        }	        			
	});*/

}

AutoProcIntegrationMainView.prototype.getPanel = MainView.prototype.getPanel;


AutoProcIntegrationMainView.prototype.getContainer = function() {
    var height = 200;
    var width = 300;
	this.panel = Ext.create('Ext.container.Container', {
            layout: {
                type: 'fit'
            },
            //margin :10,
            //cls : 'border-grid',         
            items: [
              this.autoProcIntegrationGrid.getPanel(),
              {
                  xtype: 'container',
                  layout : 'hbox',
                  margin : 20,
                  items : [{
                      
                      html : '<div id="rfactor">rfactor</div>',
                      width : width,
                      height :height                                            
                  },
                  {
                     
                      html : '<div id="completeness">completeness</div>',
                      width : width,
                      height :height                                            
                  },
                  {
                        html : '<div id="sigmaI">sigmaI</div>',
                    
                      width : width,
                      height :height                                            
                  }
                  ]                                    
              },
               {
                  xtype: 'container',
                  layout : 'hbox',
                  margin : 20,
                  items : [{
                     
                       html : '<div id="cc2">cc2</div>',
                      width : width,
                      height :height                                            
                  },
                  {
                    
                      html : '<div id="sigmaAnno">sigmaAnno</div>',
                      width : width,
                      height :height                                            
                  },
                  {
                      html : '<div id="anno">anno</div>',
                      width : width,
                      height :height                                            
                  }
                  ]                                    
              }
              ]
        });
        return this.panel;
};

/**
* It loads the list of attachments and stores them into two class variables:
* _this.programAttachmentsAutoProcProgramIds with the ids of the autoprocprograms
* _this.programAttachments with a list of attachments
* @method loadAttachments
*/
/*
AutoProcIntegrationMainView.prototype.loadAttachments = function(autoProcessingIntegrationList) {
    var _this = this;
    
  
	var onSuccess = function(sender, data){
        _this.programAttachments = (data);
	};
    _this.programAttachmentsAutoProcProgramIds = _.map(autoProcessingIntegrationList, 'v_datacollection_summary_phasing_autoProcProgramId');
	EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getAttachmentListByautoProcProgramsIdList(_this.programAttachmentsAutoProcProgramIds);
};	
*/
/**
* It loads autoproc.getViewByDataCollectionId from autoprocessingdataadapter and call to loadAttachments
* @method load
*/
AutoProcIntegrationMainView.prototype.load = function(data) {
	var _this = this;
	this.panel.setTitle("Autoprocessing");
	
	this.autoProcIntegrationGrid.load(data);
    
    var autoProcIntegrationId = [];
    var spaceGroups = [];
    
    for (var i = 0; i < data.length; i++) {
        if (data[i].v_datacollection_summary_phasing_autoProcProgramId){
            autoProcIntegrationId.push(data[i].AutoProcIntegration_autoProcIntegrationId);
            var spg = data[i].v_datacollection_summary_phasing_autoproc_space_group;
            if (data[i].v_datacollection_summary_phasing_anomalous) {
                spg += " ANOM";
            }
            spaceGroups.push(spg);
        }
    }
    var getLabels = function (spaceGroups, yLabel) {
        var spg = spaceGroups.slice(0);
        for (var i = 0 ; i < spg.length ; i++) {
            spg[i] += " (" + yLabel + ")";
        }
        return ["Resolution"].concat(spg);
    }

    var annoCorrPlotter = new AutoProcIntegrationCurvePlotter({
        height : 250,
        title : "Anom Corr vs Resolution",
        labels : getLabels(spaceGroups,"Anom Corr"),
        targetId : " anno",
        labelsDiv : " anno_legend",
        strokeWidth : 2.0
    });
    $("#anno").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,EXI.getDataAdapter().mx.autoproc.getXScaleAnnoCorrection(autoProcIntegrationId),"Anom Corr vs Resolution",getLabels(spaceGroups,"Anom Corr"));
    });  
    $("#anno").html(annoCorrPlotter.getHTML());                         
    annoCorrPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleAnnoCorrection(autoProcIntegrationId));	                  
       
    var sigmaAnnoPlotter = new AutoProcIntegrationCurvePlotter({
        height : 250,
        title : "SigAno vs Resolution",
        labels : getLabels(spaceGroups,"SigAno"),
        targetId : " sigmaAnno",
        labelsDiv : " sigmaAnno_legend",
        strokeWidth : 2.0
    });
    $("#sigmaAnno").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,EXI.getDataAdapter().mx.autoproc.getXScaleSigmaAno(autoProcIntegrationId),"SigAno vs Resolution",getLabels(spaceGroups,"SigAno"));
    });
    $("#sigmaAnno").html(sigmaAnnoPlotter.getHTML());                         
    sigmaAnnoPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleSigmaAno(autoProcIntegrationId));
                       
     var cc2Plotter = new AutoProcIntegrationCurvePlotter({
                            height : 250,
                            title : "CC/2 vs Resolution",
                            labels : getLabels(spaceGroups,"CC2"),
                            targetId : " cc2",
                            labelsDiv : " cc2_legend",
                            strokeWidth : 2.0                                                    
                        });
    $("#cc2").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,EXI.getDataAdapter().mx.autoproc.getXScaleCC2(autoProcIntegrationId),"CC/2 vs Resolution",getLabels(spaceGroups,"CC2"));
    });
    $("#cc2").html(cc2Plotter.getHTML());                         
    cc2Plotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCC2(autoProcIntegrationId));
	            
    var rFactorPlotter = new AutoProcIntegrationCurvePlotter({
                        height : 250,
                        title : "Rfactor vs Resolution",
                        labels : getLabels(spaceGroups,"Rfactor"),
                        targetId : " rfactor",
                        labelsDiv : " rfactor_legend",
                        strokeWidth : 2.0
                    });                             
    $("#rfactor").html(rFactorPlotter.getHTML());
    $("#rfactor").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,EXI.getDataAdapter().mx.autoproc.getXScaleRfactor(autoProcIntegrationId),"Rfactor vs Resolution",getLabels(spaceGroups,"Rfactor"));
    });                        
    rFactorPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleRfactor(autoProcIntegrationId));
    
        /** Rfactor */
    var completenessPlotter = new AutoProcIntegrationCurvePlotter({
        height : 250,
        title : "Completeness vs Resolution",
        labels : getLabels(spaceGroups,"Completeness"),
        targetId : " completeness",
        labelsDiv : " completeness_legend",
        strokeWidth : 2.0
    });                             
    $("#completeness").html(completenessPlotter.getHTML());
    $("#completeness").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,EXI.getDataAdapter().mx.autoproc.getXScaleCompleteness(autoProcIntegrationId),"Completeness vs Resolution",getLabels(spaceGroups,"Completeness"));
    });         
    completenessPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCompleteness(autoProcIntegrationId));
    
    var isigmaPlotter = new AutoProcIntegrationCurvePlotter({
        height :250,
        title : "I/SigmaI vs Resolution",
        labels : getLabels(spaceGroups,"I/SigmaI"),
        targetId : " sigmaI",
        labelsDiv : " sigmaI_legend",
        strokeWidth : 2.0
    });
    $("#sigmaI").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,EXI.getDataAdapter().mx.autoproc.getXScaleISigma(autoProcIntegrationId),"Completeness vs Resolution",getLabels(spaceGroups,"I/SigmaI"));
    }); 
    $("#sigmaI").html(isigmaPlotter.getHTML());                         
    isigmaPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleISigma(autoProcIntegrationId));
	                  
};


