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

/**
* Given an array objects it return the distinct value of a given property
*
* @method getPrograms
* @param {Array} autoProcIntegrations These objects are coming from the phasing view: {"v_datacollection_summary_phasing_processingStatus":true,"v_datacollection_summary_phasing_phasingStatus":null,"v_datacollection_summary_phasing_phasingStepId":null,"v_datacollection_summary_phasing_cell_b":60.51,"v_datacollection_summary_phasing_cell_a":60.51,"v_datacollection_summary_phasing_processingPrograms":"EDNA_proc","v_datacollection_summary_phasing_cell_c":157.92,"v_datacollection_summary_phasing_solventContent":null,"v_datacollection_summary_phasing_phasingStartTime":null,"v_datacollection_summary_phasing_autoproc_space_group":"P 41 21 2","v_datacollection_summary_phasing_phasingAnalysisId":null,"v_datacollection_summary_phasing_spaceGroupShortName":null,"v_datacollection_summary_phasing_method":null,"v_datacollection_summary_phasing_autoProcIntegrationId":1073123,"v_datacollection_summary_phasing_previousPhasingStepId":null,"v_datacollection_summary_phasing_autoproc_autoprocId":964912,"v_datacollection_summary_phasing_highRes":null,"v_datacollection_summary_phasing_cell_beta":90.0,"v_datacollection_summary_phasing_phasingPrograms":null,"v_datacollection_summary_phasing_cell_alpha":90.0,"v_datacollection_summary_phasing_autoProcScalingId":964923,"v_datacollection_summary_phasing_lowRes":null,"v_datacollection_summary_phasing_phasingStepType":null,"v_datacollection_summary_phasing_anomalous":false,"v_datacollection_summary_phasing_enantiomorph":null,"v_datacollection_summary_phasing_dataCollectionId":1682396,"v_datacollection_summary_phasing_phasingEndTime":null,"v_datacollection_summary_phasing_cell_gamma":90.0}
* @param {String} property Property you want to get the distinct
*/
AutoProcIntegrationGrid.prototype.getPrograms = function(autoProcIntegrations, property) {
	function groupBy(items,propertyName)
	{
	    var result = [];
	    $.each(items, function(index, item) {
	       if ($.inArray(item[propertyName], result)==-1) {
	          result.push(item[propertyName]);
	       }
	    });
	    return result;
	}
	
	return groupBy(autoProcIntegrations, property);
	
};

AutoProcIntegrationGrid.prototype.load = function(autoProcIntegrations) {
	var data = [];
	for (var i = 0; i < autoProcIntegrations.length; i++) {
		var record = autoProcIntegrations[i][0];
		record["autoProcIntegrationId"] = autoProcIntegrations[i][0]["v_datacollection_summary_phasing_autoProcIntegrationId"];
		record["processingPrograms"] = autoProcIntegrations[i][0]["v_datacollection_summary_phasing_processingPrograms"];
		
		if (autoProcIntegrations[i][0]["v_datacollection_summary_phasing_anomalous"] == true){
			record["anomalous"] = "yes";
		}
		else{
			record["anomalous"] = false;
		}
		
		
		if (autoProcIntegrations[i].length > 1){
			phasingStep =  BUI.groupBy(autoProcIntegrations[i], function(item){
				  			return [item.v_datacollection_summary_phasing_autoProcScalingId];
			});
			spaceGroups =  BUI.groupBy(phasingStep, function(item){
	  			return [item.v_datacollection_summary_phasing_autoproc_space_group];
			});
			
			record.phasing = [];
			
			function getDisplay(steps, programs){
				var results = [];
				for (var p = 0; p < steps.length; p++) {
					results.push({
						step 	: steps[p],
						program 	: programs[p]
					});
				}
				return results;
			}
			for (var z = 0; z < spaceGroups[0].length; z++) {
				var step = this.getPrograms(spaceGroups[0][z], 'v_datacollection_summary_phasing_phasingStepType');
				var programs = this.getPrograms(spaceGroups[0][z], 'v_datacollection_summary_phasing_phasingPrograms');
				record.phasing.push({
					spaceGroup  : spaceGroups[0][z][0]["v_datacollection_summary_phasing_spaceGroupShortName"],
					programs    : programs,
					step   		: step,
					method	    : this.getPrograms(spaceGroups[0][z], 'v_datacollection_summary_phasing_method'),
					display     : getDisplay(step, programs)
				});
			}
		}
		data.push(record);
	}
	console.log(data);
	this.store.loadData(data, false);
};

AutoProcIntegrationGrid.prototype.selectRowByAutoProcIntegrationId = function(autoProcIntegrationId) {
	this.preventSelection = true;
	this.panel.getSelectionModel().select(this.store.find("autoProcIntegrationId", autoProcIntegrationId));
};

AutoProcIntegrationGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
//		groupField: 'v_datacollection_summary_phasing_anomalous',
		sorters : 'spaceGroup',
		fields : [ 'autoProcId',
		           'refinedCellA', 
		           'autoProcIntegrationId',
		           'v_datacollection_summary_phasing_anomalous',
		           'v_datacollection_summary_phasing_processingPrograms',
		           'v_datacollection_summary_phasing_autoproc_space_group']
	});

//	var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
//    });
//    
    
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
		title : 'Auto-Processing Integration',
		store : this.store,
		selModel : selModel,
		cls : 'border-grid',
		maxHeight : this.maxHeight,
		minHeight : this.maxHeight,
		columns : [ 
		{
			text : 'Autoprocessing',
			dataIndex : 'processingPrograms',
			width : 400,
			renderer : function(e, sample, record){
				var html  = "";
				try{
					dust.render("autoprocintegrationgrid_autoprocolumn", record.data, function(err, out){
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
			width : 400,
			renderer : function(e, sample, record){
				var type = record.data.scalingStatisticsType.split(",");
				var resolutionLimitLow = record.data.resolutionLimitLow.split(",");
				var resolutionLimitHigh = record.data.resolutionLimitHigh.split(",");
				var multiplicity = record.data.multiplicity.split(",");
				var meanIOverSigI = record.data.meanIOverSigI.split(",");
				var completeness = record.data.completeness.split(",");
				
				var parsed = [];
				for (var i = 0; i < type.length; i++) {
					parsed.push({
						type 					: type[i],
						resolutionLimitLow 		: resolutionLimitLow[i],
						resolutionLimitHigh 	: resolutionLimitHigh[i],
						multiplicity 			: multiplicity[i],
						meanIOverSigI 			: meanIOverSigI[i],
						completeness 			: completeness[i]
						
					});
				}
				console.log(parsed)
				var html  = "";
				try{
					dust.render("autoprocintegrationgrid_statistics", parsed, function(err, out){
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
			text : 'Phasing',
			dataIndex : 'processingPrograms',
			flex : 1.5,
			renderer : function(e, sample, record){
				var html  = "";
				if (record.data.phasing){
					console.log(record.data.phasing);
					
					try{
						dust.render("autoprocintegrationgrid_phasing", record.data.phasing, function(err, out){
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
			stripeRows : true,
			preserveScrollOnRefresh: true,
			listeners : {
			}
		}
	});

	return this.panel;
};




