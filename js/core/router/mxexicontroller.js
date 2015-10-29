function MXExiController() {
	this.init();
};

MXExiController.prototype.routeNavigation = function() {
	function loadNavigationPanel(listView) {
		/** Cleaning up navigation panel * */
		EXI.clearNavigationPanel();
		EXI.setLoadingNavigationPanel(true);

		
		var onSuccess = (function(sender, data) {
			/** Load panel * */
			EXI.addNavigationPanel(listView);
			/** Load data * */
			listView.load(data);
			EXI.setLoadingNavigationPanel(false);
		});
		
		/** Handle error * */
		var onError = (function(sender, data) {
			EXI.setLoadingNavigationPanel(false);
		});
		
		/** Load data data * */
		return EXI.getDataAdapter({ onSuccess : onSuccess, onError : onError });

	}
	/**
	 * Loading navigation panel
	 * 
	 * #/session/nav #/experiment/nav #/macromolecule/nav
	 * 
	 */
	Path.map("#/mx/:navigation/nav").to(function() {
		/** Session navigation * */
		if (this.params['navigation'] == "session") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			var listView = new SessionListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/datacollection/session/" + selected[0].sessionId + "/main";
			});
			EXI.addNavigationPanel(listView);
			
			listView.load(EXI.proposalManager.getSessions());
			EXI.setLoadingNavigationPanel(false);
		}

	}).enter(this.setPageBackground);

	/** Loading a single session on the navigation panel * */
//	Path.map("#/session/nav/:sessionId/session").to(function() {
//		location.hash = "/datacollection/session/" + this.params['sessionId'] +"/main";
//	}).enter(this.setPageBackground);
	
	
	
	Path.map("#/autoprocintegration/datacollection/:datacollectionId/main").to(function() {
		
		var mainView = new AutoProcIntegrationMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['datacollectionId']);
		/** Selecting data collections from experiment * */
		mainView.onSelect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.append(element);
		});
		mainView.onDeselect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.remove(element);
		});

	}).enter(this.setPageBackground);
	
	
	
	Path.map("#/mx/datacollection/session/:sessionId/main").to(function() {
		var mainView = new DataCollectionMxMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['sessionId']);
		/** Selecting data collections from experiment * */
		mainView.onSelect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.append(element);
		});
		mainView.onDeselect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.remove(element);
		});

	}).enter(this.setPageBackground);

	
};

MXExiController.prototype.setPageBackground = function() {

};

MXExiController.prototype.notFound = function() {

};


MXExiController.prototype.init = function() {
	var _this = this;

	function setPageBackground() {
		_this.setPageBackground();
	}
	function notFound() {
		_this.notFound();
	}

	this.routeNavigation();

	Path.rescue(notFound);

};
