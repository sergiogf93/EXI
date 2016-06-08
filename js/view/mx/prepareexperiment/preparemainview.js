function PrepareMainView() {
	this.icon = '../images/icon/contacts.png';
	this.queueGridList = [];

	MainView.call(this);

    var _this = this;
    
    this.dewarListSelector = new DewarListSelector({height : 600});
    this.dewarListSelector.onSelect.attach(function(sender, dewar){    
        _this.containerListEditor.store.loadData(_.filter(_this.containers, function(e){ return e.dewarId == dewar.dewarId }), true);
       
            if (dewar.shippingStatus == "processing"){
                _this.switchStatus(dewar.shippingId, "at ESRF");
            } 
            if (dewar.shippingStatus != "processing"){
                _this.switchStatus(dewar.shippingId, "processing");
            }      
     });
     
     
     /* this.dewarListSelector.onDeselect.attach(function(sender, dewar){    
        if (dewar.shippingStatus == "processing"){
            _this.switchStatus(dewar.shippingId, "processing");
        }  
              
     });*/
     
     
     this.dewarListSelector.onSelectionChange.attach(function(sender, dewars){
        /*_(dewars).forEach(function(dewar) {
            _this.containerListEditor.store.loadData(_.filter(_this.containers, function(e){ return e.dewarId == dewar.dewarId }), true);
        });*/
    });
    
	this.containerListEditor = new ContainerListEditor({height : 600});

}

PrepareMainView.prototype.switchStatus = function(shippingId, status) {
    var _this = this;
    _this.dewarListSelector.panel.setLoading("Updating shipment Status");
    var onStatusSuccess = function(sender, dewar) {     
        EXI.mainStatusBar.showReady("Processing update successfully");
        _this.dewarListSelector.panel.setLoading(false);
        _this.load();
    }
    var onError = function(data){
            EXI.setError(data);
    }
    
    EXI.getDataAdapter({onSuccess : onStatusSuccess, onError : onError}).proposal.shipping.updateStatus(shippingId,status);
};

PrepareMainView.prototype.getPanel = function() {
	this.panel =  Ext.create('Ext.panel.Panel', {
           layout : 'hbox',
            items : [
                        this.dewarListSelector.getPanel(), 
                        this.containerListEditor.getPanel()        
            ]
	});
    
    return this.panel;
};




PrepareMainView.prototype.load = function() {
    var _this = this;
    _this.panel.setTitle("Prepare Experiment");
    _this.dewarListSelector.panel.setLoading();
    var onSuccessProposal = function(sender, containers) {        
        _this.containers = containers;
        
        _this.dewarListSelector.load(containers);
        _this.dewarListSelector.panel.setLoading(false);
        
        /** Selecting containers that are processing */
        var processingContainers = _.filter(containers, function(e){return e.shippingStatus == "processing";});
        console.log(processingContainers);
        _this.containerListEditor.load(processingContainers);
        
    };
     var onError = function(sender, error) {        
        EXI.setError("Ops, there was an error");
        _this.dewarListSelector.panel.setLoading(false);
    };
    
    EXI.getDataAdapter({onSuccess : onSuccessProposal, onError:onError}).proposal.dewar.getDewarsByProposal();
};
