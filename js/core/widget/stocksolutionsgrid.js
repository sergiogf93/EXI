/**
 * Grid rendering the stock solutions
 * 
 */
function StockSolutionsGrid(args) {
	this.id = BUI.id();
	this.width = 600;
    this.padding = 0;

	if (args != null) {
		if (args.width != null) {
			this.width = args.width;
		}
        if (args.width != null) {
			this.padding = args.padding;
		}
	}
	
    this.onSelected = new Event(this);
}

StockSolutionsGrid.prototype.getPanel = function () {
    var _this = this;
    this.store = Ext.create('Ext.data.Store', {
            fields: ["stockSolutions"]
    });

    this.panel = Ext.create('Ext.grid.Panel', {
        width: this.width,
        border: 1,        
        store: this.store,       
        disableSelection: false,
        columns: this.getColumns(),
        viewConfig: {
            enableTextSelection: true,
            stripeRows: false
        }
    });

    this.panel.on('select', function(grid, record){
		_this.onSelected.notify(record.data);
	});

    return this.panel;
}

StockSolutionsGrid.prototype.load = function (stockSolutions) {
    this.stockSolutions = stockSolutions;
    this.store.loadData(stockSolutions);
}

StockSolutionsGrid.prototype.getColumns = function () {
    var _this = this;
    var columns = [
        {
            dataIndex: 'stockSolutions',
            name: 'stockSolutions',
            flex: 1.5,
            hidden: false,
            renderer: function(grid, e, record) {
                var data = {
                                macromolecule       : EXI.proposalManager.getMacromoleculeById(record.data.macromoleculeId).acronym,
                                buffer              : EXI.proposalManager.getBufferById(record.data.bufferId).acronym,
                                storageTemperature  : record.data.storageTemperature,
                                acronym             : record.data.name,
                                concentration       : record.data.concentration,
                                volume              : record.data.volume
                            };
                
                var html = "";
                dust.render("stock.solutions.grid.template", data, function (err, out) {
                    html = out;
                });
                
                return html;
            }
        }
    ];

    return columns;
}