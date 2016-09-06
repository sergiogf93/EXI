function SAXSExiController() {
	this.init();
}

SAXSExiController.prototype.loadNavigationPanel = ExiController.prototype.loadNavigationPanel;

SAXSExiController.prototype.routeNavigation = function() {
	var _this = this;
	function loadNavigationPanel(listView) {
		return _this.loadNavigationPanel(listView);
	}

	/**
	 * Loading navigation panel
	 * 
	 * #/session/nav #/experiment/nav #/macromolecule/nav
	 * 
	 */
	Path.map("#/saxs/:navigation/nav").to(function() {
		var listView = null;
		
		if (this.params['navigation'] == "buffer") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new BufferListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/buffer/" + selected[0].bufferId + "/main";
			});
			EXI.addNavigationPanel(listView);
			listView.load(EXI.proposalManager.getBuffers());
			EXI.setLoadingNavigationPanel(false);
			
			/** Loading welcome page **/
			EXI.addMainPanel(new BufferWelcomeMainView());
			
		}
		
		if (this.params['navigation'] == "stocksolution") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new StockSolutionListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/stocksolution/" + selected[0].stockSolutionId + "/main";
			});
			EXI.addNavigationPanel(listView);
			listView.load(EXI.proposalManager.getStockSolutions());
			EXI.setLoadingNavigationPanel(false);
			
			/** Loading welcome page **/
			EXI.addMainPanel(new StockSolutionWelcomeMainView());
			
		}
		
		if (this.params['navigation'] == "macromolecule") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			listView = new MacromoleculeListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/macromolecule/" + selected[0].macromoleculeId + "/main";
			});
			EXI.addNavigationPanel(listView);
			listView.load(EXI.proposalManager.getMacromolecules());
			EXI.setLoadingNavigationPanel(false);
			
			/** Loading welcome page **/
			EXI.addMainPanel(new MacromoleculeWelcomeMainView());
			
		}
		
		if (this.params['navigation'] == "template") {
			EXI.clearNavigationPanel();
			EXI.setLoadingNavigationPanel(true);
			
			listView = new TemplateListView();
			/** When selected move to hash * */
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/experiment/templateId/" + selected[0].experimentId + "/main";
			});
			var adapter = loadNavigationPanel(listView);
			adapter.saxs.experiment.getByExperimentByKey("experimentType", "TEMPLATE");
			
			/** Loading welcome page **/
			EXI.addMainPanel(new ExperimentWelcomeMainView());
		}


	}).enter(this.setPageBackground);

	
};

SAXSExiController.prototype.setPageBackground = function() {

};

SAXSExiController.prototype.notFound = function() {

};

SAXSExiController.prototype.routeExperiment = function() {
	Path.map("#/experiment/experimentId/:experimentId/main").to(function() {
		var mainView = new ExperimentMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['experimentId']);
		/** Selecting data collections from experiment * */
		mainView.onSelect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.append(element);
		});
		mainView.onDeselect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.remove(element);
		});

	}).enter(this.setPageBackground);
	
	Path.map("#/experiment/hplc/:experimentId/main").to(function() {
		var mainView = new HPLCMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['experimentId']);
		/** Selecting data collections from experiment * */
		mainView.onSelect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.append(element);
		});
		mainView.onDeselect.attach(function(sender, element) {
			EXI.localExtorage.selectedSubtractionsManager.remove(element);
		});

	}).enter(this.setPageBackground);
	

	/** Loading Experiments * */
	Path.map("#/experiment/:key/:value/main").to(function() {
		EXI.setLoadingMainPanel();
		var onSuccess = function(sender, data) {
			EXI.setLoadingMainPanel(false);
			if (data != null) {
				if (data.length > 0) {
					var mainView = null;
					if (data[0].experimentType == "STATIC") {
						mainView = new ExperimentMainView();

					}
					if (data[0].experimentType == "HPLC") {
						mainView = new HPLCMainView();
					}

					if (data[0].experimentType == "TEMPLATE") {
						mainView = new TemplateMainView();
					}

					EXI.addMainPanel(mainView);
					mainView.load(data);
					/** Selecting data collections from experiment * */
					mainView.onSelect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.append(element);
					});
					mainView.onDeselect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.remove(element);
					});

				}
			}
		};
		if ((this.params['key'] == "experimentId") || (this.params['key'] == "templateId")) {
			EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getByExperimentId([ this.params['value'] ]);
		} else {
			EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getByExperimentByKey(this.params['key'], this.params['value']);
		}

	}).enter(this.setPageBackground);
};





SAXSExiController.prototype.routeDataCollection = function() {
	Path.map("#/datacollection/macromoleculeAcronym/:value/main").to(function() {
		/** Loading navidation menu **/
		EXI.setLoadingMainPanel("Searching " + this.params['value']+  "...");
		var onSuccess = function(sender, dataCollections) {
			if (dataCollections != null){
				if (dataCollections.length > 0){
					var mainView = new DataCollectionMainView();
					EXI.addMainPanel(mainView);
					mainView.load(dataCollections);
					/** Selecting data collections from experiment * */
					mainView.onSelect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.append(element);
					});
					mainView.onDeselect.attach(function(sender, element) {
						EXI.localExtorage.selectedSubtractionsManager.remove(element);
					});
					
					var listView = new DataCollectionListView();
					listView.onSelect.attach(function(sender, selected) {
						mainView.filter( selected[0].macromoleculeId, selected[0].bufferAcronym);
					});
					EXI.addNavigationPanel(listView);
					listView.load(dataCollections);
					EXI.setLoadingNavigationPanel(false);
				}
				else{
					BUI.showWarning("No macromolecule has been found");
				}
			}
			else{
				BUI.showWarning("No data to display");
			}
//			EXI.setLoadingNavigationPanel(false);
			EXI.setLoadingMainPanel(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);

	}).enter(this.setPageBackground);
	
	
	Path.map("#/saxs/datacollection/:key/:value/main").to(function() {
		EXI.setLoadingMainPanel();
		var onSuccess = function(sender, data) {
			var mainView = new DataCollectionMainView();
			EXI.addMainPanel(mainView);
			mainView.load(data);
			EXI.setLoadingMainPanel(false);
			/** Selecting data collections from experiment * */
			mainView.onSelect.attach(function(sender, element) {
				EXI.localExtorage.selectedSubtractionsManager.append(element);
			});
			mainView.onDeselect.attach(function(sender, element) {
				EXI.localExtorage.selectedSubtractionsManager.remove(element);
			});
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);
	}).enter(this.setPageBackground);

	Path.map("#/saxs/datacollection/:key/:value/primaryviewer").to(function() {
		var onSuccess = function(sender, data) {
			var primaryMainView = new PrimaryDataMainView();
			EXI.addMainPanel(primaryMainView);
			primaryMainView.load(data);

		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);
	}).enter(this.setPageBackground);
	
	Path.map("#/saxs/datacollection/:key/:value/merge").to(function() {
		var onSuccess = function(sender, data) {
			var primaryMainView = new MergeMainView();
			EXI.addMainPanel(primaryMainView);
			primaryMainView.load(data);

		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByKey(this.params['key'], this.params['value']);
	}).enter(this.setPageBackground);
};



