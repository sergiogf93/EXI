function PrepareMainViewTest() {
	this.icon = '../images/icon/contacts.png';
	this.queueGridList = [];

	MainView.call(this);
    
    var _this = this;
    
    this.dewarListSelector = new DewarListSelectorGridTest({height : 600});
    this.loadShipmentView = new LoadShipmentView();
    this.confirmShipmentView = new ConfirmShipmentView();

    this.dewarListSelector.onSelect.attach(function(sender, dewar){                       
            if (dewar.shippingStatus == "processing"){
                _this.updateStatus(dewar.shippingId, "at_ESRF");
            } 
            if (dewar.shippingStatus != "processing"){
                _this.updateStatus(dewar.shippingId, "processing");
            }      
     });
     
    this.dewarListSelector.onSelectionChange.attach(function(sender, dewars){
    });
    
    this.currentStep = 1;
    if (typeof(Storage) != "undefined") {
        if (sessionStorage.getItem('currentStep')) {
            this.currentStep = sessionStorage.getItem('currentStep');
        }
    }
    

    this.selectedContainerId = null;
    this.selectedContainerCapacity = null;
    this.selectedPuck = null;
    this.sampleChangerName = null;

    this.loadShipmentView.onSampleChangerSelected.attach(function(sender,changerName){
        $('#next-button').attr("disabled", false);
        _this.sampleChangerName = changerName;
        _this.save('sampleChangerName', changerName);
        if (typeof(Storage) != "undefined") {
            sessionStorage.removeItem('puckData');
        }
    });

    this.loadShipmentView.onSelectRow.attach(function(sender, row){
        if (row) {
            if (_this.selectedContainerId) {
                if (_this.selectedContainerId == row.get('containerId')){
                    _this.deselectRow();
                } else {
                    _this.deselectRow();
                    _this.setSelectedRow(row);
                }
            } else {
                _this.setSelectedRow(row);
            }
        }
	});

    this.loadShipmentView.onPuckSelected.attach(function(sender, puck){
        if (_this.selectedPuck) {
            if (_this.selectedPuck == puck) {
                _this.deselectPuck();
            } else {
                _this.deselectPuck();
                _this.setSelectedPuck(puck);
            }
        } else {
            _this.setSelectedPuck(puck);
        }
	});

    this.loadShipmentView.onLoadButtonClicked.attach(function(sender){
        _this.loadShipment(_this.selectedPuck, _this.selectedContainerId);
    });

    this.loadShipmentView.onEmptyButtonClicked.attach(function(sender){
        _this.selectedPuck.emptyAll();
        _this.loadShipmentView.puckPreviewPanel.removeAll();
        _this.drawSelectedPuck(_this.selectedPuck);
        _this.storeSampleChangerWidget();
    });

}

PrepareMainViewTest.prototype.setSelectedRow = function (row) {
    this.loadShipmentView.containerListEditor.panel.getSelectionModel().select(this.loadShipmentView.containerListEditor.store.indexOf(row));
    this.selectedContainerId = row.get('containerId');
    this.selectedContainerCapacity = row.get('capacity');
    this.drawSelectedPuckFromRow(this.selectedContainerId, this.selectedContainerCapacity);
    this.checkIfLoadIsPossible();
}

PrepareMainViewTest.prototype.setSelectedPuck = function (puck) {
    $("#" + puck.id).attr("class","puck-selected");
    this.selectedPuck = puck;
    this.drawSelectedPuck(puck);
    this.checkIfLoadIsPossible();
    if (!puck.isEmpty) {
        this.loadShipmentView.emptyButton.setDisabled(false);    
    }
}

PrepareMainViewTest.prototype.checkIfLoadIsPossible = function () {
    if (this.selectedContainerId != null && this.selectedPuck != null) {
        if (this.selectedContainerCapacity == this.selectedPuck.capacity) {
            this.loadShipmentView.loadButton.setDisabled(false);
        }
    }
}

PrepareMainViewTest.prototype.updateStatus = function(shippingId, status) {
    var _this = this;
    _this.dewarListSelector.panel.setLoading("Updating shipment Status");
    var onStatusSuccess = function(sender, dewar) {     
        EXI.mainStatusBar.showReady("Processing update successfully");
        _this.dewarListSelector.panel.setLoading(false);
        _this.load();
    };
    var onError = function(data){
            EXI.setError(data);
    };
    
    EXI.getDataAdapter({onSuccess : onStatusSuccess, onError : onError}).proposal.shipping.updateStatus(shippingId,status);
};

