/**
* This is the description for routing all the puck actions. It means url= #/autoprocintegration/*
*
* @class PhasingController
* @constructor
*/
function PhasingController() {
	this.init();
}

PhasingController.prototype.setPageBackground = ExiGenericController.prototype.setPageBackground;
PhasingController.prototype.notFound = ExiGenericController.prototype.notFound;

PhasingController.prototype.getChilds = function(node, data) {
    /** Looking for children */   
    var children = _.filter(data, function(b){ return b.previousPhasingStepId == node.phasingStepId;});
    for(var i =0; i < children.length; i++){
        children[i].children = this.getChilds(children[i], data);
    }
    return children;
};
PhasingController.prototype.tableToTree = function(data) {
    var parents = _.filter(data, function(b){ return b.previousPhasingStepId == null;});
    
    for(var i =0; i < parents.length; i++){
        
        parents[i].children = this.getChilds(parents[i], data);    
    }
    
    return (parents);
    
};

/**
* Inits the controller for the PhasingController related objects
* Paths accepted:
* #/phasing/autoprocintegrationId/:autoprocintegrationId/main
* @method init
*/
PhasingController.prototype.init = function() {
	var _this = this;
	

	Path.map("#/phasing/autoprocintegrationId/:autoprocintegrationId/main").to(function() {
        
        /** Loading Main Panel */
		var mainView = new PhasingViewerMainView();
		EXI.addMainPanel(mainView);
        EXI.setLoadingMainPanel();
        var onSuccess = function(sender, data){
            var tree = _this.tableToTree(_.flatten(data));         
            EXI.setLoadingMainPanel(false);
	        mainView.load(data, tree);
           
            
	    };
    
	    EXI.getDataAdapter({onSuccess : onSuccess}).mx.phasing.getPhasingViewByAutoProcIntegrationId(this.params['autoprocintegrationId']);
	
    
    
		
	}).enter(this.setPageBackground);


    Path.map("#/phasing/autoprocintegrationId/:autoprocintegrationId/nav").to(function() {
		    var listView = new PhasingListView();
			listView.onSelect.attach(function(sender, selected) {
				location.hash = "/mx/puck/" + selected[0].Container_containerId+ "/main";
			});

			EXI.addNavigationPanel(listView);
			var onSuccess = function(sender, data) {
				 var tree = _this.tableToTree(_.flatten(data));               
                EXI.setLoadingNavigationPanel(false);
	            listView.load(tree);
			};
			EXI.getDataAdapter({onSuccess : onSuccess}).mx.phasing.getPhasingViewByAutoProcIntegrationId(this.params['autoprocintegrationId']);
	}).enter(this.setPageBackground);
    
    //http://lindemaria:8082/EXI/mx/dev.html#/phasing/autoprocintegrationId/1187809/main
};
