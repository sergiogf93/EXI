PuckMainView.prototype.getPanel = MainView.prototype.getPanel;
PuckMainView.prototype.getContainer = MainView.prototype.getContainer;

function PuckMainView() {
	
	this.icon = '../images/BasketView_24x24_01.png';
	MainView.call(this);
	
	var _this = this;
	this.puckForm = new PuckForm();
}



PuckMainView.prototype.getContainer = function() {
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
		 items: [ this.puckForm.getPanel()]
	});

};


PuckMainView.prototype.load = function(containerId) {
	
	var _this = this;
	this.panel.setTitle("Puck");
	if (containerId != null){
		var onSuccess = (function(sender, puck){
			_this.puckForm.load(puck);
		});
		EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.getContainerById(containerId,containerId,containerId);
	}
};
