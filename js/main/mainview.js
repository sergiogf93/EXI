
function MainView() {
	this.title = "New Tab";
	this.closable = true; 
	this.onSelectionChange = new Event(this);
	this.onSelect = new Event(this);
	this.onDeselect = new Event(this);
	
	this.bodyStyle = {"background-color":"#E6E6E6"};
}

MainView.prototype.getContainer = function() {
	return this.container;
};

MainView.prototype.getPanel = function() {
	this.container = Ext.create('Ext.container.Container', {
		xtype : 'container',
		items : []
	});

	this.panel = Ext.create('Ext.panel.Panel', {
		autoScroll : true,
		title : this.title,
		closable: this.closable,
		icon : this.icon,
		bodyStyle: this.bodyStyle, 
		items :[this.getContainer() ]
	});
	return this.panel;
};