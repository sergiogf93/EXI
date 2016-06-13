function GenericDataCollectionPanel(args) {
}


GenericDataCollectionPanel.prototype.getPanel = function(dataCollectionGroup) {
    var _this = this;
    this.store = Ext.create('Ext.data.Store', {
        fields: ["dataCollectionGroup"]
    });
    this.panel = Ext.create('Ext.grid.Panel', {
        border: 1,
        padding: 5,
        id : 'test',
        store: this.store,
        disableSelection: true,
        columns: this.getColumns(),
        viewConfig: {
            enableTextSelection: true,
            stripeRows: true
        },
        listeners: {
            viewready: function() {
                function loadMagnifiers() {
                    for (var i = 0; i < _this.dataCollectionGroup.length; i++) {
                        var elementId = _this.dataCollectionGroup[i].DataCollection_dataCollectionId + "_thumb";
                         $('#' + elementId).Lazy();
                        /*var elementId = _this.dataCollectionGroup[i].DataCollection_dataCollectionId + "_thumb";
                        $('#' + elementId).ezPlus({
                            tint: true,
                            tintColour: '#F90', 
                            tintOpacity: 0.5
                        });
                        var custom = _this.dataCollectionGroup[i].DataCollection_dataCollectionId + "_custom";
                        
                        if ($('#' + custom)){
                             $('#' + custom).ezPlus({
                                zoomType: 'lens',
                                lensShape: 'round',
                                lensSize: 200
                             });
                        }*/
                       //EXI.mainStatusBar.showReady();
                    }
                }
                //EXI.mainStatusBar.showBusy("Loading zoom");
                //setTimeout(loadMagnifiers, 1000)
             



            }


        }

    });
    
    _this.elements = 0;
	this.panel.on('afterrender', function(){
		//loadedElements = 0;
		//console.log(document.getElementById(_this.id).parentNode.parentNode.parentNode.parentNode.id)
		var myVar = setTimeout(function() {   //calls click event after a certain time
				$('.lazy').lazy({ 
				  bind:'event',
				  /** !!IMPORTANT this is the id of the parent node which contains the scroll **/	
				  appendScroll:document.getElementById(document.getElementById('test').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id),
				  beforeLoad: function(element){
					  //console.log('image "' + (element.data('src')) + '" is about to be loaded');
				  },
				  afterLoad: function(element) {
					  _this.elements++;
                      /** Adding zoom */
                       $('#' + element[0].id).ezPlus({
                            tint: true,
                            tintColour: '#F90', 
                            tintOpacity: 0.5
                        });
				  },
				  onError: function(element) {
					  _this.elements++;
                     
				  },
				  onFinishedAll: function() {
                     EXI.mainStatusBar.showReady();
					  //console.log('lazy instance is about to be destroyed')
				  }
			  });
				
			}, 1000);
	
            var myVar = setTimeout(function() {   //calls click event after a certain time
				$('.smalllazy').lazy({ 
				  bind:'event',
				  /** !!IMPORTANT this is the id of the parent node which contains the scroll **/	
				  appendScroll:document.getElementById(document.getElementById('test').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id),
				  beforeLoad: function(element){
					  //console.log('image "' + (element.data('src')) + '" is about to be loaded');
				  },
				  afterLoad: function(element) {
					  _this.elements++;
                      //EXI.mainStatusBar.showBusy('Loading ' +  _this.elements + ' elements');
					  //console.log('image was loaded successfully');
				  },
				  onError: function(element) { 
					   $('#' + element[0].id).remove();
				  },
				  onFinishedAll: function() {
                     EXI.mainStatusBar.showReady();
					  //console.log('lazy instance is about to be destroyed')
				  }
			  });
				
			}, 1000);
    
		  
	});
    
    return this.panel;
};

GenericDataCollectionPanel.prototype._getHTMLImage = function(url) {
    return '<img class="smalllazy" onclick="myFunction()"  data-src=' + url + '>';
};


GenericDataCollectionPanel.prototype.getColumns = function() {
    var _this = this;
    var columns = [

        {
            header: 'Data Collections',
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
                return new ThumbnailSectionDatacollection().getHTML(record.data);
            }
        },
        {
            header: 'Workflow Steps',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 0.75,
            renderer: function(grid, e, record) {
                return new WorkflowSectionDataCollection().getHTML(record.data);

            }
        },
        {
            header: 'Result',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            width: 200,
            hidden : false,
            renderer: function(grid, e, record) {
                return new CustomSectionDataCollection().getHTML(record.data);

            }
        },

        {
            header: 'Crystal Snapshots',
            dataIndex: 'DataCollection_imagePrefix',
            width: 200,
            hidden : false,
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
                return "<textarea class='ta2-comment'  rows='15' cols='26' >" + record.data.DataCollectionGroup_comments + "</textarea>";

            }
        }


    ];
    return columns;
};


GenericDataCollectionPanel.prototype.load = function(dataCollectionGroup) {
    this.dataCollectionGroup = dataCollectionGroup;
    this.dataCollectionGroup.reverse();
    this.store.loadData(this.dataCollectionGroup);

};