/**
 * Edit the information of a buffer
 * 
 * #onRemoveAdditive
 */
function AddressForm(args) {
	this.id = BUI.id();
	this.height = 500;
	this.width = 500;

	this.isSaveButtonHidden = false;
	this.isHidden = false;

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
		if (args.isSaveButtonHidden != null) {
			this.isSaveButtonHidden = args.isSaveButtonHidden;
		}
		if (args.isHidden != null) {
			this.isHidden = args.isHidden;
		}
		
	}
}

AddressForm.prototype.getAddress = function() {
	if (this.address == null) {
		this.address = {};
	}
	this.address["billingReference"] = Ext.getCmp(this.id + "billingReference").getValue();
	this.address["cardName"] = Ext.getCmp(this.id + "cardName").getValue();
	this.address["courierAccount"] = Ext.getCmp(this.id + "courierAccount").getValue();
	this.address["defaultCourrierCompany"] = Ext.getCmp(this.id + "courrierCompany").getValue();
	this.address["dewarAvgCustomsValue"] = Ext.getCmp(this.id + "dewarAvgCustomsValue").getValue();
	this.address["dewarAvgTransportValue"] = Ext.getCmp(this.id + "dewarAvgTransportValue").getValue();

	if (this.address.personVO == null) {
		this.address.personVO = {};
	}
	else{
		
	}

	this.address.personVO["emailAddress"] = Ext.getCmp(this.id + "emailAddress").getValue();
	this.address.personVO["familyName"] = Ext.getCmp(this.id + "familyName").getValue();
	this.address.personVO["givenName"] = Ext.getCmp(this.id + "name").getValue();
	this.address.personVO["faxNumber"] = Ext.getCmp(this.id + "faxNumber").getValue();
	this.address.personVO["phoneNumber"] = Ext.getCmp(this.id + "phoneNumber").getValue();
	return this.address;
};

AddressForm.prototype._loadPerson = function(givenName, familyName, emailAddress, faxNumber, phoneNumber) {
	Ext.getCmp(this.id + "emailAddress").setValue(emailAddress);
	Ext.getCmp(this.id + "familyName").setValue(familyName);
	Ext.getCmp(this.id + "name").setValue(givenName);
	Ext.getCmp(this.id + "faxNumber").setValue(faxNumber);
	Ext.getCmp(this.id + "phoneNumber").setValue(phoneNumber);
};

AddressForm.prototype.load = function(address) {
	this.address = address;

	if (address != null) {
		Ext.getCmp(this.id + "cardName").setValue(address.cardName);
		Ext.getCmp(this.id + "courrierCompany").setValue(address.defaultCourrierCompany);
		Ext.getCmp(this.id + "dewarAvgCustomsValue").setValue(address.dewarAvgCustomsValue);
		Ext.getCmp(this.id + "dewarAvgTransportValue").setValue(address.dewarAvgTransportValue);
		Ext.getCmp(this.id + "courierAccount").setValue(address.courierAccount);
		Ext.getCmp(this.id + "billingReference").setValue(address.billingReference);

		if (address.personVO != null) {
			this._loadPerson(address.personVO.givenName, address.personVO.familyName, address.personVO.emailAddress,
					address.personVO.faxNumber, address.personVO.phoneNumber);
		}
	}
};

