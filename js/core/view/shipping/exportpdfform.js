function ExportPDFForm(args) {
    this.id = BUI.id();

    this.templateData = {id : this.id};
}

ExportPDFForm.prototype.show = function(){
    var _this = this;
    
    var html = "";
    dust.render("export.pdf.form.template", this.templateData, function(err,out){
        html = out;
    });

    $("body").append(html);
    // $("#" + this.id + "-save").unbind('click').click(function(sender){
    //     _this.save();
    // });

    $("#" + this.id + "-dewars").multiselect({
													enableFiltering: true,
													enableCaseInsensitiveFiltering: true,
													includeSelectAllOption: true
												});

    $("#" + this.id + "-modal").on('hidden.bs.modal', function(){
        $(this).remove();
    });
    
    $("#" + this.id + "-modal").modal();
};


ExportPDFForm.prototype.load = function (shipment) {
    this.templateData.shipment = shipment;
}
