function ThumbnailSectionDatacollection(args) {

}



ThumbnailSectionDatacollection.prototype._getHTMLZoomImage = function(url, dataCollectionId, imageId) {
    var ref = '#/mx/beamlineparameter/datacollection/' + dataCollectionId + '/main';
    //var ref = '#/mx/datacollection/' + dataCollectionId + '/image/' + imageId + '/main';
    return '<a href=' + ref + '><img class="lazy"  data-src=' + url + ' src=' + url + '></a>';
};

ThumbnailSectionDatacollection.prototype.getHTML = function(data){
	return this._getHTMLZoomImage(EXI.getDataAdapter().mx.dataCollection.getThumbNailById(data.lastImageId), data.DataCollection_dataCollectionId, data.lastImageId);
};


