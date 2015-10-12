ProposalExiController.prototype.loadNavigationPanel = ExiController.prototype.loadNavigationPanel;

function ProposalExiController() {
	this.init();
};


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
		

		
		
		
		
		Path.map("#/proposal/:navigation/nav").to(function() {
			/** Session navigation * */
			if (this.params['navigation'] == "session") {
				var listView = new SessionListView();
				/** When selected move to hash * */
				listView.onSelect.attach(function(sender, selected) {
					location.hash = "/session/nav/" + selected[0].sessionId + "/session";
				});
				var adapter = loadNavigationPanel(listView);
				adapter.proposal.session.getSessions();
			}
			
			if (this.params['navigation'] == "addresses") {
				EXI.clearNavigationPanel();
				EXI.setLoadingNavigationPanel(true);
				var listView = new AddressListView();
				listView.onSelect.attach(function(sender, selected) {
					location.hash = "/proposal/address/" + selected[0].labContactId + "/main";
				});
				
				EXI.addNavigationPanel(listView);
				
				var adapter = loadNavigationPanel(listView);
				adapter.proposal.shipping.getLabContacts();
				
				/** Loading welcome page **/
				EXI.addMainPanel(new AddressWelcomeMainView());
			}
			
			if (this.params['navigation'] == "shipping") {
				var listView = new ShippingListView();
				/** When selected move to hash * */
				listView.onSelect.attach(function(sender, selected) {
					location.hash = "/shipping/" + selected[0].shippingId + "/main";
				});
				var adapter = loadNavigationPanel(listView);
				adapter.proposal.shipping.getShippings();
				
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
