
DataCollectionDataAdapter.prototype.get = DataAdapter.prototype.get;
DataCollectionDataAdapter.prototype.post = DataAdapter.prototype.post;
DataCollectionDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;


function DataCollectionDataAdapter(args){
	DataAdapter.call(this, args);
}

DataCollectionDataAdapter.prototype.getBySessionsId= function(sessionsId){
	 this.get('/{token}/proposal/{proposal}/mx/datacollection/session/{0}/list'.format( [sessionsId.toString()]));
};



DataCollectionDataAdapter.prototype.getImageById= function(imageId){
	var connection = EXI.credentialManager.getConnections()[0];
	return this.getUrl(connection, ('/{token}/proposal/{proposal}/mx/image/{0}/get'.format([ imageId])));
};

DataCollectionDataAdapter.prototype.getCrystalSnapshotByDataCollectionId= function(dataCollectionId, id){
	var connection = EXI.credentialManager.getConnections()[0];
	return this.getUrl(connection, ('/{token}/proposal/{proposal}/mx/datacollection/{0}/crystalsnaphot/{1}/get'.format([ dataCollectionId, id])));
};









