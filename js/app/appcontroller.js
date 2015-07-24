var ExiSAXSController = {
	init : function() {

		function setPageBackground() {

		}
		function notFound() {

		}

		function loadNavigationPanel(listView){
			/** Cleaning up navigation panel **/
			exiSAXS.clearNavigationPanel();
			exiSAXS.setLoadingNavigationPanel(true);
			
			/** Load data data **/
			var adapter = new DataAdapter();
			adapter.onSuccess.attach(function(sender, data) {
				/** Load panel **/
				exiSAXS.addNavigationPanel(listView);
				/** Load data **/
				listView.store.loadData(data);
				exiSAXS.setLoadingNavigationPanel(false);
			});
			
			/** Handle error **/
			adapter.onError.attach(function(sender, data) {
				Ext.Msg.alert('Failed', "Ooops, there was an error");
				exiSAXS.onSetLoadingNavigationPanel.notify(false);
			});
			return adapter;
		}
		
		
		/** Welcome Page **/
		Path.map("#/").to(function() {}).enter(setPageBackground);
		
		
		/** 
		 * Loading navigation panel
		 *  
		 * #/session/nav
		 * #/experiment/nav
		 * #/macromolecule/nav
		 * 
		 * */
		Path.map("#/:navigation/nav").to(function() {
			/** Session navigation **/
			if (this.params['navigation'] == "session") {
				var listView = new SessionListView();
				/** When selected move to hash **/
				listView.onSelect.attach(function(sender, selected) {
					location.hash = "/session/nav/" + selected[0].sessionId + "/session";
				});
				var adapter = loadNavigationPanel(listView);
				adapter.getSessions();
			}

			if (this.params['navigation'] == "shipping") {
				var listView = new ShippingListView();
				/** When selected move to hash **/
				listView.onSelect.attach(function(sender, selected) {
					location.hash = "/shipping/" + selected[0].shippingId + "/main";
				});
				var adapter = loadNavigationPanel(listView);
				adapter.getShippings();
			}
			
			if (this.params['navigation'] == "experiment") {
				var listView = new ExperimentListView();
				/** When selected move to hash **/
				listView.onSelect.attach(function(sender, selected) {
					location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
				});
				var adapter = loadNavigationPanel(listView);
				adapter.getExperiments();
			}
			
			if (this.params['navigation'] == "template") {
				var listView = new TemplateListView();
				/** When selected move to hash **/
				listView.onSelect.attach(function(sender, selected) {
					location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
				});
				var adapter = loadNavigationPanel(listView);
				adapter.getByExperimentByKey("experimentType", "TEMPLATE")
			}
			

			if (this.params['navigation'] == "macromolecule") {
				exiSAXS.onMacromoleculeClicked();
			}
			
		}).enter(setPageBackground);

		/** Loading a single session on the navigation panel **/
		Path.map("#/session/nav/:sessionId/session").to(function() {
			var listView = new ExperimentListView();
			/** When selected move to hash **/
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
			});
			var adapter = loadNavigationPanel(listView);
			adapter.getExperimentsBySessionId(this.params['sessionId']);
			
		}).enter(setPageBackground);

		
		
		/** Loading Experiments **/
		Path.map("#/experiment/:key/:value/main").to(function() {
			
			var adapter = new DataAdapter();
			exiSAXS.setLoadingMainPanel();
			adapter.onSuccess.attach(function(sender, data) {
				exiSAXS.setLoadingMainPanel(false);
				if (data != null) {
					if (data.length > 0) {
						var mainView = null;
						if (data[0].experimentType == "STATIC") {
							mainView = new ExperimentMainView();
							
						}
						if (data[0].experimentType == "HPLC") {
							mainView = new HPLCMainView();
						}
						
						if (data[0].experimentType == "TEMPLATE") {
							mainView = new TemplateMainView()
						}
						
						exiSAXS.addMainPanel(mainView);
						mainView.load(data);
						/** Selecting data collections from experiment **/
						mainView.onSelect.attach(function(sender, element) {
							exiSAXS.localExtorage.selectedSubtractionsManager.append(element);
						});
						mainView.onDeselect.attach(function(sender, element) {
							exiSAXS.localExtorage.selectedSubtractionsManager.remove(element);
						});
						
					}
				}
			});
			if (this.params['key'] == "experimentId"){
				adapter.getByExperimentId([this.params['value']]);
			}
			else{
				adapter.getByExperimentByKey(this.params['key'], this.params['value']);
			}
			

		}).enter(setPageBackground);

		Path.map("#/tool/crysol/main").to(function() {
			var mainView = new CrysolMainView()
			exiSAXS.addMainPanel(mainView);
			mainView.load();
		}).enter(setPageBackground);

		
		Path.map("#/tool/subtraction/main").to(function() {
			var mainView = new SubtractionMainView()
			exiSAXS.addMainPanel(mainView);
			mainView.load();
		}).enter(setPageBackground);
		
		Path.map("#/datacollection/:key/:value/main").to(function() {
			exiSAXS.setLoadingMainPanel();
			var adapter = new DataAdapter();
			adapter.onSuccess.attach(function(sender, data) {
				var mainView = new DataCollectionMainView()
				exiSAXS.addMainPanel(mainView);
				mainView.load(data);
				exiSAXS.setLoadingMainPanel(false);
				/** Selecting data collections from experiment **/
				mainView.onSelect.attach(function(sender, element) {
					exiSAXS.localExtorage.selectedSubtractionsManager.append(element);
				});
				mainView.onDeselect.attach(function(sender, element) {
					exiSAXS.localExtorage.selectedSubtractionsManager.remove(element);
				});
			});
			adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);

		}).enter(setPageBackground);

		
		Path.map("#/datacollection/:key/:value/primaryviewer").to(function() {
			var adapter = new DataAdapter();
			adapter.onSuccess.attach(function(sender, data) {
				var primaryMainView = new PrimaryDataMainView();
				exiSAXS.addMainPanel(primaryMainView);
				primaryMainView.load(data);

			});
			adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
		}).enter(setPageBackground);

		Path.map("#/datacollection/:key/:value/merge").to(function() {
			var adapter = new DataAdapter();
			adapter.onSuccess.attach(function(sender, data) {
				var primaryMainView = new MergeMainView();
				exiSAXS.addMainPanel(primaryMainView);
				primaryMainView.load(data);

			});
			adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
		}).enter(setPageBackground);

		Path.map("#/project/:projectId/run/:runId/main").to(function() {
			var projectId = this.params['projectId'];
			var runId = this.params['runId'];
			var exidataAdapter = new ExiDataAdapter();
			exidataAdapter.onSuccess.attach(function(sender, runs) {
				for (var i = 0; i < runs.length; i++) {
					if (runs[i].internalId == runId) {
						var main = new RunMainView();
						exiSAXS.addMainPanel(main);
						main.load(runs[i]);
					}
				}
			});
			exidataAdapter.getRuns(projectId);
		}).enter(setPageBackground);

		
		Path.map("#/prepare/designer/main").to(function() {
			var mainView = new ExperimentDesignerMainView();
			exiSAXS.addMainPanel(mainView);
			mainView.load();
		}).enter(setPageBackground);
		
		
		Path.map("#/prepare/buffer/main").to(function() {
			var mainView = new BufferMainView();
			exiSAXS.addMainPanel(mainView);
			mainView.load();
		}).enter(setPageBackground);
		
		
		Path.map("#/shipping/:shippingId/main").to(function() {
			var mainView = new ShippingMainView();
			var shippindId = this.params['shippingId'];
			exiSAXS.addMainPanel(mainView);
			mainView.load(shippindId);
		}).enter(setPageBackground);
		
		
		Path.map("#/prepare/stocksolution/main").to(function() {
			var mainView = new StockSolutionMainView();
			exiSAXS.addMainPanel(mainView);
			mainView.load();
		}).enter(setPageBackground);
		
		Path.map("#/prepare/macromolecule/main").to(function() {
			var mainView = new MacromoleculeMainView();
			exiSAXS.addMainPanel(mainView);
			mainView.load();
		}).enter(setPageBackground);
		
		Path.map("#/prepare/templates/main").to(function() {
			var mainView = new ExperimentDesignerMainView();
			exiSAXS.addMainPanel(mainView);
			mainView.load();
		}).enter(setPageBackground);
		
		Path.map("#/prepare/designer").to(function() {
			var wizardWidget = new WizardWidget({
				windowMode : true,
				width : 1200
			});

			wizardWidget.onFinished.attach(function(sender, result) {
				var adapter = new DataAdapter();
				wizardWidget.window.close();
				exiSAXS.setLoading();
				adapter.onSuccess.attach(function(sender, experiment) {
					location.hash = "/experiment/experimentId/" + experiment.experimentId + "/main";
				});
				wizardWidget.current.setLoading("ISPyB: Creating experiment");
				
				adapter.saveTemplate(result.name, "comments", result.data);
			});

			var manager = new ProposalUpdater(); 
			manager.onSuccess.attach(function(sender, proposals){
				wizardWidget.draw(this.targetId, new MeasurementCreatorStepWizardForm(ProposalManager.getMacromolecules(), ProposalManager.getBuffers()));
			});
			manager.get();
			
		}).enter(setPageBackground);
		
		
		
		Path.map("#/login").to(function() {
			var _this = this;
			var authenticationForm = new AuthenticationForm();
			authenticationForm.onAuthenticate.attach(function(sender, args){
				var authenticationManager = new AuthenticationManager();
				authenticationManager.onSuccess.attach(function(sender, args){
					/** This user has been authenticated **/
					exiSAXS.localExtorage.tokenManager.addToken(args.user, args.token, args.url);
					exiSAXS.mainMenu.addLoggin(args.user,  args.url);
					authenticationForm.window.close();
					
					/** Loading projects **/
					var exidataAdapter = new ExiDataAdapter();
					exidataAdapter.onSuccess.attach(function(sender, projects){
						exiSAXS.localExtorage.userManager.setProjects(projects);
					});
					exidataAdapter.getUser();
					
					/** Loading proposal **/
					new ProposalUpdater().get(true);
					
//					window.location.href = 'main.html';
					
				});
				
				authenticationManager.login(args.user, args.password, args.site);
				
			});
			authenticationForm.show();
			
		}).enter(setPageBackground);
		
		
		Path.map("#/logout").to(function() {
			if (exiSAXS.localExtorage){
				exiSAXS.localExtorage.clear();
			}
			if (exiSAXS.mainMenu){
				exiSAXS.mainMenu.init();
			}
//			window.location.href = 'main.html';
			
		}).enter(setPageBackground);
		
		// Here we set a "root route".  You may have noticed that when you landed on this
		// page you were automatically "redirected" to the "#/users" route.  The definition
		// below tells PathJS to load this route automatically if one isn't provided.
		Path.root("#/");

		// The `Path.rescue()` method takes a function as an argument, and will be called when
		// a route is activated that you have no yet defined an action for.  On this example
		// page, you'll notice there is no defined route for the "Unicorns!?" link.  Since no
		// route is defined, it calls this method instead.
		Path.rescue(notFound);

	}

};
