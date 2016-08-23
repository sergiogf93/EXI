
/**
* Class for the manager landing page. It inherits from MainView
*
* @class UserWelcomeMainView
* @constructor
*/
function UserWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Home";
	this.closable = false;

}


//UserWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;


/**
* This sets an active proposal into the credential Manager. It also retrieve all the information about the proposal: shipments, macromolecules, crystals, buffers, etc.. and store 
* them in a local storage
*
* @method activeProposal
* @param {Object} proposal Proposal object that should container at least: [code, number]
*/
UserWelcomeMainView.prototype.activeProposal = function(proposalCode, proposalNumber) {
    
    EXI.mainStatusBar.showBusy("Loading proposal " + proposalCode +  proposalNumber); 
    
	EXI.credentialManager.setActiveProposal(this.username, proposalCode + proposalNumber);
    EXI.proposalManager.clear();
	/** I don't need this to be synchronous **/	
    EXI.proposalManager.onActiveProposalChanged = new Event();
    EXI.proposalManager.onActiveProposalChanged.attach(function(){
        EXI.mainStatusBar.showReady();
        console.log(EXI.proposalManager.get());
    });
	EXI.proposalManager.get();
};


UserWelcomeMainView.prototype.getPanel = function() {
	this.panel = Ext.create('Ext.panel.Panel', {
		autoScroll : true,
        cls : 'border-grid',
        height : '100%',
		bodyStyle: this.bodyStyle,
		items :[

    ]
	});
	return this.panel;
};


/**
* Retrieves all sessions for the proposal
*
* @method loadSessions
*/
UserWelcomeMainView.prototype.loadSessions = function() {
    var _this = this;
    this.panel.setLoading(true);
    function onSuccess(sender, data){
        var realLength = data.length;
        data = _.slice(data, 0, 500);
        // Sorting by start date because sessionId does not sort by date
        _(data).forEach(function(value) {
                value['ms'] = moment(value.BLSession_startDate, 'MMM DD, YYYY h:mm:ss a').format('x');
        });
        data = _.orderBy(data, ['ms'], ['desc']);
        if (data.length == realLength){
            _this.displaySessions(data, data.length + " sessions");
        }
        else{
            _this.displaySessions(data, data.length + " sessions (omitting " + (realLength - data.length) + " old sessions)");
        }
        _this.panel.setLoading(false);
    }
    EXI.getDataAdapter({onSuccess:onSuccess}).proposal.session.getSessionsByProposal(this.username);
};

UserWelcomeMainView.prototype.displaySessions = function(sessions, title) {
    var _this = this;
    this.panel.removeAll();
    var sessionGrid = new SessionGrid({
                        width: 900,
                        height:600,
                        margin : '10 10 10 10'
    });
    this.panel.insert(sessionGrid.getPanel());
    /** Handling onSelected **/
    sessionGrid.onSelected.attach(function(sender, args){
        EXI.proposalManager.clear();
        _this.activeProposal(args.proposalCode, args.proposalNumber);
    });
    sessionGrid.load(sessions);
    sessionGrid.panel.setTitle(title);
};

UserWelcomeMainView.prototype.load = function(username) {
  this.username = username;
  this.loadSessions(); 
};



