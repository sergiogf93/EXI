function ExiSAXS() {

	var _this = this;
	this.mainMenu = new MainMenu();
	/** Click events Data Explorer* */
	var dataExplorerController = new DataExplorerController();

	dataExplorerController.onClearNavigationPanel.attach(function(sender, data) {
		_this.clearNavigationPanel();
	});

	dataExplorerController.onSetLoadingNavigationPanel.attach(function(sender, isLoading) {
		_this.setLoadingNavigationPanel(isLoading);
	});

	dataExplorerController.onAddNavigationPanel.attach(function(sender, listView) {
		_this.addNavigationPanel(listView);
	});

	dataExplorerController.onNavigationBackFunction.attach(function(sender, backFunction) {
		_this.navigationButtonBack.push(backFunction);
	});
	
	dataExplorerController.onAddMainPanel.attach(function(sender, mainView) {
		_this.addMainPanel(mainView);
	});

	this.mainMenu.onSessionClicked.attach(function(sender) {
		dataExplorerController.showSessions();
	});

	this.mainMenu.onMacromoleculeClicked.attach(function(sender) {
		dataExplorerController.showMacromolecules();
	});

	this.mainMenu.onExperimentClicked.attach(function(sender) {
		dataExplorerController.showExperiments();
	});

	this.navigationButtonBack = [];
	// function(req, res) {
	// alert('Hello');
	// };
}



ExiSAXS.prototype.addMainPanel = function(mainView) {
	Ext.getCmp('main_panel').removeAll();
	Ext.getCmp('main_panel').add(mainView.getPanel());
};

ExiSAXS.prototype.addNavigationPanel = function(listView) {
	Ext.getCmp('navigation').add(listView.getPanel());
};

ExiSAXS.prototype.clearNavigationPanel = function() {
	Ext.getCmp('navigation').removeAll();
};

ExiSAXS.prototype.setLoadingNavigationPanel = function(isLoading) {
	Ext.getCmp('navigation').setLoading(isLoading);
};

ExiSAXS.prototype.show = function() {
	var _this = this;
	Ext
			.application({
				name : 'ExiSAXS',
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
													cls : 'navigation',
													collapsible : true,
													bbar : [ {
																xtype : "button",
																text : 'Back',
																cls : 'navigation',
																disabled : false,// (_this.navigationButtonBack.length == 0),
																handler : function() {
																	_this.navigationButtonBack[_this.navigationButtonBack.length - 1]();
		
																} 
													}
//													,
//														{
//															id : 'navigationBbar',
//															html : "32",
//															border : 0,
//															width : 150
//															
//														}

													]

												}, {
													region : 'center',
													id : 'main_panel',
													xtype : 'tabpanel',
													plain : false,
													items : [] } ]

									});
				}

			});

};