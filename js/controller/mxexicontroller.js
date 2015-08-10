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
	Path.map("#/:navigation/nav").to(function() {
		/** Session navigation * */
		if (this.params['navigation'] == "session") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			var listView = new SessionListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/buffer/" + selected[0].bufferId + "/main";
			});
			EXI.addNavigationPanel(listView);
			listView.load(EXI.proposalManager.getSessions());
			EXI.setLoadingNavigationPanel(false);
		}

	}).enter(this.setPageBackground);

	/** Loading a single session on the navigation panel * */
	Path.map("#/session/nav/:sessionId/session").to(function() {
		var listView = new ExperimentListView();
		/** When selected move to hash * */
		listView.onSelect.attach(function(sender, selected) {
			location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
		});
		loadNavigationPanel(listView).saxs.experiment.getExperimentsBySessionId(this.params['sessionId']);

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
