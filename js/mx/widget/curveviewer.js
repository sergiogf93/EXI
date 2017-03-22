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

    // if (this.curvePlotter){
    //     $("#" + this.id + "-plot").html(this.curvePlotter.getHTML());
    // }

    $("#" + this.id + "-modal").on('hidden.bs.modal', function(){
        $(this).remove();
    });
    
    $("#" + this.id + "-modal").modal();
};

CurveViewer.prototype.load = function (autoProcIntegrationId, plotType, title) {
    this.autoProcIntegrationId = autoProcIntegrationId;
    this.plotType = plotType;
    $("#" + this.id + "-title").html(title);
    switch (plotType){
        case "completeness":
            this.curvePlotter = new AutoProcIntegrationCurvePlotter({
                                                                        height : 600,
                                                                        width : 800,
                                                                        // title : "Completeness vs Resolution",
                                                                        // legend : 'never',
                                                                        targetId : this.id + "- plot"
                                                                    });
           $("#" + this.id + "-plot").html(this.curvePlotter.getHTML());
           this.curvePlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCompleteness(autoProcIntegrationId)); 
           break;
    }
};