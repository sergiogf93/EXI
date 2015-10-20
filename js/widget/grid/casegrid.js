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

CaseGrid.prototype._getHTMLTable = function(items) {
	var html = "<table style='font-size:14px;color:gray;'>";
	
	for (var i = 0; i < items.length; i++) {
		html = html + "<tr>";
		html = html + "<td>";
		html = html + items[i].key;
		html = html + "</td>";
		html = html + "<td style='font-weight:bold;color:black;'>";
		html = html + items[i].value;
		html = html + "</td>";
		html = html + "</tr>";
	}
	return html + "</table>";
	
	
};

CaseGrid.prototype._getHTMLButton = function(dewarId, value) {
	return '<input id="' + dewarId+' "type="button" name="btn" style="font-size:9px;width:90px; height:15px" class="btn-component" value="' + value +'" >';
};

CaseGrid.prototype._getUnpackStockSolutionButton = function(stockSolutionId, value) {
	return '<input id="' + stockSolutionId +' "type="button" name="stockSolution" style="font-size:9px;width:90px; height:15px" class="btn-component-remove" value="' + value +'" >';
};

CaseGrid.prototype._getRemoveContainerButton = function(stockSolutionId, value) {
	return '<input id="' + stockSolutionId +' "type="button" name="puck" style="font-size:9px;width:90px; height:15px" class="btn-component-remove" value="' + value +'" >';
};

CaseGrid.prototype._getContainerHTML = function(record) {
	var deserialized = JSON.parse(record.data.serialized);
	var dewar = this.getDewarById(deserialized[0].Dewar_dewarId);
	
	var items = [];
	if (dewar.sessionVO != null){
		items = [
		             {key : 'Name', value : deserialized[0].Dewar_code},
		             {key : 'Ship To', value : dewar.sessionVO.beamlineName},
		             {key : 'For session on ', value : dewar.sessionVO.startDate},
		             {key : 'Storage Location ', value :  deserialized[0].Dewar_storageLocation}
	    ];
	}
	else{
		items = [
	             {key : 'Label', value : deserialized[0].Dewar_code}
//	             {key : 'Storage Location ', value :  deserialized[0].Dewar_storageLocation}
    ];
		
	}
	var html = this._getHTMLTable(items);
	html = html + "<br /><span style='font-size:12px;font-style:italic;'>" + deserialized[0].Dewar_comments + "</span>";
	return html;
};

CaseGrid.prototype._getComponentRowHTML = function(icon, type, code, capacity, id) {
	var html = "";
	html = html + "<tr  class='tr-component'>";
	
	html = html + "<td>";
	html = html + "<img style='cursor:pointer;' name='edit' id='" + type +"_" + id +"' src=\'" + icon + "' />";
	html = html + "</td>";
	
	html = html + "<td>";
	html = html +  type;
	html = html + "</td>";
	
	html = html + "<td>";
	html = html +  code;
	html = html + "</td>";

	
	html = html + "<td>";
	html = html +  capacity;
	html = html + "</td>";

	if (type == "Stock Solution"){
		html = html + "<td>";
		html = html +  this._getUnpackStockSolutionButton(Number(id), "Unpack");
		html = html + "</td>";
	}
	
	if (type == "Puck"){
		html = html + "<td>";
		html = html +  this._getRemoveContainerButton(Number(id), "Remove");
		html = html + "</td>";
	}
	
	html = html + "</tr>";
	return html;
};

CaseGrid.prototype._getComponentHTML = function(dewarId, items) {
	
	var output = "";
	var html = "<table  class='table-component'><tr><th class='th-component'></th><th class='th-component'>Type</th><th class='th-component'>Code</th><th class='th-component'>Capacity</th><th></th></tr>";
	if (items.length > 0){
		for (var i = 0; i < items.length; i++) {
			var icon = '../images/BasketView_24x24_01.png';
			
			if (items[i].type == "Puck"){
					html = html + this._getComponentRowHTML(icon, items[i].type,  items[i].code,  items[i].sampleCount + "/"+ items[i].capacity,  items[i].id);
			}
			
			if (items[i].type == "Stock Solution"){
				icon = '../images/SampleHolderView_24x24_01.png';
				html = html + this._getComponentRowHTML(icon, items[i].type,  items[i].code,  items[i].capacity, items[i].id);
			}
			
		}
		output = html + "</table>";
	}
//	else{
//		output = "<br /><br /><span style='font-size:14px; font-weight:bold; color:orange'>EMPTY</span>";
//	}
	
	
	/** Adding buttons **/
	output = this._getHTMLButton(dewarId, "Add Puck") + this._getHTMLButton(dewarId, "Add Stock Solution") + output;
	return '<div class="border-grid" style="margin:10px 0px 10px 10px !important;width:610px;">' + output + '</div>';
};

