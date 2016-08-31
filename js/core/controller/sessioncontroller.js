/**
* This is the description for routing all the session actions. It means url= #/session/*
*
* @class SessionController
* @constructor
*/
function SessionController() {
	this.init();
}

SessionController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
SessionController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the session related objects
* Paths accepted:
* #/session/nav
* #/session/nav/:sessionId/session
*
* @method init
*/
SessionController.prototype.init = function() {
	var _this = this;
	var listView;	

	Path.map("#/session/nav").to(function() {
			EXI.clearNavigationPanel();
            EXI.hideNavigationPanel();	
			/*EXI.setLoadingNavigationPanel(true);
			listView = new SessionListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/mx/datacollection/session/" + selected[0].sessionId + "/main";
			});
			EXI.addNavigationPanel(listView);
            */
            var mainView = new SessionMainView({
                title : "Sessions"
            });
           
            EXI.addMainPanel(mainView);
            
            var onSuccess = function(sender, data){
            //    listView.load(EXI.proposalManager.getSessions().slice(0, 50));
                 mainView.load(EXI.proposalManager.getSessions());
            //    EXI.hideNavigationPanel();		
            //    EXI.setLoadingNavigationPanel(false);
                 EXI.setLoadingMainPanel(false);    
            };
            EXI.setLoadingMainPanel();
            EXI.getDataAdapter({
                onSuccess : onSuccess                
            }).proposal.session.getSessions();         	

	}).enter(this.setPageBackground);

	/** Loading a single session on the navigation panel * */
	Path.map("#/session/nav/:sessionId/session").to(function() {	
		var listView = new ExperimentListView();		
		/** When selected move to hash * */
		listView.onSelect.attach(function(sender, selected) {
			if (selected[0].experimentType == "HPLC"){
				location.hash = "/experiment/hplc/" + selected[0].experimentId + "/main";
			}
			if ((selected[0].experimentType == "STATIC")||(selected[0].experimentType == "CALIBRATION")){
				location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
			}
			if (selected[0].experimentType == "TEMPLATE"){
				location.hash = "/experiment/templateId/" + selected[0].experimentId + "/main";
			}
		});
		loadNavigationPanel(listView).saxs.experiment.getExperimentsBySessionId(this.params['sessionId']);

	}).enter(this.setPageBackground);

	Path.rescue(this.notFound);
};
