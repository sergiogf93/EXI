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
