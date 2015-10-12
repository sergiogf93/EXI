SAXSMainMenu.prototype.populateCredentialsMenu = MainMenu.prototype.populateCredentialsMenu;
SAXSMainMenu.prototype.init = MainMenu.prototype.init;
SAXSMainMenu.prototype.getPanel = MainMenu.prototype.getPanel;
SAXSMainMenu.prototype._convertToHTMLWhiteSpan = MainMenu.prototype._convertToHTMLWhiteSpan;
SAXSMainMenu.prototype.getAddCredentialMenu = MainMenu.prototype.getAddCredentialMenu;
SAXSMainMenu.prototype.getLoginButton = MainMenu.prototype.getLoginButton;
SAXSMainMenu.prototype.setText = MainMenu.prototype.setText;

function SAXSMainMenu() {
	this.id = BUI.id();
	MainMenu.call(this, {isHidden : false, cssClass : 'mainMenu'});
}
SAXSMainMenu.prototype.getMenuItems = function() {
	return [{
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
		},{
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
		{
			text : '<span style="color:white">Offline Data Analysis</span>',
			cls : 'ExiSAXSMenuToolBar',
			hidden : this.isHidden,
			menu : this.getOnlineDataAnalisysMenu() 
		}, 
		{
			text : '<span style="color:white">About</span>',
			cls : 'ExiSAXSMenuToolBar' 
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

SAXSMainMenu.prototype.getShipmentMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
//		if (item.text == "Create a new Shipment") {
//			location.hash = "/prepare/shipment";
//		}
		if (item.text == "Shipment List") {
			location.hash = "/proposal/shipping/nav";
		}
		if (item.text == "Manage shipping addresses") {
			location.hash = "/proposal/addresses/nav";
		}
		
	}

	return Ext.create('Ext.menu.Menu', {
		items : [ 
			{
				text : 'Manage shipping addresses',
				icon : '../images/icon/contacts.png',
				handler : onItemCheck 
			}, 
			{
				text : 'Shipment List',
				icon : '../images/icon/shipping.png',
				handler : onItemCheck 
			} 

		] });
};

SAXSMainMenu.prototype.getBiosaxsMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Stock Solutions") {
			location.hash = "/stocksolution/nav";
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
};

SAXSMainMenu.prototype.getSampleTrackingMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Shipments") {
			location.hash = "/proposal/shipping/nav";
		}
		if (item.text == "Manage shipping addresses") {
			location.hash = "/proposal/addresses/nav";
		}
		
	}

	return Ext.create('Ext.menu.Menu', {
		items : [ 
//			{
//				text : 'Manage shipping addresses',
//				icon : '../images/icon/contacts.png',
//				handler : onItemCheck 
//			}, 
			{
				text : 'BioSAXS',
				icon : '../images/icon/macromolecule.png',
				menu:this.getBiosaxsMenu()
			}, 
			{
				text : 'Shipments',
				icon : '../images/icon/shipping.png',
				menu:this.getShipmentMenu()
			}
//			, 
//			{
//				text : 'Shipments',
//				icon : '../images/icon/shipping.png',
//				handler : onItemCheck 
//			} 

		] });
};

SAXSMainMenu.prototype.getPreparationMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Macromolecules") {
			location.hash = "/macromolecule/nav";
		}
		if (item.text == "Buffers") {
			location.hash = "/buffer/nav";
		}

//		if (item.text == "Stock Solutions") {
//			location.hash = "/stocksolution/nav";
//		}

		if (item.text == "Sample Tracking") {
			location.hash = "/shipping/nav";
		}

		if (item.text == "My Experiments") {
			location.hash = "/template/nav";
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
			"-", 
//			{
//				text : 'Stock Solutions',
//				icon : '../images/icon/testtube.png',
//				handler : onItemCheck 
//			}, 
			{
				text : 'Sample Tracking',
				icon : '../images/icon/shipping.png',
				menu:this.getSampleTrackingMenu()
			}, 
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

