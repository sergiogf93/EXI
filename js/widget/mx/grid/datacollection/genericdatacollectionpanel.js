function GenericDataCollectionPanel(args) {
    this.title = "Generic";

}


GenericDataCollectionPanel.prototype.getPanel = function(dataCollectionGroup) {

    this.store = Ext.create('Ext.data.Store', {
        fields: ["dataCollectionGroup"]
    });
    this.panel = Ext.create('Ext.grid.Panel', {
        border: 1,
        store: this.store,
       
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

GenericDataCollectionPanel.prototype._getHTMLZoomImage = function(url, dataCollectionId, imageId) {
    var ref = '#/mx/datacollection/' + dataCollectionId + '/image/' + imageId + '/main';
    return '<a href=' + ref + '><img class="lazy"  data-src=' + url + ' src=' + url + '></a>';
};


GenericDataCollectionPanel.prototype._getHTMLImage = function(url) {
    return '<img class="smalllazy" onclick="myFunction()"  data-src=' + url + ' src=' + url + '>';
};


GenericDataCollectionPanel.prototype.getColumns = function() {
    var _this = this;
    var columns = [
       
        {
            header: 'DataCollection',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1.5,
            renderer: function(grid, e, record) {
                var html = "";
                dust.render("resultsection.general", record.data, function(err, out) {
                  
                    html = out;
                });
                
                return html;

            }
        },
    
        {
            header: 'Online Data Analysis',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 0.75,
            
            renderer: function(grid, e, record) {
                return new OnlineResultSectionDataCollection().getHTML(record.data);
            }
        },
         {
            header: 'Thumbnails',
            dataIndex: 'DataCollection_imagePrefix',
            width: 200,
            renderer: function(val, y, record) {

                return _this._getHTMLZoomImage(EXI.getDataAdapter().mx.dataCollection.getThumbNailById(record.data.lastImageId), record.data.DataCollection_dataCollectionId, record.data.lastImageId);
            }
        },
        {
            header: 'Workflow',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 0.75,
            renderer: function(grid, e, record) {
                return new WorkflowSectionDataCollection().getHTML(record.data);

            }
        },
        {
            header: 'Custom',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            width: 200,
            renderer: function(grid, e, record) {
                return new CustomSectionDataCollection().getHTML(record.data);

            }
        },

        {
            header: 'Crystal Snapshot',
            dataIndex: 'DataCollection_imagePrefix',
              width: 200,
            renderer: function(val, y, record) {
                var html = "<table>"
                var img1 = _this._getHTMLImage(EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 1));
                var img2 = _this._getHTMLImage(EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 2));
                var img3 = _this._getHTMLImage(EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 3));
                var img4 = _this._getHTMLImage(EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 4));

                html = html + "<tr><td>" + img1 + "</td><td>" + img2 + "</td><tr>";
                html = html + "<tr><td>" + img3 + "</td><td>" + img4 + "</td><tr>";
                return html + "</table>";
            }
        },
         {
            header: 'Comments',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            width: 200,
            renderer: function(grid, e, record) {
                return  "<textarea class='ta2-comment'  rows='15' cols='26' >" + record.data.DataCollectionGroup_comments + "</textarea>";

            }
        },
        

    ];
    return columns;
};


GenericDataCollectionPanel.prototype.load = function(dataCollectionGroup) {
    dataCollectionGroup.reverse();
    this.store.loadData(dataCollectionGroup);
    this.panel.setTitle("Data collections (" + dataCollectionGroup.length +")");
};