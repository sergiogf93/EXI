function ExiSAXS() {
	var _this = this;
	this.mainMenu = new MainMenu();
	ExiSAXSController.init();
	
	/** Status bar **/
	this.mainStatusBar = new MainStatusBar();
	
	/** WorkSpace Panel **/
	this.workspacePanel = new WorkSpaceListView();
	
	/** Storage Object **/
	this.localExtorage = new ExtLocalExtorage();
	this.localExtorage.onAdded.attach(function(sender){
		_this.loadSelected(sender.selectedSubtractionsManager.getSelected());
	});
	this.localExtorage.onRemoved.attach(function(sender){
		_this.loadSelected(sender.selectedSubtractionsManager.getSelected());
	});
	this.localExtorage.onUserAdded.attach(function(sender, projects){
		_this.workspacePanel.loadProjects(projects);
	});
	
	
	
	this.onAfterRender = new Event(this);

}

ExiSAXS.prototype.loadSelected = function(selected) {
	this.workspacePanel.setSelectedItems(selected);
	/** decollapse workspace panel **/
	if (Ext.getCmp("workspace").collapsed != false){
		Ext.getCmp("workspace").expand();
	}
};

//ExiSAXS.prototype.loadNavigationPanel = function(listView, mainView) {
//	var _this = this;
//	
//	this.__listenMainViewEvents__(mainView);
//
//	/** Clean navigation panel * */
//	this.clearNavigationPanel();
//	this.setLoadingNavigationPanel(true);
//	/** Add Navigation Panel * */
//	this.addNavigationPanel(listView);
//
//	/** Load data to navigation Panel * */
//	var adapter = new DataAdapter();
//	adapter.onSuccess.attach(function(sender, data) {
//		listView.load(data);
//		if (mainView != null) {
//			/**
//			 * When data is selected from navigation panel it is loaded on the
//			 * main panel *
//			 */
//			listView.onSelect.attach(function(sender, selected) {
//				_this.addMainPanel(mainView);
//				mainView.load(selected);
//			});
//		}
//
//		_this.setLoadingNavigationPanel(false);
//	});
//
//	adapter.onError.attach(function(sender, data) {
//		Ext.Msg.alert('Failed', "Ooops, there was an error");
//		_this.setLoadingNavigationPanel(false);
//	});
//	return adapter;
//};


//ExiSAXS.prototype.getProposalsInfo = function() {
//	return this.proposals;
//};

//ExiSAXS.prototype.getExperimentMainView = function() {
//	if (this.experimentMainView == null) {
//		this.experimentMainView = new ExperimentMainView();
//	}
//	return this.experimentMainView;
//};

ExiSAXS.prototype.__listenMainViewEvents__ = function(mainView) {
	var _this = this;
	if (mainView != null) {
		mainView.onSelect.attach(function(sender, element) {
			_this.localExtorage.selectedSubtractionsManager.append(element);
		});
		mainView.onDeselect.attach(function(sender, element) {
			_this.localExtorage.selectedSubtractionsManager.remove(element);
		});
	}
};

//ExiSAXS.prototype.onExperimentClicked = function() {
//	var mainView = this.getExperimentMainView();
//	var listView = new ExperimentListView();
//
//	var _this = this;
//	this.__listenMainViewEvents__(mainView);
//
//	/** Clean navigation panel * */
//	this.clearNavigationPanel();
//	this.setLoadingNavigationPanel(true);
//	/** Add Navigation Panel * */
//	this.addNavigationPanel(listView);
//
//	/** Load data to navigation Panel * */
//	var adapter = new DataAdapter();
//	adapter.onSuccess.attach(function(sender, data) {
//		listView.load(data);
//		if (mainView != null) {
//			/**
//			 * When data is selected from navigation panel it is loaded on the
//			 * main panel *
//			 */
//			listView.onSelect.attach(function(sender, selected) {
//				location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
//			});
//		}
//		_this.setLoadingNavigationPanel(false);
//	});
//
//	adapter.onError.attach(function(sender, data) {
//		Ext.Msg.alert('Failed', "Ooops, there was an error");
//		_this.setLoadingNavigationPanel(false);
//	});
//	adapter.getExperiments();
//
//};

