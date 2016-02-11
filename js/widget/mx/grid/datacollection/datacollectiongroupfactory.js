/**
 * Helical XrayCentering
 */
function HelicalXrayCenteringDataCollectionPanel(args) {
	
	
}

HelicalXrayCenteringDataCollectionPanel.prototype.getPanel = function(){
	this.panel = Ext.create('Ext.panel.Panel', {
		title : "Helical Xray Centering",
	    items: []
	});
	return this.panel;
};

HelicalXrayCenteringDataCollectionPanel.prototype.load = function(dataCollectionGroup){
};


function OSC_MxPressO_DataCollectionPanel(args) {
	
	
}

/**
 * OSC MXPressO
 */
OSC_MxPressO_DataCollectionPanel.prototype.getPanel = function(){
	this.panel = Ext.create('Ext.panel.Panel', {
		title : "OSC MXPressO",
	    items: []
	});
	return this.panel;
};

OSC_MxPressO_DataCollectionPanel.prototype.load = function(dataCollectionGroup){
};




/*

function CarDoor( options ) {
	  this.color = options.color || 'red';
	  this.side = options.side || 'right';
	  this.hasPowerWindows = options.hasPowerWindows || true;
	}

	function CarSeat( options ) {
	  this.color = options.color || 'gray';
	  this.material = options.material || 'leather';
	  this.isReclinable = options.isReclinable || true;
	}
*/
function DataCollectionGroupFactory() {
	this.dataCollectionPanel = new GenericDataCollectionPanel();
}

DataCollectionGroupFactory.prototype.load = function( dataCollectionGroup ) {
	this.dataCollectionPanel.load(dataCollectionGroup);
};

DataCollectionGroupFactory.prototype.getPanel = function( dataCollectionGroup ) {
	  
	  if (dataCollectionGroup != null){
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
	  }
	  
	  return this.dataCollectionPanel.getPanel(dataCollectionGroup);
	  
	  /*if( options.partType === 'door' ) {
	    parentClass = CarDoor;
	  } else if( options.partType === 'seat' ) {
	    parentClass = CarSeat;
	  }
	  
	  if( parentClass === null ) {
	    return false;
	  }
	  
	  return new parentClass( options );*/
};
	
	