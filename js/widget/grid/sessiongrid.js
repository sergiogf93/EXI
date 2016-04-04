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


/** This method routes the the session list on SAXS and goes to the session information for MX directly 
SessionGrid.prototype.goToSession = function(session) {
  	if (EXI.credentialManager.getTechniqueByBeamline(session.beamlineName) == "SAXS"){
		location.hash = "/session/nav/" + session.sessionId + "/session";
	}
	else{
		location.hash = "/mx/datacollection/session/" + session.sessionId + "/main";
	}
};**/

SessionGrid.prototype.getPanel = function() {
	var _this = this;

	this.store = Ext.create('Ext.data.Store', {
		fields : [ 'startDate', 'beamlineName', 'beamlineOperator', 'diff' ],
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
		emptyText : "No sessions",

		columns : [
        {
			text : 'Proposal',
			dataIndex : 'Proposal_code',
			width : 125,
			renderer : function(grid, a, record){
                    var location = "#";
                	if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamlineName) == "SAXS"){
                        location = "#/session/nav/" + record.data.sessionId + "/session";
                    }
                    else{
                        location = "#/mx/datacollection/session/" + record.data.sessionId + "/main";
                    }
				return "<a href='" +  location +"'>" + record.data.beamlineName + "</a>"; 
			}
		}, 
      	/*{
			      text          : 'Beamline',
			      dataIndex     : 'beamlineName',
			      width         : 100
		    },*/
      	{
          text              : 'Date',
          dataIndex         : 'startDate',
          width             : 150,
          renderer          : function(grid, a, record){
                      return moment(record.data.startDate).format("lll");
          }
		  },
		{
			text                : 'Local Contact',
			dataIndex           : 'beamlineOperator',
			width               : 200
		},
   {
     text : 'Proposal',
     dataIndex : 'beamlineName',
      flex : 0.1,
     renderer : function(grid, a, record){
       return record.data.proposalVO.code + record.data.proposalVO.number;
     }
   },
      {
        text : 'Title',
        dataIndex : 'beamlineName',
        flex : 1,
        renderer : function(grid, a, record){
          return record.data.proposalVO.title;
        }
      }
		],
		viewConfig : {
			stripeRows : true,
			getRowClass : function(record, rowIndex, rowParams, store){

				if (record.data.beamlineName != null){
		        	if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamlineName) == "SAXS"){
		        		 return ((rowIndex % 2) == 0) ? "saxs-grid-row-light" : "saxs-grid-row-dark";
		        	}
		        	if (EXI.credentialManager.getTechniqueByBeamline(record.data.beamlineName) == "MX"){
		        		 return ((rowIndex % 2) == 0) ? "mx-grid-row-light" : "mx-grid-row-dark";
		        	}
				}
				return "warning-grid-row";
	    	},
			listeners : {
				'cellclick' : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					_this.onSelected.notify(record.data);
				},

				'itemdblclick' : function( grid, record, item, index, e, eOpts ){
					 _this.goToSession(record.data);
				}

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




