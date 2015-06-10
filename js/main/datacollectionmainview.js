DataCollectionMainView.prototype.getPanel = MainView.prototype.getPanel;
DataCollectionMainView.prototype.getContainer = MainView.prototype.getContainer;

function DataCollectionMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);
}

DataCollectionMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

DataCollectionMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

DataCollectionMainView.prototype.load = function(selected) {
	var _this = this;
	var grid = new QueueGrid({
		positionColumnsHidden : true,
		maxHeight : Ext.getCmp("main_panel").getHeight() - 50,
		sorters : [ {
			property : 'macromoleculeAcronym',
			direction : 'ASC' } ] });
	this.queueGridList.push(grid);

	grid.onSelectionChange.attach(function(sender, elements) {
		_this.onSelectionChange.notify(elements);
	});

	this.container.insert(0, grid.getPanel());

	grid.panel.setLoading();
	grid.store.loadData(selected);
	grid.panel.setLoading(false);
};
