function OtherContainerForm(args) {
    this.id = BUI.id();
    var _this = this;

    this.width = 1500;
    this.height = 600;
    this.container = {};
	if (args != null) {
        if (args.width != null) {
			this.width = args.width;
		}
        if (args.height != null) {
			this.height = args.height;
		}
	}

    this.containerSpreadSheet = new GenericContainerSpreadSheet({width : this.width - 50, height : this.height - 300});

    this.onSave = new Event(this);
    this.onCancel = new Event(this);
}

OtherContainerForm.prototype.load = function (container) {
    if (container) {
        // var _this = this;
        this.container = container;
        if (!this.container.samples) {
            this.container.samples = [];
        }
        if (!this.container.capacity) {
            this.container.capacity = container.samples.length;
        }
        
        Ext.getCmp(this.id + "container_name").setValue(container.code);
        Ext.getCmp(this.id + "capacity").setValue(this.container.capacity);
        this.containerSpreadSheet.load(this.container);
        this.panel.doLayout();
        // this.panel.setLoading(true);
        // var onSuccess = function (sender, samples) {
        //     if (samples) {
        //         _this.container.capacity = samples.length;
        //         _this.container.samples = samples;
        //         _this.containerSpreadSheet.load(_this.container);
        //         _this.panel.doLayout();
        //         _this.panel.setLoading(false);
        //     }
        // }
        // EXI.getDataAdapter({onSuccess : onSuccess}).mx.sample.getSamplesByContainerId(container.containerId);
    }
}

OtherContainerForm.prototype.getPanel = function() {
    var _this = this;

    this.panel = Ext.create('Ext.form.Panel', {
        // width : this.width - 10,
        // height : this.height,
//			cls : 'border-grid',
//			margin : 10,
        autoScroll 	: true,
        buttons : this.getButtons(),
        items : [
                {
							xtype : 'container',
							margin : '5 0 2 5',
							layout : 'hbox',
							items : [
										
										
								         {
								        	 xtype : 'container',
											margin : '12 0 2 0',
											layout : 'hbox',
											items : [ 
							         				   {
																xtype: 'requiredtextfield',
																id : this.id + 'container_name',
																fieldLabel : 'Name',
																name : 'name',
																width : 250,
																margin : '5 5 5 5',
																labelWidth : 100
														},
                                                        {
																xtype: 'numberfield',
																id : this.id + 'capacity',
																fieldLabel : 'Capacity',
																width : 250,
                                                                disabled : false,
																margin : '5 5 5 10',
																labelWidth : 100,
                                                                minValue: 0,
                                                                listeners: {
                                                                    'change': function(el, newValue, oldValue){
                                                                                    _this.panel.setLoading(true);
                                                                                    _this.containerSpreadSheet.updateNumberOfRows(newValue);
                                                                                    _this.panel.setLoading(false);
                                                                                }
														        }
                                                        }
                                            ]   
                                         }
                            ]
                },
                    this.containerSpreadSheet.getPanel()
                ]
    });
	return this.panel;
};

OtherContainerForm.prototype.getButtons = function () {
    var _this = this;
    return [ {
                text : 'Save',
                id : this.id + "-save-button",
                handler : function() {
                    _this.save();
                }
            }, {
                text : 'Cancel',
                handler : function() {
                    _this.onCancel.notify();
                }
            } ]
}

OtherContainerForm.prototype.getContainer = function () {
    this.container.code = Ext.getCmp(this.id + "container_code").getValue();
    this.container.containerType = "OTHER";
    this.container.capacity = this.container.samples.length;    
    return this.container;
}

OtherContainerForm.prototype.save = function() {
	var _this = this;
	this.panel.setLoading("Saving Puck");
    
	var puck = this.containerSpreadSheet.getPuck();

	/** Updating general parameters **/
	puck.code = Ext.getCmp(_this.id + 'container_name').getValue();
	puck.capacity = Ext.getCmp(_this.id + 'capacity').getValue();
	puck.containerType = "OTHER";
    puck.containerId = this.container.containerId;
	
    var onError = function(sender, error){
		_this.panel.setLoading(false);
		EXI.setError(error.responseText);
	};
    
	var onSuccess = function(sender){
		_this.panel.setLoading(false);
        _this.onSave.notify(puck);
	};
    
	EXI.getDataAdapter({onSuccess : onSuccess, onError : onError}).proposal.shipping.saveContainer(this.container.containerId, this.container.containerId, this.container.containerId, puck);
};