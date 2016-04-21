function SessionGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	this.width = 100;

	this.title = null;
	this.margin = null;


	this.hiddenGoColumn = true;

	if (args != null) {
		if (args.title != null) {
			this.title = args.title;
		}
		if (args.margin != null) {
			this.margin = args.margin;
		}

		if (args.height != null) {
			this.height = args.height;
		}

		if (args.tbar != null) {
			this.tbar = args.tbar;
		}

		if (args.width != null) {
			this.width = args.width;
		}
		if (args.hiddenGoColumn != null) {
			this.hiddenGoColumn = args.hiddenGoColumn;
		}
	}

	this.onSelected = new Event(this);

};


SessionGrid.prototype.load = function(sessions) {
	this.store.loadData(sessions, true);
};

SessionGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		fields : ['beamLineOperator', 'Proposal_title', 'Person_emailAddress', 'Person_familyName', 'Person_givenName'],
		emptyText : "No sessions",
		data : []
	});

	this.panel = Ext.create('Ext.grid.Panel', {
		title : this.title,
		store : this.store,
		layout : 'fit',
		icon : '../images/icon/sessions.png',
		cls : 'border-grid',
		height : this.height,
       
		margin : this.margin,
		selMode : null,

		columns : [
             {
                    text : 'Beamline',
                    dataIndex : 'Proposal_code',
                    width : 125,
                    renderer : function(grid, a, record){
                            var location = "#";
                            if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "SAXS"){
                                location = "#/session/nav/" + record.data.sessionId + "/session";
                            }
                            else{
                                location = "#/mx/datacollection/session/" + record.data.sessionId + "/main";
                            }
                        return "<a href='" +  location +"'>" + record.data.beamLineName + "</a>"; 
                    }
		    }, 
            {
                text : 'Proposal',
                dataIndex : 'beamlineName',
                flex : 1,
                renderer : function(grid, a, record){
                    return record.data.Proposal_proposalCode + record.data.Proposal_ProposalNumber;
                }
            },
         
           {
			    text                : 'Local Contact',
			    dataIndex           : 'beamLineOperator',
			    width               : 200,
                flex                : 1
		    },
            {
			    text                : 'Title',
			    dataIndex           : 'Proposal_title',
			    width               : 200,
                flex               : 4
		    },
            {
			    text                : 'PI',
			    dataIndex           : 'Proposal_title',
			    width               : 200,
                 hidden              : true,
                renderer : function(grid, a, record){                        
                        return record.data.Person_familyName + ", " + record.data.Person_givenName;
                    }
		    },
             {
			    text                : 'e-mail',
			    dataIndex           : 'Person_emailAddress',
			    width               : 200,
                hidden              : true,
                flex               : 1
		    },
             {
			    text                : 'OSC',
			    dataIndex           : 'xrfSpectrumCount',
			    width               : 200,
                flex               : 1,
                  renderer : function(grid, a, record){       
                          if (record.data.OSCdataCollectionGroupCount != 0){                          
                            return record.data.OSCdataCollectionGroupCount;
                        }                    
                     
                    }
		    },
            {
			    text                : 'Characterization',
			    dataIndex           : 'xrfSpectrumCount',
			    width               : 200,
                flex               : 1,
                  renderer : function(grid, a, record){   
                         if (record.data.CharacterizationdataCollectionGroupCount != 0){                          
                            return record.data.CharacterizationdataCollectionGroupCount;
                        }                     
                        
                    }
		    },
             {
			    text                : 'Energy Scan',
			    dataIndex           : 'xrfSpectrumCount',
			    width               : 200,
                flex               : 1,
                  renderer : function(grid, a, record){ 
                      if (record.data.energyScanCount != 0){                       
                        return record.data.energyScanCount;
                      }
                 }
		    },
            {
			    text                : 'SRF Spectrums',
			    dataIndex           : 'xrfSpectrumCount',
			    width               : 200,
                flex               : 1,
                  renderer : function(grid, a, record){   
                      if (record.data.xrfSpectrumCount != 0){                          
                        return record.data.xrfSpectrumCount;
                      }
                    }
		    },
            
             {
			    text                : 'Hellical',
			    dataIndex           : 'xrfSpectrumCount',
			    width               : 200,
                flex               : 1,
                  renderer : function(grid, a, record){       
                        if (record.data.HellicaldataCollectionGroupCount != 0){                          
                            return record.data.HellicaldataCollectionGroupCount;
                        }                   
                       
                    }
		    },
            {
			    text                : 'Mesh',
			    dataIndex           : 'xrfSpectrumCount',
			    width               : 200,
                flex               : 1,
                  renderer : function(grid, a, record){                        
                        
                          if (record.data.MeshdataCollectionGroupCount != 0){                          
                            return record.data.MeshdataCollectionGroupCount;
                        }    
                    }
		    },
           
         

            {
                text              : 'Start',
                dataIndex         : 'BLSession_startDate',
                flex             : 1,
                renderer          : function(grid, a, record){                    
                                        return record.data.BLSession_startDate;
                }
		   },
            {
                text              : 'End',
                dataIndex         : 'BLSession_endDate',
                  hidden              : true,
                flex             : 1,                
                renderer          : function(grid, a, record){                    
                                        return record.data.BLSession_endDate;
                }
		   }
           ], 
      	   viewConfig : {
                stripeRows : true,
                getRowClass : function(record, rowIndex, rowParams, store){

                    if (record.data.beamLineName != null){
                        
                        if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "SAXS"){
                            return ((rowIndex % 2) == 0) ? "saxs-grid-row-light" : "saxs-grid-row-dark";
                        }
                        if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "MX"){
                            return ((rowIndex % 2) == 0) ? "mx-grid-row-light" : "mx-grid-row-dark";
                        }
                    }
                    return "warning-grid-row";
                }
	    	},
            listeners : {
				'cellclick' : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {                    
					_this.onSelected.notify({
                       proposalCode   : record.data.Proposal_proposalCode,
                       proposalNumber : record.data.Proposal_ProposalNumber
                        
                    });
				}

				

			}
		
		
	});

	/** Adding the tbar **/
	if (this.tbar) {
		this.panel.addDocked({
			xtype : 'toolbar',
			cls : 'toolBarGrid',
			height : 48,
			items : this._getTbar()
		});
	}
	return this.panel;
};




