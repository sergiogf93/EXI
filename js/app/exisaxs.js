ExiSAXS.prototype.loadSelected = Exi.prototype.loadSelected;
ExiSAXS.prototype.addMainPanel = Exi.prototype.addMainPanel;
ExiSAXS.prototype.getSelectedDataCollections = Exi.prototype.getSelectedDataCollections;
ExiSAXS.prototype.addNavigationPanel = Exi.prototype.addNavigationPanel;
ExiSAXS.prototype.clearNavigationPanel = Exi.prototype.clearNavigationPanel;
ExiSAXS.prototype.clearMainPanel = Exi.prototype.clearMainPanel;
ExiSAXS.prototype.setLoadingNavigationPanel = Exi.prototype.setLoadingNavigationPanel;
ExiSAXS.prototype.setLoadingMainPanel = Exi.prototype.setLoadingMainPanel;
ExiSAXS.prototype.setError = Exi.prototype.setError;
ExiSAXS.prototype.setLoading = Exi.prototype.setLoading;
ExiSAXS.prototype.setLoadingMainPanel = Exi.prototype.setLoadingMainPanel;
ExiSAXS.prototype.show = Exi.prototype.show;



function ExiSAXS() {
	 Exi.call(this, {
		 					menu: new SAXSMainMenu(),
		 					controllers : [new SAXSExiController()]
	 
	 });
}


ExiSAXS.prototype.getHeader = function(){
	return '<img class="titleImage" src="images/logo_EMBL.png"><span class="title">ExiSAXS</span><span class="subtitle">Extended ISPyB for SAXS<sub style="font-size:10px;color:orange">BETA</sub></span>';
};

ExiSAXS.prototype.getDataAdapter = function(args){
	return new SaxsDataAdapterFactory(args);
};




