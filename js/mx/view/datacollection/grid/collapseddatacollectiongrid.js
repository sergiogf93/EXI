/**
* Displays the data collections by session or acronym of the protein
*
* @class MXDataCollectionGrid
* @constructor
*/
function CollapsedDataCollectionGrid(args) {
    this.template = "collapsed.mxdatacollectiongrid.template";
    DataCollectionGrid.call(this,args);
}

CollapsedDataCollectionGrid.prototype._getAutoprocessingStatistics = DataCollectionGrid.prototype._getAutoprocessingStatistics;
CollapsedDataCollectionGrid.prototype.getColumns = DataCollectionGrid.prototype.getColumns;
CollapsedDataCollectionGrid.prototype.load = DataCollectionGrid.prototype.load;
CollapsedDataCollectionGrid.prototype.loadMagnifiers = DataCollectionGrid.prototype.loadMagnifiers;
CollapsedDataCollectionGrid.prototype.getPanel = DataCollectionGrid.prototype.getPanel;

CollapsedDataCollectionGrid.prototype.onBoxReady = function () {
    var _this = this;
    var setClickListeners = function() {
        $(".download-results").click(function(sender){
            var dataCollectionId = sender.target.id.split("-")[0];
            _this.downloadResults(dataCollectionId);
        });
    };

    var timer = setTimeout(setClickListeners, 500, this);
};

CollapsedDataCollectionGrid.prototype.downloadResults = function (dataCollectionId) {
    var _this = this;
    this.panel.setLoading("Loading");
    var onSuccess = function (sender,data) {
        if (data) {
            if (data[0].length > 0) {
                // Prepare an array with the urls and the fileNames
                var results = data[0];
                var urls = [];
                var file_confirmation = {};
                var errors = 0;
                for (var i = 0 ; i < results.length ; i++) {
                    urls.push({
                                fileName : results[i].v_datacollection_processingPrograms + "_" + results[i].v_datacollection_summary_phasing_autoProcProgramId + ".zip",
                                url : EXI.getDataAdapter().mx.autoproc.downloadAttachmentListByautoProcProgramsIdList(results[i].v_datacollection_summary_phasing_autoProcProgramId)
                            });
                    file_confirmation[results[i].v_datacollection_processingPrograms + "_" + results[i].v_datacollection_summary_phasing_autoProcProgramId + ".zip"] = false;
                }
                // Function that checks if all the files are added to the zip and then downloads the zip
                var downloadZipIfAllReady = function () {
                    var loaded = _.countBy(Object.values(file_confirmation))[true];
                    if(loaded + errors == urls.length) {
                        zip.generateAsync({type:"blob"}).then(function(content) {
                            saveAs(content, "autoproc_results_" + dataCollectionId + ".zip");
                            _this.panel.setLoading(false);
                        });
                    } else {
                        var message = "Loaded " + loaded + " of " + Object.values(file_confirmation).length;
                        if (errors > 0) {
                            message += ". " + errors + " Errors"
                        }
                        _this.panel.setLoading(message);
                    }
                }
                // Function to add a file to the zip and call the downloadZipIfAllReady
                var addFileToZip = function (fileName,url,zip) {
                    JSZipUtils.getBinaryContent(url,function(err,data) {
                        if (!err) {
                            var dic = {binary:true};
                            zip.file(fileName, data, dic);
                            file_confirmation[fileName] = true;
                            downloadZipIfAllReady();
                        } else {
                            console.log(err);
                            errors++;
                            downloadZipIfAllReady();
                        }
                    });
                }
                // Create and load the zip
                zip = new JSZip();
                for (var i = 0 ; i < urls.length ; i++) {
                    var url = urls[i].url;
                    var fileName = urls[i].fileName;
                    addFileToZip(fileName,url,zip);
                }
            }
        }
    }
    EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getViewByDataCollectionId(dataCollectionId);
};