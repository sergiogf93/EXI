function ProposalExiController() {
	this.init();
}

ProposalExiController.prototype.loadNavigationPanel = ExiController.prototype.loadNavigationPanel;

ProposalExiController.prototype.setPageBackground = function() {
};

ProposalExiController.prototype.notFound = function() {
};

ProposalExiController.prototype.init = function() {
	var _this = this;

		function setPageBackground() {
			_this.setPageBackground();
		}
		function notFound() {
			_this.notFound();
		}

		function loadNavigationPanel(listView) {
			return _this.loadNavigationPanel(listView);
		}
		
		var listView = null;
		var adapter = null;

		function loadShipmentNavigationList(){
			var listView = new ShippingListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/shipping/" + selected[0].shippingId + "/main";
			});
			adapter = loadNavigationPanel(listView);
			adapter.proposal.shipping.getShippings();
		}
		
		Path.map("#/proposal/shipping/nav?nomain").to(function() {
			loadShipmentNavigationList();
		});

		Path.map("#/proposal/:navigation/nav").to(function() {
			/** Session navigation * */
			if (this.params['navigation'] == "session") {
				listView = new SessionListView();
				/** When selected move to hash * */
				listView.onSelect.attach(function(sender, selected) {
					if (EXI.credentialManager.getTechniqueByBeamline(selected[0].beamlineName) == "SAXS"){
						location.hash = "/session/nav/" + selected[0].sessionId + "/session";
					}
					else{
						location.hash = "/mx/datacollection/session/" + selected[0].sessionId + "/main";
					}
					
				});
				adapter = loadNavigationPanel(listView);
				adapter.proposal.session.getSessions();
			}
			
			if (this.params['navigation'] == "addresses") {
				EXI.clearNavigationPanel();
				EXI.setLoadingNavigationPanel(true);
				listView = new AddressListView();
				listView.onSelect.attach(function(sender, selected) {
					location.hash = "/proposal/address/" + selected[0].labContactId + "/main";
				});
				
				EXI.addNavigationPanel(listView);
				
				adapter = loadNavigationPanel(listView);
				adapter.proposal.shipping.getLabContacts();
				
				/** Loading welcome page **/
				EXI.addMainPanel(new AddressWelcomeMainView());
			}
			
			if (this.params['navigation'] == "shipping") {
				loadShipmentNavigationList();
				
				/** Loading welcome page **/
				EXI.addMainPanel(new ShippingWelcomeMainView());
				
			}
		}).enter(this.setPageBackground);
	

		Path.map("#/shipping/:shippingId/main").to(function() {
			var mainView = new ShippingMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['shippingId']);
		}).enter(this.setPageBackground);

		Path.map("#/shipping/main").to(function() {
			var mainView = new ShippingMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
		}).enter(this.setPageBackground);
		
		Path.map("#/proposal/address/:lacontactId/main").to(function() {
			var mainView = new AddressMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['lacontactId']);
		}).enter(this.setPageBackground);
		

		Path.map("#/puck/:containerId/main").to(function() {
			var mainView = new PuckMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['containerId']);
		}).enter(this.setPageBackground);
		
};
