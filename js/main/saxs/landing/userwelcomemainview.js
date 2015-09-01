UserWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
UserWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

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
		_this.activeProposal(proposal);
	});
	
}

UserWelcomeMainView.prototype.activeProposal = function(proposal) {
	EXI.credentialManager.setActiveProposal(this.username, proposal.code + proposal.number);
};




UserWelcomeMainView.prototype.getContainer = function() {
return  Ext.createWidget('tabpanel',
		{
			plain : true,
			margin : '20 0 0 10',
			items : [
				{
					tabConfig : {
						title : 'Welcome'
					},
					items : [ {
						xtype : 'container',
						layout : 'fit',
						padding : 20,
						cls : 'border-grid',
						items : [ 
						        
						         {
						        	 html : '<div class="welcome-title"><h2>Welcome to ExiSAXS</h2></div>'
						         },
						         {
						        	 html : '<div class="welcome-title">If you are new on ISPyB these are the main actions you may be interested in doing </div>'
						         },
						         {
						        	xtype : 'container',
						        	layout : 'hbox',
						        	cls : 'option-bar-menu',
						        	items :[
						        	        {
									        	 xtype : 'button',
									        	 cls : 'square-option',
									        	 maxWidth : 200,
									        	 minWidth : 200,
									        	 height : 100,
									        	 text : '<div class="square-option-text"; >Create Your Samples <br />and send them to the <br/>beamline</div>',
									        	 icon : '../images/icon/shipping.png',
									        	 iconAlign : 'top',
									        	 handler : function(){
									        		 location.hash = '/prepare/shipmentpreparation';
									        	 }
									        		 
									        	 
									         },
									         {
									        	 xtype : 'button',
									        	 cls : 'square-option',
									        	 maxWidth : 200,
									        	 minWidth : 200,
									        	 margin : '0 0 0 50',
									        	 height : 100,
									        	 text : '<div class="square-option-text"; >Planify your experiment</div>',
									        	 icon : '../images/icon/edit.png',
									        	 iconAlign : 'top',
									        	 handler : function(){
									        		 alert("To be imlemented");
									        	 }
									         },
									         {
									        	 xtype : 'button',
									        	 cls : 'square-option',
									        	 maxWidth : 200,
									        	 minWidth : 200,
									        	 margin : '0 0 0 50',
									        	 height : 100,
									        	 text : '<div class="square-option-text"; >Explore your data</div>',
									        	 icon : '../images/icon/sessions.png',
									        	 iconAlign : 'top',
									        	 handler : function(){
									        		 alert("To be imlemented");
									        	 }
									         }]
						         }
						       
						        
						]
					}
				
					]
				},
				{
					tabConfig : {
						title : 'Proposals'
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
};


UserWelcomeMainView.prototype.loadUserView = function() {
	var _this = this;
	this.panel.setLoading();
	var onSuccess = function(sender, proposals){
		_this.proposalGrid.load(proposals);
		if (proposals.length == 1){
			_this.activeProposal( proposals[0]);
		}
		_this.panel.setLoading(false);
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
