ExperimentMainView.prototype.getPanel = MainView.prototype.getPanel;
ExperimentMainView.prototype.getContainer = MainView.prototype.getContainer;

function ExperimentMainView() {
	this.title = "Experiment";
}

ExperimentMainView.prototype.getHeader = function(beamlineName, startDate) {
	return {
		html : "<span class='item'>" + beamlineName +"</span><span class='item_description'>" + startDate +"</span>"
	};
};

ExperimentMainView.prototype.load = function(selected) {
	
	for (var i = 0; i < selected.length; i++) {
		var experiment = selected[i];
		this.panel.add(this.getHeader(experiment.name,experiment.creationDate));
		
		var grid = new QueueGrid({
			positionColumnsHidden : true,
			sorters : [ {
				property : 'priorityLevelId',
				direction : 'ASC'
			} ]
		});
		this.panel.add(grid.getPanel());
		
		var adapter = new DataAdapter();
		adapter.onSuccess.attach(function(sender, data){
			
			grid.refresh(data);
			console.log(data)
		});
		adapter.getSubtractionByExperimentId(selected[i].experimentId);
		
	}
};


ExperimentMainView.prototype.getContainer = function() {
	this.panel = Ext.create('Ext.panel.Panel', {
		scroll : 'vertical',
		autoScroll : true,
		width : Ext.getBody().getWidth() - 250,
//		style : {
//			borderColor : 'black',
//			borderStyle : 'solid',
//			
//		},
//		layout : 'fit',
		items :[ ]
	});
	return this.panel;
};