PrepareMainViewTest.prototype.getPanel = function() {
    var _this = this;

    this.container = Ext.create('Ext.panel.Panel' , {
        items : []
    });

	this.panel =  Ext.create('Ext.panel.Panel', {
            items : [
                        this.getToolBar(), this.container
            ]
	});

    this.panel.on('boxready', function() {
        if (_this.currentStep == 1) {
            $('#previous-button-div').hide();
        }
        if (_this.currentStep < 3) {        
            $('#done-button-div').hide();
        }
        if (_this.currentStep == 3) {
            $('#next-button-div').hide();
        }
        $('#next-button').unbind('click').click(function (sender){
                if (_this.currentStep < 3) {
                    $('#step-' + _this.currentStep).removeClass('active-step');
                    $('#step-' + _this.currentStep).attr("disabled", "disabled");
                    if (_this.currentStep == 1) {
                        _this.save('containers',JSON.stringify(_this.containers));
                        $('#next-button').attr("disabled", true);
                    }
                    _this.currentStep++;
                    if (_this.currentStep > 0) {
                        $('#previous-button-div').show();
                    }
                    if (_this.currentStep == 3) {
                        $('#next-button-div').hide();
                        $('#done-button-div').show();
                    }
                    $('#step-' + _this.currentStep).addClass('active-step');
                    $('#step-' + _this.currentStep).attr("disabled", false);
                    _this.container.removeAll();
                    _this.reload();
                    _this.save('currentStep',_this.currentStep);
                }
            });
        $('#previous-button').unbind('click').click(function (sender){
                if (_this.currentStep > 0) {
                    $('#step-' + _this.currentStep).removeClass('active-step');
                    $('#step-' + _this.currentStep).attr("disabled", "disabled");
                    _this.currentStep--;
                    if (_this.currentStep < 3) {
                        $('#next-button-div').show();
                        $('#done-button-div').hide();
                    }
                    if (_this.currentStep == 1) {
                        $('#previous-button-div').hide();
                        $('#next-button').attr("disabled", false);                        
                    }
                    $('#step-' + _this.currentStep).addClass('active-step');
                    $('#step-' + _this.currentStep).attr("disabled", false);
                    _this.container.removeAll();
                    _this.reload();
                    _this.save('currentStep',_this.currentStep);   
                    if (_this.currentStep == 2) {
                        _this.storeSampleChangerWidget(_this.confirmShipmentView.sampleChangerWidget);
                        _this.loadShipmentView.sampleChangerSelector.loadSampleChanger(_this.confirmShipmentView.sampleChangerWidget);                        
                    }             
                }
            });
        $('#done-button').unbind('click').click(function (sender){
            _this.confirmShipmentView;
        });
        for (var i = 1 ; i <= 3 ; i++){
            if (i == _this.currentStep){
                $('#step-' + i).addClass('active-step');
            } else {
                $('#step-' + i).attr("disabled", true);
            }
        }
        _this.reload();
        _this.checkStoreData();
    });
        

    return this.panel;
};

PrepareMainViewTest.prototype.getToolBar = function () {
    var html = "";
	dust.render("toolbar.prepare.template", [], function(err, out){
		html = out;
	});

    return {html : html};
}

PrepareMainViewTest.prototype.load = function() {
    var _this = this;
    _this.panel.setTitle("Prepare Experiment");
    // this.reload();
};

PrepareMainViewTest.prototype.reload = function() {
    var _this = this;
    // this.container.removeAll();
    if (this.currentStep == 1) {
        _this.container.add(_this.dewarListSelector.getPanel());
        _this.dewarListSelector.panel.setLoading();
        var onSuccessProposal = function(sender, containers) {        
            _this.containers = containers;
            
            _this.dewarListSelector.load(containers);
            _this.dewarListSelector.panel.setLoading(false);
            
        };
        var onError = function(sender, error) {        
            EXI.setError("Ops, there was an error");
            _this.dewarListSelector.panel.setLoading(false);
        };
        
        EXI.getDataAdapter({onSuccess : onSuccessProposal, onError:onError}).proposal.dewar.getDewarsByProposal();
    } else if (this.currentStep == 2) {
        this.container.add(this.loadShipmentView.getPanel());
        if (this.containers == null) {
            if (typeof(Storage) != "undefined"){
                this.containers = JSON.parse(sessionStorage.getItem('containers'));
            }
        }
        this.loadShipmentView.containerListEditor.load(_.filter(this.containers, function(e){return e.shippingStatus == "processing";}));        
    } else if (this.currentStep == 3) {
        this.container.add(this.confirmShipmentView.getPanel());
        if (this.loadShipmentView.sampleChangerSelector.sampleChangerWidget) {
            this.confirmShipmentView.loadSampleChanger(this.loadShipmentView.sampleChangerSelector.sampleChangerWidget);
        }
    }
}

