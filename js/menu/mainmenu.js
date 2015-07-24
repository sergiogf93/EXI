function MainMenu() {
	this.id = BUI.id();
}

MainMenu.prototype.getPreparationMenu = function() {
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
			checked : false,
			icon : 'images/icon/macromolecule.png',
			group : 'theme',
			checkHandler : onItemCheck },
			 {
				text : 'Buffers',
				group : 'theme',
				icon : 'images/icon/buffer.jpg',
				checked : false,
				checkHandler : onItemCheck 
			},
			"-",
			{
				text : 'Stock Solutions',
				group : 'theme',
				icon : 'images/icon/testtube.png',
				checked : false,
				checkHandler : onItemCheck 
			}
			
			, {
				text : 'Sample Tracking',
				checked : false,
				icon : 'images/icon/shipping.png',
				group : 'theme',
				checkHandler : onItemCheck }, "-" ,
				{
						text : 'Experiment Designer',
						icon : 'images/icon/tool.png',
						checked : false,
						group : 'theme',
						checkHandler : onItemCheck 
				},
				{
					text : 'My Experiments',
					icon : 'images/icon/edit.png',
					checked : false,
					group : 'theme',
					checkHandler : onItemCheck 
				}
				
				] });
};

MainMenu.prototype.getDataExplorerMenu = function() {
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

MainMenu.prototype.getDataReductionMenu = function() {
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
			text : '<span class="menuCategoryItem">INDIVIDUAL CONCENTRATION</span>' }, "-",
			{
				text : 'Subtraction',
				checked : false,
				group : 'theme',
				checkHandler : onItemCheck
			}, 
			{
			text : 'Average' }, "-", {
			text : '<span class="menuCategoryItem">COMBINING</span>' }, "-", {
			text : 'Merging tool' } ] });
};

MainMenu.prototype.init = function() {
	this.menu.removeAll();
	this.menu.add([
			 		{
			 			icon : 'images/icon/rsz_1ic_input_black_24dp.png', 
			 			height : 30,
			 			text : 'Add',
			 			handler: function(){
			 				
			 				if (exiSAXS.localExtorage.tokenManager.getTokens().length < 2){
//			 					exiSAXS.openAuthentication();
			 					window.location.href = '#/login';
			 				}
			 				else{
			 					Ext.Msg.alert(':(', "Max number of users already reached... not bad for a beta version, isn't it?");
			 				}
			 				
			 			}},
		        "-"
				]);
	for (var i = 0; i < exiSAXS.localExtorage.tokenManager.getTokens().length; i++) {
		this.menu.add(
				{
					text : exiSAXS.localExtorage.tokenManager.getTokens()[i].user,
					icon: "images/icon/rsz_esrflogo80.gif"}
		);
	}
};

MainMenu.prototype.addLoggin = function() {
	this.init();
};


MainMenu.prototype.getOnlineDataAnalisysMenu = function() {
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
				checkHandler : onItemCheck
			}
//			, {
//			text : 'PepsiSAXS' }, {
//			text : 'SASRef' } 
			] 
			});
};

MainMenu.prototype.getPanel = function() {
	var _this = this;
	this.menu = new Ext.menu.Menu({
	 	id : _this.id + "menu",
	    items: [
	    ]
	});
	
	var tb = Ext.create('Ext.toolbar.Toolbar', {
		cls : 'exiSAXSMenuToolBar',
		listeners : {
			afterrender : function(component, eOpts) {
						_this.init();
			} },
		items : [ {
				text : '<span style="color:white">Prepare Experiment</span>',
				cls : 'exiSAXSMenuToolBar',
				menu : _this.getPreparationMenu()
			},{
					text : '<span style="color:white">Data Explorer</span>',
					cls : 'exiSAXSMenuToolBar',
					menu : _this.getDataExplorerMenu()
			}, 
//			{
//					text : '<span style="color:white">Data Reduction Tools</span>',
//					cls : 'exiSAXSMenuToolBar',
//					menu : _this.getDataReductionMenu()
//			},
			{
				text : '<span style="color:white">Offline Data Analysis</span>',
				cls : 'exiSAXSMenuToolBar',
				menu : _this.getOnlineDataAnalisysMenu() 
			},
			{
				text : '<span style="color:white">About</span>',
				cls : 'exiSAXSMenuToolBar'
			},
			'->',
	        {
	            xtype    : 'textfield',
	            name     : 'field1',
	            emptyText: 'search macromolecule',
	            listeners: {
	                specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                      location.hash = "/datacollection/macromoleculeAcronym/" + field.getValue() + "/main";
	                    }
	                }
	            }
	        },
			{
				xtype : 'splitbutton',
				text  : '<span style="color:white">log out</span>',
				cls   : 'button_log_out',
				icon  : "images/rsz_logout.png",
				 menu : this.menu,
				handler : function() {
					location.hash = "/logout";
				} 
			}
			
			
			
			] });

	return tb;

};