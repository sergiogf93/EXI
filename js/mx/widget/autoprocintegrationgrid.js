/**
* It shows information from the autoprocessing like cells (a,b,c,alpha,beta,gamma) and also about phasing
*
* @class AutoProcIntegrationGrid
* @constructor
*/
function AutoProcIntegrationGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	
	this.preventSelection = false;
	this.maxHeight = 500;
	this.minHeight = 500;
    this.minHeight = 500;
      
    
	if (args != null) {
		if (args.height != null) {
			this.height = args.height;
		}
        
		if (args.maxHeight != null) {
			this.maxHeight = args.maxHeight;
		}
		if (args.searchBar != null) {
			this.searchBar = args.searchBar;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.collapsed != null) {
			this.collapsed = args.collapsed;
		}

		if (args.width != null) {
			this.width = args.width;
		}              
	}	
	this.onSelected = new Event(this);
};

AutoProcIntegrationGrid.prototype.load = function(data) {
	this.store.loadData(data, false);
};

AutoProcIntegrationGrid.prototype.selectRowByAutoProcIntegrationId = function(autoProcIntegrationId) {
	this.preventSelection = true;
	this.panel.getSelectionModel().select(this.store.find("v_datacollection_summary_phasing_autoProcIntegrationId", autoProcIntegrationId));
};

AutoProcIntegrationGrid.prototype.getPhasing = function(data) {      
    var phasing = [];
    
    if (data.spaceGroupShortName){
        
        var spaceGroups = data.spaceGroupShortName.split(',');
        var steps = data.phasingStepType.split('PREPARE');
        
        for(var i = 0; i < spaceGroups.length; i++){
            
            phasing.push({
                spaceGroup              : spaceGroups[i],
                prepare                 : true,
                sub                     : steps[i+1].indexOf("SUBSTRUCTUREDETERMINATION") != -1,
                phasing                 : steps[i+1].indexOf("PHASING") != -1,
                model                   : steps[i+1].indexOf("MODEL") != -1,
                autoProcIntegrationId   : data.v_datacollection_summary_phasing_autoProcIntegrationId
            });
        }
        
        
    }
    return phasing;
};                 

AutoProcIntegrationGrid.prototype.getStatistics = function(data) {	                    
    var type = data.scalingStatisticsType.split(",");
    function getValue(attribute, i){
        if (attribute){
            var splitted = attribute.split(",");
            if (splitted[i]){
                return splitted[i];
            }
        }
        return "";
        
    }
    var parsed = [];
    for (var i = 0; i < type.length; i++) {
        parsed.push({
            type 					: type[i],
            resolutionLimitLow 		: getValue(data.resolutionLimitLow, i),
            resolutionLimitHigh 	: getValue(data.resolutionLimitHigh, i),
            multiplicity 			: getValue(data.multiplicity, i),
            meanIOverSigI 			: getValue(data.meanIOverSigI, i),
            completeness 			: getValue(data.completeness, i),
            rMerge 			        : getValue(data.rMerge, i),
            ccHalf 			        : getValue(data.ccHalf, i),
            rPimWithinIPlusIMinus 	: getValue(data.rPimWithinIPlusIMinus, i),
            rMeasAllIPlusIMinus 	: getValue(data.rMeasAllIPlusIMinus, i)
            
        });
    }
    return parsed;    				
};

AutoProcIntegrationGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		sorters : 'spaceGroup',
		fields : [ 'autoProcId',
		           'refinedCellA', 
                   'v_datacollection_summary_phasing_autoProcIntegrationId',
		           'autoProcIntegrationId',
		           'v_datacollection_summary_phasing_anomalous',
		           'v_datacollection_summary_phasing_processingPrograms',
		           'v_datacollection_summary_phasing_autoproc_space_group']
	});
    
	var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect : true,
		mode : 'multi',
		listeners : {
			selectionchange : function(sm, selections) {
				var records = [];
				if (selections != null) {
					for (var i = 0; i < selections.length; i++) {
						records.push(selections[i].data);
					}

					/** Event is only triggered if node is a leaf **/
					if (!_this.preventSelection){
						_this.onSelected.notify(records);
					}
					else{
						_this.preventSelection = false;
					}
				}
			}
		} 
    });
	
	this.panel = Ext.create('Ext.grid.Panel', {		
		store : this.store,
		selModel : selModel,
		cls : 'border-grid',
        layout : 'fit',
		columns : [             
                    {
                        text : 'autoProcIntegrationId',
                        dataIndex : 'processingPrograms',
                        flex : 1,
                        hidden : true,
                        renderer : function(e, sample, record){
                            return record.data.v_datacollection_summary_phasing_autoProcIntegrationId;
                        }
                    },        
                    {
                        dataIndex: 'dataCollectionGroup',
                        name: 'dataCollectionGroup',
                        flex: 1.5,
                        hidden: false,
                        renderer: function(grid, e, record) {
                            var data = record.data;// _this._getAutoprocessingStatistics(record.data);                               
                            var html = "";                
                            // Getting statistics                
                            data.statistics = _this.getStatistics(record.data);
                            data.phasing = _this.getPhasing(record.data);                
                            dust.render("autoprocintegrationgrid.template", data, function(err, out) {
                                html = html + out;
                                
                            });
                        return html;
                        }
                    }                        		
		],
		flex : 1,
          viewConfig : {
                preserveScrollOnRefresh: true,
                stripeRows : true,                
	    	}
	});

	return this.panel;
};




