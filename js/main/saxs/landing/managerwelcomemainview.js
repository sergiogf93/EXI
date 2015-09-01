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
		EXI.proposalManager.get(true);
		_this.activeProposal(proposal);
		_this.panel.setLoading(false);
		
	});
	
	
	this.timeLineWidget = new TimeLineWidget();
	
	this.timeLineWidget.onSelected.attach(function(sender, record){
		var onSuccess = function(sender, proposal){
			_this.activeProposal(proposal);
			location.hash = "/session/nav/" + record.sessionId +"/session";
			
		} 
		EXI.getDataAdapter({onSuccess : onSuccess}).proposal.proposal.getProposalBySessionId(record.sessionId);
	});
}

ManagerWelcomeMainView.prototype.activeProposal = function(proposal) {
	EXI.credentialManager.setActiveProposal(this.username, proposal.code + proposal.number);
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
							        	 layout : 'vbox',
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
	var _this = this;
	var onSuccess = function(sender, sessions){

		/** Parsing box to be showed on the calendar **/
		function parseContent(session){
			if (!session.beamlineOperator){
				session.beamlineOperator = "<span style='color:orange;'>Unknown</span>";
			}
			return ("<div style='font-size:12px;font-weight:bold;'>{0}<span style='font-size:10px;margin:5px;font-weight:normal;'>{1}</span><span style='color:gray; font-size:10px;'>{2} shifts</span></div>").format([session.beamlineName, session.beamlineOperator, session.nbShifts]);
		}
		var parsed = [];
		for (var i = 0; i < sessions.length; i++) {
			parsed.push({
				start :  moment(sessions[i].startDate).toDate(),
				end :  moment(sessions[i].endDate).toDate(),
				content : parseContent(sessions[i]),
				group : sessions[i].beamlineName,
				sessionId : sessions[i].sessionId
			});
		}
		_this.timeLineWidget.load(parsed);
	};
	EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByDate(moment().subtract(3, 'days').format("YYYYMMDD"), moment().add(3, 'days').format("YYYYMMDD"));
};

ManagerWelcomeMainView.prototype.load = function(username) {
	this.username = username;
	/** Loading proposals depending on your role **/
	this.loadUserView();
	this.loadSessions();
};
