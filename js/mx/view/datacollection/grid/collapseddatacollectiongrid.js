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

            var onSuccess = function (sender,data) {
                if (data) {
                    if (data[0].length > 0) {
                        (new ResultsDownloader()).downloadResults(data[0], "autoproc_results_" + dataCollectionId + ".zip",_this.panel);
                    }
                }
            }

            EXI.getDataAdapter({onSuccess : onSuccess}).mx.autoproc.getViewByDataCollectionId(dataCollectionId);

        });
    };

    var timer = setTimeout(setClickListeners, 500, this);
};