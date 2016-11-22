function ShipmentEditForm(args) {
    this.id = BUI.id();

    this.width = 600;
    this.height = 200;
	this.showTitle = true;
	if (args != null) {
		if (args.showTitle != null) {
			this.showTitle = args.showTitle;
		}
        if (args.width != null) {
			this.width = args.width;
		}
        if (args.height != null) {
			this.height = args.height;
		}
	}
}

ShipmentEditForm.prototype.getPanel = function(dewar) {

    var html = "";
    dust.render("shipping.form.template", {id : this.id}, function(err, out){
		html = out;
	});

    this.panel =  {
                    html : '<div id="' + this.id + '" class="border-grid">' + html + '</div>',
                    autoScroll : false,
					padding : this.padding,
					width : this.width
                };

	return this.panel;
};
