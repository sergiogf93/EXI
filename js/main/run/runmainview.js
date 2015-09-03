RunMainView.prototype.getPanel = MainView.prototype.getPanel;

function RunMainView() {
	this.title = "Experiment";
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	this.id = BUI.id();
	MainView.call(this);

	this.subtractionSelectorWindow = new SubtractionSelectorWindow();

	var _this = this;

	this.subtractionSelectorWindow.onSelect.attach(function(sender, selected) {
		_this.grid.store.removeAll();
		_this.grid.load(selected);
		Ext.getCmp(_this.id + "hiddenSutractions").setValue(JSON.stringify(selected[0].subtractionId));

	});

	this.grid = new QueueGrid({
		maxHeight : 120,
		minHeight : 120,
		title : false,
		collapsible : false });
}



RunMainView.prototype.getContainer = function() {
	var _this = this;
	this.container =  Ext.create('Ext.form.Panel', {
//		height : 500,
//		margin : 30,
		
		border : 1,
		style: {borderColor:'gray', borderStyle:'solid', borderWidth:'1px'},
		style: {borderColor:'gray', borderStyle:'solid', borderWidth:'1px'},
		bodypadding : 10,
		items : [

		       
		] 
	});
	return this.container ;
};

RunMainView.prototype.getToolDescription = function(name, description) {
	return {
		html : "<span class='toolName'>" + name +"</span><span class='toolDescription'>" + description +"</span><br />",
		margin : 10
	};
};

RunMainView.prototype.getJob = function(job, index) {
	return  "<span  class='generalContainerRunList'>" + job.name + " " +  job.version + " Status: " + job.status +"</span>";
	
};

RunMainView.prototype.getOutputGrid = function(job) {
	this.outputStore = Ext.create('Ext.data.Store', {
	    fields:['name', 'value', 'type', 'targetId' ],
	    data : job.output
	});

	return Ext.create('Ext.grid.Panel', {
	    title: this.getJob(job),
	    store: this.outputStore,
	    margin : 20,
	    border : 1,
		style: {borderColor:'gray', borderStyle:'solid', borderWidth:'1px'},
	    columns: [
	        { text: 'Name',  dataIndex: 'name', flex : 1 },
	        { text: 'value', dataIndex: 'value', flex : 1 },
	        { text: 'type', dataIndex: 'type', flex : 1 },
	        { text: 'target', dataIndex: 'targetId', flex : 1 },
	        { text: '', dataIndex: 'targetId', flex : 1, renderer : function(grid, opt, record){
	        	if (record.data.type == "file"){
	        		var url =EXI.credentialManager.getConnections()[0].exiUrl + "/file/" + record.data.targetId + "/download";
	        		return "<div><a style='color:blue;' href='"+ url +"'>Download</a></div>";
	        	}
	        } 
        }
	    ]
	});
};

RunMainView.prototype.getOutputContainer = function(run) {
	this.outputPanel = Ext.create('Ext.form.Panel', {
		title : "Output",
		 border : 1,
			style: {borderColor:'gray', borderStyle:'solid', borderWidth:'1px'},
		margin : 10,
		items : [
		        
		]
	});
	
	for (var i = 0; i < run.jobs.length; i++) {
		this.outputPanel.insert(this.getOutputGrid(run.jobs[i]));
	}
	
	return this.outputPanel;
};

RunMainView.prototype.getGeneralContainerList = function(run) {
	var li = "<ul class='generalContainerRunList'>";
	li = li + "<li>Workflow: " + run.name + "</li>";
	li = li + "<li>Status: " + run.status + "</li>";
	li = li + "<li>" + run.creationDate + "</li>";
	return li;
};

RunMainView.prototype.getGeneralContainer = function(run) {
	return {
		xtype : 'panel',
		title : "General",
		margin : 10,
		border : 1,
		style: {borderColor:'gray', borderStyle:'solid', borderWidth:'1px'},
		items : [
		         {
		        	 html 		: this.getGeneralContainerList(run),
		        	 margin 	: '10 0 0 50'
		         }
		]
	};
};


RunMainView.prototype.load = function(run) {
	if (run != null) {
		this.panel.setTitle(run.name);
		this.container.insert(this.getGeneralContainer(run));
		this.container.insert(this.getOutputContainer(run));
	}
};
