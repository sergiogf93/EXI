

function PhasingViewerMainView() {
	
	MainView.call(this);
	
	var _this = this;
	this.phasingNetworkWidget = new PhasingNetworkWidget({tbar : "MENU"});
    
    this.phasingGrid = new PhasingGrid();
    this.summaryPhasingGrid = new SummaryPhasingGrid();
}

PhasingViewerMainView.prototype.getPanel = MainView.prototype.getPanel;


PhasingViewerMainView.prototype.getContainer = function() {
	this.tabPanel = Ext.create('Ext.tab.Panel', {
				margin : 10,
				cls : 'border-grid',
				defaults : {
						anchor : '100%'
				},
				items : [
                            {
                                title: 'Summary',
                                bodyPadding: 10,
                                items : this.summaryPhasingGrid.getPanel()
                            },
                            {
                                title: 'Phasing Dataset',
                                bodyPadding: 10,
                                items : this.phasingGrid.getPanel()
                            },
                             {
                                title: 'Network',
                                bodyPadding: 10,
                                items : this.phasingNetworkWidget.getPanel()
                            }
                           
				         	
					]
			});

	return this.tabPanel;

};

PhasingViewerMainView.prototype.getChilds = function(node, data) {
    /** Looking for children */   
    var children = _.filter(data, function(b){ return b.previousPhasingStepId == node.phasingStepId;});
    for(var i =0; i < children.length; i++){
        children[i].children = this.getChilds(children[i], data);
    }
    return children;
};
PhasingViewerMainView.prototype.tableToTree = function(data) {
    var parents = _.filter(data, function(b){ return b.previousPhasingStepId == null;});
    
    for(var i =0; i < parents.length; i++){
        
        parents[i].children = this.getChilds(parents[i], data);    
    }
    
    return (parents);
    
};

PhasingViewerMainView.prototype.load = function(autoprocintegrationId) {
	var _this = this;
	this.panel.setTitle("Phasing Viewer");
	this.panel.setLoading();
	var onSuccess = function(sender, data){
		var tree = _this.tableToTree(_.flatten(data));
      
	    _this.phasingGrid.load(tree);
        _this.summaryPhasingGrid.load(tree);
        _this.phasingNetworkWidget.load(_.flatten(data))
       
        _this.panel.setLoading(false);
	    
	};
    
	EXI.getDataAdapter({onSuccess : onSuccess}).mx.phasing.getPhasingViewByAutoProcIntegrationId(autoprocintegrationId);
	
};
