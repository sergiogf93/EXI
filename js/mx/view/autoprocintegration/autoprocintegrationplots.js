function AutoProcIntegrationPlots(args) {

}

AutoProcIntegrationPlots.prototype.getPanel = function() {
    var height = 200;
    var width = 300;
    this.panel = Ext.create('Ext.panel.Panel', {
        title : 'Auto-Processing Plots',
        // layout: 'fit',
        cls : 'border-grid',
        margin : 5,
        height : 500,        
        items: [
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
* It loads autoProc results and displays different plots
* @method load
*/
AutoProcIntegrationPlots.prototype.load = function(data) {
	var _this = this;
    
    var autoProcIntegrationId = [];
    var spaceGroups = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].v_datacollection_summary_phasing_autoProcProgramId){
            autoProcIntegrationId.push(data[i].AutoProcIntegration_autoProcIntegrationId);
            spaceGroups.push(data[i].v_datacollection_summary_phasing_autoproc_space_group);
        }
    }
    var labels = ["Resolution"].concat(spaceGroups);

    var annoCorrPlotter = new AutoProcIntegrationCurvePlotter({
        height : 250,
        title : "Anom Corr vs Resolution",
        labels : labels,
        targetId : " anno",
        labelsDiv : " anno_legend",
        strokeWidth : 2.0,
        labelsSeparateLines : false
    });
    $("#anno").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,"anno","Anom Corr vs Resolution",labels);
    });  
    $("#anno").html(annoCorrPlotter.getHTML());                         
    annoCorrPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleAnnoCorrection(autoProcIntegrationId));	                  
       
    var sigmaAnnoPlotter = new AutoProcIntegrationCurvePlotter({
        height : 250,
        title : "SigAno vs Resolution",
        labels : labels,
        targetId : " sigmaAnno",
        labelsDiv : " sigmaAnno_legend",
        strokeWidth : 2.0,
        labelsSeparateLines : false
    });
    $("#sigmaAnno").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,"sigmaAnno","SigAno vs Resolution",labels);
    });
    $("#sigmaAnno").html(sigmaAnnoPlotter.getHTML());                         
    sigmaAnnoPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleSigmaAno(autoProcIntegrationId));
                       
     var cc2Plotter = new AutoProcIntegrationCurvePlotter({
        height : 250,
        title : "CC/2 vs Resolution",
        labels : labels,
        targetId : " cc2",
        labelsDiv : " cc2_legend",
        strokeWidth : 2.0      ,
        labelsSeparateLines : false                                              
    });
    $("#cc2").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,"cc2","CC/2 vs Resolution",labels);
    });
    $("#cc2").html(cc2Plotter.getHTML());                         
    cc2Plotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCC2(autoProcIntegrationId));
	            
    var rFactorPlotter = new AutoProcIntegrationCurvePlotter({
        height : 250,
        title : "Rfactor vs Resolution",
        labels : labels,
        targetId : " rfactor",
        labelsDiv : " rfactor_legend",
        strokeWidth : 2.0,
        labelsSeparateLines : false
    });                             
    $("#rfactor").html(rFactorPlotter.getHTML());
    $("#rfactor").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,"rfactor","Rfactor vs Resolution",labels);
    });                        
    rFactorPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleRfactor(autoProcIntegrationId));
    
        /** Rfactor */
    var completenessPlotter = new AutoProcIntegrationCurvePlotter({
        height : 250,
        title : "Completeness vs Resolution",
        labels : labels,
        targetId : " completeness",
        labelsDiv : " completeness_legend",
        strokeWidth : 2.0,
        labelsSeparateLines : false
    });                             
    $("#completeness").html(completenessPlotter.getHTML());
    $("#completeness").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,"completeness","Completeness vs Resolution",labels);
    });         
    completenessPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCompleteness(autoProcIntegrationId));
    
    var isigmaPlotter = new AutoProcIntegrationCurvePlotter({
        height :250,
        title : "I/SigmaI vs Resolution",
        labels : labels,
        targetId : " sigmaI",
        labelsDiv : " sigmaI_legend",
        strokeWidth : 2.0,
        labelsSeparateLines : false
    });
    $("#sigmaI").unbind('click').click(function(sender){
        var curveViewer = new CurveViewer();
        curveViewer.show();
        curveViewer.load(autoProcIntegrationId,"sigmaI","Completeness vs Resolution",labels);
    }); 
    $("#sigmaI").html(isigmaPlotter.getHTML());                         
    isigmaPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleISigma(autoProcIntegrationId));               
};