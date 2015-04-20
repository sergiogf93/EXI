function DateSelectorPanel(args){


	this.width = 10;
	this.height = 300;

	if (args!= null){
		if (args.width != null){
			this.width = args.width;
		}
		if (args.height != null){
			this.height = args.height;
		}
	}
	this.onSelect = new Event();
}

DateSelectorPanel.prototype.getPanel = function(){
	var _this = this;
	this.store = Ext.create('Ext.data.Store', {
	    fields:['date']
	});

	this.grid = Ext.create('Ext.grid.Panel', {
    		    title: 'Select a Date',
		    store: this.store,
		    columns: [
			{ text: 'Date',  dataIndex: 'date', flex : 1 }
		    ],
		    width: this.width,	
			height 	   : this.height,
		    viewConfig	: {
					stripeRows	: true,
					listeners : {
							     cellclick : function( grid, td, cellIndex, record, tr, rowIndex, e, eOpts){
									_this.onSelect.notify(record.data.date);
		         			    }
					}
						
			}
	
	});
	return this.grid;
	
};

DateSelectorPanel.prototype.render = function(targetId){
	this.getPanel().render(targetId);
	
};

DateSelectorPanel.prototype.refresh = function(logs){
	var keys = {};
	
	var data = [];
	for (key in logs){
		data.push({'date' : logs[key]});
	}
	this.store.loadData(data, false);
	//this.container.appendChild(table);
};


