MacromoleculeMainView.prototype.getPanel = MainView.prototype.getPanel;

function MacromoleculeMainView() {
	
	this.icon = '../images/icon/macromolecule.png';
	this.queueGridList = [];

	MainView.call(this);

	this.macromoleculeForm = new MacromoleculeForm({
		height : 800,
		collapsed : false,
		tbar : true
	});
	
	var _this = this;
//	this.bufferGrid.onUpdated.attach(function(sender){
//		_this.load();
//	});
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

MacromoleculeMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

MacromoleculeMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

MacromoleculeMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 0',
				items : [
					{
						tabConfig : {
							title : 'General'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							         
							         this.macromoleculeForm.getPanel()
							]
						}

						]
					}
			]});
};


MacromoleculeMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    items: [
	            this.getTabs()
	            ]
	});
};


MacromoleculeMainView.prototype.load = function(macromoleculeId) {
	this.panel.setLoading();
	var macromolecule = EXI.proposalManager.getMacromoleculeById(macromoleculeId);
	this.panel.setTitle(macromolecule.acronym);
//	manager.onSuccess.attach(function(sender, proposals){
//		_this.macromoleculeGrid.load(EXI.proposalManager.getMacromolecules());
//	});
	this.macromoleculeForm.load(macromolecule);
	this.panel.setLoading(false);
};
