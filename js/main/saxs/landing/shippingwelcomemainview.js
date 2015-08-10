ShippingWelcomeMainView.prototype.getPanel = MainView.prototype.getPanel;
ShippingWelcomeMainView.prototype.getContainer = MainView.prototype.getContainer;

function ShippingWelcomeMainView() {
	this.icon = '../images/icon/rsz_ic_home_black_24dp.png';

	MainView.call(this);
	this.title = "Welcome";
	this.closable = false;
	
	
}

ShippingWelcomeMainView.prototype.getContainer = function() {
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
		         		html : "<h1>Shipping Welcome Page</h1>"
		         	}
		]
	};
};


ShippingWelcomeMainView.prototype.load = function() {
	
};
