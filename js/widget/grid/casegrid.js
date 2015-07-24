/**
 * A shipment may contains one or more cases where stock solutions and sample plates are stored
 * 
 * @height
 * @btnEditVisible
 * @btnRemoveVisible
 * 
 * #onEditButtonClicked
 * #onAddButtonClicked
 * #onRemoveButtonClicked
 * #onDuplicateButtonClicked
 */
function CaseGrid(args) {

	this.height = 100;
	this.btnEditVisible = true;
	this.btnRemoveVisible = true;

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.btnEditVisible != null) {
			this.btnEditVisible = args.btnEditVisible;
		}
		if (args.btnRemoveVisible != null) {
			this.btnRemoveVisible = args.btnRemoveVisible;
		}
	}

	/** Events **/
	this.onSuccess = new Event(this);
	this.onAdd = new Event(this);
	this.onRemove = new Event(this);
}

CaseGrid.prototype._getColumns = function() {
	var _this = this;


	var columns = [
		{
			header : 'Code',
			dataIndex : 'code',
			name : 'code',
			type : 'string',
			flex : 1
		},
		{
			header : 'Bar Code',
			dataIndex : 'barCode',
			name : 'barCode',
			type : 'string',
			flex : 1,
			hidden : true
		},
		{
			header : 'BeamLine',
			dataIndex : 'barCode',
			type : 'string',
			flex : 1,
			renderer : function(comp, val, record) {
				if (record.data.sessionVO != null) {
					return "<span style='font-weight:bold;'>" + record.data.sessionVO.beamlineName + "</span>";
				}
			}
		},
		{
			header : 'Session',
			dataIndex : 'barCode',
			type : 'string',
			flex : 1,
			renderer : function(comp, val, record) {
				if (record.data.sessionVO != null) {
					return "<span>" + moment(record.data.sessionVO.startDate).format("MMM Do YY") + "</span>";
				}
			}
		},
		{
			header : 'Status',
			dataIndex : 'dewarStatus',
			name : 'dewarStatus',
			type : 'string',
			flex : 1,
			renderer : function(comp, val, record) {
				if (new String(record.data.dewarStatus).toUpperCase() == 'OPENED') {
					return "<span style='color:green;font-weight:bold;'>" + new String(record.data.dewarStatus).toUpperCase() + "</span>";
				}
				return "<span style='font-weight:bold;'>" + new String(record.data.dewarStatus).toUpperCase() + "</span>";
			}
		},
		{
			header : 'Type',
			dataIndex : 'type',
			name : 'type',
			type : 'string',
			flex : 1,
			hidden : true
		},
		{
			header : 'Sample Plates',
			dataIndex : 'plates',
			name : 'plates',
			type : 'string',
			flex : 1,
			hidden : true
		},
//		{
//			header : 'Stock Solutions',
//			dataIndex : 'plates',
//			name : 'plates',
//			type : 'string',
//			width : 100,
//			renderer : function(comp, val, record) {
//				var html = "<div>";
//				var stockSolutions = BIOSAXS.proposal.getStockSolutionsByDewarId(record.data.dewarId);
//				html = html + "<span style='font-size:18px'>" + stockSolutions.length + "</span> x<img height='15px' src='/ispyb/images/SampleHolder_24x24_01.png'>";
//				return html + "</div>";
//			}
//		}, 
		{
			header : 'isStorageDewar',
			dataIndex : 'isStorageDewar',
			name : 'isStorageDewar',
			type : 'string',
			flex : 1,
			hidden : true
		}, {
			header : 'Tracking Number From Synchrotron',
			dataIndex : 'trackingNumberFromSynchrotron',
			name : 'trackingNumberFromSynchrotron',
			type : 'string',
			flex : 1,
			hidden : true
		}, {
			header : 'Tracking Number To Synchrotron',
			dataIndex : 'trackingNumberToSynchrotron',
			name : 'trackingNumberToSynchrotron',
			type : 'string',
			flex : 1,
			hidden : true
		}, {
			header : 'Storage Location',
			dataIndex : 'storageLocation',
			name : 'storageLocation',
			type : 'string',
			flex : 1,
			hidden : false
		}, 
		{
			header : 'Comments',
			dataIndex : 'comments',
			flex : 1,
			hidden : false
		}
	];

	if (this.btnEditVisible) {
		columns.push({
            xtype:'actioncolumn',
//            width:40,
            flex : 0.25,
            text : 'Edit',
            items: [{
                icon: 'images/icon/edit.png',  // Use a URL in the icon config
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    _this.edit(rec);
                }
            }]
        });
	}

	if (this.btnRemoveVisible) {
		columns.push(
				{
				 xtype:'actioncolumn',
//		            width:40,
				 	flex : 0.25,
		            text : 'Remove',
		            items: [{
		                icon: 'images/icon/ic_delete_black_24dp.png',  // Use a URL in the icon config
		                tooltip: 'Remove',
		                handler: function(grid, rowIndex, colIndex) {
		                	function showResult(btn){
		                		if (btn == "yes"){
		                			_this.onRemove.notify(grid.getStore().getAt(rowIndex).data);
		                		}
		                	}
		                	 Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);
		                }
		            }]
				});
	}

	columns.push({
		dataIndex : 'comments',
		 xtype:'actioncolumn',
		 icon: 'images/icon/ic_view_headline_black_24dp.png',  
		text : 'Labels',
		flex : 0.25,
		hidden : false,
		handler :  function(grid, rowIndex, colIndex) {
			window.open(new DataAdapter().getTemplateSourceFile(_this.experiment.experimentId, "bsxcube")); 
		}
	});

	return columns;
};

