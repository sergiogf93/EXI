/**
 * @showTitle
 *
 * #onSaved
 * #onAddPlates
 * #onRemovePlates
 **/
function CaseForm(args) {
	this.width = 600;
	this.showTitle = true;
	if (args != null) {
		if (args.showTitle != null) {
			this.showTitle = args.showTitle;
		}
	}

	this.onSaved = new Event(this);
}

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
};

CaseForm.prototype.getDewar = function() {
	this.dewar.code = Ext.getCmp("dewar_code").getValue();
	this.dewar.comments = Ext.getCmp("dewar_comments").getValue();
	this.dewar.transportValue = Ext.getCmp("dewar_transportValue").getValue();
//	this.dewar.storageLocation = Ext.getCmp("dewar_storageLocation").getValue();
	this.dewar.storageLocation = this.storageLocationComboBox.getValue();
	//this.dewar.firstExperimentId = this.sessionsCombo.getValue();
	return this.dewar;
};

CaseForm.prototype.setDewar = function(dewar) {
	this.dewar = dewar;
	
	if (this.dewar == null){
		this.dewar={};
		this.dewar["code"] = "";
		this.dewar["transportValue"] = "";
		this.dewar["storageLocation"] = "";
		this.dewar["comments"] = "";
	}
	
	Ext.getCmp("dewar_code").setValue(this.dewar.code);
	Ext.getCmp("dewar_comments").setValue(this.dewar.comments);
	Ext.getCmp("dewar_transportValue").setValue(this.dewar.transportValue);
//	Ext.getCmp("dewar_storageLocation").setValue(this.dewar.storageLocation);
	this.storageLocationComboBox.setValue(this.dewar.storageLocation);
	/*if (this.dewar.sessionVO != null) {
		this.sessionsCombo.setValue(this.dewar.sessionVO.sessionId);
	}*/
};

/*
CaseForm.prototype.getSessionCombo = function() {
	this.sessionsCombo = BIOSAXS_COMBOMANAGER.getComboSessions(EXI.proposalManager.getFutureSessions(), {
		labelWidth : 200,
		margin : '5 0 00 0',
		width : 500
	});
	return this.sessionsCombo;
};*/

CaseForm.prototype.getStorageLocationCombo = function() {
	this.storageLocationComboBox =  BIOSAXS_COMBOMANAGER.getComboStorageTemperature();
	return this.storageLocationComboBox;
};

CaseForm.prototype.getPanel = function(dewar) {
		this.panel = Ext.create('Ext.form.Panel', {
			width : this.width - 10,
//			cls : 'border-grid',
//			margin : 10,
			padding : 10,
			height : 300,
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
						fieldLabel : 'Name',
						allowBlank : false,
						name : 'code',
						id : 'dewar_code',
						labelWidth : 200,
						width : 500
					}
					]
				}, 
				this.getStorageLocationCombo(),
//				{
//					xtype : 'requiredtextfield',
//					margin : '10 0 0 0',
//					width : 350,
//					labelWidth : 200,
//					fieldLabel : 'Storage Location',
//					id : 'dewar_storageLocation'
//				},
				{
					xtype : 'numberfield',
					width : 500,
					labelWidth : 200,
					margin : '10 0 0 0',
					fieldLabel : 'Transport Value',
					id : 'dewar_transportValue'
				},
				//this.getSessionCombo(),
				{
					xtype : 'textareafield',
					name : 'comments',
					fieldLabel : 'Comments',
					labelWidth : 200,
					width : 500,
					margin : '10 0 0 0',
					height : 100,
					id : 'dewar_comments'
				} ]
			} ]
		});
	this.refresh(dewar);
	return this.panel;
};