CaseGrid.prototype._getColumns = function() {
	var _this = this;


	var columns = [
		{
			header : '',
			dataIndex : 'type',
			name : 'type',
			type : 'string',
			width : 60,
			renderer : function(grid, opts, record){
				var deserialized = JSON.parse(record.data.serialized);
				if (deserialized[0].Dewar_type == "Dewar"){
					return "<img src='../images/Dewar_32x32_01.png' style='height:40px;'>";
				}
				if (deserialized[0].Dewar_type == "Toolbox"){
					return "<img src='../images/toolbox.png'>";stockSolution
				}
			}
		},
		{
			header : 'Parcel',
			dataIndex : 'type',
			name : 'type',
			type : 'string',
			flex : 0.5,
			renderer : function(grid, opts, record){
				return _this._getContainerHTML(record);
			}
		},
		{
			header : 'Components on this parcel',
			dataIndex : 'type',
			name : 'type',
			type : 'string',
			flex : 1,
			renderer : function(grid, opts, record){
				var deserialized = JSON.parse(record.data.serialized);
				
				var dewarId = deserialized[0].Dewar_dewarId;
				var items = [];
				
				if (deserialized != null){
					if (deserialized.length > 0){
						for (var i = 0; i < deserialized.length; i++) {
							if (deserialized[i].Container_containerType == "Puck"){
								items.push({
									type : deserialized[i].Container_containerType,
								    code : deserialized[i].Container_code,
								    capacity :	deserialized[i].Container_capacity,
								    sampleCount :	deserialized[i].sampleCount,
								    id : deserialized[i].Container_containerId,
								 
								});
								
							}
						}
					}
				}
				
				/** Stock Solutions **/
				var stockSolutions = EXI.proposalManager.getStockSolutionsByDewarId(dewarId);
				for (var i = 0; i < stockSolutions.length; i++) {
						items.push({
							type : "Stock Solution",
						    code : stockSolutions[i].name,
						    capacity :	stockSolutions[i].volume + "ml",
						    sampleCount :	"",
						    id : 	stockSolutions[i].stockSolutionId
						 
						});
						
				}
				/** Rendering on HTML **/
				return _this._getComponentHTML(dewarId, items);
			}
		}
	];

//	if (this.btnEditVisible) {
//		columns.push({
//            xtype:'actioncolumn',
////            width:40,
//            flex : 0.25,
//            text : 'Edit',
//            items: [{
//                icon: '../images/icon/edit.png',  // Use a URL in the icon config
//                tooltip: 'Edit',
//                handler: function(grid, rowIndex, colIndex) {
//                    var rec = grid.getStore().getAt(rowIndex);
//                    _this.edit(rec.data);
//                }
//            }]
//        });
//	}

//	if (this.btnRemoveVisible) {
//		columns.push(
//				{
//				 xtype:'actioncolumn',
//				 	flex : 0.25,
//		            text : 'Remove',
//		            items: [{
//		                icon: '../images/icon/ic_delete_black_24dp.png',  // Use a URL in the icon config
//		                tooltip: 'Remove',
//		                handler: function(grid, rowIndex, colIndex) {
//		                	function showResult(btn){
//		                		if (btn == "yes"){
//		                			_this.onRemove.notify(grid.getStore().getAt(rowIndex).data);
//		                		}
//		                	}
//		                	 Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', showResult);
//		                }
//		            }]
//				});
//	}

//	columns.push({
//		dataIndex : 'comments',
//		 xtype:'actioncolumn',
//		 icon: '../images/icon/ic_view_headline_black_24dp.png',  
//		text : 'Labels',
//		flex : 0.25,
//		hidden : false,
//		handler :  function(grid, rowIndex, colIndex) {
//			window.open(new DataAdapter().getTemplateSourceFile(_this.experiment.experimentId, "bsxcube")); 
//		}
//	});

	return columns;
};

