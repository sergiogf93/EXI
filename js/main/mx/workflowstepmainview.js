function WorkflowStepMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	
	var _this = this;
	
}

WorkflowStepMainView.prototype.getPanel = MainView.prototype.getPanel;


WorkflowStepMainView.prototype.getTabs = function() {
	this.summaryTab = Ext.createWidget('tabpanel',{
			cls 	: 'border-grid',
			items 	: [
			]
	});
	
	return this.summaryTab;
	
};

WorkflowStepMainView.prototype.getSummaryTab = function() {
	this.summaryTab = Ext.create('Ext.panel.Panel', {
	    cls : 'border-grid',
	    title: 'Summary',
	    layout: {
	        type: 'vbox'
	    },
	    height : 800,
	    autoScroll : true,
	    items: [
	            
	            
	    ]
	});
	return this.summaryTab;
};

WorkflowStepMainView.prototype.getMainPanel = function() {
	this.mainPanel = Ext.create('Ext.panel.Panel', {
	    cls : 'border-grid',
	    title: 'Main',
	    margin : '0 10 0 10',
	    height : 800,
	    flex : 1,
	    items: [
	    ]
	});
	return this.mainPanel;
};


WorkflowStepMainView.prototype.getContainer = function() {
	return  Ext.create('Ext.panel.Panel', {
		margin : '10 0 0 10',
		layout : 'hbox',
		height : 800,
	    items: [
        		 this.getSummaryTab(),
        		 this.getMainPanel()
    	]
	});
};



	
WorkflowStepMainView.prototype.load = function(workflowSteps, selectedWorkflowStepId) {
	var _this = this;
	this.panel.setTitle("Workflow");
	
	
	var workflowStepIds = [];
	var selected = null;
	
	for (var i = 0; i < workflowSteps.length; i++) {
		workflowStepIds.push(workflowSteps[i].workflowStepId);
		workflowSteps[i].selected = false;
		if (selectedWorkflowStepId != null){
			if (selected == null){
				if (workflowSteps[i].workflowStepId == selectedWorkflowStepId){
					selected = workflowSteps[i];
					selected.htmlURL = EXI.getDataAdapter().mx.workflowstep.getHtmlByWorkflowStepId(selectedWorkflowStepId);
					
					workflowSteps[i].selected = "yes";
				}
			}
		}
	}
	for ( i = 0; i < workflowSteps.length; i++) {
		workflowSteps[i].imageURL = EXI.getDataAdapter().mx.workflowstep.getImageByWorkflowStepId(workflowSteps[i].workflowStepId);
		workflowSteps[i].workflowStepIds = workflowStepIds;
		
	}
	
	
	dust.render("workflowstepmain_steps", workflowSteps, function(err, out){
		_this.summaryTab.insert({
				html : out
		});
     });
	/** it loads the main panel with the selected workflowStepId **/
	if (selectedWorkflowStepId != null){
		dust.render("workflowstepmain_main_steps", selected, function(err, out){
			_this.mainPanel.insert({
					padding : 10,
					border : 0,
					html : out
			});
	     });
	}
				
};


