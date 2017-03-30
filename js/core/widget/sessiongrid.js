function SessionGrid(args) {
	this.height = 500;
	this.tbar = false;
	this.id = BUI.id();
	this.width = null;

	this.title = null;
	this.margin = 10;


	this.hiddenGoColumn = true;
    this.isHiddenTitle = true;
    this.isHiddenNumberOfShifts = true;
    
    this.isHiddenPI = true;
    this.isHiddenLocalContact = true;
    
    this.layout = 'fit';
    
    /** Array with the beamline selected to make the filter */
    this.beamlineFilter = [];
    // Term filter value
    this.termFilter = "";
    
	if (args != null) {
         if (args.isHiddenLocalContact != null) {
			this.isHiddenLocalContact = args.isHiddenLocalContact;
		}
        

        if (args.isHiddenNumberOfShifts != null) {
			this.isHiddenNumberOfShifts = args.isHiddenNumberOfShifts;
		}
        if (args.width != null) {
			this.width = args.width;
		}
        if (args.isHiddenTitle != null) {
			this.isHiddenTitle = args.isHiddenTitle;
		}
        if (args.isHiddenPI != null) {
			this.isHiddenPI = args.isHiddenPI;
		}
        
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
            this.layout = null;
		}
		if (args.hiddenGoColumn != null) {
			this.hiddenGoColumn = args.hiddenGoColumn;
		}
	}
	this.onSelected = new Event(this);
};

SessionGrid.prototype.load = function(sessions, title) {    
    /** Filtering session by the beamlines of the configuration file */    
    this.sessions = _.filter(sessions, function(o){ return _.includes(EXI.credentialManager.getBeamlineNames(), o.beamLineName); });
	this.store.loadData(this.sessions, false);
    this.panel.setTitle(this.sessions.length + title);
};

SessionGrid.prototype.filterByBeamline = function(sessions, beamlines) {
    console.log(beamlines);
    if (beamlines){
        if (beamlines.length > 0){
            var filtered = [];
            for(var i = 0; i < beamlines.length; i++){
                filtered = _.concat(filtered, (_.filter(sessions, {'beamLineName': beamlines[i]})));
            }
            return filtered;
        }
        else{
            return sessions;
        }
    }
};

SessionGrid.prototype.getToolbar = function(sessions) {
    var _this = this;
    var items = [];
    
    var myHandler = function(a,selected,c){                    
                    if (selected){
                        _this.beamlineFilter.push(a.boxLabel);
                    }
                    else{               
                        _this.beamlineFilter =_.remove(_this.beamlineFilter, function(n) {                            
                                return n  != a.boxLabel;
                        });
                    }

                    var filtered = _this.filterByBeamline(_this.sessions,_this.beamlineFilter);
                    if (_this.termFilter != ""){
                        filtered = _this.filterByTerm(filtered,_this.termFilter);
                    }
                    _this.store.loadData(filtered,false);
                    _this.panel.setTitle(filtered.length + " sessions");
    };

    for (var i =0; i<EXI.credentialManager.getBeamlines().length; i++){
        items.push({           
                xtype: 'checkbox',
                boxLabel : EXI.credentialManager.getBeamlines()[i].name,
                name : EXI.credentialManager.getBeamlines()[i].name,
                handler : myHandler 
            
        });
    }

    items.push("->",
                {
                    xtype    : 'textfield',
                    name     : 'proposalFilter',
                    width    : 300,
                    emptyText: 'Filter by term (proposal or title) or comment',
                    listeners : {
                        specialkey : function(field, e) {
                            if (e.getKey() == e.ENTER) {
                                _this.termFilter = field.getValue();
                                var filtered = _this.filterByTerm(_this.sessions, _this.termFilter);
                                if (_this.beamlineFilter.length > 0) {
                                    filtered = _this.filterByBeamline(filtered,_this.beamlineFilter);
                                }
                                _this.store.loadData(filtered,false);
                                _this.panel.setTitle(filtered.length + " sessions");
                            }
                        } 
                    } 
                }
    );

    return Ext.create('Ext.toolbar.Toolbar', {  
        items: items
    });
};

SessionGrid.prototype.filterByTerm = function (sessions,term) {
    if (term == ""){
        return sessions;
    } else {
        var result = [];
        for (var i = 0 ; i < sessions.length ; i++){
            var proposalId = sessions[i]["Proposal_proposalCode"] +  sessions[i]["Proposal_ProposalNumber"];
            var title = sessions[i]["Proposal_title"];
            var comments = sessions[i].comments;
            if (title == null){
                title = "";
            }
            if (comments == null){
                comments = "";
            }
            if ((comments.toUpperCase().match(term.toUpperCase())) || (proposalId.toUpperCase().match(term.toUpperCase())) ||(title.toUpperCase().match(term.toUpperCase()))){
                result.push(sessions[i]);
            }
        }
        return result;
    }
}