CaseGrid.prototype._getTopButtons = function() {
	var _this = this;
	/** Actions buttons **/
	var actions = [];

	/** ADD BUTTON **/
	actions.push(Ext.create('Ext.Action', {
		icon : '../images/icon/add.png',
		text : 'Add',
		disabled : false,
		handler : function(widget, event) {
			_this.onAdd.notify();
		}
	}));
	

	return actions;
};


CaseGrid.prototype.groupBy = function(array , f ){
	  var groups = {};
	  array.forEach( function( o )
	  {
	    var group = JSON.stringify( f(o) );
	    groups[group] = groups[group] || [];
	    groups[group].push( o );  
	  });
	  
	  return Object.keys(groups).map( function( group ){
		  return groups[group]; 
	  });
	};

CaseGrid.prototype.load = function(shipment) {
	var _this = this;
	
	this.shipment = shipment;
	this.dewars = shipment.dewarVOs;
	
	if (this.dewars.length > 0){
		function onSuccess(sender, containers){
			var dewars = (_this.groupBy(containers, function(item){
				  return [item.Dewar_dewarId];
			}));
			var data = [];
			for (var i = 0; i < dewars.length; i++) {
				data.push({serialized : JSON.stringify(dewars[i])})
			}
			_this.store.loadData(data);
		}
		
		EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.getDewarsByShipmentId(shipment.shippingId);
	}
};


