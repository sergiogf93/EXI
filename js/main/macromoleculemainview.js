MacromoleculeMainView.prototype.getPanel = MainView.prototype.getPanel;
MacromoleculeMainView.prototype.getContainer = MainView.prototype.getContainer;

function MacromoleculeMainView() {
	this.title = "Experiment";
	this.queueGridList = [];
	MainView.call(this);
}

MacromoleculeMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName +"</span><span class='item_description'>" + startDate +"</span>";
};

MacromoleculeMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

MacromoleculeMainView.prototype.load = function(selected) {
	var _this = this;
	for (var i = 0; i < selected.length; i++) {
		var macromolecule = selected[i];
		
		var grid = new QueueGrid({
			positionColumnsHidden : true,
			sorters : [ {
				property : 'macromoleculeAcronym',
				direction : 'ASC'
			} ]
		});
		this.queueGridList.push(grid);
		
		grid.onSelectionChange.attach(function(sender, elements){
			_this.onSelectionChange.notify(elements);
		});
		
		this.panel.setTitle(macromolecule.acronym);
		
		this.container.insert(0, grid.getPanel());
		
		grid.panel.setTitle(this.getHeader(macromolecule.acronym,""));
		grid.panel.setLoading();
		
		
		
		var adapter = new DataAdapter();
		/*** Trick for JS compiler **/
		adapter.grid = grid;
		adapter.onSuccess.attach(function(sender, data){
			sender.grid.load(data);
			sender.grid.panel.setTitle(_this.getHeader(macromolecule.acronym, data.length + " data collections"));
			sender.grid.panel.setLoading(false);
		});
		adapter.onError.attach(function(sender, data){
			sender.grid.panel.setLoading(false);
		});
		
		adapter.getDataCollectionsByMacromoleculeAcronym(macromolecule.acronym);
	}
};


