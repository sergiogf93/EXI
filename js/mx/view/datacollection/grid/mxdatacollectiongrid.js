function MXDataCollectionGrid(args) {
    this.id = BUI.id();

    /** If view should be collapsed or not */
    this.collapsed = false;
}



/**
* Attaches the events to lazy load to the images. Images concerned are with the class img-responsive and smalllazy
*
* @method attachCallBackAfterRender
*/
MXDataCollectionGrid.prototype.attachCallBackAfterRender = function() {
    var _this = this;
    var lazy = {
            bind: 'event',
            /** !!IMPORTANT this is the id of the parent node which contains the scroll **/
            appendScroll: document.getElementById(document.getElementById(_this.id).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id),
            beforeLoad: function(element) {
                console.log('image "' + (element.data('src')) + '" is about to be loaded');                                
            },           
            onFinishedAll: function() {
                EXI.mainStatusBar.showReady();
            }
        };
        
    var timer1 = setTimeout(function() {  $('.img-responsive').lazy(lazy);}, 1000);
    var timer2 = setTimeout(function() {  $('.smalllazy').lazy(lazy);}, 1000); 
    
    var timer3 = setTimeout(function() {
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var target = $(e.target).attr("href"); // activated tab
                /** Activate tab of data collections */
                if (target.startsWith("#dc")){
                    var onSuccess = function(sender, data){
                        var html = "";
                        
                        dust.render("datacollections.mxdatacollectiongrid.template", data, function(err, out) {                                                                                               
                            html = html + out;
                        });
                        $(target).html(html);
                    };
                    var onError = function(sender, data){
                        $(target).html("Error retrieving data");
                    };
                     /** Retrieve data collections */
                    var dataCollectionGroupId = target.slice(4);
                    EXI.getDataAdapter({onSuccess:onSuccess, onError:onError}).mx.dataCollection.getDataCollectionsByDataCollectionGroupId(dataCollectionGroupId);
                }
                
            });
    }, 1000);
 
};

