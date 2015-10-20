ManagerWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
ManagerWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

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
		var onSuccess = function(sender, proposals){
			if (proposals.length > 0){
				_this.activeProposal(proposals[0]);
				location.hash = "/session/nav/" + record.sessionId +"/session";
			}
			else{
				BUI.showError("No proposal Found");
			}
			
		} ;
		EXI.getDataAdapter({onSuccess : onSuccess}).proposal.proposal.getProposalBySessionId(record.sessionId);
	});
}

ManagerWelcomeMainView.prototype.activeProposal = function(proposal) {
	EXI.credentialManager.setActiveProposal(this.username, proposal.Proposal_proposalCode + proposal.Proposal_proposalNumber);
	EXI.proposalManager.get(true);
};


ManagerWelcomeMainView.prototype.getContainer = function() {
	this.panel =  Ext.createWidget('tabpanel',
			{
				plain : true,
				margin : '20 0 0 10',
				items : [
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
					},
					{
						tabConfig : {
							title : 'Sessions'
						},
						items : [
						         {
							xtype : 'container',
							layout : 'fit',
							padding : 20,
							cls : 'border-grid',
							items : [ 
							        
							         {
							        	 html : '<div class="welcome-title"><h2>Please select a Session</h2></div>'
							         },
							         {
							        	 xtype : 'container',
							        	 layout : 'fit',
							        	 items : [
											         this.timeLineWidget.getPanel()
							        	 ]
							         }
							]
						}
						]
					}
			]});
			return this.panel;
	};
	

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

ManagerWelcomeMainView.prototype.loadSessions = function() {
	this.timeLineWidget.loadSessions(moment().startOf('week').format("YYYYMMDD"),moment().endOf('week').add(1, 'days').format("YYYYMMDD"));
};

ManagerWelcomeMainView.prototype.load = function(username) {
	this.username = username;
	/** Loading proposals depending on your role **/
	this.loadUserView();
	this.loadSessions();
};
