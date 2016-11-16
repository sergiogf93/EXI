function CrystalFormView (args) {
    this.id = BUI.id();
    this.padding = 20;
    this.containerId = 0;
	
	if (args != null) {
        if (args.padding != null) {
			this.padding = args.padding;
		}
        if (args.containerId != null) {
			this.containerId = args.containerId;
		}
	}
}



CrystalFormView.prototype.getPanel = function(){
    var _this = this;

	return {
		html : '<div id="' + this.id + '"></div>',
		autoScroll : false,
        padding : this.padding
	}
};

CrystalFormView.prototype.load = function(containerId, sampleId, shippingId){
    var _this = this;
    this.containerId = containerId;
    this.sampleId = sampleId;
    this.shippingId = shippingId;

    var onSuccess = function (sender, puck) {
        if (puck){
            var filtered = _.filter(puck.sampleVOs,function (o) {return o.blSampleId == _this.sampleId});
            if (filtered.length > 0) {
                _this.sample = filtered[0];
                
                var html = "";
                dust.render("crystal.form.template", _this.sample, function(err, out) {                                                                       
                    html = html + out;
                });

                $("#" + this.id).html(html);

            }
        }
    }

	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.getContainerById(this.containerId,this.containerId,this.containerId);
};