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
				disabled : false,
				cls : 'ExiSAXSMenuToolBar',
				menu : this.getPreparationMenu() 
		}, {
				text : this._convertToHTMLWhiteSpan("Data Explorer"),
				cls : 'ExiSAXSMenuToolBar',
				menu : this.getDataExplorerMenu() 
		},
	//			{
//	//					text : '<span style="color:white">Data Reduction Tools</span>',
//	//					cls : 'ExiSAXSMenuToolBar',
//	//					menu : _this.getDataReductionMenu()
//	//			},
	{
		text : '<span style="color:white">Offline Data Analysis</span>',
		cls : 'ExiSAXSMenuToolBar',
		menu : this.getOnlineDataAnalisysMenu() }, {
		text : '<span style="color:white">About</span>',
		cls : 'ExiSAXSMenuToolBar' }, '->', {
		xtype : 'textfield',
		name : 'field1',
		emptyText : 'search macromolecule',
		listeners : {
			specialkey : function(field, e) {
				if (e.getKey() == e.ENTER) {
					location.hash = "/datacollection/macromoleculeAcronym/" + field.getValue() + "/main";
				}
			} } }

	]
};

SAXSMainMenu.prototype.getPreparationMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Macromolecules") {
			location.hash = "/prepare/macromolecule/main";
		}
		if (item.text == "Buffers") {
			location.hash = "/prepare/buffer/main";
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
		items : [ {
			text : 'Macromolecules',
			//				checked : false,
			icon : 'images/icon/macromolecule.png',
			//			group : 'theme',
			handler : onItemCheck }, {
			text : 'Buffers',
			//				group : 'theme',
			icon : 'images/icon/buffer.jpg',
			//				checked : false,
			handler : onItemCheck }, "-", {
			text : 'Stock Solutions',
			//				group : 'theme',
			icon : 'images/icon/testtube.png',
			//				checked : false,
			handler : onItemCheck }

		, {
			text : 'Sample Tracking',
			//				checked : false,
			icon : 'images/icon/shipping.png',
			//				group : 'theme',
			handler : onItemCheck }, "-", {
			text : 'Experiment Designer',
			icon : 'images/icon/tool.png',
			handler : onItemCheck }, {
			text : 'My Experiments',
			icon : 'images/icon/edit.png',
			handler : onItemCheck }

		] });
};

SAXSMainMenu.prototype.getDataExplorerMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Sessions") {
			location.hash = "/session/nav";
		}
		if (item.text == "Macromolecules") {
			//			_this.onMacromoleculeClicked.notify();
		}
		if (item.text == "Experiments") {
			//			_this.onExperimentClicked.notify();
			location.hash = "/experiment/nav";
		}
	}

	return Ext.create('Ext.menu.Menu', {
		items : [ {
			text : 'Sessions',
			icon : 'images/icon/sessions.png',
			checked : false,
			group : 'theme',
			checkHandler : onItemCheck }, {
			text : 'Macromolecules',
			checked : false,
			group : 'theme',
			checkHandler : onItemCheck }, {
			text : 'Experiments',
			checked : false,
			group : 'theme',
			checkHandler : onItemCheck } ] });
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

