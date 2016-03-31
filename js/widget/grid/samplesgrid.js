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
	
	Ext.define('BLSampleModel', {
			extend : 'Ext.data.Model',
			fields : [
				{
					name : 'proteinAcronym',
					mapping : 'proteinAcronym'
				},{
					name : 'name',
					mapping : 'name'
				}, {
					name : 'spaceGroup',
					mapping : 'spaceGroup'
				}, {
					name : 'beamlineLocation',
					mapping : 'beamlineLocation'
				}, {
					name : 'code',
					mapping : 'code'
				}, {
					name : 'shipment',
					mapping : 'shipping'
				}, {
					name : 'cellA',
					mapping : 'cellA'
				}, {
					name : 'cellB',
					mapping : 'cellB'
				}, {
					name : 'cellC',
					mapping : 'cellC'
				}, {
					name : 'cellAlpha',
					mapping : 'cellAlpha'
				}, {
					name : 'cellBeta',
					mapping : 'cellBeta'
				}, {
					name : 'cellGamma',
					mapping : 'cellGamma'
				}],
			idProperty : 'blSampleId'
		});
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

SamplesGrid.prototype._getColumns = function () {
	var _this = this;
	// render functions
	
	
	
		// build columns
	var columns = [];
	columns.push( );    	

};
		
SamplesGrid.prototype.getPanel = function() {
	var _this = this;
	
	this.store2 = Ext.create('Ext.data.Store', {
			model : 'BLSampleModel',
			data : []
		});
		
	var columns = _this._getColumns();

	this.store = Ext.create('Ext.data.Store', {
		fields : [ 'Protein', 'SpaceGroup', 'Name', 'Code', 'Shipment', 'Dewar', 'Container', 'Location', 'Cell' ],
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
		columns : 	[	
		{
			text          : 'Protein',
			dataIndex     : 'proteinAcronym',
			flex : 0.1,
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
			width         : 100
		},
		{
			text          : 'Code',
			dataIndex     : 'code',
			width         : 100
		},	
		{
			text          : 'Location in SC',
			dataIndex     : 'sampleChangerLocation',
			flex : 0.1,
			renderer : function(grid, a, record){
				return record.data.containerVO.sampleChangerLocation;
			}
		},	
		{
			text          : 'Cell',
			dataIndex     : 'cell',
			flex : 0.1,
			renderer : function renderUnitCell(grid, a, record) {
				var nbDec = 2;
				if (record.data.crystalVO) {
					var s = (record.data.crystalVO.CellA ? Number(record.data.crystalVO.CellA).toFixed(nbDec) + ", " : "");
					s += (record.data.crystalVO.CellB ? Number(record.data.crystalVO.CellB).toFixed(nbDec) + ", ": "");
					s += (record.data.crystalVO.CellC ? Number(record.data.crystalVO.CellC).toFixed(nbDec) + "<br />": "");
					s += (record.data.crystalVO.CellAlpha ? Number(record.data.crystalVO.CellAlpha).toFixed(nbDec) + ", " : "");
					s += (record.data.crystalVO.CellBeta ? Number(record.data.crystalVO.CellBeta).toFixed(nbDec) + ", " : "");
					s += (record.data.crystalVO.CellGamma ? Number(record.data.crystalVO.CellGamma).toFixed(nbDec): "");
					return s;
				}
			return "";
			}
		},	
				{
			text          : 'Shipment',
			dataIndex     : 'shipment',
			flex : 0.1,
			renderer : function(grid, a, record){
				return record.data.containerVO.DewarVO.ShippingVO.name;
			}
		},
		{
			text          : 'Dewar',
			dataIndex     : 'dewar',
			flex : 0.1,
			renderer : function(grid, a, record){
				return record.data.containerVO.DewarVO.code;
			}
		},
		{
			text          : 'Container',
			dataIndex     : 'container',
			flex : 0.1,
			renderer : function(grid, a, record){
				return record.data.containerVO.code;
			}
		}	
		] 
	});
	return this.panel;
};