SAXSExiController.prototype.routePrepare = function() {
	Path.map("#/buffer/:bufferId/main").to(function() {
		var mainView = new BufferMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['bufferId']);
	}).enter(this.setPageBackground);
	
	Path.map("#/buffer/add").to(function() {
		var mainView = new BufferMainView();
		EXI.addMainPanel(mainView);
	}).enter(this.setPageBackground);
	
	Path.map("#/macromolecule/:macromoleculeId/main").to(function() {
		var mainView = new MacromoleculeMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['macromoleculeId']);
	}).enter(this.setPageBackground);
	
	Path.map("#/macromolecule/add").to(function() {
		var mainView = new MacromoleculeMainView();
		EXI.addMainPanel(mainView);
	}).enter(this.setPageBackground);
	
	Path.map("#/stocksolution/:stocksolutionId/main").to(function() {
		var mainView = new StockSolutionMainView();
		EXI.addMainPanel(mainView);
		mainView.load(this.params['stocksolutionId']);
	}).enter(this.setPageBackground);
	
	Path.map("#/stocksolution/add").to(function() {
		var mainView = new StockSolutionMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	
	Path.map("#/prepare/stocksolution/main").to(function() {
		var mainView = new StockSolutionMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	

//	Path.map("#/prepare/macromolecule/main").to(function() {
//		var mainView = new MacromoleculeMainView();
//		EXI.addMainPanel(mainView);
//		mainView.load();
//	}).enter(this.setPageBackground);

	Path.map("#/prepare/templates/main").to(function() {
		var mainView = new ExperimentDesignerMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	Path.map("#/prepare/shipmentpreparation").to(function() {
		var mainView = new ShipmentPreparationMainView();
		EXI.addMainPanel(mainView);
		mainView.load();
	}).enter(this.setPageBackground);
	
	
	
//	Path.map("#/prepare/shipment").to(function() {
//		var _this = this;
//		var shipmentForm = new ShipmentForm({
//			creationMode : true,
//			showTitle : false
//		});
//		shipmentForm.onSaved.attach(function(sender, shipment) {
//			location.hash = "/shipping/" + shipment.shippingId + "/main";
//			window.close();
//		});
//		var window = Ext.create('Ext.window.Window', {
//			title : 'New Shipment',
//			height : 600,
//			width : 800,
//			modal : true,
//			layout : 'fit',
//			items : [ shipmentForm.getPanel() ]
//		}).show();
//	}).enter(this.setPageBackground);
	

	Path.map("#/prepare/designer").to(function() {
			var mainView = new DesignerMainView();
			EXI.addMainPanel(mainView);
			mainView.load();
//			function() {
//				var wizardWidget = new WizardWidget({
//					windowMode : true,
//					width : 1200 });
//
//				wizardWidget.onFinished.attach(function(sender, result) {
//					wizardWidget.window.close();
//					EXI.setLoading();
//					var onSuccess = (function(sender, experiment) {
//						location.hash = "/experiment/templateId/" + experiment.experimentId + "/main";
//					});
//					wizardWidget.current.setLoading("ISPyB: Creating experiment");
//					EXI.getDataAdapter({onSuccess : onSuccess}).saxs.template.saveTemplate(result.name, result.comments, result.data);
//				});
//
//				wizardWidget.draw(this.targetId, new MeasurementCreatorStepWizardForm(EXI.proposalManager.getMacromolecules(),EXI.proposalManager.getBuffers()));

			}).enter(this.setPageBackground);
};

SAXSExiController.prototype.init = function() {
	var _this = this;

	function setPageBackground() {
		_this.setPageBackground();
	}
	function notFound() {
		_this.notFound();
	}

	this.routeNavigation();
	this.routeExperiment();
	this.routeDataCollection();
	this.routePrepare();

	

	Path.map("#/project/:projectId/run/:runId/main").to(function() {
		var projectId = this.params['projectId'];
		var runId = this.params['runId'];

		var onSuccess = function(sender, runs) {
			for (var i = 0; i < runs.length; i++) {
				if (runs[i].internalId == runId) {
					var main = new RunMainView();
					EXI.addMainPanel(main);
					main.load(runs[i]);
				}
			}
		};
		
		var onError = function(sender, runs) {
			
		};
		
		EXI.getDataAdapter({onSuccess : onSuccess, onError :onError}).exi.offline.getRuns(projectId);
//		exidataAdapter.getRuns(projectId);
	}).enter(this.setPageBackground);
	

	Path.rescue(notFound);

};

function ExiSAXS() {
	 Exi.call(this, {
		 					menu: new SAXSMainMenu(),
		 					anonymousMenu: new MainMenu(),
		 					controllers : [new SAXSExiController(),  new OfflineExiController(), new ProposalExiController(), new LabContactExiController()]
	 });
}

ExiSAXS.prototype.loadSelected = Exi.prototype.loadSelected;
ExiSAXS.prototype.addMainPanel = Exi.prototype.addMainPanel;
ExiSAXS.prototype.getSelectedDataCollections = Exi.prototype.getSelectedDataCollections;
ExiSAXS.prototype.addNavigationPanel = Exi.prototype.addNavigationPanel;
ExiSAXS.prototype.clearNavigationPanel = Exi.prototype.clearNavigationPanel;
ExiSAXS.prototype.clearMainPanel = Exi.prototype.clearMainPanel;
ExiSAXS.prototype.setLoadingNavigationPanel = Exi.prototype.setLoadingNavigationPanel;
ExiSAXS.prototype.setError = Exi.prototype.setError;
ExiSAXS.prototype.setLoading = Exi.prototype.setLoading;
ExiSAXS.prototype.setLoadingMainPanel = Exi.prototype.setLoadingMainPanel;
ExiSAXS.prototype.show = Exi.prototype.show;
ExiSAXS.prototype.setAnonymousMenu = Exi.prototype.setAnonymousMenu;
ExiSAXS.prototype.setUserMenu = Exi.prototype.setUserMenu;
ExiSAXS.prototype.appendDataAdapterParameters = Exi.prototype.appendDataAdapterParameters;
ExiSAXS.prototype.hideNavigationPanel = Exi.prototype.hideNavigationPanel;
ExiSAXS.prototype.showNavigationPanel = Exi.prototype.showNavigationPanel;

ExiSAXS.prototype.getHeader = function(){
	return '<img class="titleImage" src="../images/logo_EMBL.png"><span class="title">ExiSAXS</span><span class="subtitle">Extended ISPyB for SAXS<sub style="font-size:10px;color:orange">BETA</sub></span>';
};

ExiSAXS.prototype.getDataAdapter = function(args){
	return new SaxsDataAdapterFactory(this.appendDataAdapterParameters(args));
};


function SAXSMainMenu() {
	this.id = BUI.id();
	MainMenu.call(this, {isHidden : false, cssClass : 'mainMenu'});
}

SAXSMainMenu.prototype.populateCredentialsMenu = MainMenu.prototype.populateCredentialsMenu;
SAXSMainMenu.prototype.init = MainMenu.prototype.init;
SAXSMainMenu.prototype.getPanel = MainMenu.prototype.getPanel;
SAXSMainMenu.prototype._convertToHTMLWhiteSpan = MainMenu.prototype._convertToHTMLWhiteSpan;
SAXSMainMenu.prototype.getAddCredentialMenu = MainMenu.prototype.getAddCredentialMenu;
SAXSMainMenu.prototype.getLoginButton = MainMenu.prototype.getLoginButton;
SAXSMainMenu.prototype.setText = MainMenu.prototype.setText;
SAXSMainMenu.prototype.getHelpMenu = MainMenu.prototype.getHelpMenu;
SAXSMainMenu.prototype.getHomeItem = MainMenu.prototype.getHomeItem;
SAXSMainMenu.prototype.getShipmentItem = MainMenu.prototype.getShipmentItem;


SAXSMainMenu.prototype.getMenuItems = function() {
	
	
	
	return [	
    	this.getHomeItem(),
    	this.getShipmentItem(),
    	{
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
//		{
//			text : '<span style="color:white">Offline Data Analysis</span>',
//			cls : 'ExiSAXSMenuToolBar',
//			hidden : this.isHidden,
//			menu : this.getOnlineDataAnalisysMenu() 
//		}, 
		{
			text : this._convertToHTMLWhiteSpan("Help"),
			cls : 'ExiSAXSMenuToolBar',
			menu : this.getHelpMenu() 
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




SAXSMainMenu.prototype.getPreparationMenu = function() {
	var _this = this;
	function onItemCheck(item, checked) {
		if (item.text == "Macromolecules") {
			location.hash = "/saxs/macromolecule/nav";
		}
		if (item.text == "Buffers") {
			location.hash = "/saxs/buffer/nav";
		}

		if (item.text == "Sample Tracking") {
			location.hash = "/saxs/shipping/nav";
		}

		if (item.text == "My Experiments") {
			location.hash = "/saxs/template/nav";
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
//			"-", 
//			{
//				text : 'Stock Solutions',
//				icon : '../images/icon/testtube.png',
//				handler : onItemCheck 
//			}, 
//			{
//				text : 'Sample Tracking',
//				icon : '../images/icon/shipping.png',
//				menu:this.getSampleTrackingMenu()
//			}, 
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


/**
* AddressListView displays the address (labcontact information) as list on the navigation panels
*
* @class AddressListView
* @constructor
*/
function AddressListView(){
	this.title = "Addresses";
	this.sorters = [{property : 'cardName', direction: 'ASC'}];
	ListView.call(this);
}

AddressListView.prototype.getPanel = ListView.prototype.getPanel;
AddressListView.prototype.load = ListView.prototype.load;
AddressListView.prototype.getFields = ListView.prototype.getFields;
AddressListView.prototype.getColumns = ListView.prototype.getColumns;

AddressListView.prototype.getFilter = function(value){
	return [{property : "cardName", value : value, anyMatch : true}];
};

/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
AddressListView.prototype.getRow = function(record){
	var html = "";
	dust.render("address.listview", record.data, function(err, out){
        	html = out;
     	});
	return html;
};




function BufferListView(){
	ListView.call(this);
}

BufferListView.prototype.getPanel = ListView.prototype.getPanel;
BufferListView.prototype.load = ListView.prototype.load;


BufferListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
		html = html + "<tr><td>Acronym:</td><td style='color:#207a7a;font-weight:bold;'>" + record.data.acronym+ "</td></tr>";
		html = html + "<tr><td>name:</td><td>" + record.data.name+ "</td></tr>";
	return html + "</table>";
};

BufferListView.prototype.getFilter = function(value){
	return [{property : "acronym", value : value, anyMacth : true}];
};

BufferListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Buffers',  flex: 1, dataIndex: 'bufferId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

BufferListView.prototype.getFields = function(){
	return  ['acronym', 'name'];
};


function DataCollectionListView(){
	ListView.call(this);
}

DataCollectionListView.prototype.getPanel = ListView.prototype.getPanel;
DataCollectionListView.prototype.load = ListView.prototype.load;

DataCollectionListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
	html = html + "<tr><td>Macromolecule:</td><td >" + record.data.macromoleculeAcronym+ "</td></tr>";
		html = html + "<tr><td>Buffer:</td><td style='color:#207a7a;font-weight:bold;'>" + record.data.bufferAcronym+ "</td></tr>";
		html = html + "<tr><td>Count:</td><td>" + record.data.dataCollections+ "</td></tr>";
	return html + "</table>";
};

DataCollectionListView.prototype.getFilter = function(value){
	return [{property : "bufferAcronym", value : value, anyMacth : true}];
};

DataCollectionListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Data Collections',  flex: 1, dataIndex: 'bufferAcronym', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

DataCollectionListView.prototype.getFields = function(){
	return  ['macromoleculeAcronym', 'bufferAcronym', 'macromoleculeId', 'dataCollections'];
};

//DataCollectionListView.prototype.groupBy = function(array , f ){
//  var groups = {};
//  array.forEach( function( o )
//  {
//    var group = JSON.stringify( f(o) );
//    groups[group] = groups[group] || [];
//    groups[group].push( o );  
//  });
//  return Object.keys(groups).map( function( group ){
//	  return groups[group]; 
//  });
//};


/** This groups all the data by bufferId **/
DataCollectionListView.prototype.formatData = function(data){
	data =  BUI.groupBy(data, function(item){
		  return [item.bufferAcronym];
	});
	/** Data is now an array of arrays **/
	
	var results = [];
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		results.push({
			macromoleculeAcronym : item[0].macromoleculeAcronym,
			macromoleculeId: item[0].macromoleculeId,
			bufferAcronym : item[0].bufferAcronym,
			dataCollections : item.length
		});
	}
	
	return results;
	
};



function ExperimentListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	ListView.call(this);
}

ExperimentListView.prototype.getPanel = ListView.prototype.getPanel;
ExperimentListView.prototype.load = ListView.prototype.load;

ExperimentListView.prototype.getRow = function(record){
	var color = "black";
	/** If experiment is empty then color is gray **/
		if ((record.data.experimentType != 'HPLC')&&(record.data.measurementDoneCount == 0)&&(record.data.measurementAveragedCount == 0)&&(record.data.dataCollectionDoneCount == 0)){
			color = '#DEDEDE';
		}
		var html = "<table class='listView' style='color:" + color +";'>";
			html = html + "<tr><td colspan='4'>" + record.data.creationDate+ "</td></tr>";
			html = html + "<tr><td colspan='4'>" + record.data.name+ "</td></tr>";
			html = html + "<tr><td style='font-weight:bold;' colspan='4'>" + record.data.experimentType+ "</td></tr>";
			if ((record.data.experimentType == 'STATIC')||(record.data.experimentType == 'CALIBRATION')){
				if ((record.data.measurementDoneCount == 0)&&(record.data.measurementAveragedCount == 0)&&(record.data.dataCollectionDoneCount == 0)){
					html = html + "<tr ><td  style='width:180px;border:1px solid gray;text-align:center;color:" + color +";font-weight:bold;' colspan='4'>EMPTY</td></tr>";
					
				}
				else{
					html = html + "<tr style='margin-left:5px;'><td style='width:10px;'></td><td>Collected:</td><td>"+ record.data.measurementDoneCount +"/" + record.data.measurementCount + "</td><td>" + new ProgressBar().getPanel(record.data.measurementDoneCount, record.data.measurementCount) + "</td></tr>";
					html = html + "<tr><td style='width:10px;'></td><td>Averaged:</td><td>"+ record.data.measurementAveragedCount +"/" + record.data.measurementCount + "</td><td>" + new ProgressBar().getPanel(record.data.measurementAveragedCount, record.data.measurementCount) + "</td></tr>";
					html = html + "<tr><td style='width:10px;'></td><td>Subtracted:</td><td>"+ record.data.dataCollectionDoneCount +"/" + record.data.dataCollectionCount + "</td><td>" + new ProgressBar().getPanel(record.data.dataCollectionDoneCount, record.data.dataCollectionCount) + "</td></tr>";
				}
			}
	return html + "</table>";
};

ExperimentListView.prototype.getFilter = function(value){
	return [{property : "name", value : value, anyMacth : true}];
};

ExperimentListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Experiment',  flex: 1, dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

ExperimentListView.prototype.getFields = function(){
	return  ['creationDate', 'name', 'experimentType'];
};


function MacromoleculeListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	ListView.call(this);
}

MacromoleculeListView.prototype.getPanel = ListView.prototype.getPanel;
MacromoleculeListView.prototype.load = ListView.prototype.load;

MacromoleculeListView.prototype.getRow = function(record){
	var html = "<table class='listView'>";
	html = html + "<tr><td>Acronym:</td><td style='color:#207a7a;font-weight:bold;'>" + record.data.acronym+ "</td></tr>";
	html = html + "<tr><td>name:</td><td>" + record.data.name+ "</td></tr>";
	return html + "</table>";
};

MacromoleculeListView.prototype.getFilter = function(value){
	return [{property : "acronym", value : value, anyMacth : true}];
};

MacromoleculeListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { text: 'Macromolecule',  flex: 1, dataIndex: 'macromoleculeId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        } }
		    ];
};

MacromoleculeListView.prototype.getFields = function(){
	return  ['acronym', 'name', 'comments'];
};


function StockSolutionListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	ListView.call(this);
}

StockSolutionListView.prototype.getPanel = ListView.prototype.getPanel;
StockSolutionListView.prototype.load = ListView.prototype.load;
StockSolutionListView.prototype.getFilter = ListView.prototype.getFilter;
StockSolutionListView.prototype.getFields = ListView.prototype.getFields;
StockSolutionListView.prototype.getColumns = ListView.prototype.getColumns;


/**
* Calls to the dust template in order to render to puck in HTML
*
* @class getRow
* @constructor
*/
StockSolutionListView.prototype.getRow = function(record){
	var html = "";
	if (EXI.proposalManager.getBufferById(record.data.bufferId)){
		record.data.bufferAcronym = EXI.proposalManager.getBufferById(record.data.bufferId).acronym;
	}
	if (EXI.proposalManager.getMacromoleculeById(record.data.macromoleculeId)){
		record.data.macromoleculeAcronym = EXI.proposalManager.getMacromoleculeById(record.data.macromoleculeId).acronym;
	}
	dust.render("stocksolution.listview", record.data, function(err, out){
        	html = out;
     	});
	return html;
};

function TemplateListView(){
	this.sorters = [{property : 'experimentId', direction: 'DESC'}];
	ListView.call(this);
}

TemplateListView.prototype.getPanel = ListView.prototype.getPanel;
TemplateListView.prototype.load = ListView.prototype.load;

TemplateListView.prototype.getRow = function(record){
	var color = "black";
	var html = "<table class='listView' style='color:" + color +";'>";
	html = html + "<tr style='font-weight: bold;font-size:14px; color:#207a7a;'><td colspan='4'>" + record.data.name+ "</td></tr>";
	html = html + "<tr><td style='font-weight:bold;' colspan='4'>" + record.data.comments+ "</td></tr>";
	html = html + "<tr ><td colspan='4'>" + record.data.creationDate+ "</td></tr>";
	return html + "</table>";
};

TemplateListView.prototype.getFilter = function(value){
	return [{property : "name", value : value, anyMatch : true}];
};

TemplateListView.prototype.getColumns = function(){
	var _this = this;
	return  [
		        { 
		        	text: 'Experiment',  
		        	flex: 1, 
		        	dataIndex: 'sessionId', 
		        	renderer : function(list, token, record){
		        		return _this.getRow(record);
		        	} 
		        }
		    ];
};

TemplateListView.prototype.getFields = function(){
//	debugger
//	return  ['creationDate', 'name', 'experimentType'];
	return  [
	         	{name : 'creationDate', type : 'string'}, 
	        	{name : 'name', type : 'string'}, 
	        	{name : 'experimentType', type : 'string'} 
	         ];
};


function DataCollectionMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';

	MainView.call(this);

	this.grid = new QueueGrid({
		positionColumnsHidden : true,
		maxHeight : Ext.getCmp("main_panel").getHeight() - 50,
		sorters : [ {
			property : 'macromoleculeAcronym',
			direction : 'ASC' } ] });
	
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

DataCollectionMainView.prototype.getPanel = MainView.prototype.getPanel;
DataCollectionMainView.prototype.getContainer = MainView.prototype.getContainer;

DataCollectionMainView.prototype.filter = function(macromoleculeAcronym, bufferAcronym) {
	this.grid.key = {};
	this.grid.store.filter( [{property : "bufferAcronym", value : bufferAcronym, anyMacth : true}]);
};

DataCollectionMainView.prototype.load = function(selected) {
	var _this = this;
	

	this.grid.onSelectionChange.attach(function(sender, elements) {
		_this.onSelectionChange.notify(elements);
	});

	this.grid.onSelect.attach(function(sender, selected) {
		_this.onSelect.notify(selected);
	});
	this.grid.onDeselect.attach(function(sender, unselected) {
		_this.onDeselect.notify(unselected);
	});

	this.container.insert(0, this.grid.getPanel());

	this.grid.panel.setLoading();
	this.grid.store.loadData(selected);
	this.grid.panel.setLoading(false);
};

function ExperimentMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	this.experimentHeaderForm = new ExperimentHeaderForm();
	var _this = this;
	/** Viscosity **/
	var storeViscosity = Ext.create('Ext.data.Store', {
		fields : [ 'name' ],
		data : [ {
			"name" : "low"
		}, {
			"name" : "medium"
		}, {
			"name" : "high"
		} ]
	});

	// Create the combo box, attached to the states data store
	var viscosityEditor = Ext.create('Ext.form.ComboBox', {
		fieldLabel : '',
		store : storeViscosity,
		queryMode : 'local',
		displayField : 'name',
		valueField : 'name'
	});
	
	
	/** Specimen Widget contains a specimenGrid and a sampleChangerWidget than can be displayed with are vertical or horizontal layout **/
	this.specimenWidget = new SpecimenWidget({
		height : this.height,
		width : 1200
	});
	
	this.measurementGrid = new MeasurementGrid({
//		maxWidth : 1500,
//		width : 1200,
		height : 600,
		minHeight : 600,
		maxHeight : 600,
		estimateTime : false,
		positionColumnsHidden : false,
		isPriorityColumnHidden : true,
		isStatusColumnHidden : false,
		addBtnEnable : false,
		isTimeColumnHidden : false,
		updateRowEnabled : false,
		collapsed : false,
		removeBtnEnabled : false,
		showTitle : false,
		collapseBtnEnable : false,
		addBtnMultipleEdit : false,
		sortingBtnEnable : false,
		editor : {
			exposureTemperature : {
				xtype : 'textfield',
				allowBlank : true
			},
			comments : {
				xtype : 'textfield',
				allowBlank : true
			},
			volumeToLoad : {
				xtype : 'numberfield',
				allowBlank : true
			},
			transmission : {
				xtype : 'numberfield',
				allowBlank : true
			},
			viscosity : viscosityEditor,
			waitTime : {
				xtype : 'numberfield',
				allowBlank : true
			},
			flow : {
				xtype : 'checkbox',
				allowBlank : true
			}
		}
	});

//	this.measurementGrid.onSelected.attach(function(sender, measurements) {
//		var specimens = [];
//		for ( var i = 0; i < measurements.length; i++) {
//			specimens.push(_this.experiment.getSampleById(measurements[i].specimenId));
//		}
//	});

	this.measurementGrid.onMeasurementChanged.attach(function(sender, measurement) {
//		debugger
		_this.experiment.setMeasurement(measurement);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.measurementGrid.onExperimentChanged.attach(function(sender, json) {
		_this.experiment = new Experiment(json);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.measurementGrid.onRemoved.attach(function(sender, experiments) {
		_this.experiment = new Experiment(experiments[0]);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	
	this.queueGrid = new QueueGrid({
		positionColumnsHidden : true,
//		maxHeight : Ext.getCmp("main_panel").getHeight() - 50,
		sorters : [ {
			property : 'macromoleculeAcronym',
			direction : 'ASC'
		} ]
	});
	
	
}

ExperimentMainView.prototype.getPanel = MainView.prototype.getPanel;

ExperimentMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};


ExperimentMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 0',
				activeTab: 2,
				items : [
					{
						tabConfig : {
							title : "Sample Plate Setup"
						},
						items : [  
									{
										xtype : 'container',
										layout : 'vbox',
										height : 700,
										padding : 20,
										style : {
											borderColor : 'gray',
											borderStyle : 'solid',
											borderWidth : '1px',
											'background-color' : 'white' 
										},
										items : [ 
										     	this.specimenWidget.getPanel()
										     	]
									}
									]
					},
					{
						tabConfig : {
							title : 'Measurements'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							         
							         this.measurementGrid.getPanel()
							]
						}

						]
					},
					{
						tabConfig : {
							title : 'Online Data Analysis'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							     this.queueGrid.getPanel()    
							]
						}
					
						]
					}
			]
	}
	);
};


ExperimentMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    items: [
	            this.experimentHeaderForm.getPanel(),
	            this.getTabs()
	    ]
	});
};



