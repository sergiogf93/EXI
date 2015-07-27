/**
 * Main class used for the west panel. Main purpose is the navigation
 */

function NavigationListView(){
	this.width = 250;
	this.height = Ext.getBody().getHeight() - 215;

	/** Event is triggered when a element has been selected from the list **/
	this.onSelect = new Event();
}

NavigationListView.prototype.getSorters = function(){
	return {};
};

NavigationListView.prototype.load = function(data){
	this.store.loadData(data);
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
	
	this.panel =  Ext.create('Ext.grid.Panel', {
	    store: this.store,
	    layout : 'fit',
	    columns: this.getColumns(),
	    width: this.width,
	    height : this.height,
	    multiSelect : true,
	    viewConfig : {
	    	 emptyText: 'No items to display',
	    	enableTextSelection : true,
	    	preserveScrollOnRefresh : true,
			stripeRows : true
		}
	});
	
    this.panel.on('selectionchange', function(view, elements){
    		var data = [];
    		for ( var index in elements) {
				data.push(elements[index].data);
			}
    		/** Trigger on select event **/
    		_this.onSelect.notify(data);
	    });
	return this.panel; 
};