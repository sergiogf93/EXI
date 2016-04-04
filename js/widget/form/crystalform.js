/**
 * Edit the information of a buffer
 * 
 * #onRemoveAdditive
 */
function CrystalForm(args) {
	this.id = BUI.id();
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

}

CrystalForm.prototype.getCrystal = function() {
	
	this.crystal["acronym"] = Ext.getCmp(this.id + "buffer_acronym").getValue();
	
	return this.crystal;
};

CrystalForm.prototype.getCrystalsForAcronym = function() {
	
	return EXI.proposalManager.getCrystals(this.crystal.proteinVO.acronym);
};

CrystalForm.prototype.getSamplesForCrystalForm= function() {
	
	return EXI.proposalManager.getSamplesForCrystalForm(this.crystal.crystalId);
};

CrystalForm.prototype.getSpaceGroupGrid = function() {
	
	this.store = Ext.create('Ext.data.Store', {
		fields:['spaceGroup', 'crystalId'],
		data:[]
	});

	this.grid =  Ext.create('Ext.grid.Panel', {
		store: this.store,
		title : 'Space Group',
		cls : 'border-grid',
		margin : '20 0 0 40',
		columns: [
			{ text: 'Name',  dataIndex: 'spaceGroup', flex : 1 },
			{ text: 'Name',  dataIndex: 'crystalId', flex : 1 }
		],
		height: 200,
		width: 400
	});
	
	 this.grid.on('selectionchange', function(view, elements){
    		console.log(elements);
	    });
	
	return this.grid;
};


CrystalForm.prototype.load = function(crystal) {
	
	this.crystal = crystal;
	
	
	this.store.loadData(this.getCrystalsForAcronym());
	
	if (crystal != null){
		Ext.getCmp(this.id + "acronym").setValue(this.crystal.proteinVO.acronym);
		Ext.getCmp(this.id + "spaceGroup").setValue(this.crystal.spaceGroup);
	}
};

CrystalForm.prototype.getProteinCombo = function() {
	this.proteinCombo = MX_COMBOMANAGER.getComboProteins(EXI.proposalManager.getProteins(), {
		labelWidth : 100,
		margin : '0 0 10 40',
		width : 300

	});
	return this.proteinCombo;
};

CrystalForm.prototype.getToolBar = function() {
	var _this = this;
	return [
	        {
	            text: 'Save',
	            width : 100,
	            handler : function(){
	            	/*_this.panel.setLoading();
	            	var onSuccess = (function(sender){
	            		_this.panel.setLoading(false);
	            		EXI.getDataAdapter().proposal.proposal.update();
	            	});
	            	EXI.getDataAdapter({ onSuccess : onSuccess}).saxs.buffer.saveBuffer(_this.getBuffer());*/
					alert("save");
	            }
	        }
	];
};

CrystalForm.prototype.getPanel = function() {
	var _this =this;
	this.panel = Ext.create('Ext.panel.Panel', {
		layout : 'vbox',
		height : this.height,
		buttons : this.getToolBar(),
		cls : 'border-grid',
		items : [ 
					{
						xtype: 'requiredtextfield',
						id : this.id + 'acronym',
						fieldLabel : 'Acronym',
						margin : '10 10 20 40',
						maskRe:/[a-zA-Z0-9]+/,
						name : 'acronym',
						width : 300
					},{
						xtype: 'requiredtextfield',
						id : this.id + 'spaceGroup',
						fieldLabel : 'Space Group',
						margin : '10 10 20 40',
						maskRe:/[a-zA-Z0-9]+/,
						name : 'spaceGroup',
						width : 300
					},
					this.getProteinCombo(),
					this.getSpaceGroupGrid()
		
				] 
		}
	);
	return this.panel;
};

