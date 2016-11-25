
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
	this.containersPanelHeight = 400;
	this.containersPanelWidth = this.width*9/12 - 30;
	this.containersParcelWidth = 2*this.containersPanelHeight*0.9/2 + 20;
	// this.containersParcelWidth = 2*this.containersPanelHeight*0.2 + 20;
	this.shippingId = 0;

	this.isSaveButtonHidden = false;
	this.isHidden = false;

	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
			this.containersPanelHeight = this.height*0.9;
			this.containersParcelWidth = 2*this.containersPanelHeight*0.9/2 + 20;
		}
		if (args.width != null) {
			this.width = args.width;
			this.containersPanelWidth = this.width*9/12 - 30;
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

ParcelPanel.prototype.load = function(dewar) {
	var _this = this;
	this.dewar = dewar;
	this.dewar.index = this.index;
	
	/** Loading the template **/
	var html = "";
	dust.render("parcel.panel.template", {id : this.id, height : this.height, width : this.width}, function(err, out){
		html = out;
	});
	
	/** Setting click listeners **/		
	$('#' + this.id).hide().html(html).fadeIn("fast");
	this.panel.doLayout();

	$("#" + this.id + "-edit-button").click(function () {
		_this.showCaseForm();
	});

	$("#" + this.id + "-print-button").click(function () {
		var dewarId = _this.dewar.dewarId;
		var url = EXI.getDataAdapter().proposal.shipping.getDewarLabelURL(dewarId, dewarId);
		location.href = url;
		return;
	});

	$("#" + this.id + "-add-button").click(function () {
		_this.showAddContainerForm();
	});

	this.containersPanel = Ext.create('Ext.panel.Panel', {
		id			: this.id + "-containers-panel",
		// layout      : 'hbox',
		cls 		: "border-grid",
		margin		: this.height*0.05 + ' 0 0 0',
		width       : this.containersPanelWidth,
		height    	: this.containersPanelHeight,
		autoScroll 	: false,
		items       : [],
		renderTo	: this.id + "-container-panel-div",
	});

	/** Set parameters **/
	this.renderShipmentParameters(dewar);

	/** Rendering pucks **/
	this.renderPucks(dewar);
};

ParcelPanel.prototype.renderShipmentParameters = function (dewar) {
	var html = "";
	dust.render("parcel.panel.parameter.table.template", {dewar : dewar, height : this.height}, function(err, out){
		html = out;
	});

	$('#' + this.id + "-parameters-div").hide().html(html).fadeIn("fast");
	if (dewar.comments != "" && dewar.comments != null) {
		$('#' + this.id + "-comments").hide().html("Comments: " + dewar.comments).fadeIn("fast");
		this.panel.setHeight(this.height + 20);
	} else {
		this.panel.setHeight(this.height);
	}
	this.panel.doLayout();
};

ParcelPanel.prototype.renderPucks = function (dewar) {
	var _this = this;
	
	if (dewar != null){
		if (dewar.containerVOs != null){

			this.containersPanel.removeAll();

			var maxNumberForRow = Math.floor(this.containersPanel.width/this.containersParcelWidth);
			var rows = Math.ceil(this.dewar.containerVOs.length/maxNumberForRow);
			var containerRows = [];
			for (var i = 0 ; i < rows ; i++) {
				var containerRow = Ext.create('Ext.panel.Panel', {
					layout      : 'hbox',
					// cls 		: "border-grid",
					// margin		: this.height*0.05 + ' 0 0 0',
					width       : this.containersPanelWidth,
					height    	: this.containersPanelHeight/rows,
					autoScroll 	: false,
					items       : []
				});
				containerRows.push(containerRow);
				this.containersPanel.insert(containerRow);
			}
			
			/** Sorting container by id **/
			dewar.containerVOs.sort(function(a, b){return a.containerId - b.containerId;});
			var containerPanelsMap = {};
			var containerIds = [];
			
			for (var i = 0; i< dewar.containerVOs.length; i++){
				var container = dewar.containerVOs[i];
				var containerParcelPanel = new ContainerParcelPanel({type : container.containerType, height : this.containersPanelHeight/rows, width : this.containersParcelWidth,containerId : container.containerId, shippingId : this.shippingId, capacity : container.capacity, code : container.code});
				containerParcelPanel.onContainerRemoved.attach(function (sender, containerId) {
					_.remove(_this.dewar.containerVOs, {containerId: containerId});
					_this.renderPucks(_this.dewar);
				});
				containerParcelPanel.onContainerSaved.attach(function (sender, containerVO) {
					_.remove(_this.dewar.containerVOs, {containerId: containerVO.containerId});
					_this.dewar.containerVOs.push(containerVO);
					_this.load(_this.dewar);
				});
				containerPanelsMap[container.containerId] = containerParcelPanel;
				containerIds.push(container.containerId);
				
				containerRows[Math.floor(i/maxNumberForRow)].insert(containerParcelPanel.getPanel());
			}
			
			/**  */
			var stockSolutions = EXI.proposalManager.getStockSolutionsByDewarId(dewar.dewarId);
			for (var i = 0; i< stockSolutions.length; i++){
					console.log(stockSolutions[i]);
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
}

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
			_this.renderPucks(_this.dewar);
		}
		var onError = function(sender,error) {
			EXI.setError(error.responseText);
			_this.renderPucks(_this.dewar);
		};
		
		EXI.getDataAdapter({onSuccess : onSaveSuccess, onError : onError}).proposal.shipping.saveContainer(_this.shippingId, _this.dewar.dewarId, container.containerId, container);		
	};
	
	// EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.saveContainer(this.shippingId, this.dewar.dewarId, containerId, puck)
	EXI.getDataAdapter({onSuccess : onSuccess}).proposal.shipping.addContainer(this.shippingId, this.dewar.dewarId, containerVO.containerType, containerVO.capacity);
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
						_this.load(_this.puck);
				}
			}
	    },
	    buttons : [ {
						text : 'Save',
						handler : function() {
							_this.onSavedClick.notify(caseForm.getDewar());
							window.close();
                            _this.renderShipmentParameters(_this.dewar);
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

	addContainerForm.onSave.attach(function(sender,container){
		_this.addContainerToDewar(container);
		_this.renderPucks(_this.dewar);
		window.close();
	})

	addContainerForm.onCancel.attach(function(sender){
		window.close();
	})

	var window = Ext.create('Ext.window.Window', {
	    title: 'Container',
	    height: 450,
	    width: 600,
	    modal : true,
	    layout: 'fit',
	    items: [
	            	addContainerForm.getPanel(_this.dewar)
	    ],
	});
	window.show();
};

ParcelPanel.prototype.getPanel = function() {
	this.panel = Ext.create("Ext.panel.Panel",{
		cls 		: "border-grid",
		margin 		: 10,
		height 		: this.height,
		width 		: this.width,
		autoScroll	: false,
		items :	[{
					html : '<div id="' + this.id + '"></div>',
					autoScroll : false,
					padding : this.padding,
					width : this.width
				}]
	});

	return this.panel;
};