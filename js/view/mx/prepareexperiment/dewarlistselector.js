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
    /*var filtered = _.keyBy(dewars, "dewarId");
    var data = [];
    _(filtered).forEach(function(value) {
        data.push(value);
    });*/
    //this.panel.setTitle(this.dewars.length + " containers on " + data.length + " shipments");
    this.store.loadData(dewars);
debugger
};

/**
* Return the number of containers and samples for a given dewar 
*
* @method getStatsByDewarId
* @param {Integer} dewarId DewarId
*/
DewarListSelector.prototype.getStatsByDewarId = function(dewarId){ 
   
    var containers = _.filter(this.dewars, function(e){return e.dewarId == dewarId;});
    var sampleCount = 0;
    _(containers).forEach(function(value) {
        sampleCount = sampleCount + value.sampleCount;
    });
    return {
                samples     : sampleCount,
                containers   : containers.length
        
    };
};

DewarListSelector.prototype.getPanel = function(){

    
    var _this = this;
    this.store = Ext.create('Ext.data.Store', {
        fields:['beamlineLocation', 'storageLocation','containerStatus','containerType','sessionStartDate','creationDate','beamLineOperator','shippingStatus','shippingName', 'barCode', 'beamlineName', 'dewarCode', 'dewarStatus', 'sampleChangerLocation', 'sampleCount', 'sessionStartDate', 'type']
    });

    var selModel = Ext.create('Ext.selection.RowModel', {
		allowDeselect		: true,
		mode				: 'MULTI',
		listeners			: {
						        selectionchange: function (sm, selections) {
						           	//_this.selected = _this.getSelectedData();
						        	//_this.onSelectionChange.notify(_this.selected );
						        },
						        select: function (sm, selected) {
						        	_this.onSelect.notify(selected.data);
						        },
						        deselect: function (sm, deselected) {
						        	_this.onDeselect.notify(deselected.data);
						        }
		}
	});
    
    this.panel = Ext.create('Ext.grid.Panel', {
            title: 'Select dewars',
            store: this.store,
            cls : 'border-grid',
            selModel : selModel,
            height : this.height,  
            collapsible : true,           
            margin : 5,
            columns: [ { text: 'Name',  dataIndex: 'shippingName', width: 150 }
               /* {
                    text    : 'Shipment',
                    columns : [
                         { text: 'Name',  dataIndex: 'shippingName', width: 150 },
                         { text: 'Status',  dataIndex: 'shippingStatus', flex: 1 },
                         { text: 'Created on',  dataIndex: 'creationDate', flex: 1, 
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
                            { text: 'Local contact',  dataIndex: 'beamLineOperator', flex: 2  }                 
                    ]                                         
                },
                {
                    text    : 'Dewar',
                    columns : [
                            
                            { text: 'Name',  dataIndex: 'dewarCode' },
                            { text: 'Status', dataIndex: 'dewarStatus', flex: 1 },
                            { text: 'Barcode', dataIndex: 'barCode', flex: 1 },               
                    ]                                         
                },
                 {      
                        text: '# Containers (# Samples)',     
                        flex: 2,
                        renderer : function(grid, e, record){
                            var stats =  _this.getStatsByDewarId(record.data.dewarId);
                            return stats.containers + " (" +  stats.samples + ")";
                            
                        }
                }*/
            ]
    });
    return this.panel;
    
}
