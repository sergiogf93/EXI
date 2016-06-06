/**
* This class renders a grid that allows user to select the dewars from a list.
*
* @class DewarListSelector
* @constructor
*/
function DewarListSelector(args){
    this.height = 600;
    if (args != null){
        if (args.height  != null){
            this.height = args.height;
            
        }
    }
    this.onSelect = new Event(this);
    this.onDeselect = new Event(this);
    this.onSelectionChange = new Event(this);
}


/**
* My method description.  Like other pieces of your comment blocks, 
* this can span multiple lines.
*
* @method load
* @param {Object} dewars Array of containers
*/
DewarListSelector.prototype.load = function(dewars){
    this.dewars = dewars;
    /** Filter by Dewars */       
    var filtered = _.keyBy(dewars, "shippingId");
    var data = [];
    _(filtered).forEach(function(value) {
        data.push(value);
    });
    this.panel.setTitle(this.dewars.length + " containers on " + data.length + " shipments");
    this.store.loadData(data);

};

/**
* Return the number of containers and samples for a given dewar 
*
* @method getStatsByDewarId
* @param {Integer} dewarId DewarId
*/
DewarListSelector.prototype.getStatsByDewarId = function(shippingId){ 
    var _this = this;
    var containers = _.filter(this.dewars, function(e){return e.shippingId == shippingId;});
    var sampleCount = 0;
   
    
  
    
    _(containers).forEach(function(value) {
        sampleCount = sampleCount + value.sampleCount;
    });
  
    
    return {
                samples     : sampleCount,
                dewars      : Object.keys(_.groupBy(containers, "dewarId")).length,
                containers   : containers.length
        
    };
};

DewarListSelector.prototype.getSelectedData = function() {
	var elements = this.panel.getSelectionModel().selected.items;
	var data = [];
	for (var i = 0; i < elements.length; i++) {
		data.push(elements[i].data);
	}
	return data;
};

DewarListSelector.prototype.getStore = function(){
    this.store = Ext.create('Ext.data.Store', {
        fields:['beamlineLocation', 'storageLocation','containerStatus','containerType','sessionStartDate','creationDate','beamLineOperator','shippingStatus','shippingName', 'barCode', 'beamlineName', 'dewarCode', 'dewarStatus', 'sampleChangerLocation', 'sampleCount', 'sessionStartDate', 'type']
    });
    return this.store;
};
DewarListSelector.prototype.getPanel = function(){
    var _this = this;
   /*
    var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect		: true,
		mode				: 'MULTI',
		listeners			: {
						        selectionchange: function (sm, selections) {
						           
						        	_this.onSelectionChange.notify(_this.getSelectedData() );
						        },
						        select: function (sm, selected) {
						        	_this.onSelect.notify(selected.data);
                                    
						        },
						        deselect: function (sm, deselected) {
						        	_this.onDeselect.notify(deselected.data);
						        }
		}
	});*/
    

    this.panel = Ext.create('Ext.grid.Panel', {
            title: 'Select dewars',
            store: this.getStore(),
            cls : 'border-grid',
            //selModel : selModel,
            height : this.height, 
            flex : 0.3,  
            collapsible : true,           
            margin : 5,
            columns: [ 
                {
                    text    : 'Shipment',
                    columns : [
                         { text: 'Name',  dataIndex: 'shippingName', width: 150 },
                         { text: 'Status',  dataIndex: 'shippingStatus', flex: 1 },
                         { text: 'Created on',  dataIndex: 'creationDate', flex: 1,  hidden : true,
                            renderer : function(grid, a, record){
                                if (record.data.creationDate){
                                    return moment(record.data.creationDate, "'MMMM Do YYYY, h:mm:ss a'").format("DD/MM/YYYY");
                                }     
                                
                            } 
                        },
                                                 
                    ]                                         
                },
                {
                    text    : 'Experiment',
                    columns : [
                            { text: 'Start on',  dataIndex: 'sessionStartDate', flex: 2, 
                            renderer : function(grid, a, record){
                                if (record.data.sessionStartDate){
                                    return moment(record.data.sessionStartDate, "'MMMM Do YYYY, h:mm:ss a'").format("DD/MM/YYYY");
                                }     
                                
                            } 
                        },
                            { text: 'beamline', dataIndex: 'beamlineName', flex: 1 },     
                            { text: 'Local contact',  dataIndex: 'beamLineOperator', flex: 2, hidden : true  }                 
                    ]                                         
                },
               /* {
                    text    : 'Dewar',
                    columns : [
                            
                            { text: 'Name',  dataIndex: 'dewarCode' },
                            { text: 'Status', dataIndex: 'dewarStatus', flex: 1 },
                            { text: 'Barcode', dataIndex: 'barCode', flex: 1 , hidden : true},               
                    ]                                         
                },*/
                 {      
                        text: '# Dewars<br /> # Containers<br /> (# Samples)',     
                        flex: 1,
                        renderer : function(grid, e, record){
                            var stats =  _this.getStatsByDewarId(record.data.shippingId);
                            return stats.dewars + " / " + stats.containers + " (" +  stats.samples + ")";
                            
                        }
                },
                {
                    xtype: 'actioncolumn',
                    flex : 0.3,
                    items: [
                               
                                 {
                                    icon: '../images/icon/add.png',
                                    handler: function (grid, rowIndex, colIndex) {
                                        
                                            grid.getSelectionModel().select(rowIndex);
                                            
                                            _this.onSelect.notify(_this.store.getAt(rowIndex).data);
                                    },
                                     isDisabled : function(view, rowIndex, colIndex, item, record) {
                                            // Returns true if 'editable' is false (, null, or undefined)
                                            return record.data.shippingStatus == "processing";
                                    }
                                 }
                                   
                            
                    ]
                },
                  {
                    xtype: 'actioncolumn',
                     flex : 0.3,
                    items: [
                              
                                 {
                                    icon: '../images/icon/ic_highlight_remove_black_48dp.png',
                                    handler: function (grid, rowIndex, colIndex) {
                                        
                                            grid.getSelectionModel().select(rowIndex);
                                            
                                            _this.onSelect.notify(_this.store.getAt(rowIndex).data);
                                    },
                                     isDisabled : function(view, rowIndex, colIndex, item, record) {
                                            // Returns true if 'editable' is false (, null, or undefined)
                                            return record.data.shippingStatus != "processing";
                                    }
                                 }
                                   
                            
                    ]
                }
            ],
             viewConfig : {
                stripeRows : true,
                getRowClass : function(record, rowIndex, rowParams, store){

                    if (record.data.shippingStatus == "processing"){
                         return "warning-grid-row";                       
                    }
                   
                }
	    	},
    });
    return this.panel;
    
}
