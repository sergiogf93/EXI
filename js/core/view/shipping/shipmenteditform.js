function ShipmentEditForm(args) {
    this.id = BUI.id();

    this.width = 600;
    this.height = 200;
	this.showTitle = true;
	this.shippingId = 0;
	if (args != null) {
		if (args.showTitle != null) {
			this.showTitle = args.showTitle;
		}
        if (args.width != null) {
			this.width = args.width;
		}
        if (args.height != null) {
			this.height = args.height;
		}
		if (args.shippingId != null) {
			this.shippingId = args.shippingId;
		}
	}
}

ShipmentEditForm.prototype.getPanel = function(dewar) {

	var toData = EXI.proposalManager.getLabcontacts();
	var fromData = $.extend(EXI.proposalManager.getLabcontacts(), [{ cardName : 'Same as for shipping to beamline', labContactId : -1}, { cardName : 'No return requested', labContactId : 0}]);

    var html = "";
    dust.render("shipping.edit.form.template", {id : this.id, to : toData, from : fromData}, function(err, out){
		html = out;
	});

    this.panel =  {
                    html : '<div id="' + this.id + '">' + html + '</div>',
                    autoScroll : false,
					padding : this.padding,
					width : this.width
                };

	return this.panel;
};

ShipmentEditForm.prototype.getShipment = function() {
	var name = $("#" + this.id + "-name").val();
	var beamline = $("#" + this.id + "-beamline").val();
	var date = $("#" + this.id + "-date").val();
	var comments = $("#" + this.id + "-comments").val();
	var toData = $("#" + this.id + "-to").val();
	var fromData = $("#" + this.id + "-from").val();
	debugger
	return {
				name		: name,
				beamline 	: beamline,
				date 		: date,
				comments 	: comments,
				to 			: toData,
				from 		: fromData
			};
};

ShipmentEditForm.prototype.saveShipment = function() {
	var _this = this;
debugger
	var sendingAddressCardName = $("#" + this.id + "-to").val();
	var returnAddressCardName = $("#" + this.id + "-from").val();

	var labContacts = EXI.proposalManager.getLabcontacts();
	var sendingAddress = _.filter(labContacts,{cardName : sendingAddressCardName})[0];
	$.extend(labContacts, [{ cardName : 'Same as for shipping to beamline', labContactId : -1}, { cardName : 'No return requested', labContactId : 0}]);
	var returnAddress = _.filter(labContacts,{cardName : returnAddressCardName})[0];
	
	var sendingAddressId = sendingAddress.labContactId;
	var returnAddressId = returnAddress.labContactId;
	
	if (sendingAddressId == null) {
		BUI.showError("User contact information for shipping to beamline is mandatory");
		return;
	}

	/** No return requested **/
	if (returnAddressId == "No return requested"){
		returnAddressId = 0;
	}
	
	/** Same sender **/
	if (returnAddressId == "Same as for shipping to beamline"){
		returnAddressId = -1;
	}
	
	var json = {
		shippingId : shippingId,
		name : $("#" + this.id + "-name").val(),
		status : "Not set",
		sendingLabContactId : sendingAddressId,
		returnLabContactId : returnAddressId, 
		returnCourier : returnAddressId,
		courierAccount : sendingAddress.courierAccount,
		billingReference : sendingAddress.billingReference,
		dewarAvgCustomsValue : sendingAddress.dewarAvgCustomsValue,
		dewarAvgTransportValue :sendingAddress.dewarAvgTransportValue,
		comments : $("#" + this.id + "-comments").val(),
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
}