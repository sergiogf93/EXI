
HPLCSaxsDataAdapter.prototype.get = DataAdapter.prototype.get;
HPLCSaxsDataAdapter.prototype.post = DataAdapter.prototype.post;
HPLCSaxsDataAdapter.prototype.getUrl = DataAdapter.prototype.getUrl;


function HPLCSaxsDataAdapter(args){
	 DataAdapter.call(this, args);
}



HPLCSaxsDataAdapter.prototype.getHPLCOverviewByExperimentId= function(experimentId){
	this.get('/{token}/proposal/{proposal}/saxs/experiment/{0}/hplc/overview'.format( [experimentId]));
};

HPLCSaxsDataAdapter.prototype.getHPLCFramesScatteringURL= function(experimentId, frameIdList){
	return tokens[0].url +  ('/{token}/proposal/{proposal}/saxs/experiment/{0}/hplc/frame/{1}/get?operation=log'.format( [experimentId, frameIdList.toString()]));
};
