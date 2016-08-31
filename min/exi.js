  dust.helpers.decimal = function(chunk, context, bodies, params) {
      
        if (params.key){            
            var value = context.current()[params.key];
            if (value){
                if (params.decimals != null){
                    try{
                         chunk.write(Number(value).toFixed(params.decimals));
                    }
                    catch(e){
                        
                        /** There was an error, we leave same value */
                        chunk.write(context.current()[params.key]);    
                    }
                }
                else{
                    /** No decimals then same value */
                    chunk.write(context.current()[params.key]);
                }
            }
         
        }
        else{
            chunk.write('WARN: NO KEY SET');
        }
         return chunk;
        
};

dust.helpers.sizeOf = function(chunk, context, bodies, params) {
  var value = this.size(chunk, context, bodies, params);
  return (bodies && bodies.block) ? chunk.render(bodies.block, context.push({ isSelect: true, isResolved: false, selectKey: value })) : value;
};

//
//function ExiController(){
//	this.init();
//};
//
//ExiController.prototype.init = function(){
//	function setPageBackground() {
//
//	}
//	function notFound() {
//
//	}
//
//	function loadNavigationPanel(listView){
//		/** Cleaning up navigation panel **/
//		EXI.clearNavigationPanel();
//		EXI.setLoadingNavigationPanel(true);
//		
//		/** Load data data **/
//		var adapter = new DataAdapter();
//		adapter.onSuccess.attach(function(sender, data) {
//			/** Load panel **/
//			EXI.addNavigationPanel(listView);
//			/** Load data **/
//			listView.store.loadData(data);
//			EXI.setLoadingNavigationPanel(false);
//		});
//		
//		/** Handle error **/
//		adapter.onError.attach(function(sender, data) {
//			EXI.setLoadingNavigationPanel(false);
//		});
//		return adapter;
//	}
//	
//	
//	/** Welcome Page **/
//	Path.map("#/").to(function() {}).enter(setPageBackground);
//	
//	
//	/** 
//	 * Loading navigation panel
//	 *  
//	 * #/session/nav
//	 * #/experiment/nav
//	 * #/macromolecule/nav
//	 * 
//	 * */
//	Path.map("#/:navigation/nav").to(function() {
//		/** Session navigation **/
//		if (this.params['navigation'] == "session") {
//			var listView = new SessionListView();
//			/** When selected move to hash **/
//			listView.onSelect.attach(function(sender, selected) {
//				location.hash = "/session/nav/" + selected[0].sessionId + "/session";
//			});
//			var adapter = loadNavigationPanel(listView);
//			adapter.getSessions();
//		}
//
//		if (this.params['navigation'] == "shipping") {
//			var listView = new ShippingListView();
//			/** When selected move to hash **/
//			listView.onSelect.attach(function(sender, selected) {
//				location.hash = "/shipping/" + selected[0].shippingId + "/main";
//			});
//			var adapter = loadNavigationPanel(listView);
//			adapter.getShippings();
//		}
//		
//		if (this.params['navigation'] == "experiment") {
//			var listView = new ExperimentListView();
//			/** When selected move to hash **/
//			listView.onSelect.attach(function(sender, selected) {
//				location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
//			});
//			var adapter = loadNavigationPanel(listView);
//			adapter.getExperiments();
//		}
//		
//		if (this.params['navigation'] == "template") {
//			var listView = new TemplateListView();
//			/** When selected move to hash **/
//			listView.onSelect.attach(function(sender, selected) {
//				location.hash = "/experiment/templateId/" + selected[0].experimentId + "/main";
//			});
//			var adapter = loadNavigationPanel(listView);
//			adapter.getByExperimentByKey("experimentType", "TEMPLATE");
//		}
//		
//
//		if (this.params['navigation'] == "macromolecule") {
//			alert("not implemented yet");
//		}
//		
//	}).enter(setPageBackground);
//
//	/** Loading a single session on the navigation panel **/
//	Path.map("#/session/nav/:sessionId/session").to(function() {
//		var listView = new ExperimentListView();
//		/** When selected move to hash **/
//		listView.onSelect.attach(function(sender, selected) {
//			location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
//		});
//		var adapter = loadNavigationPanel(listView);
//		adapter.getExperimentsBySessionId(this.params['sessionId']);
//		
//	}).enter(setPageBackground);
//
//	Path.map("#/experiment/experimentId/:experimentId/main").to(function() {
//			var mainView = new ExperimentMainView();
//			EXI.addMainPanel(mainView);
//			mainView.load(this.params['experimentId']);
//					/** Selecting data collections from experiment **/
//			mainView.onSelect.attach(function(sender, element) {
//					EXI.localExtorage.selectedSubtractionsManager.append(element);
//			});
//			mainView.onDeselect.attach(function(sender, element) {
//					EXI.localExtorage.selectedSubtractionsManager.remove(element);
//			});
//
//	}).enter(setPageBackground);
//	
//	
//	/** Loading Experiments **/
//	Path.map("#/experiment/:key/:value/main").to(function() {
//		var adapter = new DataAdapter();
//		EXI.setLoadingMainPanel();
//		adapter.onSuccess.attach(function(sender, data) {
//			EXI.setLoadingMainPanel(false);
//			if (data != null) {
//				if (data.length > 0) {
//					var mainView = null;
//					if (data[0].experimentType == "STATIC") {
//						mainView = new ExperimentMainView();
//						
//					}
//					if (data[0].experimentType == "HPLC") {
//						mainView = new HPLCMainView();
//					}
//					
//					if (data[0].experimentType == "TEMPLATE") {
//						mainView = new TemplateMainView();
//					}
//					
//					EXI.addMainPanel(mainView);
//					mainView.load(data);
//					/** Selecting data collections from experiment **/
//					mainView.onSelect.attach(function(sender, element) {
//						EXI.localExtorage.selectedSubtractionsManager.append(element);
//					});
//					mainView.onDeselect.attach(function(sender, element) {
//						EXI.localExtorage.selectedSubtractionsManager.remove(element);
//					});
//					
//				}
//			}
//		});
//		if ((this.params['key'] == "experimentId")||(this.params['key'] == "templateId")){
//			adapter.getByExperimentId([this.params['value']]);
//		}
//		else{
//			adapter.getByExperimentByKey(this.params['key'], this.params['value']);
//		}
//		
//
//	}).enter(setPageBackground);
//
//	Path.map("#/tool/crysol/main").to(function() {
//		var mainView = new CrysolMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//
//	
//	Path.map("#/tool/subtraction/main").to(function() {
//		var mainView = new SubtractionMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	Path.map("#/datacollection/:key/:value/main").to(function() {
//		EXI.setLoadingMainPanel();
//		var adapter = new DataAdapter();
//		adapter.onSuccess.attach(function(sender, data) {
//			var mainView = new DataCollectionMainView();
//			EXI.addMainPanel(mainView);
//			mainView.load(data);
//			EXI.setLoadingMainPanel(false);
//			/** Selecting data collections from experiment **/
//			mainView.onSelect.attach(function(sender, element) {
//				EXI.localExtorage.selectedSubtractionsManager.append(element);
//			});
//			mainView.onDeselect.attach(function(sender, element) {
//				EXI.localExtorage.selectedSubtractionsManager.remove(element);
//			});
//		});
//		adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
//
//	}).enter(setPageBackground);
//
//	
//	Path.map("#/datacollection/:key/:value/primaryviewer").to(function() {
//		var adapter = new DataAdapter();
//		adapter.onSuccess.attach(function(sender, data) {
//			var primaryMainView = new PrimaryDataMainView();
//			EXI.addMainPanel(primaryMainView);
//			primaryMainView.load(data);
//
//		});
//		adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
//	}).enter(setPageBackground);
//
//	Path.map("#/datacollection/:key/:value/merge").to(function() {
//		var adapter = new DataAdapter();
//		adapter.onSuccess.attach(function(sender, data) {
//			var primaryMainView = new MergeMainView();
//			EXI.addMainPanel(primaryMainView);
//			primaryMainView.load(data);
//
//		});
//		adapter.getDataCollectionsByKey(this.params['key'], this.params['value']);
//	}).enter(setPageBackground);
//
//	Path.map("#/project/:projectId/run/:runId/main").to(function() {
//		var projectId = this.params['projectId'];
//		var runId = this.params['runId'];
//		var exidataAdapter = new ExiDataAdapter();
//		exidataAdapter.onSuccess.attach(function(sender, runs) {
//			for (var i = 0; i < runs.length; i++) {
//				if (runs[i].internalId == runId) {
//					var main = new RunMainView();
//					EXI.addMainPanel(main);
//					main.load(runs[i]);
//				}
//			}
//		});
//		exidataAdapter.getRuns(projectId);
//	}).enter(setPageBackground);
//
//	
//	Path.map("#/prepare/designer/main").to(function() {
//		var mainView = new ExperimentDesignerMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/prepare/buffer/main").to(function() {
//		var mainView = new BufferMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/shipping/:shippingId/main").to(function() {
//		var mainView = new ShippingMainView();
//		var shippindId = this.params['shippingId'];
//		EXI.addMainPanel(mainView);
//		mainView.load(shippindId);
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/prepare/stocksolution/main").to(function() {
//		var mainView = new StockSolutionMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/prepare/macromolecule/main").to(function() {
//		var mainView = new MacromoleculeMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	Path.map("#/prepare/templates/main").to(function() {
//		var mainView = new ExperimentDesignerMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(setPageBackground);
//	
//	Path.map("#/prepare/designer").to(function() {
//		var wizardWidget = new WizardWidget({
//			windowMode : true,
//			width : 1200
//		});
//
//		wizardWidget.onFinished.attach(function(sender, result) {
//			var adapter = new DataAdapter();
//			wizardWidget.window.close();
//			EXI.setLoading();
//			adapter.onSuccess.attach(function(sender, experiment) {
//				location.hash = "/experiment/experimentId/" + experiment.experimentId + "/main";
//			});
//			wizardWidget.current.setLoading("ISPyB: Creating experiment");
//			
//			adapter.saveTemplate(result.name, "comments", result.data);
//		});
//
//		var manager = new ProposalUpdater(); 
//		manager.onSuccess.attach(function(sender, proposals){
//			wizardWidget.draw(this.targetId, new MeasurementCreatorStepWizardForm(ProposalManager.getMacromolecules(), ProposalManager.getBuffers()));
//		});
//		manager.get();
//		
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/welcome/:user/main").to(function() {
//		var user = this.params['shippingId'];
//		var mainView = new WelcomeMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load(user);
//	}).enter(setPageBackground);
//	
//	
//	
//	Path.map("#/login").to(function() {
//		var _this = this;
//		
//		
//		EXI.authenticationForm.show();
//		return;
//		var authenticationForm = new AuthenticationForm();
//		authenticationForm.onAuthenticate.attach(function(sender, args){
//			var authenticationManager = new AuthenticationManager();
//			authenticationManager.onSuccess.attach(function(sender, args){
//				/** This user has been authenticated **/
////				EXI.localExtorage.tokenManager.addToken(args.user, args.token, args.url);
////				debugger
//				EXI.credentialManager.addCredential(args.user, args.roles, args.token, args.url);
////				EXI.mainMenu.addLoggin(args.user,  args.url);
//				authenticationForm.window.close();
//				
//				/** load proposals **/
//				location.hash = "/welcome/" + args.user + "/main";
//				
//				/** Loading projects **/
////				var exidataAdapter = new ExiDataAdapter();
////				exidataAdapter.onSuccess.attach(function(sender, projects){
////					EXI.localExtorage.userManager.setProjects(projects);
////				});
////				exidataAdapter.getUser();
//				
//				/** Loading proposal **/
////				new ProposalUpdater().get(true);
//				
////				window.location.href = 'main.html';
//				
//			});
//			
//			authenticationManager.login(args.user, args.password, args.site);
//			
//		});
//		authenticationForm.show();
//		
//	}).enter(setPageBackground);
//	
//	
//	Path.map("#/logout").to(function() {
//		EXI.credentialManager.logout();
////		if (EXI.localExtorage){
////			EXI.localExtorage.clear();
////		}
////		if (EXI.mainMenu){
////			EXI.mainMenu.setCredentials();
////		}
//		
////		window.location.href = 'main.html';
//		
//	}).enter(setPageBackground);
//	
//	// Here we set a "root route".  You may have noticed that when you landed on this
//	// page you were automatically "redirected" to the "#/users" route.  The definition
//	// below tells PathJS to load this route automatically if one isn't provided.
//	Path.root("#/");
//
//	// The `Path.rescue()` method takes a function as an argument, and will be called when
//	// a route is activated that you have no yet defined an action for.  On this example
//	// page, you'll notice there is no defined route for the "Unicorns!?" link.  Since no
//	// route is defined, it calls this method instead.
//	Path.rescue(notFound);
//	
//	
//};

function Exi(args) {
	var _this = this;
	
	this.headerCssClass = "titlePanel";
	
	/** Active Menu **/
	this.mainMenu = new MainMenu();
	/** When user is not logged in **/
	this.anonymousMenu = null;
	/** When user is logged in **/
	this.userMenu = null;
	
	/** If false when opening a new tab it will close the already open ones **/
	this.keepTabs = false;
	
	
	this.controllers = [new ExiController(), new ProposalExiController(), new ShippingExiController()];
	
	if (args != null){
		if (args.menu != null){
			this.mainMenu = args.menu;
			this.userMenu = args.menu;
		}
		if (args.anonymousMenu != null){
			this.anonymousMenu = args.anonymousMenu;
		}
		
		if (args.headerCssClass != null){
			this.headerCssClass = args.headerCssClass;
		}
		
		if (args.controllers != null){
			for (var i = 0; i < args.controllers.length; i++) {
				this.controllers.push(args.controllers[i]);
			}
		}
	}
	/** Status bar **/
	this.mainStatusBar = new MainStatusBar();
	
	/** Proposal manager **/
	this.proposalManager = new ProposalManager();
	
	this.credentialManager = new CredentialManager();
	this.credentialManager.onLogout.attach(function(sender){
		_this.mainMenu.populateCredentialsMenu();
		_this.clearMainPanel();
		_this.clearNavigationPanel();
		_this.setAnonymousMenu();
		Ext.getCmp("navigation").collapse();
		location.hash = '/welcome';
	});
	
	
	this.credentialManager.onLogin.attach(function(sender){
		_this.mainMenu.populateCredentialsMenu();
		_this.setUserMenu();
	});
	
	this.credentialManager.onActiveProposalChanged.attach(function(sender){
		_this.mainMenu.populateCredentialsMenu();
	});
	
	/** AUTHENTICATION FORM **/
	this.authenticationForm = new AuthenticationForm();
	this.authenticationForm.onAuthenticate.attach(function(sender, args){
		var authenticationManager = new AuthenticationManager();
        
		authenticationManager.onSuccess.attach(function(sender, data){
            
			/** This user has been authenticated **/
			_this.credentialManager.addCredential(data.user, data.roles, data.token, args.site, args.exiUrl, args.properties);
			_this.authenticationForm.window.close();
			
			var credential = EXI.credentialManager.getCredentialByUserName(data.user);
			if (credential.isManager()||credential.isLocalContact()){
				location.hash = "/welcome/manager/" + data.user + "/main";
			}
			else{
				location.hash = "/welcome/user/" + data.user + "/main";
                /*BUI.showError("Only local contacts are managers are allowed");
                location.hash = "#/logout";*/
			}
			
			/** Authenticating EXI in the offline system**/            
			_this.getDataAdapter().exi.offline.authenticate();
			
		});
		authenticationManager.onError.attach(function(sender, data){
			alert("error");
		});
		authenticationManager.login(args.user, args.password, args.site);
	});
	
	this.onAfterRender = new Event(this);
}

/**
 * This method append to args the values of the active connection: url, token and proposal
 */
Exi.prototype.appendDataAdapterParameters = function(args) {
	if (args == null){ args = {};}
	
	/** Getting credentials **/
	var connections = EXI.credentialManager.getConnections();
	/** Authentication data adapter does not need any token **/
	if (connections.length > 0){
		args.url = connections[0].url;
		args.token = connections[0].token;
		args.proposal = connections[0].proposal;
		
	
	}
	return args;	
};



Exi.prototype.getDataAdapter = function(args) {   
	var dataAdapter =  new DataAdapterFactory(this.appendDataAdapterParameters(args));
    /** Attaching default error handler */
    dataAdapter.onError.attach(function(){
        if (errorCode == "401 Unauthorized"){
				EXI.setError(errorCode);
				location.hash = '/logout';
			}        
    });      
    return dataAdapter;  	
};

Exi.prototype.setAnonymousMenu = function() {
	this.mainMenu = this.anonymousMenu;
	Ext.getCmp("mainMenu").removeAll();
	Ext.getCmp("mainMenu").add(EXI.mainMenu.getPanel());
};

Exi.prototype.setUserMenu = function() {
	this.mainMenu = this.userMenu;
	Ext.getCmp("mainMenu").removeAll();
	Ext.getCmp("mainMenu").add(EXI.mainMenu.getPanel());
};


Exi.prototype.loadSelected = function(selected) {
};




/**
 * Adds a new Main panel to the center panel
 * @param mainView
 */
Exi.prototype.addMainPanel = function(mainView) {
	if (!this.keepTabs){
		Ext.getCmp('main_panel').removeAll();
	}
	Ext.getCmp('main_panel').add(mainView.getPanel());
	Ext.getCmp('main_panel').setActiveTab(Ext.getCmp('main_panel').items.length - 1);
};

Exi.prototype.getSelectedDataCollections = function() {
	var selected = [];
	for (var i = 0; i < this.experimentListView.length; i++) {
		selected = selected.concat(this.experimentListView[i].getSelected());
	}
	return selected;
};

Exi.prototype.addNavigationPanel = function(listView) {
	Ext.getCmp('navigation').add(listView.getPanel());
	if (Ext.getCmp("navigation") != null){
		Ext.getCmp("navigation").expand();
        this.showNavigationPanel();
	}
};

Exi.prototype.hideNavigationPanel = function(listView) {
	if (Ext.getCmp("navigation") != null){
		Ext.getCmp('navigation').hide();
	}
};

Exi.prototype.showNavigationPanel = function(listView) {
	if (Ext.getCmp("navigation") != null){
		Ext.getCmp('navigation').show();
	}
};


Exi.prototype.clearNavigationPanel = function() {
	Ext.getCmp('navigation').removeAll();
};

Exi.prototype.clearMainPanel = function() {
	Ext.getCmp('main_panel').removeAll();
};

Exi.prototype.setLoadingNavigationPanel = function(isLoading) {
	Ext.getCmp('navigation').setLoading(isLoading);
};

Exi.prototype.setLoadingMainPanel = function(isLoading) {
	Ext.getCmp('main_panel').setLoading(isLoading);
};

Exi.prototype.setError = function(error) {
	this.mainStatusBar.showError(error);
};

Exi.prototype.setLoading = function(isLoading) {
	if ((isLoading == null) || (isLoading  == true)){
		this.mainStatusBar.showBusy();
	}
	else{
		this.mainStatusBar.showReady();
	}
};

Exi.prototype.getHeader = function(error) {
	return '<img class="titleImage" src="images/logo_EMBL.png"><span class="title">Extended ISPyB</span>';
};

Exi.prototype.show = function() {
	var _this = this;
	Ext.application({
				name : 'ExiSAXS',
				launch : function() {
					Ext.create(
									'Ext.container.Viewport',
									{
										layout : 'border',
										items : [
												{
													region : 'north',
													xtype : 'component',
													padding : 10,
													height : 75,
													html : _this.getHeader(),
													cls : _this.headerCssClass

												}, {
													region : 'north',
													cls : 'toolbarPanel',
													id : 'mainMenu',
													xtype : 'panel',
													width : 400,
													items : _this.mainMenu.getPanel() },

												{
													xtype : 'panel',
													id : 'navigation',
													region : 'west',
													width : 250,
													split : false,
													title : 'Browse by',
													cls : 'navigation',
													collapsible : true,
													collapsed : true
													

												},
//												{
//													xtype : 'panel',
//													id : 'workspace',
//													region : 'east',
//													width : 250,
//													collapsed : true,
//													title : 'Workspace',
//													split : false,
//													layout : 'fit',
////													title : 'Browse by',
//													cls : 'navigation',
//													collapsible : true,
//													items : [_this.workspacePanel.getPanel()]
//
//												},
												{
													region : 'center',
													id : 'main_panel',
													xtype : 'tabpanel',
													cls : 'navigation',
													plain : true,
													items : []
												},
												{
														region : 'south',
														xtype : 'panel',
														cls : 'statusBar',
														bbar : _this.mainStatusBar.getBar() 
												}
													],
										listeners : {
											afterrender : function(component, eOpts) {
														_this.mainMenu.populateCredentialsMenu();
														_this.onAfterRender.notify();
														
//														/** If there is a user login then we show the menu **/
														if (_this.credentialManager.getCredentials() == 0){
															_this.setAnonymousMenu();
														}
														else{
															_this.setUserMenu();
															_this.mainMenu.populateCredentialsMenu();
														}
											} } });
				}

			});
};


function ExiMX() {
	 Exi.call(this, {
		 					menu: new MXMainMenu(),
		 					anonymousMenu: new MainMenu(),
		 					controllers : [
									
									new SessionController(), 
									new SAXSExiController(), 
									new OfflineExiController(), 
									new ProposalExiController(), 
									new LabContactExiController(),
									new PuckController(),
									new CrystalController(),
									new ProteinController(),
									new AutoprocIntegrationController(),
									new MxDataCollectionController(),
									new WorkflowController(),
									new MxPrepare(),
									new ImageController(),
                                    new PhasingController(),
                                    new XfeController(),
                                    new BeamlineParameterController()
							],
		 					headerCssClass : 'mxTitlePanel'

	 });
}

ExiMX.prototype.loadSelected = Exi.prototype.loadSelected;
ExiMX.prototype.addMainPanel = Exi.prototype.addMainPanel;
ExiMX.prototype.getSelectedDataCollections = Exi.prototype.getSelectedDataCollections;
ExiMX.prototype.addNavigationPanel = Exi.prototype.addNavigationPanel;
ExiMX.prototype.clearNavigationPanel = Exi.prototype.clearNavigationPanel;
ExiMX.prototype.clearMainPanel = Exi.prototype.clearMainPanel;
ExiMX.prototype.setLoadingNavigationPanel = Exi.prototype.setLoadingNavigationPanel;
ExiMX.prototype.setLoadingMainPanel = Exi.prototype.setLoadingMainPanel;
ExiMX.prototype.setError = Exi.prototype.setError;
ExiMX.prototype.setLoading = Exi.prototype.setLoading;
ExiMX.prototype.show = Exi.prototype.show;
ExiMX.prototype.setAnonymousMenu = Exi.prototype.setAnonymousMenu;
ExiMX.prototype.setUserMenu = Exi.prototype.setUserMenu;
ExiMX.prototype.appendDataAdapterParameters = Exi.prototype.appendDataAdapterParameters;
ExiMX.prototype.hideNavigationPanel = Exi.prototype.hideNavigationPanel;
ExiMX.prototype.showNavigationPanel = Exi.prototype.showNavigationPanel;
 


ExiMX.prototype.getHeader = function(){
    var html = "";
    var data = {
        version         : ExtISPyB.version,
        release_date    : ExtISPyB.release_date
       
        
    };
    dust.render("mxheader", data, function(err, out){
		html = out;
     });
    return html;
	
};

ExiMX.prototype.getDataAdapter = function(args){
	return  new MxDataAdapterFactory(this.appendDataAdapterParameters(args));
};


function MainStatusBar(){
	
	
}

MainStatusBar.prototype.getBar = function(){
	this.statusBar =  Ext.create('Ext.ux.StatusBar', {
		id : 'main-status-bar',
	    text: 'Ready',
	    iconCls: 'accept',
	    busyIconCls: 'busy',
	    busyText:   this.busyText,
	    cls : 'statusBar',
		statusAlign : 'right'
	});
	return this.statusBar;
};

MainStatusBar.prototype.showBusy = function(msg){
    if (msg == null){
        msg = 'Connecting to servers...';
    }
    this.statusBar.busyText = msg;
	this.statusBar.showBusy();
};

MainStatusBar.prototype.showError = function(error){
	this.statusBar.clearStatus();
	this.statusBar.setStatus({
	    text: error,
	    iconCls: 'error'
	});
};

MainStatusBar.prototype.showReady = function(){
	this.statusBar.clearStatus();
	this.statusBar.setStatus({
	    text: 'Ready',
	    iconCls: 'accept'
	});
};





/**
* Class used to manage the common points for a single or several proposals. It deals with methods to help the management of crystals, proteins, macromolecules, buffer, stockSolutions and labcontacts
*
* @class ProposalManager
* @constructor
*/
function ProposalManager() {
    this.onActiveProposalChanged = new Event(this);
}


/**
* It gets the information of the proposals that are found on the local Storage in the field called proposal. If it does not exist it will load form the server and store them on the local storage
* @method get
* @param {Boolean} forceUpdate if true the proposals information will be reloaded from the server syncrhonously
*/
ProposalManager.prototype.get = function(forceUpdate) {
    var _this = this;
	if ((localStorage.getItem("proposals") == null)||(forceUpdate)){
       
		var onSuccess= function(sender, proposals){
			localStorage.setItem("proposals", JSON.stringify(proposals));
            _this.onActiveProposalChanged.notify();
		};
		EXI.getDataAdapter({async : true, onSuccess : onSuccess}).proposal.proposal.getProposalsInfo();
	}	
  
	return JSON.parse(localStorage.getItem("proposals"));
};

/**
* It removes the information from the local storage. It means it remove the proposals item
* @method clear
*/
ProposalManager.prototype.clear = function() {
	localStorage.removeItem('proposals');
};

/**
* It gets a list of sessions from the local storage or retrieve them from the server if the proposals have not been loaded yet. It is synchronous.
* @method getSessions
*/
ProposalManager.prototype.getSessions = function() {
	if (localStorage.getItem("sessions") == null){
		var onSuccess= function(sender, sessions){
			localStorage.setItem("sessions", JSON.stringify(sessions));
		};
		EXI.getDataAdapter({async : false, onSuccess : onSuccess}).proposal.session.getSessions();
	}
	return JSON.parse(localStorage.getItem("sessions"));
};

/**
* It gets a list of sessions which start date comes after today.
* @method getFutureSessions
*/
ProposalManager.prototype.getFutureSessions = function() {
	var sessions = this.getSessions();
	var today = moment();
	var futureSessions = [];
	for (var i = 0; i < sessions.length; i++) {        
		if (today.diff(sessions[i].BLSession_startDate) < 0){
			futureSessions.push(sessions[i]);
		}
	}
	return futureSessions;
};

/**
* It gets a list of colors
* @method getBufferColors
*/
ProposalManager.prototype.getBufferColors = function() {
	return [ "#ffffcc", "#c7e9b4", "#7fcdbb", "#41b6c4", "#2c7fb8", "#253494" ];
};

/**
* It gets a list of labcontacts from the current proposal
* @method getLabcontacts
*/
ProposalManager.prototype.getLabcontacts = function() {
	return this.get()[0].labcontacts;
};

/**
* @method getLabcontactById
*/
ProposalManager.prototype.getLabcontactById = function(labContactId) {
	return _.find(this.getLabcontacts(), function(o) { return o.labContactId == labContactId; });
};

/**
* @method getPlateTypeById
*/
ProposalManager.prototype.getPlateTypeById = function(plateTypeId) {
	return _.find(this.getPlateTypes(), function(o) { return o.plateTypeId == plateTypeId; });
};

/**
* @method getPlateTypes
*/
ProposalManager.prototype.getPlateTypes = function() {
	return this.get()[0].plateTypes;
};

/**
* This methods is supposed to retrieve the plate configuration by flavour. However, it is not used yet
* @method getPlateByFlavour
*/
ProposalManager.prototype.getPlateByFlavour = function(flavour) {
	return [ this.getPlateTypes()[0], this.getPlateTypes()[2], this.getPlateTypes()[3] ];
};

/**
* @method getBufferById
*/
ProposalManager.prototype.getBufferById = function(bufferId) {
	var proposals = this.get();
	var f = function(o) { return o.bufferId == bufferId; };
	for (var i = 0; i < proposals.length; i++) {
		var found = _.find(proposals[i].buffers, f);
		if (found != null) {return found;}
	}
};

/**
* @method getMacromoleculeById
*/
ProposalManager.prototype.getMacromoleculeById = function(macromoleculeId) {
	var proposals = this.get();
	var f = function(o) { return o.macromoleculeId == macromoleculeId; };
	for (var i = 0; i < proposals.length; i++) {
		var found = _.find(proposals[i].macromolecules, f);
		if (found != null) {return found;}
	}
	return null;
};

/**
* @method getMacromoleculeByAcronym
*/
ProposalManager.prototype.getMacromoleculeByAcronym = function(acronym) {
	var proposals = this.get();
	var f = function(o) { return o.acronym == acronym; };
	for (var i = 0; i < proposals.length; i++) {
		var found = _.find(proposals[i].macromolecules, f);
		if (found != null) {return found;}
	}
	return null;
};

/**
* @method getStockSolutionById
*/
ProposalManager.prototype.getStockSolutionById = function(stockSolutionId) {
	var proposals = this.get();
	var f = function(o) { return o.stockSolutionId == stockSolutionId; };
	for (var i = 0; i < proposals.length; i++) {
		var found = _.find(proposals[i].stockSolutions, f);
		if (found != null) {return found;}
	}
};

/**
* @method getBuffers
*/
ProposalManager.prototype.getBuffers = function() {
	var proposals = this.get();
	var buffers = [];
	for (var i = 0; i < proposals.length; i++) {
		buffers = buffers.concat(proposals[i].buffers);
	}
	return buffers;
};

/**
* @method getMacromolecules
*/
ProposalManager.prototype.getMacromolecules = function() {
	var proposals = this.get();
	var macromolecules = [];
	for (var i = 0; i < proposals.length; i++) {
		macromolecules = macromolecules.concat(proposals[i].macromolecules);
	}
	return macromolecules;
};

/**
* @method getProposals
*/
ProposalManager.prototype.getProposals = function() {
	var proposals = this.get();
	var result = [];
	for (var i = 0; i < proposals.length; i++) {
		proposals[i].proposal[0]["proposal"] = proposals[i].proposal[0].code + proposals[i].proposal[0].number;
		result = result.concat(proposals[i].proposal);
	}
	return result;
};

/**
* @method getProposalById
*/
ProposalManager.prototype.getProposalById = function(proposalId) {
	var proposals = this.get();
	var result = [];
	for (var i = 0; i < proposals.length; i++) {
		if (proposals[i].proposal[0].proposalId == proposalId){
			return proposals[i].proposal[0];
		}
	}
	return result;
};

/**
* @method getStockSolutions
*/
ProposalManager.prototype.getStockSolutions = function() {
	return this.get()[0].stockSolutions;
};

/**
* @method getProteins
*/
ProposalManager.prototype.getProteins = function() {
	return this.get()[0].proteins;
};

/**
* @method getCrystals
*/
ProposalManager.prototype.getCrystals = function() {
	return this.get()[0].crystals;
};

/**
* @method getProteinByAcronym
*/
ProposalManager.prototype.getProteinByAcronym = function(acronym) {
	return _.filter(this.getProteins(), function(o) { return o.acronym == acronym; });
};

/**
* @method getCrystalsByAcronym
*/
ProposalManager.prototype.getCrystalsByAcronym = function(acronym) {
	return _.filter(this.getCrystals(), 
						function(o) { 
								if (o.proteinVO == null) {return false;} 
								else {return o.proteinVO.acronym == acronym;} 
						}
	);
};

/**
* @method getStockSolutionsBySpecimen
*/
ProposalManager.prototype.getStockSolutionsBySpecimen = function(macromoleculeId, bufferId) {
	var aux = _.filter(this.getStockSolutions(), function(o) { return o.macromoleculeId == macromoleculeId; });
	return _.filter(aux, function(o) { return o.bufferId == bufferId; });
};

/**
* @method getUnpackedStockSolutions
*/
ProposalManager.prototype.getUnpackedStockSolutions = function() {
	var stockSolutions = this.getStockSolutions();
	var result = [];
	for (var i = 0; i < stockSolutions.length; i++) {
		if (stockSolutions[i].boxId == null) {
			result.push(stockSolutions[i]);
		}
	}
	return result;
};

/**
* @method getStockSolutionsByDewarId
*/
ProposalManager.prototype.getStockSolutionsByDewarId = function(dewarId) {
	return _.find(this.getStockSolutions(), function(o) { return o.boxId == dewarId; });
};

/**
* Super class for the controllers. It manages the setPageBackground and notFound methods
*
* @class ExiGenericController
* @constructor
*/
function ExiGenericController() {
	this.init();
}


ExiGenericController.prototype.setPageBackground = function() {

};

ExiGenericController.prototype.notFound = function() {

};



function AuthenticationManager(){
	this.onSuccess = new Event(this);
	this.onError = new Event(this);
}

/**
 * url to an ISPyB for instance http://ispyb.esrf.fr/ispyb-ws/rest
 * @param user
 * @param password
 * @param url
 */
AuthenticationManager.prototype.login = function(user, password, url){
	var _this = this;
	var fn = function onSuccess(sender, data) {
		_this.onSuccess.notify({
			user : user,
			roles : data.roles,
			token : data.token,
			url : url
	    });
	};
		
	var err = function(sender, data) {
		EXI.setError("Permission denied");
		BUI.showError("Your credentials are invalid");
	};
    
	EXI.getDataAdapter({
		onSuccess 	: fn,
		onError 	: err,
		url			: url,
		username 	: user
		
	}).proposal.authentication.authenticate(user, password, url);
	
	
	
};

function ExiController(){
	this.init();
}

ExiController.prototype.loadNavigationPanel = function(listView) {
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
};

ExiController.prototype.init = function(){
	function setPageBackground() {

	}
	function notFound() {

	}

	/** Welcome Page **/
	Path.map("#/").to(function() {
		location.hash = '/welcome';
	}).enter(setPageBackground);
	
	Path.map("#/login").to(function() {
		EXI.authenticationForm.show();
	}).enter(setPageBackground);
	
	
	Path.map("#/welcome").to(function() {
		EXI.addMainPanel(new WelcomeMainView());
	}).enter(setPageBackground);
	
	Path.map("#/welcome/user/:user/main").to(function() {
		var user = this.params['user'];		
        var mainView = new ManagerWelcomeMainView();
		EXI.addMainPanel(mainView);
         EXI.hideNavigationPanel();
		mainView.load(user);
	}).enter(setPageBackground);
	

	Path.map("#/welcome/manager/:user/main").to(function() {
		var user = this.params['user'];
		var mainView = new ManagerWelcomeMainView();
		EXI.addMainPanel(mainView);
        
        EXI.hideNavigationPanel();
		mainView.load(user);
	}).enter(setPageBackground);
	
    Path.map("#/welcome/manager/:user/date/:start/:end/main").to(function() {                    
		var user = this.params['user'];
		var mainView = new ManagerWelcomeMainView();
		EXI.addMainPanel(mainView);
        EXI.hideNavigationPanel();
		mainView.loadSessionsByDate(user,this.params['start'], this.params['end'] );
	}).enter(setPageBackground);
    
   
    
	
	Path.map("#/logout").to(function() {
		EXI.credentialManager.logout();
         EXI.hideNavigationPanel();
		EXI.proposalManager.clear();
		
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
	
	
};

/**
* Super class for the controllers. It manages the setPageBackground and notFound methods
*
* @class ExiGenericController
* @constructor
*/
function ExiGenericController() {
	this.init();
}


ExiGenericController.prototype.setPageBackground = function() {

};

ExiGenericController.prototype.notFound = function() {

};



function LabContactExiController() {
	this.init();
}

LabContactExiController.prototype.loadNavigationPanel = ExiController.prototype.loadNavigationPanel;

LabContactExiController.prototype.setPageBackground = function() {
};

LabContactExiController.prototype.notFound = function() {
};



LabContactExiController.prototype.init = function() {
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
		
		Path.map("#/proposal/addresses/nav").to(function() {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new AddressListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/proposal/address/" + selected[0].labContactId + "/main";
			});
			
			EXI.addNavigationPanel(listView);
			adapter = loadNavigationPanel(listView);
			adapter.proposal.labcontacts.getLabContacts();
			
			/** Loading welcome page **/
			EXI.addMainPanel(new AddressWelcomeMainView());
			
		}).enter(this.setPageBackground);
		
		Path.map("#/proposal/address/:lacontactId/main").to(function() {
			var mainView = new AddressMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['lacontactId']);
		}).enter(this.setPageBackground);
		
};

function OfflineExiController() {
	this.init();
}

OfflineExiController.prototype.setPageBackground = function() {

};

OfflineExiController.prototype.notFound = function() {

};

OfflineExiController.prototype.init = function() {
	var _this = this;

		function setPageBackground() {
			_this.setPageBackground();
		}
		function notFound() {
			_this.notFound();
		}


		Path.map("#/tool/dimple/main").to(function() {
			var mainView = new DimpleMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
		}).enter(this.setPageBackground);
        
          Path.map("#/tool/dimple/datacollection/:dataCollectionId/main").to(function() {
			var mainView = new DimpleDCMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['dataCollectionId']);
		}).enter(this.setPageBackground);
        
        Path.map("#/tool/reprocess/datacollection/:dataCollectionId/:startImage/:endImage/main").to(function() {
			var mainView = new ReprocessMainView();
			EXI.addMainPanel(mainView);
			mainView.load(this.params['dataCollectionId'],this.params['startImage'],this.params['endImage']);
		}).enter(this.setPageBackground);
        
		
		
		Path.map("#/tool/crysol/main").to(function() {
			var mainView = new CrysolMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
		}).enter(this.setPageBackground);

		Path.map("#/tool/subtraction/main").to(function() {
			var mainView = new SubtractionMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
		}).enter(this.setPageBackground);
		
		Path.map("#/tool/list").to(function() {
			var project = null;
			var listView = new RunListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				var runId = selected[0].internalId;
				var projectId = project.internalId;
				if (selected[0].tool == "Dimple"){
					location.hash = "/project/" +projectId + "/dimple/" + runId + "/main";
				}
				else{
					location.hash = "/project/" +projectId + "/run/" + runId + "/main";
				}
			});

			/** Cleaning up navigation panel * */
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);

			
			var onSuccess = function(sender, data) {
				project = data[0];
				/** Load panel * */
				EXI.addNavigationPanel(listView);
				/** Load data * */
				listView.load(data[0].runs.reverse());
				EXI.setLoadingNavigationPanel(false);
			};
			
			/** Handle error * */
			var onError = function(sender, data) {
				EXI.setLoadingNavigationPanel(false);
			};
			
			EXI.getDataAdapter({onSuccess : onSuccess, onError :onError}).exi.offline.getProject();
		}).enter(this.setPageBackground);
		

	Path.map("#/project/:projectId/run/:runId/main").to(function() {
		var projectId = this.params['projectId'];
		var runId = this.params['runId'];

		var onSuccess = function(sender, runs) {
			for (var i = 0; i < runs.length; i++) {
				if (runs[i].internalId == runId) {
					var main = new RunMainView();
					EXI.addMainPanel(main);
					main.load(runs[i]);
				}
			}
		};
		var onError = function(sender) {
			BUI.showError("There was an error");
		};
		
		EXI.getDataAdapter({onSuccess : onSuccess, onError :onError}).exi.offline.getRuns(projectId);
	}).enter(this.setPageBackground);


	Path.map("#/project/:projectId/dimple/:runId/main").to(function() {
		var projectId = this.params['projectId'];
		var runId = this.params['runId'];

		var onSuccess = function(sender, runs) {
			for (var i = 0; i < runs.length; i++) {
				if (runs[i].internalId == runId) {
					var main = new DimpleRunMainView();
					EXI.addMainPanel(main);
					main.load(runs[i]);
				}
			}
		};
		var onError = function(sender) {
			BUI.showError("There was an error");
		};
		
		EXI.getDataAdapter({onSuccess : onSuccess, onError :onError}).exi.offline.getRuns(projectId);
	}).enter(this.setPageBackground);
	
	Path.rescue(notFound);

};

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

		

		Path.map("#/proposal/session/nav").to(function() {
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

function ShippingExiController() {
	this.init();
}

ShippingExiController.prototype.loadNavigationPanel = ExiController.prototype.loadNavigationPanel;

ShippingExiController.prototype.setPageBackground = function() {
};

ShippingExiController.prototype.notFound = function() {
};


ShippingExiController.prototype.loadShipmentsNavigationPanel = function(listView) {
	/** Cleaning up navigation panel * */
	EXI.clearNavigationPanel();
	EXI.setLoadingMainPanel(true);
	
	var onSuccess = function(sender, data) {
		data = BUI.groupBy(data, function(item){return item["Shipping_shippingId"];});
		var curated = [];
		for(var i = 0; i < data.length; i++){
			curated.push(data[i][0]);
		}
		curated.sort(function(a,b){return b.Shipping_shippingId - a.Shipping_shippingId;});
		
		/** Load panel * */
		EXI.addNavigationPanel(listView);
		/** Load data * */
		listView.load(curated);
		EXI.setLoadingMainPanel(false);
	};
	
	/** Handle error * */
	var onError = function(sender, data) {
		EXI.setLoadingNavigationPanel(false);
	};
	
	/** Load data data * */
	return EXI.getDataAdapter({ onSuccess : onSuccess, onError : onError });
};

ShippingExiController.prototype.init = function() {
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
				location.hash = "/shipping/" + selected[0].Shipping_shippingId  + "/main";
			});
			adapter = _this.loadShipmentsNavigationPanel(listView);
			adapter.proposal.shipping.getShippings();
		}
		
		Path.map("#/proposal/shipping/nav?nomain").to(function() {
			loadShipmentNavigationList();
		});

		Path.map("#/proposal/shipping/nav").to(function() {
			loadShipmentNavigationList();
			EXI.addMainPanel(new ShippingWelcomeMainView());
		});
		
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
		
};

function MainMenu(args) {
	this.id = BUI.id();
	this.loginButtonId = 'loginButton' + this.id;
	this.cssClass = 'mainMenu';
	this.isHidden = true;
	if (args != null){
		if (args.cssClass != null){
			this.cssClass = args.cssClass;
		}
		if (args.isHidden != null){
			this.isHidden = args.isHidden;
		}
	}
}

MainMenu.prototype.getMenuItems = function() { return [];};


/**
 * If there is a credential then home tab will redirect to the welcome page (either manager or user)
 */
MainMenu.prototype.getHomeItem = function() { 
	return {
		text : this._convertToHTMLWhiteSpan("Home"),
		cls : 'ExiSAXSMenuToolBar',
		icon : '../images/icon/rsz_ic_home_black_24dp.png',
		handler : function(){
				if (EXI.credentialManager.getCredentials() != null){
					if (EXI.credentialManager.getCredentials().length > 0){
						var username = EXI.credentialManager.getCredentials()[0].username;
						var credential = EXI.credentialManager.getCredentialByUserName(EXI.credentialManager.getCredentials()[0].username);
						if (credential.isManager()){
							location.hash = "/welcome/manager/" + username + "/main";
						}
						else{
							location.hash = "/welcome/user/" + username + "/main";
						}
					}
					else{
						BUI.showError("You should sign up");
					}
				}
				else{
					BUI.showError("You should sign up");
				}
		}
	};
};

MainMenu.prototype.getShipmentItem = function() { 
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Shipments") {
			location.hash = "/proposal/shipping/nav";
		}
		if (item.text == "Manage shipping addresses") {
			location.hash = "/proposal/addresses/nav";
		}
		if (item.text == "Shipment List") {
			location.hash = "/proposal/shipping/nav";
		}
	}

	function getBiosaxsMenu() {
		var _this = this;
		function onItemCheck(item, checked) {
			if (item.text == "Stock Solutions") {
				location.hash = "/saxs/stocksolution/nav";
			}
			
		}

		return Ext.create('Ext.menu.Menu', {
			items : [ 
						{
							text : 'Stock Solutions',
							icon : '../images/icon/testtube.png',
							handler : onItemCheck 
						} 
			] });
	}
	
	
	
	return {
		text : this._convertToHTMLWhiteSpan("Shipment"),
		cls : 'ExiSAXSMenuToolBar',
//		hidden : this.isHidden,
        disabled : true,
		menu : Ext.create('Ext.menu.Menu', {
			items : [ 
						{
							text : 'BioSAXS',
							icon : '../images/icon/macromolecule.png',
							menu: getBiosaxsMenu()
						}, 
						{
							text : 'Manage shipping addresses',
							icon : '../images/icon/contacts.png',
							handler : onItemCheck 
						}, 
						{
							text : 'Shipments',
							icon : '../images/icon/shipping.png',
							handler : onItemCheck 
						} 
					] })
	};

};


MainMenu.prototype.getHelpMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "ISPyB Web services API Map") {
			window.open('/exi/documentation/ispyb-api-ws/print.html');
		}
		if (item.text == "Job list") {
			location.hash = "/tool/list";
		}
	}

	return Ext.create('Ext.menu.Menu', {
		items : [

		{
			text : 'Developer',
			checked : false,
			group : 'theme',
			menu : {       
                    items: [
                        {
                            text: 'ISPyB Web services API Map',
                            handler: onItemCheck
                        }, {
                            text: 'How to retrieve data from ISPyB?',
                            handler: onItemCheck
                        }, {
                            text: 'EXI Router',
                            handler: onItemCheck
                        }, {
                            text: 'EXI List Views Objects',
                            handler: onItemCheck
                        }, {
                            text: 'EXI Main View Objects',
                            handler: onItemCheck
                        }
                    ]
                }
		},
		"-",
		{
				text : 'About',
				checked : false,
				group : 'theme',
				handler : onItemCheck }
		] });
};

MainMenu.prototype.getAddCredentialMenu = function() {
	if (EXI.credentialManager.getCredentials() != null){
		if (EXI.credentialManager.getCredentials().length > 0){
			return {
				icon : '../images/icon/rsz_1ic_input_black_24dp.png',
				height : 30,
				text : 'Add',
				handler : function() {
						window.location.href = '#/login';
				} 
			};
		}
	}
};

MainMenu.prototype.populateCredentialsMenu = function() {
	this.credentialsMenu.removeAll();
	var credentialDisplay = "";
	if (EXI.credentialManager.getCredentials() != null) {
		for (var i = 0; i < EXI.credentialManager.getCredentials().length; i++) {
			credentialDisplay = EXI.credentialManager.getCredentials()[i].username;
			if (EXI.credentialManager.getCredentials()[i].activeProposals.length > 0) {
				for (var j = 0; j < EXI.credentialManager.getCredentials()[i].activeProposals.length; j++) {
					credentialDisplay = EXI.credentialManager.getCredentials()[i].activeProposals[j] + "@" + EXI.credentialManager.getCredentials()[i].username;
					this.credentialsMenu.add({
						text : credentialDisplay,
						icon : "../images/icon/rsz_esrflogo80.gif",
						disabled : true });
				}
			} else {
				this.credentialsMenu.add({
					text : credentialDisplay,
					icon : "../images/icon/rsz_esrflogo80.gif",
					disabled : true });
				
			}
			
			
		}
	} 
	if (EXI.credentialManager.getCredentials().length > 0){
		Ext.getCmp(this.loginButtonId).setText("<span style='color:white'>Log out <span style='font-weight:bold;'>" + credentialDisplay + " </span> </span>");
		Ext.getCmp(this.loginButtonId).setIcon("../images/rsz_logout.png");
	}
	else{
		Ext.getCmp(this.loginButtonId).setText("<span style='color:white'>Sign In</span>");
		Ext.getCmp(this.loginButtonId).setIcon("../images/rsz_login.png");
	}
	
	
};

MainMenu.prototype._convertToHTMLWhiteSpan = function(text) {
	return '<span style="color:white">' + text +'</span>';
};

MainMenu.prototype.isLoggedIn = function() {
	return (EXI.credentialManager.getCredentials().length > 0);
};


MainMenu.prototype.getLoginButton = function() {
	var icon =  "../images/rsz_login.png";
	var text =  this._convertToHTMLWhiteSpan("Sign In");
	
	if (EXI.credentialManager.getCredentials().length > 0){
		icon =  "../images/rsz_logout.png";
		text =  this._convertToHTMLWhiteSpan("log out");
	}
	
	return {
		xtype 	: 'splitbutton',
		id	: this.loginButtonId,
		text 	: text,
		cls 	: 'button_log_out',
		icon 	: icon,
		menu 	: this.credentialsMenu,
		handler : function() {
			if (EXI.credentialManager.getCredentials().length == 0){
				location.hash = "/login";
			}
			else{
				location.hash = "/logout";
			}
		} 
	};
};

MainMenu.prototype.getPanel = function() {
	var _this = this;
	
	this.credentialsMenu = new Ext.menu.Menu({
		id : _this.id + "menu",
		items : [_this.getAddCredentialMenu()] 
	});
	
	var items  = this.getMenuItems();
	items.push('->');
	items.push(this.getLoginButton());
	
	this.tb = Ext.create('Ext.toolbar.Toolbar', {
		cls : this.cssClass,
		items : items
	});
	return this.tb;
};

/*function SelectionMenu() {

	
	
}

SelectionMenu.prototype.openViewer = function() {
	var ids = exiSAXS.localExtorage.selectedSubtractionsManager.getDataCollectionIds();
	location.hash = "/datacollection/dataCollectionId/" + ids.toString() +"/primaryviewer";
};

SelectionMenu.prototype.openMerge = function() {
	var ids = exiSAXS.localExtorage.selectedSubtractionsManager.getDataCollectionIds();
	location.hash = "/datacollection/dataCollectionId/" + ids.toString() +"/merge";
};

SelectionMenu.prototype.clear = function() {
	exiSAXS.localExtorage.selectedSubtractionsManager.clear();
	
};


SelectionMenu.prototype.getPanel = function() {
	var _this = this;
	var tb = Ext.create('Ext.toolbar.Toolbar', {
	    height : 50,
	   
	    items: [
	        {
	            xtype: 'splitbutton',
	            text : 'Actions',
	            menu: new Ext.menu.Menu({
	                items: [
	                    	{text: 'Open Viewer', handler: function(){ _this.openViewer(); }},
	                    	{text: 'Open Merging Tool', handler: function(){  _this.openMerge(); }},
	                    	"-",
	                    	{text: 'Create new Project from Selection', handler: function(){ alert("Item 2 clicked"); }},
	                    	"-",
	                    	{text: 'Discard Selection', handler: function(){_this.clear(); }}
	                    
	                    
	                ]
	            })
	        }
	    ]
	});
	return tb;
};
*/

/**
 * Main class used for the west panel. Main purpose is the navigation
 */

function ListView(){
	this.width = 250;
	this.height = Ext.getBody().getHeight() - 215;

	/** Event is triggered when a element has been selected from the list **/
	this.onSelect = new Event();
}

ListView.prototype.getSorters = function(){
	return {};
};

ListView.prototype.getFilter = function(value){
	return null;
};

ListView.prototype.load = function(data){
	this.data = data;
	if (this.formatData != null){
		this.store.loadData(this.formatData(data));
	}
	else{
		this.store.loadData(data);
	}
};


ListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: this.title,  flex: 1, dataIndex: 'shippingId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

ListView.prototype.getFields = function(){
	return  [];
};

ListView.prototype.getPanel = function(){
	var _this =this;
	this.store = Ext.create('Ext.data.Store', {
	    fields:this.getFields(),
	    data : [],
	    sorters: this.sorters,
	    proxy: {
	        type: 'memory',
	        reader: {
	            type: 'json'
	        }
	    }
	});
	
	this.panel =  Ext.create('Ext.grid.Panel', {
	    store: this.store,
	    layout : 'fit',
	    columns: this.getColumns(),
	    width: this.width,
	    height : this.height,
	    multiSelect : true,
	    dockedItems: [{
	        xtype: 'toolbar',
	        dock: 'bottom',
	        cls : 'x-toolbar',
	        height : 42,
	        items: [
	            {
            xtype: 'textfield',
            name: 'searchField',
            hideLabel: true,
            width: 200,
            hidden : _this.getFilter() == null,
            emptyText : 'Search...',
            listeners : {
    			'change' : function(field, e) {
    						var value = field.getValue();
    						if (value != ""){
    							_this.store.filter(_this.getFilter(value));
    						}
    						else{
    							_this.store.clearFilter(true);
    							_this.load(_this.data);
    						}
    					} 
            		} 
	            }
	        ]
	    }],
	    viewConfig : {
	    	emptyText: 'No items to display',
	    	enableTextSelection : true,
	    	preserveScrollOnRefresh : true,
			stripeRows : true
		}
	});
	
    this.panel.on('selectionchange', function(view, elements){
    		var data = [];
    		for ( var index in elements) {
				data.push(elements[index].data);
			}
    		/** Trigger on select event **/
    		_this.onSelect.notify(data);
	    });
	return this.panel; 
};



function RunListView(){
	this.sorters = [];
	ListView.call(this);
}

RunListView.prototype.getPanel = ListView.prototype.getPanel;
RunListView.prototype.load = ListView.prototype.load;

RunListView.prototype.getFilter = function(value){
	return [{property : "name", value : value, anyMatch : true}];
};


RunListView.prototype.formatStatus = function(status){
	if (status == "FINISHED"){
		return "<span style='color:green;font-weight:bold;'>" + status + "</span>" ;
	}
	return "<span style='color:orange;font-weight:bold;'>" + status + "</span>"; 
};

RunListView.prototype.formatJobs = function(jobs){
	var html = "<table>";
	for (var i = 0; i < jobs.length; i++) {
		html = html + "<tr><td>" + jobs[i].name +"</td></tr>";
	}
	return html + "</table>"; 
};

RunListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
	
		html = html + "<tr><td>Name:</td><td>" + record.data.name+ "</td></tr>";
		html = html + "<tr><td>Status:</td><td>" + this.formatStatus(record.data.status) + "</td></tr>";
		html = html + "<tr><td>Jobs:</td><td>" + this.formatJobs(record.data.jobs) + "</td></tr>";
		html = html + "<tr><td>Date:</td><td>" + record.data.creationDate+ "</td></tr>";
	return html + "</table>";
};

RunListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Jobs',  flex: 1, dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

RunListView.prototype.getFields = function(){
	return  ['name', 'status', 'creationDate', 'jobs'];
};



function SessionListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

SessionListView.prototype.getPanel = ListView.prototype.getPanel;
SessionListView.prototype.load = ListView.prototype.load;

SessionListView.prototype.getFilter = function(value){
	return [{property : "beamlineName", value : value, anyMatch : true}];
};

SessionListView.prototype.formatData = function(data){
	for (var i = 0; i < data.length; i++) {
		data[i]["day"] =  moment(data[i].BLSession_startDate).format("Do");
        data[i]["year"] =  moment(data[i].BLSession_startDate).format("YYYY");
        data[i]["month"] =  moment(data[i].BLSession_startDate).format("MMM");
	}
    
	return data;
};


SessionListView.prototype.getRow = function(record){

    var html = "";
    dust.render("session.listview", record.data, function(err, out){
		html = html + out;
    });
    return html;

};

SessionListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Session',  flex: 1, dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

SessionListView.prototype.getFields = function(){
	return  ['date'];
};



function ShippingListView(){
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

ShippingListView.prototype.getPanel = ListView.prototype.getPanel;
ShippingListView.prototype.load = ListView.prototype.load;
ShippingListView.prototype.getFilter = ListView.prototype.getFilter;
ShippingListView.prototype.getFields = ListView.prototype.getFields;
ShippingListView.prototype.getColumns = ListView.prototype.getColumns;


/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
ShippingListView.prototype.getRow = function(record){
	var html = "";
    
	dust.render("shipping.listview", record.data, function(err, out){
        	html = out;
     	});
	return html;
};


function WorkSpaceListView(){
	this.width = 250;
	this.height = 800;

	this.selectionMenu = new SelectionMenu();
	this.onSelect = new Event();
	
	this.projectId = null;
}


WorkSpaceListView.prototype.loadProjects = function(projects){
		if (projects != null){
			this.projectStore.loadData(projects);
		}
		this.loadRuns();
};

WorkSpaceListView.prototype.loadRuns = function(){
	var _this = this;
	var exidataAdapter = new ExiDataAdapter();
	exidataAdapter.onSuccess.attach(function(sender, runs){
		_this.runStore.loadData(runs.reverse());
		_this.runGrid.setLoading(false);
	});
	this.runGrid.setLoading();
	
	this.projectId = exiSAXS.localExtorage.userManager.getActiveProject().internalId;
	exidataAdapter.getRuns(exiSAXS.localExtorage.userManager.getActiveProject().internalId);
};



WorkSpaceListView.prototype.setSelectedItems = function(items){
	/** remove id **/
	for (var i = 0; i < items.length; i++) {
		delete items[i].id;
	}
	this.selection.loadData(items);
	this.projectGrid.collapse();
};




WorkSpaceListView.prototype.getSelectionPanel = function(){
	this.selection = Ext.create('Ext.data.Store', {
	    fields:['subtractionId', 'scattering', 'macromoleculeAcronym', 'concentration', 'framesMerge', 'framesCount', 'exposureTemperature']
	});
	function formatFrames(averaged, count){
		if ((averaged != null) && (count != null)){
			if (averaged / count < 0.3){
				return "<span style='color:red;'>" + averaged + "/" + count + "</span>";
			}
			if (averaged / count < 0.7){
				return "<span style='color:orange;'>" + averaged + "/" + count + "</span>";
			}
		}
		return averaged + "/" + count;
	}
	
	function processResult(answer){
							if (answer == "yes"){
								exiSAXS.localExtorage.selectedSubtractionsManager.remove(record.data);
							}
	}
	
	this.selectionGrid = Ext.create('Ext.grid.Panel', {
	    store: this.selection ,
	    title : "Selection",
	    emptyText : "No selection",
	    tbar : this.selectionMenu.getPanel(),
	    columns: [
	        { 	
	        	text: '',  
	        	dataIndex: 'scattering', 
	        	renderer : function(grid, data, record){
	    			return '<img src=' + new DataAdapter().getImage(record.data.subtractionId, "scattering") + '   height="70" width="70" >';
	        	} 
	        },
	        { 	text: '', 
	        	dataIndex: 'macromoleculeAcronym', 
	        	flex: 0.8, 
	        	renderer : function(grid, data, record){
	    			return record.data.macromoleculeAcronym + 
	    					"<br />" +
	    					 BUI.formatValuesUnits(record.data.concentration, "mg/ml", 7, 2) +
	    					"<br />" +
	    					record.data.exposureTemperature + "<span class='key_subgrid'> C</span>" +
	    					"<br />" +
	    					formatFrames(record.data.framesMerge, record.data.framesCount);
	        	} 	
	        },
	        { 
	        	text: '', 
	        	id : 'remove',
	        	dataIndex: 'scattering', 
	        	width : 50,
	        	renderer: function(value){
	                return "<br />" + '<img style="cursor: pointer; height:30px;width:30px;" src="images/icon/ic_highlight_remove_black_24dp.png" />';
	            }
	        },
	    ],
	    width: 200,
	    listeners: {
	    	cellclick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					if (cellIndex == 2) {
				
						Ext.Msg.show({
						   title:'Discard subtraction?',
						   msg: 'Your are discarding a selected subtraction. You may re-add it afterwards. Would you like to discard it?',
						   buttons: Ext.Msg.YESNO,
						   icon: Ext.Msg.QUESTION,
						   fn: processResult,
						   height : 150
						});
					}
	    	}
	    }
	});
	return this.selectionGrid;
};

WorkSpaceListView.prototype.getProjectPanel = function(){
	this.projectStore= Ext.create('Ext.data.Store', {
	    fields:['name']
	});

	this.projectGrid = Ext.create('Ext.grid.Panel', {
	    store: this.projectStore,
	    title : "Projects",
	    emptyText : "No projects", 
	    columns: [
	        { text: 'Name',  dataIndex: 'name', flex: 1, 
	        	
	        	renderer : function(grid, opts, record){
	        		var html =  "<span class='projectName'>" + record.data.name + "</span><br/>" +
	        			    "<span class='projectDescription'>"  + record.data.description + "</span>";
	        		
	        		if (record.data.subtractions != null){
	        			html = html + "<br />" + record.data.subtractions.length + " datasets selected";
	        		}
	        		
	        		return html;
	        				
	        	} 
	        }
	    ],
	    height: 200
	});
	return this.projectGrid;
};

WorkSpaceListView.prototype.getRunPanel = function(){
	var _this = this;
	this.runStore= Ext.create('Ext.data.Store', {
	    fields:['name']
	});

	this.runGrid = Ext.create('Ext.grid.Panel', {
	    store: this.runStore,
	    title : "Run",
	    emptyText : "No Runs",
	    minHeight : 600,
	    dockedItems: [{
	        xtype: 'toolbar',
	        dock: 'bottom',
	        ui: 'footer',
	        items: [
	            { xtype: 'component', flex: 1 },
	            { 
	            	xtype: 'button', 
	            	text: 'Refresh', 
	            	handler : function(sender, a, b){
	            		_this.loadRuns();
	            	
	            	} 
	            }
	        ]
	    }],
	    columns: [
	        {
	        	text: 'Name',  
	        	dataIndex: 'name', 
	        	flex: 1, 
	        	renderer : function(grid, opts, record){
	        		var jobs = record.data.jobs;
	        		var html = '<table>';
	        		html = html + "<tr ><td  class='nameRun'>" + record.data.name + "</td></tr>";
	        		html = html + "<tr ><td  class='statusRun'>" + record.data.status + "</td></tr>";
	        		html = html + "<tr ><td  class='dateRun'>" + record.data.creationDate + "</td></tr>";
	        		if (jobs != null){
	        			for (var i = 0; i < jobs.length; i++) {
							html = html + "<tr ><td class='jobRow'>" + jobs[i].name +"</td><td>" + jobs[i].status + "</td></tr>";
						}
	        		}
	        		return html + "</table>";
	        				
	        	} 
	        }
	    ],
	    height: 200
	});
	
	  this.runGrid.on('select', function( grid, record, index, eOpts ){
		  	location.hash = "/project/" + _this.projectId + "/run/" +record.data.internalId + "/main";
	    });
	  
	return this.runGrid;
};


WorkSpaceListView.prototype.getPanel = function(){
	var _this =this;
	this.panel =  Ext.create('Ext.panel.Panel', {
	    layout : 'fit',
	    autoScroll : true,
	    defaults: {
	        bodyStyle: 'padding:15px'
	    },
	    /*layout: {
	        type: 'accordion',
	        titleCollapse: false,
	        animate: true,
	        activeOnTop: true
	    },*/
	    items: [
	            _this.getSelectionPanel(),
	            _this.getProjectPanel(),
	            _this.getRunPanel()
        ]
	});
	return this.panel; 
};

function Credential(username, roles, token, url, exiUrl,activeProposals, properties) {
	this.username = username.toLowerCase();
	this.roles = roles;
	this.url = url;
	this.exiUrl = exiUrl;
	this.token = token;
	this.activeProposals = activeProposals;
	this.properties = properties;
}

Credential.prototype.isManager = function() {
	return this._checkRole("manager");
};

Credential.prototype.isLocalContact = function() {
	return this._checkRole("localcontact");
};

Credential.prototype._checkRole = function(role) {
	return JSON.stringify(this.roles).toLowerCase().indexOf(role) != -1;
};

function CredentialManager(){
	this.onLogin = new Event(this);
	this.onLogout = new Event(this);
	this.onActiveProposalChanged = new Event(this);
}

CredentialManager.prototype.addCredential = function(username, roles, token, url, exiUrl, properties){
	var credential = new Credential(username, roles, token, url, exiUrl, [], properties);
	/** Writing to ExtLocalStorage * */
	if (localStorage.getItem("credentials") == null) {
		localStorage.setItem("credentials", "[]");
	}
	var credentials = this.getCredentials();
	credentials.push(credential);
	localStorage.setItem("credentials", JSON.stringify(credentials));
	this.onLogin.notify(credential);
};

CredentialManager.prototype.getCredentials = function(){
	var credentials = [];
	if (JSON.parse(localStorage.getItem("credentials")) != null){
		credentials = JSON.parse(localStorage.getItem("credentials"));
	}
	return credentials;
};

/** Given a beamline name it return MX or SAXS **/
CredentialManager.prototype.getTechniqueByBeamline = function(beamlineName){
	var connections = this.getConnections();
	for (var i = 0; i < connections.length; i++) {
		if (JSON.stringify(connections[i].beamlines.MX).toUpperCase().indexOf(beamlineName.toUpperCase()) != -1){
			return "MX";
		}
		if (JSON.stringify(connections[i].beamlines.SAXS).toUpperCase().indexOf(beamlineName.toUpperCase()) != -1){
			return "SAXS";
		}
	}
	return "UNKNOW";

};

/** Returns an string with the name of all the beamlines **/
CredentialManager.prototype.getBeamlines = function(){
	var connections = this.getConnections();
  var beamlines = [];
	for (var i = 0; i < connections.length; i++) {
      $.merge(beamlines, connections[i].beamlines.MX);
      $.merge(beamlines, connections[i].beamlines.SAXS);
	}
	return beamlines;

};

CredentialManager.prototype.getConnections = function(){
	var credentials = this.getCredentials();
	var connectors = [];
	for (var i = 0; i < credentials.length; i++) {
		if (credentials[i].activeProposals.length > 0){
			for (var j = 0; j < credentials[i].activeProposals.length; j++) {
				connectors.push({
					username : credentials[i].username,
					url : credentials[i].url,
					exiUrl : credentials[i].exiUrl,
					token : credentials[i].token,
					beamlines : credentials[i].properties.beamlines,
					proposal : credentials[i].activeProposals[j] });
			}
		}
		else{
				connectors.push({
					username : credentials[i].username,
					url : credentials[i].url,
					exiUrl : credentials[i].exiUrl,
					token : credentials[i].token,
					beamlines : credentials[i].properties.beamlines,
					proposal : null
				});
		}
	}
	return connectors;
};

CredentialManager.prototype.getCredentialByUserName = function(username, roles, token, url){
	var credentials = this.getCredentials();
	for (var i = 0; i < credentials.length; i++) {
		if (credentials[i].username == username) {
			return new Credential(
					credentials[i].username,
					credentials[i].roles,
					credentials[i].token,
					credentials[i].url,
					credentials[i].activeProposals);
		}
	}
};

CredentialManager.prototype.logout = function(username, roles, token, url){
	localStorage.removeItem('credentials');
	this.onLogout.notify();
};

CredentialManager.prototype.setActiveProposal = function(username, proposal){
	var credentials = this.getCredentials();
	for (var i = 0; i < credentials.length; i++) {
		if (credentials[i].username.toLowerCase() == username.toLowerCase()) {
			credentials[i].activeProposals = [proposal];
			localStorage.setItem("credentials", JSON.stringify(credentials));
			localStorage.removeItem("sessions");
			this.onActiveProposalChanged.notify();
		}
	}
};



function MainView(args) {
	this.id = BUI.id();
	this.title = "New Tab";
	this.closable = true; 
	this.onSelectionChange = new Event(this);
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
	
	//this.bodyStyle = {"background-color":"#FAFAFA"};
    
    if (args != null){
        if (args.title != null){
            this.title = args.title;
        }
    }

}

MainView.prototype.getContainer = function() {
	return this.container;
};

MainView.prototype.getPanel = function() {
	this.container = Ext.create('Ext.container.Container', {
		xtype : 'container',
		items : []
	});

	this.panel = Ext.create('Ext.panel.Panel', {
		autoScroll : true,
		title : this.title,
		closable: this.closable,
		icon : this.icon,
		bodyStyle: this.bodyStyle, 
		items :[this.getContainer() ]
	});
	return this.panel;
};
function AddressMainView() {
	this.icon = '../images/icon/contacts.png';
	this.queueGridList = [];

	MainView.call(this);

	this.addressForm = new AddressForm();
	
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

AddressMainView.prototype.getPanel = MainView.prototype.getPanel;

AddressMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    margin : 15,
	    border: 1,
	    defaults: {
	        labelWidth: 80,
	        flex: 1,
	    },
	    items: [this.addressForm.getPanel([])]
	});
};


AddressMainView.prototype.load = function(labContactId) {
	
	this.panel.setTitle("Address");
	var _this = this;
	var onSuccess = function(sender, data){
		_this.addressForm.load(data);
	};
	
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.labcontacts.getLabContactById(labContactId);
	
	
};


/**
* Class for the manager landing page. It inherits from MainView
*
* @class ManagerWelcomeMainView
* @constructor
*/
function ManagerWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Home";
	this.closable = false;

    this.sessionGrid = new SessionGrid({
                    width : null,
                    height:600,
                    isHiddenTitle : false,
                    isHiddenNumberOfShifts : false,
                    isHiddenLocalContact : false,                                        
                    margin : '10 10 10 10'
    });
    
    this.proposalGrid = new ProposalGrid({
                                            width: 900,
                                            height:600,
                                            margin : '10 10 10 10'

                                    });
}

ManagerWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;

/**
* This sets an active proposal into the credential Manager. It also retrieve all the information about the proposal: shipments, macromolecules, crystals, buffers, etc.. and store 
* them in a local storage
*
* @method activeProposal
* @param {Object} proposal Proposal object that should container at least: [code, number]
*/
ManagerWelcomeMainView.prototype.activeProposal = function(proposal) {
    
    EXI.mainStatusBar.showBusy("Loading proposal " +proposal); 
    
	EXI.credentialManager.setActiveProposal(this.username, proposal);
    EXI.proposalManager.clear();
	/** I don't need this to be synchronous **/	
    EXI.proposalManager.onActiveProposalChanged = new Event();
    EXI.proposalManager.onActiveProposalChanged.attach(function(){
        EXI.mainStatusBar.showReady();
        console.log(EXI.proposalManager.get());
    });
	EXI.proposalManager.get();
};


ManagerWelcomeMainView.prototype.getContainer = function() {
	this.container = Ext.create('Ext.panel.Panel', {
		autoScroll : true,
        margin : 20,
        cls : 'border-grid',
        tbar : this.getToolbar(),
            items :[
                this.sessionGrid.getPanel()
        ]
	});
	return this.container;
};

/**
* It receives a list of proposals and display them in the main container
*
* @param {Object} proposals Arrays of Proposal objects
* @method displayProposals
*/
ManagerWelcomeMainView.prototype.displayProposals = function(proposals) {
    var _this = this;
    this.container.removeAll();
   
    this.proposalGrid.onSelected.attach(function(sender, proposal){
            _this.panel.setLoading(true);
            var proposalCode = proposal.Proposal_proposalCode + proposal.Proposal_proposalNumber;
            function onSuccess(sender, sessions){
                _this.displaySessions(sessions, sessions.length + " sessions for proposal " + proposalCode);
                _this.panel.setLoading(false);
            }
            EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposal(proposalCode);
                            
            /** Loading Proposal info */                 
            _this.activeProposal( proposal.Proposal_proposalCode + proposal.Proposal_proposalNumber);
        
    });
    
    this.container.insert(this.proposalGrid.getPanel());
    this.proposalGrid.load(proposals);
};

/**
* Retrieves a list of sessions based on a start date and end date and loads them on the session grid
*
* @param {String} start Date should be in the format of YYYYMMDD
* @param {String} end Date should be in the format of YYYYMMDD
* @method loadByDate
*/
ManagerWelcomeMainView.prototype.loadByDate = function(username, start, end) {
          var _this = this;
          this.panel.setLoading(true);
          function onSuccess(sender, data){              
        	  _this.displaySessions(data, data.length + " sessions scheduled on " + moment(start, 'YYYYMMDD').format('MMMM Do YYYY'));
        	  _this.panel.setLoading(false);
          }
          /** Increasing one day */
          end = moment(end, "YYYYMMDD").add(1, 'days').format("YYYYMMDD");                    
          if (this.isUser(username)){
		        EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposalAndDate(start, end, username);
          }
          else{
                EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByDate(start, end);
          }
};

/**
* Removes oldest sessions up to get only 500
*
* @param {String} sessions List of sessions
* @method filterSessions
*/
ManagerWelcomeMainView.prototype.filterSessions = function(sessions) {    
        var realLength = sessions.length;
        data = _.slice(sessions, 0, 500);
        // Sorting by start date because sessionId does not sort by date
        _(sessions).forEach(function(value) {
                value['ms'] = moment(value.BLSession_startDate, 'MMM DD, YYYY h:mm:ss a').format('x');
        });
        sessions = _.orderBy(sessions, ['ms'], ['desc']);
        return sessions.slice(0, 300);
        
};
        
ManagerWelcomeMainView.prototype.displaySessions = function(sessions, title) {
    var _this = this;
    
    /** it loads the session panel */
    this.container.removeAll();   
    this.container.insert(this.sessionGrid.getPanel());

    /** Handling onSelected **/
    this.sessionGrid.onSelected.attach(function(sender, args){
        EXI.proposalManager.clear();
        _this.activeProposal(args.proposalCode + args.proposalNumber);
    });
    
    this.sessionGrid.load(this.filterSessions(sessions));
    this.sessionGrid.panel.setTitle(title);
};

ManagerWelcomeMainView.prototype.getToolbar = function() {
   var _this = this;
   var dateMenu = Ext.create('Ext.menu.DatePicker', {
        handler: function(dp, date){            
            location.href = "#/welcome/manager/" + _this.username +"/date/"+ Ext.Date.format(date, 'Ymd') +"/" + Ext.Date.format(date, 'Ymd') +"/main";          
        }
    });

    return Ext.create('Ext.toolbar.Toolbar', {
        width   : 500,
        cls 	: 'exi-top-bar',
        items: [
            {
               text: 'Choose a Date',
               icon : '../images/icon/sessions.png',
               menu: dateMenu 
            },
            {
                xtype    : 'textfield',
                name     : 'field1',
                width    : 300,
                emptyText: 'enter search term (proposal or title)',
    			listeners : {
    				specialkey : function(field, e) {
    					if (e.getKey() == e.ENTER) {
    						var found = _this.searchProposalByTerm(field.getValue());
    						_this.displayProposals(found);
    					}
    				} 
    			} 
            }
        ]
    });
};

ManagerWelcomeMainView.prototype.searchProposalByTerm = function(term) {
	var result = [];
	if (this.proposals != null){
		for (var i = 0; i < this.proposals.length; i++) {
			var proposalId = this.proposals[i]["Proposal_proposalCode"] +  this.proposals[i]["Proposal_proposalNumber"];
			var title = this.proposals[i]["Proposal_title"];
			if (title == null){
				title = "";
			}
			if ((proposalId.toUpperCase().match(term.toUpperCase())) ||(title.toUpperCase().match(term.toUpperCase()))){
				result.push(this.proposals[i]);
			}
		}
	}
	return result;
};

/**
* Retrieves all proposas on ISPyB and stores them on this.proposal 
* It is useful for fast search later on
*
* @method loadProposals
*/
ManagerWelcomeMainView.prototype.loadProposals = function(callback) {
	var _this = this;
	var onSuccess = function(sender, proposals){
		_this.proposals = proposals;
        if (callback){            
            callback();
        }
	};	
	EXI.getDataAdapter({onSuccess:onSuccess}).proposal.proposal.getProposals();
};

ManagerWelcomeMainView.prototype.isUser = function(username) {
       return (!EXI.credentialManager.getCredentialByUserName(username).isManager() && (!EXI.credentialManager.getCredentialByUserName(username).isLocalContact()));
};

ManagerWelcomeMainView.prototype.load = function(username) {      
  this.username = username;  
  /** By default for users we load all the sessions and managers only sessions that occurs today */
  if (this.isUser(username)){
    this.loadSessionsByProposal(username);  
    /** set active proposal */
    this.activeProposal(username);
  }
  else{
    var today = moment().format("YYYYMMDD");
    this.loadSessionsByDate(username, today, today);
  }    
};

/**
* Retrieves all sessions for the proposal
*
* @method loadSessions
*/
ManagerWelcomeMainView.prototype.loadSessionsByProposal = function(username) {
    this.username = username;
    var _this = this;
    this.panel.setLoading(true);
    function onSuccess(sender, data){
       _this.displaySessions(data, "Sessions for proposal " + username);
       _this.panel.setLoading(false);
    }
    EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposal(username);
};


ManagerWelcomeMainView.prototype.loadSessionsByDate = function(username, start, end) { 
  this.username = username;
  this.loadByDate(username, start, end);  
   /** This is need for quick searchs on proposals **/
  this.loadProposals(); 
};

ManagerWelcomeMainView.prototype.loadSessionsByTerm = function(username, term) {
  this.username = username;    
  /** This is need for quick searchs on proposals **/
  var _this = this;
  var onSuccess = function(sender, proposals){
		_this.proposals = proposals;
       _this.searchProposalByTerm(term);
  };
  EXI.getDataAdapter({onSuccess:onSuccess}).proposal.proposal.getProposals();
};

function RunMainView() {
	this.id = BUI.id();
	MainView.call(this);
}

RunMainView.prototype.getPanel = MainView.prototype.getPanel;

RunMainView.prototype.getOutputPanel = function() {
	this.outputStore = Ext.create('Ext.data.Store', {
	    fields:['name', 'value', 'type', 'targetId', 'tool', 'i' ],
	    groupField: 'tool',
	    sorters : [{property: 'i', direction : 'DESC'}]
	});

	return Ext.create('Ext.grid.Panel', {
	    store: this.outputStore,
	    cls : 'border-grid',
	    features: [{ftype:'grouping'}],
	    columns: [
	        { text: 'Tool',  dataIndex: 'tool', flex : 1, hidden:true },
	        { text: 'id',  dataIndex: 'i', flex : 1, hidden:true },
	        { text: 'Name',  dataIndex: 'name', flex : 1 },
	        { text: 'value', dataIndex: 'value', flex : 1 },
	        { text: 'type', dataIndex: 'type', flex : 1 },
	        { text: 'target', dataIndex: 'targetId', flex : 1, hidden:true },
	        { text: '', dataIndex: 'targetId', flex : 1, renderer : function(grid, opt, record){
        		var url =EXI.credentialManager.getConnections()[0].exiUrl + "/file/" + record.data.targetId + "/download";
        		return "<div><a style='color:blue;' href='"+ url +"'>Download</a></div>";
	        } 
        }
	    ]
	});
};


RunMainView.prototype.getGeneralContainerList = function(run) {
	var li = "<ul class='generalContainerRunList'>";
	li = li + "<li>Name: " + run.name + "</li>";
	li = li + "<li>Status: " + run.status + "</li>";
	li = li + "<li>" + run.creationDate + "</li>";
	return li;
};

RunMainView.prototype.getGeneralContainer = function(run) {
	return {
		xtype : 'panel',
		title : "General",
		margin : 10,
		border : 1,
		style: {borderColor:'gray', borderStyle:'solid', borderWidth:'1px'},
		items : [
		         {
		        	 html 		: this.getGeneralContainerList(run),
		        	 margin 	: '10 0 0 50'
		         }
		]
	};
};

RunMainView.prototype.getMainPanel = function() {
	
};

RunMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 0',
				items : [
				     	this.getMainPanel(),
					{
						tabConfig : {
							title : 'Output Files'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							cls : 'border-grid',
							items : [ 
							         this.getOutputPanel()
							]
						}

						]
					}
//				     	,
//					{
//						tabConfig : {
//							title : "Input",
//						},
//						items : [  
//									{
//										xtype : 'container',
//										layout : 'vbox',
//										height : 700,
//										padding : 20,
//										cls : 'border-grid',
//										items : [ 
//										     	]
//									}
//					]
//			}
			]});
};

RunMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 5,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    items: [
	            
	            	this.getTabs()
	            ]
	});
};

RunMainView.prototype.loadMain = function(run) {
	
};

RunMainView.prototype.load = function(run) {
	if (run != null) {
		this.panel.setTitle(run.name);
		var parsed = [];
		for (var i = 0; i < run.jobs.length; i++) {
			for (var j = 0; j < run.jobs[i].output.length; j++) {
				run.jobs[i].output[j]["tool"] = run.jobs[i].name + " " + run.jobs[i].version;
				run.jobs[i].output[j]["i"] = i;
				parsed.push(run.jobs[i].output[j]);
			}
		}
		this.outputStore.loadData(parsed);
	}
	this.loadMain(run);
};

function DimpleRunMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	this.id = BUI.id();
	RunMainView.call(this);
}

DimpleRunMainView.prototype.getPanel = RunMainView.prototype.getPanel;
DimpleRunMainView.prototype.getOutputPanel = RunMainView.prototype.getOutputPanel;
DimpleRunMainView.prototype.getTabs = RunMainView.prototype.getTabs;
DimpleRunMainView.prototype.getContainer = RunMainView.prototype.getContainer;
DimpleRunMainView.prototype.load = RunMainView.prototype.load;

DimpleRunMainView.prototype.getFilesGrid = function() {
	var _this = this;
	
	this.filesStore = Ext.create('Ext.data.Store', {
	    fields:['name', 'targetId']
	});
	
	var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect : true,
		listeners : {
			selectionchange : function(sm, selections) {
				console.log(selections[0].data);
				var onSuccess = function(sender, content){
					document.getElementById(_this.id + "display").innerHTML = "<textarea rows='100' cols='100'> " + content + "</textarea>" ;
				};
				if (selections[0].data.name.indexOf(".mtz") == -1){
					EXI.getDataAdapter({onSuccess:onSuccess}).exi.offline.getFileContent(selections[0].data.targetId);
				}
				else{
					onSuccess(this, "No text available");
				}
			}

		} });
	
	return  Ext.create('Ext.grid.Panel', {
	    title: 'Files',
	    store:this.filesStore,
	    selModel : selModel,
	    cls : 'border-grid',
	    height : 400,
	    columns: [
	        { text: 'Name',     dataIndex: 'name', flex : 1}
	    ]
	});
};






DimpleRunMainView.prototype.getMainPanel = function() {
	var store = Ext.create('Ext.data.Store', {
	    fields:['key', 'value']
	});
	
	this.generalGrid = Ext.create('Ext.grid.Panel', {
	    title: 'General',
	    store:store,
	    layout : 'fit',
	    columns: [
	        { text: 'Name',     dataIndex: 'name' },
	        { text: 'Seniority', dataIndex: 'seniority' }
	    ],
	    flex : 1
	});
	
	
	return {
		tabConfig : {
			title : 'Dimple'
		},
		items : [ {
							xtype : 'container',
//							layout : 'fit',
							height : 700,
							cls : 'border-grid',
							items : [ 
							         {
											xtype : 'container',
											layout : 'hbox',
											items : [
											         {
															xtype : 'container',
															layout : 'fit',
															flex : 0.4,
															margin: 5,
															items : [
																	this.getFilesGrid(),
																	{
																		html : "<br />"
																	},
																	 {
															        	 html : '<div id="' + this.id +'blobs";><div>'
															        	 
															         }
															]
											         },
											         {
															xtype : 'container',
															layout : 'fit',
															flex : 0.6,
															margin: 5,
															height : 400,
															cls : 'border-grid',
															items : [
															         {
															        	 html : '<div id="' + this.id +'display";><div>'
															        	 
															         }
													         ]
											         }
									         ]
							         },
							         {
											xtype : 'container',
											margin: 5,
											height : 210,
											layout : 'fit',
											flex : 1,
//											cls : 'border-grid',
											items : [
											         {
											        	 html : '<div style="height:200px"  id="' + this.id +'snapshots";><div>'
											        	 
											         }
									         ]
							         }
							 ]
			         
			}
		]
	};
};

DimpleRunMainView.prototype.loadBlobs = function(job) {
	var blobs = [];
	var i = 0;
	for (i = 0; i < job.output.length; i++) {
		if (job.output[i].type == "blob"){
			blobs.push(job.output[i]);
		}
	}
	
	/** Rendering blobs **/
//	var table = document.createElement("table");
	var container = document.createElement("div");
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	for (i = 0; i < blobs.length; i++) {
		var td = document.createElement("td");
		var img = document.createElement("img");
		img.setAttribute("src", EXI.getDataAdapter().exi.offline.getFileImage(blobs[i].targetId));
		img.setAttribute("height", "180px");
		img.setAttribute("width", "180px");
		img.setAttribute("hspace", "10");
		
		img.setAttribute("onclick", "window.open(this.src)");
		td.appendChild(img);
		tr.appendChild(td);
		
		
	}
	table.appendChild(tr);
	document.getElementById(this.id + "snapshots").innerHTML =  table.innerHTML;
//	document.getElementById(this.id + "blobs").innerHTML = table.innerHTML;
};

DimpleRunMainView.prototype.loadFiles = function(job) {
	var files = [];
	for (var i = 0; i < job.output.length; i++) {
		if (job.output[i].type != "blob"){
			files.push(job.output[i]);
		}
	}
	this.filesStore.loadData(files);
};



DimpleRunMainView.prototype.loadMain = function(run) {
	console.log(run);
	if (run != null){
		if (run.jobs != null){
			if (run.jobs.length > 0){
				for (var i = 0; i < run.jobs.length; i++) {
					this.loadBlobs(run.jobs[i]);
					this.loadFiles(run.jobs[i]);
				}
			}
		}
	}
};
function SessionMainView(args) {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this, args);
	var _this = this;
	
	this.sessionGrid = new SessionGrid({
         width : 700,
         height: 598,
         margin : '0 0 0 20',
        title : "Click on calendar to see the sessions"
    });
}

SessionMainView.prototype.getPanel = MainView.prototype.getPanel;

SessionMainView.prototype.getContainer = function() {
    _this = this;
    
    
    this.subpanel =  Ext.create('Ext.container.Container', {
         layout:  'fit',  
         border : 0,  
        items : [
         
        ]
    });
	this.panel = Ext.create('Ext.container.Container', {
        layout:  'hbox',    
        margin : 10,        
        items: [            
                    {
                        html: '<div style="height:600px" id="' + this.id +'"></div>',
                        height :600,
                        border :0 ,
                        width : 600,                                         
                    } ,
                    this.subpanel                               
                    
            ],
        listeners: {
            afterrender: function() {
                _this.showCalendar([]);
            }
        }
    }
    );
	return this.panel;	
};

SessionMainView.prototype.showCalendar = function(data) {
     var _this = this;
     $('#' + _this.id).empty();
     function editEvent(event) {
                         _this.loadByDate(moment(new Date(event.startDate)).format("YYYYMMDD"));
      }
        $('#' + this.id).calendar({
            enableContextMenu: true,
            enableRangeSelection: true,
            selectRange: function(e) {
                editEvent({ startDate: e.startDate, endDate: e.endDate });
            },
            mouseOnDay: function(e) {
                if(e.events.length > 0) {
                    var content = '';
                    
                    for(var i in e.events) {
                        content += "<div class='event-tooltip-content'><div class='event-name' style='color:" + e.events[i].color + "'>" + e.events[i].name + "</div><div class='event-location'>" + e.events[i].location + "</div></div>";
                    }
                
                    $(e.element).popover({ 
                        trigger: 'manual',
                        container: 'body',
                        html:true,
                        content: content
                    });
                    
                    $(e.element).popover('show');
                }
            },
            mouseOutDay: function(e) {
                if(e.events.length > 0) {
                    $(e.element).popover('hide');
                }
            },
            dayContextMenu: function(e) {
                $(e.element).popover('hide');
            },
            dataSource: data
            
        });
};

SessionMainView.prototype.getBadge = function(title, count) {
    if (count){
        if (count != 0){
            return '<span>' + title + '  <span class="badge">' + count +'</span></span><br />';
        }
    }
    return "";
};
SessionMainView.prototype.getLocation = function(session) {
    var html = this.getBadge("Collect", session.dataCollectionGroupCount);
    html = html + this.getBadge("Images", session.imagesCount);
    html = html + this.getBadge("XRF", session.xrfSpectrumCount);
    html = html + this.getBadge("Energy", session.energyScanCount);
    return html + this.getBadge("Sample", session.sampleCount);
}; 

SessionMainView.prototype.load = function(sessions) {
	var sessionForCalendar = [];
    for(var i = 0; i < sessions.length; i++){
        sessionForCalendar.push({
           id : sessions[i].sessionId,
           name : sessions[i].Proposal_proposalCode + sessions[i].Proposal_ProposalNumber + "( " + sessions[i].beamLineName + " )",
           location : this.getLocation(sessions[i]),
           startDate : new Date(sessions[i].BLSession_startDate), 
           endDate : new Date(sessions[i].BLSession_endDate)
        });
        
    }
    
    this.showCalendar(sessionForCalendar);
    this.subpanel.insert( this.sessionGrid.getPanel());
    //this.sessionGrid.load(sessions);
    
    var _this = this;
    /** Rendering proposal Header */
    if ($("#" + this.id + "_header")){
        if (EXI.proposalManager.getProposals().length > 0){
            var proposal = EXI.proposalManager.getProposals()[0];
            proposal.sessionCount = sessions.length; 
            dust.render('welcomemainviewproposalheader', proposal, function(err, out) {
                
                $("#" + _this.id + "_header").html(out);
                _this.panel.insert(0,
                    {
                        html  :   out,
                        border : 0,
                        margin : '10 0 0 10',
                        width : 600
                        
                    });
            });
        }        
    }    
};

SessionMainView.prototype.loadByDate = function(start) {
          var _this = this;
          this.panel.setLoading(true);
          function onSuccess(sender, sessions){              
        	  //_this.displaySessions(data, data.length + " sessions scheduled on " + moment(start, 'YYYYMMDD').format('MMMM Do YYYY'));
             _this.sessionGrid.load(sessions);
        	  _this.panel.setLoading(false);
          }
          /** Increasing one day */
         var username = EXI.credentialManager.getCredentials()[0].activeProposals[0];
         var end = moment(start, "YYYYMMDD").format("YYYYMMDD");                    
         EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposalAndDate(start, end, username);          
};















/**
 * @showTitle
 *
 * #onSaved
 * #onAddPlates
 * #onRemovePlates
 **/
function CaseForm(args) {
	this.id = BUI.id();
	this.width = 600;
	this.showTitle = true;
	if (args != null) {
		if (args.showTitle != null) {
			this.showTitle = args.showTitle;
		}
	}

	this.onSaved = new Event(this);
}

CaseForm.prototype.fillStores = function() {
	var _this = this;
	this.panel.setLoading("Loading Labcontacts from database");

	var proposal = BUI.getProposal();
	proposal.onDataRetrieved.attach(function(sender, data) {
		_this.labContactForSendingStore.loadData(data, false);
		_this.labContactForReturnStore.loadData(data, false);
		_this.panel.setLoading(false);
	});
	proposal.getLabContactsByProposalId();

};

CaseForm.prototype.refresh = function(dewar) {
	this.setDewar(dewar);
};

CaseForm.prototype.getDewar = function() {
	this.dewar.code = Ext.getCmp(this.id + "dewar_code").getValue();
	this.dewar.comments = Ext.getCmp(this.id + "dewar_comments").getValue();
	this.dewar.transportValue = Ext.getCmp(this.id + "dewar_transportValue").getValue();
//	this.dewar.storageLocation = Ext.getCmp("dewar_storageLocation").getValue();
	this.dewar.storageLocation = this.storageLocationComboBox.getValue();
	//this.dewar.firstExperimentId = this.sessionsCombo.getValue();
	return this.dewar;
};

CaseForm.prototype.setDewar = function(dewar) {
	this.dewar = dewar;
	
	if (this.dewar == null){
		this.dewar={};
		this.dewar["code"] = "";
		this.dewar["transportValue"] = "";
		this.dewar["storageLocation"] = "";
		this.dewar["comments"] = "";
	}
	
	Ext.getCmp(this.id + "dewar_code").setValue(this.dewar.code);
	Ext.getCmp(this.id + "dewar_comments").setValue(this.dewar.comments);
	Ext.getCmp(this.id + "dewar_transportValue").setValue(this.dewar.transportValue);
//	Ext.getCmp("dewar_storageLocation").setValue(this.dewar.storageLocation);
	this.storageLocationComboBox.setValue(this.dewar.storageLocation);
	/*if (this.dewar.sessionVO != null) {
		this.sessionsCombo.setValue(this.dewar.sessionVO.sessionId);
	}*/
};

/*
CaseForm.prototype.getSessionCombo = function() {
	this.sessionsCombo = BIOSAXS_COMBOMANAGER.getComboSessions(EXI.proposalManager.getFutureSessions(), {
		labelWidth : 200,
		margin : '5 0 00 0',
		width : 500
	});
	return this.sessionsCombo;
};*/

CaseForm.prototype.getStorageLocationCombo = function() {
	this.storageLocationComboBox =  BIOSAXS_COMBOMANAGER.getComboStorageTemperature();
	return this.storageLocationComboBox;
};

CaseForm.prototype.getPanel = function(dewar) {
		this.panel = Ext.create('Ext.form.Panel', {
			width : this.width - 10,
//			cls : 'border-grid',
//			margin : 10,
			padding : 10,
			height : 320,
			items : [ {
				xtype : 'container',
				margin : "2 2 2 2",
				collapsible : false,
				defaultType : 'textfield',
				layout : 'anchor',
				items : [ {
					xtype : 'container',
					layout : 'vbox',
					items : [ {
						xtype : 'requiredtextfield',
						fieldLabel : 'Name',
						allowBlank : false,
						name : 'code',
						id : this.id + 'dewar_code',
						labelWidth : 200,
						width : 500
					}
					]
				}, 
				this.getStorageLocationCombo(),
				{
					xtype : 'numberfield',
					width : 500,
					labelWidth : 200,
					margin : '10 0 0 0',
					fieldLabel : 'Transport Value',
					id : this.id + 'dewar_transportValue'
				},
				{
					xtype : 'textareafield',
					name : 'comments',
					fieldLabel : 'Comments',
					labelWidth : 200,
					width : 500,
					margin : '10 0 0 0',
					height : 100,
					id : this.id + 'dewar_comments'
				} ]
			} ]
		});
	this.refresh(dewar);
	return this.panel;
};

function ContainerSpreadSheet(args){
	this.id = BUI.id();
	this.height = 380;
	this.width = 500;
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}
	
	this.onModified = new Event(this);
}

ContainerSpreadSheet.prototype.getPanel = function(){
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
		layout : 'vbox',
		height 		: this.height+ 50,
		items : [ 
				  {
						html 		: '<div  style="overflow: auto;overflow-y: hidden; border:1px solid gray;background-color:white;height:500px;width:' + (_this.width - 20) +'px"; id="' + this.id + '_samples"; ></div>',
						margin 		: '20 0 20 10',
						height 		: this.height,
						width 		: this.width,
						autoScroll 	: true,
						resizable 	: true
					}]
	});
    return this.panel;
};


ContainerSpreadSheet.prototype.getSamplesData = function(puck) {
	var samples = puck.sampleVOs;
	var data = [];
	/** Sorting samples by location * */
	samples.sort(function(a,b){return Number(a.location) - Number(b.location);});
	function getSampleByLocation(samples, location){
		for (var i = 0; i < samples.length; i++) {
			if (samples[i].location == Number(location)){
				return samples[i];
			}
		}
	}

	function getValue(value){
		if (!value){return "";}
        return value;
	}
	
	for (var i = 0; i < puck.capacity; i++) {
		var sample = getSampleByLocation(samples, i + 1);
		if (sample!= null){
				var crystal = sample.crystalVO;
				var protein = crystal.proteinVO;
				var diffraction = sample.diffractionPlanVO;
				if (diffraction == null){
					diffraction = {};
				}
				data.push(
					[(i+1), protein.acronym, sample.name, crystal.spaceGroup, diffraction.experimentKind, sample.code,  getValue(diffraction["observedResolution"]),  diffraction.requiredResolution, diffraction.preferredBeamDiameter, 
					 diffraction.numberOfPositions, diffraction.radiationSensitivity, diffraction.requiredMultiplicity, diffraction.requiredCompleteness,
					 crystal.cellA, crystal.cellB, crystal.cellC, crystal.cellAlpha, crystal.cellBeta, crystal.cellGamma, sample.smiles, sample.comments
					 ]
				);
		}
		else{
			data.push([(i+1)]);
		}
	}
	return data;
};


ContainerSpreadSheet.prototype.getSpaceGroups = function() {
	return ["P1","P2","P21","C2","P222","P2221","P21212","P212121","C222","C2221","F222","I222","I212121","P4","P41","P42","P43","P422","P4212","P4122","P41212","P4222","P42212","P4322","P43212",
                	"I4","I41","I422","I4122","P3","P31","P32","P31","P321","P3112","P3121","P3212","P3221","P6","P61","P65","P62","P64","P63","P622","P6122","P6522","P6222","P6422","P6322","R3","R32","P23","P213",
                	"P432",	"P4232","P4332","P4132","F23","F432","F4132","I23",	"I213","I432","I4132", "UNKNOWN"];
};


ContainerSpreadSheet.prototype.getAcronyms = function() {
	var proteins = EXI.proposalManager.getProteins();
	var acronyms = [];
	for (var i = 0; i < proteins.length; i++) {
		acronyms.push(proteins[i].acronym);
	}
	return acronyms;
};


ContainerSpreadSheet.prototype.getHeader = function() {
	return  [
	         { text : '#', 	id: 'position', column : {width : 20}}, 
	         { text :'Protein <br />Acronym', id :'Protein Acronym', 	column :  {
																						width : 60,
																						type: 'dropdown',
																						source: this.getAcronyms()
																					}
	         }, 
	         { text :'Sample<br /> Name', id :'Sample Name', column : {width : 120}}, 
	         { text :'Space<br /> Group', id : 'Space Group',column : {
			        	 													width : 90,
			        	 													type: 'dropdown',
			        	 													source: this.getSpaceGroups()
			         								}
	         }, 
	         { text :'Exp.<br /> Type', id : 'Experiment Type', column : {
							        	 								width : 80,  
							        	 								type: 'dropdown',
							        	 								source: [ "Default", "MXPressE", "MXPressO", "MXPressI", "MXPressE_SAD", "MXScore", "MXPressM" ]
							         								}
	         }, 
	         { text :'Pin <br />BarCode', id : 'Pin BarCode', column : {width : 45}},  
	         { text :'Pre-observed <br />resolution', id : 'Pre-observed resolution', column : {width : 45}}, 
	         { text :'Needed<br /> resolution',  id :'Needed resolution', column : {width : 45}}, 
	         { text :'Pref. <br />Diameter', id :'Pref. Diameter',column : {width : 45}}, 
	         { text :'Number Of<br /> positions', id :'Number Of positions', column : {width : 45}}, 
	         { text :'Radiation<br /> Sensitivity', id :'Radiation Sensitivity', column : {width : 60}}, 
	         { text :'Required<br /> multiplicity', id :'Required multiplicity', column : {width : 60}}, 
	         { text :'Required<br /> Completeness', id :'Required Completeness', column : {width : 60}}, 
	         { text :'A', id :'Unit cell A', column : {width : 40}}, 
	         { text :'B', id :'Unit cell B', column : {width : 40}}, 
	         { text :'C', id : 'Unit cell C', column : {width : 40}}, 
	         { text :'&#945;', id :'Unit cell Alpha', column : {width : 40}}, 
	         { text :'&#946;', id :'Unit cell Beta', column : {width : 40}}, 
	         { text :'&#947;', id :'Unit cell Gamma', column : {width : 40}}, 
	         { text :'Smiles', id :'Required Completeness', column : {width : 45}}, 
	         { text :'Comments', id :'Comments', column : {width : 45}}
	         ];
};

ContainerSpreadSheet.prototype.getHeaderWidth = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].column.with);
	}
	return text;
};

ContainerSpreadSheet.prototype.getHeaderId = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].id);
	}
	return text;
};

ContainerSpreadSheet.prototype.getHeaderText = function() {
	var header = this.getHeader();
	var text = [];
	for (var i =0; i < header.length; i++){
		text.push(header[i].text);
	}
	return text;
};


ContainerSpreadSheet.prototype.getColumns = function() {
	var columns = [];
	for (var i = 0; i < this.getHeader().length; i++) {
		columns.push(this.getHeader()[i].column);
	}
	return columns;
};


ContainerSpreadSheet.prototype.getPuck = function() {
	var myPuck = JSON.parse(JSON.stringify(this.puck));
	var rows = this.parseTableData();
    
	//myPuck.sampleVOs = [];
    var aux = [];
    
    function filterByLocation(samples){
        return _.filter(samples, function(b){return b.location == rows[i].location;} );
    }
	for (var i = 0; i < rows.length; i++) {
        
        var sample = {};
        var sampleByLocation = filterByLocation(myPuck.sampleVOs);
        if (sampleByLocation.length > 0){
            /** new sample */
		    sample = sampleByLocation[0];
        } 
        
		sample["name"] = rows[i]["Sample Name"];
		sample["smiles"] = rows[i]["Smiles"];
		sample["location"]= rows[i]["location"];
		sample["comments"] = rows[i]["Comments"];
        var proteins = [];
		if (sample["crystalVO"] == null){
			sample["crystalVO"] = {};
			proteins = EXI.proposalManager.getProteinByAcronym(rows[i]["Protein Acronym"]);
			if (proteins != null){
				sample["crystalVO"]["proteinVO"] = proteins[0];
			}
		}
        else{
            proteins = EXI.proposalManager.getProteinByAcronym(rows[i]["Protein Acronym"]);
			if (proteins != null){
				sample["crystalVO"]["proteinVO"] = proteins[0];
			}
        }
		sample["crystalVO"]["spaceGroup"] = rows[i]["Space Group"];
		sample["crystalVO"]["cellA"] = Number(rows[i]["Unit cell A"]);
		sample["crystalVO"]["cellB"] = Number(rows[i]["Unit cell B"]);
		sample["crystalVO"]["cellC"] = Number(rows[i]["Unit cell C"]);
		sample["crystalVO"]["cellAlpha"] = Number(rows[i]["Unit cell Alpha"]);
		sample["crystalVO"]["cellBeta"] = Number(rows[i]["Unit cell Beta"]);
		sample["crystalVO"]["cellGamma"] = Number(rows[i]["Unit cell Gamma"]);
		
		sample["diffractionPlanVO"] = {};
		sample["diffractionPlanVO"]["radiationSensitivity"]= Number(rows[i]["Radiation Sensitivity"]);
		sample["diffractionPlanVO"]["requiredCompleteness"]= Number(rows[i]["Required Completeness"]);
		sample["diffractionPlanVO"]["requiredMultiplicity"]= Number(rows[i]["Required multiplicity"]);
		sample["diffractionPlanVO"]["requiredResolution"]= Number(rows[i]["Needed resolution"]);
		sample["diffractionPlanVO"]["observedResolution"]= Number(rows[i]["Pre-observed resolution"]);
		sample["diffractionPlanVO"]["preferredBeamDiameter"]= Number(rows[i]["Pref. Diameter"]);
		sample["diffractionPlanVO"]["numberOfPositions"]= Number(rows[i]["Number Of positions"]);
		sample["diffractionPlanVO"]["experimentKind"]= rows[i]["Experiment Type"];
		aux.push(sample);
		
	}
    myPuck.sampleVOs = aux;
    
	return myPuck;
};


ContainerSpreadSheet.prototype.parseTableData = function() {
	var parsed = [];
	var data = this.spreadSheet.getData();
	for (var j = 0; j < data.length; j++) {
		var row = {};
		row["location"] = j + 1;
			for (var k = 0; k < data[j].length; k++) {
				var key = this.getHeaderId()[k];
				var value = data[j][k];
				row[key] = value;
			}
			if (row["Protein Acronym"]){
				if (row["Protein Acronym"].length > 0){
					parsed.push(row);
				}
			}
	}
	
	/** Curated contains the whole-data rows * */
	var curated = [];
	for (var i = 0; i < parsed.length; i++) {
		if (parsed[i]["Protein Acronym"] != null){
			curated.push(parsed[i]);
		}
	}
	
	return curated;
};

ContainerSpreadSheet.prototype.load = function(puck){
	this.puck = puck;
	var container = document.getElementById(this.id + '_samples');
    
	  function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
	    Handsontable.renderers.TextRenderer.apply(this, arguments);
	    td.style.fontWeight = 'bold';
	    td.style.color = 'green';
	    td.style.fontSize = '9px';
	    td.style.background = '#CEC';
	  }
	  
	  function ValueRenderer(instance, td, row, col, prop, value, cellProperties) {
	    Handsontable.renderers.TextRenderer.apply(this, arguments);
	    if (!instance.getDataAtRow(row)[1]){
	    	td.style.background = '#EEE';
	    	return;
	    }
	    
	    if ((col == 2)){
		    	if (!value || value == '') {
		    		td.className = 'custom-row-text-required';
		  	    }
	    }
	  }
	  // maps function to lookup string
	  Handsontable.renderers.registerRenderer('ValueRenderer', ValueRenderer);
	  var _this = this;
	  this.spreadSheet = new Handsontable(container, {
		beforeChange: function (changes, source) {
		      lastChange = changes;
		      
		},
	    data: this.getSamplesData(puck),
	 
	    height : this.height,
	    width : this.width,
	    manualColumnResize: true,
	    colWidths: this.getHeaderWidth(),
	    colHeaders: this.getHeaderText(),
	    stretchH: 'last',
	    columns: this.getColumns()
	  });

	  
	 /*this.spreadSheet.updateSettings({
		  afterChange: function (changes, source) {              
				_this.onModified.notify(_this.getPuck());
			
		  }
		});*/
	
	
};

/**
* This is a grid for parcels
*
* @class ParcelGrid
* @constructor
*/
function ParcelGrid(args) {
	this.height = 100;
	this.btnEditVisible = true;
	this.btnRemoveVisible = true;

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.btnEditVisible != null) {
			this.btnEditVisible = args.btnEditVisible;
		}
		if (args.btnRemoveVisible != null) {
			this.btnRemoveVisible = args.btnRemoveVisible;
		}
	}

	/** Events **/
	this.onSuccess = new Event(this);
	this.onAdd = new Event(this);
	this.onRemove = new Event(this);
}

ParcelGrid.prototype._getTopButtons = function() {
	var _this = this;
	var actions = [];
	return [(Ext.create('Ext.Action', {
		icon : '../images/icon/add.png',
		text : 'Add New Parcel',
		disabled : false,
		handler : function(widget, event) {
			_this.edit();
		}
	}))];
};

ParcelGrid.prototype.load = function(shipment) {
	var _this = this;
	this.shipment = shipment;
	this.dewars = shipment.dewarVOs;

	this.parcelForms = [];

	this.panel.removeAll();

	this.dewars.sort(function(a, b) {
		return a.dewarId - b.dewarId;
	});

    function onSaved(sender, dewar) {
			_this.panel.setLoading();
			dewar["sessionId"] = dewar.firstExperimentId;
			dewar["shippingId"] = _this.shipment.shippingId;
			var adapter = new DataAdapter();
			var onSuccess = function(sender, shipment) {				
				_this.panel.setLoading(false);
			};			
			EXI.getDataAdapter({onSuccess : onSuccess}).proposal.dewar.saveDewar(_this.shipment.shippingId, dewar);
    }
   
	for ( var i in this.dewars) {
		var parcelForm = new ParcelPanel({
			height : 340
		});
		
		this.panel.insert(parcelForm.getPanel());
		parcelForm.load(this.dewars[i]);
		parcelForm.onSavedClick.attach(onSaved);
		this.parcelForms.push(parcelForm);
	}
};

ParcelGrid.prototype.edit = function(dewar) {
	var _this = this;
	var caseForm = new CaseForm();

	var window = Ext.create('Ext.window.Window', {
		title : 'Parcel',
		height : 450,
		width : 600,
		modal : true,
		layout : 'fit',
		items : [ caseForm.getPanel(dewar) ],
		listeners : {
			afterrender : function(component, eOpts) {
				if (_this.puck != null) {
					_this.render(_this.puck);
				}
			}
		},
		buttons : [ {
			text : 'Save',
			handler : function() {
				var adapter = new DataAdapter();
				_this.panel.setLoading();
				var dewar = caseForm.getDewar();
				var onSuccess = function(sender, shipment) {
					_this.load(shipment);
					_this.panel.setLoading(false);
					window.close();
				};
				dewar["sessionId"] = dewar.firstExperimentId;
				dewar["shippingId"] = _this.shipment.shippingId;
				EXI.getDataAdapter({
					onSuccess : onSuccess
				}).proposal.dewar.saveDewar(_this.shipment.shippingId, dewar);
			}
		}, {
			text : 'Cancel',
			handler : function() {
				window.close();
			}
		} ]
	});
	window.show();

};

ParcelGrid.prototype.getPanel = function() {
	var _this = this;

	this.panel = Ext.create('Ext.panel.Panel', {
		cls : 'border-grid',
		height : 800,
		autoScroll : true

	});

	this.panel.addDocked({
		height : 45,
		xtype : 'toolbar',
		items : _this._getTopButtons(),
		cls : 'exi-top-bar'
	});

	return this.panel;
};

/**
* This class containes name, description, samples spreadsheet and puck loyout for a given puck 
*
* @class PuckForm
* @constructor
**/
function PuckForm(args) {
	this.id = BUI.id();
	this.height = 500;
	this.width = 500;
	
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}

	
	var _this = this;
	
	//this.puckLayout = new PuckPanel({width : 150, tbar : false});
	this.containerSpreadSheet = new ContainerSpreadSheet({width : 1300});
	
	/*this.containerSpreadSheet.onModified.attach(function(sender, puck){
		
	});*/
	
	this.onSaved = new Event(this);
}

/** Loads a puck into the form **/
PuckForm.prototype.load = function(puck, shippingId) {
	var _this = this;
	this.puck = puck;
    
	if (puck != null){
		Ext.getCmp(this.id + "puck_name").setValue(this.puck.code);
		this.capacityCombo.setValue(this.puck.capacity);
        Ext.getCmp(this.id + "puck_beamline").setValue(this.puck.beamlineLocation);
        Ext.getCmp(this.id + "puck_sampleChangerLocation").setValue(this.puck.sampleChangerLocation);
        Ext.getCmp(this.id + "puck_status").setValue(this.puck.containerStatus);                
	}	
	this.containerSpreadSheet.load(puck);
};

/*
PuckForm.prototype.loadPlateLayout = function(puck) {
	 try{
		 this.puckLayout.load(puck);
		 this.puckLayout.render(puck);
	  }
	  catch(e){
		  console.log(e);
	  }
};*/

PuckForm.prototype.getToolBar = function() {
	var _this = this;
	return [
	        
			{
			    text: 'Remove',
			    width : 100,
			    height : 30,
			    cls : 'btn-red',
			    handler : function(){
			    	function showResult(result){
						if (result == "yes"){
							_this.removePuck();							
						}
			    	}
					  Ext.MessageBox.show({
				           title:'Remove',
				           msg: 'Removing a puck from this parcel will remove also its content. <br />Are you sure you want to continue?',
				           buttons: Ext.MessageBox.YESNO,
				           fn: showResult,
				           animateTarget: 'mb4',
				           icon: Ext.MessageBox.QUESTION
				       });
			    }
			},
	        "->",
	        {
	            text: 'Save',
	            width : 100,
	            height : 30,
	            handler : function(){
	            	_this.save();
	            }
	        }
	];
};

PuckForm.prototype.removePuck = function() {
	var _this = this;
	this.panel.setLoading();
	var onSuccess = function(sender, data){
		
	};
	var containerId = this.puck.containerId;
	EXI.getDataAdapter({onSuccess: onSuccess}).proposal.shipping.removeContainerById(containerId,containerId,containerId );
	
};

PuckForm.prototype.save = function() {
	var _this = this;
	this.panel.setLoading("Saving Puck");

	var puck = this.containerSpreadSheet.getPuck();
	/** Updating general parameters **/
	puck.code = Ext.getCmp(_this.id + 'puck_name').getValue();
	puck.capacity = _this.capacityCombo.getValue();
	
    var onError = function(sender, error){
		_this.panel.setLoading(false);
		EXI.setError(error.responseText);
	};
    
	var onSuccess = function(sender, puck){
		_this.panel.setLoading(false);
		_this.load(puck);
		_this.onSaved.notify();
	};
	EXI.getDataAdapter({onSuccess : onSuccess, onError : onError}).proposal.shipping.saveContainer(this.puck.containerId, this.puck.containerId, this.puck.containerId, puck);
};


/**
 * When container type has changed from SPINE|| UNIPUCK || PLATE
 * 
 * We make the spreadsheet longer and the platelayout is rendered again
 */
PuckForm.prototype.containerTypeChanged = function(capacity) {
	this.puck.capacity = capacity;
	var data = this.containerSpreadSheet.spreadSheet.getData();
	if (data.length < capacity){
		for (var i = data.length; i<= capacity; i++){
			data.push([i]);
		}
	}
	else{
		data = data.slice(0, capacity);
	}
	this.containerSpreadSheet.spreadSheet.loadData(data);

};

PuckForm.prototype.getPanel = function() {
	var _this =this;
	var capacityCombo = BIOSAXS_COMBOMANAGER.getComboPuckType({margin : '10 0 10 5', labelWidth : 100, width : 250});
	capacityCombo.on('select', function(capacityCombo, record){
		var capacity = record[0].data.value;
		_this.containerTypeChanged(capacity);
	});
	
	this.capacityCombo = capacityCombo;
	this.panel = Ext.create('Ext.panel.Panel', {
		buttons : this.getToolBar(),
		items : [ 
		         {
							xtype : 'container',
							margin : '5 0 2 5',
							layout : 'hbox',
							items : [
										
										
								         {
								        	 xtype : 'container',
											margin : '12 0 2 0',
											layout : 'vbox',
											items : [ 
							         				   {
																xtype: 'requiredtextfield',
																id : this.id + 'puck_name',
																fieldLabel : 'Name',
																name : 'name',
																width : 250,
																margin : '0 0 0 5',
																labelWidth : 100
														},
														this.capacityCombo,
                                                        {
																xtype: 'textfield',
																id : this.id + 'puck_beamline',
																fieldLabel : 'Beamline',
																width : 250,
                                                                disabled : true,
																margin : '0 0 0 5',
																labelWidth : 100
														},
                                                        {
																xtype: 'textfield',
																id : this.id + 'puck_sampleChangerLocation',
																fieldLabel : '#Sample Changer',
																width : 250,
                                                                disabled : true,
																margin : '0 0 0 5',
																labelWidth : 100
														},                                                       
                                                        {
																xtype: 'textfield',
																id : this.id + 'puck_status',
																fieldLabel : 'Status',
																width : 250,
                                                                disabled : true,
																margin : '0 0 0 5',
																labelWidth : 100
														}
													]
								         },
                                         // this.puckLayout.getPanel()
							         ]
		         },
		         this.containerSpreadSheet.getPanel(),
                
	         ] 
		} 
	);
	return this.panel;
};


/**
 * Same form as MX part
 * 
 * @creationMode if true a create button appears instead of save
 * @showTitle true or false
 */
function ShipmentForm(args) {
	this.id = BUI.id();

	if (args != null) {
		if (args.creationMode != null) {
			this.creationMode = args.creationMode;
		}
	}
	
	this.onSaved = new Event(this);
}

ShipmentForm.prototype.fillStores = function() {
	this.panel.setLoading("Loading Labcontacts from database");
	var labContacts = EXI.proposalManager.getLabcontacts();

	this.labContactForSendingStore.loadData(labContacts, false);

	labContacts.sort(function(a, b){
	    if(a.cardName < b.cardName) {return -1;}
	    if(a.cardName > b.cardName) {return 1;}
	    return 0;
	});
	
	$.extend(labContacts, [{ cardName : 'Same as for shipping to beamline', labContactId : -1}, { cardName : 'No return requested', labContactId : 0}]);
	this.labContactForReturnStore.loadData(labContacts, false);

	this.labContactsReturnCombo.setValue(-1);

	this.panel.setLoading(false);
	if (this.shipment != null) {
		this.setShipment(this.shipment);
	}
};

ShipmentForm.prototype.draw = function(targetId) {
	this.getPanel().render(targetId);
};

ShipmentForm.prototype.load = function(shipment) {
	this.shipment = shipment;
	var _this = this;
	Ext.getCmp(_this.id + "shippingName").setValue(shipment.shippingName);
	Ext.getCmp(_this.id + "comments").setValue(shipment.comments);
	if (shipment.sendingLabContactVO != null) {
		this.labContactsSendingCombo.setValue(shipment.sendingLabContactVO.labContactId);
	}

	
	if (shipment.returnLabContactVO == null) {
		this.labContactsReturnCombo.setValue(0);
	}
	else{
		if (shipment.returnLabContactVO.labContactId == shipment.sendingLabContactVO.labContactId){
			this.labContactsReturnCombo.setValue(-1);
		}
		else{
			this.labContactsReturnCombo.setValue(shipment.returnLabContactVO.labContactId);
		}
	}
	
	if (shipment.sessions != null){
		if (shipment.sessions.length > 0){
			var session = shipment.sessions[0];
			this.sessionComboBox.setValue(session.sessionId);
		}
	}

};

ShipmentForm.prototype._saveShipment = function() {
	var _this = this;
	var shippingId = null;
	
	if (this.shipment != null) {
		shippingId = this.shipment.shippingId;
	}
	
	var sendingAddressId = this.labContactsSendingCombo.getValue();
	var returnAddressId = this.labContactsReturnCombo.getValue();
	
	if (sendingAddressId == null) {
		BUI.showError("User contact information for shipping to beamline is mandatory");
		return;
	}

		
	/** No return requested **/
	if (this.labContactsReturnCombo.getValue() == 0){
		returnAddressId = 0;
	}
	
	/** Same sender **/
	if (this.labContactsReturnCombo.getValue() == -1){
		returnAddressId = -1;
	}

	var sendingAddress = (EXI.proposalManager.getLabcontactById(sendingAddressId));
	var json = {
		shippingId : shippingId,
		name : Ext.getCmp(_this.id + "shippingName").getValue(),
		status : "Not set",
		sendingLabContactId : sendingAddressId,
		returnLabContactId : returnAddressId, 
		returnCourier : returnAddressId,
		courierAccount : sendingAddress.courierAccount,
		billingReference : sendingAddress.billingReference,
		dewarAvgCustomsValue : sendingAddress.dewarAvgCustomsValue,
		dewarAvgTransportValue :sendingAddress.dewarAvgTransportValue,
		comments : Ext.getCmp(_this.id + "comments").getValue(),
		sessionId : this.sessionComboBox.getValue()
	};

	var onSuccess = function(sender, shipment) {
		location.hash = "#/shipping/" + shipment.shippingId + "/main";
		_this.panel.setLoading(false);
		_this.onSaved.notify(shipment);
	};


	/** Cheking params **/
	if (json.name == "") {
		BUI.showError("Name field is mandatory");
		return;
	}

	if (json.sendingLabContactId == null) {
		BUI.showError("Lab contact for sending field is mandatory");
		return;
	}

	
	this.panel.setLoading();
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.saveShipment(json);
	
	
};

ShipmentForm.prototype.getPanel = function() {
	var _this = this;
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	var buttons = [];

	if (_this.creationMode) {
		buttons.push({
			text : 'Create',
			scope : this,
			handler : function() {
				_this._saveShipment();
			}
		});
	} else {
		buttons.push({
			text : 'Save',
			scope : this,
			handler : function() {
				_this._saveShipment();
			}
		});

	}

	this.labContactForSendingStore = Ext.create('Ext.data.Store', {
		fields : [ 'cardName', 'labContactId' ],
		sorters : 'cardName'
	});

	this.labContactForReturnStore = Ext.create('Ext.data.Store', {
		fields : [ 'cardName', 'labContactId' ]
		
	});

	this.labContactsSendingCombo = Ext.create('Ext.form.ComboBox', {
		id : _this.id + "shipmentform_sendingLabContactId",
		fieldLabel : 'Shipping Card to ESRF',
		afterLabelTextTpl : required,
		store : this.labContactForSendingStore,
		queryMode : 'local',
		labelWidth : 200,
		width : 600,
		margin : '10 0 0 10',
		displayField : 'cardName',
		valueField : 'labContactId'
	});

	this.labContactsReturnCombo = Ext.create('Ext.form.ComboBox', {
		id : _this.id + "returnLabContactId",
		fieldLabel : 'Shipping Card to HOME',
		afterLabelTextTpl : required,
		store : this.labContactForReturnStore,
		queryMode : 'local',
		margin : '10 0 0 10',
		labelWidth : 200,
		width : 600,
		displayField : 'cardName',
		valueField : 'labContactId'
	});

	
    this.sessionComboBox =  BIOSAXS_COMBOMANAGER.getComboSessions(EXI.proposalManager.getSessions(), {margin: '10 0 0 10', width: 400, labelWidth: 200});

	if (this.panel == null) {
		this.panel = Ext.create('Ext.form.Panel', {
			bodyPadding : 5,
			cls : 'border-grid',
			buttons : buttons,
			items : [ 
						{
		      					xtype : 'requiredtextfield',
		      					fieldLabel : 'Name',
		      					allowBlank : false,
		      					labelWidth : 200,
		      					width : 400,
		      					margin : "10 20 0 10",
		      					name : 'shippingName',
		      					id : _this.id + 'shippingName',
		      					value : '',
				        },
		        		this.sessionComboBox,
					    {
		    					xtype : 'textareafield',
		    					name : 'comments',
		    					id : _this.id + 'comments',
		    					fieldLabel : 'Comments',
		    					value : '',
		    					labelWidth : 200,
		    					margin : "10 20 0 10",
		    					width : 500,
						},
    	          		this.labContactsSendingCombo,
        	          	this.labContactsReturnCombo
		]
		});
	}
	this.fillStores();
	return this.panel;
};



/**
* This main class deals with the creation and edition of shipments
*
* @class ShippingMainView
* @constructor
*/
function ShippingMainView() {
	MainView.call(this);
	var _this = this;
	
	/**
	* 
	* @property shipmentForm
	*/
	this.shipmentForm = new ShipmentForm();
	this.shipmentForm.onSaved.attach(function(sender, shipment){
		location.hash = "#/proposal/shipping/nav?nomain";
	});
	
	/**
	* 
	* @property parcelGrid
	*/
	this.parcelGrid = new ParcelGrid({
		height : 300
	});
}

ShippingMainView.prototype.getPanel = MainView.prototype.getPanel;
ShippingMainView.prototype.getContainer = MainView.prototype.getContainer;

ShippingMainView.prototype.getContainer = function() {
	this.tabPanel =  Ext.createWidget('tabpanel',
			{
				margin : 10,
				defaults : {
						anchor : '100%'
				},
				items : [
				     		{
							tabConfig : {
								title : 'Delivery Details'
							},
							items : [ 
							         	this.shipmentForm.getPanel()
							]
						},
						{
							tabConfig : {
								id : this.id + "grid",
								title : 'Parcels',
								icon : '../images/icon/shipping.png'
							},
							items : [ 
							         	this.parcelGrid.getPanel()
							]
						}
					]
			});

	return this.tabPanel;

};


ShippingMainView.prototype.load = function(shippingId) {
	var _this = this;
	this.shippingId = shippingId;
	
	if (shippingId == null){
		Ext.getCmp(this.id + "grid").disable(true);
	}
	this.panel.setTitle("Shipment");
	if (shippingId != null){
		this.panel.setLoading();
		var onSuccess = function(sender, shipment){
			_this.shipmentForm.load(shipment);
			_this.parcelGrid.load(shipment);
			_this.panel.setLoading(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.getShipment(shippingId);
	}
};

function WelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';
	MainView.call(this);
	this.title = "Welcome";
	this.closable = true;		
}

WelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;


WelcomeMainView.prototype.getContainer = function() {
	return {
		  layout: {
		        type: 'fit'
		    },
		items : [
		         	{
		         		html : "<iframe style='width:900px;height:900px;' frameBorder='0' src='../html/welcome.html'></iframe>",
		         		margin : '50 0 0 50'
		         	}
		]
	};
};


WelcomeMainView.prototype.load = function() {
	
};

function AuthenticationForm(){
	this.onAuthenticate = new Event(this);
}
AuthenticationForm.prototype.show = function(){
	this.window = Ext.create('Ext.window.Window', {
	    title: 'Authentication <span style="FONT-SIZE:9PX;color:red;">[INTRANET ONLY]</span>',
	    height: 250,
//	    closable :  EXI.localExtorage.tokenManager.getTokens().length > 0,
	    width: 400,
	    modal : true,
	    layout: 'fit',
	    items: [
	            this.getPanel()
        ]}
	);
	this.window.show();
};

AuthenticationForm.prototype.getPanel = function(){
	var _this = this;
	var sites = Ext.create('Ext.data.Store', {
	    fields: ['name', 'url', 'exiUrl'],
	    data : ExtISPyB.sites
	});
	
	return Ext.create('Ext.form.Panel', {
	    bodyPadding: 5,
	    width: 350,
	    layout: 'anchor',
	    defaults: {
	        anchor: '90%'
	    },
	    // The fields
	    defaultType: 'textfield',
	    items: [{
	        fieldLabel: 'User',
	        name: 'user',
	        margin : '10 0 0 10',
	        allowBlank: false
	    },{
	        fieldLabel: 'Password',
	        margin : '10 0 0 10',
	        name: 'password',
	        allowBlank: false,
	        inputType : 'password'
	    },{
	    	xtype : 'combo',
	        fieldLabel: 'Choose site',
	        name: 'site',
	        store : sites,
	        allowBlank: false,
	        valueField : 'url',
	        displayField : 'name',
	        margin : '10 0 0 10'
	    }],

	    buttons: [ {
	        text: 'Login',
	        formBind: true,
	        disabled: true,
	        handler: function() {
	        	var form = this.up('form').getForm();
	        	
	        	var exiUrl;
	        	var properties = null;
	        	for (var i =0; i< ExtISPyB.sites.length; i++){
	        		if (ExtISPyB.sites[i].url == form.getFieldValues().site){
	        			properties = ExtISPyB.sites[i];
	        		}
	        		
	        	}
	        	_this.onAuthenticate.notify({
	        		user : form.getFieldValues().user, 
	        		password : form.getFieldValues().password, 
	        		site : form.getFieldValues().site,
	        		exiUrl : properties.exiUrl,
	        		properties : properties
	        	});

	        }
	    }]
	});
};





function ProposalGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	this.margin = '0 0 0 0';
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.searchBar != null) {
			this.searchBar = args.searchBar;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.collapsed != null) {
			this.collapsed = args.collapsed;
		}

		if (args.width != null) {
			this.width = args.width;
		}
		
		if (args.margin != null) {
			this.margin = args.margin;
		}
	}
	this.onSelected = new Event(this);
}


ProposalGrid.prototype.load = function(proposals) {
	this.data = proposals;
	this.store.loadData(proposals, false);
};

ProposalGrid.prototype.getFilter = function(value){
	return [{property : "Proposal_proposalNumber", value : value, anyMacth : true}];
};

ProposalGrid.prototype.filter = function(value) {
	
};

ProposalGrid.prototype._getTbar = function() {
	var _this = this;
	var actions = [];
	actions.push({
		xtype : 'textfield',
		name : 'field1',
		emptyText : 'search by number',
		hidden : this.isHidden,
		  listeners : {
  			'change' : function(field, e) {
  						var value = field.getValue();
  						if (value != ""){
  							_this.store.filter(_this.getFilter(field.getValue()));
  						}
  						else{
  							_this.store.clearFilter(true);
  							_this.load(_this.data);
  						}
  					} 
          		} 
	    }
	);
	return actions;
};

ProposalGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		fields : [ 'Proposal_proposalId', 'Proposal_title', 'Proposal_proposalCode', 'Proposal_proposalNumber', 'Proposal_proposalType' ]
	});

	this.store.sort(['Proposal_proposalCode', 'Proposal_proposalNumber']);

	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Proposals',
		store : this.store,
		tbar : this._getTbar(),
		layout : 'fit',
		cls : 'border-grid',
		height : this.height,
		margin : this.margin,
		emptyText : "No proposals",
		columns : [ 
		{
			text : 'Proposal',
			dataIndex : 'Proposal_code',
			width : 125,
			renderer : function(grid, a, record){
				return "<a href='#'>" + record.data.Proposal_proposalCode + record.data.Proposal_proposalNumber + "</a>"; 
			}
		}, 
		{
			text : 'Code',
			dataIndex : 'Proposal_number',
			width : 75,
			hidden : true
		}, 
		{
			text : 'Number',
			dataIndex : 'number',
			width : 75,
			hidden : true
		}, 
		{
			text : 'Title',
			dataIndex : 'Proposal_title',
			flex : 1
		}
		],
		flex : 1,
		viewConfig : {
			stripeRows : true,
			listeners : {
				'cellclick' : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					_this.onSelected.notify(record.data);
				}
			}
		}
	});

	/** Adding the tbar **/
	if (this.tbar) {
		this.panel.addDocked({
			xtype : 'toolbar',
			cls : 'toolBarGrid',
			height : 48,
			items : this._getTbar()
		});
	}
	return this.panel;
};





function SessionGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	this.width = null;

	this.title = null;
	this.margin = 10;


	this.hiddenGoColumn = true;
    this.isHiddenTitle = true;
    this.isHiddenNumberOfShifts = true;
    
    this.isHiddenPI = true;
    this.isHiddenLocalContact = true;
    
    this.layout = 'fit';
    
	if (args != null) {
         if (args.isHiddenLocalContact != null) {
			this.isHiddenLocalContact = args.isHiddenLocalContact;
		}
        
        if (args.isHiddenTitle != null) {
			this.isHiddenTitle = args.isHiddenTitle;
		}
        if (args.isHiddenNumberOfShifts != null) {
			this.isHiddenNumberOfShifts = args.isHiddenNumberOfShifts;
		}
        if (args.width != null) {
			this.width = args.width;
		}
        if (args.isHiddenTitle != null) {
			this.isHiddenTitle = args.isHiddenTitle;
		}
        if (args.isHiddenPI != null) {
			this.isHiddenPI = args.isHiddenPI;
		}
        
		if (args.title != null) {
			this.title = args.title;
		}
		if (args.margin != null) {
			this.margin = args.margin;
		}

		if (args.height != null) {
			this.height = args.height;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.width != null) {
			this.width = args.width;
            this.layout = null;
		}
		if (args.hiddenGoColumn != null) {
			this.hiddenGoColumn = args.hiddenGoColumn;
		}
	}

	this.onSelected = new Event(this);

}


SessionGrid.prototype.load = function(sessions) {
	this.store.loadData(sessions, false);
};

SessionGrid.prototype.getPanel = function() {
	var _this = this;
   
    this.store = Ext.create('Ext.data.Store', {
		fields : ['beamLineOperator', 'Proposal_title', 'Person_emailAddress', 'Person_familyName', 'Person_givenName', 'nbShifts', 'comments'],
		emptyText : "No sessions",
		data : []
	});
    




	this.store = Ext.create('Ext.data.Store', {
		fields : ['beamLineOperator', 'Proposal_title', 'Person_emailAddress', 'Person_familyName', 'Person_givenName', 'nbShifts', 'comments'],
		emptyText : "No sessions",
		data : []
	});

	this.panel = Ext.create('Ext.grid.Panel', {
		title : this.title,
		store : this.store,		
		icon : '../images/icon/sessions.png',
		cls : 'border-grid',
		minHeight: 300,
        width : this.width,
        height : this.height,
		margin : this.margin,
		layout : this.layout,
		columns : [
              {
                    text              : '',
                    dataIndex         : 'BLSession_startDate',
                    flex             : 1,
                    hidden              : true,
                    renderer          : function(grid, a, record){                                    
                                               var html = "";
                                               if (record.data.BLSession_startDate){
                                                    record.data.start =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY');
                                                    record.data.day =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('Do');
                                                    record.data.month =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('MMMM');
                                                    record.data.year =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('YYYY');
                                               }
                                               dust.render("session.grid", record.data, function(err, out){
                                                    html = html + out;
                                               });
                                               return html;
                    }
              },
              {
                            text              : 'Start',
                            dataIndex         : 'BLSession_startDate',
                            flex              : 2,
                            hidden            : false,
                            renderer          : function(grid, a, record){                                 
                                                     
                                                    var location = "#";
                                                    if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "SAXS"){
                                                        location = "#/session/nav/" + record.data.sessionId + "/session";
                                                    }
                                                    else{
                                                        location = "#/mx/datacollection/session/" + record.data.sessionId + "/main";
                                                    }
                                                    if (record.data.BLSession_startDate){                 
                                                         return "<a href='" +  location +"'>" + moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY') + "</a>"; 
                                                    }
                            }
		     },
             {
                    text : 'Beamline',
                    dataIndex : 'Proposal_code',
                    width : 125,
                    hidden : false,
                    renderer : function(grid, a, record){
                            var location = "#";
                            if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "SAXS"){
                                location = "#/session/nav/" + record.data.sessionId + "/session";
                            }
                            else{
                                location = "#/mx/datacollection/session/" + record.data.sessionId + "/main";
                            }
                        return "<a href='" +  location +"'>" + record.data.beamLineName + "</a>"; 
                    }
		    }, 
            {
                text : 'Proposal',
                dataIndex : 'beamlineName',
                flex : 1,
                hidden : false,
                renderer : function(grid, a, record){
                    var proposal = record.data.Proposal_proposalCode + record.data.Proposal_ProposalNumber;
                    return "<a href='#/session/nav' data-toggle='tooltip' title='Open proposal " + proposal +"'>" + proposal + "</a>"; 
                }
          },       
          {
			    text                : 'Shifts',
			    dataIndex           : 'nbShifts',
                hidden              : this.isHiddenNumberOfShifts,
                flex                : 1
		    },
           {
			    text                : 'Local Contact',
			    dataIndex           : 'beamLineOperator',
			    width               : 200,
                hidden              : this.isHiddenLocalContact,
                flex                : 1
		    },
            {
			    text                : 'Title',
			    dataIndex           : 'Proposal_title',
			    width               : 200,
                hidden              : this.isHiddenTitle,
                flex               : 4
		    },
            {
			    text                : 'PI',
			    dataIndex           : 'Proposal_title',
			    width               : 200,
              
                 hidden              : this.isHiddenPI,
                renderer : function(grid, a, record){                        
                        return record.data.Person_familyName + ", " + record.data.Person_givenName;
                    }
		    },
             {
			    text                : 'e-mail',
			    dataIndex           : 'Person_emailAddress',
			    width               : 200,
                hidden              : true,
                flex               : 1
		    },
           {
                text                : 'Data Collections',
			    dataIndex           : 'Person_emailAddress',
                 width               : 200,
                renderer : function(grid, a, record){ 
                    function getBadge(title, count) {
                        if (count){
                            if (count != 0){
                                return '<tr><td style="width:50px;">' + title + '</td><td> <span style="margin-left:10px;margin-top:2px;background-color:#207a7a;" class="badge">' + count +'</span></td></tr>';
                            }
                        }
                        return "";
                    }
                    function getTable(record){
                        var html = "<table>";
                        html =   html = html + getBadge("Energy", record.data.energyScanCount);
                        html = html + getBadge("XRF", record.data.xrfSpectrumCount);
                        html = html + getBadge("Samples", record.data.sampleCount);
                        html = html + getBadge("Test", record.data.testDataCollectionGroupCount);
                        html = html + getBadge("Collects", record.data.dataCollectionGroupCount);
                        return html + "</table>";  
                    }                                                          
                    return getTable(record);
                 }
               
           },
     
            {
                text              : 'End',
                dataIndex         : 'BLSession_endDate',
                hidden              : true,
                flex             : 1,                
                renderer          : function(grid, a, record){                    
                                        return record.data.BLSession_endDate;
                }
		   },
           {
			    text                : 'Comments',
			    dataIndex           : 'comments',
                hidden              : false,
                flex                : 3,
                renderer            : function(grid, a, record){    
                                        if (record.data.comments){                
                                            return "<div style='width:50px; wordWrap: break-word;'>" + record.data.comments + "</div>";
                                        }
                }
                


		    },
           ], 
      	   viewConfig : {
                stripeRows : true,
                getRowClass : function(record, rowIndex, rowParams, store){
                    /*
                    if (record.data.beamLineName != null){
                        
                        if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "SAXS"){
                            return ((rowIndex % 2) == 0) ? "saxs-grid-row-light" : "saxs-grid-row-dark";
                        }
                        if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "MX"){
                            return ((rowIndex % 2) == 0) ? "mx-grid-row-light" : "mx-grid-row-dark";
                        }
                    }
                    return "mx-grid-row-dark";*/
                }
	    	},
            listeners : {
				'cellclick' : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {                    
					_this.onSelected.notify({
                       proposalCode   : record.data.Proposal_proposalCode,
                       proposalNumber : record.data.Proposal_ProposalNumber
                        
                    });
				}			
			}				
	});	
	return this.panel;
};





function SAXSExiController() {
	this.init();
}

SAXSExiController.prototype.loadNavigationPanel = ExiController.prototype.loadNavigationPanel;

SAXSExiController.prototype.routeNavigation = function() {
	var _this = this;
	function loadNavigationPanel(listView) {
		return _this.loadNavigationPanel(listView);
	}

	/**
	 * Loading navigation panel
	 * 
	 * #/session/nav #/experiment/nav #/macromolecule/nav
	 * 
	 */
	Path.map("#/saxs/:navigation/nav").to(function() {
		var listView = null;
		
		if (this.params['navigation'] == "buffer") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new BufferListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/buffer/" + selected[0].bufferId + "/main";
			});
			EXI.addNavigationPanel(listView);
			listView.load(EXI.proposalManager.getBuffers());
			EXI.setLoadingNavigationPanel(false);
			
			/** Loading welcome page **/
			EXI.addMainPanel(new BufferWelcomeMainView());
			
		}
		
		if (this.params['navigation'] == "stocksolution") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new StockSolutionListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/stocksolution/" + selected[0].stockSolutionId + "/main";
			});
			EXI.addNavigationPanel(listView);
			listView.load(EXI.proposalManager.getStockSolutions());
			EXI.setLoadingNavigationPanel(false);
			
			/** Loading welcome page **/
			EXI.addMainPanel(new StockSolutionWelcomeMainView());
			
		}
		
		if (this.params['navigation'] == "macromolecule") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new MacromoleculeListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/macromolecule/" + selected[0].macromoleculeId + "/main";
			});
			EXI.addNavigationPanel(listView);
			listView.load(EXI.proposalManager.getMacromolecules());
			EXI.setLoadingNavigationPanel(false);
			
			/** Loading welcome page **/
			EXI.addMainPanel(new MacromoleculeWelcomeMainView());
			
		}
		
		if (this.params['navigation'] == "template") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			
			listView = new TemplateListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/experiment/templateId/" + selected[0].experimentId + "/main";
			});
			var adapter = loadNavigationPanel(listView);
			adapter.saxs.experiment.getByExperimentByKey("experimentType", "TEMPLATE");
			
			/** Loading welcome page **/
			EXI.addMainPanel(new ExperimentWelcomeMainView());
		}


	}).enter(this.setPageBackground);

	
};

SAXSExiController.prototype.setPageBackground = function() {

};

SAXSExiController.prototype.notFound = function() {

};

SAXSExiController.prototype.routeExperiment = function() {
	Path.map("#/experiment/experimentId/:experimentId/main").to(function() {
		var mainView = new ExperimentMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['experimentId']);
		/** Selecting data collections from experiment * */
		mainView.onSelect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.append(element);
		});
		mainView.onDeselect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.remove(element);
		});

	}).enter(this.setPageBackground);
	
	Path.map("#/experiment/hplc/:experimentId/main").to(function() {
		var mainView = new HPLCMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['experimentId']);
		/** Selecting data collections from experiment * */
		mainView.onSelect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.append(element);
		});
		mainView.onDeselect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.remove(element);
		});

	}).enter(this.setPageBackground);
	

	/** Loading Experiments * */
	Path.map("#/experiment/:key/:value/main").to(function() {
		EXI.setLoadingMainPanel();
		var onSuccess = function(sender, data) {
			EXI.setLoadingMainPanel(false);
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
						mainView = new TemplateMainView();
					}

					EXI.addMainPanel(mainView);
					mainView.load(data);
					/** Selecting data collections from experiment * */
					mainView.onSelect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.append(element);
					});
					mainView.onDeselect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.remove(element);
					});

				}
			}
		};
		if ((this.params['key'] == "experimentId") || (this.params['key'] == "templateId")) {
			EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getByExperimentId([ this.params['value'] ]);
		} else {
			EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getByExperimentByKey(this.params['key'], this.params['value']);
		}

	}).enter(this.setPageBackground);
};





SAXSExiController.prototype.routeDataCollection = function() {
	Path.map("#/datacollection/macromoleculeAcronym/:value/main").to(function() {
		/** Loading navidation menu **/
		EXI.setLoadingMainPanel("Searching " + this.params['value']+  "...");
		var onSuccess = function(sender, dataCollections) {
			if (dataCollections != null){
				if (dataCollections.length > 0){
					var mainView = new DataCollectionMainView();
					EXI.addMainPanel(mainView);
					mainView.load(dataCollections);
					/** Selecting data collections from experiment * */
					mainView.onSelect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.append(element);
					});
					mainView.onDeselect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.remove(element);
					});
					
					var listView = new DataCollectionListView();
					listView.onSelect.attach(function(sender, selected) {
						mainView.filter( selected[0].macromoleculeId, selected[0].bufferAcronym);
					});
					EXI.addNavigationPanel(listView);
					listView.load(dataCollections);
					EXI.setLoadingNavigationPanel(false);
				}
				else{
					BUI.showWarning("No macromolecule has been found");
				}
			}
			else{
				BUI.showWarning("No data to display");
			}
//			EXI.setLoadingNavigationPanel(false);
			EXI.setLoadingMainPanel(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);

	}).enter(this.setPageBackground);
	
	
	Path.map("#/saxs/datacollection/:key/:value/main").to(function() {
		EXI.setLoadingMainPanel();
		var onSuccess = function(sender, data) {
			var mainView = new DataCollectionMainView();
			EXI.addMainPanel(mainView);
			mainView.load(data);
			EXI.setLoadingMainPanel(false);
			/** Selecting data collections from experiment * */
			mainView.onSelect.attach(function(sender, element) {
				EXI.localExtorage.selectedSubtractionsManager.append(element);
			});
			mainView.onDeselect.attach(function(sender, element) {
				EXI.localExtorage.selectedSubtractionsManager.remove(element);
			});
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);
	}).enter(this.setPageBackground);

	Path.map("#/saxs/datacollection/:key/:value/primaryviewer").to(function() {
		var onSuccess = function(sender, data) {
			var primaryMainView = new PrimaryDataMainView();
			EXI.addMainPanel(primaryMainView);
			primaryMainView.load(data);

		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);
	}).enter(this.setPageBackground);
	
	Path.map("#/saxs/datacollection/:key/:value/merge").to(function() {
		var onSuccess = function(sender, data) {
			var primaryMainView = new MergeMainView();
			EXI.addMainPanel(primaryMainView);
			primaryMainView.load(data);

		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);
	}).enter(this.setPageBackground);
};



SAXSExiController.prototype.routePrepare = function() {
	Path.map("#/buffer/:bufferId/main").to(function() {
		var mainView = new BufferMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['bufferId']);
	}).enter(this.setPageBackground);
	
	Path.map("#/buffer/add").to(function() {
		var mainView = new BufferMainView();
		EXI.addMainPanel(mainView);
	}).enter(this.setPageBackground);
	
	Path.map("#/macromolecule/:macromoleculeId/main").to(function() {
		var mainView = new MacromoleculeMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['macromoleculeId']);
	}).enter(this.setPageBackground);
	
	Path.map("#/macromolecule/add").to(function() {
		var mainView = new MacromoleculeMainView();
		EXI.addMainPanel(mainView);
	}).enter(this.setPageBackground);
	
	Path.map("#/stocksolution/:stocksolutionId/main").to(function() {
		var mainView = new StockSolutionMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['stocksolutionId']);
	}).enter(this.setPageBackground);
	
	Path.map("#/stocksolution/add").to(function() {
		var mainView = new StockSolutionMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	
	Path.map("#/prepare/stocksolution/main").to(function() {
		var mainView = new StockSolutionMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	

//	Path.map("#/prepare/macromolecule/main").to(function() {
//		var mainView = new MacromoleculeMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(this.setPageBackground);

	Path.map("#/prepare/templates/main").to(function() {
		var mainView = new ExperimentDesignerMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	Path.map("#/prepare/shipmentpreparation").to(function() {
		var mainView = new ShipmentPreparationMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	
	
//	Path.map("#/prepare/shipment").to(function() {
//		var _this = this;
//		var shipmentForm = new ShipmentForm({
//			creationMode : true,
//			showTitle : false
//		});
//		shipmentForm.onSaved.attach(function(sender, shipment) {
//			location.hash = "/shipping/" + shipment.shippingId + "/main";
//			window.close();
//		});
//		var window = Ext.create('Ext.window.Window', {
//			title : 'New Shipment',
//			height : 600,
//			width : 800,
//			modal : true,
//			layout : 'fit',
//			items : [ shipmentForm.getPanel() ]
//		}).show();
//	}).enter(this.setPageBackground);
	

	Path.map("#/prepare/designer").to(function() {
			var mainView = new DesignerMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
//			function() {
//				var wizardWidget = new WizardWidget({
//					windowMode : true,
//					width : 1200 });
//
//				wizardWidget.onFinished.attach(function(sender, result) {
//					wizardWidget.window.close();
//					EXI.setLoading();
//					var onSuccess = (function(sender, experiment) {
//						location.hash = "/experiment/templateId/" + experiment.experimentId + "/main";
//					});
//					wizardWidget.current.setLoading("ISPyB: Creating experiment");
//					EXI.getDataAdapter({onSuccess : onSuccess}).saxs.template.saveTemplate(result.name, result.comments, result.data);
//				});
//
//				wizardWidget.draw(this.targetId, new MeasurementCreatorStepWizardForm(EXI.proposalManager.getMacromolecules(),EXI.proposalManager.getBuffers()));

			}).enter(this.setPageBackground);
};

SAXSExiController.prototype.init = function() {
	var _this = this;

	function setPageBackground() {
		_this.setPageBackground();
	}
	function notFound() {
		_this.notFound();
	}

	this.routeNavigation();
	this.routeExperiment();
	this.routeDataCollection();
	this.routePrepare();

	

	Path.map("#/project/:projectId/run/:runId/main").to(function() {
		var projectId = this.params['projectId'];
		var runId = this.params['runId'];

		var onSuccess = function(sender, runs) {
			for (var i = 0; i < runs.length; i++) {
				if (runs[i].internalId == runId) {
					var main = new RunMainView();
					EXI.addMainPanel(main);
					main.load(runs[i]);
				}
			}
		};
		
		var onError = function(sender, runs) {
			
		};
		
		EXI.getDataAdapter({onSuccess : onSuccess, onError :onError}).exi.offline.getRuns(projectId);
//		exidataAdapter.getRuns(projectId);
	}).enter(this.setPageBackground);
	

	Path.rescue(notFound);

};

function ExiSAXS() {
	 Exi.call(this, {
		 					menu: new SAXSMainMenu(),
		 					anonymousMenu: new MainMenu(),
		 					controllers : [new SAXSExiController(),  new OfflineExiController(), new ProposalExiController(), new LabContactExiController()]
	 });
}

ExiSAXS.prototype.loadSelected = Exi.prototype.loadSelected;
ExiSAXS.prototype.addMainPanel = Exi.prototype.addMainPanel;
ExiSAXS.prototype.getSelectedDataCollections = Exi.prototype.getSelectedDataCollections;
ExiSAXS.prototype.addNavigationPanel = Exi.prototype.addNavigationPanel;
ExiSAXS.prototype.clearNavigationPanel = Exi.prototype.clearNavigationPanel;
ExiSAXS.prototype.clearMainPanel = Exi.prototype.clearMainPanel;
ExiSAXS.prototype.setLoadingNavigationPanel = Exi.prototype.setLoadingNavigationPanel;
ExiSAXS.prototype.setError = Exi.prototype.setError;
ExiSAXS.prototype.setLoading = Exi.prototype.setLoading;
ExiSAXS.prototype.setLoadingMainPanel = Exi.prototype.setLoadingMainPanel;
ExiSAXS.prototype.show = Exi.prototype.show;
ExiSAXS.prototype.setAnonymousMenu = Exi.prototype.setAnonymousMenu;
ExiSAXS.prototype.setUserMenu = Exi.prototype.setUserMenu;
ExiSAXS.prototype.appendDataAdapterParameters = Exi.prototype.appendDataAdapterParameters;
ExiSAXS.prototype.hideNavigationPanel = Exi.prototype.hideNavigationPanel;
ExiSAXS.prototype.showNavigationPanel = Exi.prototype.showNavigationPanel;

ExiSAXS.prototype.getHeader = function(){
	return '<img class="titleImage" src="../images/logo_EMBL.png"><span class="title">ExiSAXS</span><span class="subtitle">Extended ISPyB for SAXS<sub style="font-size:10px;color:orange">BETA</sub></span>';
};

ExiSAXS.prototype.getDataAdapter = function(args){
	return new SaxsDataAdapterFactory(this.appendDataAdapterParameters(args));
};


function SAXSMainMenu() {
	this.id = BUI.id();
	MainMenu.call(this, {isHidden : false, cssClass : 'mainMenu'});
}

SAXSMainMenu.prototype.populateCredentialsMenu = MainMenu.prototype.populateCredentialsMenu;
SAXSMainMenu.prototype.init = MainMenu.prototype.init;
SAXSMainMenu.prototype.getPanel = MainMenu.prototype.getPanel;
SAXSMainMenu.prototype._convertToHTMLWhiteSpan = MainMenu.prototype._convertToHTMLWhiteSpan;
SAXSMainMenu.prototype.getAddCredentialMenu = MainMenu.prototype.getAddCredentialMenu;
SAXSMainMenu.prototype.getLoginButton = MainMenu.prototype.getLoginButton;
SAXSMainMenu.prototype.setText = MainMenu.prototype.setText;
SAXSMainMenu.prototype.getHelpMenu = MainMenu.prototype.getHelpMenu;
SAXSMainMenu.prototype.getHomeItem = MainMenu.prototype.getHomeItem;
SAXSMainMenu.prototype.getShipmentItem = MainMenu.prototype.getShipmentItem;


SAXSMainMenu.prototype.getMenuItems = function() {
	
	
	
	return [	
    	this.getHomeItem(),
    	this.getShipmentItem(),
    	{
				text : this._convertToHTMLWhiteSpan("Prepare Experiment"),
				cls : 'ExiSAXSMenuToolBar',
				hidden : this.isHidden,
				menu : this.getPreparationMenu() 
		}, {
				text : this._convertToHTMLWhiteSpan("Data Explorer"),
				cls : 'ExiSAXSMenuToolBar',
				hidden : this.isHidden,
				menu : this.getDataExplorerMenu() 
		},
//		{
//			text : '<span style="color:white">Offline Data Analysis</span>',
//			cls : 'ExiSAXSMenuToolBar',
//			hidden : this.isHidden,
//			menu : this.getOnlineDataAnalisysMenu() 
//		}, 
		{
			text : this._convertToHTMLWhiteSpan("Help"),
			cls : 'ExiSAXSMenuToolBar',
			menu : this.getHelpMenu() 
		}, 
		'->', 
		{
			xtype : 'textfield',
			name : 'field1',
			emptyText : 'search macromolecule',
			hidden : this.isHidden,
			listeners : {
				specialkey : function(field, e) {
					if (e.getKey() == e.ENTER) {
						location.hash = "/datacollection/macromoleculeAcronym/" + field.getValue() + "/main";
					}
				} 
			} 
	}
	];
};




SAXSMainMenu.prototype.getPreparationMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Macromolecules") {
			location.hash = "/saxs/macromolecule/nav";
		}
		if (item.text == "Buffers") {
			location.hash = "/saxs/buffer/nav";
		}

		if (item.text == "Sample Tracking") {
			location.hash = "/saxs/shipping/nav";
		}

		if (item.text == "My Experiments") {
			location.hash = "/saxs/template/nav";
		}
	}

	return Ext.create('Ext.menu.Menu', {
		items : [ 
	          {
				text : 'Macromolecules',
				icon : '../images/icon/macromolecule.png',
				handler : onItemCheck 
			}, 
			{
				text : 'Buffers',
				icon : '../images/icon/buffer.jpg',
				handler : onItemCheck 
			}, 
//			"-", 
//			{
//				text : 'Stock Solutions',
//				icon : '../images/icon/testtube.png',
//				handler : onItemCheck 
//			}, 
//			{
//				text : 'Sample Tracking',
//				icon : '../images/icon/shipping.png',
//				menu:this.getSampleTrackingMenu()
//			}, 
			"-", 
			{
				text : 'My Experiments',
				icon : '../images/icon/edit.png',
				handler : onItemCheck 
			}

		] });
};

SAXSMainMenu.prototype.getDataExplorerMenu = function() {
	function onItemCheck(item, checked) {
		if (item.text == "Sessions") {
			location.hash = "/proposal/session/nav";
		}
		if (item.text == "Experiments") {
			location.hash = "/experiment/nav";
		}
	}
	return Ext.create('Ext.menu.Menu', {
		items : [ 
			{
				text : 'Sessions',
				icon : '../images/icon/sessions.png',
				handler : onItemCheck 
			}
		] 
	});
};

SAXSMainMenu.prototype.getDataReductionMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Sessions") {
			_this.onSessionClicked.notify();
		}
		if (item.text == "Subtraction") {
			location.hash = "/tool/subtraction/main";
		}
		if (item.text == "Experiments") {
			_this.onExperimentClicked.notify();
		}
	}

	return Ext.create('Ext.menu.Menu', {
		items : [ {
			text : '<span class="menuCategoryItem">SEC</span>' }, "-", {
			text : 'Background Test' }, {
			text : 'Baseline Checker' }, {
			text : 'Frame Merge' }, "-", {
			text : '<span class="menuCategoryItem">INDIVIDUAL CONCENTRATION</span>' }, "-", {
			text : 'Subtraction',
			checked : false,
			group : 'theme',
			checkHandler : onItemCheck }, {
			text : 'Average' }, "-", {
			text : '<span class="menuCategoryItem">COMBINING</span>' }, "-", {
			text : 'Merging tool' } ] });
};



SAXSMainMenu.prototype.getOnlineDataAnalisysMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Structure Validation") {
			location.hash = "/tool/crysol/main";
		}
		if (item.text == "Job list") {
			location.hash = "/tool/list";
		}
	}

	return Ext.create('Ext.menu.Menu', {
		items : [
		{
			text : 'Structure Validation',
			checked : false,
			group : 'theme',
			handler : onItemCheck },
			"-",
			{
				text : 'Job list',
				checked : false,
				group : 'theme',
				handler : onItemCheck }
		] });
};


/**
* AddressListView displays the address (labcontact information) as list on the navigation panels
*
* @class AddressListView
* @constructor
*/
function AddressListView(){
	this.title = "Addresses";
	this.sorters = [{property : 'cardName', direction: 'ASC'}];
	ListView.call(this);
}

AddressListView.prototype.getPanel = ListView.prototype.getPanel;
AddressListView.prototype.load = ListView.prototype.load;
AddressListView.prototype.getFields = ListView.prototype.getFields;
AddressListView.prototype.getColumns = ListView.prototype.getColumns;

AddressListView.prototype.getFilter = function(value){
	return [{property : "cardName", value : value, anyMatch : true}];
};

/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
AddressListView.prototype.getRow = function(record){
	var html = "";
	dust.render("address.listview", record.data, function(err, out){
        	html = out;
     	});
	return html;
};




function BufferListView(){
	ListView.call(this);
}

BufferListView.prototype.getPanel = ListView.prototype.getPanel;
BufferListView.prototype.load = ListView.prototype.load;


BufferListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
		html = html + "<tr><td>Acronym:</td><td style='color:#207a7a;font-weight:bold;'>" + record.data.acronym+ "</td></tr>";
		html = html + "<tr><td>name:</td><td>" + record.data.name+ "</td></tr>";
	return html + "</table>";
};

BufferListView.prototype.getFilter = function(value){
	return [{property : "acronym", value : value, anyMacth : true}];
};

BufferListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Buffers',  flex: 1, dataIndex: 'bufferId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

BufferListView.prototype.getFields = function(){
	return  ['acronym', 'name'];
};


function DataCollectionListView(){
	ListView.call(this);
}

DataCollectionListView.prototype.getPanel = ListView.prototype.getPanel;
DataCollectionListView.prototype.load = ListView.prototype.load;

DataCollectionListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
	html = html + "<tr><td>Macromolecule:</td><td >" + record.data.macromoleculeAcronym+ "</td></tr>";
		html = html + "<tr><td>Buffer:</td><td style='color:#207a7a;font-weight:bold;'>" + record.data.bufferAcronym+ "</td></tr>";
		html = html + "<tr><td>Count:</td><td>" + record.data.dataCollections+ "</td></tr>";
	return html + "</table>";
};

DataCollectionListView.prototype.getFilter = function(value){
	return [{property : "bufferAcronym", value : value, anyMacth : true}];
};

DataCollectionListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Data Collections',  flex: 1, dataIndex: 'bufferAcronym', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

DataCollectionListView.prototype.getFields = function(){
	return  ['macromoleculeAcronym', 'bufferAcronym', 'macromoleculeId', 'dataCollections'];
};

//DataCollectionListView.prototype.groupBy = function(array , f ){
//  var groups = {};
//  array.forEach( function( o )
//  {
//    var group = JSON.stringify( f(o) );
//    groups[group] = groups[group] || [];
//    groups[group].push( o );  
//  });
//  return Object.keys(groups).map( function( group ){
//	  return groups[group]; 
//  });
//};


/** This groups all the data by bufferId **/
DataCollectionListView.prototype.formatData = function(data){
	data =  BUI.groupBy(data, function(item){
		  return [item.bufferAcronym];
	});
	/** Data is now an array of arrays **/
	
	var results = [];
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		results.push({
			macromoleculeAcronym : item[0].macromoleculeAcronym,
			macromoleculeId: item[0].macromoleculeId,
			bufferAcronym : item[0].bufferAcronym,
			dataCollections : item.length
		});
	}
	
	return results;
	
};



function ExperimentListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	ListView.call(this);
}

ExperimentListView.prototype.getPanel = ListView.prototype.getPanel;
ExperimentListView.prototype.load = ListView.prototype.load;

ExperimentListView.prototype.getRow = function(record){
	var color = "black";
	/** If experiment is empty then color is gray **/
		if ((record.data.experimentType != 'HPLC')&&(record.data.measurementDoneCount == 0)&&(record.data.measurementAveragedCount == 0)&&(record.data.dataCollectionDoneCount == 0)){
			color = '#DEDEDE';
		}
		var html = "<table class='listView' style='color:" + color +";'>";
			html = html + "<tr><td colspan='4'>" + record.data.creationDate+ "</td></tr>";
			html = html + "<tr><td colspan='4'>" + record.data.name+ "</td></tr>";
			html = html + "<tr><td style='font-weight:bold;' colspan='4'>" + record.data.experimentType+ "</td></tr>";
			if ((record.data.experimentType == 'STATIC')||(record.data.experimentType == 'CALIBRATION')){
				if ((record.data.measurementDoneCount == 0)&&(record.data.measurementAveragedCount == 0)&&(record.data.dataCollectionDoneCount == 0)){
					html = html + "<tr ><td  style='width:180px;border:1px solid gray;text-align:center;color:" + color +";font-weight:bold;' colspan='4'>EMPTY</td></tr>";
					
				}
				else{
					html = html + "<tr style='margin-left:5px;'><td style='width:10px;'></td><td>Collected:</td><td>"+ record.data.measurementDoneCount +"/" + record.data.measurementCount + "</td><td>" + new ProgressBar().getPanel(record.data.measurementDoneCount, record.data.measurementCount) + "</td></tr>";
					html = html + "<tr><td style='width:10px;'></td><td>Averaged:</td><td>"+ record.data.measurementAveragedCount +"/" + record.data.measurementCount + "</td><td>" + new ProgressBar().getPanel(record.data.measurementAveragedCount, record.data.measurementCount) + "</td></tr>";
					html = html + "<tr><td style='width:10px;'></td><td>Subtracted:</td><td>"+ record.data.dataCollectionDoneCount +"/" + record.data.dataCollectionCount + "</td><td>" + new ProgressBar().getPanel(record.data.dataCollectionDoneCount, record.data.dataCollectionCount) + "</td></tr>";
				}
			}
	return html + "</table>";
};

ExperimentListView.prototype.getFilter = function(value){
	return [{property : "name", value : value, anyMacth : true}];
};

ExperimentListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Experiment',  flex: 1, dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

ExperimentListView.prototype.getFields = function(){
	return  ['creationDate', 'name', 'experimentType'];
};


function MacromoleculeListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	ListView.call(this);
}

MacromoleculeListView.prototype.getPanel = ListView.prototype.getPanel;
MacromoleculeListView.prototype.load = ListView.prototype.load;

MacromoleculeListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
	html = html + "<tr><td>Acronym:</td><td style='color:#207a7a;font-weight:bold;'>" + record.data.acronym+ "</td></tr>";
	html = html + "<tr><td>name:</td><td>" + record.data.name+ "</td></tr>";
	return html + "</table>";
};

MacromoleculeListView.prototype.getFilter = function(value){
	return [{property : "acronym", value : value, anyMacth : true}];
};

MacromoleculeListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Macromolecule',  flex: 1, dataIndex: 'macromoleculeId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

MacromoleculeListView.prototype.getFields = function(){
	return  ['acronym', 'name', 'comments'];
};


function StockSolutionListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	ListView.call(this);
}

StockSolutionListView.prototype.getPanel = ListView.prototype.getPanel;
StockSolutionListView.prototype.load = ListView.prototype.load;
StockSolutionListView.prototype.getFilter = ListView.prototype.getFilter;
StockSolutionListView.prototype.getFields = ListView.prototype.getFields;
StockSolutionListView.prototype.getColumns = ListView.prototype.getColumns;


/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
StockSolutionListView.prototype.getRow = function(record){
	var html = "";
	if (EXI.proposalManager.getBufferById(record.data.bufferId)){
		record.data.bufferAcronym = EXI.proposalManager.getBufferById(record.data.bufferId).acronym;
	}
	if (EXI.proposalManager.getMacromoleculeById(record.data.macromoleculeId)){
		record.data.macromoleculeAcronym = EXI.proposalManager.getMacromoleculeById(record.data.macromoleculeId).acronym;
	}
	dust.render("stocksolution.listview", record.data, function(err, out){
        	html = out;
     	});
	return html;
};

function TemplateListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	ListView.call(this);
}

TemplateListView.prototype.getPanel = ListView.prototype.getPanel;
TemplateListView.prototype.load = ListView.prototype.load;

TemplateListView.prototype.getRow = function(record){
	var color = "black";
	var html = "<table class='listView' style='color:" + color +";'>";
	html = html + "<tr style='font-weight: bold;font-size:14px; color:#207a7a;'><td colspan='4'>" + record.data.name+ "</td></tr>";
	html = html + "<tr><td style='font-weight:bold;' colspan='4'>" + record.data.comments+ "</td></tr>";
	html = html + "<tr ><td colspan='4'>" + record.data.creationDate+ "</td></tr>";
	return html + "</table>";
};

TemplateListView.prototype.getFilter = function(value){
	return [{property : "name", value : value, anyMatch : true}];
};

TemplateListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { 
		        	text: 'Experiment',  
		        	flex: 1, 
		        	dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        	} 
		        }
		    ];
};

TemplateListView.prototype.getFields = function(){
//	debugger
//	return  ['creationDate', 'name', 'experimentType'];
	return  [
	         	{name : 'creationDate', type : 'string'}, 
	        	{name : 'name', type : 'string'}, 
	        	{name : 'experimentType', type : 'string'} 
	         ];
};


function DataCollectionMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';

	MainView.call(this);

	this.grid = new QueueGrid({
		positionColumnsHidden : true,
		maxHeight : Ext.getCmp("main_panel").getHeight() - 50,
		sorters : [ {
			property : 'macromoleculeAcronym',
			direction : 'ASC' } ] });
	
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

DataCollectionMainView.prototype.getPanel = MainView.prototype.getPanel;
DataCollectionMainView.prototype.getContainer = MainView.prototype.getContainer;

DataCollectionMainView.prototype.filter = function(macromoleculeAcronym, bufferAcronym) {
	this.grid.key = {};
	this.grid.store.filter( [{property : "bufferAcronym", value : bufferAcronym, anyMacth : true}]);
};

DataCollectionMainView.prototype.load = function(selected) {
	var _this = this;
	

	this.grid.onSelectionChange.attach(function(sender, elements) {
		_this.onSelectionChange.notify(elements);
	});

	this.grid.onSelect.attach(function(sender, selected) {
		_this.onSelect.notify(selected);
	});
	this.grid.onDeselect.attach(function(sender, unselected) {
		_this.onDeselect.notify(unselected);
	});

	this.container.insert(0, this.grid.getPanel());

	this.grid.panel.setLoading();
	this.grid.store.loadData(selected);
	this.grid.panel.setLoading(false);
};

function ExperimentMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	this.experimentHeaderForm = new ExperimentHeaderForm();
	var _this = this;
	/** Viscosity **/
	var storeViscosity = Ext.create('Ext.data.Store', {
		fields : [ 'name' ],
		data : [ {
			"name" : "low"
		}, {
			"name" : "medium"
		}, {
			"name" : "high"
		} ]
	});

	// Create the combo box, attached to the states data store
	var viscosityEditor = Ext.create('Ext.form.ComboBox', {
		fieldLabel : '',
		store : storeViscosity,
		queryMode : 'local',
		displayField : 'name',
		valueField : 'name'
	});
	
	
	/** Specimen Widget contains a specimenGrid and a sampleChangerWidget than can be displayed with are vertical or horizontal layout **/
	this.specimenWidget = new SpecimenWidget({
		height : this.height,
		width : 1200
	});
	
	this.measurementGrid = new MeasurementGrid({
//		maxWidth : 1500,
//		width : 1200,
		height : 600,
		minHeight : 600,
		maxHeight : 600,
		estimateTime : false,
		positionColumnsHidden : false,
		isPriorityColumnHidden : true,
		isStatusColumnHidden : false,
		addBtnEnable : false,
		isTimeColumnHidden : false,
		updateRowEnabled : false,
		collapsed : false,
		removeBtnEnabled : false,
		showTitle : false,
		collapseBtnEnable : false,
		addBtnMultipleEdit : false,
		sortingBtnEnable : false,
		editor : {
			exposureTemperature : {
				xtype : 'textfield',
				allowBlank : true
			},
			comments : {
				xtype : 'textfield',
				allowBlank : true
			},
			volumeToLoad : {
				xtype : 'numberfield',
				allowBlank : true
			},
			transmission : {
				xtype : 'numberfield',
				allowBlank : true
			},
			viscosity : viscosityEditor,
			waitTime : {
				xtype : 'numberfield',
				allowBlank : true
			},
			flow : {
				xtype : 'checkbox',
				allowBlank : true
			}
		}
	});

//	this.measurementGrid.onSelected.attach(function(sender, measurements) {
//		var specimens = [];
//		for ( var i = 0; i < measurements.length; i++) {
//			specimens.push(_this.experiment.getSampleById(measurements[i].specimenId));
//		}
//	});

	this.measurementGrid.onMeasurementChanged.attach(function(sender, measurement) {
//		debugger
		_this.experiment.setMeasurement(measurement);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.measurementGrid.onExperimentChanged.attach(function(sender, json) {
		_this.experiment = new Experiment(json);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.measurementGrid.onRemoved.attach(function(sender, experiments) {
		_this.experiment = new Experiment(experiments[0]);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	
	this.queueGrid = new QueueGrid({
		positionColumnsHidden : true,
//		maxHeight : Ext.getCmp("main_panel").getHeight() - 50,
		sorters : [ {
			property : 'macromoleculeAcronym',
			direction : 'ASC'
		} ]
	});
	
	
}

ExperimentMainView.prototype.getPanel = MainView.prototype.getPanel;

ExperimentMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};


ExperimentMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 0',
				activeTab: 2,
				items : [
					{
						tabConfig : {
							title : "Sample Plate Setup"
						},
						items : [  
									{
										xtype : 'container',
										layout : 'vbox',
										height : 700,
										padding : 20,
										style : {
											borderColor : 'gray',
											borderStyle : 'solid',
											borderWidth : '1px',
											'background-color' : 'white' 
										},
										items : [ 
										     	this.specimenWidget.getPanel()
										     	]
									}
									]
					},
					{
						tabConfig : {
							title : 'Measurements'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							         
							         this.measurementGrid.getPanel()
							]
						}

						]
					},
					{
						tabConfig : {
							title : 'Online Data Analysis'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							     this.queueGrid.getPanel()    
							]
						}
					
						]
					}
			]
	}
	);
};


ExperimentMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    items: [
	            this.experimentHeaderForm.getPanel(),
	            this.getTabs()
	    ]
	});
};



ExperimentMainView.prototype.load = function(experimentId) {
	var _this = this;
	_this.panel.setLoading();
	_this.queueGrid.panel.setLoading();
	var onSuccess = function(sender, experiments){
		_this.experiment = new Experiment(experiments[0]);
		_this.experimentHeaderForm.load(_this.experiment);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.specimenWidget.refresh(_this.experiment);
		_this.panel.setTitle(experiments[0].name);
		_this.panel.setLoading(false);	
		var onSuccess = function(sender, data){
			_this.queueGrid.load(data);
			_this.queueGrid.panel.setLoading(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByExperimentId(experimentId);
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getExperimentById(experimentId);
};



function HPLCMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.grid = new QueueGrid({
		collapsed : true,
		positionColumnsHidden : true,
		maxHeight : Ext.getCmp("main_panel").getHeight() - 50,
		sorters : [ {
			property : 'macromoleculeAcronym',
			direction : 'ASC' } ] });

	this.grid.onSelectionChange.attach(function(sender, elements) {
		_this.onSelectionChange.notify(elements);
	});

	this.grid.onSelect.attach(function(sender, selected) {
		_this.onSelect.notify(selected);
	});

	this.grid.onDeselect.attach(function(sender, unselected) {
		_this.onDeselect.notify(unselected);
	});

	var _this = this;
	_this.annotations = [];
	_this.selectedFrameNumber = [];
	this.hplcGraph = new HPLCGraph({
		title : 'I0',
		width : 800,
		height : 350,
		bbar : true,
		plots : {
			"I0" : true,
			"Rg" : true },
		xlabel : "HPLC Frames",
		scaled : true,
		interactionModel : {
			'dblclick' : function(event, g, context) {
				_this.selectedFrameNumber.push(g.lastx_);
				_this.plotter.loadHPLCFrame(_this.experimentId, _this.selectedFrameNumber);

				_this.annotations.push({
					series : g.selPoints_[0].name,
					x : g.lastx_,
					width : 30,
					height : 23,
					tickHeight : 2,
					shortText : g.lastx_,
					text : g.lastx_,
					attachAtBottom : true });
				g.setAnnotations(_this.annotations);

			} } });

	this.hplcGraph.onClearSelection.attach(function(sender) {
		_this.annotations = [];
		_this.selectedFrameNumber = [];
		_this.hplcGraph.dygraphObject.dygraph.setAnnotations([]);
	});

	this.plotter = new CurvePlotter({
		margin : '10 0 0 0' });

	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

HPLCMainView.prototype.getPanel = MainView.prototype.getPanel;


HPLCMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

HPLCMainView.prototype.getPlotContainer = function() {
	return {
		xtype : 'container',
		cls : 'defaultGridPanel',
		border : 0,
		defaults : {
			height : 450 },
		items : [ this.hplcGraph.getPanel(), this.plotter.getPanel()
		] };
};

HPLCMainView.prototype.getContainer = function() {

	return {
		xtype : 'container',
		items : [ this.grid.getPanel(), this.getPlotContainer() ] };
};

HPLCMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

HPLCMainView.prototype.loadHPLCGraph = function(experimentId) {
	var _this = this;
	var onSuccess = function(sender, data) {
		data = JSON.parse(data);
		var zeroArray = [];
		for (var i = 0; i < data.I0.length; i++) {
			zeroArray.push(0);
		}
		data = [ {
			param : "I0",
			data : data.I0,
			std : data.I0_Stdev,
			color : '#0066CC',
			label : "I0" }, {
			param : "sum_I",
			label : "sum_I",
			color : "#00FF00",
			data : data.sum_I,
			std : zeroArray }, {
			param : "Rg",
			label : "Rg",
			color : "#21610B",
			data : data.Rg,
			std : data.Rg_Stdev }, {
			param : "Mass",
			data : data.mass,
			std : data.mass_Stdev,
			color : '#FF9900',
			label : "Mass" }, {
			param : "Vc",
			data : data.Vc,
			std : data.Vc_Stdev,
			color : '#990099',
			label : "Vc" }, {
			param : "Qr",
			data : data.Qr,
			std : data.Qr_Stdev,
			color : '#FF0066',
			label : "Qr" }, {
			param : "quality",
			label : "quality",
			color : "#FF00FF",
			data : data.quality,
			std : zeroArray } ];
		_this.hplcGraph.loadData(data);

	};

	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.hplc.getHPLCOverviewByExperimentId(experimentId);
};

HPLCMainView.prototype.load = function(experimentId) {
		var _this = this;
		this.experimentId = experimentId;

		this.grid.panel.setLoading();

		var onSuccess = function(sender, data) {
			_this.grid.load(data);
			_this.grid.panel.setLoading(false);
		};

		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByExperimentId(experimentId);
		this.loadHPLCGraph(experimentId);
};

function BufferWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Macromolecules";
	this.closable = false;
}

BufferWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
BufferWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

BufferWelcomeMainView.prototype.getOptions = function() {
	var html =  "<ul><li>Define beforehand an experiment</li>";
	html = html + "<li>Send your samples by courier</li>";
	return html + "</ul>";
};



BufferWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '20',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
//							height : 700,
							padding : 10,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Buffers on ISPyB</h2></div>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	 html : '<div class="landing-text">A buffer is the matched solution which in a sample is suspended</div><br/>',
							        	 margin : '0 0 0 40'
							         },
							         {
							        	 html : '<div class="landing-text">You should define a macromolecule on ISPyB if you want:</div>',
							        	 margin : '0 0 0 40'
							         },
							         {
							        	 html : this.getOptions(),
							        	 margin : '0 0 0 40'
							         },
							         
							         {
							        	 html : '<br/><div class="landing-text">If your macromolecule is not in the list showed on the left you can create a new one</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Add a new buffer</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){
										        		 location.hash = '/buffer/add';
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


BufferWelcomeMainView.prototype.load = function() {
	
};

function ExperimentWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Welcome";
	this.closable = false;
}

ExperimentWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
ExperimentWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

ExperimentWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '10',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							padding : 20,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Designing your experiment on ISPyB</h2></div>'
							         },
							         {
							        	 html : '<div class="landing-text">A experiment is a set of measurements of samples.</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Create a new Experiment</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){
										        		 location.hash = '/prepare/designer';
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


ExperimentWelcomeMainView.prototype.load = function() {
	
};

function MacromoleculeWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Macromolecules";
	this.closable = false;
}

MacromoleculeWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
MacromoleculeWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

MacromoleculeWelcomeMainView.prototype.getOptions = function() {
	var html =  "<ul><li>Define beforehand an experiment</li>";
	html = html + "<li>Send your samples by courier</li>";
	html = html + "<li>Online data analysis to run apriori data analysis (PDB information will be required on the advanced tab in the macromolecule view)</li>";
	return html + "</ul>";
};

MacromoleculeWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '10',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							padding : 20,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Macromolecules on ISPyB</h2></div>'
							         },
							         {
							        	 html : '<div class="landing-text">A macromolecule is a biological contruct for investigation.</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	 html : '<div class="landing-text">You should define a macromolecule on ISPyB if you want:</div>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	 html : this.getOptions(),
							        	 margin : '0 0 0 40'
							         },
							         
							         {
							        	 html : '<br/><div class="landing-text">If your macromolecule is not in the list showed on the left you can create a new one</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Add a new macromolecule</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){
										        		 location.hash = '/macromolecule/add';
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


MacromoleculeWelcomeMainView.prototype.load = function() {
	
};

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

function ShippingWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Welcome";
	this.closable = false;
}

ShippingWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
ShippingWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

ShippingWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '10',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							padding : 20,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Shipments</h2></div>'
							         },
							         {
							        	 html : '<div class="landing-text"> A Shipment consists of a set of Dewars which is sent from your home lab to the synchrotron via a courier company. Each dry shipping Dewar within the shipment is identified by a label (barcode or sticker). The dewars(s) contains a set of Containers (Pucks or canes). Containers (typically Pucks), contain Samples. A Sample (Sample Holder) contains the Crystal</div><br/>',
							        	 margin : '0 0 0 20'
							         },
//							         {
//							        	 html : '<div class="landing-text"><img src="../images/ShippingObjects_02.png" /></div>',
//							        	 margin : '0 0 0 20'
//							         },
//							         {
//							        	 html : '<div class="landing-text">Tracking your shipment & contents (Dewars, toolboxes etc) allows you to follow the progress of your shipment from your home Lab to The ESRF.</div>',
//							        	 margin : '0 0 0 20'
//							         },
//							         
//							         {
//							        	 html : '<div class="landing-text"><img src="../images/dewarTrackingWF_01.png" /></div>',
//							        	 margin : '0 0 0 20'
//							         },
//							         {
//							        	 html : this.getOptions(),
//							        	 margin : '0 0 0 40'
//							         },
							         
							         {
							        	 html : '<br/><div class="landing-text">Do you want to ship your samples to the beamline?</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Create a new Shipment</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){

										        		 //if (EXI.proposalManager.getFutureSessions().length > 0){
										     				location.hash = '/shipping/main';
										     			 //}
										        		 //else{
											        	//	 BUI.showError("Sorry, there are not sessions scheduled for this proposal");
										        		 //}
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


ShippingWelcomeMainView.prototype.load = function() {
	
};

function StockSolutionWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Macromolecules";
	this.closable = false;
}

StockSolutionWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
StockSolutionWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

StockSolutionWelcomeMainView.prototype.getOptions = function() {
	var html =  "<ul><li>Define beforehand an experiment</li>";
	html = html + "<li>Send your samples by courier</li>";
	return html + "</ul>";
};

StockSolutionWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '20',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
//							height : 700,
							padding : 10,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Stock Solutions on ISPyB</h2></div>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	 html : '<div class="landing-text">A buffer is the matched solution which in a sample is suspended</div><br/>',
							        	 margin : '0 0 0 40'
							         },
							         {
							        	 html : '<div class="landing-text">You should define a macromolecule on ISPyB if you want:</div>',
							        	 margin : '0 0 0 40'
							         },
							         {
							        	 html : this.getOptions(),
							        	 margin : '0 0 0 40'
							         },
							         
							         {
							        	 html : '<br/><div class="landing-text">If your macromolecule is not in the list showed on the left you can create a new one</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Add a new Stock Solution</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){
										        		 location.hash = '/stocksolution/add';
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


StockSolutionWelcomeMainView.prototype.load = function() {
	
};

function MergeMainView() {
	this.title = "Primary Data View";
	this.icon = 'images/icon/ic_blur_on_black_18dp.png';
	this.queueGridList = [];

	var _this = this;

	/** Curve plotter * */
	this.plotter = new CurvePlotter({});
	this.formPopulated = false;
	this.plotter.onRendered.attach(function(sender) {
		/** only once * */
		if (!_this.formPopulated) {
			/** colors * */
			var colors = {};
			for (var i = 1; i < sender.getLabels().length; i++) {
				colors[sender.getLabels()[i]] = sender.getColors()[i - 1];
			}

			_this.populateForm(sender.getPointCount(), colors);
			_this.formPopulated = true;
		}
		plotter = sender;
	});
}

MergeMainView.prototype.getPanel = MainView.prototype.getPanel;
MergeMainView.prototype.getContainer = MainView.prototype.getContainer;

MergeMainView.prototype.populateForm = function(pointCount, colors) {
	for (var i = 0; i < this.frames.length; i++) {
		this.editorPanel.add(this.getCurveContainer(this.frames[i].subtractionId, this.frames[i].fileName, 0, 5, this.frames[i].scale,
				pointCount, colors));
	}
};

MergeMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

MergeMainView.prototype.getCurveContainer = function(subtractionId, fileName, from, to, scale, pointCount, colors) {
	var _this = this;
	return Ext.create('Ext.Panel', {
		width : 380,
		layout : 'vbox',
		border : 1,
		style : {
			// borderColor : colors[fileName],
			borderStyle : 'solid',
			borderWidth : '1px' },
		margin : '10 0 0 5',
		items : [ {
			xtype : 'container',
			margin : '0 0 0 0',
			layout : 'hbox',
			items : [ {
				xtype : 'container',
				layout : 'vbox',
				items : [ {
					html : '<span style="font-size:12px;color:' + colors[fileName] + ';">' + fileName + '</span>',
					margin : '10 0 0 10' },

				{
					xtype : 'sliderfield',
					margin : '10 0 0 2',
					hideLabel : true,
					width : 275,
					minValue : 0,
					subtractionId : subtractionId,
					id : "slider" + subtractionId,
					maxValue : pointCount,
					increment : 1,
					values : [ 0, pointCount ],
					listeners : {
						changecomplete : function(slider, newValue, thumb, eOpts) {
							var values = slider.getValues();
							for (var i = 0; i < _this.frames.length; i++) {
								if (_this.frames[i].subtractionId == slider.subtractionId) {
									_this.frames[i].from = _this.plotter.dygraph.getValue(values[0] - 1, 0);
									_this.frames[i].to = _this.plotter.dygraph.getValue(values[1] - 1, 0);
								}
							}
							_this.updateCurve();
						} } } ] }, {
				xtype : 'container',
				layout : 'vbox',
				items : [ {
					xtype : 'container',
					layout : 'hbox',
					items : [ {
						xtype : 'button',
						text : '<',
						width : 30,
						margin : '2 0 0 10',
						subtractionId : subtractionId,
						handler : function(sender) {
							var id = "slider" + sender.subtractionId;
							Ext.getCmp(id).setValue(0, Ext.getCmp(id).getValues()[0] - 1);
							var values = Ext.getCmp(id).getValues();
							for (var i = 0; i < _this.frames.length; i++) {
								if (_this.frames[i].subtractionId == sender.subtractionId) {
									_this.frames[i].from = _this.plotter.dygraph.getValue(values[0] - 1, 0);
								}
							}

							_this.updateCurve();
						} }, {
						xtype : 'button',
						text : '>',
						width : 30,
						margin : '2 0 0 5',
						subtractionId : subtractionId,
						handler : function(sender) {
							var id = "slider" + sender.subtractionId;
							Ext.getCmp(id).setValue(1, Ext.getCmp(id).getValues()[1] + 1);
							var values = Ext.getCmp(id).getValues();
							for (var i = 0; i < _this.frames.length; i++) {
								if (_this.frames[i].subtractionId == sender.subtractionId) {
									_this.frames[i].to = _this.plotter.dygraph.getValue(values[1] - 1, 0);
								}
							}
							_this.updateCurve();
						} }

					]

				}, {
					xtype : 'container',
					layout : 'hbox',
					margin : '2 0 2 0',
					items : [ {
						xtype : 'button',
						text : '+',
						margin : '0 0 0 10',
						width : 30,
						subtractionId : subtractionId,
						handler : function(sender) {
							for (var i = 0; i < _this.frames.length; i++) {
								console.log(sender.subtractionId);
								if (_this.frames[i].subtractionId == sender.subtractionId) {
									_this.frames[i].scale = _this.frames[i].scale + 0.1;
								}
							}
							_this.updateCurve();
						} }, {
						xtype : 'button',
						text : '-',
						width : 30,
						margin : '0 0 0 5',
						subtractionId : subtractionId,
						handler : function(sender) {
							for (var i = 0; i < _this.frames.length; i++) {
								if (_this.frames[i].subtractionId == sender.subtractionId) {
									_this.frames[i].scale = _this.frames[i].scale - 0.1;
								}
							}
							_this.updateCurve();
						} } ] } ] }

			] }

		] });
};

MergeMainView.prototype.getSubtractionEditor = function() {
	var _this = this;
	this.editorPanel = Ext.create('Ext.Panel', {
		border : 1,
		height : 600,
		width : 400,
		layout : 'vbox',
		scrollable : true,
		style : {
			borderColor : '#000000',
			borderStyle : 'solid',
			borderWidth : '1px' },
		items : [],
		bbar : [ {
					text : "Download",
					xtype : 'button',
					handler : function(sender) {
						var params = _this.getParams();
						window.open(new DataAdapter().getMergeURL(params.subtractionIds.toString(), params.from.toString(), params.to.toString(), params.scale.toString()));
					}
		}]
//		{
//			xtype : 'button',
//			text : 'Download',
//			margin : '0 0 0 10',
//			width : 30,
//			handler : function(sender) {
//
//			} } ] 
			
	});
	return this.editorPanel;
};

MergeMainView.prototype.getParams = function() {
	var from = [];
	var to = [];
	var scale = [];
	var subtractionIds = [];
	for (var i = 0; i < this.frames.length; i++) {
		var frame = this.frames[i];
		if (frame.from != null) {
			from.push(frame.from);
		} else {
			from.push("");
		}
		if (frame.to != null) {
			to.push(frame.to);
		} else {
			to.push("");
		}
		if (frame.scale != null) {
			scale.push(frame.scale);
		} else {
			scale.push("");
		}
		if (frame.subtractionId != null) {
			subtractionIds.push(frame.subtractionId);
		} else {
			subtractionIds.push("");
		}
	}
	return {
		from : from,
		to : to,
		scale : scale,
		subtractionIds : subtractionIds,
		
	};
};

MergeMainView.prototype.updateCurve = function() {
	

	/** Saving zoom * */
	this.xAxisRange = this.plotter.dygraph.xAxisRange();
	this.yAxisRange = this.plotter.dygraph.yAxisRange();

	var params = this.getParams();
	this.plotter.loadMerge(params.subtractionIds.toString(), params.from.toString(), params.to.toString(), params.scale.toString());
	this.plotter.dygraph.updateOptions({
		dateWindow : this.xAxisRange,
		valueRange : this.yAxisRange });
};

MergeMainView.prototype.getSlavePanel = function() {
	return {
		xtype : 'container',
		layout : 'hbox',
		cls : 'defaultGridPanel',
		border : 0,
		defaults : {
			xtype : 'container',
			height : 600 },
		items : [ this.getSubtractionEditor(), this.plotter.getPanel() ] };
};

MergeMainView.prototype.load = function(selected) {
	var _this = this;

	var grid = new QueueGrid({
		maxHeight : 300

	});

	this.panel.setTitle("Merge Tool");
	this.container.insert(0, grid.getPanel());

	this.container.insert(1, this.getSlavePanel());
	grid.load(selected);
	grid.panel.setLoading(false);

	var dataCollectionIds = [];
	var subtractionIds = [];
	var subtractionKey = [];

	this.frames = [];
	for (var i = 0; i < selected.length; i++) {

		dataCollectionIds.push(selected[i].dataCollectionId);
		if (subtractionKey[selected[i].subtractionId] == null) {
			subtractionIds.push(selected[i].subtractionId);
			this.frames.push({
				'fileName' : selected[i].substractedFilePath.substr(selected[i].substractedFilePath.lastIndexOf("/") + 1),
				'subtractionId' : selected[i].subtractionId,
				'scale' : 1 });

			subtractionKey[selected[i].subtractionId] = true;
		}
	}

	/** Loading the subtraction on the curve Plotter * */
	this.plotter.load({
		subtracted : subtractionIds });

};

function BufferMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.bufferForm = new BufferForm({
		height : 800,
		collapsed : false,
		tbar : true
	});
	
	var _this = this;
//	this.bufferGrid.onUpdated.attach(function(sender){
//		_this.load();
//	});
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

BufferMainView.prototype.getPanel = MainView.prototype.getPanel;

BufferMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    margin : 15,
//		bodyStyle : {
//			"background-color" : "#E6E6E6" 
//		},
	    border: 1,
//	    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
	    defaults: {
	        labelWidth: 80,
//	        xtype: 'datefield',
	        flex: 1,
	    },
	    items: [this.bufferForm.getPanel([])]
	});
};


BufferMainView.prototype.load = function(bufferId) {
//	this.bufferGrid.load(EXI.proposalManager.getBuffers());
	this.panel.setTitle("Buffer");
	this.bufferForm.load(EXI.proposalManager.getBufferById(bufferId));
};

function DesignerMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	var _this = this;
	
	
	this.wizardWidget = new WizardWidget({
		windowMode : true,
		width : 1200 });
//
	this.wizardWidget.onFinished.attach(function(sender, result) {
//		wizardWidget.window.close();
		EXI.setLoading();
		var onSuccess = function(sender, experiment) {
			location.hash = "/experiment/templateId/" + experiment.experimentId + "/main";
		};
//		wizardWidget.current.setLoading("ISPyB: Creating experiment");
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.template.saveTemplate(result.name, result.comments, result.data);
	});
//
//	wizardWidget.draw(new MeasurementCreatorStepWizardForm(EXI.proposalManager.getMacromolecules(),EXI.proposalManager.getBuffers()));
		
		
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

DesignerMainView.prototype.getPanel = MainView.prototype.getPanel;

DesignerMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    margin : 15,
	    border: 1,
	    defaults: {
	        labelWidth: 80,
	        flex: 1,
	    },
	    items: [this.wizardWidget.getPanel(new MeasurementCreatorStepWizardForm(EXI.proposalManager.getMacromolecules(),EXI.proposalManager.getBuffers()))]
	});
};


DesignerMainView.prototype.load = function(bufferId) {
//	this.bufferGrid.load(EXI.proposalManager.getBuffers());
	this.panel.setTitle("Experiment Designer");
	
};

function ExperimentDesignerMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.templateGrid = new TemplateGrid({
		minHeight : 300,
		height : 440,
		gridType : 'Ext.grid.Panel',
		title : 'Experiments',
		grouping : false,
		tbar : true
	});
	
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

ExperimentDesignerMainView.prototype.getPanel = MainView.prototype.getPanel;

ExperimentDesignerMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    border: 1,
	    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
	    defaults: {
	        labelWidth: 80,
	        xtype: 'datefield',
	        flex: 1,
	    },
	    items: [this.templateGrid.getPanel([])]
	});
};

ExperimentDesignerMainView.prototype.load = function() {
	var _this = this;
	this.panel.setLoading();
	var manager = new ProposalUpdater(); 
	this.templateGrid.grid.setLoading();
	manager.onSuccess.attach(function(sender, proposals){
		_this.panel.setLoading(false);
		var adapter = new DataAdapter();
		adapter.onSuccess.attach(function(sender, experiments){
			_this.templateGrid.store.loadData(experiments);
			_this.templateGrid.grid.setLoading(false);
		});
		
		adapter.getByExperimentByKey("experimentType", "TEMPLATE");
	});
	manager.get();
	
	this.panel.setTitle("Experiment Designer");
};

function MacromoleculeMainView() {
	
	this.icon = '../images/icon/macromolecule.png';
	this.queueGridList = [];

	MainView.call(this);

	this.macromoleculeForm = new MacromoleculeForm({
		height : 800,
		collapsed : false,
		tbar : true
	});
	
	this.rigidBodyModelingForm = new RigidBodyModelingForm({
//		width : this.width - 30,
//		height : this.height - 50,
	});
	
	this.rigidBodyModelingForm.onSave.attach(function(sender, macromolecule) {
//		_this.onSave.notify(macromolecule);
	});
	
	
	var _this = this;
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

MacromoleculeMainView.prototype.getPanel = MainView.prototype.getPanel;

MacromoleculeMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

MacromoleculeMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

MacromoleculeMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
//				margin : '5 0 0 0',
				items : [
					{
						tabConfig : {
							title : 'General'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 600,
							padding : 0,
							items : [ 
							         
							         this.macromoleculeForm.getPanel()
							]
						}

						]
					},
					{
						tabConfig : {
							title : 'Advanced'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 500,
							padding : 0,
							items : [ 
							         this.rigidBodyModelingForm.getPanel()
							]
						}

						]
					}
			]});
};


MacromoleculeMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    items: [
	            this.getTabs()
	            ]
	});
};


MacromoleculeMainView.prototype.load = function(macromoleculeId) {
	this.panel.setLoading();
	var macromolecule = EXI.proposalManager.getMacromoleculeById(macromoleculeId);
	this.panel.setTitle(macromolecule.acronym);
	this.macromoleculeForm.load(macromolecule);
	this.rigidBodyModelingForm.load(macromolecule);
	this.panel.setLoading(false);
};

function StockSolutionMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.stockSolutionForm = new StockSolutionForm({
//		width : this.width - 10,
		minHeight : 800,
		height : 800,
		tbar : true,
		showTitle : true,
		isPackedVisible : false,
		btnAddExisting : false,
		btnRemoveVisible : false,
		btnUnpackVisible : false
	});
	
	var _this = this;
	
	
	this.stockSolutionForm.onSaved.attach(function(sender, stockSolution){
		var onSuccess2 = function(sender, proposals){
			_this.stockSolutionForm.load(EXI.proposalManager.getStockSolutionById(_this.stockSolutionId));	
			_this.panel.setLoading(false);
		};
		_this.panel.setLoading("Updading proposal information");
		EXI.getDataAdapter({onSuccess : onSuccess2}).proposal.proposal.update();
//		
	});
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

StockSolutionMainView.prototype.getPanel = MainView.prototype.getPanel;

StockSolutionMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
		 items: [this.stockSolutionForm.getPanel([])]
	});
	
};


StockSolutionMainView.prototype.load = function(stockSolutionId) {
	this.stockSolutionId = stockSolutionId;
	
	this.stockSolutionForm.load(EXI.proposalManager.getStockSolutionById(stockSolutionId));	
	this.panel.setTitle("Stock Solutions");
};

function TemplateMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	
	this.experimentHeaderForm = new ExperimentHeaderForm();
	
	var _this = this;
	
	
	/** Viscosity **/
	var storeViscosity = Ext.create('Ext.data.Store', {
		fields : [ 'name' ],
		data : [ {
			"name" : "low"
		}, {
			"name" : "medium"
		}, {
			"name" : "high"
		} ]
	});

	// Create the combo box, attached to the states data store
	var viscosityEditor = Ext.create('Ext.form.ComboBox', {
		fieldLabel : '',
		store : storeViscosity,
		queryMode : 'local',
		displayField : 'name',
		valueField : 'name'
	});
	
	
	/** Specimen Widget contains a specimenGrid and a sampleChangerWidget than can be displayed with are vertical or horizontal layout **/
	this.specimenWidget = new SpecimenWidget({
		height : this.height,
		width : 1200
	});
	
	this.measurementGrid = new MeasurementGrid({
//		maxWidth : 1500,
//		width : 1200,
		height : 600,
		minHeight : 600,
		maxHeight : 600,
		estimateTime : false,
		positionColumnsHidden : true,
		isPriorityColumnHidden : true,
		isStatusColumnHidden : true,
		addBtnEnable : true,
		isTimeColumnHidden : true,
		updateRowEnabled : true,
		collapsed : true,
		removeBtnEnabled : true,
		showTitle : false,
		collapseBtnEnable : false,
		addBtnMultipleEdit : true,
		sortingBtnEnable : true,
		editor : {
			exposureTemperature : {
				xtype : 'textfield',
				allowBlank : true
			},
			comments : {
				xtype : 'textfield',
				allowBlank : true
			},
			volumeToLoad : {
				xtype : 'numberfield',
				allowBlank : true
			},
			transmission : {
				xtype : 'numberfield',
				allowBlank : true
			},
			viscosity : viscosityEditor,
			waitTime : {
				xtype : 'numberfield',
				allowBlank : true
			},
			flow : {
				xtype : 'checkbox',
				allowBlank : true
			}
		}
	});


	this.measurementGrid.onMeasurementChanged.attach(function(sender, measurement) {
		_this.experiment.setMeasurement(measurement);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.measurementGrid.onExperimentChanged.attach(function(sender, json) {
		_this.experiment = new Experiment(json);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.measurementGrid.onRemoved.attach(function(sender, experiments) {
		_this.experiment = new Experiment(experiments[0]);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.volumePlanificator = new VolumeGrid();
}

TemplateMainView.prototype.getPanel = MainView.prototype.getPanel;

TemplateMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

TemplateMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};


TemplateMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 0',
				items : [
					{
						tabConfig : {
							title : 'Measurements'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							         
							         this.measurementGrid.getPanel()
							]
						}

						]
					},
					{
						tabConfig : {
							title : "Sample Plate Setup"
						},
						items : [  
									{
										xtype : 'container',
										layout : 'vbox',
										height : 700,
										padding : 20,
										style : {
											borderColor : 'gray',
											borderStyle : 'solid',
											borderWidth : '1px',
											'background-color' : 'white' 
										},
										items : [ 
										     	this.specimenWidget.getPanel()
										     	]
									}
					]
			},
			{
				tabConfig : {
					title : "Sample Requirements"
				},
				items : [  
							{
								xtype : 'container',
								layout : 'fit',
								height : 700,
								padding : 20,
								style : {
									borderColor : 'gray',
									borderStyle : 'solid',
									borderWidth : '1px',
									'background-color' : 'white' 
								},
								items : [ 
								     	this.volumePlanificator.getPanel()
								     	]
							}
			]
			}
			]});
};


TemplateMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    items: [
	            
	            this.experimentHeaderForm.getPanel(),
	            this.getTabs()
	            ]
	});
};



TemplateMainView.prototype.load = function(experiments) {
	var _this = this;
	_this.panel.setLoading();
	var onSuccess = function(sender, experiments){
		_this.experiment = new Experiment(experiments[0]);
		_this.experimentHeaderForm.load(_this.experiment);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
		_this.panel.setLoading(false);
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getExperimentById(experiments[0].experimentId);
	this.panel.setTitle("Template");
};

function PrimaryDataMainView() {
	this.title = "Primary Data View";
	this.icon = 'images/icon/ic_blur_on_black_18dp.png';

	MainView.call(this);
	
	this.onMeasurementSelectionChange = new Event(this);
	
	var _this = this;
	
	this.frameSelectorGrid = new FrameSelectorGrid();
	this.frameSelectorGrid.onSelectionChange.attach(function(sender, selections){
		_this.plotter.load(selections);
	});
	
	/** Curve plotter * */
	this.plotter = new CurvePlotter({
	});

	this.grid = new QueueGrid({
		maxHeight : 300
	});
	
	
	/** Abinitio **/
	this.abinitioForm = new AbinitioForm({
		height : 700
	});
	
}

PrimaryDataMainView.prototype.getPanel = MainView.prototype.getPanel;

PrimaryDataMainView.prototype.getSlavePanel = function() {
	return {
		xtype : 'container',
		layout : 'hbox',
		cls 	: 'defaultGridPanel',
		margin : 5,
		border : 0,
		defaults : {
			height : 600 
		},
		items : [ 
		         {
		        	 xtype : 'panel',
		        	 layout: {
		        	        type: 'accordion',
		        	        titleCollapse: false,
		        	        animate: true,
		        	        activeOnTop: true
		        	    },
		        	    flex : 0.3,
		        		border : 1,
		        		style : {
		        			borderColor : '#000000',
		        			borderStyle : 'solid',
		        			borderWidth : '1px' },
		        	 items : [
		        	          this.frameSelectorGrid.getPanel()
		        	         
		        	          ]
		         },
		         this.plotter.getPanel()
		        
		    ]
	};

};


PrimaryDataMainView.prototype.getContainer = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				height : 900,
				margin : '10 0 0 0',
				items : [
					{
						tabConfig : {
							title : 'Primary Data Reduction'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 850,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
										{
											xtype : 'container',
											items : [
											         	this.grid.getPanel(),
											        	this.getSlavePanel()         
											]
										}
							]
						}

						]
					},
					{
						tabConfig : {
							title : 'Abinitio Modeling'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 850,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
										{
											xtype : 'container',
											items : [
											         	this.abinitioForm.getPanel()
											]
										}
							]
						}

						]
					}
			]
			});
};


//PrimaryDataMainView.prototype.getContainer = function() {
//	return {
//		xtype : 'container',
//		items : [
//		         	this.grid.getPanel(),
//		        	this.getSlavePanel()         
//		]
//	};
//};

PrimaryDataMainView.prototype.load = function(selected) {
	var _this = this;
	this.panel.setTitle(" Data Collection");
	this.grid.panel.setLoading();
	var onSuccess = function(sender, data) {
		_this.grid.load(data);
		_this.grid.panel.setLoading(false);
		/** Measurements Grid * */
		_this.frameSelectorGrid.load(data);
		
		/** Getting abinitio **/
		if (data[0].subtractionId){
			var onSuccessSubtraction = function(sender, subtractions) {
				_this.abinitioForm.load(subtractions);
			};
			
			EXI.getDataAdapter({onSuccess : onSuccessSubtraction}).saxs.subtraction.getSubtractionsBySubtractionIdList([data[0].subtractionId]);
			
		}
	};

	var dataCollectionIds = [];
	for (var i = 0; i < selected.length; i++) {
		dataCollectionIds.push(selected[i].dataCollectionId);

	}
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByDataCollectionId(dataCollectionIds);
	
	
	
};


/**
* This is the description for routing all the puck actions. It means url= #/autoprocintegration/*
*
* @class AutoprocIntegrationController
* @constructor
*/
function AutoprocIntegrationController() {
	this.init();
}

AutoprocIntegrationController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
AutoprocIntegrationController.prototype.notFound = ExiGenericController.prototype.notFound;

AutoprocIntegrationController.prototype.openFiles = function(dataCollectionIds) {
    var autoProcessingFileManager = new AutoProcessingFileManager();
    autoProcessingFileManager.show();
	autoProcessingFileManager.load(dataCollectionIds);
};


/**
* Inits the controller for the AutoprocIntegrationController related objects
* Paths accepted:
* #/autoprocintegration/datacollection/:datacollectionId/main
* #/autoprocintegration/datacollection/:datacollectionId/files
* #/autoprocintegration/datacollection/:datacollectionId/phasingviewer/main
* @method init
*/
AutoprocIntegrationController.prototype.init = function() {
	var _this = this;
	var listView;	
    
	Path.map("#/autoprocintegration/datacollection/:datacollectionId/main").to(function() {
        EXI.hideNavigationPanel();
		var mainView = new AutoProcIntegrationMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['datacollectionId']);
	}).enter(this.setPageBackground);

	Path.map("#/autoprocintegration/datacollection/:datacollectionId/files").to(function() {
		_this.openFiles(this.params['datacollectionId']);
	}).enter(this.setPageBackground);

	Path.map("#/autoprocintegration/datacollection/:datacollectionId/phasingviewer/main").to(function() {
		var mainView = new PhasingViewerMainView();		
		EXI.addMainPanel(mainView);
		mainView.load(this.params['datacollectionId']);
	}).enter(this.setPageBackground);

};

/**
* This is the description for routing all the puck actions. It means url= #/mx/datacollection/*
*
* @class BeamlineParameterController
* @constructor
*/
function BeamlineParameterController() {
	this.init();
}

BeamlineParameterController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
BeamlineParameterController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the puck related objects
* Paths accepted:
* #/mx/datacollection/protein_acronym/:acronmys/main
* #/mx/datacollection/session/:sessionId/main
*
* @method init
*/
BeamlineParameterController.prototype.init = function() {
	var _this = this;
	var listView;	

	
                
	Path.map("#/mx/beamlineparameter/datacollection/:dataCollectionId/main").to(function() {
        
		var mainView = new BeamlineParameterMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['dataCollectionId']);

	}).enter(this.setPageBackground);
};

/**
* This is the description for routing all the crystal actions. It means url= #/crystal/*
*
* @class CrystalController
* @constructor
*/
function CrystalController() {
	this.init();
}

CrystalController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
CrystalController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the crystal related objects
* Paths accepted:
* #/crystal/nav
* #/mx/crystal/:crystalId/main
*
* @method init
*/
CrystalController.prototype.init = function() {
	var _this = this;
	var listView;	

	Path.map("#/crystal/nav").to(function() {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new CrystalListView();
			listView.onSelect.attach(function(sender, selected) {	
				location.hash = "/mx/crystal/" + selected[0].crystalId + "/main";
			});

			EXI.addNavigationPanel(listView);
			var onSuccess = function(sender, crystals) {
				listView.load(crystals);
				EXI.setLoadingNavigationPanel(false);
			};
			EXI.getDataAdapter({onSuccess : onSuccess}).mx.crystal.getCrystalsByProposalId();
	}).enter(this.setPageBackground);

	Path.map("#/mx/crystal/:crystalId/main").to(function() {
		var mainView = new CrystalMainView();
		EXI.addMainPanel(mainView);
		EXI.setLoadingMainPanel(true);
		var onSuccess = function(sender, crystal){
			mainView.load(crystal);
			EXI.setLoadingMainPanel(false);
			
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).mx.crystal.getCrystalById(this.params['crystalId']);

	}).enter(this.setPageBackground);
};

/**
* This is the description for routing all the crystal actions. It means url= #/mx/image/*
*
* @class ImageController
* @constructor
*/
function ImageController() {
	this.init();
}

ImageController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
ImageController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the crystal related objects
* Paths accepted:
* #/mx/image/:imageId/main
*
* @method init
*/
ImageController.prototype.init = function() {
	var _this = this;
	/*var listView;	

	Path.map("#/mx/image/:imageId/main").to(function() {
		var mainView = new ImageMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['imageId']);

	}).enter(this.setPageBackground);*/
};

/**
* This is the description for routing all the puck actions. It means url= #/mx/datacollection/*
*
* @class MxDataCollectionController
* @constructor
*/
function MxDataCollectionController() {
	this.init();
}

MxDataCollectionController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
MxDataCollectionController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the puck related objects
* Paths accepted:
* #/mx/datacollection/protein_acronym/:acronmys/main
* #/mx/datacollection/session/:sessionId/main
*
* @method init
*/
MxDataCollectionController.prototype.init = function() {
	var _this = this;
	var listView;	

	Path.map("#/mx/datacollection/protein_acronym/:acronmys/main").to(function() {
		var mainView = new DataCollectionMxMainView();
		EXI.addMainPanel(mainView);
        EXI.hideNavigationPanel();
		var onSuccess = function(sender, data){
			mainView.loadCollections(data);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).mx.dataCollection.getByAcronymList(this.params['acronmys']);
	}).enter(this.setPageBackground);
    
	Path.map("#/mx/datacollection/session/:sessionId/main").to(function() {
		var mainView = new DataCollectionMxMainView();
		EXI.addMainPanel(mainView);
        EXI.hideNavigationPanel();
		EXI.setLoadingMainPanel(true);
		var onSuccess = function(sender, data){
		    mainView.loadCollections(data);
			EXI.setLoadingMainPanel(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).mx.dataCollection.getDataCollectionViewBySessionId(this.params['sessionId']);


		var onSuccessEnergy = function(sender, data){
			mainView.loadEnergyScans(data);
			
		};
		/** retrieving energy scans */
		EXI.getDataAdapter({onSuccess : onSuccessEnergy}).mx.energyscan.getEnergyScanListBySessionId(this.params['sessionId']);

		var onSuccessXFE = function(sender, data){
			mainView.loadFXEScans(data);
			
		};
		/** retrieving XFE scans */
		EXI.getDataAdapter({onSuccess : onSuccessXFE}).mx.xfescan.getXFEScanListBySessionId(this.params['sessionId']);
        
	}).enter(this.setPageBackground);
	
	Path.map("#/mx/datacollection/:dataCollectionId/image/:imageId/main").to(function() {
		var mainView = new ImageMainView();
        EXI.hideNavigationPanel();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['imageId'], this.params['dataCollectionId']);
	}).enter(this.setPageBackground);
};

/**
* This is the description for routing all the puck actions. It means url= #/mx/prepare/*
*
* @class MxPrepare
* @constructor
*/
function MxPrepare() {
	this.init();
}

MxPrepare.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
MxPrepare.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the preparation related objects
* Paths accepted:
* #/mx/prepare/:dewarIds/main
* #/mx/prepare/main
*
* @method init
*/
MxPrepare.prototype.init = function() {
	var _this = this;
	var listView;	

	Path.map("#/mx/prepare/main").to(function() {
		EXI.clearNavigationPanel();
	    var mainView = new PrepareMainView();
		EXI.addMainPanel(mainView);
	    mainView.load();
	}).enter(this.setPageBackground);

	Path.map("#/mx/prepare/:dewarIds/main").to(function() {
		var mainView = new PrepareMainView();
		var ids = this.params['dewarIds'].split(",");
		EXI.addMainPanel(mainView);
		EXI.setLoadingMainPanel();
		var onSuccessProposal = function(sender, dewars) {
			var filtered = [];
			for(var i = 0; i< ids.length; i++){
				filtered.push(_.find(dewars, {dewarId : Number(ids[i]) }));
			}
			EXI.setLoadingMainPanel(false);
			mainView.load(filtered);
			EXI.setLoadingNavigationPanel(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccessProposal}).proposal.dewar.getDewarsByProposal();
	}).enter(this.setPageBackground);
	
};
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

PhasingController.prototype.getChilds = function(node, data) {
    /** Looking for children */   
    var children = _.filter(data, function(b){ return b.previousPhasingStepId == node.phasingStepId;});
    for(var i =0; i < children.length; i++){
        children[i].children = this.getChilds(children[i], data);
    }
    return children;
};

PhasingController.prototype.tableToTree = function(data, phasingStepId) {
    var parents = _.filter(data, function(b){ return b.previousPhasingStepId == null;});

        
    for(var i =0; i < parents.length; i++){    
        parents[i].children = this.getChilds(parents[i], data);    
    }
    
    if (phasingStepId){
        parents = _.filter(parents, function(b){return b.phasingStepId == phasingStepId; });
    }
    return (parents);
    
};

/**
* Inits the controller for the PhasingController related objects
* Paths accepted:
* #/phasing/autoprocintegrationId/:autoprocintegrationId/main
* @method init
*/
PhasingController.prototype.init = function() {
	var _this = this;
	this.phasingSteps = [];

    function openNav(autoprocintegrationId){
            var listView = new PhasingListView();
			

			EXI.addNavigationPanel(listView);
			var onSuccess = function(sender, data) {
				 var tree = _this.tableToTree(_.flatten(data));               
                EXI.setLoadingNavigationPanel(false);
	            listView.load(tree);
			};
			EXI.getDataAdapter({onSuccess : onSuccess}).mx.phasing.getPhasingViewByAutoProcIntegrationId(autoprocintegrationId);
            return listView;
    }
    
	Path.map("#/phasing/autoprocintegrationId/:autoprocintegrationId/main").to(function() {
        var autoprocintegrationId = this.params['autoprocintegrationId'];
        
        EXI.clearNavigationPanel();
        /** Loading Main Panel */
		var mainView = new PhasingViewerMainView();
        
        /** Attaching events from listview */
        var listView = openNav(autoprocintegrationId);
        listView.onSelect.attach(function(sender, selected) {
				if (selected.length == 0){
                    mainView.load(_this.phasingSteps);
                }
                else{                    
                 
                    mainView.load(_this.phasingSteps, selected[0].prepare.phasingStepId);
                }
	    });
        
		EXI.addMainPanel(mainView);
        EXI.setLoadingMainPanel();
        var onSuccess = function(sender, data){
            _this.phasingSteps =   _.flatten(data);             
            EXI.setLoadingMainPanel(false);            
            mainView.load( _this.phasingSteps);//, _this.tableToTree(_.flatten(_.clone(data))));
	        //mainView.load(_.clone(data), _this.tableToTree(_.flatten(_.clone(data))));
	    };
    
	    EXI.getDataAdapter({onSuccess : onSuccess}).mx.phasing.getPhasingViewByAutoProcIntegrationId(autoprocintegrationId);
	
    
    
		
	}).enter(this.setPageBackground);

    /*
    Path.map("#/phasing/autoprocintegrationId/:autoprocintegrationId/nav").to(function() {
		  OpenNav(this.params['autoprocintegrationId']);
	}).enter(this.setPageBackground);
    */
    //http://lindemaria:8082/EXI/mx/dev.html#/phasing/autoprocintegrationId/1187809/main
};

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

/**
* This is the description for routing all the puck actions. It means url= #/puck/*
*
* @class PuckController
* @constructor
*/
function PuckController() {
	this.init();
}

PuckController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
PuckController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the puck related objects
* Paths accepted:
* #/puck/nav
* #/mx/puck/:containerId/main
* #/mx/puck/add
*
* @method init
*/
PuckController.prototype.init = function() {
	var _this = this;
	var listView;	

	Path.map("#/puck/nav").to(function() {
			EXI.addMainPanel(new PuckWelcomeMainView());
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new PuckListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/mx/puck/" + selected[0].Container_containerId+ "/main";
			});

			EXI.addNavigationPanel(listView);
			var onSuccessProposal = function(sender, pucks) {
				listView.load(pucks.slice(0, 100));
				EXI.setLoadingNavigationPanel(false);
			};
			EXI.getDataAdapter({onSuccess : onSuccessProposal}).proposal.proposal.getDewarByProposalId();
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
		};
		EXI.getDataAdapter({onSuccess: onSuccess}).proposal.shipping.getContainerById(this.params['containerId'],this.params['containerId'],this.params['containerId']);
		
	}).enter(this.setPageBackground);

	Path.map("#/mx/puck/add").to(function() {
		var mainView = new PuckMainView();
		EXI.addMainPanel(mainView);
		var emptyPuck = {"containerId":"","code":null,"containerType":"Puck","capacity":16,"beamlineLocation":null,"sampleChangerLocation":null,"containerStatus":null,"timeStamp":"Jan 15, 2016 2:29:39 PM","sampleVOs":[]};
		mainView.load(emptyPuck);
	}).enter(this.setPageBackground);
};

/**
* This is the description for routing all the crystal actions. It means url= #/workflow/*
*
* @class WorkflowController
* @constructor
*/
function WorkflowController() {
	this.init();
}

WorkflowController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
WorkflowController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the crystal related objects
* Paths accepted:
* #/crystal/nav
* #/mx/crystal/:crystalId/main
*
* @method init
*/
WorkflowController.prototype.init = function() {
	var _this = this;
	var listView;	

	Path.map("#/mx/workflow/step/:workflowStepIdList/main").to(function() {
		EXI.clearNavigationPanel();
		EXI.setLoadingNavigationPanel(true);
		listView = new WorkflowStepListView();
		listView.onSelect.attach(function(sender, selected) {
			if (selected != null){
				mainView.load(selected[0]);
			}
		});
		EXI.addNavigationPanel(listView);    

		var mainView = new WorkflowStepMainView();
		EXI.addMainPanel(mainView);
		var onSuccess = function(sender, data){
			listView.load(JSON.parse(data));
			EXI.setLoadingNavigationPanel(false);
		};

		EXI.getDataAdapter({onSuccess : onSuccess}).mx.workflowstep.getWorkflowstepByIdList(this.params['workflowStepIdList']);
	}).enter(this.setPageBackground);
};

/**
* This is the description for routing all the crystal actions. It means url= #/crystal/*
*
* @class XfeController
* @constructor
*/
function XfeController() {
	this.init();
}

XfeController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
XfeController.prototype.notFound = ExiGenericController.prototype.notFound;

/**
* Inits the controller for the crystal related objects
* Paths accepted:
* #/crystal/nav
* #/mx/crystal/:crystalId/main
*
* @method init
*/
XfeController.prototype.init = function() {
	var _this = this;
	var listView;	

	

	Path.map("#/mx/xfe/:xfeFluorescenceSpectrumId/main").to(function() {
		var mainView = new XfeViewerMainView();
		EXI.addMainPanel(mainView);

		mainView.load(this.params['xfeFluorescenceSpectrumId']);

	}).enter(this.setPageBackground);
};

function ExiMX() {
	 Exi.call(this, {
		 					menu: new MXMainMenu(),
		 					anonymousMenu: new MainMenu(),
		 					controllers : [
									
									new SessionController(), 
									new SAXSExiController(), 
									new OfflineExiController(), 
									new ProposalExiController(), 
									new LabContactExiController(),
									new PuckController(),
									new CrystalController(),
									new ProteinController(),
									new AutoprocIntegrationController(),
									new MxDataCollectionController(),
									new WorkflowController(),
									new MxPrepare(),
									new ImageController(),
                                    new PhasingController(),
                                    new XfeController(),
                                    new BeamlineParameterController()
							],
		 					headerCssClass : 'mxTitlePanel'

	 });
}

ExiMX.prototype.loadSelected = Exi.prototype.loadSelected;
ExiMX.prototype.addMainPanel = Exi.prototype.addMainPanel;
ExiMX.prototype.getSelectedDataCollections = Exi.prototype.getSelectedDataCollections;
ExiMX.prototype.addNavigationPanel = Exi.prototype.addNavigationPanel;
ExiMX.prototype.clearNavigationPanel = Exi.prototype.clearNavigationPanel;
ExiMX.prototype.clearMainPanel = Exi.prototype.clearMainPanel;
ExiMX.prototype.setLoadingNavigationPanel = Exi.prototype.setLoadingNavigationPanel;
ExiMX.prototype.setLoadingMainPanel = Exi.prototype.setLoadingMainPanel;
ExiMX.prototype.setError = Exi.prototype.setError;
ExiMX.prototype.setLoading = Exi.prototype.setLoading;
ExiMX.prototype.show = Exi.prototype.show;
ExiMX.prototype.setAnonymousMenu = Exi.prototype.setAnonymousMenu;
ExiMX.prototype.setUserMenu = Exi.prototype.setUserMenu;
ExiMX.prototype.appendDataAdapterParameters = Exi.prototype.appendDataAdapterParameters;
ExiMX.prototype.hideNavigationPanel = Exi.prototype.hideNavigationPanel;
ExiMX.prototype.showNavigationPanel = Exi.prototype.showNavigationPanel;
 


ExiMX.prototype.getHeader = function(){
    var html = "";
    var data = {
        version         : ExtISPyB.version,
        release_date    : ExtISPyB.release_date
       
        
    };
    dust.render("mxheader", data, function(err, out){
		html = out;
     });
    return html;
	
};

ExiMX.prototype.getDataAdapter = function(args){
	return  new MxDataAdapterFactory(this.appendDataAdapterParameters(args));
};


function MXMainMenu() {
	this.id = BUI.id();
	 MainMenu.call(this, {cssClass : 'mxMainMenu'});
}

MXMainMenu.prototype.populateCredentialsMenu = MainMenu.prototype.populateCredentialsMenu;
MXMainMenu.prototype.init = MainMenu.prototype.init;
MXMainMenu.prototype.getPanel = MainMenu.prototype.getPanel;
MXMainMenu.prototype._convertToHTMLWhiteSpan = MainMenu.prototype._convertToHTMLWhiteSpan;
MXMainMenu.prototype.getAddCredentialMenu = MainMenu.prototype.getAddCredentialMenu;
MXMainMenu.prototype.getLoginButton = MainMenu.prototype.getLoginButton;
MXMainMenu.prototype.setText = MainMenu.prototype.setText;
MXMainMenu.prototype.getHomeItem = MainMenu.prototype.getHomeItem;
MXMainMenu.prototype.getHelpMenu = MainMenu.prototype.getHelpMenu;
MXMainMenu.prototype.getShipmentItem = MainMenu.prototype.getShipmentItem;

MXMainMenu.prototype.getMenuItems = function() {
	return [
		this.getHomeItem(),
		this.getShipmentItem(),
		{
                text : this._convertToHTMLWhiteSpan("Proteins and Crystals"),
                cls : 'ExiSAXSMenuToolBar',
                disabled : true,
                menu : this.getProteinCrystalsMenu() 
	    	},
	    	{
                text : this._convertToHTMLWhiteSpan("Prepare Experiment"),
                cls : 'ExiSAXSMenuToolBar',
                disabled : false,
                handler : function(){
                    location.hash = "/mx/prepare/main";
                }
	    	},
        	{
			text : this._convertToHTMLWhiteSpan("Data Explorer"),
			cls : 'ExiSAXSMenuToolBar',
			menu : this.getDataExplorerMenu() 
		},
		{
			text : this._convertToHTMLWhiteSpan("Offline Data Analysis"),
			cls : 'ExiSAXSMenuToolBar',
            disabled : false,
			menu : this.getOnlineDataAnalisysMenu() 
		}, 
		{
			text : this._convertToHTMLWhiteSpan("Help"),
			cls : 'ExiSAXSMenuToolBar',
             disabled : true,
			menu : this.getHelpMenu() 
		}, 
		'->',
		{
			xtype : 'textfield',
			name : 'field1',
			value : '',
			emptyText : 'search by protein acronym',
			listeners : {
				specialkey : function(field, e) {
					if (e.getKey() == e.ENTER) {
						location.hash = "/mx/datacollection/protein_acronym/" + field.getValue() + "/main";
					}
				} 
			} 
		}
	];
};



MXMainMenu.prototype.getOnlineDataAnalisysMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Dimple") {
			location.hash = "/tool/dimple/main";
		}
		if (item.text == "Job list") {
			location.hash = "/tool/list";
		}
	}

	return Ext.create('Ext.menu.Menu', {
		items : [
//		{
//		    text: 'Radio Options',
//		    menu: {        // <-- submenu by nested config object
//		        items: [
//		            // stick any markup in a menu
//		            '<b class="menu-title">Choose a Theme</b>',
//		            {
//		                text: 'Aero Glass',
//		                checked: true,
//		                group: 'theme',
//		                checkHandler: onItemCheck
//		            }, {
//		                text: 'Vista Black',
//		                checked: false,
//		                group: 'theme',
//		                checkHandler: onItemCheck
//		            }, {
//		                text: 'Gray Theme',
//		                checked: false,
//		                group: 'theme',
//		                checkHandler: onItemCheck
//		            }, {
//		                text: 'Default Theme',
//		                checked: false,
//		                group: 'theme',
//		                checkHandler: onItemCheck
//		            }
//		        ]
//		    }
//		},
		{
			text : 'Dimple',
			checked : false,
			group : 'theme',
			handler : onItemCheck },
			"-",
			{
				text : 'Job list',
				checked : false,
				group : 'theme',
				handler : onItemCheck }
		] });
};
 

MXMainMenu.prototype.getProteinCrystalsMenu = function() {
	function onItemCheck(item, checked) {
		if (item.text == "My Crystals") {
			location.hash = "/crystal/nav";
		}
		if (item.text == "My Proteins") {
			location.hash = "/protein/nav";
		}
		if (item.text == "Puck") {
			location.hash = "/puck/nav";
		}
	}
	return Ext.create('Ext.menu.Menu', {
		items : [ 
			{
				text : 'My Crystals',
				icon : '../images/icon/macromolecule.png',
				handler : onItemCheck 
			},
			{
				text : 'My Proteins',
				icon : '../images/icon/testtube.png',
				handler : onItemCheck 
			},
			{
				text : 'Puck',
				icon : '../images/icon/testtube.png',
				handler : onItemCheck 
			}
		] 
	});
};

MXMainMenu.prototype.getDataExplorerMenu = function() {
	function onItemCheck(item, checked) {
		if (item.text == "Calendar") {
			location.hash = "/session/nav";
		}
		if (item.text == "Experiments") {
			location.hash = "/experiment/nav";
		}
	}
	return Ext.create('Ext.menu.Menu', {
		items : [ 
			{
				text : 'Calendar',
				icon : '../images/icon/sessions.png',
				handler : onItemCheck 
			}
		] 
	});
};


/**
* CrystalListView displays the crystal as list on the navigation panels
*
* @class PuckListView
* @constructor
*/
function CrystalListView(){
	ListView.call(this);
}


CrystalListView.prototype.getPanel = ListView.prototype.getPanel;
CrystalListView.prototype.load = ListView.prototype.load;
CrystalListView.prototype.getFilter = ListView.prototype.getFilter;
CrystalListView.prototype.getFields = ListView.prototype.getFields;
CrystalListView.prototype.getColumns = ListView.prototype.getColumns;


CrystalListView.prototype.getRow = function(record){
	var html = "";
	dust.render("crystal.listview", record.data, function(err, out){
        	html = out;
     	});
	return html;
};



/**
* DewarListView displays the dewars as list on the navigation panels
*
* @class DewarListView
* @constructor
*/
function DewarListView(){
	this.title = "Dewars";
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}


DewarListView.prototype.getPanel = ListView.prototype.getPanel;
DewarListView.prototype.load = ListView.prototype.load;
DewarListView.prototype.getFields = ListView.prototype.getFields;
DewarListView.prototype.getColumns = ListView.prototype.getColumns;

/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
DewarListView.prototype.getRow = function(record){
    var html = "";
    dust.render("dewarlistview", record.data, function(err, out){
        html = out;
     });
    return html;
};


/**
* PhasingListView displays the phasing steps as list on the navigation panels
*
* @class PhasingListView
* @constructor
*/
function PhasingListView(){
	this.title = "Space Groups";
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}


PhasingListView.prototype.getPanel = ListView.prototype.getPanel;
PhasingListView.prototype.load = ListView.prototype.load;
PhasingListView.prototype.getFields = ListView.prototype.getFields;
PhasingListView.prototype.getColumns = ListView.prototype.getColumns;
PhasingListView.prototype.getFilter = ListView.prototype.getFilter;
/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
PhasingListView.prototype.getRow = function(record){
    
    
    var html = "";
    dust.render("phasinglistview", record.data, function(err, out){
        html = out;
     }); 
    return html;
};

PhasingListView.prototype.analysizeStep = function(step){
        console.log(step);
        return {
            type : step.phasingStepType
            
        };
};


PhasingListView.prototype.parsePrepareNode = function(node){
    
    return  {
                    type : "PREPARE",
                    spaceGroupShortName : node.spaceGroupShortName,
                    spaceGroup          : node.spaceGroup,
                    status              : "Success" ,
                    phasingStepId       : node.phasingStepId
                     
                };
};

PhasingListView.prototype.parseSubstructureNode = function(node){
   if (node){
       if (node.children){
            var status = "Failure";
            if (node.children.length > 0){
                status = "Success";                
            }
            
             if (node.children.length == 0){
                status = "Not found";                
            }
            
            return  {
                    type : "SUBS. DETERMINATION",
                    spaceGroupShortName : node.spaceGroupShortName,
                    spaceGroup          : node.spaceGroup,  
                    runs                : node.children.length,
                    status              : status  
                };
       }
   }
};


PhasingListView.prototype.getSubstructureStep = function(node){
     if (node){
       if (node.children){
          return node.children;
       }
   }
   return [];
};

PhasingListView.prototype.getPhasingSteps = function(node){
    var phasing = [];
     if (node){
      var subtructures = this.getSubstructureStep(node);
     
      for(var i = 0; i < subtructures.length; i++){
         
          phasing = _.concat(phasing, subtructures[i].children);
      }
   }
   return phasing;
};

PhasingListView.prototype.getModelSteps = function(node){
    var models = [];
   var phasingSteps = this.getPhasingSteps(node); 
  
   for(var i = 0; i < phasingSteps.length; i++){
        if (phasingSteps[i].children){ 
            models = _.concat(models, phasingSteps[i].children);    
        }
   } 
   return models;
};

PhasingListView.prototype.decideGoodStatus = function(metrics, stats){
    var ccPartial = false;
    var pseudo = false;
         
    for(var i =0; i< metrics.length; i++){     
        if (metrics[i].indexOf("CC of partial") != -1){
            if (Number(stats[i]) > 24){
                ccPartial = true;                
            }
        }  
        
         if (metrics[i].indexOf("Pseudo_free_CC") != -1){
            if (Number(stats[i]) > 65){
                
                pseudo = true;
            }
        } 
        
    }
    
    if (pseudo && ccPartial){
            return 1;
    } 
        
    return 0;
};

PhasingListView.prototype.analizePhasingNodes = function(phasingNodes){
    var records = {
      withStatistics : 0,
      withoutStatistics : 0,
      successCondition : 0  
        
        
    };
    for(var i = 0; i < phasingNodes.length; i++){
     
        if (phasingNodes[i].statisticsValue != null){
            records.withStatistics = records.withStatistics + 1;
            /** Parsing status */
            try{
            
                var statistics = phasingNodes[i].statisticsValue.split(",");
                var metrics = phasingNodes[i].metric.split(",");
                
                records.successCondition = records.successCondition + this.decideGoodStatus(metrics, statistics);
             
            }
            catch(e){
                
                console.log(e);
            }
        }
        else{
             records.withoutStatistics = records.withoutStatistics + 1;
        }
       
        
    }
    return records;
};
PhasingListView.prototype.parsePhasingNode = function(node){
   if (node){
       if (node.children){
           
           var phasingSteps = this.getPhasingSteps(node); 
           
            var status = "Failure";
            if (phasingSteps.length > 0){
                status = "Success";                
            }
            
             if (phasingSteps.length == 0){
                status = "Not found";                
            }
                    
            return  {
                    type : "PHASING",
                    runs                : phasingSteps.length ,
                    status              : status,
                    stats              : this.analizePhasingNodes(phasingSteps)
                };
       }
   }
};

PhasingListView.prototype.parseModelNode = function(node){
    
    var models = this.getModelSteps(node);   
    
     var status = "Failure";
    if (models.length > 0){
        status = "Success";                
    }
    
        if (models.length == 0){
        status = "Not found";                
    }
                   
    return  {
            type : "MODEL BUILDING",
            //spaceGroupShortName : node.spaceGroupShortName,
            // spaceGroup          : node.spaceGroup,  
            runs                : models.length ,
             status              : status
        };
     
   
};


PhasingListView.prototype.formatData = function(data){
    
   
    var records = [];
    if (data){
        for(var i =0; i < data.length; i++){
            
            records.push({
                prepare        : this.parsePrepareNode(data[i]),
                substructure   : this.parseSubstructureNode(data[i]), 
                phasing        : this.parsePhasingNode(data[i]), 
                models         : this.parseModelNode(data[i]),   
            });
            
        }
    
    }
    return records;
};
function ProteinListView(){
	ListView.call(this);
}

ProteinListView.prototype.getPanel = ListView.prototype.getPanel;
ProteinListView.prototype.load = ListView.prototype.load;


ProteinListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
		html = html + "<tr><td>Acronym:</td><td style='color:#207a7a;font-weight:bold;'>" + record.data.acronym+ "</td></tr>";
		html = html + "<tr><td>Name:</td><td>" + record.data.name+ "</td></tr>";
	return html + "</table>";
};

ProteinListView.prototype.getFilter = function(value){
	return [{property : "acronym", value : value, anyMacth : true}];
};

ProteinListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Proteins',  flex: 1, dataIndex: 'bufferId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

ProteinListView.prototype.getFields = function(){
	return  ['acronym', 'name'];
};


/**
* PuckListView displays the pucks as list on the navigation panels
*
* @class PuckListView
* @constructor
*/
function PuckListView(){
	this.title = "Pucks";
	this.sorters = [{property : 'sessionId', direction: 'DESC'}];
	ListView.call(this);
}

PuckListView.prototype.getPanel = ListView.prototype.getPanel;
PuckListView.prototype.load = ListView.prototype.load;
PuckListView.prototype.getFilter = ListView.prototype.getFilter;
PuckListView.prototype.getFields = ListView.prototype.getFields;
PuckListView.prototype.getColumns = ListView.prototype.getColumns;

/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
PuckListView.prototype.getRow = function(record){
	var html = "";
	dust.render("puck.listview", record.data, function(err, out){
        	html = out;
     	});
	return html;
};






function WorkflowStepListView(){
	ListView.call(this);
}

WorkflowStepListView.prototype.getPanel = ListView.prototype.getPanel;
WorkflowStepListView.prototype.load = ListView.prototype.load;


WorkflowStepListView.prototype.getRow = function(record){
    var html = "";
    record.data.imageURL = EXI.getDataAdapter().mx.workflowstep.getImageByWorkflowStepId(record.data.workflowStepId);
    dust.render("workflowstepmain_steps", record.data, function(err, out){
		html = out;
     });
     return html;

};

WorkflowStepListView.prototype.getFilter = function(value){
	return [{property : "acronym", value : value, anyMacth : true}];
};

WorkflowStepListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Workflows',  flex: 1, dataIndex: 'bufferId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

WorkflowStepListView.prototype.getFields = function(){
	return  ['acronym', 'name'];
};


/**
* Main view for autoprocessing. It displays a grid with a summary of the information of autoprocessing and phasing
* On the right it displays a panel with the plots: completeness, rfacor, cc2, etc.. as well as the list of attachments
*
* @class AutoProcIntegrationMainView
* @constructor
*/
function AutoProcIntegrationMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	var _this = this;
	
     _this.programAttachments = [];
     _this.programAttachmentsAutoProcProgramIds = [];
	
	this.slaveWidth = 450;
	
	this.autoProcIntegrationGrid = new AutoProcIntegrationGrid();
	
	this.autoProcIntegrationGrid.onSelected.attach(function(sender, records){
		var ids = [];        
		for (var i = 0; i < records.length; i++) {
			ids.push(records[i].v_datacollection_summary_phasing_autoProcIntegrationId);
		}		
		/** Loading plots **/
		try{
			_this.loadPlots(ids);
		}
		catch(e){
            console.log("Error loading plots");    
        }	
        	
		/** Loading attachments **/
		if (records.length == 1){                                                                                     
			var record = _this.getByAutoProcId(records[0].v_datacollection_summary_phasing_autoproc_autoprocId);
			if (record != null){
				_this.autoProcIntegrationAttachmentGrid.load(_this.programAttachments[_.findIndex(_this.programAttachmentsAutoProcProgramIds, function(o) { return o == records[0].v_datacollection_summary_phasing_autoProcProgramId; })]);
			}
		}		
		
		/** Loading phasing network **/
		var tmp = [].concat.apply([], _this.autoProcIntegrationPhasingViewList);
		var filtered = [];
		for ( i = 0; i < tmp.length; i++) {
			if ( tmp[i].v_datacollection_summary_phasing_autoProcIntegrationId == records[0].v_datacollection_summary_phasing_autoProcIntegrationId){
				filtered.push( tmp[i]);
			}
		}		
	});
	
	this.autoProcIntegrationAttachmentGrid = new AutoProcIntegrationAttachmentGrid({
																					width : this.slaveWidth, 
																					margin: 5
																					
	});
	
	/** Netowkrwidget for phasing **/
	//this.phasingNetworkWidget = new PhasingNetworkWidget({tbar : "OPEN_VIEWER"});
	
	/** Curve completenessPlotter * */
	this.completenessPlotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "Completeness vs Resolution",
		legend : 'never'
	});
	
	this.completenessPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.rFactorPlotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "Rfactor vs Resolution",
		legend : 'never'
	});
	
	this.rFactorPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.isigmaPlotter = new AutoProcIntegrationCurvePlotter({
		height :250,
		title : "I/SigmaI vs Resolution",
		legend : 'never'
	});

	this.isigmaPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.cc2Plotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "CC/2 vs Resolution",
		legend : 'never'
	});
	
	this.cc2Plotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.sigmaAnnoPlotter = new AutoProcIntegrationCurvePlotter({
		height :250,
		title : "SigAno vs Resolution",
		legend : 'never'
	});
	
	this.sigmaAnnoPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.wilsonPlotter = new AutoProcIntegrationCurvePlotter({
		height : 250,
		title : "Wilson Plot",
		legend : 'never'
	});
	
	this.wilsonPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
	this.annoCorrPlotter = new AutoProcIntegrationCurvePlotter({
		height : 300,
		title : "Anom Corr vs Resolution",
		legend : 'never'
	});

	this.annoCorrPlotter.onPointClickCallback.attach(function(sender, id){
		_this.onPlotClicked(id);
	});
	
};

AutoProcIntegrationMainView.prototype.getPanel = MainView.prototype.getPanel;

AutoProcIntegrationMainView.prototype.getByAutoProcId = function(autoProcId) {
	for (var i = 0; i < this.data.length; i++) {
				if (this.data[i].v_datacollection_summary_phasing_autoproc_autoprocId == autoProcId){
					return this.data[i];
				} 
	}
};

/**
* It retrieves the AutoprocIntegrationId of a given autoProcProgramAttachmentId
* @method getAutoprocIntegrationIdByautoProcProgramAttachmentId
*/
AutoProcIntegrationMainView.prototype.getAutoprocIntegrationIdByautoProcProgramAttachmentId = function(autoProcProgramAttachmentId) {
    var _this = this;
    var autoProcAttachment = _.find(_.flatten(this.programAttachments), function(o){return o.autoProcProgramAttachmentId == autoProcProgramAttachmentId;});
     
    var fnEqualAutoProcProgramAttachmentId = function(o){return o.autoProcProgramAttachmentId == autoProcProgramAttachmentId;};
    var fnEqualautoProcProgramId = function(o){return o.v_datacollection_summary_phasing_autoProcProgramId == _this.programAttachmentsAutoProcProgramIds[i];};
    for (var i = 0; i < this.programAttachments.length; i++){
        var autoprocProgram = _.find(this.programAttachments[i], fnEqualAutoProcProgramAttachmentId);
        if (autoprocProgram != null){
               return _.find(this.data, fnEqualautoProcProgramId);
        }        
    }
};

/**
* It selects the row on the grid which autprocProgramAttachmedId is given
* @method onPlotClicked
*/
AutoProcIntegrationMainView.prototype.onPlotClicked = function(autoProcProgramAttachmentId) {    
   var autoProcIntegration = this.getAutoprocIntegrationIdByautoProcProgramAttachmentId(autoProcProgramAttachmentId);
   if (autoProcIntegration){
        this.autoProcIntegrationGrid.selectRowByAutoProcIntegrationId(autoProcIntegration.v_datacollection_summary_phasing_autoProcIntegrationId);
   }
};

AutoProcIntegrationMainView.prototype.getPlotContainer = function(panel) {
	return {
            xtype : 'container',
            margin : 5,
            layout: 'fit',
            flex :1,
            items : [panel]	  
    };
};

AutoProcIntegrationMainView.prototype.createContainer = function(item) {
    return  Ext.create('Ext.container.Container', {
		        	 layout: 'hbox', 
		        	 margin : '0 50 0 0',
		        	 items : [
		        	          this.getPlotContainer(item)
		        	         
		        	 ]
    });
};

AutoProcIntegrationMainView.prototype.getAutoProcPanel = function() {
	return Ext.create('Ext.container.Container', {
		style:{ backgroundColor : '#FAFAFA'},
		items : [
                 this.createContainer(this.rFactorPlotter.getPanel()),
                 this.createContainer(this.isigmaPlotter.getPanel()),
                 this.createContainer(this.sigmaAnnoPlotter.getPanel()),
                 this.createContainer(this.completenessPlotter.getPanel()),
                 this.createContainer(this.annoCorrPlotter.getPanel()),
                 this.createContainer(this.cc2Plotter.getPanel())                  
		    ]
	});
};

AutoProcIntegrationMainView.prototype.getSlaveTabPanel = function() {
	return Ext.create('Ext.tab.Panel', {
		margin : '0 5 5 5',
		cls : 'border-grid',
		width : this.slaveWidth,      
	    items: [{
	        title: 'Autoprocessing Plots',
	        items :  this.getAutoProcPanel()
	     },       
         {
	        title: 'Files',
	        items : this.autoProcIntegrationAttachmentGrid.getPanel()
	    }	    	    
	    ]
	}); 
};

AutoProcIntegrationMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '10 30 10 10',
                 layout: 'hbox',
				items : [
                            this.autoProcIntegrationGrid.getPanel(),
                            this.getSlaveTabPanel()
				  ]
		});
};



AutoProcIntegrationMainView.prototype.loadPlots = function(autoProcIntegrationsIds) {
 	this.completenessPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCompleteness(autoProcIntegrationsIds.toString()));
	this.rFactorPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleRfactor(autoProcIntegrationsIds.toString()));
	this.isigmaPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleISigma(autoProcIntegrationsIds.toString()));
	this.cc2Plotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleCC2(autoProcIntegrationsIds.toString()));
	this.sigmaAnnoPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleSigmaAno(autoProcIntegrationsIds.toString()));
	this.annoCorrPlotter.loadUrl(EXI.getDataAdapter().mx.autoproc.getXScaleAnnoCorrection(autoProcIntegrationsIds.toString()));
};

/**
* It loads the list of attachments and stores them into two class variables:
* _this.programAttachmentsAutoProcProgramIds with the ids of the autoprocprograms
* _this.programAttachments with a list of attachments
* @method loadAttachments
*/
AutoProcIntegrationMainView.prototype.loadAttachments = function(autoProcessingIntegrationList) {
    var _this = this;
    
     /** Load view for attachments */
	var onSuccess = function(sender, data){
        _this.programAttachments = (data);
	};
    _this.programAttachmentsAutoProcProgramIds = _.map(autoProcessingIntegrationList, 'v_datacollection_summary_phasing_autoProcProgramId');
	EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getAttachmentListByautoProcProgramsIdList(_this.programAttachmentsAutoProcProgramIds);
};	

/**
* It loads autoproc.getViewByDataCollectionId from autoprocessingdataadapter and call to loadAttachments
* @method load
*/
AutoProcIntegrationMainView.prototype.load = function(dataCollectionId) {
	var _this = this;
	this.panel.setTitle("Autoprocessing");
	this.panel.setLoading("Generating plots");
	
	
    /** Load view for autoprocessing */
	var onSuccess2 = function(sender, data){
        _this.data = data[0];
        _this.panel.setLoading(false);
		_this.autoProcIntegrationGrid.load(_this.data);
        _this.loadAttachments(_this.data);
	};
	EXI.getDataAdapter({onSuccess : onSuccess2}).mx.autoproc.getViewByDataCollectionId(dataCollectionId);
};



function BeamlineParameterMainView() {
    this.icon = 'images/icon/ic_satellite_black_18dp.png';
    MainView.call(this);
    var _this = this;

    this.imageViewer = new ImageResolutionViewer();

    this.detectorResolution = {
        pixelSize: {
            x: 1475,
            y: 1679
        },
        sensitiveArea: {
            x: 253.7,
            y: 288.8
        },
        pixelSizeHorizontal: 0.172

    };

    this.resolutionScatteringImageViewer = new ResolutionScatteringImageViewer({
       width    : 400,
       height   :400 

    });
    
    
    this.resolutionScatteringImageViewer.onResolutionCalculated.attach(function(sender, resolution) {
        if (document.getElementById(_this.id + 'resolution')){
            document.getElementById(_this.id + 'resolution').innerHTML =  Math.round(resolution * 100) / 100 + " &#8491;";
        }
        else{
            document.title = resolution
        }
    });
    
}

BeamlineParameterMainView.prototype.getPanel = MainView.prototype.getPanel;

BeamlineParameterMainView.prototype.getContainer = function() {
    return Ext.create('Ext.panel.Panel', 
                    {
                    xtype : 'container',
                    layout : 'hbox',
                    items : [
                                {
                                    xtype : 'container',
                                    layout : 'vbox',
                                    height : 800,
                                    items : [
                                                {
                                                    html: this.resolutionScatteringImageViewer.getPanel(),
                                                    margin: '10 0 0 5',                                            
                                                    autoScroll : true
                                                },
                                                {
                                                    html:  "<table style='width:400px;'><tr><td style='width:30px;'>Resolution</td><td style='font-size:15px;' class='datacollection_parameter_name' id='" + this.id + "resolution' >Select point on Image</td></tr></table",
                                                    margin: '10 0 0 5',                                            
                                                    flex : 1,
                                                    height : 50,
                                                    autoScroll : true
                                                }
                                            ] 
                                },       
                                {
                                    html: "<div  id='" + this.id + "detector' ></div>",
                                    height : '100%',
                                    margin : '10 0 0 20',
                                    autoScroll : true,
                                    flex : 0.4
                                }
                            ]                            
                    }                                                                                   
    );        
                
   
};




BeamlineParameterMainView.prototype.load = function(dataCollectionId) {

    var _this = this;
    
    //debugger
    //var url = EXI.getDataAdapter().mx.dataCollection.getImageById(imageId);

    
    var onSuccess = function(sender, dataCollections) {
        if (dataCollections){
            if (dataCollections.length > 0){
                var dataCollection = dataCollections[0];
                
                _this.panel.setTitle(dataCollection.DataCollection_imagePrefix);
                /** Getting parameters **/
                var wavelength = dataCollection.DataCollection_wavelength;
                var detectorDistance = dataCollection.DataCollection_detectorDistance;
                var xBeam = dataCollection.DataCollection_xBeam;
                var yBeam = dataCollection.DataCollection_yBeam;

                
                 if (ExtISPyB.detectors[dataCollection.detectorModel] != null) {
                    _this.detectorResolution = ExtISPyB.detectors[dataCollection.detectorModel];
                }
                else {
                    alert("Not detector loaded");
                }
                               
                dust.render('beamlineparameter', dataCollection, function(err, out) {
                            document.getElementById(_this.id + "detector").innerHTML = out;
                });
                
                /** Image **/
                _this.resolutionScatteringImageViewer.load(dataCollection.lastImageId,  wavelength, xBeam, yBeam, detectorDistance,  _this.detectorResolution.sensitiveArea);                
            }
        }
       
    };
    EXI.getDataAdapter({ onSuccess: onSuccess }).mx.dataCollection.getByDataCollectionId(dataCollectionId);


};



function ImageMainView() {
    this.icon = 'images/icon/ic_satellite_black_18dp.png';
    MainView.call(this);
    var _this = this;

    this.imageViewer = new ImageResolutionViewer();

    this.detectorResolution = {
        pixelSize: {
            x: 1475,
            y: 1679
        },
        sensitiveArea: {
            x: 253.7,
            y: 288.8
        },
        pixelSizeHorizontal: 0.172

    };

    //this.surfaceScatteringViewer = new SurfaceScatteringViewer();

    this.imageViewer.onImageRendered.attach(function(sender, data) {
        //_this.surfaceScatteringViewer.load(data);

    });
    
    this.imageViewer.onMouseOver.attach(function(sender, point) {
    
    });
    
}

ImageMainView.prototype.getPanel = MainView.prototype.getPanel;

ImageMainView.prototype.getContainer = function() {
    return Ext.createWidget('tabpanel',
        {
            plain: true,
            margin: '10 30 10 10',
            items: [

                {
                    tabConfig: {
                        title: '2D'
                    },
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        paddding: 5,
                        style: {
                            borderColor: 'gray',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            'background-color': 'white'
                        },
                        items: [
                            this.imageViewer.getPanel(),
                            {

                                html: "<div id='" + this.id + "detector' ></div>",
                                margin: '0 0 0 5',
                                height: 800
                            }

                        ]
                    }
                    ]
                },
                /*{
                    tabConfig : {
                        title : '3D'
                    },
                    items : [ {
                        xtype : 'container',
                        layout : 'hbox',
                        style : {
                            borderColor : 'gray',
                            borderStyle : 'solid',
                            borderWidth : '1px',
                            'background-color' : 'white' 
                        },
                        items : [ 
                            this.surfaceScatteringViewer.getPanel()
                        	
                        ]
                    }
                    ]
                    },
                {
                    tabConfig : {
                        title : 'Parameters'
                    },
                    items : [ {
                        xtype : 'container',
                        layout : 'fit',
                        style : {
                            borderColor : 'gray',
                            borderStyle : 'solid',
                            borderWidth : '1px',
                            'background-color' : 'white' 
                        },
                        items : [ 
                            this.getParametersGrid()
                        ]
                    }
                    ]
                    }*/




            ]
        });
};



/*MainView.prototype.getParametersGrid = function(imageId, dataCollectionId) {
	this.storeParameters = Ext.create('Ext.data.Store', {
	    fields:['key', 'value'],
            sorters : 'key'
	});

	this.parametersPanel = Ext.create('Ext.grid.Panel', {
	    title: 'Parameters',
	    store: this.storeParameters,
	    columns: [
		{ text: 'Key',  dataIndex: 'key', flex: 0.2 },
		{ text: 'Value', dataIndex: 'value', flex: 1 }
	    ],
	    height: 800,
	    viewConfig : {
			enableTextSelection : true
	    }
	});
	return this.parametersPanel;

};*/

ImageMainView.prototype.loadDetectorPanel = function(detector, dataCollection) {
    var dataHTML = this.makeHTMLTable("Detector", [
        ["Model", dataCollection.Detector_detectorModel],
        ["Manufacturer", dataCollection.Detector_detectorManufacturer],
        ["Mode", dataCollection.Detector_detectorMode],
        ["Pixel Size", detector.pixelSize.x + " x " + detector.pixelSize.y],
        ["sensitive Area", detector.sensitiveArea.x + " x " + detector.sensitiveArea.y]

    ], null, detector.img);

    var dataColletionHTML = this.makeHTMLTable("Data Collection", [
        ["Collected on", dataCollection.DataCollectionGroup_endTime],
        ["Experiment Type", dataCollection.DataCollectionGroup_experimentType],
        ["Centering", dataCollection.DataCollection_centeringMethod],
        ["Exposure Timee", dataCollection.DataCollection_exposureTime],
        ["Directory", dataCollection.DataCollection_imageDirectory],
        ["BeamLine", dataCollection.BLSession_beamLineName],
        ["Detector Distance", dataCollection.DataCollection_detectorDistance],
        ["Flux", dataCollection.DataCollection_flux],
        ["Resolution", dataCollection.DataCollection_resolution],
        ["Transmission", dataCollection.DataCollection_transmission],
        ["WaveLength", dataCollection.DataCollection_wavelength]


    ]);


    return "<span style='color:orange;font-weight:bold;'>WARNING: If image is not displayed please, refresh the page (F5)</span><br />" + dataColletionHTML + dataHTML;



};

ImageMainView.prototype.makeHTMLTable = function(title, data, args, img) {
    var width = 800;
    if (args != null) {
        if (args.with != null) {
            width = args.with;
        }
    }


    var html = "<table>";



    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            html = html + "<tr>";
            for (var j = 0; j < data[i].length; j++) {

                var css = "key_subgrid";
                if (j == 1) {
                    css = "value_subgrid";
                }
                html = html + "<td class='" + css + "'>" + data[i][j] + "</td>";

                if (img != null) {
                    if (i == 0) {
                        if (j == data[i].length - 1) {
                            html = html + '<td rowspan="' + data.length + '"><img src=' + img + '/></td>';
                        }

                    }

                }
            }
            html = html + "</tr>";

        }


    }
    html = html + "</table>";

    if (title != null) {
        html = '<div  class="header-component-table" >' + title + '</div><div  style="margin:0px 0px 0px 0px !important;width:' + width + 'px;">' + html + '</div>';
    }
    return html;
};


ImageMainView.prototype.load = function(imageId, dataCollectionId) {

    var _this = this;
    this.panel.setTitle("Image");
    var url = EXI.getDataAdapter().mx.dataCollection.getImageById(imageId);


    var onSuccess = function(sender, dataCollection) {

        var dc = (dataCollection[0]);
/*
        for (var key in dc) {
            
            _this.storeParameters.loadData([{ key: key, value: dc[key] }], true);
        }*/
        var waveLength = dataCollection[0].DataCollection_wavelength;
        var detectorDistance = dataCollection[0].DataCollection_detectorDistance;
        var xBeam = dataCollection[0].DataCollection_xBeam;
        var yBeam = dataCollection[0].DataCollection_yBeam;

        if (ExtISPyB.detectors[dataCollection[0].detectorModel] != null) {
            _this.detectorResolution = ExtISPyB.detectors[dataCollection[0].detectorModel];
        }
        else {
            alert("Not detector loaded");
        }


        _this.imageViewer.load(url, waveLength, detectorDistance, xBeam, yBeam, _this.detectorResolution);

        document.getElementById(_this.id + "detector").innerHTML = _this.loadDetectorPanel(_this.detectorResolution, dataCollection[0]);

        //_this.surfaceScatteringViewer.load();

    };
    EXI.getDataAdapter({ onSuccess: onSuccess }).mx.dataCollection.getByDataCollectionId(dataCollectionId);


};



function ResolutionScatteringImageViewer(args){

    this.id = BUI.id();
   
   var _this = this;
   this.scatteringImageViewer = new ScatteringImageViewer(args);
   this.scatteringImageViewer.onMouseOver.attach(function(sender, position){
     
      try{ 
            var r = _this.getR(_this.xbeam, _this.ybeam, position.x,  position.y);
            var resolution = _this.wavelength/(2*Math.sin(1/2*Math.atan(r/_this.detectorDistance)));
            _this.onResolutionCalculated.notify(resolution);
      }
      catch(e){
          /** Catch error */
          console.log(e);
      }
   });
   
   this.onResolutionCalculated = new Event(this);
    
};

ResolutionScatteringImageViewer.prototype.getPanel = function(){
   return this.scatteringImageViewer.getPanel();
};

ResolutionScatteringImageViewer.prototype.getR = function(xbeam, ybeam, x, y){
   /** Scaling based on sensitive Area */
   x = (x*this.sensitiveArea.x)/this.scatteringImageViewer.width;
   y = (y*this.sensitiveArea.y)/this.scatteringImageViewer.height; 
    
   var squareX = Math.pow((x-xbeam),2);
   var squareY = Math.pow((y-ybeam),2);
   return Math.sqrt(squareX + squareY);
   
};

ResolutionScatteringImageViewer.prototype.load = function(imageId, wavelength, xbeam, ybeam, detectorDistance, sensitiveArea){
    var url = EXI.getDataAdapter().mx.dataCollection.getImageById(imageId);    
   this.scatteringImageViewer.load(url);
   
   this.wavelength = wavelength;
   this.xbeam = xbeam;
   this.ybeam = ybeam;
   this.detectorDistance = detectorDistance;
   this.sensitiveArea = sensitiveArea;

};
function ScatteringImageViewer(args){
    this.width = 100;
    this.height = 100;
    this.id = BUI.id();
    
    if (args){
        if (args.height){
            this.height = args.height;
        }
          if (args.width){
            this.width = args.width;
        }
    }
    
    this.onMouseOver = new Event(this);
    
};

ScatteringImageViewer.prototype.getPanel = function(){
    return '<img id="' + this.id + '" style="background-color: green;width:' + this.width +'px; height:' + this.height +'px;" />'
};


ScatteringImageViewer.prototype.findPosition = function(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
	do {
	    curleft += obj.offsetLeft;
	    curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return { x: curleft, y: curtop };
    }
    return undefined;
};

ScatteringImageViewer.prototype.getCoordinates = function(obj, e) {
     	var pos = this.findPosition(obj);
    	var x = e.pageX - pos.x;
    	var y = e.pageY - pos.y;
        return {
                            x 	: x,
                            y 	: y
        };
};
ScatteringImageViewer.prototype.load = function(url){    
    var _this = this;  
    /** Rendering image */
    $('#' + _this.id).load(function() {        
        $('#' + _this.id).mousemove(function(e) {
           _this.onMouseOver.notify(_this.getCoordinates(this, e));
        });
    }).attr('src', url);
};
function CrystalMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	var _this = this;
	
	this.crystalForm = new CrystalForm();
	this.samplesGrid = new SamplesGrid();
}

CrystalMainView.prototype.getPanel = MainView.prototype.getPanel;

CrystalMainView.prototype.getContainer = function() {
	this.panel =  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '10 30 10 10',
				items : [
					{
						tabConfig : {
							title : 'Samples list'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : 
								[
									this.samplesGrid.getPanel()
							]
						}
						]
				  },
				  {
						tabConfig : {
							title : 'Create a new CrystalForm'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : 
								[
							        this.crystalForm.getPanel()
							]
						}
						]
				  }]
		});
	return this.panel;	
};

CrystalMainView.prototype.load = function(crystal) {
	var _this = this;
	this.panel.setTitle(crystal.proteinVO.acronym);
	this.crystalForm.load(crystal);
	this.samplesGrid.load(crystal);
	
};

















/**
* Open a window with the files for all autoprocessing by datacollection
*
* @class AutoProcessingFileManager
* @constructor
*/
function AutoProcessingFileManager(){
    
    /** Grid */
    this.autoProcIntegrationAttachmentGrid = new AutoProcIntegrationAttachmentGrid({ margin: 5, height : 500});
}

AutoProcessingFileManager.prototype.show = function(dataCollectionIds){
       	var _this = this;
        /** We store an array with the autoProcIntegration Ids and other with their corresponding
         * attachments
         */
        var attachments = [];
        var autoProcProgramIds = [];
        
                
        
        /** Combo */
        this.autoProcStore = Ext.create('Ext.data.Store', {
            fields: ['v_datacollection_processingPrograms', 'v_datacollection_summary_phasing_autoproc_space_group', 'v_datacollection_summary_phasing_autoProcProgramId', 'text']
            
        });

        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Choose',
            store: this.autoProcStore,
            queryMode: 'local',
            displayField: 'v_datacollection_processingPrograms',
            height : 25,
            valueField: 'v_datacollection_summary_phasing_autoProcProgramId',
            tpl : Ext.create('Ext.XTemplate', 
				'<tpl for=".">',
					'<div style="font-size:12px;" class="x-boundlist-item">{v_datacollection_processingPrograms}<span style="color:gray;font-size:10px;font-weight:bold"> {v_datacollection_summary_phasing_autoproc_space_group}</span></div>', '</tpl>'),
             listeners:{
                    scope: _this,
                    'select': function(a,record,c){
                        
                        _this.programId = record[0].data.v_datacollection_summary_phasing_autoProcProgramId;
                       if (_this.programId ){
                            _this.reloadData(_this.programId, _this.filtered  );
                           
                       }
                    }
                }
        });
 
	Ext.create('Ext.window.Window', {
		height: 600,
		title : 'Autoprocessing Files Explorer',
		width: 900,
		modal : true,
		items: [
                    {
                           xtype : 'container',
                           layout : 'hbox',
                           margin : '10 5 10 5',
                           items : [
                                      combo,
                                      {
                                          xtype      : 'checkboxfield',
                                          boxLabel   : 'Filter by MTZ files',
                                           margin   : '0 0 0 40',
                                          checked    : false,
                                          listeners:{
                                                    scope: _this,
                                                    'change': function(a,filtered,c){
                                                                 _this.reloadData(_this.programId,filtered);
                                                    }
                                                }
                                      }
                                               
                           ]
                    },
                       
                    this.autoProcIntegrationAttachmentGrid.getPanel()
        ]
	}).show();
};

/**
* Shows files from a list of  dataCollectionIds
*
* @method reloadData
* @param {Integer} programId if data should be filtered by programId
* @param {boolean} filtered if data should be filtered by mtz extension
*/
AutoProcessingFileManager.prototype.reloadData = function(programId, filtered){
    this.programId = programId;
    this.filtered = filtered;
    
    /** Get all attachments */
    var dataByProgram = _.flatten(this.attachments);
    
    /** Filter by programId */
    if (this.programId){
        dataByProgram = this.attachments[_.indexOf(this.autoProcProgramIds, this.programId)];
    }
    /** Filter by MTZ */
    if (this.filtered){
         dataByProgram = _.filter(dataByProgram, function(b){         
                return b.fileName.indexOf(".mtz") != -1;
        })
    }
   
    if (!dataByProgram){
        dataByProgram = [];
    }
    this.autoProcIntegrationAttachmentGrid.load(dataByProgram);
};

/**
* Shows files from a list of  dataCollectionIds
*
* @method load
* @param {[Integer]]} dataCollectionIds
*/
AutoProcessingFileManager.prototype.load = function(dataCollectionIds){
    
    var _this = this;
    var onSuccess2 = function(sender, data){      
		var onSuccess = function(sender, dataAttachments){
            
            if (dataAttachments.length != _this.autoProcProgramIds.length){
                /** Removing null */
                
                _this.autoProcProgramIds =  _.filter(_this.autoProcProgramIds, function(b){return b != null});
                
            }
			_this.attachments = dataAttachments;
			_this.autoProcIntegrationAttachmentGrid.load(_.flatten(dataAttachments));
			_this.autoProcIntegrationAttachmentGrid.panel.setLoading(false);
		};
		_this.autoProcIntegrationAttachmentGrid.panel.setLoading("Retrieving files");
        
        /** Some autoProcProgramIds may be null */
		_this.autoProcProgramIds = _.map(data[0], 'v_datacollection_summary_phasing_autoProcProgramId');    
		  
		_this.autoProcStore.loadData(data[0]);
        if (_this.autoProcProgramIds){
            if (_this.autoProcProgramIds.length > 0){
		        EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getAttachmentListByautoProcProgramsIdList(_this.autoProcProgramIds);
                return;
            }
        }
        /** No Attachments */
        _this.autoProcIntegrationAttachmentGrid.panel.setLoading(false);
	};
	this.autoProcIntegrationAttachmentGrid.panel.setLoading();
    
	EXI.getDataAdapter({onSuccess : onSuccess2}).mx.autoproc.getViewByDataCollectionId(dataCollectionIds);
}
/**
* Landing page for where data collections are shown. It manages the DataCollectionSummaryGrid
*
* @class DataCollectionMxMainView
* @constructor
*/
function DataCollectionMxMainView() {
	this.icon = '../images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	var _this = this;
	
	this.genericDataCollectionPanel = new MXDataCollectionGrid();
    this.energyScanGrid = new EnergyScanGrid();
    this.xfeScanGrid = new XFEScanGrid();
}

DataCollectionMxMainView.prototype.getPanel = MainView.prototype.getPanel;

DataCollectionMxMainView.prototype.getContainer = function() {
		this.container = Ext.create('Ext.tab.Panel', {       
        padding : "5 40 0 5",
        items: [ {
                        title: 'Data Collections',
                        cls : 'border-grid',
                        id : this.id + "_dataCollectionTab",
                        items:[
                            this.genericDataCollectionPanel.getPanel()
                        ]
                }, 
              
                {
                        title: 'Energy Scans',
                        cls : 'border-grid',
                        id : this.id + "_energyTab",
                        items:[
                             this.energyScanGrid.getPanel()
                        ]
                },
                 {
                        title: 'Fluorescence Spectra',
                        id : this.id + "_xfeTab",
                        cls : 'border-grid',                         
                        items:[
                            this.xfeScanGrid.getPanel()
                        ]
                }
               ]
        });
	    return this.container;
	
};

DataCollectionMxMainView.prototype.loadEnergyScans = function(data) {
     if (data){
         if (data.length > 0){
            Ext.getCmp(this.id + "_energyTab").setTitle(data.length + " Energy Scans");  
            this.energyScanGrid.load(data);
            return;
         }
     }
     
     Ext.getCmp(this.id + "_energyTab").setDisabled(true);
};

DataCollectionMxMainView.prototype.loadFXEScans = function(data) {  
    if (data){
        if (data.length > 0){
            Ext.getCmp(this.id + "_xfeTab").setTitle(data.length + " Fluorescence Spectra");  
            this.xfeScanGrid.load(data);
            return;
         }
     }
     
     Ext.getCmp(this.id + "_xfeTab").setDisabled(true);
};

DataCollectionMxMainView.prototype.loadCollections = function(dataCollections) {
	var data = _.filter(dataCollections, function(u) {
        return u.DataCollection_dataCollectionId != null;
    });
    if (data){
        for (var i = 0; i < data.length; i++) {
            try{
                if (data[i].DataCollectionGroup_startTime != null){
                    data[i].time =  moment(data[i].DataCollectionGroup_startTime, "MMMM Do YYYY, h:mm:ss A").format("h:mm:ss A");
                }
                
                if (data[i].DataCollectionGroup_startTime != null){
                    data[i].date =  moment(data[i].DataCollectionGroup_startTime, "MMMM Do YYYY").format("MMMM Do YYYY");
                }
                
                if (data[i].DataCollection_resolutionAtCorner != null){
                    data[i].DataCollection_resolutionAtCorner = _.ceil( data[i].DataCollection_resolutionAtCorner, 2);
                }
                if (data[i].DataCollection_resolution != null){
                    data[i].DataCollection_resolution = _.ceil( data[i].DataCollection_resolution, 2);
                }
                
                if (data[i].DataCollection_wavelength != null){
                    data[i].DataCollection_wavelength = _.ceil( data[i].DataCollection_wavelength, 3);
                }
                /** Axis  **/
                if (data[i].DataCollection_axisEnd != null){
                    if (data[i].DataCollection_axisStart != null){
                        data[i].DataCollection_axisTotal = _.ceil(data[i].DataCollection_axisEnd - data[i].DataCollection_axisStart, 2);
                    }
                }
                
                if (data[i].DataCollection_flux_end != null){
                    data[i].DataCollection_flux_end = data[i].DataCollection_flux_end.toExponential();
                }
                
                if (data[i].DataCollection_flux != null){
                    data[i].DataCollection_flux = data[i].DataCollection_flux.toExponential();
                }
            }
            catch(err) {
                console.log(error);
            }
        }
        Ext.getCmp(this.id + "_dataCollectionTab").setTitle(data.length + " Data Collections");
	
        this.genericDataCollectionPanel.load(data);
        return;	
    }
     Ext.getCmp(this.id + "_dataCollectionTab").setDisabled(true);
};

function CustomSectionDataCollection(args) {
	this.noFoundClass = "summary_datacollection_noFound";
	this.failedClass = "summary_datacollection_failed";
	this.successClass = "summary_datacollection_success";
}




CustomSectionDataCollection.prototype.getMeshScan = function(dataCollectionGroup){
	
	var steps = [];
	var status = [];
	var ids = [];
	
	if ( dataCollectionGroup.WorkflowStep_workflowStepType != null){
		steps = dataCollectionGroup.WorkflowStep_workflowStepType.split(",");
		status = dataCollectionGroup.WorkflowStep_status.split(",");
		ids = dataCollectionGroup.WorkflowStep_workflowStepId.split(",");
	
	
		for (var i = 0; i < steps.length; i++){
			var step = {
					status : status[i],
					name   : steps[i],
					workflowStepId  : ids[i],
					img : EXI.getDataAdapter().mx.workflowstep.getImageByWorkflowStepId(ids[i])
			};
			if (step.name == "Mesh"){
				return step;
			}
		}
	}
	return;
};


CustomSectionDataCollection.prototype.getHTML = function(dataCollectionGroup){
	
	var html = "";
	var items = [];
	/** Making the mesh **/
	try{
		var mesh = this.getMeshScan(dataCollectionGroup);
		if (mesh != null){
			items.push({
				img 	: EXI.getDataAdapter().mx.workflowstep.getImageByWorkflowStepId(mesh.workflowStepId),
                id      : dataCollectionGroup.DataCollection_dataCollectionId				
			});
		}
		
		
	}
	catch(e){
		html = html + "There was an error parsing the mesh";
	}
	
	/** Making the wilson **/
	try{
		if (dataCollectionGroup.DataCollection_bestWilsonPlotPath != null){
			items.push({
				img 	: EXI.getDataAdapter().mx.dataCollection.getWilsonPlot(dataCollectionGroup.DataCollection_dataCollectionId),
				//title 	: "Wilson"
			});
			
		}
	}
	catch(e){
		html = html + "There was an error parsing the wilson";
	}
	
	dust.render("customsectiondatacollection", items, function(err, out){
		html = html + out;
     	});
	
	
	return html;
	
};




function MXDataCollectionGrid(args) {
    this.id = BUI.id();

    /** If view should be collapsed or not */
    this.collapsed = false;
}



/**
* Attaches the events to lazy load to the images. Images concerned are with the class img-responsive and smalllazy
*
* @method attachCallBackAfterRender
*/
MXDataCollectionGrid.prototype.attachCallBackAfterRender = function() {
    var _this = this;
    var lazy = {
            bind: 'event',
            /** !!IMPORTANT this is the id of the parent node which contains the scroll **/
            appendScroll: document.getElementById(document.getElementById(_this.id).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id),
            beforeLoad: function(element) {
                console.log('image "' + (element.data('src')) + '" is about to be loaded');
            },           
            onFinishedAll: function() {
                EXI.mainStatusBar.showReady();
            }
        };
        
    var timer1 = setTimeout(function() {  $('.img-responsive').lazy(lazy);}, 1000);
    var timer2 = setTimeout(function() {  $('.smalllazy').lazy(lazy);}, 1000); 
    
    var timer3 = setTimeout(function() {
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var target = $(e.target).attr("href"); // activated tab
                $(target).html("test<br />testtest<br />testtest<br />testtest<br />testtest<br />testtest<br />testtest<br />testtest<br />testtest<br />testtest<br />test");
            });
    }, 1000);
 
};

MXDataCollectionGrid.prototype.getPanel = function(dataCollectionGroup) {
    var _this = this;
    this.store = Ext.create('Ext.data.Store', {
        fields: ["dataCollectionGroup"]
    });
    this.panel = Ext.create('Ext.grid.Panel', {
        border: 1,
        padding: 5,
        id: this.id,
        store: this.store,
        disableSelection: true,
        tbar: this.getToolBar(),
        columns: this.getColumns(),
        viewConfig: {
            enableTextSelection: true,
            stripeRows: false
        },
        listeners: {
            viewready: function() {
                function loadMagnifiers() {
                    for (var i = 0; i < _this.dataCollectionGroup.length; i++) {
                        var elementId = _this.dataCollectionGroup[i].DataCollection_dataCollectionId + "_thumb";
                        $('#' + elementId).Lazy();

                    }
                }
            }
        }

    });

    this.panel.on('boxready', function() {
        _this.attachCallBackAfterRender();
    });

    return this.panel;
};




/**
* Parses statistics and return the best one
*
* @method _getAutoprocessingStatistics
* @param {Object} data Record with all the information that it is stored in the store
* @return {Object} return all statistics sorted by best values
*/
MXDataCollectionGrid.prototype._getAutoprocessingStatistics = function(data) {
    /** This converts and array of comma separated value in a array */
    function getArrayValues(value) {
        /** It splits every value */
        return _.map(_.trim(value).split(","), function(singleValue) { return _.trim(singleValue); });
    }

    var autoProc_spaceGroups = getArrayValues(data.AutoProc_spaceGroups);
    var autoProcIds = getArrayValues(data.autoProcIds);
    var completenessList = getArrayValues(data.completenessList);
    var resolutionsLimitHigh = getArrayValues(data.resolutionsLimitHigh);
    var resolutionsLimitLow = getArrayValues(data.resolutionsLimitLow);
    var scalingStatisticsTypes = getArrayValues(data.scalingStatisticsTypes);
    var rMerges = getArrayValues(data.rMerges);
    var cell_a = getArrayValues(data.Autoprocessing_cell_a);
    var cell_b = getArrayValues(data.Autoprocessing_cell_b);
    var cell_c = getArrayValues(data.Autoprocessing_cell_c);

    var cell_alpha = getArrayValues(data.Autoprocessing_cell_alpha);
    var cell_beta = getArrayValues(data.Autoprocessing_cell_beta);
    var cell_gamma = getArrayValues(data.Autoprocessing_cell_gamma);


    var data = {};
    /** Returning if no autoprocs */
    if (autoProcIds) {
        if (autoProcIds[0] == "") {
            return [];
        }
    }
    for (var i = 0; i < autoProcIds.length; i++) {
        if (data[autoProcIds[i]] == null) {
            data[autoProcIds[i]] = {
                autoProcId: autoProcIds[i],
                spaceGroup: autoProc_spaceGroups[i]
            };
        }

        data[autoProcIds[i]][scalingStatisticsTypes[i]] = ({
            autoProcId: autoProcIds[i],
            scalingStatisticsType: scalingStatisticsTypes[i],
            completeness: Number(completenessList[i]).toFixed(0),
            resolutionsLimitHigh: Number(resolutionsLimitHigh[i]).toFixed(1),
            resolutionsLimitLow: Number(resolutionsLimitLow[i]).toFixed(1),
            rMerge: Number(rMerges[i]).toFixed(1),
            spaceGroup: autoProc_spaceGroups[i],
            cell_a: cell_a[i],
            cell_b: cell_b[i],
            cell_c: cell_c[i],
            cell_alpha: cell_alpha[i],
            cell_beta: cell_beta[i],
            cell_gamma: cell_gamma[i]

        });

    }

    /** Convert from map to array */
    var ids = _.map(data, 'autoProcId');
    var result = [];
    for (var i = 0; i < ids.length; i++) {
        result.push(data[ids[i]]);
    }

    function sortByBest(a, b) {
        var spaceGroupA = a.spaceGroup.replace(/\s/g, "");
        var spaceGroupB = b.spaceGroup.replace(/\s/g, "");
        return (_.indexOf(ExtISPyB.spaceGroups, spaceGroupA) > _.indexOf(ExtISPyB.spaceGroups, spaceGroupB));
    }

    var sorted = result.sort(sortByBest).reverse();
    /** Add new attribute for ranking order */
    for (var i = 0; i < sorted.length; i++) {
        sorted[i]["rank"] = i + 1;
    }

    return sorted;
};

MXDataCollectionGrid.prototype.getToolBar = function() {
    var _this = this;
    return Ext.create('Ext.toolbar.Toolbar', {
        width: 500,
        items: [
            {
                xtype: 'checkboxfield',
                boxLabel: 'Summary',
                id: this.id + "_collapse",
                listeners: {
                    change: function(field, e) {
                        _this.collapsed = e;
                        if (Ext.getCmp(_this.id + "_search").getValue() != "") {
                            _this.filterBy(Ext.getCmp(_this.id + "_search").getValue());
                        }
                        else {
                            _this.reloadData(_this.dataCollectionGroup);
                        }
                    }
                }
            },
            '->', 
            {
                xtype: 'textfield',
                id: this.id + "_search",
                width: 400,
                emptyText: 'enter search prefix, sample or protein',
                listeners: {
                    specialkey: function(field, e) {
                        if (e.getKey() == e.ENTER) {
                            _this.filterBy(field.getValue());
                        }
                    }
                }
            },
            { xtype: 'tbtext', text: '', id: this.id + "_found" }
        ]
    });
};
MXDataCollectionGrid.prototype.getColumns = function() {
    var _this = this;
    var columns = [
        {

            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1.5,
            hidden: false,
            renderer: function(grid, e, record) {
                var data = record.data;                              
                var html = "";                               
                /** For thumbnail */
                data.urlThumbnail = EXI.getDataAdapter().mx.dataCollection.getThumbNailById(data.lastImageId);
                data.url = EXI.getDataAdapter().mx.dataCollection.getImageById(data.lastImageId);
                data.ref = '#/mx/beamlineparameter/datacollection/' + data.DataCollection_dataCollectionId + '/main';
                data.runNumber = data.DataCollection_dataCollectionNumber;
                data.prefix = data.DataCollection_imagePrefix;
                data.comments = data.DataCollectionGroup_comments;
                data.sample = data.BLSample_name;
                data.folder = data.DataCollection_imageDirectory;

                /** For Phasing */
                
                if (data.phasingStepType) {
                    var phasingSteps = data.phasingStepType.split(",");
                    data.phasingStepLength = phasingSteps.length;
                   
                }


                /** For crystal */
                data.xtal1 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 1);
                data.xtal2 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 2);
                data.xtal3 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 3);
                data.xtal4 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 4);

                /** Image quality indicator **/
                data.indicator = EXI.getDataAdapter().mx.dataCollection.getQualityIndicatorPlot(record.data.DataCollection_dataCollectionId);

                /** For online data analysis */
                var online = (new OnlineResultSectionDataCollection().parseData(record.data));
                data.autoprocessing = _.filter(online, function(b) { return b.name == "Autoprocessing"; });

                data.screening = _.filter(online, function(b) { return b.name == "Screening"; });
                data.onlineresults = _this._getAutoprocessingStatistics(record.data);

                /** For the workflows */
                if (record.data.WorkflowStep_workflowStepType) {
                    data.workflows = new WorkflowSectionDataCollection().parseWorkflow(record.data);
                }
                if (data.workflows == null) {
                    data.workflows = [];
                }

                if (!_this.collapsed) {
                    
                    dust.render("mxdatacollectiongrid.template", data, function(err, out) {
                                                                       
                        html = html + out;
                    });

                 
                    dust.render("online.mxdatacollectiongrid.template", data, function(err, out) {
                        html = html + out;
                    });
                }
                else {
                    dust.render("collapsed.mxdatacollectiongrid.template", data, function(err, out) {
                        html = html + out;
                    });
                }


                return html;

            }
        },
        {
            header: 'IDs',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1.5,
            hidden: true,
            renderer: function(grid, e, record) {
                var html = "";
                dust.render("ids.mxdatacollectiongrid.template", record.data, function(err, out) {
                    html = out;
                });
                return html;

            }
        },
         
    ];
    return columns;
};

MXDataCollectionGrid.prototype.reloadData = function(dataCollections) {
    this.store.loadData(dataCollections);
    this.attachCallBackAfterRender();
};
/**
* Filters data by prefix, protein acronym or sample
*
* @method filterBy
* @return {String} searchTerm prefix, protein acronym or sample to be searched
*/
MXDataCollectionGrid.prototype.filterBy = function(searchTerm) {
    console.log(this.dataCollectionGroup);
    var filtered = _.filter(this.dataCollectionGroup, function(dataCollection) {
        var params = ["DataCollection_imagePrefix", "Protein_acronym", "BLSample_name"];
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            if (dataCollection[param]) {
                if (dataCollection[param].indexOf(searchTerm) != -1) {
                    return dataCollection;
                }
            }
        }


    });
    Ext.getCmp(this.id + "_found").setText(filtered.length + " items found");
    this.reloadData(filtered);
};

MXDataCollectionGrid.prototype.load = function(dataCollectionGroup) {
    this.dataCollectionGroup = dataCollectionGroup;
    this.dataCollectionGroup.reverse();
    this.store.loadData(this.dataCollectionGroup);
};
function OnlineResultSectionDataCollection(args) {
	
	this.noFoundClass = "summary_datacollection_noFound";
	this.failedClass = "summary_datacollection_failed";
	this.successClass = "summary_datacollection_success";
}


OnlineResultSectionDataCollection.prototype.getScreeningData = function(dataCollectionGroup){
    var items = [];
     
	var parsed = [];
	if (dataCollectionGroup.Screening_screeningId != null){
		if (dataCollectionGroup.ScreeningOutput_indexingSuccess){
            items.push({
                name   : "Indexing",
                status : "Success",
                datacollectionId    : dataCollectionGroup.DataCollection_dataCollectionId,
                items  : [
                    {
                        name  : 'Mosaicity',
                        value : dataCollectionGroup.ScreeningOutput_mosaicity,
                        units : 'º'
                    }
                ]
            });

		}
		else{
			 items.push({
                name   : "Indexing",
                datacollectionId    : dataCollectionGroup.DataCollection_dataCollectionId,
                status : "Failure",
                items  : []
            });
		}
    }
   /* else{
        items.push({
                name   : "No indexing",
                datacollectionId    : dataCollectionGroup.DataCollection_dataCollectionId,
                status : "Not found",
                items  : []
            });
    }*/
    
    if (dataCollectionGroup.ScreeningOutput_strategySuccess){
           var subItems = [ {
                        name  : 'Ranking Res.',
                        value : dataCollectionGroup.ScreeningOutput_rankingResolution,
                        units : 'Å'
                    },                              
           ];
        if (dataCollectionGroup.ScreeningOutputLattice_spaceGroup){  
           subItems.push( {
                            name : 'Space Group',
                            value : dataCollectionGroup.ScreeningOutputLattice_spaceGroup,
                            units : ''
		   });
           subItems.push( {
                            name : 'a,b,c',
                            value : dataCollectionGroup.ScreeningOutputLattice_unitCell_a + ", " + dataCollectionGroup.ScreeningOutputLattice_unitCell_b + ", " + dataCollectionGroup.ScreeningOutputLattice_unitCell_c,
                            units : ''
		   });
           
           subItems.push( {
                            name : 'α β γ',
                            value : dataCollectionGroup.ScreeningOutputLattice_unitCell_alpha + ", " + dataCollectionGroup.ScreeningOutputLattice_unitCell_beta + ", " + dataCollectionGroup.ScreeningOutputLattice_unitCell_gamma,
                            units : ''
            });      		                     				
			                     
        }
         items.push({
                name   : "Strategy",
                status : "Success",
                datacollectionId    : dataCollectionGroup.DataCollection_dataCollectionId,
                items  : subItems 
         });	
    }
   /* else{
        items.push({
            name   : "No strategy",
            status : "Not found",
            datacollectionId    : dataCollectionGroup.DataCollection_dataCollectionId,
            items  : []
        });
    }*/
        
    
    /** No autprocessing */
   if (items.length == 0){
            return {
            name               :"Screening",
            status             : "Not found",
            items : []
                
        };
    }

    var status = "Failure";
    for (var i = 0; i < items.length; i++) {
        if (items[i].status == "Success"){
            status = "Success";
        }
        
    }
    return {
          name : "Screening",
          status :status,
          items : items  
    }           
};



OnlineResultSectionDataCollection.prototype.getAutoprocResults = function(dataCollectionGroup) {
   /** Paring autoprocessing */
    var autoprocessing = [];    
    var programs = dataCollectionGroup.processingPrograms; 
    var results = dataCollectionGroup.processingStatus;
    var spaceGroups = dataCollectionGroup.AutoProc_spaceGroups;
    
	if (programs != null){
		programs = programs.split(",");
		results = results.split(",");
        spaceGroups = spaceGroups.split(",");
		
        var aux = {};
		for (var i= 0; i < programs.length; i++){
			var name = programs[i].trim();
          
			if (aux[name] == null){
				aux[name] = {};
                aux[name]["spaceGroup"] = [];
				aux[name]["run"] = 0;
				aux[name]["success"] = 0;    
			}
            aux[name]["spaceGroup"].push(spaceGroups[i]);
			aux[name]["run"] =  aux[name]["run"] + 1;
			aux[name]["success"] =  aux[name]["success"]  + 1;
		}
        
        
            
        for (var key in aux){
            var status = "Failure";
            if (aux[key].success > 0){
                status = "Success";
            }
            
            autoprocessing.push({
               name     : key,
               dataCollectionId     : dataCollectionGroup.DataCollection_dataCollectionId,
               run      :  aux[key].run,
               success  :  aux[key].success,
               spaceGroup  :  aux[key].spaceGroup,
               status   : status,
               items   : [] 
            });
        }
	}
    
    /** Adding autoprocessing to results or add no autprocessing if any*/
    if (autoprocessing.length > 0){
       return {
                                name                : "Autoprocessing",
                                items               : autoprocessing,
                                status              : "Success",
                                datacollectionId    : dataCollectionGroup.DataCollection_dataCollectionId
        };
    }
    else{
        return {
                                name                : "Autoprocessing",
                                datacollectionId    : dataCollectionGroup.DataCollection_dataCollectionId,
                                 status             : "Not found",
                                items : [
                                    /*{
                                       name     : "No autoprocessing",
                                       status   : "Not found",
                                       items    : []
                                }*/
                                ]
        };
    }
};

OnlineResultSectionDataCollection.prototype.getPhasingResults = function(dataCollectionGroup) {
    if (dataCollectionGroup!= null){
		if (dataCollectionGroup.Phasing_phasingStepType != null){
             return {
                                name : "Phasing",
                                datacollectionId    : dataCollectionGroup.DataCollection_dataCollectionId,
                                items : [{
                                       name     : "Phasing",
                                       status   : "Success",
                                       items    : []
                                }]
            };
        }
        else{
            return {
                                name : "Phasing",
                                datacollectionId    : dataCollectionGroup.DataCollection_dataCollectionId,
                                items : [{
                                       name     : "No phasing",
                                       status   : "Not found",
                                       items    : []
                                }]
            };
        }
    }
};
OnlineResultSectionDataCollection.prototype.parseData = function(dataCollectionGroup) {
	var resultParsed = [];
    resultParsed.push(this.getAutoprocResults(dataCollectionGroup));
    resultParsed.push(this.getScreeningData(dataCollectionGroup));
    //resultParsed.push(this.getPhasingResults(dataCollectionGroup));
	return resultParsed;
};


OnlineResultSectionDataCollection.prototype.getHTML = function(dataCollectionGroup, autoProcResults){
    var parseResults = this.parseData(dataCollectionGroup);

    parseResults[0].autoProcResults = autoProcResults;
    var html = "";
    dust.render("resultsection.autoprocessing", parseResults, function(err, out) {
        html = out;
        
    });
       
                                        
    return html;	
};


OnlineResultSectionDataCollection.prototype.getPhasingHTML = function(dataCollectionGroup){
	var html= "";
	if (dataCollectionGroup!= null){
		if (dataCollectionGroup.Phasing_phasingStepType != null){
			var steps = dataCollectionGroup.Phasing_phasingStepType.split(",");
			var parsed = [];
			for (var i = 0; i < steps.length; i++) {
				parsed.push({
					iconClass : "summary_datacollection_success",
					value : steps[i]
					
				});
			}
			html = html + this.getIconTable(parsed);
		}
		else{
			html = html + this.getIconTable([{
				iconClass : "summary_datacollection_noFound",
				value : "Phasing"
			}]);
		}
		
		if (dataCollectionGroup.Phasing_spaceGroup != null){
			html = html + this.getHTMLTable([{
            	key : 'Space Groups',
 				value : dataCollectionGroup.Phasing_spaceGroup 
             }]);
		}
	}
	return html;
};

function ThumbnailSectionDatacollection(args) {
}

ThumbnailSectionDatacollection.prototype.getHTML = function(data) {    
    var html = "";
    
    dust.render("thumbnailsection", 
    [{
        urlThumbnail : EXI.getDataAdapter().mx.dataCollection.getThumbNailById(data.lastImageId),
        url         :  EXI.getDataAdapter().mx.dataCollection.getImageById(data.lastImageId),
        ref         : '#/mx/beamlineparameter/datacollection/' + data.DataCollection_dataCollectionId + '/main',
        runNumber : data.DataCollection_dataCollectionNumber,
        prefix : data.DataCollection_imagePrefix,
        comments : data.DataCollectionGroup_comments,        
        sample : data.BLSample_name,
        folder : data.DataCollection_imageDirectory
        
    }], function(err, out) {        
        html = out;
    });
    return html;  
};


function WorkflowSectionDataCollection(args) {
	this.noFoundClass = "summary_datacollection_noFound";
	this.failedClass = "summary_datacollection_failed";
	this.successClass = "summary_datacollection_success";
}





/**
 * 
Input: 	
wokflowSteps = "Snapshots,Automesh,Line,Mesh,Line,Line,Characterisation,Line,Line,Line,Characterisation,Line,Line,Line,Characterisation,Line,Line,Line,Characterisation,Line,Line,Line,Characterisation"
workflowStepStatus = "Success,Success,Success,Success,Success,Success,Failure,Success,Success,Success,Failure,Success,Success,Success,Failure,Success,Success,Success,Failure,Success,Success,Success,Failure"

Output:
[...{"step":"Line","count":3,"status":"Success"}...]
 * 
 */
WorkflowSectionDataCollection.prototype.parseWorkflow = function(dataCollectionGroup){
	var steps = [];
	var status = [];
	var ids = [];
	if ( dataCollectionGroup.WorkflowStep_workflowStepType != null){
		steps = dataCollectionGroup.WorkflowStep_workflowStepType.split(",");
		status = dataCollectionGroup.WorkflowStep_status.split(",");
		ids = dataCollectionGroup.WorkflowStep_workflowStepId.split(",");
		
		
		var previous = null;
		var cleaned = [];
		for (var i = 0; i < steps.length; i++){
			var step = {
					status : status[i],
					name   : steps[i],
					workflowStepId  : ids[i],
					workflowStepIds : ids, 
					img : EXI.getDataAdapter().mx.workflowstep.getImageByWorkflowStepId(ids[i])
			};
			if (previous != steps[i]){
				cleaned.push([step]);
				
			}
			else{
				cleaned[cleaned.length - 1].push(step);
			}
			previous = steps[i];
		}
	}
	return cleaned;
	
};


WorkflowSectionDataCollection.prototype.getHTML = function(dataCollectionGroup){
	var parsed = [];
	var html = "";

	if (dataCollectionGroup.WorkflowStep_workflowStepType){
		parsed = this.parseWorkflow(dataCollectionGroup);
		
	}
	dust.render("workflowstepsection", parsed, function(err, out){
		html = out;
     });
	
	
	return html;
};



/**
* It shows a summary about the phasing steps. Basically, one line per space group 
*
* @class FileManagerPhasingGrid
* @constructor
*/
function FileManagerPhasingGrid(args) {
	
    this.onSelect = new Event(this);
};

FileManagerPhasingGrid.prototype.load = function(data) {
    this.data = data;
	this.store.loadData(data);
};

FileManagerPhasingGrid.prototype.findPDBMatch = function(mapFilePath) {
    for (var i = 0; i < this.data.length; i++) {
        var element = this.data[i];
        if (element.fileName.endsWith(".pdb")){
            /*var name = element.fileName.substring(0,element.fileName.lastIndexOf("."));
            var nameMap = mapFilePath.substring(0,mapFilePath.lastIndexOf("."));
            if (name == nameMap){*/
                return element;
            //} 
            
        }
    }
	
};

FileManagerPhasingGrid.prototype.getPanel = function() {
	var _this = this;
	this.store = Ext.create('Ext.data.Store', {
		fields : [  
                    'fileType',
                    'phasingProgramAttachmentId',
                    'filePath',
                    'phasingPrograms',
                    'fileName']
	});
    
   
        
    
	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Files',
		store : this.store,
        flex : 0.3,
        height : 600,
        cls : 'border-grid',
       	emptyText : "No files found",

		layout : 'fit',
        margin : "0 5 0 5",
        viewConfig : {
                stripeRows : true                   
            },
		columns : [ 
                    {
                        text : 'fileName',
                        flex : 1,
                        dataIndex : 'fileName'
                    },
                    {
                        text : 'Viewer',
                        flex : 1,                      
                        dataIndex : 'filePath',
                        renderer : function(grid, e, record){
                            if (record.data.fileName.endsWith(".map")){
                               var pdb = _this.findPDBMatch(record.data.fileName);
                                if (pdb != null){
                                    
                                    var pdb = EXI.getDataAdapter().mx.phasing.downloadPhasingFilesByPhasingAttachmentId(pdb.phasingProgramAttachmentId);
                                    var map = EXI.getDataAdapter().mx.phasing.downloadPhasingFilesByPhasingAttachmentId(record.data.phasingProgramAttachmentId);
                                     
                                    var href= "viewers/uglymol/1mru.html?pdb=" + pdb + "&map="+map;
                                    return "<a target='_blank' style='showme openGridButton' href='" + href+"'><div style='text-align:center;color:white;width:60px;background-color:#3892d3;'>VIEWER</div></a>";   
                                    
                                }
                            }
                            
                            if (record.data.fileName.endsWith(".pdb")){
                               var pdb = _this.findPDBMatch(record.data.fileName);
                                if (pdb != null){
                                    
                                    var pdb = EXI.getDataAdapter().mx.phasing.downloadPhasingFilesByPhasingAttachmentId(pdb.phasingProgramAttachmentId);
                                    
                                     
                                    var href= "viewers/pv/index.html?pdb=" + pdb;
                                    return "<a target='_blank' style='showme openGridButton' href='" + href+"'><div style='text-align:center;color:white;width:60px;background-color:#3892d3;'>VIEWER</div></a>";   
                                    
                                }
                            }
                        }
                    },
                    {
                        text : 'filePath',
                        flex : 1,
                        hidden : true,
                        dataIndex : 'filePath'
                    },
                    {
                        xtype:'actioncolumn',
                        flex : 0.3,
                        text : 'Download',
                        items: [{
                            icon: '../images/icon/ic_get_app_black_24dp.png',  // Use a URL in the icon config
                            tooltip: 'Download',
                            handler: function(grid, rowIndex, colIndex) {
                                
                                  window.open(EXI.getDataAdapter().mx.phasing.downloadPhasingFilesByPhasingAttachmentId(grid.store.getAt(rowIndex).data.phasingProgramAttachmentId));
                                
                            }
                        }]
                    }
                ]
	});
	return this.panel;
};



/**
 * It shows information about the phasing steps
 * 
 * @height
 * @searchBar
 * @collapsed
 * @width
 */
function PhasingGrid(args) {
	
};

/**
 * {"processingPrograms":"grenades_parallelproc",
 * "autoProcId":909816,
 * "phasingEndTime":"Feb 20, 2013 1:37:17 PM",
 * "autoProcIntegrationId":1010078,
 * "processingStatus":true,
 * "anomalous":false,
 * "name":"Thermo_2",
 * "proposalId":12,
 * "spaceGroupShortName":"C222",
 * "lowRes":"3.5",
 * "spaceGroup":" P 6 ",
 * "autoProcScalingId":909827,
 * "statisticsValue":null,
 * "enantiomorph":null,
 * "acronym":"MWB",
 * "blSampleId":525682,
 * "phasingStatus":null,
 * "code":"",
 * "phasingPrograms":"shelxc",
 * "dataCollectionId":1640501,
 * "phasingStepId":27742,
 * "solventContent":null,
 * "phasingAnalysisId":null,
 * "sessionId":43041,
 * "phasingStepType":"PREPARE",
 * "metric":null,
 * "proteinId":339373,
 * "phasingStartTime":"Feb 20, 2013 1:37:16 PM",
 * "method":"SAD",
 * "previousPhasingStepId":null,
 * "highRes":"50.0"}
 * 
 * 
 */
PhasingGrid.prototype.load = function(data) {
	this.store.loadData(data, false);
};

PhasingGrid.prototype._getTbar = function() {
	var _this = this;
	var actions = [];

	actions.push(Ext.create('Ext.Action', {
		text : 'Add',
		icon: 'images/icon/add.png',
		disabled : false,
		handler : function(widget, event) {
		
		}
	}));
	return actions;
};

PhasingGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		fields : [ 'phasingStepId' ]
	});
    
    this.store.sort('phasingStepId');
	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Phasing steps',
		store : this.store,
        cls : 'border-grid',
		layout : 'fit',
		columns : [
             {
			text : 'phasingStepId',
            hidden : true,
			dataIndex : 'phasingStepId',
			flex : 1
		}, 
            {
			text : 'Space Group',
            hidden : true,
			dataIndex : 'spaceGroupShortName',
			flex : 1
		},
        {
			text : 'Prepare',
			dataIndex : 'phasingStepType',
			flex : 0.2,
            renderer : function(e, sample, record){
				var html  = "";
				try{              
                    dust.render("phasinggrid.prepare", record.data, function(err, out){
                        html = out;
                    });
				}
				catch(e){
					return "Parsing error";
				}
				return html;
			}
		},   
         {
			text : 'Substructure Determination',
			dataIndex : 'phasingStepType',
			flex : 0.4,
            renderer : function(e, sample, record){
				var html  = "";
				try{              
                    dust.render("phasinggrid.substructure", record.data.children, function(err, out){
                        html = out;
                    });
				}
				catch(e){
					return "Parsing error";
				}
				return html;
			}
		},    
         {
			text : 'Phasing',
			dataIndex : 'phasingStepType',
			flex : 1,
            renderer : function(e, sample, record){
				var html  = "";
				try{   
                    var subs =  record.data.children;                    
                    for (var i = 0 ;i < subs.length; i++){ 
                        for (var j = 0 ;j < subs[i].children.length; j++){
                            var child =   subs[i].children[j];
                            if (child.metric){    
                                                                                          
                                  if (child.statisticsValue){                                       
                                        child.statistics = [];
                                       
                                        for(k=0; k < child.metric.split(",").length; k++){
                                            child.statistics.push({
                                                name : child.metric.split(",")[k],
                                                value : child.statisticsValue.split(",")[k]
                                            });
                                       
                                    }
                                }
                            }
                        }         
                        dust.render("phasinggrid.stats", subs[i].children, function(err, out){
                            html = html + "<br />" + out;
                        });
                       
                    }
				}
				catch(e){
					return "Parsing error " + e;
				}
				return html;
			}
		},             
        {
			text : 'Metrics and Statistics',
			dataIndex : 'phasingStepType',
			flex : 1,
            hidden : true,
            renderer : function(e, sample, record){
				var html  = "";
                return html;
				try{
                   // if (record.data.metric){
                    //    if (record.data.statisticsValue){
                            /*var metricsList = record.data.metric.split(",");
                            var statsList = record.data.statisticsValue.split(",");
                            var data = [];
                            for(var i =0; i< metricsList.length; i++){
                                data.push({
                                   name :  metricsList[i],
                                   value :  statsList[i],
                                   
                                });
                            }
                            data.push({
                                name :  "Low Resolution",
                                value :  record.data.lowRes,
                            });
                               data.push({
                                name :  "High Resolution",
                                value :  record.data.highRes,
                            });
                            */        
                            
                            dust.render("phasinggrid.stats", record.data, function(err, out){
                                html = out;
                            });
                    //    }
                        
                  //  }
                    
				
				}
				catch(e){
					return "Parsing error";
				}
				return html;
			}
		}

		],
		flex : 1
	});

	/** Adding the tbar **/
	if (this.tbar) {
		this.panel.addDocked({
			xtype : 'toolbar',
			cls : 'toolBarGrid',
			height : 48,
			items : this._getTbar()
		});
	}
	return this.panel;
};



/**
* This class renders a network graph with the PhasingStep
*
* @class PhasingNetworkWidget
* @constructor
*/
function PhasingNetworkWidget(args){
	this.id = BUI.id();
	this.data = [];

	/** "OPEN_VIEWER" **/
	this.tbar = "MENU";
	
	
    
	if (args != null){
		if (args.tbar != null){
			this.tbar = args.tbar;
		}
	}
}

PhasingNetworkWidget.prototype.clear = function(){
	document.getElementById(this.id).innerHTML = "";
};

PhasingNetworkWidget.prototype.getTbar = function(){
	var _this = this;
	if (this.tbar == "MENU"){
		return [
						Ext.create('Ext.button.Split', {
						    text: 'View',
						    handler: function() {
						       
						    },
						    menu: new Ext.menu.Menu({
						        items: [
									{
										text: 'Default', 
										handler: function(){ 
											_this.layout = {
											    };
											_this.render();
										
									}},
						            {
						            	text: 'Horizontal',      	
						            	handler: function(){ 
						            		_this.layout = {
						            		        hierarchical: {
						            		            direction: "UD",
						            		            levelSeparation : 100
						            		        }
						            		    };
						            		_this.render();
						            	
						            }},
						            {
 
						            	text: 'Vertical', 
						            	handler: function(){ 
						            		_this.layout = {
						            		        hierarchical: {
						            		            direction: "LR",
						            		            levelSeparation : 100
						            		        }
						            		    };
						            		_this.render();
						            	
						            }},
						        ]
						    })
						})
		       ];
		
	}
	else{
		return [
		           { 
		        	   xtype: 'button', 
		        	   text: 'Open Viewer', 
		        	   handler : function(sender){
		        		   location.hash = "/autoprocintegration/datacollection/" + _this.data[0].v_datacollection_summary_phasing_dataCollectionId + "/phasingviewer/main";
		        	   } 
		           }
	    ];
	}
};

PhasingNetworkWidget.prototype.getPanel = function(){
	var _this = this;
	this.panel = Ext.create('Ext.panel.Panel', {
	   layout : 'fit',
	    border: 1,
	    margin : 5,
	    tbar: this.getTbar(),
	    cls : "borderGrid",
	    items: [
	    {
	    	html : "<div style=' height: 600px;min-height: 100% !important;display:block;overflow:auto;' id='" + this.id +"'>Select an autoprocIntegration</div>"
	    }],
	    listeners : {
			afterrender : function(component, eOpts) {
				_this.render();
		}
	    }
	});
	return this.panel;
};


PhasingNetworkWidget.prototype.getLabelByNode = function(node){
    debugger
	if (node.phasingStepType == "PREPARE"){
		return "Pepare" +
				"\n" +
				node.phasingPrograms +
				"\n" +
				node.lowRes + " - " + node.highRes +
				"\n" +
				node.spaceGroupShortName +
				"\n" +
				node.method;
				
		
	}
	
	if (node.phasingStepType == "PHASING"){
		return "Phasing" +
		        "\n" +
				node.phasingPrograms +
				"\n" +
				node.lowRes + " - " + node.highRes +
				"\n" +
				node.spaceGroupShortName +
				"\n" +
				node.method;
		
	}
	
	if (node.phasingStepType == "SUBSTRUCTUREDETERMINATION"){
		return "Substructure" +
				"\n" +
				node.phasingPrograms +
				"\n" +
				node.lowRes + " - " + node.highRes +
				"\n" +
				node.spaceGroupShortName +
				"\n" +
				node.method;
	}
    
    if (node.phasingStepType == "MODELBUILDING"){
		return "Model" +
				"\n" +
				node.phasingPrograms +
				"\n" +
				node.lowRes + " - " + node.highRes +
				"\n" +
				node.spaceGroupShortName +
				"\n" +
				node.method;
	}
	return node.phasingStepType;
};
/**
* It renders the network by using viz.js
* http://visjs.org/
*
* @method render
*/
PhasingNetworkWidget.prototype.render = function(){
	var _this =this;
	 
	//_this.panel.setLoading("Rendering");
//	$.when(_this._render()).then(function( data, textStatus, jqXHR ) {
//		  _this.panel.setLoading(false);
//	});
	/* contrived example alert */
	//setTimeout(function(){  _this.panel.setLoading(false); }, 6000);
	//setTimeout(function(){ _this._render(); }, 1000);
	_this._render();
	
};


PhasingNetworkWidget.prototype._render = function(){
	var nodes = [];
	var edges = [];
	
	/** Start Node **/
	/*nodes.push({
		id 		: 1,
		label 	: "START",
		font	: {size:8}
	});*/
	
	for (var i = 0; i < this.data.length; i++) {
		if (this.data[i].phasingStepId != null){
			var color = 'lime';
			switch(this.data[i].phasingStepType) {
				    case "PREPARE":
				        color = "#FF5733";
				        break;
				    case "SUBSTRUCTUREDETERMINATION":
				    	color = "#FFF8A8";
				        break;
                    case "MODELBUILDING":
				    	color = "#82FA58";
				        break;
				    default:
				    	color = '#F7FE2E';
			}
			
			nodes.push({
				id 		: this.data[i].phasingStepId,
				label 	: this.getLabelByNode(this.data[i]),// + "-- " + this.data[i].spaceGroupShortName,
				color	: color,
				font	: {size:12}
			});
			
			
			/** Edges **/
			var previous = this.data[i].previousPhasingStepId;
			var label = "";
			
			/** This is root **/
			if (previous == null){
					if (this.data[i].phasingStepType == "PHASING"){
						previous = -1;
					}
					else{
						/** Adding spacegroup Node**/
						nodes.push({
							id 		: this.data[i].phasingStepId + this.data[i].spaceGroupShortName,
							label 	: this.data[i].spaceGroupShortName,
							color	: "orange",
							font	: {size:32}
						});
						previous = this.data[i].phasingStepId + this.data[i].spaceGroupShortName;
						
						edges.push({
							 from	: null, 
							 to		: this.data[i].phasingStepId + this.data[i].spaceGroupShortName,
							 label	: label,
							 arrows	:'to',
							 font	: {size:8}
						});
					}
			}
			
			
			
			
			edges.push({
					 from	: previous, 
					 to		: this.data[i].phasingStepId,
					 label	: label,
					 arrows	:'to',
					 font	: {size:8}
			});
		}
	}
	  var container = document.getElementById('mynetwork');
	  var data = {
	    nodes: nodes,
	    edges: edges
	  };
  
        var options = {
            height: '100%',
             width: '100%',
            "edges": {
                "smooth": {
                "type": "discrete",
                "forceDirection": "vertical",
                "roundness": 0.25
                }
            },
            "physics": {
                "barnesHut": {
                "gravitationalConstant": -12550,
                "springLength": 145
                },
                "minVelocity": 0.75,
                "timestep": 0.62
            }
        }
     
	  this.network = new vis.Network(document.getElementById(this.id), data, options)
};

/**
* It just loads the data but it will not be rendered
* Rendering is done when afterrender method is triggered
*
* @method load
* @param {Object} autoprocIntegrationList This is a list of autoprocintegration retrieved from the phasing view
*/
PhasingNetworkWidget.prototype.load = function(autoprocIntegrationList){	
	/** First we concat all arrays **/
	this.data = [].concat.apply([], autoprocIntegrationList);
	
	if (document.getElementById(this.id) != null){
		this.clear();
		this.render();
	}
	
	
};



function PhasingViewerMainView() {
	MainView.call(this);	
	var _this = this;
	this.phasingNetworkWidget = new PhasingNetworkWidget({tbar : "MENU"});
    
   // this.phasingGrid = new PhasingGrid();
    this.summaryPhasingGrid = new SummaryPhasingGrid();
    this.fileManagerPhasingGrid = new FileManagerPhasingGrid();
    
    
    this.summaryPhasingGrid.onSelect.attach(function(sender, phasingStep){
       var onSuccess = function(sender, data){           
           if (data){
                data = _.flatten(data);
                var files = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].fileName != null){
                        files.push(data[i]);
                    }
                    
                }           
                _this.fileManagerPhasingGrid.load(files);
                _this.fileManagerPhasingGrid.panel.setLoading(false);
           }
       }
       
       var onError = function(sender,error){
           alert(error);
           _this.fileManagerPhasingGrid.panel.setLoading(false);
       }
       _this.fileManagerPhasingGrid.panel.setLoading();    
       EXI.getDataAdapter({onSuccess : onSuccess,onError: onError }).mx.phasing.getPhasingFilesByPhasingStepId(phasingStep.phasingStepId);
	
    });
}

PhasingViewerMainView.prototype.getPanel = MainView.prototype.getPanel;


PhasingViewerMainView.prototype.getContainer = function() {
	this.tabPanel = Ext.create('Ext.tab.Panel', {
				margin : 10,
				cls : 'border-grid',
				defaults : {
						anchor : '100%'
				},
				items : [
                            
                            {
                                title: 'Summary',
                                bodyPadding: 10,
                                items : [{
                                    xtype: 'container',
                                    layout : 'hbox',
                                    items : [
                                                this.summaryPhasingGrid.getPanel(),
                                                this.fileManagerPhasingGrid.getPanel()
                                                                                    
                                    ]
                                
                                }]
                            },
                           /* {
                                title: 'Phasing Dataset',
                                bodyPadding: 10,
                                items : this.phasingGrid.getPanel()
                            },*/
                             {
                                title: 'Network',
                                bodyPadding: 10,
                                items : this.phasingNetworkWidget.getPanel()
                            }
                           
				         	
					]
			});

	return this.tabPanel;

};


PhasingViewerMainView.prototype.load = function(data, phasingStepId) {
	var _this = this;
	this.panel.setTitle("Phasing Viewer");
    
    /** filtering data */
    var phasingStepIdParantes = [];
    var aux = [];
    if (phasingStepId){
            var parent = _.find(data, function(b){return  b.phasingStepId == phasingStepId});
          if (parent != null){ 
                aux.push(parent);
                phasingStepIdParantes.push(parent.phasingStepId);
            }
            
        for(var i =0; i< data.length; i++){            
            if (_.find(phasingStepIdParantes, function(b){return  b == data[i].previousPhasingStepId}) != null){ 
                aux.push(data[i]);
                phasingStepIdParantes.push(data[i].phasingStepId);
            }
            
        }
        data =aux;
        
    }
    
    
    this.summaryPhasingGrid.load(data);
    _this.phasingNetworkWidget.load(data);
   
};

/**
* It shows a summary about the phasing steps. Basically, one line per space group 
*
* @class SummaryPhasingGrid
* @constructor
*/
function SummaryPhasingGrid(args) {
	
    this.pseudoFreeMin = 24;
    this.ccOfPartialModel = 60;
    
    this.onSelect = new Event(this);
};

SummaryPhasingGrid.prototype.load = function(data) {
   
  /** Adding metrics as columns on the phasing Step */
   for (var i = 0; i < data.length; i++) {
       var element = data[i];
       if (element.metric){
           var metrics = element.metric.split(",");
           var statisticsValues = element.statisticsValue.split(",");
           if (metrics.length > 0){            
               for (var j = 0; j < metrics.length; j++) {
                   console.log(metrics[j])
                   
                   element[metrics[j]] = statisticsValues[j];
               }
               
           }
       }
   }
   this.data = data;
   this.store.loadData(data);
};


SummaryPhasingGrid.prototype.filter = function(data, metric, min, max) {
        
        var filterFunction = function(b){ 
            
            if (b){
                if(b[metric]){
                    
                    try{
                        if (Number(b[metric]) > min){
                            if (Number(b[metric]) < max){
                                return true;
                            }
                        }
                    
                    }   
                    catch(e){
                        return false;
                    }
                }
            }
            return false;
        }
        return _.filter(data, filterFunction);
};

SummaryPhasingGrid.prototype.getPanel = function() {
	var _this = this;
	this.store = Ext.create('Ext.data.Store', {
		fields : [  
                    'phasingStepId',
                    'previousPhasingStepId',
                    'processingPrograms',
                    'processingStatus',
                    'proposalId',
                    'sessionId',
                    'solventContent',
                    'spaceGroup',
                    'spaceGroupShortName',
                    'statisticsValue',
                    'phasingStepType',
                    'method',
                    'lowRes',
                    'highRes',
                    'phasingPrograms',
                    'enantiomorph',
                    'anomalous',
                    'Pseudo_free_CC',
                    'CC of partial model',
                    'anomalous',
                    'acronym',
                    'Average Fragment Length']
	});
    
    var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect : true,
		//mode : 'multi',
		listeners : {
			select : function(sm, selection) {
               _this.onSelect.notify(selection.data);
						}

		} });
        
    this.pseudofreeCCSplitter =    Ext.create('Ext.slider.Multi', {
            width: 300,           
            hideLabel: false,
            fieldLabel : 'Pseudo Free CC',
            increment: 1,
            minValue: 0,
            maxValue: 120,
            values: [0, 100]
    });
    
    this.ccOfPartialModel =    Ext.create('Ext.slider.Multi', {
            width: 300,           
            hideLabel: false,
            fieldLabel : 'CC of Partial Model',
            increment: 1,
            minValue: 0,
            maxValue: 120,
            values: [0, 100]
    });
    
        
    this.tbar = Ext.create('Ext.toolbar.Toolbar', {
 
    width   : 500,
    items: [
       
         
         this.pseudofreeCCSplitter ,
         this.ccOfPartialModel,
     
        '-', // same as {xtype: 'tbseparator'} to create Ext.toolbar.Separator
        {
            // xtype: 'button', // default for Toolbars
            text: 'Apply filter',
            listeners : {
                click : function(){
                    var data = _this.filter(_this.data, 'Pseudo_free_CC',  _this.pseudofreeCCSplitter.getValues()[0],  _this.pseudofreeCCSplitter.getValues()[1]);
                    _this.store.loadData(_this.filter(data, 'CC of partial model',  _this.ccOfPartialModel.getValues()[0],  _this.ccOfPartialModel.getValues()[1]));
                }
                
            }
        },
          {
            // xtype: 'button', // default for Toolbars
            text: 'Clear filter',
            listeners : {
                click : function(){
                  
                    _this.store.loadData(_this.data);
                }
                
            }
        }
    ]
});

	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Phasing Steps',
		store : this.store,
        selModel : selModel,
        tbar :  this.tbar,
        height : 600,
        cls : 'border-grid',
		layout : 'fit',
        flex : 1,
         viewConfig : {
                    stripeRows : true,
                    getRowClass : function(record, rowIndex, rowParams, store){

                      /*  if (record.data.phasingStepType == "PREPARE"){
                            return "blue-grid-row";
                        }
                        if (record.data.phasingStepType == "SUBSTRUCTUREDETERMINATION"){
                            return "blue2-grid-row";
                        }
                        if (record.data.phasingStepType == "PHASING"){
                            return "blue3-grid-row";
                        }
                        if (record.data.phasingStepType == "MODELBUILDING"){
                            return "white-grid-row";
                        }
                        return "warning-grid-row";*/
                    }
                },
		columns : [ 
                         {
                            text : 'Space Group',
                            flex : 1,
                            dataIndex : 'spaceGroupShortName'
                        },
                        {
                            text : 'Steps',
                            columns : [     {
                                                text : 'Prepare',
                                                flex : 1,
                                                dataIndex : 'previousPhasingStepId',
                                                renderer : function(grid, e, record){
                                                    
                                                    if (record.data.phasingStepType == "PREPARE"){
                                                        return record.data.phasingPrograms.toUpperCase();
                                                    }
                                                }
                                            },
                                             {
                                                text : 'Subs. Deter.',
                                                flex : 1,
                                                dataIndex : 'previousPhasingStepId',
                                                renderer : function(grid, e, record){
                                                   
                                                    if (record.data.phasingStepType == "SUBSTRUCTUREDETERMINATION"){
                                                        return record.data.phasingPrograms.toUpperCase()
                                                    }
                                                }
                                            },
                                             {
                                                text : 'Phasing',
                                                flex : 1,
                                                dataIndex : 'previousPhasingStepId',
                                                renderer : function(grid, e, record){
                                                   
                                                    if (record.data.phasingStepType == "PHASING"){
                                                         return record.data.phasingPrograms.toUpperCase()
                                                    }
                                                }
                                            },
                                             {
                                                text : 'Model',
                                                flex : 1,
                                                dataIndex : 'previousPhasingStepId',
                                                renderer : function(grid, e, record){
                                                    if (record.data.phasingStepType == "MODELBUILDING"){
                                                         return record.data.phasingPrograms.toUpperCase()
                                                    }
                                                }
                                            },
                            ]
                        },
                         {
                            text : 'phasingStepId',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'phasingStepId'
                      
                        },
                         {
                            text : 'previousPhasingStepId',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'previousPhasingStepId'
                        },
                         {
                            text : 'phasingStepId',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'phasingStepId'
                        },
                        
                          {
                            text : 'Protein',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'acronym'
                        },
                         {
                            text : 'Method',
                            flex : 1,
                            dataIndex : 'method'
                        },
                         {
                            text : 'Low Resolution',
                            flex : 1,
                            dataIndex : 'lowRes',
                            renderer : function(grid, e, record){
                                                    if (record.data.phasingStepType == "MODELBUILDING"){
                                                         return record.data.lowRes + " - " + record.data.highRes 
                                                    }
                                                }
                        },
                         {
                            text : 'High Resolution',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'highRes'
                        },
                         {
                            text : 'Enantiomorph',
                            flex : 1,
                            dataIndex : 'enantiomorph'
                        },
                         {
                            text : 'Anomalous',
                            flex : 1,
                            dataIndex : 'anomalous'
                        },
                         {
                            text : 'Solvent',
                            flex : 1,
                            dataIndex : 'solventContent'
                        },
                         {
                            text : ' Program',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'phasingPrograms'
                        },
                         {
                            text : 'Pseudo Free <br />(CC)',
                            flex : 1,
                            dataIndex : 'Pseudo_free_CC'
                        },
                         {
                            text : 'Partial Model <br />(CC)',
                            flex : 1,
                            dataIndex : 'CC of partial model'
                        },
                          {
                            text : 'Avg. Fragment <br />Length',
                            flex : 1,
                            dataIndex : 'Average Fragment Length'
                        }
                        
                       
                        
                ]
	});
	return this.panel;
};



function ContainerPrepareSpreadSheet(){
    this.id = BUI.id();    
}


ContainerPrepareSpreadSheet.prototype.load = function(dewars){
  var hotSettings = {
    data: dewars,
    columns: [
        {
            data: 'shippingName',
            type: 'text',
            width: 40,
            readOnly: true
        },           
        {
            data: 'barCode',
            type: 'text',
            readOnly: true
        },
        {
            data: 'containerCode',
            type: 'text',
            readOnly: true
        },
        {
            data: 'sampleCount',
            type: 'text',
            readOnly: true
        },
        { 
            data : 'beamlineName',
            type: 'dropdown',			        	 								
            source: EXI.credentialManager.getBeamlines()
        },
        {
            data: 'sampleChangerLocation',
            type: 'text'
        }       
    ],
    stretchH: 'all',   
    autoWrapRow: true,      
    rowHeaders: true,
    colHeaders: [
        'Shipment',       
        'Barcode',
        'Container',
        'Samples',
        'Beamline',
        'Sample Changer Location'
    ]
};
  this.spreadSheet =  new Handsontable(document.getElementById(this.id), hotSettings);
};
ContainerPrepareSpreadSheet.prototype.getPanel = function(){
    var _this = this;    
    this.panel = Ext.create('Ext.panel.Panel', {
            title   : 'Loaded or to be Loaded on MxCube',            
            cls     : 'border-grid',            
            height  : 600,
            flex    : 0.5,  
            buttons : [{
                            text : 'Save',
                            scope : this,
                            handler : function() {
                               var data = this.spreadSheet.getData();
                               var containerIdList = [];
                               var beamlineList = [];
                               var sampleLocation = [];
                               for(var i = 0; i < data.length; i++){
                                   containerIdList.push(data[i].containerId);
                                   beamlineList.push(data[i].beamlineName);
                                   sampleLocation.push(data[i].sampleChangerLocation);
                                   
                               }
                               _this.panel.setLoading();
                               var onSuccess = function(sender){
                                   _this.panel.setLoading(false);
                               };
                               
                               var onError = function(sender, error){
                                   EXI.setError(error);                                   
                                   _this.panel.setLoading(false);
                               };
                               EXI.getDataAdapter({onSuccess:onSuccess, onError: onError}).proposal.dewar.updateSampleLocation(containerIdList, beamlineList, sampleLocation);
                            }
		    }],                     
            margin  : 5,
            items   : [
                {
                    html : "<div style='height:700px;' id='" + this.id +"'></div>",
                    flex : 1,
                    height : 700                              
                }
                
            ]
    });
    return this.panel;
    
}
/**
* This class renders a grid that allows user to select the dewars from a list.
*
* @class DewarListSelectorGrid
* @constructor
*/
function DewarListSelectorGrid(args){
    this.height = 600;
    if (args != null){
        if (args.height  != null){
            this.height = args.height;
            
        }
    }
    
    this.filterByDate = true;
    
    this.onSelect = new Event(this);
    this.onDeselect = new Event(this);
    this.onSelectionChange = new Event(this);
}


/**
* My method description.  Like other pieces of your comment blocks, 
* this can span multiple lines.
*
* @method load
* @param {Object} dewars Array of containers
*/
DewarListSelectorGrid.prototype.load = function(dewars){
    var _this = this;
    this.dewars = dewars;
    /** Filter by Dewars */ 
      
    var filtered = _.keyBy(dewars, "shippingId");
    var data = [];
    _(filtered).forEach(function(value) {
        if (_this.filterByDate){
            if (value.shippingStatus){
                if (value.shippingStatus.toUpperCase() == "PROCESSING"){
                    data.push(value);
                    return;
                }                        
            }       
        
            /** Filtering only future sessions */            
            if (value.sessionStartDate){
                if (moment().diff(moment(value.sessionStartDate, "'MMMM Do YYYY, h:mm:ss a'")) <= 0){
                    data.push(value);
                }
            }
            else{
                /** No session or not parseable */
                data.push(value);
            }
        }
        else{
                data.push(value);
        }
        
    });
        
    this.panel.setTitle(data.length + " shipments candidates for " + EXI.proposalManager.getProposals()[0].code + EXI.proposalManager.getProposals()[0].number);    
    this.store.loadData(data);

};

/**
* Return the number of containers and samples for a given dewar 
*
* @method getStatsByDewarId
* @param {Integer} dewarId DewarId
*/
DewarListSelectorGrid.prototype.getStatsByDewarId = function(shippingId){ 
    var _this = this;
    var containers = _.filter(this.dewars, function(e){return e.shippingId == shippingId;});
    var sampleCount = 0;
    _(containers).forEach(function(value) {
        sampleCount = sampleCount + value.sampleCount;
    });      
    return {
                samples     : sampleCount,
                dewars      : Object.keys(_.groupBy(containers, "dewarId")).length,
                containers   : containers.length
        
    };
};

DewarListSelectorGrid.prototype.getSelectedData = function() {
	var elements = this.panel.getSelectionModel().selected.items;
	var data = [];
	for (var i = 0; i < elements.length; i++) {
		data.push(elements[i].data);
	}
	return data;
};

DewarListSelectorGrid.prototype.getStore = function(){
    this.store = Ext.create('Ext.data.Store', {
        fields:['beamlineLocation', 'storageLocation','containerStatus','containerType','sessionStartDate','creationDate','beamLineOperator','shippingStatus','shippingName', 'barCode', 'beamlineName', 'dewarCode', 'dewarStatus', 'sampleChangerLocation', 'sampleCount', 'sessionStartDate', 'type']
    });
    return this.store;
};
DewarListSelectorGrid.prototype.getPanel = function(){
    var _this = this;
   
    this.tbar = Ext.create('Ext.toolbar.Toolbar', {
    
    items: [
       
        {
            xtype       : 'checkboxfield',
            boxLabel    : 'Display only shipments scheduled for future sessions',
            checked     : this.filterByDate,
            listeners : {
                change : function( cb, newValue, oldValue, eOpts ){
                    _this.filterByDate = newValue;
                    _this.load(_this.dewars);
                }
                
            }
        }
    ]
    });

    this.panel = Ext.create('Ext.grid.Panel', {
            title: 'Select dewars',
            store: this.getStore(),
            cls : 'border-grid',           
            height : this.height, 
            flex : 0.5, 
            tbar : this.tbar,                 
            margin : 5,
            columns: [ 
                {
                    text    : 'Shipment',
                    columns : [
                         { text: 'Name',  dataIndex: 'shippingName', width: 150 },
                         { text: 'Status',  dataIndex: 'shippingStatus', flex: 1 },
                         { text: 'Created on',  dataIndex: 'creationDate', flex: 1,   hidden : true,
                            renderer : function(grid, a, record){
                                if (record.data.creationDate){
                                    return moment(record.data.creationDate, "'MMMM Do YYYY, h:mm:ss a'").format("DD/MM/YYYY");
                                }     
                                
                            } 
                        },
                                                 
                    ]                                         
                },
                {
                    text    : 'Experiment',
                    columns : [
                            { text: 'Start on',  dataIndex: 'sessionStartDate', flex: 2, 
                            renderer : function(grid, a, record){
                                if (record.data.sessionStartDate){
                                    return moment(record.data.sessionStartDate, "'MMMM Do YYYY, h:mm:ss a'").format("DD/MM/YYYY");
                                }     
                                
                            } 
                        },
                            { text: 'beamline', dataIndex: 'beamlineName', flex: 1 },     
                            { text: 'Local contact',  dataIndex: 'beamLineOperator', flex: 2, hidden : true  }                 
                    ]                                         
                },              
                 {      
                        text: '#Dewars/#Parcels (#Samples)',     
                        flex: 1,
                        renderer : function(grid, e, record){
                            var stats =  _this.getStatsByDewarId(record.data.shippingId);
                            return stats.dewars + " / " + stats.containers + " (" +  stats.samples + ")";
                            
                        }
                },
                {
                    xtype: 'actioncolumn',
                    flex : 0.3,
                    items: [
                               
                                 {
                                    icon: '../images/icon/add.png',
                                    handler: function (grid, rowIndex, colIndex) {
                                        
                                            grid.getSelectionModel().select(rowIndex);
                                            
                                            _this.onSelect.notify(_this.store.getAt(rowIndex).data);
                                    },
                                     isDisabled : function(view, rowIndex, colIndex, item, record) {
                                            // Returns true if 'editable' is false (, null, or undefined)
                                            return record.data.shippingStatus == "processing";
                                    }
                                 }
                                   
                            
                    ]
                },
                  {
                    xtype: 'actioncolumn',
                     flex : 0.3,
                    items: [
                              
                                 {
                                    icon: '../images/icon/ic_highlight_remove_black_48dp.png',
                                    handler: function (grid, rowIndex, colIndex) {
                                        
                                            grid.getSelectionModel().select(rowIndex);
                                            
                                            _this.onSelect.notify(_this.store.getAt(rowIndex).data);
                                    },
                                     isDisabled : function(view, rowIndex, colIndex, item, record) {
                                            // Returns true if 'editable' is false (, null, or undefined)
                                            return record.data.shippingStatus != "processing";
                                    }
                                 }
                                   
                            
                    ]
                }
            ],
             viewConfig : {
                stripeRows : true,
                getRowClass : function(record, rowIndex, rowParams, store){

                    if (record.data.shippingStatus == "processing"){
                         return "warning-grid-row";                       
                    }
                   
                }
	    	},
    });
    return this.panel;
    
}

function PrepareMainView() {
	this.icon = '../images/icon/contacts.png';
	this.queueGridList = [];

	MainView.call(this);

    var _this = this;
    
    this.dewarListSelector = new DewarListSelectorGrid({height : 600});
    this.dewarListSelector.onSelect.attach(function(sender, dewar){                       
            if (dewar.shippingStatus == "processing"){
                _this.updateStatus(dewar.shippingId, "at ESRF");
            } 
            if (dewar.shippingStatus != "processing"){
                _this.updateStatus(dewar.shippingId, "processing");
            }      
     });
     
    this.dewarListSelector.onSelectionChange.attach(function(sender, dewars){
    });
    
	this.containerListEditor = new ContainerPrepareSpreadSheet({height : 600});
};

PrepareMainView.prototype.updateStatus = function(shippingId, status) {
    var _this = this;
    _this.dewarListSelector.panel.setLoading("Updating shipment Status");
    var onStatusSuccess = function(sender, dewar) {     
        EXI.mainStatusBar.showReady("Processing update successfully");
        _this.dewarListSelector.panel.setLoading(false);
        _this.load();
    }
    var onError = function(data){
            EXI.setError(data);
    }
    
    EXI.getDataAdapter({onSuccess : onStatusSuccess, onError : onError}).proposal.shipping.updateStatus(shippingId,status);
};

PrepareMainView.prototype.getPanel = function() {
	this.panel =  Ext.create('Ext.panel.Panel', {
           layout : 'hbox',
            items : [
                        this.dewarListSelector.getPanel(), 
                        this.containerListEditor.getPanel()        
            ]
	});    
    return this.panel;
};

PrepareMainView.prototype.load = function() {
    var _this = this;
    _this.panel.setTitle("Prepare Experiment");
    _this.dewarListSelector.panel.setLoading();
    var onSuccessProposal = function(sender, containers) {        
        _this.containers = containers;
        
        _this.dewarListSelector.load(containers);
        _this.dewarListSelector.panel.setLoading(false);
        
        /** Selecting containers that are processing */
        var processingContainers = _.filter(containers, function(e){return e.shippingStatus == "processing";});
 
        _this.containerListEditor.load(processingContainers);
        
    };
     var onError = function(sender, error) {        
        EXI.setError("Ops, there was an error");
        _this.dewarListSelector.panel.setLoading(false);
    };
    
    EXI.getDataAdapter({onSuccess : onSuccessProposal, onError:onError}).proposal.dewar.getDewarsByProposal();
};

function WorkflowStepMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	
	var _this = this;
	
}

WorkflowStepMainView.prototype.getPanel = MainView.prototype.getPanel;


WorkflowStepMainView.prototype.getContainer = function() {
	this.mainPanel = Ext.create('Ext.panel.Panel', {
	    cls : 'border-grid',	 
        autoScroll: true,
        title : "Workflow",
        margin : '10 0 0 10',
	    //height : 800,
	    flex : 1,
	    items: [
	    ]
	});
	return this.mainPanel;
};


WorkflowStepMainView.prototype.getGrid = function(title, columns, data) {
	var store = Ext.create('Ext.data.Store', {
        fields:columns,
        data:data
    });
    var gridColumns = [];
    for (var i = 0; i < columns.length; i++) {
         gridColumns.push({ text: columns[i],  dataIndex: columns[i], flex: 1 });
    }
    return Ext.create('Ext.grid.Panel', {
        title: title,
        flex : 1,
        margin : '10 180 10 10',
        cls : 'border-grid',	 
        store: store,
        columns: gridColumns
    });
};

WorkflowStepMainView.prototype.getImageResolution = function(imageItem) {  
    if (imageItem.xsize){
        var ratio = imageItem.xsize/1024;
        imageItem.xsize = imageItem.xsize*ratio;
        imageItem.ysize = imageItem.ysize*ratio;
    }
    return imageItem;
};

WorkflowStepMainView.prototype.getImagesResolution = function(imageItems) {  
    var resolution = 1024;
   
    resolution = resolution/imageItems.length;
    for (var i = 0; i < imageItems.length; i++) {
        var imageItem = imageItems[i];        
         if (imageItem.xsize){
            var ratio = resolution/imageItem.xsize;
            imageItem.xsize = imageItem.xsize*ratio;
            imageItem.ysize = imageItem.ysize*ratio;
        } 
    }
    return imageItems;
};

WorkflowStepMainView.prototype.load = function(workflowStep) {
    var _this = this;
    this.panel.setTitle("Workflow");
    _this.mainPanel.removeAll();
     _this.mainPanel.setLoading();
    function onSuccess(sender, data){    
   
        var items = JSON.parse(data).items;
        _this.panel.setTitle(JSON.parse(data).title);
        
        var insertContainer = function(err, out){        
                    _this.mainPanel.insert({
                            padding : 2,
                           
                            html : out
                    });
        };
        
        for (var i = 0; i < items.length; i++) {
            console.log(items[i]);
            if (items[i].type == "table"){
                  _this.mainPanel.insert(_this.getGrid(items[i].title,items[i].columns, items[i].data));
            }
            else{
                if (items[i].type == "image"){
                    items[i] = _this.getImageResolution(items[i]);
                }
                
                 if (items[i].type == "images"){
                    items[i].items = _this.getImagesResolution(items[i].items);
                   
                }
               
                dust.render("workflowstepmain_main_steps", items[i], insertContainer);
            }
        }
      
        _this.mainPanel.setLoading(false);
    }
    
    EXI.getDataAdapter({onSuccess: onSuccess}).mx.workflowstep.getResultByWorkflowStepId(workflowStep.workflowStepId);
		
};





/**
* This view shows a main plot with the spectrum and a grid with the elements
*
* @class XfeViewerMainView
* @constructor
*/
function XfeViewerMainView() {
    this.id = BUI.id();
    MainView.call(this);

    //this.filters = ['channel', 'counts', 'Energy', 'fit', 'continuum', 'pileup'];
    this.filters = [];

    this.data = {
        labels : [], // labels = [{name: 'axisX', x: true, y, false},{name: 'axisXY', x: false, y, true}] 
        data   : [] 
    };
}

XfeViewerMainView.prototype.getPanel = MainView.prototype.getPanel;

/**
* Makes an store and a grid where the labels of the csv will be shown 
*
* @method getGrid
* @return {Grid} Retuns a Ext.panel.Grid
*/
XfeViewerMainView.prototype.getGrid = function() {
    var _this = this;
    /** Store for labels */
    this.store = Ext.create('Ext.data.Store', {
        fields: ['name', 'value', 'x', 'y'],
        sorters: [{ property: 'value', direction: 'DESC' }]
    });
    return this.grid = Ext.create('Ext.grid.Panel', {
        title: 'Labels',
        store: this.store,
        cls: 'border-grid',        
        width: 300,
        height: 700,
        columns: [
            {
                text: 'name',
                dataIndex: 'name',
                flex: 1
            },
            {
                text: 'value',
                dataIndex: 'value',
                flex: 1
            },
            {
                text : 'x',
                dataIndex: '',
                id : this.id + 'x',
                flex: 0.5,
                renderer : function(grid, sample, record){
                    
                    var id = _this.id + "_" +record.data.name + "_X"; 
                    if (record.data.x){
                        return '<input disabled id="' + id+'" type="checkbox" name="x" value="bike" checked>';
                    }
                    else{
                        return '<input id="' + id+'" type="checkbox" name="x" value="bike">';
                    }
                }
            },{
                text : 'y',
                dataIndex: '',
                id : this.id + 'y',
                flex: 0.5,
                renderer : function(grid, sample, record){
                     var id = _this.id + "_" +record.data.name + "_Y"; 
                      if (record.data.y){
                        return '<input id="' + id+'" type="checkbox" name="y" value="bike" checked="' + record.data.y + '">';
                      }
                        else{
                         return '<input id="' + id+'" type="checkbox" name="y" value="bike">';
                    }
                }
            }
        ],
        listeners : {
            cellclick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts ){
                /** This is X */
                if (cellIndex == 2){
                    _this.setXColumn(record.data.name, document.getElementById(_this.id + "_" + record.data.name + "_X").checked);
                }
                
                /** This is Y */
                if (cellIndex == 3){
                    _this.setYColumn(record.data.name, document.getElementById(_this.id + "_" + record.data.name + "_Y").checked);
                }
                _this.parseData();
            }
            
            
        }
    });
};

/**
* Sets as X axis the column labelName is selected is true. It sets to false all the other labels for the value X
*
* @method setXColumn
*/
XfeViewerMainView.prototype.setXColumn = function(labelName, selected) {
    var label = _.filter(this.data.labels, function(o){ return o.name == labelName});
    if (label){
        /** As X only can be one we set all x to false */
        this.data.labels = _.map(this.data.labels,  function disable(o){o.x = false; return o;});
        if (label[0]){
            label[0].x = selected;
            label[0].y = !selected;
        }
    }
    this.store.loadData(this.data.labels);
 
};

/**
* Sets the value to selected of the attribute Y of a label
*
* @method setXColumn
*/
XfeViewerMainView.prototype.setYColumn = function(labelName, selected) {
    var label = _.filter(this.data.labels, function(o){ return o.name == labelName});
    if (label){
        if (label[0]){
            label[0].y = selected;
        }
    }
    this.store.loadData(this.data.labels);
 
};

/**
* Returns the containers. There are four container 2xHbox(2xvbox)
*
* @method getContainer
* @return {Grid} Retuns a Ext.panel.Grid
*/
XfeViewerMainView.prototype.getContainer = function() {
    var _this = this;

    return Ext.create('Ext.container.Container', {
        layout: {
            type: 'hbox'
        },
        margin: 10,
        items: [
            {
                xtype: 'container',
                margin: '5 0 0 5',
                width: 300,
                items: [
                    this.getGrid()
                 
                ]
            },
            {
                xtype: 'container',
                flex: 0.8,
                margin: '5 0 0 5',
                items: [
                    {
                        html: '<div style="width:100%"  id="plot' + _this.id + '"></div>',
                        cls: 'border-grid',
                        id: this.id + 'containerLayout',
                        height: 700,

                    },
                    {
                        html: 'Results produced by <a href="http://pymca.sourceforge.net/">PyMca</a>',
                        cls: 'border-grid',
                        margin: '2 0 0 0',
                        flex: 1,
                        height: 20
                    }
                ]

            }
        ]
    });
};

/**
* Convert the labels as array of string into json and load in the store
* labels = ["l1, "l1"]
* sum = [1, 2]
*
* 
* @method getSumForLabels
* @return {json} Retuns [{name:'l1', value:1}, {name:'l2', value:2}]
*/
XfeViewerMainView.prototype.getSumForLabels = function(labels, sum) {
    var _this = this;
    /** Loading grid of labels */
    try {
        function toJson(el) {
            return {
                name: el[0].name,
                x: el[0].x,
                y: el[0].y,
                value: el[1]
            };
        }
        /** This converts to arrays labels and sum in a single json array with name and value */
        var data = _.map(_.zip(labels, sum), toJson);
        data = _.reject(data, function(o) {
            return (_.indexOf(_this.filters, o.name) != -1);
        });
        return data;
    }
    catch (err) {
        console.log(err);
    }
};



/**
* Sums the values for each columns 
*
* 
* @method sumByColums
* @return {Array} Retuns the value of sum for each column in an array
*/
XfeViewerMainView.prototype.sumByColums = function(labels, data) {
    var sum = new Array( labels.length);
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            if (sum[j] == null) {
                sum[j] = 0;
            }
            sum[j] = sum[j] + data[i][j];
        }
    }
    return sum;
};

XfeViewerMainView.prototype.getDataColumn = function(data, indexes) {
    function reduceColumns(row){
        return  _.pullAt(row, indexes);
    }
    /** Using slice to make a copy by value */
   return _.map(data, reduceColumns);

};
XfeViewerMainView.prototype.parseData = function() {
    /** get X column */
   
    /** We need first to clone in order to not touch the original data */
    var duplicatedData = _.cloneDeep(this.data.data);
    
    /** Getting the label X and data X */
    var labelX = _.filter(this.data.labels, function(o){ return o.x;})[0];
    var dataX =  this.getDataColumn(duplicatedData, [_.indexOf(this.data.labels, labelX)]);
   
   /** Getting the labels Y and data Y */
   var duplicatedData = _.cloneDeep(this.data.data);
    var labelsY = _.filter(this.data.labels.slice(), function(o){ return o.y;});
    /** Getting indexes for Y columns */
    var indexes = [];
    
    for (var i = 0; i < labelsY.length; i++){
        indexes.push(_.indexOf(this.data.labels, labelsY[i]));
    }
    
    var data =  this.getDataColumn(duplicatedData, indexes);
  
   
    for (var i = 0; i < dataX.length; i++) {
        data[i] = _.concat(dataX[i], data[i]);
    }
   
    this.renderPlot( _.concat(labelX, labelsY), data);
};

/**
* It transposes the data in order to calculate the max value of Y for each statistic then it create the annotation by getting the index X
*
* 
* @method getAnnotations
*/
XfeViewerMainView.prototype.getAnnotations = function(data, labels) {
    var annotations = [];
    if (data){
        /**  First, we transpose the matrix **/
        var transposed = data[0].map(function(col, i) { 
            return data.map(function(row) { 
                return row[i] 
            })
        });
       
        for (var i = 0; i < labels.length; i++) {
                var max = _.max(transposed[i]);
                var index = _.findIndex(transposed[i], function(o) { return o == max; });
                annotations.push({
                            x           : data[index][0],
                            shortText   : labels[i].name,//this.data.labels[i].name,
                            text        : labels[i].name,
                            series      : labels[i].name,
                            width       : 100,
                            height      : 25
                    }
                );
        }
    }
    return annotations;
};
/**
* Render the dygraph widget on a container that should exists with id = this.id
*
* 
* @method renderPlot
*/
XfeViewerMainView.prototype.renderPlot = function(labels, data) {
    var _this = this;
  
    /** Plotting */
    var g = new Dygraph(
        document.getElementById("plot" + this.id),
        data,
        {
            legend: 'always',
            title: 'XRF',
            labels :   _.map(labels, 'name'),
            height: 600,
            width: 800,
            displayAnnotations : true,
            //sigFigs : false,
            //stackedGraph: false,
            labelsSeparateLines : true,
            labelsShowZeroValues : false,
            logscale : false,
            ylabel: 'Count'
        }
    );
  
     g.ready(function() { 
        g.setAnnotations(_this.getAnnotations(data, labels));
    });
    
};

/**
* Parser the first line of the csv file
*
* 
* @method parseHeaders
*/
XfeViewerMainView.prototype.parseHeaders = function(line) {
    /** Only first is used as X */
    var counter = 0;
    function remove(element) {
        counter = counter + 1;
        return {
                    name : element.replace(new RegExp("\"", 'g'), ""),
                    x    : counter == 1,
                    y    :  counter != 1
        }
     };
     return _.map(line.split(","), remove);
};
/**
* Gets the csv data, parses it and plot it
*
* 
* @method plot
*/
XfeViewerMainView.prototype.plot = function() {
    var _this = this;
    $.ajax({
        url: EXI.getDataAdapter().mx.xfescan.getCSV(this.xfeFluorescenceSpectrumId),
        context: this

    }).done(function(csv) {
        if (csv) {
            var lines = csv.split("\n");
            var labelsHeader = [];
            if (lines) {
                if (lines[0]) {
                   this.data.labels = this.parseHeaders(lines[0]);
                   
                }
                else {
                    /** No Lines */
                    EXI.setError("No labels on csv");
                    return;
                }

                function convertToNumber(element) {
                    var elements = element.split(',');
                    function toNumber(el) {
                        return parseFloat(el);
                    }
                    elements = _.map(elements, toNumber);
                    return elements;
                }
                /** Parsing data it means remove labels, split by , and convert to number */
                this.data.data = _.map(_.slice(lines, 1, lines.length - 1), convertToNumber);
                
                /** Fills the labels grid */
                try {
                    
                    this.data.labels = this.getSumForLabels(this.data.labels, this.sumByColums( _this.data.labels, _this.data.data));
                    this.store.loadData(this.data.labels);
                }
                catch (e) {
                    EXI.setError(e.message);
                }
                try {
                    
                    this.renderPlot( this.data.labels,  this.data.data);
                }
                catch (e) {
                    EXI.setError(e.message);
                }
            }
        }
        else {
            /** No Lines */
            EXI.setError("CSV is empty");
            return;
        }
    });
};



XfeViewerMainView.prototype.load = function(xfeFluorescenceSpectrumId) {
    var _this = this;
    this.panel.setTitle("XRF Viewer");
    this.xfeFluorescenceSpectrumId = xfeFluorescenceSpectrumId;
    this.plot();

};

function AutoProcIntegrationAttachmentGrid(args) {
	this.id = BUI.id();	
	this.maxHeight = 300;
};

AutoProcIntegrationAttachmentGrid.prototype.load = function(data) {
    if (data){
	       this.store.loadData(data, false);
    }
};

AutoProcIntegrationAttachmentGrid.prototype.getPanel = function() {
	var _this = this;
	this.store = Ext.create('Ext.data.Store', {
		fields : [  ]
	});
    	
	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Auto-Processing Files',
		store : this.store,
		cls : 'border-grid',
		margin : 5,
		overflow :'auto',
        height : 500,
		columns : [ 		
                    {
                        text : 'fileName',
                        dataIndex : 'fileName',
                        flex : 1,
                        renderer : function(grid, opt, val, val2, val3){
                            var url = EXI.getDataAdapter().mx.autoproc.getDownloadAttachmentUrl(val.data.autoProcProgramAttachmentId);
                            return '<a href="'+ url + '">'+ val.data.fileName + '</a>';				
                        }
                    }
		],
		flex : 1,
		viewConfig : {
			stripeRows : true
		}
	});
	return this.panel;
};

/**
* It shows information from the autoprocessing like cells (a,b,c,alpha,beta,gamma) and also about phasing
*
* @class AutoProcIntegrationGrid
* @constructor
*/
function AutoProcIntegrationGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	
	this.preventSelection = false;
	this.maxHeight = 500;
	this.minHeight = 500;
    this.minHeight = 500;
      
    
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
        
		if (args.maxHeight != null) {
			this.maxHeight = args.maxHeight;
		}
		if (args.searchBar != null) {
			this.searchBar = args.searchBar;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.collapsed != null) {
			this.collapsed = args.collapsed;
		}

		if (args.width != null) {
			this.width = args.width;
		}              
	}	
	this.onSelected = new Event(this);
};

AutoProcIntegrationGrid.prototype.load = function(data) {
	this.store.loadData(data, false);
};

AutoProcIntegrationGrid.prototype.selectRowByAutoProcIntegrationId = function(autoProcIntegrationId) {
	this.preventSelection = true;
	this.panel.getSelectionModel().select(this.store.find("v_datacollection_summary_phasing_autoProcIntegrationId", autoProcIntegrationId));
};

AutoProcIntegrationGrid.prototype.getPhasing = function(data) {      
    var phasing = [];
    
    if (data.spaceGroupShortName){
        
        var spaceGroups = data.spaceGroupShortName.split(',');
        var steps = data.phasingStepType.split('PREPARE');
        
        for(var i = 0; i < spaceGroups.length; i++){
            
            phasing.push({
                spaceGroup              : spaceGroups[i],
                prepare                 : true,
                sub                     : steps[i+1].indexOf("SUBSTRUCTUREDETERMINATION") != -1,
                phasing                 : steps[i+1].indexOf("PHASING") != -1,
                model                   : steps[i+1].indexOf("MODEL") != -1,
                autoProcIntegrationId   : data.v_datacollection_summary_phasing_autoProcIntegrationId
            });
        }
        
        
    }
    return phasing;
};                 

AutoProcIntegrationGrid.prototype.getStatistics = function(data) {	                    
    var type = data.scalingStatisticsType.split(",");
    function getValue(attribute, i){
        if (attribute){
            var splitted = attribute.split(",");
            if (splitted[i]){
                return splitted[i];
            }
        }
        return "";
        
    }
    var parsed = [];
    for (var i = 0; i < type.length; i++) {
        parsed.push({
            type 					: type[i],
            resolutionLimitLow 		: getValue(data.resolutionLimitLow, i),
            resolutionLimitHigh 	: getValue(data.resolutionLimitHigh, i),
            multiplicity 			: getValue(data.multiplicity, i),
            meanIOverSigI 			: getValue(data.meanIOverSigI, i),
            completeness 			: getValue(data.completeness, i),
            rMerge 			        : getValue(data.rMerge, i),
            ccHalf 			        : getValue(data.ccHalf, i),
            rPimWithinIPlusIMinus 	: getValue(data.rPimWithinIPlusIMinus, i),
            rMeasAllIPlusIMinus 	: getValue(data.rMeasAllIPlusIMinus, i)
            
        });
    }
    return parsed;    				
};

AutoProcIntegrationGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		sorters : 'spaceGroup',
		fields : [ 'autoProcId',
		           'refinedCellA', 
                   'v_datacollection_summary_phasing_autoProcIntegrationId',
		           'autoProcIntegrationId',
		           'v_datacollection_summary_phasing_anomalous',
		           'v_datacollection_summary_phasing_processingPrograms',
		           'v_datacollection_summary_phasing_autoproc_space_group']
	});
    
	var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect : true,
		mode : 'multi',
		listeners : {
			selectionchange : function(sm, selections) {
				var records = [];
				if (selections != null) {
					for (var i = 0; i < selections.length; i++) {
						records.push(selections[i].data);
					}

					/** Event is only triggered if node is a leaf **/
					if (!_this.preventSelection){
						_this.onSelected.notify(records);
					}
					else{
						_this.preventSelection = false;
					}
				}
			}
		} 
    });
	
	this.panel = Ext.create('Ext.grid.Panel', {		
		store : this.store,
		selModel : selModel,
		cls : 'border-grid',
        layout : 'fit',
		columns : [             
                    {
                        text : 'autoProcIntegrationId',
                        dataIndex : 'processingPrograms',
                        flex : 1,
                        hidden : true,
                        renderer : function(e, sample, record){
                            return record.data.v_datacollection_summary_phasing_autoProcIntegrationId;
                        }
                    },        
                    {
                        dataIndex: 'dataCollectionGroup',
                        name: 'dataCollectionGroup',
                        flex: 1.5,
                        hidden: false,
                        renderer: function(grid, e, record) {
                            var data = record.data;// _this._getAutoprocessingStatistics(record.data);                               
                            var html = "";                
                            // Getting statistics                
                            data.statistics = _this.getStatistics(record.data);
                            data.phasing = _this.getPhasing(record.data);                
                            dust.render("autoprocintegrationgrid.template", data, function(err, out) {
                                html = html + out;
                                
                            });
                        return html;
                        }
                    }                        		
		],
		flex : 1,
          viewConfig : {
                preserveScrollOnRefresh: true,
                stripeRows : true,                
	    	}
	});

	return this.panel;
};





/**
* It shows information from the autoprocessing like cells (a,b,c,alpha,beta,gamma) and also about phasing
*
* @class AutoProcIntegrationFileExplorerGrid
* @constructor
*/
function AutoProcIntegrationFileExplorerGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	
	this.preventSelection = false;
	this.maxHeight = 500;
	this.minHeight = 500;
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.maxHeight != null) {
			this.maxHeight = args.maxHeight;
		}
		if (args.searchBar != null) {
			this.searchBar = args.searchBar;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.collapsed != null) {
			this.collapsed = args.collapsed;
		}

		if (args.width != null) {
			this.width = args.width;
		}
	}
	
	this.onSelected = new Event(this);
	
};

AutoProcIntegrationFileExplorerGrid.prototype.load = function(data) {
	this.store.loadData(data, false);
};

AutoProcIntegrationFileExplorerGrid.prototype.selectRowByAutoProcIntegrationId = function(autoProcIntegrationId) {
	this.preventSelection = true;
	this.panel.getSelectionModel().select(this.store.find("v_datacollection_summary_phasing_autoProcIntegrationId", autoProcIntegrationId));
};

AutoProcIntegrationFileExplorerGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		sorters : 'spaceGroup',
		fields : [ 'autoProcId',
		           'refinedCellA', 
                   'v_datacollection_summary_phasing_autoProcIntegrationId',
		           'autoProcIntegrationId',
		           'v_datacollection_summary_phasing_anomalous',
		           'v_datacollection_summary_phasing_processingPrograms',
		           'v_datacollection_summary_phasing_autoproc_space_group']
	});
    
	var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect : true,
		mode : 'multi',
		listeners : {
			selectionchange : function(sm, selections) {
				var records = [];
				if (selections != null) {
					for (var i = 0; i < selections.length; i++) {
						records.push(selections[i].data);
					}

					/** Event is only triggered if node is a leaf **/
					if (!_this.preventSelection){
						_this.onSelected.notify(records);
					}
					else{
						_this.preventSelection = false;
					}
				}
			}

		} });
	
	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Auto-Processing Integration',
		store : this.store,
		selModel : selModel,
		cls : 'border-grid',
        layout : 'fit',
		//maxHeight : this.maxHeight,
		//minHeight : this.maxHeight,
		columns : [ 
            
            {
			text : 'autoProcIntegrationId',
			dataIndex : 'processingPrograms',
            flex : 1,
            hidden : true,
			renderer : function(e, sample, record){
                return record.data.v_datacollection_summary_phasing_autoProcIntegrationId;
			}
		},
        {
			text : 'Autoprocessing',
			dataIndex : 'processingPrograms',
            flex : 1,
			renderer : function(e, sample, record){
				return record.data.v_datacollection_summary_phasing_processingPrograms;
			}
		},
        {
			text : 'Space Group',
            flex : 0.75,
			dataIndex : 'v_datacollection_summary_phasing_autoproc_space_group',
			renderer : function(e, sample, record){
				return record.data.v_datacollection_summary_phasing_autoproc_space_group;
			}
		},
		{
			text : 'Unit cell',
			dataIndex : 'processingPrograms',
			flex : 1.5,
			renderer : function(e, sample, record){
				var html  = "";
				try{
					dust.render("AutoProcIntegrationFileExplorerGrid_autoprocolumn", record.data, function(err, out){
						html = out;
					});
				}
				catch(e){
					return "Parsing error";
				}
				return html;
			}
		},
		{
			text : 'Statistics',
			dataIndex : 'processingPrograms',
			flex : 3,
			renderer : function(e, sample, record){
				try{
					var type = record.data.scalingStatisticsType.split(",");
					var resolutionLimitLow = record.data.resolutionLimitLow.split(",");
					var resolutionLimitHigh = record.data.resolutionLimitHigh.split(",");
					var multiplicity = record.data.multiplicity.split(",");
					var meanIOverSigI = record.data.meanIOverSigI.split(",");
					var completeness = record.data.completeness.split(",");
					
					var parsed = [];
					for (var i = 0; i < type.length; i++) {
						parsed.push({
							type 					: type[i],
							resolutionLimitLow 		: resolutionLimitLow[i],
							resolutionLimitHigh 	: resolutionLimitHigh[i],
							multiplicity 			: multiplicity[i],
							meanIOverSigI 			: meanIOverSigI[i],
							completeness 			: completeness[i]
							
						});
					}
					var html  = "";
					dust.render("AutoProcIntegrationFileExplorerGrid_statistics", parsed, function(err, out){
						html = out;
					});
				}
				catch(e){
					return "<span class='summary_datacollection_parameter_name'>Not found</span>";
				}
				return html;
			}
		},
		{
			text : 'Phasing',
			dataIndex : 'processingPrograms',
            hidden : true,
			flex : 1.5,
			renderer : function(e, sample, record){
				var html  = "";
				if (record.data.phasingStepType){			
					try{
						dust.render("AutoProcIntegrationFileExplorerGrid_phasing", record.data, function(err, out){
							html = out;
						});
					}
					catch(e){
						return "Parsing error";
					}
				}
				return html;
			}
		}
		
		],
		flex : 1,
		viewConfig : {
			//stripeRows : true,
			preserveScrollOnRefresh: true,
			listeners : {
			}
		}
	});

	return this.panel;
};





function CurvePlotter(args) {
    this.id = BUI.id();

    this.backgroundColor = "#FFFFFF";

    this.margin = '0 0 0 5';
    this.ruleColor = "black";
    this.targetId = "plotCanvas" + BUI.id();
    this.legend = 'onmouseover';

    if (args != null) {
        if (args.margin != null) {
            this.margin = args.margin;
        }
        if (args.legend != null) {
            this.legend = args.legend;
        }
    }

    this.onRendered = new Event(this);
    this.onPointClickCallback = new Event();

}

CurvePlotter.prototype.getPanel = function() {
    this.plotPanel = Ext.create('Ext.container.Container', {
        layout: {
            type: 'hbox'
        },
        flex: 0.7,
        margin: this.margin,
        items: [{
            html: '<div id="' + this.targetId + '"></div>',
            id: this.id,
        }]
    });

    this.plotPanel.on("afterrender", function() {
    });

    this.plotPanel.on("resize", function() {
    });
    return this.plotPanel;
};

CurvePlotter.prototype.getPointCount = function() {
    return this.dygraph.rawData_.length;
};

CurvePlotter.prototype.getColors = function() {
    return this.dygraph.getColors();
};

CurvePlotter.prototype.getLabels = function() {
    return this.dygraph.getLabels();
};

CurvePlotter.prototype.render = function(url) {
    var _this = this;
    if (document.getElementById(this.targetId) != null) {
        document.getElementById(this.targetId).innerHTML = "";

        this.width = this.plotPanel.getWidth();
        this.height = this.plotPanel.getHeight();

        document.getElementById(this.targetId).setAttribute("style", "border: 1px solid #000000; height:" + (this.plotPanel.getHeight() - 1) + "px;width:" + (this.plotPanel.getWidth() - 2) + "px;");

        Ext.getCmp(this.id).setHeight(this.plotPanel.getHeight());
        Ext.getCmp(this.id).setWidth(this.plotPanel.getWidth());


        this.dygraph = new Dygraph(
            document.getElementById(this.targetId),
            url,
            {
                title: this.title,
                titleHeight: 20,

                legend: this.legend,
                labelsSeparateLines: true,
                errorBars: true,
                connectSeparatedPoints: true,
                pointClickCallback: function(e, p) {
                    _this.onPointClickCallback.notify(p.name);
                }
            }

        );

        var _this = this;
        this.dygraph.ready(function() {
            _this.onRendered.notify();
        });

    }
};

CurvePlotter.prototype.loadMerge = function(subtractionIdList, from, to, scale) {
    this.render(EXI.getDataAdapter().saxs.hplc.getFramesMergeURL(subtractionIdList, from, to, scale));
};

CurvePlotter.prototype.loadHPLCFrame = function(experimentId, frameNumber) {
    this.render(EXI.getDataAdapter().saxs.hplc.getHPLCFramesScatteringURL(experimentId, frameNumber));
};

CurvePlotter.prototype.loadUrl = function(url) {
    this.render(url);
};


CurvePlotter.prototype.load = function(selections) {
    this.render(EXI.getDataAdapter().saxs.frame.getFramesURL(selections.frame, selections.average, selections.subtracted, selections.sampleaverage, selections.bufferaverage));
};







function AutoProcIntegrationCurvePlotter(args) {
    CurvePlotter.call(this, args);

    this.margin = '10 0 0 0';
    this.height = null;
    this.title = "";
    if (args != null) {
        if (args.height != null) {
            this.height = args.height;
        }
        if (args.title != null) {
            this.title = args.title;
        }
    }

    this.data = {
        labels: [], // labels = [{name: 'axisX', x: true, y, false},{name: 'axisXY', x: false, y, true}] 
        data: []
    };

    this.xLabels = [];
}


AutoProcIntegrationCurvePlotter.prototype.getPointCount = CurvePlotter.prototype.getPointCount;
AutoProcIntegrationCurvePlotter.prototype.getLabels = CurvePlotter.prototype.getLabels;


AutoProcIntegrationCurvePlotter.prototype.toCSV = function(labels, data) {
    var csv = labels.toString() + "\n";
    for (var i = 0; i< data.length; i++){
        for (var j = 0; j< data[i].length; j++){
            csv = csv +  data[i][j] + "," ;
        }
        /** Removing last , */
        csv = csv.substring(0, csv.length - 1);
        csv = csv + "\n";
        
    }
    return csv;
};
/**
* Render the dygraph widget on a container that should exists with id = this.id
*
* 
* @method render
*/
AutoProcIntegrationCurvePlotter.prototype.render = function(labels, data) {
    var _this = this;

   
   
    /** Plotting */
    var g = new Dygraph(
        document.getElementById(this.targetId),
        this.toCSV(labels, data),
        {
            title: this.title,
            titleHeight: 20,
            legend : 'always',
            height: this.height - 100,
            hideOverlayOnMouseOut :true,
            labelsSeparateLines: true,
            labelsDiv :_this.targetId + "_legend",
            labelsDivStyles : " { 'fontSize': 6 } ",
            axisLabelWidth : 20,
           
            connectSeparatedPoints: true,
            pointClickCallback: function(e, p) {
                _this.onPointClickCallback.notify(p.name);
            },
            axes: {
                x: {
                     pixelsPerXLabel : 30,
                    axisLabelFormatter: function(d, gran, opts) {
                        return _this.xLabels[d];                        
                    }
                }
            }
        }

    );

    g.ready(function() {
        //g.setAnnotations(_this.getAnnotations(data, labels));
    });

};

/**
 * Example csv
Resolution,11259175,11259180,11259326
2.4,143.9,0,143.9,0,,0
2.57,99.2,0,99.2,0,,0
2.77,62.7,0,62.7,0,,0
3.04,41.4,0,41.4,0,,0
3.39,24.0,0,24.0,0,,0
3.74,,0,,0,56.0,0
3.87,,0,,0,55.0,0
3.91,18.2,0,18.2,0,,0
4.03,,0,,0,53.0,0
4.21,,0,,0,53.6,0
4.43,,0,,0,54.6,0
4.71,,0,,0,53.9,0
4.78,19.1,0,19.1,0,,0
5.07,,0,,0,49.2,0
5.59,,0,,0,52.2,0
6.39,,0,,0,45.5,0
6.73,16.4,0,16.4,0,,0
8.05,,0,,0,38.1,0
 */
AutoProcIntegrationCurvePlotter.prototype.loadUrl = function(url) {

    var _this = this;
    $.ajax({
        url: url,
        context: this

    }).done(function(csv) {
        var index = 0;
        var _this = this;
        _this.xLabels = [];
        if (csv) {
            var lines = csv.split("\n");
            var labelsHeader = [];

            if (lines) {
                if (lines[0]) {
                    this.data.labels = lines[0].split(",");

                }
                else {
                    /** No Lines */
                    EXI.setError("No labels on csv");
                    return;
                }

                function convertToNumber(element) {
                    var noError = [];

                    var elements = element.split(',');
                    
                    function toNumber(el) {
                        if (el) {
                            if (el != "") {
                                return parseFloat(el);
                            }
                            else {
                                return "";
                            }
                        }
                        else {
                            return "";
                        }
                    }
                    elements = _.map(elements, toNumber);


                    /** Removing the errors */
                    var noError = [];
                    //noError.push(elements[0]);
                    noError.push(index);
                    _this.xLabels.push(elements[0]);

                    for (var i = 1; i < elements.length; i++) {
                        if (i % 2 != 0) {
                            noError.push(elements[i]);
                        }
                    }
                    index = index + 1;
                    return noError;
                }
                lines = lines.reverse();
                /** Parsing data it means remove labels, split by , and convert to number */
                this.data.data = _.map(_.slice(lines, 1, lines.length - 1), convertToNumber);


                try {

                    this.render(this.data.labels, this.data.data);
                }
                catch (e) {
                    EXI.setError(e.message);
                }
            }
        }
        else {
            /** No Lines */
            EXI.setError("CSV is empty");
            return;
        }
    });

};

AutoProcIntegrationCurvePlotter.prototype.getPanel = function() {
    
    this.plotPanel = Ext.create('Ext.panel.Panel', {
        layout: {
            type: 'fit'
        },
        height: this.height,
        margin: this.margin,
        items: [{
                    html: '<div  id="' + this.targetId + '"></div><div  style="height:20px" id="' + this.targetId + '_legend"></div>',
                    id: this.id,
                    style: {
                      border: "1px solid black"  
                    },
                    height : this.height,
                    border : 1
        }
       
        ]
    });

    this.plotPanel.on("afterrender", function() {
    });

    this.plotPanel.on("resize", function() {
    });
    return this.plotPanel;
};


/**
* EnergyScanGrid displays the information fo a energyscan
*
* @class EnergyScanGrid
* @constructor
*/
function EnergyScanGrid(args) {
  
}

/**
* @method returns the panel with no data
*/
EnergyScanGrid.prototype.getPanel = function(dataCollectionGroup) {

    this.store = Ext.create('Ext.data.Store', {
        fields: ["dataCollectionGroup"]
    });
    
      this.panel = Ext.create('Ext.grid.Panel', {
        border: 1,
        padding : 5,
        store: this.store,
        disableSelection: true,
        columns: [
            {
                header: '',
                dataIndex: 'dataCollectionGroup',
                name: 'dataCollectionGroup',
                flex: 0.2,
                renderer: function(grid, e, record) {
                    var html = "";                
                    record.data.choochURL = EXI.getDataAdapter().mx.energyscan.getChoochJpegByEnergyScanId(record.data.energyScanId);
                    dust.render("energyscangrid.template", record.data, function(err, out) {  
                        html = out;
                    });
                    return html;
                }
            }                         
        ],       
        viewConfig: {
	        			 enableTextSelection: true,
                         stripeRows : true
        }

    });
    return this.panel;
};

EnergyScanGrid.prototype.load = function(energyScanList) {
    this.store.loadData(energyScanList);   
};

/**
* XFEScanGrid displays the information fo a XFE
*
* @class XFEScanGrid
* @constructor
*/
function XFEScanGrid(args) {
    this.id = BUI.id();

    this.plots = {};
}

/**
* 
* @method getPanel
*/
XFEScanGrid.prototype.getPanel = function(dataCollectionGroup) {
    var _this = this;
    this.store = Ext.create('Ext.data.Store', {
        fields: ["dataCollectionGroup"]
    });
    this.panel = Ext.create('Ext.grid.Panel', {

        cls: 'borderGrid',
        height: 800,
        store: this.store,
        disableSelection: true,
        columns: this.getColumns(),
        viewConfig: {
            enableTextSelection: true,
            stripeRows: true
        },
        listeners: {
            boxready: function(component, eOpts) {

                for (var id in _this.plots) {
                    new Dygraph(document.getElementById(_this.plots[id].containerId),
                        _this.plots[id]["url"], {
                            legend: 'never',
                            title: '',
                            height: 150,
                            width: 400,
                            stackedGraph: true,
                            labelsDiv: document.getElementById(_this.plots[id].labelsContainerId),
                            labelsSeparateLines: true,
                            labelsDivWidth: 100,
                            labelsShowZeroValues: false,


                            highlightCircleSize: 2,
                            strokeWidth: 1,
                            strokeBorderWidth: 1,

                            highlightSeriesOpts: {
                                strokeWidth: 3,
                                strokeBorderWidth: 1,
                                highlightCircleSize: 5
                            },
                            ylabel: 'Count',
                        });
                }


            }
        }
    });


    return this.panel;
};

XFEScanGrid.prototype._getHTMLZoomImage = function(url, dataCollectionId, imageId) {
    return '<img style="width:400px;height:100;"  data-src=' + url + ' src=' + url + '>';
};


/**
* @method getColumns defines the columns of the grid and associates the data
*/
XFEScanGrid.prototype.getColumns = function() {
    var _this = this;
    var columns = [

        {
            header: 'Experiment Parameters',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1,
            renderer: function(grid, e, record) {
                var containerId = _this.id + record.data.xfeFluorescenceSpectrumId;
                _this.plots[record.data.xfeFluorescenceSpectrumId] = {
                    containerId: containerId,
                    labelsContainerId: containerId + "labels",
                    url: EXI.getDataAdapter().mx.xfescan.getCSV(record.data.xfeFluorescenceSpectrumId)
                };


                var html = "";

                record.data["xfeFluorescenceSpectrumId"] = record.data.xfeFluorescenceSpectrumId;
                record.data["containerId"] = containerId;


                dust.render("xfescangrid.template", record.data, function(err, out) {
                    html = out;
                });
                return html;

            }
        },

        {
            header: '',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            hidden: true,
            flex: 2,
            renderer: function(grid, e, record) {

                return _this._getHTMLZoomImage(EXI.getDataAdapter().mx.xfescan.getXFEJpegByScanId(record.data.xfeFluorescenceSpectrumId));


            }
        }
        /* ,
        {
            header: 'PyMca Results',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            width: 600,
            hidden: true,
            renderer: function(grid, e, record) {
                var containerId = _this.id + record.data.xfeFluorescenceSpectrumId;
                _this.plots[record.data.xfeFluorescenceSpectrumId] = {
                    containerId: containerId,
                    labelsContainerId: containerId + "labels",
                    url: EXI.getDataAdapter().mx.xfescan.getCSV(record.data.xfeFluorescenceSpectrumId)
                };


                var html = "";
                dust.render("xfescangrid.plot", { xfeFluorescenceSpectrumId: record.data.xfeFluorescenceSpectrumId, containerId: containerId }, function(err, out) {
                    html = out;
                });
                return html;


                // return "<div id='" + containerId +"'></div>";


            }
        }
        {
             header: 'Labels',
             dataIndex: 'dataCollectionGroup',
             name: 'dataCollectionGroup',
             flex: 2,
             renderer: function(grid, e, record) {
                 var labelsContainerId =  _this.id + record.data.xfeFluorescenceSpectrumId + "labels";
                 return "<div  id='" + labelsContainerId +"'></div>";
          
 
             }
         }*/

    ];
    return columns;
};

/**
* @method receive a json with an array of energy as it is defined on the view 
* of ISPyB 
*/
XFEScanGrid.prototype.load = function(data) {
    this.store.loadData(data);
};