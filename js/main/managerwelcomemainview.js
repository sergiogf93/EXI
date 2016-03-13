

function ManagerWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Home";
	this.closable = false;


	this.proposalGrid = new ProposalGrid({
		height : 500
	});

	var _this = this;
	this.proposalGrid.onSelected.attach(function(sender, proposal){
		_this.panel.setLoading(true);
		_this.activeProposal(proposal);
		_this.panel.setLoading(false);

	});

	this.timeLineWidget = new SessionTimeLineWidget();

	this.timeLineWidget.onSelected.attach(function(sender, record){
		EXI.setLoadingMainPanel();
		var onSuccess = function(sender, proposals){
			if (proposals.length > 0){
				_this.activeProposal(proposals[0]);
				EXI.setLoadingMainPanel(false);
				if ((record.group == "BM29") || (record.group == "BM12")){
				  	location.hash = "/session/nav/" + record.sessionId +"/session";
				}
				else{
				  	location.hash = "/mx/datacollection/session/" + record.sessionId + "/main";
				}
			}
			else{
				BUI.showError("No proposal Found");
			}

		} ;
		EXI.getDataAdapter({onSuccess : onSuccess}).proposal.proposal.getProposalBySessionId(record.sessionId);
	});
}


ManagerWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;


ManagerWelcomeMainView.prototype.activeProposal = function(proposal) {
	EXI.credentialManager.setActiveProposal(this.username, proposal.code + proposal.number);
	EXI.proposalManager.get(true);
};


ManagerWelcomeMainView.prototype.getContainer = function() {
	this.container = Ext.create('Ext.panel.Panel', {
		autoScroll : true,
    cls : 'border-grid',
    tbar : this.getToolbar(),
		bodyStyle: this.bodyStyle,
		items :[

    ]
	});
	return this.container;
};



ManagerWelcomeMainView.prototype.loadByDate = function(start, end) {
          var _this = this;
          this.container.removeAll();
          var sessionGrid = new SessionGrid({
                                                width: 900,
                                                height:600,
                                                margin : '10 10 10 10'

                                            });
          this.container.insert(sessionGrid.getPanel());

          /** Handling onSelected **/
          sessionGrid.onSelected.attach(function(sender, session){
              _this.activeProposal(session.proposalVO);

          });


          sessionGrid.panel.setLoading(true);
          function onSuccess(sender, data){
              sessionGrid.load(data);
              sessionGrid.panel.setTitle("Sessions scheduled on " + moment(start, "YYYYMMDD").format("DD-MM-YYYY"));
              sessionGrid.panel.setLoading(false);

          };
		      EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByDate(start, end);
};

ManagerWelcomeMainView.prototype.getToolbar = function() {
  var _this = this;

   var dateMenu = Ext.create('Ext.menu.DatePicker', {
        handler: function(dp, date){

          _this.loadByDate(Ext.Date.format(date, 'Ymd'), Ext.Date.format(date, 'Ymd'));

        }
    });

    return Ext.create('Ext.toolbar.Toolbar', {
        width   : 500,
        items: [
          {
               text: 'Choose a Date',
               icon : '../images/icon/sessions.png',
               menu: dateMenu // <-- submenu by reference
           },

            {
                xtype    : 'textfield',
                name     : 'field1',
                width    : 300,
                emptyText: 'enter search term (proposal or title)'
            }
        ]
    });
};


/*
ManagerWelcomeMainView.prototype.getContainer = function() {

	this.panel =  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 10',
				items : [
					{
						tabConfig : {
							title : 'Calendar'
						},
						items : [
						         {
							xtype : 'container',
							layout : 'fit',
							padding : 20,
							items : [
											         this.timeLineWidget.getPanel()
							]
						}
						]
					},
					{
						tabConfig : {
							title : 'Proposal'
						},
						items : [
						         {
							xtype : 'container',
							layout : 'fit',
							padding : 20,
							cls : 'border-grid',
							items : [

							         {
							        	 html : '<div class="welcome-title"><h2>Please select a proposal</h2></div>'
							         },
							         this.proposalGrid.getPanel()
							]
						}
						]
					}

			]});
			return this.panel;

};*/


/*
ManagerWelcomeMainView.prototype.loadUserView = function() {
	var _this = this;
	var onSuccess = function(sender, proposals){
		_this.proposalGrid.load(proposals);
		if (proposals.length == 1){
			_this.activeProposal( proposals[0]);
		}
		_this.proposalGrid.panel.setLoading(false);
	};
	_this.proposalGrid.panel.setLoading();
	EXI.getDataAdapter({onSuccess:onSuccess}).proposal.proposal.getProposals();
};
*/

ManagerWelcomeMainView.prototype.loadSessions = function() {
	this.timeLineWidget.load(moment().format("YYYYMMDD"),moment().add(1, "day").format("YYYYMMDD"));
};



ManagerWelcomeMainView.prototype.load = function(username) {
	this.username = username;
  var today = moment().format("YYYYMMDD");
  this.loadByDate(today, today);
	/** Loading proposals depending on your role **/
	//this.loadUserView();
	//this.loadSessions();
};
