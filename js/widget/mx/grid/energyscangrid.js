
/**
* EnergyScanGrid displays the information fo a energyscan
*
* @class EnergyScanGrid
* @constructor
*/
function EnergyScanGrid(args) {
  
}

/**
* @method returns the panel with no data
*/
EnergyScanGrid.prototype.getPanel = function(dataCollectionGroup) {

    this.store = Ext.create('Ext.data.Store', {
        fields: ["dataCollectionGroup"]
    });
    
    this.panel = Ext.create('Ext.grid.Panel', {
        
        padding : 5,
        cls : 'border-grid',
        store: this.store,
        disableSelection: true,
        columns: this.getColumns(),
        features: [{
            id: 'dataCollectionGroup',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{dataCollectionGroup}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
        viewConfig: {
	        			enableTextSelection: true
        }
    });
    return this.panel;
};

EnergyScanGrid.prototype._getHTMLZoomImage = function(url, dataCollectionId, imageId) {
    
    return '<img class="lazy"  data-src=' + url + ' src=' + url + '>';
};


/**
* @method defines the columns of the grid and associates the data
*/
EnergyScanGrid.prototype.getColumns = function() {
    var _this = this;
    var columns = [
       
        {
            header: 'DataCollection',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1,
            renderer: function(grid, e, record) {
                var html = "";
                dust.render("energyscangrid.general", record.data, function(err, out) {
                  
                    html = out;
                });
                
                return html;

            }
        },
        {
            header: 'Image',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1,
            renderer: function(grid, e, record) {
                  return _this._getHTMLZoomImage(EXI.getDataAdapter().mx.energyscan.getChoochJpegByEnergyScanId(record.data.energyScanId));
         

            }
        }

    ];
    return columns;
};

/**
* @method receive a json with an array of energy as it is defined on the view 
* of ISPyB 
*/
EnergyScanGrid.prototype.load = function(energyScanList) {
    this.store.loadData(energyScanList);   
};