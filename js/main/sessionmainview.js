/*function SessionMainView() {
	this.title = "Session";
}

SessionMainView.prototype.getHeader = function(beamlineName, startDate) {
	return {
		html : "<span class='item'>" + beamlineName +"</span><span class='item_description'>" + startDate +"</span>"
	};
};

SessionMainView.prototype.getPanel = MainView.prototype.getPanel;
SessionMainView.prototype.getContainer = MainView.prototype.getContainer;

SessionMainView.prototype.load = function(selected) {
	
	for (var i = 0; i < selected.length; i++) {
		var session = selected[i];
		this.panel.add(this.getHeader(session.beamlineName,session.startDate));
		
		var listView = new ExperimentListView();
		this.panel.add(listView.getPanel());
		
		var adapter = new DataAdapter();
		adapter.onSuccess.attach(function(sender, data){
			listView.store.loadData(data);
		});
		adapter.getExperimentsBySessionId(selected[i].sessionId);
	}
};


SessionMainView.prototype.getContainer = function() {
	this.panel = Ext.create('Ext.panel.Panel', {
		scroll : 'vertical',
		autoScroll : true,
		layout : 'vbox',
		items :[ ]
	});
	return this.panel;
};
*/