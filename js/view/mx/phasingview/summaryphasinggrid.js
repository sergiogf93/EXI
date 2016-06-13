/**
* It shows a summary about the phasing steps. Basically, one line per space group 
*
* @class SummaryPhasingGrid
* @constructor
*/
function SummaryPhasingGrid(args) {
	
    this.onSelect = new Event(this);
};

SummaryPhasingGrid.prototype.load = function(data) {
  /** Adding metrics as columns on the phasing Step */
   for (var i = 0; i < data.length; i++) {
       var element = data[i];
       if (element.metric){
           var metrics = element.metric.split(",");
           var statisticsValues = element.statisticsValue.split(",");
           if (metrics.length > 0){            
               for (var j = 0; j < metrics.length; j++) {
                   element[metrics[j]] = statisticsValues[j];
               }
               
           }
       }
   }
	this.store.loadData(data);
};



SummaryPhasingGrid.prototype.getPanel = function() {
	var _this = this;
	this.store = Ext.create('Ext.data.Store', {
		fields : [  
                    'phasingStepId',
                    'previousPhasingStepId',
                    'processingPrograms',
                    'processingStatus',
                    'proposalId',
                    'sessionId',
                    'solventContent',
                    'spaceGroup',
                    'spaceGroupShortName',
                    'statisticsValue',
                    'phasingStepType',
                    'method',
                    'lowRes',
                    'highRes',
                    'phasingPrograms',
                    'enantiomorph',
                    'anomalous',
                    'Pseudo_free_CC',
                    'CC of partial model',
                    'anomalous',
                    'acronym']
	});
    
    var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect : true,
		//mode : 'multi',
		listeners : {
			select : function(sm, selection) {
               _this.onSelect.notify(selection.data);
						}

		} });
        
    
	this.panel = Ext.create('Ext.grid.Panel', {
		title : 'Phasing Steps',
		store : this.store,
        selModel : selModel,
        height : 600,
        cls : 'border-grid',
		layout : 'fit',
        flex : 1,
         viewConfig : {
                    stripeRows : true,
                    getRowClass : function(record, rowIndex, rowParams, store){

                      /*  if (record.data.phasingStepType == "PREPARE"){
                            return "blue-grid-row";
                        }
                        if (record.data.phasingStepType == "SUBSTRUCTUREDETERMINATION"){
                            return "blue2-grid-row";
                        }
                        if (record.data.phasingStepType == "PHASING"){
                            return "blue3-grid-row";
                        }
                        if (record.data.phasingStepType == "MODELBUILDING"){
                            return "white-grid-row";
                        }
                        return "warning-grid-row";*/
                    }
                },
		columns : [ 
                         {
                            text : 'Space Group',
                            flex : 1,
                            dataIndex : 'spaceGroupShortName'
                        },
                        {
                            text : 'Steps',
                            columns : [     {
                                                text : 'Prepare',
                                                flex : 1,
                                                dataIndex : 'previousPhasingStepId',
                                                renderer : function(grid, e, record){
                                                    
                                                    if (record.data.phasingStepType == "PREPARE"){
                                                        return record.data.phasingPrograms.toUpperCase();
                                                    }
                                                }
                                            },
                                             {
                                                text : 'Subs. Deter.',
                                                flex : 1,
                                                dataIndex : 'previousPhasingStepId',
                                                renderer : function(grid, e, record){
                                                   
                                                    if (record.data.phasingStepType == "SUBSTRUCTUREDETERMINATION"){
                                                        return record.data.phasingPrograms.toUpperCase()
                                                    }
                                                }
                                            },
                                             {
                                                text : 'Phasing',
                                                flex : 1,
                                                dataIndex : 'previousPhasingStepId',
                                                renderer : function(grid, e, record){
                                                   
                                                    if (record.data.phasingStepType == "PHASING"){
                                                         return record.data.phasingPrograms.toUpperCase()
                                                    }
                                                }
                                            },
                                             {
                                                text : 'Model',
                                                flex : 1,
                                                dataIndex : 'previousPhasingStepId',
                                                renderer : function(grid, e, record){
                                                    if (record.data.phasingStepType == "MODELBUILDING"){
                                                         return record.data.phasingPrograms.toUpperCase()
                                                    }
                                                }
                                            },
                            ]
                        },
                         {
                            text : 'phasingStepId',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'phasingStepId'
                      
                        },
                         {
                            text : 'previousPhasingStepId',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'previousPhasingStepId'
                        },
                         {
                            text : 'phasingStepId',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'phasingStepId'
                        },
                        
                          {
                            text : 'Protein',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'acronym'
                        },
                         {
                            text : 'Method',
                            flex : 1,
                            dataIndex : 'method'
                        },
                         {
                            text : 'Low Resolution',
                            flex : 1,
                            dataIndex : 'lowRes',
                            renderer : function(grid, e, record){
                                                    if (record.data.phasingStepType == "MODELBUILDING"){
                                                         return record.data.lowRes + " - " + record.data.highRes 
                                                    }
                                                }
                        },
                         {
                            text : 'High Resolution',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'highRes'
                        },
                         {
                            text : 'Enantiomorph',
                            flex : 1,
                            dataIndex : 'enantiomorph'
                        },
                         {
                            text : 'Anomalous',
                            flex : 1,
                            dataIndex : 'anomalous'
                        },
                         {
                            text : 'Solvent',
                            flex : 1,
                            dataIndex : 'solventContent'
                        },
                         {
                            text : ' Program',
                            flex : 1,
                            hidden : true,
                            dataIndex : 'phasingPrograms'
                        },
                         {
                            text : 'Pseudo Free (CC)',
                            flex : 1,
                            dataIndex : 'Pseudo_free_CC'
                        },
                         {
                            text : 'Partial Model(CC)',
                            flex : 1,
                            dataIndex : 'CC of partial model'
                        }
                        
                ]
	});
	return this.panel;
};