PrepareMainViewTest.prototype.checkStoreData = function () {
    if (this.currentStep == 2) {
        if (typeof(Storage) != "undefined"){
            var sampleChangerName = sessionStorage.getItem('sampleChangerName');
            if (sampleChangerName) {
                this.loadShipmentView.sampleChangerSelector.createSampleChanger(sampleChangerName);
                var puckData = JSON.parse(sessionStorage.getItem('puckData'));
                if (puckData) {
                    this.loadShipmentView.sampleChangerSelector.sampleChangerWidget.load(puckData);
                }
            }
            this.loadShipmentView.containerListEditor.load(_.filter(this.containers, function(e){return e.shippingStatus == "processing";}));                        
        }
    } else if (this.currentStep == 3) {
        if (typeof(Storage) != "undefined"){
            var sampleChangerName = sessionStorage.getItem('sampleChangerName');
            if (sampleChangerName) {
                var data = {
                    radius : 200,
                    isLoading : false
                };
                var sampleChangerWidget = null;
                if (sampleChangerName == "FlexHCD") {
                    sampleChangerWidget = new FlexHCDWidget(data);
                } else if (sampleChangerName == "SC3Widget") {
                    sampleChangerWidget = new SC3Widget(data);
                }
                this.confirmShipmentView.loadSampleChanger(sampleChangerWidget);
                var puckData = JSON.parse(sessionStorage.getItem('puckData'));
                if (puckData) {
                    this.confirmShipmentView.sampleChangerWidget.load(puckData);
                }
            }
        }
    }
}

PrepareMainViewTest.prototype.deselectRow = function () {
    this.loadShipmentView.containerListEditor.panel.getSelectionModel().deselectAll();
    this.selectedContainerId = null;
    this.selectedSampleCount = null;
    this.loadShipmentView.rowPreviewPanel.removeAll();
    this.loadShipmentView.loadButton.setDisabled(true);
}

PrepareMainViewTest.prototype.deselectPuck = function () {
    $("#" + this.selectedPuck.id).attr("class","puck");
    this.selectedPuck = null;
    this.loadShipmentView.puckPreviewPanel.removeAll();
    this.loadShipmentView.loadButton.setDisabled(true);   
    this.loadShipmentView.emptyButton.setDisabled(true);     
}

PrepareMainViewTest.prototype.returnToSelectionStatus = function () {
    this.deselectRow();
    if (this.selectedPuck) {
        this.deselectPuck();        
    }
}

PrepareMainViewTest.prototype.drawSelectedPuck = function (puck) {
    var data = {
        puckType : 1,
        containerId : puck.containerId,
        mainRadius : 100,
        x : 50,
        y : 10,
        enableMouseOver : true
    };
    var puckContainer = new PuckWidgetContainer(data);
    if (puck.capacity == 10) {
        data.puckType = 2;
        puckContainer = new PuckWidgetContainer(data);
    }
    this.loadShipmentView.puckPreviewPanel.add(puckContainer.getPanel());
    puckContainer.puckWidget.load(puck.data.cells);
}

PrepareMainViewTest.prototype.drawSelectedPuckFromRow = function (containerId, capacity) {
    var _this = this;
    function onSuccess (sender, samples) {
        if (samples){
            var data = {
                puckType : 1,
                containerId : containerId,
                mainRadius : 100,
                x : 50,
                y : 10,
                enableMouseOver : true
            };
            var puckContainer = new PuckWidgetContainer(data);
            if (capacity == 10) {
                data.puckType = 2;
                puckContainer = new PuckWidgetContainer(data);
            }
            _this.loadShipmentView.rowPreviewPanel.add(puckContainer.getPanel());
            puckContainer.puckWidget.loadSamples(samples);
        }
    }

    EXI.getDataAdapter({onSuccess : onSuccess}).mx.sample.getSamplesByContainerId(containerId);
}

PrepareMainViewTest.prototype.loadShipment = function (puck, containerId) {
    var _this = this;
    function onSuccess (sender, samples) {
        if (samples) {
            puck.emptyAll();
            puck.loadSamples(samples);
        }
        _this.returnToSelectionStatus();
        _this.storeSampleChangerWidget(_this.loadShipmentView.sampleChangerSelector.sampleChangerWidget);
    }

    EXI.getDataAdapter({onSuccess : onSuccess}).mx.sample.getSamplesByContainerId(containerId);
}

PrepareMainViewTest.prototype.save = function (key, value) {
    if (typeof(Storage) != 'undefined') {
        sessionStorage.setItem(key,value);
    }
}

PrepareMainViewTest.prototype.storeSampleChangerWidget = function (sampleChangerWidget) {
    var allPucks = sampleChangerWidget.getAllPucks();
    var puckData = {};
    for (puckContainerIndex in allPucks) {
        var puckContainer = allPucks[puckContainerIndex];
        var location = puckContainer.puckWidget.id.substring(puckContainer.puckWidget.id.indexOf('-')+1);
        puckData[location] = puckContainer.puckWidget.data;
    }
    this.save('puckData',JSON.stringify(puckData));
}