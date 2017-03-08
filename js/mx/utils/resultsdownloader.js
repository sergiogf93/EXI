function ResultsDownloader(args) {
    
}

/**
* Opens a download for the given results
*
* @method downloadResults
* @param results An array of results
* @param {String} zipFileName The name of the zip file
* @param panel The panel to set loading
*/
ResultsDownloader.prototype.downloadResults = function (results, zipFileName, panel) {
    panel.setLoading();
    // Prepare an array with the urls and the fileNames
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
                $('.notifyjs-corner').empty();
                $.notify("All loaded. The download will start soon","info");
                saveAs(content, zipFileName);
                panel.setLoading(false);
            });
        } else {
            var message = "Loaded " + loaded + " of " + Object.values(file_confirmation).length;
            if (errors > 0) {
                message += ". " + errors + " Errors"
            }
            $('.notifyjs-corner').empty();
            $.notify(message,"info");
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
};