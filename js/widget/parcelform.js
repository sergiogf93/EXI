/**
 * Edit the information of a buffer
 * 
 * #onRemoveAdditive
 */
function ParcelForm(args) {
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
	}
}

ParcelForm.prototype.render = function() {
	var dewar = this.dewar;
	for (var i = 0; i< dewar.containerVOs.length; i++){
		var container = dewar.containerVOs[i];
		if (container.capacity == 16){
			var unipuck = new Unipuck({height : 150});
			this.panel.insert(unipuck.getPanel());
			unipuck.load(container);
		}
		if (container.capacity == 10){
			var spine = new Spine({height : 150});
			this.panel.insert(spine.getPanel());
			spine.load(container);
		}
	}
};

ParcelForm.prototype.load = function(dewar) {
	this.dewar = dewar;
	
};
ParcelForm.prototype._getTopButtons = function() {
	var _this = this;
	var actions = [];

	actions.push(Ext.create('Ext.Action', {
		icon : '../images/icon/edit.png',
		text : 'Edit',
		disabled : false,
		handler : function(widget, event) {
			_this.edit();
		}
	}));
	
	actions.push(Ext.create('Ext.Action', {
		icon : '../images/print.png',
		text : 'Print Labels',
		disabled : false,
		handler : function(widget, event) {
			_this.edit();
		}
	}));
	
	
	actions.push(Ext.create('Ext.Action', {
		icon : '../images/icon/add.png',
		text : 'Add puck',
		disabled : false,
		handler : function(widget, event) {
			_this.edit();
		}
	}));
	

	return actions;
};

ParcelForm.prototype.getPanel = function() {
	var _this = this;
	
	this.panel = Ext.create('Ext.panel.Panel', {
		layout : 'hbox',
		cls : "border-grid",
		margin : 10,
		height : this.height,
		items : [ ],
		listeners : {
			afterrender : function(component, eOpts) {
						_this.render();
			}
	    },
		toolbar : [ {
				text : 'Save',
				handler : function() {
					var adapter = new DataAdapter();
					_this.panel.setLoading();
					var dewar = caseForm.getDewar();
					var onSuccess = (function(sender, shipment) {
						_this.load(shipment);
						window.close();
						_this.panel.setLoading(false);
					});
					dewar["sessionId"] = dewar.firstExperimentId;
					dewar["shippingId"] = _this.shipment.shippingId;
					EXI.getDataAdapter({onSuccess : onSuccess}).proposal.dewar.saveDewar(_this.shipment.shippingId, dewar);
				}
			}, {
				text : 'Cancel',
				handler : function() {
					window.close();
				}
			}]
	});
	
	this.panel.addDocked({
		height : 45,
		xtype : 'toolbar',
		items : _this._getTopButtons(),
		cls : 'exi-top-bar'
	});
	
	
	return this.panel;
};
