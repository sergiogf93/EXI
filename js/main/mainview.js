
function MainView() {
	this.title = "Not set yet";
}

MainView.prototype.getContainer = function() {
	return null;
};

MainView.prototype.getPanel = function() {
	return {
		xtype : 'panel',
		scroll : 'vertical',
		autoScroll : true,
		margin : "20 5 5 5",
		title : this.title,
//		border : 1,
//		style : {
//			borderColor : 'black',
//			borderStyle : 'solid',
//		},
		bodyStyle: {
		    background: '#ffc',
//		    padding: '10px'
		},
		
		layout : 'hbox',
//		defaults : {
//			borderColor : 'black;',
//			bodyStyle : 'backgroundColor:green;' },
		items :   this.getContainer() 
		};

};