BufferMainView.prototype.getPanel = MainView.prototype.getPanel;

function BufferMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.bufferGrid = new BufferGrid({
		height : 800,
		collapsed : false,
		tbar : true
	});
	
	var _this = this;
	this.bufferGrid.onUpdated.attach(function(sender){
		_this.load();
	});
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}

BufferMainView.prototype.getHeader = function(beamlineName, startDate) {
	return "<span class='item'>" + beamlineName + "</span><span class='item_description'>" + startDate + "</span>";
};

BufferMainView.prototype.getSelected = function() {
	var selected = [];
	for (var i = 0; i < this.queueGridList.length; i++) {
		selected = this.queueGridList[i].getSelected().concat(selected);
	}
	return selected;
};

BufferMainView.prototype.getContainer = function() {
	return Ext.create('Ext.container.Container', {
	    layout: {
	        type: 'hbox'
	    },
	    margin : 30,
		bodyStyle : {
			"background-color" : "#E6E6E6" 
		},
	    border: 1,
	    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
	    defaults: {
	        labelWidth: 80,
	        xtype: 'datefield',
	        flex: 1,
	    },
	    items: [this.bufferGrid.getPanel([])]
	});
};


BufferMainView.prototype.load = function() {
	this.bufferGrid.load(EXI.proposalManager.getBuffers());
	this.panel.setTitle("Buffers");
};
