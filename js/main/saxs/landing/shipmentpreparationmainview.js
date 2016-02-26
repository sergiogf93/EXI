function ShipmentPreparationMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "How to prepare a Shipment?";
	this.closable = false;
	
}

ShipmentPreparationMainView.prototype.getPanel = MainView.prototype.getPanel;
ShipmentPreparationMainView.prototype.getContainer = MainView.prototype.getContainer;

ShipmentPreparationMainView.prototype.getContainer = function() {
	var text= "The aim of a BioSAXS experiment is to determine the low resolution shape of a macromolecule in solution \n" + 
			"under physiological conditions. In order to define an experiment or create a shipment ISPyB needs to know the macromolecules and buffers that compose your samples";
	
	return {
		    cls : 'border-grid',
		    margin : 10,
			items : [
						{
							 html : '<div class="welcome-title"><h2>How to define my samples on ISPyB?</h2> </div>'
						},
						{
							 html : '<div class="help-text"> ' + text +'</div>'
						},
						{
							 html :'<div class="welcome-title"><h4>What is a macromolecule and how can I define it on ISPyB?</h4> </div>'
						},
						{
							 html : '<div class="help-text">A macromolecule is a biological construct in solution for investigation</div>'
						},
						
			]
	};
};



ShipmentPreparationMainView.prototype.load = function(username) {
	
};
