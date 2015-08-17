function AutoProcIntegrationGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.searchBar != null) {
			this.searchBar = args.searchBar;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.collapsed != null) {
			this.collapsed = args.collapsed;
		}

		if (args.width != null) {
			this.width = args.width;
		}
	}
	
	this.onSelected = new Event(this);
	
};


AutoProcIntegrationGrid.prototype.load = function(autoProcIntegrations) {
	this.store.loadData(autoProcIntegrations, false);
};

AutoProcIntegrationGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		fields : [ 'AutoProcIntegration_autoProcIntegrationId',
		           'AutoProcIntegration_cell_a', 
		           'AutoProcIntegration_cell_alpha', 
		           'AutoProcIntegration_cell_b', 
		           'AutoProcIntegration_cell_beta', 
		           'AutoProcIntegration_cell_c',
		           'AutoProcIntegration_cell_gamma']
	});


	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Auto-Processing Integration',
		store : this.store,
		cls : 'border-grid',
		columns : [ 
		{
			text : 'id',
			dataIndex : 'AutoProcIntegration_autoProcIntegrationId',
			flex : 1
		}, 
		{
			text : 'cell a',
			dataIndex : 'AutoProcIntegration_cell_a',
			flex : 1
		}, 
		{
			text : 'cell b',
			dataIndex : 'AutoProcIntegration_cell_b',
			flex : 1
		}, 
		{
			text : 'cell c',
			dataIndex : 'AutoProcIntegration_cell_c',
			flex : 1
		}, 
		{
			text : 'cell alpha',
			dataIndex : 'AutoProcIntegration_cell_alpha',
			flex : 1
		},
		{
			text : 'cell beta',
			dataIndex : 'AutoProcIntegration_cell_beta',
			flex : 1
		},
		{
			text : 'cell gamma',
			dataIndex : 'AutoProcIntegration_cell_gamma',
			flex : 1
		},
		{
			text : 'Anomalous',
			dataIndex : 'AutoProcIntegration_anomalous',
			flex : 1
		}
		
		],
		flex : 1,
		viewConfig : {
			stripeRows : true,
			listeners : {
				'cellclick' : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					_this.onSelected.notify(record.data);
				}
			}
		}
	});

	return this.panel;
};




