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

	this.abinitioGrid.onSelected.attach(function(sender, models) {
		var modelsIdList = [];
		for ( var i in models) {
			modelsIdList.push(models[i].modelId);
		}
		
		_this.curvePlotter.loadUrl(EXI.getDataAdapter().saxs.frame.getFramesURL([],[],[],[],[],modelsIdList));
		_this._renderPDB(modelsIdList);
	});

	/** Dygraph Widget that plots fir files**/
	this.curvePlotter = new CurvePlotter({
	});
	/** PDB viewer **/
	this.viewer = new PDBViewer({
		width : 500,
		height : 300
	});

}


AbinitioForm.prototype._renderPDB = function(modelsIdList) {
	/** Trying to plot the PDB file **/
	try {
		var viz = [];
		for (var i = 0; i < modelsIdList.length; i++) {
			viz.push({
				modelId : modelsIdList[i],
				color : "0xFF6600",
				opacity : 0.8
			});
		}
		this.viewer.refresh(viz);
	} catch (e) {
		console.log(e);
	}
};



AbinitioForm.prototype.getPanel = function() {
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
		width : this.width,
		cls : 'border-grid',
		layout : 'hbox',
		height : this.height,
		margin : 5,
		border : 1,
		defaultType : 'textfield',
		items : [
						{
							xtype : 'container',
							layout : 'vbox',
							items : [
//										{
//											xtype : 'label',
//											forId : 'myFieldId',
//											text : 'INLINE HELP: To be updated',
//											margin : '15 0 20 10',
//											cls : "inline-help"
//										}, 
										this.abinitioGrid.getPanel() 
									]
						},
						{
							xtype : 'container',
							layout : 'vbox',
							items : [
										{
											xtype : 'container',
											layout : 'fit',
											height : 300,
											margin : '10 0 0 0',
											width : 500,
											items : [
											         	this.curvePlotter.getPanel()
										     ]
										},
							         this.viewer.getPanel() 
					         ]
						}
         ]
	});
	return this.panel;
};


/** It populates the form * */
AbinitioForm.prototype.load = function(subtractions) {
	this.subtractions = subtractions;
	this.abinitioGrid.refresh(subtractions);
};
