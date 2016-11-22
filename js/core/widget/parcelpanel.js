
/**
* This is a form  for parcels. It includes all items includes in a parcel. Include pucks
*
* @class ParcelPanel
* @constructor
*/
function ParcelPanel(args) {
	this.id = BUI.id();
	this.height = 500;
	this.width = 500;
	this.index = 0;
	this.containersPanelHeight = 200;
	this.shippingId = 0;

	this.isSaveButtonHidden = false;
	this.isHidden = false;

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
		if (args.width != null) {
			this.width = args.width;
		}
		if (args.index != null) {
			this.index = args.index;
		}
		if (args.shippingId != null) {
			this.shippingId = args.shippingId;
		}
	}
	
	this.onSavedClick = new Event(this);
}

/**
* It inserts a panel into the this.panel with the template parcelformsummary
*
* @method addHeaderPanel
*/
ParcelPanel.prototype.addHeaderPanel = function() {
	var html = "No information";
	dust.render("parcel.header.shipping.template", this.dewar, function(err, out){
		html = out;
    });
    
	this.panel.add(0,
				{
					// cls : 'border-grid',
					xtype 	: 'container',
					// width	: this.width - 50,
					border : 1,
					padding : 1,
					items : {
						xtype : 'container',
						layout : 'hbox',
						items : _.concat(this._getTopButtons(),
											{html : html, margin : 12})
					}
				}
	);
};

ParcelPanel.prototype.render = function() {
    var _this = this;

	var dewar = this.dewar;
	this.panel.removeAll();
	this.addHeaderPanel();
	
	if (dewar != null){
		if (dewar.containerVOs != null){

            var containersPanel = Ext.create('Ext.panel.Panel', {
                layout      : 'hbox',
                cls 		: "border-grid",
                margin		: '0 0 0 6px',
                width       : this.width - 15,
				height    	: this.containersPanelHeight + 20,
                autoScroll 	: true,
                items       : []
            });

            this.panel.add(containersPanel);
			/** Sorting container by id **/
			dewar.containerVOs.sort(function(a, b){return a.containerId - b.containerId;});
            var containerPanelsMap = {};
            var containerIds = [];
            
			for (var i = 0; i< dewar.containerVOs.length; i++){
				var container = dewar.containerVOs[i];
                var containerParcelPanel = new ContainerParcelPanel({type : container.containerType, height : this.containersPanelHeight , containerId : container.containerId, shippingId : this.shippingId, capacity : container.capacity, code : container.code});
                containerParcelPanel.onContainerRemoved.attach(function (sender, containerId) {
                    _.remove(_this.dewar.containerVOs, {containerId: containerId});
                    _this.load(_this.dewar);
                });
                containerParcelPanel.onContainerSaved.attach(function (sender, containerVO) {
                    _.remove(_this.dewar.containerVOs, {containerId: containerVO.containerId});
                    _this.dewar.containerVOs.push(containerVO);
                    _this.load(_this.dewar);
                });
                containerPanelsMap[container.containerId] = containerParcelPanel;
                containerIds.push(container.containerId);
                containersPanel.insert(containerParcelPanel.getPanel());
			}
            
            if (!_.isEmpty(containerPanelsMap)) {
                
                var onSuccess = function (sender, samples) {
                    if (samples) {
                        var samplesMap = {};
                        for (var i = 0 ; i < samples.length ; i++) {
                            var sample = samples[i];
                            if (samplesMap[sample.Container_containerId]){
                                samplesMap[sample.Container_containerId].push(sample);
                            } else {
                                samplesMap[sample.Container_containerId] = [sample];
                            }
                        }
                        _.each(samplesMap, function(samples, containerId) {
                            containerPanelsMap[containerId].load(samples);
                        });
                    }
                }

                EXI.getDataAdapter({onSuccess : onSuccess}).mx.sample.getSamplesByContainerId(containerIds);
            }
		}
	}
};

ParcelPanel.prototype.load = function(dewar) {
	this.dewar = dewar;
	try {
		/** Rendering pucks **/
		this.dewar.index = this.index;
		var html = "";
		dust.render("parcel.panel.template", {dewar : this.dewar, height : this.height, width : this.width}, function(err, out){
			html = out;
		});
		
		$('#' + this.id).hide().html(html).fadeIn('fast');
		this.panel.doLayout();
	}
	catch(e){
		console.log(e);
	}
};

