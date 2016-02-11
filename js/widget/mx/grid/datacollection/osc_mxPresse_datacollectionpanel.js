/**
 * OSC MXPressE
 */
function OSC_MxPressE_DataCollectionPanel(args) {
	GenericDataCollectionPanel.call(this, args);
}

OSC_MxPressE_DataCollectionPanel.prototype.getHTMLTable = GenericDataCollectionPanel.prototype.getHTMLTable;
OSC_MxPressE_DataCollectionPanel.prototype.summarize = GenericDataCollectionPanel.prototype.summarize;
OSC_MxPressE_DataCollectionPanel.prototype.sum = GenericDataCollectionPanel.prototype.sum;

OSC_MxPressE_DataCollectionPanel.prototype._getHTMLZoomImage = GenericDataCollectionPanel.prototype._getHTMLZoomImage;
OSC_MxPressE_DataCollectionPanel.prototype._getHTMLImage = GenericDataCollectionPanel.prototype._getHTMLImage;

OSC_MxPressE_DataCollectionPanel.prototype.getColumns = GenericDataCollectionPanel.prototype.getColumns;
OSC_MxPressE_DataCollectionPanel.prototype.load = GenericDataCollectionPanel.prototype.load;
OSC_MxPressE_DataCollectionPanel.prototype.getPanel = GenericDataCollectionPanel.prototype.getPanel;