ExperimentMainView.prototype.load = function(experimentId) {
	var _this = this;
	_this.panel.setLoading();
	_this.queueGrid.panel.setLoading();
	var onSuccess = function(sender, experiments){
		_this.experiment = new Experiment(experiments[0]);
		_this.experimentHeaderForm.load(_this.experiment);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.specimenWidget.refresh(_this.experiment);
		_this.panel.setTitle(experiments[0].name);
		_this.panel.setLoading(false);	
		var onSuccess = function(sender, data){
			_this.queueGrid.load(data);
			_this.queueGrid.panel.setLoading(false);
		};
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByExperimentId(experimentId);
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getExperimentById(experimentId);
};



function HPLCMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.grid = new QueueGrid({
		collapsed : true,
		positionColumnsHidden : true,
		maxHeight : Ext.getCmp("main_panel").getHeight() - 50,
		sorters : [ {
			property : 'macromoleculeAcronym',
			direction : 'ASC' } ] });

	this.grid.onSelectionChange.attach(function(sender, elements) {
		_this.onSelectionChange.notify(elements);
	});

	this.grid.onSelect.attach(function(sender, selected) {
		_this.onSelect.notify(selected);
	});

	this.grid.onDeselect.attach(function(sender, unselected) {
		_this.onDeselect.notify(unselected);
	});

	var _this = this;
	_this.annotations = [];
	_this.selectedFrameNumber = [];
	this.hplcGraph = new HPLCGraph({
		title : 'I0',
		width : 800,
		height : 350,
		bbar : true,
		plots : {
			"I0" : true,
			"Rg" : true },
		xlabel : "HPLC Frames",
		scaled : true,
		interactionModel : {
			'dblclick' : function(event, g, context) {
				_this.selectedFrameNumber.push(g.lastx_);
				_this.plotter.loadHPLCFrame(_this.experimentId, _this.selectedFrameNumber);

				_this.annotations.push({
					series : g.selPoints_[0].name,
					x : g.lastx_,
					width : 30,
					height : 23,
					tickHeight : 2,
					shortText : g.lastx_,
					text : g.lastx_,
					attachAtBottom : true });
				g.setAnnotations(_this.annotations);

			} } });

	this.hplcGraph.onClearSelection.attach(function(sender) {
		_this.annotations = [];
		_this.selectedFrameNumber = [];
		_this.hplcGraph.dygraphObject.dygraph.setAnnotations([]);
	});

	this.plotter = new CurvePlotter({
		margin : '10 0 0 0' });

	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

HPLCMainView.prototype.getPanel = MainView.prototype.getPanel;


HPLCMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

HPLCMainView.prototype.getPlotContainer = function() {
	return {
		xtype : 'container',
		cls : 'defaultGridPanel',
		border : 0,
		defaults : {
			height : 450 },
		items : [ this.hplcGraph.getPanel(), this.plotter.getPanel()
		] };
};

HPLCMainView.prototype.getContainer = function() {

	return {
		xtype : 'container',
		items : [ this.grid.getPanel(), this.getPlotContainer() ] };
};

HPLCMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

HPLCMainView.prototype.loadHPLCGraph = function(experimentId) {
	var _this = this;
	var onSuccess = function(sender, data) {
		data = JSON.parse(data);
		var zeroArray = [];
		for (var i = 0; i < data.I0.length; i++) {
			zeroArray.push(0);
		}
		data = [ {
			param : "I0",
			data : data.I0,
			std : data.I0_Stdev,
			color : '#0066CC',
			label : "I0" }, {
			param : "sum_I",
			label : "sum_I",
			color : "#00FF00",
			data : data.sum_I,
			std : zeroArray }, {
			param : "Rg",
			label : "Rg",
			color : "#21610B",
			data : data.Rg,
			std : data.Rg_Stdev }, {
			param : "Mass",
			data : data.mass,
			std : data.mass_Stdev,
			color : '#FF9900',
			label : "Mass" }, {
			param : "Vc",
			data : data.Vc,
			std : data.Vc_Stdev,
			color : '#990099',
			label : "Vc" }, {
			param : "Qr",
			data : data.Qr,
			std : data.Qr_Stdev,
			color : '#FF0066',
			label : "Qr" }, {
			param : "quality",
			label : "quality",
			color : "#FF00FF",
			data : data.quality,
			std : zeroArray } ];
		_this.hplcGraph.loadData(data);

	};

	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.hplc.getHPLCOverviewByExperimentId(experimentId);
};

HPLCMainView.prototype.load = function(experimentId) {
		var _this = this;
		this.experimentId = experimentId;

		this.grid.panel.setLoading();

		var onSuccess = function(sender, data) {
			_this.grid.load(data);
			_this.grid.panel.setLoading(false);
		};

		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByExperimentId(experimentId);
		this.loadHPLCGraph(experimentId);
};

function BufferWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Macromolecules";
	this.closable = false;
}

BufferWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
BufferWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

BufferWelcomeMainView.prototype.getOptions = function() {
	var html =  "<ul><li>Define beforehand an experiment</li>";
	html = html + "<li>Send your samples by courier</li>";
	return html + "</ul>";
};



BufferWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '20',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
//							height : 700,
							padding : 10,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Buffers on ISPyB</h2></div>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	 html : '<div class="landing-text">A buffer is the matched solution which in a sample is suspended</div><br/>',
							        	 margin : '0 0 0 40'
							         },
							         {
							        	 html : '<div class="landing-text">You should define a macromolecule on ISPyB if you want:</div>',
							        	 margin : '0 0 0 40'
							         },
							         {
							        	 html : this.getOptions(),
							        	 margin : '0 0 0 40'
							         },
							         
							         {
							        	 html : '<br/><div class="landing-text">If your macromolecule is not in the list showed on the left you can create a new one</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Add a new buffer</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){
										        		 location.hash = '/buffer/add';
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


BufferWelcomeMainView.prototype.load = function() {
	
};

function ExperimentWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Welcome";
	this.closable = false;
}

ExperimentWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
ExperimentWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

ExperimentWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '10',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							padding : 20,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Designing your experiment on ISPyB</h2></div>'
							         },
							         {
							        	 html : '<div class="landing-text">A experiment is a set of measurements of samples.</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Create a new Experiment</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){
										        		 location.hash = '/prepare/designer';
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


ExperimentWelcomeMainView.prototype.load = function() {
	
};

function MacromoleculeWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Macromolecules";
	this.closable = false;
}

MacromoleculeWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
MacromoleculeWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

MacromoleculeWelcomeMainView.prototype.getOptions = function() {
	var html =  "<ul><li>Define beforehand an experiment</li>";
	html = html + "<li>Send your samples by courier</li>";
	html = html + "<li>Online data analysis to run apriori data analysis (PDB information will be required on the advanced tab in the macromolecule view)</li>";
	return html + "</ul>";
};

MacromoleculeWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '10',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							padding : 20,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Macromolecules on ISPyB</h2></div>'
							         },
							         {
							        	 html : '<div class="landing-text">A macromolecule is a biological contruct for investigation.</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	 html : '<div class="landing-text">You should define a macromolecule on ISPyB if you want:</div>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	 html : this.getOptions(),
							        	 margin : '0 0 0 40'
							         },
							         
							         {
							        	 html : '<br/><div class="landing-text">If your macromolecule is not in the list showed on the left you can create a new one</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Add a new macromolecule</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){
										        		 location.hash = '/macromolecule/add';
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


MacromoleculeWelcomeMainView.prototype.load = function() {
	
};

function ShipmentPreparationMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "How to prepare a Shipment?";
	this.closable = false;
	
}

ShipmentPreparationMainView.prototype.getPanel = MainView.prototype.getPanel;
ShipmentPreparationMainView.prototype.getContainer = MainView.prototype.getContainer;

ShipmentPreparationMainView.prototype.getContainer = function() {
	var text= "The aim of a BioSAXS experiment is to determine the low resolution shape of a macromolecule in solution \n" + 
			"under physiological conditions. In order to define an experiment or create a shipment ISPyB needs to know the macromolecules and buffers that compose your samples";
	
	return {
		    cls : 'border-grid',
		    margin : 10,
			items : [
						{
							 html : '<div class="welcome-title"><h2>How to define my samples on ISPyB?</h2> </div>'
						},
						{
							 html : '<div class="help-text"> ' + text +'</div>'
						},
						{
							 html :'<div class="welcome-title"><h4>What is a macromolecule and how can I define it on ISPyB?</h4> </div>'
						},
						{
							 html : '<div class="help-text">A macromolecule is a biological construct in solution for investigation</div>'
						},
						
			]
	};
};



ShipmentPreparationMainView.prototype.load = function(username) {
	
};

function ShippingWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Welcome";
	this.closable = false;
}

ShippingWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
ShippingWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

ShippingWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '10',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							padding : 20,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Shipments</h2></div>'
							         },
							         {
							        	 html : '<div class="landing-text"> A Shipment consists of a set of Dewars which is sent from your home lab to the synchrotron via a courier company. Each dry shipping Dewar within the shipment is identified by a label (barcode or sticker). The dewars(s) contains a set of Containers (Pucks or canes). Containers (typically Pucks), contain Samples. A Sample (Sample Holder) contains the Crystal</div><br/>',
							        	 margin : '0 0 0 20'
							         },
//							         {
//							        	 html : '<div class="landing-text"><img src="../images/ShippingObjects_02.png" /></div>',
//							        	 margin : '0 0 0 20'
//							         },
//							         {
//							        	 html : '<div class="landing-text">Tracking your shipment & contents (Dewars, toolboxes etc) allows you to follow the progress of your shipment from your home Lab to The ESRF.</div>',
//							        	 margin : '0 0 0 20'
//							         },
//							         
//							         {
//							        	 html : '<div class="landing-text"><img src="../images/dewarTrackingWF_01.png" /></div>',
//							        	 margin : '0 0 0 20'
//							         },
//							         {
//							        	 html : this.getOptions(),
//							        	 margin : '0 0 0 40'
//							         },
							         
							         {
							        	 html : '<br/><div class="landing-text">Do you want to ship your samples to the beamline?</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Create a new Shipment</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){

										        		 //if (EXI.proposalManager.getFutureSessions().length > 0){
										     				location.hash = '/shipping/main';
										     			 //}
										        		 //else{
											        	//	 BUI.showError("Sorry, there are not sessions scheduled for this proposal");
										        		 //}
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


ShippingWelcomeMainView.prototype.load = function() {
	
};

function StockSolutionWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Macromolecules";
	this.closable = false;
}

StockSolutionWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
StockSolutionWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

