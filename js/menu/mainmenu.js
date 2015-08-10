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
	if (EXI.credentialManager.getCredentials() != null) {
		for (var i = 0; i < EXI.credentialManager.getCredentials().length; i++) {
			var text = EXI.credentialManager.getCredentials()[i].username;
			if (EXI.credentialManager.getCredentials()[i].activeProposals.length > 0) {
				for (var j = 0; j < EXI.credentialManager.getCredentials()[i].activeProposals.length; j++) {
					this.credentialsMenu.add({
						text : EXI.credentialManager.getCredentials()[i].activeProposals[j] + "@" + EXI.credentialManager.getCredentials()[i].username,
						icon : "../images/icon/rsz_esrflogo80.gif",
						disabled : true });
				}
			} else {
				this.credentialsMenu.add({
					text : text,
					icon : "../images/icon/rsz_esrflogo80.gif",
					disabled : true });
			}
		}
	} 
	if (EXI.credentialManager.getCredentials().length > 0){
		Ext.getCmp(this.loginButtonId).setText("<span style='color:white'>Log out</span>");
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
		id		: this.loginButtonId,
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
		items : [
		         _this.getAddCredentialMenu()
         ] 
	});
	
	var items  = this.getMenuItems();
	items.push('->');
	items.push(this.getLoginButton());
	
	this.tb = Ext.create('Ext.toolbar.Toolbar', {
		cls : this.cssClass,
		listeners : {
			afterrender : function(component, eOpts) {
			} 
		},
		items : items
		}
	);
	return this.tb;
};
