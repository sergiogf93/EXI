/**
* This is the description for routing all the puck actions. It means url= #/protein/*
*
* @class ProteinController
* @constructor
*/
function ProteinController() {
	this.init();
}

ProteinController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
ProteinController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the protein related objects
* Paths accepted:
* #/protein/nav
* 
*
* @method init
*/
ProteinController.prototype.init = function() {
	var _this = this;
	var listView;	

	Path.map("#/protein/nav").to(function() {
		EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new ProteinListView();
			listView.onSelect.attach(function(sender, selected) {	
			});

			EXI.addNavigationPanel(listView);
			var onSuccessProtein = function(sender, proteins) {
				console.log(proteins);
				listView.load(proteins);
				EXI.setLoadingNavigationPanel(false);
			};
			EXI.getDataAdapter({onSuccess : onSuccessProtein}).mx.protein.getProteinByProposalId();
	}).enter(this.setPageBackground);
	Path.rescue(this.notFound);
};
