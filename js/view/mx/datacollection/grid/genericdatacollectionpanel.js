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
                       
                    }
                }              
            }

        }

    });
    
    _this.elements = 0;
	this.panel.on('afterrender', function(){    
		var myVar = setTimeout(function() {   
               /*
               $('.owl-carousel').owlCarousel({
                    loop:true,
                    items:1,
                    margin:10,
                    nav:true
                    
                });*/
        
				$('.img-responsive').lazy({ 
				  bind:'event',
				  /** !!IMPORTANT this is the id of the parent node which contains the scroll **/	
				  appendScroll: document.getElementById(document.getElementById('test').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id),
				  beforeLoad: function(element){
					  console.log('image "' + (element.data('src')) + '" is about to be loaded');
				  },
				  afterLoad: function(element) {
					  _this.elements++;
                    
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


/**
* Creates the container for the img with lazy loading and data-lightbox for enlarging
*
* @method _getHTMLImage
* @param {Object} data Record where DataCollection_dataCollectionId, acronym and protein name is
* @param {String} url An url where actually the image can be found
* @return {String} Returns html code for the anchor with the images
*/
GenericDataCollectionPanel.prototype._getHTMLImage = function(data, url) {
    return '<a href="' + url +'" data-lightbox="'+ data.DataCollection_dataCollectionId+'" data-title="'+ data.Protein_acronym + ": " + data.Protein_name +'"><img class="smalllazy"  data-src=' + url + '></a>';
};


/**
* Parses statistics and return the best one
*
* @method _getAutoprocessingStatistics
* @param {Object} data Record with all the information that it is stored in the store
* @return {Object} return all statistics sorted by best values
*/
GenericDataCollectionPanel.prototype._getAutoprocessingStatistics = function(data) {
    /** This converts and array of comma separated value in a array */
    function getArrayValues(value){
        /** It splits every value */
        return _.map(_.trim(value).split(","), function(singleValue){ return _.trim(singleValue);});
    }

    var autoProc_spaceGroups = getArrayValues(data.AutoProc_spaceGroups);
    var autoProcIds = getArrayValues(data.autoProcIds);
    var completenessList = getArrayValues(data.completenessList);
    var resolutionsLimitHigh = getArrayValues(data.resolutionsLimitHigh);
    var resolutionsLimitLow = getArrayValues(data.resolutionsLimitLow);
    var scalingStatisticsTypes = getArrayValues(data.scalingStatisticsTypes);
    var rMerges = getArrayValues(data.rMerges);

    var data = {};
    /** Returning if no autoprocs */
    if (autoProcIds){
        if (autoProcIds[0] == ""){
            return [];
        }
    }
    for (var i = 0; i < autoProcIds.length; i++){
        if (data[autoProcIds[i]] == null){
            data[autoProcIds[i]] = {
                 autoProcId               :  autoProcIds[i],
                 spaceGroup               :  autoProc_spaceGroups[i]
            };
        }
        
        data[autoProcIds[i]][scalingStatisticsTypes[i]] = ({
            autoProcId               :  autoProcIds[i],
            scalingStatisticsType    :  scalingStatisticsTypes[i],
            completeness             :  Number(completenessList[i]).toFixed(0),
            resolutionsLimitHigh     :  Number(resolutionsLimitHigh[i]).toFixed(1),
            resolutionsLimitLow      :  Number(resolutionsLimitLow[i]).toFixed(1),
            rMerge                   :  Number(rMerges[i]).toFixed(1),
            spaceGroup               :  autoProc_spaceGroups[i]
        });
    }
    
    /** Convert from map to array */
    var ids = _.map(data, 'autoProcId');
    var result = [];
    for (var i = 0; i < ids.length; i++){
        result.push(data[ids[i]]);
    }
    
    function sortByBest(a, b){
        var spaceGroupA = a.spaceGroup.replace(/\s/g, "");
        var spaceGroupB = b.spaceGroup.replace(/\s/g, "");        
        return (_.indexOf(ExtISPyB.spaceGroups, spaceGroupA) > _.indexOf(ExtISPyB.spaceGroups, spaceGroupB));
    }
    
    var sorted = result.sort(sortByBest).reverse();
    /** Add new attribute for ranking order */
    for (var i = 0; i < sorted.length; i++){
       sorted[i]["rank"] = i + 1;
    }
    
    return sorted;
};

GenericDataCollectionPanel.prototype.getColumns = function() {
    var _this = this;
    var columns = [
          {
           
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1.5,
            hidden : false,
            renderer: function(grid, e, record) {
          
                var data = record.data;// _this._getAutoprocessingStatistics(record.data);                               
                var html = "";
              
                dust.render("header.section.general", data, function(err, out) {
                    html = html + out;
                });
                
                /** For thumbnail */                
                data.urlThumbnail = EXI.getDataAdapter().mx.dataCollection.getThumbNailById(data.lastImageId);
                data.url          =  EXI.getDataAdapter().mx.dataCollection.getImageById(data.lastImageId);
                data.ref          = '#/mx/beamlineparameter/datacollection/' + data.DataCollection_dataCollectionId + '/main';
                data.runNumber    = data.DataCollection_dataCollectionNumber;
                data.prefix       = data.DataCollection_imagePrefix;
                data.comments     = data.DataCollectionGroup_comments;        
                data.sample       = data.BLSample_name;
                data.folder       = data.DataCollection_imageDirectory;
        
                /** For crystal */
                data.xtal1 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 1);
                data.xtal2 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 2);
                data.xtal3 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 3);
                data.xtal4 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 4);

                /** Image quality indicator **/
                data.indicator =  EXI.getDataAdapter().mx.dataCollection.getQualityIndicatorPlot(record.data.DataCollection_dataCollectionId);
                
                /** For online data analysis */
                var online = (new OnlineResultSectionDataCollection().parseData(record.data));  
                data.autoprocessing = _.filter(online, function(b){return b.name=="Autoprocessing";});
             
                data.screening = _.filter(online, function(b){return b.name=="Screening";});
                data.onlineresults  = _this._getAutoprocessingStatistics(record.data);
                
                /** For the workflows */
                if (record.data.WorkflowStep_workflowStepType){
		            data.workflows = new WorkflowSectionDataCollection().parseWorkflow(record.data);
	            }
                if (data.workflows == null){
                    data.workflows = [];
                }
                
                
                dust.render("body.section.general", data, function(err, out) {
                    html = html + out;
                });
                
                dust.render("workflow.section.general", data, function(err, out) {
                    html = html + out;
                });
                dust.render("online.section.general", data, function(err, out) {
                     html = html + out;
                });
                
                
                return html;

            }
        },
        {
            header: 'IDs',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1.5,
            hidden : true,
            renderer: function(grid, e, record) {
                var html = "";
                dust.render("ids.section.general", record.data, function(err, out) {
                    html = out;
                });
                return html;

            }
        },
        {
            header: 'Data Collections',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1.5,
             hidden : true,
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
             hidden : true,
            renderer: function(grid, e, record) {
                return  new OnlineResultSectionDataCollection().getHTML(record.data, _this._getAutoprocessingStatistics(record.data));                                              
            }
        },
        {
            header: 'Thumbnails',
            dataIndex: 'DataCollection_imagePrefix',
            width: 200,
             hidden : true,
            renderer: function(val, y, record) {
                return new ThumbnailSectionDatacollection().getHTML(record.data);
            }
        },
        {
            header: 'Workflow Steps',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 0.75,
             hidden : true,
            renderer: function(grid, e, record) {
                return new WorkflowSectionDataCollection().getHTML(record.data);

            }
        },
        {
            header: 'Result',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            width: 200,
            
           hidden : true,
            renderer: function(grid, e, record) {
                return new CustomSectionDataCollection().getHTML(record.data);

            }
        },

        {
            header: 'Crystal Snapshots',
            dataIndex: 'DataCollection_imagePrefix',
            width: 200,
            hidden : true,
            renderer: function(val, y, record) {
                var html = "<table>"
                var img1 = _this._getHTMLImage(record.data, EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 1));
                var img2 = _this._getHTMLImage(record.data, EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 2));
                var img3 = _this._getHTMLImage(record.data, EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 3));
                var img4 = _this._getHTMLImage(record.data, EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 4));

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
             hidden : true,
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