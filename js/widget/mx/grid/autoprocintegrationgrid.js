function AutoProcIntegrationGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	
	this.preventSelection = false;
	this.maxHeight = 500;
	this.minHeight = 500;
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.maxHeight != null) {
			this.maxHeight = args.maxHeight;
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
	var data = [];
	for (var i = 0; i < autoProcIntegrations.length; i++) {
		var record = autoProcIntegrations[i].autoproc;
		record["anomalous"] = autoProcIntegrations[i].autointegration.anomalous;
		record["autoProcIntegrationId"] = autoProcIntegrations[i].autointegration.autoProcIntegrationId;
		record["processingPrograms"] = autoProcIntegrations[i].autoprocprogram.processingPrograms;
		
		data.push(record);
	}
	
	this.store.loadData(data, false);
};

AutoProcIntegrationGrid.prototype.selectRowByAutoProcIntegrationId = function(autoProcIntegrationId) {
	this.preventSelection = true;
	this.panel.getSelectionModel().select(this.store.find("autoProcIntegrationId", autoProcIntegrationId));
};

AutoProcIntegrationGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		groupField: 'anomalous',
		sorters : 'spaceGroup',
		fields : [ 'autoProcId',
		           'refinedCellA', 
		           'autoProcIntegrationId',
		           'refinedCellAlpha', 
		           'refinedCellB', 
		           'refinedCellBeta', 
		           'refinedCellC',
		           'refinedCellGamma',
		           'anomalous',
		           'processingPrograms',
		           'spaceGroup']
	});

	var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
    });
    
    
	var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect : true,
		mode : 'multi',
		listeners : {
			selectionchange : function(sm, selections) {
				var records = [];
				if (selections != null) {
					for (var i = 0; i < selections.length; i++) {
						records.push(selections[i].data);
					}

					/** Event is only triggered if node is a leaf **/
					if (!_this.preventSelection){
						_this.onSelected.notify(records);
					}
					else{
						_this.preventSelection = false;
					}
				}
			}

		} });
	
	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Auto-Processing Integration',
		store : this.store,
		selModel : selModel,
		cls : 'border-grid',
		maxHeight : this.maxHeight,
		minHeight : this.maxHeight,
		features: [groupingFeature],
		columns : [ 
		{
			text : 'id',
			dataIndex : 'autoProcId',
			flex : 1,
			hidden : true
		}, 
		{
			text : 'Method',
			dataIndex : 'processingPrograms',
			flex : 1
		}, 
		{
			text : 'anomalous',
			dataIndex : 'anomalous',
			flex : 1,
			hidden : true
		}, 
		{
			text : 'spaceGroup',
			dataIndex : 'spaceGroup',
			flex : 1
		}, 
		{
			text : 'cell a',
			dataIndex : 'refinedCellA',
			flex : 1
		}, 
		{
			text : 'cell b',
			dataIndex : 'refinedCellB',
			flex : 1
		}, 
		{
			text : 'cell c',
			dataIndex : 'refinedCellC',
			flex : 1
		}, 
		{
			text : 'cell alpha',
			dataIndex : 'refinedCellAlpha',
			flex : 1
		},
		{
			text : 'cell beta',
			dataIndex : 'refinedCellBeta',
			flex : 1
		},
		{
			text : 'cell gamma',
			dataIndex : 'refinedCellGamma',
			flex : 1
		},
		{
			text : 'Anomalous',
			dataIndex : 'AutoProcIntegration_anomalous',
			flex : 1,
			hidden : true
		}
		
		],
		flex : 1,
		viewConfig : {
			stripeRows : true,
			listeners : {
//				'cellclick' : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
////					_this.onSelected.notify(record.data);
//				},
//				'selectionChange' : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
//					debugger
//				}
			}
		}
	});

	return this.panel;
};




