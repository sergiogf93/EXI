/**
 * 
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
	
	this.puckLayout = new PuckLayout({width : 150, tbar : false});
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
		 this.puckLayout.load(puck);
		 this.puckLayout.render(puck);
	  }
	  catch(e){
		  console.log(e);
	  }
};

PuckForm.prototype.getToolBar = function() {
	var _this = this;
	return [
	        
			{
			    text: 'Remove',
			    width : 100,
			    height : 30,
			    cls : 'btn-red',
			    handler : function(){
			    	function showResult(result){
						if (result == "yes"){
							_this.removePuck();
							alert("Removed")
						}
			    	}
					  Ext.MessageBox.show({
				           title:'Remove',
				           msg: 'Removing a puck from this parcel will remove also its content. <br />Are you sure you want to continue?',
				           buttons: Ext.MessageBox.YESNO,
				           fn: showResult,
				           animateTarget: 'mb4',
				           icon: Ext.MessageBox.QUESTION
				       });
			    }
			},
	        "->",
	        {
	            text: 'Save',
	            width : 100,
	            height : 30,
	            handler : function(){
	            	_this.save();
	            }
	        }
	];
};

PuckForm.prototype.removePuck = function() {
	var _this = this;
	this.panel.setLoading();
	var onSuccess = function(sender, data){
		
	};
	var containerId = this.puck.containerId;
	EXI.getDataAdapter({onSuccess: onSuccess}).proposal.shipping.removeContainerById(containerId,containerId,containerId );
	
};

PuckForm.prototype.save = function() {
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


/**
 * When container type has changed from SPINE|| UNIPUCK || PLATE
 * 
 * We make the spreadsheet longer and the platelayout is rendered again
 */
PuckForm.prototype.containerTypeChanged = function(capacity) {
	this.puck.capacity = capacity;
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
	this.loadPlateLayout(this.puck);
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
		buttons : this.getToolBar(),
		items : [ 
		         {
							xtype : 'container',
							margin : '12 0 2 20',
							layout : 'hbox',
							items : [
										
										 this.puckLayout.getPanel(),
								         {
								        	 xtype : 'container',
											margin : '12 0 2 50',
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
	return this.panel;
};

