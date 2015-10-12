MXMainMenu.prototype.populateCredentialsMenu = MainMenu.prototype.populateCredentialsMenu;
MXMainMenu.prototype.init = MainMenu.prototype.init;
MXMainMenu.prototype.getPanel = MainMenu.prototype.getPanel;
MXMainMenu.prototype._convertToHTMLWhiteSpan = MainMenu.prototype._convertToHTMLWhiteSpan;
MXMainMenu.prototype.getAddCredentialMenu = MainMenu.prototype.getAddCredentialMenu;
MXMainMenu.prototype.getLoginButton = MainMenu.prototype.getLoginButton;
MXMainMenu.prototype.setText = MainMenu.prototype.setText;

function MXMainMenu() {
	this.id = BUI.id();
	 MainMenu.call(this, {cssClass : 'mxMainMenu'});
}
MXMainMenu.prototype.getMenuItems = function() {
	return [
		{
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
		},
        {
				text : this._convertToHTMLWhiteSpan("Data Explorer"),
				cls : 'ExiSAXSMenuToolBar',
				menu : this.getDataExplorerMenu() 
		},
		{
			text : this._convertToHTMLWhiteSpan("Offline Data Analysis"),
			cls : 'ExiSAXSMenuToolBar',
			menu : this.getOnlineDataAnalisysMenu() 
		}, 
		{
			text : this._convertToHTMLWhiteSpan("Help"),
			cls : 'ExiSAXSMenuToolBar',
			menu : this.getHelpMenu() 
		}, 
		'->',
		{
			xtype : 'textfield',
			name : 'field1',
			value : '1460800',
			emptyText : 'search by data collection Id',
			listeners : {
				specialkey : function(field, e) {
					if (e.getKey() == e.ENTER) {
						location.hash = "/autoprocintegration/datacollection/" + field.getValue() + "/main";
					}
				} 
			} 
		}
	];
};

MXMainMenu.prototype.getHelpMenu = function() {
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
 
MXMainMenu.prototype.getDataExplorerMenu = function() {
	function onItemCheck(item, checked) {
		if (item.text == "Sessions") {
			location.hash = "/session/nav";
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
			},
			{
				text : 'Experiments',
				checked : false,
				group : 'theme',
				handler : onItemCheck 
			} 
		] 
	});
};

