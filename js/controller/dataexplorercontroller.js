//function DataExplorerController(){
//	
//	this.onAddNavigationPanel = new Event();
//	this.onClearNavigationPanel = new Event();
//	
//	this.onSetLoadingNavigationPanel = new Event();
//	
//	
//	this.onAddMainPanel = new Event();
//	this.onClearMainPanel = new Event();
//	
//	this.onNavigationBackFunction = new Event();
//	
//}
//
//DataExplorerController.prototype.getAdapter = function(listView, mainView){
//	var _this = this;
//	
//	this.onClearNavigationPanel.notify();
//	this.onSetLoadingNavigationPanel.notify(true);
//	
//	var adapter = new DataAdapter();
//	adapter.onSuccess.attach(function(sender, data) {
//		_this.onAddNavigationPanel.notify(listView);
//		listView.store.loadData(data);
//		_this.onSetLoadingNavigationPanel.notify(false);
//		if (mainView != null){
//			listView.onSelect.attach(function(sender, selected){
//				_this.onAddMainPanel.notify(mainView);
//				mainView.load(selected);
//			});
//		}
//	});
//	
//	adapter.onError.attach(function(sender, data) {
//		Ext.Msg.alert('Failed', "Ooops, there was an error");
//		_this.onSetLoadingNavigationPanel.notify(false);
//	});
//	return adapter;
//};
//
///** Session will show the selected experiments in the navigation view **/
//DataExplorerController.prototype.showSessions = function(){
//	var _this = this;
//	var listView = new SessionListView();
//	
//	this.onClearNavigationPanel.notify();
//	this.onSetLoadingNavigationPanel.notify(true);
//	
//	var adapter = new DataAdapter();
//	adapter.onSuccess.attach(function(sender, data) {
//		_this.onAddNavigationPanel.notify(listView);
//		listView.store.loadData(data);
//		_this.onSetLoadingNavigationPanel.notify(false);
//		
//		listView.onSelect.attach(function(sender, selected){
//			_this.onClearNavigationPanel.notify();
//			var experimentListView = new ExperimentListView();
//			var mainView = new  ExperimentMainView();
//			experimentListView.onSelect.attach(function(sender, selected){
//				_this.onAddMainPanel.notify(mainView);
//				mainView.load(selected);
//			});
//			_this.getAdapter(experimentListView).getExperimentsBySessionId(selected[0].sessionId);
//			 var back = function() {
//				 _this.showSessions();
//			};
//			_this.onNavigationBackFunction.notify(back);
//		});
//	});
//	
//	adapter.onError.attach(function(sender, data) {
//		Ext.Msg.alert('Failed', "Ooops, there was an error");
//		_this.onSetLoadingNavigationPanel.notify(false);
//	});
//	adapter.getSessions();
//};
//
//DataExplorerController.prototype.showExperiments = function(){
//	this.getAdapter(new ExperimentListView(), new  ExperimentMainView()).getExperiments();
//};
//
//DataExplorerController.prototype.showMacromolecules = function(){
//	this.getAdapter(new MacromoleculeListView(), new  MacromoleculeMainView()).getMacromolecules();
//};
//
//
//
