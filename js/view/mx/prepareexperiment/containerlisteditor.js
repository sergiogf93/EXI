function ContainerListEditor(){
    
    
}

ContainerListEditor.prototype.getStoreBeamlines = function() {
        var beamlinesName = EXI.credentialManager.getBeamlines();
    
        function addName(beamline){            
            return {name: beamline}
        }
        var beamlines = _.map(EXI.credentialManager.getBeamlines(), addName);
        return Ext.create('Ext.data.Store', {
            fields: [ 'name'],
            data :beamlines
        });
};

ContainerListEditor.prototype.load = function(dewars){
    this.store.loadData(dewars);
};
ContainerListEditor.prototype.getPanel = function(){
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
						        	//_this.onSelect.notify(selected.data);
						        },
						        deselect: function (sm, deselected) {
						        	//_this.onDeselect.notify(deselected.data);
						        }
		}
	});
    
    this.panel = Ext.create('Ext.grid.Panel', {
            title: 'Loaded or to be Loaded on MxCube',
            store: this.store,
            cls : 'border-grid',
            //selModel : selModel,
            height : 600,
            flex : 0.5,
            collapsible : true,
            plugins : [
              Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit : 1,
                    listeners : {
                        validateedit : function(grid, e) {
                            debugger
                            /** Setting values * */
                            for ( var key in _this.editor) {
                                e.record.data[key] = e.newValues[key];
                            }
                            /** Comments are always updatable* */
                            e.record.data.comments = e.newValues.comments;
                            
                            var onSuccess = (function(sender, measurement) {
                                _this.onMeasurementChanged.notify(measurement);
                                _this.grid.setLoading(false);
                            });
                            _this.grid.setLoading();
                            EXI.getDataAdapter({onSuccess : onSuccess}).saxs.measurement.saveMeasurement(e.record.data);
                        }
                    }
                })  
                
                
            ],
            margin : 5,
            columns: [
                {
                    text    : 'Shipment',
                     hidden : true,
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
                    hidden : true,
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
                    text    : 'Container',
                    columns : [
                            { text: 'containerId',  dataIndex: 'containerId', flex: 2,   hidden : true  },
                            { text: 'containerCode',  dataIndex: 'containerCode', flex: 2  },
                            { text: 'Status',  dataIndex: 'containerStatus', flex: 2  } ,
                            { text: 'Type',  dataIndex: 'containerType', flex: 2,   hidden : true },
                            { text: 'Location',  dataIndex: 'storageLocation', flex: 2 ,  hidden : true },
                            
                            { text: '# Samples',  dataIndex: 'sampleCount', flex: 2  }                           
                    ]                                         
                },
                {       text: 'beamlineLocation',     
                        dataIndex: 'beamlineLocation', 
                        flex: 2,
                        editor : {
                                        xtype: 'combo',
                                        store : this.getStoreBeamlines(),
                                        displayField: 'name',
                                        valueField: 'abbr'
                        }
                },
                { 
                        text: 'sampleChangerLocation', 
                        dataIndex: 'sampleChangerLocation', 
                        flex: 2,  
                        editor: {
                                xtype: 'textfield',
                                allowBlank: false
                        }  
            }
            ]
    });
    return this.panel;
    
}