MXDataCollectionGrid.prototype.getPanel = function(dataCollectionGroup) {
    var _this = this;
    this.store = Ext.create('Ext.data.Store', {
        fields: ["dataCollectionGroup"]
    });
    this.panel = Ext.create('Ext.grid.Panel', {
        border: 1,
        padding: 5,
        id: this.id,
        store: this.store,
        disableSelection: true,
        tbar: this.getToolBar(),
        columns: this.getColumns(),
        viewConfig: {
            enableTextSelection: true,
            stripeRows: false
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

    this.panel.on('boxready', function() {
        _this.attachCallBackAfterRender();
    });

    return this.panel;
};




/**
* Parses statistics and return the best one
*
* @method _getAutoprocessingStatistics
* @param {Object} data Record with all the information that it is stored in the store
* @return {Object} return all statistics sorted by best values
*/
MXDataCollectionGrid.prototype._getAutoprocessingStatistics = function(data) {
    /** This converts and array of comma separated value in a array */
    function getArrayValues(value) {
        /** It splits every value */
        return _.map(_.trim(value).split(","), function(singleValue) { return _.trim(singleValue); });
    }

    var autoProc_spaceGroups = getArrayValues(data.AutoProc_spaceGroups);
    var autoProcIds = getArrayValues(data.autoProcIds);
    var completenessList = getArrayValues(data.completenessList);
    var resolutionsLimitHigh = getArrayValues(data.resolutionsLimitHigh);
    var resolutionsLimitLow = getArrayValues(data.resolutionsLimitLow);
    var scalingStatisticsTypes = getArrayValues(data.scalingStatisticsTypes);
    var rMerges = getArrayValues(data.rMerges);
    var cell_a = getArrayValues(data.Autoprocessing_cell_a);
    var cell_b = getArrayValues(data.Autoprocessing_cell_b);
    var cell_c = getArrayValues(data.Autoprocessing_cell_c);

    var cell_alpha = getArrayValues(data.Autoprocessing_cell_alpha);
    var cell_beta = getArrayValues(data.Autoprocessing_cell_beta);
    var cell_gamma = getArrayValues(data.Autoprocessing_cell_gamma);


    data = {};
    /** Returning if no autoprocs */
    if (autoProcIds) {
        if (autoProcIds[0] == "") {
            return [];
        }
    }
    for (var i = 0; i < autoProcIds.length; i++) {
        if (data[autoProcIds[i]] == null) {
            data[autoProcIds[i]] = {
                autoProcId: autoProcIds[i],
                spaceGroup: autoProc_spaceGroups[i]
            };
        }

        data[autoProcIds[i]][scalingStatisticsTypes[i]] = ({
            autoProcId: autoProcIds[i],
            scalingStatisticsType: scalingStatisticsTypes[i],
            completeness: Number(completenessList[i]).toFixed(0),
            resolutionsLimitHigh: Number(resolutionsLimitHigh[i]).toFixed(1),
            resolutionsLimitLow: Number(resolutionsLimitLow[i]).toFixed(1),
            rMerge: Number(rMerges[i]).toFixed(1),
            spaceGroup: autoProc_spaceGroups[i],
            cell_a: cell_a[i],
            cell_b: cell_b[i],
            cell_c: cell_c[i],
            cell_alpha: cell_alpha[i],
            cell_beta: cell_beta[i],
            cell_gamma: cell_gamma[i]

        });

    }

    /** Convert from map to array */
    var ids = _.map(data, 'autoProcId');
    var result = [];
    for ( i = 0; i < ids.length; i++) {
        result.push(data[ids[i]]);
    }

    function sortByBest(a, b) {
        var spaceGroupA = a.spaceGroup.replace(/\s/g, "");
        var spaceGroupB = b.spaceGroup.replace(/\s/g, "");              
        return (_.indexOf(ExtISPyB.spaceGroups, spaceGroupA) > _.indexOf(ExtISPyB.spaceGroups, spaceGroupB));
    }

    var sorted = result.sort(sortByBest).reverse();    
    /** Add new attribute for ranking order */
    for ( i = 0; i < sorted.length; i++) {
        sorted[i]["rank"] = i + 1;
    }

    return sorted;
};

MXDataCollectionGrid.prototype.getToolBar = function() {
    var _this = this;
    return Ext.create('Ext.toolbar.Toolbar', {
        width: 500,
        items: [
            {
                xtype: 'checkboxfield',
                boxLabel: 'Summary',
                id: this.id + "_collapse",
                listeners: {
                    change: function(field, e) {
                        _this.collapsed = e;
                        if (Ext.getCmp(_this.id + "_search").getValue() != "") {
                            _this.filterBy(Ext.getCmp(_this.id + "_search").getValue());
                        }
                        else {
                            _this.reloadData(_this.dataCollectionGroup);
                        }
                    }
                }
            },
            '->', 
            {
                xtype: 'textfield',
                id: this.id + "_search",
                width: 400,
                emptyText: 'enter search prefix, sample or protein',
                listeners: {
                    specialkey: function(field, e) {
                        if (e.getKey() == e.ENTER) {
                            _this.filterBy(field.getValue());
                        }
                    }
                }
            },
            { xtype: 'tbtext', text: '', id: this.id + "_found" }
        ]
    });
};
MXDataCollectionGrid.prototype.getColumns = function() {
    var _this = this;
    var columns = [
        {

            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1.5,
            hidden: false,
            renderer: function(grid, e, record) {
                
                var data = record.data;                              
                var html = "";                               
                /** For thumbnail */
                data.urlThumbnail = EXI.getDataAdapter().mx.dataCollection.getThumbNailById(data.lastImageId);
                data.url = EXI.getDataAdapter().mx.dataCollection.getImageById(data.lastImageId);
                data.ref = '#/mx/beamlineparameter/datacollection/' + data.DataCollection_dataCollectionId + '/main';
                data.runNumber = data.DataCollection_dataCollectionNumber;
                data.prefix = data.DataCollection_imagePrefix;
                data.comments = data.DataCollectionGroup_comments;
                data.sample = data.BLSample_name;
                data.folder = data.DataCollection_imageDirectory;

                /** For Phasing */
                
                if (data.phasingStepType) {
                    var phasingSteps = data.phasingStepType.split(",");
                    data.phasingStepLength = phasingSteps.length;
                   
                }
                /** For crystal */
                data.xtal1 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 1);
                data.xtal2 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 2);
                data.xtal3 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 3);
                data.xtal4 = EXI.getDataAdapter().mx.dataCollection.getCrystalSnapshotByDataCollectionId(record.data.DataCollection_dataCollectionId, 4);

                /** Image quality indicator **/
                data.indicator = EXI.getDataAdapter().mx.dataCollection.getQualityIndicatorPlot(record.data.DataCollection_dataCollectionId);

                /** For online data analysis */
                var online = (new OnlineResultSectionDataCollection().parseData(record.data));
                data.autoprocessing = _.filter(online, function(b) { return b.name == "Autoprocessing"; });

                data.screening = _.filter(online, function(b) { return b.name == "Screening"; });
                data.onlineresults = _this._getAutoprocessingStatistics(record.data);

                /** For the workflows */
                if (record.data.WorkflowStep_workflowStepType) {
                    data.workflows = new WorkflowSectionDataCollection().parseWorkflow(record.data);
                }
                if (data.workflows == null) {
                    data.workflows = [];
                }

                if (!_this.collapsed) {                    
                    dust.render("mxdatacollectiongrid.template", data, function(err, out) {                                                                       
                        html = html + out;
                    });                    
                    dust.render("online.mxdatacollectiongrid.template", data, function(err, out) {
                        html = html + out;
                    });
                }
                else {
                    dust.render("collapsed.mxdatacollectiongrid.template", data, function(err, out) {
                        html = html + out;
                    });
                }
                return html;

            }
        },
        {
            header: 'IDs',
            dataIndex: 'dataCollectionGroup',
            name: 'dataCollectionGroup',
            flex: 1.5,
            hidden: true,
            renderer: function(grid, e, record) {
                var html = "";
                dust.render("ids.mxdatacollectiongrid.template", record.data, function(err, out) {
                    html = out;
                });
                return html;

            }
        }         
    ];
    return columns;
};

MXDataCollectionGrid.prototype.reloadData = function(dataCollections) {
    this.store.loadData(dataCollections);
    this.attachCallBackAfterRender();
};
/**
* Filters data by prefix, protein acronym or sample
*
* @method filterBy
* @return {String} searchTerm prefix, protein acronym or sample to be searched
*/
MXDataCollectionGrid.prototype.filterBy = function(searchTerm) {  
    var filtered = _.filter(this.dataCollectionGroup, function(dataCollection) {
        var params = ["DataCollection_imagePrefix", "Protein_acronym", "BLSample_name"];
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            if (dataCollection[param]) {
                if (dataCollection[param].indexOf(searchTerm) != -1) {
                    return dataCollection;
                }
            }
        }
    });
    Ext.getCmp(this.id + "_found").setText(filtered.length + " items found");
    this.reloadData(filtered);
};

MXDataCollectionGrid.prototype.load = function(dataCollectionGroup) {    
    this.dataCollectionGroup = dataCollectionGroup;
    this.dataCollectionGroup.reverse();
    this.store.loadData(this.dataCollectionGroup);
};