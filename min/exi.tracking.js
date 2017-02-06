function TrackingExiController() {  
	this.init();
}

TrackingExiController.prototype.loadNavigationPanel = ExiController.prototype.loadNavigationPanel;

TrackingExiController.prototype.init = function() {
	var _this = this;

	function setPageBackground() {
		_this.setPageBackground();
	}
	function notFound() {
		_this.notFound();
	}
	
    /** Loading a single session on the navigation panel * */
	Path.map("#/test").to(function() {
       alert("test");
	}).enter(this.setPageBackground);    
	
	Path.rescue(notFound);

};

function ExiTracking() {    
	 Exi.call(this, {
		 					menu: new TrackingMainMenu(),
		 					anonymousMenu: new MainMenu(),
		 					controllers : [new TrackingExiController(),  new ProposalExiController(), new SessionController(), new LabContactExiController()]
	 });
}

ExiTracking.prototype.loadSelected = Exi.prototype.loadSelected;
ExiTracking.prototype.addMainPanel = Exi.prototype.addMainPanel;
ExiTracking.prototype.getSelectedDataCollections = Exi.prototype.getSelectedDataCollections;
ExiTracking.prototype.addNavigationPanel = Exi.prototype.addNavigationPanel;
ExiTracking.prototype.clearNavigationPanel = Exi.prototype.clearNavigationPanel;
ExiTracking.prototype.clearMainPanel = Exi.prototype.clearMainPanel;
ExiTracking.prototype.setLoadingNavigationPanel = Exi.prototype.setLoadingNavigationPanel;
ExiTracking.prototype.setError = Exi.prototype.setError;
ExiTracking.prototype.setLoading = Exi.prototype.setLoading;
ExiTracking.prototype.setLoadingMainPanel = Exi.prototype.setLoadingMainPanel;
ExiTracking.prototype.show = Exi.prototype.show;
ExiTracking.prototype.setAnonymousMenu = Exi.prototype.setAnonymousMenu;
ExiTracking.prototype.setUserMenu = Exi.prototype.setUserMenu;
ExiTracking.prototype.appendDataAdapterParameters = Exi.prototype.appendDataAdapterParameters;
ExiTracking.prototype.hideNavigationPanel = Exi.prototype.hideNavigationPanel;
ExiTracking.prototype.showNavigationPanel = Exi.prototype.showNavigationPanel;

ExiTracking.prototype.getHeader = function(){
    var html = "";
    var data = {
        version         : ExtISPyB.version,
        release_date    : ExtISPyB.release_date
       
        
    };
    
    dust.render("trackingheader.template", data, function(err, out){        
		html = out;
     });
    return html;	
};

ExiTracking.prototype.getDataAdapter = function(args){
	return new MxDataAdapterFactory(this.appendDataAdapterParameters(args));
};


function TrackingMainMenu() {
	this.id = BUI.id();
	MainMenu.call(this, {isHidden : false, cssClass : 'mainMenu'});
}

TrackingMainMenu.prototype.populateCredentialsMenu = MainMenu.prototype.populateCredentialsMenu;
TrackingMainMenu.prototype.init = MainMenu.prototype.init;
TrackingMainMenu.prototype.getPanel = MainMenu.prototype.getPanel;
TrackingMainMenu.prototype._convertToHTMLWhiteSpan = MainMenu.prototype._convertToHTMLWhiteSpan;
TrackingMainMenu.prototype.getAddCredentialMenu = MainMenu.prototype.getAddCredentialMenu;
TrackingMainMenu.prototype.getLoginButton = MainMenu.prototype.getLoginButton;
TrackingMainMenu.prototype.setText = MainMenu.prototype.setText;
TrackingMainMenu.prototype.getHelpMenu = MainMenu.prototype.getHelpMenu;


/**
 * If there is a credential then home tab will redirect to the welcome page (either manager or user)
 */
TrackingMainMenu.prototype.getHomeItem = function() { 
	return {
		text : this._convertToHTMLWhiteSpan("Sessions"),
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


TrackingMainMenu.prototype.getShipmentItem = function() { 
	return {
		text : this._convertToHTMLWhiteSpan("Shipments"),
		cls : 'ExiSAXSMenuToolBar',
		icon : '../images/icon/ic_email_black_24dp.png',
		handler : function(){
				location.hash = "/proposal/shipping/nav"
		}
	};
};

TrackingMainMenu.prototype.getAddressesItem = function() { 
	return {
		text : this._convertToHTMLWhiteSpan("Lab-contacts"),
		cls : 'ExiSAXSMenuToolBar',
		icon : '../images/icon/contacts.png',
		handler : function(){
						location.hash = "/proposal/addresses/nav";
		}
	};
};

TrackingMainMenu.prototype.getMenuItems = function() {			
	return [	
    	this.getHomeItem(),
    	this.getShipmentItem(),    	
		this.getAddressesItem(),
		'->', 
		{
			xtype : 'textfield',
			name : 'field1',
			emptyText : 'search shipment',
			hidden : this.isHidden,
			listeners : {
				specialkey : function(field, e) {
                    alert("To be implemented");
					/*if (e.getKey() == e.ENTER) {                        
						location.hash = "/datacollection/macromoleculeAcronym/" + field.getValue() + "/main";
					}*/
				} 
			} 
	}
	];
};


