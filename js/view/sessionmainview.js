function SessionMainView(args) {
	this.icon = 'images/icon/ic_satellite_black_18dp.png';
	MainView.call(this, args);
	var _this = this;
	
	this.sessionGrid = new SessionGrid({
         width : 700,
         height: 598,
         margin : '0 0 0 20',
        title : "Click on calendar to see the sessions"
    });
}

SessionMainView.prototype.getPanel = MainView.prototype.getPanel;

SessionMainView.prototype.getContainer = function() {
    _this = this;
    
    
    this.subpanel =  Ext.create('Ext.container.Container', {
         layout:  'fit',  
         border : 0,  
        items : [
         
        ]
    });
	this.panel = Ext.create('Ext.container.Container', {
        layout:  'hbox',    
        margin : 10,        
        items: [            
                    {
                        html: '<div style="border:1px solid gray;height:895px" id="' + this.id +'"></div>',
                        height : 900,
                        border : 1 ,
                        width : 650,                                         
                    } ,
                    this.subpanel                               
                    
            ],
        listeners: {
            afterrender: function() {
                _this.showCalendar([]);
            }
        }
    }
    );
	return this.panel;	
};

SessionMainView.prototype.showCalendar = function(data) {
     var _this = this;
     $('#' + _this.id).empty();
     function editEvent(event) {
                         _this.loadByDate(moment(new Date(event.startDate)).format("YYYYMMDD"));
      }
        $('#' + this.id).calendar({
            enableContextMenu: true,
            enableRangeSelection: true,
            selectRange: function(e) {
                editEvent({ startDate: e.startDate, endDate: e.endDate });
            },
            mouseOnDay: function(e) {
                if(e.events.length > 0) {
                    var content = '';
                    
                    for(var i in e.events) {
                        content += '<div class="event-tooltip-content">'
                                        + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
                                        + '<div class="event-location">' + e.events[i].location + '</div>'
                                    + '</div>';
                    }
                
                    $(e.element).popover({ 
                        trigger: 'manual',
                        container: 'body',
                        html:true,
                        content: content
                    });
                    
                    $(e.element).popover('show');
                }
            },
            mouseOutDay: function(e) {
                if(e.events.length > 0) {
                    $(e.element).popover('hide');
                }
            },
            dayContextMenu: function(e) {
                $(e.element).popover('hide');
            },
            dataSource: data
            
        });
};

SessionMainView.prototype.getBadge = function(title, count) {
    if (count){
        if (count != 0){
            return '<span>' + title + '  <span class="badge">' + count +'</span></span><br />';
        }
    }
    return "";
};
SessionMainView.prototype.getLocation = function(session) {
    return this.getBadge("Collect", session.dataCollectionGroupCount)
    + this.getBadge("Images", session.imagesCount)
    + this.getBadge("XRF", session.xrfSpectrumCount)
    + this.getBadge("Energy", session.energyScanCount)
    + this.getBadge("Sample", session.sampleCount)
}; 

SessionMainView.prototype.load = function(sessions) {
	var sessionForCalendar = [];
    for(var i = 0; i < sessions.length; i++){
        sessionForCalendar.push({
           id : sessions[i].sessionId,
           name : sessions[i].Proposal_proposalCode + sessions[i].Proposal_ProposalNumber + "( " + sessions[i].beamLineName + " )",
           location : this.getLocation(sessions[i]),
           startDate : new Date(sessions[i].BLSession_startDate), 
           endDate : new Date(sessions[i].BLSession_endDate)
        });
        
    }
    
    this.showCalendar(sessionForCalendar);
    this.subpanel.insert( this.sessionGrid.getPanel());
    this.sessionGrid.load(sessions);
    
    var _this = this;
    /** Rendering proposal Header */
    if ($("#" + this.id + "_header")){
        if (EXI.proposalManager.getProposals().length > 0){
            var proposal = EXI.proposalManager.getProposals()[0];
            proposal.sessionCount = sessions.length; 
            dust.render('welcomemainviewproposalheader', proposal, function(err, out) {
                
                $("#" + _this.id + "_header").html(out);
                _this.subpanel.insert(0,
                    {
                        html  :   out,
                        border : 0,
                        margin : '0 0 0 20',
                        width : 600
                        
                    });
            });
        }        
    }    
};

SessionMainView.prototype.loadByDate = function(start) {
          var _this = this;
          this.panel.setLoading(true);
          function onSuccess(sender, sessions){              
        	  //_this.displaySessions(data, data.length + " sessions scheduled on " + moment(start, 'YYYYMMDD').format('MMMM Do YYYY'));
             _this.sessionGrid.load(sessions);
        	  _this.panel.setLoading(false);
          }
          /** Increasing one day */
         var username = EXI.credentialManager.getCredentials()[0].activeProposals[0];
         var end = moment(start, "YYYYMMDD").format("YYYYMMDD");                    
         EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposalAndDate(start, end, username);          
};