StockSolutionWelcomeMainView.prototype.getOptions = function() {
	var html =  "<ul><li>Define beforehand an experiment</li>";
	html = html + "<li>Send your samples by courier</li>";
	return html + "</ul>";
};

StockSolutionWelcomeMainView.prototype.getContainer = function() {
	return  Ext.createWidget('panel',
			{
				plain : true,
				margin : '20',
				layout : 'fit',
				items : [
					{
						tabConfig : {
							title : 'Welcome'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
//							height : 700,
							padding : 10,
							margin : 0,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="landing-title" ><h2>Stock Solutions on ISPyB</h2></div>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	 html : '<div class="landing-text">A buffer is the matched solution which in a sample is suspended</div><br/>',
							        	 margin : '0 0 0 40'
							         },
							         {
							        	 html : '<div class="landing-text">You should define a macromolecule on ISPyB if you want:</div>',
							        	 margin : '0 0 0 40'
							         },
							         {
							        	 html : this.getOptions(),
							        	 margin : '0 0 0 40'
							         },
							         
							         {
							        	 html : '<br/><div class="landing-text">If your macromolecule is not in the list showed on the left you can create a new one</div><br/>',
							        	 margin : '0 0 0 20'
							         },
							         {
							        	xtype : 'container',
							        	layout : 'hbox',
							        	cls : 'option-bar-menu',
							        	items :[
							        	    
										         {
										        	 xtype : 'button',
										        	 cls : 'square-option',
										        	 maxWidth : 200,
										        	 minWidth : 200,
										        	 margin : '0 0 0 150',
										        	 height : 100,
										        	 text : '<div class="square-option-text"; >Add a new Stock Solution</div>',
										        	 icon : '../images/icon/add.png',
										        	 iconAlign : 'top',
										        	 handler : function(){
										        		 location.hash = '/stocksolution/add';
										        	 }
										         }]
							         }
							       
							        
							]
						}
					
						]
					}
			]});
	};


StockSolutionWelcomeMainView.prototype.load = function() {
	
};

function MergeMainView() {
	this.title = "Primary Data View";
	this.icon = 'images/icon/ic_blur_on_black_18dp.png';
	this.queueGridList = [];

	var _this = this;

	/** Curve plotter * */
	this.plotter = new CurvePlotter({});
	this.formPopulated = false;
	this.plotter.onRendered.attach(function(sender) {
		/** only once * */
		if (!_this.formPopulated) {
			/** colors * */
			var colors = {};
			for (var i = 1; i < sender.getLabels().length; i++) {
				colors[sender.getLabels()[i]] = sender.getColors()[i - 1];
			}

			_this.populateForm(sender.getPointCount(), colors);
			_this.formPopulated = true;
		}
		plotter = sender;
	});
}

MergeMainView.prototype.getPanel = MainView.prototype.getPanel;
MergeMainView.prototype.getContainer = MainView.prototype.getContainer;

MergeMainView.prototype.populateForm = function(pointCount, colors) {
	for (var i = 0; i < this.frames.length; i++) {
		this.editorPanel.add(this.getCurveContainer(this.frames[i].subtractionId, this.frames[i].fileName, 0, 5, this.frames[i].scale,
				pointCount, colors));
	}
};

MergeMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

MergeMainView.prototype.getCurveContainer = function(subtractionId, fileName, from, to, scale, pointCount, colors) {
	var _this = this;
	return Ext.create('Ext.Panel', {
		width : 380,
		layout : 'vbox',
		border : 1,
		style : {
			// borderColor : colors[fileName],
			borderStyle : 'solid',
			borderWidth : '1px' },
		margin : '10 0 0 5',
		items : [ {
			xtype : 'container',
			margin : '0 0 0 0',
			layout : 'hbox',
			items : [ {
				xtype : 'container',
				layout : 'vbox',
				items : [ {
					html : '<span style="font-size:12px;color:' + colors[fileName] + ';">' + fileName + '</span>',
					margin : '10 0 0 10' },

				{
					xtype : 'sliderfield',
					margin : '10 0 0 2',
					hideLabel : true,
					width : 275,
					minValue : 0,
					subtractionId : subtractionId,
					id : "slider" + subtractionId,
					maxValue : pointCount,
					increment : 1,
					values : [ 0, pointCount ],
					listeners : {
						changecomplete : function(slider, newValue, thumb, eOpts) {
							var values = slider.getValues();
							for (var i = 0; i < _this.frames.length; i++) {
								if (_this.frames[i].subtractionId == slider.subtractionId) {
									_this.frames[i].from = _this.plotter.dygraph.getValue(values[0] - 1, 0);
									_this.frames[i].to = _this.plotter.dygraph.getValue(values[1] - 1, 0);
								}
							}
							_this.updateCurve();
						} } } ] }, {
				xtype : 'container',
				layout : 'vbox',
				items : [ {
					xtype : 'container',
					layout : 'hbox',
					items : [ {
						xtype : 'button',
						text : '<',
						width : 30,
						margin : '2 0 0 10',
						subtractionId : subtractionId,
						handler : function(sender) {
							var id = "slider" + sender.subtractionId;
							Ext.getCmp(id).setValue(0, Ext.getCmp(id).getValues()[0] - 1);
							var values = Ext.getCmp(id).getValues();
							for (var i = 0; i < _this.frames.length; i++) {
								if (_this.frames[i].subtractionId == sender.subtractionId) {
									_this.frames[i].from = _this.plotter.dygraph.getValue(values[0] - 1, 0);
								}
							}

							_this.updateCurve();
						} }, {
						xtype : 'button',
						text : '>',
						width : 30,
						margin : '2 0 0 5',
						subtractionId : subtractionId,
						handler : function(sender) {
							var id = "slider" + sender.subtractionId;
							Ext.getCmp(id).setValue(1, Ext.getCmp(id).getValues()[1] + 1);
							var values = Ext.getCmp(id).getValues();
							for (var i = 0; i < _this.frames.length; i++) {
								if (_this.frames[i].subtractionId == sender.subtractionId) {
									_this.frames[i].to = _this.plotter.dygraph.getValue(values[1] - 1, 0);
								}
							}
							_this.updateCurve();
						} }

					]

				}, {
					xtype : 'container',
					layout : 'hbox',
					margin : '2 0 2 0',
					items : [ {
						xtype : 'button',
						text : '+',
						margin : '0 0 0 10',
						width : 30,
						subtractionId : subtractionId,
						handler : function(sender) {
							for (var i = 0; i < _this.frames.length; i++) {
								console.log(sender.subtractionId);
								if (_this.frames[i].subtractionId == sender.subtractionId) {
									_this.frames[i].scale = _this.frames[i].scale + 0.1;
								}
							}
							_this.updateCurve();
						} }, {
						xtype : 'button',
						text : '-',
						width : 30,
						margin : '0 0 0 5',
						subtractionId : subtractionId,
						handler : function(sender) {
							for (var i = 0; i < _this.frames.length; i++) {
								if (_this.frames[i].subtractionId == sender.subtractionId) {
									_this.frames[i].scale = _this.frames[i].scale - 0.1;
								}
							}
							_this.updateCurve();
						} } ] } ] }

			] }

		] });
};

MergeMainView.prototype.getSubtractionEditor = function() {
	var _this = this;
	this.editorPanel = Ext.create('Ext.Panel', {
		border : 1,
		height : 600,
		width : 400,
		layout : 'vbox',
		scrollable : true,
		style : {
			borderColor : '#000000',
			borderStyle : 'solid',
			borderWidth : '1px' },
		items : [],
		bbar : [ {
					text : "Download",
					xtype : 'button',
					handler : function(sender) {
						var params = _this.getParams();
						window.open(new DataAdapter().getMergeURL(params.subtractionIds.toString(), params.from.toString(), params.to.toString(), params.scale.toString()));
					}
		}]
//		{
//			xtype : 'button',
//			text : 'Download',
//			margin : '0 0 0 10',
//			width : 30,
//			handler : function(sender) {
//
//			} } ] 
			
	});
	return this.editorPanel;
};

MergeMainView.prototype.getParams = function() {
	var from = [];
	var to = [];
	var scale = [];
	var subtractionIds = [];
	for (var i = 0; i < this.frames.length; i++) {
		var frame = this.frames[i];
		if (frame.from != null) {
			from.push(frame.from);
		} else {
			from.push("");
		}
		if (frame.to != null) {
			to.push(frame.to);
		} else {
			to.push("");
		}
		if (frame.scale != null) {
			scale.push(frame.scale);
		} else {
			scale.push("");
		}
		if (frame.subtractionId != null) {
			subtractionIds.push(frame.subtractionId);
		} else {
			subtractionIds.push("");
		}
	}
	return {
		from : from,
		to : to,
		scale : scale,
		subtractionIds : subtractionIds,
		
	};
};

