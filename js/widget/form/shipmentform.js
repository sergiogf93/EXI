/**
 * Same form as MX part
 * 
 * @creationMode if true a create button appears instead of save
 * @showTitle true or false
 */
function ShipmentForm(args) {
	this.id = BUI.id();

	if (args != null) {
		if (args.creationMode != null) {
			this.creationMode = args.creationMode;
		}
	}
	
	this.sendingAddressForm = new AddressForm({isSaveButtonHidden : true});
	this.returnAddressForm = new AddressForm({isSaveButtonHidden : true, isHidden : true});

	this.onSaved = new Event(this);
}

ShipmentForm.prototype.fillStores = function() {
	this.panel.setLoading("Loading Labcontacts from database");
	var labContacts = EXI.proposalManager.getLabcontacts();

	
	this.labContactForSendingStore.loadData(labContacts, false);
	$.extend(labContacts, [{ cardName : 'Same as for shipping to beamline', labContactId : -1}, { cardName : 'No return requested', labContactId : 0}]);
	this.labContactForReturnStore.loadData(labContacts, false);

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
	Ext.getCmp(_this.id + "comments").setValue(shipment.comments);
	if (shipment.sendingLabContactVO != null) {
		this.labContactsSendingCombo.setValue(shipment.sendingLabContactVO.labContactId);
	}

	
	if (shipment.returnLabContactVO == null) {
		this.labContactsReturnCombo.setValue(0);
	}
	else{
		if (shipment.returnLabContactVO.labContactId == shipment.sendingLabContactVO.labContactId){
			this.labContactsReturnCombo.setValue(-1);
		}
		else{
			this.labContactsReturnCombo.setValue(shipment.returnLabContactVO.labContactId);
		}
	}
	
	if (shipment.sessions != null){
		if (shipment.sessions.length > 0){
			var session = shipment.sessions[0];
			this.sessionComboBox.setValue(session.sessionId);
		}
	}

};

