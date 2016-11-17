/**
* This class containes name, description, samples spreadsheet and puck loyout for a given puck 
*
* @class PuckForm
* @constructor
**/
function PuckFormView(args) {
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
	
	//this.puckLayout = new PuckPanel({width : 150, tbar : false});
	this.containerSpreadSheet = new ContainerSpreadSheet({width : Ext.getBody().getWidth() - 100, height : 450});
	
	/*this.containerSpreadSheet.onModified.attach(function(sender, puck){
		
	});*/
	
	this.onRemoved = new Event(this);
	this.onSaved = new Event(this);
}

/** Loads a puck into the form **/
PuckFormView.prototype.load = function(containerId, shippingId) {
	var _this = this;
    this.shippingId = shippingId;
    this.containerId = containerId;
    this.containerSpreadSheet.setLoading(true);
	this.panel.setTitle("Shipment");

    var onSuccess = function(sender, puck){
        _this.puck = puck;
        if (puck != null){
            Ext.getCmp(_this.id + "puck_name").setValue(_this.puck.code);
            _this.capacityCombo.setValue(_this.puck.capacity);
            Ext.getCmp(_this.id + "puck_beamline").setValue(_this.puck.beamlineLocation);
            Ext.getCmp(_this.id + "puck_sampleChangerLocation").setValue(_this.puck.sampleChangerLocation);
            Ext.getCmp(_this.id + "puck_status").setValue(_this.puck.containerStatus);                
        }

        var onSuccess = function (sender, samples) {
            var withoutCollection = _.filter(samples,{DataCollectionGroup_dataCollectionGroupId : null});
            if (withoutCollection.length == samples.length) {
                Ext.getCmp(_this.id + "_save_button").enable();
            }
            if (samples.length > 0) {
                _this.containerSpreadSheet.setRenderCrystalFormColumn(true);
            } else {
                _this.containerSpreadSheet.setRenderCrystalFormColumn(false);
            }
            _this.containerSpreadSheet.load(puck);
            _this.containerSpreadSheet.setLoading(false);
			if (_this.containerSpreadSheet.renderCrystalFormColumn) {
				var rows = _this.containerSpreadSheet.parseTableData();
				var columnIndex = _.findIndex(_this.containerSpreadSheet.getHeader(),{id : "editCrystalForm"});
				for (var i = 0; i < rows.length; i++) {
					_this.containerSpreadSheet.spreadSheet.setDataAtCell(rows[i].location-1,columnIndex,_this.getEditCrystalFormLink(i));
				}
			}
        }

        EXI.getDataAdapter({onSuccess : onSuccess}).mx.sample.getSamplesByContainerId(_this.containerId);

    };

    EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.getContainerById(this.containerId,this.containerId,this.containerId);

};

PuckFormView.prototype.getPanel = function() {
	var _this =this;
	var capacityCombo = BIOSAXS_COMBOMANAGER.getComboPuckType({margin : '10 0 10 5', labelWidth : 100, width : 250});
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
							margin : '5 0 2 5',
							layout : 'hbox',
							items : [
										
										
								         {
								        	 xtype : 'container',
											margin : '12 0 2 0',
											layout : 'vbox',
											items : [ 
							         				   {
																xtype: 'requiredtextfield',
																id : this.id + 'puck_name',
																fieldLabel : 'Name',
																name : 'name',
																width : 250,
																margin : '0 0 0 5',
																labelWidth : 100
														},
														this.capacityCombo,
                                                        {
																xtype: 'textfield',
																id : this.id + 'puck_beamline',
																fieldLabel : 'Beamline',
																width : 250,
                                                                disabled : true,
																margin : '0 0 0 5',
																labelWidth : 100
														},
                                                        {
																xtype: 'textfield',
																id : this.id + 'puck_sampleChangerLocation',
																fieldLabel : '#Sample Changer',
																width : 250,
                                                                disabled : true,
																margin : '0 0 0 5',
																labelWidth : 100
														},                                                       
                                                        {
																xtype: 'textfield',
																id : this.id + 'puck_status',
																fieldLabel : 'Status',
																width : 250,
                                                                disabled : true,
																margin : '0 0 0 5',
																labelWidth : 100
														}
													]
								         },
                                         // this.puckLayout.getPanel()
							         ]
		         },
		         this.containerSpreadSheet.getPanel(),
                
	         ] 
		} 
	);
	return this.panel;
};

PuckFormView.prototype.getToolBar = function() {
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
                id: this.id + "_save_button",
	            width : 100,
	            height : 30,
				disabled : true,
	            handler : function(){
	            	_this.save();
	            }
	        },
			{
	            text: 'Return to shipment',
	            width : 200,
	            height : 30,
	            handler : function () {
                    _this.returnToShipment();
                }
	        }
	];
};

PuckFormView.prototype.removePuck = function() {
	var _this = this;
	this.panel.setLoading();
	var onSuccess = function(sender, data){
		_this.panel.setLoading(false);
        _this.returnToShipment();
        // _this.onRemoved.notify(containerId);
	};
	EXI.getDataAdapter({onSuccess: onSuccess}).proposal.shipping.removeContainerById(this.containerId,this.containerId,this.containerId );
	
};

PuckFormView.prototype.returnToShipment = function(){
    location.href = "#/shipping/" + this.shippingId + "/main";
}

PuckFormView.prototype.save = function() {
	var _this = this;
	this.panel.setLoading("Saving Puck");

	var puck = this.containerSpreadSheet.getPuck();
	/** Updating general parameters **/
	puck.code = Ext.getCmp(_this.id + 'puck_name').getValue();
	puck.capacity = _this.capacityCombo.getValue();
	
    var onError = function(sender, error){
		_this.panel.setLoading(false);
		EXI.setError(error.responseText);
	};
    
	var onSuccess = function(sender, puck){
		_this.panel.setLoading(false);
		_this.load(_this.containerId, _this.shippingId);
		// _this.onSaved.notify(puck);
        // _this.returnToShipment();
	};
	EXI.getDataAdapter({onSuccess : onSuccess, onError : onError}).proposal.shipping.saveContainer(this.containerId, this.containerId, this.containerId, puck);
};

PuckFormView.prototype.getEditCrystalFormLink = function (location) {
	var sampleId = this.puck.sampleVOs[location].blSampleId;
	return "<a href='#/shipping/" + this.shippingId + "/containerId/" + this.containerId + "/sampleId/" + sampleId + "/editCrystalForm'>Edit Crystal Form</a>";
}