AddressForm.prototype.getPersonPanel = function() {
	this.personPanel = Ext.create('Ext.panel.Panel', {
		layout : 'vbox',
		margin : '10',
		items : [ {
			padding : 10,
			xtype : 'container',
			layout : 'hbox',
			border : false,
			items : [ {
					xtype : 'requiredtextfield',
					id : this.id + 'name',
					fieldLabel : 'Name',
					labelWidth : 75,
					margin : "0 0 0 10",
					disabled : true,
					width : 200 
				}, 
				{
					xtype : 'requiredtextfield',
					id : this.id + 'familyName',
					fieldLabel : 'Surname',
					labelWidth : 75,
					disabled : true,
					margin : "0 0 0 10",
					width : 200 
				}, 
				{
					xtype : 'requiredtextfield',
					id : this.id + 'emailAddress',
					fieldLabel : 'Email',
					labelWidth : 75,
					margin : "0 0 0 10",
					width : 300 
				}, 
				{
					id : this.id + 'phoneNumber',
					fieldLabel : 'Phone',
					xtype : 'textfield',
					labelWidth : 75,
					margin : "0 0 0 10",
					width : 220 
				}, 
				{
					id : this.id + 'faxNumber',
					fieldLabel : 'Fax',
					xtype : 'textfield',
					labelWidth : 75,
					margin : "0 0 0 10",
					width : 220 
				} ] },
				
				 {
					padding : 10,
					xtype : 'container',
					layout : 'hbox',
					border : false,
					items : [ {
						xtype : 'requiredtextfield',
						id : this.id + 'cardName',
						fieldLabel : 'Card Name',
						name : 'CardName',
						labelWidth : 150,
						margin : "0 0 0 10",
						width : 300 
					}, 
					{
						xtype : 'requiredtextfield',
						id : this.id + 'courierAccount',
						fieldLabel : 'Courier Account',
						margin : "0 0 0 30",
						labelWidth : 150,
						width : 300 
					}, 
					{
						xtype : 'requiredtextfield',
						id : this.id + 'courrierCompany',
						fieldLabel : 'Courier Company',
						margin : "0 0 0 30",
						labelWidth : 150,
						width : 300 
					}  ] },
					
					 {
						padding : 10,
						xtype : 'container',
						layout : 'hbox',
						border : false,
						items : [ {
							id : this.id + 'dewarAvgCustomsValue',
							fieldLabel : 'Average Custom Value',
							xtype : 'numberfield',
							margin : "0 0 0 10",
							minValue : 0,
							maxValue : 15,
							labelWidth : 150,
							width : 300 
					}, 
					{
							id : this.id + 'dewarAvgTransportValue',
							fieldLabel : 'Average Transport Value',
							xtype : 'numberfield',
							margin : "0 0 0 30",
							minValue : 0,
							maxValue : 15,
							labelWidth : 150,
							width : 300 
					}, 
					{
						id : this.id + 'billingReference',
						xtype : 'textfield',
						fieldLabel : 'Billing Reference',
						margin : "0 0 0 30",
						xtype : 'textfield',
						labelWidth : 150,
						width : 300 
					} ] }

		] });
	return this.personPanel;
};

AddressForm.prototype.getPackagePanel = function() {
	this.packagePanel = Ext.create('Ext.panel.Panel', {
		layout : 'hbox',
		items : [ {
			padding : 10,
			xtype : 'container',
			layout : 'vbox',
			border : false,
			items : [ {
				xtype : 'container',
				layout : 'hbox',
				items : [ 
					] 
			}, {
				xtype : 'container',
				layout : 'hbox',
				margin : "10 0 0 0",
				items : [ 

				] } ] } ] });
	return this.packagePanel;
};

AddressForm.prototype.getPanel = function() {
	this.panel = Ext.create('Ext.panel.Panel', {
		hidden : this.isHidden,
		layout : 'vbox',
		title : 'Shipping Address Card',
		cls : "border-grid",
		buttons : this.getToolBar(),
		icon : '../images/icon/ic_email_black_24dp.png',
		items : [  
		           this.getPersonPanel() 
		           ] });
	return this.panel;
};

AddressForm.prototype.save = function() {
	var _this = this;

	_this.panel.setLoading();
	var onSuccess = (function(sender) {
		_this.panel.setLoading(false);
		EXI.getDataAdapter().proposal.proposal.update();
	});
	EXI.getDataAdapter({onSuccess : onSuccess }).proposal.labcontacts.saveLabContact(_this.getAddress());
};

AddressForm.prototype.getToolBar = function() {
	var _this = this;
	return [ {
		text : 'Save',
		hidden : _this.isSaveButtonHidden,
		width : 100,
		handler : function() {
			_this.save();

		} } ];
};
