function UserWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Home";
	this.closable = false;
	
	
	this.proposalGrid = new ProposalGrid({
		height : 300
	});
	
	var _this = this;
	this.proposalGrid.onSelected.attach(function(sender, proposal){
		_this.panel.setLoading(true);
		_this.activeProposal(proposal);
		_this.panel.setLoading(false);
	});
	
	this.todaySessionsGrid = new SessionGrid(
			{
				width : null,
				height : 125,
				title : "You have got sessions scheduled for today",
				hiddenGoColumn : false
			}
	);
	
	this.futureSessionsGrid = new SessionGrid(
			{
				width : null,
				height : 450,
				title : "Next scheduled sessions",
				margin : "20 0 0 00",
			}
	);
	
	this.previousSessionsGrid = new SessionGrid(
			{
				width : null,
				height : 450,
				title : "Previous sessions",
				margin : "20 0 0 10",
				hiddenGoColumn : false
			}
	);

	
	EXI.credentialManager.onActiveProposalChanged.attach(function(sender, proposal){
//		debugger
//		_this.mainMenu.populateCredentialsMenu();
	});
//	EXI.proposalManager.onActiveProposalChanged = function(sender, proposal){
//		debugger
//		
//	};
//	
}

UserWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
UserWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;


UserWelcomeMainView.prototype.activeProposal = function(proposal) {
	EXI.credentialManager.setActiveProposal(this.username, proposal.Proposal_proposalCode + proposal.Proposal_proposalNumber);
	EXI.proposalManager.get(true);
};

UserWelcomeMainView.prototype.getContainer = function() {

		this.panel =  Ext.createWidget('tabpanel',
		{
			plain : true,
			margin : '20 10 10 10',
			items : [

				{
					tabConfig : {
						title : 'Sessions',
						
					},
					listeners : {
						afterrender : function(){
//							var cal = CALENDAR();
//							cal.init();
						}
					},
					items : [ {
						xtype : 'container',
						id : this.id + "sessions",
						layout : 'fit',
						padding : 10,
						style : {
							borderColor : 'gray',
							borderStyle : 'solid',
							borderWidth : '1px',
							'background-color' : 'white' 
						},
						items : [
						         {
									 	html : "<div>Where is my beamline? <a target='blank' href='http://www.esrf.eu/files/live/sites/www/files/UsersAndScience/Experiments/Beamlines/beamlines-2015.jpg'>Here there is a map</a></div>",
									 	height : 20
							     },
						         {
						        	 xtype : 'container',
						        	 layout : 'hbox',
						        	 items : [
						        	          		this.futureSessionsGrid.getPanel(),
						        	          		this.previousSessionsGrid.getPanel()
				        	          ]
						         }
						      
						]
					}

					]
				},
				{
					tabConfig : {
						title : 'Proposals',
						
					},
					items : [ {
						xtype : 'container',
						layout : 'fit',
						height : 700,
						padding : 20,
						style : {
							borderColor : 'gray',
							borderStyle : 'solid',
							borderWidth : '1px',
							'background-color' : 'white' 
						},
						items : [ 
						         
						         this.proposalGrid.getPanel()
						]
					}

					]
				}
		]});
		
		this.panel.on("afterrender", function(){
		});
		return this.panel;
};


UserWelcomeMainView.prototype.parseSessionsByDate = function(sessions) {
	var olderSessions = [];
	var futureSessions = [];
	var todaySessions = [];
	
	
	for (var i = 0; i < sessions.length; i++) {
		/** Older **/
		sessions[i].diff = moment(sessions[i].startDate).diff(moment(), 'days');
		if (sessions[i].diff == 0){
			todaySessions.push(sessions[i]);
		}
		else{
			if (sessions[i].diff < 0){
				olderSessions.push(sessions[i]);
			}
			else{
				futureSessions.push(sessions[i]);
			}
		}
	}
	
	futureSessions.sort(function(a, b){
		return a.diff - b.diff;
	});
	
	return {
		olderSessions : olderSessions,
		futureSessions : futureSessions,
		todaySessions : todaySessions
	};
};


UserWelcomeMainView.prototype.loadProposal = function(proposals) {
	var _this = this;
	
	function onSessions(sender, sessions){
			_this.panel.setLoading(false);
			var mySessions = _this.parseSessionsByDate(sessions);
			if (mySessions.olderSessions.length > 0){
				console.log(mySessions.olderSessions);
				_this.previousSessionsGrid.load(mySessions.olderSessions);
			}
			
			if (mySessions.futureSessions.length > 0){
				_this.futureSessionsGrid.load(mySessions.futureSessions);
			}
			
			if (mySessions.todaySessions.length > 0){
				Ext.getCmp(_this.id + "sessions").insert(0, _this.todaySessionsGrid.getPanel());
				_this.todaySessionsGrid.load(mySessions.todaySessions);
			}
			
	}
		
		
	for (var i = 0; i < proposals.length; i++) {
		_this.activeProposal(proposals[i]);
		_this.panel.setLoading("Loading Sessions");
		EXI.getDataAdapter({onSuccess:onSessions}).proposal.session.getSessions();
	}
};

UserWelcomeMainView.prototype.loadUserView = function() {
	var _this = this;
	this.panel.setLoading("Loading Proposal");
	var onSuccess = function(sender, proposals){
		proposals.sort(function(a, b)
		{
		  return a["Proposal_proposalId"] - b["Proposal_proposalId"];
		});
	
		
		_this.proposalGrid.load(proposals);
		console.log(proposals);
		if (proposals.length> 0){
			_this.loadProposal(proposals);
		}
	};
	EXI.proposalManager.get();
	EXI.getDataAdapter({onSuccess:onSuccess}).proposal.proposal.getProposals();
};

UserWelcomeMainView.prototype.load = function(username) {
	var _this = this;
	this.username = username;
	
	/** Loading proposals depending on your role **/
	var credential = EXI.credentialManager.getCredentialByUserName(username);
	if (credential != null){
		if (credential.roles != null){
			if (credential.roles.length == 0){
				/** Assuming they are always users **/
				credential.roles.push("user");
			}
			if (credential.isManager()){
				alert("You are manager");
				return;
			}
			
			if (credential.isLocalContact()){
				alert("You are localContact");
				return;
			}
			this.loadUserView();
		}
	}
	
};
