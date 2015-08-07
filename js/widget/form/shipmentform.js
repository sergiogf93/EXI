/**
 * Same form as MX part
 * 
 * @creationMode if true a create button appears instead of save
 * @showTitle true or false
 */
function ShipmentForm(args) {
	this.id = BUI.id();

//	this.creationMode = false;
//	this.showTitle = true;
	if (args != null) {
		if (args.creationMode != null) {
			this.creationMode = args.creationMode;
		}
//		if (args.showTitle != null) {
//			this.showTitle = args.showTitle;
//		}
	}

	this.onSaved = new Event(this);
}

ShipmentForm.prototype.fillStores = function() {
	this.panel.setLoading("Loading Labcontacts from database");
	this.labContactForSendingStore.loadData(EXI.proposalManager.getLabcontacts(), false);
	this.labContactForReturnStore.loadData(EXI.proposalManager.getLabcontacts(), false);
	this.panel.setLoading(false);
	if (this.shipment != null) {
		this.setShipment(this.shipment);
	}
};

ShipmentForm.prototype.draw = function(targetId) {
	this.getPanel().render(targetId);
};

ShipmentForm.prototype.load = function(shipment) {
	this.shipment = shipment;
	var _this = this;
	Ext.getCmp(_this.id + "shippingName").setValue(shipment.shippingName);
	Ext.getCmp(_this.id + "shippingStatus").setValue(shipment.shippingStatus);
	Ext.getCmp(_this.id + "comments").setValue(shipment.comments);
	if (shipment.sendingLabContactVO != null) {
		this.labContactsSendingCombo.setValue(shipment.sendingLabContactVO.labContactId);
	}
	if (shipment.returnLabContactVO != null) {
		this.labContactsReturnCombo.setValue(shipment.returnLabContactVO.labContactId);
	}
	document.getElementById(this.id + "date").innerHTML = "Created on " + (shipment.creationDate);
	
};

ShipmentForm.prototype._saveShipment = function() {
	var _this = this;
	var shippingId = null;
	if (this.shipment != null) {
		shippingId = this.shipment.shippingId;
	}
	var json = {
		shippingId : shippingId,
		name : Ext.getCmp(_this.id + "shippingName").getValue(),
		status : Ext.getCmp(_this.id + "shippingStatus").getValue(),
		sendingLabContactId : Ext.getCmp(_this.id + "shipmentform_sendingLabContactId").getValue(),
		returnLabContactId : Ext.getCmp(_this.id + "returnLabContactId").getValue(),
		returnCourier : Ext.getCmp(_this.id + "returnCourier").getValue(),
		courierAccount : Ext.getCmp(_this.id + "courierAccount").getValue(),
		BillingReference : Ext.getCmp(_this.id + "BillingReference").getValue(),
		dewarAvgCustomsValue : Ext.getCmp(_this.id + "dewarAvgCustomsValue").getValue(),
		dewarAvgTransportValue : Ext.getCmp(_this.id + "dewarAvgTransportValue").getValue(),
		comments : Ext.getCmp(_this.id + "comments").getValue()
	};

	var onSuccess = (function(sender, shipment) {
		_this.panel.setLoading(false);
		_this.onSaved.notify(shipment);
	});


	/** Cheking params **/
	if (json.name == "") {
		BUI.showError("Name field is mandatory");
		return;
	}

	if (json.sendingLabContactId == null) {
		BUI.showError("Lab contact for sending field is mandatory");
		return;
	}

	if (json.returnLabContactId == null) {
		BUI.showError("Lab contact for return field is mandatory");
		return;
	}
	
	this.panel.setLoading();
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.saveShipment({
			shippingId : shippingId,
			name : Ext.getCmp(_this.id + "shippingName").getValue(),
			status : Ext.getCmp(_this.id + "shippingStatus").getValue(),
			sendingLabContactId : Ext.getCmp(_this.id + "shipmentform_sendingLabContactId").getValue(),
			returnLabContactId : Ext.getCmp(_this.id + "returnLabContactId").getValue(),
			returnCourier : Ext.getCmp(_this.id + "returnCourier").getValue(),
			courierAccount : Ext.getCmp(_this.id + "courierAccount").getValue(),
			billingReference : Ext.getCmp(_this.id + "BillingReference").getValue(),
			dewarAvgCustomsValue : Ext.getCmp(_this.id + "dewarAvgCustomsValue").getValue(),
			dewarAvgTransportValue : Ext.getCmp(_this.id + "dewarAvgTransportValue").getValue(),
			comments : Ext.getCmp(_this.id + "comments").getValue()
	});
	

};

