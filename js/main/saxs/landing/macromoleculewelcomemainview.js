MacromoleculeWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
MacromoleculeWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

function MacromoleculeWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Welcome";
	this.closable = false;
	
	
}

MacromoleculeWelcomeMainView.prototype.getContainer = function() {
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
		         		html : "<h1>MAcromolecule Welcome Page</h1>"
		         	}
		]
	};
};


MacromoleculeWelcomeMainView.prototype.load = function() {
	
};
