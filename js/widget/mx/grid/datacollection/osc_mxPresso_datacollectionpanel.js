

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
