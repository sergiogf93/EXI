

function DataAdapter(args){
	this.async = true;
	if (args != null){
		if (args.async != null){
			this.async = args.async;
		}
	}
	this.onSuccess = new Event(this);
	this.onError = new Event(this);
	
}

DataAdapter.prototype.call = function(url){
	var _this = this;
	/** exiSAXS could be not defined yed **/
	if (exiSAXS != null){
		exiSAXS.setLoading();
	}
	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
	
	if (tokens.length == 1){
		$.ajax({
			  url: tokens[0].url + url.replace("%TOKEN%", tokens[0].token).replace("%USER%", tokens[0].user),
			  type: 'get',
			  async : this.async,
			  success: function(data){ 
				  _this.onSuccess.notify(data);
				  if (exiSAXS != null){
					  exiSAXS.setLoading(false);
				  }
			  },
			  error: function(error){
				  _this.onError.notify(error);
				  if (exiSAXS != null){
					  exiSAXS.setError(error);
				  }
			  }
			});
	}
	

	if (tokens.length == 2){
		function success(dataset1, dataset2){
			 _this.onSuccess.notify(dataset1[0].concat(dataset2[0]));
		}
		function error(error){
			 _this.onError.notify(error);
		}
		$.when( 
				$.ajax({
							url: tokens[0].url + url.replace("%TOKEN%", tokens[0].token).replace("%USER%", tokens[0].user),
							async : this.async,
							type: 'get'
						}), 
			    $.ajax({
			    			url: tokens[1].url + url.replace("%TOKEN%", tokens[1].token).replace("%USER%", tokens[1].user),
			    			async : this.async,
			    			type: 'get'
					 })
			)
		  .then( success, error);
	}
};

DataAdapter.prototype.post = function(url, data){
	var _this = this;
	/** exiSAXS could be not defined yed **/
	if (exiSAXS != null){
		exiSAXS.setLoading();
	}
	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
	 url =  tokens[0].url + url.replace("%TOKEN%", tokens[0].token).replace("%USER%", tokens[0].user);
	 $.ajax({
		  type: "POST",
		  url: url,
		  data: data,
		  success: function(data){ 
			  _this.onSuccess.notify(data);
			  if (exiSAXS != null){
				  exiSAXS.setLoading(false);
			  }
		  },
		  error: function(error){
			  _this.onError.notify(error);
			  if (exiSAXS != null){
				  exiSAXS.setError(error);
			  }
		  }
	});
	 
};

DataAdapter.prototype.downloadFrameURL = function(frameId){
	return this.server + ('/{0}/saxs/{1}/frame/{2}/download'.format([ '%TOKEN%', '%USER%',frameId]));
};

DataAdapter.prototype.downloadFrameURL = function(frameId){
	return this.server + ('/{0}/saxs/{1}/frame/{2}/download'.format([ '%TOKEN%', '%USER%',frameId]));
};

DataAdapter.prototype.getFramesURL = function(frames, averages, subtractions,sampleaverages, bufferaverages){
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
	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
	return tokens[0].url + ('/{0}/saxs/{1}/frame/datplot?frame={2}&average={3}&subtracted={4}&sampleaverage={5}&bufferaverage={6}'.format([ tokens[0].token, tokens[0].user, frames.toString(), averages.toString(),subtractions.toString(), sampleaverages.toString(), bufferaverages.toString() ]));
};

DataAdapter.prototype.getFramesMergeURL = function(subtractionIdList, from, to, scale){
	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
	return tokens[0].url +  ('/{0}/saxs/{1}/frame/subtractionId/{2}/datplotmerge?from={3}&to={4}&scale={5}'.format([tokens[0].token, tokens[0].user, subtractionIdList.toString(), from.toString(),to.toString(), scale.toString() ]));
};

DataAdapter.prototype.getMergeURL = function(subtractionIdList, from, to, scale){
	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
	return tokens[0].url + ('/{0}/saxs/{1}/frame/subtractionId/{2}/merge?from={3}&to={4}&scale={5}'.format([ tokens[0].token, tokens[0].user,subtractionIdList.toString(), from.toString(),to.toString(), scale.toString() ]));
};

DataAdapter.prototype.getSessions = function(){
	this.call('/{0}/proposal/{1}/session/list'.format([ '%TOKEN%', '%USER%']));
};

DataAdapter.prototype.getShippings = function(){
	this.call('/{0}/proposal/{1}/shipping/list'.format([ '%TOKEN%', '%USER%']));
};

DataAdapter.prototype.getShipment = function(shippingId){
	this.call('/{0}/proposal/{1}/shipping/{2}/get'.format([ '%TOKEN%', '%USER%', shippingId]));
};

DataAdapter.prototype.saveShipment = function(shipment ){
	var proposal = exiSAXS.localExtorage.tokenManager.getTokens()[0].user;
	var url = ('/{0}/proposal/{2}/shipping/save'.format( ['%TOKEN%', '%USER%', proposal]));
	this.post(url, shipment);
};

