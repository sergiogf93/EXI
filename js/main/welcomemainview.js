WelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
WelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

function WelcomeMainView() {
	this.icon = 'images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Home";
	this.closable = false;
	
	
	this.proposalGrid = new ProposalGrid({
		height : 300
	});
	
	var _this = this;
	this.proposalGrid.onSelected.attach(function(sender, proposal){
		_this.activeProposal(proposal);
	});
	
}

WelcomeMainView.prototype.activeProposal = function(proposal) {
	EXI.credentialManager.setActiveProposal(this.username, proposal.code + proposal.number);
};

WelcomeMainView.prototype.getContainer = function() {
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
		         	this.proposalGrid.getPanel()
		]
	};
};

WelcomeMainView.prototype.loadUserView = function() {
	var _this = this;
	
	var onSuccess = function(sender, proposals){
		_this.proposalGrid.load(proposals);
		if (proposals.length == 1){
			_this.activeProposal( proposals[0]);
		}
	};
	
	EXI.getDataAdapter({onSuccess:onSuccess}).proposal.proposal.getProposals();
};

WelcomeMainView.prototype.load = function(username) {
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
