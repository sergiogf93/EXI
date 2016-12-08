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
    this.type = "Puck";
    this.data = {puckType : "Unipuck", 
                mainRadius : this.height*0.9/2, 
                xMargin : this.width/2 - this.height*0.9/2, 
                yMargin : 2.5,
                code : "",
                enableMouseOver : true,
                enableClick : true,
                enableMainClick : true,
    };
    this.width = 2*this.data.mainRadius + 20;
    this.container = new ContainerWidget(this.data);

	if (args != null) {
        if (args.height != null) {
			this.height = args.height;
            this.data.mainRadius = this.height*0.9/2;
            this.width = 2*this.data.mainRadius + 20;
            this.data.xMargin = this.width/2 - this.data.mainRadius;
		}
        if (args.width != null) {
			this.width = args.width;
            this.data.xMargin = this.width/2 - this.data.mainRadius;
		}
        if (args.containerId != null) {
			this.containerId = args.containerId;
		}
        if (args.shippingId != null) {
			this.shippingId = args.shippingId;
		}
        if (args.code != null) {
            this.data.code = args.code;
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
    } else if (this.type == "StockSolution") {
        this.data.stockSolutionId = this.containerId;
        this.container= new StockSolutionContainer(this.data);
    }

    this.container.onClick.attach(function (sender, id) {
        var code = _this.data.code;
        if (code == "") {
            code = "-";
        }
        Ext.Msg.show({
            title: 'Container',
            msg: '<b>Code:</b> ' + code + "</br></br> Select one of the options below:",
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNOCANCEL,
            buttonText: {
                yes: 'Edit',
                no: 'Remove',
                cancel: 'Cancel'
            },
            multiline: false,
            fn: function(buttonValue, inputText, showConfig) {
                switch (buttonValue) {
                    case "yes":
                        if (_this.type == "StockSolution") {
                            location.href = "#/stocksolution/" + _this.containerId + "/main";                            
                        } else {
                            location.href = "#/shipping/" + _this.shippingId + "/containerId/" + _this.containerId + "/edit";                            
                        }
                        break;
                    case "no":
                        _this.removeButtonClicked();
                        break;
                }
            }
        });
    });

    var containerPanelHeight = 2*this.data.mainRadius + 5;

    this.containerPanel = Ext.create('Ext.panel.Panel', {
        // cls : 'border-grid',
        width : this.width,
        height : containerPanelHeight,
        items : [this.container.getPanel()]
	});

    this.panel = Ext.create('Ext.panel.Panel', {
        // cls : 'border-grid',
        width : this.width,
        height : this.height,
        items : [
                this.containerPanel,
                ]
	});

    // this.panel.on('boxready', function() {
    //     $("#" + _this.id + "-edit-button").click(function () {
    //         location.href = "#/shipping/" + _this.shippingId + "/containerId/" + _this.containerId + "/edit";
    //     });
    //     $("#" + _this.id + "-remove-button").click(function(){
    //         _this.removeButtonClicked();
    //     });
    // });

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
* Removes the puck from the database
*
* @class removePuck
* @return 
*/
ContainerParcelPanel.prototype.removePuck = function() {
    this.panel.setLoading();
    if (this.type == "StockSolution") {
        this.onContainerRemoved.notify(this.containerId);
    } else {
        var _this = this;
        var onSuccess = function(sender, data){
            _this.panel.setLoading(false);
            _this.onContainerRemoved.notify(_this.containerId);
        };
        var containerId = this.containerId;
        EXI.getDataAdapter({onSuccess: onSuccess}).proposal.shipping.removeContainerById(containerId,containerId,containerId );
    }
};

ContainerParcelPanel.prototype.removeButtonClicked = function () {
    var _this = this;
    function showResult(result){
        if (result == "yes"){
            _this.removePuck();							
        }
    }
    Ext.MessageBox.show({
        title:'Remove',
        msg: 'Removing a container from this parcel will remove also its content. <br />Are you sure you want to continue?',
        buttons: Ext.MessageBox.YESNO,
        fn: showResult,
        animateTarget: 'mb4',
        icon: Ext.MessageBox.QUESTION
    });
};