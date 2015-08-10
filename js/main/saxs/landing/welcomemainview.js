WelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
WelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

function WelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Welcome";
	this.closable = true;
	
	
}

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
		         	{
		         		html : "<h1>Welcome Page</h1>"
		         	}
		]
	};
};


WelcomeMainView.prototype.load = function() {
	
};
