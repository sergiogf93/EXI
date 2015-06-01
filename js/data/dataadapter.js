

function DataAdapter(args){
	this.async = false;
	if (args != null){
		if (args.async != null){
			this.async = args.async;
		}
	}
	this.onSuccess = new Event(this);
	this.onError = new Event(this);
	
	this.server = 'http://pc593.embl.fr:8080/ispyb-ws/rest';
}

DataAdapter.prototype.call = function(url){
	var _this = this;
	
	$.ajax({
		  url: this.server + url,
		  type: 'get',
		  success: function(data){ 
			  _this.onSuccess.notify(data);
		  },
		  error: function(data){
			  _this.onError.notify(data);
		  }
		});

};

DataAdapter.prototype.downloadFrameURL = function(frameId){
	return this.server + ('/{0}/saxs/{1}/frame/{2}/download'.format([ AuthenticationController.getToken(), AuthenticationController.getUser(),frameId]));
};

DataAdapter.prototype.getFramesURL = function(frames, averages, subtractions,sampleaverages, bufferaverages){
//	this.call('/{0}/saxs/{1}/frame/plot?frame={2}&average={3}&subtracted={4}&sampleaverage={5}&bufferaverage={6}'.format([ AuthenticationController.getToken(), AuthenticationController.getUser(), frames.toString(), averages.toString(),subtractions.toString(), sampleaverages.toString(), bufferaverages.toString() ]));
	return this.server + ('/{0}/saxs/{1}/frame/datplot?frame={2}&average={3}&subtracted={4}&sampleaverage={5}&bufferaverage={6}'.format([ AuthenticationController.getToken(), AuthenticationController.getUser(), frames.toString(), averages.toString(),subtractions.toString(), sampleaverages.toString(), bufferaverages.toString() ]));
};

DataAdapter.prototype.getSessions = function(){
	this.call('/{0}/saxs/{1}/session/list'.format([ AuthenticationController.getToken(), AuthenticationController.getUser()]));
};

DataAdapter.prototype.getMacromolecules= function(){
	this.call('/{0}/saxs/{1}/macromolecule/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser()]));
};

DataAdapter.prototype.getExperiments= function(){
	this.call('/{0}/saxs/{1}/experiment/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser()]));
};

DataAdapter.prototype.getExperimentsBySessionId= function(sessionId){
	this.call('/{0}/saxs/{1}/experiment/sessionId/{2}/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser(), sessionId]));
};

//getDataCollectionsByExperimentId
DataAdapter.prototype.getDataCollectionsByExperimentId= function(experimentId){
	this.call('/{0}/saxs/{1}/datacollection/experimentId/{2}/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser(), experimentId]));
};
//DataAdapter.prototype.getSubtractionByExperimentId= function(experimentId){
//	this.call('/{0}/saxs/{1}/subtraction/experimentId/{2}/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser(), experimentId]));
//};

DataAdapter.prototype.getDataCollectionsByMacromoleculeAcronym= function(macromoleculeAcronym){
	this.call('/{0}/saxs/{1}/datacollection/macromoleculeAcronym/{2}/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser(), macromoleculeAcronym]));
};

DataAdapter.prototype.getDataCollectionsByDataCollectionId= function(dataCollectionIds){
	this.call('/{0}/saxs/{1}/datacollection/dataCollectionId/{2}/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser(), dataCollectionIds]));
};

DataAdapter.prototype.getSubtractionsBySubtractionIdList= function(subtractionIdList){
	this.call('/{0}/saxs/{1}/subtraction/{2}/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser(), subtractionIdList.toString()]));
};

DataAdapter.prototype.getFramesByAverageId= function(averageId){
	this.call('/{0}/saxs/{1}/frame/average/{2}/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser(), averageId.toString()]));
};

DataAdapter.prototype.getFramesBySubtractionId= function(subtractionId){
	this.call('/{0}/saxs/{1}/frame/subtraction/{2}/list'.format( [AuthenticationController.getToken(), AuthenticationController.getUser(), subtractionId.toString()]));
};

DataAdapter.prototype.authenticate = function(user, password){
	/** this method does not have the cookie **/
	this.call('/{0}/{1}/authenticate'.format([user, password]));
};

DataAdapter.prototype.getImage = function(subtractionId, imageType){
	return this.server + ('/{0}/saxs/{1}/subtraction/{2}/image/{3}'.format([ AuthenticationController.getToken(), AuthenticationController.getUser(), subtractionId, imageType]));
};


/** Function for String **/
String.prototype.format = function (args) {
	var str = this;
	return str.replace(String.prototype.format.regex, function(item) {
		var intVal = parseInt(item.substring(1, item.length - 1));
		var replace;
		if (intVal >= 0) {
			replace = args[intVal];
		} else if (intVal === -1) {
			replace = "{";
		} else if (intVal === -2) {
			replace = "}";
		} else {
			replace = "";
		}
		return replace;
	});
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");