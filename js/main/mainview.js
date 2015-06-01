
function MainView() {
	this.title = "Not set yet";
	
	this.onSelectionChange = new Event(this);
}

MainView.prototype.getContainer = function() {
	return null;
};

MainView.prototype.getPanel = function() {
	this.container = Ext.create('Ext.container.Container', {
		xtype : 'container',
		items : []
	});

	this.panel = Ext.create('Ext.panel.Panel', {
		autoScroll : true,
		title : this.title,
		closable: true,
		icon : this.icon,
		layout : 'fit',
		items :[this.container ]
	});
	return this.panel;
};