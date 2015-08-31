
FrameSaxsDataAdapter.prototype.get = DataAdapter.prototype.get;
FrameSaxsDataAdapter.prototype.post = DataAdapter.prototype.post;
FrameSaxsDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;


function FrameSaxsDataAdapter(args){
	DataAdapter.call(this, args);
}



//FrameSaxsDataAdapter.prototype.downloadFrameURL = function(frameId){
//	return this.server + ('/{0}/saxs/{1}/frame/{2}/download'.format([ '%TOKEN%', '%PROPOSAL%',frameId]));
//};

//FrameSaxsDataAdapter.prototype.downloadFrameURL = function(frameId){
//	return this.server + ('/{0}/saxs/{1}/frame/{2}/download'.format([ '%TOKEN%', '%PROPOSAL%',frameId]));
//};



FrameSaxsDataAdapter.prototype.getFramesByAverageId= function(averageId){
	this.get('/{0}/saxs/{1}/frame/average/{0}/list'.format( [averageId.toString()]));
};


FrameSaxsDataAdapter.prototype.getFramesURL = function(frames, averages, subtractions,sampleaverages, bufferaverages){
	if (frames == null){
		frames = [];
	}
	if (averages == null){
		averages = [];
	}
	if (subtractions == null){
		subtractions = [];
	}
	if (sampleaverages == null){
		sampleaverages = [];
	}
	if (bufferaverages == null){
		bufferaverages = [];
	}
	
	var connection = EXI.credentialManager.getConnections()[0];
	return connection.url + ('/{0}/proposal/{1}/saxs/frame/datplot?frame={2}&average={3}&subtracted={4}&sampleaverage={5}&bufferaverage={6}'.format([ connection.token,connection.user, frames.toString(), averages.toString(),subtractions.toString(), sampleaverages.toString(), bufferaverages.toString() ]));
};
