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
		_this.activeProposal(proposal);
	});
	
}

ManagerWelcomeMainView.prototype.activeProposal = function(proposal) {
	EXI.credentialManager.setActiveProposal(this.username, proposal.code + proposal.number);
};

ManagerWelcomeMainView.prototype.getContainer = function() {
	return {
		  layout: {
		        type: 'anchor'
		    },
		    defaults : {
				anchor : '100%',
				hideEmptyLabel : false },
		    margin : 30,
			bodyStyle : {
				"background-color" : "#E6E6E6" 
			},
		items : [
		         	{
		         		html : "<h1>Welcome Manager Page</h1>"
		         	},
		         	this.proposalGrid.getPanel()
		]
	};
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

ManagerWelcomeMainView.prototype.load = function(username) {
	var _this = this;
	this.username = username;
	/** Loading proposals depending on your role **/
//	var credential = EXI.credentialManager.getCredentialByUserName(username);
//	if (credential != null){
//		if (credential.roles != null){
//			if (credential.isManager() || credential.isLocalContact()){
				this.loadUserView();
//			}
//		}
//	}
	
};