SessionGrid.prototype.getPanel = function() {
	var _this = this;

    var labContacts = EXI.proposalManager.getLabcontacts();
    
    var dataCollectionHeader = "Session synopsis";
    var technique = null;
    var beamlines = EXI.credentialManager.getBeamlineNames();
    if (beamlines.length > 0) {
        technique = EXI.credentialManager.getTechniqueByBeamline(beamlines[0]);
    }
    if (technique){
        dust.render("session.grid." + technique.toLowerCase() + ".datacollection.header.template",[],function(err,out){
            dataCollectionHeader = out;
        });
    } else {
        techniche = "MX";
    }
   
    this.store = Ext.create('Ext.data.Store', {
		fields : ['Proposal_ProposalNumber', 'beamLineName', 'beamLineOperator', 'Proposal_title', 'Person_emailAddress', 'Person_familyName', 'Person_givenName', 'nbShifts', 'comments'],
		emptyText : "No sessions",
		data : []
	});    


	this.panel = Ext.create('Ext.grid.Panel', {
		title : this.title,
		store : this.store,
        tbar : this.getToolbar(),		
		icon : '../images/icon/sessions.png',
		cls : 'border-grid',
		minHeight: 300,
        width : this.width,
        height : this.height,
		margin : this.margin,
		layout : this.layout,
		columns : [
              {
                    text              : '',
                    dataIndex         : 'BLSession_startDate',
                    flex             : 1,
                    hidden              : true,
                    renderer          : function(grid, a, record){                                    
                                               var html = "";
                                               if (record.data.BLSession_startDate){
                                                    record.data.start =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('MMMM Do YYYY');
                                                    record.data.day =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('Do');
                                                    record.data.month =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('MMMM');
                                                    record.data.year =  moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('YYYY');
                                               }
                                               dust.render("session.grid", record.data, function(err, out){
                                                    html = html + out;
                                               });
                                               return html;
                    }
              },
              {
                            text              : 'Start',
                            dataIndex         : 'BLSession_startDate',
                            flex              : 1,
                            hidden            : false,
                            renderer          : function(grid, a, record){                                 
                                                     
                                                    var location = "#";
                                                    if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "SAXS"){
                                                        location = "#/session/nav/" + record.data.sessionId + "/session";
                                                    }
                                                    else{
                                                        location = "#/mx/datacollection/session/" + record.data.sessionId + "/main";
                                                    }
                                                    if (record.data.BLSession_startDate){                 
                                                         return "<a href='" +  location +"'>" + moment(record.data.BLSession_startDate, 'MMMM Do YYYY, h:mm:ss a').format('DD-MM-YYYY') + "</a>"; 
                                                    }
                            }
		     },
             {
                    text : 'Beamline',
                    dataIndex : 'beamLineName',
                    width : 125,
                    hidden : false,
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
                dataIndex : 'Proposal_ProposalNumber',
                flex : 1,
                hidden : false,
                renderer : function(grid, a, record){
                    var proposal = record.data.Proposal_proposalCode + record.data.Proposal_ProposalNumber;
                    return "<a href='#/session/nav' data-toggle='tooltip' title='Open proposal " + proposal +"'>" + proposal + "</a>"; 
                }
          },       
          {
			    text                : 'Shifts',
			    dataIndex           : 'nbShifts',
                hidden              : this.isHiddenNumberOfShifts,
                flex                : 0.5
		    },
           {
			    text                : 'Local Contact',
			    dataIndex           : 'beamLineOperator',
			    width               : 200,
                hidden              : this.isHiddenLocalContact,
                flex                : 1
		    },
            {
			    text                : 'Title',
			    dataIndex           : 'Proposal_title',
			    width               : 200,
                hidden              : this.isHiddenTitle,
                flex               : 4
		    },
            {
			    text                : 'PI',
			    dataIndex           : 'Proposal_title',
			    width               : 200,
              
                 hidden              : this.isHiddenPI,
                renderer : function(grid, a, record){
                        var labContactsFiltered = _.filter(labContacts,function (l) {return l.personVO.personId == record.data.Person_personId;});
                        var piInformation = "";
                        if (record.data.Person_givenName) {                       
                            piInformation = record.data.Person_familyName + ", " + record.data.Person_givenName;
                        } else {
                            piInformation = record.data.Person_familyName
                        }
                        if (labContactsFiltered.length > 0){
                            href = "#/proposal/address/" + labContactsFiltered[0].labContactId + "/main";
                            piInformation = '<a href=' + href + '>' + piInformation + '</a>';
                        }
                        return piInformation;
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
                text                : dataCollectionHeader,
			    dataIndex           : 'Person_emailAddress',
                 flex               : 3,
                renderer : function(grid, a, record){                    
                    var html = "";
                    dust.render("session.grid." + technique.toLowerCase() + ".datacollection.values.template",record.data,function(err,out){
                        html = out;
                    });                                                   
                    return html;
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
		   },
           {
			    text                : 'Comments',
			    dataIndex           : 'comments',
                hidden              : false,
                flex                : 2,
                renderer            : function(grid, a, record){    
                                        if (record.data.comments){                
                                            return "<div style='width:50px; wordWrap: break-word;'>" + record.data.comments + "</div>";
                                        }
                }
                


		    },
           ], 
      	   viewConfig : {
                stripeRows : true,
                getRowClass : function(record, rowIndex, rowParams, store){
                    /*
                    if (record.data.beamLineName != null){
                        
                        if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "SAXS"){
                            return ((rowIndex % 2) == 0) ? "saxs-grid-row-light" : "saxs-grid-row-dark";
                        }
                        if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamLineName) == "MX"){
                            return ((rowIndex % 2) == 0) ? "mx-grid-row-light" : "mx-grid-row-dark";
                        }
                    }
                    return "mx-grid-row-dark";*/
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
	return this.panel;
};




