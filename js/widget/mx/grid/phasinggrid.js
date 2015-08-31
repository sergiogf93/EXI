function PhasingGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	
	this.preventSelection = false;
	this.maxHeight = 500;
	this.minHeight = 500;
	
	this.margin = null;
	
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
		
		if (args.margin != null) {
			this.margin = args.margin;
		}
	}
	
	this.onSelected = new Event(this);
	
};


PhasingGrid.prototype.load = function(data) {
	this.store.loadData(data, false);
};


PhasingGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		
		fields : [ 'name',
		           'highRes',
		           'lowRes', 
		           'method',
		           'enantiomorph', 
		           'solventContent',
		           'bravaisLattice',
		           'hP',
		           'mxUsed', 
		           'spaceGroupName',
		           'spaceGroupNumber', 
		           'spaceGroupShortName' 
		           ]
	});
    
	
	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Auto-Processing Integration',
		store : this.store,
		margin : this.margin, 
		cls : 'border-grid',
		maxHeight : this.maxHeight,
		minHeight : this.maxHeight,
		columns : [
		{
			text : 'name',
			dataIndex : 'name',
			flex : 1
		},
		{
			text : 'bravaisLattice',
			dataIndex : 'bravaisLattice',
			flex : 1
		},
		{
			text : 'hP',
			dataIndex : 'hP',
			flex : 1
		},
		{
			text : 'mxUsed',
			dataIndex : 'mxUsed',
			flex : 1
		},
		{
			text : 'spaceGroupName',
			dataIndex : 'spaceGroupName',
			flex : 1
		},
		{
			text : 'spaceGroupNumber',
			dataIndex : 'spaceGroupNumber',
			flex : 1
		},
		{
			text : 'spaceGroupShortName',
			dataIndex : 'spaceGroupShortName',
			flex : 1
		},
		{
			text : 'lowRes',
			dataIndex : 'lowRes',
			flex : 1
		},
		{
			text : 'lowRes',
			dataIndex : 'lowRes',
			flex : 1
		},
		{
			text : 'highRes',
			dataIndex : 'highRes',
			flex : 1
		}, 
		{
			text : 'enantiomorph',
			dataIndex : 'enantiomorph',
			flex : 1
		}, 
		{
			text : 'solventContent',
			dataIndex : 'solventContent',
			flex : 1
		}
		],
		flex : 1,
		viewConfig : {
			stripeRows : true,
			listeners : {
			}
		}
	});

	return this.panel;
};




