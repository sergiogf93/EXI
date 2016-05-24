/**
* It shows a summary about the phasing steps. Basically, one line per space group 
*
* @class SummaryPhasingGrid
* @constructor
*/
function SummaryPhasingGrid(args) {
	
};

/**
* It reveices the phasing steps as tree
*
* @method load
* @param {json} tree 
{
    acronym: "MWB"
    anomalous: false
    autoProcId: 909816
    autoProcIntegrationId: 1010078
    autoProcScalingId: 909827
    blSampleId: 525682
    acronym: "MWB"
    anomalous: false
    autoProcId: 909816
    autoProcIntegrationId: 1010078
    autoProcScalingId: 909827
    blSampleId: 525682
    children: [
        
                {
                    acronym: "MWB"
                    anomalous: false
                    autoProcId: 909816
                    autoProcIntegrationId: 1010078
                    autoProcScalingId: 909827
                    blSampleId: 525682
                    acronym: "MWB"
                    anomalous: false
                    autoProcId: 909816
                    autoProcIntegrationId: 1010078
                    autoProcScalingId: 909827
                    blSampleId: 525682
                }
        
    ]
}
*/
SummaryPhasingGrid.prototype.load = function(tree) {
	this.store.loadData( this.parseTree(tree), false);
};


SummaryPhasingGrid.prototype.summarizeChildren = function(children) {
    var node = {
        children : [],
        phasingType : [],
        lowRes : [],
        highRes : [],
        method : []
    };
    
    for (var i = 0; i < children.length; i++) {
        var element = children[i];
        if (element.children){
              node.children = _.concat(node.children,element.children);
        }
        node.phasingType.push(children[i].phasingStepType);
        node.lowRes.push(children[i].lowRes);
        node.highRes.push(children[i].highRes);
        node.method.push(_.sortedUniq(children[i].method));
    }   
    return node;    
};


SummaryPhasingGrid.prototype.parseTree = function(tree) {
	var data = [];
    
   
            
    /** Merging all branches */
    for (var i = 0; i < tree.length; i++) {
      
        var safeCondition = 10;
        if (tree[i].children){
            var steps = [];
            
            if (tree[i].children){
                steps.push(tree[i]);
                while (steps[steps.length-1].children.length > 0){
                    if (safeCondition > 0){
                        if (steps[steps.length-1].children.length > 0){
                            steps.push(this.summarizeChildren(steps[steps.length-1].children));
                        }
                    }
                    else{
                        break;
                    }
                    safeCondition = safeCondition -1;
                }
                var subData = {};
                /** Renaming Steps */
                for (var k = 0; k < steps.length; k++) {
                    subData["step_" + k] = steps[k];
                    
                }
                data.push(subData);
            }
        }
        
    }
    
    return data;
};

SummaryPhasingGrid.prototype.getPanel = function() {
	var _this = this;
	this.store = Ext.create('Ext.data.Store', {
		fields : [  'step_1']
	});
    
	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Summary',
		store : this.store,
        cls : 'border-grid',
		layout : 'fit',
        flex : 1,
		columns : [ 
                        {
                            text : 'Initial',
                            
                            flex : 1,
                            renderer : function(e, sample, record){
                                var html  = "";
                                try{   
                                    debugger
                                        if (record.data.step_0){
                                            console.log(record.data.step_0);
                                            dust.render("summaryphasinggrid.first.step", record.data.step_0, function(err, out){
                                                html = out;debugger
                                            });
                                        }
                                }
                                catch(e){
                                    return "Parsing error " + e;
                                }
                                return html;
			                }
                        }
                ]
	});
	return this.panel;
};


