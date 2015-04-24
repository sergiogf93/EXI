function MainMenu() {
	
	this.onSessionClicked = new Event();
	this.onMacromoleculeClicked = new Event();
	this.onExperimentClicked = new Event();
}

MainMenu.prototype.getPanel = function() {
	var _this = this;
	
	return [{
		xtype : 'splitbutton',
		text : 'Data Explorer',
		margin : '0 0 0 ' + (Ext.getBody().getWidth() / 3),
		width : 200,
		handler : function() {
			alert("The button was clicked");
		},
		menu : new Ext.menu.Menu({
			items : [ {
				text : '<span class="menuCategoryItem">ISPyB</span>' }, {
				text : 'Sessions',
				handler : function() {
					_this.onSessionClicked.notify();
				} }, {
				text : 'Macromolecules',
				handler : function() {
					_this.onMacromoleculeClicked.notify();
				} }, {
				text : 'Experiments',
				handler : function() {
					_this.onExperimentClicked.notify();
				} } ] })

	}, {
		xtype : 'tbspacer' }, {
		xtype : 'splitbutton',
		text : 'Data Reduction Tools',
		width : 200,
		handler : function() {
			alert("The button was clicked");
		},
		menu : new Ext.menu.Menu({
			items : [

			{
				text : '<span class="menuCategoryItem">SEC</span>' },

			{
				text : 'Background Test',
				handler : function() {
					alert("Item 1 clicked");
				} }, {
				text : 'Baseline Checker',
				handler : function() {
					alert("Item 1 clicked");
				} }, {
				text : 'Frame Merge',
				handler : function() {
					alert("Item 1 clicked");
				} },

			'-', {
				text : '<span class="menuCategoryItem">INDIVIDUAL CONCENTRATION</span>' },

			{
				text : 'Subtraction',
				handler : function() {
					alert("Item 1 clicked");
				} }, {
				text : 'Average',
				handler : function() {
					alert("Item 1 clicked");
				} },

			'-', {
				text : '<span class="menuCategoryItem">Combining</span>' },

			{
				text : 'Idealizied Curve "merging"',
				handler : function() {
					alert("Item 1 clicked");
				} } ] })

	}, {
		xtype : 'splitbutton',
		text : 'Analysis',
		width : 200,
		handler : function() {
			alert("The button was clicked");
		},
		menu : new Ext.menu.Menu({
			items : [
			// these will render as dropdown menu items when the arrow is
			// clicked:
			{
				text : '<span class="menuCategoryItem">Online Data Analysis</span>' }, {
				text : 'Abinitio Modeling',
				handler : function() {
					alert("Item 1 clicked");
				} }, {
				text : 'Rambo and Tainer mass estimation',
				handler : function() {
					alert("Item 1 clicked");
				} }, {
				text : '<span class="menuCategoryItem">Apriori</span>' }, {
				text : 'Crysol',
				handler : function() {
					alert("Item 1 clicked");
				} }, {
				text : 'PepsiSAXS',
				handler : function() {
					alert("Item 1 clicked");
				} }, {
				text : 'SASRef',
				handler : function() {
					alert("Item 1 clicked");
				} } ] })

	}, '->', {
		xtype : 'button',
		text : 'log out',
		icon : "images/rsz_logout.png",
		handler : function() {
			AuthenticationController.logout();
		} }];
};