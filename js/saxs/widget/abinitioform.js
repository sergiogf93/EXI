/**
 * Example form
 * 
 * @witdh
 * @height
 */
function AbinitioForm(args) {
	this.id = BUI.id();
	this.width = null;
	this.height = null;

	if (args != null) {
		if (args.width != null) {
			this.width = args.width;
		}
		if (args.height != null) {
			this.height = args.height;
		}
	}

	var _this = this;
	/** Widgets **/
	this.abinitioGrid = new AbinitioGrid({
		width : 700,
		height : 600
	});
}



AbinitioForm.prototype.getPanel = function() {
	return this.abinitioGrid.getPanel();
};


/** It populates the form * */
AbinitioForm.prototype.load = function(subtractions) {
	this.subtractions = subtractions;
	this.abinitioGrid.refresh(subtractions);
};
