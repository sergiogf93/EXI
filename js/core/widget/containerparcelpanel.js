/**
* Renders a panel that contains a puck widget and two buttons
*
* @class ContainerParcelPanel
* @constructor
*/
function ContainerParcelPanel(args) {
    this.id = BUI.id();
    var factor = 0.2; //to calculate the radius in relation to the height of the panel
    this.height = 220;
    this.containerId = 0;
    this.shippingId = 0;
    this.withoutCollection = true;
    this.code = "";
    this.type = "Puck";
    this.data = {puckType : "Unipuck", 
                mainRadius : this.height*factor, 
                xMargin : this.width/2 - this.height*factor, 
                yMargin : 2.5, 
                enableMouseOver : true
    };
    this.width = 2*this.data.mainRadius + 20;

	if (args != null) {
        if (args.height != null) {
			this.height = args.height;
            this.data.mainRadius = this.height*factor;
            this.width = 2*this.data.mainRadius + 20;
            this.data.xMargin = this.width/2 - this.data.mainRadius;
		}
        if (args.width != null) {
			this.width = args.width;
		}
        if (args.containerId != null) {
			this.containerId = args.containerId;
		}
        if (args.shippingId != null) {
			this.shippingId = args.shippingId;
		}
        if (args.code != null) {
			this.code = args.code;
		}
        if (args.type != null) {
			this.type = args.type;
		}
        if (args.capacity != null) {
			if (args.capacity != 16) {
                this.data.puckType = "Spinepuck";
            }
		}
	}
    
    this.onContainerRemoved = new Event(this);
    this.onContainerSaved = new Event(this);
	
};

/**
* Returns the panel containing the container and the buttons
*
* @class load
* @return The panel containing the container and the buttons
*/
ContainerParcelPanel.prototype.getPanel = function () {
    var _this = this;
    this.container = new ContainerWidget(this.data);
    if (this.type == "Puck"){
        this.container = new PuckWidgetContainer(this.data);
    }

    var containerPanelHeight = 2*this.data.mainRadius + 5;

    this.containerPanel = Ext.create('Ext.panel.Panel', {
        width : this.width,
        height : containerPanelHeight,
        items : [this.container.getPanel()]
	});

    this.panel = Ext.create('Ext.panel.Panel', {
        // cls : 'border-grid',
        width : this.width,
        height : this.height,
        items : [{
                    html : this.getCodeHeader(),
                    margin : 5,
                    height : (this.height - containerPanelHeight)/4,
                    x : this.data.mainRadius/5
                },
                this.containerPanel,
                // this.getButtons()
                {
                    html : this.getButtons(),
                    margin : 5,
                    height : (this.height - containerPanelHeight)/2,
                    x : this.data.mainRadius/5
                }
                ]
	});

    this.panel.on('boxready', function() {
        $("#" + _this.id + "-edit-button").click(function () {
            location.href = "#/shipping/" + _this.shippingId + "/containerId/" + _this.containerId + "/edit";
        });
        $("#" + _this.id + "-remove-button").click(function(){
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
        });
    });

    return this.panel;
};

/**
* Loads the container with the given samples
*
* @class load
* @return
*/
ContainerParcelPanel.prototype.load = function (samples) {
    this.containerPanel.removeAll();
    this.containerPanel.add(this.container.getPanel());
    if (samples.length > 0){
        this.container.loadSamples(samples);
        this.containerId = this.container.containerId;
        // this.shippingId = samples[0].Shipping_shippingId;
    }
    var withoutCollection = _.filter(samples,{DataCollectionGroup_dataCollectionGroupId : null});
    if (withoutCollection.length < samples.length) {
        this.withoutCollection = false;
    }
};

/**
* Returns a panel with the buttons
*
* @class getCodeHeader
* @return The html of the code header
*/
ContainerParcelPanel.prototype.getCodeHeader = function () {
    var templateData = {info : [{
                                    text : 'Code:',
                                    value : this.code,
                                    textSize : this.height*0.07
                                }]
    }
    var html = "";
    dust.render("info.grid.template", templateData, function(err, out){
		html = out;
	});
    return html;
};


/**
* Returns a panel with the buttons
*
* @class getButtons
* @return A panel with the buttons
*/
ContainerParcelPanel.prototype.getButtons = function () {
    var _this = this;

    var html = "";
    dust.render("container.parcel.buttons.template", {id : this.id}, function(err, out){
		html = out;
	});
    return html;

    // this.buttons = Ext.create('Ext.panel.Panel', {
    //     layout: {
    //         type: 'hbox',
    //         align: 'middle',
    //         pack: 'center'
    //     },
    //     width : this.width,
    //     items : [
    //             {
    //             xtype: 'button',
    //             margin : 5,
    //             cls:'btn-xs',
    //             // icon : '../images/icon/edit.png',
    //             handler : function(widget, e) {
    //                 location.href = "#/shipping/" + _this.shippingId + "/containerId/" + _this.containerId + "/edit"
    //             }
    //         },{
    //             xtype: 'button',
    //             margin : 5,
    //             cls:'btn-remove btn-xs',
    //             // icon : '../images/icon/ic_highlight_remove_black_24dp.png',
    //             handler: function(){
	// 		    	function showResult(result){
	// 					if (result == "yes"){
	// 						_this.removePuck();							
	// 					}
	// 		    	}
	// 				  Ext.MessageBox.show({
	// 			           title:'Remove',
	// 			           msg: 'Removing a puck from this parcel will remove also its content. <br />Are you sure you want to continue?',
	// 			           buttons: Ext.MessageBox.YESNO,
	// 			           fn: showResult,
	// 			           animateTarget: 'mb4',
	// 			           icon: Ext.MessageBox.QUESTION
	// 			       });
	// 		    }
    //         }
    //     ]
	// });

    // return this.buttons;
};

/**
* Removes the puck from the database
*
* @class removePuck
* @return 
*/
ContainerParcelPanel.prototype.removePuck = function() {
	var _this = this;
	this.panel.setLoading();
	var onSuccess = function(sender, data){
		_this.panel.setLoading(false);
        _this.onContainerRemoved.notify(_this.containerId);
	};
	var containerId = this.containerId;
	EXI.getDataAdapter({onSuccess: onSuccess}).proposal.shipping.removeContainerById(containerId,containerId,containerId );
	
};