//ExiSAXS.prototype.onMacromoleculeClicked = function() {
//	this.loadNavigationPanel(new MacromoleculeListView(), new MacromoleculeMainView()).getMacromolecules();
//};

//ExiSAXS.prototype.onLoadSession = function(sessionId) {
//	var _this = this;
//	_this.clearNavigationPanel();
//	var experimentListView = new ExperimentListView();
//	var mainView = new ExperimentMainView();
//
//	experimentListView.onSelect.attach(function(sender, selected) {
//		location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
//	});
//	_this.loadNavigationPanel(new ExperimentListView(), _this.getExperimentMainView()).getExperimentsBySessionId(sessionId);
//
//};

/**
 * Adds a new Main panel to the center panel
 * @param mainView
 */
ExiSAXS.prototype.addMainPanel = function(mainView) {
	Ext.getCmp('main_panel').add(mainView.getPanel());
	Ext.getCmp('main_panel').setActiveTab(Ext.getCmp('main_panel').items.length - 1);
};

ExiSAXS.prototype.getSelectedDataCollections = function() {
	var selected = [];
	for (var i = 0; i < this.experimentListView.length; i++) {
		selected = selected.concat(this.experimentListView[i].getSelected());
	}
	return selected;
};

ExiSAXS.prototype.addNavigationPanel = function(listView) {
	Ext.getCmp('navigation').add(listView.getPanel());
};

ExiSAXS.prototype.clearNavigationPanel = function() {
	Ext.getCmp('navigation').removeAll();
};

ExiSAXS.prototype.clearMainPanel = function() {
	Ext.getCmp('main_panel').removeAll();
};

ExiSAXS.prototype.setLoadingNavigationPanel = function(isLoading) {
	Ext.getCmp('navigation').setLoading(isLoading);
};

ExiSAXS.prototype.setLoadingMainPanel = function(isLoading) {
	Ext.getCmp('main_panel').setLoading(isLoading);
};

ExiSAXS.prototype.setError = function(error) {
	this.statusBar.setStatus({
	    text: 'Oops!',
	    iconCls: 'error'
	});
};

ExiSAXS.prototype.setLoading = function(isLoading) {
	if ((isLoading == null) || (isLoading  == true)){
		this.mainStatusBar.showBusy();
	}
	else{
		this.mainStatusBar.showReady();
	}
};

ExiSAXS.prototype.show = function() {
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
													html : '<img class="titleImage" src="images/logo_EMBL.png"><span class="title">ExiSAXS</span><span class="subtitle">Extended ISPyB for SAXS<sub style="font-size:10px;color:orange">BETA</sub></span>',
													xtype : 'component',
													cls : 'titlePanel'

												}, {
													region : 'north',
													cls : 'toolbarPanel',
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
													collapsible : true

												},
												{
													xtype : 'panel',
													id : 'workspace',
													region : 'east',
													width : 250,
													collapsed : true,
													title : 'Workspace',
													split : false,
													layout : 'fit',
//													title : 'Browse by',
													cls : 'navigation',
													collapsible : true,
													items : [_this.workspacePanel.getPanel()]

												},
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
//														if (_this.localExtorage.selectedSubtractionsManager.getSelected().length > 0){
//															_this.loadSelected(_this.localExtorage.selectedSubtractionsManager.getSelected());
//														}
														_this.onAfterRender.notify();
//														
//														/** Is it authenticated otherwise launch authentication **/
//														if (!_this.localExtorage.tokenManager.isAuthenticated()){
//															_this.openAuthentication();
//														}
														
														
														
											} } });
				}

			});
};