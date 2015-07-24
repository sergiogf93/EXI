StockSolutionMainView.prototype.getPanel = MainView.prototype.getPanel;

function StockSolutionMainView() {
	
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	this.queueGridList = [];

	MainView.call(this);

	this.stockSolutionGrid = new StockSolutionGrid({
//		width : this.width - 10,
		minHeight : 800,
		height : 800,
		tbar : true,
		showTitle : true,
		isPackedVisible : false,
		btnAddExisting : false,
		btnRemoveVisible : false,
		btnUnpackVisible : false
	});
	
	var _this = this;
	
	
	this.stockSolutionGrid.onSaved.attach(function(sender, stockSolution){
		var adapter = new DataAdapter();
		adapter.onSuccess.attach(function(sender){
			_this.panel.setLoading(true);
			var manager = new ProposalUpdater(); 
			manager.onSuccess.attach(function(sender, proposals){
				_this.stockSolutionGrid.load(ProposalManager.getStockSolutions());	
				_this.panel.setLoading(false);
			});
			manager.get(true);
		});
		adapter.saveStockSolution(stockSolution);
	});
	
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
}


StockSolutionMainView.prototype.getContainer = function() {
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
	    items: [this.stockSolutionGrid.getPanel([])]
	});
};


StockSolutionMainView.prototype.load = function() {
	var _this = this;
	this.panel.setLoading();
	var manager = new ProposalUpdater(); 
	manager.onSuccess.attach(function(sender, proposals){
		_this.stockSolutionGrid.load(ProposalManager.getStockSolutions());	
		_this.panel.setLoading(false);
	});
	manager.get();
	this.panel.setTitle("Stock Solutions");
};
