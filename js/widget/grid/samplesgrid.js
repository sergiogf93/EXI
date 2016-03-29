function SamplesGrid(args) {
	this.height = 500;
	this.id = BUI.id();
	this.tbar = false;
	this.width = 100;
	this.title = "Samples list";
	this.margin = "5 5 5 5";

	if (args != null) {
		if (args.title != null) {
			this.title = args.title;
		}
		if (args.margin != null) {
			this.margin = args.margin;
		}

		if (args.height != null) {
			this.height = args.height;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.width != null) {
			this.width = args.width;
		}		
	}

	this.onSelected = new Event(this);

};

SamplesGrid.prototype.load = function(crystal) {
	try{
		this.crystal = crystal;	
		this.loadSampleList();
	}
	catch(e){
		EXI.setError(e)
	}
		
};

SamplesGrid.prototype.loadSampleList = function() {
	var _this = this;
	this.panel.setLoading();
	function onSuccess(sender, samples){
		_this.store.loadData(samples);
		_this.panel.setLoading(false);
	}
	EXI.getDataAdapter({onSuccess: onSuccess}).mx.sample.getSamplesByCrystalId(this.crystal.crystalId);
};


SamplesGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		fields : [ 'Protein', 'SpaceGroup', 'Name', 'Code' ],
		emptyText : "No samples",
		data : []
	});

	this.panel = Ext.create('Ext.grid.Panel', {
		title : this.title,
		store : this.store,
		layout : 'fit',
		icon : '../images/icon/sessions.png',
		cls : 'border-grid',
		height : this.height,
		margin : this.margin,
		emptyText : "No samples",

		columns : [
      	{
			text          : 'Protein',
			dataIndex     : 'proteinAcronym',
			width         : 100,
			renderer : function(grid, a, record){
						return record.data.crystalVO.proteinVO.acronym;
			}

		},
		{
			text          : 'SpaceGroup',
			dataIndex     : 'spaceGroup',
			flex : 0.1,
			renderer : function(grid, a, record){
			return record.data.crystalVO.spaceGroup;
			}
		},
		{
			text          : 'Name',
			dataIndex     : 'name',
			width         : 200
		},
		{
			text          : 'Code',
			dataIndex     : 'code',
			width         : 200
		}
	]});
	return this.panel;
};




