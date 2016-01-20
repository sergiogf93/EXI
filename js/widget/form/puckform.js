/**
 * Edit the information of a buffer
 * 
 * #onRemoveAdditive
 */
function PuckForm(args) {
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

	
	var _this = this;
	
	this.spineLayout = new Unipuck({width : 100});
	this.containerSpreadSheet = new ContainerSpreadSheet({width : 1300});
	
	this.containerSpreadSheet.onModified.attach(function(sender, puck){
		_this.loadPlateLayout(puck);
	});
	
	this.onSaved = new Event(this);
}

/** Loads a puck into the form **/
PuckForm.prototype.load = function(puck, shippingId) {
	var _this = this;
	this.puck = puck;
	if (puck != null){
		Ext.getCmp(this.id + "puck_name").setValue(this.puck.code);
		this.capacityCombo.setValue(this.puck.capacity);
	}
	this.containerSpreadSheet.load(puck);
    this.loadPlateLayout(puck);
};


PuckForm.prototype.loadPlateLayout = function(puck) {
	 try{
		 var containerId = this.spineLayout.id ;
		 if ( this.capacityCombo.getValue() == 16){
				this.spineLayout = new Unipuck({height: 100});
				
			}
			else{
				
				this.spineLayout = new Spine({height: 100});
			}
		  this.spineLayout.id = containerId;
		  this.spineLayout.load(puck);
		  this.spineLayout.render(puck);
	  }
	  catch(e){
		  console.log(e);
	  }
};

PuckForm.prototype.getToolBar = function() {
	var _this = this;
	return [
	        "->",
	        {
	            text: 'Save',
	            width : 100,
	            handler : function(){
	            	_this.save();
	            }
	        }
	];
};


PuckForm.prototype.save = function(sample) {
	var _this = this;
	this.panel.setLoading("Saving Puck");

	var puck = this.containerSpreadSheet.getPuck();
	/** Updating general parameters **/
	puck.code = Ext.getCmp(_this.id + 'puck_name').getValue();
	puck.capacity = _this.capacityCombo.getValue();
	
	var onSuccess = function(sender, puck){
		_this.panel.setLoading(false);
		_this.load(puck);
		_this.onSaved.notify();
	};
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.saveContainer(this.puck.containerId, this.puck.containerId, this.puck.containerId, puck);
};

/*
PuckForm.prototype.checkMandatoryFields = function(sample) {
	var mandatoryFields = ["Sample Name", "Protein Acronym", "Experiment Type", "Unit cell A", "Unit cell B","Unit cell C","Unit cell Alpha","Unit cell Beta","Unit cell Gamma"];
	for (var j = 0; j < mandatoryFields.length; j++) {
		if (sample[mandatoryFields[j]] === "" || (sample[mandatoryFields[j]] == null)){
			return mandatoryFields[j];
		}
	}
	return true;
};

PuckForm.prototype.checkData = function(samples) {
	for (var i = 0; i < samples.length; i++) {
		var sample = samples[i];
		if (sample["Protein Acronym"] != null){
			if ((sample["Protein Acronym"] != "")){
				var checked = this.checkMandatoryFields(sample);
				if (checked != true){
					BUI.showError("For sample #" + (i+1) +" there is missing column " + checked);
				}
			}
		}
	}
	return true;
};*/


PuckForm.prototype.containerTypeChanged = function(capacity) {
	var data = this.containerSpreadSheet.spreadSheet.getData();
	if (data.length < capacity){
		for (var i = data.length; i<= capacity; i++){
			data.push([i]);
		}
	}
	else{
		data = data.slice(0, capacity);
	}
	this.containerSpreadSheet.spreadSheet.loadData(data);
};

PuckForm.prototype.getPanel = function() {
	var _this =this;
	var capacityCombo = BIOSAXS_COMBOMANAGER.getComboPuckType({margin : '10 0 10 20', labelWidth : 100, width : 300});
	capacityCombo.on('select', function(capacityCombo, record){
		var capacity = record[0].data.value;
		_this.containerTypeChanged(capacity);
	});
	
	this.capacityCombo = capacityCombo;
	this.panel = Ext.create('Ext.panel.Panel', {
		layout : 'vbox',
		buttons : this.getToolBar(),
		items : [ 
		       
		         {
							xtype : 'container',
							margin : '12 0 2 20',
							layout : 'hbox',
							items : [
							         this.spineLayout.getPanel(),
								         {
								        	 xtype : 'container',
											margin : '12 0 2 2',
											layout : 'vbox',
											items : [ 
							         				   {
																xtype: 'requiredtextfield',
																id : this.id + 'puck_name',
																fieldLabel : 'Name',
																name : 'name',
																width : 300,
																margin : '0 0 0 20',
																labelWidth : 100
														},
														this.capacityCombo
													]
								         }
							         ]
		         },
		         this.containerSpreadSheet.getPanel()
	         ] 
		} 
	);
	
	this.panel.on("afterlayout", function(){
	});
	return this.panel;
};

