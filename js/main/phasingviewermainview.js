

function PhasingViewerMainView() {
	
	MainView.call(this);
	
	var _this = this;
	this.phasingNetworkWidget = new PhasingNetworkWidget({tbar : "MENU"});
}

PhasingViewerMainView.prototype.getPanel = MainView.prototype.getPanel;
PhasingViewerMainView.prototype.getContainer = MainView.prototype.getContainer;

PhasingViewerMainView.prototype.getContainer = function() {
	this.tabPanel =  Ext.createWidget('panel',
			{
				margin : 10,
				cls : 'border-grid',
				layout : 'fit',
				defaults : {
						anchor : '100%'
				},
				items : [
				         	this.phasingNetworkWidget.getPanel()
					]
			});

	return this.tabPanel;

};


PhasingViewerMainView.prototype.load = function(dataCollectionId) {
	var _this = this;
	this.panel.setTitle("Phasing Viewer");
	
	var onSuccess2 = function(sender, data){
		
		data =  BUI.groupBy(data[0], function(item){
			  			return [item.v_datacollection_summary_phasing_autoProcIntegrationId];
		});
		var autoProcIntegrationIds = [];
		_this.phasingNetworkWidget.load(data);
	};
	EXI.getDataAdapter({onSuccess : onSuccess2}).mx.phasing.getViewByDataCollectionId(dataCollectionId);
	
};
