/**
* This is the description for routing all the puck actions. It means url= #/autoprocintegration/*
*
* @class PhasingController
* @constructor
*/
function PhasingController() {
	this.init();
}

PhasingController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
PhasingController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the PhasingController related objects
* Paths accepted:
* #/phasing/autoprocintegrationId/:autoprocintegrationId/main
* @method init
*/
PhasingController.prototype.init = function() {
	var _this = this;
	

	Path.map("#/phasing/autoprocintegrationId/:autoprocintegrationId/main").to(function() {
		var mainView = new PhasingViewerMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['autoprocintegrationId']);
	}).enter(this.setPageBackground);



};
