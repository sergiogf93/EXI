/**
 * @showTitle
 *
 * #onSaved
 * #onAddPlates
 * #onRemovePlates
 **/
function CaseForm(args) {
	this.width = 900;
	this.showTitle = true;
	if (args != null) {
		if (args.showTitle != null) {
			this.showTitle = args.showTitle;
		}
	}

	var _this = this;
	this.stockSolutionGrid = new StockSolutionGrid({
		width : this.width - 10,
		minHeight : 300,
		height : 300,
		tbar : true,
		showTitle : true,
		isPackedVisible : false,
		btnAddExisting : true,
		btnRemoveVisible : false,
		btnUnpackVisible : true
	});

	/** When selecting existing stock solutions **/
//	this.stockSolutionGrid.onStockSolutionSelected.attach(function(sender, stockSolutions) {
//		if (stockSolutions != null) {
//			for ( var i = 0; i < stockSolutions.length; i++) {
//				_this.saveStockSolution(stockSolutions[i]);
//			}
//		}
//	});

	/** it can be because it has been added a new one or removed **/
	this.stockSolutionGrid.onSaved.attach(function(sender, stockSolution) {
		stockSolution.boxId = _this.dewar.dewarId;
		_this.saveStockSolution(stockSolution);
	});

	this.stockSolutionGrid.onUnpack.attach(function(sender, stockSolution) {
		stockSolution.boxId = null;
		_this.saveStockSolution(stockSolution);
	});
	
	this.stockSolutionGrid.onPack.attach(function(sender, stockSolution) {
		stockSolution.boxId = _this.dewar.dewarId;
		_this.saveStockSolution(stockSolution);
	});
	
	this.onSaved = new Event(this);
	this.onAddPlates = new Event(this);
	this.onRemovePlates = new Event(this);
}

CaseForm.prototype.saveStockSolution = function(stockSolution) {
	var _this = this;
	this.stockSolutionGrid.grid.setLoading();
	var onSuccess = (function(sender, stockSolution) {
//		var updater = new ProposalUpdater();
//		updater.onSuccess.attach(function(sender){
//			_this.stockSolutionGrid.load(EXI.proposalManager.getStockSolutionsByDewarId(_this.dewar.dewarId));
//			_this.stockSolutionGrid.grid.setLoading(false);
//		});
//		updater.get(true);
		
		var onSuccess2 = function(sender, proposals){
			_this.stockSolutionGrid.load(EXI.proposalManager.getStockSolutionsByDewarId(_this.dewar.dewarId));
			_this.stockSolutionGrid.grid.setLoading(false);
		};
		_this.stockSolutionGrid.grid.setLoading("Updading proposal information");
		EXI.getDataAdapter({onSuccess : onSuccess2}).proposal.proposal.update();
		
		
	});
//	adapter.onError.attach(function(sender, data) {
//		_this.stockSolutionGrid.grid.setLoading(false);
//		BUI.showError(data);
//	});
	EXI.getDataAdapter({onSuccess : onSuccess}).saxs.stockSolution.saveStockSolution(stockSolution);
};

CaseForm.prototype.fillStores = function() {
	var _this = this;
	this.panel.setLoading("Loading Labcontacts from database");

	var proposal = BUI.getProposal();
	proposal.onDataRetrieved.attach(function(sender, data) {
		_this.labContactForSendingStore.loadData(data, false);
		_this.labContactForReturnStore.loadData(data, false);
		_this.panel.setLoading(false);
	});
	proposal.getLabContactsByProposalId();

};

CaseForm.prototype.refresh = function(dewar) {
	this.setDewar(dewar);
	this.stockSolutionGrid.load(EXI.proposalManager.getStockSolutionsByDewarId(dewar.dewarId));
};

CaseForm.prototype.getDewar = function() {
	this.dewar.code = Ext.getCmp("dewar_code").getValue();
	this.dewar.comments = Ext.getCmp("dewar_comments").getValue();
	this.dewar.trackingNumberFromSynchrotron = Ext.getCmp("dewar_trackingNumberFromSynchrotron").getValue();
	this.dewar.trackingNumberToSynchrotron = Ext.getCmp("dewar_trackingNumberToSynchrotron").getValue();
	this.dewar.transportValue = Ext.getCmp("dewar_transportValue").getValue();
	this.dewar.storageLocation = Ext.getCmp("dewar_storageLocation").getValue();
	this.dewar.firstExperimentId = this.sessionsCombo.getValue();
	return this.dewar;
};

