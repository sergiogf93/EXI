function MXExiController() {
	this.init();
}

MXExiController.prototype.routeNavigation = function() {

	function loadNavigationPanel(listView) {
		/** Cleaning up navigation panel * */
		EXI.clearNavigationPanel();
		EXI.setLoadingNavigationPanel(true);

		var onSuccess = function(sender, data) {
			/** Load panel * */
			EXI.addNavigationPanel(listView);
			/** Load data * */
			listView.load(data);
			EXI.setLoadingNavigationPanel(false);
		};
		
		/** Handle error * */
		var onError = function(sender, data) {
			EXI.setLoadingNavigationPanel(false);
		};
		
		/** Load data data * */
		return EXI.getDataAdapter({ onSuccess : onSuccess, onError : onError });

	}
	/**
	 * Loading navigation panel
	 * 
	 * #/session/nav #/experiment/nav #/macromolecule/nav
	 * 
	 */
	
	var listView;	
	Path.map("#/:navigation/nav").to(function() {
		/** Session navigation * */
		if (this.params['navigation'] == "session") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new SessionListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/mx/datacollection/session/" + selected[0].sessionId + "/main";
			});
			EXI.addNavigationPanel(listView);
			
			listView.load(EXI.proposalManager.getSessions());
			EXI.setLoadingNavigationPanel(false);
		}
		
		
		if (this.params['navigation'] == "crystal") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new CrystalListView();
			listView.onSelect.attach(function(sender, selected) {	
			});

			EXI.addNavigationPanel(listView);
			var onSuccess = function(sender, crystals) {
				listView.load(crystals);
				EXI.setLoadingNavigationPanel(false);
			};
			EXI.getDataAdapter({onSuccess : onSuccess}).mx.crystal.getCrystalsByProposalId();
		}
		
		if (this.params['navigation'] == "puck") {
			/** Loading welcome page **/
			EXI.addMainPanel(new PuckWelcomeMainView());
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new PuckListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/mx/puck/" + selected[0].Container_containerId+ "/main";
			});

			EXI.addNavigationPanel(listView);
			var onSuccess = function(sender, pucks) {
				listView.load(pucks);
				EXI.setLoadingNavigationPanel(false);
			};
			EXI.getDataAdapter({onSuccess : onSuccess}).proposal.proposal.getDewarByProposalId();
		}
		
		
		if (this.params['navigation'] == "protein") {
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
	
	
	Path.map("#/mx/datacollection/acronyms/:acronmys/main").to(function() {
		var mainView = new DataCollectionMxMainView();
		EXI.addMainPanel(mainView);
		var onSuccess = function(sender, data){
			mainView.load(data);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).mx.dataCollection.getByAcronymList(this.params['acronmys']);

	}).enter(this.setPageBackground);
	
	
	Path.map("#/mx/datacollection/session/:sessionId/main").to(function() {
		var mainView = new DataCollectionMxMainView();
		EXI.addMainPanel(mainView);
		var onSuccess = function(sender, data){
			mainView.load(data);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).mx.dataCollection.getBySessionsId(this.params['sessionId']);

	}).enter(this.setPageBackground);
	
	Path.map("#/mx/puck/:containerId/main").to(function() {
		EXI.setLoadingMainPanel(true);
		var onSuccess = function(sender, puck){
			try{
				var mainView = new PuckMainView();
				EXI.addMainPanel(mainView);
				mainView.load(puck);
			}
			catch(e){
				EXI.setError(e.message);
			}
			EXI.setLoadingMainPanel(false);	
		}
		EXI.getDataAdapter({onSuccess: onSuccess}).proposal.shipping.getContainerById(this.params['containerId'],this.params['containerId'],this.params['containerId'])
		
	}).enter(this.setPageBackground);
	
	
	
	Path.map("#/mx/puck/add").to(function() {
		var mainView = new PuckMainView();
		EXI.addMainPanel(mainView);
		
		var emptyPuck = {"containerId":"","code":null,"containerType":"Puck","capacity":16,"beamlineLocation":null,"sampleChangerLocation":null,"containerStatus":null,"timeStamp":"Jan 15, 2016 2:29:39 PM","sampleVOs":[]};
		mainView.load(emptyPuck);
	}).enter(this.setPageBackground);
	
	

	Path.map("#/mx/datacollection/:dataCollectionId/image/:imageId/main").to(function() {
		var mainView = new ImageMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['imageId'], this.params['dataCollectionId']);
	}).enter(this.setPageBackground);

	Path.map("#/mx/image/:imageId/main").to(function() {
		var mainView = new ImageMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['imageId']);

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