/**
* It inserts a new container into the dewar and reloads the widget
*
* @method addContainerToDewar
*/
ParcelPanel.prototype.addContainerToDewar = function(containerVO) {
	var _this = this;
	
	var onSuccess = function(sender, container){
		container.code = containerVO.code;
		_this.dewar.containerVOs.push(container);
		
		var onSaveSuccess = function (sender) {
			_this.load(_this.dewar);
		}
		var onError = function(sender,error) {
			EXI.setError(error.responseText);
			_this.load(_this.dewar);
		};
		
		EXI.getDataAdapter({onSuccess : onSaveSuccess, onError : onError}).proposal.shipping.saveContainer(_this.shippingId, _this.dewar.dewarId, container.containerId, container);		
	};
	
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.addContainer(this.shippingId, this.dewar.dewarId, containerVO.type, containerVO.capacity);
};

/**
* It displays a window with a case form
*
* @method showCaseForm
*/
ParcelPanel.prototype.showCaseForm = function() {
	var _this = this;
	/** Opens a window with the cas form **/
	var caseForm = new CaseForm();
	var window = Ext.create('Ext.window.Window', {
	    title: 'Parcel',
	    height: 450,
	    width: 600,
	    modal : true,
	    layout: 'fit',
	    items: [
	            	caseForm.getPanel(_this.dewar)
	    ],
	    listeners : {
			afterrender : function(component, eOpts) {
				if (_this.puck != null){
						_this.render(_this.puck);
				}
			}
	    },
	    buttons : [ {
						text : 'Save',
						handler : function() {
							_this.onSavedClick.notify(caseForm.getDewar());
                            _this.render();
							window.close();
						}
					}, {
						text : 'Cancel',
						handler : function() {
							window.close();
						}
					} ]
	});
	window.show();
};

/**
* It displays a window with an adding container form
*
* @method showAddContainerForm
*/
ParcelPanel.prototype.showAddContainerForm = function() {
	var _this = this;
	/** Opens a window with the cas form **/
	var addContainerForm = new AddContainerForm();
	var window = Ext.create('Ext.window.Window', {
	    title: 'Container',
	    height: 450,
	    width: 600,
	    modal : true,
	    layout: 'fit',
	    items: [
	            	addContainerForm.getPanel(_this.dewar)
	    ],
	    buttons : [ {
						text : 'Save',
						handler : function() {
							_this.addContainerToDewar(addContainerForm.getContainer());
							_this.render();
							window.close();
						}
					}, {
						text : 'Cancel',
						handler : function() {
							window.close();
						}
					} ]
	});
	window.show();
};

ParcelPanel.prototype._getTopButtons = function() {
	var _this = this;
	var actions = [];
	
	
	// actions.push(this.code);
	// actions.push(this.status);
	// actions.push(this.storageCondition);
	
	actions.push(Ext.create('Ext.Button', {
		icon : '../images/icon/edit.png',
		text : 'Edit',
		cls : 'x-btn x-unselectable x-box-item x-toolbar-item x-btn-default-toolbar-small x-icon-text-left x-btn-icon-text-left x-btn-default-toolbar-small-icon-text-left',
		margin : 5,
		disabled : false,
		handler : function(widget, event) {
					_this.showCaseForm();
		}
	}));
	
	actions.push(Ext.create('Ext.Button', {
		icon : '../images/print.png',
		text : 'Print Labels',
		cls : 'x-btn x-unselectable x-box-item x-toolbar-item x-btn-default-toolbar-small x-icon-text-left x-btn-icon-text-left x-btn-default-toolbar-small-icon-text-left',
		margin : 5,
		disabled : false,
		handler : function(widget, event) {
			var dewarId = _this.dewar.dewarId;
			var url = EXI.getDataAdapter().proposal.shipping.getDewarLabelURL(dewarId, dewarId);
			location.href = url;
			return;
		}
	}));
	
	actions.push(Ext.create('Ext.Button', {
		icon : '../images/icon/add.png',
		text : 'Add container',
		cls : 'x-btn x-unselectable x-box-item x-toolbar-item x-btn-default-toolbar-small x-icon-text-left x-btn-icon-text-left x-btn-default-toolbar-small-icon-text-left',
		margin : 5,
		disabled : false,
		handler : function(widget, event) {
			// _this.addContainerToDewar();
			_this.showAddContainerForm();
		}
	}));
	
	return actions;
};


ParcelPanel.prototype.getPanel = function() {
	this.panel = Ext.create("Ext.panel.Panel",{
		cls 		: "border-grid",
		margin 		: 10,
		height 		: this.height,
		width 		: this.width,
		autoScroll	: true,
		items :	[{
					html : '<div id="' + this.id + '"></div>',
					autoScroll : false,
					padding : this.padding,
					width : this.width
				}]
	});

	return this.panel;
};