ShipmentForm.prototype.getPanel = function() {
	var _this = this;
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	var buttons = [];

	if (_this.creationMode) {
		buttons.push({
			text : 'Create',
			scope : this,
			handler : function() {
				_this._saveShipment();
			}
		});
	} else {
		buttons.push({
			text : 'Save',
			scope : this,
			handler : function() {
				_this._saveShipment();
			}
		});

	}

	this.labContactForSendingStore = Ext.create('Ext.data.Store', {
		fields : [ 'cardName', 'labContactId' ]
	});

	this.labContactForReturnStore = Ext.create('Ext.data.Store', {
		fields : [ 'cardName', 'labContactId' ]
	});

	// Create the combo box, attached to the states data store
	this.labContactsSendingCombo = Ext.create('Ext.form.ComboBox', {
		id : _this.id + "shipmentform_sendingLabContactId",
		fieldLabel : 'Lab contact for sending',
		afterLabelTextTpl : required,
		store : this.labContactForSendingStore,
		queryMode : 'local',
		labelWidth : 200,
		displayField : 'cardName',
		valueField : 'labContactId'
	});

	this.labContactsReturnCombo = Ext.create('Ext.form.ComboBox', {
		id : _this.id + "returnLabContactId",
		fieldLabel : 'If No, Lab-Contact for Return',
		afterLabelTextTpl : required,
		store : this.labContactForReturnStore,
		queryMode : 'local',
		labelWidth : 200,
		displayField : 'cardName',
		valueField : 'labContactId',
		listeners : {
			change : function(x, newValue) {
				for ( var i = 0; i < x.getStore().data.items.length; i++) {
					if (x.getStore().data.items[i].data.labContactId == newValue) {
						Ext.getCmp(_this.id + "returnCourier").setValue(x.getStore().data.items[i].data.defaultCourrierCompany);
						Ext.getCmp(_this.id + "courierAccount").setValue(x.getStore().data.items[i].data.courierAccount);
						Ext.getCmp(_this.id + "BillingReference").setValue(x.getStore().data.items[i].data.billingReference);
						Ext.getCmp(_this.id + "dewarAvgCustomsValue").setValue(x.getStore().data.items[i].data.dewarAvgCustomsValue);
						Ext.getCmp(_this.id + "dewarAvgTransportValue").setValue(x.getStore().data.items[i].data.dewarAvgTransportValue);
					}
				}
			}
		}
	});

	if (this.panel == null) {
		this.panel = Ext.create('Ext.form.Panel', {
			bodyPadding : 10,
//			width : 600,
			cls : 'border-grid',
//			border : 1,
			items : [ 
			          {
				xtype : 'fieldset',
				title : 'Shipment',
				collapsible : false,
				defaultType : 'textfield',
				layout : 'anchor',
//				defaults : {
//					anchor : '100%'
//				},
				items : [ 
				         {
				        	 xtype : 'container',
				        	 layout : 'hbox',
				        	 items : [
				        	           {
								        	 xtype : 'container',
								        	 layout : 'vbox',
								        	 items : [{
								      					xtype : 'requiredtextfield',
								      					fieldLabel : 'Shipment Label',
								      					allowBlank : false,
								      					labelWidth : 100,
								      					name : 'shippingName',
								      					id : _this.id + 'shippingName',
								      					value : '',
									      				},
									      				{
									      					html : "<div id='" + this.id + "date'></div>",
									      					margin : '0 0 0 100'
									      				}
									      					
									      					]
				        	           },
					      				{
	
					    					xtype : 'textareafield',
					    					name : 'comments',
					    					id : _this.id + 'comments',
					    					fieldLabel : 'Comments',
					    					value : '',
					    					margin : '0 0 0 40',
					    					width : 500
					    				}
				      			
		        	          ]
				         },
				     		{
		    					fieldLabel : 'Status',
		    					xtype : 'textfield',
		    					fieldStyle : {
		    						color : 'gray',
		    						border : 0
		    					},
		    					readOnly : true,
		    					id : _this.id + 'shippingStatus',
		    					value : 'Opened',
//		    					anchor : '50%'
		    				} 
				        	  ]
			}, 
			{
				xtype : 'fieldset',
				title : 'Lab-Contacts',
				collapsible : false,
				defaultType : 'textfield',
//				layout : 'anchor',
//				defaults : {
//					anchor : '100%'
//				},
				items : [ this.labContactsSendingCombo, this.labContactsReturnCombo ]
			}, 
//			{
//				border : 0,
//				html : BUI.getWarningHTML("These informations are relevant for all shipments")
//			}, 
			{
				xtype : 'fieldset',
				title : 'Courier accounts details for return',
//				layout : 'anchor',
//				defaults : {
//					anchor : '100%'
//				},
				items : [ {
					xtype : 'textfield',
					labelWidth : 400,
					fieldLabel : 'Courier company for return (if ESRF sends a dewar back)',
					id : _this.id + 'returnCourier',
					value : ''
				}, {
					xtype : 'textfield',
					labelWidth : 400,
					fieldLabel : 'Courier account',
					id : _this.id + 'courierAccount',
					value : ''
				}, {
					xtype : 'textfield',
					labelWidth : 400,
					fieldLabel : 'Billing reference',
					id : _this.id + 'BillingReference',
					value : ''
				}, {
					xtype : 'numberfield',
					labelWidth : 400,
					fieldLabel : 'Average Customs value of a dewar (Euro)',
					id : _this.id + 'dewarAvgCustomsValue',
					value : ''
				}, {
					xtype : 'numberfield',
					labelWidth : 400,
					fieldLabel : 'Average Transport value of a dewar (Euro)',
					id : _this.id + 'dewarAvgTransportValue',
					value : ''
				} 
			]
			}
		],
			buttons : buttons
		});
	}
	this.fillStores();
//	if (this.showTitle) {
//		this.panel.setTitle('Create a new Shipment');
//	}
	return this.panel;
};

