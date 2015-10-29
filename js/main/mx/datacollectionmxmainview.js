function DataCollectionMxMainView() {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this);
	var _this = this;
	
	this.sessionViewGrid = new DataCollectionSummaryGrid();
}

DataCollectionMxMainView.prototype.getPanel = MainView.prototype.getPanel;

DataCollectionMxMainView.prototype.getContainer = function() {
	this.panel =  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '10 30 10 10',
				items : [
					{
						tabConfig : {
							title : 'Summary'
						},
						items : [ {
							xtype : 'container',
							layout : 'fit',
							style : {
								borderColor : 'gray',
								borderStyle : 'solid',
								borderWidth : '1px',
								'background-color' : 'white' 
							},
							items : 
								[
							         	this.sessionViewGrid.getPanel()
							]
						}
						]
				  }]
		});
	
	



	return this.panel;
	
};
	
DataCollectionMxMainView.prototype.load = function(sessionsId) {
	var _this = this;
	this.panel.setTitle("Data Collection ");
	var onSuccess = function(sender, data){
		_this.sessionViewGrid.load(data);
		_this.sessionViewGrid.grid.setTitle((data.length) + " Data Collections ");
		
		
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).mx.dataCollection.getBySessionsId(sessionsId);
};













