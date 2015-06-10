function ExiSAXS() {

	var _this = this;
	this.mainMenu = new MainMenu();
	ExiSAXSController.init();

	/** Click events Data Explorer* */
	this.mainMenu.onSessionClicked.attach(function(sender) {
		location.hash = "/session/nav";
		// _this.onSessionsClicked();
	});

	this.mainMenu.onMacromoleculeClicked.attach(function(sender) {
		// _this.onMacromoleculeClicked();
		location.hash = "/macromolecule/nav";
	});

	this.mainMenu.onExperimentClicked.attach(function(sender) {
		// _this.onExperimentClicked();
		location.hash = "/experiment/nav";
	});

	/** Retrieves a function when user clicks back on navigation panel * */
	this.navigationButtonBack = [];

	/** data collections selected * */
	this.selectedDataCollectionList = [];

	this.onAfterRender = new Event();

}

ExiSAXS.prototype.setSelectedItems = function(items) {
	this.selectedDataCollectionList = items;
	localStorage.setItem("selectedDataCollectionList", JSON.stringify(this.selectedDataCollectionList));

	if (this.selectedDataCollectionList.length == 0) {
		this.selectionButton.disable(true);
		// this.selectionButton.setText("No items selected" );
		document.getElementById("selectionButton-btnInnerEl").innerHTML = "No items selected";
	} else {
		this.selectionButton.enable();
		/**
		 * It seems to be a bug when using that functon then grid are scrolled
		 * up *
		 */
		// this.selectionButton.setText(this.selectedDataCollectionList.length +
		// " items selected" );
		document.getElementById("selectionButton-btnInnerEl").innerHTML = this.selectedDataCollectionList.length + " items selected";
	}

};

ExiSAXS.prototype.loadNavigationPanel = function(listView, mainView) {
	var _this = this;
	if (mainView != null) {
		mainView.onSelectionChange.attach(function(sender, elements) {
			_this.setSelectedItems(sender.getSelected());

		});
	}

	/** Clean navigation panel * */
	this.clearNavigationPanel();
	this.setLoadingNavigationPanel(true);
	/** Add Navigation Panel * */
	this.addNavigationPanel(listView);

	/** Load data to navigation Panel * */
	var adapter = new DataAdapter();
	adapter.onSuccess.attach(function(sender, data) {
		listView.load(data);
		if (mainView != null) {
			/**
			 * When data is selected from navigation panel it is loaded on the
			 * main panel *
			 */
			listView.onSelect.attach(function(sender, selected) {
				_this.addMainPanel(mainView);
				mainView.load(selected);
			});
		}

		_this.setLoadingNavigationPanel(false);
	});

	adapter.onError.attach(function(sender, data) {
		Ext.Msg.alert('Failed', "Ooops, there was an error");
		_this.setLoadingNavigationPanel(false);
	});
	return adapter;
};

ExiSAXS.prototype.getExperimentMainView = function() {
	if (this.experimentMainView == null) {
		this.experimentMainView = new ExperimentMainView();
	}
	return this.experimentMainView;
};

ExiSAXS.prototype.onExperimentClicked = function() {
	// this.loadNavigationPanel(new ExperimentListView(),
	// this.getExperimentMainView()).getExperiments();
	var mainView = this.getExperimentMainView();
	var listView = new ExperimentListView();

	var _this = this;
	if (mainView != null) {
		mainView.onSelectionChange.attach(function(sender, elements) {
			_this.setSelectedItems(sender.getSelected());

		});
	}

	/** Clean navigation panel * */
	this.clearNavigationPanel();
	this.setLoadingNavigationPanel(true);
	/** Add Navigation Panel * */
	this.addNavigationPanel(listView);

	/** Load data to navigation Panel * */
	var adapter = new DataAdapter();
	adapter.onSuccess.attach(function(sender, data) {
		listView.load(data);
		if (mainView != null) {
			/**
			 * When data is selected from navigation panel it is loaded on the
			 * main panel *
			 */
			listView.onSelect.attach(function(sender, selected) {
				// _this.addMainPanel(mainView);
				// mainView.load(selected);
				location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
			});
		}
		_this.setLoadingNavigationPanel(false);
	});

	adapter.onError.attach(function(sender, data) {
		Ext.Msg.alert('Failed', "Ooops, there was an error");
		_this.setLoadingNavigationPanel(false);
	});
	adapter.getExperiments();

};

ExiSAXS.prototype.onMacromoleculeClicked = function() {
	this.loadNavigationPanel(new MacromoleculeListView(), new MacromoleculeMainView()).getMacromolecules();
};

