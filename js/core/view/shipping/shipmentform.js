/**
 * Same form as MX part
 * 
 * @creationMode if true a create button appears instead of save
 * @showTitle true or false
 */
function ShipmentForm(args) {
	this.id = BUI.id();
	this.width = 600;
	this.padding = 20;

	if (args != null) {
		if (args.creationMode != null) {
			this.creationMode = args.creationMode;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}
	
	this.onSaved = new Event(this);
}

ShipmentForm.prototype.fillStores = function() {
	this.panel.setLoading("Loading Labcontacts from database");
	var labContacts = EXI.proposalManager.getLabcontacts();

	this.labContactForSendingStore.loadData(labContacts, false);

	labContacts.sort(function(a, b){
	    if(a.cardName < b.cardName) {return -1;}
	    if(a.cardName > b.cardName) {return 1;}
	    return 0;
	});
	
	$.extend(labContacts, [{ cardName : 'Same as for shipping to beamline', labContactId : -1}, { cardName : 'No return requested', labContactId : 0}]);
	this.labContactForReturnStore.loadData(labContacts, false);

	this.labContactsReturnCombo.setValue(-1);

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
	
    var html = "";
    dust.render("shipping.form.template", [], function(err, out){
		html = out;
	});

    $('#' + _this.id).hide().html(html).fadeIn('fast');

};

ShipmentForm.prototype._saveShipment = function() {
	var _this = this;
	var shippingId = null;
	
	if (this.shipment != null) {
		shippingId = this.shipment.shippingId;
	}
	
	var sendingAddressId = this.labContactsSendingCombo.getValue();
	var returnAddressId = this.labContactsReturnCombo.getValue();
	
	if (sendingAddressId == null) {
		BUI.showError("User contact information for shipping to beamline is mandatory");
		return;
	}

		
	/** No return requested **/
	if (this.labContactsReturnCombo.getValue() == 0){
		returnAddressId = 0;
	}
	
	/** Same sender **/
	if (this.labContactsReturnCombo.getValue() == -1){
		returnAddressId = -1;
	}

	var sendingAddress = (EXI.proposalManager.getLabcontactById(sendingAddressId));
	var json = {
		shippingId : shippingId,
		name : Ext.getCmp(_this.id + "shippingName").getValue(),
		status : "Not set",
		sendingLabContactId : sendingAddressId,
		returnLabContactId : returnAddressId, 
		returnCourier : returnAddressId,
		courierAccount : sendingAddress.courierAccount,
		billingReference : sendingAddress.billingReference,
		dewarAvgCustomsValue : sendingAddress.dewarAvgCustomsValue,
		dewarAvgTransportValue :sendingAddress.dewarAvgTransportValue,
		comments : Ext.getCmp(_this.id + "comments").getValue(),
		sessionId : this.sessionComboBox.getValue()
	};

	var onSuccess = function(sender, shipment) {
		location.hash = "#/shipping/" + shipment.shippingId + "/main";
		_this.panel.setLoading(false);
		_this.onSaved.notify(shipment);
	};


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
	
	
};

ShipmentForm.prototype.getPanel = function() {

    this.panel =  {
                    html : '<div id="' + this.id + '" class="border-grid"></div>',
                    autoScroll : false,
					padding : this.padding,
					width : this.width
                };

	return this.panel;

};