CaseGrid.prototype._getTopButtons = function() {
	var _this = this;
	/** Actions buttons **/
	var actions = [];

	/** ADD BUTTON **/
	actions.push(Ext.create('Ext.Action', {
		icon : 'images/icon/add.png',
		text : 'Add',
		disabled : false,
		handler : function(widget, event) {
			_this.onAdd.notify();
		}
	}));

	return actions;
};




CaseGrid.prototype.load = function(shipment) {
	this.shipment = shipment;
	this.store.loadData(shipment.dewarVOs);
	console.log(shipment.dewarVOs);
};


CaseGrid.prototype.edit = function(dewar) {
	var _this = this;
	var caseForm = new CaseForm();
	
	var window = Ext.create('Ext.window.Window', {
	    title: 'Edit case',
	    height: 800,
	    width: 900,
	    modal : true,
	    layout: 'fit',
	    items: [
	            	caseForm.getPanel(dewar.data)
	    ],
	    buttons : [ {
						text : 'Save',
						handler : function() {
							var adapter = new DataAdapter();
							_this.panel.setLoading();
							var dewar = caseForm.getDewar();
							adapter.onSuccess.attach(function(sender, shipment) {
								_this.load(shipment);
								window.close();
								_this.panel.setLoading(false);
							});
							dewar["sessionId"] = dewar.firstExperimentId;
							adapter.saveDewar(_this.shipment.shippingId, dewar);
						}
					}, {
						text : 'Cancel',
						handler : function() {
							window.close();
						}
					} ]
	});
	window.show();
	
};

CaseGrid.prototype._getStoreFields = function() {
	return [ {
		name : 'dewarId',
		type : 'string'
	}, {
		name : 'barCode',
		type : 'string'
	}, {
		name : 'code',
		type : 'string'
	}, {
		name : 'comments',
		type : 'string'
	}, {
		name : 'dewarStatus',
		type : 'string'
	}, {
		name : 'isStorageDewar',
		type : 'string'
	}, {
		name : 'plates',
		type : 'string'
	}, {
		name : 'transportValue',
		type : 'string'
	}, {
		name : 'trackingNumberFromSynchrotron',
		type : 'string'
	}, {
		name : 'trackingNumberToSynchrotron',
		type : 'string'
	}, {
		name : 'timeStamp',
		type : 'string'
	}, {
		name : 'storageLocation',
		type : 'string'
	}, {
		name : 'type',
		type : 'string'
	}

	];
};

CaseGrid.prototype.getPanel = function() {
	var _this = this;

	/** Store **/
	this.store = Ext.create('Ext.data.Store', {
		fields : this._getStoreFields(),
		sorters : [{property:'dewarId', direction:'DESC'}]
	});

	
	this.panel = Ext.create('Ext.grid.Panel', {
		style : {
			padding : 5
		},
		cls : 'border-grid',
		height : this.height,
		store : this.store,
		columns : this._getColumns(),
		viewConfig : {
			stripeRows : true
		},
		selModel : {
			mode : 'SINGLE'
		}
	});

	var actions = _this._getTopButtons();
	this.panel.addDocked({
		height : 45,
		xtype : 'toolbar',
		items : actions
	});

	this.panel.getSelectionModel().on({
		selectionchange : function(sm, selections) {
			if (selections.length) {
				for ( var i = 0; i < actions.length; i++) {
					if (actions[i].enable) {
						actions[i].enable();
					}
				}
			} else {
				for ( var i = 0; i < actions.length; i++) {
					if (actions[i].alwaysEnabled == false) {
						if (actions[i].disable) {
							actions[i].disable();
						}
					}
				}
			}
		}
	});
	return this.panel;
};

