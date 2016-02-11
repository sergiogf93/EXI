function DataCollectionGroup(dataCollectionEntries) {
	this.dataCollectionEntries = dataCollectionEntries;
	
	/** Grouping data Collections **/
	this.dataCollections =  this.groupBy(this.dataCollectionEntries, "DataCollection_dataCollectionId");
	/** Sorting data Collections **/
	this.dataCollections.sort(function(a, b){return b[0].DataCollection_dataCollectionId - a[0].DataCollection_dataCollectionId});
	
	this.totalImagesCount = null;
	this.uniqueDataCollection = null;
	this.lastDataCollection = null;
	
	
	
}


DataCollectionGroup.prototype.groupBy = function(collection, parameter){
	return BUI.groupBy(collection, function(item){
		return [item[parameter]];
	});
};

DataCollectionGroup.prototype.removeDuplicatedFromGroupedCollections = function(groupedCollection){
	var withNoDuplicates = [];
	/** Removing duplicates **/
	for (var i = 0; i < groupedCollection.length; i++) {
		withNoDuplicates.push(groupedCollection[i][0]);
	}
	return withNoDuplicates;
};

/** Gets all the data collections from the data collection group **/
DataCollectionGroup.prototype.getDataCollections = function(){
	if (!this.uniqueDataCollection){
		this.uniqueDataCollection = this.removeDuplicatedFromGroupedCollections(this.dataCollections);
	}
	return this.uniqueDataCollection;
};

/** gets the data collection with the larger dataCollectionId **/
DataCollectionGroup.prototype.getLastDataCollection = function(){
	return this.getDataCollections()[0];
};

DataCollectionGroup.prototype.getImages = function(){
	return this.dataCollections[0];
};


/** gets the sum of all images for each data collection **/
DataCollectionGroup.prototype.getTotalImagesCount = function(){
	if (!this.totalImagesCount){
		this.totalImagesCount = 0;
		for (var i = 0; i < this.getDataCollections().length; i++){
			this.totalImagesCount = this.totalImagesCount + this.getDataCollections()[i].DataCollection_numberOfImages;
		}
	}
	return this.totalImagesCount;
};

/** get a summary of the data collection group object **/
DataCollectionGroup.prototype.getSummary = function(){
	return {
		totalNumberImages : this.getTotalImagesCount(),
		dataCollectionCount : this.getDataCollections().length,
		lastDataCollection : this.getLastDataCollection(),
		imageIds : this.getImages()
		
	};
};