CaseForm.prototype.setDewar = function(dewar) {
	this.dewar = dewar;
	Ext.getCmp("dewar_code").setValue(this.dewar.code);
	Ext.getCmp("dewar_dewarStatus").setText(new String(this.dewar.dewarStatus).toUpperCase());
	Ext.getCmp("dewar_comments").setValue(this.dewar.comments);
	Ext.getCmp("dewar_trackingNumberFromSynchrotron").setValue(this.dewar.trackingNumberFromSynchrotron);
	Ext.getCmp("dewar_trackingNumberToSynchrotron").setValue(this.dewar.trackingNumberToSynchrotron);
	Ext.getCmp("dewar_transportValue").setValue(this.dewar.transportValue);
	Ext.getCmp("dewar_storageLocation").setValue(this.dewar.storageLocation);
	if (dewar.sessionVO != null) {
		this.sessionsCombo.setValue(dewar.sessionVO.sessionId);
	}
};

CaseForm.prototype.getSessionCombo = function() {
	this.sessionsCombo = BIOSAXS_COMBOMANAGER.getComboSessions(EXI.proposalManager.getSessions(), {
		labelWidth : 100,
		margin : '5 0 00 0',
		width : 450
	});
	return this.sessionsCombo;
};

CaseForm.prototype.getInformationPanel = function() {
	if (this.panel == null) {
		this.informationPanel = Ext.create('Ext.form.Panel', {
			width : this.width - 10,
			items : [ {
				xtype : 'container',
				margin : "2 2 2 2",
				collapsible : false,
				defaultType : 'textfield',
				layout : 'anchor',
				items : [ {
					xtype : 'container',
					layout : 'vbox',
					items : [ {
						xtype : 'requiredtextfield',
						fieldLabel : 'Code',
						allowBlank : false,
						name : 'code',
						id : 'dewar_code',
						anchor : '50%'
					}, {
						xtype : 'label',
						margin : '0 0 0 100',
						readOnly : true,
						id : 'dewar_dewarStatus',
						anchor : '50%'
					} ]
				}, this.getSessionCombo(), {
					xtype : 'textareafield',
					name : 'comments',
					fieldLabel : 'Comments',
					width : 500,
					margin : '10 0 0 0',
					height : 100,
					id : 'dewar_comments'
				} ]
			}, {
				xtype : 'fieldset',
				title : 'Courier Accounts Details for Return',
				collapsible : false,
				height : 125,
				items : [ {
					xtype : 'container',
					layout : 'hbox',
					items : [ {
						xtype : 'textfield',
						labelWidth : 200,
						width : 350,
						fieldLabel : 'Track Number From Synchrotron',
						id : 'dewar_trackingNumberFromSynchrotron'
					}, {
						xtype : 'numberfield',
						width : 350,
						labelWidth : 200,
						margin : '0 0 0 30',
						fieldLabel : 'Transport Value',
						id : 'dewar_transportValue'
					}

					]
				}, {
					xtype : 'container',
					layout : 'hbox',
					margin : '10 0 0 0',
					items : [

					{
						xtype : 'textfield',
						labelWidth : 200,
						width : 350,
						fieldLabel : 'Track Number To Synchrotron',
						id : 'dewar_trackingNumberToSynchrotron'
					}, {
						xtype : 'textfield',
						margin : '0 0 0 30',
						width : 350,
						labelWidth : 200,
						fieldLabel : 'Storage Location',
						id : 'dewar_storageLocation'
					}
					]
				} ]
			} ]
		});
	}

	return this.informationPanel;
};

CaseForm.prototype.getPanel = function(dewar) {
	this.dewar = dewar;
	this.panel =  Ext.createWidget('tabpanel',
			{
				plain : true,
				style : {
//					borderColor : 'gray',
//					borderStyle : 'solid',
//					borderWidth : '1px',
					'background-color' : '#E6E6E6' 
				},
				items : [
							{
								tabConfig : {
									title : 'Case',
										bodyStyle : {"background-color":"#E6E6E6"},
								},
								items : [ {
									xtype : 'container',
									layout : 'fit',
//									height : 700,
									padding : 20,
									margin : 10,
									cls : 'defaultGridPanel',
									
									items : [ 
									         	this.getInformationPanel(dewar)
									]
								}
							
								]
							},
							{
								tabConfig : {
									title : 'Stock Solutions'
								},
								items : [ {
									xtype : 'container',
									layout : 'fit',
									minHeight : 200,
									margin : 10,
									style : {
										borderColor : 'gray',
										borderStyle : 'solid',
										borderWidth : '1px',
										'background-color' : 'white' 
									},
									items : [ 
									         	this.stockSolutionGrid.getPanel()
									]
								}
							
								]
							}
		        ]
			});
//	this.panel = Ext.createWidget({
//		xtype : 'container',
//		layout : 'vbox',
//		width : this.width,
//		border : 0,
//		items : [ {
//			items : {
//				xtype : "container",
//				layout : "vbox",
//				margin : "5 5 5 5",
//				items : [ 
//				          this.getInformationPanel(dewar), 
//				          this.stockSolutionGrid.getPanel() ]
//
//			}
//		} ]
//	});

	this.refresh(dewar);
	return this.panel;

};

