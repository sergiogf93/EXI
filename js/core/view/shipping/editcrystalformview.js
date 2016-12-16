function EditCrystalFormView (args) {
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

	this.onSaved = new Event(this);
};

EditCrystalFormView.prototype.getPanel = function() {

	this.panel = Ext.create("Ext.panel.Panel",{
		items :	[{
					html : '<div id="' + this.id + '"></div>',
					autoScroll : false,
					padding : this.padding,
					width : this.width
				}]
	});

	return this.panel;
};

EditCrystalFormView.prototype.load = function(crystal) {

	this.crystal = crystal;
    this.crystal.id = this.id;
    this.crystal.spaceGroups = ExtISPyB.spaceGroups;

    var html = "";
	
    dust.render("crystal.edit.form.template", this.crystal, function(err, out){
		html = out;
	});
	
	$('#' + this.id).hide().html(html).fadeIn('fast');
	this.panel.doLayout();
};

EditCrystalFormView.prototype.save = function () {
    var crystal = {
                    spaceGroup  :   $("#" + this.id + "-space-group").val(),
                    cellA       :   $("#" + this.id + "-cellA").val(),
                    cellB       :   $("#" + this.id + "-cellB").val(),
                    cellC       :   $("#" + this.id + "-cellC").val(),
                    cellAlpha   :   $("#" + this.id + "-cellAlpha").val(),
                    cellBeta    :   $("#" + this.id + "-cellBeta").val(),
                    cellGamma   :   $("#" + this.id + "-cellGamma").val()
                };
    this.onSaved.notify(crystal);
};