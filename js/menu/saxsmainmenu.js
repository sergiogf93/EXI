SAXSMainMenu.prototype.populateCredentialsMenu = MainMenu.prototype.populateCredentialsMenu;
SAXSMainMenu.prototype.init = MainMenu.prototype.init;
SAXSMainMenu.prototype.getPanel = MainMenu.prototype.getPanel;
SAXSMainMenu.prototype._convertToHTMLWhiteSpan = MainMenu.prototype._convertToHTMLWhiteSpan;
SAXSMainMenu.prototype.getAddCredentialMenu = MainMenu.prototype.getAddCredentialMenu;
SAXSMainMenu.prototype.getLoginButton = MainMenu.prototype.getLoginButton;
SAXSMainMenu.prototype.setText = MainMenu.prototype.setText;

function SAXSMainMenu() {
	this.id = BUI.id();
	 MainMenu.call(this);
}
SAXSMainMenu.prototype.getMenuItems = function() {
	return [{
				text : this._convertToHTMLWhiteSpan("Prepare Experiment"),
				cls : 'ExiSAXSMenuToolBar',
				menu : this.getPreparationMenu() 
		}, {
				text : this._convertToHTMLWhiteSpan("Data Explorer"),
				cls : 'ExiSAXSMenuToolBar',
				menu : this.getDataExplorerMenu() 
		},
		{
			text : '<span style="color:white">Offline Data Analysis</span>',
			cls : 'ExiSAXSMenuToolBar',
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

SAXSMainMenu.prototype.getSampleTrackingMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Create a new Shipment") {
			location.hash = "/prepare/shipment";
		}
		if (item.text == "Shipments") {
			location.hash = "/shipping/nav";
		}
		
	}

	return Ext.create('Ext.menu.Menu', {
		items : [ 
	          {
				text : 'Create a new Shipment',
				icon : 'images/icon/macromolecule.png',
				handler : onItemCheck 
			}, 
			{
				text : 'Shipments',
				icon : 'images/icon/buffer.jpg',
				handler : onItemCheck 
			} 

		] });
};

SAXSMainMenu.prototype.getPreparationMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Macromolecules") {
			location.hash = "/prepare/macromolecule/main";
		}
		if (item.text == "Buffers") {
//			location.hash = "/prepare/buffer/main";
			location.hash = "/buffer/nav";
		}

		if (item.text == "Stock Solutions") {
			location.hash = "/prepare/stocksolution/main";
		}

		if (item.text == "Sample Tracking") {
			location.hash = "/shipping/nav";
		}

		if (item.text == "Experiment Designer") {
			location.hash = "/prepare/designer";
		}

		if (item.text == "My Experiments") {
			location.hash = "/template/nav";
		}
	}

	return Ext.create('Ext.menu.Menu', {
		items : [ 
	          {
				text : 'Macromolecules',
				icon : 'images/icon/macromolecule.png',
				handler : onItemCheck 
			}, 
			{
				text : 'Buffers',
				icon : 'images/icon/buffer.jpg',
				handler : onItemCheck 
			}, 
			"-", 
			{
				text : 'Stock Solutions',
				icon : 'images/icon/testtube.png',
				handler : onItemCheck 
			}, 
			{
				text : 'Sample Tracking',
				icon : 'images/icon/shipping.png',
//				handler : onItemCheck 
				menu:this.getSampleTrackingMenu()
			}, 
			"-", 
			{
				text : 'Experiment Designer',
				icon : 'images/icon/tool.png',
				handler : onItemCheck 
			}, 
			{
				text : 'My Experiments',
				icon : 'images/icon/edit.png',
				handler : onItemCheck 
			}

		] });
};

SAXSMainMenu.prototype.getDataExplorerMenu = function() {
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
				icon : 'images/icon/sessions.png',
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
	}

	return Ext.create('Ext.menu.Menu', {
		items : [
		//		          {
		//			text : 'Abinitio Modeling' }, {
		//			text : 'Rambo and Tainer mass estimation' }, 
		//			 "-", {
		//			text : '<span class="menuCategoryItem">Apriori</span>' }, 
		//			 "-", 
		{
			text : 'Structure Validation',
			checked : false,
			group : 'theme',
			checkHandler : onItemCheck }
		//			, {
		//			text : 'PepsiSAXS' }, {
		//			text : 'SASRef' } 
		] });
};

