//
//function DataAdapter(args) {
//	this.async = true;
//	if (args != null) {
//		if (args.async != null) {
//			this.async = args.async;
//		}
//	}
//	this.onSuccess = new Event(this);
//	this.onError = new Event(this);
//
//}
//
//DataAdapter.prototype._getUrl = function(connection, url) {
//	return connection.url
//			+ url.replace("{token}", connection.token).replace("{proposal}", connection.proposal)
//					.replace("{username}", connection.username);
//};
//
//DataAdapter.prototype.call = function(url) {
//	var _this = this;
//
//	if (EXI != null) {
//		EXI.setLoading();
//	}
//
//	var connections = EXI.credentialManager.getConnections();
//	if (connections.length == 1) {
//		console.log(this._getUrl(connections[0], url));
//		$.ajax({
//			url : this._getUrl(connections[0], url),
//			type : 'get',
//			async : this.async,
//			success : function(data) {
//				_this.onSuccess.notify(data);
//				if (EXI != null) {
//					EXI.setLoading(false);
//				}
//			},
//			error : function(error) {
//				_this.onError.notify(error);
//				EXI.setError(error.responseText);
//			} });
//	} else {
//		alert("Number of connections > 1");
//	}
//
//	// if (connections.length == 2){
//	// function success(dataset1, dataset2){
//	// _this.onSuccess.notify(dataset1[0].concat(dataset2[0]));
//	// if (exiSAXS != null){
//	// exiSAXS.setLoading(false);
//	// }
//	// }
//	// function error(error){
//	// _this.onError.notify(error);
//	// _this.onError.notify(error);
//	// if (exiSAXS != null){
//	// exiSAXS.setError(error.responseText);
//	// }
//	// }
//	// $.when(
//	// $.ajax({
//	// url: connections[0].url + url.replace("%TOKEN%",
//	// connections[0].token).replace("%PROPOSAL%",
//	// connections[0].proposal).replace("%USER%", connections[0].username),
//	// async : this.async,
//	// type: 'get'
//	// }),
//	// $.ajax({
//	// url: connections[1].url + url.replace("%TOKEN%",
//	// connections[1].token).replace("%PROPOSAL%",
//	// connections[1].proposal).replace("%USER%", connections[1].username),
//	// async : this.async,
//	// type: 'get'
//	// })
//	// )
//	// .then( success, error);
//	// }
//};
//
//DataAdapter.prototype.post = function(url, data) {
//	var _this = this;
//	/** exiSAXS could be not defined yed * */
//	if (EXI != null) {
//		EXI.setLoading();
//	}
//	var connections = EXI.credentialManager.getConnections();
//	url = this._getUrl(connections[0], url);
//	$.ajax({
//		type : "POST",
//		url : url,
//		data : data,
//		success : function(data) {
//			_this.onSuccess.notify(data);
//			if (exiSAXS != null) {
//				exiSAXS.setLoading(false);
//			}
//		},
//		error : function(error) {
//			_this.onError.notify(error);
//			if (exiSAXS != null) {
//				exiSAXS.setError(error);
//			}
//		} });
//
//};
//
//DataAdapter.prototype.getURLRoot = function() {
//	var token = '1231231TOKEN1231231';
//	var proposal = 'mx415';
//	return ('/{0}/saxs/{1}/'.format([ token, proposal ]));
//};
//
//DataAdapter.prototype.downloadFrameURL = function(frameId) {
//	return this.server + ('/{0}/saxs/{1}/frame/{2}/download'.format([ '%TOKEN%', '%PROPOSAL%', frameId ]));
//};
//
//DataAdapter.prototype.downloadFrameURL = function(frameId) {
//	return this.server + ('/{0}/saxs/{1}/frame/{2}/download'.format([ '%TOKEN%', '%PROPOSAL%', frameId ]));
//};
//
//DataAdapter.prototype.getFramesURL = function(frames, averages, subtractions, sampleaverages, bufferaverages) {
//	if (frames == null) {
//		frames = [];
//	}
//	if (averages == null) {
//		averages = [];
//	}
//	if (subtractions == null) {
//		subtractions = [];
//	}
//	if (sampleaverages == null) {
//		sampleaverages = [];
//	}
//	if (bufferaverages == null) {
//		bufferaverages = [];
//	}
//	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
//	return tokens[0].url
//			+ ('/{0}/saxs/{1}/frame/datplot?frame={2}&average={3}&subtracted={4}&sampleaverage={5}&bufferaverage={6}'.format([
//					tokens[0].token, tokens[0].user, frames.toString(), averages.toString(), subtractions.toString(),
//					sampleaverages.toString(), bufferaverages.toString() ]));
//};
//
//DataAdapter.prototype.getFramesMergeURL = function(subtractionIdList, from, to, scale) {
//	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
//	return tokens[0].url
//			+ ('/{0}/saxs/{1}/frame/subtractionId/{2}/datplotmerge?from={3}&to={4}&scale={5}'.format([ tokens[0].token, tokens[0].user,
//					subtractionIdList.toString(), from.toString(), to.toString(), scale.toString() ]));
//};
//
//DataAdapter.prototype.getMergeURL = function(subtractionIdList, from, to, scale) {
//	var tokens = exiSAXS.localExtorage.tokenManager.getTokens();
//	return tokens[0].url
//			+ ('/{0}/saxs/{1}/frame/subtractionId/{2}/merge?from={3}&to={4}&scale={5}'.format([ tokens[0].token, tokens[0].user,
//					subtractionIdList.toString(), from.toString(), to.toString(), scale.toString() ]));
//};
//
//DataAdapter.prototype.getSessions = function() {
//	this.call('/{token}/proposal/{proposal}/session/list');
//};
//
//DataAdapter.prototype.getShippings = function() {
//	this.call('/{token}/proposal/{proposal}/shipping/list');
//};
//
//DataAdapter.prototype.getShipment = function(shippingId) {
//	this.call('/{token}/proposal/{proposal}/shipping/{0}/get'.format([ shippingId ]));
//};
//
//DataAdapter.prototype.saveShipment = function(shipment) {
//	var proposal = exiSAXS.localExtorage.tokenManager.getTokens()[0].user;
//	var url = ('/{0}/proposal/{2}/shipping/save'.format([ '%TOKEN%', '%PROPOSAL%', proposal ]));
//	this.post(url, shipment);
//};
//
///** DEWAR * */
//DataAdapter.prototype.saveDewar = function(shippingId, dewar) {
//	var url = ('/{token}/proposal/{proposal}/shipping/{0}/dewar/save'.format([ shippingId ]));
//	this.post(url, dewar);
//};
//
//DataAdapter.prototype.removeDewar = function(shippingId, dewarId) {
//	var url = ('/{token}/proposal/{proposal}/shipping/{0}/dewar/{1}/remove'.format([ shippingId, dewarId ]));
//	this.call(url);
//};
//
//DataAdapter.prototype.addDewar = function(shippingId) {
//	this.saveDewar(shippingId, {});
//};
//
//DataAdapter.prototype.getTemplateSourceFile = function(experimentId, type) {
//	var token = exiSAXS.localExtorage.tokenManager.getTokens()[0];
//	return token.url + ('/{token}/proposal/{proposal}/saxs/experiment/{0}/type/{1}/samplechanger/template'.format([ experimentId, type ]));
//};
//
///** TEMPLATES * */
//DataAdapter.prototype.saveTemplate = function(name, comments, measurements, experimentId) {
//	var url = ('/{token}/proposal/{proposal}/saxs/experiment/save');
//	this.post(url, {
//		name : name,
//		comments : comments,
//		experimentId : experimentId,
//		measurements : measurements.toString() });
//};
//
//DataAdapter.prototype.saveExperiment = function(experimentId, name, comments) {
//	var url = ('/{token}/proposal/{proposal}/saxs/experiment/{0}/save'.format([ experimentId ]));
//	this.post(url, {
//		name : name,
//		comments : comments });
//};
//
///** MACROMOLECULES * */
//DataAdapter.prototype.saveMacromolecule = function(macromolecule) {
//	var url = ('/{token}/proposal/{proposal}/saxs/macromolecule/save');
//	this.post(url, {
//		macromolecule : JSON.stringify(macromolecule) });
//};
//
//DataAdapter.prototype.getMacromolecules = function() {
//	this.call('/{token}/proposal/{proposal}/saxs/macromolecule/list');
//};
//
///** BUFFERS * */
//DataAdapter.prototype.getBuffers = function() {
//	this.call('/{token}/proposal/{proposal}/saxs/buffer/list');
//};
//
//DataAdapter.prototype.saveBuffer = function(buffer) {
//	var url = ('/{token}/proposal/{proposal}/saxs/buffer/save');
//	this.post(url, {
//		buffer : JSON.stringify(buffer) });
//};
//
///** STOCK SOLUTIONS * */
//DataAdapter.prototype.getStockSolutions = function() {
//	this.call('/{token}/proposal/{proposal}/saxs/stocksolution/list');
//};
//
//DataAdapter.prototype.saveStockSolution = function(stocksolution) {
//	var url = ('/{token}/proposal/{proposal}/saxs/stocksolution/save');
//	this.post(url, {
//		stocksolution : JSON.stringify(stocksolution) });
//};
//
///** SPECIMENS * */
//DataAdapter.prototype.saveSpecimen = function(specimen) {
//	var url = ('/{token}/proposal/{proposal}/saxs/specimen/save');
//	this.post(url, {
//		specimen : JSON.stringify(specimen) });
//};
//
//DataAdapter.prototype.mergeSpecimens = function(sourceSpecimenId, targetSpecimenId) {
//	var url = ('/{token}/proposal/{proposal}/saxs/specimen/merge');
//	this.post(url, {
//		sourceSpecimenId : sourceSpecimenId,
//		targetSpecimenId : targetSpecimenId });
//};
//
///** MEASUREMENTS* */
//DataAdapter.prototype.saveMeasurement = function(measurement) {
//	var url = ('/{token}/proposal/{proposal}/saxs/measurement/save');
//	this.post(url, {
//		measurement : JSON.stringify(measurement) });
//};
//
//DataAdapter.prototype.removeMeasurement = function(measurement) {
//	var url = ('/{token}/proposal/{proposal}/saxs/measurement/{0}/remove'.format([ measurement.measurementId ]));
//	this.call(url);
//};
//
//DataAdapter.prototype.sortMeasurements = function(experimentId, type) {
//	this.call('/{token}/proposal/{proposal}/saxs/measurement/experiment/{0}/type/{1}/sort'.format([ experimentId, type ]));
//};
//
//DataAdapter.prototype.getExperiments = function() {
//	this.call('/{token}/proposal/{proposal}/saxs/experiment/list'.format([ '%TOKEN%', '%PROPOSAL%' ]));
//};
//
//DataAdapter.prototype.getExperimentById = function(experimentId) {
//	this.call('/{token}/proposal/{proposal}/saxs/experiment/{0}/get'.format([ experimentId ]));
//};
//
//DataAdapter.prototype.getHPLCOverviewByExperimentId = function(experimentId) {
//	this.call('/{token}/proposal/{proposal}/saxs/experiment/{0}/hplc/overview'.format([ experimentId ]));
//};
//
//DataAdapter.prototype.getHPLCFramesScatteringURL = function(experimentId, frameIdList) {
//	return tokens[0].url
//			+ ('/{token}/proposal/{proposal}/saxs/experiment/{0}/hplc/frame/{1}/get?operation=log'.format([ experimentId,
//					frameIdList.toString() ]));
//};
//
//DataAdapter.prototype.getExperimentsBySessionId = function(sessionId) {
//	this.call('/{token}/proposal/{proposal}/saxs/experiment/session/{0}/list'.format([ sessionId ]));
//};
//
//DataAdapter.prototype.getDataCollectionsByExperimentId = function(experimentId) {
//	this.call('/{token}/proposal/{proposal}/saxs/datacollection/experimentId/{0}/list'.format([ experimentId ]));
//};
//
//DataAdapter.prototype.getByExperimentId = function(experimentIds) {
//	this.call('/{token}/proposal/{proposal}/saxs/experiment/experimentId/{0}/list'.format([ experimentIds ]));
//};
//
//DataAdapter.prototype.getByExperimentByKey = function(key, value) {
//	this.call('/{token}/proposal/{proposal}/saxs/experiment/{0}/{1}/list'.format([ key.toString(), value.toString() ]));
//};
//
///** DATA COLLECTIONS * */
//DataAdapter.prototype.getDataCollectionsByMacromoleculeAcronym = function(macromoleculeAcronym) {
//	this.call('/{token}/proposal/{proposal}/saxs/datacollection/macromoleculeAcronym/{0}/list'.format([ macromoleculeAcronym ]));
//};
//
//DataAdapter.prototype.getDataCollectionsByKey = function(key, value) {
//	this.call('/{token}/proposal/{proposal}/saxs/datacollection/{0}/{1}/list'.format([ key, value.toString() ]));
//};
//
//DataAdapter.prototype.getDataCollectionsByDataCollectionId = function(dataCollectionIds) {
//	this.call('/{token}/proposal/{proposal}/saxs/datacollection/dataCollectionId/{0}/list'.format([ dataCollectionIds ]));
//};
//
//DataAdapter.prototype.getDataCollectionsByIdList = function(dataCollectionIds) {
//	this.call('/{token}/proposal/{proposal}/saxs/datacollection/{0}/list'.format([ dataCollectionIds ]));
//};
//
///** PROPOSAL * */
//DataAdapter.prototype.getProposals = function() {
//	this.call('/{token}/proposal/user/{username}/list');
//};
//
//DataAdapter.prototype.getProposalsInfo = function() {
//	this.call('/{token}/proposal/{proposal}/technique/saxs/get');
//};
//
///** SUBTRACTION * */
//DataAdapter.prototype.getSubtractionsBySubtractionIdList = function(subtractionIdList) {
//	this.call('/{token}/proposal/{proposal}/saxs/subtraction/{0}/list'.format([ subtractionIdList.toString() ]));
//};
//
///** FRAMES * */
//DataAdapter.prototype.getFramesByAverageId = function(averageId) {
//	this.call('/{0}/saxs/{1}/frame/average/{0}/list'.format([ averageId.toString() ]));
//};
//
//DataAdapter.prototype.getFramesBySubtractionId = function(subtractionId) {
//	this.call('/{0}/saxs/{1}/frame/subtraction/{2}/list'.format([ subtractionId.toString() ]));
//};
//
//DataAdapter.prototype.authenticate = function(user, password, url) {
//	var _this = this;
//	$.ajax({
//		url : url + '/authenticate',
//		type : 'post',
//		data : {
//			login : user,
//			password : password },
//		success : function(data) {
//			_this.onSuccess.notify(data);
//		},
//		error : function(error) {
//			_this.onError.notify(error);
//		} });
//};
//
//DataAdapter.prototype.getImage = function(subtractionId, imageType) {
//	debugger
//	var connection = EXI.credentialManager.getConnections()[0];
//	return connection.url
//			+ ('/{0}/proposal/{1}/saxs/subtraction/{2}/image/{3}'
//					.format([ connection.token, connection.proposal, subtractionId, imageType ]));
//};
//
///** Function for String * */
//String.prototype.format = function(args) {
//	var str = this;
//	return str.replace(String.prototype.format.regex, function(item) {
//		var intVal = parseInt(item.substring(1, item.length - 1));
//		var replace;
//		if (intVal >= 0) {
//			replace = args[intVal];
//		} else if (intVal === -1) {
//			replace = "{";
//		} else if (intVal === -2) {
//			replace = "}";
//		} else {
//			replace = "";
//		}
//		return replace;
//	});
//};
//String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");