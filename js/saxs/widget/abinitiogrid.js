

function AbinitioGrid(args) {
	this.height = null;
	this.width = null;
	this.id = BUI.id();

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;

			if (args.width != null) {
				this.width = args.width;
			}
		}
	}
	
	this.onSelected = new Event(this);
}


AbinitioGrid.prototype.refresh = function(subtractions){
    $('#' + this.id).html(this.doTemplate(this._prepareData(subtractions)));
};

AbinitioGrid.prototype._prepareData = function(subtractions){
	/** Parsing data * */
	var models = [];
	for (var l = 0; l < subtractions.length; l++) {
		var subtraction = subtractions[l];
		for (var k = 0; k < subtraction.substractionToAbInitioModel3VOs.length; k++) {
			var data = subtraction.substractionToAbInitioModel3VOs[k].abinitiomodel3VO;
			if (data.averagedModel != null) {
				models.push(data.averagedModel);
				models[models.length - 1].type = "Reference";
			}
	
			if (data.shapeDeterminationModel != null) {
				models.push(data.shapeDeterminationModel);
				models[models.length - 1].type = "Refined";
			}
	
			if (data.modelList3VO != null) {
				if (data.modelList3VO.modeltolist3VOs != null) {
					for (var i = 0; i < data.modelList3VO.modeltolist3VOs.length; i++) {
						models.push(data.modelList3VO.modeltolist3VOs[i].model3VO);
						models[models.length - 1].type = "Model";
					}
				}
			}
		}
	}
    console.log(models)
	return models;
};

AbinitioGrid.prototype.doTemplate = function(data){
    var html = "";
    dust.render("abinitiogrid.template", data, function(err, out) {                                                                                               
		html = html + out;
	});
    return html;
};

AbinitioGrid.prototype.getPanel = function(){
	
	
    var html = this.doTemplate({});
	
	return [{
		html : '<div id="' + this.id + '">' + html + '</div>',
		autoScroll : true,
        border : 1,
        padding : 0,
		height : this.height
	}];
};