ShipmentForm.prototype._saveShipment = function() {
	var _this = this;
	var shippingId = null;
	if (this.shipment != null) {
		shippingId = this.shipment.shippingId;
	}

	
	var sendingAddress = this.sendingAddressForm.getAddress();
	var returnAddress = this.returnAddressForm.getAddress();
	
	
	var returnAddressId =  returnAddress.labContactId;
	
	/** No return requested **/
	if (this.labContactsReturnCombo.getValue() == 0){
		returnAddressId = 0;
	}
	
	/** Same sender **/
	if (this.labContactsReturnCombo.getValue() == -1){
		returnAddressId = -1;
	}

	var json = {
		shippingId : shippingId,
		name : Ext.getCmp(_this.id + "shippingName").getValue(),
		status : "Not set",
		sendingLabContactId : this.sendingAddressForm.getAddress().labContactId,
		returnLabContactId : returnAddressId,
		returnCourier : returnAddress.labContactId,
		courierAccount : sendingAddress.courierAccount,
		billingReference : sendingAddress.billingReference,
		dewarAvgCustomsValue : sendingAddress.dewarAvgCustomsValue,
		dewarAvgTransportValue :sendingAddress.dewarAvgTransportValue,
		comments : Ext.getCmp(_this.id + "comments").getValue(),
		sessionId : this.sessionComboBox.getValue()
	};

	var onSuccess = (function(sender, shipment) {
		/** It was a new shipment **/
		if (shippingId == null){
			location.hash = "#/shipping/" + shipment.shippingId + "/main";
		}
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

	
	this.panel.setLoading();
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.saveShipment(json);
	
	/** Saving lab contacts **/
	this.sendingAddressForm.save();
	
	
	if (this.labContactsReturnCombo.getValue() > 0){
		this.returnAddressForm.save();
	}
	
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

	this.labContactsSendingCombo = Ext.create('Ext.form.ComboBox', {
		id : _this.id + "shipmentform_sendingLabContactId",
		fieldLabel : 'User contact information for shipping to beamline',
		afterLabelTextTpl : required,
		store : this.labContactForSendingStore,
		queryMode : 'local',
		labelWidth : 350,
		width : 800,
		displayField : 'cardName',
		valueField : 'labContactId',
		listeners : {
			change : function(x, newValue) {
				if (newValue != null){
					_this.sendingAddressForm.load(EXI.proposalManager.getLabcontactById(newValue));
					_this.sendingAddressForm.panel.setVisible(true);
				}
				else{
					_this.sendingAddressForm.panel.setVisible(false);
				}
			}
		}
	});

	this.labContactsReturnCombo = Ext.create('Ext.form.ComboBox', {
		id : _this.id + "returnLabContactId",
		fieldLabel : 'User contact information for return to home institute',
		afterLabelTextTpl : required,
		store : this.labContactForReturnStore,
		queryMode : 'local',
		labelWidth : 350,
		width : 800,
		value : -1,
		displayField : 'cardName',
		valueField : 'labContactId',
		listeners : {
			change : function(x, newValue) {
				if ((newValue == 0) || (newValue == -1)){
					_this.returnAddressForm.panel.setVisible(false);
					return;
				}
				
				if (newValue != null){
					_this.returnAddressForm.load(EXI.proposalManager.getLabcontactById(newValue));
					_this.returnAddressForm.panel.setVisible(true);
				}
				else{
					_this.returnAddressForm.panel.setVisible(false);
					
				}
			}
		}
	});

       this.sessionComboBox =  BIOSAXS_COMBOMANAGER.getComboSessions(EXI.proposalManager.getSessions(), {margin: '10 0 0 10', width: 400, labelWidth: 100});

	if (this.panel == null) {
		this.panel = Ext.create('Ext.form.Panel', {
			bodyPadding : 5,
			cls : 'border-grid',
			buttons : buttons,
			items : [ 
				         {
				        	 xtype : 'container',
				        	 layout : 'hbox',
				        	 items : [
								         {
						      					xtype : 'requiredtextfield',
						      					fieldLabel : 'Name',
						      					allowBlank : false,
						      					labelWidth : 75,
						      					width : 500,
						      					margin : "10 20 0 10",
						      					name : 'shippingName',
						      					id : _this.id + 'shippingName',
						      					value : '',
					        	           	 },
									 this.sessionComboBox
						      				
				        	           ]
				            },
					    {
				
						    					xtype : 'textareafield',
						    					name : 'comments',
						    					id : _this.id + 'comments',
						    					fieldLabel : 'Comments',
						    					value : '',
						    					labelWidth : 75,
						    					margin : "10 20 0 10",
						    					width : 500,
						},
		    				{
		    					html : "<span class='exi-toolBar' style='font-size:18px; '>Address for shipping to Beamline</span>",
		    					margin : "30 0 0 10",
		    					flex : 1 
		    				},
							 {
					        	 xtype : 'container',
					        	 layout : 'vbox',
					        	 items : [
												 {
										        	 xtype : 'container',
										        	 layout : 'vbox',
										        	 margin : "10 20 0 10",
										        	 items : [
				
									        	          		this.labContactsSendingCombo,
										        	          	this.sendingAddressForm.getPanel()
										        	 ]
												 },
												 {
								    					html : "<span class='exi-toolBar' style='font-size:18px; '>Address for return to home institute</span>",
								    					margin : "30 0 0 10",
								    					flex : 1 
								    			 },
												 {
										        	 xtype : 'container',
										        	 layout : 'vbox',
										        	 margin : "10 0 10 20",
										        	 items : [
										        	          	this.labContactsReturnCombo,
										        	          	this.returnAddressForm.getPanel()
										        	 ]
												 }
								 ]
							 }
		]
		});
	}
	this.fillStores();
	return this.panel;
};

