function ExiMX() {
	 Exi.call(this, {
		 					menu: new MXMainMenu(),
		 					anonymousMenu: new MainMenu(),
		 					controllers : [new MXExiController(), new OfflineExiController(), new ProposalExiController()],
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
ExiMX.prototype.setLoadingMainPanel = Exi.prototype.setLoadingMainPanel;
ExiMX.prototype.show = Exi.prototype.show;
ExiMX.prototype.setAnonymousMenu = Exi.prototype.setAnonymousMenu;
ExiMX.prototype.setUserMenu = Exi.prototype.setUserMenu;



ExiMX.prototype.getHeader = function(){
	return '<img class="titleImage" src="../images/logo_EMBL.png"><span class="title">ExiMX</span><span class="subtitle">Extended ISPyB for MX<sub style="font-size:10px;color:orange">BETA</sub></span>';
};

ExiMX.prototype.getDataAdapter = function(args){
	return new MxDataAdapterFactory(args);
};




