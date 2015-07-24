function SubtractionSelectorWindow(){
	
	this.grid = new QueueGrid({
		height : 450,
		maxHeight : 300,
		width : 1000,
		title : false,
		collapsible : false,
		selectionMode : 'single',
		sorters : [ {
			property : 'macromoleculeAcronym',
			direction : 'ASC' } ] });
	
	var _this = this;
	this.grid.onSelect.attach(function(sender, selected){
		_this.selected =  [selected];
	});
	
	this.onSelect = new Event();
	
	this.selected = [];
};

SubtractionSelectorWindow.prototype._getButtons = function() {
	var _this = this;
	return [ {
		text : 'Select',
		handler : function() {
			_this.onSelect.notify(_this.selected);
			_this.window.destroy();
		}
	},{
		text : 'Cancel',
		handler : function() {
			_this.window.destroy();
			
		}
	} ];
};


SubtractionSelectorWindow.prototype.getToolBar = function(){
	var _this = this;
	return Ext.create('Ext.toolbar.Toolbar', {
		height: 60,
	    items: [
	        {
	            xtype    : 'textfield',
	            name     : 'field1',
	            width: 500,
	            emptyText: 'enter search macromolecule',
	            listeners: {
	                specialkey: function(field, e){
	                    if (e.getKey() == e.ENTER) {
	                    	 var adapter = new DataAdapter();
	        	        	 adapter.onSuccess.attach(function(sender, data){
	        	        		 _this.grid.load(data);
	        	        		 _this.window.setLoading(false);
	        	        	 });
	        	        	 _this.window.setLoading();
	        	        	 adapter.getDataCollectionsByKey('macromoleculeAcronym', field.getValue());
	        	        	 
	                    }
	                }
	            }
	        }
	    ]
	});
};
SubtractionSelectorWindow.prototype.show = function(){
	var _this = this;
	this.window = Ext.create('Ext.window.Window', {
	    title: 'Select a data collection',
	    modal : true,
	    height: 500,
	    width: 1050,
//	    layout: 'fit',
	    tbar : this.getToolBar(),
	    items: [this.grid.getPanel()],
	    buttons : this._getButtons()
	});
	this.window.show();
};