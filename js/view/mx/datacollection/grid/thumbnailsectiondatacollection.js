function ThumbnailSectionDatacollection(args) {

}



ThumbnailSectionDatacollection.prototype._getHTMLZoomImage = function(url, dataCollectionId, imageId) {
    var ref = '#/mx/datacollection/' + dataCollectionId + '/image/' + imageId + '/main';
    return '<a href=' + ref + '><img class="lazy"  data-src=' + url + ' src=' + url + '></a>';
};

ThumbnailSectionDatacollection.prototype.getHTML = function(data){
	return this._getHTMLZoomImage(EXI.getDataAdapter().mx.dataCollection.getThumbNailById(data.lastImageId), data.DataCollection_dataCollectionId, data.lastImageId);
	var html = "";
	var items = [];
	/** Making the mesh **/
	try{
		var mesh = this.getMeshScan(dataCollectionGroup);
		if (mesh != null){
			items.push({
				img 	: EXI.getDataAdapter().mx.workflowstep.getImageByWorkflowStepId(mesh.workflowStepId),
				//title 	: mesh.name
			});
		}
		
		
	}
	catch(e){
		html = html + "There was an error parsing the mesh";
	}
	
	/** Making the wilson **/
	try{
		if (dataCollectionGroup.DataCollection_bestWilsonPlotPath != null){
			items.push({
				img 	: EXI.getDataAdapter().mx.dataCollection.getWilsonPlot(dataCollectionGroup.DataCollection_dataCollectionId),
				//title 	: "Wilson"
			});
			
		}
	}
	catch(e){
		html = html + "There was an error parsing the wilson";
	}
	
	dust.render("ThumbnailSectionDatacollection", items, function(err, out){
		html = html + out;
     	});
	
	
	return html;
	
};