ExiSAXS.prototype.onLoadSession = function(sessionId) {
	var _this = this;
	_this.clearNavigationPanel();
	var experimentListView = new ExperimentListView();
	var mainView = new ExperimentMainView();

	experimentListView.onSelect.attach(function(sender, selected) {
		location.hash = "/experiment/experimentId/" + selected[0].experimentId + "/main";
	});
	_this.loadNavigationPanel(new ExperimentListView(), _this.getExperimentMainView()).getExperimentsBySessionId(sessionId);
	var back = function() {
		_this.onSessionsClicked();
	};
	_this.navigationButtonBack.push(back);

};

ExiSAXS.prototype.onSessionsClicked = function() {
	var _this = this;
	var listView = new SessionListView();

	this.clearNavigationPanel();
	this.setLoadingNavigationPanel(true);

	var adapter = new DataAdapter();
	adapter.onSuccess.attach(function(sender, data) {
		_this.addNavigationPanel(listView);
		listView.store.loadData(data);
		_this.setLoadingNavigationPanel(false);

		listView.onSelect.attach(function(sender, selected) {
			location.hash = "/session/nav/" + selected[0].sessionId + "/session";
		});
	});

	adapter.onError.attach(function(sender, data) {
		Ext.Msg.alert('Failed', "Ooops, there was an error");
		_this.onSetLoadingNavigationPanel.notify(false);
	});
	adapter.getSessions();
};

ExiSAXS.prototype.addMainPanel = function(mainView) {
	var _this = this;
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

ExiSAXS.prototype.openPrimaryDataViewer = function() {
	
	
};

ExiSAXS.prototype.getSelectionButton = function() {
	var _this = this;
	
	function getSelected(){
		var ids = [];
		for (var i = 0; i < _this.selectedDataCollectionList.length; i++) {
			ids.push(_this.selectedDataCollectionList[i].dataCollectionId);
		}
		return ids;
	}
	this.selectionButton = Ext.create('Ext.button.Split', {
		text : 'No items Selected',
		handler : function() {
			alert("The button was clicked");
		},
		id : 'selectionButton',
		disabled : true,
		menu : new Ext.menu.Menu({
			items : [ {
				icon : 'images/icon/ic_blur_on_black_18dp.png',
				text : 'Send to Primary Data Viewer',
				handler : function() {
					location.hash = "#/datacollection/dataCollectionId/" + getSelected().toString() + "/primaryviewer";
				} },
				{
					icon : 'images/icon/ic_blur_on_black_18dp.png',
					text : 'Send to Merge Tool',
					handler : function() {
						location.hash = "#/datacollection/dataCollectionId/" + getSelected().toString() + "/merge";
					} }] }) });
	return this.selectionButton;
};

ExiSAXS.prototype.getStatusBar = function() {
	return Ext.create('Ext.ux.StatusBar', {
		id : 'main-status-bar',
		cls : 'statusBar',
		statusAlign : 'right',
		items : [ this.getSelectionButton()

		] });
};

ExiSAXS.prototype.show = function() {
	var _this = this;

	Ext
			.application({
				name : 'AM',
				// controllers: [
				// 'Users'
				// ],
				launch : function() {
					Ext
							.create(
									'Ext.container.Viewport',
									{
										layout : 'border',
										items : [
												{
													region : 'north',
													xtype : 'component',
													padding : 10,
													height : 75,
													html : '<img class="titleImage" src="images/logo_EMBL.png"><span class="title">ExiSAXS</span><span class="subtitle">Extended ISPyB for SAXS</span>',
													xtype : 'component',
													cls : 'titlePanel'

												}, {
													region : 'north',
													cls : 'toolbarPanel',
													xtype : 'toolbar',
													width : 400,
													buttonAlign : 'center',
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
													bbar : [ {
														xtype : "button",
														text : 'Back',
														disabled : false,// (_this.navigationButtonBack.length
																			// ==
																			// 0),
														handler : function() {
															_this.navigationButtonBack[_this.navigationButtonBack.length - 1]();

														} }

													]

												}, {
													region : 'center',
													id : 'main_panel',
													xtype : 'tabpanel',
													plain : false,
													items : [],
													bbar : _this.getStatusBar() } ],
										listeners : {
											afterrender : function(component, eOpts) {
												if (localStorage.getItem("selectedDataCollectionList") != null) {
													_this.setSelectedItems(JSON.parse(localStorage.getItem("selectedDataCollectionList")));
												}
												_this.onAfterRender.notify();
											} } });
				}

			});
};