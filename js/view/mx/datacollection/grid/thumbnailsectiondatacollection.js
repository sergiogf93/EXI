function ThumbnailSectionDatacollection(args) {
    
}



ThumbnailSectionDatacollection.prototype._getHTMLZoomImage = function(lastImageId, dataCollectionId, imageId) {
    var urlThumbnail = EXI.getDataAdapter().mx.dataCollection.getThumbNailById(lastImageId);
    var url = EXI.getDataAdapter().mx.dataCollection.getImageById(lastImageId);
    var ref = '#/mx/beamlineparameter/datacollection/' + dataCollectionId + '/main';
    //return '<a href=' + ref + '><img id="' + dataCollectionId +'_thumb"; class="lazy"  data-src=' + urlThumbnail + ' src="' + urlThumbnail + '"  data-zoom-image="' + url + '"></a>';
    return '<a href=' + ref + '><img id="' + dataCollectionId +'_thumb"; class="lazy"  data-src="' + urlThumbnail + '"  data-zoom-image="' + url + '"></a>';
};

ThumbnailSectionDatacollection.prototype.getHTML = function(data){
	return this._getHTMLZoomImage(data.lastImageId, data.DataCollection_dataCollectionId, data.lastImageId);
};


