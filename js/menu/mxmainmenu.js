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
				text : this._convertToHTMLWhiteSpan("Data Explorer"),
				cls : 'ExiSAXSMenuToolBar',
				menu : this.getDataExplorerMenu() 
		}
	];
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