CaseGrid.prototype.edit = function(dewar) {
	var _this = this;
	var caseForm = new CaseForm();
	
	var window = Ext.create('Ext.window.Window', {
	    title: 'Parcel',
	    height: 500,
	    width: 900,
	    modal : true,
	    layout: 'fit',
	    items: [
	            	caseForm.getPanel(dewar)
	    ],
	    buttons : [ {
						text : 'Save',
						handler : function() {
							var adapter = new DataAdapter();
							_this.panel.setLoading();
							var dewar = caseForm.getDewar();
							var onSuccess = (function(sender, shipment) {
								_this.load(shipment);
								window.close();
								_this.panel.setLoading(false);
							});
							dewar["sessionId"] = dewar.firstExperimentId;
							dewar["shippingId"] = _this.shipment.shippingId;
							EXI.getDataAdapter({onSuccess : onSuccess}).proposal.dewar.saveDewar(_this.shipment.shippingId, dewar);
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
		name : 'serialized',
		type : 'string'
	}
	];
};

CaseGrid.prototype.getDewarById = function(dewarId) {
	var _this = this;
	for (var i = 0; i < _this.dewars.length; i++) {
		if (_this.dewars[i].dewarId == dewarId){
			return _this.dewars[i];
		}
	}
};

CaseGrid.prototype.saveStockSolution = function(stockSolution) {
	var _this = this;
	this.panel.setLoading();
	var onSuccess = function(){
		var onSuccess2 = function(){
			_this.panel.setLoading(false);
			_this.load(_this.shipment);
		};
		EXI.getDataAdapter({onSuccess : onSuccess2}).proposal.proposal.update();
	}
debugger
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.stockSolution.saveStockSolution(stockSolution);
};



CaseGrid.prototype.addPuckToDewar = function(dewarId) {
	var _this = this;
	this.panel.setLoading();
	var onSuccess = function(){
		_this.load(_this.shipment);
		_this.panel.setLoading(false);
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.addPuck(this.shipment.shippingId, Number(dewarId));
	
};

CaseGrid.prototype.removePuck = function(puckId) {
	var _this = this;
	this.panel.setLoading();
	var onSuccess = function(sender, data){
		_this.load(_this.shipment);
		_this.panel.setLoading(false);
	};
	EXI.getDataAdapter({onSuccess: onSuccess}).proposal.shipping.removeContainerById(_this.shipment.shippingId,puckId,puckId );
	
};

/** Open a window with the stock solutions **/
CaseGrid.prototype.openStockSolutionWindow = function(dewarId) {
	var _this = this;
	var stockSolutionGrid = new StockSolutionGrid({
		btnAddVisible : false,
		btnEditVisible : false,
		btnRemoveVisible : false,
		btnAddExisting : false,
		isPackedVisible : false,
		multiselect : true
	});

	var window = Ext.create('Ext.window.Window', {
		height : 400,
		width : 700,
		items : [ stockSolutionGrid.getPanel() ],
		buttons : [ {
			text : 'Pack',
			handler : function() {
				window.close();
				stockSolutionGrid.selectedStockSolutions[0]["boxId"] = dewarId;
				_this.saveStockSolution(stockSolutionGrid.selectedStockSolutions[0]);
				
			}
		}, {
			text : 'Cancel',
			handler : function() {
				window.close();
			}
		} ]

	}).show();

	stockSolutionGrid.load(EXI.proposalManager.getUnpackedStockSolutions());
};

CaseGrid.prototype.getPanel = function() {
	var _this = this;

	/** Store **/
	this.store = Ext.create('Ext.data.Store', {
		fields : this._getStoreFields(),
		data : [],
		autoload : true
	});

	
	this.panel = Ext.create('Ext.grid.Panel', {
		style : {
			padding : 15
		},
		cls : 'border-grid',
		height : 800,
//		layout : 'fit',
		deferEmptyText: false,
	    emptyText: 'No data',
		store : this.store,
		columns : this._getColumns(),
		viewConfig : {
			stripeRows : true,
				enableTextSelection : true,
				preserveScrollOnRefresh : true,
				stripeRows : true,
				rowLines : true,
				listeners : {
					celldblclick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
						_this.edit(_this.getDewarById(JSON.parse(record.data.serialized)[0].Dewar_dewarId));
					},
					cellclick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
//							_this.edit(record.data);
							if (e.target.defaultValue == 'Data Reduction') {
								location.hash = "/datacollection/dataCollectionId/" + record.data.dataCollectionId + "/primaryviewer";
							}
							
							if (e.target.name == 'edit') {
								console.log(e.target.id);
								/** Edit stock solution **/
								if (e.target.id.indexOf("Stock Solution") != -1){
									var stockSolutionId = e.target.id.split("_")[1];
									location.hash = "/stocksolution/" + stockSolutionId +"/main";
								}
								
								if (e.target.id.indexOf("Puck") != -1){
									var containerId = e.target.id.split("_")[1];
									location.hash = "/puck/" + containerId +"/main";
								}
								
							}
							
							
							if (e.target.defaultValue == 'Add Stock Solution') {
								_this.openStockSolutionWindow(e.target.id);
							}
							
							if (e.target.defaultValue == 'Add Puck') {
//								_this.openStockSolutionWindow(e.target.id);
								_this.addPuckToDewar(e.target.id);
							}
							

							if (e.target.defaultValue == 'Unpack') {
								if (e.target.name == "stockSolution"){
									var stockSolution = EXI.proposalManager.getStockSolutionById(e.target.id);
									stockSolution.boxId = null;
									_this.saveStockSolution(stockSolution);
								}
							}
							
							if (e.target.defaultValue == 'Remove') {
								var puckId = Number(e.target.id);
								if (e.target.name == "puck"){
									function showResult(result){
											if (result == "yes"){
												_this.removePuck(puckId);
											}
									}
									  Ext.MessageBox.show({
								           title:'Save Changes?',
								           msg: 'You are removing a puck. This can not be UNDONE. <br />Would you like to CONTINUE?',
								           buttons: Ext.MessageBox.YESNOCANCEL,
								           fn: showResult,
								           animateTarget: 'mb4',
								           icon: Ext.MessageBox.QUESTION
								       });
									  
								}
							}

							if (e.target.defaultValue == 'Fit') {
								_this.onFitButtonClicked(record.raw);
							}

							if (e.target.defaultValue == 'Superposition') {
								_this.onSuperpositionButtonClicked(record.raw);
							}

							if (e.target.defaultValue == 'Rigid Body') {
								_this.onRigidBodyButtonClicked(record.raw);
							}
					}
				}
		},
		selModel : {
			mode : 'SINGLE'
		}
	});

	var actions = _this._getTopButtons();
	this.panel.addDocked({
		height : 45,
		xtype : 'toolbar',
		items : actions,
		cls : 'exi-top-bar'
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

