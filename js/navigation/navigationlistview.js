function NavigationListView(){
	this.width = 250;
	this.height = Ext.getBody().getHeight() - 215;

	this.onSelect = new Event();
}

NavigationListView.prototype.getSorters = function(){
	return {};
};

NavigationListView.prototype.getPanel = function(){
	var _this =this;
	this.store = Ext.create('Ext.data.Store', {
	    fields:this.getFields(),
	    data : [],
	    sorters: this.sorters,
	    proxy: {
	        type: 'memory',
	        reader: {
	            type: 'json'
	        }
	    }
	});
	
	this.store.on('refresh', function(store, elements){
		var l = store.count();
        var s = l != 1 ? 's' : '';
	});
	
	this.panel =  Ext.create('Ext.grid.Panel', {
	    store: this.store,
	    layout : 'fit',
	    columns: this.getColumns(),
	    width: this.width,
//	    cls : 'navigation',
	    height : this.height,
	    multiSelect : true,
	    viewConfig : {
	    	 emptyText: 'No items to display',
	    	enableTextSelection : true,
	    	preserveScrollOnRefresh : true,
			stripeRows : true,
			getRowClass : function(record, rowIdx, params, store) {
			},
			listeners : {
				itemdblclick : function(dataview, record, item, e) {
					console.log("dbl");
				},
				selectionchange: function( dataview, selected, eOpts ){
						console.log(selected);
				}
			}
		}
	});
	
    this.panel.on('selectionchange', function(view, elements){
    		/** 
    		TODO: For displaying the selected elements 
	        var l = nodes.length;
	        var s = l != 1 ? 's' : '';
	        _this.panel.setTitle('<i style="font-size:10px;">('+l+' item'+s+' selected)</i>');
	        **/
    		var data = [];
    		for ( var index in elements) {
				data.push(elements[index].data);
			}
    		/** Trigger on select event **/
    		_this.onSelect.notify(data);
	    });
	return this.panel; 
};