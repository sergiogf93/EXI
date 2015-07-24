
ExperimentMainView.prototype.getPanel = MainView.prototype.getPanel;
ExperimentMainView.prototype.getContainer = MainView.prototype.getContainer;

function ExperimentMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];
	
    MainView.call(this);
    
    this.onSelect = new Event(this);
    this.onDeselect = new Event(this);
}

ExperimentMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName +"</span><span class='item_description'>" + startDate +"</span>";
};

ExperimentMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

ExperimentMainView.prototype.load = function(selected) {
	var _this = this;
	for (var i = 0; i < selected.length; i++) {
		var experiment = selected[i];
		
		var grid = new QueueGrid({
			positionColumnsHidden : true,
			maxHeight : Ext.getCmp("main_panel").getHeight() - 50,
			sorters : [ {
				property : 'macromoleculeAcronym',
				direction : 'ASC'
			} ]
		});
		this.queueGridList.push(grid);
		
		grid.onSelectionChange.attach(function(sender, elements){
			_this.onSelectionChange.notify(elements);
		});
		
		grid.onSelect.attach(function(sender, selected){
			_this.onSelect.notify(selected);
		});
		grid.onDeselect.attach(function(sender, unselected){
			_this.onDeselect.notify(unselected);
		});
		
		
		this.container.insert(0, grid.getPanel());
		grid.panel.setTitle(_this.getHeader(experiment.name,experiment.creationDate));
		
		
		grid.panel.setLoading();
		
		var adapter = new DataAdapter();
		/*** Trick for JS compiler **/
		adapter.grid = grid;
		adapter.onSuccess.attach(function(sender, data){
			_this.panel.setTitle(experiment.name);
			
			sender.grid.load(data);
			sender.grid.panel.setLoading(false);
		});
		adapter.onError.attach(function(sender, data){
			sender.grid.panel.setLoading(false);
		});
		adapter.getDataCollectionsByExperimentId(selected[i].experimentId);
	}
};


