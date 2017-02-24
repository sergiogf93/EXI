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
    var onSuccess = function (sender,data) {
        if (data) {
            if (data[0].length > 0) {
                var results = data[0];
                var urls = [];
                for (var i = 0 ; i < results.length ; i++) {
                    urls.push(EXI.getDataAdapter().mx.autoproc.downloadAttachmentListByautoProcProgramsIdList(results[i].v_datacollection_summary_phasing_autoProcProgramId));
                }
                debugger
            }
        }
    }
    EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getViewByDataCollectionId(dataCollectionId);
};