/** DEWAR **/
DataAdapter.prototype.saveDewar= function(shippingId, dewar){
    var url = ('/{0}/proposal/{1}/shipping/{2}/dewar/{3}/save'.format( ['%TOKEN%', '%USER%', shippingId, dewar.dewarId]));
	this.post(url, dewar);
};

DataAdapter.prototype.removeDewar= function(shippingId, dewarId){
	var url = ('/{0}/proposal/{1}/shipping/{2}/dewar/{3}/remove'.format( ['%TOKEN%', '%USER%', shippingId, dewarId]));
	this.call(url);
};

DataAdapter.prototype.addDewar= function(shippingId){
    var url = ('/{0}/proposal/{1}/shipping/{2}/dewar/add'.format( ['%TOKEN%', '%USER%', shippingId]));
	this.call(url);
};



DataAdapter.prototype.getTemplateSourceFile = function(experimentId, type){
	var token = exiSAXS.localExtorage.tokenManager.getTokens()[0];
	return token.url + ('/{0}/proposal/{1}/saxs/experiment/{2}/type/{3}/samplechanger/template'.format([ token.token, token.user, experimentId, type]));
};


/** TEMPLATES **/
DataAdapter.prototype.saveTemplate = function(name, comments, measurements, experimentId ){
	var proposal = exiSAXS.localExtorage.tokenManager.getTokens()[0].user;
    var url = ('/{0}/proposal/{1}/saxs/experiment/save'.format( ['%TOKEN%', '%USER%']));
	this.post(url, {name : name,
					comments : comments,
					experimentId : experimentId,
					measurements : measurements.toString()
	});
};

DataAdapter.prototype.saveExperiment = function(experimentId, name, comments ){
	var proposal = exiSAXS.localExtorage.tokenManager.getTokens()[0].user;
    var url = ('/{0}/proposal/{1}/saxs/experiment/{2}/save'.format( ['%TOKEN%', '%USER%', experimentId]));
	this.post(url, {name : name,
					comments : comments
	});
};


/** MACROMOLECULES **/
DataAdapter.prototype.saveMacromolecule = function(macromolecule){
    var url = ('/{0}/proposal/{1}/saxs/macromolecule/save'.format( ['%TOKEN%', '%USER%']));
	this.post(url, {macromolecule : JSON.stringify(macromolecule)});
};

DataAdapter.prototype.getMacromolecules= function(){
	this.call('/{0}/proposal/{1}/saxs/macromolecule/list'.format( ['%TOKEN%', '%USER%']));
};

/** BUFFERS **/
DataAdapter.prototype.getBuffers= function(){
	this.call('/{0}/proposal/{1}/saxs/buffer/list'.format( ['%TOKEN%', '%USER%']));
};

DataAdapter.prototype.saveBuffer= function(buffer){
    var url = ('/{0}/proposal/{1}/saxs/buffer/save'.format( ['%TOKEN%', '%USER%']));
	this.post(url, {buffer : JSON.stringify(buffer)});
};

/** STOCK SOLUTIONS **/
DataAdapter.prototype.getStockSolutions= function(){
	this.call('/{0}/proposal/{1}/saxs/stocksolution/list'.format( ['%TOKEN%', '%USER%']));
};

DataAdapter.prototype.saveStockSolution= function(stocksolution){
    var url = ('/{0}/proposal/{1}/saxs/stocksolution/save'.format( ['%TOKEN%', '%USER%']));
	this.post(url, {stocksolution : JSON.stringify(stocksolution)});
};

/** SPECIMENS **/
DataAdapter.prototype.saveSpecimen= function(specimen){
    var url = ('/{0}/proposal/{1}/saxs/specimen/save'.format( ['%TOKEN%', '%USER%']));
	this.post(url, {specimen : JSON.stringify(specimen)});
};

DataAdapter.prototype.mergeSpecimens= function(sourceSpecimenId, targetSpecimenId){
    var url = ('/{0}/proposal/{1}/saxs/specimen/merge'.format( ['%TOKEN%', '%USER%']));
	this.post(url, {sourceSpecimenId : sourceSpecimenId, targetSpecimenId : targetSpecimenId });
};

/** MEASUREMENTS**/
DataAdapter.prototype.saveMeasurement= function(measurement){
	var proposal = exiSAXS.localExtorage.tokenManager.getTokens()[0].user;
    var url = ('/{0}/proposal/{1}/saxs/measurement/save'.format( ['%TOKEN%', '%USER%', proposal]));
	this.post(url, {measurement : JSON.stringify(measurement)});
};

DataAdapter.prototype.removeMeasurement= function(measurement){
    var url = ('/{0}/proposal/{1}/saxs/measurement/{2}/remove'.format( ['%TOKEN%', '%USER%', measurement.measurementId]));
	this.call(url);
};

DataAdapter.prototype.sortMeasurements= function(experimentId, type){
    this.call('/{0}/proposal/{1}/saxs/measurement/experiment/{2}/type/{3}/sort'.format( ['%TOKEN%', '%USER%', experimentId, type]));
};

