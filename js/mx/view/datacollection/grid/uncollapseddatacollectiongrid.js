/**
* Displays the data collections by session or acronym of the protein in a collapsed way
*
* @class MXDataCollectionGrid
* @constructor
*/
function UncollapsedDataCollectionGrid(args) {
    this.id = BUI.id();
    this.template = "mxdatacollectiongrid.template";
    DataCollectionGrid.call(this,args);
}

UncollapsedDataCollectionGrid.prototype._getAutoprocessingStatistics = DataCollectionGrid.prototype._getAutoprocessingStatistics;
UncollapsedDataCollectionGrid.prototype.getColumns = DataCollectionGrid.prototype.getColumns;

UncollapsedDataCollectionGrid.prototype.loadMagnifiers = DataCollectionGrid.prototype.loadMagnifiers;

/**
* Loads the store and load the maginifiers
*
* @method load
* @return {dataCollectionGroup} Array of data collections
*/
UncollapsedDataCollectionGrid.prototype.load = function(dataCollectionGroup){
    try{    
        this.store.loadData(dataCollectionGroup);
        this.loadMagnifiers(dataCollectionGroup);
        this.attachCallBackAfterRender();
        
    }
    catch(e){
        console.log(e);
    }
};

UncollapsedDataCollectionGrid.prototype.getPanel = function(){
    var _this = this;
    this.panel = Ext.create('Ext.grid.Panel', {
        border: 1,        
        store: this.store,  
        id: this.id,     
        disableSelection: true,
        columns: this.getColumns(),
        viewConfig: {
            enableTextSelection: true,
            stripeRows: false
        }
    });  
    return this.panel;
};



/**
* Attaches the events to lazy load to the images. Images concerned are with the class img-responsive and smalllazy
*
* @method attachCallBackAfterRender
*/
UncollapsedDataCollectionGrid.prototype.attachCallBackAfterRender = function() {
    
    var _this = this;
    
    var nodeWithScroll = document.getElementById(document.getElementById(_this.id).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id).id;
    var lazy = {
            bind: 'event',
            /** !!IMPORTANT this is the id of the parent node which contains the scroll **/
            appendScroll: nodeWithScroll,
            beforeLoad: function(element) {
                console.log('image "' + (element.data('src')) + '" is about to be loaded');                                
            },           
            onFinishedAll: function() {
                EXI.mainStatusBar.showReady();
            }
        };
        console.log(nodeWithScroll)
    var timer1 = setTimeout(function() {  $('.img-responsive').lazy(lazy);}, 500);
    var timer2 = setTimeout(function() {  $('.smalllazy').lazy(lazy);}, 500); 
    
    var tabsEvents = function(grid) {
        
            this.grid = grid;
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
                
                if (target.startsWith("#re")){                    
                    var onSuccess2 = function(sender, data){                       
                        /** Parsing data */
                        var html = "";     
                        
                        dust.render("collapsed.autoprocintegrationgrid.template",  new AutoProcIntegrationGrid().parseData(data[0]), function(err, out) {
                                    html = html + out;
                        });
                        $(target).html(html);        
                    };                    
                    var dataCollectionId = target.slice(4);                    
                    EXI.getDataAdapter({onSuccess : onSuccess2}).mx.autoproc.getViewByDataCollectionId(dataCollectionId);    
                }

                 if (target.startsWith("#sa")){                    
                        var dataCollectionId = target.slice(4);

                        var divName = "xtal1_samples_" + dataCollectionId;
                        // $("#xtal2_samples_" + dataCollectionId).elevateZoom({scrollZoom : true, zoomWindowPosition: divName, zoomWindowHeight: 200, zoomWindowWidth:200, borderSize: 0, easing:true});
                        // $("#xtal3_samples_" + dataCollectionId).elevateZoom({scrollZoom : true, zoomWindowPosition: divName, zoomWindowHeight: 200, zoomWindowWidth:200, borderSize: 0, easing:true});
                        // $("#xtal4_samples_" + dataCollectionId).elevateZoom({scrollZoom : true, zoomWindowPosition: divName, zoomWindowHeight: 200, zoomWindowWidth:200, borderSize: 0, easing:true});

                        // $("#xtal1_samples_" + dataCollectionId).elevateZoom({scrollZoom : true, zoomWindowPosition: 2});
                        // $("#xtal2_samples_" + dataCollectionId).elevateZoom({scrollZoom : true, zoomWindowPosition: 2});
                        // $("#xtal3_samples_" + dataCollectionId).elevateZoom({scrollZoom : true, zoomWindowPosition: 2});
                        // $("#xtal4_samples_" + dataCollectionId).elevateZoom({scrollZoom : true, zoomWindowPosition: 2});


                        // $(".elevatezoom").elevateZoom({scrollZoom : true, zoomWindowPosition: 2});
                        // Intense(document.querySelectorAll('.intense'));

                        var dc =_.find(grid.dataCollectionGroup, {"DataCollection_dataCollectionId":Number(dataCollectionId)});
                        
                        if (dc){
                            if ($("#sample_puck_layout_" +dataCollectionId)){
                                
                                if (dc.Container_containerId){
                                    var container =_.filter(grid.dataCollectionGroup, {"Container_containerId":Number(dc.Container_containerId)});
                                    if(container){
                                    var dataCollectionIds = {};
                                        for (var i = 1 ; i <= container[0].Container_capacity ; i++) {
                                            var sampleByLocation = _.filter(container,{"BLSample_location":i.toString()});
                                            if (sampleByLocation.length > 0) {
                                                var ids = [];
                                                for (sample in sampleByLocation){
                                                    ids.push(sampleByLocation[sample].DataCollection_dataCollectionId);
                                                }
                                                dataCollectionIds[i] = ids.toString();
                                            }
                                        }
                                    }

                                    var puck = new UniPuckWidget({mainRadius : 100, 
                                                                    enableMouseOver : false, 
                                                                    enableClick : false,
                                                                    dataCollectionIds : dataCollectionIds
                                                                });
                                    if (dc.Container_capacity == 10){
                                        puck = new SpinePuckWidget({mainRadius : 100, 
                                                                    enableMouseOver : false, 
                                                                    enableClick : false,
                                                                    dataCollectionIds : dataCollectionIds
                                                                });
                                    }
                                    $("#sample_puck_layout_" +dataCollectionId).html(puck.getPanel());
                                    
                                    var onSuccess = function(sender, samples){
                                        if (samples){
                                            puck.loadSamples(samples,dc.BLSample_location);
                                        }
                                    };
                                    
                                    EXI.getDataAdapter({onSuccess : onSuccess}).mx.sample.getSamplesByContainerId(dc.Container_containerId);
                                }
                            }
                        }
                   
                }
                
                if (target.startsWith("#wf")){                    
                    var dataCollectionId = target.slice(4);
                    var dc =_.find(grid.dataCollectionGroup, {"DataCollection_dataCollectionId":Number(dataCollectionId)});
                    if (dc){
                        var html = "";
                        var items = (new WorkflowSectionDataCollection().parseWorkflow(dc));
                       
                        dust.render("workflows.mxdatacollectiongrid.template",  items, function(err, out) {
                                        html = html + out;
                        });
                        $(target).html(html);
                    }  
                }
            });
    };
    var timer3 = setTimeout(tabsEvents, 500, _this);
};