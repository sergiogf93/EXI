function StatsGrid(args){
	this.width = 10;
	if (args!= null){
		if (args.width != null){
			this.width = args.width;
		}
	}
	this.onSelect = new Event();
}

StatsGrid.prototype.getPanel = function(){
	var _this = this;
	this.store = Ext.create('Ext.data.Store', {
	    fields:['count', 'method']
	});

	this.grid = Ext.create('Ext.grid.Panel', {
		    store: this.store,
		    flex : 1,
		    columns: [
			{ text: 'method',  dataIndex: 'method', flex : 3 },
			{ text: 'count',  dataIndex: 'count', flex : 1 },
			{ 
				text : "Color", 
				dataIndex: 'method', 
				renderer: function(method,b,c){ 
					return "<div style='height:20px;width:20px;background-color:" + COLORADMIN.colors[method] +"'></div>"
				}
			}
		    ],
		    viewConfig	: {
					stripeRows	: true,
					listeners : {
							     cellclick : function( grid, td, cellIndex, record, tr, rowIndex, e, eOpts){
		         			    }
					}
						
			}
	
	});
	return this.grid;
	
};

StatsGrid.prototype.render = function(targetId){
	this.getPanel().render(targetId);
	
};

StatsGrid.prototype.refresh = function(logs){
	var keys = {};
	var data = [];

	for (var i = 0; i < logs.length; i++){
		var log = logs[i];
		if (keys[log.METHOD] == null){
			keys[log.METHOD] = {
				method :  log.METHOD,
				count : 0
			}
		}
		keys[log.METHOD].count = keys[log.METHOD].count + 1;
	}

	var array = $.map(keys, function(value, index) {
	    return [value];
	});
	this.store.loadData(array, false);
};
	


