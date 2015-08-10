function Exi(args) {
	var _this = this;
	
	this.headerCssClass = "titlePanel";
	
	/** Active Menu **/
	this.mainMenu = new MainMenu();
	/** When user is not logged in **/
	this.anonymousMenu = null;
	/** When user is logged in **/
	this.userMenu = null;
	
	
	this.controllers = [new ExiController()];
	
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
	
//	/** WorkSpace Panel **/
//	this.workspacePanel = new WorkSpaceListView();
//	
//	/** Storage Object **/
//	this.localExtorage = new ExtLocalExtorage();
//	this.localExtorage.onAdded.attach(function(sender){
//		_this.loadSelected(sender.selectedSubtractionsManager.getSelected());
//	});
//	this.localExtorage.onRemoved.attach(function(sender){
//		_this.loadSelected(sender.selectedSubtractionsManager.getSelected());
//	});
//	
//	UserManager.onUserAdded.attach(function(sender, credential){
//		_this.mainMenu.setCredentials();
//	});
//	
//	UserManager.onProposalActive.attach(function(sender, credential){
//		_this.mainMenu.setCredentials();
//	});
	
	this.credentialManager = new CredentialManager();
	
	
	this.credentialManager.onLogout.attach(function(sender){
		_this.mainMenu.populateCredentialsMenu();
		_this.clearMainPanel();
		_this.clearNavigationPanel();
		_this.setAnonymousMenu();
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
		authenticationManager.onSuccess.attach(function(sender, args){
			/** This user has been authenticated **/
			_this.credentialManager.addCredential(args.user, args.roles, args.token, args.url);
			_this.authenticationForm.window.close();
			location.hash = "/welcome/" + args.user + "/main";
		});
		
		authenticationManager.login(args.user, args.password, args.site);
	});
	
	
	
	
	this.onAfterRender = new Event(this);
}

Exi.prototype.getDataAdapter = function(args) {
	return new DataAdapterFactory(args);
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
//	this.workspacePanel.setSelectedItems(selected);
	/** decollapse workspace panel **/
//	if (Ext.getCmp("workspace").collapsed != false){
//		Ext.getCmp("workspace").expand();
//	}
};


//Exi.prototype.__listenMainViewEvents__ = function(mainView) {
//	var _this = this;
//	if (mainView != null) {
//		mainView.onSelect.attach(function(sender, element) {
//			_this.localExtorage.selectedSubtractionsManager.append(element);
//		});
//		mainView.onDeselect.attach(function(sender, element) {
//			_this.localExtorage.selectedSubtractionsManager.remove(element);
//		});
//	}
//};


/**
 * Adds a new Main panel to the center panel
 * @param mainView
 */
Exi.prototype.addMainPanel = function(mainView) {
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
													xtype : 'component',
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
														}
											} } });
				}

			});
};