/**
 * Edit the information of a buffer
 * 
 * #onRemoveAdditive
 */
function BufferForm(args) {
	this.height = 500;
	this.width = 500;
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
	}

//	this.onSaved = new Event(this);
	this.onRemoveAdditive = new Event(this);
}

BufferForm.prototype.getBuffer = function() {
	this.buffer["name"] = Ext.getCmp("buffer_name").getValue();
	this.buffer["acronym"] = Ext.getCmp("buffer_acronym").getValue();
	this.buffer["comments"] = Ext.getCmp("buffer_comments").getValue();
	this.buffer["ph"] = Ext.getCmp("buffer_ph").getValue();
	this.buffer["composition"] = Ext.getCmp("buffer_composition").getValue();
	this.buffer["proposalId"] = Ext.getCmp("proposalIdCombo").getValue();
	return this.buffer;
};

BufferForm.prototype.load = function(buffer) {
	this.buffer = buffer;
	
	if (buffer != null){
		Ext.getCmp("buffer_name").setValue(this.buffer.name);
		Ext.getCmp("buffer_acronym").setValue(this.buffer.acronym);
		Ext.getCmp("buffer_comments").setValue(this.buffer.comments);
		Ext.getCmp("buffer_ph").setValue(this.buffer.ph);
		Ext.getCmp("buffer_composition").setValue(this.buffer.composition);
	}
	
		if (this.buffer != null){
			if (this.buffer.proposalId != null){
				Ext.getCmp("proposalIdCombo").setValue(this.buffer.proposalId);
				Ext.getCmp("proposalIdCombo").disable();
			}
		}
};

BufferForm.prototype._getTopPanel = function() {
	return {
		xtype : 'container',
		layout : 'hbox',
		border : 0,
		margin : '40 0 0 0',
		frame : true,
		items : [ {
			xtype : 'container',
			layout : 'hbox',
			items : [ {
				xtype : 'container',
				flex : 1,
				border : false,
				layout : 'anchor',
//				defaultType : 'textfield',
				items : [ {
					xtype: 'requiredtextfield',
					id : 'buffer_name',
					fieldLabel : 'Name',
					name : 'name',
					width : 300
//					value : this.buffer.name 
					}, {
						xtype: 'requiredtextfield',
					id : 'buffer_acronym',
					fieldLabel : 'Acronym',
					maskRe:/[a-zA-Z0-9]+/,
					name : 'acronym',
					width : 300
//					value : this.buffer.acronym
				} ] } ] }, {
			xtype : 'container',
			flex : 1,
			layout : 'anchor',
			defaultType : 'textfield',
			margin : '0 0 0 10',
			items : [ {
				id : 'buffer_ph',
				fieldLabel : 'pH',
				name : 'ph',
//				value : this.buffer.ph,
				xtype : 'numberfield',
				width : 300,
				minValue : 0,
				maxValue : 15 }, 
				
//				{
//					//					xtype : 'requiredtext',
//					xtype : 'Ext.Extended.SearchField',
//					id : 'buffer_composition',
//					fieldLabel : 'Composition',
//					name : 'composition',
//					width : 300
//				}
				{
//					              xtype: 'searchfield',
					              fieldLabel: 'Composition',
					              id : 'buffer_composition',
					              name: 'composition',
					              width : 300
					          }
				
				
				] } ] };
};

BufferForm.prototype.getPanel = function() {
	
	this.panel = Ext.createWidget({
		xtype : 'container',
		layout : 'vbox',
		height : this.height,
		width : this.width,
		style : {
			padding : '10px' },
		fieldDefaults : {
			labelAlign : 'left',
			labelWidth : 50

		},
		items : [ 
		           BIOSAXS_COMBOMANAGER.getComboProposal(), 
		          this._getTopPanel(), {
						id : 'buffer_comments',
						xtype : 'textareafield',
						name : 'comments',
						fieldLabel : 'Comments',
						width : '100%',
						height : 100
//						value : buffer.comments 
					}
		
		          ] 
		}
	);
	return this.panel;
};

BufferForm.prototype.input = function() {
	return {
		buffer : {
			"bufferId" : 422,
			"proposalId" : 10,
			"safetyLevelId" : null,
			"name" : "B1",
			"acronym" : "B1",
			"ph" : null,
			"composition" : null,
			"bufferhasadditive3VOs" : [],
			"comments" : null } };
};

BufferForm.prototype.test = function(targetId) {
	var bufferForm = new BufferForm();
	var panel = bufferForm.getPanel(bufferForm.input().buffer);
	panel.render(targetId);
};


