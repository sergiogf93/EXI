function ProposalGrid(args) {
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


ProposalGrid.prototype.load = function(proposals) {
	this.data = proposals;
	this.store.loadData(proposals, false);
};

ProposalGrid.prototype.getFilter = function(value){
	return [{property : "number", value : value, anyMacth : true}];
};

ProposalGrid.prototype.filter = function(value) {
	
};

ProposalGrid.prototype._getTbar = function() {
	var _this = this;
	var actions = [];
	actions.push({
		xtype : 'textfield',
		name : 'field1',
		emptyText : 'search by number',
		hidden : this.isHidden,
		  listeners : {
  			'change' : function(field, e) {
  						var value = field.getValue();
  						if (value != ""){
  							_this.store.filter(_this.getFilter(field.getValue()));
  						}
  						else{
  							_this.store.clearFilter(true);
  							_this.load(_this.data);
  						}
  					} 
          		} 
	    }
//		listeners : {
//			specialkey : function(field, e) {
//				if (e.getKey() == e.ENTER) {
//					_this.filter(field.getValue());
//				}
//			} 
//		} 
	);
	return actions;
};

ProposalGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		fields : [ 'proposalId', 'title', 'code', 'number', 'type' ]
	});

	this.store.sort('title');

	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Proposals',
		store : this.store,
		cls : 'border-grid',
		tbar : this._getTbar(),
		height : this.height,
		width : this.width,
		columns : [ 
		{
			text : 'Code',
			dataIndex : 'code',
			width : 50
		}, 
		{
			text : 'Number',
			dataIndex : 'number',
			width : 75
		}, 
		{
			text : 'Title',
			dataIndex : 'title',
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

	/** Adding the tbar **/
	if (this.tbar) {
		this.panel.addDocked({
			xtype : 'toolbar',
			cls : 'toolBarGrid',
			height : 48,
			items : this._getTbar()
		});
	}
	return this.panel;
};