MergeMainView.prototype.updateCurve = function() {
	

	/** Saving zoom * */
	this.xAxisRange = this.plotter.dygraph.xAxisRange();
	this.yAxisRange = this.plotter.dygraph.yAxisRange();

	var params = this.getParams();
	this.plotter.loadMerge(params.subtractionIds.toString(), params.from.toString(), params.to.toString(), params.scale.toString());
	this.plotter.dygraph.updateOptions({
		dateWindow : this.xAxisRange,
		valueRange : this.yAxisRange });
};

MergeMainView.prototype.getSlavePanel = function() {
	return {
		xtype : 'container',
		layout : 'hbox',
		cls : 'defaultGridPanel',
		border : 0,
		defaults : {
			xtype : 'container',
			height : 600 },
		items : [ this.getSubtractionEditor(), this.plotter.getPanel() ] };
};

MergeMainView.prototype.load = function(selected) {
	var _this = this;

	var grid = new QueueGrid({
		maxHeight : 300

	});

	this.panel.setTitle("Merge Tool");
	this.container.insert(0, grid.getPanel());

	this.container.insert(1, this.getSlavePanel());
	grid.load(selected);
	grid.panel.setLoading(false);

	var dataCollectionIds = [];
	var subtractionIds = [];
	var subtractionKey = [];

	this.frames = [];
	for (var i = 0; i < selected.length; i++) {

		dataCollectionIds.push(selected[i].dataCollectionId);
		if (subtractionKey[selected[i].subtractionId] == null) {
			subtractionIds.push(selected[i].subtractionId);
			this.frames.push({
				'fileName' : selected[i].substractedFilePath.substr(selected[i].substractedFilePath.lastIndexOf("/") + 1),
				'subtractionId' : selected[i].subtractionId,
				'scale' : 1 });

			subtractionKey[selected[i].subtractionId] = true;
		}
	}

	/** Loading the subtraction on the curve Plotter * */
	this.plotter.load({
		subtracted : subtractionIds });

};

function BufferMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.bufferForm = new BufferForm({
		height : 800,
		collapsed : false,
		tbar : true
	});
	
	var _this = this;
//	this.bufferGrid.onUpdated.attach(function(sender){
//		_this.load();
//	});
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

BufferMainView.prototype.getPanel = MainView.prototype.getPanel;

BufferMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    margin : 15,
//		bodyStyle : {
//			"background-color" : "#E6E6E6" 
//		},
	    border: 1,
//	    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
	    defaults: {
	        labelWidth: 80,
//	        xtype: 'datefield',
	        flex: 1,
	    },
	    items: [this.bufferForm.getPanel([])]
	});
};


BufferMainView.prototype.load = function(bufferId) {
//	this.bufferGrid.load(EXI.proposalManager.getBuffers());
	this.panel.setTitle("Buffer");
	this.bufferForm.load(EXI.proposalManager.getBufferById(bufferId));
};

function DesignerMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	var _this = this;
	
	
	this.wizardWidget = new WizardWidget({
		windowMode : true,
		width : 1200 });
//
	this.wizardWidget.onFinished.attach(function(sender, result) {
//		wizardWidget.window.close();
		EXI.setLoading();
		var onSuccess = function(sender, experiment) {
			location.hash = "/experiment/templateId/" + experiment.experimentId + "/main";
		};
//		wizardWidget.current.setLoading("ISPyB: Creating experiment");
		EXI.getDataAdapter({onSuccess : onSuccess}).saxs.template.saveTemplate(result.name, result.comments, result.data);
	});
//
//	wizardWidget.draw(new MeasurementCreatorStepWizardForm(EXI.proposalManager.getMacromolecules(),EXI.proposalManager.getBuffers()));
		
		
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

DesignerMainView.prototype.getPanel = MainView.prototype.getPanel;

DesignerMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    margin : 15,
	    border: 1,
	    defaults: {
	        labelWidth: 80,
	        flex: 1,
	    },
	    items: [this.wizardWidget.getPanel(new MeasurementCreatorStepWizardForm(EXI.proposalManager.getMacromolecules(),EXI.proposalManager.getBuffers()))]
	});
};


DesignerMainView.prototype.load = function(bufferId) {
//	this.bufferGrid.load(EXI.proposalManager.getBuffers());
	this.panel.setTitle("Experiment Designer");
	
};

function ExperimentDesignerMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.templateGrid = new TemplateGrid({
		minHeight : 300,
		height : 440,
		gridType : 'Ext.grid.Panel',
		title : 'Experiments',
		grouping : false,
		tbar : true
	});
	
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

ExperimentDesignerMainView.prototype.getPanel = MainView.prototype.getPanel;

ExperimentDesignerMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    border: 1,
	    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
	    defaults: {
	        labelWidth: 80,
	        xtype: 'datefield',
	        flex: 1,
	    },
	    items: [this.templateGrid.getPanel([])]
	});
};

ExperimentDesignerMainView.prototype.load = function() {
	var _this = this;
	this.panel.setLoading();
	var manager = new ProposalUpdater(); 
	this.templateGrid.grid.setLoading();
	manager.onSuccess.attach(function(sender, proposals){
		_this.panel.setLoading(false);
		var adapter = new DataAdapter();
		adapter.onSuccess.attach(function(sender, experiments){
			_this.templateGrid.store.loadData(experiments);
			_this.templateGrid.grid.setLoading(false);
		});
		
		adapter.getByExperimentByKey("experimentType", "TEMPLATE");
	});
	manager.get();
	
	this.panel.setTitle("Experiment Designer");
};

function MacromoleculeMainView() {
	
	this.icon = '../images/icon/macromolecule.png';
	this.queueGridList = [];

	MainView.call(this);

	this.macromoleculeForm = new MacromoleculeForm({
		height : 800,
		collapsed : false,
		tbar : true
	});
	
	this.rigidBodyModelingForm = new RigidBodyModelingForm({
//		width : this.width - 30,
//		height : this.height - 50,
	});
	
	this.rigidBodyModelingForm.onSave.attach(function(sender, macromolecule) {
//		_this.onSave.notify(macromolecule);
	});
	
	
	var _this = this;
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

MacromoleculeMainView.prototype.getPanel = MainView.prototype.getPanel;

MacromoleculeMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

MacromoleculeMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

MacromoleculeMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
//				margin : '5 0 0 0',
				items : [
					{
						tabConfig : {
							title : 'General'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 600,
							padding : 0,
							items : [ 
							         
							         this.macromoleculeForm.getPanel()
							]
						}

						]
					},
					{
						tabConfig : {
							title : 'Advanced'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 500,
							padding : 0,
							items : [ 
							         this.rigidBodyModelingForm.getPanel()
							]
						}

						]
					}
			]});
};


MacromoleculeMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    items: [
	            this.getTabs()
	            ]
	});
};


MacromoleculeMainView.prototype.load = function(macromoleculeId) {
	this.panel.setLoading();
	var macromolecule = EXI.proposalManager.getMacromoleculeById(macromoleculeId);
	this.panel.setTitle(macromolecule.acronym);
	this.macromoleculeForm.load(macromolecule);
	this.rigidBodyModelingForm.load(macromolecule);
	this.panel.setLoading(false);
};

function StockSolutionMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.stockSolutionForm = new StockSolutionForm({
//		width : this.width - 10,
		minHeight : 800,
		height : 800,
		tbar : true,
		showTitle : true,
		isPackedVisible : false,
		btnAddExisting : false,
		btnRemoveVisible : false,
		btnUnpackVisible : false
	});
	
	var _this = this;
	
	
	this.stockSolutionForm.onSaved.attach(function(sender, stockSolution){
		var onSuccess2 = function(sender, proposals){
			_this.stockSolutionForm.load(EXI.proposalManager.getStockSolutionById(_this.stockSolutionId));	
			_this.panel.setLoading(false);
		};
		_this.panel.setLoading("Updading proposal information");
		EXI.getDataAdapter({onSuccess : onSuccess2}).proposal.proposal.update();
//		
	});
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

StockSolutionMainView.prototype.getPanel = MainView.prototype.getPanel;

StockSolutionMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
		 items: [this.stockSolutionForm.getPanel([])]
	});
	
};


StockSolutionMainView.prototype.load = function(stockSolutionId) {
	this.stockSolutionId = stockSolutionId;
	
	this.stockSolutionForm.load(EXI.proposalManager.getStockSolutionById(stockSolutionId));	
	this.panel.setTitle("Stock Solutions");
};

function TemplateMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	
	this.experimentHeaderForm = new ExperimentHeaderForm();
	
	var _this = this;
	
	
	/** Viscosity **/
	var storeViscosity = Ext.create('Ext.data.Store', {
		fields : [ 'name' ],
		data : [ {
			"name" : "low"
		}, {
			"name" : "medium"
		}, {
			"name" : "high"
		} ]
	});

	// Create the combo box, attached to the states data store
	var viscosityEditor = Ext.create('Ext.form.ComboBox', {
		fieldLabel : '',
		store : storeViscosity,
		queryMode : 'local',
		displayField : 'name',
		valueField : 'name'
	});
	
	
	/** Specimen Widget contains a specimenGrid and a sampleChangerWidget than can be displayed with are vertical or horizontal layout **/
	this.specimenWidget = new SpecimenWidget({
		height : this.height,
		width : 1200
	});
	
	this.measurementGrid = new MeasurementGrid({
//		maxWidth : 1500,
//		width : 1200,
		height : 600,
		minHeight : 600,
		maxHeight : 600,
		estimateTime : false,
		positionColumnsHidden : true,
		isPriorityColumnHidden : true,
		isStatusColumnHidden : true,
		addBtnEnable : true,
		isTimeColumnHidden : true,
		updateRowEnabled : true,
		collapsed : true,
		removeBtnEnabled : true,
		showTitle : false,
		collapseBtnEnable : false,
		addBtnMultipleEdit : true,
		sortingBtnEnable : true,
		editor : {
			exposureTemperature : {
				xtype : 'textfield',
				allowBlank : true
			},
			comments : {
				xtype : 'textfield',
				allowBlank : true
			},
			volumeToLoad : {
				xtype : 'numberfield',
				allowBlank : true
			},
			transmission : {
				xtype : 'numberfield',
				allowBlank : true
			},
			viscosity : viscosityEditor,
			waitTime : {
				xtype : 'numberfield',
				allowBlank : true
			},
			flow : {
				xtype : 'checkbox',
				allowBlank : true
			}
		}
	});


	this.measurementGrid.onMeasurementChanged.attach(function(sender, measurement) {
		_this.experiment.setMeasurement(measurement);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.measurementGrid.onExperimentChanged.attach(function(sender, json) {
		_this.experiment = new Experiment(json);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.measurementGrid.onRemoved.attach(function(sender, experiments) {
		_this.experiment = new Experiment(experiments[0]);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
	});

	this.volumePlanificator = new VolumeGrid();
}

TemplateMainView.prototype.getPanel = MainView.prototype.getPanel;

TemplateMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

TemplateMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};


TemplateMainView.prototype.getTabs = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 0',
				items : [
					{
						tabConfig : {
							title : 'Measurements'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 700,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
							         
							         this.measurementGrid.getPanel()
							]
						}

						]
					},
					{
						tabConfig : {
							title : "Sample Plate Setup"
						},
						items : [  
									{
										xtype : 'container',
										layout : 'vbox',
										height : 700,
										padding : 20,
										style : {
											borderColor : 'gray',
											borderStyle : 'solid',
											borderWidth : '1px',
											'background-color' : 'white' 
										},
										items : [ 
										     	this.specimenWidget.getPanel()
										     	]
									}
					]
			},
			{
				tabConfig : {
					title : "Sample Requirements"
				},
				items : [  
							{
								xtype : 'container',
								layout : 'fit',
								height : 700,
								padding : 20,
								style : {
									borderColor : 'gray',
									borderStyle : 'solid',
									borderWidth : '1px',
									'background-color' : 'white' 
								},
								items : [ 
								     	this.volumePlanificator.getPanel()
								     	]
							}
			]
			}
			]});
};


TemplateMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'anchor'
	    },
	    defaults : {
			anchor : '100%',
			hideEmptyLabel : false },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    items: [
	            
	            this.experimentHeaderForm.getPanel(),
	            this.getTabs()
	            ]
	});
};



TemplateMainView.prototype.load = function(experiments) {
	var _this = this;
	_this.panel.setLoading();
	var onSuccess = function(sender, experiments){
		_this.experiment = new Experiment(experiments[0]);
		_this.experimentHeaderForm.load(_this.experiment);
		_this.measurementGrid.loadExperiment(_this.experiment);
		_this.specimenWidget.refresh(_this.experiment);
		_this.volumePlanificator.load(_this.experiment);
		_this.panel.setLoading(false);
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.experiment.getExperimentById(experiments[0].experimentId);
	this.panel.setTitle("Template");
};

function PrimaryDataMainView() {
	this.title = "Primary Data View";
	this.icon = 'images/icon/ic_blur_on_black_18dp.png';

	MainView.call(this);
	
	this.onMeasurementSelectionChange = new Event(this);
	
	var _this = this;
	
	this.frameSelectorGrid = new FrameSelectorGrid();
	this.frameSelectorGrid.onSelectionChange.attach(function(sender, selections){
		_this.plotter.load(selections);
	});
	
	/** Curve plotter * */
	this.plotter = new CurvePlotter({
	});

	this.grid = new QueueGrid({
		maxHeight : 300
	});
	
	
	/** Abinitio **/
	this.abinitioForm = new AbinitioForm({
		height : 700
	});
	
}

PrimaryDataMainView.prototype.getPanel = MainView.prototype.getPanel;

PrimaryDataMainView.prototype.getSlavePanel = function() {
	return {
		xtype : 'container',
		layout : 'hbox',
		cls 	: 'defaultGridPanel',
		margin : 5,
		border : 0,
		defaults : {
			height : 600 
		},
		items : [ 
		         {
		        	 xtype : 'panel',
		        	 layout: {
		        	        type: 'accordion',
		        	        titleCollapse: false,
		        	        animate: true,
		        	        activeOnTop: true
		        	    },
		        	    flex : 0.3,
		        		border : 1,
		        		style : {
		        			borderColor : '#000000',
		        			borderStyle : 'solid',
		        			borderWidth : '1px' },
		        	 items : [
		        	          this.frameSelectorGrid.getPanel()
		        	         
		        	          ]
		         },
		         this.plotter.getPanel()
		        
		    ]
	};

};


PrimaryDataMainView.prototype.getContainer = function() {
	return  Ext.createWidget('tabpanel',
			{
				plain : true,
				height : 900,
				margin : '10 0 0 0',
				items : [
					{
						tabConfig : {
							title : 'Primary Data Reduction'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 850,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
										{
											xtype : 'container',
											items : [
											         	this.grid.getPanel(),
											        	this.getSlavePanel()         
											]
										}
							]
						}

						]
					},
					{
						tabConfig : {
							title : 'Abinitio Modeling'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							height : 850,
							padding : 20,
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : [ 
										{
											xtype : 'container',
											items : [
											         	this.abinitioForm.getPanel()
											]
										}
							]
						}

						]
					}
			]
			});
};


//PrimaryDataMainView.prototype.getContainer = function() {
//	return {
//		xtype : 'container',
//		items : [
//		         	this.grid.getPanel(),
//		        	this.getSlavePanel()         
//		]
//	};
//};

PrimaryDataMainView.prototype.load = function(selected) {
	var _this = this;
	this.panel.setTitle(" Data Collection");
	this.grid.panel.setLoading();
	var onSuccess = function(sender, data) {
		_this.grid.load(data);
		_this.grid.panel.setLoading(false);
		/** Measurements Grid * */
		_this.frameSelectorGrid.load(data);
		
		/** Getting abinitio **/
		if (data[0].subtractionId){
			var onSuccessSubtraction = function(sender, subtractions) {
				_this.abinitioForm.load(subtractions);
			};
			
			EXI.getDataAdapter({onSuccess : onSuccessSubtraction}).saxs.subtraction.getSubtractionsBySubtractionIdList([data[0].subtractionId]);
			
		}
	};

	var dataCollectionIds = [];
	for (var i = 0; i < selected.length; i++) {
		dataCollectionIds.push(selected[i].dataCollectionId);

	}
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.dataCollection.getDataCollectionsByDataCollectionId(dataCollectionIds);
	
	
	
};

