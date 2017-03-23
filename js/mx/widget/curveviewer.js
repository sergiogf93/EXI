function CurveViewer(args) {
    this.id = BUI.id();

    this.templateData = {id : this.id};
};

CurveViewer.prototype.show = function(){
    var _this = this;
    
    var html = "";
    dust.render("curve.viewer.template", this.templateData, function(err,out){
        html = out;
    });

    $("body").append(html);

    $("#" + this.id + "-modal").on('hidden.bs.modal', function(){
        $(this).remove();
    });
    
    $("#" + this.id + "-modal").modal();
};

CurveViewer.prototype.load = function (autoProcIntegrationId, plotType, title,labels) {
    this.autoProcIntegrationId = autoProcIntegrationId;
    this.plotType = plotType;
    $("#" + this.id + "-title").html(title);
    this.curvePlotter = new AutoProcIntegrationCurvePlotter({
                                                                height : 600,
                                                                targetId : this.id + "-plot",
                                                                labels : labels
                                                            });
    switch (plotType){
        case "completeness":
            this.curvePlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCompleteness(autoProcIntegrationId)); 
            break;
        case "anno":
            this.curvePlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleAnnoCorrection(autoProcIntegrationId)); 
            break;
        case "sigmaAnno":
            this.curvePlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleSigmaAno(autoProcIntegrationId)); 
            break;
        case "cc2":
            this.curvePlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCC2(autoProcIntegrationId)); 
            break;
        case "rfactor":
            this.curvePlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleRfactor(autoProcIntegrationId)); 
            break;
        case "sigmaI":
            this.curvePlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleISigma(autoProcIntegrationId)); 
            break;
    }

    // Redraw modal
    var modal = document.getElementById(this.id + "-modal");
    modal.style.display='none';
    modal.offsetHeight; // no need to store this anywhere, the reference is enough
    modal.style.display='block';

};