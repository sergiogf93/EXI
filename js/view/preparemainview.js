function PrepareMainView() {
	this.icon = '../images/icon/contacts.png';
	this.queueGridList = [];

	MainView.call(this);

	//this.puckLayout = new PuckPanel({width : 150, tbar : false});
	this.containerSpreadSheet = new PrepareSpreadSheet({width : 1300});
	
	this.containerSpreadSheet.onModified.attach(function(sender, puck){
		//_this.loadPlateLayout(puck);
	});
	
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

PrepareMainView.prototype.getPanel = MainView.prototype.getPanel;

PrepareMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
        cls : 'border-grid',
	    defaults: {
	        labelWidth: 80,
	        flex: 1,
	    },
	    items: [this.containerSpreadSheet.getPanel([])]
	});
};


PrepareMainView.prototype.load = function(dewars) {
	
	this.panel.setTitle("Prepare Experiment");
	var _this = this;
	var onSuccess = function(sender, data){
		
	};
    console.log(dewars);
	this.containerSpreadSheet.load(dewars);
	//EXI.getDataAdapter({onSuccess : onSuccess}).proposal.labcontacts.getLabContactById(labContactId);
	
	
};
