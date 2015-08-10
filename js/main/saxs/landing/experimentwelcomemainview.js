ExperimentWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
ExperimentWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

function ExperimentWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Welcome";
	this.closable = false;
	
	
}

ExperimentWelcomeMainView.prototype.getContainer = function() {
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
		         		html : "<h1>Exp Welcome Page</h1>"
		         	}
		]
	};
};


ExperimentWelcomeMainView.prototype.load = function() {
	
};
