
/**
* XFEScanGrid displays the information fo a XFE
*
* @class XFEScanGrid
* @constructor
*/
function XFEScanGrid(args) {
  
}

/**
* @method returns the panel with no data
*/
XFEScanGrid.prototype.getPanel = function(dataCollectionGroup) {
     this.store = Ext.create('Ext.data.Store', {
        fields: ["dataCollectionGroup"]
    });
    this.panel = Ext.create('Ext.grid.Panel', {
        border: 1,
        padding : 5,
        store: this.store,
        disableSelection: true,
        columns: this.getColumns(),
        viewConfig: {
	        			enableTextSelection: true
        }
    });
    return this.panel;
};

XFEScanGrid.prototype._getHTMLZoomImage = function(url, dataCollectionId, imageId) {
    
    return '<img style="width:400px;height:100;"  data-src=' + url + ' src=' + url + '>';
};


/**
* @method defines the columns of the grid and associates the data
*/
XFEScanGrid.prototype.getColumns = function() {
    var _this = this;
    var columns = [
       
        {
            header: '',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1,
            renderer: function(grid, e, record) {
                var html = "";
                dust.render("xfescangrid.primary", record.data, function(err, out) {  
                    html = out;
                });
                return html;

            }
        },
        {
            header: '',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1,
            renderer: function(grid, e, record) {
                var html = "";
                dust.render("xfescangrid.secondary", record.data, function(err, out) {  
                    html = out;
                });
                return html;

            }
        },
        {
            header: 'Scan',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 2,
            renderer: function(grid, e, record) {
                  return _this._getHTMLZoomImage(EXI.getDataAdapter().mx.xfescan.getXFEJpegByScanId(record.data.xfeFluorescenceSpectrumId));
         

            }
        }

    ];
    return columns;
};

/**
* @method receive a json with an array of energy as it is defined on the view 
* of ISPyB 
*/
XFEScanGrid.prototype.load = function(data) {
    this.store.loadData(data);   
};