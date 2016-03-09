


function DataCollectionGroupFactory() {
	this.dataCollectionPanel = new GenericDataCollectionPanel();
}

DataCollectionGroupFactory.prototype.load = function( dataCollectionGroup ) {
	this.dataCollectionPanel.load(dataCollectionGroup);
};

DataCollectionGroupFactory.prototype.getPanel = function( dataCollectionGroup ) {
	 /* if (dataCollectionGroup != null){
			  var dataCollectionGroupType = dataCollectionGroup[0]["DataCollectionGroup_experimentType"]; 
			  var workflowType = dataCollectionGroup[0]["Workflow_workflowType"];
			  console.log(dataCollectionGroupType + " " + workflowType);

			  switch (dataCollectionGroupType) {
			    case "OSC":
					    	switch (workflowType) {
					    	 		case "MXPressO":
					    	 							this.dataCollectionPanel = new OSC_MxPressO_DataCollectionPanel();
					    	 							break;
					    	 		case "MXPressE":
			 											this.dataCollectionPanel = new OSC_MxPressE_DataCollectionPanel();
			 											break;
			 											
					    	 		default:
														this.dataCollectionPanel = new GenericDataCollectionPanel();
														break;
			    			}
			        break;
			    case "Helical":
			    	
			    	switch (workflowType) {
			    	 		case "XrayCentering":
			    	 							this.dataCollectionPanel = new HelicalXrayCenteringDataCollectionPanel();
			    	 			
			    	 							break;
			    	}
			        break;
			}
	  }*/
	  return this.dataCollectionPanel.getPanel();
};
	
	