DataAdapter.prototype.getExperiments= function(){
	this.call('/{0}/proposal/{1}/saxs/experiment/list'.format( ['%TOKEN%', '%USER%']));
};

DataAdapter.prototype.getExperimentById= function(experimentId){
	this.call('/{0}/proposal/{1}/saxs/experiment/{2}/get'.format( ['%TOKEN%', '%USER%', experimentId]));
};



DataAdapter.prototype.getHPLCOverviewByExperimentId= function(experimentId){
	this.call('/{0}/proposal/{1}/saxs/experiment/{2}/hplc/overview'.format( ['%TOKEN%', '%USER%', experimentId]));
};

DataAdapter.prototype.getHPLCFramesScatteringURL= function(experimentId, frameIdList){
	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
	return tokens[0].url +  ('/{0}/proposal/{1}/saxs/experiment/{2}/hplc/frame/{3}/get?operation=log'.format( [ tokens[0].token, tokens[0].user, experimentId, frameIdList.toString()]));
};



DataAdapter.prototype.getExperimentsBySessionId= function(sessionId){
	this.call('/{0}/proposal/{1}/saxs/experiment/session/{2}/list'.format( ['%TOKEN%', '%USER%', sessionId]));
};

DataAdapter.prototype.getDataCollectionsByExperimentId= function(experimentId){
	this.call('/{0}/proposal/{1}/saxs/datacollection/experimentId/{2}/list'.format( ['%TOKEN%', '%USER%', experimentId]));
};


DataAdapter.prototype.getByExperimentId= function(experimentIds){
	this.call('/{0}/proposal/{1}/saxs/experiment/experimentId/{2}/list'.format( ['%TOKEN%', '%USER%', experimentIds]));
};

DataAdapter.prototype.getByExperimentByKey= function(key, value){
	this.call('/{0}/proposal/{1}/saxs/experiment/{2}/{3}/list'.format( ['%TOKEN%', '%USER%', key.toString(), value.toString()]));
};


//DataAdapter.prototype.getSubtractionByExperimentId= function(experimentId){
//	this.call('/{0}/saxs/{1}/subtraction/experimentId/{2}/list'.format( ['%TOKEN%', '%USER%', experimentId]));
//};

/** DATA COLLECTIONS **/
DataAdapter.prototype.getDataCollectionsByMacromoleculeAcronym= function(macromoleculeAcronym){
	this.call('/{0}/proposal/{1}/saxs/datacollection/macromoleculeAcronym/{2}/list'.format( ['%TOKEN%', '%USER%', macromoleculeAcronym]));
};

DataAdapter.prototype.getDataCollectionsByKey= function(key, value){
	this.call('/{0}/proposal/{1}/saxs/datacollection/{2}/{3}/list'.format( ['%TOKEN%', '%USER%', key, value.toString()]));
};


DataAdapter.prototype.getDataCollectionsByDataCollectionId= function(dataCollectionIds){
	this.call('/{0}/saxs/{1}/datacollection/dataCollectionId/{2}/list'.format( ['%TOKEN%', '%USER%', dataCollectionIds]));
};

DataAdapter.prototype.getDataCollectionsByIdList= function(dataCollectionIds){
	this.call('/{0}/saxs/{1}/datacollection/{2}/list'.format( ['%TOKEN%', '%USER%', dataCollectionIds]));
};

/** PROPOSAL **/
DataAdapter.prototype.getProposals= function(){
	this.call('/{0}/saxs/{1}/proposal/list'.format( ['%TOKEN%', '%USER%']));
};

DataAdapter.prototype.getProposalsInfo= function(){
	this.call('/{0}/proposal/{1}/technique/saxs/get'.format( ['%TOKEN%', '%USER%']));
};



/** SUBTRACTION **/
DataAdapter.prototype.getSubtractionsBySubtractionIdList= function(subtractionIdList){
	this.call('/{0}/proposal/{1}/saxs/subtraction/{2}/list'.format( ['%TOKEN%', '%USER%', subtractionIdList.toString()]));
};

/** FRAMES **/
DataAdapter.prototype.getFramesByAverageId= function(averageId){
	this.call('/{0}/saxs/{1}/frame/average/{2}/list'.format( ['%TOKEN%', '%USER%', averageId.toString()]));
};

DataAdapter.prototype.getFramesBySubtractionId= function(subtractionId){
	this.call('/{0}/saxs/{1}/frame/subtraction/{2}/list'.format( ['%TOKEN%', '%USER%', subtractionId.toString()]));
};

DataAdapter.prototype.authenticate = function(user, password, url){
	var _this = this;
	$.ajax({
		  url: url + '/authenticate',
		  type: 'post',
		  data: {
			login : user,
			password : password
		  },
		  success: function(data){
			   _this.onSuccess.notify(data);
		  },
		  error: function(error){
			  _this.onError.notify(error);
		  }
		});
	
};

DataAdapter.prototype.getImage = function(subtractionId, imageType){
	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
	return tokens[0].url + ('/{0}/proposal/{1}/saxs/subtraction/{2}/image/{3}'.format([ tokens[0].token, tokens[0].user, subtractionId, imageType]));
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