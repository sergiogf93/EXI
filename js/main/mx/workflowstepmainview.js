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
			      	   {html : "test"},
			      	   {html : "test"}
			]
	});
	
	return this.summaryTab;
	
};

WorkflowStepMainView.prototype.getSummaryTab = function() {
	this.summaryTab = Ext.create('Ext.panel.Panel', {
	    bodyPadding: 5,  
	    cls : 'border-grid',
	    title: 'Summary',
	    layout: {
	        type: 'hbox'
	    },
	    autoScroll : true,
	    items: [
	            
	            
	    ]
	});
	return this.summaryTab;
};


WorkflowStepMainView.prototype.getContainer = function() {
	return  Ext.create('Ext.tab.Panel', {
		
	    items: [
	            	this.getSummaryTab(),
	    
				    {
				        title: 'Bar',
				        tabConfig: {
				            title: 'Custom Title',
				            tooltip: 'A button tooltip'
				        }
				    }
    	]
	});
};



	
WorkflowStepMainView.prototype.load = function(workflowSteps) {
	var _this = this;
	this.panel.setTitle("Workflow");
	
	
	for (var i = 0; i < workflowSteps.length; i++) {
		
		/** SUMMARY TAB **/
		
		/** Creating the img **/
		var img = Ext.create('Ext.Img', {
		    src: EXI.getDataAdapter().mx.workflowStepDataAdapter.getImageByWorkflowStepId(workflowSteps[i].workflowStepId),
		    width: 150,
		    height: 150
		});
		/** Creating the status **/
		var status = "<div class='summary_datacollection_failed'></div>";
		if ( workflowSteps[i].status == "Success"){
			status = "<div class='summary_datacollection_success'></div>";
		}
		
		/** Adding as container within the symmary tab **/
		this.summaryTab.insert(
				{
					xtype 	: 'container',
					margin : 5,
					items 	: [
					         	{
					         		html 	: "<div style='border-bottom:1px solid gray;width:140px;'>" + status + workflowSteps[i].workflowStepType + "</div>",
					         		margin 	: 10
					         	},
					         	img
					]
				}
		);
	}
};


