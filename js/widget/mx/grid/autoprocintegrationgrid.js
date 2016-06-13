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
    
    this.spaceGroupColumnHidden = true;
    this.unitCellColumnHidden = false;
    this.statisticsColumnHidden = false;
    this.phasingColumnHidden = false;
    
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
        
        if (args.spaceGroupColumnHidden != null) {
			this.spaceGroupColumnHidden = args.spaceGroupColumnHidden;
		}
        
        if (args.unitCellColumnHidden != null) {
			this.unitCellColumnHidden = args.unitCellColumnHidden;
		}
        
        if (args.statisticsColumnHidden != null) {
			this.statisticsColumnHidden = args.statisticsColumnHidden;
		}
        
        if (args.phasingColumnHidden != null) {
			this.phasingColumnHidden = args.phasingColumnHidden;
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

		} });
	
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
			text : 'Autoprocessing',
			dataIndex : 'processingPrograms',
            flex : 1,
			renderer : function(e, sample, record){
				
                var html  = "";
				try{
					dust.render("autoprocintegrationgrid_tool", record.data, function(err, out){
						html = out;
					});
				}
				catch(e){
					return "Parsing error";
				}
				return html;
                
			}
		},
        {
			text : 'Space Group',
            flex : 0.75,
            hidden : this.spaceGroupColumnHidden,
			dataIndex : 'v_datacollection_summary_phasing_autoproc_space_group',
			renderer : function(e, sample, record){
                
				return record.data.v_datacollection_summary_phasing_autoproc_space_group;
			}
		},
		{
			text : 'Unit cell',
			dataIndex : 'processingPrograms',
			width : 150,
            hidden : this.unitCellColumnHidden,
			renderer : function(e, sample, record){
				var html  = "";
				try{
                               
					dust.render("autoprocintegrationgrid_unitcell", record.data, function(err, out){
						html = out;
					});
				}
				catch(e){
					return "Parsing error";
				}
				return html;
			}
		},
		{
			text : 'Statistics',
			dataIndex : 'processingPrograms',
			flex : 4,
            hidden : this.statisticsColumnHidden,
			renderer : function(e, sample, record){
				try{
                    
					var type = record.data.scalingStatisticsType.split(",");
                    function getValue(attribute, i){
                        if (attribute){
                            var splitted = attribute.split(",");
                            if (splitted[i]){
                                return splitted[i];
                            }
                        }
                        return "N/A";
                        
                    }
					var parsed = [];
					for (var i = 0; i < type.length; i++) {
						parsed.push({
							type 					: type[i],
							resolutionLimitLow 		: getValue(record.data.resolutionLimitLow, i),
							resolutionLimitHigh 	: getValue(record.data.resolutionLimitHigh, i),
							multiplicity 			: getValue(record.data.multiplicity, i),
							meanIOverSigI 			: getValue(record.data.meanIOverSigI, i),
							completeness 			: getValue(record.data.completeness, i),
                            rMerge 			        : getValue(record.data.rMerge, i),
                            ccHalf 			        : getValue(record.data.ccHalf, i)
							
						});
					}
					var html  = "";
					dust.render("autoprocintegrationgrid_statistics", parsed, function(err, out){
						html = out;
					});
				}
				catch(e){
                    
					return "<span class='summary_datacollection_parameter_name'>Not found " + e +"</span>";
				}
				return html;
			}
		},
		{
			text : 'Phasing',
			dataIndex : 'processingPrograms',
			flex : 1.5,
            hidden : this.phasingColumnHidden,
			renderer : function(e, sample, record){
				var html  = "";           
				if (record.data.phasingStepType){			
					try{
                        var spaceGroups = record.data.spaceGroupShortName.split(',');
                        var dataForDust = [];
                        for(var i = 0; i < spaceGroups.length; i++){
                            dataForDust.push({
                                spaceGroup : spaceGroups[i],
                                autoProcIntegrationId : record.data.v_datacollection_summary_phasing_autoProcIntegrationId
                            });
                        }
                        
						dust.render("autoprocintegrationgrid_phasing", dataForDust, function(err, out){
							html = out;
						});
					}
					catch(e){
						return "Parsing error";
					}
				}
				return html;
			}
		}
		
		],
		flex : 1,
          viewConfig : {
                preserveScrollOnRefresh: true,
                stripeRows : true,
                getRowClass : function(record, rowIndex, rowParams, store){

                    if (record.data.v_datacollection_summary_phasing_anomalous != null){
                         if (record.data.v_datacollection_summary_phasing_anomalous == true){
                            return;//((rowIndex % 2) == 0) ? "mx-grid-row-light" : "mx-grid-row-dark";
                        
                        }
                        
                    }
                    //return "warning-grid-row";
                }
	    	}
	});

	return this.panel;
};




